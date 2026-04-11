"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "basics", label: "Title Basics" },
  { id: "insurance", label: "Insurance & Coverage" },
  { id: "costs", label: "Costs & Shopping" },
  { id: "closing", label: "The Closing" },
  { id: "fraud", label: "Fraud & Safety" },
];

const faqs = [
  { q: "What is title?", a: "Title is your legal right to own or use your property. It also establishes any limitations on those rights, such as easements or liens.", cat: "basics", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
  { q: "What is a title search?", a: "A title search is a thorough examination of public records performed early in the homebuying process to identify potential problems — such as outstanding liens, unpaid taxes, or ownership disputes — that might restrict your rights. Title professionals resolve most issues before closing, and a title insurance policy becomes available after the search is complete.", cat: "basics", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { q: "What is title insurance?", a: "Title insurance is a policy that protects your investment and property rights. There are two types: an owner's policy (which protects you) and a lender's policy (which protects the bank). Unlike other insurance that covers future events, title insurance protects against issues that already exist but haven't been discovered yet.", cat: "insurance", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { q: "Why should I purchase owner's title insurance?", a: "Owner's title insurance provides permanent protection for your property investment against future legal claims regarding ownership. For a one-time fee at closing, you and your heirs receive coverage for as long as you own the home. The policy also covers legal fees and court costs for settling covered claims. Without it, you could be personally responsible for defending your ownership — potentially costing tens of thousands of dollars.", cat: "insurance", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { q: "What does owner's title insurance cover?", a: "Protection against undiscovered title defects including: unknown mortgages, judgments, and liens; pending legal action against the property; forgery and fraudulent documents; identity theft or unauthorized mortgages; clerical errors and property line discrepancies; unknown heirs with claims to the property; and unmarketable title that prevents you from selling.", cat: "insurance", icon: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" },
  { q: "What does owner's title insurance cost?", a: "The one-time payment for owner's title insurance is relatively low compared to the value of your home. A typical policy costs around 0.5% to 1% of the home's purchase price. For a $350,000 home, that's approximately $1,750 to $3,500 — for lifetime coverage. Rates are regulated by each state's department of insurance.", cat: "costs", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { q: "How long am I covered?", a: "Your owner's title insurance policy lasts for as long as you or your heirs own the property. There are no annual premiums — you pay once at closing and you're covered for life.", cat: "insurance", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { q: "What's the difference between an owner's policy and a lender's policy?", a: "A lender's policy only protects the mortgage lender's investment — it does NOT protect you as the homeowner. An owner's policy protects your equity and ownership rights. Most lenders require a lender's policy as a condition of the mortgage, but the owner's policy is optional (and highly recommended). You often get a discount when purchasing both simultaneously.", cat: "insurance", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
  { q: "How do I file a title insurance claim?", a: "Contact your title insurance company promptly when you discover any concern about your property's title. Provide your property address, policy number, relevant documentation, and a description of the issue. Your insurer will investigate and handle the claim, including providing legal defense if needed.", cat: "insurance", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { q: "What happens at closing?", a: "Closing (also called settlement) is the final step in a real estate transaction. You'll sign documents including the Closing Disclosure, promissory note, and deed of trust. Funds are transferred, the deed is recorded, and you receive the keys to your new home. You must receive your Closing Disclosure at least 3 business days before closing.", cat: "closing", icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" },
  { q: "Can I choose my own title company?", a: "Yes! Under federal law (RESPA), you have the right to choose your own title insurance company. While your real estate agent or lender may recommend a provider, you are not obligated to use them. Shopping around can save you money and help you find a company you trust.", cat: "costs", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { q: "What is wire fraud in real estate?", a: "Wire fraud occurs when criminals intercept or impersonate parties in a real estate transaction to redirect closing funds. They hack email accounts, send fake wiring instructions, and steal down payments and closing costs — often hundreds of thousands of dollars. Losses exceeded $275 million in 2025. Always verify wiring instructions by phone using a number you already have.", cat: "fraud", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" },
  { q: "What does ALTA do?", a: "The American Land Title Association (ALTA) is the national trade organization for the title insurance industry with 6,000+ member companies. ALTA advocates for the industry, develops best practices, provides education, and helps consumers understand the importance of title insurance. ALTA does NOT issue policies directly — that's done by member title companies and underwriters.", cat: "basics", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" },
];

const catColors: Record<string, { bg: string; border: string; text: string }> = {
  basics: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  insurance: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
  costs: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
  closing: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  fraud: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
};

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState("all");

  const filtered = activeCat === "all" ? faqs : faqs.filter((f) => f.cat === activeCat);

  return (
    <>
    <PageHero
      title="Frequently Asked Questions"
      subtitle={`${faqs.length} answers about title insurance, closing, costs, and fraud protection.`}
      image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
      breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "FAQ", href: "/faq" }]}
    />

    <div className="py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page intro */}
        <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Have a Question About the Closing Process?</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Browse by category or click any question to expand the answer. Can&apos;t find what you&apos;re looking for? Try our <a href="/glossary" className="text-alta-teal font-medium hover:underline">Real Estate Glossary</a> or ask our <span className="text-alta-teal font-medium">HomeClosing101 AI assistant</span> for instant help.</p>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map((cat) => {
            const count = cat.id === "all" ? faqs.length : faqs.filter((f) => f.cat === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCat(cat.id); setOpenIdx(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCat === cat.id
                    ? "bg-alta-teal text-white shadow-md"
                    : "bg-alta-light text-alta-gray hover:bg-gray-200"
                }`}
              >
                {cat.label} <span className="ml-1 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* FAQ cards */}
        <div className="space-y-3">
          {filtered.map((faq, i) => {
            const globalIdx = faqs.indexOf(faq);
            const colors = catColors[faq.cat] || catColors.basics;
            const isOpen = openIdx === globalIdx;
            return (
              <div key={globalIdx} className={`rounded-2xl border shadow-sm overflow-hidden transition-all ${isOpen ? `${colors.border} ${colors.bg}` : "border-gray-100 bg-white hover:shadow-md"}`}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                  className="w-full flex items-center gap-4 p-5 text-left transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? `${colors.bg} ${colors.text}` : "bg-alta-light text-alta-teal"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={faq.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-alta-navy flex-1 pr-2">{faq.q}</h3>
                  <svg
                    className={`w-5 h-5 text-alta-gray shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-[4.5rem]">
                    <p className="text-sm text-alta-gray leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <h3 className="font-bold text-alta-navy mb-3">Still have questions?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/glossary" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Real Estate Glossary
            </Link>
            <Link href="/questions-to-ask" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Questions for Your Title Company
            </Link>
            <Link href="/find-company" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Find a Title Company
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
