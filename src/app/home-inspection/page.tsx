import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import TrustedALTAMembers from "@/components/TrustedALTAMembers";
import { DeferredInspectionAreas, DeferredInspectionTiles } from "@/components/LazyInspection";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import SponsorTip from "@/components/SponsorTip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Inspection Guide",
  description: "Complete guide to home inspections — when to get one, what inspectors look for, how to choose an inspector, and why it matters for every type of home.",
};

const homeTypes = [
  {
    type: "Existing Home (10+ years old)",
    inspections: "General inspection + consider: sewer scope, radon test, termite/pest inspection",
    timing: "Within 7-10 days of accepted offer (per your inspection contingency)",
    focus: "Aging systems are the biggest concern. Pay close attention to the roof (average lifespan 20-30 years), HVAC system (15-20 years), and water heater (8-12 years). Ask about any renovations done without permits. Older homes may have outdated wiring (knob-and-tube, aluminum) or plumbing (galvanized, polybutylene) that pose safety or insurance issues.",
    cost: "$350-$500 for general inspection; $100-$300 each for specialty inspections",
  },
  {
    type: "Newer Home (under 10 years)",
    inspections: "General inspection is still essential — do NOT skip it",
    timing: "Within 7-10 days of accepted offer",
    focus: "Even newer homes have defects. Common issues include improper grading/drainage, settling cracks, HVAC installation errors, and builder shortcuts. Check warranty coverage — many new homes have a builder warranty (1-2 years workmanship, 10 years structural) that may still be transferable. Verify all permits were pulled and inspections passed.",
    cost: "$300-$450",
  },
  {
    type: "New Construction",
    inspections: "Three inspections recommended: pre-drywall, pre-closing, and 11-month warranty",
    timing: "Pre-drywall: before walls are closed up. Pre-closing: 1-2 weeks before final walk-through. 11-month: before builder's 1-year warranty expires.",
    focus: "Pre-drywall is the most valuable — you can see framing, plumbing, electrical, and HVAC before it's hidden behind walls. At pre-closing, verify all punch list items are completed. The 11-month inspection catches issues that develop during the first year (settling, HVAC problems, drainage) while still under warranty.",
    cost: "$300-$400 per inspection ($900-$1,200 total for all three)",
  },
  {
    type: "Renovated / Flipped Home",
    inspections: "General inspection + permits verification + consider thermal imaging",
    timing: "Within 7-10 days of accepted offer — do NOT waive this",
    focus: "Flipped homes carry elevated risk. Cosmetic renovations can mask structural, plumbing, and electrical problems. Key concerns: Was the work done with permits? Was it inspected by the city? Are there hidden moisture problems behind new walls? Thermal imaging ($150-$300 extra) can reveal moisture, insulation gaps, and electrical hot spots behind walls without opening them.",
    cost: "$400-$600 (general + thermal imaging)",
  },
];

const specialtyInspections = [
  { name: "Radon Testing", cost: "$100-$200", when: "Recommended for all homes, especially basements/lower levels. Radon is the #2 cause of lung cancer. EPA recommends testing every home. Mitigation systems cost $800-$1,500 if levels are above 4 pCi/L.", source: "EPA" },
  { name: "Sewer/Drain Scope", cost: "$150-$300", when: "Strongly recommended for homes over 20 years old. A camera inspection of the main sewer line reveals root intrusion, bellied pipes, cracks, and blockages. Sewer line replacement can cost $5,000-$25,000+.", source: "ASHI" },
  { name: "Termite/Pest Inspection", cost: "$75-$150", when: "Required by some lenders (especially VA loans). Checks for wood-destroying organisms — termites, carpenter ants, powder post beetles. Damage repair can cost thousands. Some states require this for all transactions.", source: "NPMA" },
  { name: "Mold Testing", cost: "$200-$600", when: "If the inspector finds visible mold or moisture issues. Air quality and surface samples identify mold type and concentration. Professional mold remediation costs $1,500-$9,000 depending on scope.", source: "EPA" },
  { name: "Well Water Testing", cost: "$100-$500", when: "Required if the property has a private well (not connected to municipal water). Tests for bacteria, nitrates, pH, and contaminants. FHA and VA loans require well water testing.", source: "EPA" },
  { name: "Septic System Inspection", cost: "$250-$500", when: "Required if the property has a septic system. Includes tank pumping and inspection of the drain field. Septic system replacement costs $15,000-$30,000+.", source: "EPA" },
  { name: "Foundation/Structural Assessment", cost: "$300-$800", when: "If the general inspector notes significant cracks, uneven floors, or sticking doors/windows. A structural engineer provides a definitive assessment and repair recommendations.", source: "ASCE" },
  { name: "Chimney Inspection", cost: "$150-$500", when: "If the home has a fireplace or wood stove. Checks for creosote buildup, liner condition, and structural integrity. Level 2 inspection recommended for home sales.", source: "CSIA" },
];

export default function HomeInspectionPage() {
  return (
    <>
      <PageHero
        title="Home Inspection Guide"
        subtitle="A thorough home inspection is one of the most important investments you'll make in the homebuying process. Here's everything you need to know."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Home Inspection", href: "/home-inspection" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-[#faf4e4] rounded-2xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b6914]/10 flex items-center justify-center text-[#8b6914] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Why Every Homebuyer Needs an Independent Inspection</h2>
                <p className="text-sm text-alta-gray leading-relaxed">A home inspection is a visual examination of the physical structure and major systems of a property. It&apos;s conducted by a licensed, independent inspector who works for YOU — not the seller, not the agent, and not the lender. The inspector&apos;s job is to find problems before they become your problems. A $400 inspection can uncover $40,000 in hidden issues. Never skip this step.</p>
              </div>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { val: "$400", label: "Average inspection cost", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
              { val: "2-4 hrs", label: "Typical inspection time", bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
              { val: "86%", label: "Of inspections find issues", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
              { val: "7-10 days", label: "Typical contingency window", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
            ].map((s) => (
              <div key={s.val} className={`p-4 ${s.bg} rounded-xl border ${s.border} shadow-sm tile-interactive text-center`}>
                <p className={`text-2xl font-bold ${s.text}`}>{s.val}</p>
                <p className="text-xs text-alta-gray mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* What inspectors look at — expandable deep-dive tiles */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">What a Home Inspector Examines</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">Click any area below for the full breakdown — what inspectors look for, red flags that could cost thousands, and what questions to ask. A general inspection covers all six of these areas in a 2-4 hour visit.</p>
          <DeferredInspectionAreas />

          <InlineAd />

          {/* By home type */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Inspection Guide by Home Type</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">The type of home you&apos;re buying determines what inspections you need, when to schedule them, and what to focus on. Each type presents different risks:</p>
          <div className="space-y-5 mb-10">
            {homeTypes.map((ht) => (
              <div key={ht.type} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-white tile-interactive">
                <div className="bg-alta-navy px-5 py-3">
                  <h3 className="text-white font-bold">{ht.type}</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-alta-light rounded-xl">
                      <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Inspections Needed</p>
                      <p className="text-xs text-alta-gray">{ht.inspections}</p>
                    </div>
                    <div className="p-3 bg-alta-light rounded-xl">
                      <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Timing</p>
                      <p className="text-xs text-alta-gray">{ht.timing}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">What to Focus On</p>
                    <p className="text-sm text-alta-gray leading-relaxed">{ht.focus}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-xs text-amber-800"><strong>Typical cost:</strong> {ht.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Specialty inspections */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Specialty Inspections: When You Need More</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">A general home inspection doesn&apos;t cover everything. Click any inspection below for full details on when it&apos;s needed, what it reveals, and what problems cost to fix.</p>
          <DeferredInspectionTiles />

          {/* How to choose an inspector */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Choosing an Independent Home Inspector</h2>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="p-5 bg-green-50 rounded-2xl border border-green-200">
              <h3 className="font-bold text-green-700 mb-3">What to Look For</h3>
              <ul className="space-y-2 text-xs text-green-800">
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Licensed and insured in your state</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Member of ASHI (American Society of Home Inspectors) or InterNACHI</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Minimum 200-300 inspections completed</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Provides a detailed written report with photos within 24-48 hours</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Allows and encourages you to attend the inspection</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Has no financial relationship with the seller or listing agent</li>
              </ul>
            </div>
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                Things to Consider
              </h3>
              <ul className="space-y-2 text-xs text-amber-800">
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>Don&apos;t use an inspector recommended by the seller&apos;s agent — find your own</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>The cheapest inspector isn&apos;t the best — experience and thoroughness matter more</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>An inspection that takes less than 2 hours on a full-size home may not be thorough enough</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>Inspectors can&apos;t see inside walls, under floors, or behind fixtures — they report on what&apos;s visible and accessible</li>
                <li className="flex items-start gap-2"><svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>An inspection is NOT a pass/fail test — it&apos;s an informed assessment that helps you make decisions</li>
              </ul>
            </div>
          </div>

          <TrustedALTAMembers />

          {/* Who pays */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Who Pays for the Home Inspection?</h2>
          <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 mb-10">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              <strong className="text-alta-navy">The buyer pays for the home inspection</strong> in the vast majority of transactions. This is actually a benefit — because you&apos;re paying the inspector, they work for you and owe their loyalty to you, not the seller. The typical cost of $300-$500 is a small price compared to the potential cost of undiscovered problems.
            </p>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              <strong className="text-alta-navy">When the seller might pay:</strong> In some cases, sellers provide a pre-listing inspection to attract buyers or speed up the process. While informative, buyers should still consider getting their own independent inspection — a seller&apos;s inspection may be less thorough or may not cover concerns specific to the buyer.
            </p>
            <p className="text-sm text-alta-gray leading-relaxed">
              <strong className="text-alta-navy">Negotiating repairs:</strong> After the inspection, you can negotiate with the seller to fix issues, reduce the price, provide credits at closing, or walk away entirely (if you have an inspection contingency). Your agent will help you determine which issues are worth negotiating and which are normal wear and tear.
            </p>
          </div>

          {/* What happens after */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">After the Inspection: Your Options</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {[
              { option: "Accept As-Is", desc: "No issues significant enough to warrant action. Proceed with the purchase.", color: "bg-green-50 border-green-100" },
              { option: "Request Repairs", desc: "Ask the seller to fix specific issues before closing. Common for safety and structural concerns.", color: "bg-blue-50 border-blue-100" },
              { option: "Negotiate Credits", desc: "Ask for a price reduction or closing cost credit instead of repairs. Gives you control over how fixes are done.", color: "bg-amber-50 border-amber-100" },
              { option: "Walk Away", desc: "If major issues are found and the seller won't negotiate, your inspection contingency lets you exit with your earnest money.", color: "bg-red-50 border-red-100" },
            ].map((opt) => (
              <div key={opt.option} className={`p-4 rounded-xl border ${opt.color} tile-interactive`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1">{opt.option}</h3>
                <p className="text-sm text-alta-gray leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>

          <InlineAd />

          <div className="p-5 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200 mb-6">
            <h3 className="font-bold text-alta-navy mb-2">Never Waive the Inspection Contingency</h3>
            <p className="text-sm text-alta-gray leading-relaxed">In competitive markets, some buyers waive the inspection contingency to make their offer more attractive. This is extremely risky. Without an inspection contingency, you cannot walk away or renegotiate if the inspection reveals major problems — you&apos;re legally obligated to buy the home regardless. If you feel pressured to waive, consider a &quot;pass/fail&quot; inspection contingency instead, where you can only cancel for major structural or safety issues, not cosmetic concerns.</p>
          </div>

          <p className="text-xs text-alta-gray mb-6">Sources: American Society of Home Inspectors (ASHI), International Association of Certified Home Inspectors (InterNACHI), EPA (radon, mold, well water), National Pest Management Association (NPMA), Chimney Safety Institute of America (CSIA)</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Closing Checklist
            </Link>
            <Link href="/questions-to-ask" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Questions to Ask
            </Link>
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Closing Costs Calculator
            </Link>
          </div>

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/closing-process/closing-checklist" className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Checklist</h3>
                <p className="text-xs text-alta-gray mt-1">Track every step from offer to keys with our interactive checklist</p>
              </Link>
              <Link href="/questions-to-ask" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Questions to Ask</h3>
                <p className="text-xs text-alta-gray mt-1">Essential questions for your agent, lender, and title company</p>
              </Link>
              <Link href="/first-time-buyers" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">First-Time Buyers Guide</h3>
                <p className="text-xs text-alta-gray mt-1">Step-by-step guidance for navigating your first home purchase</p>
              </Link>
            </div>
          </div>

          <SponsorTip context="insurance" />

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
