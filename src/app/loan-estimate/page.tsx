"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const pages = [
  {
    page: "Page 1 — Loan Terms & Projected Payments",
    color: "from-[#1a5276] to-[#154463]",
    sections: [
      {
        name: "Loan Terms",
        what: "Shows your loan amount, interest rate (fixed or adjustable), monthly principal and interest payment, and whether there's a prepayment penalty or balloon payment.",
        lookFor: "Verify the interest rate matches what you were quoted. Check if the rate is locked. If adjustable, note the maximum rate and payment caps.",
        expandedWhat: "The Loan Terms section is the first thing you'll see on the Loan Estimate. It displays four key pieces of information in a simple table: Loan Amount (the total you're borrowing), Interest Rate (your quoted rate and whether it's fixed or can change), Monthly Principal & Interest (your base monthly payment before taxes and insurance), Prepayment Penalty (whether you'll be charged for paying off the loan early), and Balloon Payment (whether a large lump sum is due at the end of the loan term). Each row includes a 'Can this amount increase after closing?' indicator.",
        expandedLookFor: "Compare the interest rate to the verbal or written quote you received from your loan officer. If the rate is not locked, the Loan Estimate will say so — and the rate can change before closing. For adjustable-rate mortgages, the maximum rate over the life of the loan should be clearly stated. The monthly principal and interest should be mathematically consistent with the loan amount and rate. A prepayment penalty is uncommon in standard mortgages today — if one is listed, understand the terms (how long it applies, how much it costs). Balloon payments are rare in conventional mortgages; if one appears, ask your lender to explain.",
        commonErrors: "Interest rate that doesn't match the verbal quote, missing rate lock information, monthly payment calculated incorrectly, prepayment penalty listed when the lender said there wouldn't be one, and loan amount that doesn't align with the purchase price minus your down payment.",
        whatToDo: "If the rate doesn't match your quote, contact your loan officer immediately and request written confirmation. If the rate is not locked, ask about locking it — and get the lock confirmation in writing with the expiration date. If there's a prepayment penalty you didn't agree to, push back before proceeding. Compare at least 3 Loan Estimates from different lenders to find the best terms."
      },
      {
        name: "Projected Payments",
        what: "Breaks down your estimated total monthly payment including principal, interest, mortgage insurance, and estimated escrow (property taxes and homeowner's insurance).",
        lookFor: "Compare the total monthly payment to what you can comfortably afford. Note whether escrow is included — if not, you'll pay taxes and insurance separately.",
        expandedWhat: "The Projected Payments section breaks down your total monthly obligation into its components: Principal & Interest (from the Loan Terms section), Mortgage Insurance (PMI for conventional loans with less than 20% down, or MIP for FHA loans), and Estimated Escrow (the monthly amount your servicer will collect for property taxes and homeowner's insurance). If your payment will change over time — such as when PMI drops off or an adjustable rate adjusts — multiple columns show the payment at different stages. The 'Estimated Total Monthly Payment' at the bottom is the actual amount you'll pay each month.",
        expandedLookFor: "The total monthly payment (not just principal and interest) is what matters for budgeting. If mortgage insurance is listed, understand when it drops off — for conventional loans, you can request PMI removal at 80% loan-to-value, and it automatically terminates at 78%. For FHA loans, MIP may last the life of the loan depending on your down payment. Verify the escrow estimate is reasonable by checking your county's property tax rate and getting a homeowner's insurance quote independently. If escrow is not included, you'll be responsible for budgeting and paying taxes and insurance yourself.",
        commonErrors: "Mortgage insurance missing when it should be included (less than 20% down on conventional), escrow amount that seems unusually low (may be based on vacant land taxes rather than improved property taxes), total monthly payment that doesn't include all components, and projected payment changes that don't match ARM terms.",
        whatToDo: "If the total monthly payment exceeds what you can comfortably afford, consider a smaller loan amount, a longer term, or a different loan program. If mortgage insurance seems high, ask about options — a higher down payment eliminates PMI, or ask about lender-paid MI (where the lender pays PMI in exchange for a slightly higher rate). If escrow seems too low, it may increase at the first annual analysis — budget accordingly."
      },
      {
        name: "Costs at Closing",
        what: "Shows your estimated closing costs and the total cash you'll need to bring to closing (closing costs plus down payment minus any credits).",
        lookFor: "This is the total check or wire you need at closing. Make sure it matches your budget. Ask your lender to explain any fees you don't recognize.",
        expandedWhat: "The Costs at Closing section at the bottom of Page 1 provides two summary figures: Estimated Closing Costs (the total of all fees detailed on Page 2 — loan costs, other costs, and lender credits) and Estimated Cash to Close (closing costs plus your down payment, minus your earnest money deposit and any seller or lender credits). The Cash to Close figure is the amount you need to bring to the closing table via wire transfer or cashier's check.",
        expandedLookFor: "Compare this Cash to Close figure across all your Loan Estimates — this is the actual out-of-pocket amount on closing day. A lower interest rate with higher closing costs might result in a higher Cash to Close but lower long-term cost. Conversely, a 'no closing cost' loan rolls fees into a higher rate, reducing Cash to Close but increasing monthly payments. Consider both the upfront cost and the long-term total cost when comparing lenders.",
        commonErrors: "Cash to Close that doesn't account for the earnest money deposit you've already paid, missing lender credits that were verbally promised, closing costs that seem dramatically different from other Loan Estimates (could indicate understated fees), and down payment amount that doesn't match your agreement.",
        whatToDo: "If the Cash to Close is higher than expected, dig into Page 2 to identify which fees are driving it. Ask your lender to explain every fee — and get explanations in writing. Compare the Estimated Closing Costs across multiple Loan Estimates; the standardized format makes apples-to-apples comparison straightforward. If lender credits were promised (such as in a 'no closing cost' loan), verify they appear."
      },
    ],
  },
  {
    page: "Page 2 — Closing Cost Details",
    color: "from-[#2d6b3f] to-[#235532]",
    sections: [
      {
        name: "Loan Costs (Sections A-C)",
        what: "Section A lists origination charges (the lender's own fees and any discount points you're paying to buy down your rate). Section B lists services the lender requires from specific providers (appraisal, credit report, flood determination). Section C lists services you're allowed to shop for yourself — like title search, settlement agent, and pest inspection.",
        lookFor: "Origination charges (Section A) are negotiable. Compare these across multiple lenders. Section C is where your consumer power matters most — you can choose your own providers for these services and potentially save hundreds.",
        expandedWhat: "Section A (Origination Charges) includes the lender's processing, underwriting, and funding fees, plus any discount points. One point equals 1% of the loan amount and typically reduces your rate by about 0.25% (this varies by lender and market). Section B (Services You Cannot Shop For) includes required services where the lender chooses the provider: appraisal, credit report, flood certification, tax monitoring, and any other lender-mandated services. Section C (Services You Can Shop For) lists services the lender requires but that you're free to choose your own provider for: title search, lender's title insurance, settlement/closing fee, survey, and pest inspection.",
        expandedLookFor: "Origination charges vary significantly between lenders and are the most negotiable fees. Ask each lender to itemize their origination charges. Watch for 'junk fees' — vaguely named charges like 'processing fee,' 'administrative fee,' or 'document preparation fee' that may be duplicative. In Section C, you have RESPA-protected rights to choose your own providers. If you shop for these services yourself, any fee increases from the LE to the CD have no tolerance limit — but you may save money by finding competitive providers. The lender must provide you with a written list of providers you can shop from (the 'Shopping List').",
        commonErrors: "Inflated origination charges compared to other lenders, duplicate fees under different names, services listed in Section B that should be in Section C (affecting your ability to shop), missing items in Section C that limit your shopping rights, and discount points calculated on the wrong loan amount.",
        whatToDo: "Negotiate origination charges — they are not fixed. If one lender charges $2,000 in origination and another charges $800, ask the higher lender to match. For Section C services, request the shopping list from your lender and get quotes from at least 2-3 providers for title and settlement services. Under RESPA, no one can require you to use a specific settlement service provider as a condition of the loan (with limited exceptions)."
      },
      {
        name: "Other Costs (Sections E-H)",
        what: "Section E lists recording fees and transfer taxes charged by your local government. Section F covers prepaids — items you pay upfront like homeowner's insurance premium, prepaid daily interest, and initial property tax. Section G details your escrow account setup (monthly reserves your lender holds for taxes and insurance). Section H includes optional items like owner's title insurance.",
        lookFor: "Owner's title insurance is in Section H. Even though it says 'optional,' it's strongly recommended — it protects YOUR ownership rights for life. You can shop for this independently; don't just accept the lender's suggestion.",
        expandedWhat: "Section E (Taxes and Other Government Fees) includes recording fees (to record the deed and mortgage with the county) and transfer taxes (state/county/municipal taxes on the property transfer). These are set by law and not negotiable. Section F (Prepaids) covers items you pay in advance at closing: homeowner's insurance premium (typically 12 months upfront), mortgage insurance premium (if applicable), prepaid daily interest (from closing date to the end of the month), and property taxes (if any are due before your first escrow payment). Section G (Initial Escrow Payment at Closing) details the upfront reserves collected to fund your escrow account — typically 2-6 months of property taxes and 2-3 months of insurance. Section H (Other) includes owner's title insurance and any other optional items.",
        expandedLookFor: "Transfer taxes vary significantly by location — some states charge nothing, others charge over 1% of the sale price. Verify the rate for your area. For prepaids, calculate your prepaid interest yourself: (loan amount x rate / 365) x days remaining in the closing month. The initial escrow deposit in Section G is limited by RESPA — your servicer cannot collect more than a 2-month cushion beyond what's needed for upcoming bills. Owner's title insurance in Section H is one of the most important purchases in the entire transaction — it protects your ownership rights against undiscovered liens, fraud, recording errors, and other title defects for as long as you or your heirs own the property.",
        commonErrors: "Transfer taxes calculated at the wrong rate for your jurisdiction, prepaid interest using the wrong interest rate or wrong number of days, initial escrow deposit collecting more months than RESPA allows, missing owner's title insurance, and homeowner's insurance premium that doesn't match your policy quote.",
        whatToDo: "Verify transfer taxes with your local government or title company. Calculate prepaid interest yourself to confirm accuracy. If the initial escrow deposit seems excessive, ask for an itemized breakdown showing the number of months collected for each item — RESPA limits the cushion to 2 months. If owner's title insurance isn't listed, ask about adding it and shop for competitive rates. You can purchase owner's title insurance from any provider — not just the one the lender suggests."
      },
      {
        name: "Calculating Cash to Close",
        what: "Line-by-line calculation: total closing costs, minus any lender credits, plus down payment, minus deposit, minus seller credits.",
        lookFor: "If you negotiated seller concessions, verify they appear here. Check that your earnest money deposit is credited correctly.",
        expandedWhat: "This section provides a transparent calculation showing how your Cash to Close is determined: Total Closing Costs (from Sections A through H above) minus Closing Costs Financed (if any costs are rolled into the loan) minus Down Payment/Funds from Borrower plus Deposit (your earnest money, credited to you) minus Funds for Borrower (if you're receiving cash back) minus Seller Credits (any closing cost contributions from the seller) plus Adjustments and Other Credits (prorations, HOA credits, etc.) equals Estimated Cash to Close.",
        expandedLookFor: "Verify your earnest money deposit amount and that it's being credited to you. If your purchase contract includes seller concessions (seller paying part of your closing costs), the amount should match your contract terms exactly. If you negotiated lender credits (such as in a 'no closing cost' loan), verify the credit amount. The Cash to Close should align with your financial planning — if it's significantly different from what you expected, identify which line item is causing the difference.",
        commonErrors: "Earnest money deposit not credited or credited at the wrong amount, seller concessions missing or at the wrong amount, lender credits that were promised but don't appear, adjustments that weren't discussed in the purchase agreement, and down payment amount that doesn't match your expectations.",
        whatToDo: "If your earnest money deposit is missing or wrong, provide your receipt or wire confirmation to the lender. If seller concessions don't match your purchase agreement, have your real estate agent confirm the terms with the listing agent. If lender credits are missing, reference the written communication where they were promised. Keep all documentation — emails, commitment letters, and rate lock confirmations — as evidence of what was agreed."
      },
    ],
  },
  {
    page: "Page 3 — Comparisons & Contact Info",
    color: "from-[#5b3a8c] to-[#482d70]",
    sections: [
      {
        name: "Comparisons",
        what: "Shows the total you'll pay over the first 5 years (including principal, interest, mortgage insurance, and loan costs) and the Annual Percentage Rate (APR) — which includes fees in the true cost calculation.",
        lookFor: "The APR is the most important number for comparing lenders. A lower rate with high fees may cost more than a slightly higher rate with lower fees. Compare APRs across your Loan Estimates.",
        expandedWhat: "The Comparisons section provides three key metrics for evaluating the true cost of this loan: 'In 5 Years' shows the total you will have paid in principal, interest, mortgage insurance, and loan costs after 5 years — plus how much principal you will have paid off. The Annual Percentage Rate (APR) expresses the total annual cost of borrowing as a percentage, incorporating fees that the basic interest rate doesn't capture. The Total Interest Percentage (TIP) shows total interest as a percentage of the loan amount over the full term.",
        expandedLookFor: "The 5-year comparison is particularly useful because most homeowners refinance or sell within 7-10 years. This number captures both monthly costs and upfront fees, making it the most practical comparison tool. The APR is always higher than the interest rate because it includes fees — a large gap between the two indicates high upfront costs. Compare APRs across all your Loan Estimates for the most accurate cost comparison. The TIP shows the total interest percentage over the life of the loan — on a 30-year mortgage, this is often 60-80% or more of the loan amount.",
        commonErrors: "APR that seems inconsistent with the rate and fees (calculation error), 5-year cost comparison that doesn't account for all fees, and Total Interest Percentage that seems unreasonably high or low for the loan terms.",
        whatToDo: "Use the APR as your primary comparison metric across lenders. If one lender has a significantly lower APR, that's generally the better deal — even if their interest rate is slightly higher. Use the 5-year comparison if you plan to sell or refinance within that timeframe. If you plan to stay long-term, the APR and monthly payment matter more than upfront costs."
      },
      {
        name: "Other Considerations",
        what: "Discloses whether the lender will service the loan or transfer it, whether the loan is assumable, and late payment policies.",
        lookFor: "Many loans are sold after closing. This is normal. Check the late payment policy — typically 15 days grace period, then a percentage fee.",
        expandedWhat: "This section covers important loan features that affect your experience after closing: Servicing (whether the lender will handle your payments or transfer servicing to another company), Assumption (whether a future buyer could take over your loan), and Late Payment details (grace period and fee amount). Loan servicing transfers are extremely common — your loan may be sold multiple times during its life. When servicing transfers, your loan terms do not change — only where you send your payment changes.",
        expandedLookFor: "If 'We may transfer servicing' is indicated, expect to receive a notice at some point after closing that your payments should go to a new servicer. Both the old and new servicer must notify you, and there is a 60-day grace period during which you cannot be charged a late fee if you sent payment to the wrong servicer. The late payment terms should specify the grace period (typically 15 days after the due date) and the late fee (typically 4-5% of the monthly principal and interest payment). If the loan is assumable, a future buyer could potentially take over your loan at the original terms — this can be valuable if rates have risen.",
        commonErrors: "Servicing transfer information that differs from verbal representations, late payment terms that are less favorable than standard (grace period shorter than 15 days or fee higher than 5%), and assumption terms that conflict with what the lender disclosed.",
        whatToDo: "If you prefer a lender that services their own loans (rather than selling servicing), ask about this during the shopping process — some credit unions and portfolio lenders retain servicing. Note the late payment terms and set up autopay to avoid late fees. If assumption is important to you (e.g., for a future sale when rates may be higher), confirm whether the loan is truly assumable and under what conditions."
      },
      {
        name: "Contact Information",
        what: "Lists the lender, mortgage broker (if any), real estate agents, and settlement agent with their contact details and licensing numbers.",
        lookFor: "Verify your settlement agent is correct. If you've chosen your own title company, make sure it's listed here.",
        expandedWhat: "This section lists complete contact information for every professional involved in your transaction: the lender (with NMLS ID), the mortgage broker if one is involved (with NMLS ID), the real estate agents for both buyer and seller, and the settlement agent/title company (with licensing information). The NMLS (Nationwide Multistate Licensing System) number allows you to verify a mortgage professional's credentials and disciplinary history at nmlsconsumeraccess.org.",
        expandedLookFor: "Verify that the settlement agent matches the title company you selected (or agreed to). Under RESPA Section 9, no seller can require you to use a specific title company as a condition of the sale. If you're working with a mortgage broker, both the broker and the actual lender should be listed. Check that the real estate agent information is correct — both buyer's and seller's agents. Record the NMLS numbers for your files.",
        commonErrors: "Wrong settlement agent (different from what was agreed), missing mortgage broker information when a broker is involved, incorrect NMLS numbers, and real estate agent information that doesn't match the actual agents on the transaction.",
        whatToDo: "If the settlement agent is wrong, notify your lender and real estate agent immediately. You have the right to choose your own title company under RESPA. Verify all NMLS numbers at nmlsconsumeraccess.org to confirm licensing status. If any contact information is missing or incorrect, request a correction — you may need these details for future reference or if you need to file a complaint."
      },
    ],
  },
];

const timeline = [
  {
    when: "Within 3 business days of applying",
    what: "Your lender must provide the Loan Estimate. This is required by federal law (TRID/TILA-RESPA Integrated Disclosure rule).",
    source: "CFPB",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#1a5276] mb-2">What Triggers the 3-Day Clock</h3>
          <p className="leading-relaxed">Under TRID, a mortgage application is considered &quot;received&quot; when the lender has collected six pieces of information: (1) your name, (2) your income, (3) your Social Security number, (4) the property address, (5) an estimate of the property value, and (6) the desired loan amount. Once the lender has all six, the 3-business-day clock starts.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#1a5276] mb-2">What Counts as a &quot;Business Day&quot;</h3>
          <p className="leading-relaxed">For the purpose of delivering the Loan Estimate, a business day is any day the lender's offices are open to the public for carrying out substantially all business functions. Saturdays may count if the lender is open. Sundays and federal holidays do not count.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#1a5276] mb-2">What If the Lender Misses the Deadline</h3>
          <p className="leading-relaxed">If the lender fails to provide the Loan Estimate within 3 business days, they are in violation of the TRID rule. You can file a complaint with the CFPB. This is also a red flag about the lender's organizational capacity — a lender that can't meet basic disclosure deadlines may cause problems throughout the closing process.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: 12 CFR 1026.19(e)(1)(iii) — TRID timing requirements</p>
      </div>
    ),
  },
  {
    when: "Before you commit",
    what: "You should receive Loan Estimates from at least 2-3 lenders to compare. The standardized format makes comparison easy.",
    source: "CFPB",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">Why Multiple Loan Estimates Matter</h3>
          <p className="leading-relaxed">The CFPB designed the Loan Estimate with a standardized format specifically so consumers can compare offers side by side. Every lender must present the information in the same layout, making it straightforward to compare rates, fees, and total costs across multiple offers.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">What to Compare</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>APR</strong> (Page 3) — the single best number for total cost comparison</li>
            <li><strong>Origination charges</strong> (Page 2, Section A) — the most negotiable fees</li>
            <li><strong>Total closing costs</strong> (Page 2, Section J)</li>
            <li><strong>Total monthly payment</strong> (Page 1, including escrow)</li>
            <li><strong>5-year cost</strong> (Page 3) — best for short-term planning</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">Credit Score Impact</h3>
          <p className="leading-relaxed">Multiple mortgage inquiries within a 14-45 day window (depending on the scoring model) count as a single inquiry on your credit report. This means you can shop multiple lenders without harming your credit score, as long as you do so within the rate-shopping window.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB — Know Before You Owe mortgage shopping guide</p>
      </div>
    ),
  },
  {
    when: "Before rate lock expiration",
    what: "If your rate is locked, the Loan Estimate reflects that locked rate. If not locked, terms may change.",
    source: "CFPB",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#8b6914] mb-2">Understanding Rate Locks</h3>
          <p className="leading-relaxed">A rate lock is a commitment from the lender to hold a specific interest rate for a set period (typically 30-60 days). If your Loan Estimate shows a locked rate, those terms are guaranteed as long as you close before the lock expires and there are no changes to your application (such as a change in loan amount or property).</p>
        </div>
        <div>
          <h3 className="font-bold text-[#8b6914] mb-2">What Happens If the Lock Expires</h3>
          <p className="leading-relaxed">If your closing is delayed beyond the lock expiration, the lender may re-lock at the current market rate — which could be higher or lower. Some lenders offer lock extensions (usually for a fee). Ask about lock extension policies before you lock, so you're prepared if there are delays.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#8b6914] mb-2">Float-Down Options</h3>
          <p className="leading-relaxed">Some lenders offer a &quot;float-down&quot; option that lets you take advantage of lower rates if the market drops after you lock. This typically comes with conditions — such as rates must drop by at least 0.25% — and may cost an additional fee. Ask your lender if this option is available.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB — Understanding rate locks</p>
      </div>
    ),
  },
  {
    when: "If there's a changed circumstance",
    what: "Your lender may issue a revised Loan Estimate if something changes (rate lock, property value, loan program). You have 3 days to review.",
    source: "CFPB",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#5b3a8c] mb-2">What Qualifies as a Changed Circumstance</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>An extraordinary event beyond anyone's control (e.g., natural disaster affecting the property)</li>
            <li>Information specific to the transaction that the lender did not know at the time of the original estimate</li>
            <li>New information specific to the borrower (e.g., loss of employment, change in credit)</li>
            <li>The borrower requests changes (e.g., different loan amount, different property, adding a co-borrower)</li>
            <li>The interest rate was not locked when the LE was issued and is now being locked</li>
            <li>The appraisal comes in at a different value than estimated</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#5b3a8c] mb-2">Revised Loan Estimate Rules</h3>
          <p className="leading-relaxed">When a valid changed circumstance occurs, the lender must provide a revised Loan Estimate within 3 business days of learning about the change. The revised LE resets the fee tolerance baseline — meaning the new estimates become the benchmark for comparing to the Closing Disclosure. A lender cannot use &quot;changed circumstances&quot; as a pretext to increase fees that have nothing to do with the actual change.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#5b3a8c] mb-2">Your Rights</h3>
          <p className="leading-relaxed">You are entitled to a clear explanation of what changed and why. If fees increased on a revised LE, ask the lender to document the specific changed circumstance that justified each increase. If you believe the change is not legitimate, you can file a complaint with the CFPB.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: 12 CFR 1026.19(e)(4) — Changed circumstance provisions</p>
      </div>
    ),
  },
];

const redFlags = [
  {
    flag: "Missing or blank fees",
    detail: "Every fee section should be filled in. Blank fields may mean the lender hasn't done their homework or is hiding costs.",
    expandedWhat: "When reviewing a Loan Estimate, every section from A through H should have specific dollar amounts or explicitly show $0. Blank fields, 'TBD,' or 'N/A' entries in required sections are warning signs. Under TRID, the lender is required to provide good-faith estimates for all costs — even if exact amounts are not yet known.",
    expandedWhy: "A lender who leaves fees blank may be trying to make their Loan Estimate appear cheaper than competitors. When the Closing Disclosure arrives, those blank fields will suddenly have real numbers — and your actual closing costs could be significantly higher than what the LE suggested. This tactic undermines the entire purpose of the Loan Estimate comparison process.",
    expandedAction: "Ask the lender to fill in every blank field with their best good-faith estimate. If they refuse or say they 'don't know yet,' consider this a red flag about their competence or transparency. Compare the completeness of Loan Estimates across lenders — a thorough, fully populated LE is a sign of a professional operation."
  },
  {
    flag: "Unusually low estimates",
    detail: "If one Loan Estimate is dramatically lower than others, fees may be understated and will increase at closing.",
    expandedWhat: "If you're comparing 3 or more Loan Estimates and one has closing costs significantly lower than the others, the low estimate may not be a better deal — it may be a bait-and-switch. While legitimate cost differences exist between lenders, a dramatically lower estimate should raise questions about which fees are missing or understated.",
    expandedWhy: "Some lenders intentionally lowball their Loan Estimate to win your business, knowing that fees will increase by the Closing Disclosure. While TRID tolerance rules limit how much fees can increase, no-tolerance-limit fees (services you shopped for, prepaids, insurance) can increase without restriction. A lender who underestimates these categories is setting you up for sticker shock at closing.",
    expandedAction: "Compare the same fee categories across all Loan Estimates line by line. If one lender's estimate for a specific service is much lower than others, ask why. Request written confirmation that the estimate is accurate. If the lender admits the estimate is preliminary, weigh that uncertainty against the apparent savings."
  },
  {
    flag: "No rate lock confirmation",
    detail: "If your rate isn't locked, the terms on the Loan Estimate can change. Ask about locking and the expiration date.",
    expandedWhat: "The Loan Estimate will indicate whether your interest rate is locked. If the rate is not locked, every number on the document is subject to change — the interest rate, monthly payment, closing costs (if you're paying points), and the APR. An unlocked rate means you're seeing a snapshot of today's pricing, not a commitment.",
    expandedWhy: "Interest rates can move significantly in a single day. An unlocked Loan Estimate might look attractive today but could be meaningfully different when you actually lock your rate. If rates rise between when you received the LE and when you lock, your monthly payment and total cost could increase substantially. Additionally, without a locked rate, comparing Loan Estimates between lenders is less reliable.",
    expandedAction: "Ask your lender about rate lock options — lock period (30, 45, or 60 days is common), any cost for the lock, and whether a float-down provision is available. Once you lock, get the confirmation in writing including the locked rate, points, lock expiration date, and the conditions under which the lock could be voided. Keep this document — you'll compare it to your Closing Disclosure."
  },
  {
    flag: "Third-party fees missing",
    detail: "If title insurance, appraisal, or settlement fees are listed as TBD, ask when those will be determined.",
    expandedWhat: "Third-party fees include the appraisal, title search, lender's title insurance, settlement/closing fee, survey, pest inspection, and other services performed by professionals other than the lender. If any of these show 'TBD' or $0 when they should have an estimated amount, the Loan Estimate is incomplete.",
    expandedWhy: "Third-party fees can represent a significant portion of your closing costs — often $2,000-$5,000 or more. If these are left as TBD, you cannot accurately assess the total cost of the loan or compare it to other offers. The TRID rule requires lenders to provide good-faith estimates for all costs, including third-party services.",
    expandedAction: "Request that the lender fill in estimates for all third-party fees. For Section C services (those you can shop for), you can also get your own quotes directly from providers. If the lender says they cannot estimate these fees, ask why — they should have working relationships with providers and access to typical fee ranges for your area."
  },
  {
    flag: "Excessive origination charges",
    detail: "Compare origination fees across lenders. These are negotiable — don't be afraid to ask for a reduction.",
    expandedWhat: "Origination charges (Page 2, Section A) are the lender's own fees for processing, underwriting, and funding your loan. These are separate from discount points (which buy down your rate). Origination charges are the most variable fee across lenders and the most negotiable. They can range from a few hundred dollars to over 1% of the loan amount.",
    expandedWhy: "High origination charges directly increase your closing costs without any corresponding benefit to your loan terms. Unlike discount points (which reduce your rate), origination fees are pure profit for the lender. Paying excessive origination charges means you're overpaying for the same service that a competitor might provide for less.",
    expandedAction: "Compare origination charges across all your Loan Estimates. If one lender is significantly higher, show them the competing estimate and ask them to match or reduce their fees. Many loan officers have the authority to reduce origination charges to win your business. If a lender refuses to negotiate, consider whether their other terms (rate, service quality) justify the premium."
  },
  {
    flag: "No owner's title insurance listed",
    detail: "If owner's title insurance isn't on the estimate, ask about adding it. It's one of the most important protections you can buy.",
    expandedWhat: "Owner's title insurance (Section H on Page 2) protects your ownership rights against defects in the title that existed before you purchased the property — including undiscovered liens, forged documents, recording errors, missing heirs, and fraud. It's a one-time premium paid at closing that protects you for as long as you or your heirs own the property. It's separate from the lender's title insurance (which protects only the lender).",
    expandedWhy: "Without owner's title insurance, you are personally responsible for defending your ownership against any claims. If a previous owner's contractor files a mechanics' lien, if a forged deed is discovered in the chain of title, or if a previously unknown heir claims an interest in the property, you could face legal costs or even lose the property. The lender's title insurance (which you're already paying for) does NOT protect you — it only protects the lender's interest.",
    expandedAction: "If owner's title insurance isn't on the Loan Estimate, ask your lender to add it. You can also contact a title company directly to get a quote. In many areas, you can save by purchasing both the lender's and owner's policies from the same company (called a 'simultaneous issue' discount). Shop for owner's title insurance independently — prices can vary."
  },
];

export default function LoanEstimatePage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

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
          <div className="mb-6 p-4 bg-[#e8f0f5] rounded-2xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1a5276]/15 flex items-center justify-center text-[#1a5276] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your First Official Look at the Numbers</h2>
                <p className="text-sm text-alta-gray leading-relaxed">The Loan Estimate replaced the old Good Faith Estimate (GFE) in 2015 under the CFPB&apos;s TRID rule. Its standardized format makes it easy to compare offers from different lenders. Get at least 3 Loan Estimates before choosing a lender — comparing APRs, not just interest rates. <a href="https://www.consumerfinance.gov/owning-a-home/loan-estimate/" target="_blank" rel="noopener noreferrer" className="text-alta-teal font-medium hover:underline">See a sample Loan Estimate at CFPB.gov</a></p>
              </div>
            </div>
          </div>

          {/* TRID/TILA/RESPA explainer */}
          <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 mb-8">
            <h3 className="font-bold text-alta-navy mb-3">What Are TRID, TILA, and RESPA?</h3>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">You&apos;ll see these acronyms referenced throughout the closing process. Here&apos;s what they mean in plain English:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-white bg-[#1a5276] px-2 py-0.5 rounded shrink-0 mt-0.5">TRID</span>
                <p className="text-sm text-alta-gray leading-relaxed"><strong className="text-alta-navy">TILA-RESPA Integrated Disclosure rule</strong> — A 2015 CFPB regulation that combined two older disclosure forms into the standardized Loan Estimate and Closing Disclosure you&apos;ll receive. It ensures you get clear, consistent information so you can compare lenders and understand your costs before committing.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-white bg-[#2d6b3f] px-2 py-0.5 rounded shrink-0 mt-0.5">TILA</span>
                <p className="text-sm text-alta-gray leading-relaxed"><strong className="text-alta-navy">Truth in Lending Act (1968)</strong> — Requires lenders to clearly disclose the APR, total interest cost, and all loan terms so you can make an informed borrowing decision. This is why your Loan Estimate must show the APR — not just the interest rate.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-white bg-[#5b3a8c] px-2 py-0.5 rounded shrink-0 mt-0.5">RESPA</span>
                <p className="text-sm text-alta-gray leading-relaxed"><strong className="text-alta-navy">Real Estate Settlement Procedures Act (1974)</strong> — Protects you from inflated closing costs and kickback schemes. It gives you the legal right to choose your own title company, requires good-faith cost estimates upfront, and prohibits anyone from receiving a fee for a referral. If someone pressures you to use a specific provider, RESPA is on your side.</p>
              </div>
            </div>
            <p className="text-[10px] text-alta-teal mt-3 font-medium">Source: CFPB Know Before You Owe | 12 CFR 1026 (Regulation Z) | 12 CFR 1024 (Regulation X)</p>
          </div>

          {/* When you'll receive it */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">When You&apos;ll Receive It</h2>
          <p className="text-sm text-alta-gray mb-3">Click any timeline item for more detail on your rights and what to expect.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {timeline.map((t) => (
              <div
                key={t.when}
                className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] shadow-sm tile-interactive cursor-pointer group"
                onClick={() => setActiveModal({
                  title: t.when,
                  gradient: "from-[#1a5276] to-[#154463]",
                  content: t.expandedContent,
                })}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-alta-navy mb-1">{t.when}</p>
                    <p className="text-xs text-alta-gray leading-relaxed">{t.what}</p>
                    <p className="text-[10px] text-alta-teal mt-2 font-medium">Source: {t.source}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span className="text-[10px] text-alta-teal font-medium whitespace-nowrap">Learn more</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Page-by-page breakdown */}
          <h2 className="text-xl font-bold text-alta-navy mb-6">Page-by-Page Breakdown</h2>
          <p className="text-sm text-alta-gray mb-4">Click any section to explore detailed guidance, common errors, and what to do if something looks wrong.</p>
          <div className="space-y-8 mb-10">
            {pages.map((pg) => (
              <div key={pg.page} className="rounded-2xl border border-[#c5d8e4] overflow-hidden shadow-sm tile-interactive">
                <div className={`bg-gradient-to-r ${pg.color} px-5 py-3`}>
                  <h3 className="text-white font-bold">{pg.page}</h3>
                </div>
                <div className="p-5 space-y-5 bg-[#fafcfe]">
                  {pg.sections.map((s) => (
                    <div
                      key={s.name}
                      className="cursor-pointer group rounded-xl p-3 -mx-1 hover:bg-alta-light/50 transition-colors border border-transparent hover:border-gray-200"
                      onClick={() => setActiveModal({
                        title: s.name,
                        gradient: pg.color,
                        content: (
                          <div className="space-y-5 text-sm text-gray-700">
                            <div>
                              <h3 className="font-bold text-[#1a5276] mb-2">What This Section Shows</h3>
                              <p className="leading-relaxed">{s.expandedWhat}</p>
                            </div>
                            <div>
                              <h3 className="font-bold text-[#2d6b3f] mb-2">What to Look For</h3>
                              <p className="leading-relaxed">{s.expandedLookFor}</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                              <h3 className="font-bold text-[#943030] mb-2">Common Errors to Catch</h3>
                              <p className="leading-relaxed">{s.commonErrors}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                              <h3 className="font-bold text-[#1a5276] mb-2">What to Do If You Spot a Problem</h3>
                              <p className="leading-relaxed">{s.whatToDo}</p>
                            </div>
                            <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB TRID Rule; 12 CFR 1026 (Regulation Z)</p>
                          </div>
                        ),
                      })}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-alta-navy text-sm mb-1">{s.name}</h4>
                          <p className="text-sm text-alta-gray leading-relaxed mb-2"><strong>What it shows:</strong> {s.what}</p>
                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                            <p className="text-xs text-amber-800 leading-relaxed"><strong>What to look for:</strong> {s.lookFor}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                          <span className="text-[10px] text-alta-teal font-medium whitespace-nowrap">Learn more</span>
                        </div>
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
          <p className="text-sm text-alta-gray mb-3">Click any red flag for a detailed breakdown of what it means and how to respond.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {redFlags.map((item) => (
              <div
                key={item.flag}
                className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] shadow-sm cursor-pointer group hover:border-red-300 transition-colors tile-interactive"
                onClick={() => setActiveModal({
                  title: item.flag,
                  gradient: "from-[#943030] to-[#7a2020]",
                  content: (
                    <div className="space-y-5 text-sm text-gray-700">
                      <div>
                        <h3 className="font-bold text-[#943030] mb-2">What It Looks Like</h3>
                        <p className="leading-relaxed">{item.expandedWhat}</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                        <h3 className="font-bold text-[#943030] mb-2">Why It&apos;s Dangerous</h3>
                        <p className="leading-relaxed">{item.expandedWhy}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-[#1a5276] mb-2">What to Do</h3>
                        <p className="leading-relaxed">{item.expandedAction}</p>
                      </div>
                      <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB — Know Before You Owe; TRID Rule</p>
                    </div>
                  ),
                })}
              >
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-alta-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-alta-navy">{item.flag}</p>
                    <p className="text-xs text-alta-gray mt-0.5">{item.detail}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span className="text-[10px] text-alta-teal font-medium">Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

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
              <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] tile-interactive text-center">
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
            <p className="text-xs text-alta-gray leading-relaxed">In this example, Lender B has a HIGHER interest rate but a LOWER APR — and saves you $2,600 over 5 years. This is because Lender A&apos;s higher fees offset their lower rate. The APR captures this. Always compare APRs, not just rates.</p>
            <p className="text-[10px] text-alta-teal mt-2 font-medium">Source: CFPB Know Before You Owe</p>
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

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/closing-disclosure" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Disclosure Guide</h3>
                <p className="text-[10px] text-alta-gray mt-1">Review your final loan terms and costs before signing at closing</p>
              </Link>
              <Link href="/mortgage-calculator" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Mortgage Calculator</h3>
                <p className="text-[10px] text-alta-gray mt-1">Calculate your monthly payments including taxes and insurance</p>
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

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setActiveModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className={`bg-gradient-to-r ${activeModal.gradient} px-6 py-5`}>
              <h2 className="text-xl font-bold text-white pr-10">{activeModal.title}</h2>
            </div>
            <div className="p-6">{activeModal.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
