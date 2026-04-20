"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
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
  NewsTicker: { label: "News Ticker", category: "Global" },
  HomeClosingAI: { label: "AI Assistant", category: "Global" },
  ScrollToTop: { label: "Back to Top Button", category: "Global" },
  OnboardingTour: { label: "First-Visit Onboarding", category: "Global" },
  SponsorFooterStrip: { label: "Footer Sponsor Strip", category: "Global" },
  FirstTimeBuyerCTA: { label: "First-Time Buyer CTA", category: "Global" },
  ClosingFolderButton: { label: "My Folder Button", category: "Global" },
  StickyBottomAd: { label: "Sticky Bottom Ad", category: "Global" },
  InlineAd: { label: "Inline Sponsor Ad", category: "Ads" },
  ContextualSponsor: { label: "Contextual Sponsor", category: "Ads" },
  SponsorShowcase: { label: "Premium Showcase", category: "Ads" },
  SponsorTip: { label: "Sponsor Tips", category: "Ads" },
  SponsorBadge: { label: "Sponsor Badges", category: "Ads" },
  TrustedALTAMembers: { label: "ALTA Members Strip", category: "Ads" },
  EliteProviders: { label: "Footer Sponsors", category: "Ads" },
  JourneyTracker: { label: "Journey Tracker", category: "Features" },
  AchievementSystem: { label: "Achievements", category: "Features" },
  ShareButtons: { label: "Share Buttons", category: "Features" },
  MiniQuiz: { label: "Mini Quizzes", category: "Features" },
  DarkMode: { label: "Dark Mode Toggle", category: "Features" },
  SiteSearch: { label: "Header Search", category: "Features" },
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
/*  Supabase config helpers                                            */
/* ------------------------------------------------------------------ */

async function loadConfigFromSupabase(): Promise<AdminConfig | null> {
  try {
    const { data, error } = await supabase
      .from("hc101_site_config")
      .select("config_key, config_value")
      .in("config_key", ["modules", "pages", "ads"]);
    if (error || !data) return null;

    const cfg = defaultConfig();
    for (const row of data) {
      if (row.config_key === "modules" && typeof row.config_value === "object") {
        cfg.modules = row.config_value as Record<string, boolean>;
      }
      if (row.config_key === "pages" && typeof row.config_value === "object") {
        cfg.pageVisibility = row.config_value as Record<string, boolean>;
      }
      if (row.config_key === "ads" && typeof row.config_value === "object") {
        cfg.adToggles = row.config_value as Record<string, boolean>;
      }
    }
    return cfg;
  } catch {
    return null;
  }
}

async function saveConfigToSupabase(cfg: AdminConfig): Promise<void> {
  try {
    await Promise.all([
      supabase.from("hc101_site_config").upsert(
        { config_key: "modules", config_value: cfg.modules, updated_at: new Date().toISOString() },
        { onConflict: "config_key" }
      ),
      supabase.from("hc101_site_config").upsert(
        { config_key: "pages", config_value: cfg.pageVisibility, updated_at: new Date().toISOString() },
        { onConflict: "config_key" }
      ),
      supabase.from("hc101_site_config").upsert(
        { config_key: "ads", config_value: cfg.adToggles, updated_at: new Date().toISOString() },
        { onConflict: "config_key" }
      ),
    ]);
  } catch {
    /* Supabase unavailable — localStorage already saved */
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

function Stat({ label, value, sub, color, expandContent }: {
  label: string; value: string | number; sub?: string; color?: string;
  expandContent?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md ${expandContent ? "cursor-pointer" : ""}`}
      onClick={() => expandContent && setExpanded(!expanded)}
      title={`${label}: ${value}${sub ? ` — ${sub}` : ""}`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        {expandContent && <svg className={`w-3 h-3 text-gray-300 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
      </div>
      <p className={`text-2xl font-bold ${color || "text-[#1a2744]"}`}>{value}</p>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      {expanded && expandContent && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
          {expandContent}
        </div>
      )}
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

const BAR_COLORS = [
  "bg-[#1a2744]", "bg-[#0a8ebc]", "bg-emerald-500", "bg-amber-500",
  "bg-purple-500", "bg-red-500", "bg-[#1a2744]", "bg-[#0a8ebc]",
];

const CHART_COLORS = [
  "bg-[#0a7ea8]", "bg-[#2d6b3f]", "bg-[#5b3a8c]", "bg-[#8b6914]",
  "bg-[#943030]", "bg-[#1a5276]", "bg-[#d4a843]", "bg-[#0a7ea8]/80",
  "bg-[#2d6b3f]/80", "bg-[#5b3a8c]/80",
];
const CHART_HEX = [
  "#0a7ea8", "#2d6b3f", "#5b3a8c", "#8b6914", "#943030",
  "#1a5276", "#d4a843", "#0a7ea8", "#2d6b3f", "#5b3a8c",
];

function BarChart({
  data,
  maxVal,
  color,
  rainbow = false,
}: {
  data: [string, number][];
  maxVal?: number;
  color?: string;
  rainbow?: boolean;
}) {
  const max = maxVal ?? (data.length ? Math.max(...data.map((d) => d[1]), 1) : 1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d[1], 0);
  return (
    <div className="space-y-2">
      {data.map(([label, count], idx) => {
        const barColor = rainbow ? CHART_COLORS[idx % CHART_COLORS.length] : (color || CHART_COLORS[0]);
        const pct = max > 0 ? ((count / max) * 100).toFixed(1) : "0";
        const share = total > 0 ? ((count / total) * 100).toFixed(1) : "0";
        return (
          <div
            key={label}
            className="flex items-center gap-3 relative group cursor-default"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <span className="text-xs text-gray-600 w-44 truncate shrink-0" title={label}>
              {label}
            </span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} rounded-full transition-all duration-500`}
                style={{ width: `${Math.max(Number(pct), 1)}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#1a2744] w-14 text-right tabular-nums">
              {count.toLocaleString()}
            </span>
            {hoveredIdx === idx && (
              <div className="absolute left-48 -top-10 bg-[#1a2744] text-white text-[10px] px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50 border border-white/10">
                <div className="font-bold mb-0.5">{label}</div>
                <div>{count.toLocaleString()} — {share}% of total — {pct}% of max</div>
              </div>
            )}
          </div>
        );
      })}
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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-blue-50 text-blue-700",
    reviewed: "bg-amber-50 text-amber-700",
    resolved: "bg-green-50 text-green-700",
    dismissed: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors[status] || colors.new}`}>
      {status}
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
/*  Report types                                                       */
/* ------------------------------------------------------------------ */

interface ReportDef {
  key: string;
  title: string;
  description: string;
  audience: string;
  color: string;
  accent: string;
}

const REPORT_DEFS: ReportDef[] = [
  { key: "executive", title: "Executive Summary", description: "High-level KPIs, traffic trend, top content", audience: "Leadership", color: "bg-[#1a5276]", accent: "border-l-[#1a5276]" },
  { key: "ceo", title: "CEO Dashboard", description: "Monthly comparisons, growth metrics, strategic content performance", audience: "CEO", color: "bg-[#0a7ea8]", accent: "border-l-[#0a7ea8]" },
  { key: "it", title: "IT Team Report", description: "Browser/OS/device breakdown, error rates, performance metrics, session data", audience: "IT Team", color: "bg-[#5b3a8c]", accent: "border-l-[#5b3a8c]" },
  { key: "board", title: "Board Members Overview", description: "Engagement metrics, content reach, ad revenue potential", audience: "Board", color: "bg-[#1a5276]", accent: "border-l-[#1a5276]" },
  { key: "staff", title: "ALTA Staff Report", description: "Most used tools, feature adoption, content performance", audience: "ALTA Staff", color: "bg-[#2d6b3f]", accent: "border-l-[#2d6b3f]" },
  { key: "member", title: "ALTA Member Report", description: "Member-facing content performance, join-alta page metrics", audience: "Members", color: "bg-[#0a7ea8]", accent: "border-l-[#0a7ea8]" },
  { key: "elite", title: "Elite Provider Report", description: "Ad impressions/clicks/CTR by sponsor, placement performance", audience: "Sponsors", color: "bg-[#d4a843]", accent: "border-l-[#d4a843]" },
  { key: "adrevenue", title: "Ad Revenue Report", description: "Estimated revenue by format, by page, by time period", audience: "Finance", color: "bg-[#8b6914]", accent: "border-l-[#8b6914]" },
  { key: "contentperf", title: "Content Performance Report", description: "Page-by-page engagement, time on page, bounce rates", audience: "Content Team", color: "bg-[#2d6b3f]", accent: "border-l-[#2d6b3f]" },
  { key: "protection", title: "Protection Pages Report", description: "Fraud-related page performance, toolkit completion, county lookups", audience: "Advocacy", color: "bg-[#943030]", accent: "border-l-[#943030]" },
  { key: "calculator", title: "Calculator Usage Report", description: "Which calculators used most, completion rates", audience: "Product", color: "bg-[#5b3a8c]", accent: "border-l-[#5b3a8c]" },
  { key: "search", title: "Search & Discovery Report", description: "What people search for, popular pages, entry points", audience: "UX Team", color: "bg-[#0a7ea8]", accent: "border-l-[#0a7ea8]" },
  { key: "mobile", title: "Mobile Experience Report", description: "Mobile vs desktop metrics, mobile-specific issues", audience: "IT Team", color: "bg-[#5b3a8c]", accent: "border-l-[#5b3a8c]" },
  { key: "feedbackreport", title: "Feedback & Issues Report", description: "Bug reports, suggestions, resolution rates", audience: "Support", color: "bg-[#943030]", accent: "border-l-[#943030]" },
  { key: "weekly", title: "Weekly Digest", description: "Auto-generated summary of the past 7 days", audience: "All Teams", color: "bg-[#1a5276]", accent: "border-l-[#1a5276]" },
];

/* ------------------------------------------------------------------ */
/*  Supabase data types                                                */
/* ------------------------------------------------------------------ */

interface SBAnalytics {
  id: number;
  event_type: string;
  page: string;
  data: Record<string, string>;
  device: string;
  browser: string;
  os: string;
  referrer: string;
  session_id: string;
  screen_width: number;
  screen_height: number;
  user_agent: string;
  created_at: string;
}

interface SBFeedback {
  id: number;
  type: string;
  page: string;
  message: string;
  email: string;
  status: string;
  admin_notes: string;
  created_at: string;
  browser: string;
  device: string;
}

interface SBSession {
  id: number;
  session_id: string;
  device: string;
  browser: string;
  os: string;
  entry_page: string;
  page_count: number;
  started_at: string;
  last_active_at: string;
  referrer: string;
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

type Tab = "overview" | "adPerf" | "content" | "modules" | "pages" | "feedback" | "reports" | "export";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [config, setConfig] = useState<AdminConfig>(defaultConfig());
  const [pageSectionFilter, setPageSectionFilter] = useState("All");
  const importRef = useRef<HTMLInputElement>(null);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Supabase data
  const [sbAnalytics, setSbAnalytics] = useState<SBAnalytics[]>([]);
  const [sbFeedback, setSbFeedback] = useState<SBFeedback[]>([]);
  const [sbSessions, setSbSessions] = useState<SBSession[]>([]);
  const [feedbackFilter, setFeedbackFilter] = useState<string>("all");
  const [activeReport, setActiveReport] = useState<string | null>(null);

  // Fallback localStorage events
  const [lsEvents, setLsEvents] = useState<AnalyticsEvent[]>([]);

  /* Load data from Supabase first, localStorage fallback */
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      let connected = false;

      // Try Supabase
      try {
        const { data: analyticsData, error: aErr } = await supabase
          .from("hc101_analytics")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10000);

        if (!aErr && analyticsData) {
          setSbAnalytics(analyticsData as SBAnalytics[]);
          connected = true;
        }
      } catch { /* Supabase unavailable */ }

      try {
        const { data: feedbackData, error: fErr } = await supabase
          .from("hc101_feedback")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);

        if (!fErr && feedbackData) {
          setSbFeedback(feedbackData as SBFeedback[]);
        }
      } catch { /* empty */ }

      try {
        const { data: sessionData, error: sErr } = await supabase
          .from("hc101_sessions")
          .select("*")
          .order("started_at", { ascending: false })
          .limit(5000);

        if (!sErr && sessionData) {
          setSbSessions(sessionData as SBSession[]);
        }
      } catch { /* empty */ }

      setSupabaseConnected(connected);

      // Also load localStorage fallback
      try {
        const raw = localStorage.getItem(ANALYTICS_KEY);
        if (raw) setLsEvents(JSON.parse(raw));
      } catch { /* empty */ }

      // Load config from Supabase, fallback to localStorage
      const sbConfig = await loadConfigFromSupabase();
      if (sbConfig) {
        const localConfig = getConfig();
        // Merge: Supabase wins but keep localStorage retention setting
        const merged = { ...localConfig, ...sbConfig, retentionDays: localConfig.retentionDays };
        setConfig(merged);
        saveConfig(merged);
      } else {
        setConfig(getConfig());
      }

      setLoading(false);
    }
    loadData();
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Unified events: Supabase data or localStorage fallback           */
  /* ---------------------------------------------------------------- */

  const events: AnalyticsEvent[] = useMemo(() => {
    if (sbAnalytics.length > 0) {
      return sbAnalytics.map((e) => ({
        type: e.event_type,
        page: e.page,
        data: e.data || {},
        timestamp: e.created_at,
        device: (e.device as "mobile" | "desktop") || "desktop",
        browser: e.browser || "",
        os: e.os || "",
        referrer: e.referrer || "",
        session_id: e.session_id || "",
        screen_width: e.screen_width,
        screen_height: e.screen_height,
        user_agent: e.user_agent || "",
      }));
    }
    return lsEvents;
  }, [sbAnalytics, lsEvents]);

  /* ---------------------------------------------------------------- */
  /*  ANALYTICS COMPUTATIONS                                           */
  /* ---------------------------------------------------------------- */

  const pageViews = useMemo(() => events.filter((e) => e.type === "page_view"), [events]);
  const uniquePages = useMemo(() => new Set(pageViews.map((e) => e.page)).size, [pageViews]);

  /* Sessions from Supabase or computed from events */
  const sessions = useMemo(() => {
    if (sbSessions.length > 0) {
      return sbSessions;
    }
    // Fallback: compute from events
    const map: Record<string, AnalyticsEvent[]> = {};
    events.forEach((e) => {
      const sid = e.session_id || "unknown";
      if (!map[sid]) map[sid] = [];
      map[sid].push(e);
    });
    return Object.entries(map).map(([sid, evts]) => ({
      id: 0,
      session_id: sid,
      device: evts[0]?.device || "desktop",
      browser: evts[0]?.browser || "",
      os: evts[0]?.os || "",
      entry_page: evts.filter((e) => e.type === "page_view").sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )[0]?.page || "",
      page_count: evts.filter((e) => e.type === "page_view").length,
      started_at: evts[0]?.timestamp || "",
      last_active_at: evts[evts.length - 1]?.timestamp || "",
      referrer: evts[0]?.referrer || "",
    }));
  }, [sbSessions, events]);

  const sessionCount = sessions.length;

  const avgPagesPerSession = useMemo(() => {
    if (!sessions.length) return 0;
    const total = sessions.reduce((sum, s) => sum + (s.page_count || 1), 0);
    return total / sessions.length;
  }, [sessions]);

  const bounceRate = useMemo(() => {
    if (!sessions.length) return 0;
    const bounces = sessions.filter((s) => s.page_count <= 1).length;
    return bounces / sessions.length;
  }, [sessions]);

  /* Top pages */
  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => { counts[e.page] = (counts[e.page] || 0) + 1; });
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
    sessions.forEach((s) => {
      if (s.entry_page) counts[s.entry_page] = (counts[s.entry_page] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [sessions]);

  /* Device breakdown */
  const deviceBreakdown = useMemo(() => {
    let mobile = 0, desktop = 0;
    pageViews.forEach((e) => { if (e.device === "mobile") mobile++; else desktop++; });
    return { mobile, desktop, total: mobile + desktop };
  }, [pageViews]);

  /* Browser breakdown */
  const browserBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      const b = e.browser || "Unknown";
      counts[b] = (counts[b] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [pageViews]);

  /* OS breakdown */
  const osBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      const o = e.os || "Unknown";
      counts[o] = (counts[o] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [pageViews]);

  /* Referrer tracking */
  const referrerData = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      const ref = e.referrer || "";
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

  /* Content Velocity: trending pages (last 7d vs previous 7d) */
  const contentVelocity = useMemo(() => {
    const last7Start = daysAgo(7).getTime();
    const prev7Start = daysAgo(14).getTime();
    const last7Counts: Record<string, number> = {};
    const prev7Counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      const t = new Date(e.timestamp).getTime();
      if (t >= last7Start) {
        last7Counts[e.page] = (last7Counts[e.page] || 0) + 1;
      } else if (t >= prev7Start && t < last7Start) {
        prev7Counts[e.page] = (prev7Counts[e.page] || 0) + 1;
      }
    });
    const allPages = new Set([...Object.keys(last7Counts), ...Object.keys(prev7Counts)]);
    const velocity: { page: string; current: number; previous: number; change: number }[] = [];
    allPages.forEach((page) => {
      const current = last7Counts[page] || 0;
      const previous = prev7Counts[page] || 0;
      const change = previous > 0 ? Math.round(((current - previous) / previous) * 100) : (current > 0 ? 100 : 0);
      velocity.push({ page, current, previous, change });
    });
    velocity.sort((a, b) => b.change - a.change);
    return {
      trending: velocity.filter((v) => v.change > 0).slice(0, 5).map((v) => [v.page + " (+" + v.change + "%)", v.current] as [string, number]),
      declining: velocity.filter((v) => v.change < 0).sort((a, b) => a.change - b.change).slice(0, 5).map((v) => [v.page + " (" + v.change + "%)", v.current] as [string, number]),
    };
  }, [pageViews]);

  /* Average Time on Site */
  const avgTimeOnSite = useMemo(() => {
    const durations = sessions
      .filter((s) => s.started_at && s.last_active_at)
      .map((s) => new Date(s.last_active_at).getTime() - new Date(s.started_at).getTime())
      .filter((d) => d > 0 && d < 3600000);
    if (!durations.length) return "N/A";
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    return fmtDuration(avg);
  }, [sessions]);

  /* Peak Hour */
  const peakHour = useMemo(() => {
    if (pageViews.length === 0) return { hour: 0, count: 0 };
    const hours = new Array(24).fill(0) as number[];
    pageViews.forEach((e) => { hours[new Date(e.timestamp).getHours()]++; });
    const maxCount = Math.max(...hours);
    const maxHour = hours.indexOf(maxCount);
    return { hour: maxHour, count: maxCount };
  }, [pageViews]);

  /* Most Active Day of Week */
  const mostActiveDay = useMemo(() => {
    if (pageViews.length === 0) return { day: "N/A", count: 0 };
    const days = new Array(7).fill(0) as number[];
    pageViews.forEach((e) => { days[new Date(e.timestamp).getDay()]++; });
    const maxCount = Math.max(...days);
    const maxDay = days.indexOf(maxCount);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return { day: dayNames[maxDay], count: maxCount };
  }, [pageViews]);

  /* Traffic by Day of Week (for chart) */
  const trafficByDayOfWeek = useMemo(() => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const days = new Array(7).fill(0) as number[];
    pageViews.forEach((e) => { days[new Date(e.timestamp).getDay()]++; });
    return dayNames.map((name, i) => [name, days[i]] as [string, number]);
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

  const searchQueries = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "search_performed").forEach((e) => {
      const q = (e.data?.query || "").toLowerCase().trim();
      if (q) counts[q] = (counts[q] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);
  }, [events]);

  const countyLookups = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "county_lookup").forEach((e) => {
      const loc = e.data?.state ? `${e.data.state} - ${e.data.county || "All"}` : e.data?.query || "Unknown";
      counts[loc] = (counts[loc] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [events]);

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

  const chatbotTopics = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "chatbot_query").forEach((e) => {
      const topic = e.data?.topic || e.data?.query || "General";
      counts[topic] = (counts[topic] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  }, [events]);

  const folderSaves = useMemo(() => {
    const counts: Record<string, number> = {};
    events.filter((e) => e.type === "folder_save").forEach((e) => {
      const t = e.data?.content_type || e.data?.type || "Unknown";
      counts[t] = (counts[t] || 0) + 1;
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

  /* ---------------------------------------------------------------- */
  /*  PAGE VIEW COUNTS (for page manager)                              */
  /* ---------------------------------------------------------------- */

  const pageViewCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => { counts[e.page] = (counts[e.page] || 0) + 1; });
    return counts;
  }, [pageViews]);

  const pageLastViewed = useMemo(() => {
    const last: Record<string, string> = {};
    pageViews.forEach((e) => {
      if (!last[e.page] || e.timestamp > last[e.page]) last[e.page] = e.timestamp;
    });
    return last;
  }, [pageViews]);

  /* ---------------------------------------------------------------- */
  /*  FEEDBACK HELPERS                                                 */
  /* ---------------------------------------------------------------- */

  const filteredFeedback = useMemo(() => {
    if (feedbackFilter === "all") return sbFeedback;
    return sbFeedback.filter((f) => f.type === feedbackFilter);
  }, [sbFeedback, feedbackFilter]);

  const updateFeedbackStatus = useCallback(async (id: number, status: string) => {
    try {
      await supabase.from("hc101_feedback").update({ status }).eq("id", id);
      setSbFeedback((prev) => prev.map((f) => f.id === id ? { ...f, status } : f));
    } catch { /* Supabase unavailable */ }
  }, []);

  /* ---------------------------------------------------------------- */
  /*  ACTIONS                                                          */
  /* ---------------------------------------------------------------- */

  const persistConfig = useCallback((next: AdminConfig) => {
    saveConfig(next);
    saveConfigToSupabase(next);
  }, []);

  const toggleAd = useCallback((key: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        adToggles: {
          ...prev.adToggles,
          [key]: prev.adToggles[key] === undefined ? false : !prev.adToggles[key],
        },
      };
      persistConfig(next);
      return next;
    });
  }, [persistConfig]);

  const togglePage = useCallback((route: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        pageVisibility: {
          ...prev.pageVisibility,
          [route]: prev.pageVisibility[route] === undefined ? false : !prev.pageVisibility[route],
        },
      };
      persistConfig(next);
      return next;
    });
  }, [persistConfig]);

  const toggleModule = useCallback((key: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        modules: {
          ...prev.modules,
          [key]: prev.modules[key] === undefined ? false : !prev.modules[key],
        },
      };
      persistConfig(next);
      return next;
    });
  }, [persistConfig]);

  const bulkPages = useCallback((enable: boolean) => {
    setConfig((prev) => {
      const vis: Record<string, boolean> = {};
      ALL_PAGES.forEach(({ route }) => { vis[route] = enable; });
      const next = { ...prev, pageVisibility: vis };
      persistConfig(next);
      return next;
    });
  }, [persistConfig]);

  /* CSV export */
  const exportCSV = useCallback(() => {
    const header = "type,page,timestamp,device,browser,os,referrer,session_id,data\n";
    const rows = events
      .map((e) => {
        const dataStr = Object.entries(e.data || {}).map(([k, v]) => `${k}=${v}`).join("; ");
        return `"${e.type}","${e.page}","${e.timestamp}","${e.device || ""}","${e.browser || ""}","${e.os || ""}","${(e.referrer || "").replace(/"/g, '""')}","${e.session_id || ""}","${dataStr.replace(/"/g, '""')}"`;
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

  const exportReportCSV = useCallback((reportKey: string, data: [string, number][]) => {
    const header = "label,value\n";
    const rows = data.map(([label, val]) => `"${label.replace(/"/g, '""')}",${val}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hc101-report-${reportKey}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

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
        persistConfig(merged);
        setConfig(merged);
      } catch {
        alert("Invalid config file.");
      }
    };
    reader.readAsText(file);
  }, [persistConfig]);

  const clearAnalytics = useCallback(() => {
    if (confirm("Clear all analytics data? This cannot be undone.")) {
      try { localStorage.removeItem(ANALYTICS_KEY); } catch { /* empty */ }
      setSbAnalytics([]);
      setLsEvents([]);
    }
  }, []);

  const clearConfig = useCallback(() => {
    if (confirm("Reset all admin config (toggles, settings)? This cannot be undone.")) {
      try { localStorage.removeItem(CONFIG_KEY); } catch { /* empty */ }
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
  /*  Report data generators                                           */
  /* ---------------------------------------------------------------- */

  const getReportData = useCallback((key: string): { sections: { title: string; data: [string, number][] }[]; narrative: string; recommendations: string[] } => {
    const pvCount = pageViews.length;
    const last7 = pageViews.filter((e) => new Date(e.timestamp).getTime() >= daysAgo(7).getTime());
    const last30 = pageViews.filter((e) => new Date(e.timestamp).getTime() >= daysAgo(30).getTime());
    const prev7 = pageViews.filter((e) => { const t = new Date(e.timestamp).getTime(); return t >= daysAgo(14).getTime() && t < daysAgo(7).getTime(); });
    const protectionPages = ["/property-rights", "/protect-against-deed-fraud", "/deed-theft", "/stop-fraud", "/identity-protection", "/protect-your-money", "/protect-your-rights"];
    const calcPages = ["/mortgage-calculator", "/dti-calculator", "/rent-vs-buy", "/compare-loans", "/true-cost", "/affordability"];
    const mobilePercent = deviceBreakdown.total ? Math.round((deviceBreakdown.mobile / deviceBreakdown.total) * 100) : 0;
    const bouncePercent = Math.round(bounceRate * 100);
    const weekGrowth = prev7.length > 0 ? Math.round(((last7.length - prev7.length) / prev7.length) * 100) : 0;
    const avgSessionDurMs = (() => {
      const durations = sessions.filter((s) => s.started_at && s.last_active_at).map((s) => new Date(s.last_active_at).getTime() - new Date(s.started_at).getTime()).filter((d) => d > 0 && d < 3600000);
      return durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
    })();
    const avgSessionDurStr = avgSessionDurMs > 0 ? fmtDuration(avgSessionDurMs) : "N/A";
    const topBrowser = browserBreakdown[0]?.[0] || "Unknown";
    const topBrowserPct = browserBreakdown[0] && deviceBreakdown.total ? Math.round((browserBreakdown[0][1] / deviceBreakdown.total) * 100) : 0;
    const overallCTR = totalImpressions > 0 ? ((totalAdClicks / totalImpressions) * 100).toFixed(1) : "0.0";

    switch (key) {
      case "executive":
        return {
          sections: [
            { title: "Key Performance Indicators", data: [["Total Page Views", pvCount], ["Unique Pages Viewed", uniquePages], ["Total Sessions", sessionCount], ["Avg Pages/Session", Math.round(avgPagesPerSession * 10) / 10]] },
            { title: "Top Content (Top 5)", data: topPages.slice(0, 5) },
            { title: "Traffic Trend (7 Days)", data: trafficByDay },
          ],
          narrative: `HomeClosing101 received ${pvCount.toLocaleString()} page views across ${uniquePages} pages this period, with an average of ${avgPagesPerSession.toFixed(1)} pages per session. ${bouncePercent > 50 ? 'The bounce rate of ' + bouncePercent + '% suggests users may need more engaging entry points.' : 'The bounce rate of ' + bouncePercent + '% indicates strong content engagement.'} ${deviceBreakdown.mobile > deviceBreakdown.desktop ? 'Mobile traffic exceeds desktop — ensure mobile experience is prioritized.' : 'Desktop traffic leads — but mobile optimization remains important.'} Top performing content: ${topPages[0]?.[0] || 'N/A'}.`,
          recommendations: [
            bouncePercent > 50 ? "Consider adding more engaging calls-to-action on high-bounce pages to improve the " + bouncePercent + "% bounce rate." : "Bounce rate is healthy at " + bouncePercent + "% — maintain current engagement strategies.",
            mobilePercent > 60 ? "Mobile traffic is " + mobilePercent + "% — prioritize mobile-first design improvements." : mobilePercent < 30 ? "Mobile traffic is only " + mobilePercent + "% — consider mobile marketing campaigns to grow this segment." : "Device distribution is balanced (" + mobilePercent + "% mobile) — continue optimizing for both platforms.",
            topPages.length > 0 ? `Leverage top-performing page "${topPages[0][0]}" (${topPages[0][1].toLocaleString()} views) as a model for underperforming content.` : "Collect more traffic data to identify content optimization opportunities.",
          ],
        };
      case "ceo":
        return {
          sections: [
            { title: "Monthly Overview", data: [["Total Views (30d)", last30.length], ["Total Views (7d)", last7.length], ["Sessions", sessionCount], ["Ad Impressions", totalImpressions]] },
            { title: "Growth Indicators", data: [["Unique Pages", uniquePages], ["Bounce Rate %", bouncePercent], ["Mobile %", mobilePercent]] },
            { title: "Strategic Content", data: topPages.slice(0, 5) },
          ],
          narrative: `Week-over-week traffic ${weekGrowth >= 0 ? 'grew' : 'declined'} by ${Math.abs(weekGrowth)}% (${last7.length.toLocaleString()} views this week vs ${prev7.length.toLocaleString()} prior week). The strongest content pillar is "${topPages[0]?.[0] || 'N/A'}" with ${topPages[0]?.[1]?.toLocaleString() || '0'} views. ${totalImpressions > 0 ? 'Ad revenue potential is $' + revenuePotential.low.toFixed(2) + '-$' + revenuePotential.high.toFixed(2) + ' based on current ' + totalImpressions.toLocaleString() + ' impressions.' : 'Ad inventory has not yet generated impressions.'} Session engagement averages ${avgPagesPerSession.toFixed(1)} pages per visit.`,
          recommendations: [
            weekGrowth < 0 ? "Traffic declined " + Math.abs(weekGrowth) + "% week-over-week — investigate content freshness and promotion strategy." : "Traffic growth of " + weekGrowth + "% is positive — double down on content promotion channels driving the increase.",
            `Invest in content similar to top performer "${topPages[0]?.[0] || 'homepage'}" to replicate its success across other sections.`,
            totalImpressions > 100 ? "Current ad inventory supports revenue growth — consider premium placement packages for sponsors." : "Grow page views to increase ad inventory and unlock revenue potential.",
          ],
        };
      case "it":
        return {
          sections: [
            { title: "Browser Distribution", data: browserBreakdown },
            { title: "OS Distribution", data: osBreakdown },
            { title: "Device Split", data: [["Desktop", deviceBreakdown.desktop], ["Mobile", deviceBreakdown.mobile]] },
            { title: "Sessions Overview", data: [["Total Sessions", sessionCount], ["Avg Pages/Session", Math.round(avgPagesPerSession * 10) / 10], ["Bounce Rate %", bouncePercent]] },
          ],
          narrative: `${topBrowserPct}% of sessions are from ${topBrowser}${browserBreakdown[1] ? ', ' + Math.round((browserBreakdown[1][1] / (deviceBreakdown.total || 1)) * 100) + '% from ' + browserBreakdown[1][0] : ''}. Mobile represents ${mobilePercent}% of traffic. ${browserBreakdown.length <= 3 ? 'No critical browser compatibility issues detected — limited browser diversity.' : 'Multiple browser variants detected — ensure cross-browser testing covers top 3.'} Session duration averages ${avgSessionDurStr}.`,
          recommendations: [
            browserBreakdown.length > 4 ? "Test critical user flows in the top 3 browsers (" + browserBreakdown.slice(0, 3).map(([b]) => b).join(", ") + ") as they account for the majority of traffic." : "Browser diversity is low — focus testing on " + topBrowser + ".",
            mobilePercent > 50 ? "Mobile-majority traffic (" + mobilePercent + "%) — prioritize mobile performance monitoring and responsive design audits." : "Desktop-leaning traffic — ensure desktop experience remains fast and polished.",
            avgSessionDurMs > 0 && avgSessionDurMs < 30000 ? "Average session duration is under 30 seconds — investigate page load performance and initial content visibility." : "Monitor Core Web Vitals regularly to maintain user experience standards.",
          ],
        };
      case "board":
        return {
          sections: [
            { title: "Engagement Metrics", data: [["Total Page Views", pvCount], ["Sessions", sessionCount], ["Pages/Session", Math.round(avgPagesPerSession * 10) / 10]] },
            { title: "Content Reach (Top 10)", data: topPages },
            { title: "Ad Revenue Potential", data: [["Total Impressions", totalImpressions], ["Total Clicks", totalAdClicks], ["Est. Revenue Low ($)", Math.round(revenuePotential.low * 100) / 100], ["Est. Revenue High ($)", Math.round(revenuePotential.high * 100) / 100]] },
          ],
          narrative: `HC101 reached ${sessionCount.toLocaleString()} unique sessions with ${pvCount.toLocaleString()} page views. Ad revenue potential at current traffic: $${revenuePotential.low.toFixed(2)}-$${revenuePotential.high.toFixed(2)} per period at industry CPM rates ($5-$15). Users engage with an average of ${avgPagesPerSession.toFixed(1)} pages per session, ${bouncePercent < 50 ? 'demonstrating strong content stickiness' : 'with room to improve content stickiness'}.`,
          recommendations: [
            totalImpressions > 0 ? "Current traffic supports estimated ad revenue of $" + revenuePotential.low.toFixed(2) + "-$" + revenuePotential.high.toFixed(2) + " — consider formalizing a sponsorship sales strategy." : "Grow traffic to unlock ad revenue potential — target 10,000+ monthly impressions for viable sponsorship packages.",
            `Content library spans ${uniquePages} active pages — evaluate expanding into adjacent topics to broaden audience reach.`,
            bouncePercent > 50 ? "Reduce bounce rate from " + bouncePercent + "% to improve engagement metrics for potential sponsors." : "Strong engagement metrics position HC101 well for sponsor conversations.",
          ],
        };
      case "staff":
        return {
          sections: [
            { title: "Most Used Tools", data: calculatorUsage.length ? calculatorUsage : [["No data yet", 0]] },
            { title: "Search Queries", data: searchQueries.length ? searchQueries.slice(0, 10) : [["No data yet", 0]] },
            { title: "Content Performance", data: topPages.slice(0, 10) },
          ],
          narrative: `The site offers ${uniquePages} active pages with ${pvCount.toLocaleString()} total views. ${calculatorUsage.length > 0 ? 'The most popular tool is "' + calculatorUsage[0][0] + '" with ' + calculatorUsage[0][1].toLocaleString() + ' uses.' : 'Calculator usage data has not yet been collected.'} ${searchQueries.length > 0 ? 'Users most frequently search for "' + searchQueries[0][0] + '", indicating strong interest in this topic.' : 'No search queries recorded yet.'} Feature adoption across tools and interactive elements continues to grow.`,
          recommendations: [
            calculatorUsage.length > 1 ? "Promote underutilized calculators — the least used tool could benefit from homepage visibility or cross-linking." : "Encourage calculator usage by adding prominent CTAs on relevant content pages.",
            searchQueries.length > 0 ? `Users are searching for "${searchQueries[0][0]}" most often — ensure this content is easy to find and comprehensive.` : "Enable search tracking to understand user intent and content gaps.",
            topPages.length >= 5 ? "The bottom half of the top 10 pages receive significantly less traffic — consider refreshing or cross-linking these pages." : "Build out content to provide comprehensive coverage of the closing process.",
          ],
        };
      case "member": {
        const joinViews = pageViewCounts["/join-alta"] || 0;
        const findCompanyViews = pageViewCounts["/find-company"] || 0;
        const findPolicyViews = pageViewCounts["/find-policy"] || 0;
        const memberTotal = joinViews + findCompanyViews + findPolicyViews;
        return {
          sections: [
            { title: "Member Content Performance", data: topPages.filter(([p]) => ["/join-alta", "/find-company", "/find-policy", "/resources"].includes(p)).concat(topPages.filter(([p]) => !["/join-alta", "/find-company", "/find-policy", "/resources"].includes(p)).slice(0, 5)) },
            { title: "Join ALTA Page", data: [["Views", joinViews]] },
          ],
          narrative: `Member-focused pages received ${memberTotal.toLocaleString()} combined views. The "Join ALTA" page has ${joinViews} views, "Find a Company" has ${findCompanyViews} views, and "Find a Policy" has ${findPolicyViews} views. ${joinViews > findCompanyViews ? 'The membership page outperforms directory pages, suggesting strong brand interest.' : 'Directory tools receive more traffic than the membership page — consider adding membership CTAs to directory results.'}`,
          recommendations: [
            joinViews < 10 ? "The Join ALTA page has low visibility — add prominent CTAs or banners on high-traffic pages to drive membership interest." : "Join ALTA page traffic is healthy — consider A/B testing the page layout to improve conversion.",
            findCompanyViews > 0 || findPolicyViews > 0 ? "Directory tools are being used — ensure company/policy data is current and comprehensive." : "Promote the Find a Company and Find a Policy tools more prominently to drive usage.",
            "Cross-link member benefits content throughout educational pages to reinforce ALTA's value proposition.",
          ],
        };
      }
      case "elite": {
        const topSponsor = adImpressionsBySponsor[0];
        const topSponsorClicks = topSponsor ? (adClicksBySponsor.find(([s]) => s === topSponsor[0])?.[1] || 0) : 0;
        const topSponsorCTR = topSponsor && topSponsor[1] > 0 ? ((topSponsorClicks / topSponsor[1]) * 100).toFixed(1) : "0.0";
        return {
          sections: [
            { title: "Impressions by Sponsor", data: adImpressionsBySponsor.length ? adImpressionsBySponsor : [["No data yet", 0]] },
            { title: "Clicks by Sponsor", data: adClicksBySponsor.length ? adClicksBySponsor : [["No data yet", 0]] },
            { title: "Placement Performance", data: adImpressionsByPage.length ? adImpressionsByPage : [["No data yet", 0]] },
          ],
          narrative: `${topSponsor ? 'Sponsor "' + topSponsor[0] + '" received ' + topSponsor[1].toLocaleString() + ' impressions with ' + topSponsorClicks + ' clicks (' + topSponsorCTR + '% CTR).' : 'No sponsor impression data available yet.'} ${adImpressionsByPage.length > 0 ? 'Top performing placement: ' + adImpressionsByPage[0][0] + ' with ' + adImpressionsByPage[0][1].toLocaleString() + ' impressions.' : ''} Overall CTR across all sponsors is ${overallCTR}%. ${adImpressionsBySponsor.length > 1 ? 'There are ' + adImpressionsBySponsor.length + ' active sponsors in the rotation.' : ''}`,
          recommendations: [
            parseFloat(overallCTR) < 0.5 ? "Overall CTR of " + overallCTR + "% is below industry average (0.5-1.0%) — consider refreshing ad creative and improving placement visibility." : "CTR of " + overallCTR + "% is competitive — maintain current placement strategy.",
            adImpressionsByPage.length > 1 ? `Optimize underperforming placements — "${adImpressionsByPage[adImpressionsByPage.length - 1][0]}" has the fewest impressions and may need better page positioning.` : "Expand ad placements to additional high-traffic pages to increase sponsor visibility.",
            adImpressionsBySponsor.length > 0 ? "Provide sponsors with monthly performance reports to demonstrate ROI and support renewal conversations." : "Begin tracking sponsor impressions to build a data-driven sponsorship program.",
          ],
        };
      }
      case "adrevenue": {
        const estRevAvg = Math.round((totalImpressions / 1000) * 10 * 100) / 100;
        const topFormat = adImpressions[0];
        return {
          sections: [
            { title: "Revenue by Format", data: adImpressions.map(([fmt, imps]) => [fmt, Math.round((imps / 1000) * 10 * 100) / 100] as [string, number]) },
            { title: "Revenue by Page", data: adImpressionsByPage.map(([p, imps]) => [p, Math.round((imps / 1000) * 10 * 100) / 100] as [string, number]) },
            { title: "Summary", data: [["Total Impressions", totalImpressions], ["Total Clicks", totalAdClicks], ["Est. Revenue (Avg CPM $10)", estRevAvg]] },
          ],
          narrative: `Total ad inventory generated ${totalImpressions.toLocaleString()} impressions and ${totalAdClicks.toLocaleString()} clicks, yielding an estimated $${revenuePotential.low.toFixed(2)}-$${revenuePotential.high.toFixed(2)} in revenue at $5-$15 CPM. ${topFormat ? 'The "' + topFormat[0] + '" format is the highest earner with ' + topFormat[1].toLocaleString() + ' impressions ($' + (Math.round((topFormat[1] / 1000) * 10 * 100) / 100).toFixed(2) + ' est. revenue at $10 CPM).' : 'No format-level data available.'} Click-through rate stands at ${overallCTR}%.`,
          recommendations: [
            topFormat && adImpressions.length > 1 ? `The "${topFormat[0]}" format generates the most revenue — consider expanding its placement to additional pages.` : "Diversify ad formats to maximize revenue across different content types.",
            totalAdClicks > 0 && parseFloat(overallCTR) < 1.0 ? "CTR of " + overallCTR + "% has room for improvement — test different ad creative, sizing, and placement positions." : totalAdClicks === 0 ? "No clicks recorded yet — ensure ad links are properly configured and trackable." : "Healthy CTR — continue current strategy.",
            adImpressionsByPage.length > 3 ? "Consolidate ad efforts on the top 3-5 pages that drive the most impressions to maximize revenue efficiency." : "Expand ad placements to more pages to grow total impression inventory.",
          ],
        };
      }
      case "contentperf": {
        const totalGlossary = glossaryViews.reduce((s, [, c]) => s + c, 0);
        const totalFaq = faqViews.reduce((s, [, c]) => s + c, 0);
        return {
          sections: [
            { title: "Page Views (Top 10)", data: topPages },
            { title: "Glossary Views", data: glossaryViews.length ? glossaryViews.slice(0, 10) : [["No data yet", 0]] },
            { title: "FAQ Views", data: faqViews.length ? faqViews.slice(0, 10) : [["No data yet", 0]] },
            { title: "Blog Views", data: blogViews.length ? blogViews : [["No data yet", 0]] },
          ],
          narrative: `The content library spans ${uniquePages} pages with ${pvCount.toLocaleString()} total views. ${topPages[0] ? '"' + topPages[0][0] + '" leads with ' + topPages[0][1].toLocaleString() + ' views.' : ''} The glossary has generated ${totalGlossary.toLocaleString()} term lookups${glossaryViews[0] ? ' (top term: "' + glossaryViews[0][0] + '")' : ''}. FAQ engagement totals ${totalFaq.toLocaleString()} views${faqViews[0] ? ' with "' + faqViews[0][0] + '" as the most viewed question' : ''}.`,
          recommendations: [
            topPages.length >= 2 && topPages[0][1] > topPages[1][1] * 3 ? `Traffic is heavily concentrated on "${topPages[0][0]}" — distribute internal links to drive traffic to underperforming pages.` : "Content traffic is well distributed — continue cross-linking strategy.",
            glossaryViews.length > 0 ? `The glossary term "${glossaryViews[0][0]}" is most popular — consider creating dedicated deep-dive content around this topic.` : "Encourage glossary usage by linking key terms inline throughout educational content.",
            blogViews.length > 0 ? "Blog content is generating engagement — maintain a consistent publishing schedule to sustain growth." : "Invest in blog content to capture long-tail search traffic and improve SEO.",
          ],
        };
      }
      case "protection": {
        const protectionData: [string, number][] = protectionPages.map((p) => [p, pageViewCounts[p] || 0]);
        const totalProtViews = protectionData.reduce((s, [, c]) => s + c, 0);
        const topProtPage = protectionData.sort((a, b) => b[1] - a[1])[0];
        const protectionDataSorted: [string, number][] = protectionPages.map((p) => [p, pageViewCounts[p] || 0]);
        return {
          sections: [
            { title: "Protection Page Views", data: protectionDataSorted },
            { title: "Toolkit Completions", data: toolkitCompletions.length ? toolkitCompletions : [["No data yet", 0]] },
            { title: "County Lookups", data: countyLookups.length ? countyLookups.slice(0, 10) : [["No data yet", 0]] },
          ],
          narrative: `Protection and fraud-prevention content received ${totalProtViews.toLocaleString()} total views across ${protectionPages.length} pages. ${topProtPage ? '"' + topProtPage[0] + '" leads with ' + topProtPage[1].toLocaleString() + ' views.' : ''} ${toolkitCompletions.length > 0 ? 'The Protection Toolkit has ' + toolkitCompletions.reduce((s, [, c]) => s + c, 0) + ' completions.' : 'No toolkit completions recorded yet.'} ${countyLookups.length > 0 ? 'County lookup tool has been used ' + countyLookups.reduce((s, [, c]) => s + c, 0) + ' times, with ' + countyLookups[0][0] + ' as the most searched area.' : 'County lookup tool has not been used yet.'}`,
          recommendations: [
            totalProtViews < pvCount * 0.1 ? "Protection content represents less than 10% of total traffic — consider promoting fraud awareness through homepage banners or email campaigns." : "Protection content has strong engagement — this is a key differentiator for HC101.",
            toolkitCompletions.length === 0 ? "The Protection Toolkit has no completions — simplify the user flow or add progress indicators to encourage completion." : "Toolkit completions are tracking — add a congratulatory CTA at completion to drive sharing.",
            countyLookups.length > 0 ? `"${countyLookups[0][0]}" is the most searched area — consider creating localized content for high-interest counties.` : "Promote the County Lookup tool on protection pages to increase utility engagement.",
          ],
        };
      }
      case "calculator": {
        const calcData: [string, number][] = calcPages.map((p) => [p, pageViewCounts[p] || 0]);
        const totalCalcViews = calcData.reduce((s, [, c]) => s + c, 0);
        const topCalc = calcData.sort((a, b) => b[1] - a[1])[0];
        const leastCalc = [...calcData].sort((a, b) => a[1] - b[1])[0];
        const calcDataSorted: [string, number][] = calcPages.map((p) => [p, pageViewCounts[p] || 0]);
        return {
          sections: [
            { title: "Calculator Page Views", data: calcDataSorted },
            { title: "Calculator Usage Events", data: calculatorUsage.length ? calculatorUsage : [["No data yet", 0]] },
          ],
          narrative: `Calculator tools received ${totalCalcViews.toLocaleString()} total page views across ${calcPages.length} tools. ${topCalc ? '"' + topCalc[0] + '" is the most visited with ' + topCalc[1].toLocaleString() + ' views.' : ''} ${leastCalc ? '"' + leastCalc[0] + '" has the lowest usage at ' + leastCalc[1].toLocaleString() + ' views.' : ''} ${calculatorUsage.length > 0 ? 'Active calculator submissions total ' + calculatorUsage.reduce((s, [, c]) => s + c, 0).toLocaleString() + ' events.' : 'No calculator submission events recorded yet.'}`,
          recommendations: [
            leastCalc && leastCalc[1] < 5 ? `Promote the "${leastCalc[0]}" calculator — it has the lowest usage among tools. Consider homepage placement or contextual cross-links.` : "Calculator usage is balanced across tools — good variety in user engagement.",
            calculatorUsage.length > 0 ? "Calculator tools drive interactive engagement — consider adding save/share functionality to completed calculations." : "Enable event tracking on calculator submissions to measure actual usage beyond page views.",
            totalCalcViews > 0 ? "Calculators are a traffic driver — consider building additional tools (e.g., PMI calculator, refinance savings calculator) to expand the toolset." : "Drive traffic to calculator pages through educational content cross-linking.",
          ],
        };
      }
      case "search":
        return {
          sections: [
            { title: "Search Queries", data: searchQueries.length ? searchQueries : [["No data yet", 0]] },
            { title: "Popular Pages (Entry Points)", data: entryPages.length ? entryPages : [["No data yet", 0]] },
            { title: "Top Pages Overall", data: topPages.slice(0, 10) },
          ],
          narrative: `${searchQueries.length > 0 ? 'Users performed ' + searchQueries.reduce((s, [, c]) => s + c, 0).toLocaleString() + ' searches, with "' + searchQueries[0][0] + '" as the most common query.' : 'No search queries recorded yet.'} ${entryPages.length > 0 ? 'The top entry point is "' + entryPages[0][0] + '" with ' + entryPages[0][1].toLocaleString() + ' sessions starting there.' : 'No entry page data available.'} ${topPages.length > 0 ? 'Overall, "' + topPages[0][0] + '" remains the most visited page.' : ''} Search behavior reveals what users cannot easily find through navigation.`,
          recommendations: [
            searchQueries.length > 0 ? `Users frequently search for "${searchQueries[0][0]}" — make this content more prominently accessible from navigation or homepage.` : "Implement and promote site search to understand user intent and content gaps.",
            entryPages.length > 1 ? `"${entryPages[0][0]}" is the primary entry point — ensure it has clear pathways to deeper content to reduce bounce rate.` : "Diversify entry points through SEO optimization of educational content pages.",
            searchQueries.length > 5 ? "The variety of search queries suggests users explore diverse topics — consider an AI-powered search to improve discovery." : "Expand content to cover a broader range of closing-related topics.",
          ],
        };
      case "mobile": {
        const mobilePVs = pageViews.filter((e) => e.device === "mobile");
        const desktopPVs = pageViews.filter((e) => e.device !== "mobile");
        const mobileTopPages: Record<string, number> = {};
        mobilePVs.forEach((e) => { mobileTopPages[e.page] = (mobileTopPages[e.page] || 0) + 1; });
        const mobileTopPagesSorted = Object.entries(mobileTopPages).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const mobileSessions = sessions.filter((s) => s.device === "mobile");
        const mobileAvgPages = mobileSessions.length > 0 ? mobileSessions.reduce((s, se) => s + (se.page_count || 1), 0) / mobileSessions.length : 0;
        return {
          sections: [
            { title: "Device Comparison", data: [["Mobile Views", mobilePVs.length], ["Desktop Views", desktopPVs.length], ["Mobile %", mobilePercent]] },
            { title: "Top Mobile Pages", data: mobileTopPagesSorted },
          ],
          narrative: `Mobile devices account for ${mobilePercent}% of all traffic (${mobilePVs.length.toLocaleString()} views) compared to ${desktopPVs.length.toLocaleString()} desktop views. ${mobileAvgPages > 0 ? 'Mobile users view an average of ' + mobileAvgPages.toFixed(1) + ' pages per session.' : ''} ${mobileTopPagesSorted[0] ? 'The most visited mobile page is "' + mobileTopPagesSorted[0][0] + '" with ' + mobileTopPagesSorted[0][1].toLocaleString() + ' views.' : ''} ${mobilePercent > 60 ? 'Mobile-dominant traffic pattern confirms the need for mobile-first design.' : mobilePercent > 40 ? 'Near-equal device split requires strong experiences on both platforms.' : 'Desktop-dominant traffic — but mobile growth is an industry trend to watch.'}`,
          recommendations: [
            mobilePercent > 60 ? "Mobile-first redesign should be the priority — " + mobilePercent + "% of users are on mobile devices." : mobilePercent > 40 ? "Ensure responsive design works equally well on both platforms — traffic is evenly split." : "Monitor mobile traffic trends — industry benchmarks suggest mobile will grow over time.",
            mobileAvgPages > 0 && mobileAvgPages < 1.5 ? "Mobile users view fewer pages per session (" + mobileAvgPages.toFixed(1) + ") — simplify mobile navigation and add prominent next-step CTAs." : "Mobile engagement is reasonable — continue testing mobile user flows.",
            "Test all interactive tools (calculators, forms) on mobile devices to ensure full functionality and usability.",
          ],
        };
      }
      case "feedbackreport": {
        const typeCounts: Record<string, number> = {};
        const statusCounts: Record<string, number> = {};
        sbFeedback.forEach((f) => {
          typeCounts[f.type] = (typeCounts[f.type] || 0) + 1;
          statusCounts[f.status] = (statusCounts[f.status] || 0) + 1;
        });
        const bugCount = typeCounts["bug"] || 0;
        const suggestionCount = typeCounts["suggestion"] || 0;
        const resolvedCount = statusCounts["resolved"] || 0;
        const resolutionRate = sbFeedback.length > 0 ? Math.round((resolvedCount / sbFeedback.length) * 100) : 0;
        return {
          sections: [
            { title: "Feedback by Type", data: Object.entries(typeCounts).sort((a, b) => b[1] - a[1]) },
            { title: "Status Breakdown", data: Object.entries(statusCounts).sort((a, b) => b[1] - a[1]) },
            { title: "Summary", data: [["Total Feedback", sbFeedback.length]] },
          ],
          narrative: `${sbFeedback.length} feedback items have been submitted: ${bugCount} bug reports, ${suggestionCount} suggestions, and ${sbFeedback.length - bugCount - suggestionCount} other items. Resolution rate is ${resolutionRate}% (${resolvedCount} of ${sbFeedback.length} resolved). ${statusCounts["new"] ? statusCounts["new"] + ' items are still pending review.' : 'All items have been reviewed.'} ${bugCount > suggestionCount ? 'Bug reports outnumber suggestions — prioritize quality assurance efforts.' : 'More suggestions than bugs indicates a stable platform with engaged users.'}`,
          recommendations: [
            (statusCounts["new"] || 0) > 5 ? "There are " + statusCounts["new"] + " unreviewed feedback items — schedule a review session to prevent backlog." : "Feedback queue is manageable — maintain current review cadence.",
            bugCount > 0 ? "Address the " + bugCount + " open bug reports — prioritize by page traffic to maximize impact." : "No bugs reported — the platform is in good shape.",
            resolutionRate < 50 ? "Resolution rate of " + resolutionRate + "% is low — aim for 80%+ by triaging items weekly." : "Strong resolution rate of " + resolutionRate + "% — keep up the responsive support.",
          ],
        };
      }
      case "weekly": {
        const weeklyTopPages: Record<string, number> = {};
        last7.forEach((e) => { weeklyTopPages[e.page] = (weeklyTopPages[e.page] || 0) + 1; });
        const weeklyTopSorted = Object.entries(weeklyTopPages).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const dailyAvg = last7.length / 7;
        return {
          sections: [
            { title: "Weekly Summary (Last 7 Days)", data: [["Page Views", last7.length], ["Sessions (All Time)", sessionCount], ["Ad Impressions (All)", totalImpressions]] },
            { title: "Daily Breakdown", data: trafficByDay },
            { title: "Top Pages This Week", data: weeklyTopSorted },
          ],
          narrative: `This week saw ${last7.length.toLocaleString()} page views (${dailyAvg.toFixed(0)} daily average), ${weekGrowth >= 0 ? 'up' : 'down'} ${Math.abs(weekGrowth)}% from the previous week (${prev7.length.toLocaleString()} views). ${weeklyTopSorted[0] ? 'Top content this week: "' + weeklyTopSorted[0][0] + '" with ' + weeklyTopSorted[0][1].toLocaleString() + ' views.' : 'No page views recorded this week.'} ${trafficByDay.length > 0 ? 'Peak day was ' + trafficByDay.reduce((max, curr) => curr[1] > max[1] ? curr : max, trafficByDay[0])[0] + '.' : ''}`,
          recommendations: [
            weekGrowth < -10 ? "Traffic dropped " + Math.abs(weekGrowth) + "% this week — review content freshness, external links, and any technical issues." : weekGrowth > 10 ? "Strong growth of " + weekGrowth + "% — identify what drove the increase and replicate it." : "Traffic is stable — focus on content quality and user experience improvements.",
            dailyAvg < 10 ? "Daily average of " + dailyAvg.toFixed(0) + " views is low — consider social media promotion and email outreach to boost traffic." : "Healthy daily traffic — maintain consistent content promotion.",
            weeklyTopSorted.length > 0 ? `Capitalize on this week's top performer "${weeklyTopSorted[0][0]}" — share it on social channels and add internal links from other pages.` : "Publish new content and promote existing pages to generate weekly traffic.",
          ],
        };
      }
      default:
        return { sections: [], narrative: "", recommendations: [] };
    }
  }, [pageViews, uniquePages, sessionCount, avgPagesPerSession, bounceRate, topPages, trafficByDay, deviceBreakdown, browserBreakdown, osBreakdown, totalImpressions, totalAdClicks, revenuePotential, adImpressions, adImpressionsBySponsor, adClicksBySponsor, adImpressionsByPage, calculatorUsage, searchQueries, entryPages, toolkitCompletions, countyLookups, glossaryViews, faqViews, blogViews, sbFeedback, pageViewCounts, chatbotTopics, folderSaves, triviaScores, triviaDistribution, referrerData, blogViews.length, countyLookups.length, sessions]);

  /* ---------------------------------------------------------------- */
  /*  Sidebar nav                                                      */
  /* ---------------------------------------------------------------- */

  interface NavItem { key: Tab; label: string; icon: string }
  interface NavGroup { heading: string; items: NavItem[] }
  const navGroups: NavGroup[] = [
    {
      heading: "Analytics",
      items: [
        { key: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
        { key: "adPerf", label: "Ad Performance", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
      ],
    },
    {
      heading: "Site Visibility",
      items: [
        { key: "modules", label: "Modules", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
        { key: "pages", label: "Pages", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { key: "content", label: "Content", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
        { key: "feedback", label: "Feedback", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
      ],
    },
    {
      heading: "Settings",
      items: [
        { key: "reports", label: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { key: "export", label: "Export & Config", icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
      ],
    },
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 print:hidden">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-[#0a8ebc] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 print:hidden">
      {/* ---- Sidebar ---- */}
      <aside className="w-56 bg-[#1a2744] text-white flex flex-col shrink-0 min-h-screen sticky top-0">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-[#0a7ea8] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            </div>
            <h1 className="text-base font-bold tracking-tight">HC101 Admin</h1>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">Analytics &amp; Site Controls</p>
          {supabaseConnected && (
            <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Supabase connected
            </p>
          )}
          {!supabaseConnected && (
            <p className="text-[9px] text-amber-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              localStorage mode
            </p>
          )}
        </div>
        <nav className="flex-1 py-3">
          {navGroups.map((group) => (
            <div key={group.heading} className="mb-2">
              <p className="px-5 pt-3 pb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{group.heading}</p>
              {group.items.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                    tab === item.key
                      ? "bg-white/10 text-white border-l-2 border-l-[#0a7ea8]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <span className="flex-1">{item.label}</span>
                  {item.key === "feedback" && sbFeedback.filter((f) => f.status === "new").length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                      {sbFeedback.filter((f) => f.status === "new").length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <p className="text-[10px] text-gray-500">{events.length} events tracked</p>
          <p className="text-[10px] text-gray-500">{sessionCount} sessions</p>
          <p className="text-[10px] text-gray-500">{sbFeedback.length} feedback items</p>
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

            {/* Real-time indicator */}
            {(() => {
              const mostRecent = events.length > 0
                ? Math.max(...events.map((e) => new Date(e.timestamp).getTime()))
                : 0;
              const msSinceLastEvent = mostRecent ? Date.now() - mostRecent : Infinity;
              const minAgo = Math.floor(msSinceLastEvent / 60000);
              const isLive = msSinceLastEvent <= 5 * 60 * 1000;
              const label = mostRecent === 0
                ? "No events recorded"
                : minAgo < 1
                  ? "Last event: just now"
                  : minAgo < 60
                    ? `Last event: ${minAgo} minute${minAgo === 1 ? "" : "s"} ago`
                    : `Last event: ${Math.floor(minAgo / 60)}h ${minAgo % 60}m ago`;
              return (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    {isLive && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? "bg-emerald-500" : "bg-gray-300"}`} />
                  </span>
                  <span className="text-sm font-medium text-[#1a2744]">{label}</span>
                  {isLive && <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">LIVE</span>}
                </div>
              );
            })()}

            {/* Row 1 -- Core stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total Page Views" value={pageViews.length.toLocaleString()} color="text-[#0a7ea8]" />
              <Stat label="Unique Pages" value={uniquePages} color="text-[#2d6b3f]" />
              <Stat label="Sessions" value={sessionCount.toLocaleString()} color="text-[#5b3a8c]" />
              <Stat label="Pages / Session" value={avgPagesPerSession.toFixed(1)} color="text-[#8b6914]" />
            </div>

            {/* Row 2 -- Session metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Bounce Rate" value={fmtPct(bounceRate, 1)} sub="Single-page sessions" color="text-[#943030]" />
              <Stat label="Mobile Traffic" value={fmtPct(deviceBreakdown.mobile, deviceBreakdown.total || 1)} sub={`${deviceBreakdown.mobile} mobile / ${deviceBreakdown.desktop} desktop`} color="text-[#1a5276]" />
              <Stat label="Ad Impressions" value={totalImpressions.toLocaleString()} color="text-[#d4a843]" />
              <Stat label="Feedback Items" value={sbFeedback.length} color="text-[#0a7ea8]" />
            </div>

            {/* Row 3 -- Session duration + New vs Returning */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat
                label="Avg Session Duration"
                value={(() => {
                  if (!sessions.length) return "N/A";
                  const durations = sessions
                    .filter((s) => s.started_at && s.last_active_at)
                    .map((s) => new Date(s.last_active_at).getTime() - new Date(s.started_at).getTime())
                    .filter((d) => d > 0 && d < 3600000);
                  if (!durations.length) return "N/A";
                  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
                  return fmtDuration(avg);
                })()}
                sub={`Based on ${sessions.filter((s) => s.started_at && s.last_active_at).length} sessions`}
                color="text-[#2d6b3f]"
              />
              <Stat
                label="Engaged Visitors"
                value={sessions.filter((s) => s.page_count > 1).length.toLocaleString()}
                sub={`${fmtPct(sessions.filter((s) => s.page_count > 1).length, sessions.length || 1)} of sessions viewed 2+ pages`}
                color="text-[#0a7ea8]"
              />
              <Stat
                label="Single-Page Visits"
                value={sessions.filter((s) => s.page_count <= 1).length.toLocaleString()}
                sub={`${fmtPct(sessions.filter((s) => s.page_count <= 1).length, sessions.length || 1)} bounced after 1 page`}
                color="text-[#943030]"
              />
              <Stat
                label="Engagement Ratio"
                value={sessions.length ? `${(sessions.filter((s) => s.page_count > 1).length / sessions.length * 100).toFixed(1)}%` : "N/A"}
                sub="Engaged vs total sessions"
                color="text-[#5b3a8c]"
              />
            </div>

            {/* New vs Returning visitors comparison */}
            <Card title="New (Single-Page) vs Engaged (Multi-Page) Visitors">
              {sessions.length === 0 ? (
                <EmptyState text="No session data yet." />
              ) : (
                <BarChart
                  data={[
                    ["Engaged (2+ pages)", sessions.filter((s) => s.page_count > 1).length],
                    ["Single-page (bounced)", sessions.filter((s) => s.page_count <= 1).length],
                  ]}
                  rainbow
                />
              )}
            </Card>

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
                    <div key={h} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div
                        className="w-full bg-[#0a8ebc] rounded-t transition-all hover:bg-[#077a9e]"
                        style={{
                          height: `${Math.max((count / trafficByHour.max) * 100, 2)}%`,
                          minHeight: 2,
                        }}
                      />
                      {h % 4 === 0 && (
                        <span className="text-[9px] text-gray-400">{h}h</span>
                      )}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a2744] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {h}:00 - {count} views
                      </div>
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

            {/* Entry pages */}
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

            {/* Device + Browser + OS breakdowns */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Device Breakdown">
                {deviceBreakdown.total === 0 ? (
                  <EmptyState text="No data yet." />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-16">Desktop</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a2744] rounded-full" style={{ width: `${(deviceBreakdown.desktop / deviceBreakdown.total) * 100}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[#1a2744] w-14 text-right">{deviceBreakdown.desktop}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-16">Mobile</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0a8ebc] rounded-full" style={{ width: `${(deviceBreakdown.mobile / deviceBreakdown.total) * 100}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[#1a2744] w-14 text-right">{deviceBreakdown.mobile}</span>
                    </div>
                  </div>
                )}
              </Card>
              <Card title="Browser Breakdown">
                {browserBreakdown.length === 0 ? (
                  <EmptyState text="No data yet." />
                ) : (
                  <BarChart data={browserBreakdown} rainbow />
                )}
              </Card>
              <Card title="OS Breakdown">
                {osBreakdown.length === 0 ? (
                  <EmptyState text="No data yet." />
                ) : (
                  <BarChart data={osBreakdown} rainbow />
                )}
              </Card>
            </div>

            {/* Referrers */}
            <Card title="Top Referrers">
              {referrerData.length === 0 ? (
                <EmptyState text="No referrer data yet." />
              ) : (
                <BarChart data={referrerData} rainbow />
              )}
            </Card>

            {/* Row -- Additional metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Stat label="Avg Time on Site" value={avgTimeOnSite} sub="From session start to last activity" color="text-[#2d6b3f]" />
              <Stat label="Peak Hour" value={`${peakHour.hour}:00`} sub={`${peakHour.count.toLocaleString()} views at peak`} color="text-[#8b6914]" />
              <Stat label="Most Active Day" value={mostActiveDay.day} sub={`${mostActiveDay.count.toLocaleString()} views`} color="text-[#5b3a8c]" />
            </div>

            {/* Traffic by Day of Week */}
            <Card title="Traffic by Day of Week">
              {pageViews.length === 0 ? (
                <EmptyState text="No page view data yet." />
              ) : (
                <BarChart data={trafficByDayOfWeek} rainbow />
              )}
            </Card>

            {/* Content Velocity -- Trending Up */}
            <Card title="Content Velocity -- Trending Up (7d vs Prior 7d)">
              {contentVelocity.trending.length === 0 ? (
                <EmptyState text="No trending pages detected (need 14+ days of data)." />
              ) : (
                <BarChart data={contentVelocity.trending} color="bg-emerald-500" />
              )}
            </Card>

            {/* Content Velocity -- Declining */}
            <Card title="Content Velocity -- Declining (7d vs Prior 7d)">
              {contentVelocity.declining.length === 0 ? (
                <EmptyState text="No declining pages detected." />
              ) : (
                <BarChart data={contentVelocity.declining} color="bg-red-500" />
              )}
            </Card>
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 2: AD PERFORMANCE                                        */}
        {/* ============================================================ */}
        {tab === "adPerf" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1a2744]">Ad Performance</h2>

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

            <Card title="Impressions per Ad Format">
              {adImpressions.length === 0 ? (
                <EmptyState text="No impressions yet." />
              ) : (
                <BarChart data={adImpressions} />
              )}
            </Card>

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

            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Impressions per Sponsor">
                {adImpressionsBySponsor.length === 0 ? (
                  <EmptyState text="No sponsor data yet." />
                ) : (
                  <BarChart data={adImpressionsBySponsor} rainbow />
                )}
              </Card>
              <Card title="Clicks per Sponsor">
                {adClicksBySponsor.length === 0 ? (
                  <EmptyState text="No click data yet." />
                ) : (
                  <BarChart data={adClicksBySponsor} rainbow />
                )}
              </Card>
            </div>

            <Card title="Top Ad Placements (by Page Impressions)">
              {adImpressionsByPage.length === 0 ? (
                <EmptyState text="No placement data yet." />
              ) : (
                <BarChart data={adImpressionsByPage} rainbow />
              )}
            </Card>

            {/* Ad format toggles */}
            <Card title="Ad Format Controls">
              <div className="space-y-3">
                {AD_FORMATS.map(({ key, label }) => {
                  const enabled = config.adToggles[key] === undefined ? true : config.adToggles[key];
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#1a2744]">{label}</p>
                        <p className="text-xs text-gray-400 font-mono">{key}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${enabled ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                          {enabled ? "Live" : "Paused"}
                        </span>
                        <Toggle enabled={enabled} onChange={() => toggleAd(key)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 3: CONTENT PERFORMANCE                                   */}
        {/* ============================================================ */}
        {tab === "content" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1a2744]">Content Performance</h2>

            <Card title="Most Used Calculators">
              {calculatorUsage.length === 0 ? (
                <EmptyState text="No calculator usage tracked yet." />
              ) : (
                <BarChart data={calculatorUsage} />
              )}
            </Card>

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

            <div className="grid md:grid-cols-2 gap-6">
              <Card title="AI Assistant — Most Asked Topics">
                {chatbotTopics.length === 0 ? (
                  <EmptyState text="No chatbot data yet." />
                ) : (
                  <BarChart data={chatbotTopics} rainbow />
                )}
              </Card>
              <Card title="Top Search Queries">
                {searchQueries.length === 0 ? (
                  <EmptyState text="No search data yet." />
                ) : (
                  <BarChart data={searchQueries} rainbow />
                )}
              </Card>
            </div>

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
              <div className="grid grid-cols-[1fr_80px_90px_80px] gap-2 px-6 py-3 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span>Page</span>
                <span className="text-right">Views</span>
                <span className="text-right">Last Viewed</span>
                <span className="text-right">Status</span>
              </div>
              <div className="divide-y divide-gray-50">
                {filteredPages.map(({ route, label, section }) => {
                  const visible = config.pageVisibility[route] === undefined ? true : config.pageVisibility[route];
                  const views = pageViewCounts[route] || 0;
                  const lastView = pageLastViewed[route];
                  return (
                    <div key={route} className="grid grid-cols-[1fr_80px_90px_80px] gap-2 items-center px-6 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1a2744] truncate">{label}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[11px] text-gray-400 font-mono">{route}</p>
                          <SectionBadge text={section} />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#1a2744] text-right">{views}</span>
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
        {/*  TAB 6: FEEDBACK                                              */}
        {/* ============================================================ */}
        {tab === "feedback" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1a2744]">Feedback &amp; Bug Reports</h2>
              <p className="text-sm text-gray-500 mt-1">
                View and manage user-submitted feedback from the site.
              </p>
            </div>

            {!supabaseConnected ? (
              <Card title="Supabase Required">
                <EmptyState text="Connect Supabase to view feedback submissions." />
              </Card>
            ) : (
              <>
                {/* Filter bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter:</span>
                  {["all", "bug", "suggestion", "feedback", "question"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFeedbackFilter(f)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                        feedbackFilter === f
                          ? "bg-[#0a8ebc] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {f} {f !== "all" ? `(${sbFeedback.filter((fb) => fb.type === f).length})` : `(${sbFeedback.length})`}
                    </button>
                  ))}
                </div>

                {/* Feedback list */}
                {filteredFeedback.length === 0 ? (
                  <Card title="No Feedback">
                    <EmptyState text="No feedback items matching this filter." />
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredFeedback.map((fb) => (
                      <div key={fb.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <SectionBadge
                              text={fb.type}
                              color={
                                fb.type === "bug" ? "bg-red-50 text-red-600" :
                                fb.type === "suggestion" ? "bg-blue-50 text-blue-600" :
                                fb.type === "question" ? "bg-purple-50 text-purple-600" :
                                "bg-green-50 text-green-600"
                              }
                            />
                            <StatusBadge status={fb.status} />
                            <span className="text-[10px] text-gray-400">
                              {new Date(fb.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {fb.status !== "reviewed" && (
                              <button
                                onClick={() => updateFeedbackStatus(fb.id, "reviewed")}
                                className="px-2 py-1 text-[10px] font-semibold rounded bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                              >
                                Reviewed
                              </button>
                            )}
                            {fb.status !== "resolved" && (
                              <button
                                onClick={() => updateFeedbackStatus(fb.id, "resolved")}
                                className="px-2 py-1 text-[10px] font-semibold rounded bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                              >
                                Resolved
                              </button>
                            )}
                            {fb.status !== "dismissed" && (
                              <button
                                onClick={() => updateFeedbackStatus(fb.id, "dismissed")}
                                className="px-2 py-1 text-[10px] font-semibold rounded bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                              >
                                Dismiss
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{fb.message}</p>
                        <div className="flex flex-wrap gap-3 text-[10px] text-gray-400">
                          {fb.page && <span>Page: {fb.page}</span>}
                          {fb.email && <span>Email: {fb.email}</span>}
                          {fb.browser && <span>Browser: {fb.browser}</span>}
                          {fb.device && <span>Device: {fb.device}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 7: REPORTS                                                */}
        {/* ============================================================ */}
        {tab === "reports" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#1a2744]">Prebuilt Reports</h2>
              <p className="text-sm text-gray-500 mt-1">
                15 report templates for different stakeholders. Click to view, export as CSV.
              </p>
            </div>

            {!supabaseConnected && events.length === 0 ? (
              <Card title="Data Required">
                <EmptyState text="Connect Supabase to enable reports, or collect some analytics data first." />
              </Card>
            ) : (
              <>
                {/* Report grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  {REPORT_DEFS.map((rpt) => (
                    <button
                      key={rpt.key}
                      onClick={() => setActiveReport(activeReport === rpt.key ? null : rpt.key)}
                      className={`text-left bg-white rounded-xl border shadow-sm overflow-hidden transition-all hover:shadow-md border-l-4 ${rpt.accent} ${
                        activeReport === rpt.key ? "ring-2 ring-[#0a8ebc]/20" : ""
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full ${rpt.color}`}>{rpt.audience}</span>
                          {activeReport === rpt.key && <span className="text-[9px] text-[#0a7ea8] font-semibold">VIEWING</span>}
                        </div>
                        <h4 className="text-sm font-bold text-[#1a2744] mb-1">{rpt.title}</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed">{rpt.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active report detail */}
                {activeReport && (() => {
                  const rpt = REPORT_DEFS.find((r) => r.key === activeReport);
                  const reportData = getReportData(activeReport);
                  if (!rpt) return null;
                  return (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden space-y-6">
                      <div className={`${rpt.color} px-6 py-4 flex items-center justify-between`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white">{rpt.title}</h3>
                            <span className="text-[9px] font-bold text-white/60 bg-white/20 px-2 py-0.5 rounded-full">{rpt.audience}</span>
                          </div>
                          <p className="text-xs text-white/70">Generated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                        </div>
                        <div className="flex gap-2">
                          {reportData.sections.map((section, idx) => (
                            <button
                              key={idx}
                              onClick={() => exportReportCSV(`${activeReport}-${idx}`, section.data)}
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0a8ebc] text-white hover:bg-[#077a9e] transition-colors"
                            >
                              Export CSV
                            </button>
                          ))}
                        </div>
                      </div>

                      {reportData.narrative && (
                        <div className="px-6">
                          <div className="p-5 bg-gradient-to-r from-[#e8f0f5] to-white rounded-xl border border-[#c5d8e4] mb-6">
                            <h4 className="text-sm font-bold text-[#1a5276] mb-2 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                              Key Insights
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{reportData.narrative}</p>
                          </div>
                        </div>
                      )}

                      {reportData.recommendations && reportData.recommendations.length > 0 && (
                        <div className="px-6">
                          <div className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] mb-6">
                            <h4 className="text-sm font-bold text-[#8b6914] mb-2">Recommendations</h4>
                            <ul className="space-y-1">
                              {reportData.recommendations.map((rec: string, i: number) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                  <span className="text-[#8b6914] shrink-0 mt-0.5">&#8226;</span> {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {reportData.sections.map((section, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-bold text-[#1a2744] mb-3">{section.title}</h4>
                          {section.data.length === 0 || (section.data.length === 1 && section.data[0][0] === "No data yet") ? (
                            <EmptyState text="No data available for this section." />
                          ) : section.data.length <= 4 && section.data.every(([, v]) => typeof v === "number") ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {section.data.map(([label, val], si) => (
                                <div key={label} className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow" title={`${label}: ${val}`}>
                                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</p>
                                  <p className="text-lg font-bold" style={{ color: CHART_HEX[si % CHART_HEX.length] }}>{typeof val === "number" && val % 1 !== 0 ? val.toFixed(1) : typeof val === "number" ? val.toLocaleString() : val}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <BarChart data={section.data} rainbow />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/*  TAB 8: EXPORT & SETTINGS                                     */}
        {/* ============================================================ */}
        {tab === "export" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a2744]">Export &amp; Settings</h2>

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

            {/* Supabase connection status */}
            <Card title="Database Connection">
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${supabaseConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
                <span className="text-sm font-semibold text-[#1a2744]">
                  {supabaseConnected ? "Supabase connected" : "Using localStorage (offline mode)"}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {supabaseConnected
                  ? `Reading from Supabase. ${sbAnalytics.length} analytics events, ${sbSessions.length} sessions, ${sbFeedback.length} feedback items in database.`
                  : "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables to enable Supabase."}
              </p>
            </Card>

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
