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
}

interface AnalyticsContextValue {
  trackEvent: (type: string, data?: Record<string, string>) => void;
}

const STORAGE_KEY = "hc101-analytics";

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

  /* Track page views on route change */
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    const referrer =
      typeof document !== "undefined" ? document.referrer : "";

    pushEvent({
      type: "page_view",
      page: pathname,
      data: {
        referrer,
        ...(typeof window !== "undefined"
          ? { userAgent: navigator.userAgent }
          : {}),
      },
      timestamp: new Date().toISOString(),
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
