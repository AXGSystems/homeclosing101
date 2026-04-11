import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Your Closing Disclosure",
  description: "A page-by-page guide to the 5-page Closing Disclosure — the most important document you'll review before signing on your home.",
};

const pages = [
  {
    page: "Page 1 — Loan Terms & Costs",
    color: "from-[#1a5276] to-[#154463]",
    sections: [
      { name: "Closing Information", what: "Date issued, closing date, property address, sale price, and the settlement agent's information.", lookFor: "Verify the closing date and property address are correct. Confirm the settlement agent is who you expect — especially if you chose your own title company." },
      { name: "Transaction Information", what: "Names of borrower(s), seller(s), and lender.", lookFor: "Check that all names are spelled correctly. Errors here can delay recording of your deed." },
      { name: "Loan Terms", what: "Final loan amount, interest rate, monthly principal and interest, whether there's a prepayment penalty or balloon payment.", lookFor: "Compare every number to your Loan Estimate. The interest rate should match your locked rate. If anything changed, your lender must explain why." },
      { name: "Projected Payments", what: "Your estimated total monthly payment broken into principal and interest, mortgage insurance, and estimated escrow.", lookFor: "Note the column showing how payments may change over time (especially for adjustable-rate mortgages). Make sure escrow includes both property tax and insurance." },
      { name: "Costs at Closing", what: "Total closing costs and the cash you need to close (or cash back if applicable).", lookFor: "Compare this to Page 1 of your Loan Estimate. If closing costs increased significantly, ask why. Some fees have tolerance limits — they can't increase beyond certain thresholds." },
    ],
  },
  {
    page: "Page 2 — Closing Cost Details",
    color: "from-[#2d6b3f] to-[#235532]",
    sections: [
      { name: "Loan Costs", what: "Origination charges, points, and services required by the lender (appraisal, credit report, flood determination, tax monitoring, title services).", lookFor: "Compare every line to your Loan Estimate. Zero-tolerance fees (origination, transfer taxes) CANNOT increase. 10%-tolerance fees (title services, recording) can increase up to 10% in aggregate." },
      { name: "Other Costs", what: "Government recording fees, transfer taxes, prepaids (homeowner's insurance, mortgage insurance, prepaid interest, property taxes), initial escrow deposit, and owner's title insurance.", lookFor: "Make sure owner's title insurance is included. Verify the prepaid interest calculation — it should cover from your closing date to the end of that month. Check that your homeowner's insurance premium matches your policy." },
    ],
  },
  {
    page: "Page 3 — Cash to Close & Summary",
    color: "from-[#8b6914] to-[#705410]",
    sections: [
      { name: "Calculating Cash to Close", what: "Side-by-side comparison of your Loan Estimate vs. the final Closing Disclosure amounts, showing exactly what changed and why.", lookFor: "This is the most important comparison on the entire document. If any 'Did this change?' column says 'YES,' read the explanation carefully. You have the right to question any increase." },
      { name: "Summaries of Transactions", what: "Detailed accounting of the buyer's and seller's transactions — every credit, debit, adjustment, and proration.", lookFor: "Verify your earnest money deposit is credited. Check that any seller concessions appear. Make sure prorated property taxes are calculated correctly based on your closing date." },
    ],
  },
  {
    page: "Page 4 — Additional Information",
    color: "from-[#5b3a8c] to-[#482d70]",
    sections: [
      { name: "Loan Disclosures", what: "Whether the loan allows assumption, has a demand feature, whether the lender will service the loan or transfer servicing, and escrow account details.", lookFor: "If 'Transfer of servicing' is likely, your loan payments may go to a different company after closing. This is normal — your loan terms don't change." },
      { name: "Adjustable Rate / Interest Rate Table", what: "For adjustable-rate mortgages: the index, margin, adjustment schedule, caps on rate and payment changes.", lookFor: "If you have an adjustable rate, understand when your first adjustment happens and the maximum your rate and payment can increase per adjustment and over the life of the loan." },
    ],
  },
  {
    page: "Page 5 — Loan Calculations & Contact Info",
    color: "from-[#943030] to-[#7a2020]",
    sections: [
      { name: "Loan Calculations", what: "Total of payments over the life of the loan, finance charge (total interest plus fees), amount financed, and Annual Percentage Rate (APR).", lookFor: "The 'Total of Payments' number can be eye-opening — it shows the true cost of your loan including all interest. Use this to understand the long-term impact of your interest rate." },
      { name: "Other Disclosures", what: "Appraisal information, contract details, and whether you can receive a copy of the appraisal.", lookFor: "You have the right to receive a copy of your appraisal at least 3 days before closing. If you haven't received it, ask." },
      { name: "Contact Information", what: "Complete contact details and licensing information for the lender, mortgage broker, real estate agents, and settlement agent.", lookFor: "Verify your settlement agent/title company is correct. If you're filing a complaint later, this is where you'll find the licensing numbers you need." },
      { name: "Confirm Receipt", what: "A signature line confirming you received the Closing Disclosure. This does NOT commit you to the loan — it only confirms receipt.", lookFor: "Signing here does NOT mean you agree to the terms. You still have time to review and ask questions before the closing appointment." },
    ],
  },
];

export default function ClosingDisclosurePage() {
  return (
    <>
      <PageHero
        title="Understanding Your Closing Disclosure"
        subtitle="The Closing Disclosure is a 5-page form you'll receive at least 3 business days before closing. It contains the final terms of your mortgage and every cost you'll pay."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Closing Disclosure", href: "/closing-disclosure" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sticky top-[130px] sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">The Most Important Document You&apos;ll Read Before Signing</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Under the CFPB&apos;s TRID rule, your lender must deliver this form at least 3 business days before closing. Use that time to compare it line-by-line with your Loan Estimate. If anything looks wrong, contact your lender and settlement agent BEFORE closing day. <a href="https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" target="_blank" rel="noopener noreferrer" className="text-alta-teal font-medium hover:underline">See the CFPB&apos;s annotated Closing Disclosure</a></p>
              </div>
            </div>
          </div>

          {/* 3-day rule */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              <div>
                <p className="text-sm font-bold text-alta-navy mb-1">The 3-Business-Day Rule</p>
                <p className="text-xs text-alta-gray leading-relaxed">Federal law requires you to receive the Closing Disclosure at least 3 business days before closing. If there are certain changes after delivery (APR increases by more than 1/8%, a prepayment penalty is added, or the loan product changes), a new 3-day waiting period begins. This is your protection — use the time to review every number carefully. Source: CFPB TRID Rule</p>
              </div>
            </div>
          </div>

          {/* Page breakdown */}
          <h2 className="text-xl font-bold text-alta-navy mb-6">Page-by-Page Breakdown</h2>
          <div className="space-y-6 mb-10">
            {pages.map((pg) => (
              <div key={pg.page} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className={`bg-gradient-to-r ${pg.color} px-5 py-3`}>
                  <h3 className="text-white font-bold text-sm">{pg.page}</h3>
                </div>
                <div className="p-5 space-y-4 bg-white">
                  {pg.sections.map((s) => (
                    <div key={s.name}>
                      <h4 className="font-bold text-alta-navy text-sm mb-1">{s.name}</h4>
                      <p className="text-xs text-alta-gray leading-relaxed mb-2"><strong>What it shows:</strong> {s.what}</p>
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <p className="text-xs text-amber-800 leading-relaxed"><strong>What to look for:</strong> {s.lookFor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* Comparison checklist */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Loan Estimate vs. Closing Disclosure: What to Compare</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-alta-navy text-white">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">Item</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">Can It Increase?</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">Tolerance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Lender origination charges</td><td className="px-4 py-2.5 text-red-600 font-medium">No</td><td className="px-4 py-2.5 text-alta-gray">Zero tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Discount points</td><td className="px-4 py-2.5 text-red-600 font-medium">No</td><td className="px-4 py-2.5 text-alta-gray">Zero tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Transfer taxes</td><td className="px-4 py-2.5 text-red-600 font-medium">No</td><td className="px-4 py-2.5 text-alta-gray">Zero tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Title services (lender-selected)</td><td className="px-4 py-2.5 text-amber-600 font-medium">Up to 10%</td><td className="px-4 py-2.5 text-alta-gray">10% aggregate tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Recording fees</td><td className="px-4 py-2.5 text-amber-600 font-medium">Up to 10%</td><td className="px-4 py-2.5 text-alta-gray">10% aggregate tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Title services (you chose)</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">No tolerance limit</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Owner&apos;s title insurance</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">No tolerance limit (you shopped)</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Prepaid interest</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">Depends on closing date</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Homeowner&apos;s insurance</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">You chose the provider</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-alta-gray mb-8">Source: CFPB TRID Rule — fee tolerance categories. If a zero-tolerance fee increased, your lender must cure (refund) the difference at or after closing.</p>

          {/* 5-step review process */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Your 5-Step Closing Disclosure Review Process</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">You have 3 business days. Use them wisely. Follow this process to catch errors before they cost you money:</p>
          <div className="space-y-3 mb-8">
            {[
              { step: "1", title: "Day 1: Compare to Your Loan Estimate", action: "Put your Loan Estimate and Closing Disclosure side by side. Check: interest rate, loan amount, monthly payment, and total closing costs. Flag any differences.", color: "bg-blue-50 border-blue-200" },
              { step: "2", title: "Day 1: Check the tolerance categories", action: "Zero-tolerance fees (origination, transfer taxes) CANNOT have increased. If they did, your lender owes you a refund. 10%-tolerance fees can increase up to 10% in aggregate. Note any increases.", color: "bg-green-50 border-green-200" },
              { step: "3", title: "Day 2: Verify your personal details", action: "Check: your name spelling, property address, loan term, rate lock status, and that your earnest money deposit appears as a credit. Errors here can delay recording.", color: "bg-amber-50 border-amber-200" },
              { step: "4", title: "Day 2: Review the cash to close", action: "Verify the total cash you need at closing. This should match your funds. Confirm wire transfer amount and instructions BY PHONE — not email.", color: "bg-purple-50 border-purple-200" },
              { step: "5", title: "Day 3: Ask questions before closing", action: "Contact your lender and settlement agent about ANYTHING you don't understand. Don't wait until the closing table — it's much harder to correct issues after you've signed.", color: "bg-red-50 border-red-200" },
            ].map((s) => (
              <div key={s.step} className={`p-4 ${s.color} rounded-xl border tile-interactive flex gap-3 items-start`}>
                <span className="w-7 h-7 rounded-full bg-alta-navy text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                <div>
                  <h3 className="text-sm font-bold text-alta-navy">{s.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{s.action}</p>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/loan-estimate" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Understanding Your Loan Estimate
            </Link>
            <Link href="/document-checklist" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Document Checklist
            </Link>
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Closing Costs Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
