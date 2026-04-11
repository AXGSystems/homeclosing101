"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

const docSections = [
  {
    title: "Identification",
    color: "blue",
    docs: [
      { name: "Government-issued photo ID", desc: "Driver's license, passport, or state ID. Must be valid and not expired.", required: true },
      { name: "Social Security card", desc: "Or documentation showing your SSN. Some states require this.", required: false },
      { name: "Proof of legal residency", desc: "If applicable — green card, visa, or citizenship documents.", required: false },
    ],
  },
  {
    title: "Financial Documents",
    color: "green",
    docs: [
      { name: "Certified/cashier's check or wire confirmation", desc: "For your closing costs and down payment. Amount will be on your Closing Disclosure.", required: true },
      { name: "Proof of homeowner's insurance", desc: "Your insurance binder showing coverage effective on or before closing date.", required: true },
      { name: "Bank statements (last 2-3 months)", desc: "Showing the source of your down payment funds.", required: true },
      { name: "Pay stubs (last 30 days)", desc: "Your lender may request updated employment verification.", required: false },
    ],
  },
  {
    title: "Loan & Property Documents",
    color: "amber",
    docs: [
      { name: "Closing Disclosure", desc: "Received at least 3 days before closing. Compare to your Loan Estimate.", required: true },
      { name: "Loan Estimate (for comparison)", desc: "Your original estimate to verify costs haven't changed unexpectedly.", required: false },
      { name: "Purchase agreement / contract", desc: "The signed agreement between you and the seller.", required: false },
      { name: "Home inspection report", desc: "For reference during final walk-through.", required: false },
      { name: "Appraisal report", desc: "Your lender should have this on file, but bring your copy.", required: false },
    ],
  },
  {
    title: "Title & Insurance Documents",
    color: "purple",
    docs: [
      { name: "Title commitment/report", desc: "Shows the status of the property title and any exceptions.", required: true },
      { name: "Owner's title insurance policy info", desc: "If you've arranged your own title insurance (recommended).", required: false },
      { name: "Survey (if required)", desc: "Property boundary survey — some states require this.", required: false },
      { name: "Flood certification", desc: "Determines if the property is in a flood zone.", required: false },
    ],
  },
  {
    title: "Post-Closing Essentials",
    color: "teal",
    docs: [
      { name: "Copy of all signed documents", desc: "Your settlement agent should provide a complete packet.", required: true },
      { name: "Keys, garage openers, access codes", desc: "You should receive these at or immediately after closing.", required: true },
      { name: "Contact info for your title company", desc: "In case you need to file a claim or find your policy later.", required: true },
      { name: "Utility transfer confirmations", desc: "Water, electric, gas, internet — confirm effective dates.", required: false },
      { name: "Change of address confirmation", desc: "USPS, banks, subscriptions, employer, DMV.", required: false },
    ],
  },
];

const colorMap: Record<string, { border: string; badge: string; icon: string }> = {
  blue: { border: "border-blue-200", badge: "bg-blue-100 text-blue-700", icon: "text-blue-600" },
  green: { border: "border-green-200", badge: "bg-green-100 text-green-700", icon: "text-green-600" },
  amber: { border: "border-amber-200", badge: "bg-amber-100 text-amber-700", icon: "text-amber-600" },
  purple: { border: "border-purple-200", badge: "bg-purple-100 text-purple-700", icon: "text-purple-600" },
  teal: { border: "border-teal-200", badge: "bg-teal-100 text-teal-700", icon: "text-teal-600" },
};

export default function DocumentChecklistPage() {
  return (
    <>
      <PageHero
        title="Closing Day Document Checklist"
        subtitle="Everything you need to bring to your closing appointment — organized by category and marked by importance."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Document Checklist", href: "/document-checklist" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-4 p-4 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 sticky top-[120px] sm:top-[130px] z-20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Don&apos;t Forget Anything on Closing Day</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Print this checklist and verify each item before you leave for your closing appointment. Items marked with a star are required — the rest are recommended. Your settlement agent may have additional requirements specific to your state.</p>
              </div>
            </div>
          </div>

          <button onClick={() => window.print()} className="no-print inline-flex items-center gap-2 px-5 py-2.5 bg-alta-navy text-white font-semibold rounded-lg hover:bg-alta-teal transition-colors text-sm mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print This Checklist
          </button>

          <div className="space-y-8">
            {docSections.map((section) => {
              const c = colorMap[section.color];
              return (
                <div key={section.title} className={`rounded-2xl border ${c.border} overflow-hidden`}>
                  <div className={`px-5 py-3 ${c.badge} font-bold text-sm flex items-center justify-between`}>
                    <span>{section.title}</span>
                    <span className="text-xs font-normal opacity-70">{section.docs.length} items</span>
                  </div>
                  <div className="p-4 space-y-2 bg-white">
                    {section.docs.map((doc) => (
                      <div key={doc.name} className="flex items-start gap-3 p-3 bg-alta-light/50 rounded-xl hover:bg-alta-light transition-colors">
                        <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-alta-navy">{doc.name}</p>
                            {doc.required && <span className="text-[9px] font-bold bg-alta-teal text-white px-1.5 py-0.5 rounded">REQUIRED</span>}
                          </div>
                          <p className="text-xs text-alta-gray mt-0.5">{doc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <InlineAd />

          {/* Pre-closing timeline */}
          <h2 className="text-xl font-bold text-alta-navy mb-4 mt-6">Pre-Closing Document Timeline</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Documents don&apos;t all arrive at once. Here&apos;s when to expect each one so you&apos;re not scrambling at the last minute:</p>
          <div className="space-y-3 mb-8">
            {[
              { when: "2-4 weeks before closing", what: "Title commitment arrives from your title company. Review Schedule B exceptions carefully — these are items NOT covered by your policy. Ask about removing any that can be cleared.", color: "bg-blue-50 border-blue-200" },
              { when: "1-2 weeks before closing", what: "Homeowner's insurance binder finalized. Your lender needs proof of coverage effective on or before closing date. Also set up utilities — some require 5-7 business days to activate.", color: "bg-green-50 border-green-200" },
              { when: "3 business days before closing", what: "Closing Disclosure delivered (required by federal law). Compare EVERY line to your Loan Estimate. If anything increased beyond tolerance limits, ask your lender to explain. This is your last chance to catch errors.", color: "bg-amber-50 border-amber-200" },
              { when: "1-2 days before closing", what: "Confirm wire transfer amount and instructions BY PHONE using a number you already have. Never trust emailed wire instructions. Contact your bank about wire cutoff times.", color: "bg-red-50 border-red-200" },
              { when: "Day of closing", what: "Complete final walk-through of the property. Bring all documents listed above, two forms of ID, and your certified funds or wire confirmation. Arrive early — closings typically take 30-90 minutes.", color: "bg-purple-50 border-purple-200" },
            ].map((t) => (
              <div key={t.when} className={`p-4 ${t.color} rounded-xl border tile-interactive`}>
                <p className="text-sm font-bold text-alta-navy mb-1">{t.when}</p>
                <p className="text-xs text-alta-gray leading-relaxed">{t.what}</p>
              </div>
            ))}
          </div>

          {/* Common mistakes */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">5 Common Document Mistakes That Delay Closings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { mistake: "Expired ID", fix: "Check your driver's license or passport expiration date NOW. If it expires before your closing date, renew it immediately." },
              { mistake: "Wrong insurance dates", fix: "Your homeowner's insurance must be effective ON or BEFORE your closing date — not the day after. Double-check the effective date." },
              { mistake: "Unsigned Closing Disclosure", fix: "If you haven't reviewed and acknowledged your Closing Disclosure at least 3 days before closing, the closing date may need to be pushed." },
              { mistake: "Wire sent to wrong account", fix: "Always verify wire instructions by phone. If you wired to a fraudulent account, contact your bank within the hour for the best chance of recovery." },
              { mistake: "Missing earnest money credit", fix: "Verify your earnest money deposit appears as a credit on the Closing Disclosure. If it's missing, alert your settlement agent before closing." },
            ].map((m) => (
              <div key={m.mistake} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-red mb-1">{m.mistake}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{m.fix}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Full Closing Checklist
            </Link>
            <Link href="/questions-to-ask" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Questions to Ask
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
