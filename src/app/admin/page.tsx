"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { AnalyticsEvent } from "@/components/Analytics";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ANALYTICS_KEY = "hc101-analytics";
const CONFIG_KEY = "hc101-admin-config";
const DEMO_PASSWORD = "alta2026";

const AD_FORMATS = [
  { key: "InlineAd", label: "Inline Ad" },
  { key: "ContextualSponsor", label: "Contextual Sponsor" },
  { key: "SponsorShowcase", label: "Sponsor Showcase" },
  { key: "StickyBottomAd", label: "Sticky Bottom Ad" },
  { key: "SponsorTip", label: "Sponsor Tip" },
  { key: "SponsorBadge", label: "Sponsor Badge" },
] as const;

const ALL_PAGES = [
  { route: "/", label: "Homepage" },
  { route: "/closing-process", label: "Closing Process" },
  { route: "/closing-process/closing-costs", label: "Closing Costs" },
  { route: "/closing-process/closing-checklist", label: "Closing Checklist" },
  { route: "/closing-process/closing-options", label: "Closing Options" },
  { route: "/closing-process/what-to-expect", label: "What to Expect" },
  { route: "/closing-day-prep", label: "Closing Day Prep" },
  { route: "/closing-disclosure", label: "Closing Disclosure" },
  { route: "/first-time-buyers", label: "First Time Buyers" },
  { route: "/mortgage-calculator", label: "Mortgage Calculator" },
  { route: "/dti-calculator", label: "DTI Calculator" },
  { route: "/rent-vs-buy", label: "Rent vs Buy" },
  { route: "/compare-loans", label: "Compare Loans" },
  { route: "/true-cost", label: "True Cost" },
  { route: "/affordability", label: "Affordability" },
  { route: "/loan-estimate", label: "Loan Estimate" },
  { route: "/le-vs-cd", label: "LE vs CD" },
  { route: "/escrow-guide", label: "Escrow Guide" },
  { route: "/home-inspection", label: "Home Inspection" },
  { route: "/appraisal-guide", label: "Appraisal Guide" },
  { route: "/homeowners-insurance", label: "Homeowners Insurance" },
  { route: "/property-rights", label: "Property Rights" },
  { route: "/protect-against-deed-fraud", label: "Protect Against Deed Fraud" },
  { route: "/deed-theft", label: "Deed Theft" },
  { route: "/stop-fraud", label: "Stop Fraud" },
  { route: "/identity-protection", label: "Identity Protection" },
  { route: "/protect-your-money", label: "Protect Your Money" },
  { route: "/protect-your-rights", label: "Protect Your Rights" },
  { route: "/hoa-guide", label: "HOA Guide" },
  { route: "/after-closing", label: "After Closing" },
  { route: "/tax-benefits", label: "Tax Benefits" },
  { route: "/negotiation-guide", label: "Negotiation Guide" },
  { route: "/questions-to-ask", label: "Questions to Ask" },
  { route: "/document-checklist", label: "Document Checklist" },
  { route: "/document-library", label: "Document Library" },
  { route: "/glossary", label: "Glossary" },
  { route: "/faq", label: "FAQ" },
  { route: "/resources", label: "Resources" },
  { route: "/trivia", label: "Trivia" },
  { route: "/find-company", label: "Find a Company" },
  { route: "/find-policy", label: "Find a Policy" },
  { route: "/blog", label: "Blog" },
  { route: "/sources", label: "Sources" },
  { route: "/join-alta", label: "Join ALTA" },
  { route: "/emergency-contacts", label: "Emergency Contacts" },
  { route: "/support", label: "Support" },
];

/* ------------------------------------------------------------------ */
/*  Admin config helpers (shared with ad components)                   */
/* ------------------------------------------------------------------ */

export type AdminConfig = {
  adToggles: Record<string, boolean>;
  pageVisibility: Record<string, boolean>;
};

function getConfig(): AdminConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { adToggles: {}, pageVisibility: {} };
}

function saveConfig(cfg: AdminConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch {}
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
      } catch {}
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
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-[#1a2744]">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toggle Switch                                                      */
/* ------------------------------------------------------------------ */

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
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

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

type Tab = "overview" | "ads" | "pages" | "export";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [config, setConfig] = useState<AdminConfig>({
    adToggles: {},
    pageVisibility: {},
  });

  /* Load data */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ANALYTICS_KEY);
      setEvents(raw ? JSON.parse(raw) : []);
    } catch {}
    setConfig(getConfig());
  }, []);

  /* ---- Computed stats ---- */
  const pageViews = useMemo(
    () => events.filter((e) => e.type === "page_view"),
    [events]
  );

  const uniquePages = useMemo(
    () => new Set(pageViews.map((e) => e.page)).size,
    [pageViews]
  );

  const topPages = useMemo(() => {
    const counts: Record<string, number> = {};
    pageViews.forEach((e) => {
      counts[e.page] = (counts[e.page] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [pageViews]);

  const adImpressions = useMemo(() => {
    const counts: Record<string, number> = {};
    events
      .filter((e) => e.type === "ad_impression")
      .forEach((e) => {
        const fmt = e.data.format || "Unknown";
        counts[fmt] = (counts[fmt] || 0) + 1;
      });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const adClicks = useMemo(() => {
    const counts: Record<string, number> = {};
    events
      .filter((e) => e.type === "ad_click")
      .forEach((e) => {
        const sponsor = e.data.sponsor || "Unknown";
        counts[sponsor] = (counts[sponsor] || 0) + 1;
      });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const featureUsage = useMemo(() => {
    const types = [
      "calculator_used",
      "toolkit_completed",
      "export_triggered",
      "search_performed",
      "trivia_played",
    ];
    const counts: Record<string, number> = {};
    events
      .filter((e) => types.includes(e.type))
      .forEach((e) => {
        counts[e.type] = (counts[e.type] || 0) + 1;
      });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const searchQueries = useMemo(() => {
    const counts: Record<string, number> = {};
    events
      .filter((e) => e.type === "search_performed")
      .forEach((e) => {
        const q = (e.data.query || "").toLowerCase().trim();
        if (q) counts[q] = (counts[q] || 0) + 1;
      });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
  }, [events]);

  /* ---- Ad toggle ---- */
  const toggleAd = useCallback(
    (key: string) => {
      setConfig((prev) => {
        const next = {
          ...prev,
          adToggles: {
            ...prev.adToggles,
            [key]:
              prev.adToggles[key] === undefined
                ? false
                : !prev.adToggles[key],
          },
        };
        saveConfig(next);
        return next;
      });
    },
    []
  );

  /* ---- Page visibility toggle ---- */
  const togglePage = useCallback(
    (route: string) => {
      setConfig((prev) => {
        const next = {
          ...prev,
          pageVisibility: {
            ...prev.pageVisibility,
            [route]:
              prev.pageVisibility[route] === undefined
                ? false
                : !prev.pageVisibility[route],
          },
        };
        saveConfig(next);
        return next;
      });
    },
    []
  );

  /* ---- CSV export ---- */
  const exportCSV = useCallback(() => {
    const header = "type,page,timestamp,data\n";
    const rows = events
      .map((e) => {
        const dataStr = Object.entries(e.data)
          .map(([k, v]) => `${k}=${v}`)
          .join("; ");
        return `"${e.type}","${e.page}","${e.timestamp}","${dataStr.replace(/"/g, '""')}"`;
      })
      .join("\n");

    const blob = new Blob([header + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hc101-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [events]);

  /* ---- Clear analytics ---- */
  const clearAnalytics = useCallback(() => {
    if (confirm("Clear all analytics data? This cannot be undone.")) {
      try {
        localStorage.removeItem(ANALYTICS_KEY);
      } catch {}
      setEvents([]);
    }
  }, []);

  /* ---- Max value for bar chart ---- */
  const maxPageViews = topPages.length ? topPages[0][1] : 1;

  /* ---- Sidebar nav items ---- */
  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
    { key: "ads", label: "Ad Control", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
    { key: "pages", label: "Pages", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { key: "export", label: "Export", icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 print:hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1a2744] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <h1 className="text-base font-bold tracking-tight">HC101 Admin</h1>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Analytics &amp; Controls
          </p>
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
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={item.icon}
                />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-[10px] text-gray-500">
            {events.length} events tracked
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* ========== OVERVIEW ========== */}
        {tab === "overview" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1a2744]">
              Analytics Overview
            </h2>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total Page Views" value={pageViews.length} />
              <Stat label="Unique Pages" value={uniquePages} />
              <Stat
                label="Ad Impressions"
                value={
                  events.filter((e) => e.type === "ad_impression").length
                }
              />
              <Stat
                label="Ad Clicks"
                value={
                  events.filter((e) => e.type === "ad_click").length
                }
              />
            </div>

            {/* Top pages */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-[#1a2744] mb-4">
                Most Viewed Pages (Top 10)
              </h3>
              {topPages.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No page view data yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {topPages.map(([page, count]) => (
                    <div key={page} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-44 truncate shrink-0">
                        {page}
                      </span>
                      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0a8ebc] rounded-full transition-all"
                          style={{
                            width: `${(count / maxPageViews) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#1a2744] w-10 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ad impressions by format */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#1a2744] mb-4">
                  Ad Impressions by Format
                </h3>
                {adImpressions.length === 0 ? (
                  <p className="text-sm text-gray-400">No impressions yet.</p>
                ) : (
                  <div className="space-y-2">
                    {adImpressions.map(([fmt, count]) => (
                      <div
                        key={fmt}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{fmt}</span>
                        <span className="font-semibold text-[#1a2744]">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#1a2744] mb-4">
                  Ad Clicks by Sponsor
                </h3>
                {adClicks.length === 0 ? (
                  <p className="text-sm text-gray-400">No clicks yet.</p>
                ) : (
                  <div className="space-y-2">
                    {adClicks.map(([sponsor, count]) => (
                      <div
                        key={sponsor}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{sponsor}</span>
                        <span className="font-semibold text-[#1a2744]">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Feature usage + search */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#1a2744] mb-4">
                  Feature Usage
                </h3>
                {featureUsage.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No feature events yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {featureUsage.map(([type, count]) => (
                      <div
                        key={type}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {type.replace(/_/g, " ")}
                        </span>
                        <span className="font-semibold text-[#1a2744]">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-[#1a2744] mb-4">
                  Top Search Queries
                </h3>
                {searchQueries.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No search data yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {searchQueries.map(([query, count]) => (
                      <div
                        key={query}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600 truncate mr-3">
                          &ldquo;{query}&rdquo;
                        </span>
                        <span className="font-semibold text-[#1a2744]">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========== AD CONTROL ========== */}
        {tab === "ads" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a2744]">
              Ad Control Panel
            </h2>
            <p className="text-sm text-gray-500">
              Toggle ad formats on or off across the site. Changes take
              effect on next page load.
            </p>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {AD_FORMATS.map(({ key, label }) => {
                const enabled =
                  config.adToggles[key] === undefined
                    ? true
                    : config.adToggles[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#1a2744]">
                        {label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{key}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          enabled
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {enabled ? "Live" : "Paused"}
                      </span>
                      <Toggle
                        enabled={enabled}
                        onChange={() => toggleAd(key)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========== PAGES ========== */}
        {tab === "pages" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a2744]">
              Page Manager
            </h2>
            <p className="text-sm text-gray-500">
              Toggle page visibility. This is a UI-only preview for future
              implementation.
            </p>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {ALL_PAGES.map(({ route, label }) => {
                const visible =
                  config.pageVisibility[route] === undefined
                    ? true
                    : config.pageVisibility[route];
                return (
                  <div
                    key={route}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1a2744] truncate">
                        {label}
                      </p>
                      <p className="text-[11px] text-gray-400 font-mono">
                        {route}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          visible
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {visible ? "Visible" : "Hidden"}
                      </span>
                      <Toggle
                        enabled={visible}
                        onChange={() => togglePage(route)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========== EXPORT ========== */}
        {tab === "export" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1a2744]">
              Export &amp; Data
            </h2>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1a2744]">
                  Export Analytics CSV
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Download all {events.length} tracked events as a CSV file.
                </p>
              </div>
              <button
                onClick={exportCSV}
                disabled={events.length === 0}
                className="px-5 py-2.5 bg-[#0a8ebc] text-white rounded-lg font-semibold text-sm hover:bg-[#077a9e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Download CSV
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#1a2744]">
                  Clear Analytics
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Remove all tracked events from localStorage.
                </p>
              </div>
              <button
                onClick={clearAnalytics}
                className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
              >
                Clear All Data
              </button>
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
    } catch {}
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <Dashboard />;
}
