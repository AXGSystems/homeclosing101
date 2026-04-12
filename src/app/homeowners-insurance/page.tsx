import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeowner's Insurance Guide",
  description: "Everything you need to know about homeowner's insurance before closing — what it covers, how to shop, what lenders require, and how much to expect.",
};

export default function HomeownersInsurancePage() {
  return (
    <>
      <PageHero
        title="Homeowner's Insurance Guide"
        subtitle="Your lender requires proof of insurance before closing. Here's what you need to know about coverage, costs, and how to shop."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Homeowner's Insurance", href: "/homeowners-insurance" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Protect Your Home, Protect Your Investment</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Homeowner&apos;s insurance is different from title insurance — it protects against FUTURE damage (fire, storms, theft), while title insurance protects against PAST ownership issues. You need both. Your lender requires proof of homeowner&apos;s insurance before they&apos;ll fund your loan.</p>
              </div>
            </div>
          </div>

          {/* What vs what */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Homeowner&apos;s Insurance vs Title Insurance</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="p-5 bg-white rounded-2xl border border-[#c5d8e4] tile-interactive">
              <div className="w-10 h-10 rounded-lg bg-[#e8f0f5] flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              </div>
              <h3 className="font-bold text-alta-navy mb-2">Homeowner&apos;s Insurance</h3>
              <ul className="space-y-1.5 text-xs text-alta-gray">
                <li className="flex items-start gap-2"><span className="text-[#1a5276] font-bold">-</span>Protects against FUTURE events (fire, storms, theft, liability)</li>
                <li className="flex items-start gap-2"><span className="text-[#1a5276] font-bold">-</span>Annual premium — paid every year</li>
                <li className="flex items-start gap-2"><span className="text-[#1a5276] font-bold">-</span>Covers physical damage to the structure and contents</li>
                <li className="flex items-start gap-2"><span className="text-[#1a5276] font-bold">-</span>Has deductibles — you pay first, insurance covers the rest</li>
                <li className="flex items-start gap-2"><span className="text-[#1a5276] font-bold">-</span>Does NOT cover floods, earthquakes, or title disputes</li>
              </ul>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#bddcc7] tile-interactive">
              <div className="w-10 h-10 rounded-lg bg-[#e9f5ed] flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#2d6b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <h3 className="font-bold text-alta-navy mb-2">Title Insurance</h3>
              <ul className="space-y-1.5 text-xs text-alta-gray">
                <li className="flex items-start gap-2"><span className="text-[#2d6b3f] font-bold">-</span>Protects against PAST events (liens, fraud, ownership disputes)</li>
                <li className="flex items-start gap-2"><span className="text-[#2d6b3f] font-bold">-</span>One-time premium — paid once at closing, covered for life</li>
                <li className="flex items-start gap-2"><span className="text-[#2d6b3f] font-bold">-</span>Covers legal defense and financial loss from title defects</li>
                <li className="flex items-start gap-2"><span className="text-[#2d6b3f] font-bold">-</span>No deductible — full coverage from dollar one</li>
                <li className="flex items-start gap-2"><span className="text-[#2d6b3f] font-bold">-</span>Does NOT cover physical damage to the property</li>
              </ul>
            </div>
          </div>

          {/* What homeowner's insurance covers */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">What Homeowner&apos;s Insurance Covers</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">A standard homeowner&apos;s policy (HO-3) has six coverage areas. Understanding each helps you choose the right policy and avoid gaps:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {[
              { title: "Dwelling Coverage (A)", desc: "Repairs or rebuilds your home's structure if damaged by covered events — fire, windstorm, hail, lightning, vandalism. Should cover the full replacement cost, not just market value.", color: "bg-[#e8f0f5] border-[#c5d8e4]" },
              { title: "Other Structures (B)", desc: "Covers detached structures — garage, shed, fence, deck. Typically 10% of dwelling coverage. Important if you have a detached garage or outbuilding.", color: "bg-[#e9f5ed] border-[#bddcc7]" },
              { title: "Personal Property (C)", desc: "Covers your belongings — furniture, electronics, clothing, appliances. Typically 50-70% of dwelling coverage. Consider 'replacement cost' vs 'actual cash value' (which deducts for depreciation).", color: "bg-[#faf4e4] border-[#e8d9a8]" },
              { title: "Loss of Use (D)", desc: "Pays for temporary living expenses if your home is uninhabitable due to a covered loss — hotel, restaurant meals, storage. Typically 20-30% of dwelling coverage.", color: "bg-[#f0ecf6] border-[#d4c8e4]" },
              { title: "Personal Liability (E)", desc: "Protects you if someone is injured on your property or you accidentally damage someone else's property. Typically $100,000-$300,000. Consider an umbrella policy for more.", color: "bg-[#f5e8e8] border-[#e4c5c5]" },
              { title: "Medical Payments (F)", desc: "Pays medical bills for guests injured on your property regardless of fault — no lawsuit needed. Typically $1,000-$5,000 per person. Doesn't cover your own family.", color: "bg-[#e6f1f5] border-[#b4d8e8]" },
            ].map((c) => (
              <div key={c.title} className={`p-4 ${c.color} rounded-xl border tile-interactive`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1">{c.title}</h3>
                <p className="text-[11px] text-alta-gray leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* What it does NOT cover */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">What It Does NOT Cover</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { gap: "Floods", solution: "Requires separate flood insurance through the National Flood Insurance Program (NFIP) or a private insurer. Required if in a FEMA flood zone. Average cost: $700-$1,500/yr.", source: "FEMA" },
              { gap: "Earthquakes", solution: "Requires a separate earthquake policy or endorsement. Essential in California, Pacific Northwest, and other seismic zones. Cost varies widely by location.", source: "USGS" },
              { gap: "Routine maintenance", solution: "Wear and tear, aging systems, pest damage, and neglect are not covered. Budget 1-2% of home value per year for maintenance.", source: "Industry standard" },
              { gap: "Sewer/drain backup", solution: "Add a sewer backup endorsement to your policy ($50-100/yr). Covers damage from sewer line backups, sump pump failures, and drain overflows.", source: "III" },
              { gap: "Home business equipment", solution: "Standard policies have limited coverage for business property ($2,500 typical). If you work from home, add a home business endorsement or separate policy.", source: "III" },
              { gap: "High-value items", solution: "Jewelry, art, collectibles often have sub-limits ($1,000-$2,500). Schedule valuable items individually for full coverage. Requires appraisals.", source: "III" },
            ].map((g) => (
              <div key={g.gap} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-[#943030] mb-1">{g.gap}</h3>
                <p className="text-xs text-alta-gray leading-relaxed mb-1">{g.solution}</p>
                <p className="text-[9px] text-alta-teal font-medium">Source: {g.source}</p>
              </div>
            ))}
          </div>

          {/* How to shop */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">How to Shop for Homeowner&apos;s Insurance</h2>
          <div className="space-y-3 mb-10">
            {[
              { step: "1", title: "Get quotes from at least 3-5 companies", desc: "Premiums can vary by 50%+ between carriers for the same coverage. Use independent agents who can compare multiple companies, or get quotes directly from major carriers. Don't just go with the cheapest — check financial strength ratings (AM Best) and customer satisfaction scores (J.D. Power).", color: "bg-[#e8f0f5] border-[#c5d8e4]" },
              { step: "2", title: "Choose replacement cost, not actual cash value", desc: "Replacement cost pays to rebuild or replace at current prices. Actual cash value deducts for depreciation — meaning your 10-year-old roof might only be covered at 30% of its replacement cost. Replacement cost policies cost 10-20% more but are worth it.", color: "bg-[#e9f5ed] border-[#bddcc7]" },
              { step: "3", title: "Understand your deductible options", desc: "Higher deductible = lower premium. A $1,000 deductible might cost $1,800/yr while a $2,500 deductible costs $1,400/yr. If you can afford to pay $2,500 out of pocket, the savings add up. Never set your deductible higher than your emergency fund.", color: "bg-[#faf4e4] border-[#e8d9a8]" },
              { step: "4", title: "Ask about discounts", desc: "Common discounts: bundling with auto insurance (15-25%), new home discount, security system discount, claims-free discount, roof age discount, and paying annually vs monthly. Stack multiple discounts to save 30-40%.", color: "bg-[#f0ecf6] border-[#d4c8e4]" },
              { step: "5", title: "Get coverage in place BEFORE closing", desc: "Your lender requires proof of insurance (insurance binder) effective on or before your closing date. The first year's premium is typically paid at closing and collected through your escrow account going forward. Don't wait until the last minute — shop 2-3 weeks before closing.", color: "bg-[#f5e8e8] border-[#e4c5c5]" },
            ].map((s) => (
              <div key={s.step} className={`p-4 ${s.color} rounded-xl border tile-interactive flex gap-3 items-start`}>
                <span className="w-7 h-7 rounded-full bg-alta-navy text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                <div>
                  <h3 className="text-sm font-bold text-alta-navy">{s.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">What Does Homeowner&apos;s Insurance Cost?</h2>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div className="p-3 bg-[#e8f0f5] rounded-xl tile-interactive">
                <p className="text-xl font-bold text-[#1a5276]">$1,200</p>
                <p className="text-[9px] text-alta-gray mt-0.5">Typical low-risk area</p>
              </div>
              <div className="p-3 bg-[#faf4e4] rounded-xl border-2 border-[#8b6914]/30 tile-interactive">
                <p className="text-xl font-bold text-[#8b6914]">$2,100</p>
                <p className="text-[9px] text-alta-gray mt-0.5">National average</p>
              </div>
              <div className="p-3 bg-[#f5e8e8] rounded-xl tile-interactive">
                <p className="text-xl font-bold text-[#943030]">$4,000+</p>
                <p className="text-[9px] text-alta-gray mt-0.5">Hurricane/wildfire zones</p>
              </div>
            </div>
            <p className="text-xs text-alta-gray leading-relaxed">Factors affecting your premium: location (weather risk, crime rate), home age and construction type, coverage amount, deductible, claims history, credit score (in most states), and proximity to fire stations/hydrants. Rates vary dramatically by state — Florida and Louisiana are among the most expensive due to hurricane risk.</p>
          </div>

          {/* The Declarations Page */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Understanding Your Declarations Page</h2>
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-10">
            <p className="text-xs text-alta-gray leading-relaxed mb-4">The declarations page (or &quot;dec page&quot;) is the summary page of your insurance policy. Your lender will require a copy before closing. It is typically 1-2 pages and contains all the key details of your coverage:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { field: "Named Insured", detail: "Your full legal name (and co-borrower if applicable). Must match the name on your mortgage documents exactly." },
                { field: "Property Address", detail: "The address of the insured property. Verify it matches your purchase agreement and loan documents." },
                { field: "Policy Period", detail: "The effective date and expiration date of coverage. Must be active on or before your closing date." },
                { field: "Dwelling Coverage Amount", detail: "The maximum the insurer will pay to rebuild your home. Should equal or exceed your home's estimated replacement cost." },
                { field: "Deductible", detail: "What you pay out of pocket before insurance kicks in. Common amounts: $1,000, $2,500, or a percentage of dwelling coverage." },
                { field: "Annual Premium", detail: "The total cost for one year of coverage. This is the amount your lender collects through escrow." },
                { field: "Lender/Mortgagee Clause", detail: "Your lender's name and address as the loss payee. The lender must be listed so they are notified of any claims, cancellations, or lapses." },
                { field: "Coverage Limits (A-F)", detail: "The specific dollar limits for each coverage area: dwelling, other structures, personal property, loss of use, liability, and medical payments." },
              ].map((f) => (
                <div key={f.field} className="p-3 bg-[#e8f0f5] rounded-lg border border-[#c5d8e4]">
                  <h4 className="text-xs font-bold text-alta-navy mb-0.5">{f.field}</h4>
                  <p className="text-[11px] text-alta-gray leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">Tip: Request your declarations page from your insurance agent at least 1 week before closing. Your lender and title company both need a copy.</p>
          </div>

          {/* How to File a Claim */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">How to File a Homeowner&apos;s Insurance Claim</h2>
          <div className="space-y-3 mb-10">
            {[
              { step: "1", title: "Document the damage immediately", desc: "Take photos and video of all damage before making any temporary repairs. Make a detailed list of damaged or lost items with estimated values. If there was a break-in or vandalism, file a police report -- your insurer will need the report number.", color: "bg-[#e8f0f5] border-[#c5d8e4]" },
              { step: "2", title: "Prevent further damage", desc: "Take reasonable steps to prevent additional damage (tarp a leaking roof, board up broken windows, turn off water to a burst pipe). Keep receipts for any emergency repairs -- these are typically reimbursable. Do NOT make permanent repairs until the adjuster has inspected.", color: "bg-[#e9f5ed] border-[#bddcc7]" },
              { step: "3", title: "Contact your insurance company", desc: "Call your insurer's claims line (found on your declarations page or their website) as soon as possible. Most policies require prompt reporting -- some within 24-72 hours of the loss. Have your policy number ready. They will assign a claims adjuster.", color: "bg-[#faf4e4] border-[#e8d9a8]" },
              { step: "4", title: "Meet with the claims adjuster", desc: "The adjuster will inspect the damage, review your documentation, and estimate repair costs. Be present during the inspection if possible. Provide your inventory list and all photos. If you disagree with the estimate, you can hire a public adjuster (they typically charge 10-15% of the settlement).", color: "bg-[#f0ecf6] border-[#d4c8e4]" },
              { step: "5", title: "Review and receive your settlement", desc: "Your insurer will issue a settlement based on your policy terms. Replacement cost policies pay the full cost to repair or replace. Actual cash value policies deduct depreciation. If your claim exceeds your deductible, you pay the deductible and insurance covers the rest. If you have a mortgage, claim checks over a certain amount are typically made payable to both you and your lender.", color: "bg-[#f5e8e8] border-[#e4c5c5]" },
            ].map((s) => (
              <div key={s.step} className={`p-4 ${s.color} rounded-xl border tile-interactive flex gap-3 items-start`}>
                <span className="w-7 h-7 rounded-full bg-alta-navy text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                <div>
                  <h3 className="text-sm font-bold text-alta-navy">{s.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-alta-gray mb-8">Source: Insurance Information Institute (III) -- Filing a homeowner's insurance claim. Note: Filing a claim may affect your future premiums. For damage under $2,000-$3,000, consider whether filing is worth a potential rate increase.</p>

          <InlineAd />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/protect-your-rights" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Title Insurance Guide
            </Link>
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Closing Costs Calculator
            </Link>
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Closing Checklist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
