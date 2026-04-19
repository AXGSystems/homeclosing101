"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import SiteSearch from "@/components/SiteSearch";
import { Search } from "lucide-react";
import { glossaryData } from "@/data/glossaryData";
import { faqs } from "@/data/faqData";
const navItems = [
  {
    label: "The Closing Process",
    href: "/closing-process",
    children: [
      { label: "BEFORE YOU BUY", href: "", divider: true },
      { label: "Beginning Your Journey", href: "/closing-process/what-to-expect" },
      { label: "Home Inspection Guide", href: "/home-inspection" },
      { label: "Understanding Your Appraisal", href: "/appraisal-guide" },
      { label: "Negotiation Guide", href: "/negotiation-guide" },
      { label: "YOUR DOCUMENTS", href: "", divider: true },
      { label: "Your Loan Estimate", href: "/loan-estimate" },
      { label: "Closing Costs Explained", href: "/closing-process/closing-costs" },
      { label: "LE vs CD Comparison", href: "/le-vs-cd" },
      { label: "Understanding Escrow", href: "/escrow-guide" },
      { label: "Closing Documents", href: "/document-checklist" },
      { label: "CLOSING DAY", href: "", divider: true },
      { label: "Closing Options", href: "/closing-process/closing-options" },
      { label: "Closing Checklist", href: "/closing-process/closing-checklist" },
      { label: "Closing Day Prep", href: "/closing-day-prep" },
      { label: "Homeowner Tax Benefits", href: "/tax-benefits" },
    ],
  },
  {
    label: "Tools & Calculators",
    href: "/mortgage-calculator",
    children: [
      { label: "CALCULATORS", href: "", divider: true },
      { label: "Mortgage Calculator", href: "/mortgage-calculator" },
      { label: "Affordability Calculator", href: "/affordability" },
      { label: "DTI Calculator", href: "/dti-calculator" },
      { label: "Rent vs Buy", href: "/rent-vs-buy" },
      { label: "True Cost of Homeownership", href: "/true-cost" },
      { label: "PLANNING TOOLS", href: "", divider: true },
      { label: "Compare Loans", href: "/compare-loans" },
      { label: "First-Time Buyer Guide", href: "/first-time-buyers" },
    ],
  },
  {
    label: "Protect Your Property",
    href: "/protect-your-rights",
    children: [
      { label: "UNDERSTAND YOUR COVERAGE", href: "", divider: true },
      { label: "Title Insurance & Property Rights", href: "/protect-your-rights" },
      { label: "Your Property Rights", href: "/property-rights" },
      { label: "Homeowner's Insurance", href: "/homeowners-insurance" },
      { label: "HOA Guide", href: "/hoa-guide" },
      { label: "PREVENT FRAUD", href: "", divider: true },
      { label: "Wire Fraud Overview", href: "/protect-your-money" },
      { label: "Stop Fraud 101", href: "/stop-fraud" },
      { label: "Title Theft & Title Fraud", href: "/deed-theft" },
      { label: "Protect Against Title Fraud", href: "/protect-against-deed-fraud" },
      { label: "Identity Protection", href: "/identity-protection" },
      { label: "AFTER CLOSING", href: "", divider: true },
      { label: "After Closing Guide", href: "/after-closing" },
    ],
  },
  { label: "Find a Company", href: "/find-company" },
  { label: "Find My Policy", href: "/find-policy" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "LEARN", href: "", divider: true },
      { label: "FAQ", href: "/faq" },
      { label: "Real Estate Glossary", href: "/glossary" },
      { label: "Blog & News", href: "/blog" },
      { label: "Source Index", href: "/sources" },
      { label: "MY HC101", href: "", divider: true },
      { label: "My Closing Folder", href: "/my-folder" },
      { label: "My Homebuying Journey", href: "/my-journey" },
      { label: "Trivia Challenge", href: "/trivia" },
      { label: "Achievements", href: "/achievements" },
      { label: "CONNECT", href: "", divider: true },
      { label: "Emergency Contacts", href: "/emergency-contacts" },
      { label: "Ask Your Title Pro", href: "/questions-to-ask" },
      { label: "Document Library", href: "/document-library" },
      { label: "All Resources", href: "/resources" },
      { label: "In the Title Industry?", href: "/join-alta" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-[var(--bg-primary)] shadow-sm z-50 border-b-2 border-transparent" style={{ borderImage: 'linear-gradient(to right, #1a2744, #0a8ebc) 1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-alta-teal flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-alta-navy text-lg">HomeClosing</span>
              <span className="font-bold text-alta-teal text-lg">101</span>
              <div className="text-[10px] text-alta-gray tracking-wider uppercase -mt-1">Find. Buy. Protect.</div>
            </div>
          </Link>

          {/* Desktop Nav — close to logo */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-4" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="relative px-1.5 xl:px-2 py-2 text-[12px] xl:text-[13px] font-medium text-alta-navy hover:text-alta-teal rounded-md transition-colors whitespace-nowrap group/nav after:absolute after:bottom-0 after:left-1 after:right-1 after:h-0.5 after:bg-alta-teal after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {item.label}
                  {item.children && (
                    <svg className="inline-block w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-[var(--bg-primary)] rounded-lg shadow-lg border border-[var(--border-color)] py-2 z-50">
                    {item.children.map((child, ci) => (
                      "divider" in child && child.divider ? (
                        <div key={ci} className={`px-4 pt-3 pb-1 ${ci > 0 ? "border-t border-gray-100 mt-1" : ""}`}>
                          <span className="text-[11px] font-bold text-alta-teal uppercase tracking-wider">{child.label}</span>
                        </div>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-1.5 text-sm text-alta-navy hover:bg-alta-light hover:text-alta-teal transition-colors"
                        >
                          {child.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Inline search bar */}
            <div className="ml-3">
              <HeaderSearch />
            </div>
          </nav>

          {/* Mobile: search + toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <SiteSearch />
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-alta-navy hover:bg-alta-light"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Nav */}
      <nav className={`lg:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)] overflow-y-auto shadow-inner transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0 overflow-hidden border-t-0'}`} role="navigation" aria-label="Mobile navigation">
        <div className="px-4 py-3 space-y-0.5">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-3 py-2.5 text-sm font-semibold text-alta-navy hover:text-alta-teal hover:bg-alta-light rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child, ci) => (
                "divider" in child && child.divider ? (
                  <div key={ci} className={`px-6 pt-3 pb-1 ${ci > 0 ? "border-t border-gray-100 mt-1" : ""}`}>
                    <span className="text-[11px] font-bold text-alta-teal uppercase tracking-wider">{child.label}</span>
                  </div>
                ) : (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-6 py-2 text-sm text-alta-gray hover:text-alta-teal hover:bg-alta-light/50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                )
              ))}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

/* ═══ Inline Header Search ═══ */
const searchPages = [
  { path: "/first-time-buyers", title: "First-Time Buyer Guide" },
  { path: "/closing-process", title: "The Closing Process" },
  { path: "/mortgage-calculator", title: "Mortgage Calculator" },
  { path: "/protect-your-rights", title: "Title Insurance & Your Rights" },
  { path: "/stop-fraud", title: "Stop Fraud 101" },
  { path: "/glossary", title: "Real Estate Glossary" },
  { path: "/faq", title: "FAQ" },
  { path: "/find-company", title: "Find a Title Company" },
  { path: "/affordability", title: "Affordability Calculator" },
  { path: "/hoa-guide", title: "HOA Guide" },
  { path: "/deed-theft", title: "Title Theft & Title Fraud" },
  { path: "/protect-against-deed-fraud", title: "Protect Against Title Fraud" },
  { path: "/closing-process/closing-costs", title: "Closing Costs Explained" },
  { path: "/closing-process/closing-checklist", title: "Closing Checklist" },
  { path: "/home-inspection", title: "Home Inspection Guide" },
  { path: "/escrow-guide", title: "Understanding Escrow" },
  { path: "/loan-estimate", title: "Your Loan Estimate" },
  { path: "/homeowners-insurance", title: "Homeowner's Insurance" },
  { path: "/rent-vs-buy", title: "Rent vs Buy" },
  { path: "/dti-calculator", title: "DTI Calculator" },
  { path: "/trivia", title: "HC101 Trivia" },
  { path: "/property-rights", title: "Your Property Rights" },
  { path: "/tax-benefits", title: "Homeowner Tax Benefits" },
  { path: "/blog", title: "Blog & News" },
  { path: "/identity-protection", title: "Identity Protection" },
  { path: "/after-closing", title: "After Closing Guide" },
  { path: "/true-cost", title: "True Cost of Homeownership" },
  { path: "/compare-loans", title: "Compare Loans" },
  { path: "/negotiation-guide", title: "Negotiation Guide" },
  { path: "/my-folder", title: "My Closing Folder" },
];

const allTerms = Object.values(glossaryData).flat();

function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = query.trim().toLowerCase();
  const showResults = focused && q.length >= 2;

  const pageResults = q.length >= 2 ? searchPages.filter(p => p.title.toLowerCase().includes(q)).slice(0, 5) : [];
  const glossaryResults = q.length >= 2 ? allTerms.filter(t => t.term.toLowerCase().includes(q)).slice(0, 3) : [];
  const faqResults = q.length >= 2 ? faqs.filter(f => f.q.toLowerCase().includes(q)).slice(0, 3) : [];
  const hasResults = pageResults.length + glossaryResults.length + faqResults.length > 0;

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2 w-48 xl:w-56 focus-within:ring-2 focus-within:ring-alta-teal/40 focus-within:bg-white transition-all">
        <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search HC101..."
          className="bg-transparent outline-none text-xs text-alta-navy placeholder:text-gray-400 w-full"
        />
      </div>
      {showResults && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[999] max-h-[70vh] overflow-y-auto">
          {!hasResults && (
            <p className="text-xs text-gray-400 text-center py-4">No results for &ldquo;{query}&rdquo;</p>
          )}
          {pageResults.length > 0 && (
            <>
              <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-alta-teal uppercase tracking-wider">Pages</p>
              {pageResults.map(p => (
                <Link key={p.path} href={p.path} onClick={() => { setQuery(""); setFocused(false); }} className="block px-3 py-2 text-sm text-alta-navy hover:bg-alta-light hover:text-alta-teal transition-colors">
                  {p.title}
                </Link>
              ))}
            </>
          )}
          {glossaryResults.length > 0 && (
            <>
              <p className="px-3 pt-3 pb-1 text-[10px] font-bold text-alta-teal uppercase tracking-wider border-t border-gray-100 mt-1">Glossary</p>
              {glossaryResults.map(t => (
                <Link key={t.term} href={`/glossary`} onClick={() => { setQuery(""); setFocused(false); }} className="block px-3 py-2 hover:bg-alta-light transition-colors">
                  <span className="text-sm font-semibold text-alta-navy">{t.term}</span>
                  <span className="block text-xs text-alta-gray line-clamp-1">{t.definition}</span>
                </Link>
              ))}
            </>
          )}
          {faqResults.length > 0 && (
            <>
              <p className="px-3 pt-3 pb-1 text-[10px] font-bold text-alta-teal uppercase tracking-wider border-t border-gray-100 mt-1">FAQ</p>
              {faqResults.map((f, i) => (
                <Link key={i} href="/faq" onClick={() => { setQuery(""); setFocused(false); }} className="block px-3 py-2 hover:bg-alta-light transition-colors">
                  <span className="text-sm text-alta-navy line-clamp-1">{f.q}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

