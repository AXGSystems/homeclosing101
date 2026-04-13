"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const docSections = [
  {
    title: "Identification",
    color: "blue",
    docs: [
      { name: "Government-issued photo ID", desc: "Driver's license, passport, or state ID. Must be valid and not expired.", required: true,
        modalContent: { tips: "Check the expiration date on your ID well in advance of closing — if it expires before your closing date, renew it immediately. Processing times for renewals vary by state (2-8 weeks). A passport is an excellent backup form of ID. If you recently changed your name (marriage, divorce), make sure your ID reflects your current legal name as it appears on the mortgage documents.", watchFor: "The name on your ID must match the name on your loan documents exactly. Even small differences (Robert vs Bob, hyphenated last name vs single) can cause delays. If there is a discrepancy, ask your settlement agent what documentation is needed to resolve it.", whereToGet: "Your state's Department of Motor Vehicles (DMV) for driver's licenses and state IDs. The U.S. Department of State for passports (apply at post offices or passport agencies). Many states now offer Real ID-compliant licenses — check if yours is compliant." }
      },
      { name: "Social Security card", desc: "Or documentation showing your SSN. Some states require this.", required: false,
        modalContent: { tips: "If you cannot locate your Social Security card, you can request a replacement through the Social Security Administration (ssa.gov) or visit a local SSA office. Processing takes 10-14 business days. In most states, a document showing your SSN (such as a W-2, SSA-1099, or the SSN letter from SSA) is acceptable.", watchFor: "Your SSN must match what is on file with your lender. If you have changed your name with the Social Security Administration but not yet received a new card, bring documentation of the name change (marriage certificate, court order).", whereToGet: "Social Security Administration (ssa.gov) for replacement cards — free of charge. You can apply online if you meet certain criteria, or visit your local SSA office with a valid photo ID." }
      },
      { name: "Proof of legal residency", desc: "If applicable — green card, visa, or citizenship documents.", required: false,
        modalContent: { tips: "Non-U.S. citizens can purchase property in the United States. Your lender may require proof of legal residency status. Common accepted documents include: Permanent Resident Card (green card), employment authorization card, or a valid visa with supporting documentation. ITIN (Individual Taxpayer Identification Number) holders may qualify for certain loan programs.", watchFor: "Work visas (H-1B, L-1, etc.) have expiration dates. If your visa expires during the loan term, some lenders may have additional requirements. Be transparent with your lender about your immigration status from the start.", whereToGet: "U.S. Citizenship and Immigration Services (USCIS) for permanent resident cards and employment authorization. Your employer's immigration attorney for visa documentation." }
      },
    ],
  },
  {
    title: "Financial Documents",
    color: "green",
    docs: [
      { name: "Certified/cashier's check or wire confirmation", desc: "For your closing costs and down payment. Amount will be on your Closing Disclosure.", required: true,
        modalContent: { tips: "The exact amount you need to bring is listed on your Closing Disclosure as 'Cash to Close.' Request a cashier's check from your bank 1-2 days before closing. For wire transfers, initiate the wire the business day before closing and verify the wire instructions by CALLING your settlement agent at a phone number you already have on file — never trust emailed wire instructions. Wire fraud is the biggest threat to your closing funds.", watchFor: "The cashier's check must be made payable to the settlement agent (title company or attorney) — not the seller. The exact payee name will be provided by your settlement agent. If you are wiring funds, confirm arrival with both your bank and the settlement agent before the closing appointment. Personal checks are not accepted for closing.", whereToGet: "Your bank or credit union for cashier's checks (typically $5-$15 fee). For wire transfers, use your bank's wire transfer service — available online, by phone, or in person. Initiate well before cutoff times (typically 2-4 PM for same-day domestic wires)." }
      },
      { name: "Proof of homeowner's insurance", desc: "Your insurance binder showing coverage effective on or before closing date.", required: true,
        modalContent: { tips: "Shop for homeowner's insurance 2-3 weeks before closing. Get quotes from at least 3 providers. Your insurance must be effective on or before your closing date — not the day after. Your lender and title company both need a copy of the insurance binder (also called a declaration page or evidence of insurance). The binder must include your lender's name and address as the mortgagee.", watchFor: "Verify the coverage amount meets your lender's requirements (typically the replacement cost of the dwelling or the loan amount, whichever is less). Make sure the property address matches exactly. The named insured must match the borrower names on the loan. If you are in a FEMA flood zone, you also need separate flood insurance.", whereToGet: "Contact insurance agents or companies directly for quotes. Independent agents can compare multiple carriers. Major insurers also offer direct quotes online. Your real estate agent may have recommendations, but you are not required to use their suggestion." }
      },
      { name: "Bank statements (last 2-3 months)", desc: "Showing the source of your down payment funds.", required: true,
        modalContent: { tips: "Your lender uses bank statements to verify the source of your down payment funds. They are looking for: sufficient funds available, no undisclosed debts (large regular payments), and no unexplained large deposits. If you received gift funds for your down payment, you will also need a gift letter from the donor and documentation of the transfer.", watchFor: "Large deposits that are not from your regular paycheck will need to be explained and documented ('sourced and seasoned'). If you transferred funds between accounts to consolidate for closing, be prepared to show a paper trail. Avoid large cash deposits in the months before closing — they are difficult to document.", whereToGet: "Download from your bank's online portal (most lenders accept electronic statements from the bank's website). If you need paper statements, request them from your bank branch. Statements must show your name, the bank's name, the account number, and all transactions." }
      },
      { name: "Pay stubs (last 30 days)", desc: "Your lender may request updated employment verification.", required: false,
        modalContent: { tips: "Even if you provided pay stubs during the loan application, your lender may request current pay stubs as part of their final verification before closing. This is standard procedure — they are confirming you are still employed at the same income. Keep your recent pay stubs readily accessible.", watchFor: "If your income has changed since you applied (raise, reduced hours, job change), notify your lender immediately. Do not change jobs during the closing process without discussing with your lender first — a job change can delay or jeopardize your loan approval.", whereToGet: "Your employer's payroll system or HR department. Many companies provide electronic pay stubs through payroll portals (ADP, Workday, Paychex, etc.). If your employer does not provide pay stubs, a signed letter from your employer on company letterhead confirming your employment and income may be accepted." }
      },
    ],
  },
  {
    title: "Loan & Property Documents",
    color: "amber",
    docs: [
      { name: "Closing Disclosure", desc: "Received at least 3 days before closing. Compare to your Loan Estimate.", required: true,
        modalContent: { tips: "You must receive your Closing Disclosure at least 3 business days before closing (this is federal law). Review it line by line and compare every number to your original Loan Estimate. Page 3 of the Closing Disclosure has a built-in comparison column. If anything looks wrong, contact your lender and settlement agent before the closing appointment — it is much harder to fix errors after you have signed.", watchFor: "Check for: correct loan amount and interest rate, accurate closing costs (some fees have tolerance limits and cannot increase), proper earnest money credit, correct prorations for taxes and insurance, and the correct cash to close amount. If the APR changes by more than 0.125% or the loan product changes, a new 3-day waiting period is triggered.", whereToGet: "Your lender is required to deliver this to you at least 3 business days before closing. It may be delivered electronically (if you consented to electronic delivery) or by mail. If you have not received it 4 business days before closing, contact your lender immediately." }
      },
      { name: "Loan Estimate (for comparison)", desc: "Your original estimate to verify costs haven't changed unexpectedly.", required: false,
        modalContent: { tips: "Bring your original Loan Estimate to closing so you can compare it against the Closing Disclosure in real time. While Page 3 of the Closing Disclosure shows a comparison, having the original document allows you to verify the comparison is accurate. Mark any changes you want to discuss before signing.", watchFor: "Certain fees are subject to zero tolerance (cannot increase at all): lender origination charges, points, and transfer taxes. Others are subject to 10% tolerance (total increase cannot exceed 10%): third-party services the lender selected, recording fees. Services you can shop for have no tolerance limit if you used a provider not on the lender's list.", whereToGet: "You should have received this within 3 business days of applying for your mortgage. Check your email or the lender's online portal. If you cannot find it, request a copy from your loan officer." }
      },
      { name: "Purchase agreement / contract", desc: "The signed agreement between you and the seller.", required: false,
        modalContent: { tips: "Your purchase agreement (also called the sales contract) contains the negotiated terms of your home purchase: the purchase price, contingencies, closing date, what is included (appliances, fixtures), and any seller concessions. Having this at closing helps verify that the terms on the Closing Disclosure match what was agreed upon.", watchFor: "Verify the purchase price matches the Closing Disclosure. Check that any negotiated seller concessions (closing cost credits) appear correctly. If there were amendments to the original contract (repair credits, closing date changes, price adjustments), bring those too.", whereToGet: "Your real estate agent should have provided you with a fully signed copy. It is also typically stored in the transaction management system used by the brokerages (Dotloop, DocuSign, SkySlope, etc.). Ask your agent for a copy if you cannot locate it." }
      },
      { name: "Home inspection report", desc: "For reference during final walk-through.", required: false,
        modalContent: { tips: "Bring your home inspection report to the final walk-through (typically done 24-48 hours before closing). Use it to verify that any repairs the seller agreed to have been completed. Check systems that were flagged as concerns. The final walk-through is your last opportunity to confirm the property's condition before you take ownership.", watchFor: "If the seller agreed to make repairs, look for evidence they were completed by a licensed professional (receipts, permits if applicable). Test all systems: HVAC, plumbing, electrical outlets, appliances. Run water in all sinks and flush all toilets. If something is wrong, notify your settlement agent before closing.", whereToGet: "Your home inspector should have provided the report electronically (PDF) and may have an online portal where you can access it. Check your email from around the time of the inspection. If you cannot find it, contact the inspection company directly." }
      },
      { name: "Appraisal report", desc: "Your lender should have this on file, but bring your copy.", required: false,
        modalContent: { tips: "Under federal law, your lender must provide you with a copy of the appraisal report at least 3 days before closing (or at the time of closing if you waive the 3-day advance delivery requirement). Review it to understand the appraised value and how it compares to your purchase price. The appraisal also identifies the property's condition, comparable sales used, and any issues noted.", watchFor: "If the appraisal came in lower than the purchase price, your lender may require you to make up the difference in cash, or you may need to renegotiate the purchase price with the seller. Also check for condition notes — the appraiser may flag issues that your lender requires to be resolved before closing (health and safety items).", whereToGet: "Your lender is required to provide a copy. Check your lender's online portal or email. You may also request it from your loan officer. Note: you paid for the appraisal (typically $400-$600) and are entitled to a copy regardless of the outcome." }
      },
    ],
  },
  {
    title: "Title & Insurance Documents",
    color: "purple",
    docs: [
      { name: "Title commitment/report", desc: "Shows the status of the property title and any exceptions.", required: true,
        modalContent: { tips: "The title commitment (also called a preliminary title report in some states) is the title company's commitment to issue a title insurance policy after closing. It has three key sections: Schedule A (basic transaction details — names, property, purchase price), Schedule B-I (requirements that must be met before closing), and Schedule B-II (exceptions — things the policy will NOT cover). Review Schedule B-II carefully.", watchFor: "Schedule B-II exceptions are items not covered by your title insurance policy. Common exceptions include: easements (utility companies' right to access your property), CC&Rs (subdivision restrictions), and any unresolved liens or encumbrances. Ask your settlement agent to explain each exception. Some can be removed with additional documentation or action.", whereToGet: "Your title company or settlement agent will provide this, typically 2-4 weeks before closing. If you have not received it 2 weeks before closing, contact your settlement agent. In attorney states, your real estate attorney may order and review the title work." }
      },
      { name: "Owner's title insurance policy info", desc: "If you've arranged your own title insurance (recommended).", required: false,
        modalContent: { tips: "An owner's title insurance policy is a one-time purchase that protects YOU (the homeowner) from title defects that existed before you bought the property. The lender's policy (which you are required to buy) only protects the lender. ALTA recommends purchasing an owner's policy for full protection. It covers: forged documents, undisclosed heirs, recording errors, liens, and other title defects. Protection lasts as long as you own the property.", watchFor: "If you are purchasing both an owner's and lender's policy from the same company, ask about a simultaneous issue discount — this can save you 40-60% on the owner's policy. Make sure the owner's policy amount equals the purchase price of the home. Review the policy exceptions (Schedule B) to understand what is and is not covered.", whereToGet: "Your settlement agent or title company can arrange the owner's title insurance policy. You have the right to shop for title insurance under RESPA (Real Estate Settlement Procedures Act). Compare quotes from 2-3 title companies." }
      },
      { name: "Survey (if required)", desc: "Property boundary survey — some states require this.", required: false,
        modalContent: { tips: "A property survey shows the exact boundaries of the property, the location of structures, easements, encroachments, and rights-of-way. Some states require a survey for every real estate transaction, while others do not. Even if not required, a survey can reveal issues like a neighbor's fence that encroaches on your property or a structure that violates setback requirements.", watchFor: "If a survey reveals encroachments (structures crossing property lines) or easements that were not disclosed, these need to be resolved before closing or noted as title insurance exceptions. Ask your title company how identified survey issues affect your title insurance coverage.", whereToGet: "Your settlement agent or title company can order a survey from a licensed surveyor. In some cases, a recent survey from the seller may be acceptable — ask your title company if the existing survey meets requirements. New surveys typically cost $300-$800 depending on property size and location." }
      },
      { name: "Flood certification", desc: "Determines if the property is in a flood zone.", required: false,
        modalContent: { tips: "A flood certification (also called a flood determination) identifies whether the property is located in a FEMA-designated Special Flood Hazard Area (SFHA). If it is, your lender will require you to purchase flood insurance before closing. Flood insurance is NOT included in standard homeowner's insurance policies — it is a separate policy available through the National Flood Insurance Program (NFIP) or private insurers.", watchFor: "Even if the property is not in a designated flood zone, you may still want flood insurance — about 25% of flood claims come from outside high-risk areas. If the property was recently remapped into or out of a flood zone, check the FEMA Flood Map Service Center for the most current maps.", whereToGet: "Your lender will typically order the flood certification as part of the loan process. You can also check FEMA's Flood Map Service Center (msc.fema.gov) to look up your property's flood zone designation. Flood insurance through NFIP is available from any licensed insurance agent." }
      },
    ],
  },
  {
    title: "Post-Closing Essentials",
    color: "teal",
    docs: [
      { name: "Copy of all signed documents", desc: "Your settlement agent should provide a complete packet.", required: true,
        modalContent: { tips: "At the end of closing, your settlement agent should provide a complete copy of every document you signed. This packet typically includes: the deed, promissory note, deed of trust/mortgage, Closing Disclosure, title insurance policies, affidavits, and any other transaction-specific documents. Store these in a secure location — you will need them for tax purposes, refinancing, and title insurance claims.", watchFor: "Verify you received a copy of EVERY document you signed. The most important documents to check for: the recorded deed (you may receive this weeks later after recording), your owner's title insurance policy (may take weeks to issue), and the final Closing Disclosure. If any document is missing, contact your settlement agent.", whereToGet: "Your settlement agent provides the initial packet at closing. The recorded deed is mailed to you by the county recorder's office after recording (2-8 weeks). Your owner's title insurance policy is mailed by the title insurance company after closing (4-12 weeks). If documents are delayed, contact your settlement agent." }
      },
      { name: "Keys, garage openers, access codes", desc: "You should receive these at or immediately after closing.", required: true,
        modalContent: { tips: "In most transactions, you receive keys at the closing table or shortly after the settlement agent confirms that the deed has been recorded and funds have been disbursed. The timing depends on your state's practices — some states have 'table funding' (same day) while others may have a brief delay. Ask your settlement agent when you should expect to receive keys.", watchFor: "Make sure you receive ALL access items: house keys (front, back, garage), mailbox keys, gate remotes, garage door openers, alarm system codes and manuals, pool/hot tub controls, smart home app access (Ring, Nest, etc.), and HOA amenity access cards or fobs. Change the locks and alarm codes immediately after taking possession.", whereToGet: "These are provided by the seller, typically through the listing agent or left at the property. If the seller is not present at closing, the listing agent usually has the keys. Smart home devices may need to be transferred via the manufacturer's app — ask the seller to remove their accounts so you can set up yours." }
      },
      { name: "Contact info for your title company", desc: "In case you need to file a claim or find your policy later.", required: true,
        modalContent: { tips: "Keep your title company's contact information in a safe, accessible place. You may need to contact them years or even decades after closing if: a title issue arises, you need a copy of your policy, you are selling the property and the buyer's title company has questions, or you need to file a claim. Store their name, phone number, email, and your policy number.", watchFor: "If your title company changes names or is acquired by another company, the successor company should honor your policy. The title insurance underwriter (Fidelity, First American, Old Republic, Stewart, or others) is the entity that ultimately backs your policy — keep their name and contact information as well.", whereToGet: "This information is on your Closing Disclosure, your title commitment, and your owner's title insurance policy. Your real estate agent and lender also have records of which title company handled your closing." }
      },
      { name: "Utility transfer confirmations", desc: "Water, electric, gas, internet — confirm effective dates.", required: false,
        modalContent: { tips: "Contact utility companies 1-2 weeks before closing to set up service in your name, effective on your closing date. Some utilities require 5-7 business days to process new accounts. Utilities to set up: electricity, natural gas, water/sewer, trash collection, internet/cable, and any other local services. Ask the seller's agent when the seller plans to disconnect their service to avoid gaps.", watchFor: "Make sure there is no gap in service — especially for heating/cooling (a house with no HVAC in extreme temperatures can suffer damage). Confirm the final meter readings so you are not charged for the seller's usage. Some utility companies require a deposit for new customers.", whereToGet: "Contact each utility provider directly. Your real estate agent or the listing agent can typically provide the names of the current utility providers for the property. Some municipalities have a single office where you can set up water, sewer, and trash all at once." }
      },
      { name: "Change of address confirmation", desc: "USPS, banks, subscriptions, employer, DMV.", required: false,
        modalContent: { tips: "File a change of address with USPS (usps.com or at your local post office) to forward mail from your old address. The fee is $1.10 for online filing (identity verification). Mail forwarding lasts 12 months for first-class mail and 60 days for periodicals. In addition to USPS, update your address directly with: your bank, credit card companies, employer, DMV, voter registration, insurance companies, healthcare providers, and subscription services.", watchFor: "Do not forget to update your address with: the IRS (file Form 8822), your state tax authority, your driver's license (most states require updates within 10-30 days of moving), voter registration, and any automated bill pay or delivery services. Set a reminder to update your homeowner's insurance with the correct property address.", whereToGet: "USPS change of address: usps.com or any post office. DMV: your state's DMV website or office. Voter registration: vote.gov. IRS: Form 8822 available at irs.gov. Most banks, credit cards, and insurance companies allow address changes through their websites or apps." }
      },
    ],
  },
];

const colorMap: Record<string, { border: string; badge: string; icon: string; gradient: string }> = {
  blue: { border: "border-blue-200", badge: "bg-blue-100 text-blue-700", icon: "text-blue-600", gradient: "from-[#1a5276] to-[#0a7ea8]" },
  green: { border: "border-green-200", badge: "bg-green-100 text-green-700", icon: "text-green-600", gradient: "from-[#2d6b3f] to-[#1a5276]" },
  amber: { border: "border-amber-200", badge: "bg-amber-100 text-amber-700", icon: "text-amber-600", gradient: "from-[#8b6914] to-[#1a5276]" },
  purple: { border: "border-purple-200", badge: "bg-purple-100 text-purple-700", icon: "text-purple-600", gradient: "from-[#5b3a8c] to-[#1a5276]" },
  teal: { border: "border-teal-200", badge: "bg-teal-100 text-teal-700", icon: "text-teal-600", gradient: "from-[#0a7ea8] to-[#1a5276]" },
};

export default function DocumentChecklistPage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

  return (
    <>
      <PageHero
        title="Closing Day Document Checklist"
        subtitle="Everything you need to bring to your closing appointment — organized by category and marked by importance."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Document Checklist", href: "/document-checklist" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Don&apos;t Forget Anything on Closing Day</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Print this checklist and verify each item before you leave for your closing appointment. Items marked with a star are required — the rest are recommended. <span className="text-alta-teal font-medium">Click any item for tips on obtaining it, what to watch for, and where to get it.</span></p>
              </div>
            </div>
          </div>

          <button onClick={() => window.print()} className="no-print inline-flex items-center gap-2 px-5 py-2.5 bg-alta-navy text-white font-semibold rounded-lg hover:bg-alta-teal transition-colors text-sm mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print This Checklist
          </button>

          <div className="space-y-8">
            {docSections.map((section) => {
              const c = colorMap[section.color];
              return (
                <div key={section.title} className={`rounded-2xl border ${c.border} overflow-hidden`}>
                  <div className={`px-5 py-3 ${c.badge} font-bold text-sm flex items-center justify-between`}>
                    <span>{section.title}</span>
                    <span className="text-xs font-normal opacity-70">{section.docs.length} items</span>
                  </div>
                  <div className="p-4 space-y-2 bg-white">
                    {section.docs.map((doc) => (
                      <div
                        key={doc.name}
                        onClick={() => setActiveModal({
                          title: doc.name,
                          gradient: c.gradient,
                          content: (
                            <div className="space-y-5">
                              {doc.required && (
                                <span className="inline-block text-[10px] font-bold bg-[#0a7ea8] text-white px-2.5 py-1 rounded">REQUIRED</span>
                              )}
                              <p className="text-sm text-gray-600 leading-relaxed">{doc.desc}</p>
                              <div>
                                <h3 className="text-sm font-bold text-[#1a5276] mb-2">Tips for Obtaining This Document</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.tips}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-[#8b6914] mb-2">What to Watch For</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.watchFor}</p>
                              </div>
                              <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                                <h3 className="text-sm font-bold text-[#1a5276] mb-2">Where to Get It</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.whereToGet}</p>
                              </div>
                            </div>
                          )
                        })}
                        className="flex items-start gap-3 p-3 bg-alta-light/50 rounded-xl hover:bg-alta-light transition-colors cursor-pointer group"
                      >
                        <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-alta-navy">{doc.name}</p>
                            {doc.required && <span className="text-[9px] font-bold bg-alta-teal text-white px-1.5 py-0.5 rounded">REQUIRED</span>}
                          </div>
                          <p className="text-xs text-alta-gray mt-0.5">{doc.desc}</p>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <InlineAd />

          {/* Pre-closing timeline */}
          <h2 className="text-xl font-bold text-alta-navy mb-4 mt-6">Pre-Closing Document Timeline</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Documents don&apos;t all arrive at once. Here&apos;s when to expect each one so you&apos;re not scrambling at the last minute:</p>
          <div className="space-y-3 mb-8">
            {[
              { when: "2-4 weeks before closing", what: "Title commitment arrives from your title company. Review Schedule B exceptions carefully — these are items NOT covered by your policy. Ask about removing any that can be cleared.", color: "bg-blue-50 border-blue-200" },
              { when: "1-2 weeks before closing", what: "Homeowner's insurance binder finalized. Your lender needs proof of coverage effective on or before closing date. Also set up utilities — some require 5-7 business days to activate.", color: "bg-green-50 border-green-200" },
              { when: "3 business days before closing", what: "Closing Disclosure delivered (required by federal law). Compare EVERY line to your Loan Estimate. If anything increased beyond tolerance limits, ask your lender to explain. This is your last chance to catch errors.", color: "bg-amber-50 border-amber-200" },
              { when: "1-2 days before closing", what: "Confirm wire transfer amount and instructions BY PHONE using a number you already have. Never trust emailed wire instructions. Contact your bank about wire cutoff times.", color: "bg-red-50 border-red-200" },
              { when: "Day of closing", what: "Complete final walk-through of the property. Bring all documents listed above, two forms of ID, and your certified funds or wire confirmation. Arrive early — closings typically take 30-90 minutes.", color: "bg-purple-50 border-purple-200" },
            ].map((t) => (
              <div key={t.when} className={`p-4 ${t.color} rounded-xl border tile-interactive`}>
                <p className="text-sm font-bold text-alta-navy mb-1">{t.when}</p>
                <p className="text-xs text-alta-gray leading-relaxed">{t.what}</p>
              </div>
            ))}
          </div>

          {/* Common mistakes */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">5 Common Document Mistakes That Delay Closings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { mistake: "Expired ID", fix: "Check your driver's license or passport expiration date NOW. If it expires before your closing date, renew it immediately." },
              { mistake: "Wrong insurance dates", fix: "Your homeowner's insurance must be effective ON or BEFORE your closing date — not the day after. Double-check the effective date." },
              { mistake: "Unsigned Closing Disclosure", fix: "If you haven't reviewed and acknowledged your Closing Disclosure at least 3 days before closing, the closing date may need to be pushed." },
              { mistake: "Wire sent to wrong account", fix: "Always verify wire instructions by phone. If you wired to a fraudulent account, contact your bank within the hour for the best chance of recovery." },
              { mistake: "Missing earnest money credit", fix: "Verify your earnest money deposit appears as a credit on the Closing Disclosure. If it's missing, alert your settlement agent before closing." },
            ].map((m) => (
              <div key={m.mistake} className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] shadow-sm tile-interactive border-l-4 border-l-[#943030]">
                <h3 className="text-sm font-bold text-[#943030] mb-1">{m.mistake}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{m.fix}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Full Closing Checklist
            </Link>
            <Link href="/questions-to-ask" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Questions to Ask
            </Link>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
