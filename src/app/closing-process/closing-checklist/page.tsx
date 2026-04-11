"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

const checklistSections = [
  {
    title: "Before You Start",
    items: [
      "Check your credit score and review your credit report",
      "Determine your budget (including closing costs — typically 2-5% of home price)",
      "Get pre-approved for a mortgage",
      "Choose a real estate agent",
      "Research neighborhoods and school districts",
    ],
  },
  {
    title: "Making an Offer",
    items: [
      "Find your home and schedule inspections",
      "Submit a purchase offer through your agent",
      "Negotiate terms and agree on a purchase price",
      "Sign the purchase agreement",
      "Pay your earnest money deposit",
    ],
  },
  {
    title: "After Acceptance",
    items: [
      "Formally apply for your mortgage loan",
      "Lock in your mortgage interest rate",
      "Schedule a home inspection",
      "Schedule a pest inspection (if required)",
      "Order a home appraisal (often arranged by lender)",
      "Shop for homeowner's insurance",
      "Shop for owner's title insurance",
      "Review the title commitment/report",
      "Clear any title issues identified in the commitment",
    ],
  },
  {
    title: "One Week Before Closing",
    items: [
      "Receive and review your Closing Disclosure (at least 3 days before)",
      "Compare Closing Disclosure to your original Loan Estimate",
      "Confirm your wire transfer amount and instructions BY PHONE",
      "Verify wire transfer cutoff times with your bank",
      "Schedule your final walk-through",
      "Gather required documents (ID, proof of insurance, certified funds)",
      "Confirm closing date, time, and location",
      "Set up utilities and schedule change of address",
    ],
  },
  {
    title: "Closing Day",
    items: [
      "Complete final walk-through of the property",
      "Bring government-issued photo ID",
      "Bring proof of homeowner's insurance",
      "Bring certified/cashier's check or wire confirmation",
      "Review and sign all closing documents",
      "Receive your keys!",
    ],
  },
];

export default function ClosingChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (sectionIdx: number, itemIdx: number) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = checklistSections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <>
    <PageHero
      title="Interactive Closing Checklist"
      subtitle="Track your progress and print a copy to bring with you on closing day."
      image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920&q=80"
      breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Closing Checklist", href: "/closing-process/closing-checklist" }]}
    />
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-alta-navy">Your Checklist</h2>
          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-5 py-2.5 bg-alta-navy text-white font-semibold rounded-lg hover:bg-alta-teal transition-colors text-sm shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Checklist
          </button>
        </div>
        <p className="text-lg text-alta-gray mb-8 max-w-2xl">
          Track your progress through the home closing process. Check off items as you complete them. Print a blank copy to take with you.
        </p>

        {/* Progress Bar */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm py-4 mb-8 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-alta-navy">Your Progress</span>
            <span className="text-sm font-bold text-alta-teal">{checkedCount}/{totalItems} ({progress}%)</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-alta-teal rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-10">
          {checklistSections.map((section, sIdx) => {
            const sectionChecked = section.items.filter((_, iIdx) => checked[`${sIdx}-${iIdx}`]).length;
            return (
              <div key={section.title}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-alta-navy">{section.title}</h2>
                  <span className="text-xs font-medium text-alta-gray bg-gray-100 px-2 py-1 rounded-full">
                    {sectionChecked}/{section.items.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}`;
                    const isChecked = checked[key] || false;
                    return (
                      <button
                        key={key}
                        onClick={() => toggleItem(sIdx, iIdx)}
                        className={`check-item w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                          isChecked
                            ? "bg-green-50 border-green-200 checked"
                            : "bg-white border-gray-100 hover:border-alta-teal/30"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? "bg-alta-green border-alta-green" : "border-gray-300"
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${isChecked ? "text-alta-gray" : "text-alta-navy"}`}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion message */}
        {progress === 100 && (
          <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
            <h3 className="text-xl font-bold text-alta-green mb-2">Congratulations!</h3>
            <p className="text-alta-gray">You&apos;ve completed every item on the closing checklist. You&apos;re ready to close with confidence!</p>
          </div>
        )}

        <InlineAd />

        <div className="mt-6 p-4 bg-alta-light rounded-lg text-sm text-alta-gray">
          <strong className="text-alta-navy">Tip:</strong> Use the Print button above to take a blank copy with you. Your checked items won&apos;t persist between browser sessions, so consider bookmarking this page for easy access.
        </div>
      </div>
    </div>
    </>
  );
}
