"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ─── Data ─── */

const negotiableCosts = [
  {
    title: "Lender Origination Fees",
    detail: "Lenders charge 0.5% to 1% of the loan amount as an origination fee. This is one of the most negotiable closing costs. Ask your lender to reduce or waive it entirely, especially if you have strong credit or are bringing a large down payment. Get quotes from multiple lenders and use competing offers as leverage.",
    tip: "Request a loan estimate from at least 3 lenders and compare origination fees side by side.",
  },
  {
    title: "Title Insurance",
    detail: "Under the Real Estate Settlement Procedures Act (RESPA), you have the right to shop for your own title insurance provider. Title insurance premiums can vary significantly between companies. While your lender may recommend a provider, you are not required to use them for the owner's title policy.",
    tip: "Exercise your RESPA right to shop around. Compare quotes from at least 2-3 title companies.",
  },
  {
    title: "Home Warranty",
    detail: "A home warranty covers repair or replacement of major home systems and appliances for the first year of ownership, typically costing $300 to $600. This is commonly negotiated as a seller-paid closing cost, especially in buyer's markets or for older homes.",
    tip: "Ask the seller to include a home warranty as part of your purchase agreement.",
  },
  {
    title: "Settlement / Escrow Fees",
    detail: "Settlement and escrow fees are charged by the company that handles your closing. These fees vary by company and are not regulated, so you can compare pricing. Some settlement companies offer bundled discounts when you purchase both title insurance and closing services together.",
    tip: "Compare settlement fees from multiple companies before committing.",
  },
  {
    title: "Rate Buydown Points",
    detail: "Discount points (each point equals 1% of your loan amount) can lower your interest rate. While the cost per point is set, you can negotiate whether the seller contributes toward points as part of their concessions. You should always calculate the break-even period to see if buying points makes financial sense for your expected ownership timeline.",
    tip: "Calculate your break-even period: divide the point cost by your monthly savings. If you plan to stay longer than that, points may be worth it.",
  },
  {
    title: "Credit Report Fee",
    detail: "Lenders charge $30 to $50 to pull your credit report. While small, some lenders will waive this fee as a goodwill gesture, especially if you are a strong applicant or bundling multiple services. It never hurts to ask.",
    tip: "Ask your lender if they offer a credit report fee waiver. Many do for preferred customers.",
  },
];

const nonNegotiableCosts = [
  {
    title: "Government Recording Fees",
    detail: "Set by your county recorder's office, these fees cover the cost of officially recording your deed, mortgage, and other documents in public records. They are fixed by local government and cannot be negotiated.",
  },
  {
    title: "Transfer Taxes",
    detail: "Also called deed taxes, documentary stamps, or excise taxes depending on your state. These are set by state and/or county law as a percentage of the sale price. The rate and who pays (buyer or seller) varies by jurisdiction but the amount itself is non-negotiable.",
  },
  {
    title: "Prepaid Property Taxes",
    detail: "At closing, you will prepay property taxes to cover the period from closing through the next tax due date. The tax rate is set by your county and cannot be negotiated. The amount is based on the assessed value of the property and the local mill rate.",
  },
  {
    title: "Prepaid Homeowner's Insurance",
    detail: "Your lender requires proof of homeowner's insurance before closing. You will typically prepay 12 months of premiums upfront. While you can shop for the best insurance rate, the premium itself is set by the insurer based on the property and your coverage level, not negotiated at closing.",
  },
];

const concessionLimits = [
  { loan: "Conventional", limit: "3% to 9%", note: "3% with less than 10% down, 6% with 10-25% down, 9% with 25%+ down" },
  { loan: "FHA", limit: "6%", note: "6% of the purchase price regardless of down payment" },
  { loan: "VA", limit: "4%", note: "4% of the purchase price; certain costs excluded from this cap" },
  { loan: "USDA", limit: "6%", note: "6% of the purchase price" },
];

const repairVsCredit = [
  {
    scenario: "When to Ask for Repairs",
    items: [
      "Major structural issues (foundation, roof, load-bearing walls)",
      "Safety hazards (electrical, plumbing, mold, radon)",
      "Issues required by your lender for loan approval (FHA/VA property requirements)",
      "Problems the seller has the expertise or contractors to fix properly",
    ],
  },
  {
    scenario: "When to Ask for a Credit",
    items: [
      "Cosmetic issues or non-urgent upgrades (aging carpet, dated fixtures)",
      "When you want to choose your own contractor and quality of work",
      "When the seller is unlikely to invest in high-quality repairs",
      "When you want to bundle credit toward closing costs",
    ],
  },
];

const timelineSteps = [
  {
    phase: "Before Making an Offer",
    when: "Pre-offer",
    items: [
      "Research comparable sales to determine fair market value",
      "Get pre-approved so your offer is taken seriously",
      "Evaluate current market conditions (buyer's market vs seller's market)",
    ],
  },
  {
    phase: "Making the Offer",
    when: "Day 1",
    items: [
      "Negotiate purchase price based on comparables and market conditions",
      "Request seller concessions toward closing costs",
      "Include desired contingencies (inspection, appraisal, financing)",
    ],
  },
  {
    phase: "After Inspection",
    when: "Days 7-14 (typical)",
    items: [
      "Negotiate repair credits or repairs based on inspection findings",
      "Request seller-funded home warranty",
      "Renegotiate price if major issues are discovered",
    ],
  },
  {
    phase: "After Appraisal",
    when: "Days 14-21 (typical)",
    items: [
      "Renegotiate price if appraisal comes in below purchase price",
      "Ask seller to lower price to appraised value",
      "Negotiate difference split if seller resists full reduction",
    ],
  },
  {
    phase: "Loan Estimate Review",
    when: "Within 3 business days of application",
    items: [
      "Compare lender fees across multiple loan estimates",
      "Negotiate origination fees and rate lock terms",
      "Shop for title insurance and settlement services",
    ],
  },
  {
    phase: "Before Closing",
    when: "3+ days before closing",
    items: [
      "Review Closing Disclosure for any unexpected charges",
      "Challenge fees that increased beyond legal tolerances",
      "Verify all negotiated credits and concessions appear correctly",
    ],
  },
];

const commonMistakes = [
  {
    mistake: "Asking for too many concessions in a competitive market",
    why: "In a seller's market with multiple offers, loading your offer with concession requests makes it less attractive. Focus on the 1-2 concessions that matter most to you and keep your offer clean.",
  },
  {
    mistake: "Not getting credits in writing",
    why: "Verbal agreements mean nothing at the closing table. Every negotiated credit, repair, or concession must be documented in writing as an addendum to your purchase agreement. If it is not in the contract, it is not enforceable.",
  },
  {
    mistake: "Missing contingency deadlines",
    why: "Your contingency periods (inspection, appraisal, financing) have firm deadlines. If you miss a deadline, you may lose your right to negotiate on that item or even lose your earnest money deposit. Track every deadline carefully.",
  },
  {
    mistake: "Focusing only on price and ignoring closing costs",
    why: "A seller might not budge on price but may happily offer $5,000 in closing cost credits. Think of the total cost of the transaction, not just the purchase price.",
  },
  {
    mistake: "Not shopping for third-party services",
    why: "Title insurance, home inspections, homeowner's insurance, and settlement services are all shoppable. RESPA gives you the right to choose your own providers for many of these services. Failing to shop around can cost you hundreds or thousands of dollars.",
  },
  {
    mistake: "Waiving the inspection contingency",
    why: "Skipping the inspection to make your offer more competitive can backfire badly. An inspection is your best opportunity to negotiate repairs or credits and to discover hidden problems before they become your responsibility.",
  },
];

/* ─── Component ─── */

export default function NegotiationGuidePage() {
  const [expandedNeg, setExpandedNeg] = useState<number | null>(null);
  const [expandedNon, setExpandedNon] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      <PageHero
        title="What's Negotiable: Your Buyer's Guide to Saving Money"
        subtitle="Many homebuyers don't realize how many closing costs and terms are negotiable. This guide breaks down exactly what you can (and can't) negotiate, when to negotiate it, and how to do it effectively."
        image="/images/hero-closing.jpg"
        breadcrumb={[
          { label: "Closing Process", href: "/closing-process" },
          { label: "Negotiation Guide", href: "/negotiation-guide" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Section 1: Negotiable Closing Costs ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Closing Costs You CAN Negotiate</h2>
          <p className="text-sm text-alta-gray mb-6">
            These fees are set by private companies, not the government, which means there is room to negotiate, shop around, or ask for waivers.
          </p>
          <div className="space-y-3">
            {negotiableCosts.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-green-200 border-l-4 border-l-green-500 overflow-hidden">
                <button
                  onClick={() => setExpandedNeg(expandedNeg === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{item.title}</span>
                  </div>
                  <svg className={`w-5 h-5 text-alta-gray shrink-0 transition-transform ${expandedNeg === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedNeg === i && (
                  <div className="px-5 pb-5 border-t border-green-100">
                    <p className="text-sm text-alta-gray mt-3 leading-relaxed">{item.detail}</p>
                    <div className="mt-3 flex items-start gap-2 bg-green-50 rounded-lg p-3">
                      <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-green-800 font-medium">{item.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <InlineAd />

        {/* ── Section 2: Non-Negotiable Closing Costs ── */}
        <section className="mb-12 mt-8">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Closing Costs You CANNOT Negotiate</h2>
          <p className="text-sm text-alta-gray mb-6">
            These costs are set by government agencies or regulated entities. The amounts are fixed and apply equally to all buyers.
          </p>
          <div className="space-y-3">
            {nonNegotiableCosts.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-red-200 border-l-4 border-l-red-400 overflow-hidden">
                <button
                  onClick={() => setExpandedNon(expandedNon === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span className="font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{item.title}</span>
                  </div>
                  <svg className={`w-5 h-5 text-alta-gray shrink-0 transition-transform ${expandedNon === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedNon === i && (
                  <div className="px-5 pb-5 border-t border-red-100">
                    <p className="text-sm text-alta-gray mt-3 leading-relaxed">{item.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Seller Concessions ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Seller Concessions</h2>
          <p className="text-sm text-alta-gray mb-4">
            Seller concessions are when the seller agrees to pay a portion of your closing costs. This reduces the amount of cash you need at closing without changing the purchase price. The seller&apos;s contribution is built into the transaction and paid from their proceeds.
          </p>
          <div className="bg-white rounded-xl border border-[var(--border-color)] p-5 mb-5">
            <h3 className="font-bold text-alta-navy mb-3">Maximum Seller Concession Limits by Loan Type</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-alta-navy/10">
                    <th className="text-left py-2 pr-4 font-bold text-alta-navy">Loan Type</th>
                    <th className="text-left py-2 pr-4 font-bold text-alta-navy">Max Concession</th>
                    <th className="text-left py-2 font-bold text-alta-navy">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {concessionLimits.map((row) => (
                    <tr key={row.loan} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-semibold text-alta-navy">{row.loan}</td>
                      <td className="py-2.5 pr-4 text-alta-teal font-bold">{row.limit}</td>
                      <td className="py-2.5 text-alta-gray text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-bold text-alta-navy mb-2">How to Ask for Seller Concessions</h3>
            <ul className="text-sm text-alta-gray space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-alta-teal font-bold mt-0.5">1.</span>
                <span>Work with your real estate agent to include the concession request in your written offer (e.g., &ldquo;Seller to contribute $8,000 toward buyer&apos;s closing costs&rdquo;).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alta-teal font-bold mt-0.5">2.</span>
                <span>In a buyer&apos;s market (more inventory than buyers), sellers are more likely to agree. In a seller&apos;s market, concession requests may weaken your offer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alta-teal font-bold mt-0.5">3.</span>
                <span>Consider offering a slightly higher purchase price to offset the concession. The net cost to the seller stays the same, but you get help with cash at closing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-alta-teal font-bold mt-0.5">4.</span>
                <span>Be aware that concessions cannot exceed your actual closing costs. If your costs are $7,000, a $10,000 concession request will be reduced to $7,000.</span>
              </li>
            </ul>
            <p className="text-xs text-blue-700 mt-4 font-medium">
              2026 trend: With elevated mortgage rates, buyers are increasingly requesting seller concessions, particularly for temporary rate buydowns. Sellers in markets with rising inventory are more willing to offer concessions to close deals.
            </p>
          </div>
        </section>

        <InlineAd />

        {/* ── Section 4: Repair Credits vs Repairs ── */}
        <section className="mb-12 mt-8">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Repair Credits vs. Repairs</h2>
          <p className="text-sm text-alta-gray mb-5">
            After a home inspection, you can negotiate with the seller to either make repairs before closing or provide a credit at closing so you can handle the work yourself. Each approach has advantages depending on the situation.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {repairVsCredit.map((group) => (
              <div key={group.scenario} className="bg-white rounded-xl border border-[var(--border-color)] p-5">
                <h3 className="font-bold text-alta-navy mb-3">{group.scenario}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-alta-gray">
                      <svg className="w-4 h-4 text-alta-teal mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <h3 className="font-bold text-alta-navy mb-2">How to Calculate a Fair Credit Amount</h3>
            <ul className="text-sm text-alta-gray space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Get written estimates from licensed contractors for each repair item identified in the inspection.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Focus on material defects and safety issues, not cosmetic preferences. Sellers are more likely to negotiate on legitimate problems.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Present your request as a specific dollar amount backed by estimates, not a vague demand. &ldquo;$3,200 credit based on contractor quotes for roof repair&rdquo; is more effective than &ldquo;fix the roof.&rdquo;</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── Section 5: Rate Buydown Options ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Rate Buydown Options</h2>
          <p className="text-sm text-alta-gray mb-5">
            Rate buydowns reduce your mortgage interest rate, either permanently or temporarily. Understanding the difference can save you thousands over the life of your loan.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-xl border border-[var(--border-color)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-alta-teal/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-bold text-alta-navy">Permanent Buydown (Points)</h3>
              </div>
              <ul className="text-sm text-alta-gray space-y-2">
                <li>1 discount point = 1% of your loan amount</li>
                <li>Each point typically reduces your rate by approximately 0.25%</li>
                <li>The rate reduction lasts for the entire life of the loan</li>
                <li>Best for buyers who plan to stay in the home long-term (past the break-even point)</li>
              </ul>
              <div className="mt-3 bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-alta-gray"><span className="font-bold text-alta-navy">Example:</span> On a $400,000 loan, 1 point costs $4,000 and reduces your rate from 7.00% to approximately 6.75%. That saves roughly $68/month. Break-even: about 59 months (just under 5 years).</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[var(--border-color)] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-alta-navy">Temporary Buydown (2-1 or 3-2-1)</h3>
              </div>
              <ul className="text-sm text-alta-gray space-y-2">
                <li>Seller funds a temporary rate reduction for the first 2-3 years</li>
                <li><span className="font-semibold">2-1 buydown:</span> Rate is 2% lower in year 1, 1% lower in year 2, then full rate in year 3+</li>
                <li><span className="font-semibold">3-2-1 buydown:</span> Rate is 3% lower in year 1, 2% lower in year 2, 1% lower in year 3, then full rate</li>
                <li>Best when you expect rates to drop (allowing you to refinance before the full rate kicks in)</li>
              </ul>
              <div className="mt-3 bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-alta-gray"><span className="font-bold text-alta-navy">Example (2-1):</span> On a 7.00% rate, you pay 5.00% in year 1 and 6.00% in year 2. The seller funds the difference (held in escrow). If rates drop, you refinance before year 3.</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
            <h3 className="font-bold text-alta-navy mb-2">When Does Each Make Sense?</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-alta-gray">
              <div>
                <p className="font-semibold text-alta-navy mb-1">Choose permanent points if:</p>
                <ul className="space-y-1">
                  <li>- You plan to stay 5+ years</li>
                  <li>- You want guaranteed long-term savings</li>
                  <li>- Current rates are reasonable and refinancing is unlikely</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-alta-navy mb-1">Choose a temporary buydown if:</p>
                <ul className="space-y-1">
                  <li>- You expect rates to decrease in 1-2 years</li>
                  <li>- You want lower payments now to ease into homeownership</li>
                  <li>- The seller is willing to fund it as a concession</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineAd />

        {/* ── Section 6: Negotiation Timeline ── */}
        <section className="mb-12 mt-8">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Negotiation Timeline</h2>
          <p className="text-sm text-alta-gray mb-5">
            Different negotiations happen at different stages of the homebuying process. Knowing when to negotiate each item helps you stay organized and avoid missing opportunities.
          </p>
          <div className="space-y-4">
            {timelineSteps.map((step, i) => (
              <div key={i} className="bg-white rounded-xl border border-[var(--border-color)] p-5 relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-alta-navy text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-alta-navy">{step.phase}</h3>
                    <p className="text-xs text-alta-teal font-medium">{step.when}</p>
                  </div>
                </div>
                <ul className="ml-11 space-y-1.5">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-alta-gray">
                      <span className="text-alta-teal mt-1">&#8226;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-red-50 rounded-xl p-4 border border-red-200">
            <p className="text-sm text-red-800 font-medium flex items-start gap-2">
              <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Every contingency in your contract has a deadline. Missing an inspection contingency deadline means you lose your right to negotiate repairs. Missing a financing contingency deadline could put your earnest money at risk. Keep a calendar of every deadline and set reminders.</span>
            </p>
          </div>
        </section>

        {/* ── Section 7: Common Mistakes ── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Common Negotiation Mistakes</h2>
          <p className="text-sm text-alta-gray mb-5">
            Even experienced buyers make these negotiation errors. Knowing what to avoid can save you money, time, and deal-killing stress.
          </p>
          <div className="space-y-3">
            {commonMistakes.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-[var(--border-color)] p-5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-alta-navy text-sm">{item.mistake}</h3>
                    <p className="text-sm text-alta-gray mt-1 leading-relaxed">{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Topics ── */}
        <div className="mt-8 mb-4">
          <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/closing-process/closing-costs" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Explained</h3>
              <p className="text-[10px] text-alta-gray mt-1">Understand every fee on your Closing Disclosure and who pays what</p>
            </Link>
            <Link href="/loan-estimate" className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Your Loan Estimate</h3>
              <p className="text-[10px] text-alta-gray mt-1">Learn to read your Loan Estimate and compare offers from multiple lenders</p>
            </Link>
            <Link href="/home-inspection" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Home Inspection Guide</h3>
              <p className="text-[10px] text-alta-gray mt-1">Know what inspectors look for and how to use findings in negotiations</p>
            </Link>
          </div>
        </div>

        <FirstTimeBuyerCTA />
      </div>
    </div>
  );
}
