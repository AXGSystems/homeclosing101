"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";
import { faqs, faqCategories } from "@/data/faqData";

const catColors: Record<string, { bg: string; border: string; text: string; leftBorder: string }> = {
  basics: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", leftBorder: "border-l-blue-500" },
  insurance: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", leftBorder: "border-l-green-500" },
  costs: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", leftBorder: "border-l-amber-500" },
  closing: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", leftBorder: "border-l-purple-500" },
  fraud: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", leftBorder: "border-l-red-500" },
  mortgage: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", leftBorder: "border-l-indigo-500" },
  inspection: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", leftBorder: "border-l-orange-500" },
  documents: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", leftBorder: "border-l-cyan-500" },
  rights: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", leftBorder: "border-l-emerald-500" },
  after: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", leftBorder: "border-l-slate-500" },
};

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqs.filter((f) => {
    const matchesCat = activeCat === "all" || f.cat === activeCat;
    const matchesSearch = !searchQuery ||
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
    <PageHero
      title="Frequently Asked Questions"
      subtitle={`${faqs.length} answers about every aspect of buying a home and closing your transaction.`}
      image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
      breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "FAQ", href: "/faq" }]}
    />

    <div className="py-1.5 lg:py-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page intro */}
        <div className="mb-6 p-4 bg-[#f0ecf6] rounded-2xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5b3a8c]/10 flex items-center justify-center text-[#5b3a8c] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Find Answers to Any Closing Question</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Search by keyword, filter by category, or browse all {faqs.length} questions. Every answer is sourced from CFPB, ALTA, FBI, NAR, and other verified authorities. Can&apos;t find what you&apos;re looking for? Try our <a href="/glossary" className="text-alta-teal font-medium hover:underline">Real Estate Glossary</a> or <span className="text-alta-teal font-medium">HomeClosing101 AI assistant</span>.</p>
            </div>
          </div>
        </div>

        {/* Search + filters — sticky below the intro */}
        <div className="sticky top-[200px] sm:top-[255px] z-10 bg-white pb-3 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-gray-100 shadow-sm">
          <div className="relative mb-3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alta-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenIdx(null); }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-alta-gray hover:text-alta-navy">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {faqCategories.map((cat) => {
              const count = cat.id === "all" ? faqs.length : faqs.filter((f) => f.cat === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCat(cat.id); setOpenIdx(null); setSearchQuery(""); }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                    activeCat === cat.id
                      ? "bg-alta-teal text-white shadow-md"
                      : "bg-alta-light text-alta-gray hover:bg-gray-200"
                  }`}
                >
                  {cat.label} <span className="ml-0.5 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="text-[11px] text-alta-gray">
            Showing <strong className="text-alta-navy">{filtered.length}</strong> of {faqs.length} questions
            {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
          </p>
        </div>

        {/* FAQ cards */}
        <div className="grid gap-2.5 md:grid-cols-2 mt-4">
          {filtered.map((faq, i) => {
            const globalIdx = faqs.indexOf(faq);
            const colors = catColors[faq.cat] || catColors.basics;
            const isOpen = openIdx === globalIdx;
            return (
              <FaqCard
                key={globalIdx}
                faq={faq}
                colors={colors}
                isOpen={isOpen}
                onToggle={() => setOpenIdx(isOpen ? null : globalIdx)}
              />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="text-alta-gray font-medium">No questions match your search.</p>
            <button onClick={() => { setSearchQuery(""); setActiveCat("all"); }} className="text-sm text-alta-teal mt-2 hover:underline">Clear filters</button>
          </div>
        )}

        <InlineAd />

        <div className="mt-6 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <h3 className="font-bold text-alta-navy mb-3">Need More Help?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/glossary" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Real Estate Glossary
            </Link>
            <Link href="/questions-to-ask" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Questions for Your Title Company
            </Link>
            <Link href="/document-library" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Document Library
            </Link>
          </div>
        </div>

        {/* Still Have Questions? */}
        <div className="mt-6 p-5 bg-gradient-to-br from-[#f0ecf6] to-white rounded-2xl border border-[#d4c8e4] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5b3a8c]/10 flex items-center justify-center text-[#5b3a8c] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-alta-navy mb-1">Still Have Questions?</h3>
              <p className="text-sm text-alta-gray leading-relaxed">Our AI assistant can help! Click the <span className="font-semibold text-[#5b3a8c]">&quot;Ask HC101&quot;</span> button to get instant answers.</p>
            </div>
          </div>
        </div>

        <FirstTimeBuyerCTA />
      </div>
    </div>
    </>
  );
}

/* ─── Animated FAQ Card ─── */
function FaqCard({ faq, colors, isOpen, onToggle }: {
  faq: { q: string; a: string; cat: string; source?: string; sourceUrl?: string };
  colors: { bg: string; border: string; text: string; leftBorder: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, faq.a]);

  return (
    <div
      className={`rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 cursor-pointer border-l-4 ${colors.leftBorder} ${
        isOpen ? `${colors.bg} shadow-lg ${colors.border} md:col-span-2` : "bg-white hover:shadow-md hover:-translate-y-0.5"
      }`}
      onClick={onToggle}
    >
      <div className="p-4 flex items-start gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors text-xs font-bold ${
          isOpen ? `${colors.text} ${colors.bg}` : "bg-alta-light text-alta-gray"
        }`}>
          Q
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-alta-navy leading-snug">{faq.q}</h3>
            <svg
              className={`w-4 h-4 text-alta-gray shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className={`text-[11px] text-alta-gray mt-1 line-clamp-1 transition-opacity duration-200 ${isOpen ? "opacity-0 h-0 mt-0" : "opacity-100"}`}>
            {faq.a.slice(0, 90)}...
          </p>
        </div>
      </div>
      <div
        ref={contentRef}
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
        style={{ height }}
      >
        <div className="px-4 pb-4 pt-0 ml-10">
          <div className="p-4 bg-white/80 rounded-xl">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">{faq.a}</p>
            <div className="flex items-center flex-wrap gap-2">
              {faq.source && (
                <a
                  href={faq.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-alta-teal hover:text-alta-teal-dark transition-colors bg-alta-teal/5 px-2.5 py-1 rounded-full"
                >
                  Source: {faq.source}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )}
              <SaveToFolderBtn
                type="question"
                title={faq.q}
                content={faq.a}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
