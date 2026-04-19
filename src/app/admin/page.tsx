"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { AnalyticsEvent } from "@/components/Analytics";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ANALYTICS_KEY = "hc101-analytics";
const CONFIG_KEY = "hc101-admin-config";
const DEMO_PASSWORD = "alta2026";

/* ------------------------------------------------------------------ */
/*  Module registry                                                    */
/* ------------------------------------------------------------------ */

const MODULES: Record<
  string,
  { label: string; category: string }
> = {
  // Global components
  NewsTicker: { label: "News Ticker", category: "Global" },
  HomeClosingAI: { label: "AI Assistant", category: "Global" },
  ScrollToTop: { label: "Back to Top Button", category: "Global" },
  OnboardingTour: { label: "First-Visit Onboarding", category: "Global" },
  SponsorFooterStrip: { label: "Footer Sponsor Strip", category: "Global" },
  FirstTimeBuyerCTA: { label: "First-Time Buyer CTA", category: "Global" },
  ClosingFolderButton: { label: "My Folder Button", category: "Global" },
  StickyBottomAd: { label: "Sticky Bottom Ad", category: "Global" },
  // Ad formats
  InlineAd: { label: "Inline Sponsor Ad", category: "Ads" },
  ContextualSponsor: { label: "Contextual Sponsor", category: "Ads" },
  SponsorShowcase: { label: "Premium Showcase", category: "Ads" },
  SponsorTip: { label: "Sponsor Tips", category: "Ads" },
  SponsorBadge: { label: "Sponsor Badges", category: "Ads" },
  TrustedALTAMembers: { label: "ALTA Members Strip", category: "Ads" },
  EliteProviders: { label: "Footer Sponsors", category: "Ads" },
  // Features
  JourneyTracker: { label: "Journey Tracker", category: "Features" },
  AchievementSystem: { label: "Achievements", category: "Features" },
  ShareButtons: { label: "Share Buttons", category: "Features" },
  MiniQuiz: { label: "Mini Quizzes", category: "Features" },
  DarkMode: { label: "Dark Mode Toggle", category: "Features" },
  SiteSearch: { label: "Header Search", category: "Features" },
  // Content sections
  HomepageTestimonials: { label: "Homepage Testimonials", category: "Content" },
  MarketStats: { label: "Market Stats Rotator", category: "Content" },
  FraudStats: { label: "Fraud Statistics", category: "Content" },
  EscalationExplainer: { label: "Deed Fraud Escalation", category: "Content" },
  CountyLookup: { label: "County Lookup Tool", category: "Content" },
  ProtectionToolkit: { label: "Deed Fraud Toolkit", category: "Content" },
};

const MODULE_CATEGORIES = ["Global", "Ads", "Features", "Content"];

const AD_FORMATS = [
  { key: "InlineAd", label: "Inline Ad" },
  { key: "ContextualSponsor", label: "Contextual Sponsor" },
  { key: "SponsorShowcase", label: "Sponsor Showcase" },
  { key: "StickyBottomAd", label: "Sticky Bottom Ad" },
  { key: "SponsorTip", label: "Sponsor Tip" },
  { key: "SponsorBadge", label: "Sponsor Badge" },
  { key: "TrustedALTAMembers", label: "ALTA Members Strip" },
  { key: "EliteProviders", label: "Footer Sponsors" },
] as const;

const ALL_PAGES = [
  { route: "/", label: "Homepage", section: "General" },
  { route: "/closing-process", label: "Closing Process", section: "Closing Process" },
  { route: "/closing-process/closing-costs", label: "Closing Costs", section: "Closing Process" },
  { route: "/closing-process/closing-checklist", label: "Closing Checklist", section: "Closing Process" },
  { route: "/closing-process/closing-options", label: "Closing Options", section: "Closing Process" },
  { route: "/closing-process/what-to-expect", label: "What to Expect", section: "Closing Process" },
  { route: "/closing-day-prep", label: "Closing Day Prep", section: "Closing Process" },
  { route: "/closing-disclosure", label: "Closing Disclosure", section: "Closing Process" },
  { route: "/first-time-buyers", label: "First Time Buyers", section: "General" },
  { route: "/mortgage-calculator", label: "Mortgage Calculator", section: "Tools" },
  { route: "/dti-calculator", label: "DTI Calculator", section: "Tools" },
  { route: "/rent-vs-buy", label: "Rent vs Buy", section: "Tools" },
  { route: "/compare-loans", label: "Compare Loans", section: "Tools" },
  { route: "/true-cost", label: "True Cost", section: "Tools" },
  { route: "/affordability", label: "Affordability", section: "Tools" },
  { route: "/loan-estimate", label: "Loan Estimate", section: "General" },
  { route: "/le-vs-cd", label: "LE vs CD", section: "General" },
  { route: "/escrow-guide", label: "Escrow Guide", section: "General" },
  { route: "/home-inspection", label: "Home Inspection", section: "General" },
  { route: "/appraisal-guide", label: "Appraisal Guide", section: "General" },
  { route: "/homeowners-insurance", label: "Homeowners Insurance", section: "General" },
  { route: "/property-rights", label: "Property Rights", section: "Protection" },
  { route: "/protect-against-deed-fraud", label: "Protect Against Deed Fraud", section: "Protection" },
  { route: "/deed-theft", label: "Deed Theft", section: "Protection" },
  { route: "/stop-fraud", label: "Stop Fraud", section: "Protection" },
  { route: "/identity-protection", label: "Identity Protection", section: "Protection" },
  { route: "/protect-your-money", label: "Protect Your Money", section: "Protection" },
  { route: "/protect-your-rights", label: "Protect Your Rights", section: "Protection" },
  { route: "/hoa-guide", label: "HOA Guide", section: "General" },
  { route: "/after-closing", label: "After Closing", section: "General" },
  { route: "/tax-benefits", label: "Tax Benefits", section: "General" },
  { route: "/negotiation-guide", label: "Negotiation Guide", section: "Resources" },
  { route: "/questions-to-ask", label: "Questions to Ask", section: "Resources" },
  { route: "/document-checklist", label: "Document Checklist", section: "Resources" },
  { route: "/document-library", label: "Document Library", section: "Resources" },
  { route: "/glossary", label: "Glossary", section: "Resources" },
  { route: "/faq", label: "FAQ", section: "Resources" },
  { route: "/resources", label: "Resources", section: "Resources" },
  { route: "/trivia", label: "Trivia", section: "Resources" },
  { route: "/find-company", label: "Find a Company", section: "Resources" },
  { route: "/find-policy", label: "Find a Policy", section: "Resources" },
  { route: "/blog", label: "Blog", section: "Resources" },
  { route: "/sources", label: "Sources", section: "Resources" },
  { route: "/join-alta", label: "Join ALTA", section: "General" },
  { route: "/emergency-contacts", label: "Emergency Contacts", section: "General" },
  { route: "/support", label: "Support", section: "General" },
];

const PAGE_SECTIONS = ["General", "Closing Process", "Tools", "Protection", "Resources"];

/* ------------------------------------------------------------------ */
/*  Admin config helpers (shared with ad components)                   */
/* ------------------------------------------------------------------ */

export type AdminConfig = {
  adToggles: Record<string, boolean>;
  pageVisibility: Record<string, boolean>;
  modules: Record<string, boolean>;
  retentionDays: number;
};

function defaultConfig(): AdminConfig {
  return { adToggles: {}, pageVisibility: {}, modules: {}, retentionDays: 30 };
}

function getConfig(): AdminConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultConfig(), ...parsed };
    }
  } catch { /* empty */ }
  return defaultConfig();
}

function saveConfig(cfg: AdminConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch { /* empty */ }
}

/** Call from any ad component: returns false if that format is paused. */
export function isAdEnabled(formatKey: string): boolean {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return true;
    const cfg: AdminConfig = JSON.parse(raw);
    const val = cfg.adToggles?.[formatKey];
    return val === undefined ? true : val;
  } catch {
    return true;
  }
}

/** Call from any module: returns false if that module is disabled. */
export function isModuleEnabled(moduleKey: string): boolean {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return true;
    const cfg: AdminConfig = JSON.parse(raw);
    const val = cfg.modules?.[moduleKey];
    return val === undefined ? true : val;
  } catch {
    return true;
  }
}

/* ------------------------------------------------------------------ */
/*  Utility: date helpers                                              */
/* ------------------------------------------------------------------ */

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateLabelShort(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function fmtPct(num: number, denom: number): string {
  if (denom === 0) return "0%";
  return (num / denom * 100).toFixed(1) + "%";
}

function fmtDuration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}m ${rem}s`;
}

/* ------------------------------------------------------------------ */
/*  Password Gate                                                      */
/* ------------------------------------------------------------------ */

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === DEMO_PASSWORD) {
      try {
        sessionStorage.setItem("hc101-admin-auth", "1");
      } catch { /* empty */ }
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 print:hidden">
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-5"
      >
        <h1 className="text-xl font-bold text-[#1a2744]">HC101 Admin</h1>
        <p className="text-sm text-gray-500">
          Enter the admin password to continue.
        </p>
        <input
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setError(false);
          }}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a8ebc] bg-white text-gray-900"
          placeholder="Password"
          autoFocus
        />
        {error && (
          <p className="text-xs text-red-500 font-medium">
            Incorrect password.
          </p>
        )}
        <button
          type="submit"
          className="w-full py-2.5 bg-[#0a8ebc] text-white rounded-lg font-semibold text-sm hover:bg-[#077a9e] transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable UI components                                             */
/* ------------------------------------------------------------------ */

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-[#1a2744]">{value}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-[#0a8ebc]" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function BarChart({
  data,
  maxVal,
  color = "bg-[#0a8ebc]",
}: {
  data: [string, number][];
  maxVal?: number;
  color?: string;
}) {
  const max = maxVal ?? (data.length ? Math.max(...data.map((d) => d[1]), 1) : 1);
  return (
    <div className="space-y-2">
      {data.map(([label, count]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-44 truncate shrink-0" title={label}>
            {label}
          </span>
          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${color} rounded-full transition-all`}
              style={{ width: `${Math.max((count / max) * 100, 1)}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-[#1a2744] w-12 text-right">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-[#1a2744] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-sm text-gray-400">{text}</p>;
}

function SectionBadge({ text, color }: { text: string; color?: string }) {
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        color ?? "bg-gray-100 text-gray-500"
      }`}
    >
      {text}
    </span>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Global: "bg-blue-50 text-blue-600",
  Ads: "bg-amber-50 text-amber-600",
  Features: "bg-purple-50 text-purple-600",
  Content: "bg-emerald-50 text-emerald-600",
};

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

type Tab = "overview" | "adPerf" | "content" | "modules" | "pages" | "export";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [config, setConfig] = useState<AdminConfig>(defaultConfig());
  const [pageSectionFilter, setPageSectionFilter] = useState("All");
  const importRef = useRef<HTMLInputElement>(null);

  /* Load data */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ANALYTICS_KEY);
      setEvents(raw ? JSON.parse(raw) : []);
    } catch { /* empty */ }
    setConfig(getConfig());
  }, []);

  /* ---------------------------------------------------------------- */
  /*  ANALYTICS COMPUTATIONS                                           */
  /* ---------------------------------------------------------------- */

  const pageViews = useMemo(() => events.filter((e) => e.type === "page_view"), [events]);

  const uniquePages = useMemo(() => new Set(pageViews.map((e) => e.page)).size, [pageViews]);

  /* Sessions */
  const sessions = useMemo(() => {
    const map: Record<string, AnalyticsEvent[]> = {};
    events.forEach((e) => {
      const sid = e.session_id || "unknown";
      if (!map[sid]) map[sid] = [];
      map[sid].push(e);
    });
    return map;
  }, [events]);

  const sessionCount = useMemo(() => Object.keys(sessions).length, [sessions]);

  const avgTimeOnSite = useMemo(() => {
    const durations: number[] = [];
    Object.values(sessions).forEach((evts) => {
      if (evts.length < 2) return;
      const sorted = [...evts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      const dur = new Date(sorted[sorted.length - 1].timestamp).getTime() - new Date(sorted[0].timestamp).getTime();
      if (dur > 0 && dur < 3600000) durations.push(dur);
    });
    if (!durations.length) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }, [sessions]);

  const bounceRate = useMemo(() => {
    const total = Object.keys(sessions).length;
    if (!total) return 0;
    const bounces = Object.values(sessions).filter((evts) => {
      const pvs = evts.filter((e) => e.type === "page_view");
      return pvs.length <= 1;
    }).length;
    return bounces / total;
  }, [sessions]);

  const pagesPerSession = useMemo(() => {
    const total = Object.keys(sessions).length;
    if (!total) return 0;
    const sum = Object.values(sessions).reduce((acc, evts) => {
      return acc + evts.filter((e) => e.type === "page_view").length;
    }, 0);
    return sum / total;
  }, [sessions]);

  /* Top pages */
  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      counts[e.page] = (counts[e.page] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [pageViews]);

  /* Traffic by day (last 7 days) */
  const trafficByDay = useMemo(() => {
    const result: [string, number][] = [];
    for (let i = 6; i >= 0; i--) {
      const start = daysAgo(i);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const count = pageViews.filter((e) => {
        const t = new Date(e.timestamp).getTime();
        return t >= start.getTime() && t < end.getTime();
      }).length;
      result.push([dateLabelShort(start), count]);
    }
    return result;
  }, [pageViews]);

  /* Traffic by hour */
  const trafficByHour = useMemo(() => {
    const hours = new Array(24).fill(0) as number[];
    pageViews.forEach((e) => {
      const h = new Date(e.timestamp).getHours();
      hours[h]++;
    });
    const max = Math.max(...hours, 1);
    return { hours, max };
  }, [pageViews]);

  /* Entry pages */
  const entryPages = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(sessions).forEach((evts) => {
      const pvs = evts.filter((e) => e.type === "page_view").sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      if (pvs.length) counts[pvs[0].page] = (counts[pvs[0].page] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [sessions]);

  /* Exit pages */
  const exitPages = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(sessions).forEach((evts) => {
      const pvs = evts.filter((e) => e.type === "page_view").sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      if (pvs.length) counts[pvs[pvs.length - 1].page] = (counts[pvs[pvs.length - 1].page] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [sessions]);

  /* User flows (common page sequences) */
  const userFlows = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(sessions).forEach((evts) => {
      const pvs = evts.filter((e) => e.type === "page_view").sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      for (let i = 0; i < pvs.length - 1; i++) {
        const key = `${pvs[i].page} -> ${pvs[i + 1].page}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [sessions]);

  /* Device breakdown */
  const deviceBreakdown = useMemo(() => {
    let mobile = 0;
    let desktop = 0;
    pageViews.forEach((e) => {
      if (e.device === "mobile") mobile++;
      else desktop++;
    });
    return { mobile, desktop, total: mobile + desktop };
  }, [pageViews]);

  /* Referrer tracking */
  const referrerData = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      const ref = e.referrer || e.data?.referrer || "";
      if (!ref) return;
      try {
        const host = new URL(ref).hostname || ref;
        counts[host] = (counts[host] || 0) + 1;
      } catch {
        counts[ref] = (counts[ref] || 0) + 1;
      }
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [pageViews]);

  /* ---------------------------------------------------------------- */
  /*  AD PERFORMANCE COMPUTATIONS                                      */
  /* ---------------------------------------------------------------- */

  const adImpressions = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "ad_impression").forEach((e) => {
      const fmt = e.data?.format || "Unknown";
      counts[fmt] = (counts[fmt] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const totalImpressions = useMemo(() => events.filter((e) => e.type === "ad_impression").length, [events]);
  const totalAdClicks = useMemo(() => events.filter((e) => e.type === "ad_click").length, [events]);

  const adClicksByFormat = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "ad_click").forEach((e) => {
      const fmt = e.data?.format || "Unknown";
      counts[fmt] = (counts[fmt] || 0) + 1;
    });
    return counts;
  }, [events]);

  const adImpressionsBySponsor = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "ad_impression").forEach((e) => {
      const s = e.data?.sponsor || "Unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const adClicksBySponsor = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "ad_click").forEach((e) => {
      const s = e.data?.sponsor || "Unknown";
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const adImpressionsByPage = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "ad_impression").forEach((e) => {
      counts[e.page] = (counts[e.page] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [events]);

  const revenuePotential = useMemo(() => {
    const low = (totalImpressions / 1000) * 5;
    const high = (totalImpressions / 1000) * 15;
    return { low, high };
  }, [totalImpressions]);

  /* ---------------------------------------------------------------- */
  /*  CONTENT PERFORMANCE COMPUTATIONS                                 */
  /* ---------------------------------------------------------------- */

  const calculatorUsage = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "calculator_used").forEach((e) => {
      const name = e.data?.calculator || e.page || "Unknown";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const toolkitCompletions = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "toolkit_completed").forEach((e) => {
      const name = e.data?.toolkit || e.page || "Unknown";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const triviaScores = useMemo(() => {
    const scores: number[] = [];
    events.filter((e) => e.type === "trivia_played").forEach((e) => {
      const s = parseInt(e.data?.score || "0", 10);
      if (!isNaN(s)) scores.push(s);
    });
    return scores;
  }, [events]);

  const triviaDistribution = useMemo(() => {
    const buckets: Record<string, number> = { "0-20%": 0, "21-40%": 0, "41-60%": 0, "61-80%": 0, "81-100%": 0 };
    triviaScores.forEach((s) => {
      if (s <= 20) buckets["0-20%"]++;
      else if (s <= 40) buckets["21-40%"]++;
      else if (s <= 60) buckets["41-60%"]++;
      else if (s <= 80) buckets["61-80%"]++;
      else buckets["81-100%"]++;
    });
    return Object.entries(buckets);
  }, [triviaScores]);

  const glossaryViews = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "glossary_viewed").forEach((e) => {
      const term = e.data?.term || "Unknown";
      counts[term] = (counts[term] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [events]);

  const faqViews = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "faq_viewed").forEach((e) => {
      const q = e.data?.question || "Unknown";
      counts[q] = (counts[q] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [events]);

  const blogViews = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "blog_opened" || (e.type === "page_view" && e.page.startsWith("/blog/"))).forEach((e) => {
      const slug = e.data?.slug || e.page || "Unknown";
      counts[slug] = (counts[slug] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [events]);

  const countyLookups = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "county_lookup").forEach((e) => {
      const loc = e.data?.state ? `${e.data.state} - ${e.data.county || "All"}` : e.data?.query || "Unknown";
      counts[loc] = (counts[loc] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [events]);

  const chatbotTopics = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "chatbot_query").forEach((e) => {
      const topic = e.data?.topic || e.data?.query || "General";
      counts[topic] = (counts[topic] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [events]);

  const searchQueries = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "search_performed").forEach((e) => {
      const q = (e.data?.query || "").toLowerCase().trim();
      if (q) counts[q] = (counts[q] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);
  }, [events]);

  const folderSaves = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "folder_save").forEach((e) => {
      const t = e.data?.content_type || e.data?.type || "Unknown";
      counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  /* ---------------------------------------------------------------- */
  /*  PAGE VIEW COUNTS (for page manager)                              */
  /* ---------------------------------------------------------------- */

  const pageViewCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      counts[e.page] = (counts[e.page] || 0) + 1;
    });
    return counts;
  }, [pageViews]);

  const pageLastViewed = useMemo(() => {
    const last: Record<string, string> = {};
    pageViews.forEach((e) => {
      if (!last[e.page] || e.timestamp > last[e.page]) {
        last[e.page] = e.timestamp;
      }
    });
    return last;
  }, [pageViews]);

  const pageAvgTime = useMemo(() => {
    // Estimate per-page time: time between page_view on page X and next page_view on any page
    const result: Record<string, number[]> = {};
    Object.values(sessions).forEach((evts) => {
      const pvs = evts.filter((e) => e.type === "page_view").sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      for (let i = 0; i < pvs.length - 1; i++) {
        const dur = new Date(pvs[i + 1].timestamp).getTime() - new Date(pvs[i].timestamp).getTime();
        if (dur > 0 && dur < 600000) {
          if (!result[pvs[i].page]) result[pvs[i].page] = [];
          result[pvs[i].page].push(dur);
        }
      }
    });
    const avgs: Record<string, number> = {};
    Object.entries(result).forEach(([page, durations]) => {
      avgs[page] = durations.reduce((a, b) => a + b, 0) / durations.length;
    });
    return avgs;
  }, [sessions]);

  /* ---------------------------------------------------------------- */
  /*  ACTIONS                                                          */
  /* ---------------------------------------------------------------- */

  const toggleAd = useCallback((key: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        adToggles: {
          ...prev.adToggles,
          [key]: prev.adToggles[key] === undefined ? false : !prev.adToggles[key],
        },
      };
      saveConfig(next);
      return next;
    });
  }, []);

  const togglePage = useCallback((route: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        pageVisibility: {
          ...prev.pageVisibility,
          [route]: prev.pageVisibility[route] === undefined ? false : !prev.pageVisibility[route],
        },
      };
      saveConfig(next);
      return next;
    });
  }, []);

  const toggleModule = useCallback((key: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        modules: {
          ...prev.modules,
          [key]: prev.modules[key] === undefined ? false : !prev.modules[key],
        },
      };
      saveConfig(next);
      return next;
    });
  }, []);

  const bulkPages = useCallback((enable: boolean) => {
    setConfig((prev) => {
      const vis: Record<string, boolean> = {};
      ALL_PAGES.forEach(({ route }) => {
        vis[route] = enable;
      });
      const next = { ...prev, pageVisibility: vis };
      saveConfig(next);
      return next;
    });
  }, []);

  /* CSV export */
  const exportCSV = useCallback(() => {
    const header = "type,page,timestamp,device,referrer,session_id,data\n";
    const rows = events
      .map((e) => {
        const dataStr = Object.entries(e.data || {})
          .map(([k, v]) => `${k}=${v}`)
          .join("; ");
        return `"${e.type}","${e.page}","${e.timestamp}","${e.device || ""}","${(e.referrer || "").replace(/"/g, '""')}","${e.session_id || ""}","${dataStr.replace(/"/g, '""')}"`;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hc101-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [events]);

  const exportConfig = useCallback(() => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hc101-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [config]);

  const importConfig = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        const merged = { ...defaultConfig(), ...parsed };
        saveConfig(merged);
        setConfig(merged);
      } catch {
        alert("Invalid config file.");
      }
    };
    reader.readAsText(file);
  }, []);

  const clearAnalytics = useCallback(() => {
    if (confirm("Clear all analytics data? This cannot be undone.")) {
      try {
        localStorage.removeItem(ANALYTICS_KEY);
      } catch { /* empty */ }
      setEvents([]);
    }
  }, []);

  const clearConfig = useCallback(() => {
    if (confirm("Reset all admin config (toggles, settings)? This cannot be undone.")) {
      try {
        localStorage.removeItem(CONFIG_KEY);
      } catch { /* empty */ }
      setConfig(defaultConfig());
    }
  }, []);

  const setRetention = useCallback((days: number) => {
    setConfig((prev) => {
      const next = { ...prev, retentionDays: days };
      saveConfig(next);
      return next;
    });
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Sidebar nav                                                      */
  /* ---------------------------------------------------------------- */

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "overview", label: "Analytics", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
    { key: "adPerf", label: "Ad Performance", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { key: "content", label: "Content", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { key: "modules", label: "Modules", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    { key: "pages", label: "Pages", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { key: "export", label: "Export", icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  ];

  /* ---------------------------------------------------------------- */
  /*  Filtered pages for page manager                                  */
  /* ---------------------------------------------------------------- */

  const filteredPages = useMemo(() => {
    if (pageSectionFilter === "All") return ALL_PAGES;
    return ALL_PAGES.filter((p) => p.section === pageSectionFilter);
  }, [pageSectionFilter]);

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="min-h-screen flex bg-gray-50 print:hidden">
      {/* ---- Sidebar ---- */}
      <aside className="w-56 bg-[#1a2744] text-white flex flex-col shrink-0 min-h-screen sticky top-0">
        <div className="p-5 border-b border-white/10">
          <h1 className="text-base font-bold tracking-tight">HC101 Admin</h1>
          <p className="text-[10px] text-gray-400 mt-0.5">Analytics &amp; Controls</p>
        </div>
        <nav className="flex-1 py-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === item.key
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <p className="text-[10px] text-gray-500">{events.length} events tracked</p>
          <p className="text-[10px] text-gray-500">{sessionCount} sessions</p>
          <p className="text-[10px] text-gray-500">Retention: {config.retentionDays === 0 ? "All" : `${config.retentionDays}d`}</p>
        </div>
      </aside>

      {/* ---- Main content ---- */}
      <main className="flex-1 p-8 overflow-auto max-w-[1200px]">
        {/* ============================================================ */}
        {/*  TAB 1: ANALYTICS OVERVIEW                                    */}
        {/* ============================================================ */}
        {tab === "overview" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1a2744]">Analytics Overview</h2>

            {/* Row 1 — Core stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total Page Views" value={pageViews.length} />
              <Stat label="Unique Pages" value={uniquePages} />
              <Stat label="Sessions" value={sessionCount} />
              <Stat label="Pages / Session" value={pagesPerSession.toFixed(1)} />
            </div>

            {/* Row 2 — Session metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Avg. Time on Site" value={avgTimeOnSite > 0 ? fmtDuration(avgTimeOnSite) : "--"} />
              <Stat label="Bounce Rate" value={fmtPct(bounceRate, 1)} sub="Single-page sessions" />
              <Stat label="Mobile Traffic" value={fmtPct(deviceBreakdown.mobile, deviceBreakdown.total || 1)} sub={`${deviceBreakdown.mobile} mobile / ${deviceBreakdown.desktop} desktop`} />
              <Stat label="Ad Impressions" value={totalImpressions} />
            </div>

            {/* Traffic by day */}
            <Card title="Page Views by Day (Last 7 Days)">
              {trafficByDay.every(([, c]) => c === 0) ? (
                <EmptyState text="No traffic data for the last 7 days." />
              ) : (
                <BarChart data={trafficByDay} />
              )}
            </Card>

            {/* Traffic by hour */}
            <Card title="Traffic by Hour of Day">
              {pageViews.length === 0 ? (
                <EmptyState text="No page view data yet." />
              ) : (
                <div className="flex items-end gap-1 h-28">
                  {trafficByHour.hours.map((count, h) => (
                    <div key={h} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-[#0a8ebc] rounded-t transition-all"
                        style={{
                          height: `${Math.max((count / trafficByHour.max) * 100, 2)}%`,
                          minHeight: 2,
                        }}
                        title={`${h}:00 — ${count} views`}
                      />
                      {h % 4 === 0 && (
                        <span className="text-[9px] text-gray-400">{h}h</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Top pages */}
            <Card title="Most Viewed Pages (Top 10)">
              {topPages.length === 0 ? (
                <EmptyState text="No page view data yet." />
              ) : (
                <BarChart data={topPages} />
              )}
            </Card>

            {/* Entry / Exit pages */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Top Entry Pages">
                {entryPages.length === 0 ? (
                  <EmptyState text="No session data yet." />
                ) : (
                  <div className="space-y-2">
                    {entryPages.map(([page, count]) => (
                      <div key={page} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{page}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              <Card title="Top Exit Pages">
                {exitPages.length === 0 ? (
                  <EmptyState text="No session data yet." />
                ) : (
                  <div className="space-y-2">
                    {exitPages.map(([page, count]) => (
                      <div key={page} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{page}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* User flows */}
            <Card title="Common User Flows (Page A -> Page B)">
              {userFlows.length === 0 ? (
                <EmptyState text="No multi-page sessions yet." />
              ) : (
                <div className="space-y-2">
                  {userFlows.map(([flow, count]) => (
                    <div key={flow} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-3 font-mono text-xs">{flow}</span>
                      <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Device breakdown + Referrers */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Device Breakdown">
                {deviceBreakdown.total === 0 ? (
                  <EmptyState text="No data yet." />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-20">Desktop</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1a2744] rounded-full"
                          style={{ width: `${(deviceBreakdown.desktop / deviceBreakdown.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#1a2744] w-16 text-right">
                        {deviceBreakdown.desktop} ({fmtPct(deviceBreakdown.desktop, deviceBreakdown.total)})
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-20">Mobile</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0a8ebc] rounded-full"
                          style={{ width: `${(deviceBreakdown.mobile / deviceBreakdown.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-[#1a2744] w-16 text-right">
                        {deviceBreakdown.mobile} ({fmtPct(deviceBreakdown.mobile, deviceBreakdown.total)})
                      </span>
                    </div>
                  </div>
                )}
              </Card>
              <Card title="Top Referrers">
                {referrerData.length === 0 ? (
                  <EmptyState text="No referrer data yet." />
                ) : (
                  <div className="space-y-2">
                    {referrerData.map(([ref, count]) => (
                      <div key={ref} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{ref}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 2: AD PERFORMANCE                                        */}
        {/* ============================================================ */}
        {tab === "adPerf" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1a2744]">Ad Performance</h2>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total Impressions" value={totalImpressions} />
              <Stat label="Total Clicks" value={totalAdClicks} />
              <Stat label="Overall CTR" value={fmtPct(totalAdClicks, totalImpressions || 1)} />
              <Stat
                label="Revenue Potential"
                value={`$${revenuePotential.low.toFixed(2)} - $${revenuePotential.high.toFixed(2)}`}
                sub="Based on $5-$15 CPM"
              />
            </div>

            {/* Impressions per format */}
            <Card title="Impressions per Ad Format">
              {adImpressions.length === 0 ? (
                <EmptyState text="No impressions yet." />
              ) : (
                <BarChart data={adImpressions} />
              )}
            </Card>

            {/* CTR per format */}
            <Card title="Click-Through Rate per Ad Format">
              {adImpressions.length === 0 ? (
                <EmptyState text="No data yet." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 text-gray-500 font-medium">Format</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Impressions</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Clicks</th>
                        <th className="text-right py-2 text-gray-500 font-medium">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adImpressions.map(([fmt, imps]) => {
                        const clicks = adClicksByFormat[fmt] || 0;
                        return (
                          <tr key={fmt} className="border-b border-gray-50">
                            <td className="py-2 text-gray-700">{fmt}</td>
                            <td className="py-2 text-right text-[#1a2744] font-semibold">{imps}</td>
                            <td className="py-2 text-right text-[#1a2744] font-semibold">{clicks}</td>
                            <td className="py-2 text-right">
                              <span className={`font-semibold ${clicks > 0 ? "text-green-600" : "text-gray-400"}`}>
                                {fmtPct(clicks, imps)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* By sponsor */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Impressions per Sponsor">
                {adImpressionsBySponsor.length === 0 ? (
                  <EmptyState text="No sponsor data yet." />
                ) : (
                  <BarChart data={adImpressionsBySponsor} color="bg-[#1a2744]" />
                )}
              </Card>
              <Card title="Clicks per Sponsor">
                {adClicksBySponsor.length === 0 ? (
                  <EmptyState text="No click data yet." />
                ) : (
                  <BarChart data={adClicksBySponsor} color="bg-green-500" />
                )}
              </Card>
            </div>

            {/* Top ad placements */}
            <Card title="Top Ad Placements (by Page Impressions)">
              {adImpressionsByPage.length === 0 ? (
                <EmptyState text="No placement data yet." />
              ) : (
                <BarChart data={adImpressionsByPage} color="bg-amber-500" />
              )}
            </Card>
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 3: CONTENT PERFORMANCE                                   */}
        {/* ============================================================ */}
        {tab === "content" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1a2744]">Content Performance</h2>

            {/* Calculators */}
            <Card title="Most Used Calculators">
              {calculatorUsage.length === 0 ? (
                <EmptyState text="No calculator usage tracked yet." />
              ) : (
                <BarChart data={calculatorUsage} />
              )}
            </Card>

            {/* Toolkit completions + Trivia */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Toolkit Completion Rates">
                {toolkitCompletions.length === 0 ? (
                  <EmptyState text="No toolkit completions yet." />
                ) : (
                  <BarChart data={toolkitCompletions} color="bg-emerald-500" />
                )}
              </Card>
              <Card title="Trivia Score Distribution">
                {triviaScores.length === 0 ? (
                  <EmptyState text="No trivia data yet." />
                ) : (
                  <>
                    <p className="text-xs text-gray-400 mb-3">{triviaScores.length} games played</p>
                    <BarChart data={triviaDistribution} color="bg-purple-500" />
                  </>
                )}
              </Card>
            </div>

            {/* Glossary + FAQ */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Most Viewed Glossary Terms">
                {glossaryViews.length === 0 ? (
                  <EmptyState text="No glossary view data yet." />
                ) : (
                  <div className="space-y-2">
                    {glossaryViews.map(([term, count]) => (
                      <div key={term} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{term}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              <Card title="Most Viewed FAQ Questions">
                {faqViews.length === 0 ? (
                  <EmptyState text="No FAQ view data yet." />
                ) : (
                  <div className="space-y-2">
                    {faqViews.map(([q, count]) => (
                      <div key={q} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{q}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Blog + County */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Most Opened Blog Articles">
                {blogViews.length === 0 ? (
                  <EmptyState text="No blog view data yet." />
                ) : (
                  <div className="space-y-2">
                    {blogViews.map(([slug, count]) => (
                      <div key={slug} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3 font-mono text-xs">{slug}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              <Card title="County Lookup Searches">
                {countyLookups.length === 0 ? (
                  <EmptyState text="No county lookup data yet." />
                ) : (
                  <div className="space-y-2">
                    {countyLookups.map(([loc, count]) => (
                      <div key={loc} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{loc}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Chatbot + Search */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="AI Chatbot Most Asked Topics">
                {chatbotTopics.length === 0 ? (
                  <EmptyState text="No chatbot data yet." />
                ) : (
                  <div className="space-y-2">
                    {chatbotTopics.map(([topic, count]) => (
                      <div key={topic} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">{topic}</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              <Card title="Top Search Queries">
                {searchQueries.length === 0 ? (
                  <EmptyState text="No search data yet." />
                ) : (
                  <div className="space-y-2">
                    {searchQueries.map(([query, count]) => (
                      <div key={query} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate mr-3">&ldquo;{query}&rdquo;</span>
                        <span className="font-semibold text-[#1a2744] shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* My Folder saves */}
            <Card title="My Folder Saves by Content Type">
              {folderSaves.length === 0 ? (
                <EmptyState text="No folder save data yet." />
              ) : (
                <BarChart data={folderSaves} color="bg-rose-500" />
              )}
            </Card>
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 4: MODULE CONTROLS                                       */}
        {/* ============================================================ */}
        {tab === "modules" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#1a2744]">Module Controls</h2>
              <p className="text-sm text-gray-500 mt-1">
                Toggle site modules on or off. Changes take effect on next page load.
              </p>
            </div>

            {MODULE_CATEGORIES.map((cat) => {
              const items = Object.entries(MODULES).filter(([, m]) => m.category === cat);
              return (
                <div key={cat}>
                  <h3 className="text-sm font-bold text-[#1a2744] mb-3 flex items-center gap-2">
                    <SectionBadge text={cat} color={CATEGORY_COLORS[cat]} />
                    <span>{cat} ({items.length})</span>
                  </h3>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                    {items.map(([key, mod]) => {
                      const enabled = config.modules[key] === undefined ? true : config.modules[key];
                      return (
                        <div key={key} className="flex items-center justify-between px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#1a2744]">{mod.label}</p>
                              <p className="text-xs text-gray-400 mt-0.5 font-mono">{key}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <SectionBadge text={mod.category} color={CATEGORY_COLORS[mod.category]} />
                            <span
                              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                enabled ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {enabled ? "Live" : "Paused"}
                            </span>
                            <Toggle enabled={enabled} onChange={() => toggleModule(key)} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 5: PAGE CONTROLS                                         */}
        {/* ============================================================ */}
        {tab === "pages" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1a2744]">Page Manager</h2>
              <p className="text-sm text-gray-500 mt-1">
                Toggle page visibility. Each page shows its analytics from tracked data.
              </p>
            </div>

            {/* Filters & bulk actions */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter:</span>
              {["All", ...PAGE_SECTIONS].map((s) => (
                <button
                  key={s}
                  onClick={() => setPageSectionFilter(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pageSectionFilter === s
                      ? "bg-[#0a8ebc] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => bulkPages(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                >
                  Enable All
                </button>
                <button
                  onClick={() => bulkPages(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  Disable All
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_80px_80px_90px_80px] gap-2 px-6 py-3 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Page</span>
                <span className="text-right">Views</span>
                <span className="text-right">Avg Time</span>
                <span className="text-right">Last Viewed</span>
                <span className="text-right">Status</span>
              </div>
              <div className="divide-y divide-gray-50">
                {filteredPages.map(({ route, label, section }) => {
                  const visible = config.pageVisibility[route] === undefined ? true : config.pageVisibility[route];
                  const views = pageViewCounts[route] || 0;
                  const lastView = pageLastViewed[route];
                  const avgTime = pageAvgTime[route];
                  return (
                    <div key={route} className="grid grid-cols-[1fr_80px_80px_90px_80px] gap-2 items-center px-6 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1a2744] truncate">{label}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[11px] text-gray-400 font-mono">{route}</p>
                          <SectionBadge text={section} />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#1a2744] text-right">{views}</span>
                      <span className="text-xs text-gray-500 text-right">
                        {avgTime ? fmtDuration(avgTime) : "--"}
                      </span>
                      <span className="text-[11px] text-gray-400 text-right">
                        {lastView ? new Date(lastView).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "--"}
                      </span>
                      <div className="flex items-center justify-end gap-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            visible ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {visible ? "On" : "Off"}
                        </span>
                        <Toggle enabled={visible} onChange={() => togglePage(route)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 6: EXPORT & SETTINGS                                     */}
        {/* ============================================================ */}
        {tab === "export" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a2744]">Export &amp; Settings</h2>

            {/* Export analytics CSV */}
            <Card title="Export Analytics CSV">
              <p className="text-xs text-gray-400 mb-4">
                Download all {events.length} tracked events as a CSV file.
              </p>
              <button
                onClick={exportCSV}
                disabled={events.length === 0}
                className="px-5 py-2.5 bg-[#0a8ebc] text-white rounded-lg font-semibold text-sm hover:bg-[#077a9e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Download CSV
              </button>
            </Card>

            {/* Export config JSON */}
            <Card title="Export Admin Config (JSON)">
              <p className="text-xs text-gray-400 mb-4">
                Download current admin configuration as a JSON backup file.
              </p>
              <button
                onClick={exportConfig}
                className="px-5 py-2.5 bg-[#1a2744] text-white rounded-lg font-semibold text-sm hover:bg-[#0f1a30] transition-colors"
              >
                Download Config
              </button>
            </Card>

            {/* Import config */}
            <Card title="Import Config from JSON">
              <p className="text-xs text-gray-400 mb-4">
                Restore a previously exported admin configuration.
              </p>
              <input
                ref={importRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) importConfig(file);
                }}
              />
              <button
                onClick={() => importRef.current?.click()}
                className="px-5 py-2.5 bg-gray-600 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
              >
                Import JSON
              </button>
            </Card>

            {/* Retention period */}
            <Card title="Analytics Retention Period">
              <p className="text-xs text-gray-400 mb-4">
                Set how long analytics data is retained. Current: {config.retentionDays === 0 ? "All time" : `${config.retentionDays} days`}
              </p>
              <div className="flex gap-2">
                {[
                  { label: "7 days", value: 7 },
                  { label: "30 days", value: 30 },
                  { label: "90 days", value: 90 },
                  { label: "All", value: 0 },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setRetention(value)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      config.retentionDays === value
                        ? "bg-[#0a8ebc] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Danger zone */}
            <div className="border border-red-200 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-red-600">Danger Zone</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={clearAnalytics}
                  className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
                >
                  Clear All Analytics
                </button>
                <button
                  onClick={clearConfig}
                  className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
                >
                  Reset Admin Config
                </button>
              </div>
              <p className="text-xs text-gray-400">
                These actions cannot be undone. Export your data first.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("hc101-admin-auth") === "1") {
        setAuthed(true);
      }
    } catch { /* empty */ }
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <Dashboard />;
}
