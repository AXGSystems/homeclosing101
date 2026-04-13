"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import ClosingFlowNav from "@/components/ClosingFlowNav";
import { useClosingFolder } from "@/components/ClosingFolderProvider";

const checklistSections = [
  {
    title: "Before You Start",
    color: "blue",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
    tip: "Getting your finances in order is the most important first step. Most closings fail because of financing issues.",
    items: [
      {
        text: "Check your credit score and review your credit report",
        detail: "Your credit score is one of the most important factors in determining your mortgage rate and loan eligibility. Lenders pull your score from all three bureaus (Equifax, Experian, TransUnion) and typically use the middle score. Reviewing your report also helps you catch errors that could lower your score.",
        tip: "You can get free credit reports from AnnualCreditReport.com. Check all three bureaus and dispute any errors at least 3-6 months before applying for a mortgage, since disputes take time to resolve.",
        docs: "Government-issued ID for identity verification when requesting your credit report.",
      },
      {
        text: "Determine your budget (including closing costs — typically 2-5% of home price)",
        detail: "Your budget isn't just the purchase price — you need to account for the down payment, closing costs (typically 2-5% of the home price), moving expenses, and a reserve fund for unexpected repairs. Lenders look at your debt-to-income ratio, which should generally be below 43% for most loan programs.",
        tip: "Use the 28/36 rule as a starting point: spend no more than 28% of gross monthly income on housing costs and no more than 36% on total debt. Don't forget to budget for property taxes, homeowner's insurance, and HOA fees if applicable.",
        docs: "Recent pay stubs, W-2s from the past 2 years, tax returns, bank statements showing savings for down payment and closing costs.",
      },
      {
        text: "Get pre-approved for a mortgage",
        detail: "Pre-approval means a lender has reviewed your financial information and conditionally agreed to lend you a specific amount. This is much stronger than pre-qualification (which is just an estimate). A pre-approval letter shows sellers you're a serious, qualified buyer and gives you a clear budget to shop with.",
        tip: "Apply with at least 3 lenders within a 14-day window — all mortgage credit inquiries within this period count as a single inquiry on your credit report, so shopping around won't hurt your score.",
        docs: "Government-issued ID, Social Security number, pay stubs (most recent 30 days), W-2s (past 2 years), federal tax returns (past 2 years), bank statements (past 2-3 months), information on debts and assets.",
      },
      {
        text: "Choose a real estate agent",
        detail: "A good buyer's agent represents your interests throughout the transaction, helps you find properties, writes and negotiates offers, coordinates inspections, and guides you through closing. Since the 2024 NAR settlement, buyer agent compensation is negotiated separately and disclosed upfront.",
        tip: "Interview at least 2-3 agents. Ask about their experience in your target area, how many transactions they've closed in the past year, and how they communicate. Ask for references from recent buyers. Understand their compensation structure before signing a buyer representation agreement.",
        docs: "Buyer representation agreement (required since the 2024 NAR settlement changes).",
      },
      {
        text: "Research neighborhoods and school districts",
        detail: "The neighborhood you choose affects your quality of life, commute, property value appreciation, and resale potential. Even if you don't have children, school district quality significantly impacts home values. Research crime rates, walkability, future development plans, and proximity to amenities.",
        tip: "Visit neighborhoods at different times of day and on weekends. Talk to potential neighbors. Check the local municipality's planning department for upcoming development or zoning changes that could affect the area.",
        docs: "No specific documents needed, but keep notes on neighborhoods you visit for comparison.",
      },
    ],
  },
  {
    title: "Making an Offer",
    color: "green",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    tip: "Your agent will guide you through the offer process. Be prepared to move quickly in a competitive market.",
    items: [
      {
        text: "Find your home and schedule inspections",
        detail: "Once you've found a home you're interested in, attend open houses and schedule private showings with your agent. Take photos and notes. Consider the home's condition, layout, natural light, storage, and any potential issues. Have your agent pull comparable sales to understand if the asking price is fair.",
        tip: "Look beyond cosmetics — paint and flooring are easy to change, but structural issues, a bad roof, or outdated electrical are expensive. Pay attention to the condition of major systems: HVAC, plumbing, electrical, and the roof.",
        docs: "Your pre-approval letter (to show the seller's agent you're qualified).",
      },
      {
        text: "Submit a purchase offer through your agent",
        detail: "Your agent will prepare a written purchase offer that includes the price you're willing to pay, your financing terms, contingencies (inspection, appraisal, financing), your proposed closing date, and how much earnest money you'll deposit. The offer becomes a binding contract once both parties sign.",
        tip: "In a competitive market, consider including a personal letter to the seller (where legal), a larger earnest money deposit to show commitment, and flexibility on the closing date. However, never waive the inspection contingency — it's your most important protection.",
        docs: "Pre-approval letter, proof of funds for earnest money deposit, signed purchase offer.",
      },
      {
        text: "Negotiate terms and agree on a purchase price",
        detail: "The seller may accept your offer, reject it, or counter with different terms. Negotiations may go back and forth on price, closing costs, repairs, closing date, and what personal property is included. Your agent handles these negotiations on your behalf.",
        tip: "Know your walk-away number before negotiations begin. Don't get emotionally attached to one property. If the seller counters, respond promptly — in a hot market, delays can cost you the deal. Every counteroffer has an expiration time.",
        docs: "Any counteroffers in writing, signed by both parties.",
      },
      {
        text: "Sign the purchase agreement",
        detail: "The purchase agreement (also called a contract of sale) is the legally binding contract between you and the seller. It specifies the purchase price, closing date, contingencies, earnest money amount, and all negotiated terms. Once signed by both parties, you are under contract.",
        tip: "Read every word of the purchase agreement before signing. Make sure all negotiated terms are included in writing — verbal agreements are not enforceable. Understand every contingency and its deadline. Your agent and, if applicable, your attorney should review it with you.",
        docs: "Signed purchase agreement, any addenda or amendments, contingency deadlines noted on your calendar.",
      },
      {
        text: "Pay your earnest money deposit",
        detail: "Earnest money (also called a good faith deposit) is money you deposit into an escrow account to show the seller you're serious about buying. It's typically 1-3% of the purchase price. If the deal closes, the earnest money is applied to your down payment or closing costs. If you back out without a valid contingency, you may forfeit it.",
        tip: "Make sure your earnest money is deposited into an escrow account held by the title company, escrow company, or attorney — never directly to the seller. Get a receipt. Verify wiring instructions by phone using a known number to avoid wire fraud.",
        docs: "Cashier's check or wire transfer confirmation, receipt from the escrow holder.",
      },
    ],
  },
  {
    title: "After Acceptance",
    color: "amber",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    tip: "This is when your title company gets involved. Owner's title insurance is one of the best investments you'll make — protecting your property for life.",
    items: [
      {
        text: "Formally apply for your mortgage loan",
        detail: "Even with pre-approval, you must submit a formal loan application once you're under contract. Your lender will need updated financial documents and details about the specific property you're purchasing. This triggers the Loan Estimate, which your lender must provide within 3 business days.",
        tip: "Do NOT make any major financial changes between pre-approval and closing — don't open new credit accounts, make large purchases, change jobs, or move large sums of money between accounts. Lenders re-verify your finances before closing and any changes could jeopardize your loan.",
        docs: "Updated pay stubs, bank statements, signed purchase agreement, property details (address, MLS listing).",
      },
      {
        text: "Lock in your mortgage interest rate",
        detail: "A rate lock guarantees your interest rate for a set period (typically 30-60 days) while your loan is processed. If rates go up during that time, your locked rate stays the same. Rate locks have expiration dates — if your closing is delayed past the lock period, you may need to pay for an extension or re-lock at current rates.",
        tip: "Lock your rate as soon as you're comfortable with the terms. A rate lock is free in most cases but has an expiration date. Ask your lender about float-down options that let you benefit if rates drop significantly after you lock.",
        docs: "Rate lock confirmation from your lender (get this in writing with the rate, lock period, and expiration date).",
      },
      {
        text: "Schedule a home inspection",
        detail: "A professional home inspection examines the property's major systems and structural components — roof, foundation, plumbing, electrical, HVAC, insulation, windows, and more. The inspector provides a detailed report with photos. This is your chance to discover problems before you're committed to the purchase.",
        tip: "Attend the inspection in person if possible. Walk through the property with the inspector and ask questions. No home is perfect — focus on major structural, safety, and system issues rather than cosmetic items. Use the inspection report to negotiate repairs or credits with the seller.",
        docs: "Inspection report (keep for your records — useful for maintenance planning even after closing).",
      },
      {
        text: "Schedule a pest inspection (if required)",
        detail: "A pest inspection checks for wood-destroying organisms including termites, carpenter ants, wood-boring beetles, and fungal damage. VA loans require a pest inspection in most states. FHA requirements vary by region. Even if not required, a pest inspection is recommended in areas where termites are common.",
        tip: "Many home inspectors offer pest inspections as an add-on for a discounted rate. If active infestation is found, treatment is typically negotiated as a seller expense. Ask about the inspection company's guarantee or warranty on the inspection.",
        docs: "Pest inspection report (also called a Wood Destroying Insect report or WDI report).",
      },
      {
        text: "Order a home appraisal (often arranged by lender)",
        detail: "Your lender orders an appraisal to confirm the property is worth at least as much as the loan amount. A licensed appraiser visits the property, measures it, evaluates its condition, and compares it to recent comparable sales. If the appraisal comes in low, you may need to renegotiate the price, make up the difference in cash, or walk away.",
        tip: "If the appraisal comes in below the purchase price, don't panic. You can request a reconsideration of value (provide additional comparable sales data), negotiate a lower price with the seller, pay the difference in cash, or exercise your appraisal contingency to withdraw from the contract.",
        docs: "Appraisal report (your lender receives this; you have the right to receive a copy).",
      },
      {
        text: "Shop for homeowner's insurance",
        detail: "Your lender requires homeowner's insurance (hazard insurance) to protect their collateral. You need to have a policy in place before closing, with the first year's premium typically paid at the closing table. Standard policies cover fire, wind, hail, theft, and liability — but NOT flood or earthquake.",
        tip: "Get quotes from at least 3-5 insurance companies. Ask about bundling discounts with auto insurance. Compare coverage limits, deductibles, and exclusions — not just premiums. Make sure you have enough coverage for the replacement cost of the structure.",
        docs: "Insurance declarations page (proof of insurance) showing effective date, coverage amounts, and your lender listed as an additional interest.",
      },
      {
        text: "Shop for owner's title insurance",
        detail: "Owner's title insurance protects you against financial loss from title defects that weren't discovered during the title search — such as unknown liens, forged deeds, missing heirs, or recording errors. It's a one-time premium paid at closing that protects you for as long as you or your heirs own the property.",
        tip: "Under RESPA, you have the right to choose your own title company. Get quotes from 2-3 providers. Ask about simultaneous issue discounts when purchasing both owner's and lender's policies from the same company — this can save 20-40% on the second policy.",
        docs: "Title insurance commitment (provided by the title company), final title insurance policy (issued after closing and recording).",
      },
      {
        text: "Review the title commitment/report",
        detail: "The title commitment (also called a preliminary title report) is produced by your title company after completing the title search. It shows the current owner, the legal description of the property, any liens or encumbrances, easements, and the conditions (requirements) that must be met before the title company will issue a title insurance policy.",
        tip: "Read the title commitment carefully, especially Schedule B (exceptions). These are items the title insurance policy will NOT cover. Common exceptions include easements, restrictive covenants, and mineral rights. Ask your title company to explain anything you don't understand.",
        docs: "Title commitment/preliminary title report, including Schedules A (ownership facts), B-I (requirements), and B-II (exceptions).",
      },
      {
        text: "Clear any title issues identified in the commitment",
        detail: "If the title search reveals issues — such as an outstanding lien, a judgment against the seller, a boundary dispute, or a missing signature in the chain of title — these must be resolved before closing. The title company lists these as requirements in the title commitment. The seller is typically responsible for clearing title issues.",
        tip: "Most title issues can be resolved, but some take time. Common fixes include paying off old liens, obtaining lien releases from prior lenders, recording missing documents, or getting quit-claim deeds from ex-spouses. Your title company and attorney (if applicable) handle most of this, but keep track of progress to avoid delays.",
        docs: "Lien releases, satisfaction of mortgage documents, corrective deeds, or other documents as needed to clear specific title issues.",
      },
    ],
  },
  {
    title: "One Week Before Closing",
    color: "red",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    tip: "CRITICAL: Always verify wiring instructions by phone using a number you already have. Never trust emailed wire instructions.",
    items: [
      {
        text: "Receive and review your Closing Disclosure (at least 3 days before)",
        detail: "Your lender must provide the Closing Disclosure at least 3 business days before closing. This 5-page document shows your final loan terms, monthly payment, and all closing costs. This is the most important document you'll review before closing — it replaces the old HUD-1 settlement statement.",
        tip: "Compare every line item to your Loan Estimate. Under TRID rules, some fees can't increase at all (lender fees, transfer taxes), some can increase up to 10% in aggregate (recording fees, services you didn't shop for), and some have no limit (services you chose, prepaid items). Question any fee that increased unexpectedly.",
        docs: "Closing Disclosure (provided by your lender), your original Loan Estimate (for comparison).",
      },
      {
        text: "Compare Closing Disclosure to your original Loan Estimate",
        detail: "TRID's tolerance rules limit how much fees can increase from the Loan Estimate to the Closing Disclosure. If any fees exceed the allowed tolerance, the lender must refund the difference at or after closing. This comparison is your primary tool for catching errors and overcharges.",
        tip: "Create a side-by-side comparison of every line item. Focus on Section A (origination charges — zero tolerance), Section B (services you cannot shop for — 10% aggregate tolerance), Section C (services you can shop for — no tolerance limit if you chose a provider not on the lender's list), and total closing costs.",
        docs: "Closing Disclosure and Loan Estimate side by side.",
      },
      {
        text: "Confirm your wire transfer amount and instructions BY PHONE",
        detail: "Wire fraud is one of the biggest threats in real estate transactions. Criminals hack email accounts and send fake wiring instructions that look legitimate — redirecting your funds to their accounts. Once a wire is sent, it is extremely difficult to recover.",
        tip: "NEVER wire money based solely on emailed instructions. Always call your settlement agent or title company using a phone number you obtained independently (from their website or your original paperwork — not from the email). Verify the account number, routing number, and exact amount by phone before initiating the wire.",
        docs: "Verified wiring instructions (confirmed by phone), wire transfer confirmation from your bank.",
      },
      {
        text: "Verify wire transfer cutoff times with your bank",
        detail: "Banks have daily cutoff times for processing wire transfers — typically between 2:00 PM and 4:00 PM. If you miss the cutoff, your wire won't be sent until the next business day, which could delay your closing. International wires and wires from some online banks may take even longer.",
        tip: "Call your bank at least 2-3 days before closing to find out their wire cutoff time, whether they require advance notice for large wires, and if there are any daily wire limits. Some banks require you to appear in person for wires over a certain amount. Plan accordingly.",
        docs: "None, but note the cutoff time and any requirements from your bank.",
      },
      {
        text: "Schedule your final walk-through",
        detail: "The final walk-through is your last chance to inspect the property before closing. You're verifying that the property is in the condition specified in your contract — that agreed-upon repairs were made, the seller hasn't removed fixtures or items included in the sale, and no new damage has occurred.",
        tip: "Do the walk-through as close to closing as possible — ideally the day before or the morning of. Bring your inspection report and check that negotiated repairs were completed. Test all appliances, lights, faucets, toilets, HVAC, and the garage door. Open every door and window. Check the basement and attic.",
        docs: "Your inspection report (for reference), purchase agreement listing included items and agreed repairs.",
      },
      {
        text: "Gather required documents (ID, proof of insurance, certified funds)",
        detail: "On closing day, you'll need government-issued photo identification, proof of homeowner's insurance, and either a cashier's check or wire transfer confirmation for your closing costs and down payment. Your settlement agent will tell you the exact amount needed.",
        tip: "Prepare everything the day before closing. Make sure your ID is not expired. If your name on the ID doesn't match the name on the loan documents exactly (maiden name, middle name differences), bring supporting documentation like a marriage certificate. Call your settlement agent to confirm exactly what to bring.",
        docs: "Government-issued photo ID (driver's license or passport), proof of homeowner's insurance (declarations page), cashier's check or wire confirmation for the exact amount specified by your settlement agent.",
      },
      {
        text: "Confirm closing date, time, and location",
        detail: "Confirm all the logistics of your closing appointment. Know exactly where to go, when to be there, and how long it will take. If you're doing a hybrid or remote closing, confirm the technology requirements and test your setup in advance.",
        tip: "Arrive 10-15 minutes early. Bring a pen (though pens are usually provided). If you're signing at a title company office, ask about parking. Plan for the signing to take 60-90 minutes for a traditional in-person closing.",
        docs: "Closing confirmation from your settlement agent with address, date, time, and contact information.",
      },
      {
        text: "Set up utilities and schedule change of address",
        detail: "Arrange to have utilities transferred into your name as of the closing date. This includes electric, gas, water/sewer, trash, internet, and any other services. Also file a change of address with the USPS and update your address with important contacts — banks, employers, insurance companies, subscriptions.",
        tip: "Call utility companies at least a week before closing. Ask the seller not to disconnect utilities — it's easier to transfer than to set up new service. File your USPS change of address online at usps.com. The postal service will forward most mail for up to a year.",
        docs: "Utility account numbers and transfer confirmation, USPS change of address confirmation.",
      },
    ],
  },
  {
    title: "Closing Day",
    color: "purple",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    tip: "You're almost there! Review everything carefully before signing. Don't be afraid to ask questions — this is your biggest investment.",
    items: [
      {
        text: "Complete final walk-through of the property",
        detail: "If you haven't done the walk-through the day before, do it the morning of closing. This is your contractual right and your last opportunity to ensure the property is in the agreed-upon condition before you take ownership.",
        tip: "If you find issues during the walk-through — damage, missing items, or incomplete repairs — tell your agent immediately. Do not proceed to closing until the issue is resolved or you have a written agreement (such as an escrow holdback) to address it after closing.",
        docs: "Your inspection report and purchase agreement (for reference during the walk-through).",
      },
      {
        text: "Bring government-issued photo ID",
        detail: "You must present valid, government-issued photo identification at closing. The notary will verify your identity before you sign any documents. Most settlement offices accept a driver's license or passport. The name on your ID must match the name on the loan documents.",
        tip: "Check the expiration date on your ID now. If it's expired or will expire before closing, renew it immediately. If your legal name has changed (marriage, for example), bring supporting documentation like a marriage certificate or court order.",
        docs: "Valid driver's license, passport, or state-issued ID. Military ID is accepted at most closings.",
      },
      {
        text: "Bring proof of homeowner's insurance",
        detail: "Your lender requires proof that the property is insured before they will fund the loan. You should have purchased a homeowner's insurance policy during the 'After Acceptance' phase. Bring the declarations page showing your coverage, effective date, and the lender listed as an additional interest.",
        tip: "If you haven't already sent the insurance declarations page to your lender and settlement agent, bring a copy to closing. Most lenders require the policy to be effective on or before the closing date, with the first year's premium prepaid.",
        docs: "Homeowner's insurance declarations page showing policy number, coverage amounts, effective date, and lender listed as mortgagee/additional interest.",
      },
      {
        text: "Bring certified/cashier's check or wire confirmation",
        detail: "You need to bring the funds to close — the exact amount your settlement agent specified on your Closing Disclosure. This is typically a cashier's check (made out to the settlement agent's company) or a wire transfer confirmation. Personal checks are not accepted for closing funds.",
        tip: "Get the cashier's check the day before closing. Make sure it's made out to exactly the right payee (your settlement agent will specify). If wiring funds, initiate the wire early enough to arrive before closing. Bring a copy of the wire confirmation.",
        docs: "Cashier's check or wire transfer confirmation for the exact amount on your Closing Disclosure.",
      },
      {
        text: "Review and sign all closing documents",
        detail: "At the closing table, you'll sign 50-100+ pages of documents. The key documents include the Closing Disclosure, promissory note (your promise to repay), deed of trust or mortgage (giving the lender a security interest), the deed (transferring ownership to you), title insurance documents, affidavits, and various disclosures.",
        tip: "Take your time. Read what you're signing. The closing agent should explain each document. Don't be afraid to ask questions — if something doesn't match what you expected, stop and ask before signing. Verify your name, the property address, loan amount, interest rate, and monthly payment on every document.",
        docs: "Your Closing Disclosure (for reference), a list of questions you want answered. The settlement agent provides all documents for signing.",
      },
      {
        text: "Receive your keys!",
        detail: "Once all documents are signed and funds are disbursed, you'll receive the keys to your new home. In some states, you receive the keys immediately after signing. In others, you receive them after the deed is recorded with the county — which can take a few hours to a business day.",
        tip: "Ask your settlement agent when you can expect to take possession. In most transactions, you'll get the keys the same day. Make sure you get all keys, garage door openers, gate codes, and alarm system codes. Consider changing the locks on your new home as one of your first steps.",
        docs: "Keys, garage door openers, gate codes, alarm codes, and a copy of your signed closing documents (your settlement agent will provide these, often digitally).",
      },
    ],
  },
];

export default function ClosingChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeDetail, setActiveDetail] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);
  const { addItem: addFolderItem } = useClosingFolder();
  const [folderSaved, setFolderSaved] = useState(false);

  const toggleItem = (sectionIdx: number, itemIdx: number) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = checklistSections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const gradientMap: Record<string, string> = {
    blue: "from-[#1a5276] to-[#0a7ea8]",
    green: "from-[#2d6b3f] to-[#1a5276]",
    amber: "from-[#8b6914] to-[#943030]",
    red: "from-[#943030] to-[#5b3a8c]",
    purple: "from-[#5b3a8c] to-[#1a5276]",
  };

  const openItemDetail = (item: typeof checklistSections[0]["items"][0], sectionColor: string) => {
    setActiveDetail({
      title: item.text,
      gradient: gradientMap[sectionColor] || gradientMap.blue,
      content: (
        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">Why This Step Matters</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{item.detail}</p>
          </div>

          {item.docs && (
            <div>
              <h3 className="font-bold text-alta-navy text-sm mb-1">What Documents You Need</h3>
              <p className="text-sm text-alta-gray leading-relaxed">{item.docs}</p>
            </div>
          )}

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">Common Mistakes to Avoid</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{getCommonMistake(item.text)}</p>
          </div>

          <div className="p-3 bg-alta-light rounded-xl border border-gray-100">
            <h3 className="font-bold text-alta-teal text-sm mb-1">Pro Tip</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{item.tip}</p>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
    <PageHero
      title="Interactive Closing Checklist"
      subtitle="Track your progress and print a copy to bring with you on closing day."
      image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920&q=80"
      breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Closing Checklist", href: "/closing-process/closing-checklist" }]}
    />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Page intro */}
        <div className="mb-6 p-4 bg-[#f0ecf6] rounded-2xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5b3a8c]/15 flex items-center justify-center text-[#5b3a8c] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Your Complete Closing Roadmap</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Check off items as you complete them. Tap the info icon on any item to learn why it matters, what documents you need, and expert tips. Print a blank copy to take with you, or use this page on your phone during the process.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-alta-navy">Your Checklist</h2>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-2 px-5 py-2.5 bg-alta-navy text-white font-semibold rounded-lg hover:bg-alta-teal transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Checklist
            </button>
            <button
              onClick={() => {
                const summary = checklistSections.map((section, sIdx) => {
                  const items = section.items.map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}`;
                    return `${checked[key] ? "[x]" : "[ ]"} ${item.text}`;
                  }).join("\n");
                  return `${section.title}\n${items}`;
                }).join("\n\n");
                addFolderItem({
                  type: "checklist",
                  title: `Closing Checklist (${checkedCount}/${totalItems} complete)`,
                  content: summary,
                });
                setFolderSaved(true);
                setTimeout(() => setFolderSaved(false), 2000);
              }}
              className="no-print inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a8ebc] text-white font-semibold rounded-lg hover:bg-[#087da5] transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
              {folderSaved ? "Saved!" : "Save to My Folder"}
            </button>
          </div>
        </div>
        <p className="text-lg text-alta-gray mb-8 max-w-2xl">
          Track your progress through the home closing process. Check off items as you complete them. Print a blank copy to take with you.
        </p>

        {/* Session warning */}
        <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
          <svg className="w-4 h-4 text-[#8b6914] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
          <p className="text-xs text-[#8b6914]"><strong>Note:</strong> Your checked items are saved for this browser session only. If you close the tab or clear your browser, your progress will reset. Use the Print button above to save a physical copy.</p>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm py-4 mb-8 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-alta-navy">Your Progress</span>
            <span className="text-sm font-bold text-alta-teal">{checkedCount}/{totalItems} ({progress}%)</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-alta-teal rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-10">
          {checklistSections.map((section, sIdx) => {
            const sectionChecked = section.items.filter((_, iIdx) => checked[`${sIdx}-${iIdx}`]).length;
            const sectionComplete = sectionChecked === section.items.length;
            const colorMap: Record<string, { border: string; bg: string; badge: string }> = {
              blue: { border: "border-blue-200", bg: "from-[#1a5276] to-[#154463]", badge: "bg-blue-100 text-blue-700" },
              green: { border: "border-green-200", bg: "from-[#2d6b3f] to-[#235532]", badge: "bg-green-100 text-green-700" },
              amber: { border: "border-amber-200", bg: "from-[#8b6914] to-[#705410]", badge: "bg-amber-100 text-amber-700" },
              red: { border: "border-red-200", bg: "from-[#943030] to-[#7a2020]", badge: "bg-red-100 text-red-700" },
              purple: { border: "border-purple-200", bg: "from-[#5b3a8c] to-[#482d70]", badge: "bg-purple-100 text-purple-700" },
            };
            const c = colorMap[section.color] || colorMap.blue;
            return (
              <div key={section.title} className={`rounded-2xl border ${sectionComplete ? 'border-green-300 bg-green-50/30' : c.border} overflow-hidden`}>
                {/* Section header with image */}
                <div className="relative h-28 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${section.image}')` }} />
                  <div className={`absolute inset-0 bg-gradient-to-r ${c.bg} ${sectionComplete ? 'opacity-20' : 'opacity-30'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="relative z-10 flex items-center justify-between h-full px-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">{sIdx + 1}</span>
                      <h2 className="text-lg font-bold text-white drop-shadow">{section.title}</h2>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${sectionComplete ? 'bg-[#2d6b3f] text-white' : 'bg-white/20 text-white'}`}>
                      {sectionChecked}/{section.items.length}
                    </span>
                  </div>
                </div>
                {/* Tip */}
                <div className={`px-5 py-3 ${c.badge} text-xs flex items-start gap-2`}>
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-medium">{section.tip}</span>
                </div>
                {/* Items */}
                <div className="p-4 space-y-2">
                  {section.items.map((item, iIdx) => {
                    const key = `${sIdx}-${iIdx}`;
                    const isChecked = checked[key] || false;
                    return (
                      <div
                        key={key}
                        className={`check-item w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                          isChecked
                            ? "bg-green-50 border-green-200 checked"
                            : "bg-white border-gray-100 hover:border-alta-teal/30"
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(sIdx, iIdx)}
                          className="flex items-start gap-3 flex-1 text-left"
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked ? "bg-alta-green border-alta-green" : "border-gray-300"
                          }`}>
                            {isChecked && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm ${isChecked ? "text-alta-gray" : "text-alta-navy"}`}>{item.text}</span>
                        </button>
                        <button
                          onClick={() => openItemDetail(item, section.color)}
                          className="p-1 rounded-full hover:bg-alta-teal/10 transition-colors shrink-0 mt-0.5"
                          aria-label={`More info about: ${item.text}`}
                        >
                          <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <InlineAd />

        {/* Completion message */}
        {progress === 100 && (
          <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
            <h3 className="text-xl font-bold text-alta-green mb-2">Congratulations!</h3>
            <p className="text-alta-gray">You&apos;ve completed every item on the closing checklist. You&apos;re ready to close with confidence!</p>
          </div>
        )}

        <InlineAd />

        <div className="mt-6 p-4 bg-alta-light rounded-lg text-sm text-alta-gray">
          <strong className="text-alta-navy">Tip:</strong> Use the Print button above to take a blank copy with you. Your checked items won&apos;t persist between browser sessions, so consider bookmarking this page for easy access.
        </div>

        <ClosingFlowNav currentStep={3} />

        <FirstTimeBuyerCTA />
      </div>
    </div>

    {/* Detail Modal */}
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
          <div className="p-6">{activeDetail.content}</div>
        </div>
      </div>
    )}
    </>
  );
}

function getCommonMistake(itemText: string): string {
  const mistakes: Record<string, string> = {
    "Check your credit score and review your credit report":
      "Waiting until you're ready to buy to check your credit. Errors on your credit report can take 30-90 days to dispute and resolve. Also, don't confuse your free credit monitoring score (often a VantageScore) with your FICO score — lenders use FICO, and the numbers can differ significantly.",
    "Determine your budget (including closing costs — typically 2-5% of home price)":
      "Only budgeting for the down payment and forgetting about closing costs, moving expenses, and immediate repairs. Many buyers are surprised by the total cash needed at closing. Also, don't max out your pre-approval amount — leave room in your budget for unexpected expenses.",
    "Get pre-approved for a mortgage":
      "Confusing pre-qualification with pre-approval. Pre-qualification is an informal estimate; pre-approval involves a full credit check and income verification. Also, don't get pre-approved too early — most pre-approvals expire after 60-90 days.",
    "Choose a real estate agent":
      "Choosing the first agent you meet or using a friend/family member without evaluating their qualifications. A bad agent can cost you thousands in a poorly negotiated deal. Also, understand the new buyer representation agreement requirements following the 2024 NAR settlement.",
    "Research neighborhoods and school districts":
      "Only visiting a neighborhood once, during the day, on a weekday. Visit at different times to understand traffic patterns, noise levels, parking availability, and the overall feel of the neighborhood at night and on weekends.",
    "Find your home and schedule inspections":
      "Falling in love with a home's cosmetic appeal and overlooking structural or mechanical issues. Also, don't skip an inspection on new construction — new homes can have defects too.",
    "Submit a purchase offer through your agent":
      "Submitting a lowball offer in a competitive market and losing the home, or offering too much because of emotional attachment. Let your agent's analysis of comparable sales guide your offer price.",
    "Negotiate terms and agree on a purchase price":
      "Focusing only on price and ignoring other important terms like closing date, contingencies, and included personal property. A lower price with unfavorable terms can cost you more overall.",
    "Sign the purchase agreement":
      "Not reading the full contract before signing, or not understanding the contingency deadlines. Missing a contingency deadline can mean losing your right to back out or your earnest money.",
    "Pay your earnest money deposit":
      "Sending earnest money directly to the seller instead of to an escrow account, or falling victim to wire fraud by following emailed instructions without phone verification.",
    "Formally apply for your mortgage loan":
      "Making major financial changes after pre-approval — opening new credit cards, making large purchases, changing jobs, or co-signing someone else's loan. Lenders re-verify your finances before closing.",
    "Lock in your mortgage interest rate":
      "Waiting too long to lock, trying to time the market, or not understanding when the lock expires. If your lock expires before closing, you may need to pay for an extension or accept the current (potentially higher) rate.",
    "Schedule a home inspection":
      "Skipping the inspection to make your offer more competitive, or not attending the inspection in person. The inspection is your most important due diligence step — never waive it.",
    "Schedule a pest inspection (if required)":
      "Assuming that because you don't see evidence of pests, there isn't a problem. Termites can cause significant structural damage that isn't visible without a professional inspection.",
    "Order a home appraisal (often arranged by lender)":
      "Panicking if the appraisal comes in low. You have options: request a reconsideration of value with additional comparable sales, negotiate a lower price with the seller, make up the difference in cash, or use your appraisal contingency to withdraw.",
    "Shop for homeowner's insurance":
      "Getting only one quote and accepting it, or choosing the cheapest policy without understanding coverage limits and exclusions. Also, not realizing that standard policies don't cover flood or earthquake damage.",
    "Shop for owner's title insurance":
      "Not shopping at all and just accepting the title company your lender or agent suggests. Under RESPA, you have the right to choose your own title company, and prices can vary significantly.",
    "Review the title commitment/report":
      "Not reading Schedule B (exceptions) carefully. These are risks your title insurance will NOT cover. Common exceptions include easements and restrictive covenants that could affect how you use the property.",
    "Clear any title issues identified in the commitment":
      "Assuming title issues will resolve themselves or delaying action. Some title issues can take weeks to clear, and unresolved issues can delay or prevent closing.",
    "Receive and review your Closing Disclosure (at least 3 days before)":
      "Not reviewing the Closing Disclosure until you're at the closing table. You have 3 business days to review it — use that time. Also, not comparing it line-by-line to your Loan Estimate to catch fee increases.",
    "Compare Closing Disclosure to your original Loan Estimate":
      "Not understanding the tolerance categories. Some fees cannot increase at all, some can increase up to 10% in aggregate, and some have no limit. If you don't check, you won't catch overcharges.",
    "Confirm your wire transfer amount and instructions BY PHONE":
      "Trusting emailed wire instructions without independent phone verification. Wire fraud is one of the most common real estate scams — criminals intercept emails and substitute their own account numbers.",
    "Verify wire transfer cutoff times with your bank":
      "Waiting until the day of closing to wire funds and missing the bank's cutoff time, causing a delayed closing. Some banks also require advance notice or in-person visits for large wire transfers.",
    "Schedule your final walk-through":
      "Rushing through the walk-through or skipping it entirely. This is your last chance to verify the property's condition before you own it. Check that all agreed repairs were made and all included items are present.",
    "Gather required documents (ID, proof of insurance, certified funds)":
      "Bringing an expired ID, forgetting the insurance declarations page, or having the cashier's check made out to the wrong payee. Confirm every detail with your settlement agent the day before closing.",
    "Confirm closing date, time, and location":
      "Not confirming logistics and showing up at the wrong location or the wrong time. Also, not planning for the time commitment — a full in-person closing can take 60-90 minutes.",
    "Set up utilities and schedule change of address":
      "Forgetting to arrange utility transfers and arriving at a home with no electricity or water. Also, not filing a USPS change of address, which means missing important mail including your first mortgage statement.",
    "Complete final walk-through of the property":
      "Signing the closing documents even though you found issues during the walk-through. If there are problems, they need to be resolved or addressed in writing before you sign.",
    "Bring government-issued photo ID":
      "Not checking that the name on your ID matches your loan documents exactly. Discrepancies (maiden name, middle name, suffix) can cause delays at the closing table.",
    "Bring proof of homeowner's insurance":
      "Having insurance that doesn't list the lender as an additional interest, or having a policy that takes effect after the closing date. Both can delay funding.",
    "Bring certified/cashier's check or wire confirmation":
      "Bringing a personal check instead of a cashier's check, having the wrong amount, or having the check made out to the wrong party. Confirm the exact amount and payee with your settlement agent.",
    "Review and sign all closing documents":
      "Rushing through the signing without reading. If the interest rate, monthly payment, loan amount, or closing costs don't match what you expected, stop and ask before signing.",
    "Receive your keys!":
      "Assuming you can move in immediately. In some states, you don't take possession until the deed is recorded, which can take a few hours to a business day after signing. Ask your settlement agent when you can officially take possession.",
  };
  return mistakes[itemText] || "Not completing this step on time or in the correct order. Follow the checklist sequence and don't skip ahead without completing earlier steps.";
}
