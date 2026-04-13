"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import ClosingFlowNav from "@/components/ClosingFlowNav";

const options = [
  {
    title: "In-Person Closing",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    summary: "All parties meet at the settlement provider's office to review and sign transfer documents together.",
    howItWorks: [
      "You, your real estate agent, and possibly the seller meet at the title company or attorney's office",
      "The closing agent walks you through each document, explaining what you're signing",
      "You sign the deed, promissory note, deed of trust, and Closing Disclosure",
      "You provide your certified check or wire transfer confirmation for closing costs and down payment",
      "The closing agent collects all signatures, disburses funds, and records the deed with the county",
      "You receive your keys — typically the same day or within 24-48 hours after recording",
    ],
    whoAttends: "Buyer, seller (sometimes), real estate agents, closing/settlement agent, possibly an attorney (required in some states)",
    duration: "Typically 30-90 minutes depending on complexity",
    pros: ["Face-to-face guidance from your closing agent", "Immediate answers to questions", "All parties present to resolve last-minute issues", "Familiar and straightforward process"],
    cons: ["Requires scheduling coordination among multiple parties", "Travel to the office required", "May need to take time off work", "Can feel rushed if the office is busy"],
    bestFor: "Buyers who want hands-on guidance, complex transactions, and first-time homebuyers who benefit from having an expert walk them through each document.",
    learnMore: {
      preparation: "Arrive 10-15 minutes early. Bring two forms of government-issued ID (your driver's license and passport if you have one), your cashier's check or wire confirmation, and proof of homeowner's insurance. Wear comfortable clothing — you may be sitting for up to 90 minutes. Eat beforehand and bring water.",
      whatHappens: "The closing agent will have all documents organized and tabbed for your signature. They'll walk you through each document, explaining its purpose. You'll sign or initial 50-100+ pages. The closing agent will collect funds, verify all signatures, and prepare documents for recording. In most cases, you'll receive your keys the same day after the deed is recorded.",
      questions: [
        "Can I review the documents before closing day? (Yes — ask for copies in advance)",
        "What happens if I find an error at the closing table? (The closing agent can correct most errors on the spot, but significant changes may require a new Closing Disclosure and another 3-day waiting period)",
        "Do I need to bring anything for the seller? (No — the closing agent handles all seller-side documents separately)",
        "What if the seller doesn't show up? (In many transactions, the seller signs separately. Ask your agent about the arrangement.)",
      ],
      afterClosing: "After signing, the closing agent will disburse funds — paying off the seller's existing mortgage, paying real estate agents, and sending the remaining proceeds to the seller. The deed and deed of trust are sent to the county recorder's office. You'll receive your recorded deed by mail in 4-8 weeks. Your settlement agent will provide copies of all signed documents, often digitally.",
    },
  },
  {
    title: "Mail-Away / Mobile Notary",
    image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=600&q=80",
    summary: "The settlement provider sends closing documents to you via courier. A notary meets you at a location of your choice to witness your signing.",
    howItWorks: [
      "Your settlement agent prepares all closing documents and sends them to you via overnight courier or secure delivery",
      "You review the documents at your own pace before the notary arrives",
      "A notary public meets you at your home, office, or another convenient location",
      "The notary verifies your identity, witnesses your signatures, and notarizes the required documents",
      "Signed documents are returned to the settlement agent via courier",
      "The settlement agent disburses funds and records the deed once all signatures are collected",
    ],
    whoAttends: "Buyer and a mobile notary (seller signs separately, often at a different time/location)",
    duration: "Document review: at your pace. Signing with notary: 20-45 minutes",
    pros: ["Convenient for out-of-state or relocating buyers", "Flexible scheduling — evenings and weekends often available", "No travel to an office required", "Review documents at your own pace before signing"],
    cons: ["May cost extra for mobile notary services ($150-$300)", "Settlement agent isn't present to explain documents in person", "Mail delays can affect timing", "You may need to fund separately from signing"],
    bestFor: "Out-of-state buyers, military personnel, buyers with mobility challenges, or anyone who can't travel to a settlement office.",
    learnMore: {
      preparation: "When you receive the document package by courier, open it immediately and review every page. Make a list of questions and call your settlement agent or attorney to get answers before the notary arrives. The notary's role is to verify your identity and witness signatures — they cannot provide legal advice or explain the documents.",
      whatHappens: "The mobile notary will arrive at your chosen location (your home, a coffee shop, your office, or a hotel lobby — anywhere with a flat surface for signing). They'll verify your ID, watch you sign each document, and apply their notarial seal. The entire process typically takes 20-45 minutes. The notary then sends the signed documents back to the settlement agent via overnight courier.",
      questions: [
        "Who pays for the mobile notary? (This varies — sometimes the buyer, sometimes the settlement agent includes it in their fee. Ask upfront.)",
        "What if I have questions about a document during signing? (The notary cannot answer legal questions. Call your settlement agent or attorney before the notary appointment.)",
        "How do I send my funds? (Wire your closing funds directly to the settlement agent before or on closing day. The notary does not handle funds.)",
        "What if the courier is delayed? (Build in extra time. Request overnight or same-day delivery, and have a backup plan.)",
      ],
      afterClosing: "Once the settlement agent receives your signed documents and confirms funds have been received, they will record the deed and disburse funds. There may be a 1-2 day delay compared to an in-person closing due to courier transit time. Your keys may be held by the listing agent or in a lockbox until recording is confirmed.",
    },
  },
  {
    title: "Hybrid Closing",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    summary: "You pre-sign most documents electronically through a secure portal, then visit the office briefly to execute only the key transfer documents that require wet signatures.",
    howItWorks: [
      "Your settlement agent sends you a secure link to a digital signing portal (like Qualia, SoftPro, or Notarize)",
      "You review and electronically sign most disclosures, affidavits, and ancillary documents from home",
      "You then visit the settlement office for a brief appointment to sign the deed, promissory note, and deed of trust — documents that typically require a wet (ink) signature and notarization",
      "The closing agent verifies everything, disburses funds, and records the deed",
      "Total office time is dramatically reduced — often 15-30 minutes instead of 60-90",
    ],
    whoAttends: "Buyer and closing agent at the office (digital portion is done solo at home)",
    duration: "Digital portion: at your pace. Office visit: 15-30 minutes",
    pros: ["Significantly less time in the office", "Review most documents at your own pace at home", "Ask questions electronically before the appointment", "Best of digital convenience and in-person security"],
    cons: ["Still requires an office visit for key documents", "Requires comfort with electronic signing platforms", "Not available from all settlement providers", "May require printing and scanning some documents"],
    bestFor: "Buyers comfortable with technology who want to minimize office time but still want a human present for the critical signing.",
    learnMore: {
      preparation: "When you receive the e-signing portal link, set aside 30-60 minutes of uninterrupted time to review and sign the digital documents carefully. Don't rush through them just because they're electronic — read everything. Make note of any questions and email or call your settlement agent before your in-person appointment. For the office visit, bring your ID and cashier's check or wire confirmation.",
      whatHappens: "The digital signing portion happens through a secure, encrypted portal. You'll electronically sign disclosures, affidavits, compliance documents, and other ancillary paperwork. When you arrive at the office for the in-person portion, the closing agent will already have verified your digital signatures. You'll only need to sign the deed, promissory note, and deed of trust with a pen — these are the documents that require notarization. The entire office visit typically takes 15-30 minutes.",
      questions: [
        "Which documents require wet signatures vs. electronic signatures? (The deed, promissory note, and deed of trust typically require wet signatures and notarization. Most other documents can be signed electronically.)",
        "Is the electronic signing portal secure? (Reputable settlement providers use encrypted, SOC 2-compliant platforms with audit trails.)",
        "What if I make a mistake on an electronic signature? (Contact your settlement agent — they can void the signature and re-send the document.)",
        "Can I do the digital portion on my phone? (Most e-signing platforms work on mobile devices, but a laptop or desktop may be easier for reviewing lengthy documents.)",
      ],
      afterClosing: "The process after signing is the same as a traditional closing — the settlement agent disburses funds, records the deed, and you receive your keys. The main advantage is that you spent significantly less time at the office, and you had more time to review documents at your own pace beforehand.",
    },
  },
  {
    title: "Remote Online Notarization (RON)",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    summary: "A fully digital closing where all documents — including the deed and note — are signed electronically and notarized via a live audio-video session with a commissioned remote notary. As of 2026, 45 states and the District of Columbia have enacted permanent RON legislation — a milestone made possible in large part by the advocacy of the American Land Title Association (ALTA) and the Mortgage Bankers Association (MBA), who partnered in 2017 to develop model legislation and have since worked with state officials across the country to bring this secure, accessible closing method to homebuyers nationwide. At the federal level, the bipartisan SECURE Notarization Act aims to establish national standards and enable RON in the remaining states.",
    howItWorks: [
      "Your settlement agent sets up a secure video session on a RON platform (such as Notarize, Nexsys, or Pavaso)",
      "You verify your identity through knowledge-based authentication (KBA) questions and credential analysis — the platform verifies your ID in real time",
      "A commissioned remote online notary joins the video call and walks you through each document",
      "You sign each document electronically while the notary watches via live video",
      "The notary applies their electronic notarial seal and certificate to each notarized document",
      "The entire session is recorded and stored as a tamper-evident record",
      "Your settlement agent disburses funds and records the deed electronically",
    ],
    whoAttends: "Buyer and a remote online notary (via live video). No one needs to be in the same physical location.",
    duration: "Typically 30-60 minutes for the video session",
    pros: ["Complete the entire closing from anywhere with internet", "No travel, no office visit, no scheduling around business hours", "Full recording of the session for security and dispute resolution", "Identity verification is often MORE rigorous than in-person", "Accessible for buyers with disabilities or in remote areas"],
    cons: ["Requires reliable internet connection and a device with camera/microphone", "Available in 45 states + DC as of 2026, with federal legislation pending for the remaining states", "Some county recorders don't yet accept electronically notarized documents", "Some lenders don't support RON closings", "Less personal — you're interacting through a screen"],
    bestFor: "Tech-savvy buyers, remote workers, military personnel overseas, or anyone in a state that permits RON who wants maximum convenience.",
    learnMore: {
      preparation: "Test your technology before the session — you'll need a computer or tablet with a reliable internet connection, a working webcam, a microphone, and a quiet, well-lit room. Make sure your device's browser is up to date. Have your government-issued photo ID ready for the identity verification step. Review your Closing Disclosure in advance so you're familiar with the numbers and terms.",
      whatHappens: "When the session begins, the RON platform will guide you through identity verification. You'll answer knowledge-based authentication (KBA) questions (drawn from public records and credit bureau data — questions only you should know the answers to) and show your ID to the camera for credential analysis. Once verified, the notary joins the video session and walks you through each document, just like an in-person closing. You sign electronically by clicking or typing your signature. The notary applies their electronic seal and certificate. The entire session is recorded and stored as a tamper-evident digital record.",
      questions: [
        "What if my internet drops during the session? (Most RON platforms allow you to reconnect and resume. The session recording ensures nothing is lost.)",
        "Is a RON closing as legally valid as an in-person closing? (Yes, in states that have enacted RON legislation. The electronic signatures and notarization are fully legally binding.)",
        "Can both buyer and seller do a RON closing? (Yes — each party can sign from different locations, even in different states.)",
        "What are the KBA questions like? (Questions based on your personal history — previous addresses, vehicles you've owned, people associated with your address. They are pulled from public records.)",
      ],
      afterClosing: "After the session, your settlement agent receives the electronically signed and notarized documents. They disburse funds and submit the deed for electronic recording (e-recording) with the county, where available. E-recording is typically faster than traditional recording — often same-day. You'll receive digital copies of all documents and your keys will be made available per the arrangement with your real estate agent.",
    },
  },
];

const closingDocuments = [
  {
    name: "Closing Disclosure",
    desc: "Final terms and costs of your mortgage. You should have reviewed this 3+ days before closing.",
    detail: {
      whatItIs: "The Closing Disclosure is a 5-page standardized form required by federal law (TRID/TILA-RESPA Integrated Disclosure rule) that details the final terms of your mortgage loan. It replaces the old HUD-1 Settlement Statement. Your lender must provide it at least 3 business days before closing so you have time to review it. It includes your loan terms, projected monthly payments, closing costs, cash to close, and a summary of your transaction.",
      whatToLookFor: [
        "Verify the loan amount, interest rate, and monthly payment match what you were quoted",
        "Compare every fee to your Loan Estimate — check for unexpected increases",
        "Confirm the cash to close amount matches what your settlement agent told you to bring",
        "Check that your name, the property address, and the loan term are correct",
        "Review the escrow account details and projected monthly payment breakdown",
      ],
      commonIssues: [
        "Fees that increased from the Loan Estimate beyond TRID tolerance limits — the lender must refund the difference",
        "New fees that didn't appear on the Loan Estimate — ask for an explanation",
        "Incorrect proration of property taxes or HOA dues between buyer and seller",
        "Wrong closing date, which affects prepaid interest and proration calculations",
      ],
      questionsToAsk: [
        "Can I get a copy of the Closing Disclosure before the 3-day deadline to review early?",
        "Why did this specific fee increase from my Loan Estimate?",
        "Is my escrow amount calculated correctly based on my property tax and insurance schedule?",
        "What happens if I find an error — can it be corrected before closing?",
      ],
    },
  },
  {
    name: "Promissory Note",
    desc: "Your legal promise to repay the loan. Specifies amount, rate, term, and consequences of default.",
    detail: {
      whatItIs: "The promissory note is your personal, legally binding promise to repay the mortgage loan. It specifies the loan amount (principal), interest rate, monthly payment amount, payment due dates, loan term (typically 15 or 30 years), and the consequences of failing to make payments (default). Unlike the deed of trust, the promissory note is a personal obligation — you are personally liable for the debt regardless of what happens to the property.",
      whatToLookFor: [
        "Confirm the principal amount matches your Closing Disclosure",
        "Verify the interest rate — is it fixed or adjustable? If adjustable, check the adjustment caps and schedule",
        "Check the monthly payment amount and when the first payment is due",
        "Read the late payment provisions — when is a payment considered late, and what is the penalty?",
        "Understand the prepayment terms — can you pay off the loan early without penalty?",
      ],
      commonIssues: [
        "Interest rate doesn't match what was locked — this could indicate an error or that your lock expired",
        "Prepayment penalties — most modern conventional loans don't have them, but some loan products do",
        "Missing or incorrect first payment date",
        "Confusion between the note (personal obligation) and the deed of trust (lien on the property)",
      ],
      questionsToAsk: [
        "Is there a prepayment penalty if I pay off the loan early or make extra principal payments?",
        "Exactly when is my first payment due, and where do I send it?",
        "If I have an adjustable rate, when is the first adjustment and what are the caps?",
        "What happens if I make a late payment — is there a grace period before penalties apply?",
      ],
    },
  },
  {
    name: "Deed of Trust / Mortgage",
    desc: "Gives the lender a security interest in your property. If you default, this is what allows foreclosure.",
    detail: {
      whatItIs: "The deed of trust (or mortgage, depending on your state) is the document that gives your lender a security interest (lien) in your property. If you fail to make payments as agreed in the promissory note, this document gives the lender the legal right to foreclose on the property to recover their investment. In deed of trust states, a third-party trustee holds the title until the loan is paid off. In mortgage states, the borrower holds the title but the lender has a lien.",
      whatToLookFor: [
        "Verify the property address and legal description are correct",
        "Confirm the loan amount matches the promissory note and Closing Disclosure",
        "Read the clauses about insurance and property tax requirements — failure to maintain insurance or pay taxes can trigger default",
        "Understand the due-on-sale clause — if you sell or transfer the property, the full loan balance becomes due immediately",
        "Check for any riders (additional terms) related to condominiums, adjustable rates, or other special conditions",
      ],
      commonIssues: [
        "Incorrect legal description of the property — this must match the deed exactly",
        "Missing riders for condominiums, planned unit developments, or adjustable-rate loans",
        "Confusion about the due-on-sale clause and its implications if you want to transfer the property",
        "Not understanding that failure to pay property taxes or maintain insurance is considered a default",
      ],
      questionsToAsk: [
        "What is the difference between the deed of trust and the deed?",
        "What triggers a default under this document besides missing a payment?",
        "If I want to add someone to the title later, does the due-on-sale clause apply?",
        "How is the foreclosure process handled in my state if I default?",
      ],
    },
  },
  {
    name: "Deed",
    desc: "Transfers legal ownership of the property from the seller to you. Recorded with the county after closing.",
    detail: {
      whatItIs: "The deed is the legal document that transfers ownership (title) of the property from the seller to you. Once signed by the seller, notarized, and recorded with the county recorder's office, it becomes the public record of your ownership. There are different types of deeds — a general warranty deed provides the most protection (the seller guarantees clear title and will defend against all claims), while a quitclaim deed provides the least (the seller transfers whatever interest they have with no guarantees).",
      whatToLookFor: [
        "Confirm the type of deed — a general warranty deed provides the strongest buyer protection",
        "Verify the legal description matches the title commitment and deed of trust",
        "Check that the seller's name matches exactly how they took title when they purchased the property",
        "Confirm your name is spelled correctly and matches how you want to hold title (individual, joint tenants, tenants in common, etc.)",
        "Look for any reservations or exceptions noted in the deed",
      ],
      commonIssues: [
        "Name misspellings — these can cause problems with future refinancing or selling",
        "Wrong vesting (how you hold title) — this affects inheritance, liability, and tax implications",
        "Legal description errors — must match exactly to the survey and title commitment",
        "Using a quitclaim deed instead of a warranty deed (provides less buyer protection)",
      ],
      questionsToAsk: [
        "What type of deed am I receiving, and what protections does it provide?",
        "How should I hold title — individually, as joint tenants, tenants in common, or in a trust?",
        "When will the deed be recorded, and how long until I receive my recorded copy?",
        "Does the deed include any reservations or exceptions I should be aware of?",
      ],
    },
  },
  {
    name: "Title Insurance Commitments",
    desc: "Documents related to your lender's and owner's title insurance policies. Lists covered risks and exceptions.",
    detail: {
      whatItIs: "The title insurance commitment (also called a preliminary title report) is the document your title company issues after completing the title search. It commits the title company to issuing a title insurance policy once all requirements are met. It contains three schedules: Schedule A (basic facts — property, owner, lender, purchase price), Schedule B-I (requirements that must be met before closing, such as paying off existing liens), and Schedule B-II (exceptions — items the policy will NOT cover, such as easements, mineral rights, or specific encumbrances).",
      whatToLookFor: [
        "Schedule A: Verify the property address, legal description, current owner, proposed buyer name, and purchase price are all correct",
        "Schedule B-I (Requirements): Make sure all requirements can be met before closing — payoff of existing mortgages, tax liens, judgments",
        "Schedule B-II (Exceptions): Read carefully — these are risks your title insurance will NOT cover. Common exceptions include utility easements, restrictive covenants, mineral rights reservations, and survey-related issues",
        "Ask your title company to explain any exception you don't understand",
        "Check whether the standard survey exception has been removed (it should be if a satisfactory survey was provided)",
      ],
      commonIssues: [
        "Not reviewing Schedule B-II exceptions — these are items NOT covered by your policy",
        "Requirements in Schedule B-I that haven't been satisfied before closing",
        "Incorrect property information in Schedule A",
        "Standard exceptions that could have been removed with additional documentation (like a survey)",
      ],
      questionsToAsk: [
        "Can any of the Schedule B-II exceptions be removed?",
        "Are all Schedule B-I requirements on track to be completed before closing?",
        "What does this specific exception mean for my use of the property?",
        "When will I receive my actual title insurance policy after closing?",
      ],
    },
  },
  {
    name: "Affidavits and Declarations",
    desc: "Various sworn statements — occupancy intent, identity verification, name affidavits, and compliance disclosures.",
    detail: {
      whatItIs: "At closing, you'll sign several affidavits (sworn statements) and declarations. These include an occupancy affidavit (stating whether you'll use the property as your primary residence, second home, or investment property), a name affidavit (confirming your identity and that you are the same person named in the loan documents), a compliance agreement (agreeing to correct any document errors discovered after closing), and various federal and state required disclosures.",
      whatToLookFor: [
        "Occupancy affidavit: Make sure it accurately reflects your intended use — misrepresenting occupancy is mortgage fraud",
        "Name affidavit: Verify all names, aliases, and variations are listed correctly",
        "Compliance agreement: Understand that you're agreeing to correct any document errors after closing — this is standard",
        "Read each affidavit carefully — you're signing under penalty of perjury",
        "Check state-specific disclosures for any unusual provisions",
      ],
      commonIssues: [
        "Incorrect occupancy designation — this affects your loan terms and is a federal offense if intentionally misrepresented",
        "Missing name variations or aliases that should be listed on the name affidavit",
        "Not reading compliance agreements carefully — while standard, understand what you're agreeing to",
        "Signing an affidavit that contains inaccurate information without correcting it first",
      ],
      questionsToAsk: [
        "What happens if I want to convert my primary residence to a rental later — does the occupancy affidavit prevent that?",
        "Are there any affidavits specific to my state that I should understand before signing?",
        "What does the compliance agreement require me to do after closing?",
        "If my name has changed since applying for the loan, what additional documentation do I need?",
      ],
    },
  },
  {
    name: "Escrow Agreement",
    desc: "Sets up your escrow account for property taxes and insurance, specifying the initial deposit and monthly contributions.",
    detail: {
      whatItIs: "The escrow agreement establishes the escrow (impound) account that your lender uses to pay your property taxes and homeowner's insurance on your behalf. Each month, a portion of your mortgage payment goes into this account. When property tax and insurance bills are due, the lender pays them from the escrow account. RESPA regulates escrow accounts and limits the cushion (extra amount) a lender can require to no more than 2 months of payments.",
      whatToLookFor: [
        "Verify the initial escrow deposit amount matches your Closing Disclosure",
        "Check the monthly escrow contribution — it should align with your property tax and insurance costs",
        "Confirm the escrow cushion doesn't exceed RESPA's 2-month limit",
        "Understand when the lender will pay your property taxes and insurance from the account",
        "Review the escrow analysis schedule — your lender must perform an annual analysis and refund any surplus over $50",
      ],
      commonIssues: [
        "Initial escrow deposit that's higher than necessary — this can happen if the lender overestimates taxes or insurance",
        "Escrow shortage after the first annual analysis, leading to higher monthly payments",
        "Lender failing to pay property taxes or insurance on time from the escrow account",
        "Not understanding that escrow payments can change annually based on tax and insurance rate changes",
      ],
      questionsToAsk: [
        "Can I waive escrow and pay my own taxes and insurance? (Often possible with 20%+ down payment, may include a small fee)",
        "When will my first escrow analysis be, and what happens if there's a shortage?",
        "What happens if my property taxes or insurance premiums increase?",
        "How is the initial escrow deposit calculated, and is the cushion within RESPA limits?",
      ],
    },
  },
  {
    name: "Initial Escrow Disclosure",
    desc: "Itemizes the amounts going into your escrow account and the projected disbursement schedule.",
    detail: {
      whatItIs: "The initial escrow disclosure statement is a detailed accounting of your escrow account as of closing. It shows the initial deposit (funds collected at closing), projected monthly deposits (from your mortgage payment), anticipated disbursements (when your lender will pay property taxes and insurance), and the projected account balance month by month for the first year. This is required under RESPA Section 10.",
      whatToLookFor: [
        "Verify the property tax amounts and due dates match your local tax schedule",
        "Confirm the homeowner's insurance premium matches your policy",
        "Check that the initial deposit and monthly contributions result in enough funds to cover each disbursement",
        "Look for any months where the projected balance drops close to zero — this could indicate a shortage",
        "Compare the escrow amounts to your Closing Disclosure to ensure consistency",
      ],
      commonIssues: [
        "Incorrect property tax amounts — the lender may use estimated values that don't match actual bills",
        "Missing insurance premiums (flood insurance, for example, if required)",
        "Confusion about when disbursements occur vs. when taxes and insurance are actually due",
        "Not understanding that the first year's projections are estimates and will be corrected in the annual escrow analysis",
      ],
      questionsToAsk: [
        "Are the property tax amounts based on actual bills or estimates?",
        "When will the first escrow analysis be performed, and what if there's a shortage?",
        "Does this include all required insurance (homeowner's, flood, etc.)?",
        "If my property gets reassessed and taxes increase, how does that affect my monthly payment?",
      ],
    },
  },
];

export default function ClosingOptionsPage() {
  const [activeDetail, setActiveDetail] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

  const openOptionDetail = (opt: typeof options[0]) => {
    const d = opt.learnMore;
    setActiveDetail({
      title: opt.title,
      gradient: "from-[#1a5276] to-[#0a7ea8]",
      content: (
        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">How to Prepare</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.preparation}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">What Happens During the Closing</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.whatHappens}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-2">Questions to Ask Your Settlement Agent</h3>
            <ul className="space-y-2">
              {d.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-alta-gray">
                  <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-alta-light rounded-xl border border-gray-100">
            <h3 className="font-bold text-alta-teal text-sm mb-1">After Closing</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.afterClosing}</p>
          </div>
        </div>
      ),
    });
  };

  const openDocDetail = (doc: typeof closingDocuments[0]) => {
    const d = doc.detail;
    setActiveDetail({
      title: doc.name,
      gradient: "from-[#5b3a8c] to-[#1a5276]",
      content: (
        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-1">What This Document Is</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{d.whatItIs}</p>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-2">What to Look for Before Signing</h3>
            <ul className="space-y-1.5">
              {d.whatToLookFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-alta-gray">
                  <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-alta-navy text-sm mb-2">Common Issues</h3>
            <ul className="space-y-1.5">
              {d.commonIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-alta-gray">
                  <svg className="w-4 h-4 text-[#943030] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                  <span className="leading-relaxed">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-alta-light rounded-xl border border-gray-100">
            <h3 className="font-bold text-alta-teal text-sm mb-2">Questions to Ask</h3>
            <ul className="space-y-1.5">
              {d.questionsToAsk.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-alta-gray">
                  <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      <PageHero
        title="Closing Options"
        subtitle="Today's homebuyers have more choices than ever for how they complete their closing. Find the method that works best for you."
        image="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "Closing Options", href: "/closing-process/closing-options" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-[#e9f5ed] rounded-2xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2d6b3f]/15 flex items-center justify-center text-[#2d6b3f] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Choose How You Close</h2>
                <p className="text-sm text-alta-gray leading-relaxed">The closing method you choose affects how you sign documents, where you need to be, and how long the process takes. Not all options are available in every state or from every settlement provider. Ask your title company which methods they support before your closing date is set. Below is a detailed comparison of all four options — how they work step by step, who&apos;s involved, and which is best for your situation.</p>
              </div>
            </div>
          </div>

          {/* Detailed option breakdowns */}
          <div className="space-y-8 mb-10">
            {options.map((opt, i) => (
              <div key={opt.title} className="rounded-2xl border border-[#c5d8e4] overflow-hidden shadow-sm bg-white tile-interactive">
                {/* Header with image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${opt.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Option {i + 1} of 4</span>
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">{opt.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-alta-gray leading-relaxed mb-5">{opt.summary}</p>

                  {/* Quick facts */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div className="p-3 bg-alta-light rounded-xl">
                      <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Who Attends</p>
                      <p className="text-xs text-alta-gray">{opt.whoAttends}</p>
                    </div>
                    <div className="p-3 bg-alta-light rounded-xl">
                      <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Typical Duration</p>
                      <p className="text-xs text-alta-gray">{opt.duration}</p>
                    </div>
                  </div>

                  {/* How it works */}
                  <h3 className="font-bold text-alta-navy mb-3">How It Works — Step by Step</h3>
                  <div className="space-y-2 mb-5">
                    {opt.howItWorks.map((step, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-alta-teal text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{j + 1}</span>
                        <p className="text-sm text-alta-gray leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <h4 className="text-sm font-bold text-green-700 mb-2">Advantages</h4>
                      <ul className="space-y-1.5">
                        {opt.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-xs text-green-800">
                            <svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <h4 className="text-sm font-bold text-amber-700 mb-2">Things to Consider</h4>
                      <ul className="space-y-1.5">
                        {opt.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2 text-xs text-amber-800">
                            <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Best for */}
                  <div className="p-3 bg-gradient-to-r from-alta-teal/5 to-alta-teal/10 rounded-xl border border-alta-teal/20 mb-4">
                    <p className="text-xs text-alta-gray"><strong className="text-alta-navy">Best for:</strong> {opt.bestFor}</p>
                  </div>

                  {/* Learn More button */}
                  <button
                    onClick={() => openOptionDetail(opt)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a5276] text-white text-sm font-semibold rounded-lg hover:bg-[#0a7ea8] transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          <InlineAd />

          {/* What documents you'll sign */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Documents You&apos;ll Sign at Closing</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Regardless of which closing method you choose, you&apos;ll sign essentially the same set of documents. The method only changes HOW and WHERE you sign them — not what you sign. Tap any document to learn what it is, what to look for, and what questions to ask.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {closingDocuments.map((doc) => (
              <button
                key={doc.name}
                onClick={() => openDocDetail(doc)}
                className="text-left p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] shadow-sm hover:shadow-md hover:border-[#5b3a8c]/50 transition-all cursor-pointer group tile-interactive"
              >
                <h3 className="text-sm font-bold text-alta-navy mb-1 group-hover:text-[#5b3a8c] transition-colors flex items-center gap-1.5">
                  {doc.name}
                  <svg className="w-3.5 h-3.5 text-[#5b3a8c] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </h3>
                <p className="text-xs text-alta-gray leading-relaxed">{doc.desc}</p>
              </button>
            ))}
          </div>

          {/* State availability note */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 mb-6">
            <h3 className="font-bold text-alta-navy mb-2">RON State Availability</h3>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              As of 2026, <strong className="text-alta-navy">45 states and the District of Columbia</strong> have enacted permanent RON legislation — up from just one state (Virginia) in 2011. This rapid expansion was driven by the joint advocacy of the <strong className="text-alta-navy">American Land Title Association (ALTA)</strong> and the Mortgage Bankers Association (MBA), who developed model legislation in 2017 and worked with lawmakers in every state to pass it. Early adopters include Virginia (2011), Texas, Florida, Michigan, and Nevada.
            </p>
            <p className="text-[10px] text-alta-teal font-medium mb-3">Source: ALTA, MBA</p>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              At the federal level, the <strong className="text-alta-navy">SECURE Notarization Act</strong> (HR 1777) has bipartisan support and would establish national minimum standards for RON, enabling interstate recognition and opening RON to homebuyers in the remaining states. ALTA, MBA, and the National Association of Realtors are among its strongest advocates.
            </p>
            <p className="text-sm text-alta-gray leading-relaxed">
              <strong className="text-alta-navy">Important:</strong> Even if your state allows RON, your lender or settlement provider may not offer it. Some county recorder&apos;s offices do not yet accept electronically notarized documents for recording. Always ask about available closing methods early in the process so you can plan accordingly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Closing Checklist
            </Link>
            <Link href="/closing-disclosure" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Understanding Your Closing Disclosure
            </Link>
            <Link href="/find-company" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Find a Company
            </Link>
          </div>

          <ClosingFlowNav currentStep={2} />

          <FirstTimeBuyerCTA />
        </div>
      </div>

      {/* Detail Modal */}
      {activeDetail && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setActiveDetail(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
