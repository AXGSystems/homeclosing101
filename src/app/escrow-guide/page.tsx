import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Escrow",
  description: "How escrow works before, during, and after closing — earnest money, escrow accounts, annual analysis, and what to expect.",
};

export default function EscrowGuidePage() {
  return (
    <>
      <PageHero
        title="Understanding Escrow"
        subtitle="Escrow plays two critical roles in your home purchase: holding your earnest money safely during the transaction, and managing your tax and insurance payments after closing."
        image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Escrow Guide", href: "/escrow-guide" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Money, Safely Managed</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Escrow is a neutral third-party arrangement that protects both buyers and sellers. Understanding how it works at each stage of your transaction gives you confidence and control over your largest financial transaction.</p>
              </div>
            </div>
          </div>

          {/* Three phases of escrow */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">The 3 Phases of Escrow</h2>
          <div className="space-y-6 mb-10">
            {[
              {
                phase: "Phase 1: Transaction Escrow (Before Closing)",
                color: "from-[#1a5276] to-[#154463]",
                items: [
                  { title: "Earnest Money Deposit", desc: "When your offer is accepted, you deposit earnest money (typically 1-3% of the purchase price) into an escrow account held by the title company or attorney. This shows the seller you're serious. The money is held safely by a neutral third party — it doesn't go directly to the seller." },
                  { title: "Who Holds the Funds?", desc: "The escrow agent is typically the title company, settlement agent, or real estate attorney handling your closing. They have a fiduciary duty to both parties and must follow strict rules about how escrow funds are handled — including maintaining separate, insured accounts and performing regular reconciliations (ALTA Best Practices Pillar 2)." },
                  { title: "What Happens to Your Earnest Money?", desc: "If the transaction closes: your earnest money is credited toward your down payment and closing costs on the Closing Disclosure. If you back out under a contingency: you typically get a full refund. If you back out without a valid contingency: you may forfeit the deposit to the seller. Disputes over earnest money are resolved according to the terms in your purchase agreement." },
                ],
              },
              {
                phase: "Phase 2: Closing Escrow (At Closing)",
                color: "from-[#2d6b3f] to-[#235532]",
                items: [
                  { title: "Fund Collection", desc: "The escrow agent collects all funds needed to close: your down payment, closing costs, the lender's loan funds, and any seller credits. Every dollar is accounted for on the Closing Disclosure." },
                  { title: "Fund Disbursement", desc: "After all documents are signed, the escrow agent disburses funds according to the settlement statement: the seller receives their proceeds, real estate agents receive commissions, all closing costs are paid to their respective parties, and any remaining funds go to pay off the seller's existing mortgage." },
                  { title: "Initial Escrow Deposit", desc: "At closing, you'll make an initial deposit into your mortgage escrow account (separate from the transaction escrow). This typically covers 2-6 months of property taxes and 2-3 months of insurance, creating a cushion so your lender can pay these bills when they come due." },
                ],
              },
              {
                phase: "Phase 3: Mortgage Escrow (After Closing)",
                color: "from-[#5b3a8c] to-[#482d70]",
                items: [
                  { title: "Monthly Collection", desc: "Each month, a portion of your mortgage payment goes into your escrow account to cover property taxes and homeowner's insurance. Your total monthly payment (PITI) = Principal + Interest + Taxes + Insurance. The tax and insurance portions are held in escrow until the bills are due." },
                  { title: "Bill Payment", desc: "Your mortgage servicer pays your property tax and insurance bills directly from your escrow account when they come due — typically property taxes 1-2 times per year and insurance annually. You don't have to remember to pay these yourself." },
                  { title: "Annual Escrow Analysis", desc: "Every year, your servicer performs an escrow analysis to verify the account has the right balance. If there's a shortage (not enough to cover upcoming bills), your monthly payment may increase. If there's a surplus (more than a 2-month cushion), you may receive a refund. Your servicer must notify you at least 30 days before any payment change." },
                ],
              },
            ].map((phase) => (
              <div key={phase.phase} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className={`bg-gradient-to-r ${phase.color} px-5 py-3`}>
                  <h3 className="text-white font-bold text-sm">{phase.phase}</h3>
                </div>
                <div className="p-5 bg-white space-y-4">
                  {phase.items.map((item) => (
                    <div key={item.title}>
                      <h4 className="font-bold text-alta-navy text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-alta-gray leading-relaxed">{item.desc}</p>
                      {item.title === "Annual Escrow Analysis" && <p className="text-[10px] text-alta-teal mt-1 font-medium">Source: CFPB</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* Escrow math example */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Escrow Math: What Your Monthly Payment Includes</h2>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10">
            <p className="text-xs text-alta-gray mb-3">Example for a $350,000 home with 10% down, 6.5% rate, 30-year conventional in a county with 1.5% property tax:</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 bg-[#e8f0f5] rounded-lg"><span className="text-alta-navy font-medium">Principal & Interest</span><span className="font-bold text-[#1a5276]">$1,991</span></div>
              <div className="flex justify-between p-2 bg-[#faf4e4] rounded-lg"><span className="text-alta-navy font-medium">Property Tax Escrow (1.5%)</span><span className="font-bold text-[#8b6914]">$438</span></div>
              <div className="flex justify-between p-2 bg-[#e9f5ed] rounded-lg"><span className="text-alta-navy font-medium">Insurance Escrow</span><span className="font-bold text-[#2d6b3f]">$175</span></div>
              <div className="flex justify-between p-2 bg-[#f5e8e8] rounded-lg"><span className="text-alta-navy font-medium">PMI (under 20% down)</span><span className="font-bold text-[#943030]">$184</span></div>
              <div className="flex justify-between p-2 bg-alta-navy text-white rounded-lg"><span className="font-semibold">Total Monthly Payment (PITI)</span><span className="font-bold">$2,788</span></div>
            </div>
            <p className="text-[10px] text-alta-gray mt-3">Of your $2,788 monthly payment, only $1,991 goes to your actual loan. The remaining $797 is held in escrow for taxes, insurance, and PMI. This is why your mortgage payment is significantly more than just principal and interest.</p>
          </div>

          {/* Escrow waivers */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Escrow Waivers: Paying Taxes & Insurance Yourself</h2>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10">
            <p className="text-xs text-alta-gray leading-relaxed mb-4">Some borrowers prefer to pay property taxes and insurance directly rather than through an escrow account. This is called an escrow waiver (or escrow exemption). Here is what you need to know:</p>
            <div className="space-y-3">
              <div className="p-3 bg-[#e8f0f5] rounded-lg border border-[#c5d8e4]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">Eligibility Requirements</h4>
                <p className="text-xs text-alta-gray leading-relaxed">Most lenders require at least 20% equity (80% LTV or less) to waive escrow. FHA, VA, and USDA loans generally do not allow escrow waivers. Conventional loans are the most flexible, but each lender sets its own policy. Some lenders also require a strong credit score (720+) and a clean payment history.</p>
              </div>
              <div className="p-3 bg-[#faf4e4] rounded-lg border border-[#e8d9a8]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">The Escrow Waiver Fee</h4>
                <p className="text-xs text-alta-gray leading-relaxed">Lenders typically charge a fee for waiving escrow -- usually 0.25% of the loan amount (e.g., $625 on a $250,000 loan). This fee may be paid upfront or added to your interest rate. The fee compensates the lender for the increased risk that you could miss a tax or insurance payment, which would put their collateral at risk.</p>
              </div>
              <div className="p-3 bg-[#f5e8e8] rounded-lg border border-[#e4c5c5]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">Risks of Waiving Escrow</h4>
                <p className="text-xs text-alta-gray leading-relaxed">If you miss a property tax payment, your county can place a tax lien on your home -- which takes priority over your mortgage. If your insurance lapses, your lender will buy force-placed insurance on your behalf (at a much higher cost) and add it to your loan balance. You are responsible for budgeting and paying large lump-sum bills (property taxes are typically due 1-2 times per year; insurance annually).</p>
              </div>
              <div className="p-3 bg-[#e9f5ed] rounded-lg border border-[#bddcc7]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">When It Makes Sense</h4>
                <p className="text-xs text-alta-gray leading-relaxed">An escrow waiver can make sense if you are disciplined about saving, want to earn interest on your own funds, or live in a state where escrow accounts do not earn interest. However, most financial advisors recommend keeping escrow for the convenience and protection it provides -- especially for first-time buyers.</p>
              </div>
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">Source: CFPB -- Escrow accounts are regulated under the Real Estate Settlement Procedures Act (RESPA), 12 CFR Part 1024</p>
          </div>

          {/* RESPA escrow limits */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Federal Escrow Protections (RESPA)</h2>
          <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 mb-10">
            <p className="text-xs text-alta-gray leading-relaxed mb-3">The Real Estate Settlement Procedures Act (RESPA) sets federal rules that protect you from excessive escrow collections:</p>
            <div className="space-y-2">
              {[
                { rule: "2-Month Cushion Maximum", detail: "Your servicer cannot maintain a cushion of more than 2 months of escrow payments beyond what is needed to pay your upcoming bills. If the surplus exceeds this limit, the servicer must refund the excess within 30 days of the annual analysis." },
                { rule: "Annual Analysis Required", detail: "Your servicer must perform an escrow analysis at least once per year and send you a statement showing: the current balance, all payments received, all disbursements made, the projected balance for the coming year, and any changes to your monthly payment." },
                { rule: "30-Day Notice of Changes", detail: "If your monthly escrow payment is changing (up or down), your servicer must notify you at least 30 days before the new payment amount takes effect." },
                { rule: "Shortage Repayment Options", detail: "If your escrow analysis reveals a shortage, your servicer must offer you the option to pay the shortage as a lump sum or spread it over 12 months. They cannot demand immediate full payment." },
                { rule: "Surplus Refund Threshold", detail: "If your escrow account has a surplus of $50 or more, your servicer must refund it to you within 30 days. Surpluses under $50 may be credited to your next escrow payment." },
              ].map((r) => (
                <div key={r.rule} className="p-3 bg-white rounded-lg border border-amber-100">
                  <h4 className="text-xs font-bold text-alta-navy mb-0.5">{r.rule}</h4>
                  <p className="text-[11px] text-alta-gray leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">Source: 12 U.S.C. Section 2609; 12 CFR Part 1024 (Regulation X); CFPB Escrow Account Rules</p>
          </div>

          {/* Common escrow questions */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Common Escrow Questions</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { q: "Can I opt out of escrow?", a: "Some lenders allow you to waive escrow if you have 20%+ equity, but they typically charge a fee (0.25% of the loan amount) and you become responsible for paying taxes and insurance yourself. Missing a tax payment can result in a lien on your property." },
              { q: "Why did my payment increase?", a: "Most payment increases are due to escrow changes — property tax rates increased, insurance premiums went up, or the annual analysis revealed a shortage. Your servicer must notify you 30 days before any change." },
              { q: "What if my escrow has a shortage?", a: "You can pay the shortage as a lump sum to keep payments lower, or spread it over 12 months (which increases your monthly payment). Your servicer offers both options in the annual escrow analysis statement." },
              { q: "What if my escrow has a surplus?", a: "If your escrow account has more than a 2-month cushion (per federal rules), your servicer must refund the excess to you. This usually happens automatically with your annual analysis." },
              { q: "Who earns interest on my escrow?", a: "In most states, the mortgage servicer earns interest on your escrow balance. However, some states (like California, Connecticut, Iowa, Minnesota, New York, and others) require servicers to pay interest on escrow accounts. Check your state's laws." },
              { q: "What happens to escrow when I sell?", a: "When you sell or refinance, any remaining escrow balance is refunded to you after the loan is paid off — typically within 20-30 business days. Make sure your servicer has your forwarding address." },
            ].map((faq) => (
              <div key={faq.q} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-1">{faq.q}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Closing Costs Calculator
            </Link>
            <Link href="/closing-disclosure" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Closing Disclosure Guide
            </Link>
            <Link href="/mortgage-calculator" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Mortgage Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
