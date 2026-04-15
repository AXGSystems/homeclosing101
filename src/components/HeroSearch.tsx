"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { glossaryData, type GlossaryTerm } from "@/data/glossaryData";
import { faqs, type FAQItem } from "@/data/faqData";

const pages = [
  { path: "/", title: "Home", description: "Your complete guide to the real estate closing process" },
  { path: "/first-time-buyers", title: "First-Time Buyer Guide", description: "Everything first-time homebuyers need to know" },
  { path: "/closing-process", title: "The Closing Process", description: "Step-by-step overview of a real estate closing" },
  { path: "/closing-process/what-to-expect", title: "Beginning Your Journey", description: "What happens on closing day and how to prepare" },
  { path: "/closing-process/closing-costs", title: "Closing Costs Explained", description: "Breakdown of closing costs and who pays what" },
  { path: "/closing-process/closing-checklist", title: "Closing Checklist", description: "Complete checklist to prepare for your closing day" },
  { path: "/closing-disclosure", title: "Closing Disclosure", description: "Understanding your Closing Disclosure form" },
  { path: "/loan-estimate", title: "Your Loan Estimate", description: "How to read and compare Loan Estimate forms" },
  { path: "/document-checklist", title: "Closing Documents", description: "Documents you need to bring to closing" },
  { path: "/document-library", title: "Document & Resource Library", description: "Sample documents, templates, and resources" },
  { path: "/mortgage-calculator", title: "Mortgage Calculator", description: "Calculate your monthly mortgage payment" },
  { path: "/affordability", title: "Affordability Calculator", description: "Find out how much home you can afford" },
  { path: "/dti-calculator", title: "DTI Calculator", description: "Calculate your debt-to-income ratio" },
  { path: "/rent-vs-buy", title: "Rent vs. Buy Calculator", description: "Compare renting versus buying over time" },
  { path: "/compare-loans", title: "Compare Loan Offers", description: "Side-by-side comparison of mortgage offers" },
  { path: "/true-cost", title: "True Cost of Homeownership", description: "Beyond the mortgage — all the costs of owning" },
  { path: "/protect-your-rights", title: "Protect Your Rights", description: "Title insurance and property protections" },
  { path: "/protect-your-money", title: "Protect Your Money", description: "Wire fraud prevention and security" },
  { path: "/stop-fraud", title: "Stop Fraud 101", description: "Wire fraud red flags to watch for" },
  { path: "/homeowners-insurance", title: "Homeowner's Insurance", description: "Coverage types, costs, and tips" },
  { path: "/home-inspection", title: "Home Inspection Guide", description: "What to expect during a home inspection" },
  { path: "/escrow-guide", title: "Understanding Escrow", description: "How escrow works in real estate" },
  { path: "/hoa-guide", title: "HOA Guide", description: "Homeowner association fees and rules" },
  { path: "/appraisal-guide", title: "Understanding Your Home Appraisal", description: "What appraisers evaluate and why" },
  { path: "/after-closing", title: "After Closing Guide", description: "Your new homeowner checklist" },
  { path: "/tax-benefits", title: "Homeowner Tax Benefits", description: "Tax deductions and credits for homeowners" },
  { path: "/negotiation-guide", title: "Negotiation Guide", description: "How to negotiate your home purchase" },
  { path: "/find-company", title: "Find a Title Company", description: "Search for title companies near you" },
  { path: "/find-policy", title: "Find My Policy", description: "Locate your existing title insurance policy" },
  { path: "/glossary", title: "Real Estate Glossary", description: "450+ real estate and title terms" },
  { path: "/faq", title: "FAQ", description: "250+ answered questions about closing" },
  { path: "/questions-to-ask", title: "Ask Your Title Pro", description: "Questions to ask your title company" },
  { path: "/trivia", title: "Trivia & Achievements", description: "Test your homebuying knowledge" },
  { path: "/support", title: "Questions & Support", description: "Contact the HomeClosing101 team" },
];

const allGlossaryTerms: GlossaryTerm[] = Object.values(glossaryData).flat();

function slugify(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function HeroSearch({ variant = "default" }: { variant?: "default" | "header" }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHeader = variant === "header";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = query.trim().length >= 2 ? (() => {
    const q = query.toLowerCase();
    const matched: { type: "page" | "glossary" | "faq"; title: string; desc: string; href: string }[] = [];

    // Pages
    for (const p of pages) {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        matched.push({ type: "page", title: p.title, desc: p.description, href: p.path });
      }
      if (matched.length >= 8) break;
    }

    // Glossary
    if (matched.length < 8) {
      for (const t of allGlossaryTerms) {
        if (t.term.toLowerCase().includes(q)) {
          matched.push({ type: "glossary", title: t.term, desc: t.definition.slice(0, 80) + "...", href: `/glossary#${slugify(t.term)}` });
        }
        if (matched.length >= 8) break;
      }
    }

    // FAQ
    if (matched.length < 8) {
      for (const f of faqs) {
        if (f.q.toLowerCase().includes(q)) {
          matched.push({ type: "faq", title: f.q, desc: f.a.slice(0, 80) + "...", href: `/faq#${slugify(f.q)}` });
        }
        if (matched.length >= 8) break;
      }
    }

    return matched;
  })() : [];

  const showResults = focused && query.trim().length >= 2;

  const typeLabel = (type: string) => {
    if (type === "page") return { text: "Page", cls: "bg-alta-teal/20 text-alta-teal" };
    if (type === "glossary") return { text: "Term", cls: "bg-purple-100 text-purple-700" };
    return { text: "FAQ", cls: "bg-amber-100 text-amber-700" };
  };

  return (
    <div ref={wrapperRef} className={`relative ${isHeader ? "w-48 xl:w-56" : "w-full max-w-xs"}`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isHeader ? "text-alta-gray" : "text-white/50"}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search HC101..."
          className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-sm transition-all focus:outline-none ${
            isHeader
              ? "bg-alta-light border border-gray-200 text-alta-navy placeholder:text-alta-gray/50 focus:border-alta-teal focus:ring-1 focus:ring-alta-teal/20"
              : "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40"
          }`}
        />
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 sm:w-[360px] sm:right-0 sm:left-auto mt-2 bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/40 max-h-[380px] overflow-y-auto z-[100]">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-alta-gray">No results found</div>
          ) : (
            results.map((r, i) => {
              const label = typeLabel(r.type);
              return (
                <Link
                  key={`${r.type}-${i}`}
                  href={r.href}
                  onClick={() => { setQuery(""); setFocused(false); }}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/60 transition-colors border-b border-gray-100/50 last:border-0"
                >
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 mt-0.5 ${label.cls}`}>{label.text}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-alta-navy truncate">{r.title}</p>
                    <p className="text-xs text-alta-gray truncate">{r.desc}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
