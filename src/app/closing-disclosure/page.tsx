"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const pages = [
  {
    page: "Page 1 — Loan Terms & Costs",
    color: "from-[#1a5276] to-[#154463]",
    sections: [
      {
        name: "Closing Information",
        what: "Date issued, closing date, property address, sale price, and the settlement agent's information.",
        lookFor: "Verify the closing date and property address are correct. Confirm the settlement agent is who you expect — especially if you chose your own title company.",
        expandedWhat: "This section sits at the very top of Page 1. It identifies the transaction with the date the CD was issued, the scheduled closing date, the disbursement date (when funds are sent), the property address, and the sale price. It also identifies the settlement agent (title company or attorney) who will conduct the closing. The file number and property details must match your purchase agreement exactly.",
        expandedLookFor: "Double-check the closing date against your rate lock expiration — if your closing is scheduled after your lock expires, your rate could change. Confirm the disbursement date matches the closing date (in some states, disbursement happens after recording). Verify the sale price matches your executed purchase contract. If there have been any amendments to the contract price, the CD should reflect the most recent agreed-upon price.",
        commonErrors: "Misspelled property address (especially unit numbers in condos), wrong closing date (which throws off prepaid interest calculations), incorrect sale price if the contract was amended after the original agreement, and wrong settlement agent information if the title company changed during the process.",
        whatToDo: "Contact your lender AND your settlement agent/title company immediately. Under the TRID rule, certain changes to the CD (like a changed closing date) may not require a new 3-day waiting period, but you still want corrections made before closing day. Request a revised CD in writing and confirm receipt."
      },
      {
        name: "Transaction Information",
        what: "Names of borrower(s), seller(s), and lender.",
        lookFor: "Check that all names are spelled correctly. Errors here can delay recording of your deed.",
        expandedWhat: "This section identifies every party to the transaction: the borrower(s) (you), the seller(s), and the lender. Names must match exactly as they will appear on the deed, mortgage, and note. If you are purchasing with a spouse or co-borrower, both names should appear. The lender's full legal name is also listed here.",
        expandedLookFor: "Names must match your government-issued ID exactly. If your driver's license says 'Robert' but the CD says 'Bob,' this can cause problems at recording. If you recently changed your name (marriage, divorce), make sure the correct legal name is used. Check that the lender name matches who you applied with — loans are sometimes transferred between closing.",
        commonErrors: "Misspelled borrower names (especially hyphenated or multi-part last names), missing middle names or suffixes (Jr., III), wrong lender name if the loan was transferred to a different entity, and missing co-borrower if both spouses are on the loan.",
        whatToDo: "Any name error must be corrected before closing. The deed and mortgage will be recorded in the county records exactly as they appear on the CD. A misspelled name on a recorded deed can create title problems that require legal correction later. Notify your lender and title company immediately so they can issue a corrected CD."
      },
      {
        name: "Loan Terms",
        what: "Final loan amount, interest rate, monthly principal and interest, whether there's a prepayment penalty or balloon payment.",
        lookFor: "Compare every number to your Loan Estimate. The interest rate should match your locked rate. If anything changed, your lender must explain why.",
        expandedWhat: "This section displays the core terms of your mortgage: the loan amount (total you're borrowing), interest rate, whether the rate is fixed or adjustable, the monthly principal and interest payment, and disclosures about prepayment penalties and balloon payments. For adjustable-rate mortgages, this section indicates whether the amount can increase after closing. Each line item has a 'Can this amount increase after closing?' column.",
        expandedLookFor: "Compare the loan amount to your Loan Estimate — it should be identical unless there was a legitimate changed circumstance (like a lower appraisal). The interest rate must match your rate lock confirmation. If the rate differs, demand an explanation in writing. Check the prepayment penalty box — most conventional loans today do not have one. If it says YES, understand the terms before signing. A balloon payment means you'll owe a large lump sum at the end of the loan — this is rare in standard mortgages.",
        commonErrors: "Loan amount that doesn't match the Loan Estimate (could indicate an unauthorized change), interest rate that differs from the locked rate (the lender may have failed to lock or the lock expired), a prepayment penalty that wasn't disclosed earlier, or an adjustable rate shown when you applied for a fixed rate.",
        whatToDo: "If the interest rate doesn't match your rate lock confirmation, do NOT close until this is resolved. Under TRID, if the APR increases by more than 1/8% for a fixed-rate loan (or 1/4% for an adjustable), a new 3-day waiting period is required. Contact your loan officer and request written confirmation of your locked rate. If the loan terms changed without your consent, you may file a complaint with the CFPB."
      },
      {
        name: "Projected Payments",
        what: "Your estimated total monthly payment broken into principal and interest, mortgage insurance, and estimated escrow.",
        lookFor: "Note the column showing how payments may change over time (especially for adjustable-rate mortgages). Make sure escrow includes both property tax and insurance.",
        expandedWhat: "This section breaks down your total monthly payment into its components: principal and interest, mortgage insurance (if applicable), and estimated escrow (property taxes and homeowner's insurance held by your servicer). For adjustable-rate mortgages or loans with PMI that eventually drops off, there may be multiple columns showing how your payment changes over time (e.g., Years 1-7, Years 8-30).",
        expandedLookFor: "Verify the mortgage insurance amount matches what your lender quoted. If you're putting less than 20% down on a conventional loan, PMI should appear here. Check that the escrow estimate is reasonable — you can estimate property taxes yourself by checking your county assessor's website. Make sure homeowner's insurance is included in escrow unless you're paying it separately. The 'Estimated Total Monthly Payment' at the bottom is what you'll actually pay each month.",
        commonErrors: "Missing mortgage insurance when it should be included (under 20% down on conventional), escrow amount that doesn't include property taxes or insurance, projected payments that don't show how an adjustable rate will change over time, and estimated taxes based on vacant land value rather than the improved property value.",
        whatToDo: "If the projected payment is higher than expected, identify which component increased. If escrow seems too high, ask your servicer for the property tax and insurance figures they used. If PMI is missing but you're putting less than 20% down, ask why — it may mean a lender-paid MI structure with a higher rate. Request an itemized breakdown if anything is unclear."
      },
      {
        name: "Costs at Closing",
        what: "Total closing costs and the cash you need to close (or cash back if applicable).",
        lookFor: "Compare this to Page 1 of your Loan Estimate. If closing costs increased significantly, ask why. Some fees have tolerance limits — they can't increase beyond certain thresholds.",
        expandedWhat: "This summary section at the bottom of Page 1 shows two critical numbers: your total closing costs (detailed on Page 2) and the total cash needed to close (closing costs plus down payment minus deposits and credits). The 'Cash to Close' figure is the amount you'll need to wire or bring as a cashier's check to the closing table.",
        expandedLookFor: "Compare total closing costs to your Loan Estimate. Under TRID tolerance rules: zero-tolerance fees (origination charges, transfer taxes) cannot increase at all; 10%-tolerance fees (title services selected by the lender, recording fees) can increase up to 10% in aggregate; no-tolerance fees (services you shopped for, insurance) have no cap. If zero-tolerance fees increased, the lender must cure (refund) the overage at or after closing.",
        commonErrors: "Closing costs that exceed TRID tolerance limits without a valid changed circumstance, cash to close that doesn't account for your earnest money deposit, missing lender credits that were promised, and fees that appeared on the CD but weren't on the Loan Estimate.",
        whatToDo: "If closing costs increased beyond tolerance limits, notify your lender in writing and cite the TRID fee tolerance rules. The lender is required to refund (cure) any amount that exceeds the applicable tolerance. If new fees appeared that weren't on the Loan Estimate, ask for an explanation — they may only be added if there's a valid changed circumstance (like a change in the loan program). Verify your wire amount with your title company BY PHONE before sending any funds."
      },
    ],
  },
  {
    page: "Page 2 — Closing Cost Details",
    color: "from-[#2d6b3f] to-[#235532]",
    sections: [
      {
        name: "Loan Costs",
        what: "Origination charges, points, and services required by the lender (appraisal, credit report, flood determination, tax monitoring, title services).",
        lookFor: "Compare every line to your Loan Estimate. Zero-tolerance fees (origination, transfer taxes) CANNOT increase. 10%-tolerance fees (title services, recording) can increase up to 10% in aggregate.",
        expandedWhat: "Section A covers origination charges — the lender's own fees for processing, underwriting, and funding your loan. This includes any discount points you elected to pay (each point = 1% of the loan amount) to buy down your interest rate. Section B lists services the lender requires that you cannot shop for — typically the appraisal fee, credit report, flood certification, and tax service fee. Section C lists services the lender requires but that you were allowed to shop for — typically title-related services like the title search, lender's title insurance, and settlement/closing fee.",
        expandedLookFor: "Origination charges (Section A) are zero-tolerance — they cannot increase from the Loan Estimate. If you're paying discount points, verify the math: 1 point = 1% of the loan amount. Section B fees are also zero-tolerance if the lender selected the provider, or 10% tolerance in aggregate if the lender allowed you to shop. Section C fees have no tolerance limit if you selected your own provider — but if you used the lender's suggested provider, they fall under the 10% aggregate tolerance.",
        commonErrors: "Origination fee increased from the Loan Estimate (TRID violation — lender must cure), discount points calculated on the wrong loan amount, appraisal fee higher than quoted, services listed in the wrong section (affecting tolerance category), and fees for services never discussed or authorized.",
        whatToDo: "Document every fee that increased from the Loan Estimate. For zero-tolerance violations, the lender must cure the difference — you can request this in writing citing 12 CFR 1026.19(f)(2)(v). For 10% aggregate tolerance violations, add up all fees in that category on the LE vs. CD. If the total increased by more than 10%, the lender owes you the excess. Keep copies of both your LE and CD for your records."
      },
      {
        name: "Other Costs",
        what: "Government recording fees, transfer taxes, prepaids (homeowner's insurance, mortgage insurance, prepaid interest, property taxes), initial escrow deposit, and owner's title insurance.",
        lookFor: "Make sure owner's title insurance is included. Verify the prepaid interest calculation — it should cover from your closing date to the end of that month. Check that your homeowner's insurance premium matches your policy.",
        expandedWhat: "Section E covers government recording fees and transfer taxes — these are charged by your local government to record the deed and mortgage. Section F lists prepaids — expenses you pay upfront at closing: homeowner's insurance premium (typically 12 months), prepaid daily interest (from closing date to the end of that month), and property tax prepaids if applicable. Section G details your initial escrow deposit — the reserves your servicer collects to fund your escrow account. Section H includes owner's title insurance and any other optional costs.",
        expandedLookFor: "Transfer taxes (Section E) are zero-tolerance — they cannot increase. Verify the prepaid interest calculation: your daily interest rate (annual rate / 365) times the number of days from closing to month-end. Check that the homeowner's insurance premium matches your actual policy. The initial escrow deposit (Section G) should show the number of months collected for each item — RESPA limits the cushion to 2 months beyond what's needed. Owner's title insurance (Section H) is technically optional but strongly recommended — it protects your ownership rights for the life of the policy.",
        commonErrors: "Prepaid interest calculated using the wrong rate or wrong number of days, homeowner's insurance premium that doesn't match your policy, initial escrow deposit collecting more months than RESPA allows, transfer taxes that increased from the Loan Estimate (zero-tolerance violation), and missing owner's title insurance.",
        whatToDo: "Verify your prepaid interest by calculating it yourself: (loan amount x interest rate / 365) x number of days remaining in the closing month. If the insurance premium doesn't match your policy, contact your insurance agent. If the initial escrow deposit seems excessive, ask your servicer for an itemized escrow analysis showing each line item and the number of months collected. RESPA limits the cushion to 2 months — anything beyond that is a violation."
      },
    ],
  },
  {
    page: "Page 3 — Cash to Close & Summary",
    color: "from-[#8b6914] to-[#705410]",
    sections: [
      {
        name: "Calculating Cash to Close",
        what: "Side-by-side comparison of your Loan Estimate vs. the final Closing Disclosure amounts, showing exactly what changed and why.",
        lookFor: "This is the most important comparison on the entire document. If any 'Did this change?' column says 'YES,' read the explanation carefully. You have the right to question any increase.",
        expandedWhat: "This table compares every component of your cash to close from the Loan Estimate to the final Closing Disclosure: total closing costs, closing costs paid before closing, closing costs financed, down payment, deposit (earnest money), funds for borrower, seller credits, and adjustments. Each row has a 'Did this change?' column. If YES, the final column explains why. This section is the single most important reconciliation tool on the entire CD.",
        expandedLookFor: "Go row by row. If closing costs increased, cross-reference with Page 2 to identify which specific fees changed. Verify your earnest money deposit is credited correctly. If seller credits changed, check your purchase agreement addenda. The 'Adjustments and Other Credits' line can include prorated property taxes, HOA dues, and other items — verify these match your contract terms. The final 'Cash to Close' number is what you need to bring.",
        commonErrors: "Earnest money deposit not credited (or credited at the wrong amount), seller concessions missing or reduced from what was agreed in the purchase contract, closing costs that increased without explanation, down payment amount that doesn't match your agreement, and adjustments that don't reflect contract terms.",
        whatToDo: "If any row changed without explanation, contact your lender before closing. Have your original Loan Estimate, purchase agreement, and any contract amendments ready. For seller concessions that were reduced, contact your real estate agent to confirm what was agreed. If your cash to close increased significantly, determine which component drove the change and whether it's within TRID tolerance limits. Do not wire funds until you've verified the final cash-to-close amount with your title company by phone."
      },
      {
        name: "Summaries of Transactions",
        what: "Detailed accounting of the buyer's and seller's transactions — every credit, debit, adjustment, and proration.",
        lookFor: "Verify your earnest money deposit is credited. Check that any seller concessions appear. Make sure prorated property taxes are calculated correctly based on your closing date.",
        expandedWhat: "The Borrower's Transaction section lists everything you owe (sale price, closing costs) and everything credited to you (deposit, loan amount, seller credits). The difference is what you bring to closing. The Seller's Transaction section shows the sale price as a credit and deducts the seller's costs (their mortgage payoff, commissions, closing costs, credits to you). Prorations for property taxes and HOA dues appear in both columns, calculated based on the closing date.",
        expandedLookFor: "Verify the sale price matches your contract. Confirm your earnest money deposit appears as a credit to you. Check that the loan amount matches Page 1. If the seller agreed to pay any of your closing costs, verify the amount matches your purchase agreement. Property tax prorations should be calculated from the closing date — if you close mid-year, the seller owes taxes for their period of ownership and you owe taxes for yours. If the property has HOA dues, verify the proration is accurate.",
        commonErrors: "Earnest money deposit missing or incorrect, property tax prorations calculated using the wrong rate or wrong period, seller concessions that don't match the purchase agreement, HOA prorations based on incorrect dues amount, and adjustments for items not addressed in the contract.",
        whatToDo: "Compare every line to your purchase agreement and any amendments. If the earnest money is wrong, contact your title company with proof of deposit (receipt or wire confirmation). For property tax proration disputes, ask the title company for the tax rate and calculation method they used. Many states prorate based on the current year's actual tax bill if available, or the prior year's bill if the current year hasn't been assessed yet. If any seller credits are missing, your real estate agent should intervene."
      },
    ],
  },
  {
    page: "Page 4 — Additional Information",
    color: "from-[#5b3a8c] to-[#482d70]",
    sections: [
      {
        name: "Loan Disclosures",
        what: "Whether the loan allows assumption, has a demand feature, whether the lender will service the loan or transfer servicing, and escrow account details.",
        lookFor: "If 'Transfer of servicing' is likely, your loan payments may go to a different company after closing. This is normal — your loan terms don't change.",
        expandedWhat: "This section discloses key loan features: Assumption (whether someone else can take over your loan), Demand Feature (whether the lender can demand full repayment before the term ends), Late Payment policy (grace period and fee amount), Negative Amortization (whether your balance can grow), Partial Payments (whether the servicer accepts partial payments), Escrow Account (whether you have one and what it covers), and Security Interest (the property securing the loan).",
        expandedLookFor: "Most conventional and government loans are NOT assumable (FHA and VA loans are an exception). A 'Demand Feature' should be NO for standard mortgages. Check the late payment terms — most loans have a 15-day grace period, after which a fee (typically 4-5% of the payment) applies. If 'Negative Amortization' is YES, your balance can grow even while making payments — this is a significant risk flag. Verify your escrow account covers property taxes AND homeowner's insurance.",
        commonErrors: "Escrow account that doesn't cover all expected items (taxes and insurance should both be included unless you waived escrow), late payment terms that differ from what was disclosed, negative amortization flag on a standard fixed-rate mortgage (should always be NO), and partial payment policy that's more restrictive than expected.",
        whatToDo: "If the demand feature says YES on a standard mortgage, ask your lender to explain — this is unusual and could mean the lender can call the loan due at any time. If negative amortization says YES on what you thought was a standard fixed-rate mortgage, stop and consult with your real estate attorney before closing. If you expected an escrow waiver but the CD shows an escrow account (or vice versa), clarify with your lender."
      },
      {
        name: "Adjustable Rate / Interest Rate Table",
        what: "For adjustable-rate mortgages: the index, margin, adjustment schedule, caps on rate and payment changes.",
        lookFor: "If you have an adjustable rate, understand when your first adjustment happens and the maximum your rate and payment can increase per adjustment and over the life of the loan.",
        expandedWhat: "This section only applies if you have an adjustable-rate mortgage (ARM). It discloses the index your rate is tied to (commonly the Secured Overnight Financing Rate, or SOFR), the margin added to the index to determine your rate, the initial interest rate, the minimum and maximum interest rate, when the first rate change occurs, how often it adjusts after that, and the per-adjustment and lifetime caps on rate and payment changes.",
        expandedLookFor: "Understand your rate adjustment structure. For example, a 5/1 ARM adjusts after 5 years, then annually. The caps are typically expressed as initial/periodic/lifetime (e.g., 2/2/5 means the rate can increase up to 2% at the first adjustment, up to 2% at each subsequent adjustment, and up to 5% over the life of the loan). Calculate your worst-case monthly payment using the maximum rate to make sure you can afford it. Compare the index and margin to your Loan Estimate — they should match.",
        commonErrors: "Index or margin that doesn't match the Loan Estimate, rate caps that are less favorable than originally quoted, first adjustment date that doesn't match the ARM term you agreed to (e.g., adjusting after 3 years when you thought you had a 5/1 ARM), and a maximum rate that would make the loan unaffordable.",
        whatToDo: "If any ARM terms differ from your Loan Estimate, do not close until they are corrected. Calculate your maximum possible monthly payment using the lifetime cap rate to ensure you can afford it. If the ARM terms are not acceptable, ask about converting to a fixed-rate mortgage before closing — you may still have time. Document everything in writing."
      },
    ],
  },
  {
    page: "Page 5 — Loan Calculations & Contact Info",
    color: "from-[#943030] to-[#7a2020]",
    sections: [
      {
        name: "Loan Calculations",
        what: "Total of payments over the life of the loan, finance charge (total interest plus fees), amount financed, and Annual Percentage Rate (APR).",
        lookFor: "The 'Total of Payments' number can be eye-opening — it shows the true cost of your loan including all interest. Use this to understand the long-term impact of your interest rate.",
        expandedWhat: "This section shows four key calculations required by the Truth in Lending Act (TILA): 'Total of Payments' is the total amount you'll pay over the life of the loan (all monthly payments added together). 'Finance Charge' is the total dollar cost of borrowing (interest plus certain fees). 'Amount Financed' is the loan amount minus prepaid finance charges. 'Annual Percentage Rate (APR)' is the true annual cost of borrowing expressed as a percentage, including fees — this is always higher than your interest rate because it factors in costs.",
        expandedLookFor: "The Total of Payments on a 30-year mortgage is typically 1.5 to 2.5 times the original loan amount — this is normal but eye-opening. Compare the APR to your interest rate: a large gap between the two indicates high fees. The APR is the best single number for comparing the true cost across different lenders. If the APR increased by more than 1/8% (for a fixed-rate loan) from the Loan Estimate, a new 3-day waiting period is triggered under TRID.",
        commonErrors: "APR that increased beyond TRID tolerance without triggering a new waiting period (1/8% for fixed, 1/4% for adjustable), Total of Payments that seems unreasonably high (could indicate calculation error), and Finance Charge that doesn't align with the loan terms.",
        whatToDo: "If the APR increased significantly from your Loan Estimate, ask why. If it exceeded the tolerance threshold, your lender must provide a new 3-day waiting period. Use the Total of Payments to understand your long-term cost — if it concerns you, discuss options like a shorter loan term (15 or 20 years) or making extra principal payments. Keep in mind these calculations assume you keep the loan for its full term."
      },
      {
        name: "Other Disclosures",
        what: "Appraisal information, contract details, and whether you can receive a copy of the appraisal.",
        lookFor: "You have the right to receive a copy of your appraisal at least 3 days before closing. If you haven't received it, ask.",
        expandedWhat: "This section covers additional disclosures required by federal law: your right to receive a copy of the appraisal (the lender must provide it at least 3 business days before closing, per the Equal Credit Opportunity Act), whether the contract includes a liability after foreclosure provision (deficiency judgment), and whether the loan is secured by the property.",
        expandedLookFor: "Confirm you received a copy of the appraisal. Review it for accuracy — check comparable sales, the appraiser's condition assessment, and whether the appraised value supports the sale price. If the appraisal came in low, your options include renegotiating the price, bringing additional cash to closing, or requesting a reconsideration of value. Check the 'Liability after Foreclosure' section — in non-recourse states, you generally won't owe a deficiency if the home is foreclosed, but in recourse states, the lender may pursue you for the difference.",
        commonErrors: "Appraisal not provided to the borrower before closing (violation of federal law), incorrect property details in the appraisal (wrong square footage, bedroom count), and liability disclosures that don't match your state's foreclosure laws.",
        whatToDo: "If you haven't received the appraisal at least 3 days before closing, request it immediately from your lender — this is your legal right under the Equal Credit Opportunity Act. If the appraisal contains errors about the property, notify your lender and request a reconsideration of value or appraisal correction."
      },
      {
        name: "Contact Information",
        what: "Complete contact details and licensing information for the lender, mortgage broker, real estate agents, and settlement agent.",
        lookFor: "Verify your settlement agent/title company is correct. If you're filing a complaint later, this is where you'll find the licensing numbers you need.",
        expandedWhat: "This table lists the name, address, licensing ID (NMLS for lenders and loan officers, state license for settlement agents), contact person, email, and phone number for every professional involved: the lender, mortgage broker (if any), your real estate agent, the seller's real estate agent, and the settlement agent/title company. Under TRID, this information is required on every Closing Disclosure.",
        expandedLookFor: "Verify your settlement agent/title company is the one you selected (or agreed to). If you chose your own title company under your RESPA rights, make sure a different company wasn't substituted. Record the NMLS numbers — you can verify any mortgage professional's license at nmlsconsumeraccess.org. If you later need to file a complaint about any party, you'll need the licensing information from this section.",
        commonErrors: "Wrong settlement agent listed (different from what was agreed), missing NMLS numbers for the loan officer, incorrect real estate agent information, and broker listed when there was no broker involved (or vice versa).",
        whatToDo: "If the settlement agent is wrong, contact your lender and real estate agent immediately — under RESPA, you have the right to choose your own title company and no one can require you to use a specific provider. Verify all licensing numbers are present and correct. Save this page for your records — you may need these contacts and licensing numbers in the future."
      },
      {
        name: "Confirm Receipt",
        what: "A signature line confirming you received the Closing Disclosure. This does NOT commit you to the loan — it only confirms receipt.",
        lookFor: "Signing here does NOT mean you agree to the terms. You still have time to review and ask questions before the closing appointment.",
        expandedWhat: "The Confirm Receipt section contains a signature line and date where you acknowledge that you received the Closing Disclosure. This is critically important to understand: signing this line does NOT mean you agree to the loan terms, it does NOT mean you are committed to closing, and it does NOT waive any of your rights. It simply confirms receipt of the document, which starts the 3-business-day review period required by TRID.",
        expandedLookFor: "Make sure you understand what you're signing — receipt confirmation only. The 3-business-day review period begins when you receive the CD (not when you sign it). During this period, you can ask questions, request corrections, negotiate changes, or even walk away from the transaction (though you may lose your earnest money depending on your contract terms and contingencies).",
        commonErrors: "Borrowers sometimes believe signing the receipt confirmation commits them to the loan — it does not. Some settlement agents may pressure you to sign quickly — you are not required to sign on the spot. In some cases, the CD is delivered electronically and consent to electronic delivery may be treated as receipt confirmation.",
        whatToDo: "Sign the receipt confirmation promptly so your 3-day review period begins. Use the full 3 days to review the document carefully. If you find errors, report them to your lender immediately — some corrections can be made without restarting the 3-day period. If a significant change occurs (APR increase beyond tolerance, prepayment penalty added, or loan product change), a new CD and new 3-day period are required."
      },
    ],
  },
];

const reviewSteps = [
  {
    step: "1",
    title: "Day 1: Compare to Your Loan Estimate",
    action: "Put your Loan Estimate and Closing Disclosure side by side. Check: interest rate, loan amount, monthly payment, and total closing costs. Flag any differences.",
    color: "bg-blue-50 border-blue-200",
    gradient: "from-[#1a5276] to-[#154463]",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#1a5276] mb-2">How to Do This Comparison</h3>
          <p className="leading-relaxed">Place your Loan Estimate (LE) and Closing Disclosure (CD) side by side — either print both or open them on screen simultaneously. Start with Page 1 of each document.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#1a5276] mb-2">Key Numbers to Compare</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Loan Amount:</strong> Should be identical unless there was a changed circumstance</li>
            <li><strong>Interest Rate:</strong> Must match your rate lock confirmation</li>
            <li><strong>Monthly P&I Payment:</strong> Should follow directly from the loan amount and rate</li>
            <li><strong>Total Closing Costs:</strong> Check against tolerance categories (Page 2)</li>
            <li><strong>Cash to Close:</strong> Compare the final number and identify what changed</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#1a5276] mb-2">What to Flag</h3>
          <p className="leading-relaxed">Any difference — no matter how small — should be noted and investigated. Even a $50 fee increase matters because it may signal a pattern. Create a written list of every discrepancy to discuss with your lender.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB TRID Rule — Loan Estimate to Closing Disclosure comparison requirements</p>
      </div>
    ),
  },
  {
    step: "2",
    title: "Day 1: Check the tolerance categories",
    action: "Zero-tolerance fees (origination, transfer taxes) CANNOT have increased. If they did, your lender owes you a refund. 10%-tolerance fees can increase up to 10% in aggregate. Note any increases.",
    color: "bg-green-50 border-green-200",
    gradient: "from-[#2d6b3f] to-[#235532]",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">Zero-Tolerance Fees (Cannot Increase At All)</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Lender origination charges</li>
            <li>Discount points</li>
            <li>Transfer taxes (government recording fees in some categories)</li>
            <li>Fees paid to an affiliate of the lender</li>
            <li>Fees for services where the lender did not allow you to shop</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">10% Aggregate Tolerance</h3>
          <p className="leading-relaxed">Services you could shop for but used a lender-suggested provider, and recording fees — these can increase, but the TOTAL increase across all 10%-tolerance fees combined cannot exceed 10% of the LE estimate.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">No Tolerance Limit</h3>
          <p className="leading-relaxed">Services you shopped for and selected your own provider, prepaid interest, property insurance premiums, and initial escrow deposits.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#2d6b3f] mb-2">What Happens if Tolerances Are Exceeded</h3>
          <p className="leading-relaxed">The lender must cure (refund) any amount that exceeds the applicable tolerance. The cure must be provided to you no later than 60 calendar days after closing. If the lender does not cure the violation, you can file a complaint with the CFPB.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: 12 CFR 1026.19(f)(2)(v) — TRID fee tolerance requirements</p>
      </div>
    ),
  },
  {
    step: "3",
    title: "Day 2: Verify your personal details",
    action: "Check: your name spelling, property address, loan term, rate lock status, and that your earnest money deposit appears as a credit. Errors here can delay recording.",
    color: "bg-amber-50 border-amber-200",
    gradient: "from-[#8b6914] to-[#705410]",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#8b6914] mb-2">Personal Details Checklist</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Full legal name(s):</strong> Must match your government-issued ID exactly</li>
            <li><strong>Property address:</strong> Including unit/apt number if applicable</li>
            <li><strong>Closing date:</strong> Matches your agreement and rate lock expiration</li>
            <li><strong>Loan term:</strong> 30-year, 15-year, etc. — matches your application</li>
            <li><strong>Interest rate:</strong> Matches your rate lock confirmation</li>
            <li><strong>Earnest money deposit:</strong> Listed as a credit on Page 3</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#8b6914] mb-2">Why Name Accuracy Matters</h3>
          <p className="leading-relaxed">The deed and mortgage are recorded with the county under the names shown on the CD. A misspelled name can create title defects that are expensive and time-consuming to correct later. This includes middle names, suffixes (Jr., Sr., III), and hyphenated names.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#8b6914] mb-2">Rate Lock Verification</h3>
          <p className="leading-relaxed">Pull up your rate lock confirmation email or document. Verify the rate, points, lock expiration date, and loan program match the CD exactly. If your lock expired before closing, the lender may have re-locked at a different rate — they should have notified you.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB — Know Before You Owe</p>
      </div>
    ),
  },
  {
    step: "4",
    title: "Day 2: Review the cash to close",
    action: "Verify the total cash you need at closing. This should match your funds. Confirm wire transfer amount and instructions BY PHONE — not email.",
    color: "bg-purple-50 border-purple-200",
    gradient: "from-[#5b3a8c] to-[#482d70]",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#5b3a8c] mb-2">Verifying Your Cash to Close</h3>
          <p className="leading-relaxed">The cash-to-close figure on Page 3 is the amount you need to bring. Break it down: down payment + closing costs - earnest money deposit - seller credits - lender credits = cash to close. Verify each component matches your expectations.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#5b3a8c] mb-2">Wire Fraud Prevention</h3>
          <p className="leading-relaxed mb-2">Wire fraud is one of the fastest-growing crimes in real estate. Criminals intercept emails and send fake wire instructions that redirect your closing funds to their accounts.</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>ALWAYS confirm wire instructions by calling your title company at a number you independently verified (not from the email)</li>
            <li>NEVER change wire instructions based on an email — even if it looks like it came from your title company</li>
            <li>Be suspicious of any last-minute changes to wiring details</li>
            <li>If you wire funds to the wrong account, contact your bank immediately — you may have a brief window to recall the wire</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#5b3a8c] mb-2">Payment Methods</h3>
          <p className="leading-relaxed">Most closings require a wire transfer or cashier's check. Personal checks are generally not accepted for closing funds. Ask your title company which methods they accept and any deadlines for receiving funds. Many title companies require funds to arrive the business day before closing.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: FBI IC3 — Real estate wire fraud advisories</p>
      </div>
    ),
  },
  {
    step: "5",
    title: "Day 3: Ask questions before closing",
    action: "Contact your lender and settlement agent about ANYTHING you don't understand. Don't wait until the closing table — it's much harder to correct issues after you've signed.",
    color: "bg-red-50 border-red-200",
    gradient: "from-[#943030] to-[#7a2020]",
    expandedContent: (
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-bold text-[#943030] mb-2">Who to Contact and When</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Loan terms, rates, or fees:</strong> Contact your loan officer or lender</li>
            <li><strong>Title, escrow, or settlement charges:</strong> Contact your settlement agent/title company</li>
            <li><strong>Contract terms, credits, or prorations:</strong> Contact your real estate agent</li>
            <li><strong>Insurance questions:</strong> Contact your homeowner's insurance agent</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#943030] mb-2">What to Ask About</h3>
          <p className="leading-relaxed">Any fee you don't recognize, any number that changed from the Loan Estimate, any term you don't understand, and anything you're uncomfortable with. There are no bad questions when you're about to sign a mortgage. Write your questions down and bring them to the closing appointment.</p>
        </div>
        <div>
          <h3 className="font-bold text-[#943030] mb-2">Your Right to Delay</h3>
          <p className="leading-relaxed">You have the legal right to take the full 3 business days. If you feel pressured to close before you're comfortable, push back. If there are unresolved errors on the CD, you can request a corrected document. Certain corrections trigger a new 3-day period (APR increase beyond tolerance, added prepayment penalty, or loan product change). Other corrections can be made without restarting the clock.</p>
        </div>
        <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB TRID Rule — 3-business-day review period</p>
      </div>
    ),
  },
];

export default function ClosingDisclosurePage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

  return (
    <>
      <PageHero
        title="Understanding Your Closing Disclosure"
        subtitle="The Closing Disclosure is a 5-page form you'll receive at least 3 business days before closing. It contains the final terms of your mortgage and every cost you'll pay."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Closing Disclosure", href: "/closing-disclosure" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-[#f5e8e8] rounded-2xl border border-[#e4c5c5] border-l-4 border-l-[#943030] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#943030]/15 flex items-center justify-center text-[#943030] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">The Most Important Document You&apos;ll Read Before Signing</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Under the CFPB&apos;s TRID rule, your lender must deliver this form at least 3 business days before closing. Use that time to compare it line-by-line with your Loan Estimate. If anything looks wrong, contact your lender and settlement agent BEFORE closing day. <a href="https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" target="_blank" rel="noopener noreferrer" className="text-alta-teal font-medium hover:underline">See the CFPB&apos;s annotated Closing Disclosure</a></p>
              </div>
            </div>
          </div>

          {/* 3-day rule */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              <div>
                <p className="text-sm font-bold text-alta-navy mb-1">The 3-Business-Day Rule</p>
                <p className="text-xs text-alta-gray leading-relaxed">Federal law requires you to receive the Closing Disclosure at least 3 business days before closing. If there are certain changes after delivery (APR increases by more than 1/8%, a prepayment penalty is added, or the loan product changes), a new 3-day waiting period begins. This is your protection — use the time to review every number carefully.</p>
                <p className="text-[10px] text-alta-teal mt-2 font-medium">Source: CFPB TRID Rule</p>
              </div>
            </div>
          </div>

          {/* Page breakdown */}
          <h2 className="text-xl font-bold text-alta-navy mb-6">Page-by-Page Breakdown</h2>
          <p className="text-sm text-alta-gray mb-4">Click any section to explore detailed guidance, common errors, and what to do if something looks wrong.</p>
          <div className="space-y-6 mb-10">
            {pages.map((pg) => (
              <div key={pg.page} className="rounded-2xl border border-[#c5d8e4] overflow-hidden shadow-sm tile-interactive">
                <div className={`bg-gradient-to-r ${pg.color} px-5 py-3`}>
                  <h3 className="text-white font-bold text-sm">{pg.page}</h3>
                </div>
                <div className="p-5 space-y-4 bg-[#fafcfe]">
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
                          <p className="text-xs text-alta-gray leading-relaxed mb-2"><strong>What it shows:</strong> {s.what}</p>
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

          {/* Comparison checklist */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Loan Estimate vs. Closing Disclosure: What to Compare</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gray-100 rounded-xl overflow-hidden">
              <thead className="bg-alta-navy text-white">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">Item</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">Can It Increase?</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">Tolerance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Lender origination charges</td><td className="px-4 py-2.5 text-red-600 font-medium">No</td><td className="px-4 py-2.5 text-alta-gray">Zero tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Discount points</td><td className="px-4 py-2.5 text-red-600 font-medium">No</td><td className="px-4 py-2.5 text-alta-gray">Zero tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Transfer taxes</td><td className="px-4 py-2.5 text-red-600 font-medium">No</td><td className="px-4 py-2.5 text-alta-gray">Zero tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Title services (lender-selected)</td><td className="px-4 py-2.5 text-amber-600 font-medium">Up to 10%</td><td className="px-4 py-2.5 text-alta-gray">10% aggregate tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Recording fees</td><td className="px-4 py-2.5 text-amber-600 font-medium">Up to 10%</td><td className="px-4 py-2.5 text-alta-gray">10% aggregate tolerance</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Title services (you chose)</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">No tolerance limit</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Owner&apos;s title insurance</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">No tolerance limit (you shopped)</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Prepaid interest</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">Depends on closing date</td></tr>
                <tr className="hover:bg-alta-light/50"><td className="px-4 py-2.5 font-medium text-alta-navy">Homeowner&apos;s insurance</td><td className="px-4 py-2.5 text-green-600 font-medium">No limit</td><td className="px-4 py-2.5 text-alta-gray">You chose the provider</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-alta-gray mb-1">If a zero-tolerance fee increased, your lender must cure (refund) the difference at or after closing.</p>
          <p className="text-[10px] text-alta-teal font-medium mb-8">Source: CFPB TRID Rule — fee tolerance categories</p>

          {/* 5-step review process */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Your 5-Step Closing Disclosure Review Process</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">You have 3 business days. Use them wisely. Follow this process to catch errors before they cost you money. Click any step for detailed guidance.</p>
          <div className="space-y-3 mb-8">
            {reviewSteps.map((s) => (
              <div
                key={s.step}
                className={`p-4 ${s.color} rounded-xl border tile-interactive flex gap-3 items-start cursor-pointer group`}
                onClick={() => setActiveModal({
                  title: s.title,
                  gradient: s.gradient,
                  content: s.expandedContent,
                })}
              >
                <span className="w-7 h-7 rounded-full bg-alta-navy text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-alta-navy">{s.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{s.action}</p>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <span className="text-[10px] text-alta-teal font-medium whitespace-nowrap">Learn more</span>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/loan-estimate" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Understanding Your Loan Estimate
            </Link>
            <Link href="/document-checklist" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Document Checklist
            </Link>
            <Link href="/closing-process/closing-costs" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Closing Costs Calculator
            </Link>
          </div>

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/loan-estimate" className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Understanding Your Loan Estimate</h3>
                <p className="text-[10px] text-alta-gray mt-1">Learn how to read and compare Loan Estimates from multiple lenders</p>
              </Link>
              <Link href="/escrow-guide" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Escrow Guide</h3>
                <p className="text-[10px] text-alta-gray mt-1">How escrow accounts work and what your monthly payments cover</p>
              </Link>
              <Link href="/closing-process/closing-costs" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Calculator</h3>
                <p className="text-[10px] text-alta-gray mt-1">Estimate your total closing costs and understand each line item</p>
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
