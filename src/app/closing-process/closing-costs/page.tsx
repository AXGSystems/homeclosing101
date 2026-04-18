"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import ClosingCostChart from "@/components/ClosingCostChart";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import ClosingFlowNav from "@/components/ClosingFlowNav";
import ContextualSponsor from "@/components/ContextualSponsor";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";

const costCategories = [
  {
    title: "Loan-Related Fees",
    items: [
      {
        name: "Loan Origination",
        description: "Lender's charge for processing your loan application, underwriting and funding.",
        typical: "0.5-1% of loan",
        detail: {
          covers: "The loan origination fee compensates your lender for evaluating your application, verifying your income and assets, pulling your credit, processing your paperwork, and ultimately funding the loan. It covers the administrative cost of creating your mortgage from start to finish.",
          whoSets: "Your lender sets this fee. It is disclosed on your Loan Estimate within 3 business days of application and cannot increase at closing under TRID rules (zero tolerance category).",
          negotiable: true,
          negotiateTips: "You can negotiate the origination fee directly with your lender. Get Loan Estimates from at least 3 lenders and use competing offers as leverage. Some lenders will reduce or waive origination fees to win your business, especially if you have strong credit.",
          stateNote: "This fee is consistent nationwide, though the amount varies by lender and loan program. FHA and VA loans may have different origination fee structures.",
          reduceOrAvoid: "Shop multiple lenders and compare Loan Estimates side by side. Some credit unions and online lenders charge lower origination fees. You can also ask for a lender credit (accepting a slightly higher interest rate in exchange for reduced upfront fees).",
        },
      },
      {
        name: "Discount Points",
        description: "Percentage of loan amount paid upfront to reduce your interest rate.",
        typical: "0-2% of loan",
        detail: {
          covers: "Each discount point equals 1% of your loan amount and typically reduces your interest rate by about 0.25%. This is a form of prepaid interest — you pay more upfront to get a lower monthly payment for the life of the loan.",
          whoSets: "Your lender sets the rate reduction per point. The amount you choose to pay is up to you — points are always optional.",
          negotiable: true,
          negotiateTips: "Points are inherently a choice, not a mandatory fee. Calculate your break-even point: divide the cost of points by your monthly savings. If you plan to stay in the home longer than the break-even period, points may save you money.",
          stateNote: "Discount points work the same in all states. They are tax-deductible in the year of purchase for your primary residence (consult a tax advisor for your specific situation).",
          reduceOrAvoid: "You can simply choose not to buy points. If your lender is quoting a rate that includes points, ask for the rate with zero points. Only buy points if you plan to keep the loan long enough to recoup the upfront cost.",
        },
      },
      {
        name: "Underwriting Fee",
        description: "Fee covering the research and approval of your loan.",
        typical: "$400-$900",
        detail: {
          covers: "The underwriting fee covers the cost of the underwriter reviewing your entire loan file — income verification, employment history, credit analysis, debt-to-income ratios, and ensuring the loan meets guidelines for the loan program you selected (conventional, FHA, VA, etc.).",
          whoSets: "Your lender sets this fee. It falls under TRID's zero tolerance category, meaning it cannot increase from your Loan Estimate to your Closing Disclosure.",
          negotiable: true,
          negotiateTips: "Some lenders bundle underwriting into their origination fee. Ask whether this is a separate charge or included. If it is separate, you can ask for it to be reduced or waived, especially if you have excellent credit and a straightforward file.",
          stateNote: "This fee is standard nationwide. The amount varies by lender but not by state.",
          reduceOrAvoid: "Compare Loan Estimates from multiple lenders. Some lenders don't charge a separate underwriting fee. If you have strong credit and a simple financial profile, you have more leverage to negotiate this down.",
        },
      },
      {
        name: "Prepaid Interest",
        description: "Interest from closing day through end of month.",
        typical: "Varies",
        detail: {
          covers: "Prepaid interest covers the daily interest on your mortgage from your closing date through the end of that month. Your first regular mortgage payment typically isn't due until the first of the month after next — this prepaid amount bridges the gap.",
          whoSets: "The amount is determined by your loan amount, interest rate, and the day of the month you close. It's a mathematical calculation, not a fee set by any single party.",
          negotiable: false,
          negotiateTips: "While you can't negotiate the daily rate (it's your mortgage rate), you can control the total amount by choosing your closing date strategically.",
          stateNote: "Prepaid interest works the same way in all states. It is an unavoidable cost of any mortgage loan.",
          reduceOrAvoid: "Close near the end of the month. If you close on the 28th, you only pay 2-3 days of prepaid interest instead of potentially 28-30 days if you close at the beginning of the month. This can save hundreds of dollars.",
        },
      },
    ],
  },
  {
    title: "Property Evaluation",
    items: [
      {
        name: "Appraisal",
        description: "Professional assessment of the property's market value.",
        typical: "$300-$600",
        detail: {
          covers: "A licensed appraiser visits the property, measures the livable area, evaluates its condition, and compares it to recent sales of similar homes in the area (comparables). The appraiser produces a written report estimating the property's fair market value. The lender uses this to ensure they're not lending more than the property is worth.",
          whoSets: "Your lender orders the appraisal through an Appraisal Management Company (AMC), as required by federal regulation (Dodd-Frank). The appraiser's fee is set by the AMC or appraiser.",
          negotiable: false,
          negotiateTips: "The appraisal fee itself is generally not negotiable since it's set by the independent appraiser or AMC. However, you can ask your lender which AMC they use and whether fees vary. If the appraisal comes in low, you can request a reconsideration of value with additional comparable sales data.",
          stateNote: "Appraisal fees are generally higher in rural areas where comparables are scarce and in high-cost markets. Some states have specific appraisal licensing requirements that may affect availability and cost.",
          reduceOrAvoid: "FHA Streamline Refinances and VA Interest Rate Reduction Refinances (IRRRLs) may not require a new appraisal. Some conventional loans offer appraisal waivers based on automated valuation models. Your lender will tell you if you qualify.",
        },
      },
      {
        name: "Home Inspection",
        description: "Thorough examination of the property's condition and needed repairs.",
        typical: "$300-$500",
        detail: {
          covers: "A licensed home inspector examines the property's structure, roof, foundation, plumbing, electrical, HVAC, insulation, windows, doors, and visible defects. You receive a detailed report with photos documenting the condition of every major system. This is your chance to identify problems before you buy.",
          whoSets: "You choose and hire the home inspector. The inspector sets their own fee based on the size and age of the property.",
          negotiable: true,
          negotiateTips: "You can shop for inspectors and compare prices, but don't choose solely on cost. Experience and thoroughness matter more. Ask for references and sample reports. Some inspectors offer package deals if you bundle a general inspection with pest, radon, or sewer scope inspections.",
          stateNote: "Home inspector licensing and requirements vary by state. Some states require specific certifications, while others have minimal regulation. Check your state's requirements and verify your inspector's credentials.",
          reduceOrAvoid: "A home inspection is technically optional (it's not required by most lenders), but skipping it is risky. It's one of the most important investments in the homebuying process. If you're buying new construction, an inspection is still recommended — new homes can have defects too.",
        },
      },
      {
        name: "Pest Inspection",
        description: "Testing for termite or pest infestation.",
        typical: "$75-$150",
        detail: {
          covers: "A licensed pest inspector examines the property for evidence of wood-destroying organisms — termites, carpenter ants, wood-boring beetles, and fungal decay. The inspector checks the foundation, crawl spaces, attic, and exterior for signs of current or past infestation and structural damage.",
          whoSets: "The pest inspection company sets the fee. You typically choose the company, though VA loans require the seller to pay for the pest inspection in some states.",
          negotiable: true,
          negotiateTips: "Many home inspectors offer pest inspections as an add-on at a discounted rate. Ask your home inspector if they're licensed for pest inspections or if they have a preferred partner. You can also negotiate for the seller to pay this cost.",
          stateNote: "Some states (particularly in the Southeast and Southwest where termites are prevalent) require pest inspections for certain loan types. VA loans require a termite inspection in most states. FHA requirements vary by region.",
          reduceOrAvoid: "Bundle the pest inspection with your general home inspection for a discount. In some transactions, particularly VA loans, the seller is required to pay for this inspection. You can also negotiate in your purchase agreement for the seller to cover this cost.",
        },
      },
      {
        name: "Survey",
        description: "Verification of property boundaries and lot dimensions.",
        typical: "$300-$700",
        detail: {
          covers: "A licensed land surveyor maps the exact boundaries of the property, identifies the location of structures, fences, driveways, and easements, and verifies that improvements are within property lines. The survey confirms you're buying what you think you're buying and identifies any encroachments.",
          whoSets: "The surveyor sets the fee based on lot size, terrain complexity, and whether an existing survey can be updated or a new one is needed. Your lender or title company may require a specific type of survey.",
          negotiable: true,
          negotiateTips: "Ask the seller if they have an existing survey that can be updated (recertified) rather than commissioning a brand new one — this is significantly cheaper. Get quotes from 2-3 surveyors. Some title companies have preferred surveyors who offer discounted rates.",
          stateNote: "Survey requirements vary significantly by state. Some states (like Texas) require surveys for most transactions, while others rarely require them. In states that use title insurance, the title company may accept an existing survey or an affidavit instead.",
          reduceOrAvoid: "Ask the seller for their existing survey. If the title company accepts it, you may only need a recertification (typically $100-$200 instead of $300-$700). Some lenders waive the survey requirement for condominiums or properties in subdivisions with recorded plats.",
        },
      },
    ],
  },
  {
    title: "Title & Insurance",
    items: [
      {
        name: "Title Search",
        description: "Review of public records to verify clear ownership.",
        typical: "$200-$400",
        detail: {
          covers: "A title professional examines public records — deeds, mortgages, court records, property tax records, and other documents — going back decades to trace the chain of ownership and identify any liens, judgments, easements, or encumbrances on the property. This search confirms the seller has the legal right to sell and that the title can be transferred to you free and clear.",
          whoSets: "Your title company or settlement agent sets this fee. Under RESPA, you have the right to shop for your own title company.",
          negotiable: true,
          negotiateTips: "Get quotes from 2-3 title companies. The title search fee can vary significantly between providers. Some title companies bundle the search fee into their overall settlement fee. Ask for an itemized breakdown so you can compare accurately.",
          stateNote: "Title search practices vary by state. In some states, attorneys conduct title searches; in others, title companies handle them. The depth and cost of the search may vary based on local recording practices and the availability of digital records.",
          reduceOrAvoid: "Shop for your title company — RESPA gives you this right. If you're refinancing, ask about a reissue rate or short-term rate discount since the title was recently searched. Some title companies offer discounts for repeat customers.",
        },
      },
      {
        name: "Lender's Title Insurance",
        description: "Protects the lender's investment against title defects.",
        typical: "$500-$1,500",
        detail: {
          covers: "Lender's title insurance protects your mortgage lender against losses if a title defect is discovered after closing — such as an unknown lien, a forged deed in the chain of title, or a missing heir with a claim to the property. It covers the lender up to the loan amount and decreases as you pay down the mortgage.",
          whoSets: "Title insurance rates are set by title underwriters and, in many states, regulated by the state's department of insurance. The rate is typically based on the loan amount.",
          negotiable: true,
          negotiateTips: "Under RESPA, you can shop for your title insurance provider. Get quotes from multiple title companies. If you're buying lender's and owner's policies from the same company, ask for a simultaneous issue discount — this can save 20-40% on the second policy.",
          stateNote: "Title insurance rates vary significantly by state. Some states (like Texas, Florida, and New Mexico) have state-regulated, filed rates that are the same regardless of which company you use. Other states allow rate competition. In Iowa, title insurance is issued through a state-run program.",
          reduceOrAvoid: "Shop for your title company and ask about simultaneous issue discounts when purchasing both lender's and owner's policies. If you're refinancing with the same lender, ask about a refinance rate or short-term rate. Some states offer reduced rates for new construction.",
        },
      },
      {
        name: "Owner's Title Insurance",
        description: "One-time fee protecting your investment for the life of ownership.",
        typical: "0.5-1% of price",
        detail: {
          covers: "Owner's title insurance protects YOU — the homeowner — against financial loss from title defects discovered after closing. This includes undisclosed liens, errors in public records, forgery, fraud, unknown heirs, boundary disputes, and other covered risks. Unlike lender's title insurance, your owner's policy protects you for as long as you or your heirs own the property, and it covers the full purchase price.",
          whoSets: "Title insurance rates are set by title underwriters and may be regulated by state insurance departments. The rate is based on the purchase price of the property.",
          negotiable: true,
          negotiateTips: "Shop for your title company. Ask about simultaneous issue discounts when purchasing both owner's and lender's policies together. In some states, the seller traditionally pays for the owner's policy — check local customs and your purchase agreement.",
          stateNote: "Who pays for owner's title insurance varies by state and local custom. In some states (parts of New York, for example), the seller customarily pays. In others, the buyer pays. Some states have regulated rates; others allow competition. This is always negotiable in the purchase agreement.",
          reduceOrAvoid: "Ask about simultaneous issue discounts. Check whether your state's customs call for the seller to pay. If you're in a state with regulated rates, the price will be the same regardless of provider — but service quality may differ. Owner's title insurance is optional but strongly recommended as a one-time cost that protects your largest investment for life.",
        },
      },
      {
        name: "Homeowner's Insurance",
        description: "First year premium for fire, wind, and hazard coverage.",
        typical: "$800-$2,000/yr",
        detail: {
          covers: "Homeowner's insurance (also called hazard insurance) covers damage to your home from fire, wind, hail, lightning, theft, vandalism, and other covered perils. It also includes liability coverage if someone is injured on your property. Your lender requires it to protect their collateral. Note: standard policies do NOT cover flood or earthquake damage — those require separate policies.",
          whoSets: "Insurance companies set rates based on the property's location, construction type, age, coverage amount, your deductible, and your claims history. Rates are regulated by state insurance departments.",
          negotiable: true,
          negotiateTips: "Get quotes from at least 3-5 insurance companies. Ask about bundling discounts (combining auto and home insurance). Increasing your deductible from $1,000 to $2,500 can significantly reduce your premium. Ask about discounts for security systems, new roofs, and claims-free history.",
          stateNote: "Homeowner's insurance rates vary dramatically by state. Coastal states and areas prone to hurricanes, tornadoes, or wildfires typically have higher rates. Some states have state-run insurers of last resort for high-risk areas.",
          reduceOrAvoid: "Shop aggressively — rates can vary by hundreds of dollars for the same coverage. Increase your deductible to lower premiums. Bundle with auto insurance. Ask about all available discounts. Consider the replacement cost of the structure (not the land) when setting coverage limits.",
        },
      },
      {
        name: "Flood Determination",
        description: "Assessment of whether property is in a flood zone.",
        typical: "$15-$25",
        detail: {
          covers: "A flood determination certifies whether your property is located in a Special Flood Hazard Area (SFHA) as designated by FEMA flood maps. If the property is in a flood zone, your lender will require you to purchase flood insurance. This is a one-time determination at closing.",
          whoSets: "Flood determination companies set this fee. Your lender typically orders it as part of the loan process. The fee is regulated by the National Flood Insurance Program (NFIP) and is generally standardized.",
          negotiable: false,
          negotiateTips: "This is a small, standardized fee that is not negotiable. However, if the determination places your property in a flood zone and you believe it's incorrect, you can request a Letter of Map Amendment (LOMA) from FEMA to have the designation changed.",
          stateNote: "Flood zone designations are federal (FEMA) and apply nationwide. However, flood insurance costs vary dramatically based on your specific zone designation, property elevation, and whether your community participates in the NFIP's Community Rating System.",
          reduceOrAvoid: "This fee is minimal and unavoidable. If your property is determined to be in a flood zone, the bigger cost is the required flood insurance. You can sometimes reduce flood insurance costs by obtaining an elevation certificate showing your property is above the base flood elevation.",
        },
      },
    ],
  },
  {
    title: "Administrative & Legal",
    items: [
      {
        name: "Settlement/Escrow Fee",
        description: "Fee paid to the settlement agent for handling the transaction.",
        typical: "$500-$2,000",
        detail: {
          covers: "The settlement or escrow fee compensates the title company, escrow company, or attorney who conducts your closing. This covers coordinating with all parties, preparing the settlement statement, managing the escrow account, disbursing funds to the seller and service providers, and ensuring the deed and mortgage are recorded with the county.",
          whoSets: "Your settlement agent (title company, escrow company, or attorney) sets this fee. Under RESPA, you have the right to choose your own settlement provider.",
          negotiable: true,
          negotiateTips: "Shop for your settlement provider. Get quotes from 2-3 companies. Some title companies offer package pricing that bundles the settlement fee with title search and insurance. Ask if they offer discounts for first-time buyers or for referrals from your real estate agent.",
          stateNote: "Settlement practices vary significantly by state. In some states, attorneys must conduct closings. In others, title companies or escrow companies handle everything. Attorney states tend to have higher settlement costs. Western states often use escrow companies; eastern states more commonly use title companies or attorneys.",
          reduceOrAvoid: "Shop for your settlement provider and compare bundled pricing. Ask your real estate agent which companies offer competitive rates. In some transactions, the seller and buyer split the settlement fee. Check your purchase agreement to see who is responsible.",
        },
      },
      {
        name: "Document Preparation",
        description: "Preparation of final legal papers.",
        typical: "$50-$400",
        detail: {
          covers: "This fee covers the preparation of legal documents needed for closing, including the deed, deed of trust/mortgage, affidavits, and other closing paperwork. In attorney states, this may be included in the attorney fee. In other states, the title company or a document preparation service handles this.",
          whoSets: "Your settlement agent, title company, or attorney sets this fee. It may be itemized separately or bundled into the overall settlement fee.",
          negotiable: true,
          negotiateTips: "Ask your settlement provider whether this is included in their settlement fee or is a separate charge. If separate, ask if it can be reduced or bundled. Compare how different providers itemize their fees — some may charge less for document preparation but more for settlement.",
          stateNote: "In attorney states (like New York, Massachusetts, and Connecticut), document preparation is typically included in the attorney fee. In non-attorney states, the title company or a separate doc prep service handles this. Fees tend to be lower in states with standardized document templates.",
          reduceOrAvoid: "Ask if this fee is already included in your settlement or attorney fee to avoid being double-charged. Compare total costs across providers rather than individual line items, since different companies may bundle fees differently.",
        },
      },
      {
        name: "Notary Fees",
        description: "Signature verification services.",
        typical: "$50-$200",
        detail: {
          covers: "A notary public verifies the identity of signers, witnesses the signing of legal documents, and applies their notarial seal to certify that signatures are genuine and voluntary. Key closing documents like the deed and deed of trust require notarization.",
          whoSets: "Notary fees are often set by state law (many states have statutory maximum fees per notarization). If you use a mobile notary who comes to your location, there is typically an additional travel fee set by the notary.",
          negotiable: false,
          negotiateTips: "If you close at the settlement office, notary services are often included in the settlement fee. If you need a mobile notary, the travel fee may be negotiable. Ask your settlement provider whether notary services are included in your closing or charged separately.",
          stateNote: "Notary fees are regulated by state law, with maximum per-signature fees varying widely. Some states cap fees as low as $2 per signature; others allow $10 or more. Mobile notary travel fees are generally not regulated and can add $100-$300.",
          reduceOrAvoid: "Close at the settlement office where notary services are often included. If you need a mobile notary, compare prices and ask if they charge per signature or a flat fee. For a mail-away closing, the mobile notary fee is unavoidable but can be compared across providers.",
        },
      },
      {
        name: "Attorney Fees",
        description: "Legal representation (required in some states).",
        typical: "$500-$1,500",
        detail: {
          covers: "In attorney states, a real estate attorney reviews or prepares closing documents, conducts the title search, examines the title, provides a legal opinion on the title, and oversees the closing. In non-attorney states, you may still choose to hire an attorney for independent legal review of your transaction.",
          whoSets: "The attorney sets their own fee. In attorney states, this is a standard cost of closing. In non-attorney states, hiring an attorney is optional and the fee is set by the attorney you choose.",
          negotiable: true,
          negotiateTips: "Ask for a flat fee quote rather than hourly billing. Compare fees from multiple attorneys. Some attorneys include the title search and document preparation in their fee; others charge separately. Get a written fee agreement before engaging an attorney.",
          stateNote: "Approximately 20 states require or strongly encourage attorney involvement in real estate closings. These include Connecticut, Delaware, Georgia, Massachusetts, New York, North Carolina, South Carolina, and West Virginia, among others. Requirements vary — some states require attorney supervision while others require attorney presence at closing.",
          reduceOrAvoid: "In non-attorney states, this fee can be avoided entirely if you don't hire an attorney. In attorney states, it's required but can be minimized by comparing attorneys and negotiating flat-fee arrangements. Some attorneys offer reduced rates for simple, straightforward closings.",
        },
      },
      {
        name: "Recording Fees",
        description: "County fee for officially recording the deed and mortgage.",
        typical: "$50-$250",
        detail: {
          covers: "Recording fees are paid to your county recorder's office to officially enter the deed and mortgage/deed of trust into the public record. This is what makes your ownership and the lender's lien a matter of public record, protecting both your ownership rights and the lender's security interest.",
          whoSets: "Your county government sets recording fees. These are government charges, not fees set by your lender or settlement agent.",
          negotiable: false,
          negotiateTips: "Recording fees are set by the county and cannot be negotiated. Under TRID rules, recording fees fall into the 10% tolerance category — they can increase up to 10% from your Loan Estimate to your Closing Disclosure, but no more.",
          stateNote: "Recording fees vary by county. Some counties charge per page, others charge a flat fee per document. Electronic recording (e-recording) is available in many counties and may have different fee schedules. Some counties have additional surcharges for affordable housing or technology funds.",
          reduceOrAvoid: "Recording fees cannot be avoided — recording is essential to protect your ownership. The fees are set by the county and are the same regardless of which settlement provider you use. There is nothing to negotiate here.",
        },
      },
    ],
  },
  {
    title: "Taxes & Other",
    items: [
      {
        name: "Transfer Tax",
        description: "State or local tax on the transfer of property ownership.",
        typical: "Varies by state",
        detail: {
          covers: "Transfer taxes (also called documentary stamps, excise taxes, or deed taxes) are taxes imposed by the state, county, or city on the transfer of real property. They are calculated as a percentage of the sale price or a flat amount per dollar of consideration. These taxes fund state and local government operations.",
          whoSets: "Your state and/or local government sets transfer tax rates by statute. These are government-imposed taxes, not fees set by any private party.",
          negotiable: false,
          negotiateTips: "The tax rate itself is not negotiable — it's set by law. However, which party pays the transfer tax is negotiable in your purchase agreement. In most transactions, local custom determines who pays, but this can always be negotiated between buyer and seller.",
          stateNote: "Transfer tax rates vary enormously by state. Some states (like Alaska, Idaho, Indiana, Mississippi, Missouri, Montana, New Mexico, North Dakota, Oregon, Texas, Utah, and Wyoming) have no state transfer tax. Others can be significant — Washington, D.C. charges up to 1.45% and some New York City transactions face combined state/city rates exceeding 2%.",
          reduceOrAvoid: "Transfer taxes cannot be reduced, but you can negotiate for the seller to pay them. In some states, first-time homebuyers or transactions below certain price thresholds may qualify for reduced rates or exemptions. Check with your settlement agent about any applicable exemptions.",
        },
      },
      {
        name: "Property Taxes (Prepaid)",
        description: "Typically 2-6 months of property taxes paid in advance.",
        typical: "Varies",
        detail: {
          covers: "At closing, you prepay several months of property taxes into your escrow account. This creates a cushion so that when your next property tax bill comes due, there's enough money in escrow to pay it. The exact number of months prepaid depends on when your taxes are due and when you close.",
          whoSets: "Your local taxing authority sets the property tax rate. The number of months you must prepay is determined by your lender's escrow requirements, which are regulated by RESPA. RESPA limits the escrow cushion to two months of payments.",
          negotiable: false,
          negotiateTips: "The tax rate isn't negotiable, but you may be able to adjust the prepaid amount by timing your closing relative to the property tax due dates. Your settlement agent can explain how your closing date affects the prepaid amount.",
          stateNote: "Property tax rates vary dramatically by location — from under 0.5% in some areas to over 2% of assessed value in others. The timing and frequency of tax bills also varies by jurisdiction, which affects how many months of taxes you prepay at closing.",
          reduceOrAvoid: "You can't avoid prepaid taxes if you have an escrow account. If your down payment is 20% or more, some lenders allow you to waive escrow (pay taxes and insurance on your own), which eliminates the prepaid escrow requirement — but you'll still owe the taxes when they come due.",
        },
      },
      {
        name: "Home Warranty",
        description: "Optional coverage for major home systems and appliances.",
        typical: "$300-$600",
        detail: {
          covers: "A home warranty is a service contract that covers the repair or replacement of major home systems (HVAC, plumbing, electrical) and appliances (refrigerator, dishwasher, washer/dryer) that fail due to normal wear and tear. It is NOT the same as homeowner's insurance, which covers damage from events like fire and storms.",
          whoSets: "Home warranty companies set their own rates based on the coverage level you choose. Plans range from basic (major systems only) to comprehensive (systems + appliances + optional add-ons like pool or septic coverage).",
          negotiable: true,
          negotiateTips: "You can negotiate for the seller to pay for a home warranty as part of your purchase agreement — this is very common. If you're buying the warranty yourself, compare plans from multiple providers and pay attention to service call fees, coverage limits, and exclusions.",
          stateNote: "Home warranty availability and regulation varies by state. Most states regulate home warranty companies as service contract providers. Coverage terms, exclusions, and consumer protections vary by state law.",
          reduceOrAvoid: "A home warranty is entirely optional. Many sellers offer one as a selling incentive — negotiate for the seller to pay. If you're buying newer construction or a home with recently updated systems, the value of a warranty may be lower. Read the exclusions carefully before purchasing — many homeowners are disappointed when claims are denied.",
        },
      },
    ],
  },
];

const reductionStrategies = [
  {
    title: "Shop for title insurance",
    tip: "Under RESPA, you can choose your own title company. Get quotes from 2-3 providers. Ask about simultaneous issue discounts.",
    savings: "Save $500-$1,500",
    detail: {
      strategy: "Title insurance is one of the largest closing costs and one of the most shoppable. Under the Real Estate Settlement Procedures Act (RESPA), you have the legal right to choose your own title insurance provider — your lender or real estate agent cannot require you to use a specific company.",
      steps: [
        "Ask your lender for a list of title companies they work with, but also research independent options",
        "Get written quotes from at least 2-3 title companies, including the title search fee, settlement fee, and insurance premiums",
        "Ask each company about simultaneous issue discounts — buying both lender's and owner's policies from the same company typically saves 20-40% on the second policy",
        "Compare the TOTAL cost of title services, not just the insurance premium — some companies charge lower premiums but higher settlement fees",
        "Ask about reissue rates if the property was recently purchased or refinanced — prior policies may qualify for a discount",
      ],
      potentialSavings: "Shopping for title insurance can save $500-$1,500 or more depending on your purchase price and location.",
    },
  },
  {
    title: "Negotiate seller concessions",
    tip: "Ask the seller to pay a portion of closing costs (common in buyer's markets). This is capped at 3-9% depending on loan type.",
    savings: "Save $5,000-$10,000+",
    detail: {
      strategy: "Seller concessions (also called seller credits or seller-paid closing costs) are an agreement where the seller pays a portion of your closing costs. This is very common in buyer's markets and perfectly legal — it just means the seller nets less from the sale. The amount is limited by your loan type.",
      steps: [
        "Discuss seller concession strategy with your real estate agent before making an offer",
        "In a buyer's market, ask for 2-3% of the purchase price toward closing costs",
        "Know the limits: Conventional loans (3-9% depending on down payment), FHA loans (6%), VA loans (4% plus all reasonable and customary fees)",
        "Consider offering a slightly higher purchase price in exchange for seller concessions — the net cost to the seller is similar, but it reduces your cash needed at closing",
        "Be aware that in a competitive seller's market, asking for concessions may weaken your offer",
      ],
      potentialSavings: "Seller concessions can cover thousands of dollars in closing costs. On a $350,000 home, a 3% concession is $10,500.",
    },
  },
  {
    title: "Compare Loan Estimates",
    tip: "CFPB requires lenders to provide a Loan Estimate within 3 business days. Compare at least 3 to find the best deal.",
    savings: "Save $1,000-$3,000+",
    detail: {
      strategy: "The Loan Estimate is a standardized 3-page form that every lender must provide within 3 business days of receiving your application. Because the format is identical across all lenders, it makes comparison straightforward. Shopping multiple lenders is one of the most effective ways to reduce closing costs.",
      steps: [
        "Apply with at least 3 lenders within a 14-day window — all credit inquiries for mortgage shopping within this period count as a single inquiry on your credit report",
        "Compare Page 2 of each Loan Estimate, which breaks down closing costs into categories",
        "Pay special attention to Section A (Origination Charges) — this is where lenders differ most",
        "Look at the total 'Estimated Cash to Close' on Page 1 for the bottom line",
        "Don't just compare rates — a lower rate with higher fees may cost more overall than a slightly higher rate with lower fees. Calculate total cost over your expected time in the home",
      ],
      potentialSavings: "Comparing Loan Estimates can save $1,000-$3,000+ in lender fees alone, plus potentially thousands more over the life of the loan through a better interest rate.",
    },
  },
  {
    title: "Ask about lender credits",
    tip: "Some lenders offer credits toward closing costs in exchange for a slightly higher interest rate. Do the math on total cost over time.",
    savings: "Save $1,000-$5,000+",
    detail: {
      strategy: "A lender credit is the opposite of discount points — instead of paying upfront to lower your rate, the lender gives you money toward closing costs in exchange for accepting a slightly higher interest rate. This can be a smart strategy if you plan to sell or refinance within a few years.",
      steps: [
        "Ask each lender for rate quotes at multiple price points: with points, at par (no points/no credits), and with lender credits",
        "Calculate your break-even point: divide the total closing cost savings from the credit by the additional monthly payment from the higher rate",
        "If you plan to stay less than the break-even period, the lender credit saves you money overall",
        "Get the lender credit in writing — it should appear on your Loan Estimate",
        "Remember that the lender credit cannot exceed your closing costs — you can't pocket the difference",
      ],
      potentialSavings: "Lender credits can cover $1,000-$5,000+ in closing costs, depending on the rate adjustment and loan size. Best for buyers who expect to sell or refinance within 5-7 years.",
    },
  },
  {
    title: "Close at end of month",
    tip: "Closing later in the month reduces prepaid interest charges since you pay interest from closing date through month-end.",
    savings: "Save $500-$1,500",
    detail: {
      strategy: "Prepaid interest is calculated from your closing date through the last day of the month. Your first mortgage payment isn't due until the first of the month after next. By closing at the end of the month, you minimize the number of days of prepaid interest charged at closing.",
      steps: [
        "Ask your lender or settlement agent to calculate prepaid interest for closing dates at the beginning, middle, and end of the month",
        "For example, on a $280,000 loan at 6.5%, daily interest is approximately $49.86. Closing on the 1st costs about $1,496 in prepaid interest (30 days). Closing on the 28th costs about $149 (3 days) — a savings of roughly $1,347",
        "Coordinate with your settlement agent and real estate agent to schedule closing in the last week of the month",
        "Be aware that end-of-month closings are busier for settlement offices, so schedule early",
        "Keep in mind that closing at the end of the month means your first mortgage payment comes sooner — about 30 days later instead of 60 days",
      ],
      potentialSavings: "Closing at the end of the month instead of the beginning can save $500-$1,500 in prepaid interest, depending on your loan amount and interest rate.",
    },
  },
  {
    title: "Check for first-time buyer programs",
    tip: "Many states and counties offer down payment assistance and closing cost grants. Check with your state housing finance agency.",
    savings: "Save $5,000-$15,000+",
    detail: {
      strategy: "Every state has a Housing Finance Agency (HFA) that offers programs for first-time homebuyers, and many cities and counties have their own programs too. These can include down payment assistance, closing cost grants, below-market interest rates, and tax credits. Many programs define 'first-time buyer' as anyone who hasn't owned a home in the past 3 years.",
      steps: [
        "Visit your state Housing Finance Agency's website to see available programs",
        "Check with your city and county government for local first-time buyer programs",
        "Ask your lender if they participate in any down payment assistance or closing cost assistance programs",
        "Look into whether you qualify for programs even if you've owned before — many programs serve anyone who hasn't owned in 3 years, veterans, or buyers in targeted areas",
        "Apply early — some programs have limited funding that runs out each year, and most require completing a homebuyer education course",
      ],
      potentialSavings: "First-time buyer programs can provide $5,000-$15,000+ in down payment and closing cost assistance, depending on your state and local programs.",
    },
  },
  {
    title: "Review the Closing Disclosure carefully",
    tip: "Compare every line item to your Loan Estimate. Question any fees that increased or appeared unexpectedly.",
    savings: "Save $200-$2,000+",
    detail: {
      strategy: "Your Closing Disclosure must be delivered at least 3 business days before closing. This is your last chance to catch errors and challenge unexpected fee increases. Under TRID rules, some fees cannot increase at all, some can increase up to 10% in aggregate, and others have no limit — but all must be disclosed and explained.",
      steps: [
        "Compare every line item on the Closing Disclosure to your Loan Estimate, side by side",
        "Check zero-tolerance fees (lender origination charges, transfer taxes) — these cannot increase at all from the Loan Estimate",
        "Check 10%-tolerance fees (recording fees, services you didn't shop for) — these can increase up to 10% in aggregate",
        "Look for any NEW fees that didn't appear on your Loan Estimate — ask your lender and settlement agent to explain every new charge",
        "Verify that your interest rate, loan amount, cash to close, and monthly payment match what you expected",
        "If you find errors or unexplained increases, contact your lender immediately — the 3-day review period exists specifically so you have time to address issues before closing",
      ],
      potentialSavings: "Catching errors and challenging inappropriate fee increases can save hundreds to thousands of dollars. The 3-day review period is one of the most important consumer protections in the closing process.",
    },
  },
];

const NATIONAL_AVG_PCT = 3.4;

const stateClosingCosts: Record<string, { avgPct: number; transferTax: number; notes: string }> = {
  TX: { avgPct: 3.1, transferTax: 0, notes: "No state income tax. Title insurance rates set by state." },
  CA: { avgPct: 3.5, transferTax: 0.11, notes: "High property values increase absolute costs." },
  FL: { avgPct: 3.8, transferTax: 0.7, notes: "Documentary stamp tax adds significant cost." },
  NY: { avgPct: 5.0, transferTax: 0.4, notes: "Attorney state. Mansion tax on $1M+ properties." },
  PA: { avgPct: 3.9, transferTax: 1.0, notes: "High transfer tax split between buyer and seller." },
  IL: { avgPct: 3.6, transferTax: 0.1, notes: "Chicago adds city transfer tax on top of state/county." },
  OH: { avgPct: 3.2, transferTax: 0.1, notes: "Moderate costs. County conveyance fees apply." },
  GA: { avgPct: 3.3, transferTax: 0.1, notes: "Attorney state. Intangible mortgage tax applies." },
  NC: { avgPct: 3.1, transferTax: 0.2, notes: "Attorney state. Revenue stamps required on deeds." },
  MI: { avgPct: 3.4, transferTax: 0.75, notes: "State and county transfer taxes both apply." },
  NJ: { avgPct: 3.7, transferTax: 0.4, notes: "Realty transfer fee varies by sale price tier." },
  VA: { avgPct: 3.2, transferTax: 0.25, notes: "Grantor tax paid by seller; recordation tax by buyer." },
  WA: { avgPct: 3.3, transferTax: 1.28, notes: "Real estate excise tax (REET) is one of the highest in the U.S." },
  AZ: { avgPct: 2.8, transferTax: 0, notes: "No transfer tax. Lower overall costs than most states." },
  CO: { avgPct: 2.9, transferTax: 0.01, notes: "Minimal transfer tax. Costs vary by county." },
};

const stateNames: Record<string, string> = {
  TX: "Texas", CA: "California", FL: "Florida", NY: "New York", PA: "Pennsylvania",
  IL: "Illinois", OH: "Ohio", GA: "Georgia", NC: "North Carolina", MI: "Michigan",
  NJ: "New Jersey", VA: "Virginia", WA: "Washington", AZ: "Arizona", CO: "Colorado",
};

export default function ClosingCostsPage() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(20);
  const [selectedState, setSelectedState] = useState("");
  const [activeDetail, setActiveDetail] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

  const loanAmount = homePrice * (1 - downPayment / 100);
  const lowEstimate = homePrice * 0.02;
  const highEstimate = homePrice * 0.05;
  const midEstimate = (lowEstimate + highEstimate) / 2;

  const breakdown = {
    origination: loanAmount * 0.0075,
    appraisal: 450,
    inspection: 400,
    titleSearch: 300,
    lenderTitle: loanAmount * 0.003,
    ownerTitle: homePrice * 0.005,
    settlement: 1200,
    recording: 150,
    insurance: 1400,
    escrow: homePrice * 0.005,
  };

  const calculatedTotal = Object.values(breakdown).reduce((a, b) => a + b, 0);

  const openFeeDetail = (item: typeof costCategories[0]["items"][0]) => {
    const d = item.detail;
    setActiveDetail({
      title: item.name,
      gradient: "from-[#1a5276] to-[#0a7ea8]",
      content: (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-sm text-alta-gray">
            <span className="px-2 py-0.5 bg-alta-light rounded-full text-xs font-semibold text-alta-teal">{item.typical}</span>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">What This Fee Covers</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.covers}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">Who Sets the Rate</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.whoSets}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">Can You Negotiate?</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${d.negotiable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {d.negotiable ? "Yes" : "No"}
              </span>
            </div>
            <p className="text-sm text-alta-gray leading-relaxed">{d.negotiateTips}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">State Variations</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.stateNote}</p>
          </div>

          <div className="p-3 bg-green-50 rounded-xl border border-green-100">
            <h3 className="font-bold text-green-700 text-sm mb-1">How to Reduce or Avoid</h3>
            <p className="text-sm text-green-800 leading-relaxed">{d.reduceOrAvoid}</p>
          </div>
        </div>
      ),
    });
  };

  const openReductionDetail = (item: typeof reductionStrategies[0]) => {
    const d = item.detail;
    setActiveDetail({
      title: item.title,
      gradient: "from-[#2d6b3f] to-[#1a5276]",
      content: (
        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">Strategy Overview</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.strategy}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-2">Step-by-Step</h3>
            <div className="space-y-2">
              {d.steps.map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-[#2d6b3f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-alta-gray leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-xl border border-green-100">
            <h3 className="font-bold text-green-700 text-sm mb-1">Potential Savings</h3>
            <p className="text-sm text-green-800 leading-relaxed">{d.potentialSavings}</p>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
    <PageHero
      title="Closing Costs Explained"
      subtitle="Typically 2%–5% of your home's purchase price. Use our calculator and review every fee category."
      image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80"
      breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Closing Costs", href: "/closing-process/closing-costs" }]}
    />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Page intro */}
        <div className="mb-6 p-4 bg-[#faf4e4] rounded-2xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8b6914]/15 flex items-center justify-center text-[#8b6914] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Estimate Your Closing Costs</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Use the calculator below to get a personalized estimate based on your purchase price and down payment. Then scroll down to see every fee category explained in detail. Tap any fee to learn more about what it covers, who sets the rate, and how to reduce it. Costs vary by state and lender — this is an estimate, not a quote.</p>
            </div>
          </div>
        </div>

        {/* Wire Fraud Warning */}
        <div className="p-4 bg-gradient-to-r from-[#943030] to-[#7a2020] rounded-2xl text-white mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            <div>
              <h3 className="font-bold text-sm mb-1">Wire Fraud Warning</h3>
              <p className="text-xs text-white/90 leading-relaxed">Never wire money based on emailed instructions. Always verify wiring details by phone using a number you already have — not one from the email. Wire fraud losses hit $275M in 2025.</p>
              <Link href="/stop-fraud" className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-white underline underline-offset-2 hover:text-white/80">Learn how to protect yourself <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-alta-light rounded-2xl p-6 lg:p-8 mb-12 border border-gray-100">
          <h2 className="text-xl font-bold text-alta-navy mb-6">Closing Cost Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-alta-navy mb-2">Home Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-alta-gray">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-lg text-alta-navy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-alta-navy mb-2">Down Payment (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                  min={0}
                  max={100}
                  className="w-full pl-4 pr-8 py-3 border border-gray-200 rounded-lg text-alta-navy"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-alta-gray">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-alta-navy mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-alta-navy bg-white"
              >
                <option value="">National Average</option>
                {Object.keys(stateClosingCosts).sort((a, b) => stateNames[a].localeCompare(stateNames[b])).map((code) => (
                  <option key={code} value={code}>{stateNames[code]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#e8f0f5] rounded-xl p-4 text-center border border-[#c5d8e4] tile-interactive">
              <p className="text-xs text-[#1a5276] uppercase tracking-wider mb-1">Low Estimate (2%)</p>
              <p className="text-2xl font-bold text-[#1a5276]">${lowEstimate.toLocaleString()}</p>
            </div>
            <div className="bg-[#e6f1f5] rounded-xl p-4 text-center border-2 border-alta-teal">
              <p className="text-xs text-alta-teal uppercase tracking-wider mb-1 font-medium">Calculated Estimate</p>
              <p className="text-2xl font-bold text-alta-teal">${Math.round(calculatedTotal).toLocaleString()}</p>
            </div>
            <div className="bg-[#f5e8e8] rounded-xl p-4 text-center border border-[#e4c5c5] tile-interactive">
              <p className="text-xs text-[#943030] uppercase tracking-wider mb-1">High Estimate (5%)</p>
              <p className="text-2xl font-bold text-[#943030]">${highEstimate.toLocaleString()}</p>
            </div>
          </div>

          {/* Detailed breakdown */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-alta-teal hover:text-alta-teal-dark flex items-center gap-1">
              View Estimated Breakdown
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 space-y-2">
              {Object.entries(breakdown).map(([key, value]) => {
                const labels: Record<string, string> = {
                  origination: "Loan Origination",
                  appraisal: "Appraisal",
                  inspection: "Home Inspection",
                  titleSearch: "Title Search",
                  lenderTitle: "Lender's Title Insurance",
                  ownerTitle: "Owner's Title Insurance",
                  settlement: "Settlement Fee",
                  recording: "Recording Fees",
                  insurance: "Homeowner's Insurance (1yr)",
                  escrow: "Escrow/Tax Prepaid",
                };
                return (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-alta-gray">{labels[key]}</span>
                    <span className="text-sm font-medium text-alta-navy">${Math.round(value).toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="flex justify-between py-2 pt-3 border-t-2 border-alta-teal">
                <span className="text-sm font-bold text-alta-navy">Estimated Total</span>
                <span className="text-sm font-bold text-alta-teal">${Math.round(calculatedTotal).toLocaleString()}</span>
              </div>
            </div>
          </details>

          <p className="text-xs text-alta-gray mt-4">
            * This calculator provides estimates only. Actual costs vary by state, county, lender, and transaction details. Consult your settlement agent for an accurate Closing Disclosure.
          </p>
        </div>

        {/* Personalized State Closing Cost Card */}
        {selectedState && stateClosingCosts[selectedState] && (() => {
          const sd = stateClosingCosts[selectedState];
          const stateLow = homePrice * (sd.avgPct - 0.5) / 100;
          const stateHigh = homePrice * (sd.avgPct + 0.5) / 100;
          const transferTaxAmt = homePrice * sd.transferTax / 100;
          const natAvgTotal = homePrice * NATIONAL_AVG_PCT / 100;
          const stateAvgTotal = homePrice * sd.avgPct / 100;
          const diff = stateAvgTotal - natAvgTotal;
          return (
            <div className="bg-gradient-to-br from-[#e6f1f5] to-white rounded-2xl p-6 lg:p-8 mb-12 border-2 border-alta-teal shadow-sm">
              <h2 className="text-xl font-bold text-alta-navy mb-1">Your Estimated Closing Costs in {stateNames[selectedState]}</h2>
              <p className="text-sm text-alta-gray mb-5">Based on a ${homePrice.toLocaleString()} home with {downPayment}% down</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-alta-gray uppercase tracking-wider mb-1">Estimated Range</p>
                  <p className="text-lg font-bold text-alta-navy">${Math.round(stateLow).toLocaleString()} &ndash; ${Math.round(stateHigh).toLocaleString()}</p>
                  <p className="text-xs text-alta-gray mt-0.5">{(sd.avgPct - 0.5).toFixed(1)}% &ndash; {(sd.avgPct + 0.5).toFixed(1)}% of price</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-alta-gray uppercase tracking-wider mb-1">Transfer Tax</p>
                  <p className="text-lg font-bold text-alta-navy">{sd.transferTax === 0 ? "None" : `$${Math.round(transferTaxAmt).toLocaleString()}`}</p>
                  <p className="text-xs text-alta-gray mt-0.5">{sd.transferTax === 0 ? "No state transfer tax" : `${sd.transferTax}% of sale price`}</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-alta-gray uppercase tracking-wider mb-1">vs. National Avg</p>
                  <p className={`text-lg font-bold ${diff > 0 ? "text-[#943030]" : diff < 0 ? "text-[#2d6b3f]" : "text-alta-navy"}`}>
                    {diff === 0 ? "Same" : `${diff > 0 ? "+" : ""}$${Math.round(Math.abs(diff)).toLocaleString()}`}
                  </p>
                  <p className="text-xs text-alta-gray mt-0.5">{sd.avgPct}% vs. {NATIONAL_AVG_PCT}% national</p>
                </div>
              </div>
              <div className="p-3 bg-[#faf4e4] rounded-xl border border-[#e8d9a8]">
                <p className="text-sm text-alta-gray leading-relaxed"><span className="font-semibold text-alta-navy">{stateNames[selectedState]} note:</span> {sd.notes}</p>
              </div>
            </div>
          );
        })()}

        <ContextualSponsor context="closing" />

        {/* Fee Categories */}
        {/* Interactive cost breakdown chart */}
        <ClosingCostChart />

        <h2 className="text-2xl font-bold text-alta-navy mb-6">All Closing Costs by Category</h2>
        <p className="text-sm text-alta-gray mb-4">Tap any fee to learn what it covers, whether you can negotiate it, and how to reduce it.</p>
        <div className="space-y-8">
          {costCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-lg font-semibold text-alta-navy mb-3 pb-2 border-b border-gray-100">{cat.title}</h3>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => openFeeDetail(item)}
                    className="w-full text-left flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-3 rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] hover:border-alta-teal/30 hover:shadow-md transition-all cursor-pointer bg-[#e8f0f5] group tile-interactive"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-alta-navy group-hover:text-alta-teal transition-colors flex items-center gap-1.5">
                        {item.name}
                        <svg className="w-3.5 h-3.5 text-alta-teal opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </p>
                      <p className="text-xs text-alta-gray">{item.description}</p>
                    </div>
                    <span className="text-xs font-medium text-alta-teal bg-alta-light px-2 py-1 rounded shrink-0">
                      {item.typical}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <InlineAd />

        {/* Who pays what */}
        <h2 className="text-2xl font-bold text-alta-navy mb-4 mt-10">Who Pays What? It Depends on Your State</h2>
        <p className="text-sm text-alta-gray mb-4 leading-relaxed">
          Closing cost responsibilities vary significantly by state and are often negotiable. In some states, the seller traditionally pays for the owner&apos;s title insurance policy. In others, the buyer pays. Your purchase agreement should specify who pays each fee. Here are the general patterns:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="p-5 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] shadow-sm tile-interactive">
            <h3 className="font-bold text-alta-navy mb-3">Typically Paid by the Buyer</h3>
            <ul className="space-y-2 text-sm text-alta-gray">
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Loan origination and discount points</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Home inspection and appraisal</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Lender&apos;s title insurance policy</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Homeowner&apos;s insurance (first year)</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Prepaid property taxes and interest</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Private mortgage insurance (PMI) if applicable</li>
            </ul>
          </div>
          <div className="p-5 bg-[#e9f5ed] rounded-2xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] shadow-sm tile-interactive">
            <h3 className="font-bold text-alta-navy mb-3">Typically Paid by the Seller</h3>
            <ul className="space-y-2 text-sm text-alta-gray">
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Real estate agent commissions (negotiated separately — no standard rate since 2024 NAR settlement)</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Owner&apos;s title insurance (in some states)</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Transfer taxes (varies by state/county)</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Any agreed-upon repair credits</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Prorated property taxes owed</li>
            </ul>
          </div>
        </div>

        {/* How to reduce costs */}
        <h2 className="text-2xl font-bold text-alta-navy mb-4">7 Ways to Reduce Your Closing Costs</h2>
        <p className="text-sm text-alta-gray mb-4">Tap any card to see the full strategy with step-by-step instructions and potential savings.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {reductionStrategies.map((item) => (
            <button
              key={item.title}
              onClick={() => openReductionDetail(item)}
              className="text-left p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] shadow-sm hover:shadow-md hover:border-[#2d6b3f]/50 transition-all cursor-pointer group tile-interactive"
            >
              <h3 className="font-bold text-alta-navy text-sm mb-1 group-hover:text-[#2d6b3f] transition-colors flex items-center gap-1.5">
                {item.title}
                <svg className="w-3.5 h-3.5 text-[#2d6b3f] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </h3>
              <p className="text-xs text-alta-gray leading-relaxed mb-2">{item.tip}</p>
              <span className="inline-block text-xs font-bold text-[#2d6b3f] bg-[#d4edda] px-2 py-0.5 rounded-full">{item.savings}</span>
            </button>
          ))}
        </div>

        {/* Key regulations */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 mb-6">
          <h3 className="font-bold text-alta-navy mb-3">Key Federal Regulations Protecting You</h3>
          <div className="space-y-3 text-sm text-alta-gray">
            <div>
              <p className="font-semibold text-alta-navy">RESPA (Real Estate Settlement Procedures Act)</p>
              <p className="leading-relaxed">Requires lenders to disclose all settlement costs. Prohibits kickbacks and referral fees between settlement service providers. Gives you the right to shop for your own title insurance and settlement services.</p>
              <p className="text-[10px] text-alta-teal mt-1 font-medium">Source: CFPB</p>
            </div>
            <div>
              <p className="font-semibold text-alta-navy">TRID (TILA-RESPA Integrated Disclosure)</p>
              <p className="leading-relaxed">Requires two standardized disclosure forms: the Loan Estimate (within 3 business days of application) and the Closing Disclosure (at least 3 business days before closing). Limits how much certain fees can increase between estimates.</p>
              <p className="text-[10px] text-alta-teal mt-1 font-medium">Source: CFPB</p>
            </div>
            <div>
              <p className="font-semibold text-alta-navy">Tolerance Categories</p>
              <p className="leading-relaxed">Under TRID, some fees cannot increase at all (lender fees, transfer taxes), some can increase up to 10% in aggregate (services you didn&apos;t shop for, recording fees), and some have no limit (services you chose, prepaid items, escrow).</p>
              <p className="text-[10px] text-alta-teal mt-1 font-medium">Source: CFPB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/mortgage-calculator" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
            Mortgage Calculator
          </Link>
          <Link href="/document-checklist" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
            Document Checklist
          </Link>
          <Link href="/sources" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
            View All Sources
          </Link>
        </div>

        <ClosingFlowNav currentStep={4} />

        <FirstTimeBuyerCTA />
      </div>
    </div>

    {/* Fee Detail Modal */}
    {activeDetail && (
      <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setActiveDetail(null)}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setActiveDetail(null)} className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className={`bg-gradient-to-r ${activeDetail.gradient} px-6 py-5`}>
            <h2 className="text-xl font-bold text-white pr-10">{activeDetail.title}</h2>
          </div>
          <div className="p-6">
            {activeDetail.content}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <SaveToFolderBtn type="note" title={activeDetail.title} content={`Closing cost detail: ${activeDetail.title}`} />
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
