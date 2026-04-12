"use client";

import { useState } from "react";

interface TimelineItem {
  label: string;
  detail: string;
  action?: string;
  source?: string;
}

interface TimelinePhase {
  month: string;
  title: string;
  items: TimelineItem[];
  color: string;
  image: string;
}

const timeline: TimelinePhase[] = [
  {
    month: "6-12 Months Before",
    title: "Get Your Finances Ready",
    color: "blue",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
    items: [
      {
        label: "Check and improve your credit score (aim for 620+, ideally 740+)",
        detail: "Your credit score is the single biggest factor in the interest rate you'll receive. A 740+ score gets the best rates — even a 0.25% rate difference on a $350,000 loan adds up to over $16,000 in extra interest over 30 years. Start by pulling your free reports from all three bureaus (Equifax, Experian, TransUnion) at AnnualCreditReport.com — the only federally authorized source. Review for errors: incorrect late payments, accounts that aren't yours, and wrong balances. Dispute errors directly with the bureau — corrections typically take 30-45 days. To improve your score: pay all bills on time (35% of your score), reduce credit card balances below 30% of limits (ideally below 10%), avoid opening new accounts, and don't close old accounts (length of history matters).",
        action: "Pull your free reports at AnnualCreditReport.com and dispute any errors today.",
        source: "CFPB, myFICO.com",
      },
      {
        label: "Pay down existing debts to lower your DTI ratio",
        detail: "Your debt-to-income ratio (DTI) is the percentage of your gross monthly income that goes toward debt payments. Lenders use two DTI calculations: the front-end ratio (housing costs only — mortgage, taxes, insurance — should be under 28%) and the back-end ratio (all monthly debts including car payments, student loans, credit cards, and the new mortgage — should be under 43% for most loan programs, though FHA allows up to 50% with compensating factors). To calculate yours: add up all monthly debt payments, divide by gross monthly income, multiply by 100. For example: $2,500 in total monthly debts ÷ $7,000 gross income = 35.7% DTI. Focus on paying off high-interest debts first (credit cards), then installment debts (car loans). Even small reductions can push you into a better qualifying tier.",
        action: "Calculate your DTI and create a debt payoff plan targeting debts with the highest interest rates first.",
        source: "CFPB",
      },
      {
        label: "Start saving for down payment (3-20% of home price)",
        detail: "The down payment amount depends on your loan type: Conventional loans require as little as 3% (but 20% avoids PMI), FHA requires 3.5%, VA and USDA require 0%. On a $350,000 home, that ranges from $0 (VA/USDA) to $70,000 (20% conventional). But don't forget closing costs — budget an additional 2-5% of the home price ($7,000-$17,500 on a $350K home). Your down payment source matters: lenders will ask for 2-3 months of bank statements showing where the money came from. Large unexplained deposits will trigger questions and potentially delay your loan. Acceptable sources include savings, gifts from family (with a gift letter), down payment assistance programs, 401(k) loans, and IRA withdrawals (first-time buyers can withdraw up to $10,000 from a traditional IRA penalty-free under IRC Section 72(t)).",
        action: "Set up automatic transfers to a dedicated savings account. Even $500/month for 12 months gives you $6,000.",
        source: "CFPB, IRS Publication 590-B",
      },
      {
        label: "Research mortgage pre-approval requirements",
        detail: "Pre-approval requires submitting a formal application (Uniform Residential Loan Application, or \"Form 1003\") with documentation: 2 years of W-2s and tax returns, 2-3 months of bank statements, 30 days of pay stubs, photo ID, and Social Security number. The lender will pull your credit report (a hard inquiry, which may temporarily lower your score by 5-10 points). Pre-approval differs from pre-qualification: pre-qualification is an informal estimate based on what you tell the lender — it carries no weight with sellers. Pre-approval is a conditional commitment after the lender has verified your finances. It typically lasts 60-90 days and tells you the maximum loan amount you qualify for. Important: qualifying for a maximum amount doesn't mean you should borrow that much. Aim for a payment that leaves room in your budget for savings, maintenance, and unexpected expenses.",
        action: "Gather your W-2s, tax returns, pay stubs, and bank statements so you're ready when you apply.",
        source: "CFPB, Fannie Mae",
      },
      {
        label: "Set a realistic budget using our affordability calculator",
        detail: "A realistic housing budget goes beyond what the lender says you can afford. The lender's calculation is based on DTI ratios, but it doesn't account for your lifestyle, savings goals, or the full cost of homeownership. Beyond your mortgage payment (PITI — principal, interest, taxes, insurance), budget for: homeowner's insurance ($1,200-$3,000/year), HOA fees ($200-$500/month if applicable), maintenance and repairs (budget 1-2% of home value per year — that's $3,500-$7,000/year on a $350K home), utilities ($200-$400/month), lawn care or snow removal, and an emergency fund (3-6 months of expenses). A good rule of thumb: your total housing costs should be no more than 28% of your gross income, and your total debt payments should be under 36%. The 28/36 rule is more conservative than what lenders will approve, but it leaves you financially comfortable rather than 'house poor.'",
        action: "Use our affordability calculator to see what monthly payment fits your full budget — not just your maximum qualifying amount.",
        source: "CFPB, NAR",
      },
    ],
  },
  {
    month: "3-6 Months Before",
    title: "Build Your Team",
    color: "green",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80",
    items: [
      {
        label: "Get pre-approved for a mortgage (not just pre-qualified)",
        detail: "Apply with at least 2-3 lenders to compare offers. Under CFPB rules, each lender must provide a Loan Estimate within 3 business days of your application. Compare APRs (annual percentage rate — which includes fees in the true cost) rather than just interest rates. A lower rate with high fees may cost more overall. Multiple credit inquiries for the same type of loan within a 14-45 day window count as a single inquiry on your credit report, so shopping around won't hurt your score. Types of lenders to consider: big banks (large infrastructure, wide product range), credit unions (often lower rates, member-focused), mortgage brokers (shop multiple lenders for you), and online lenders (streamlined process, sometimes lower overhead costs). Your pre-approval letter tells sellers you're a serious, verified buyer — in competitive markets, offers without pre-approval are often rejected immediately.",
        action: "Apply with 3 different lender types (bank, credit union, online) and compare the Loan Estimates side-by-side.",
        source: "CFPB Know Before You Owe",
      },
      {
        label: "Choose a real estate agent you trust",
        detail: "A buyer's agent represents YOUR interests — they help you find properties, negotiate offers, navigate inspections, and guide you through closing. Interview at least 2-3 agents before choosing. Ask: How many buyers have you represented in the past year? What neighborhoods do you specialize in? How do you communicate (text, email, calls)? Can you provide references from recent clients? What's your experience with first-time buyers? Following the 2024 NAR settlement, commission structures have changed — buyers may negotiate their agent's compensation directly. Your agent should be willing to explain exactly how they're paid and what services you'll receive. Check their license status through your state's real estate commission website. A good agent is one of the most important partners in your homebuying journey — don't settle for someone who doesn't communicate well or understand your priorities.",
        action: "Interview at least 3 agents, check their online reviews, and ask each for 2-3 references from recent buyers.",
        source: "NAR, CFPB",
      },
      {
        label: "Research neighborhoods, schools, commute times",
        detail: "Visit neighborhoods at different times of day — a quiet street at 2 PM can be a traffic nightmare at 5 PM, and a family-friendly area during the day might have a noisy bar scene at night. Key factors to research: school ratings (GreatSchools.org — even if you don't have kids, school quality affects resale value significantly), crime statistics (your local police department's crime map or CrimeMapping.com), commute times (test the actual drive during rush hour, check public transit options), future development (check your city's planning department for upcoming commercial, residential, or infrastructure projects — a new highway interchange can boost value, while a landfill or industrial site can reduce it), flood zones (check FEMA's flood map at msc.fema.gov — flood insurance adds $700-$2,000+/year to your costs), and property tax rates (vary dramatically by county — our calculator uses county-level data to estimate your actual tax burden).",
        action: "Drive through your top 3 neighborhoods during morning rush, evening rush, and on a weekend to get the full picture.",
        source: "FEMA, GreatSchools.org, NAR",
      },
      {
        label: "Understand the difference between FHA, VA, conventional, and USDA loans",
        detail: "Conventional loans (backed by Fannie Mae/Freddie Mac): 3-20% down, 620+ credit, PMI required if under 20% down but can be removed once you reach 20% equity. Best for buyers with strong credit and savings. FHA loans (insured by HUD): 3.5% down with 580+ credit (10% down with 500-579), more flexible DTI limits (up to 50%), but MIP (mortgage insurance premium) is required for the life of the loan if you put less than 10% down — making refinancing to a conventional loan a common strategy once you build equity. VA loans (guaranteed by VA): 0% down, no monthly mortgage insurance, no minimum credit score (though most lenders want 620+), available to active-duty military, veterans, National Guard/Reserves, and eligible surviving spouses. VA funding fee (2.15% first use) can be financed or waived for disabled veterans. USDA loans (Rural Development): 0% down for eligible rural/suburban areas, 640+ credit, income limits apply (115% of area median income), lower guarantee fee than FHA MIP. Check eligibility maps — many suburban areas qualify.",
        action: "Use our mortgage calculator to compare monthly payments across all 4 loan types for your target home price.",
        source: "FHA.com, VA.gov, USDA.gov, Fannie Mae",
      },
      {
        label: "Start attending open houses to learn the market",
        detail: "Open houses are free education. Even before you're ready to buy, attending open houses helps you calibrate your expectations: you'll learn what homes actually look like at different price points, identify features that matter to you (and ones that don't), understand how quickly homes sell in your target areas, and develop a sense for what's overpriced versus a good value. Bring a notebook or use your phone to take notes — after 10+ houses, they start to blur together. Pay attention to: the condition of major systems (roof age, HVAC condition, water heater age), layout and flow, natural light, storage, the lot (drainage, grading, mature trees), and the neighborhood (noise, traffic, neighboring properties). Ask the listing agent: How long has it been on the market? Have there been any offers? Why is the seller moving? Are there any known issues? This information helps you gauge demand and negotiation leverage. Don't feel pressured to work with the listing agent — they represent the seller, not you.",
        action: "Visit at least 5-10 open houses over a month to develop your sense of local market pricing and quality.",
        source: "NAR Consumer Guide",
      },
    ],
  },
  {
    month: "1-3 Months Before",
    title: "Find & Secure Your Home",
    color: "amber",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
    items: [
      {
        label: "Submit offers on homes you love (be prepared to compete)",
        detail: "Your agent will prepare a purchase offer based on comparable sales (comps), market conditions, and the property's condition. In a seller's market (low inventory, high demand), you may need to offer at or above asking price, include an escalation clause (automatically raises your offer up to a maximum if there are competing bids), and minimize contingencies (though be very careful about waiving the inspection contingency). In a buyer's market, you have more negotiating power. Your offer typically includes: purchase price, proposed closing date (30-60 days is standard), earnest money amount, contingencies (financing, inspection, appraisal), any requests for seller concessions (asking the seller to cover some closing costs), and what personal property is included (appliances, window treatments, etc.). Be prepared for counteroffers — negotiation is normal and expected. Your agent will advise on strategy based on local conditions.",
        action: "Have your pre-approval letter, proof of funds for earnest money, and your agent's CMA (comparative market analysis) ready before making an offer.",
        source: "NAR",
      },
      {
        label: "Negotiate price, repairs, and closing date",
        detail: "Negotiation happens in two phases: the initial offer/counteroffer phase (price, closing date, contingencies) and the post-inspection negotiation (repairs, credits, price reductions based on inspection findings). Common negotiation points include: purchase price (based on comps and market conditions), closing date (sellers may prefer a fast close; you may need time for your loan), seller concessions (asking the seller to pay a portion of your closing costs — limited by loan type: conventional up to 3-6%, FHA up to 6%, VA up to 4%), repair requests (based on inspection findings — focus on safety issues and major defects, not cosmetic items), home warranty (ask the seller to purchase a 1-year home warranty covering major systems and appliances — typically $400-$600), and personal property inclusions. Your agent is your negotiation advocate — lean on their experience. Document everything in writing as amendments to the purchase agreement.",
        action: "Prioritize your negotiation asks: what's a deal-breaker versus nice-to-have? Share this with your agent before they respond to counteroffers.",
        source: "NAR, CFPB",
      },
      {
        label: "Sign the purchase agreement",
        detail: "The purchase agreement (also called a sales contract) is the legally binding master document governing your transaction. Before signing, review every section carefully — or have a real estate attorney review it ($300-$500, well worth it for first-time buyers). Key sections: legal property description (must match the recorded deed), purchase price and how it's structured, earnest money amount and where it's held (usually in the title company's escrow account), all contingency deadlines (inspection period, appraisal, financing — miss a deadline and you may lose your right to exercise that contingency), what's included in the sale (appliances, fixtures, window treatments), closing date and location, who pays which closing costs, and how disputes will be resolved. In some states, attorney review is mandatory (Illinois, New York, Massachusetts, and others). Even where it's not required, first-time buyers benefit enormously from an independent legal review.",
        action: "Read every clause. Ask your agent or attorney to explain anything you don't understand BEFORE signing.",
        source: "CFPB, American Bar Association",
      },
      {
        label: "Pay earnest money deposit (typically 1-3%)",
        detail: "Earnest money (also called a good-faith deposit) demonstrates to the seller that you're serious about the purchase. It's typically 1-3% of the purchase price ($3,500-$10,500 on a $350K home) and is deposited into an escrow account held by the title company or closing attorney — never directly to the seller. The deposit is credited toward your down payment and closing costs at closing. If the deal falls through for a reason covered by your contingencies (failed inspection, financing denial, low appraisal), you get your earnest money back. If you back out for a reason NOT covered by a contingency, you may forfeit the deposit to the seller. CRITICAL wire fraud warning: when wiring your earnest money, verify the account information by calling your title company directly using a phone number you already have — NEVER trust wiring instructions received via email. Wire fraud targeting earnest money deposits is increasingly common.",
        action: "Verify wire instructions by phone before sending your deposit. Keep your deposit receipt and escrow account information in a safe place.",
        source: "ALTA, CFPB",
      },
      {
        label: "Lock in your mortgage interest rate",
        detail: "A rate lock freezes your interest rate for a specified period (typically 30, 45, or 60 days) so it won't change before closing, even if market rates rise. If rates drop after you lock, most lenders won't automatically give you the lower rate (though some offer a 'float down' option for a fee). When to lock: if you believe rates will rise or stay flat, lock early. If you believe rates will drop, you might float — but this is a gamble. Lock periods: 30 days is standard and usually free; longer locks (45-60 days) may cost 0.125-0.25% more. Make sure your closing date falls within the lock period — if the lock expires before closing, you'll need to extend (which costs extra) or accept the current market rate. Your lock confirmation should be in writing — verify the rate, points, lock duration, and expiration date. If your lender doesn't provide written confirmation, ask for it immediately.",
        action: "Discuss lock timing with your lender. Get the rate lock confirmation in writing including the rate, points, and expiration date.",
        source: "CFPB",
      },
    ],
  },
  {
    month: "2-4 Weeks Before",
    title: "Due Diligence",
    color: "purple",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
    items: [
      {
        label: "Schedule home inspection ($300-$500)",
        detail: "The home inspection is your most important protection against hidden problems. A qualified inspector (look for ASHI or InterNACHI certification) examines the property's structure, roof, plumbing, electrical, HVAC, foundation, exterior, insulation, and ventilation over 2-4 hours. The resulting report (typically 30-60 pages) details every deficiency found, rated by severity. ATTEND the inspection in person — you'll learn far more walking through with the inspector than reading the report. Key things to watch for: foundation issues (cracks wider than 1/4 inch, bowing walls, uneven floors), roof condition and remaining life, electrical panel capacity and wiring type (aluminum wiring from the 1960s-70s is a concern), plumbing material (polybutylene pipes from the 1980s-90s are failure-prone), evidence of water intrusion, HVAC age and condition (units older than 15 years may need replacement soon — $5,000-$12,000). Consider specialty inspections based on the property: radon testing ($100-$200), sewer scope ($150-$300), termite/pest ($75-$150), and structural engineer assessment if the inspector flags concerns ($300-$800).",
        action: "Book your inspection immediately after the purchase agreement is signed — inspection periods are typically 7-10 days and cannot be extended.",
        source: "ASHI, InterNACHI",
      },
      {
        label: "Order home appraisal (lender arranges this)",
        detail: "The appraisal protects the lender (and you) by confirming the property is worth at least the purchase price. The lender orders the appraisal from a licensed, independent appraiser — you cannot choose the appraiser (this is regulated by the Home Valuation Code of Conduct). The appraiser visits the property, measures it, photographs it, evaluates its condition, and compares it to 3-6 recent comparable sales within a 1-mile radius. The appraisal costs $400-$600 and is paid by you (usually at ordering, though sometimes at closing). If the appraisal comes in AT or ABOVE the purchase price: proceed normally. If it comes in BELOW the purchase price (a 'low appraisal'), you have options: negotiate a lower purchase price with the seller, bring additional cash to cover the gap, request a reconsideration of value (provide additional comps the appraiser may have missed), or exercise your appraisal contingency and walk away with your earnest money. Low appraisals are more common in rapidly appreciating markets where prices outpace comparable sales data.",
        action: "Your lender handles ordering — but ask when it's scheduled and when to expect results. Budget $400-$600 for the fee.",
        source: "CFPB, Appraisal Institute",
      },
      {
        label: "Shop for homeowner's insurance",
        detail: "Your lender requires homeowner's insurance (also called hazard insurance) to protect the property — their collateral — against damage. But the policy also protects you: it covers your home's structure, personal belongings, liability if someone is injured on your property, and additional living expenses if your home becomes uninhabitable. You need proof of insurance before closing, and most lenders require the first year's premium paid upfront. Standard policies (HO-3) cover your home's structure against all perils except those specifically excluded (typically floods, earthquakes, sinkholes). Important exclusions to know: flood damage requires a separate FEMA flood insurance policy ($700-$2,000+/year — required if you're in a FEMA-designated flood zone), earthquake coverage is a separate policy or endorsement, and standard policies have dollar limits on jewelry, electronics, and collectibles (schedule valuable items separately). Get quotes from at least 3-4 carriers. Factors affecting your premium: home age, construction type, roof condition, proximity to fire stations, claims history, and your credit score (in most states).",
        action: "Get 3-4 quotes. Check FEMA flood maps for your property. Ask about bundling with auto insurance for a discount.",
        source: "I.I.I., FEMA, NAIC",
      },
      {
        label: "Shop for owner's title insurance (protects YOU)",
        detail: "Owner's title insurance is a one-time purchase at closing that protects your property rights for as long as you (or your heirs) own the home. It's different from the lender's title insurance (which only protects the bank's investment and is required by your mortgage company). The owner's policy covers: undiscovered liens from previous owners, forged documents in the chain of title, unknown heirs who claim ownership, errors in public records, boundary disputes, and illegal deeds. Title searches reveal issues in approximately one-third of residential transactions (ALTA). Without an owner's policy, you'd pay for your own legal defense if someone challenges your ownership — even if the claim is baseless. Legal defense alone can cost $50,000+. Under RESPA, you have the legal right to choose your own title company — your lender or agent may recommend one, but you are NOT obligated to use them. Shopping around can save hundreds. Ask about the simultaneous issue discount when purchasing both the lender's and owner's policies from the same company.",
        action: "Get quotes from 2-3 title companies. Ask each about the simultaneous issue discount and any available reissue rates.",
        source: "ALTA, CFPB, RESPA",
      },
      {
        label: "Review title commitment for any issues",
        detail: "The title commitment (also called a preliminary title report) is issued by your title company after they complete their title search of public records. It has two critical sections: Schedule A lists the proposed policy details (buyer, seller, purchase price, legal description of the property), and Schedule B lists exceptions — specific items the policy will NOT cover. Exceptions commonly include existing easements (utility companies' right to access their lines on your property), restrictive covenants (HOA rules, building restrictions), and mineral rights reservations. Review Schedule B carefully and ask your title company to explain every exception. Some exceptions are standard and unavoidable, but others may be removable with additional work (called 'curative work'). If the commitment reveals serious title defects — unresolved liens, boundary disputes, missing heirs — these must be resolved before closing. This is one of the most valuable services title professionals provide: identifying and resolving problems before you take ownership.",
        action: "Read every item in Schedule B. Ask your title company: 'Can any of these exceptions be removed before closing?'",
        source: "ALTA",
      },
      {
        label: "Set up utilities and mail forwarding",
        detail: "Contact utility providers 1-2 weeks before closing to schedule service transfers for your closing date: electricity, gas, water/sewer, trash collection, internet/cable. Some utilities require a deposit if you're a new customer. Ask the seller's agent which companies currently service the property. File a change of address with USPS (you can do this online at usps.com or at any post office) — it costs $1.10 online to verify identity. Set up mail forwarding at least 2 weeks before your move date. Beyond utilities, update your address with: employer, bank accounts, credit card companies, insurance providers, voter registration, DMV, subscriptions, and the IRS (file Form 8822). If you have children, initiate school enrollment and request records transfer from the current school. Cancel or transfer any services at your current address — give 30 days notice to your landlord if you're renting.",
        action: "Create a checklist of every account and service that needs your address updated. Start with USPS mail forwarding 2 weeks before closing.",
        source: "USPS, CFPB Moving Checklist",
      },
    ],
  },
  {
    month: "Final Week",
    title: "Prepare to Close",
    color: "red",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    items: [
      {
        label: "Receive and review Closing Disclosure (3 days before)",
        detail: "Federal law (TRID rule) requires your lender to provide the Closing Disclosure at least 3 business days before closing — this is your final, detailed breakdown of every cost. It replaced the old HUD-1 Settlement Statement in 2015. The Closing Disclosure mirrors the format of your Loan Estimate, making comparison easy. Review it page by page: Page 1 shows your loan terms, interest rate, monthly payment, and total cash needed at closing. Page 2 itemizes every closing cost — lender fees, third-party fees, taxes, prepaids, and escrow deposits. Page 3 shows comparisons, including the total you'll pay over 5 years and the APR. Certain changes to the Closing Disclosure require a new 3-day waiting period: if the APR increases by more than 0.125%, if the loan product changes (fixed to adjustable), or if a prepayment penalty is added. Other changes (seller credits, minor fee adjustments) do not reset the clock.",
        action: "Compare every line of the Closing Disclosure to your Loan Estimate. Flag any unexplained increases and ask your lender to explain.",
        source: "CFPB, TRID Rule (12 CFR 1026.19)",
      },
      {
        label: "Compare to your original Loan Estimate",
        detail: "The Closing Disclosure should closely match your Loan Estimate — but some fees may have changed. Fees fall into three tolerance categories: Zero tolerance (cannot increase at all): fees paid to the lender (origination charges), fees for services where the lender selected the provider, and transfer taxes. 10% tolerance (total of these fees can increase up to 10%): recording fees and fees for services you shopped for from the lender's list. Unlimited tolerance (can change freely): fees for services you chose your own provider for, prepaid interest, and escrow deposits. If fees exceed their tolerance thresholds, the lender must refund the excess at closing or within 60 days. Focus your comparison on Section A (origination charges — should be identical), Section B (services you couldn't shop for — zero tolerance), and Section C (services you could shop for — 10% tolerance if you used the lender's list). If your total closing costs increased significantly from the Loan Estimate, demand an explanation before signing.",
        action: "Place your Loan Estimate and Closing Disclosure side by side. Circle any number that changed and ask why.",
        source: "CFPB Closing Disclosure Explainer",
      },
      {
        label: "Verify wire transfer instructions BY PHONE (never email)",
        detail: "This single step prevents more wire fraud than any other measure. Real estate wire fraud cost Americans $275.1 million in 2025 (FBI IC3). Criminals hack into real estate email accounts or create look-alike domains, then send fake 'updated' wiring instructions near closing. The money is gone within hours. ALWAYS verify wiring instructions by calling your title company or closing attorney using a phone number you already have — from their website (type the URL yourself), your original closing documents, or their business card. NEVER use a phone number provided in an email. NEVER trust 'updated' or 'changed' wire instructions received via email, text, or voicemail. When you call, ask to speak to someone who can confirm: the bank name, routing number, account number, and account holder name. If anything doesn't match, STOP and investigate. After wiring, call your title company immediately to confirm receipt — recovery rates drop from 20% within the first hour to under 5% after 48 hours.",
        action: "Save your title company's verified phone number in your contacts TODAY. Call to verify before you wire, then call again to confirm receipt.",
        source: "FBI IC3 2024 Report, ALTA, CertifID",
      },
      {
        label: "Schedule and complete final walk-through",
        detail: "The final walk-through (typically 24-48 hours before closing) is your last chance to verify the property's condition before you take ownership. This is NOT another inspection — it's a verification that: agreed-upon repairs have been completed (bring your repair addendum and check each item), the property is in substantially the same condition as when you made your offer, all items included in the sale are present (appliances, fixtures, window treatments per the contract), the seller has moved out and removed all personal property and debris, and no new damage has occurred since the inspection. Turn on every faucet, flush every toilet, test every light switch, run the HVAC, check the garage door opener, and open/close all windows and doors. If you find issues, DO NOT proceed to closing without resolution — once you sign, the seller's leverage disappears. Your agent can negotiate last-minute credits or escrow holdbacks for unresolved items.",
        action: "Bring your purchase agreement, repair addendum, and inspection report to the walk-through. Test every system and compare against the contract.",
        source: "NAR, CFPB",
      },
      {
        label: "Gather ID, insurance proof, and certified funds",
        detail: "Closing day requires specific documentation. Bring: government-issued photo ID (driver's license or passport — the name must match your loan documents exactly; if your name has changed due to marriage, bring your marriage certificate), proof of homeowner's insurance (your declarations page showing the policy is active and the lender is listed as mortgagee), certified/cashier's check OR wire transfer confirmation for your closing funds (personal checks are not accepted for large amounts), your checkbook (for any small, last-minute adjustments), and your phone (your lender and agent's numbers should be saved in case any last-minute questions arise). If you're wiring funds, initiate the wire 1-2 days before closing to ensure it arrives on time — check your bank's wire transfer cutoff times (many stop processing at 3-4 PM). If you're bringing a cashier's check, get it from your bank the day before closing, made payable to the title company or closing attorney (your Closing Disclosure will specify the exact payee and amount).",
        action: "Prepare a closing-day folder with ID, insurance dec page, wire confirmation, checkbook, and all phone numbers.",
        source: "CFPB, ALTA",
      },
      {
        label: "Confirm closing date, time, and location",
        detail: "Confirm the logistics with your closing agent (title company or attorney) 2-3 days before closing: the exact date and time, the physical address (or whether you're doing a remote/hybrid closing — many states now allow electronic notarization), who needs to attend (you, your agent, the closing agent — the seller may close separately), how long to expect (plan for 1-2 hours for a typical closing, longer for complex transactions), and whether any last-minute conditions remain. If both spouses are on the loan, both must attend and sign. If one party absolutely cannot attend, a power of attorney may be arranged — but this must be approved by the lender in advance (many require specific POA language). Ask your closing agent if there are any outstanding items they need from you before closing day. The more questions that are resolved before you sit at the table, the smoother and faster the signing will go.",
        action: "Call your closing agent to confirm all details. Ask: 'Is there anything you still need from me before closing day?'",
        source: "ALTA, CFPB",
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; badge: string; accent: string; expandBg: string; expandBorder: string }> = {
  blue: { bg: "from-[#1a5276] to-[#154463]", badge: "bg-blue-100 text-blue-700", accent: "text-[#1a5276]", expandBg: "bg-blue-50/50", expandBorder: "border-blue-100" },
  green: { bg: "from-[#2d6b3f] to-[#235532]", badge: "bg-green-100 text-green-700", accent: "text-[#2d6b3f]", expandBg: "bg-green-50/50", expandBorder: "border-green-100" },
  amber: { bg: "from-[#8b6914] to-[#705410]", badge: "bg-amber-100 text-amber-700", accent: "text-[#8b6914]", expandBg: "bg-amber-50/50", expandBorder: "border-amber-100" },
  purple: { bg: "from-[#5b3a8c] to-[#482d70]", badge: "bg-purple-100 text-purple-700", accent: "text-[#5b3a8c]", expandBg: "bg-purple-50/50", expandBorder: "border-purple-100" },
  red: { bg: "from-[#943030] to-[#7a2020]", badge: "bg-red-100 text-red-700", accent: "text-[#943030]", expandBg: "bg-red-50/50", expandBorder: "border-red-100" },
};

export default function ExpandableTimeline() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (phaseIdx: number, itemIdx: number) => {
    const key = `${phaseIdx}-${itemIdx}`;
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {timeline.map((phase, pIdx) => {
        const c = colorMap[phase.color];
        return (
          <div key={pIdx} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Phase header with image */}
            <div className="relative h-32 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${phase.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${c.badge}`}>{phase.month}</span>
                  <h3 className="text-lg font-bold text-white mt-1 drop-shadow">{phase.title}</h3>
                </div>
                <span className="text-xs text-white/60">Step {pIdx + 1} of {timeline.length}</span>
              </div>
            </div>

            {/* Items */}
            <div className="p-4 sm:p-5 bg-white space-y-2">
              {phase.items.map((item, iIdx) => {
                const key = `${pIdx}-${iIdx}`;
                const isOpen = expanded[key] || false;
                return (
                  <div key={iIdx} className={`rounded-xl border transition-all ${isOpen ? `${c.expandBorder} ${c.expandBg}` : 'border-gray-100 hover:border-gray-200'}`}>
                    <button
                      onClick={() => toggle(pIdx, iIdx)}
                      className="w-full flex items-start gap-3 p-3 text-left group"
                    >
                      <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isOpen ? 'text-alta-green' : 'text-alta-green'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm flex-1 ${isOpen ? 'font-semibold text-alta-navy' : 'text-alta-gray group-hover:text-alta-navy'}`}>{item.label}</span>
                      <svg className={`w-4 h-4 shrink-0 mt-0.5 text-alta-gray transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-4 pt-0 ml-7 mr-3 space-y-3 animate-in">
                        <p className="text-sm text-alta-gray leading-relaxed">{item.detail}</p>
                        {item.action && (
                          <div className="p-3 bg-white rounded-lg border border-gray-100 flex items-start gap-2">
                            <svg className={`w-4 h-4 shrink-0 mt-0.5 ${c.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.69z" />
                            </svg>
                            <p className="text-xs font-medium text-alta-navy leading-relaxed"><strong>Action step:</strong> {item.action}</p>
                          </div>
                        )}
                        {item.source && (
                          <p className="text-[10px] text-alta-teal font-medium">Source: {item.source}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
