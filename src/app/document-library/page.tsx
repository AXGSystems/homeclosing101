"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const documentSections = [
  {
    title: "Official CFPB Forms & Guides",
    desc: "These documents are published by the Consumer Financial Protection Bureau and are the official federal resources for homebuyers.",
    color: "from-[#1a5276] to-[#154463]",
    docs: [
      { name: "Your Home Loan Toolkit", desc: "The CFPB's step-by-step guide to the mortgage process — from budgeting to closing. Includes worksheets, checklists, and conversation starters. 20 pages.", url: "https://files.consumerfinance.gov/f/201503_cfpb_your-home-loan-toolkit-web.pdf", type: "PDF", source: "CFPB",
        modalContent: { what: "The Home Loan Toolkit is a 20-page booklet published by the Consumer Financial Protection Bureau. It was created as a companion resource for homebuyers receiving a Loan Estimate. It covers the entire mortgage process from determining your budget through closing on your home.", when: "You should receive this from your lender within 3 business days of applying for a mortgage (lenders are encouraged but not required to provide it). It is most useful during the early stages of your home search and mortgage shopping process.", lookFor: "Key worksheets include: a monthly spending tracker, a home budget worksheet, a 'questions to ask your lender' checklist, and a loan comparison worksheet. The toolkit also explains the Loan Estimate form and Closing Disclosure in plain language.", issues: "Some lenders provide this electronically rather than in print. If you did not receive it, you can download it directly from the CFPB website at no cost. The toolkit is available in English and Spanish." }
      },
      { name: "Sample Loan Estimate (Annotated)", desc: "See what a completed Loan Estimate looks like with explanations for every field. Use this to understand the form before you receive yours.", url: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/", type: "Web Tool", source: "CFPB",
        modalContent: { what: "The Loan Estimate is a standardized 3-page form that every lender must provide within 3 business days of receiving your mortgage application. It shows the estimated interest rate, monthly payment, total closing costs, and other important loan terms. The CFPB's annotated version explains every field on the form.", when: "You will receive a Loan Estimate from each lender you apply to. This is the primary tool for comparing offers. You should receive it early in the process — within 3 business days of submitting a complete application.", lookFor: "Compare these key fields across Loan Estimates: interest rate, monthly payment, total closing costs (Section J), cash to close, and APR. Pay special attention to Section A (origination charges) and Section C (services you can shop for — including title insurance).", issues: "Loan Estimates are just estimates — the final numbers appear on the Closing Disclosure. However, certain fees have tolerance limits: origination charges cannot increase, and third-party services the lender selected can only increase by 10%. If you see significant changes, ask your lender to explain." }
      },
      { name: "Sample Closing Disclosure (Annotated)", desc: "Interactive walkthrough of every section of the 5-page Closing Disclosure. Compare your actual document against this sample.", url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/", type: "Web Tool", source: "CFPB",
        modalContent: { what: "The Closing Disclosure is a 5-page form that provides the final details of your mortgage loan. It replaced the old HUD-1 Settlement Statement in 2015. It includes the loan terms, projected monthly payments, closing costs, and cash to close — all in their final, actual amounts.", when: "You must receive your Closing Disclosure at least 3 business days before your closing date. This is a federal requirement under the TRID (TILA-RESPA Integrated Disclosure) rule. If any significant changes occur after delivery, a new 3-day waiting period may be triggered.", lookFor: "Compare every line of the Closing Disclosure to your original Loan Estimate. Look for: changes in the interest rate, unexpected fees, correct property address and names, accurate earnest money credit, and correct prorations for taxes and insurance. Page 3 shows a side-by-side comparison with the Loan Estimate.", issues: "The most common issues: missing earnest money credit, incorrect prorations, unexpected junk fees, and changes that exceed tolerance limits. If you find errors, contact your lender and settlement agent immediately — before the closing appointment." }
      },
      { name: "Buying a House — CFPB Guide", desc: "Complete overview of the homebuying process from the federal consumer protection agency — budgeting, shopping, closing.", url: "https://www.consumerfinance.gov/owning-a-home/", type: "Web Guide", source: "CFPB",
        modalContent: { what: "This is the CFPB's comprehensive online guide to the homebuying process. It covers everything from figuring out how much you can afford, to shopping for a mortgage, to understanding closing. It includes interactive tools, worksheets, and links to additional resources.", when: "This guide is most useful at the very beginning of your homebuying journey — before you start looking at homes or talking to lenders. It provides the foundational knowledge you need to make informed decisions throughout the process.", lookFor: "The guide includes interactive tools for exploring interest rates, comparing loan offers, and understanding your Loan Estimate and Closing Disclosure. It also has a section on avoiding common pitfalls and understanding your rights.", issues: "The guide is broad and covers the general process — your specific state may have additional requirements or different procedures. Use it as a starting point and supplement with state-specific resources." }
      },
      { name: "CFPB Mortgage Shopping Worksheet", desc: "A worksheet to compare Loan Estimates from multiple lenders side by side. Helps you identify the best deal.", url: "https://files.consumerfinance.gov/f/201503_cfpb_mortgage-shopping-worksheet.pdf", type: "PDF", source: "CFPB",
        modalContent: { what: "This printable worksheet from the CFPB helps you compare Loan Estimates from multiple lenders in a structured format. It extracts the most important fields from the Loan Estimate and puts them in columns so you can see differences at a glance.", when: "Use this worksheet after you have received Loan Estimates from 2 or more lenders. The CFPB recommends getting at least 3 estimates to ensure you are getting a competitive rate and fair closing costs.", lookFor: "Focus on: the interest rate, APR (which includes the rate plus fees), monthly payment, total closing costs, and whether any costs seem unusually high compared to other estimates. Also note which services you can shop for independently (Section C on the Loan Estimate).", issues: "The worksheet compares the estimates as given — it does not account for differences in loan features like rate locks, float-down options, or lender credits. Make sure you are comparing the same loan type (conventional, FHA, VA) and term (30-year, 15-year) across all estimates." }
      },
    ],
  },
  {
    title: "HomeClosing101 Printable Resources",
    desc: "These resources are available directly on our site and can be printed for use during your closing process.",
    color: "from-[#2d6b3f] to-[#235532]",
    docs: [
      { name: "Interactive Closing Checklist", desc: "28-item checklist across 5 phases — from pre-approval to closing day. Track your progress online or print a blank copy.", url: "/closing-process/closing-checklist", type: "Interactive", source: "HomeClosing101",
        modalContent: { what: "A comprehensive 28-item checklist that covers every phase of the closing process — from getting pre-approved to receiving your keys. Each item includes a brief description and can be checked off as you complete it. Available as both an interactive online tool and a printable document.", when: "Start using this checklist as soon as you begin the homebuying process. It is organized into 5 phases: Pre-Approval, Home Search & Offer, Under Contract, Pre-Closing, and Closing Day. Each phase lists the specific tasks you need to complete.", lookFor: "Pay attention to time-sensitive items: scheduling inspections (typically within 7-10 days of contract), reviewing the title commitment, arranging homeowner's insurance, and reviewing the Closing Disclosure 3 days before closing.", issues: "This checklist covers the general process. Your state, lender, or transaction type (new construction, short sale, foreclosure) may have additional requirements. Ask your settlement agent if there are state-specific items to add." }
      },
      { name: "Questions to Ask Your Title Professional", desc: "40+ questions organized by category: choosing a company, costs, title search, closing process, and after closing.", url: "/questions-to-ask", type: "Printable", source: "HomeClosing101",
        modalContent: { what: "A structured list of over 40 questions organized into categories for different stages of the title and settlement process. Categories include: choosing a title company, understanding costs and fees, the title search process, the closing appointment, and post-closing questions.", when: "Use these questions when interviewing title companies, during your initial consultation, and throughout the closing process. Print the list and bring it to meetings with your settlement agent.", lookFor: "Key questions include: What are your total fees? Do you offer simultaneous issue discounts? What wire fraud prevention measures do you have? How long does your title search go back? What happens if a defect is found?", issues: "Not all questions will apply to every transaction. In attorney states, some of these questions should be directed to your real estate attorney rather than the title company. Adjust based on your state's closing practices." }
      },
      { name: "Closing Day Document Checklist", desc: "23 documents organized by category with required/optional badges. Everything you need to bring to your closing appointment.", url: "/document-checklist", type: "Printable", source: "HomeClosing101",
        modalContent: { what: "A categorized checklist of 23 documents you may need to bring to your closing appointment, organized into: Identification, Financial Documents, Loan & Property Documents, Title & Insurance Documents, and Post-Closing Essentials. Each item is marked as Required or Optional.", when: "Review this checklist 1 week before your closing date and verify you have everything. Do a final check the night before closing. Some items (like the cashier's check or wire confirmation) can only be obtained 1-2 days before closing.", lookFor: "Required items include: valid government-issued photo ID, certified check or wire confirmation for your closing costs, proof of homeowner's insurance, and your Closing Disclosure. Optional but recommended items include: your Loan Estimate (for comparison) and the home inspection report.", issues: "Your settlement agent may have additional requirements specific to your state or transaction. Contact them at least 1 week before closing to confirm exactly what you need to bring. Always verify wire instructions by phone before sending funds." }
      },
      { name: "Stop Fraud 101 Prevention Guide", desc: "10 prevention steps sourced from the FBI, CFPB, NAR, and ALTA. Print and share with everyone involved in your transaction.", url: "/stop-fraud", type: "Printable", source: "FBI / CFPB / NAR / ALTA",
        modalContent: { what: "A concise guide covering 10 critical fraud prevention steps for real estate transactions. The content is sourced from the FBI Internet Crime Complaint Center (IC3), the CFPB, the National Association of Realtors (NAR), and the American Land Title Association (ALTA).", when: "Review this guide before you begin any financial transactions related to your home purchase. Share it with everyone involved in your transaction: your real estate agent, lender, attorney, and any family members who may be handling funds.", lookFor: "The most critical prevention steps: never trust wire instructions received by email, always verify wire details by calling a known phone number, be wary of last-minute changes to closing instructions, and enable multi-factor authentication on all email accounts involved in the transaction.", issues: "Wire fraud tactics evolve constantly. While this guide covers the fundamentals, stay vigilant throughout the process. If you suspect fraud, contact your bank immediately (within the first hour for the best chance of fund recovery) and file a complaint with the FBI's IC3 at ic3.gov." }
      },
      { name: "State Insurance Department Directory", desc: "Contact information for all 50 states + DC insurance departments — with calling script. Verified via NAIC/I.I.I.", url: "/find-policy", type: "Searchable", source: "NAIC / I.I.I.",
        modalContent: { what: "A complete directory of insurance department contact information for all 50 states and the District of Columbia. Includes department names, physical addresses, phone numbers, and website URLs. Also includes a sample calling script for locating your title insurance policy.", when: "Use this directory when you need to: locate your existing title insurance policy, file a complaint about a title insurance company, verify that a title company is licensed in your state, or research your state's title insurance regulations.", lookFor: "Each state listing includes the regulatory department name (which varies by state — some call it the Department of Insurance, others the Division of Insurance, Insurance Commission, etc.), the direct phone number, and the official website.", issues: "State department contact information can change as administrations change. We verify this data against the NAIC (National Association of Insurance Commissioners) and I.I.I. (Insurance Information Institute). Always confirm via the official .gov website before calling." }
      },
    ],
  },
  {
    title: "Homebuyer Education Programs",
    desc: "Free and low-cost courses that provide homebuyer education certificates — often required for certain loan programs.",
    color: "from-[#5b3a8c] to-[#482d70]",
    docs: [
      { name: "Fannie Mae HomeView", desc: "Free, interactive online course covering the entire homebuying process. Provides a certificate of completion. Meets HUD requirements.", url: "https://www.fanniemae.com/education", type: "Free Course", source: "Fannie Mae",
        modalContent: { what: "HomeView (formerly Framework) is Fannie Mae's free online homebuyer education course. It covers budgeting, credit, shopping for a home, obtaining a mortgage, and maintaining your home after purchase. Upon completion, you receive a certificate that satisfies Fannie Mae's homebuyer education requirement.", when: "Take this course early in your homebuying journey — ideally before you start shopping for a home or meeting with lenders. Some loan programs (such as Fannie Mae's HomeReady program) require a homebuyer education certificate. Even if not required, the course provides valuable foundational knowledge.", lookFor: "The course covers: understanding your finances, improving your credit, shopping for a home, getting a mortgage, the closing process, and maintaining your home. It is self-paced and typically takes 4-6 hours to complete.", issues: "Make sure the certificate you receive is accepted by your specific loan program. Fannie Mae's HomeView certificate is widely accepted, but some state and local programs may require a different approved course. Verify with your lender before starting." }
      },
      { name: "Freddie Mac CreditSmart", desc: "Free online homebuyer education covering credit, budgeting, and the mortgage process. Available in English and Spanish.", url: "https://myhome.freddiemac.com/resources/creditsmart", type: "Free Course", source: "Freddie Mac",
        modalContent: { what: "CreditSmart is Freddie Mac's free financial education and homeownership curriculum. It offers modules on building credit, managing money, understanding the mortgage process, and avoiding predatory lending. Available in both English and Spanish.", when: "This course is particularly useful if you are working on building or improving your credit before applying for a mortgage. It is also recommended for Freddie Mac Home Possible borrowers who need a homebuyer education certificate.", lookFor: "The curriculum includes modules on: financial management, understanding credit, building and maintaining good credit, the mortgage process, and sustaining homeownership. Each module can be completed independently.", issues: "CreditSmart certificates are accepted by Freddie Mac loan programs. If you are using a Fannie Mae product, you may need the Fannie Mae HomeView certificate instead. Always verify with your lender which certificate they accept." }
      },
      { name: "HUD Housing Counselor Locator", desc: "Find a HUD-approved housing counselor near you for free or low-cost one-on-one guidance through the homebuying process.", url: "https://www.consumerfinance.gov/housing/", type: "Locator Tool", source: "CFPB / HUD",
        modalContent: { what: "The HUD Housing Counselor Locator helps you find a HUD-approved housing counseling agency in your area. These agencies provide free or low-cost one-on-one counseling on homebuying, credit repair, foreclosure prevention, and more. All listed counselors are certified by HUD.", when: "Contact a housing counselor at any point in the homebuying process, but especially if: you are a first-time buyer, you need help with credit repair, you want personalized guidance, or your loan program requires counseling from a HUD-approved agency.", lookFor: "HUD-approved agencies offer services including: pre-purchase counseling, financial management and budgeting, credit counseling, and post-purchase services. Many offer services in multiple languages. The counseling may be in-person, by phone, or online.", issues: "While HUD-approved counselors are free or low-cost, be wary of organizations that charge high fees for 'credit repair' or 'homebuyer counseling' that are not HUD-approved. Always verify HUD approval through the official locator tool." }
      },
      { name: "Framework Homebuyer Education", desc: "Online course with videos covering buying and owning a home. Meets HUD and National Industry Standards. $75.", url: "https://www.frameworkhomeownership.org/", type: "Paid Course", source: "Framework",
        modalContent: { what: "Framework is an online homebuyer education course that uses video lessons to cover the entire homebuying and homeownership process. It meets the National Industry Standards for Homeownership Education and Counseling and is accepted by most lenders and housing agencies.", when: "This course is an alternative to free options like HomeView and CreditSmart. It is sometimes required by specific state housing finance agencies or down payment assistance programs. Check with your lender or housing agency to see if Framework is required or recommended.", lookFor: "The course covers: deciding if homeownership is right for you, managing your finances, understanding the mortgage process, shopping for a home, closing on your home, and maintaining your investment. It includes interactive exercises and video content.", issues: "The course costs $75 (as of the current listing). Before paying, check if a free alternative (Fannie Mae HomeView or Freddie Mac CreditSmart) would satisfy your lender's or program's requirements. Some down payment assistance programs will reimburse the course fee." }
      },
    ],
  },
  {
    title: "Government & Industry Resources",
    desc: "Official tools and calculators from government-sponsored enterprises and industry organizations.",
    color: "from-[#8b6914] to-[#705410]",
    docs: [
      { name: "Fannie Mae Mortgage Calculator", desc: "Calculate monthly payments including taxes, insurance, PMI, and HOA. Official Fannie Mae tool.", url: "https://yourhome.fanniemae.com/calculators-tools/mortgage-calculator", type: "Calculator", source: "Fannie Mae",
        modalContent: { what: "Fannie Mae's official mortgage calculator estimates your monthly payment including principal, interest, property taxes, homeowner's insurance, PMI (if applicable), and HOA fees. It provides a more complete picture of your monthly costs than calculators that only show principal and interest.", when: "Use this calculator during the early planning stages to understand what your monthly payment might look like at different price points. It is also useful for comparing different loan scenarios (30-year vs 15-year, different down payment amounts, etc.).", lookFor: "The calculator allows you to adjust: home price, down payment, interest rate, loan term, property taxes, homeowner's insurance, PMI, and HOA fees. The breakdown shows exactly how much of your payment goes to each component.", issues: "Like all calculators, this provides estimates — your actual payment will depend on your specific loan terms, local tax rates, and insurance costs. Use it for comparison purposes and planning, then get a Loan Estimate from a lender for actual numbers." }
      },
      { name: "Freddie Mac Homebuyer Tools", desc: "Calculators, worksheets, and checklists to prepare for homebuying. Personalized based on your situation.", url: "https://myhome.freddiemac.com/resources/calculators", type: "Tool Suite", source: "Freddie Mac",
        modalContent: { what: "Freddie Mac's My Home tool suite includes multiple calculators and interactive tools: an affordability calculator, a rent vs buy calculator, a mortgage calculator, and budget worksheets. Tools are personalized based on the information you provide.", when: "These tools are most useful during the planning and shopping phases. The rent vs buy calculator helps you determine if homeownership makes financial sense for your situation. The affordability calculator helps set realistic price expectations.", lookFor: "Each tool provides clear results with explanations. The affordability calculator considers income, debts, and desired monthly payment to suggest a price range. The rent vs buy tool factors in opportunity cost, appreciation, and tax benefits.", issues: "These tools use general assumptions for tax rates, insurance costs, and appreciation rates. Your local market may differ significantly. Use these as directional guidance and consult with a lender for personalized numbers." }
      },
      { name: "ALTA Best Practices Framework", desc: "The 7 pillars of ALTA's Title Insurance and Settlement Company Best Practices — the industry standard for consumer protection.", url: "https://www.alta.org/best-practices/", type: "Framework", source: "ALTA",
        modalContent: { what: "ALTA's Best Practices Framework is a set of seven pillars that define the industry standard for title insurance and settlement company operations. They cover: licensing, escrow account controls, privacy/information security, settlement procedures, title policy production, professional liability insurance, and consumer complaint handling.", when: "Reference this framework when choosing a title company. Companies that have adopted and been independently assessed against ALTA Best Practices have demonstrated a commitment to consumer protection, data security, and operational excellence.", lookFor: "The seven pillars are: (1) Licensing — proper state licenses, (2) Escrow Trust Accounts — safeguarding your money, (3) Information Security — protecting your personal data, (4) Settlement Procedures — accurate and timely closings, (5) Title Policy Production — timely policy delivery, (6) Insurance — adequate professional liability coverage, (7) Consumer Complaints — fair and responsive complaint handling.", issues: "ALTA Best Practices are voluntary — not all title companies have adopted them. Ask your title company if they have been assessed by an independent third party. Assessment is different from simply claiming to follow best practices." }
      },
      { name: "FBI IC3 Complaint Portal", desc: "If you're a victim of wire fraud or internet crime during your real estate transaction, file a complaint here immediately.", url: "https://www.ic3.gov/", type: "Reporting", source: "FBI",
        modalContent: { what: "The FBI's Internet Crime Complaint Center (IC3) is the federal government's central reporting mechanism for internet-related crimes, including real estate wire fraud. Filing a complaint creates an official record and initiates the FBI's process for tracking and potentially recovering stolen funds.", when: "File a complaint IMMEDIATELY if you suspect you have been a victim of wire fraud or any internet-related crime during your real estate transaction. Time is critical — the FBI's Recovery Asset Team (RAT) has the highest success rate when notified within the first 72 hours, ideally within the first hour.", lookFor: "When filing, you will need: dates and amounts of transactions, bank account information (yours and the recipient's if known), the method of contact used by the fraudster, and any identifying information about the criminal (email addresses, phone numbers, etc.).", issues: "IC3 receives hundreds of thousands of complaints annually and cannot investigate every one. Filing a complaint is important for tracking purposes even if individual investigation is not possible. Also contact your bank immediately, your local FBI field office, and your state attorney general's office." }
      },
      { name: "NAIC Insurance Department Directory", desc: "Complete directory of state insurance departments with staff contacts, searchable by state.", url: "https://content.naic.org/state-insurance-departments", type: "Directory", source: "NAIC",
        modalContent: { what: "The National Association of Insurance Commissioners (NAIC) maintains the official directory of state insurance departments across all 50 states and U.S. territories. Each state listing includes the commissioner's name, department contact information, and links to the state's insurance regulatory website.", when: "Use this directory when you need to: verify that a title insurance company is licensed in your state, file a complaint about an insurance company or agent, research your state's insurance regulations, or find contact information for your state's insurance commissioner.", lookFor: "Each state entry includes: the name and title of the insurance commissioner or director, the department's mailing address, phone number, website URL, and links to online services such as license verification and complaint filing.", issues: "Commissioner names and contact details change with elections and appointments. The NAIC updates their directory regularly but there may be brief lag periods after leadership changes. Cross-reference with the state department's official .gov website for the most current information." }
      },
    ],
  },
];

const typeColors: Record<string, string> = {
  "PDF": "bg-red-100 text-red-700",
  "Web Tool": "bg-blue-100 text-blue-700",
  "Web Guide": "bg-blue-100 text-blue-700",
  "Interactive": "bg-green-100 text-green-700",
  "Printable": "bg-green-100 text-green-700",
  "Searchable": "bg-purple-100 text-purple-700",
  "Free Course": "bg-amber-100 text-amber-700",
  "Paid Course": "bg-gray-100 text-gray-700",
  "Calculator": "bg-teal-100 text-teal-700",
  "Tool Suite": "bg-teal-100 text-teal-700",
  "Framework": "bg-indigo-100 text-indigo-700",
  "Reporting": "bg-red-100 text-red-700",
  "Directory": "bg-purple-100 text-purple-700",
  "Locator Tool": "bg-amber-100 text-amber-700",
};

const sectionGradients: Record<string, string> = {
  "Official CFPB Forms & Guides": "from-[#1a5276] to-[#0a7ea8]",
  "HomeClosing101 Printable Resources": "from-[#2d6b3f] to-[#1a5276]",
  "Homebuyer Education Programs": "from-[#5b3a8c] to-[#1a5276]",
  "Government & Industry Resources": "from-[#8b6914] to-[#1a5276]",
};

export default function DocumentLibraryPage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

  return (
    <>
      <PageHero
        title="Document Library"
        subtitle="Download official forms, sample documents, checklists, and guides from CFPB, ALTA, Fannie Mae, Freddie Mac, and other trusted sources."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Document Library", href: "/document-library" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-[#c5d8e4] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Closing Document Hub</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Every document and tool linked below is from an official, verified source — government agencies, ALTA, or directly from HomeClosing101. <span className="text-alta-teal font-medium">Click any document for details on what it is, when you need it, and what to look for.</span> PDFs can be downloaded and printed. Web tools are interactive and available 24/7.</p>
              </div>
            </div>
          </div>

          {/* Document count summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-[#1a5276]">{documentSections.reduce((a, s) => a + s.docs.length, 0)}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">Total Resources</p>
            </div>
            <div className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-[#2d6b3f]">{documentSections[0].docs.length}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">Official CFPB</p>
            </div>
            <div className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-[#5b3a8c]">{documentSections[1].docs.length}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">HC101 Printables</p>
            </div>
            <div className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-[#8b6914]">{documentSections[2].docs.length + documentSections[3].docs.length}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">Education & Tools</p>
            </div>
          </div>

          {/* Document sections */}
          <div className="space-y-10">
            {documentSections.map((section) => (
              <div key={section.title}>
                <div className={`relative rounded-xl overflow-hidden mb-5 h-20`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${section.color}`} />
                  <div className="relative z-10 flex items-center gap-3 h-full px-5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{section.title}</h2>
                      <p className="text-[10px] text-white/70">{section.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {section.docs.map((doc) => (
                    <div
                      key={doc.name}
                      onClick={() => setActiveModal({
                        title: doc.name,
                        gradient: sectionGradients[section.title] || "from-[#1a5276] to-[#0a7ea8]",
                        content: (
                          <div className="space-y-5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${typeColors[doc.type] || 'bg-gray-100 text-gray-700'}`}>{doc.type}</span>
                              <span className="text-xs text-[#0a7ea8] font-medium">Source: {doc.source}</span>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[#1a5276] mb-2">What Is This Document?</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.what}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[#2d6b3f] mb-2">When Will You Encounter It?</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.when}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[#5b3a8c] mb-2">What to Look For</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.lookFor}</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                              <h3 className="text-sm font-bold text-[#8b6914] mb-2">Common Issues</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{doc.modalContent.issues}</p>
                            </div>
                            <a
                              href={doc.url}
                              target={doc.url.startsWith("/") ? undefined : "_blank"}
                              rel={doc.url.startsWith("/") ? undefined : "noopener noreferrer"}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a7ea8] text-white rounded-lg font-semibold text-sm hover:bg-[#077a9e] transition-colors"
                            >
                              {doc.url.startsWith("/") ? "View on HC101" : "Open Resource"}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={doc.url.startsWith("/") ? "M9 5l7 7-7 7" : "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"} /></svg>
                            </a>
                          </div>
                        )
                      })}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm tile-interactive group cursor-pointer border-l-4 border-l-[#0a7ea8]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-alta-light flex items-center justify-center text-alta-teal shrink-0 group-hover:bg-alta-teal group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{doc.name}</h3>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${typeColors[doc.type] || 'bg-gray-100 text-gray-700'}`}>{doc.type}</span>
                        </div>
                        <p className="text-xs text-alta-gray leading-relaxed">{doc.desc}</p>
                        <p className="text-[10px] text-alta-teal mt-1 font-medium">Source: {doc.source}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-alta-light flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                        <svg className="w-3.5 h-3.5 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/sources" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              View All Sources
            </Link>
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Interactive Checklist
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
