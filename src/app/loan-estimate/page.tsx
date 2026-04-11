import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Your Loan Estimate",
  description: "A page-by-page breakdown of the 3-page Loan Estimate form — what every section means and what to look for.",
};

const pages = [
  {
    page: "Page 1 — Loan Terms & Projected Payments",
    color: "from-[#1a5276] to-[#154463]",
    sections: [
      { name: "Loan Terms", what: "Shows your loan amount, interest rate (fixed or adjustable), monthly principal and interest payment, and whether there's a prepayment penalty or balloon payment.", lookFor: "Verify the interest rate matches what you were quoted. Check if the rate is locked. If adjustable, note the maximum rate and payment caps." },
      { name: "Projected Payments", what: "Breaks down your estimated total monthly payment including principal, interest, mortgage insurance, and estimated escrow (property taxes and homeowner's insurance).", lookFor: "Compare the total monthly payment to what you can comfortably afford. Note whether escrow is included — if not, you'll pay taxes and insurance separately." },
      { name: "Costs at Closing", what: "Shows your estimated closing costs and the total cash you'll need to bring to closing (closing costs plus down payment minus any credits).", lookFor: "This is the total check or wire you need at closing. Make sure it matches your budget. Ask your lender to explain any fees you don't recognize." },
    ],
  },
  {
    page: "Page 2 — Closing Cost Details",
    color: "from-[#2d6b3f] to-[#235532]",
    sections: [
      { name: "Loan Costs (Section A-C)", what: "Details all lender fees: origination charges, discount points, underwriting, and services the lender requires (appraisal, credit report, flood determination).", lookFor: "Origination charges are negotiable. Compare these across multiple lenders. Ask if you can reduce fees by paying a higher rate, or vice versa." },
      { name: "Other Costs (Section E-H)", what: "Lists taxes, government fees, prepaids (homeowner's insurance premium, prepaid interest, initial escrow deposits), and optional owner's title insurance.", lookFor: "Owner's title insurance is listed here. Even though it says 'optional,' it's strongly recommended. You can shop for this — don't just accept the lender's suggestion." },
      { name: "Calculating Cash to Close", what: "Line-by-line calculation: total closing costs, minus any lender credits, plus down payment, minus deposit, minus seller credits.", lookFor: "If you negotiated seller concessions, verify they appear here. Check that your earnest money deposit is credited correctly." },
    ],
  },
  {
    page: "Page 3 — Comparisons & Contact Info",
    color: "from-[#5b3a8c] to-[#482d70]",
    sections: [
      { name: "Comparisons", what: "Shows the total you'll pay over the first 5 years (including principal, interest, mortgage insurance, and loan costs) and the Annual Percentage Rate (APR) — which includes fees in the true cost calculation.", lookFor: "The APR is the most important number for comparing lenders. A lower rate with high fees may cost more than a slightly higher rate with lower fees. Compare APRs across your Loan Estimates." },
      { name: "Other Considerations", what: "Discloses whether the lender will service the loan or transfer it, whether the loan is assumable, and late payment policies.", lookFor: "Many loans are sold after closing. This is normal. Check the late payment policy — typically 15 days grace period, then a percentage fee." },
      { name: "Contact Information", what: "Lists the lender, mortgage broker (if any), real estate agents, and settlement agent with their contact details and licensing numbers.", lookFor: "Verify your settlement agent is correct. If you've chosen your own title company, make sure it's listed here." },
    ],
  },
];

const timeline = [
  { when: "Within 3 business days of applying", what: "Your lender must provide the Loan Estimate. This is required by federal law (TRID/TILA-RESPA Integrated Disclosure rule).", source: "CFPB" },
  { when: "Before you commit", what: "You should receive Loan Estimates from at least 2-3 lenders to compare. The standardized format makes comparison easy.", source: "CFPB" },
  { when: "Before rate lock expiration", what: "If your rate is locked, the Loan Estimate reflects that locked rate. If not locked, terms may change.", source: "CFPB" },
  { when: "If there's a changed circumstance", what: "Your lender may issue a revised Loan Estimate if something changes (rate lock, property value, loan program). You have 3 days to review.", source: "CFPB" },
];

export default function LoanEstimatePage() {
  return (
    <>
      <PageHero
        title="Understanding Your Loan Estimate"
        subtitle="The Loan Estimate is a 3-page standardized form your lender must provide within 3 business days of your mortgage application. Here's what every section means."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Loan Estimate", href: "/loan-estimate" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sticky top-[130px] sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your First Official Look at the Numbers</h2>
                <p className="text-sm text-alta-gray leading-relaxed">The Loan Estimate replaced the old Good Faith Estimate (GFE) in 2015 under the CFPB&apos;s TRID rule. Its standardized format makes it easy to compare offers from different lenders. Get at least 3 Loan Estimates before choosing a lender — comparing APRs, not just interest rates. <a href="https://www.consumerfinance.gov/owning-a-home/loan-estimate/" target="_blank" rel="noopener noreferrer" className="text-alta-teal font-medium hover:underline">See a sample Loan Estimate at CFPB.gov</a></p>
              </div>
            </div>
          </div>

          {/* When you'll receive it */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">When You&apos;ll Receive It</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {timeline.map((t) => (
              <div key={t.when} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <p className="text-sm font-semibold text-alta-navy mb-1">{t.when}</p>
                <p className="text-xs text-alta-gray leading-relaxed">{t.what}</p>
                <p className="text-[10px] text-alta-teal mt-2 font-medium">Source: {t.source}</p>
              </div>
            ))}
          </div>

          {/* Page-by-page breakdown */}
          <h2 className="text-xl font-bold text-alta-navy mb-6">Page-by-Page Breakdown</h2>
          <div className="space-y-8 mb-10">
            {pages.map((pg) => (
              <div key={pg.page} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className={`bg-gradient-to-r ${pg.color} px-5 py-3`}>
                  <h3 className="text-white font-bold">{pg.page}</h3>
                </div>
                <div className="p-5 space-y-5 bg-white">
                  {pg.sections.map((s) => (
                    <div key={s.name}>
                      <h4 className="font-bold text-alta-navy text-sm mb-1">{s.name}</h4>
                      <p className="text-sm text-alta-gray leading-relaxed mb-2"><strong>What it shows:</strong> {s.what}</p>
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

          {/* Red flags */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Red Flags to Watch For</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              { flag: "Missing or blank fees", detail: "Every fee section should be filled in. Blank fields may mean the lender hasn't done their homework or is hiding costs." },
              { flag: "Unusually low estimates", detail: "If one Loan Estimate is dramatically lower than others, fees may be understated and will increase at closing." },
              { flag: "No rate lock confirmation", detail: "If your rate isn't locked, the terms on the Loan Estimate can change. Ask about locking and the expiration date." },
              { flag: "Third-party fees missing", detail: "If title insurance, appraisal, or settlement fees are listed as TBD, ask when those will be determined." },
              { flag: "Excessive origination charges", detail: "Compare origination fees across lenders. These are negotiable — don't be afraid to ask for a reduction." },
              { flag: "No owner's title insurance listed", detail: "If owner's title insurance isn't on the estimate, ask about adding it. It's one of the most important protections you can buy." },
            ].map((item) => (
              <div key={item.flag} className="p-4 bg-white rounded-xl border border-red-100 shadow-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-alta-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                  <div>
                    <p className="text-sm font-semibold text-alta-navy">{item.flag}</p>
                    <p className="text-xs text-alta-gray mt-0.5">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to compare */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">How to Compare Loan Estimates Like a Pro</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">You should get Loan Estimates from at least 3 lenders. Here&apos;s a step-by-step comparison method:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              { step: "1", title: "Compare APRs first", desc: "The APR includes fees in the true cost — a lower rate with high fees may cost MORE than a slightly higher rate with lower fees. APR is the single best number for comparing total cost.", color: "bg-blue-50 border-blue-200" },
              { step: "2", title: "Check origination charges", desc: "These are negotiable and vary widely. Some lenders charge 0.5%, others charge 1%+. On a $350K loan, that's $1,750 vs $3,500+ difference.", color: "bg-green-50 border-green-200" },
              { step: "3", title: "Look at total closing costs", desc: "Page 2, Section J shows total closing costs. Compare this across all estimates. Don't be distracted by low rates if closing costs are inflated.", color: "bg-amber-50 border-amber-200" },
              { step: "4", title: "Check the total monthly payment", desc: "Page 1 shows projected payments including escrow. Make sure you're comparing total PITI (principal, interest, taxes, insurance) — not just principal and interest.", color: "bg-purple-50 border-purple-200" },
              { step: "5", title: "Verify the rate lock", desc: "Is the rate locked? For how long? A locked rate protects you if rates rise before closing. An unlocked estimate could change significantly.", color: "bg-red-50 border-red-200" },
              { step: "6", title: "Look at 5-year cost comparison", desc: "Page 3 shows total costs over the first 5 years. This includes principal, interest, mortgage insurance, AND loan costs — the best long-term comparison.", color: "bg-teal-50 border-teal-200" },
            ].map((s) => (
              <div key={s.step} className={`p-4 ${s.color} rounded-xl border tile-interactive`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-alta-navy text-white flex items-center justify-center text-xs font-bold">{s.step}</span>
                  <h3 className="text-sm font-bold text-alta-navy">{s.title}</h3>
                </div>
                <p className="text-xs text-alta-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* APR explained with example */}
          <div className="p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 mb-8">
            <h3 className="font-bold text-alta-navy mb-3">Why APR Matters More Than Interest Rate — A Real Example</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
                <p className="text-sm font-bold text-alta-navy mb-1">Lender A</p>
                <p className="text-xs text-alta-gray">Rate: <strong className="text-blue-600">6.25%</strong></p>
                <p className="text-xs text-alta-gray">Fees: <strong>$5,200</strong></p>
                <p className="text-xs text-alta-gray">APR: <strong className="text-blue-600">6.48%</strong></p>
                <p className="text-xs text-alta-gray mt-1">5-year cost: <strong>$136,800</strong></p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-green-200 tile-interactive text-center">
                <p className="text-sm font-bold text-alta-navy mb-1">Lender B</p>
                <p className="text-xs text-alta-gray">Rate: <strong className="text-green-600">6.50%</strong> (higher)</p>
                <p className="text-xs text-alta-gray">Fees: <strong>$2,100</strong> (lower)</p>
                <p className="text-xs text-alta-gray">APR: <strong className="text-green-600">6.42%</strong> (lower!)</p>
                <p className="text-xs text-alta-gray mt-1">5-year cost: <strong className="text-green-600">$134,200</strong> (saves $2,600)</p>
              </div>
            </div>
            <p className="text-xs text-alta-gray leading-relaxed">In this example, Lender B has a HIGHER interest rate but a LOWER APR — and saves you $2,600 over 5 years. This is because Lender A&apos;s higher fees offset their lower rate. The APR captures this. Always compare APRs, not just rates. Source: CFPB Know Before You Owe</p>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 mb-6">
            <h3 className="font-bold text-alta-navy mb-2">CFPB Sample Loan Estimate</h3>
            <p className="text-sm text-alta-gray mb-3">The Consumer Financial Protection Bureau provides a complete annotated sample Loan Estimate that walks through every field. We recommend reviewing it before you receive yours.</p>
            <a href="https://www.consumerfinance.gov/owning-a-home/loan-estimate/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-alta-teal hover:text-alta-teal-dark">
              View CFPB Sample Loan Estimate
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-disclosure" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Understanding Your Closing Disclosure
            </Link>
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Closing Costs Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
