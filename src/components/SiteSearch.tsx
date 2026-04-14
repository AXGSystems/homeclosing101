"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { glossaryData, type GlossaryTerm } from "@/data/glossaryData";
import { faqs, type FAQItem } from "@/data/faqData";

/* ── Page index (hardcoded from sitemap) ── */
interface PageEntry {
  path: string;
  title: string;
  description: string;
}

const pages: PageEntry[] = [
  { path: "/", title: "Home", description: "Your complete guide to the real estate closing process" },
  { path: "/first-time-buyers", title: "First-Time Buyer Guide", description: "Everything first-time homebuyers need to know about closing" },
  { path: "/closing-process", title: "The Closing Process", description: "Step-by-step overview of a real estate closing" },
  { path: "/closing-process/what-to-expect", title: "What to Expect at Closing", description: "What happens on closing day and how to prepare" },
  { path: "/closing-process/closing-costs", title: "Closing Costs Explained", description: "Breakdown of closing costs and who pays what" },
  { path: "/closing-process/closing-checklist", title: "Closing Checklist", description: "Complete checklist to prepare for your closing day" },
  { path: "/closing-process/closing-options", title: "Closing Options", description: "Different ways to close on your home purchase" },
  { path: "/closing-disclosure", title: "Closing Disclosure", description: "Understanding your Closing Disclosure form" },
  { path: "/loan-estimate", title: "Your Loan Estimate", description: "How to read and compare Loan Estimate forms" },
  { path: "/document-checklist", title: "Document Checklist", description: "Documents you need to bring to closing" },
  { path: "/document-library", title: "Document Library", description: "Sample closing documents and templates" },
  { path: "/mortgage-calculator", title: "Mortgage Calculator", description: "Calculate your monthly mortgage payment" },
  { path: "/affordability", title: "Affordability Calculator", description: "Find out how much home you can afford" },
  { path: "/compare-loans", title: "Compare Loan Offers", description: "Side-by-side comparison of 2-3 mortgage loan offers" },
  { path: "/protect-your-rights", title: "Protect Your Rights", description: "Know your rights as a homebuyer" },
  { path: "/protect-your-money", title: "Protect Your Money", description: "How to protect yourself from wire fraud and scams" },
  { path: "/stop-fraud", title: "Stop Fraud 101", description: "Wire fraud prevention and red flags to watch for" },
  { path: "/homeowners-insurance", title: "Homeowner's Insurance", description: "Guide to homeowner's insurance coverage and costs" },
  { path: "/home-inspection", title: "Home Inspection Guide", description: "What to expect during a home inspection" },
  { path: "/escrow-guide", title: "Understanding Escrow", description: "How escrow works in a real estate transaction" },
  { path: "/find-company", title: "Find a Title Company", description: "Search for title companies and settlement agents near you" },
  { path: "/find-policy", title: "Find My Policy", description: "Locate your existing title insurance policy" },
  { path: "/glossary", title: "Real Estate Glossary", description: "Comprehensive glossary of real estate and title terms" },
  { path: "/faq", title: "Frequently Asked Questions", description: "Common questions about closing, title insurance, and more" },
  { path: "/questions-to-ask", title: "Questions to Ask", description: "Important questions to ask your title company and lender" },
  { path: "/resources", title: "Resources", description: "Additional resources for homebuyers" },
  { path: "/blog", title: "Blog & News", description: "Latest articles and news about real estate closing" },
  { path: "/sources", title: "Source Index", description: "Sources and citations referenced across the site" },
  { path: "/trivia", title: "HC101 Trivia Challenge", description: "Test your real estate closing knowledge" },
  { path: "/my-folder", title: "My Closing Folder", description: "Your saved documents and bookmarked items" },
  { path: "/join-alta", title: "In the Title Industry?", description: "Learn about ALTA membership and industry resources" },
];

/* ── Flatten glossary for search ── */
const allGlossaryTerms: GlossaryTerm[] = Object.values(glossaryData).flat();

/* ── Result types ── */
interface PageResult { type: "page"; entry: PageEntry }
interface GlossaryResult { type: "glossary"; entry: GlossaryTerm }
interface FAQResult { type: "faq"; entry: FAQItem; index: number }
type SearchResult = PageResult | GlossaryResult | FAQResult;

const MAX_PER_CATEGORY = 5;

function slugify(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openSearch = useCallback(() => {
    setOpen(true);
    setQuery("");
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  /* Focus input on open */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Escape key + body scroll lock */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, closeSearch]);

  /* Click outside */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeSearch();
  };

  /* Search logic */
  const results = useMemo((): { pages: PageResult[]; glossary: GlossaryResult[]; faq: FAQResult[] } => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { pages: [], glossary: [], faq: [] };

    const pageResults: PageResult[] = pages
      .filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .slice(0, MAX_PER_CATEGORY)
      .map(entry => ({ type: "page", entry }));

    const glossaryResults: GlossaryResult[] = allGlossaryTerms
      .filter(t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q))
      .slice(0, MAX_PER_CATEGORY)
      .map(entry => ({ type: "glossary", entry }));

    const faqResults: FAQResult[] = faqs
      .map((entry, index) => ({ type: "faq" as const, entry, index }))
      .filter(r => r.entry.q.toLowerCase().includes(q) || r.entry.a.toLowerCase().includes(q))
      .slice(0, MAX_PER_CATEGORY);

    return { pages: pageResults, glossary: glossaryResults, faq: faqResults };
  }, [query]);

  const totalResults = results.pages.length + results.glossary.length + results.faq.length;
  const hasQuery = query.trim().length >= 2;

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={openSearch}
        className="p-2 rounded-md text-alta-navy hover:bg-alta-light hover:text-alta-teal transition-colors"
        aria-label="Search site"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[75vh] flex flex-col overflow-hidden">
            {/* Search input area */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <Search className="w-5 h-5 text-alta-teal shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, glossary terms, FAQs..."
                className="flex-1 text-lg outline-none text-alta-navy placeholder:text-gray-400"
              />
              <button
                onClick={closeSearch}
                className="p-1.5 rounded-lg text-gray-400 hover:text-alta-navy hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-2">
              {hasQuery && totalResults === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
                </div>
              )}

              {!hasQuery && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm">Type at least 2 characters to search</p>
                </div>
              )}

              {/* Pages */}
              {results.pages.length > 0 && (
                <ResultSection label="Pages">
                  {results.pages.map(r => (
                    <Link
                      key={r.entry.path}
                      href={r.entry.path}
                      onClick={closeSearch}
                      className="block px-4 py-3 rounded-lg hover:bg-alta-light transition-colors group"
                    >
                      <div className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                        {highlight(r.entry.title, query)}
                      </div>
                      <div className="text-xs text-alta-gray mt-0.5">
                        {highlight(r.entry.description, query)}
                      </div>
                    </Link>
                  ))}
                </ResultSection>
              )}

              {/* Glossary */}
              {results.glossary.length > 0 && (
                <ResultSection label="Glossary">
                  {results.glossary.map(r => (
                    <Link
                      key={r.entry.term}
                      href={`/glossary#${slugify(r.entry.term)}`}
                      onClick={closeSearch}
                      className="block px-4 py-3 rounded-lg hover:bg-alta-light transition-colors group"
                    >
                      <div className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                        {highlight(r.entry.term, query)}
                      </div>
                      <div className="text-xs text-alta-gray mt-0.5 line-clamp-2">
                        {highlight(r.entry.definition, query)}
                      </div>
                    </Link>
                  ))}
                </ResultSection>
              )}

              {/* FAQ */}
              {results.faq.length > 0 && (
                <ResultSection label="FAQ">
                  {results.faq.map(r => (
                    <Link
                      key={r.index}
                      href={`/faq#faq-${r.index}`}
                      onClick={closeSearch}
                      className="block px-4 py-3 rounded-lg hover:bg-alta-light transition-colors group"
                    >
                      <div className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                        {highlight(r.entry.q, query)}
                      </div>
                      <div className="text-xs text-alta-gray mt-0.5 line-clamp-2">
                        {highlight(r.entry.a, query)}
                      </div>
                    </Link>
                  ))}
                </ResultSection>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-2.5 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-4">
              <span><kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-[10px]">ESC</kbd> to close</span>
              {hasQuery && totalResults > 0 && (
                <span>{totalResults} result{totalResults !== 1 ? "s" : ""}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Helpers ── */

function ResultSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-alta-teal">
        {label}
      </div>
      {children}
    </div>
  );
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query || query.trim().length < 2) return text;
  const q = query.trim();
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-alta-teal/15 text-alta-teal rounded-sm px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
