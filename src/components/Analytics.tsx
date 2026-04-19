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

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AnalyticsEvent {
  type: string;
  page: string;
  data: Record<string, string>;
  timestamp: string;
  device?: "mobile" | "desktop";
  referrer?: string;
  session_id?: string;
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

function getEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function pushEvent(event: AnalyticsEvent) {
  try {
    const events = getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    /* localStorage full or unavailable */
  }
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
    if (pathname.startsWith("/admin")) { prevPathname.current = pathname; return; }
    prevPathname.current = pathname;

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
      referrer: getReferrer(),
      session_id: getSessionId(),
    });
  }, [pathname]);

  /* Generic track function exposed via context */
  const trackEvent = useCallback(
    (type: string, data: Record<string, string> = {}) => {
      const page =
        typeof window !== "undefined" ? window.location.pathname : "";
      pushEvent({
        type,
        page,
        data,
        timestamp: new Date().toISOString(),
        device: getDevice(),
        referrer: getReferrer(),
        session_id: getSessionId(),
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
