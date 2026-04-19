"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const vulnerabilities = [
  {
    text: "You share your SSN, bank statements, tax returns, and pay stubs with multiple parties",
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
  },
  {
    text: "Your information passes through agents, lenders, title companies, and insurance companies",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  },
  {
    text: "Emails containing sensitive documents can be intercepted by criminals",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    text: "Public records (deed recording) put your name and address in searchable databases",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
];

const parties = [
  { name: "Real Estate Agent", color: "bg-blue-100 border-blue-300 text-blue-700" },
  { name: "Mortgage Lender & Underwriter", color: "bg-green-100 border-green-300 text-green-700" },
  { name: "Title Company / Settlement Agent", color: "bg-purple-100 border-purple-300 text-purple-700" },
  { name: "Home Inspector", color: "bg-amber-100 border-amber-300 text-amber-700" },
  { name: "Insurance Company", color: "bg-red-100 border-red-300 text-red-700" },
  { name: "Appraiser", color: "bg-teal-100 border-teal-300 text-teal-700" },
  { name: "County Recorder\u2019s Office", color: "bg-gray-100 border-gray-300 text-gray-700" },
];

const protectionSteps = [
  { title: "Use Encrypted Email or Secure Portals", desc: "Never send sensitive documents through plain email. Ask your lender and title company to use their secure upload portals instead." },
  { title: "Ask About Data Security Practices", desc: "Before sharing personal information, ask each party how they store, protect, and eventually dispose of your data." },
  { title: "Ask About ALTA Best Practices Pillar 3", desc: "ALTA Best Practices Pillar 3 specifically addresses Privacy and Information Security. Ask your title company if they follow it." },
  { title: "Use a Dedicated Email Address", desc: "Create a separate email account for your real estate transaction. This limits exposure if your everyday email is compromised." },
  { title: "Set Up Credit Monitoring", desc: "Enable credit monitoring with all three bureaus during the transaction period so you are alerted immediately to any unauthorized activity." },
  { title: "Freeze Your Credit After Closing", desc: "Once you close, you will not need new credit for a while. Freezing your credit prevents anyone from opening accounts in your name." },
  { title: "Shred Physical Documents", desc: "Shred any physical documents you do not need to keep, such as extra copies of bank statements, pay stubs, or pre-approval letters." },
  { title: "Use a VPN on Public WiFi", desc: "If you access financial accounts or transaction portals on public WiFi, always use a VPN to encrypt your connection." },
];

const afterClosingChecklist = [
  "Monitor your credit reports at AnnualCreditReport.com (free weekly from all 3 bureaus)",
  "Set up fraud alerts with Equifax, Experian, and TransUnion",
  "Watch for unauthorized accounts opened in your name",
  "Monitor your property records at your county recorder\u2019s office for unauthorized changes",
  "Keep all closing documents in a secure, locked location (fireproof safe or safe deposit box)",
];

const redFlags = [
  { flag: "Anyone asking you to send personal information via unencrypted email", severity: "high" },
  { flag: "Requests for your SSN by phone from someone you did not call", severity: "high" },
  { flag: "\u201CUrgent\u201D requests to wire money or share information without verification", severity: "high" },
  { flag: "Unfamiliar parties requesting access to your financial documents", severity: "medium" },
];

const resources = [
  { name: "AnnualCreditReport.com", desc: "Free weekly credit reports from all 3 bureaus", url: "https://www.annualcreditreport.com/" },
  { name: "IdentityTheft.gov", desc: "FTC identity theft reporting and recovery plan", url: "https://www.identitytheft.gov/" },
  { name: "Equifax Credit Freeze", desc: "Freeze your Equifax credit report", url: "https://www.equifax.com/personal/credit-report-services/credit-freeze/" },
  { name: "Experian Credit Freeze", desc: "Freeze your Experian credit report", url: "https://www.experian.com/freeze/center.html" },
  { name: "TransUnion Credit Freeze", desc: "Freeze your TransUnion credit report", url: "https://www.transunion.com/credit-freeze" },
];

export default function IdentityProtectionPage() {
  return (
    <>
      <PageHero
        title="Protecting Your Identity During Your Home Purchase"
        subtitle="During a home purchase, you share your most sensitive personal information with multiple parties. Learn how to protect yourself before, during, and after closing."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80"
        breadcrumb={[
          { label: "Protect Your Property", href: "/protect-your-rights" },
          { label: "Identity Protection", href: "/identity-protection" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Intro callout */}
          <div className="mb-6 p-4 bg-[#f5e8e8] rounded-2xl border border-[#e4c5c5] border-l-4 border-l-[#943030] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Identity Is at Risk During Closing</h2>
                <p className="text-sm text-alta-gray leading-relaxed">A real estate transaction requires you to hand over Social Security numbers, bank account details, tax returns, and pay stubs to multiple parties. This page explains who has your data, how to protect it, and what to do after closing to guard against identity theft.</p>
              </div>
            </div>
          </div>

          {/* Section 1: Why Real Estate Makes You Vulnerable */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Why Real Estate Makes You Vulnerable</h2>
          <p className="text-sm text-alta-gray mb-4">A home purchase is one of the most information-intensive transactions you will ever complete. Here is why it creates unique identity theft risks:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {vulnerabilities.map((v, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <div className="w-10 h-10 rounded-lg bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <p className="text-sm text-alta-navy leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Section 2: Who Has Your Information */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Who Has Your Information</h2>
          <p className="text-sm text-alta-gray mb-4">During a typical home purchase, your sensitive personal and financial data is shared with all of these parties:</p>
          <div className="relative mb-10">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#943030] flex items-center justify-center shadow-lg">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-alta-navy mt-2">You (The Buyer)</p>
              <p className="text-[10px] text-alta-gray">SSN, bank accounts, tax returns, pay stubs, ID</p>
            </div>
            {/* Connection lines visual */}
            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-auto" />
            <div className="hidden sm:block h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-8 mb-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {parties.map((p) => (
                <div key={p.name} className={`p-3 rounded-xl border-2 text-center ${p.color} tile-interactive`}>
                  <p className="text-xs font-bold leading-tight">{p.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Section 3: How to Protect Yourself */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">How to Protect Yourself</h2>
          <p className="text-sm text-alta-gray mb-4">Take these steps before and during your transaction to minimize identity theft risk:</p>
          <div className="space-y-3 mb-10">
            {protectionSteps.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <span className="w-7 h-7 rounded-full bg-alta-teal text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <div>
                  <h3 className="text-sm font-bold text-alta-navy">{s.title}</h3>
                  <p className="text-xs text-alta-gray mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Section 4: After-Closing Identity Checklist */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">After-Closing Identity Checklist</h2>
          <p className="text-sm text-alta-gray mb-4">Your personal information does not become less valuable after closing. Stay vigilant:</p>
          <div className="bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] p-6 mb-10">
            <div className="space-y-2">
              {afterClosingChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-5 h-5 rounded border-2 border-alta-teal/40 shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-[10px] text-alta-teal font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-alta-navy leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Section 5: Red Flags During Your Transaction */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Red Flags During Your Transaction</h2>
          <p className="text-sm text-alta-gray mb-4">If you encounter any of these during your transaction, stop and verify before proceeding:</p>
          <div className="space-y-2 mb-10">
            {redFlags.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border-l-4 ${r.severity === "high" ? "bg-red-50 border-[#943030] border-red-200" : "bg-amber-50 border-[#8b6914] border-amber-200"} border`}>
                <svg className={`w-5 h-5 shrink-0 mt-0.5 ${r.severity === "high" ? "text-[#943030]" : "text-[#8b6914]"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.168-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.457-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-alta-navy font-medium leading-relaxed">{r.flag}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Section 6: Resources */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Identity Protection Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {resources.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="group p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive">
                <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{r.name}</h3>
                <p className="text-xs text-alta-gray mt-0.5">{r.desc}</p>
                <span className="text-xs text-alta-teal font-medium mt-2 inline-flex items-center gap-1">
                  Visit site
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </span>
              </a>
            ))}
          </div>

          <InlineAd />

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Related Topics */}
          <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/protect-your-money" className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Money</h3>
              <p className="text-[10px] text-alta-gray mt-1">Wire fraud overview, recovery steps, and what your title company should do</p>
            </Link>
            <Link href="/stop-fraud" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Stop Fraud 101</h3>
              <p className="text-[10px] text-alta-gray mt-1">10 verified prevention steps from the FBI, CFPB, NAR, and ALTA</p>
            </Link>
            <Link href="/document-checklist" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Document Checklist</h3>
              <p className="text-[10px] text-alta-gray mt-1">Every document you need for closing and how to keep them secure</p>
            </Link>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
