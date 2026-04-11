"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

const checklistSections = [
  {
    title: "Before You Start",
    color: "blue",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
    tip: "Getting your finances in order is the most important first step. Most closings fail because of financing issues.",
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
    color: "green",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    tip: "Your agent will guide you through the offer process. Be prepared to move quickly in a competitive market.",
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
    color: "amber",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    tip: "This is when your title company gets involved. Owner's title insurance is one of the best investments you'll make — protecting your property for life.",
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
    color: "red",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    tip: "CRITICAL: Always verify wiring instructions by phone using a number you already have. Never trust emailed wire instructions.",
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
    color: "purple",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    tip: "You're almost there! Review everything carefully before signing. Don't be afraid to ask questions — this is your biggest investment.",
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
    <div className="py-1.5 lg:py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page intro */}
        <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Your Complete Closing Roadmap</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Check off items as you complete them. Each section includes a pro tip to help you navigate that phase. Print a blank copy to take with you, or use this page on your phone during the process.</p>
            </div>
          </div>
        </div>

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
            const sectionComplete = sectionChecked === section.items.length;
            const colorMap: Record<string, { border: string; bg: string; badge: string }> = {
              blue: { border: "border-blue-200", bg: "from-[#1a5276] to-[#154463]", badge: "bg-blue-100 text-blue-700" },
              green: { border: "border-green-200", bg: "from-[#2d6b3f] to-[#235532]", badge: "bg-green-100 text-green-700" },
              amber: { border: "border-amber-200", bg: "from-[#8b6914] to-[#705410]", badge: "bg-amber-100 text-amber-700" },
              red: { border: "border-red-200", bg: "from-[#943030] to-[#7a2020]", badge: "bg-red-100 text-red-700" },
              purple: { border: "border-purple-200", bg: "from-[#5b3a8c] to-[#482d70]", badge: "bg-purple-100 text-purple-700" },
            };
            const c = colorMap[section.color] || colorMap.blue;
            return (
              <div key={section.title} className={`rounded-2xl border ${sectionComplete ? 'border-green-300 bg-green-50/30' : c.border} overflow-hidden`}>
                {/* Section header with image */}
                <div className="relative h-28 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${section.image}')` }} />
                  <div className={`absolute inset-0 bg-gradient-to-r ${c.bg} ${sectionComplete ? 'opacity-20' : 'opacity-30'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="relative z-10 flex items-center justify-between h-full px-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">{sIdx + 1}</span>
                      <h2 className="text-lg font-bold text-white drop-shadow">{section.title}</h2>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${sectionComplete ? 'bg-green-500 text-white' : 'bg-white/20 text-white'}`}>
                      {sectionChecked}/{section.items.length}
                    </span>
                  </div>
                </div>
                {/* Tip */}
                <div className={`px-5 py-3 ${c.badge} text-xs flex items-start gap-2`}>
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-medium">{section.tip}</span>
                </div>
                {/* Items */}
                <div className="p-4 space-y-2">
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
