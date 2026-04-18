"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import MiniQuiz from "@/components/MiniQuiz";
import ContextualSponsor from "@/components/ContextualSponsor";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";

const insuranceQuiz = [
  {
    q: "What does 'dwelling coverage' (Coverage A) on a homeowners insurance policy protect?",
    choices: [
      "Your personal belongings inside the home",
      "The physical structure of your home",
      "Injuries to visitors on your property",
      "Temporary living expenses if displaced"
    ],
    answer: 1,
    explanation: "Dwelling coverage (Coverage A) pays to repair or rebuild the physical structure of your home — walls, roof, floors, and built-in fixtures — if damaged by a covered peril such as fire, windstorm, or hail."
  },
  {
    q: "When purchasing a home, when must you have homeowners insurance in place?",
    choices: [
      "Within 30 days after closing",
      "Before the home inspection",
      "Before closing day",
      "Only if the lender requests it"
    ],
    answer: 2,
    explanation: "Lenders require proof of homeowners insurance before closing because the policy must be active on the day ownership transfers. Without it, the lender will not fund the mortgage."
  },
  {
    q: "Which common natural disaster is typically NOT covered by a standard homeowners insurance policy?",
    choices: ["Fire", "Windstorm", "Flooding", "Hail"],
    answer: 2,
    explanation: "Standard homeowners policies (HO-3) exclude flood damage. Homeowners in flood-prone areas need a separate flood insurance policy, often through the National Flood Insurance Program (NFIP)."
  }
];

const coverageTypes = [
  {
    title: "Dwelling Coverage (A)", desc: "Repairs or rebuilds your home's structure if damaged by covered events — fire, windstorm, hail, lightning, vandalism. Should cover the full replacement cost, not just market value.",
    color: "bg-[#e8f0f5] border-[#c5d8e4]",
    gradient: "from-[#1a5276] to-[#0a7ea8]",
    modalContent: {
      explanation: "Dwelling coverage (Coverage A) is the core of your homeowner's insurance policy. It pays to repair or rebuild the physical structure of your home — including attached structures like an attached garage, walls, roof, floors, built-in appliances, and permanently installed fixtures — if damaged by a covered peril. Covered perils on a standard HO-3 policy include fire, lightning, windstorm, hail, explosions, smoke damage, vandalism, theft, falling objects, weight of ice/snow, water damage from plumbing or appliances (sudden/accidental), and electrical surges.",
      coveredVsNot: "COVERED: Fire damage to walls/roof, wind damage from storms, hail damage to siding/roof, theft-related structural damage, vandalism, lightning strikes, fallen trees, burst pipes (sudden). NOT COVERED: Flood damage (requires separate flood policy), earthquake damage (requires separate policy), gradual water damage from ongoing leaks, foundation settling, termite/pest damage, mold from neglected maintenance, normal wear and tear.",
      typicalCosts: "Dwelling coverage is the primary driver of your premium cost. The amount should equal the estimated cost to rebuild your home (not the market value, which includes land). Replacement cost estimates can be obtained from your insurance agent, a contractor, or online calculators. Typical cost: $800-$2,500/year for the dwelling coverage portion alone, varying by location, construction type, and coverage amount. Most policies include an inflation guard that automatically increases coverage 2-4% annually.",
      shoppingTips: "Make sure your dwelling coverage equals or exceeds 100% of your home's estimated replacement cost. Ask your agent how they calculated the replacement cost estimate. Consider guaranteed replacement cost or extended replacement cost endorsements — these pay to rebuild even if costs exceed your coverage limit (typically 20-50% above). Review your coverage annually, especially after renovations or additions that increase replacement cost."
    }
  },
  {
    title: "Other Structures (B)", desc: "Covers detached structures — garage, shed, fence, deck. Typically 10% of dwelling coverage. Important if you have a detached garage or outbuilding.",
    color: "bg-[#e9f5ed] border-[#bddcc7]",
    gradient: "from-[#2d6b3f] to-[#1a5276]",
    modalContent: {
      explanation: "Coverage B protects detached structures on your property that are not physically connected to your main dwelling. This includes detached garages, storage sheds, fences, gazebos, detached decks or patios, barns (non-commercial), guest houses, and swimming pool structures. The coverage amount is typically set at 10% of your dwelling coverage by default.",
      coveredVsNot: "COVERED: Detached garage damaged by windstorm, fence destroyed by a fallen tree, shed damaged by fire, pool house damaged by hail. NOT COVERED: Structures used for business purposes, structures rented to others (unless endorsed), damage from floods or earthquakes, structures on separate property you own but do not live at, normal wear and deterioration.",
      typicalCosts: "Coverage B is typically included at 10% of dwelling coverage at no additional premium. For a home with $300,000 dwelling coverage, other structures coverage would be $30,000. If you have valuable detached structures (a large detached garage, workshop, pool house), you may need to increase this limit — ask your agent about increasing Coverage B, which usually adds a modest amount to your premium.",
      shoppingTips: "Inventory all detached structures on your property and estimate their replacement cost. If the total exceeds 10% of your dwelling coverage, request an increase to Coverage B. Make sure to clarify what qualifies as 'attached' vs 'detached' with your insurer — a breezeway-connected garage may be covered under dwelling coverage or other structures depending on the policy."
    }
  },
  {
    title: "Personal Property (C)", desc: "Covers your belongings — furniture, electronics, clothing, appliances. Typically 50-70% of dwelling coverage. Consider 'replacement cost' vs 'actual cash value' (which deducts for depreciation).",
    color: "bg-[#faf4e4] border-[#e8d9a8]",
    gradient: "from-[#8b6914] to-[#1a5276]",
    modalContent: {
      explanation: "Coverage C protects your personal belongings: furniture, electronics, clothing, appliances, kitchenware, books, sports equipment, and other personal items inside your home. This coverage applies whether your belongings are damaged at home or anywhere in the world (your laptop stolen on vacation, for example). Standard coverage is typically 50-70% of dwelling coverage, but this can be adjusted.",
      coveredVsNot: "COVERED: Furniture, electronics, clothing, appliances, books, most personal items damaged by covered perils; belongings stolen from your car; items damaged while in storage or in transit during a move. NOT COVERED: Motorized vehicles (covered by auto insurance), animals/pets, items belonging to tenants or boarders, business equipment over $2,500 (need business endorsement). HIGH-VALUE ITEMS have sub-limits: jewelry ($1,000-$2,500), silverware ($2,500), firearms ($2,500), cash ($200). Schedule these separately for full coverage.",
      typicalCosts: "Personal property coverage at the standard 50-70% of dwelling typically does not add significant cost. However, the type of valuation matters greatly. Actual Cash Value (ACV) is the default on many policies — it deducts for depreciation, meaning your 5-year-old TV might only be covered at 50% of replacement cost. Replacement Cost Value (RCV) pays what it costs to buy a new, equivalent item — it typically adds 10-20% to your premium but is worth it.",
      shoppingTips: "Create a home inventory: photograph every room and major item, save receipts for valuable items, and store the inventory in the cloud or off-site. Choose replacement cost valuation over actual cash value — the premium increase is modest compared to the coverage improvement. Schedule high-value items (jewelry, art, collectibles, musical instruments) individually with appraisals for full coverage beyond sub-limits."
    }
  },
  {
    title: "Loss of Use (D)", desc: "Pays for temporary living expenses if your home is uninhabitable due to a covered loss — hotel, restaurant meals, storage. Typically 20-30% of dwelling coverage.",
    color: "bg-[#f0ecf6] border-[#d4c8e4]",
    gradient: "from-[#5b3a8c] to-[#1a5276]",
    modalContent: {
      explanation: "Coverage D, also called Additional Living Expenses (ALE), reimburses you for the extra costs of living away from home while your house is being repaired after a covered loss. This covers hotel or rental costs, restaurant meals above your normal food budget, storage fees, laundry, pet boarding, and other reasonable additional expenses. The coverage typically lasts until your home is repaired or you permanently relocate.",
      coveredVsNot: "COVERED: Temporary housing (hotel, rental home, furnished apartment), restaurant meals above your normal food budget (the extra cost, not the full amount), storage unit rental, additional transportation costs, pet boarding, laundry services. NOT COVERED: Your normal living expenses (you'd be paying for food and utilities anyway — the policy covers the EXTRA cost), voluntary evacuation without a covered loss, loss of use due to maintenance issues or code violations.",
      typicalCosts: "Coverage D is typically set at 20-30% of dwelling coverage. For a $300,000 dwelling policy, that means $60,000-$90,000 for additional living expenses. This amount goes further than you might think because it only covers the INCREASE in your living costs, not the total cost. For example, if your normal grocery bill is $800/month but restaurant meals cost $1,500/month while displaced, the policy covers the $700 difference. There is usually no per-day limit, just the total coverage amount.",
      shoppingTips: "Verify your Coverage D limit is realistic for your area. In high-cost areas (New York, San Francisco, etc.), temporary housing can be very expensive. If the standard 20% seems low for your market, ask about increasing it. Keep all receipts while displaced — detailed documentation speeds up reimbursement. Ask your insurer about advance payments so you are not out-of-pocket while waiting for reimbursement."
    }
  },
  {
    title: "Personal Liability (E)", desc: "Protects you if someone is injured on your property or you accidentally damage someone else's property. Typically $100,000-$300,000. Consider an umbrella policy for more.",
    color: "bg-[#f5e8e8] border-[#e4c5c5]",
    gradient: "from-[#943030] to-[#1a5276]",
    modalContent: {
      explanation: "Coverage E protects you financially if you are found legally responsible for someone else's bodily injury or property damage. This applies on and off your property. It covers legal defense costs (attorney fees, court costs) AND any damages awarded, up to your policy limit. Common scenarios: a guest slips on your icy walkway, your child accidentally damages a neighbor's property, your dog bites a visitor.",
      coveredVsNot: "COVERED: Guest injuries on your property (slip and fall, dog bite, pool accident), accidental damage to others' property, legal defense costs if you are sued, injuries caused by your pets (most breeds — some policies exclude certain breeds). NOT COVERED: Intentional acts, injuries to residents of your household, business-related liability, auto-related liability (covered by auto insurance), liability arising from professional services, injuries covered by workers' compensation.",
      typicalCosts: "Standard policies include $100,000 in liability coverage. Increasing to $300,000 or $500,000 typically adds only $10-$30/year to your premium — it is one of the best values in insurance. For additional protection, consider an umbrella policy that provides $1 million or more in coverage above your homeowner's and auto liability limits. Umbrella policies typically cost $200-$400/year for $1 million in coverage.",
      shoppingTips: "Increase your liability limit to at least $300,000 — the cost increase is minimal. If you have significant assets to protect (savings, investments, retirement accounts, real estate equity), consider a personal umbrella policy. If you have a swimming pool, trampoline, or certain dog breeds, make sure your policy does not exclude these. Ask about additional protections for specific risks you may face."
    }
  },
  {
    title: "Medical Payments (F)", desc: "Pays medical bills for guests injured on your property regardless of fault — no lawsuit needed. Typically $1,000-$5,000 per person. Doesn't cover your own family.",
    color: "bg-[#e6f1f5] border-[#b4d8e8]",
    gradient: "from-[#0a7ea8] to-[#1a5276]",
    modalContent: {
      explanation: "Coverage F pays for medical expenses when a guest is injured on your property, regardless of who is at fault. It is designed to cover small to moderate medical bills quickly, without requiring a liability determination or lawsuit. This is a goodwill coverage — it pays promptly to help your guest and may prevent a larger liability claim. It typically covers medical bills up to $1,000-$5,000 per person.",
      coveredVsNot: "COVERED: A guest trips on your stairs and needs stitches, a neighbor's child falls off your swing set and breaks an arm, a visitor is bitten by your dog. Coverage applies regardless of fault — it does not matter if you were negligent or not. NOT COVERED: Injuries to you or members of your household, injuries to regular residents, injuries from intentional acts, injuries that exceed the per-person limit (those may be covered under liability), business-related injuries.",
      typicalCosts: "Coverage F is a relatively small coverage — typically $1,000 to $5,000 per person per occurrence. It is included in standard policies at minimal cost. Increasing from $1,000 to $5,000 per person usually adds less than $10/year to your premium. While the coverage amount is small, it serves an important purpose: resolving minor injury claims quickly and amicably before they escalate into liability lawsuits.",
      shoppingTips: "Increase Coverage F to the maximum available ($5,000 per person on most policies) — the cost is negligible. This coverage acts as a buffer that can prevent small incidents from becoming large liability claims. If you frequently host guests, have children who bring friends over, or have features that increase injury risk (pool, trampoline, deck), this coverage becomes even more valuable."
    }
  },
];

const exclusions = [
  {
    gap: "Floods", solution: "Requires separate flood insurance through the National Flood Insurance Program (NFIP) or a private insurer. Required if in a FEMA flood zone. Average cost: $700-$1,500/yr.", source: "FEMA",
    gradient: "from-[#1a5276] to-[#0a7ea8]",
    modalContent: {
      explanation: "Standard homeowner's insurance policies explicitly exclude flood damage. Flood insurance is a separate policy that covers damage caused by rising water — storm surge, heavy rain runoff, river overflow, mudflow, and other surface water that enters your home. The National Flood Insurance Program (NFIP), managed by FEMA, is the primary source of flood insurance in the U.S., though private flood insurance options are growing.",
      coveredVsNot: "COVERED BY FLOOD INSURANCE: Structural damage from rising water, damaged electrical and plumbing systems, HVAC equipment, appliances, flooring, personal belongings (with contents coverage), debris cleanup. NOT COVERED: Moisture, mildew, or mold that could have been prevented, currency, precious metals, landscaping, living expenses while displaced (unlike homeowner's ALE coverage), vehicles.",
      typicalCosts: "NFIP policies average $700-$1,500/year but vary significantly by flood zone, elevation, and coverage amount. Maximum NFIP coverage: $250,000 for the building and $100,000 for contents. High-risk zones (A and V zones) pay significantly more. NFIP Risk Rating 2.0, implemented in 2021, bases premiums on individual property characteristics rather than just flood zone. Private flood insurance may offer higher limits and different pricing.",
      shoppingTips: "Even if not in a high-risk flood zone, consider flood insurance — about 25% of flood claims come from moderate and low-risk areas. There is a 30-day waiting period before NFIP coverage takes effect (cannot buy it when a storm is approaching). Compare NFIP and private flood insurance quotes. Check your property's flood zone at FEMA's Flood Map Service Center (msc.fema.gov). If you are in a high-risk zone, flood insurance is required by your lender."
    }
  },
  {
    gap: "Earthquakes", solution: "Requires a separate earthquake policy or endorsement. Essential in California, Pacific Northwest, and other seismic zones. Cost varies widely by location.", source: "USGS",
    gradient: "from-[#943030] to-[#5b3a8c]",
    modalContent: {
      explanation: "Earthquake damage is excluded from standard homeowner's insurance policies. Earthquake insurance covers structural damage, personal property damage, and additional living expenses resulting from an earthquake. In California, the California Earthquake Authority (CEA) is the largest provider. In other states, earthquake coverage is available as an endorsement to your homeowner's policy or as a standalone policy.",
      coveredVsNot: "COVERED: Structural damage from earthquake shaking, damage to personal property (if contents coverage is included), additional living expenses if your home is uninhabitable, fire resulting from earthquake (may be covered by homeowner's policy in some cases). NOT COVERED: Damage from floods caused by earthquake (tsunami, dam failure), land movement not caused by earthquake (landslide, sinkhole, mine subsidence), vehicle damage, external masonry veneer (some policies).",
      typicalCosts: "Earthquake insurance costs vary enormously by location. In California, CEA premiums range from $800 to $5,000+/year depending on location, construction type, age of home, and coverage selections. Deductibles are typically high — 5-25% of the dwelling coverage amount (meaning on a $500,000 home with a 15% deductible, you pay the first $75,000). Outside of California, earthquake endorsements may be more affordable.",
      shoppingTips: "If you are in a seismically active area (California, Pacific Northwest, Alaska, parts of the Midwest near the New Madrid fault zone), earthquake insurance is worth serious consideration. Understand the deductible structure — a high deductible means you absorb significant costs before coverage kicks in. Consider whether to include contents coverage and loss of use coverage (these are optional on many earthquake policies). In California, compare CEA policies through different participating insurers — the CEA coverage is the same, but base homeowner's premiums differ."
    }
  },
  {
    gap: "Routine maintenance", solution: "Wear and tear, aging systems, pest damage, and neglect are not covered. Budget 1-2% of home value per year for maintenance.", source: "Industry standard",
    gradient: "from-[#8b6914] to-[#1a5276]",
    modalContent: {
      explanation: "Homeowner's insurance covers sudden and accidental damage — not gradual deterioration. Routine maintenance, normal wear and tear, aging systems, pest damage, and damage resulting from neglect are all excluded. This is a fundamental principle of insurance: it covers unexpected events, not expected deterioration.",
      coveredVsNot: "NOT COVERED: Roof deterioration from age, plumbing corrosion over time, HVAC system failure from lack of maintenance, termite or pest damage, mold from chronic moisture issues, foundation settling, peeling paint, appliance breakdown from normal use. However: if a covered event CAUSES damage to an already aging system, the resulting damage may be covered. Example: a storm tears off an old roof — the storm damage is covered even if the roof was old.",
      typicalCosts: "Budget 1-2% of your home's value annually for maintenance and repairs. For a $350,000 home, that is $3,500-$7,000 per year. Major system replacements add up: roof ($8,000-$15,000 every 20-30 years), HVAC ($5,000-$10,000 every 15-20 years), water heater ($800-$1,500 every 10-15 years), appliances ($500-$2,000 each every 10-15 years).",
      shoppingTips: "A home warranty (different from homeowner's insurance) can help cover repair or replacement costs for major systems and appliances that break down from normal use. First-year home warranties typically cost $300-$600/year. They are not a substitute for a maintenance budget but can help with unexpected breakdowns. Regular maintenance (changing HVAC filters, cleaning gutters, inspecting the roof) extends the life of your systems and prevents costly failures."
    }
  },
  {
    gap: "Sewer/drain backup", solution: "Add a sewer backup endorsement to your policy ($50-100/yr). Covers damage from sewer line backups, sump pump failures, and drain overflows.", source: "III",
    gradient: "from-[#5b3a8c] to-[#943030]",
    modalContent: {
      explanation: "Standard homeowner's policies exclude damage caused by water that backs up through sewers, drains, or sump pumps. This is a separate peril from flooding (which involves surface water). Sewer backup can occur when municipal sewer lines are overwhelmed during heavy rain, tree roots infiltrate sewer lines, or sump pumps fail during storms. The damage can be extensive — raw sewage in your basement causes both structural damage and health hazards.",
      coveredVsNot: "COVERED WITH ENDORSEMENT: Damage from sewer line backup into your home, sump pump failure overflow, drain backup, cleanup costs for sewage contamination. NOT COVERED: Damage from surface water flooding (requires flood insurance), damage to the sewer line itself (may require a separate service line coverage), sewer backup caused by your own negligence (failure to maintain sewer lines).",
      typicalCosts: "A sewer backup endorsement typically costs $50-$100 per year for $5,000-$25,000 in coverage. Given that sewer backup cleanup and restoration can cost $10,000-$50,000+, this is one of the most valuable endorsements you can add. Some insurers offer it as a standard inclusion; others require you to request it specifically.",
      shoppingTips: "Add sewer backup coverage — it is inexpensive and the risk is real (especially if you have a basement or are in an area with aging sewer infrastructure). Ask about coverage limits and choose at least $10,000-$25,000. Consider also adding service line coverage ($50-$100/year), which covers repair or replacement of underground utility lines (sewer, water, electrical) on your property. Install a backflow prevention valve in your sewer line for additional protection."
    }
  },
  {
    gap: "Home business equipment", solution: "Standard policies have limited coverage for business property ($2,500 typical). If you work from home, add a home business endorsement or separate policy.", source: "III",
    gradient: "from-[#2d6b3f] to-[#8b6914]",
    modalContent: {
      explanation: "Standard homeowner's policies typically limit coverage for business property to $2,500 and exclude business liability entirely. If you work from home — whether full-time remote work, freelancing, or running a small business — your work equipment, inventory, and business liability may not be adequately covered.",
      coveredVsNot: "STANDARD POLICY LIMITS: Business personal property (computers, equipment, inventory) typically limited to $2,500. No business liability coverage. No coverage for lost business income. HOME BUSINESS ENDORSEMENT ADDS: Higher limits for business equipment ($5,000-$20,000+), business liability coverage, coverage for business property while in transit or at another location.",
      typicalCosts: "A home business endorsement typically costs $50-$200/year depending on the type of business and coverage limits. For more comprehensive protection, a standalone in-home business policy runs $200-$1,000+/year. If you have employees, clients visiting your home, or significant business inventory, a standalone business owner's policy (BOP) may be needed.",
      shoppingTips: "If you work from home in any capacity, evaluate whether the standard $2,500 business property limit is sufficient. Calculate the replacement cost of your work equipment: computer, monitors, printer, specialized equipment, inventory, etc. If you have clients or customers visiting your home, you definitely need business liability coverage. Discuss your specific work-from-home situation with your insurance agent to determine the right coverage level."
    }
  },
  {
    gap: "High-value items", solution: "Jewelry, art, collectibles often have sub-limits ($1,000-$2,500). Schedule valuable items individually for full coverage. Requires appraisals.", source: "III",
    gradient: "from-[#0a7ea8] to-[#5b3a8c]",
    modalContent: {
      explanation: "While personal property (Coverage C) covers your belongings, certain categories of high-value items have sub-limits — maximum payouts that are significantly lower than the item's actual value. Common sub-limits: jewelry ($1,000-$2,500), watches ($1,000-$2,500), furs ($2,500), silverware ($2,500), firearms ($2,500), cash ($200), stamps/trading cards ($1,000). To fully insure these items, you need to schedule (itemize) them on your policy with appraisals.",
      coveredVsNot: "WITH SCHEDULING: Full agreed-upon value coverage for each listed item, coverage for accidental loss (including mysterious disappearance — losing a ring, for example), worldwide coverage, no deductible on most scheduled items. WITHOUT SCHEDULING: Limited to sub-limit amounts, may require proof of theft or damage, mysterious disappearance may not be covered, deductible applies.",
      typicalCosts: "Scheduling individual items typically costs $1-$2 per $100 of value per year. A $5,000 engagement ring would cost approximately $50-$100/year to schedule. A $10,000 art piece might cost $100-$200/year. Items must be appraised by a qualified appraiser, and appraisals should be updated every 2-3 years to reflect current values.",
      shoppingTips: "Inventory all high-value items and compare their value to your policy's sub-limits. If any item exceeds the sub-limit, schedule it individually. Get professional appraisals (jeweler for jewelry, certified appraiser for art and antiques). Keep photos and documentation of all valuable items in a secure location outside your home (cloud storage, safe deposit box). Update your scheduled items list whenever you acquire or sell valuable items."
    }
  },
];

export default function HomeownersInsurancePage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

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
          <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Protect Your Home, Protect Your Investment</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Homeowner&apos;s insurance is different from title insurance — it protects against FUTURE damage (fire, storms, theft), while title insurance protects against PAST ownership issues. You need both. Your lender requires proof of homeowner&apos;s insurance before they&apos;ll fund your loan. <span className="text-alta-teal font-medium">Click any coverage card for detailed explanations.</span></p>
              </div>
            </div>
          </div>

          {/* ══ COMPREHENSIVE COMPARISON ══ */}
          <h2 className="text-xl font-bold text-alta-navy mb-2">Homeowner&apos;s Insurance vs Title Insurance — Complete Breakdown</h2>
          <p className="text-sm text-alta-gray mb-5 leading-relaxed">These are two completely different products that protect against completely different risks. One does not replace the other. A homebuyer needs both.</p>

          {/* Side-by-side cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border-2 border-[#1a5276]/30 overflow-hidden">
              <div className="bg-gradient-to-r from-[#1a5276] to-[#0a7ea8] px-5 py-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                <h3 className="font-bold text-white">Homeowner&apos;s Insurance</h3>
              </div>
              <div className="p-5 bg-white">
                <p className="text-sm text-alta-navy font-semibold mb-3">Protects against things that HAVEN&apos;T happened yet</p>
                <ul className="space-y-2 text-xs text-alta-gray">
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#1a5276] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>What it covers:</strong> Fire, windstorms, hail, theft, vandalism, liability for injuries on your property</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#1a5276] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>When you pay:</strong> Annual premium — every year, for as long as you own the home</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#1a5276] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>Typical cost:</strong> $1,200–$4,000+/year depending on location and risk</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#1a5276] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>Deductible:</strong> Yes — $1,000 to $2,500 typical. You pay that amount first.</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#1a5276] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>Who requires it:</strong> Your mortgage lender — no insurance, no loan funding</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#943030] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg><span><strong>Does NOT cover:</strong> Ownership disputes, liens, forgery, boundary issues, undisclosed heirs, recording errors</span></li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-[#2d6b3f]/30 overflow-hidden">
              <div className="bg-gradient-to-r from-[#2d6b3f] to-[#1a5276] px-5 py-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                <h3 className="font-bold text-white">Title Insurance</h3>
              </div>
              <div className="p-5 bg-white">
                <p className="text-sm text-alta-navy font-semibold mb-3">Protects against things that ALREADY happened — before you bought</p>
                <ul className="space-y-2 text-xs text-alta-gray">
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#2d6b3f] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>What it covers:</strong> Unpaid liens, forged deeds, undisclosed heirs, recording errors, fraud, boundary disputes, missing signatures</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#2d6b3f] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>When you pay:</strong> One-time premium at closing — never again. Coverage lasts as long as you (or your heirs) own the property.</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#2d6b3f] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>Typical cost:</strong> 0.5%–1% of purchase price, one time ($2,000–$4,000 on a $400K home)</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#2d6b3f] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>Deductible:</strong> None — full coverage from dollar one, including legal defense costs</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#2d6b3f] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg><span><strong>Two types:</strong> Lender&apos;s policy (required by mortgage company) + Owner&apos;s policy (protects YOU — strongly recommended)</span></li>
                  <li className="flex items-start gap-2"><svg className="w-4 h-4 text-[#943030] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg><span><strong>Does NOT cover:</strong> Fire, storms, theft, physical damage, liability for injuries — that&apos;s homeowner&apos;s insurance</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Head-to-head comparison table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-alta-navy text-white text-left font-semibold w-1/3">Question</th>
                  <th className="px-4 py-3 bg-[#1a5276] text-white text-left font-semibold w-1/3">Homeowner&apos;s Insurance</th>
                  <th className="px-4 py-3 bg-[#2d6b3f] text-white text-left font-semibold w-1/3">Title Insurance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">What triggers a claim?</td><td className="px-4 py-2.5 text-alta-gray">A future event — fire breaks out, tree falls on roof, pipe bursts, someone slips on your steps</td><td className="px-4 py-2.5 text-alta-gray">A past defect surfaces — someone claims they own your property, an old lien appears, a forged deed is discovered</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">How long does coverage last?</td><td className="px-4 py-2.5 text-alta-gray">One year at a time — you renew (and pay) annually</td><td className="px-4 py-2.5 text-alta-gray">Forever — as long as you or your heirs own the property. One payment, lifetime coverage.</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Is there a deductible?</td><td className="px-4 py-2.5 text-alta-gray">Yes — typically $1,000–$2,500. You pay that before insurance kicks in.</td><td className="px-4 py-2.5 text-alta-gray">No — coverage starts at dollar one, including legal defense.</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Does it cover legal fees?</td><td className="px-4 py-2.5 text-alta-gray">Only for liability claims (Coverage E) — someone suing you for injury.</td><td className="px-4 py-2.5 text-alta-gray">Yes — full legal defense if anyone challenges your ownership, even if the claim is baseless. Defense alone can cost $50,000+.</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">What if I skip it?</td><td className="px-4 py-2.5 text-alta-gray">Your lender won&apos;t fund the mortgage. No homeowner&apos;s insurance = no closing.</td><td className="px-4 py-2.5 text-alta-gray">Lender&apos;s policy is required. Owner&apos;s policy is optional but without it, YOU pay all legal costs if someone challenges your ownership.</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Can I shop around?</td><td className="px-4 py-2.5 text-alta-gray">Yes — compare 3–5 carriers. Premiums vary 50%+ for the same coverage.</td><td className="px-4 py-2.5 text-alta-gray">Yes — RESPA gives you the legal right to choose your own title company. Rates vary by state (some states set rates).</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Total lifetime cost on a $400K home?</td><td className="px-4 py-2.5 text-alta-gray">$63,000+ over 30 years ($2,100/yr average, and rates increase)</td><td className="px-4 py-2.5 text-alta-gray">$2,000–$4,000 total — one payment at closing, never again</td></tr>
              </tbody>
            </table>
          </div>

          {/* Real-world scenarios */}
          <h3 className="text-lg font-bold text-alta-navy mb-3">Real-World Scenarios: Which Policy Pays?</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { scenario: "A fire destroys your kitchen", answer: "Homeowner's", detail: "Dwelling coverage (A) pays to rebuild the kitchen structure. Personal property (C) covers damaged appliances, furniture, cookware. Loss of use (D) covers hotel and meals while repairs are done.", color: "border-l-[#1a5276]", bg: "bg-[#e8f0f5]" },
              { scenario: "A previous owner's unpaid contractor files a mechanic's lien on your home", answer: "Title Insurance", detail: "The owner's title policy covers the legal defense and pays to resolve the lien. Without title insurance, you'd pay the contractor's $35,000 claim yourself — even though you never hired them.", color: "border-l-[#2d6b3f]", bg: "bg-[#e9f5ed]" },
              { scenario: "A burglar breaks in and steals electronics and jewelry", answer: "Homeowner's", detail: "Personal property (C) covers stolen items up to policy limits. Sub-limits apply to jewelry ($1,000–$2,500) and cash ($200) unless you've scheduled them separately. Also covers damage to doors/windows from the break-in.", color: "border-l-[#1a5276]", bg: "bg-[#e8f0f5]" },
              { scenario: "A forged deed from 15 years ago means the previous seller didn't actually own the property", answer: "Title Insurance", detail: "Title insurance covers your full purchase price and all legal defense costs. Without it, you could lose the home entirely — and still owe the mortgage. This happens: ALTA reports title issues in 1 of 3 transactions.", color: "border-l-[#2d6b3f]", bg: "bg-[#e9f5ed]" },
              { scenario: "A tree falls on your roof during a storm", answer: "Homeowner's", detail: "Dwelling coverage (A) pays for roof repair. Other structures (B) covers a damaged fence or shed. Debris removal is typically included. You pay the deductible ($1,000–$2,500) and insurance covers the rest.", color: "border-l-[#1a5276]", bg: "bg-[#e8f0f5]" },
              { scenario: "An unknown heir of a deceased prior owner appears and claims they inherited the property", answer: "Title Insurance", detail: "The title insurer defends your ownership in court and covers all legal fees. Undisclosed heirs are one of the most common title claims — they can surface years or even decades after you buy the home.", color: "border-l-[#2d6b3f]", bg: "bg-[#e9f5ed]" },
              { scenario: "Your neighbor's kid trips on your walkway and breaks an arm", answer: "Homeowner's", detail: "Medical payments (F) covers the child's medical bills immediately, regardless of fault ($1,000–$5,000). If the family sues, liability coverage (E) pays legal defense and any damages ($100,000–$500,000+).", color: "border-l-[#1a5276]", bg: "bg-[#e8f0f5]" },
              { scenario: "A boundary survey reveals your neighbor's fence encroaches 3 feet onto your property — or vice versa", answer: "Title Insurance", detail: "The owner's title policy covers boundary disputes discovered after closing, including legal fees to resolve the encroachment. Without it, you'd pay $5,000–$20,000+ to litigate a boundary dispute.", color: "border-l-[#2d6b3f]", bg: "bg-[#e9f5ed]" },
            ].map((s) => (
              <div key={s.scenario} className={`p-4 ${s.bg} rounded-xl border border-gray-100 border-l-4 ${s.color}`}>
                <p className="text-xs font-bold text-alta-navy mb-1">{s.scenario}</p>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${s.answer === "Homeowner's" ? 'bg-[#1a5276] text-white' : 'bg-[#2d6b3f] text-white'}`}>{s.answer}</span>
                <p className="text-[11px] text-alta-gray leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>

          {/* What happens without */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-gradient-to-br from-[#f5e8e8] to-white rounded-2xl border border-[#e4c5c5]">
              <h3 className="text-sm font-bold text-[#943030] mb-2">Without Homeowner&apos;s Insurance</h3>
              <ul className="space-y-1.5 text-xs text-alta-gray">
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>Your lender will NOT fund the mortgage — closing cannot happen</li>
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>A single fire or storm could cost you $100,000+ out of pocket</li>
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>A guest injury on your property could result in a lawsuit with no defense</li>
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>You&apos;d have no help paying for temporary housing while your home is repaired</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-[#f5e8e8] to-white rounded-2xl border border-[#e4c5c5]">
              <h3 className="text-sm font-bold text-[#943030] mb-2">Without Owner&apos;s Title Insurance</h3>
              <ul className="space-y-1.5 text-xs text-alta-gray">
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>If someone challenges your ownership, YOU pay all legal defense costs ($50,000+)</li>
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>An old lien from a prior owner becomes YOUR debt to pay</li>
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>A forged deed in the chain of title could mean you lose the home — and still owe the mortgage</li>
                <li className="flex items-start gap-2"><span className="text-[#943030]">-</span>The lender&apos;s policy protects the BANK, not you — you need the owner&apos;s policy for your own protection</li>
              </ul>
            </div>
          </div>

          {/* Bottom line */}
          <div className="p-5 bg-gradient-to-r from-alta-navy to-alta-teal rounded-2xl mb-10">
            <h3 className="text-base font-bold text-white mb-2">Bottom Line: You Need Both</h3>
            <p className="text-sm text-gray-200 leading-relaxed mb-3">Homeowner&apos;s insurance protects the physical property. Title insurance protects your legal right to own it. A house can burn down AND have a title defect — they are completely independent risks. One doesn&apos;t substitute for the other any more than health insurance substitutes for car insurance.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                <p className="text-[11px] text-white"><strong>Homeowner&apos;s:</strong> Required by lender. Annual premium ($2,100 avg). Covers physical damage. Has deductible. Renew every year.</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                <p className="text-[11px] text-white"><strong>Title:</strong> Owner&apos;s policy strongly recommended. One-time premium ($2,000–$4,000). Covers ownership rights. No deductible. Lifetime protection.</p>
              </div>
            </div>
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          <ContextualSponsor context="insurance" />

          {/* What homeowner's insurance covers */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">What Homeowner&apos;s Insurance Covers</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">A standard homeowner&apos;s policy (HO-3) has six coverage areas. Understanding each helps you choose the right policy and avoid gaps. <span className="text-alta-teal font-medium">Click any coverage for full details.</span></p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {coverageTypes.map((c) => (
              <div
                key={c.title}
                onClick={() => setActiveModal({
                  title: c.title,
                  gradient: c.gradient,
                  content: (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">Detailed Explanation</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.explanation}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#2d6b3f] mb-2">What&apos;s Covered vs Not</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.coveredVsNot}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#8b6914] mb-2">Typical Costs</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.typicalCosts}</p>
                      </div>
                      <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">Shopping Tips</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.shoppingTips}</p>
                      </div>
                    </div>
                  )
                })}
                className={`p-4 ${c.color} rounded-xl border tile-interactive cursor-pointer group relative`}
              >
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3.5 h-3.5 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </div>
                <h3 className="text-sm font-bold text-alta-navy mb-1">{c.title}</h3>
                <p className="text-[11px] text-alta-gray leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* What it does NOT cover */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">What It Does NOT Cover</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed"><span className="text-alta-teal font-medium">Click any exclusion for details on how to close the coverage gap.</span></p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {exclusions.map((g) => (
              <div
                key={g.gap}
                onClick={() => setActiveModal({
                  title: g.gap,
                  gradient: g.gradient,
                  content: (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">Why This Is Excluded</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{g.modalContent.explanation}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#2d6b3f] mb-2">What&apos;s Covered vs Not</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{g.modalContent.coveredVsNot}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#8b6914] mb-2">Typical Costs to Close This Gap</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{g.modalContent.typicalCosts}</p>
                      </div>
                      <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">Shopping Tips</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{g.modalContent.shoppingTips}</p>
                      </div>
                      <p className="text-xs text-[#0a7ea8] font-medium">Source: {g.source}</p>
                    </div>
                  )
                })}
                className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] shadow-sm tile-interactive cursor-pointer group relative border-l-4 border-l-[#943030]"
              >
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3.5 h-3.5 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </div>
                <h3 className="text-sm font-bold text-[#943030] mb-1">{g.gap}</h3>
                <p className="text-sm text-alta-gray leading-relaxed mb-1">{g.solution}</p>
                <p className="text-[9px] text-alta-teal font-medium">Source: {g.source}</p>
              </div>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

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
                  <p className="text-sm text-alta-gray leading-relaxed mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* Cost breakdown */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">What Does Homeowner&apos;s Insurance Cost?</h2>
          <div className="p-5 bg-[#e8f0f5] rounded-2xl border border-[#c5d8e4] shadow-sm mb-10">
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
            <p className="text-sm text-alta-gray leading-relaxed">Factors affecting your premium: location (weather risk, crime rate), home age and construction type, coverage amount, deductible, claims history, credit score (in most states), and proximity to fire stations/hydrants. Rates vary dramatically by state — Florida and Louisiana are among the most expensive due to hurricane risk.</p>
          </div>

          {/* The Declarations Page */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Understanding Your Declarations Page</h2>
          <div className="p-5 bg-[#faf4e4] rounded-2xl border border-[#e8d9a8] shadow-sm mb-10">
            <p className="text-sm text-alta-gray leading-relaxed mb-4">The declarations page (or &quot;dec page&quot;) is the summary page of your insurance policy. Your lender will require a copy before closing. It is typically 1-2 pages and contains all the key details of your coverage:</p>
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

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

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
                  <p className="text-sm text-alta-gray leading-relaxed mt-0.5">{s.desc}</p>
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

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/protect-your-rights" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Title Insurance Guide</h3>
                <p className="text-xs text-alta-gray mt-1">How owner's title insurance protects your property rights</p>
              </Link>
              <Link href="/closing-process/closing-costs" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Calculator</h3>
                <p className="text-xs text-alta-gray mt-1">Estimate your total closing costs including insurance premiums</p>
              </Link>
              <Link href="/closing-process/closing-checklist" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Checklist</h3>
                <p className="text-xs text-alta-gray mt-1">Track every step from offer to keys with our interactive checklist</p>
              </Link>
            </div>
          </div>

          <MiniQuiz title="Test Your Knowledge: Homeowners Insurance" questions={insuranceQuiz} />

          <FirstTimeBuyerCTA />
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setActiveModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className={`bg-gradient-to-r ${activeModal.gradient} px-4 sm:px-6 py-4 sm:py-5`}>
              <h2 className="text-lg sm:text-xl font-bold text-white pr-10">{activeModal.title}</h2>
            </div>
            <div className="p-4 sm:p-6">
              {activeModal.content}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <SaveToFolderBtn type="note" title={activeModal.title} content={`Homeowners insurance: ${activeModal.title}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
