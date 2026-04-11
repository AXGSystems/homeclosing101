"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "The Closing Process",
    href: "/closing-process",
    children: [
      { label: "What to Expect", href: "/closing-process/what-to-expect" },
      { label: "Closing Options", href: "/closing-process/closing-options" },
      { label: "Closing Checklist", href: "/closing-process/closing-checklist" },
      { label: "Closing Costs Explained", href: "/closing-process/closing-costs" },
      { label: "Document Checklist", href: "/document-checklist" },
    ],
  },
  {
    label: "Tools & Calculators",
    href: "/mortgage-calculator",
    children: [
      { label: "Mortgage Calculator", href: "/mortgage-calculator" },
      { label: "Affordability Calculator", href: "/affordability" },
      { label: "Closing Cost Calculator", href: "/closing-process/closing-costs" },
      { label: "First-Time Buyer Guide", href: "/first-time-buyers" },
    ],
  },
  { label: "Protect Your Rights", href: "/protect-your-rights" },
  {
    label: "Protect Your Money",
    href: "/protect-your-money",
    children: [
      { label: "Wire Fraud Overview", href: "/protect-your-money" },
      { label: "Stop Fraud 101", href: "/stop-fraud" },
    ],
  },
  { label: "Find a Company", href: "/find-company" },
  { label: "Find My Policy", href: "/find-policy" },
  {
    label: "Resources",
    href: "/faq",
    children: [
      { label: "FAQ", href: "/faq" },
      { label: "Real Estate Glossary", href: "/glossary" },
      { label: "Questions to Ask", href: "/questions-to-ask" },
      { label: "Blog & News", href: "/blog" },
      { label: "Other Resources", href: "/resources" },
      { label: "In the Title Industry?", href: "/join-alta" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-sm z-50">
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-alta-navy hover:text-alta-teal rounded-md transition-colors"
                >
                  {item.label}
                  {item.children && (
                    <svg className="inline-block w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-alta-navy hover:bg-alta-light hover:text-alta-teal transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-alta-navy hover:bg-alta-light"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[70vh] overflow-y-auto">
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
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-6 py-2 text-sm text-alta-gray hover:text-alta-teal hover:bg-alta-light/50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
