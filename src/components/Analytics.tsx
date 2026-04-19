"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AnalyticsEvent {
  type: string;
  page: string;
  data: Record<string, string>;
  timestamp: string;
  device?: "mobile" | "desktop";
  browser?: string;
  os?: string;
  referrer?: string;
  session_id?: string;
  screen_width?: number;
  screen_height?: number;
  user_agent?: string;
}

interface AnalyticsContextValue {
  trackEvent: (type: string, data?: Record<string, string>) => void;
}

const STORAGE_KEY = "hc101-analytics";
const SESSION_KEY = "hc101-session-id";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackEvent: () => {},
});

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

/* ------------------------------------------------------------------ */
/*  UA Parsing                                                         */
/* ------------------------------------------------------------------ */

function parseBrowser(ua: string): string {
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Other";
}

function parseOS(ua: string): string {
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getSessionId(): string {
  if (typeof sessionStorage === "undefined") return "unknown";
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid =
        Math.random().toString(36).slice(2, 10) +
        Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "unknown";
  }
}

function getDevice(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

function getReferrer(): string {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

function getUserAgent(): string {
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent || "";
}

function getScreenDimensions(): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  return { width: window.screen.width, height: window.screen.height };
}

function getEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function pushEventToLocalStorage(event: AnalyticsEvent) {
  try {
    const events = getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    /* localStorage full or unavailable */
  }
}

/* ------------------------------------------------------------------ */
/*  Supabase insert helpers                                            */
/* ------------------------------------------------------------------ */

async function insertAnalyticsEvent(event: AnalyticsEvent): Promise<boolean> {
  try {
    const ua = event.user_agent || "";
    const { error } = await supabase.from("hc101_analytics").insert({
      event_type: event.type,
      page: event.page,
      data: event.data || {},
      device: event.device || "desktop",
      browser: event.browser || parseBrowser(ua),
      os: event.os || parseOS(ua),
      referrer: event.referrer || "",
      session_id: event.session_id || "",
      screen_width: event.screen_width || 0,
      screen_height: event.screen_height || 0,
      user_agent: ua,
    });
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

async function upsertSession(event: AnalyticsEvent): Promise<void> {
  try {
    const ua = event.user_agent || "";
    const sid = event.session_id || "unknown";
    if (sid === "unknown") return;

    // Try to update existing session first
    const { data: existing } = await supabase
      .from("hc101_sessions")
      .select("id, page_count")
      .eq("session_id", sid)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("hc101_sessions")
        .update({
          page_count: (existing.page_count || 1) + 1,
          last_active_at: new Date().toISOString(),
        })
        .eq("session_id", sid);
    } else {
      await supabase.from("hc101_sessions").insert({
        session_id: sid,
        device: event.device || "desktop",
        browser: event.browser || parseBrowser(ua),
        os: event.os || parseOS(ua),
        screen_width: event.screen_width || 0,
        screen_height: event.screen_height || 0,
        referrer: event.referrer || "",
        entry_page: event.page,
        page_count: 1,
      });
    }
  } catch {
    /* Supabase unavailable — sessions not critical */
  }
}

async function insertAdEvent(
  format: string,
  sponsor: string,
  eventType: "impression" | "click",
  page: string,
  device: string,
  sessionId: string
): Promise<boolean> {
  try {
    const { error } = await supabase.from("hc101_ad_events").insert({
      event_type: eventType,
      ad_format: format,
      sponsor_name: sponsor,
      page,
      device,
      session_id: sessionId,
    });
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Combined push: Supabase first, localStorage fallback               */
/* ------------------------------------------------------------------ */

async function pushEvent(event: AnalyticsEvent) {
  const supabaseOk = await insertAnalyticsEvent(event);
  if (!supabaseOk) {
    pushEventToLocalStorage(event);
  }

  // Upsert session on page views
  if (event.type === "page_view") {
    upsertSession(event);
  }

  // Ad events also go to dedicated table
  if (event.type === "ad_impression" || event.type === "ad_click") {
    const adEventType = event.type === "ad_impression" ? "impression" : "click";
    await insertAdEvent(
      event.data?.format || "Unknown",
      event.data?.sponsor || "Unknown",
      adEventType,
      event.page,
      event.device || "desktop",
      event.session_id || "unknown"
    );
  }
}

/* ------------------------------------------------------------------ */
/*  Exported ad event helper                                           */
/* ------------------------------------------------------------------ */

export async function trackAdEvent(
  format: string,
  sponsor: string,
  eventType: "impression" | "click"
) {
  if (typeof window === "undefined") return;
  const page = window.location.pathname;
  if (page.startsWith("/admin")) return;

  const ua = getUserAgent();
  const device = getDevice();
  const sessionId = getSessionId();
  const screen = getScreenDimensions();

  const event: AnalyticsEvent = {
    type: eventType === "impression" ? "ad_impression" : "ad_click",
    page,
    data: { format, sponsor },
    timestamp: new Date().toISOString(),
    device,
    browser: parseBrowser(ua),
    os: parseOS(ua),
    referrer: getReferrer(),
    session_id: sessionId,
    screen_width: screen.width,
    screen_height: screen.height,
    user_agent: ua,
  };

  await pushEvent(event);
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export default function AnalyticsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  /* Track page views on route change — exclude admin pages */
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    if (pathname.startsWith("/admin")) {
      prevPathname.current = pathname;
      return;
    }
    prevPathname.current = pathname;

    const ua = getUserAgent();
    const screen = getScreenDimensions();

    pushEvent({
      type: "page_view",
      page: pathname,
      data: {
        ...(typeof window !== "undefined"
          ? { userAgent: navigator.userAgent }
          : {}),
      },
      timestamp: new Date().toISOString(),
      device: getDevice(),
      browser: parseBrowser(ua),
      os: parseOS(ua),
      referrer: getReferrer(),
      session_id: getSessionId(),
      screen_width: screen.width,
      screen_height: screen.height,
      user_agent: ua,
    });
  }, [pathname]);

  /* Generic track function exposed via context */
  const trackEvent = useCallback(
    (type: string, data: Record<string, string> = {}) => {
      const page =
        typeof window !== "undefined" ? window.location.pathname : "";
      if (page.startsWith("/admin")) return;

      const ua = getUserAgent();
      const screen = getScreenDimensions();

      pushEvent({
        type,
        page,
        data,
        timestamp: new Date().toISOString(),
        device: getDevice(),
        browser: parseBrowser(ua),
        os: parseOS(ua),
        referrer: getReferrer(),
        session_id: getSessionId(),
        screen_width: screen.width,
        screen_height: screen.height,
        user_agent: ua,
      });
    },
    []
  );

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
