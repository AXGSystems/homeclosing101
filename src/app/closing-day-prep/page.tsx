"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";

const bringItems = [
  {
    icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z",
    title: "Government Photo ID (2 forms)",
    desc: "Driver's license, passport, or state ID. Both must be valid and not expired. Name must match loan documents exactly.",
  },
  {
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    title: "Certified/Cashier's Check or Wire Confirmation",
    desc: "For your cash to close amount (listed on your Closing Disclosure). Payable to the settlement agent — not the seller.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Proof of Homeowner's Insurance",
    desc: "Your insurance declaration page showing coverage effective on or before closing date. Must list lender as mortgagee.",
  },
  {
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    title: "Personal Checkbook (Backup)",
    desc: "For minor last-minute adjustments to closing costs. Personal checks won't cover the main closing amount but handle small overages.",
  },
  {
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "Purchase Agreement Copy",
    desc: "Your signed contract with the seller. Verify the purchase price and terms match your Closing Disclosure.",
  },
  {
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
    title: "Most Recent Bank Statement",
    desc: "Shows the source of your down payment funds. Lender may request this for final verification before closing.",
  },
];

const dayBeforeSteps = [
  {
    title: "Confirm closing time and location",
    desc: "Call your settlement agent or real estate agent to confirm the exact time, address, and what floor or suite number. Know where to park. If it's a mobile closing, confirm the notary's arrival time.",
  },
  {
    title: "Do your final walk-through",
    desc: "Inspect the property one last time. Test all systems — HVAC, plumbing, appliances, garage doors, outlets. Verify any agreed-upon repairs were completed. This is your last chance before taking ownership.",
  },
  {
    title: "Verify wire instructions BY PHONE",
    desc: "If wiring your closing funds, call your settlement agent at a number you already have on file. Do NOT rely on emailed wire instructions — wire fraud is the #1 threat to homebuyers. Initiate the wire before your bank's cutoff time.",
  },
  {
    title: "Review your Closing Disclosure one more time",
    desc: "Compare every number to your Loan Estimate. Check your loan amount, interest rate, monthly payment, closing costs, and cash to close. Flag anything that looks different before you sit down at the table.",
  },
  {
    title: "Charge your phone and get a good night's sleep",
    desc: "You'll want your phone for any last-minute calls or to photograph signed documents. A clear head helps you stay focused during the signing — there will be a lot of paperwork.",
  },
];

const atTheTableItems = [
  {
    title: "Who will be there",
    people: [
      "Settlement agent or closing attorney",
      "Your real estate agent",
      "Seller's agent (sometimes)",
      "Lender representative (sometimes)",
      "A notary public (if not the settlement agent)",
    ],
  },
  {
    title: "Documents you'll sign",
    docs: [
      "Promissory note (your promise to repay the loan)",
      "Deed of trust / mortgage (secures the loan to the property)",
      "Closing Disclosure (final accounting of all costs)",
      "Title documents and affidavits",
      "Escrow and tax forms",
      "Initial escrow account statement",
    ],
  },
  {
    title: "How long it takes",
    detail:
      "Plan for 1 to 2 hours. Most closings take about 60-90 minutes. If both buyer and seller are present, it may take longer. Remote or e-closings may be faster.",
  },
  {
    title: "Questions you can still ask",
    questions: [
      "\"What exactly am I signing right now?\"",
      "\"Can you explain this fee on the Closing Disclosure?\"",
      "\"When will I get my keys?\"",
      "\"What happens if something is wrong after closing?\"",
      "\"Who do I contact if I have questions later?\"",
    ],
  },
];

const afterClosingItems = [
  {
    icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
    title: "Save all closing documents",
    desc: "Store physical copies in a fireproof safe and scan digital copies to cloud storage. You'll need these for taxes, refinancing, and potential disputes.",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    title: "Set up utility transfers",
    desc: "Contact electric, gas, water, sewer, internet, and trash services. Schedule transfers for your closing date or the day you move in. Don't let service lapse.",
  },
  {
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
    title: "Change the locks",
    desc: "Rekey or replace all exterior locks immediately. You don't know how many copies of the old keys exist. Include the garage door code if applicable.",
  },
  {
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    title: "File homestead exemption",
    desc: "If this is your primary residence, file for homestead exemption with your county assessor's office. This can significantly reduce your property taxes. Deadlines vary by state.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Keep your title insurance policy forever",
    desc: "Your owner's title insurance policy protects you for as long as you (or your heirs) own the property. There is no expiration. Store it with your closing documents — you may need it decades from now.",
  },
];

export default function ClosingDayPrepPage() {
  return (
    <>
      <PageHero
        title="Closing Day Preparation Guide"
        subtitle="Everything you need to know, bring, and do — the day before, the day of, and immediately after your closing. Print this page and check off each item."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "Closing Day Prep", href: "/closing-day-prep" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Print button bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6 no-print">
            <PrintButton label="Print This Guide" />
            <SaveToFolderBtn type="checklist" title="Closing Day Preparation Guide" content="Complete closing day preparation guide with packing list, timeline, and tips." />
          </div>

          {/* Print-only header */}
          <div className="hidden print:block mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Closing Day Preparation Guide</h1>
            <p className="text-sm text-gray-600 mt-1">HomeClosing101.com — Print and bring to your closing appointment</p>
            <div className="mt-2 h-0.5 bg-gray-300" />
          </div>

          {/* ─── SECTION 1: What to Bring ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">What to Bring to Closing</h2>
                <p className="text-sm text-alta-gray">Gather these items the night before. Don&apos;t leave anything to the last minute.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 print:gap-2">
              {bringItems.map((item) => (
                <div
                  key={item.title}
                  className="p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0 print:hidden">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="hidden print:inline text-sm">&#9744;</span>
                        <h3 className="font-semibold text-alta-navy text-sm">{item.title}</h3>
                      </div>
                      <p className="text-xs text-alta-gray mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECTION 2: Timeline — Day Before Closing ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">Timeline: The Day Before Closing</h2>
                <p className="text-sm text-alta-gray">Complete each step in order. Most issues discovered now can still be resolved.</p>
              </div>
            </div>

            <div className="space-y-4 print:space-y-2">
              {dayBeforeSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 print:gap-2 p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0 print:bg-transparent print:border print:border-gray-400">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-alta-navy text-sm">{step.title}</h3>
                    <p className="text-xs text-alta-gray mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECTION 3: At the Closing Table ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">At the Closing Table</h2>
                <p className="text-sm text-alta-gray">What to expect when you sit down to sign. You have every right to ask questions.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 print:gap-2">
              {/* Who will be there */}
              <div className="p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none">
                <h3 className="font-semibold text-alta-navy text-sm mb-2">{atTheTableItems[0].title}</h3>
                <ul className="space-y-1">
                  {atTheTableItems[0].people!.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-alta-gray">
                      <svg className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents you'll sign */}
              <div className="p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none">
                <h3 className="font-semibold text-alta-navy text-sm mb-2">{atTheTableItems[1].title}</h3>
                <ul className="space-y-1">
                  {atTheTableItems[1].docs!.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-alta-gray">
                      <svg className="w-3.5 h-3.5 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* How long it takes */}
              <div className="p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none">
                <h3 className="font-semibold text-alta-navy text-sm mb-2">{atTheTableItems[2].title}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{atTheTableItems[2].detail}</p>
              </div>

              {/* Questions you can still ask */}
              <div className="p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none">
                <h3 className="font-semibold text-alta-navy text-sm mb-2">{atTheTableItems[3].title}</h3>
                <ul className="space-y-1">
                  {atTheTableItems[3].questions!.map((q) => (
                    <li key={q} className="text-xs text-alta-gray italic">{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ─── SECTION 4: After Closing ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">After Closing: Immediate To-Dos</h2>
                <p className="text-sm text-alta-gray">Don&apos;t celebrate just yet — take care of these within the first week.</p>
              </div>
            </div>

            <div className="space-y-4 print:space-y-2">
              {afterClosingItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 print:gap-2 p-4 print:p-2 rounded-xl border border-gray-200 bg-white print:border-gray-300 print:rounded-none"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 print:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="hidden print:inline text-sm">&#9744;</span>
                      <h3 className="font-semibold text-alta-navy text-sm">{item.title}</h3>
                    </div>
                    <p className="text-xs text-alta-gray mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECTION 5: Wire Fraud Reminder ─── */}
          <section className="mb-10 print:mb-6 print:break-inside-avoid">
            <div className="p-5 print:p-3 bg-[#f5e8e8] rounded-2xl print:rounded-none border border-[#e4c5c5] border-l-4 border-l-[#943030]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0 print:hidden">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-[#943030] text-base mb-2">Wire Fraud Warning</h2>
                  <p className="text-sm text-alta-gray leading-relaxed mb-3">
                    Real estate wire fraud costs homebuyers hundreds of millions of dollars every year. Criminals hack email accounts and send fake wiring instructions that look legitimate. Once your money is wired to the wrong account, it is almost impossible to recover.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[#943030] font-bold text-sm shrink-0">1.</span>
                      <p className="text-sm text-alta-gray"><strong className="text-alta-navy">NEVER</strong> trust wiring instructions sent by email — even if they appear to come from your agent, lender, or title company.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#943030] font-bold text-sm shrink-0">2.</span>
                      <p className="text-sm text-alta-gray"><strong className="text-alta-navy">ALWAYS</strong> verify wiring instructions by calling a phone number you already have on file — not a number from the email.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#943030] font-bold text-sm shrink-0">3.</span>
                      <p className="text-sm text-alta-gray"><strong className="text-alta-navy">IF SOMETHING SEEMS OFF</strong> — stop. Call your settlement agent. Call your bank. It is better to delay closing than to lose your life savings.</p>
                    </div>
                  </div>
                  <div className="mt-3 no-print">
                    <Link href="/protect-your-money" className="text-sm font-semibold text-[#943030] hover:underline">
                      Learn more about wire fraud protection &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Related Pages ─── */}
          <section className="mb-10 no-print">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: "Document Checklist", desc: "Full list of every document needed for closing", href: "/document-checklist" },
                { title: "Closing Disclosure Guide", desc: "Understand every line of your CD", href: "/closing-disclosure" },
                { title: "Protect Your Money", desc: "Wire fraud prevention and recovery steps", href: "/protect-your-money" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl border border-gray-200 bg-white hover:border-alta-teal transition-colors group"
                >
                  <h3 className="font-semibold text-alta-navy text-sm group-hover:text-alta-teal transition-colors">{link.title}</h3>
                  <p className="text-xs text-alta-gray mt-1">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="no-print">
            <FirstTimeBuyerCTA />
          </div>
        </div>
      </div>
    </>
  );
}
