"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "hc101-journey";

export interface JourneyStep {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  tip: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "finances",
    label: "Get Finances Ready",
    shortLabel: "Finances",
    href: "/affordability",
    tip: "Review your credit score, pay down debt, and save for a down payment. Most lenders want a score of 620+ for conventional loans.",
  },
  {
    id: "preapproval",
    label: "Get Pre-Approved",
    shortLabel: "Pre-Approved",
    href: "/loan-estimate",
    tip: "A pre-approval letter shows sellers you're a serious buyer. Shop at least 3 lenders to compare rates and fees.",
  },
  {
    id: "find-home",
    label: "Find Your Home",
    shortLabel: "Find Home",
    href: "/home-inspection",
    tip: "Work with a real estate agent, attend open houses, and research neighborhoods. Don't skip the home inspection.",
  },
  {
    id: "make-offer",
    label: "Make an Offer",
    shortLabel: "Offer",
    href: "/closing-process/what-to-expect",
    tip: "Your agent will help you draft a competitive offer. Include contingencies for inspection, appraisal, and financing.",
  },
  {
    id: "sign-agreement",
    label: "Sign Purchase Agreement",
    shortLabel: "Agreement",
    href: "/document-checklist",
    tip: "Review every clause carefully. This is a legally binding contract — consider having a real estate attorney review it.",
  },
  {
    id: "funding",
    label: "Get Funding",
    shortLabel: "Funding",
    href: "/mortgage-calculator",
    tip: "Lock your interest rate, provide all requested documents promptly, and avoid opening new credit lines during this period.",
  },
  {
    id: "insurance",
    label: "Get Insurance",
    shortLabel: "Insurance",
    href: "/homeowners-insurance",
    tip: "Homeowner's insurance is required by lenders. Also consider title insurance to protect your ownership rights.",
  },
  {
    id: "close",
    label: "Close on Your Home",
    shortLabel: "Close",
    href: "/closing-process/closing-checklist",
    tip: "Review your Closing Disclosure at least 3 days before closing. Bring a valid ID and a cashier's check for closing costs.",
  },
];

function getCompleted(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCompleted(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

/* ─── Compact strip for closing-process pages ─── */

export function JourneyTrackerStrip() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(getCompleted());
    setHydrated(true);
  }, []);

  const toggle = (id: string) => {
    const next = completed.includes(id)
      ? completed.filter((c) => c !== id)
      : [...completed, id];
    setCompleted(next);
    saveCompleted(next);
  };

  const pct = hydrated ? Math.round((completed.length / JOURNEY_STEPS.length) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-alta-navy to-[#243656] text-white px-4 py-3 no-print">
      <div className="max-w-7xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-2">
          <Link href="/my-journey" className="text-xs font-semibold tracking-wide uppercase hover:text-alta-gold transition-colors">
            My Homebuying Journey
          </Link>
          <span className="text-xs text-gray-300">{pct}% complete</span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-alta-gold rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between gap-0 overflow-x-auto">
          {JOURNEY_STEPS.map((step, i) => {
            const done = completed.includes(step.id);
            return (
              <div key={step.id} className="flex items-center shrink-0">
                {/* Step circle */}
                <button
                  onClick={() => toggle(step.id)}
                  title={`${step.label} — click to ${done ? "mark incomplete" : "mark complete"}`}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      done
                        ? "bg-alta-green border-alta-green"
                        : "border-gray-400 hover:border-alta-gold"
                    }`}
                  >
                    {done ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-alta-gold">{i + 1}</span>
                    )}
                  </div>
                  <span className={`text-[10px] leading-tight text-center max-w-[60px] ${done ? "text-alta-gold font-semibold" : "text-gray-400"}`}>
                    {step.shortLabel}
                  </span>
                </button>
                {/* Connector line */}
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className={`w-4 sm:w-8 md:w-12 h-0.5 mx-0.5 transition-colors duration-300 ${done ? "bg-alta-green" : "bg-white/20"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Full journey tracker for /my-journey page ─── */

export default function JourneyTracker() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCompleted(getCompleted());
    setHydrated(true);
  }, []);

  const toggle = (id: string) => {
    const next = completed.includes(id)
      ? completed.filter((c) => c !== id)
      : [...completed, id];
    setCompleted(next);
    saveCompleted(next);
  };

  const reset = () => {
    if (window.confirm("Reset your entire homebuying journey? This cannot be undone.")) {
      setCompleted([]);
      saveCompleted([]);
    }
  };

  const pct = hydrated ? Math.round((completed.length / JOURNEY_STEPS.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Progress summary */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-alta-navy">Your Progress</h2>
          <span className="text-2xl font-bold text-alta-teal">{pct}%</span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-alta-teal to-alta-green"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-alta-gray">
          {completed.length} of {JOURNEY_STEPS.length} steps completed
          {pct === 100 && " — Congratulations, you made it to closing day!"}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {JOURNEY_STEPS.map((step, i) => {
          const done = completed.includes(step.id);
          const isLast = i === JOURNEY_STEPS.length - 1;
          return (
            <div key={step.id} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
              {/* Vertical connector */}
              {!isLast && (
                <div
                  className={`absolute left-[19px] sm:left-[23px] top-10 bottom-0 w-0.5 transition-colors duration-300 ${
                    done ? "bg-alta-green" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Circle */}
              <button
                onClick={() => toggle(step.id)}
                className="relative z-10 shrink-0"
                title={`Click to ${done ? "mark incomplete" : "mark complete"}`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-3 transition-all duration-300 ${
                    done
                      ? "bg-alta-green border-alta-green shadow-lg shadow-alta-green/30"
                      : "bg-white border-gray-300 hover:border-alta-teal hover:shadow-md"
                  }`}
                >
                  {done ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm sm:text-base font-bold text-gray-400">{i + 1}</span>
                  )}
                </div>
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`rounded-xl border p-4 sm:p-5 transition-all duration-300 ${
                  done
                    ? "bg-alta-green/5 border-alta-green/20"
                    : "bg-white border-gray-100 shadow-sm hover:shadow-md"
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className={`text-lg font-bold ${done ? "text-alta-green" : "text-alta-navy"}`}>
                        Step {i + 1}: {step.label}
                      </h3>
                      <p className="mt-1 text-sm text-alta-gray leading-relaxed">{step.tip}</p>
                      <Link
                        href={step.href}
                        className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-alta-teal hover:text-alta-teal-dark transition-colors"
                      >
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    {done && (
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-alta-green/10 text-alta-green text-xs font-semibold rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        Done
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 no-print">
        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-sm inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Journey
        </button>
        <button
          onClick={reset}
          className="px-5 py-2.5 border-2 border-alta-red text-alta-red font-semibold rounded-lg hover:bg-alta-red hover:text-white transition-colors text-sm inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Journey
        </button>
      </div>
    </div>
  );
}
