"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

type QuestionData = {
  q: string;
  whyItMatters: string;
  goodAnswer: string;
  redFlag: string;
  followUp: string;
};

const questionSections: {
  title: string;
  color: string;
  context: string;
  goodAnswer: string;
  questions: QuestionData[];
}[] = [
  {
    title: "Before Choosing a Title Company",
    color: "blue",
    context: "Ask these BEFORE you commit to a provider. You have the right to shop under RESPA. Get answers from 2-3 companies and compare.",
    goodAnswer: "A good company will proudly confirm ALTA membership, explain their Best Practices certification, and walk you through their wire fraud prevention process without hesitation.",
    questions: [
      {
        q: "Are you a member of the American Land Title Association (ALTA)?",
        whyItMatters: "ALTA is the national trade association representing the land title insurance industry. Members voluntarily commit to higher standards of professionalism and consumer protection. Choosing an ALTA member means you are working with a company that stays current on industry best practices and regulatory changes.",
        goodAnswer: "Yes, we are an active ALTA member and participate in their ongoing education and compliance programs. We follow ALTA's guidelines for consumer protection and settlement practices.",
        redFlag: "If the company does not know what ALTA is, or dismisses the question as unimportant, that suggests they may not be keeping up with industry standards and best practices.",
        followUp: "How long have you been an ALTA member, and do your staff participate in ALTA continuing education programs?",
      },
      {
        q: "Have you adopted ALTA's Title Insurance and Settlement Company Best Practices?",
        whyItMatters: "ALTA Best Practices is a voluntary framework of seven pillars covering licensing, escrow account management, information security, settlement procedures, title production, insurance coverage, and consumer complaints. Companies that adopt and are assessed against these practices have demonstrated a commitment to operational integrity.",
        goodAnswer: "Yes, we have been assessed against all seven pillars of ALTA Best Practices and maintain our compliance annually. We can share our most recent assessment results with you.",
        redFlag: "If the company says they follow best practices generally but has never undergone a formal ALTA Best Practices assessment, they may lack the verification that backs up that claim.",
        followUp: "Who performed your most recent Best Practices assessment, and when was it completed?",
      },
      {
        q: "What wire fraud prevention measures do you have in place?",
        whyItMatters: "Wire fraud targeting real estate transactions has increased dramatically. The FBI's Internet Crime Complaint Center reports hundreds of millions of dollars in losses annually from real estate wire fraud. A company with strong prevention protocols significantly reduces your risk of losing your down payment or closing funds to criminals.",
        goodAnswer: "We use multi-factor authentication for all wire instructions, verify wiring details by phone using a number we have on file (not from an email), and use encrypted communication channels. We also train our staff regularly on social engineering tactics.",
        redFlag: "If the company sends wire instructions via unencrypted email without any verbal verification step, or seems unfamiliar with current wire fraud schemes, your funds could be at serious risk.",
        followUp: "Have you ever had a client affected by a wire fraud attempt, and what happened?",
      },
      {
        q: "Do you use wire verification technology (e.g., CertifID)?",
        whyItMatters: "Wire verification platforms like CertifID add a technology layer on top of manual processes, validating the identity of the sender and recipient and confirming bank account ownership before funds are transferred. This provides an additional safeguard beyond phone verification alone.",
        goodAnswer: "Yes, we use CertifID (or a similar verified platform) to validate all wire transfers. You will receive a secure link to confirm your bank details through an encrypted channel before any funds move.",
        redFlag: "If the company relies solely on email to communicate wire instructions with no technology verification layer, that is a significant gap in their fraud prevention process.",
        followUp: "Will I receive a secure link or portal to verify my bank account details, and is the platform insured against fraud losses?",
      },
      {
        q: "Do you carry cybersecurity/errors & omissions insurance?",
        whyItMatters: "Errors and omissions insurance protects you if the title company makes a professional mistake during your transaction. Cybersecurity insurance (sometimes called cyber liability coverage) provides a financial safety net if a data breach or cyberattack affects your personal information or transaction funds.",
        goodAnswer: "Yes, we carry both E&O insurance and a dedicated cybersecurity policy. Our coverage limits meet or exceed industry recommendations, and we can provide proof of coverage upon request.",
        redFlag: "If the company hesitates, cannot provide proof of coverage, or only carries minimal E&O with no cyber coverage, your personal data and transaction may not be adequately protected in the event of an incident.",
        followUp: "What are your coverage limits, and does your cyber policy cover losses from social engineering attacks like business email compromise?",
      },
      {
        q: "What is your process for confirming wiring instructions?",
        whyItMatters: "The moment of wiring funds is the most vulnerable point in a real estate transaction. A clear, documented process for confirming wiring instructions prevents you from sending money to a fraudulent account. The company should never rely solely on email for this step.",
        goodAnswer: "We provide wiring instructions through a secure portal or in person, never by email alone. Before you wire, we will call you at the phone number we have on file to verbally confirm every detail. We also recommend you call us back at our published office number to double-verify.",
        redFlag: "If they say they just email the instructions and you wire the money, or if they seem annoyed by this question, that is a serious warning sign about their security practices.",
        followUp: "If I receive wiring instructions by email that look like they came from your office, what should I do before sending any money?",
      },
      {
        q: "Can you provide references from recent closings?",
        whyItMatters: "References from other homebuyers, real estate agents, or lenders give you real-world insight into how the company performs under pressure. Closings can be stressful, and knowing how a company handles complications or tight timelines is valuable information you will not get from a website.",
        goodAnswer: "Absolutely. We can connect you with recent clients who have agreed to serve as references, and we can also share reviews or testimonials. We are also happy to provide references from real estate agents and lenders we work with regularly.",
        redFlag: "If the company cannot or will not provide any references, or only directs you to anonymous online reviews they may have curated, that limits your ability to verify their track record.",
        followUp: "Can you connect me with a client who had a complicated closing, so I can hear how you handled it?",
      },
      {
        q: "What closing options do you offer (in-person, hybrid, remote/RON)?",
        whyItMatters: "Remote Online Notarization (RON) and hybrid closings have become widely available, offering flexibility for buyers who cannot easily travel to a closing office. However, RON availability varies by state, and not all title companies have invested in the technology. Knowing your options upfront helps you plan.",
        goodAnswer: "We offer in-person closings at our office or a location convenient to you, hybrid closings where some documents are signed remotely and the rest in person, and fully remote closings using Remote Online Notarization in states where it is permitted.",
        redFlag: "If the company only offers one option with no flexibility, or is unfamiliar with Remote Online Notarization, they may not have modernized their processes to serve today's buyers effectively.",
        followUp: "If I choose a remote closing, what platform do you use for the notarization, and is there an additional fee?",
      },
    ],
  },
  {
    title: "About Costs & Fees",
    color: "green",
    context: "Title insurance rates are regulated by each state, but service fees vary. Getting an itemized estimate in writing lets you compare apples to apples.",
    goodAnswer: "A transparent company will provide a detailed written estimate immediately and explain each fee. If they're vague or reluctant to put numbers in writing, that's a red flag.",
    questions: [
      {
        q: "What is the total cost of the owner's title insurance policy?",
        whyItMatters: "The owner's title insurance policy is a one-time premium paid at closing that protects your ownership rights for as long as you or your heirs own the property. Title insurance rates are regulated in most states, so the premium itself may not vary much between companies, but understanding the exact cost helps you budget accurately.",
        goodAnswer: "Based on your purchase price, the owner's title insurance premium will be a specific dollar amount. They should be able to quote this precisely because rates are set by state regulation or filed rate schedules.",
        redFlag: "If the company gives you a vague range or says they cannot tell you the cost until closing, that suggests a lack of transparency. In most states, the rate can be calculated as soon as the purchase price is known.",
        followUp: "Is this rate set by the state, or do you have flexibility in pricing? Are there any endorsements I should consider adding to my policy?",
      },
      {
        q: "What is the cost of the lender's title insurance policy?",
        whyItMatters: "If you are financing your purchase, your lender will require a separate lender's title insurance policy to protect their mortgage interest. This is a separate cost from the owner's policy, and understanding both helps you see the full picture of your title-related closing costs.",
        goodAnswer: "The lender's policy premium is based on your loan amount and is typically less expensive than the owner's policy. They should quote a specific dollar amount based on your loan details.",
        redFlag: "If the company bundles the two policies together without breaking out the cost of each, or if they cannot explain the difference between the two, that is a sign they may not be fully transparent about your costs.",
        followUp: "Does my lender require any specific endorsements on the lender's policy, and are those included in the quoted premium?",
      },
      {
        q: "Is there a simultaneous issue discount if I purchase both policies?",
        whyItMatters: "When you purchase both an owner's and lender's policy at the same time (which is typical in a purchase transaction), most states offer a simultaneous issue rate that significantly reduces the cost of the second policy. This discount can save you hundreds of dollars, but some companies may not proactively mention it.",
        goodAnswer: "Yes, when both policies are issued at the same closing, the lender's policy is issued at a reduced simultaneous issue rate. They should be able to tell you the exact savings.",
        redFlag: "If the company quotes full price for both policies without mentioning the simultaneous issue discount, they may be overcharging you. This discount is standard in most states.",
        followUp: "Is the simultaneous issue discount automatically applied, or do I need to request it specifically?",
      },
      {
        q: "What is the settlement/escrow fee?",
        whyItMatters: "The settlement or escrow fee covers the cost of the title company's work in coordinating the closing, managing the escrow account, preparing documents, and disbursing funds. Unlike title insurance premiums, which are often regulated, settlement fees can vary significantly between companies, making this a key comparison point.",
        goodAnswer: "Our settlement fee is a flat dollar amount that covers coordinating the closing, document preparation, escrow management, and fund disbursement. They should be able to give you an exact number, not a range.",
        redFlag: "If the settlement fee is quoted as a percentage of the purchase price rather than a flat fee, or if the company cannot give you a firm number, you may end up paying more than necessary for the same service.",
        followUp: "Is the settlement fee the same regardless of the purchase price, or does it scale with the transaction amount?",
      },
      {
        q: "Are there any additional fees I should expect (document prep, notary, courier)?",
        whyItMatters: "Beyond the main title insurance premiums and settlement fee, many companies charge ancillary fees for services like document preparation, mobile notary services, courier or overnight delivery, recording fees, and wire transfer fees. These can add up to several hundred dollars, and they are the area where costs vary most between companies.",
        goodAnswer: "Here is a complete list of every fee you can expect, including document preparation, notary, courier, recording, and wire transfer fees. A good company will volunteer this information proactively rather than waiting for you to discover surprise charges at closing.",
        redFlag: "If the company only quotes the big-ticket items and says something like 'there may be a few small additional fees,' you could be hit with unexpected charges at the closing table. Insist on a complete itemized list.",
        followUp: "Can you provide me with a written, itemized estimate that includes every fee I will be charged, including any that might vary?",
      },
      {
        q: "Do you offer a refinance rate if I refinance in the future?",
        whyItMatters: "Many title insurance underwriters offer a discounted reissue or refinance rate on the lender's policy when you refinance within a certain number of years of your original purchase. This can save you a meaningful amount on your next refinance. Choosing a company that offers this rate and will be around to honor it is a practical long-term benefit.",
        goodAnswer: "Yes, if you refinance within a certain period (often 3-10 years depending on the state and underwriter), we offer a refinance rate on the new lender's title policy. We will keep your file on record so we can apply it automatically.",
        redFlag: "If the company does not mention a refinance rate or says they do not offer one, you may miss out on savings in the future. Most major underwriters provide this discount.",
        followUp: "How long does the refinance rate remain available, and will you proactively remind me of this discount if I come back for a refinance?",
      },
      {
        q: "How do your fees compare to other providers in the area?",
        whyItMatters: "RESPA (the Real Estate Settlement Procedures Act) gives you the legal right to shop for your own title insurance and settlement services. Asking this question signals that you are an informed consumer and helps you gauge whether the company is competitively priced. Title insurance premiums may be regulated, but service fees are not.",
        goodAnswer: "Our title insurance premiums are based on the state-regulated rate schedule, so those will be similar across providers. Our service fees are competitive, and here is how they compare. A confident company will welcome the comparison rather than discouraging you from shopping.",
        redFlag: "If the company discourages you from shopping around, pressures you to commit immediately, or implies that all companies charge the same fees, they may be hoping you will not discover that their service fees are higher than competitors.",
        followUp: "Can you match or beat a competitor's written estimate on service fees if I bring one in?",
      },
      {
        q: "Can you provide an itemized fee estimate in writing?",
        whyItMatters: "A written, itemized estimate is your most powerful tool for comparing costs between title companies. It forces the company to commit to specific numbers and gives you a document to reference if charges change at closing. Under RESPA and TRID rules, your lender must provide a Loan Estimate, but getting a direct estimate from the title company gives you an additional point of comparison.",
        goodAnswer: "Absolutely. We will provide a detailed written estimate that breaks down every charge, including title insurance premiums, settlement fees, and all ancillary fees. They should be willing to provide this before you commit to using them.",
        redFlag: "If the company refuses to provide a written estimate, says they can only estimate at closing, or provides a vague one-line quote, treat that as a significant red flag. Transparency about costs should be a baseline expectation.",
        followUp: "If any fees change between this estimate and the actual closing, will you notify me in advance and explain why?",
      },
    ],
  },
  {
    title: "About the Title Search & Policy",
    color: "amber",
    context: "The title search is the foundation of your protection. Understanding what was found and what's excluded from your policy is critical.",
    goodAnswer: "A thorough company will explain the search scope, proactively discuss any exceptions in Schedule B, and offer to remove exceptions through additional curative work when possible.",
    questions: [
      {
        q: "How far back does your title search go?",
        whyItMatters: "The depth of a title search directly affects how well you are protected. Some companies search back 30 years, while others go further depending on state requirements and the complexity of the property's history. A search that does not go back far enough could miss old liens, boundary disputes, or ownership gaps that affect your rights.",
        goodAnswer: "Our standard search goes back at least the number of years required by our underwriter and state guidelines, typically 30 to 60 years or to the original land patent depending on the property. For properties with complex histories, we go further.",
        redFlag: "If the company says they only do a limited or abbreviated search to save time or cost, that shortcut could leave serious title defects undiscovered until after you have closed.",
        followUp: "For this specific property, are there any factors that would warrant a deeper search than your standard practice?",
      },
      {
        q: "What does the title search cover (liens, judgments, easements, encumbrances)?",
        whyItMatters: "A comprehensive title search should examine recorded documents including deeds, mortgages, liens, judgments, tax records, easements, restrictive covenants, and plat maps. Understanding the scope of the search helps you know whether the company is being thorough or cutting corners.",
        goodAnswer: "Our search covers the full chain of title including deeds and conveyances, mortgages and releases, tax liens and assessments, judgment liens, mechanics' liens, easements, restrictive covenants, and any recorded encumbrances affecting the property.",
        redFlag: "If the company cannot clearly articulate what their search covers, or if they omit categories like easements, tax liens, or judgments, important issues could go undetected.",
        followUp: "Will the search include a check for open building permits or code violations, or is that something I need to investigate separately?",
      },
      {
        q: "What happens if the title search uncovers a problem?",
        whyItMatters: "Title defects are more common than most buyers realize. Old mortgages that were never properly released, misspelled names in the chain of title, boundary disputes, or unpaid tax liens can all surface during a search. How the company handles these issues, known as curative work, directly affects whether your closing stays on track.",
        goodAnswer: "If we find an issue, we work to resolve it before closing. This is called curative work and may involve contacting prior lienholders, obtaining corrective documents, or negotiating with the seller to clear the defect. We will keep you and your agent informed throughout the process.",
        redFlag: "If the company suggests ignoring minor title issues or just listing them as exceptions on your policy rather than trying to resolve them, that leaves you with less protection after closing.",
        followUp: "How long does curative work typically take, and will it delay my closing if a problem is found?",
      },
      {
        q: "How long will the title search take?",
        whyItMatters: "The timeline for a title search affects your entire closing schedule. Delays in the search can push back your closing date, which may have financial consequences if your rate lock expires or your lease ends. Knowing the expected timeline helps you plan and sets realistic expectations.",
        goodAnswer: "A standard title search typically takes 5 to 10 business days, depending on the county and complexity of the property. We will notify you promptly if we anticipate any delays and keep you updated on progress.",
        redFlag: "If the company cannot give you any timeline, or if they seem unconcerned about meeting your closing date, that may indicate they are understaffed or disorganized.",
        followUp: "If the search takes longer than expected, how will that affect my closing date, and what can we do to stay on schedule?",
      },
      {
        q: "What are the exceptions listed in Schedule B of my policy?",
        whyItMatters: "Schedule B of your title insurance policy lists the specific items that are excluded from coverage. These exceptions are things your policy will NOT protect you against, such as certain easements, mineral rights, or specific recorded restrictions. Understanding these exceptions is essential because they define the limits of your protection.",
        goodAnswer: "Schedule B lists the specific exceptions to your coverage. Let me walk you through each one and explain what it means. A good company will review each exception with you and explain which are standard and which are specific to your property.",
        redFlag: "If the company does not review Schedule B with you, tells you not to worry about the exceptions, or discourages you from reading the commitment, you could be accepting significant gaps in your coverage without knowing it.",
        followUp: "Are any of these exceptions negotiable, and can any of them be removed with additional curative work or endorsements?",
      },
      {
        q: "Can you explain each exception and whether any can be removed?",
        whyItMatters: "Not all Schedule B exceptions are permanent. Some, like a prior mortgage that was paid off but never recorded as released, can be cleared with curative work. Others, like utility easements, are typically permanent but may be narrowed. Understanding which exceptions can be removed directly increases the protection you receive.",
        goodAnswer: "Let me go through each exception. This one is a standard survey exception that can be removed if you provide a current survey. This one is a recorded easement for the utility company that is permanent but does not affect your use of the property. We will work to remove any exception that can be cleared.",
        redFlag: "If the company cannot explain what each exception means in plain language, or if they refuse to attempt curative work on removable exceptions, you may end up with weaker coverage than you should have.",
        followUp: "If I obtain a current survey, will that allow you to remove the standard survey exception from my policy?",
      },
      {
        q: "What is covered under my owner's title insurance policy?",
        whyItMatters: "An owner's title insurance policy protects your equity in the property against losses from covered title defects that existed before or at the time of your purchase but were not known to you. This includes things like forged documents in the chain of title, undisclosed heirs claiming ownership, recording errors, and certain types of fraud.",
        goodAnswer: "Your owner's policy protects you against losses from defects in title that existed prior to your policy date, including forgery, fraud, undisclosed heirs, recording errors, undisclosed liens, and boundary or survey disputes (if the survey exception is removed). Coverage is up to the purchase price of the property.",
        redFlag: "If the company cannot clearly explain what the policy covers, or if they give you a vague answer like 'it covers everything,' they may not fully understand the product they are selling you.",
        followUp: "Does my policy include inflation protection so the coverage amount increases with my property's value over time?",
      },
      {
        q: "How long does coverage last?",
        whyItMatters: "Unlike other types of insurance that require annual renewal, an owner's title insurance policy lasts for as long as you or your heirs have an interest in the property. This means you pay a one-time premium at closing and are covered indefinitely. Understanding this helps you appreciate the long-term value of the policy.",
        goodAnswer: "Your owner's title insurance policy has no expiration date. It protects you for as long as you own the property, and it continues to protect your heirs if they inherit the property. There are no renewal premiums or annual fees.",
        redFlag: "If anyone suggests that your owner's title insurance expires after a certain number of years or requires renewal, that is incorrect and could indicate a fundamental misunderstanding of the product.",
        followUp: "If I sell the property, does my coverage end, or is there any residual protection related to warranties I may have given in the deed?",
      },
      {
        q: "Does the policy cover my heirs?",
        whyItMatters: "One of the most valuable features of an owner's title insurance policy is that coverage extends to your heirs who inherit the property. This means your children or other beneficiaries receive the same protection you do, without paying an additional premium. Not all buyers know about this benefit.",
        goodAnswer: "Yes, your owner's title insurance policy automatically covers your heirs who inherit the property through your estate. They receive the same coverage without any additional premium or action required on their part.",
        redFlag: "If the company is unsure whether heirs are covered, or suggests your family would need to purchase a new policy upon inheritance, that is incorrect for standard ALTA owner's policies.",
        followUp: "If I transfer the property into a living trust for estate planning purposes, does my title insurance coverage continue?",
      },
    ],
  },
  {
    title: "About the Closing Process",
    color: "purple",
    context: "Understanding the closing timeline, wire procedures, and document flow prevents surprises on closing day. Ask these early.",
    goodAnswer: "A professional settlement agent will clearly explain the 3-day Closing Disclosure rule, provide wire instructions through a secure channel (not email), and confirm receipt of funds promptly.",
    questions: [
      {
        q: "When will I receive my Closing Disclosure?",
        whyItMatters: "The Closing Disclosure is a five-page document that details your final loan terms, closing costs, and the cash you need to bring to closing. Federal law (the TILA-RESPA Integrated Disclosure or TRID rule) requires that you receive it at least three business days before closing. This waiting period exists so you have time to review the numbers and catch any errors.",
        goodAnswer: "You will receive your Closing Disclosure at least three business days before your scheduled closing date. We coordinate closely with your lender to make sure it is delivered on time. If you have questions about any line item, contact us immediately so we can resolve issues before closing day.",
        redFlag: "If the company says you will see the Closing Disclosure at the closing table, or seems unfamiliar with the three-business-day requirement, that is a serious compliance concern.",
        followUp: "If I find an error on the Closing Disclosure, what is the process for getting it corrected, and will that delay my closing?",
      },
      {
        q: "Will I have at least 3 business days to review it before closing?",
        whyItMatters: "The three-business-day review period is a federal consumer protection built into the TRID rule. Certain changes to the Closing Disclosure (such as an increase in your interest rate or a change in loan product) can restart the three-day clock, potentially delaying your closing. Understanding this helps you plan and avoid last-minute surprises.",
        goodAnswer: "Yes, absolutely. The three-day review period is required by federal law, and we build it into our closing timeline. We work with your lender to ensure the Closing Disclosure is issued with enough lead time. If any changes require a new three-day period, we will notify you immediately.",
        redFlag: "If anyone pressures you to waive your review period or sign a document saying you received the Closing Disclosure earlier than you actually did, that is a violation of federal law and a major red flag.",
        followUp: "What types of changes to the Closing Disclosure would trigger a new three-day waiting period?",
      },
      {
        q: "Who will be present at my closing?",
        whyItMatters: "Knowing who will be at the closing table helps you prepare and feel comfortable. Typically, the closing is conducted by a settlement agent or closing attorney (depending on your state), and a notary may also be present. Your real estate agent may attend, and the seller or seller's agent may or may not be present depending on local custom.",
        goodAnswer: "Your closing will be conducted by our licensed settlement agent (or closing attorney, depending on the state). A notary will be present to notarize your documents. Your real estate agent is welcome to attend. The seller typically signs separately, but we will confirm the arrangement for your specific closing.",
        redFlag: "If the company cannot tell you who will be conducting your closing, or if they plan to have someone without proper licensing or authority handle it, that is a concern about professionalism and legal compliance.",
        followUp: "Will the person conducting my closing be available to answer questions about the documents I am signing, or should I review them with my attorney beforehand?",
      },
      {
        q: "What documents should I bring to closing?",
        whyItMatters: "Arriving at closing without the right documents can delay or even postpone your closing. The specific requirements vary by transaction, but typically you will need valid government-issued photo identification, proof of homeowner's insurance, and your cashier's check or wire transfer confirmation. Being prepared prevents last-minute scrambles.",
        goodAnswer: "You will need to bring a valid government-issued photo ID (driver's license or passport), proof of homeowner's insurance, and your certified or cashier's check for the closing funds if you are not wiring. We will send you a detailed checklist a few days before closing with everything specific to your transaction.",
        redFlag: "If the company does not proactively provide a closing checklist or cannot tell you what to bring, it suggests poor organization that could lead to delays on closing day.",
        followUp: "Do you accept two forms of ID, and are there any specific requirements about the ID (such as it must match the name on the deed exactly)?",
      },
      {
        q: "How should I make my closing payment (wire transfer, cashier's check)?",
        whyItMatters: "The method of payment for your closing funds is both a practical and security decision. Wire transfers are common for large amounts but carry wire fraud risk. Cashier's checks from your bank are another option. Some companies have limits on the amount they will accept by check. Understanding your options and the security measures around each one helps protect your funds.",
        goodAnswer: "For amounts over a certain threshold, we typically recommend a wire transfer through our secure verification process. For smaller amounts, a cashier's check from your bank is acceptable. We will provide specific instructions through our secure channel, and we will verbally verify all wiring details with you before you send any funds.",
        redFlag: "If the company asks you to wire funds to a personal account, asks for cash, or provides wiring instructions solely by email without any verification process, do not send money. Contact the company directly at their published phone number.",
        followUp: "What is the cutoff time for receiving wire transfers on the day before closing, and how will you confirm that my wire was received?",
      },
      {
        q: "What is your exact process for providing wiring instructions?",
        whyItMatters: "This is one of the most important security questions you can ask. Wire fraud schemes typically involve criminals intercepting or spoofing wire instructions sent by email. Understanding the company's exact process helps you know what is legitimate and what might be a fraud attempt.",
        goodAnswer: "We deliver wiring instructions through our secure client portal, never by email alone. Before you wire, we will call you at the phone number we verified at the start of the transaction to confirm every detail. We also recommend you call us back at our published office number as an additional verification step.",
        redFlag: "If the company's process is simply emailing a PDF with wire instructions and no follow-up verification, your transaction is at elevated risk. Legitimate companies have moved beyond email-only processes.",
        followUp: "If I receive an email that appears to be from your office with different wiring instructions than what you provided through the secure channel, what should I do?",
      },
      {
        q: "How will you confirm receipt of my funds?",
        whyItMatters: "After you wire your closing funds, the waiting period before confirmation can be stressful. Knowing when and how the company will confirm receipt gives you peace of mind and helps you detect any problems quickly. If funds go to the wrong account due to fraud, time is critical for recovery.",
        goodAnswer: "Once your wire is received, we will contact you by phone and through our secure portal to confirm receipt, typically within a few hours of the transfer. If we do not receive the wire by a certain time, we will proactively reach out to troubleshoot.",
        redFlag: "If the company has no process for confirming receipt, or if they say you just need to check with your bank, that leaves a dangerous gap where fraud could go undetected until it is too late to recover funds.",
        followUp: "If my wire does not arrive as expected, what steps do you take immediately, and how quickly can a recall be initiated?",
      },
      {
        q: "How long after closing will my deed be recorded?",
        whyItMatters: "Recording your deed with the county recorder's office is what makes your ownership a matter of public record. Until the deed is recorded, there is a gap period where your ownership is not yet officially documented. Most companies record the deed within one to a few business days after closing, but delays can occur.",
        goodAnswer: "We typically record the deed within one to two business days after closing, depending on the county. Many counties now accept electronic recording, which allows us to record the same day. We will confirm recording and provide you with the recorded document once it is available.",
        redFlag: "If the company cannot give you a timeline for recording, or if they suggest it could take weeks without a clear explanation (such as a known county backlog), that is a sign of poor follow-through.",
        followUp: "Does this county accept electronic recording, and will you provide me with a copy of the recorded deed once it is filed?",
      },
      {
        q: "When will I receive my final title insurance policy?",
        whyItMatters: "Your final owner's title insurance policy is the permanent document that proves your coverage. It is different from the title commitment you reviewed before closing. The final policy is typically issued after the deed is recorded and all post-closing work is complete. It can take several weeks to several months to receive it.",
        goodAnswer: "Your final owner's title insurance policy is typically issued within 30 to 90 days after closing, once the deed is recorded and all post-closing requirements are met. We will mail or deliver it to you, and we recommend keeping it with your important property documents.",
        redFlag: "If the company cannot tell you when to expect your final policy, or if it has been more than six months after closing and you still have not received it, follow up immediately. The policy is an important document you need for your records.",
        followUp: "Will you send the final policy electronically as well as by mail, and what should I do if I have not received it after 90 days?",
      },
    ],
  },
  {
    title: "After Closing",
    color: "teal",
    context: "Your relationship with your title company doesn't end at closing. Know how to reach them if you need to file a claim or locate your policy later.",
    goodAnswer: "A reliable company will keep your records on file, provide clear contact information for claims, and explain that your owner's policy protects you and your heirs for as long as you own the property.",
    questions: [
      {
        q: "How do I file a claim on my title insurance policy?",
        whyItMatters: "If a title defect surfaces after closing, such as an unknown lien, a boundary dispute, or a claim by an unknown heir, you need to know exactly how to file a claim to activate your coverage. The process typically involves notifying both your title company and the underwriter, and doing so promptly can make a significant difference in the outcome.",
        goodAnswer: "To file a claim, contact us or the underwriter listed on your policy. We will help you initiate the claim process, which involves submitting a written description of the issue along with any supporting documentation. The underwriter will assign a claims examiner who will investigate and work toward resolution.",
        redFlag: "If the company cannot explain the claims process, does not know who their underwriter is, or suggests that claims are rarely successful, that is a warning sign about their knowledge and commitment to consumer protection.",
        followUp: "How long does the typical claims process take from filing to resolution, and will I have legal representation provided by the underwriter if needed?",
      },
      {
        q: "What is the time limit for filing a claim?",
        whyItMatters: "Unlike many insurance policies, title insurance does not have a strict statute of limitations for filing claims as long as the policy is still in effect. Your owner's policy remains in force for as long as you own the property, so a claim can generally be filed at any point during your ownership. However, prompt notification is always advisable.",
        goodAnswer: "Your owner's title insurance policy has no expiration date, so there is no deadline for filing a claim as long as you still own the property. That said, we always recommend reporting any potential issue as soon as you become aware of it, because early action often leads to better outcomes.",
        redFlag: "If the company tells you there is a specific deadline after which you cannot file a claim, that may be incorrect for an owner's policy. The coverage lasts as long as your ownership interest exists.",
        followUp: "Are there any situations where a delay in reporting a known issue could affect my coverage under the policy?",
      },
      {
        q: "Who should I contact if I discover a problem with my title?",
        whyItMatters: "When a title issue arises, you may not know whether to call the title company that handled your closing, the underwriter who issued your policy, or your real estate attorney. Having clear contact information before a problem occurs means you can act quickly when it matters most.",
        goodAnswer: "Contact us first at our office. We will review your file, help you assess the issue, and connect you with the appropriate claims department at the underwriter. We keep your contact information and policy details on file so we can assist you quickly.",
        redFlag: "If the company suggests that after closing you are on your own and should contact the underwriter directly with no support, that indicates they do not stand behind their work or maintain ongoing client relationships.",
        followUp: "Will you provide me with a card or document at closing that has the claims contact information for both your office and the underwriter?",
      },
      {
        q: "Will you keep a copy of my documents on file?",
        whyItMatters: "Your closing file contains critical documents including the deed, title commitment, final policy, settlement statement, and all recorded documents. If you ever need to reference these for a refinance, sale, tax question, or claim, having a reliable secondary source is invaluable.",
        goodAnswer: "Yes, we maintain digital copies of all closing files in our secure records system for a minimum number of years as required by our underwriter and state regulations. Most companies retain files for at least seven years, and many retain them indefinitely in digital form.",
        redFlag: "If the company says they do not keep copies of closing documents, or if they only retain them for a very short period, you will need to be especially diligent about maintaining your own records.",
        followUp: "How long do you retain files, and if I need a copy of a document in five or ten years, what is the process for requesting it?",
      },
      {
        q: "How can I get a copy of my policy if I lose it?",
        whyItMatters: "Losing your title insurance policy does not mean you have lost your coverage, but having a copy is important for filing claims, selling the property, or refinancing. Knowing how to obtain a replacement copy saves time and stress when you need it most.",
        goodAnswer: "If you lose your policy, contact us and we can provide a copy from our files. You can also contact the underwriter directly with your property address and closing date to request a duplicate. Your coverage remains in effect regardless of whether you have the physical document.",
        redFlag: "If the company suggests that losing the policy means your coverage is void, that is incorrect. Title insurance coverage does not depend on possessing the physical policy document.",
        followUp: "Is there a fee for obtaining a replacement copy, and how long does it typically take to receive one?",
      },
    ],
  },
];

const colorConfig: Record<string, { headerBg: string; headerText: string; checkBorder: string; gradient: string; iconBg: string }> = {
  blue: { headerBg: "bg-[#1a5276]", headerText: "text-white", checkBorder: "border-[#1a5276]/40", gradient: "from-[#1a5276] to-[#1a3a5c]", iconBg: "bg-[#1a5276]/10 text-[#1a5276]" },
  green: { headerBg: "bg-[#2d6b3f]", headerText: "text-white", checkBorder: "border-[#2d6b3f]/40", gradient: "from-[#2d6b3f] to-[#1e4d2d]", iconBg: "bg-[#2d6b3f]/10 text-[#2d6b3f]" },
  amber: { headerBg: "bg-[#8b6914]", headerText: "text-white", checkBorder: "border-[#8b6914]/40", gradient: "from-[#8b6914] to-[#6b5010]", iconBg: "bg-[#8b6914]/10 text-[#8b6914]" },
  purple: { headerBg: "bg-[#5b3a8c]", headerText: "text-white", checkBorder: "border-[#5b3a8c]/40", gradient: "from-[#5b3a8c] to-[#422a6b]", iconBg: "bg-[#5b3a8c]/10 text-[#5b3a8c]" },
  teal: { headerBg: "bg-[#0a7ea8]", headerText: "text-white", checkBorder: "border-[#0a7ea8]/40", gradient: "from-[#0a7ea8] to-[#075f80]", iconBg: "bg-[#0a7ea8]/10 text-[#0a7ea8]" },
};

export default function QuestionsToAskPage() {
  const [activeQuestion, setActiveQuestion] = useState<{ question: QuestionData; color: string } | null>(null);

  return (
    <>
    <PageHero
      title="Questions to Ask Your Title Professional"
      subtitle="40+ printable questions across 5 categories. Print this list and bring it with you."
      image="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&q=80"
      breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Questions to Ask", href: "/questions-to-ask" }]}
    />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Come Prepared, Close with Confidence</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Don&apos;t go into your closing blind. Print this list and bring it when meeting with title companies and settlement agents. Tap any question to see expert guidance on what good answers sound like and what red flags to watch for.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors mb-10 no-print"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print This List
        </button>

        <div className="space-y-8">
          {questionSections.map((section, sIdx) => {
            const c = colorConfig[section.color] || colorConfig.blue;
            return (
              <div key={section.title}>
              {sIdx === 3 && <InlineAd />}
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm tile-interactive">
                <div className={`${c.headerBg} px-5 py-3`}>
                  <h2 className={`text-base font-bold ${c.headerText}`}>{section.title}</h2>
                  <p className="text-[10px] text-white/70 mt-0.5">{section.questions.length} questions &mdash; tap any question for expert guidance</p>
                </div>
                {/* Context */}
                <div className="px-5 py-3 bg-alta-light border-b border-gray-100">
                  <p className="text-xs text-alta-gray leading-relaxed"><strong className="text-alta-navy">Why these matter:</strong> {section.context}</p>
                </div>
                {/* Questions */}
                <div className="p-4 space-y-2 bg-white">
                  {section.questions.map((qObj, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveQuestion({ question: qObj, color: section.color })}
                      className="flex gap-3 p-3 bg-alta-light/50 rounded-xl hover:bg-alta-light transition-colors w-full text-left group cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded border-2 ${c.checkBorder} shrink-0 mt-0.5 print:block`} />
                      <p className="text-sm text-alta-navy flex-1 group-hover:text-[#0a7ea8] transition-colors">{qObj.q}</p>
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-[#0a7ea8] shrink-0 mt-0.5 transition-colors no-print" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </button>
                  ))}
                </div>
                {/* Good answer guidance */}
                <div className="px-5 py-3 bg-green-50 border-t border-green-100">
                  <p className="text-xs text-green-800 leading-relaxed">
                    <svg className="w-3.5 h-3.5 text-green-600 inline mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <strong>What good answers sound like:</strong> {section.goodAnswer}
                  </p>
                </div>
              </div>
              </div>
            );
          })}
        </div>

        <InlineAd />

        <div className="mt-10 p-5 bg-blue-50 rounded-xl border border-blue-100 no-print">
          <h3 className="font-semibold text-alta-navy mb-2">Tips for Your Conversation</h3>
          <ul className="text-sm text-alta-gray space-y-1.5">
            <li>- Get fee estimates in writing from at least 2-3 companies before deciding</li>
            <li>- Ask about their wire fraud prevention process on the first call</li>
            <li>- Request a copy of the title commitment as soon as it&apos;s available</li>
            <li>- Don&apos;t be afraid to ask for clarification on anything you don&apos;t understand</li>
            <li>- You have the legal right to choose your own title company (RESPA)</li>
          </ul>
        </div>

        <FirstTimeBuyerCTA />
      </div>
    </div>

    {/* Question Detail Modal */}
    {activeQuestion && (() => {
      const mc = colorConfig[activeQuestion.color] || colorConfig.blue;
      return (
        <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setActiveQuestion(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setActiveQuestion(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Gradient header */}
            <div className={`bg-gradient-to-br ${mc.gradient} px-6 py-5 rounded-t-2xl`}>
              <p className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2">Question</p>
              <h3 className="text-white text-lg font-bold leading-snug pr-8">{activeQuestion.question.q}</h3>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-5">
              {/* Why This Matters */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg ${mc.iconBg} flex items-center justify-center`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  </div>
                  <h4 className="font-bold text-alta-navy text-sm">Why This Matters</h4>
                </div>
                <p className="text-sm text-alta-gray leading-relaxed ml-9">{activeQuestion.question.whyItMatters}</p>
              </div>

              {/* Good Answer */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="font-bold text-green-800 text-sm">What a Good Answer Sounds Like</h4>
                </div>
                <p className="text-sm text-green-800 leading-relaxed ml-9">{activeQuestion.question.goodAnswer}</p>
              </div>

              {/* Red Flag */}
              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-red-100 text-[#943030] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>
                  </div>
                  <h4 className="font-bold text-[#943030] text-sm">Red Flag</h4>
                </div>
                <p className="text-sm text-red-800 leading-relaxed ml-9">{activeQuestion.question.redFlag}</p>
              </div>

              {/* Follow-Up */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1a5276] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                  </div>
                  <h4 className="font-bold text-[#1a5276] text-sm">Follow-Up Questions</h4>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed ml-9">{activeQuestion.question.followUp}</p>
              </div>
            </div>
          </div>
        </div>
      );
    })()}
    </>
  );
}
