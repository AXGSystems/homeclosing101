"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import TrustedALTAMembers from "@/components/TrustedALTAMembers";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import MiniQuiz from "@/components/MiniQuiz";
import SponsorTip from "@/components/SponsorTip";

const escrowQuiz = [
  {
    q: "What is the primary purpose of an escrow account during a real estate transaction?",
    choices: [
      "To help the buyer get a lower interest rate",
      "To hold funds and documents from a neutral third party until all conditions are met",
      "To guarantee the home passes inspection",
      "To speed up the closing timeline"
    ],
    answer: 1,
    explanation: "An escrow account is managed by a neutral third party (the escrow agent) who holds funds, documents, and instructions until all conditions of the purchase agreement are satisfied — protecting both the buyer and seller."
  },
  {
    q: "After closing, your mortgage escrow account typically pays for which of the following?",
    choices: [
      "Your monthly principal and interest",
      "HOA dues and utilities",
      "Property taxes and homeowners insurance",
      "Home repairs and maintenance"
    ],
    answer: 2,
    explanation: "After closing, lenders commonly require an escrow account to collect and pay property taxes and homeowners insurance premiums on your behalf, ensuring these critical bills are never missed."
  },
  {
    q: "What is 'earnest money' in the context of escrow?",
    choices: [
      "The lender's origination fee",
      "A good-faith deposit from the buyer showing serious intent to purchase",
      "The seller's share of closing costs",
      "A government tax on real estate transactions"
    ],
    answer: 1,
    explanation: "Earnest money is a deposit (typically 1-3% of the purchase price) placed into escrow when the purchase agreement is signed. It demonstrates the buyer's good faith and is applied toward the down payment or closing costs at closing."
  }
];

const phases = [
  {
    phase: "Phase 1: Transaction Escrow (Before Closing)",
    color: "from-[#1a5276] to-[#154463]",
    items: [
      {
        title: "Earnest Money Deposit",
        desc: "When your offer is accepted, you deposit earnest money (typically 1-3% of the purchase price) into an escrow account held by the title company or attorney. This shows the seller you're serious. The money is held safely by a neutral third party — it doesn't go directly to the seller.",
        expandedExplanation: "Earnest money (also called a 'good faith deposit') is your financial commitment to the transaction. The typical range is 1-3% of the purchase price, though this varies by market — in competitive markets, sellers may expect higher deposits. The funds are deposited into a separate, insured escrow account maintained by the escrow agent (title company, settlement agent, or real estate attorney). Under ALTA Best Practices, escrow agents must maintain these accounts separately from their operating funds, carry fidelity bonds, and perform regular reconciliations. The deposit is typically due within 1-5 business days after the purchase agreement is signed, though your contract specifies the exact timeframe.",
        commonQuestions: "How much earnest money should I put down? There's no legal minimum — it's negotiated between buyer and seller. More earnest money signals a stronger commitment and can make your offer more competitive. Can I use a personal check? Many title companies accept personal checks for the earnest money deposit, but some prefer cashier's checks or wire transfers. Ask your title company about accepted payment methods. Is my earnest money at risk? Your earnest money is protected by the contingencies in your purchase agreement (inspection, financing, appraisal). If you exercise a valid contingency, you should receive a full refund.",
        watchFor: "Make sure you know the exact deposit deadline in your purchase contract — missing it could jeopardize your deal. Verify the escrow agent's wire instructions by phone (not email) to avoid wire fraud. Confirm that the escrow agent is licensed and carries errors and omissions insurance. Ask for a receipt confirming your deposit was received and deposited into the escrow account."
      },
      {
        title: "Who Holds the Funds?",
        desc: "The escrow agent is typically the title company, settlement agent, or real estate attorney handling your closing. They have a fiduciary duty to both parties and must follow strict rules about how escrow funds are handled — including maintaining separate, insured accounts and performing regular reconciliations (ALTA Best Practices Pillar 2).",
        expandedExplanation: "The escrow agent serves as a neutral third party with a fiduciary duty to both the buyer and the seller. They are legally prohibited from taking sides or acting in the interest of one party over the other. The escrow agent's responsibilities include: receiving and safeguarding all deposits, maintaining separate escrow trust accounts (never commingled with operating funds), following the disbursement instructions in the closing documents, ensuring all conditions are met before disbursing funds, and providing a complete accounting of all funds received and disbursed. Under ALTA Best Practices Pillar 2 (Escrow Trust Accounts), title agents must maintain written escrow procedures, perform three-way reconciliations (bank statement, book balance, and individual file balances), carry fidelity bonds, and maintain positive balances at all times.",
        commonQuestions: "Can I choose the escrow agent? In many states, the buyer can choose the settlement agent/title company. Under RESPA Section 9, the seller cannot require you to use a specific title company as a condition of sale (though local customs vary). What happens if the escrow agent makes an error? Escrow agents carry errors and omissions insurance (E&O) to protect against mistakes. If funds are lost due to agent negligence or fraud, the insurance and fidelity bond provide recovery. Can the escrow agent earn interest on my deposit? In most cases, the escrow agent does not earn interest on short-term transaction escrow deposits. Some states require interest-bearing escrow accounts for longer holds.",
        watchFor: "Verify that your escrow agent is licensed in your state and in good standing. Confirm they carry errors and omissions insurance and a fidelity bond (required under ALTA Best Practices). Ask whether your earnest money will be held in a separate escrow account or a pooled trust account. If the deposit is significant and the closing is more than 30 days away, ask about placing funds in an interest-bearing account."
      },
      {
        title: "What Happens to Your Earnest Money?",
        desc: "If the transaction closes: your earnest money is credited toward your down payment and closing costs on the Closing Disclosure. If you back out under a contingency: you typically get a full refund. If you back out without a valid contingency: you may forfeit the deposit to the seller. Disputes over earnest money are resolved according to the terms in your purchase agreement.",
        expandedExplanation: "Your earnest money has three possible outcomes: (1) Successful closing — the deposit is applied as a credit to your side of the transaction, reducing the cash you need to bring to closing. You'll see it on Page 3 of the Closing Disclosure under 'Deposit.' (2) Contingency-based termination — if you cancel the contract within the terms of a valid contingency (inspection, financing, appraisal), you are typically entitled to a full refund of your deposit. The specific contingency language in your contract governs the refund process. (3) Default — if you breach the contract without a valid contingency, the seller may be entitled to keep your earnest money as liquidated damages. The purchase agreement should specify the process for handling disputes. In some states, both parties must sign a release before the escrow agent can disburse disputed funds. If they can't agree, the funds may be held in escrow until resolved by mediation, arbitration, or court order.",
        commonQuestions: "How long does a refund take? If both parties agree to release the funds, refunds typically take 3-10 business days depending on the escrow agent's process. What if the seller won't release my deposit? If the seller refuses to sign a mutual release, the escrow agent cannot disburse the funds to either party. You may need to pursue resolution through the dispute mechanism in your contract (typically mediation or arbitration). What contingencies protect my deposit? Common contingencies include: inspection contingency, financing contingency (if you can't get approved for the loan), appraisal contingency (if the property appraises below the agreed price), and sale contingency (if you need to sell your current home first).",
        watchFor: "Read the contingency deadlines in your purchase contract carefully — missing a deadline could waive your right to cancel with a refund. Keep copies of all communications related to contingency exercises. If you need to cancel, do so in writing before the contingency deadline expires. Understand the difference between a contingency waiver (where you give up the protection) and a contingency removal (which may be automatic if you don't act)."
      },
    ],
  },
  {
    phase: "Phase 2: Closing Escrow (At Closing)",
    color: "from-[#2d6b3f] to-[#235532]",
    items: [
      {
        title: "Fund Collection",
        desc: "The escrow agent collects all funds needed to close: your down payment, closing costs, the lender's loan funds, and any seller credits. Every dollar is accounted for on the Closing Disclosure.",
        expandedExplanation: "On or before closing day, the escrow agent collects every dollar needed to complete the transaction. This includes: your remaining down payment and closing costs (via wire transfer or cashier's check), the lender's loan proceeds (wired directly to the escrow agent), any seller credits or concessions (deducted from the seller's proceeds), and real estate commissions (also deducted from proceeds). The escrow agent must have all funds in hand before disbursement can occur. In many states, disbursement cannot happen until the deed is recorded with the county. The settlement statement (Closing Disclosure) serves as the master accounting document — every dollar in must equal every dollar out.",
        commonQuestions: "When should I wire my funds? Most title companies require your wire to arrive the business day before closing — check with your settlement agent. Can I bring a personal check? Generally no — closing funds must be in the form of a wire transfer or cashier's check. Some title companies may accept personal checks for small amounts (under $1,000-$5,000 depending on the company). What if my wire doesn't arrive on time? If your closing funds don't arrive, the closing may be delayed. This can have consequences including rate lock expiration, contract deadline issues, and additional daily interest charges.",
        watchFor: "Confirm wire instructions by calling your title company directly — never trust wiring instructions received via email alone (wire fraud prevention). Send your wire early — at least one business day before closing. Ask your title company for a confirmation once they receive your funds. Verify the exact amount with your settlement agent — it should match the Cash to Close on your Closing Disclosure."
      },
      {
        title: "Fund Disbursement",
        desc: "After all documents are signed, the escrow agent disburses funds according to the settlement statement: the seller receives their proceeds, real estate agents receive commissions, all closing costs are paid to their respective parties, and any remaining funds go to pay off the seller's existing mortgage.",
        expandedExplanation: "Disbursement is the final step of the closing escrow. The escrow agent distributes funds according to the Closing Disclosure: the seller's existing mortgage is paid off first (if any), real estate commissions are paid to the listing and buyer's brokerages, all third-party fees are paid (title insurance premiums, appraisal, recording fees, transfer taxes, etc.), the seller receives their net proceeds (typically via wire transfer), and any remaining prorations or credits are distributed. In 'wet funding' states, disbursement happens the same day as signing. In 'dry funding' states (like some western states), disbursement may not occur until the deed is recorded — which could be the next business day. The escrow agent provides a final accounting to all parties showing every dollar received and disbursed.",
        commonQuestions: "When does the seller get paid? In wet funding states, the seller typically receives a wire the same day as closing. In dry funding states, disbursement occurs after recording — usually the next business day. When do I officially own the home? You own the home when the deed is recorded with the county recorder's office. In some states this happens at the closing table; in others, it may take a day or two. What if there's money left over? If there are excess funds after all disbursements, they are returned to the appropriate party (typically the buyer if it's excess closing funds).",
        watchFor: "Understand whether your state is a wet or dry funding state — this affects when you get the keys. Confirm that the seller's existing mortgage payoff amount is correct and current (including per diem interest). If the seller has any liens on the property (tax liens, judgment liens, mechanics' liens), verify they are being paid off at closing. Request a copy of the final disbursement ledger for your records."
      },
      {
        title: "Initial Escrow Deposit",
        desc: "At closing, you'll make an initial deposit into your mortgage escrow account (separate from the transaction escrow). This typically covers 2-6 months of property taxes and 2-3 months of insurance, creating a cushion so your lender can pay these bills when they come due.",
        expandedExplanation: "The initial escrow deposit funds your ongoing mortgage escrow account — the one your servicer manages to pay your property taxes and homeowner's insurance. The amount collected at closing is based on an escrow analysis that projects when tax and insurance bills will come due and how much needs to be in the account to cover them. RESPA limits the cushion to 2 months beyond what's needed, but the initial deposit may seem large because your first tax or insurance bill may come due before you've made enough monthly escrow payments to cover it. This initial deposit appears on Page 2, Section G of the Closing Disclosure. Each line item shows the number of months collected and the monthly amount. The total initial escrow deposit is included in your Cash to Close calculation.",
        commonQuestions: "Why is the initial deposit so large? The initial deposit must be large enough to ensure the escrow account can cover the first bills that come due. If property taxes are due 3 months after closing but you've only made 3 monthly escrow payments, the initial deposit bridges the gap. Can I negotiate the initial deposit? The initial escrow deposit is calculated based on RESPA guidelines — it's not negotiable in the traditional sense. However, if you believe the calculation is excessive (more than a 2-month cushion), you can ask your lender to review the analysis. Does the initial deposit earn interest? In most states, no — the servicer holds the funds without paying interest. Some states (California, Connecticut, Iowa, Minnesota, New York, and others) require interest-bearing escrow accounts.",
        watchFor: "Verify each line item in Section G of the Closing Disclosure — the number of months collected and the per-month amount should be reasonable. Property tax escrow should be based on the current assessed value at the current tax rate. Homeowner's insurance escrow should match your insurance policy premium divided by 12. If the initial deposit seems excessive, ask the lender for a detailed escrow analysis showing the projected account balance over the first 12 months."
      },
    ],
  },
  {
    phase: "Phase 3: Mortgage Escrow (After Closing)",
    color: "from-[#5b3a8c] to-[#482d70]",
    items: [
      {
        title: "Monthly Collection",
        desc: "Each month, a portion of your mortgage payment goes into your escrow account to cover property taxes and homeowner's insurance. Your total monthly payment (PITI) = Principal + Interest + Taxes + Insurance. The tax and insurance portions are held in escrow until the bills are due.",
        expandedExplanation: "Your monthly mortgage payment includes four components (PITI): Principal (the portion that reduces your loan balance), Interest (the cost of borrowing, calculated on the remaining balance), Taxes (your monthly escrow contribution for property taxes), and Insurance (your monthly escrow contribution for homeowner's insurance — and PMI/MIP if applicable). The principal and interest portions go to your lender. The tax and insurance portions are deposited into your escrow account and held until the bills are due. Your servicer calculates the escrow portion based on the expected annual tax and insurance bills, divided by 12, plus any cushion allowed under RESPA (up to 2 months). The escrow portion of your payment can change each year based on the annual escrow analysis.",
        commonQuestions: "Why is my escrow payment different from what I expected? Escrow amounts are estimates based on projected tax and insurance bills. If taxes increase, your escrow collection increases. Can I see my escrow balance? Yes — your monthly mortgage statement should show your current escrow balance, and you'll receive an annual escrow analysis statement. What if I pay extra toward my mortgage? Extra payments typically go to principal (reducing your loan balance) unless you specify otherwise. They do not affect your escrow account.",
        watchFor: "Review your monthly mortgage statement to verify the escrow portion is being calculated correctly. If your property taxes were recently reassessed (common after a purchase), your escrow amount may increase at the first annual analysis. If your homeowner's insurance premium increased at renewal, expect an escrow adjustment. Set up autopay for your mortgage to avoid missed payments and late fees."
      },
      {
        title: "Bill Payment",
        desc: "Your mortgage servicer pays your property tax and insurance bills directly from your escrow account when they come due — typically property taxes 1-2 times per year and insurance annually. You don't have to remember to pay these yourself.",
        expandedExplanation: "One of the primary benefits of an escrow account is that your servicer handles paying your property tax and insurance bills directly. For property taxes, payment frequency varies by jurisdiction — some counties bill annually, others semi-annually, and some quarterly. Your servicer tracks the due dates and pays from your escrow account before penalties accrue. For homeowner's insurance, your servicer pays the annual premium directly to your insurance company before the policy renewal date. If you have PMI (private mortgage insurance), those premiums are also managed through escrow. The servicer is responsible for paying these bills on time. If they fail to pay and you incur penalties or a lapse in coverage, the servicer may be liable for the consequences.",
        commonQuestions: "What if my servicer pays late? If your servicer fails to make a timely tax or insurance payment, they are responsible for any resulting penalties or charges — not you. You can file a complaint with the CFPB if this occurs. How do I know the bills were paid? Your annual escrow analysis statement lists all disbursements made from your escrow account, including the payee and date. You can also verify with your county tax office or insurance company. Can I change my insurance company? Yes — you can switch homeowner's insurance at any time. Notify your servicer of the change so they update the escrow disbursement to the new company.",
        watchFor: "Verify that your property tax bills are being paid on time by checking with your county assessor's office annually. Confirm your homeowner's insurance is renewed each year — a lapse could trigger force-placed insurance from your servicer (which is much more expensive). If you receive a delinquency notice for property taxes or a cancellation notice for insurance, contact your servicer immediately — they should be paying these from escrow."
      },
      {
        title: "Annual Escrow Analysis",
        desc: "Every year, your servicer performs an escrow analysis to verify the account has the right balance. If there's a shortage (not enough to cover upcoming bills), your monthly payment may increase. If there's a surplus (more than a 2-month cushion), you may receive a refund. Your servicer must notify you at least 30 days before any payment change.",
        expandedExplanation: "The annual escrow analysis is a detailed review of your escrow account performed by your servicer at least once per year, as required by RESPA. The analysis compares the actual account balance to the projected balance needed to cover upcoming bills. It accounts for: the current balance, projected monthly deposits, projected disbursements (based on the latest tax and insurance bills), and the required RESPA cushion (up to 2 months). There are three possible outcomes: (1) On target — no change to your monthly payment. (2) Shortage — the account is projected to fall short of covering upcoming bills. Your servicer must offer you the option to pay the shortage as a lump sum or spread it over 12 months. (3) Surplus — the account has more than a 2-month cushion. Surpluses over $50 must be refunded to you within 30 days. The annual escrow analysis statement must be sent to you at least 30 days before any payment change takes effect.",
        commonQuestions: "Why does my payment keep going up? The most common reason for payment increases is property tax increases. When your county reassesses property values or increases the tax rate, your escrow payment increases to cover the higher bills. Insurance premium increases also contribute. Can I prevent escrow increases? You cannot prevent legitimate increases in taxes or insurance. However, you can appeal your property tax assessment if you believe it's too high, and you can shop for competitive insurance rates to keep premiums down. What if I disagree with the analysis? You have the right to request an explanation of the escrow analysis and dispute any errors. Contact your servicer in writing.",
        watchFor: "Review your annual escrow analysis statement carefully when it arrives. Verify that the projected tax and insurance disbursements match your actual bills. If you recently protested your property tax assessment, make sure the escrow analysis reflects the corrected amount. If your payment increases significantly, determine whether it's due to a shortage repayment or an increase in projected bills — the response may be different for each."
      },
    ],
  },
];

const respaRules = [
  {
    rule: "2-Month Cushion Maximum",
    detail: "Your servicer cannot maintain a cushion of more than 2 months of escrow payments beyond what is needed to pay your upcoming bills. If the surplus exceeds this limit, the servicer must refund the excess within 30 days of the annual analysis.",
    expandedLaw: "Under RESPA Section 10 (12 U.S.C. Section 2609) and its implementing regulation (12 CFR Part 1024, Regulation X), mortgage servicers are limited to collecting a maximum cushion of one-sixth (1/6) of the total annual escrow disbursements — which equates to approximately 2 months of escrow payments. This limit applies to the lowest projected monthly balance during the escrow analysis year. The servicer calculates the projected balance each month after accounting for expected deposits and disbursements, and the lowest projected balance cannot exceed the 2-month cushion.",
    realExamples: "If your annual property taxes are $6,000 and your annual insurance premium is $2,400, your total annual escrow disbursements are $8,400. Monthly escrow collections would be $700. The maximum cushion is $8,400 / 6 = $1,400 (2 months). If your escrow account's lowest projected balance exceeds $1,400 after all disbursements, the excess must be refunded. For example, if the lowest projected balance is $2,000, the excess $600 must be refunded to you within 30 days of the annual analysis.",
    ifViolated: "If your servicer maintains a cushion exceeding the 2-month limit and fails to refund the excess, you can: (1) Contact your servicer in writing requesting a refund and citing RESPA Section 10, (2) File a complaint with the CFPB at consumerfinance.gov/complaint, (3) Contact your state's attorney general or banking regulator, or (4) Consult with a consumer protection attorney — RESPA provides for actual damages, statutory damages, and attorney's fees for violations."
  },
  {
    rule: "Annual Analysis Required",
    detail: "Your servicer must perform an escrow analysis at least once per year and send you a statement showing: the current balance, all payments received, all disbursements made, the projected balance for the coming year, and any changes to your monthly payment.",
    expandedLaw: "Under Regulation X (12 CFR 1024.17(c)), mortgage servicers must conduct an escrow account analysis at least once per year. The analysis must project the escrow account balance over the next 12 months, accounting for expected deposits and disbursements. The servicer must provide the borrower with an annual escrow account statement that includes: the amount of the monthly mortgage payment, the portion going to escrow, the total amount paid into the escrow account during the past year, the total amount paid out of the escrow account for taxes and insurance, the current escrow balance, and any surplus or shortage.",
    realExamples: "Your annual escrow statement arrives each year (the timing varies by servicer). It might show: opening balance of $2,800, 12 monthly deposits of $700 each ($8,400 total), disbursements of $6,000 for property taxes (paid in two installments) and $2,400 for insurance, ending balance of $2,800. The projected analysis shows that next year's taxes increased to $6,300, so your monthly escrow will increase from $700 to $725 to cover the additional $300 annual cost, effective in 30 days.",
    ifViolated: "If your servicer fails to provide an annual escrow analysis, you should: (1) Request the analysis in writing, citing 12 CFR 1024.17(c), (2) File a complaint with the CFPB — failure to perform annual analysis is a regulatory violation, (3) Review your escrow balance independently by comparing your monthly payments to the disbursements shown on your mortgage statement. If your servicer increases your payment without providing the required annual analysis and 30-day notice, the increase may be invalid."
  },
  {
    rule: "30-Day Notice of Changes",
    detail: "If your monthly escrow payment is changing (up or down), your servicer must notify you at least 30 days before the new payment amount takes effect.",
    expandedLaw: "Under Regulation X (12 CFR 1024.17(e)), when an escrow account analysis results in a change to the borrower's monthly payment, the servicer must notify the borrower at least 30 days before the new payment takes effect. The notice must explain the reason for the change, the old and new payment amounts, and the effective date. This 30-day requirement gives borrowers time to adjust their budgets and set up new payment amounts.",
    realExamples: "In January, your servicer completes the annual escrow analysis and determines your monthly escrow needs to increase by $85 due to a property tax increase. The servicer sends you a notice in January explaining the change, showing the breakdown of the new payment, and stating the new amount takes effect on March 1 — giving you at least 30 days' notice. If the servicer tried to implement the change on February 1 (less than 30 days), that would violate the notification requirement.",
    ifViolated: "If your servicer changes your payment without 30 days' notice: (1) Contact the servicer in writing and cite the notification requirement under 12 CFR 1024.17(e), (2) Request that the old payment amount remain in effect until proper notice is provided, (3) File a complaint with the CFPB documenting the timeline (when you were notified vs. when the change took effect), (4) If you were charged a late fee because you paid the old amount during the notice period, request that the fee be reversed."
  },
  {
    rule: "Shortage Repayment Options",
    detail: "If your escrow analysis reveals a shortage, your servicer must offer you the option to pay the shortage as a lump sum or spread it over 12 months. They cannot demand immediate full payment.",
    expandedLaw: "Under Regulation X (12 CFR 1024.17(f)), when an escrow account analysis reveals a shortage (the projected balance will be less than required to cover upcoming disbursements plus the allowable cushion), the servicer must offer the borrower the option to repay the shortage over a period of at least 12 months. The servicer cannot require immediate payment of the full shortage amount. If the shortage is less than one month's escrow payment, the servicer may allow the shortage to exist and adjust future payments accordingly.",
    realExamples: "Your annual analysis reveals a $1,200 shortage because property taxes increased more than expected. Your servicer must offer you two options: (1) Pay the $1,200 shortage as a lump sum and keep your monthly payment lower (only the ongoing increase applies), or (2) Spread the $1,200 shortage over 12 months ($100/month added to your payment on top of the adjusted ongoing escrow amount). If your monthly escrow was $700 and needs to be $750 going forward, option 2 would be $850/month for 12 months ($750 ongoing + $100 shortage repayment), then drops to $750/month after the shortage is repaid.",
    ifViolated: "If your servicer demands immediate full payment of an escrow shortage: (1) Respond in writing citing 12 CFR 1024.17(f) and request the 12-month repayment option, (2) File a complaint with the CFPB, (3) If the servicer refuses to offer the 12-month option, they are in violation of Regulation X. Document all communications and escalate to the servicer's complaint department."
  },
  {
    rule: "Surplus Refund Threshold",
    detail: "If your escrow account has a surplus of $50 or more, your servicer must refund it to you within 30 days. Surpluses under $50 may be credited to your next escrow payment.",
    expandedLaw: "Under Regulation X (12 CFR 1024.17(f)(2)(ii)), if the escrow account analysis reveals a surplus in excess of $50, the servicer must refund the excess to the borrower within 30 days of the analysis. A surplus occurs when the escrow account balance exceeds the amount needed to cover projected disbursements plus the 2-month cushion. For surpluses of $50 or less, the servicer may either refund the amount or credit it to the borrower's escrow account, reducing future payments accordingly.",
    realExamples: "Your annual analysis shows the escrow account has a surplus of $380 because your property tax assessment was reduced after a successful appeal. The servicer must send you a check for $380 within 30 days of completing the analysis. Separately, if the analysis showed a surplus of $35, the servicer could either refund it or apply it as a credit to reduce your next month's escrow payment.",
    ifViolated: "If your servicer fails to refund a surplus exceeding $50 within 30 days: (1) Contact the servicer in writing and request the refund, citing 12 CFR 1024.17(f)(2)(ii), (2) File a complaint with the CFPB, (3) Check if your escrow analysis statement accurately reflects the surplus — if the projected disbursements are inflated, the servicer may be artificially avoiding a surplus. Request documentation of the projected tax and insurance amounts used in the analysis."
  },
];

const faqItems = [
  {
    q: "Can I opt out of escrow?",
    a: "Some lenders allow you to waive escrow if you have 20%+ equity, but they typically charge a fee (0.25% of the loan amount) and you become responsible for paying taxes and insurance yourself. Missing a tax payment can result in a lien on your property.",
    expandedExplanation: "An escrow waiver (also called an escrow exemption) allows you to pay property taxes and homeowner's insurance directly instead of through your monthly mortgage payment. Most lenders require at least 20% equity (80% loan-to-value ratio) to qualify. FHA, VA, and USDA loans generally do not allow escrow waivers. The escrow waiver fee (typically 0.25% of the loan amount) compensates the lender for the increased risk — if you fail to pay taxes or insurance, the lender's collateral (your home) is at risk.",
    commonQuestions: "What loans allow escrow waivers? Conventional loans are the most flexible. FHA requires escrow for the life of the loan. VA and USDA generally require escrow. Some lenders may also require a strong credit score (720+) and clean payment history. What are the benefits? You keep control of your funds, can earn interest on the money until bills are due, and have more flexibility in payment timing. What are the risks? You're responsible for budgeting and paying large lump-sum bills. Missing a property tax payment can result in a tax lien. Missing insurance can trigger expensive force-placed insurance.",
    watchFor: "If you're considering an escrow waiver, make sure you have the financial discipline to save for large annual or semi-annual bills. Set up calendar reminders for tax and insurance due dates. Keep sufficient funds set aside at all times. Remember that your monthly mortgage payment will be lower without escrow, but you must budget separately for taxes and insurance."
  },
  {
    q: "Why did my payment increase?",
    a: "Most payment increases are due to escrow changes — property tax rates increased, insurance premiums went up, or the annual analysis revealed a shortage. Your servicer must notify you 30 days before any change.",
    expandedExplanation: "Monthly mortgage payment increases are almost always driven by the escrow portion of your payment — not the principal and interest (which remain constant on a fixed-rate mortgage). The three most common causes are: (1) Property tax increase — your county raised the tax rate or reassessed your property at a higher value, (2) Insurance premium increase — your homeowner's insurance renewal came in higher, (3) Escrow shortage — the annual analysis determined the account doesn't have enough to cover upcoming bills (often because previous estimates were too low). Less common causes include the addition of flood insurance (if your property is newly mapped into a flood zone) or an increase in PMI rates.",
    commonQuestions: "How much can my payment increase? There is no legal cap on escrow-driven increases — your payment adjusts to cover actual tax and insurance costs. However, the servicer must spread shortages over at least 12 months. Can I prevent increases? You can appeal your property tax assessment if you believe it's too high, and you can shop for competitive insurance rates. These are the two most effective ways to control escrow costs. What if my rate is fixed? A fixed interest rate means only the principal and interest portion is constant. The escrow portion can — and likely will — change over time as taxes and insurance fluctuate.",
    watchFor: "When you receive your annual escrow analysis, review the projected tax and insurance amounts. If property taxes seem too high, check your county assessor's website for the actual assessment and rate. If insurance increased, get competitive quotes from other carriers. If the analysis shows a shortage, consider paying it as a lump sum to avoid spreading it over 12 months (which increases your monthly payment for a year)."
  },
  {
    q: "What if my escrow has a shortage?",
    a: "You can pay the shortage as a lump sum to keep payments lower, or spread it over 12 months (which increases your monthly payment). Your servicer offers both options in the annual escrow analysis statement.",
    expandedExplanation: "An escrow shortage means the annual analysis projects that your escrow account won't have enough funds to cover upcoming tax and insurance disbursements plus the required cushion. This typically happens when property taxes or insurance premiums increase more than the previous analysis predicted. Under RESPA, your servicer must offer you two repayment options: (1) Pay the full shortage as a one-time lump sum, which keeps your ongoing monthly payment increase limited to the higher projected bills, or (2) Spread the shortage over 12 months, which adds the monthly shortage repayment on top of the adjusted escrow amount. After the 12-month repayment period, your monthly payment decreases by the shortage repayment amount.",
    commonQuestions: "Which option is better? If you can afford the lump sum, it results in a lower monthly payment for the next year. Spreading it over 12 months is easier on your monthly budget but results in a higher payment for a year. Is a shortage the same as a deficiency? No — a shortage means the projected balance will be less than required. A deficiency means the account is already negative (the servicer has advanced funds). A deficiency can result in a larger one-time charge. Can I make extra escrow payments? Some servicers allow additional escrow payments to build up the account. Contact your servicer to ask about this option.",
    watchFor: "When your annual escrow analysis arrives and shows a shortage, review the underlying numbers carefully. Verify that the projected tax and insurance disbursements match your actual bills. If the amounts are based on estimates rather than actual bills, they may be inaccurate. If you believe the shortage calculation is wrong, contact your servicer with documentation of the actual tax and insurance amounts."
  },
  {
    q: "What if my escrow has a surplus?",
    a: "If your escrow account has more than a 2-month cushion (per federal rules), your servicer must refund the excess to you. This usually happens automatically with your annual analysis.",
    expandedExplanation: "An escrow surplus occurs when the account balance exceeds the amount needed to cover projected disbursements plus the RESPA-allowed 2-month cushion. Surpluses most commonly happen when: property taxes decreased (successful tax appeal, lower reassessment), insurance premiums decreased (shopped for a better rate), or the previous analysis overestimated the needed amount. Under federal rules, if the surplus exceeds $50, the servicer must refund it to you within 30 days of the annual analysis. Surpluses of $50 or less may be credited to your next escrow payment instead.",
    commonQuestions: "Will I get a check? For surpluses over $50, yes — the servicer must send you a refund check within 30 days. Some servicers may offer electronic transfer. Will my monthly payment decrease? If the surplus is due to lower projected disbursements (lower taxes or insurance), your monthly escrow collection should also decrease, lowering your monthly payment. What if I overpaid a lump sum shortage last year? If the previous year's shortage was repaid and bills came in lower than projected, the resulting surplus will be refunded.",
    watchFor: "Review your annual escrow analysis for accuracy. If you believe a surplus exists but the servicer isn't refunding it, check the projected disbursement amounts — inflated projections can artificially prevent a surplus. If you successfully appealed your property taxes, provide your servicer with the updated assessment so they adjust the escrow analysis accordingly."
  },
  {
    q: "Who earns interest on my escrow?",
    a: "In most states, the mortgage servicer earns interest on your escrow balance. However, some states (like California, Connecticut, Iowa, Minnesota, New York, and others) require servicers to pay interest on escrow accounts. Check your state's laws.",
    expandedExplanation: "Federal law does not require mortgage servicers to pay interest on escrow accounts. However, several states have enacted their own laws requiring interest be paid. States that require interest on escrow accounts include (but may not be limited to): California, Connecticut, Iowa, Maine, Maryland, Massachusetts, Minnesota, New Hampshire, New York, Oregon, Rhode Island, Utah, Vermont, and Wisconsin. The interest rates and conditions vary by state — some set a specific rate, others tie it to an index. In states without escrow interest requirements, the servicer keeps any interest earned on your escrow balance. This is one reason some borrowers prefer to waive escrow (where eligible) and manage their own funds.",
    commonQuestions: "How much interest would I earn? Even in states that require interest, the amounts are typically modest — escrow balances fluctuate and the required rates may be below market savings rates. Is interest reported for tax purposes? Yes — if your servicer pays interest on your escrow account, the interest is generally reported on Form 1099-INT and is taxable income. Can I request an interest-bearing escrow account? In states that don't require it, servicers are generally not obligated to provide interest-bearing escrow accounts. You can ask, but they may decline.",
    watchFor: "Check your state's laws regarding escrow interest. If your state requires interest and your servicer isn't paying it, contact them in writing and cite the applicable state statute. The interest should appear on your annual escrow statement. If you're in a state without escrow interest requirements and want to earn interest on your funds, consider whether an escrow waiver (if eligible) makes sense for your situation."
  },
  {
    q: "What happens to escrow when I sell?",
    a: "When you sell or refinance, any remaining escrow balance is refunded to you after the loan is paid off — typically within 20-30 business days. Make sure your servicer has your forwarding address.",
    expandedExplanation: "When your mortgage is paid off (through sale or refinance), any remaining balance in your escrow account is returned to you. Under RESPA, the servicer must refund the remaining balance within 20 business days of the loan payoff. The refund covers whatever is left after any final disbursements — for example, if property taxes were paid from escrow just before closing, the remaining balance would be smaller. The refund is typically sent by check to your last known address. If you've moved, make sure the servicer has your new address. Some servicers may also offer electronic transfer for escrow refunds.",
    commonQuestions: "Will my taxes and insurance be paid through closing? Yes — the closing settlement handles prorations for property taxes and may pay insurance depending on the timing. Your escrow account balance at payoff is separate from these closing adjustments. What if the refund doesn't arrive? If you don't receive your escrow refund within 20 business days, contact your servicer in writing. If they fail to respond, file a complaint with the CFPB. What about the refinance? When you refinance, your old escrow balance is refunded and your new loan will typically set up a new escrow account with a new initial deposit.",
    watchFor: "Before selling or refinancing, check your escrow balance on your most recent mortgage statement so you know approximately how much to expect. Provide your servicer with a forwarding address immediately after closing. If a large escrow disbursement (like an annual insurance premium) just went out, your refund may be smaller than expected — verify by checking recent disbursements on your statement."
  },
];

export default function EscrowGuidePage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

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
          <div className="mb-6 p-4 bg-[#e8f0f5] rounded-2xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1a5276]/15 flex items-center justify-center text-[#1a5276] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Money, Safely Managed</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Escrow is a neutral third-party arrangement that protects both buyers and sellers. Understanding how it works at each stage of your transaction gives you confidence and control over your largest financial transaction.</p>
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

          {/* Three phases of escrow */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">The 3 Phases of Escrow</h2>
          <p className="text-sm text-alta-gray mb-4">Click any item for a detailed explanation, common questions, and what to watch for.</p>
          <div className="space-y-6 mb-10">
            {phases.map((phase) => (
              <div key={phase.phase} className="rounded-2xl border border-[#c5d8e4] overflow-hidden shadow-sm tile-interactive">
                <div className={`bg-gradient-to-r ${phase.color} px-5 py-3`}>
                  <h3 className="text-white font-bold text-sm">{phase.phase}</h3>
                </div>
                <div className="p-5 bg-[#fafcfe] space-y-4">
                  {phase.items.map((item) => (
                    <div
                      key={item.title}
                      className="cursor-pointer group rounded-xl p-3 -mx-1 hover:bg-alta-light/50 transition-colors border border-transparent hover:border-gray-200"
                      onClick={() => setActiveModal({
                        title: item.title,
                        gradient: phase.color,
                        content: (
                          <div className="space-y-5 text-sm text-gray-700">
                            <div>
                              <h3 className="font-bold text-[#1a5276] mb-2">Detailed Explanation</h3>
                              <p className="leading-relaxed">{item.expandedExplanation}</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                              <h3 className="font-bold text-[#8b6914] mb-2">Common Questions</h3>
                              <p className="leading-relaxed">{item.commonQuestions}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                              <h3 className="font-bold text-[#1a5276] mb-2">What to Watch For</h3>
                              <p className="leading-relaxed">{item.watchFor}</p>
                            </div>
                            <p className="text-xs text-[#0a7ea8] font-medium">Source: RESPA (12 CFR Part 1024); CFPB; ALTA Best Practices</p>
                          </div>
                        ),
                      })}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-alta-navy text-sm mb-1">{item.title}</h4>
                          <p className="text-sm text-alta-gray leading-relaxed">{item.desc}</p>
                          {item.title === "Annual Escrow Analysis" && <p className="text-[10px] text-alta-teal mt-1 font-medium">Source: CFPB</p>}
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

          {/* Escrow math example */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Escrow Math: What Your Monthly Payment Includes</h2>
          <div className="p-5 bg-[#faf4e4] rounded-2xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] shadow-sm mb-10 tile-interactive">
            <p className="text-xs text-alta-gray mb-3">Example for a $350,000 home with 10% down, 6.5% rate, 30-year conventional in a county with 1.5% property tax:</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 bg-[#e8f0f5] rounded-lg"><span className="text-alta-navy font-medium">Principal & Interest</span><span className="font-bold text-[#1a5276]">$1,991</span></div>
              <div className="flex justify-between p-2 bg-[#faf4e4] rounded-lg"><span className="text-alta-navy font-medium">Property Tax Escrow (1.5%)</span><span className="font-bold text-[#8b6914]">$438</span></div>
              <div className="flex justify-between p-2 bg-[#e9f5ed] rounded-lg"><span className="text-alta-navy font-medium">Insurance Escrow</span><span className="font-bold text-[#2d6b3f]">$175</span></div>
              <div className="flex justify-between p-2 bg-[#f5e8e8] rounded-lg"><span className="text-alta-navy font-medium">PMI (under 20% down)</span><span className="font-bold text-[#943030]">$184</span></div>
              <div className="flex justify-between p-2 bg-alta-navy text-white rounded-lg"><span className="font-semibold">Total Monthly Payment (PITI)</span><span className="font-bold">$2,788</span></div>
            </div>
            <p className="text-xs text-alta-gray mt-3">Of your $2,788 monthly payment, only $1,991 goes to your actual loan. The remaining $797 is held in escrow for taxes, insurance, and PMI. This is why your mortgage payment is significantly more than just principal and interest.</p>
          </div>

          {/* Escrow waivers */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Escrow Waivers: Paying Taxes & Insurance Yourself</h2>
          <div className="p-5 bg-[#f0ecf6] rounded-2xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] shadow-sm mb-10 tile-interactive">
            <p className="text-sm text-alta-gray leading-relaxed mb-4">Some borrowers prefer to pay property taxes and insurance directly rather than through an escrow account. This is called an escrow waiver (or escrow exemption). Here is what you need to know:</p>
            <div className="space-y-3">
              <div className="p-3 bg-[#e8f0f5] rounded-lg border border-[#c5d8e4]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">Eligibility Requirements</h4>
                <p className="text-sm text-alta-gray leading-relaxed">Most lenders require at least 20% equity (80% LTV or less) to waive escrow. FHA, VA, and USDA loans generally do not allow escrow waivers. Conventional loans are the most flexible, but each lender sets its own policy. Some lenders also require a strong credit score (720+) and a clean payment history.</p>
              </div>
              <div className="p-3 bg-[#faf4e4] rounded-lg border border-[#e8d9a8]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">The Escrow Waiver Fee</h4>
                <p className="text-sm text-alta-gray leading-relaxed">Lenders typically charge a fee for waiving escrow -- usually 0.25% of the loan amount (e.g., $625 on a $250,000 loan). This fee may be paid upfront or added to your interest rate. The fee compensates the lender for the increased risk that you could miss a tax or insurance payment, which would put their collateral at risk.</p>
              </div>
              <div className="p-3 bg-[#f5e8e8] rounded-lg border border-[#e4c5c5]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">Risks of Waiving Escrow</h4>
                <p className="text-sm text-alta-gray leading-relaxed">If you miss a property tax payment, your county can place a tax lien on your home -- which takes priority over your mortgage. If your insurance lapses, your lender will buy force-placed insurance on your behalf (at a much higher cost) and add it to your loan balance. You are responsible for budgeting and paying large lump-sum bills (property taxes are typically due 1-2 times per year; insurance annually).</p>
              </div>
              <div className="p-3 bg-[#e9f5ed] rounded-lg border border-[#bddcc7]">
                <h4 className="text-sm font-bold text-alta-navy mb-1">When It Makes Sense</h4>
                <p className="text-sm text-alta-gray leading-relaxed">An escrow waiver can make sense if you are disciplined about saving, want to earn interest on your own funds, or live in a state where escrow accounts do not earn interest. However, most financial advisors recommend keeping escrow for the convenience and protection it provides -- especially for first-time buyers.</p>
              </div>
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">Source: CFPB -- Escrow accounts are regulated under the Real Estate Settlement Procedures Act (RESPA), 12 CFR Part 1024</p>
          </div>

          <InlineAd />

          {/* RESPA escrow limits */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Federal Escrow Protections (RESPA)</h2>
          <p className="text-sm text-alta-gray mb-3">Click any rule for the full legal basis, real examples, and what to do if it's violated.</p>
          <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 mb-10">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">The Real Estate Settlement Procedures Act (RESPA) sets federal rules that protect you from excessive escrow collections:</p>
            <div className="space-y-2">
              {respaRules.map((r) => (
                <div
                  key={r.rule}
                  className="p-3 bg-white rounded-lg border border-amber-100 cursor-pointer group hover:border-amber-300 transition-colors"
                  onClick={() => setActiveModal({
                    title: r.rule,
                    gradient: "from-[#8b6914] to-[#705410]",
                    content: (
                      <div className="space-y-5 text-sm text-gray-700">
                        <div>
                          <h3 className="font-bold text-[#8b6914] mb-2">What the Law Says</h3>
                          <p className="leading-relaxed">{r.expandedLaw}</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                          <h3 className="font-bold text-[#8b6914] mb-2">Real Examples</h3>
                          <p className="leading-relaxed">{r.realExamples}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                          <h3 className="font-bold text-[#943030] mb-2">What to Do If This Rule Is Violated</h3>
                          <p className="leading-relaxed">{r.ifViolated}</p>
                        </div>
                        <p className="text-xs text-[#0a7ea8] font-medium">Source: 12 U.S.C. Section 2609; 12 CFR Part 1024 (Regulation X); CFPB Escrow Account Rules</p>
                      </div>
                    ),
                  })}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-alta-navy mb-0.5">{r.rule}</h4>
                      <p className="text-[11px] text-alta-gray leading-relaxed">{r.detail}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      <span className="text-[10px] text-alta-teal font-medium">Details</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">Source: 12 U.S.C. Section 2609; 12 CFR Part 1024 (Regulation X); CFPB Escrow Account Rules</p>
          </div>

          <SponsorTip context="closing" />

          {/* Common escrow questions */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Common Escrow Questions</h2>
          <p className="text-sm text-alta-gray mb-3">Click any question for detailed answers and what to watch for.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {faqItems.map((faq) => (
              <div
                key={faq.q}
                className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] shadow-sm tile-interactive cursor-pointer group hover:border-[#0a7ea8]/50 transition-colors"
                onClick={() => setActiveModal({
                  title: faq.q,
                  gradient: "from-[#1a5276] to-[#154463]",
                  content: (
                    <div className="space-y-5 text-sm text-gray-700">
                      <div>
                        <h3 className="font-bold text-[#1a5276] mb-2">Detailed Answer</h3>
                        <p className="leading-relaxed">{faq.expandedExplanation}</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <h3 className="font-bold text-[#8b6914] mb-2">Related Questions</h3>
                        <p className="leading-relaxed">{faq.commonQuestions}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-[#1a5276] mb-2">What to Watch For</h3>
                        <p className="leading-relaxed">{faq.watchFor}</p>
                      </div>
                      <p className="text-xs text-[#0a7ea8] font-medium">Source: CFPB; RESPA (12 CFR Part 1024, Regulation X)</p>
                    </div>
                  ),
                })}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-alta-navy mb-1">{faq.q}</h3>
                    <p className="text-sm text-alta-gray leading-relaxed">{faq.a}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    <span className="text-[10px] text-alta-teal font-medium">Details</span>
                  </div>
                </div>
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

          <TrustedALTAMembers />

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/closing-disclosure" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Disclosure Guide</h3>
                <p className="text-xs text-alta-gray mt-1">Review your final loan terms and costs before signing at closing</p>
              </Link>
              <Link href="/closing-process/closing-costs" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Calculator</h3>
                <p className="text-xs text-alta-gray mt-1">Estimate your total closing costs and understand each line item</p>
              </Link>
              <Link href="/closing-process/closing-checklist" className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Checklist</h3>
                <p className="text-xs text-alta-gray mt-1">Track every step from offer to keys with our interactive checklist</p>
              </Link>
            </div>
          </div>

          <MiniQuiz title="Test Your Knowledge: Escrow" questions={escrowQuiz} />

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
