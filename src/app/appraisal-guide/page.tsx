"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ───────── Appraiser evaluation areas (expandable tiles) ───────── */
const evaluationAreas = [
  {
    title: "Location & Neighborhood Comps",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    summary: "Proximity to schools, amenities, employment centers, and comparable neighborhood sales.",
    detail: "Appraisers analyze the subject property's location relative to comparable properties in the same neighborhood or similar areas. They consider school district quality, proximity to employment, shopping, parks, and public transit. Neighborhood trends — whether values are rising, stable, or declining — play a significant role. Properties in flood zones, near highways, or adjacent to commercial zones may receive adjustments. The appraiser will typically look at 3-6 comparable sales within a 1-mile radius for urban properties and up to 5 miles for rural areas.",
    source: "Fannie Mae Selling Guide B4-1.3-06",
  },
  {
    title: "Home Size, Layout & Condition",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M10.5 21V8.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75V21m-4.5 0H2.36" />
      </svg>
    ),
    summary: "Gross living area, bedroom/bathroom count, floor plan functionality, and overall condition.",
    detail: "The appraiser measures the gross living area (GLA) and compares it to comparable sales. Above-grade and below-grade square footage are valued differently — finished basement space is typically worth 50-70% of above-grade space per square foot. Bedroom and bathroom counts matter, as does the overall floor plan. The appraiser rates condition on a C1 (new) through C6 (significant deferred maintenance) scale per Fannie Mae's Uniform Appraisal Dataset. Functional obsolescence — such as a bedroom accessible only through another bedroom — can reduce value.",
    source: "Fannie Mae UAD Field Guide",
  },
  {
    title: "Recent Comparable Sales",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    summary: "Three to six comparable sales from the past 3-6 months drive the final value opinion.",
    detail: "Comparable sales (\"comps\") are the backbone of a residential appraisal. Appraisers must use a minimum of three closed sales, ideally from the past 3-6 months and within the same neighborhood. They make dollar adjustments for differences in size, condition, features, and location. For example, if a comp has an extra bathroom, the appraiser deducts the estimated value of that bathroom to make it comparable. Active listings and pending sales may also be used as supporting data, but closed sales carry the most weight. In slow markets, appraisers may extend to 12-month-old sales with lender approval.",
    source: "Fannie Mae Selling Guide B4-1.3-09",
  },
  {
    title: "Needed Repairs or Updates",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a2.25 2.25 0 013.18-3.18l.72.72.72-.72a2.25 2.25 0 013.18 3.18l-5.1 5.1m0 0L9 19.5m2.42-4.33L15 19.5m-6.36-6.36l6.36 6.36" />
      </svg>
    ),
    summary: "Health, safety, and structural deficiencies that must be addressed for financing approval.",
    detail: "Appraisers note conditions that affect the property's safety, soundness, or structural integrity. For FHA and VA loans, the appraiser must flag issues that could affect habitability — peeling paint on pre-1978 homes, missing handrails, broken windows, roof damage, faulty electrical, standing water, and evidence of termite damage. These items may need to be repaired before the loan can close. For conventional loans, the requirements are less strict, but significant deferred maintenance will still impact the appraised value. The appraiser may mark the appraisal as \"subject to\" completion of specific repairs.",
    source: "HUD Handbook 4000.1 (FHA) / VA Pamphlet 26-7",
  },
  {
    title: "Lot Size & Site Features",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    summary: "Lot dimensions, topography, view, landscaping, and external improvements.",
    detail: "The site assessment covers lot size relative to the neighborhood norm, topography (flat, gently sloping, steep), and view quality. Appraisers evaluate external improvements including driveways, patios, decks, fences, pools, and detached structures. A pool may add $10,000-$30,000 in value in warm climates but far less in northern regions. Corner lots, cul-de-sac locations, and waterfront properties receive specific adjustments. Easements, encroachments, and environmental hazards (flood zone, proximity to power lines) are documented and may impact value. The appraiser verifies zoning compliance and whether the property's use conforms to the neighborhood.",
    source: "Appraisal Institute, The Appraisal of Real Estate (15th ed.)",
  },
];

/* ───────── Low appraisal options ───────── */
const lowAppraisalOptions = [
  {
    option: "Renegotiate the Price",
    desc: "Ask the seller to lower the sale price to match the appraised value.",
    pros: ["Keeps your loan-to-value ratio intact", "No additional out-of-pocket cash needed", "Most common resolution in a balanced market"],
    cons: ["Seller may refuse, especially in a hot market", "Could delay closing while you negotiate", "Seller may have other offers at higher prices"],
    when: "Best when the market is balanced or favoring buyers, when the seller is motivated, or when there are few competing offers.",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    option: "Bring Extra Cash to Close",
    desc: "Cover the difference between the appraised value and the purchase price out of pocket.",
    pros: ["Keeps the deal on track and on schedule", "Seller does not need to agree to a price reduction", "Shows strong commitment to the purchase"],
    cons: ["Reduces your cash reserves after closing", "You are paying more than the home's appraised market value", "May signal you are overpaying"],
    when: "Best when you have sufficient cash reserves, you believe the property will appreciate to justify the price, or the home has unique features not reflected in comps.",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    option: "Request a Reconsideration of Value (ROV)",
    desc: "Ask your lender to have the appraiser reconsider using additional comparable sales or correcting errors.",
    pros: ["May result in a higher value if legitimate comps were missed", "No cost to the buyer in most cases", "Required under Fannie Mae policy if you provide valid additional data"],
    cons: ["Appraiser is not required to change the value", "Only works if there is genuine additional data to support a higher value", "Can add 1-2 weeks to the timeline"],
    when: "Best when the appraiser used inappropriate comps (different neighborhood, condition, or size), missed recent sales that support the contract price, or made factual errors (wrong square footage, bedroom count).",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    option: "Walk Away Using the Appraisal Contingency",
    desc: "Exercise your contractual right to cancel the purchase and get your earnest money back.",
    pros: ["Protects you from overpaying for a property", "Earnest money deposit is returned in full", "Clean exit with no obligation"],
    cons: ["You lose the home you wanted", "Time and money spent on inspections and other due diligence is not recoverable", "Must have an appraisal contingency in your contract to use this option"],
    when: "Best when the appraisal gap is large, you do not have the cash to cover it, the seller will not negotiate, and you have an appraisal contingency in your purchase agreement.",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
  },
  {
    option: "Get a Second Appraisal",
    desc: "Order a new appraisal from a different appraiser through your lender or by switching lenders.",
    pros: ["A fresh set of eyes may use better comps or a different methodology", "May be required if you switch lenders anyway"],
    cons: ["Costs an additional $300-$600 out of pocket", "No guarantee the second appraisal will be higher", "Your current lender may not accept a second appraisal — you may need to refinance with a new lender"],
    when: "Best as a last resort when the first appraiser made clear errors, used inappropriate comps, or when the property is truly unique and difficult to appraise.",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
  },
];

/* ───────── Appraisal vs Inspection vs CMA ───────── */
const comparisonRows = [
  { label: "Purpose", appraisal: "Determine market value for the lender", inspection: "Identify physical defects and safety issues", cma: "Estimate listing or offer price" },
  { label: "Ordered by", appraisal: "Lender (paid by buyer)", inspection: "Buyer", cma: "Real estate agent" },
  { label: "Performed by", appraisal: "Licensed or certified appraiser", inspection: "Licensed home inspector", cma: "Real estate agent (not licensed appraiser)" },
  { label: "Cost", appraisal: "$300-$600", inspection: "$300-$500", cma: "Free (included with agent services)" },
  { label: "Required for financing?", appraisal: "Yes (for most mortgage types)", inspection: "No (but strongly recommended)", cma: "No" },
  { label: "Focuses on", appraisal: "Market value based on comparable sales, location, condition", inspection: "Physical condition — roof, HVAC, plumbing, electrical, structure", cma: "Price positioning relative to active and sold listings" },
  { label: "Result", appraisal: "Written appraisal report with a single value opinion", inspection: "Detailed report of defects, photos, and recommendations", cma: "Suggested price range for listing or offering" },
  { label: "Legally binding?", appraisal: "Affects loan amount lender will approve", inspection: "No — advisory only, buyer decides how to proceed", cma: "No — advisory only" },
];

/* ───────── Tips ───────── */
const smoothTips = [
  {
    title: "Clean and Declutter",
    desc: "A clean, well-maintained home makes a strong first impression. While appraisers are trained to look past clutter, excessive mess can suggest deferred maintenance and may make it harder for the appraiser to evaluate condition accurately.",
    source: "Appraisal Institute best practices",
  },
  {
    title: "Provide a List of Upgrades with Receipts",
    desc: "Give the appraiser a written list of all improvements, renovations, and upgrades — with dates and costs. New roof, kitchen remodel, HVAC replacement, windows, flooring — anything that adds value. Appraisers cannot account for improvements they do not know about.",
    source: "Fannie Mae Selling Guide",
  },
  {
    title: "Do Not Be Present During the Appraisal",
    desc: "The appraiser needs to work independently and without pressure. Being present can make the appraiser uncomfortable or create the appearance of bias. Let your agent handle access and leave the improvement list for the appraiser to review.",
    source: "Appraisal Institute Code of Professional Ethics",
  },
  {
    title: "Ensure Clear Access to All Areas",
    desc: "The appraiser needs access to the attic, crawl space, basement, garage, all rooms, and the full exterior of the property. Locked gates, blocked crawl spaces, or inaccessible attics may result in an incomplete appraisal or the need for a return visit (additional cost and delay).",
    source: "HUD Handbook 4000.1",
  },
  {
    title: "Complete Minor Repairs Before the Appraisal",
    desc: "Fix leaking faucets, patch holes in walls, replace broken window panes, and address peeling paint. For FHA and VA loans, health and safety items must be repaired before closing — completing them before the appraisal prevents the report from being marked \"subject to\" repairs.",
    source: "HUD / VA minimum property requirements",
  },
  {
    title: "Verify Your Property Information Is Accurate",
    desc: "Check that public records (county assessor) show the correct square footage, bedroom count, bathroom count, and lot size. Errors in public records can lead to inaccurate comps. If your property records are wrong, provide documentation to your agent who can share it with the appraiser.",
    source: "CFPB homebuyer guidance",
  },
];

export default function AppraisalGuidePage() {
  const [expandedTile, setExpandedTile] = useState<number | null>(null);
  const [expandedOption, setExpandedOption] = useState<number | null>(null);

  return (
    <>
      <PageHero
        title="Understanding Your Home Appraisal"
        subtitle="An appraisal protects you and your lender from overpaying. Here is everything you need to know — what appraisers evaluate, what happens when the value comes in low, and how to prepare."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "Appraisal Guide", href: "/appraisal-guide" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* ── Key stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { val: "$300-$600", label: "Typical appraisal cost", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
              { val: "1-2 weeks", label: "Average turnaround time", bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
              { val: "~35%", label: "Of buyers face appraisal issues", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
              { val: "3-6 comps", label: "Used to determine value", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
            ].map((s) => (
              <div key={s.label} className={`p-4 ${s.bg} rounded-xl border ${s.border} shadow-sm tile-interactive text-center`}>
                <p className={`text-2xl font-bold ${s.text}`}>{s.val}</p>
                <p className="text-[10px] text-alta-gray mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── What is an appraisal ── */}
          <div className="mb-10 p-4 bg-[#faf4e4] rounded-2xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b6914]/10 flex items-center justify-center text-[#8b6914] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">What Is a Home Appraisal and Why Does It Matter?</h2>
                <p className="text-sm text-alta-gray leading-relaxed mb-2">
                  A home appraisal is an independent, professional opinion of a property&apos;s market value, performed by a state-licensed or certified appraiser. The appraisal is ordered by the lender — not by the buyer or seller — to ensure the property is worth the amount being financed. This protects both the lender (who does not want to loan more than the home is worth) and the buyer (who does not want to overpay).
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mt-3">
                  <div className="p-3 bg-white/70 rounded-xl">
                    <p className="text-[10px] font-semibold text-[#8b6914] uppercase tracking-wider mb-1">Who orders it?</p>
                    <p className="text-xs text-alta-gray">The lender orders the appraisal through an appraisal management company (AMC). Since 2009, the Home Valuation Code of Conduct (now part of Dodd-Frank) requires separation between the loan officer and appraiser selection.</p>
                  </div>
                  <div className="p-3 bg-white/70 rounded-xl">
                    <p className="text-[10px] font-semibold text-[#8b6914] uppercase tracking-wider mb-1">Who pays?</p>
                    <p className="text-xs text-alta-gray">The buyer pays the appraisal fee, typically $300-$600 for a single-family home. Complex, rural, or high-value properties may cost more. The fee is usually collected upfront or at closing.</p>
                  </div>
                  <div className="p-3 bg-white/70 rounded-xl">
                    <p className="text-[10px] font-semibold text-[#8b6914] uppercase tracking-wider mb-1">How long does it take?</p>
                    <p className="text-xs text-alta-gray">The appraiser typically visits the property for 30-60 minutes. The full report takes 1-2 weeks to complete, depending on market conditions and appraiser availability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── What appraisers evaluate — expandable tiles ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">What Appraisers Evaluate</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            Click any area below for a detailed breakdown of what the appraiser examines and how it affects your home&apos;s value.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {evaluationAreas.map((area, i) => (
              <div key={area.title}>
                <div
                  onClick={() => setExpandedTile(expandedTile === i ? null : i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpandedTile(expandedTile === i ? null : i); } }}
                  role="button"
                  tabIndex={0}
                  className="tile-interactive cursor-pointer group relative p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                      {area.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-alta-navy mb-1">{area.title}</h3>
                      <p className="text-xs text-alta-gray leading-relaxed">{area.summary}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-alta-teal/10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className={`w-3 h-3 text-alta-teal transition-transform ${expandedTile === i ? "rotate-45" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </div>
                {expandedTile === i && (
                  <div className="mt-1 p-4 bg-alta-light rounded-xl border border-gray-100 animate-in fade-in duration-200">
                    <p className="text-xs text-alta-gray leading-relaxed mb-2">{area.detail}</p>
                    <p className="text-[10px] text-alta-gray/70 italic">Source: {area.source}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <InlineAd />

          {/* ── LOW APPRAISAL — critical section ── */}
          <div className="mb-10">
            <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-200 border-l-4 border-l-red-500">
              <h2 className="text-2xl font-bold text-alta-navy mb-2">What Happens When the Appraisal Comes In Low</h2>
              <p className="text-sm text-alta-gray leading-relaxed">
                A low appraisal means the appraiser&apos;s opinion of value is less than the agreed-upon purchase price. This is one of the most stressful situations in a real estate transaction. The lender will only finance a loan based on the appraised value — not the contract price. If the appraisal is $15,000 below the purchase price, someone has to cover that $15,000 gap. Here are your five options:
              </p>
            </div>

            <div className="space-y-3">
              {lowAppraisalOptions.map((opt, i) => (
                <div key={opt.option} className={`rounded-2xl border overflow-hidden ${opt.color}`}>
                  <div
                    onClick={() => setExpandedOption(expandedOption === i ? null : i)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpandedOption(expandedOption === i ? null : i); } }}
                    role="button"
                    tabIndex={0}
                    className="p-4 cursor-pointer flex items-start gap-3 hover:opacity-90 transition-opacity"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center ${opt.iconColor} font-bold text-sm shrink-0`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-alta-navy">{opt.option}</h3>
                      <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{opt.desc}</p>
                    </div>
                    <svg className={`w-4 h-4 text-alta-gray shrink-0 mt-1 transition-transform ${expandedOption === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {expandedOption === i && (
                    <div className="px-4 pb-4 animate-in fade-in duration-200">
                      <div className="grid sm:grid-cols-2 gap-3 mb-3">
                        <div className="p-3 bg-white/60 rounded-xl">
                          <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-1.5">Pros</p>
                          <ul className="space-y-1">
                            {opt.pros.map((pro) => (
                              <li key={pro} className="flex items-start gap-1.5 text-xs text-alta-gray">
                                <svg className="w-3 h-3 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 bg-white/60 rounded-xl">
                          <p className="text-[10px] font-semibold text-red-700 uppercase tracking-wider mb-1.5">Cons</p>
                          <ul className="space-y-1">
                            {opt.cons.map((con) => (
                              <li key={con} className="flex items-start gap-1.5 text-xs text-alta-gray">
                                <svg className="w-3 h-3 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-3 bg-white/60 rounded-xl">
                        <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">When to use this option</p>
                        <p className="text-xs text-alta-gray leading-relaxed">{opt.when}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Appraisal vs Inspection vs CMA ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Appraisal vs. Inspection vs. CMA</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">
            These three evaluations serve different purposes. Understanding the difference prevents confusion about what each professional is responsible for.
          </p>
          <div className="overflow-x-auto mb-10 rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-alta-navy text-white">
                  <th className="px-4 py-3 font-semibold w-[20%]"></th>
                  <th className="px-4 py-3 font-semibold w-[27%]">Appraisal</th>
                  <th className="px-4 py-3 font-semibold w-[27%]">Home Inspection</th>
                  <th className="px-4 py-3 font-semibold w-[26%]">CMA</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-alta-light/50"}>
                    <td className="px-4 py-3 font-semibold text-alta-navy">{row.label}</td>
                    <td className="px-4 py-3 text-alta-gray">{row.appraisal}</td>
                    <td className="px-4 py-3 text-alta-gray">{row.inspection}</td>
                    <td className="px-4 py-3 text-alta-gray">{row.cma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Appraisal Gap Coverage ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Appraisal Gap Coverage</h2>
          <div className="p-5 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 mb-10">
            <h3 className="font-bold text-alta-navy mb-2">What Is an Appraisal Gap?</h3>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              An appraisal gap is the difference between the appraised value and the purchase price when the appraisal comes in lower than the contract price. For example, if you agreed to pay $400,000 but the appraisal comes in at $385,000, the appraisal gap is $15,000.
            </p>
            <h3 className="font-bold text-alta-navy mb-2">What Is Appraisal Gap Coverage?</h3>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              Appraisal gap coverage (also called an appraisal gap guarantee) is a clause in your purchase offer where you agree in advance to cover some or all of the difference between the appraised value and the purchase price — using your own funds. This is common in competitive markets where buyers want to make their offer more attractive to sellers.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <div className="p-3 bg-white/70 rounded-xl">
                <p className="text-[10px] font-semibold text-purple-700 uppercase tracking-wider mb-1">How it works</p>
                <p className="text-xs text-alta-gray leading-relaxed">
                  You write into your offer: &quot;Buyer will cover an appraisal gap of up to $20,000.&quot; If the appraisal comes in $15,000 low, you bring that $15,000 in additional cash to closing. If the gap exceeds your coverage amount, you can renegotiate or exercise your appraisal contingency.
                </p>
              </div>
              <div className="p-3 bg-white/70 rounded-xl">
                <p className="text-[10px] font-semibold text-purple-700 uppercase tracking-wider mb-1">Important considerations</p>
                <p className="text-xs text-alta-gray leading-relaxed">
                  Appraisal gap coverage funds come from your cash reserves and are separate from your down payment. Your lender will verify you have sufficient funds for both. Do not commit to more gap coverage than you can afford — factor it into your total cash-to-close calculation before making an offer.
                </p>
              </div>
            </div>
          </div>

          {/* ── Tips for a smooth appraisal ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Tips for a Smooth Appraisal</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">
            While the buyer has limited control over the appraisal outcome, the seller (and listing agent) can take steps to help ensure the appraiser has the information needed to support the property&apos;s value.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {smoothTips.map((tip) => (
              <div key={tip.title} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-1">{tip.title}</h3>
                <p className="text-xs text-alta-gray leading-relaxed mb-2">{tip.desc}</p>
                <p className="text-[10px] text-alta-gray/70 italic">Source: {tip.source}</p>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* ── Sources ── */}
          <p className="text-[10px] text-alta-gray mb-6">
            Sources: Consumer Financial Protection Bureau (CFPB), Fannie Mae Selling Guide (B4-1 Appraisal Requirements), Appraisal Institute — The Appraisal of Real Estate (15th ed.), HUD Handbook 4000.1 (FHA appraisal requirements), VA Pamphlet 26-7 (VA appraisal requirements). Appraisal cost and timeline figures reflect 2024-2025 national averages.
          </p>

          {/* ── Related links ── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/home-inspection" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Home Inspection Guide
            </Link>
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Closing Costs Explained
            </Link>
            <Link href="/loan-estimate" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Your Loan Estimate
            </Link>
          </div>

          {/* ── Related Topics ── */}
          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/home-inspection" className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Home Inspection Guide</h3>
                <p className="text-[10px] text-alta-gray mt-1">Complete guide to what inspectors look for and how to use the results</p>
              </Link>
              <Link href="/closing-process/closing-costs" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Explained</h3>
                <p className="text-[10px] text-alta-gray mt-1">Understand every fee on your Closing Disclosure including the appraisal fee</p>
              </Link>
              <Link href="/first-time-buyers" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">First-Time Buyers Guide</h3>
                <p className="text-[10px] text-alta-gray mt-1">Step-by-step guidance for navigating your first home purchase</p>
              </Link>
            </div>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
