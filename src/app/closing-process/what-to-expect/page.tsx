import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import ClosingFlowNav from "@/components/ClosingFlowNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What to Expect at Closing",
  description: "A complete guide to the home closing process — every step from pre-approval to getting your keys.",
};

const steps = [
  {
    title: "Get Your Finances Ready",
    content: "Before you even look at houses, you need to get your financial foundation in order. This preparation phase — ideally 6–12 months before you plan to buy — is what separates buyers who close smoothly from buyers who get derailed.\n\nCheck your credit score and understand what it means for your mortgage options. A 620 score gets you into an FHA loan; a 740+ score unlocks the best conventional rates. If your score needs work, dispute errors on your credit report, pay down credit card balances below 30% utilization, and avoid opening new accounts.\n\nPay down existing debts to lower your debt-to-income ratio (DTI). Lenders want your total monthly debt payments — including your future mortgage — to be below 43% of your gross monthly income. Every $500/month in debt you eliminate adds roughly $100,000 to your purchasing power.\n\nStart saving aggressively for your down payment (3–20% of the purchase price depending on loan type) plus closing costs (2–5% of the price) plus reserves (2–3 months of mortgage payments). On a $400,000 home, that means $20,000–$100,000+ in cash at closing.\n\nResearch mortgage pre-approval requirements so you know exactly what documents you'll need: 2 years of W-2s and tax returns, 2 months of bank statements, pay stubs, and employment verification. Having these organized before you apply speeds up the process significantly.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    tip: "Use our affordability calculator to set a realistic budget before you start shopping. Know your DTI ratio, understand your credit score, and have your down payment saved BEFORE you get pre-approved.",
  },
  {
    title: "Learn About Loan Options & Get Pre-Approved",
    content: "Understanding the types of mortgages available is the foundation of your homebuying journey. Each loan type — conventional, FHA, VA, USDA — has different requirements for down payment (3% to 20%), credit score (580 to 740+), and mortgage insurance. Your choice affects not just your monthly payment, but your total cost over the life of the loan.\n\nPre-approval is different from pre-qualification. Pre-qualification is an informal estimate based on what you tell the lender. Pre-approval is a formal process where the lender verifies your income, assets, debts, and credit history, then issues a conditional commitment for a specific loan amount. Sellers take pre-approved buyers far more seriously.\n\nGet pre-approved by at least 2-3 lenders so you can compare Loan Estimates. Under CFPB rules, your lender must provide a Loan Estimate within 3 business days of your application. Compare APRs (not just interest rates) — the APR includes fees and gives you the true cost.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80",
    tip: "Multiple credit inquiries for mortgages within a 14-45 day window (depending on the scoring model) count as a single inquiry on your credit report. Don't be afraid to shop around.",
  },
  {
    title: "Find a Property",
    content: "Your real estate agent is your advocate throughout this process. They have access to the Multiple Listing Service (MLS), understand local market conditions, can identify properties that match your criteria, and will represent your interests in negotiations.\n\nWhen evaluating properties, look beyond the cosmetics. Consider the neighborhood (schools, commute, crime rates, future development), the age and condition of major systems (roof, HVAC, plumbing, electrical), property tax rates, HOA fees and rules, and resale potential. Attend open houses to get a feel for the market — you'll learn to spot value and avoid overpaying.\n\nYour agent can pull comparable sales ('comps') to help you understand whether a listing price is fair. In a competitive market, you may need to act quickly and make strong offers.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80",
    tip: "Don't skip the neighborhood research. Visit the area at different times of day — a quiet street at 2 PM might be a traffic nightmare at 5 PM.",
  },
  {
    title: "Make an Offer",
    content: "Your purchase offer is a legally significant document. It includes your offered price, proposed closing date, earnest money deposit amount (typically 1-3% of the price), contingencies (conditions that must be met), and any requests for the seller to pay closing costs or make repairs.\n\nCommon contingencies protect you: financing contingency (you can back out if your loan falls through), inspection contingency (you can renegotiate or exit if the inspection reveals major issues), and appraisal contingency (protects you if the home appraises for less than your offer).\n\nThe seller may accept, reject, or counter your offer. Counteroffers go back and forth until both parties agree. Once both sides sign, you have a binding purchase agreement and the clock starts ticking toward closing. Your earnest money deposit is typically due within a few days.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80",
    tip: "In competitive markets, buyers sometimes waive contingencies to make their offer stronger. Be very careful about waiving the inspection contingency — a $400 inspection can uncover $40,000 in problems.",
  },
  {
    title: "Sign the Purchase Agreement",
    content: "The purchase agreement (also called a sales contract or purchase contract) is the master document governing your entire transaction. It specifies the purchase price, closing date, what's included in the sale (appliances, fixtures, etc.), all contingencies with their deadlines, how disputes will be resolved, and each party's responsibilities.\n\nKey sections to review carefully: the legal property description (must match the deed), the closing date and time, who pays which closing costs, the earnest money amount and where it's held (usually in the title company's escrow account), and the contingency deadlines — if you miss a deadline, you may lose your right to exercise that contingency.\n\nWhile not required in every state, having an attorney review the purchase agreement before you sign is recommended, especially for first-time buyers or complex transactions (short sales, estate sales, new construction).",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
    tip: "Read every word of the purchase agreement. If you don't understand something, ask your agent or attorney before signing. Once signed, you're legally bound to the terms.",
  },
  {
    title: "Get Funding",
    content: "After your offer is accepted, you formally apply for your mortgage (if you haven't already done so through pre-approval). Your lender will order an appraisal to verify the property is worth the purchase price, pull updated credit reports, verify your employment and income, and review your bank statements to confirm your down payment source.\n\nThis phase — called underwriting (the lender's formal process of verifying your finances and the property to decide whether to approve the loan) — is where the lender decides whether to approve your loan. The underwriter reviews everything: your debt-to-income ratio (DTI — the percentage of your gross monthly income that goes toward debt payments; most lenders want this below 43%), your credit history, the property's appraised value, and any conditions from the title search. They may ask for additional documentation (tax returns, explanation letters for large deposits, etc.).\n\nOnce the underwriter is satisfied, they issue a 'clear to close' (formal confirmation that all conditions are met and the lender is ready to fund your loan) — meaning your loan is fully approved and the lender is ready to fund. This is also when you should lock your interest rate if you haven't already. Rate locks typically last 30-60 days.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
    tip: "Do NOT make large purchases, open new credit accounts, change jobs, or make large cash deposits during the underwriting period. Any of these can delay or derail your loan approval.",
  },
  {
    title: "Get Insurance",
    content: "You'll need two types of insurance before closing: homeowner's insurance and title insurance.\n\nHomeowner's insurance (hazard insurance) protects against damage from fire, storms, theft, and liability. Most lenders require at least one year's premium paid at closing, and ongoing premiums are usually collected monthly through your escrow account. Shop around — premiums vary significantly between carriers.\n\nTitle insurance protects your ownership rights. There are two types: the lender's policy (required by your mortgage company, protects the bank) and the owner's policy (optional but strongly recommended, protects YOU). The owner's policy is a one-time fee at closing — typically 0.5% to 1% of the purchase price — that covers you and your heirs for as long as you own the property.\n\nTitle searches reveal issues in approximately one out of every three residential transactions (source: ALTA). Without an owner's title insurance policy, you'd be personally responsible for legal defense costs if someone challenges your ownership — even if the claim is baseless. Legal defense alone can cost $50,000 or more.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    tip: "You have the legal right to choose your own title company (RESPA). Shopping around can save hundreds of dollars. Ask about the simultaneous issue discount when buying both lender's and owner's policies from the same company.",
  },
  {
    title: "Close the Transaction",
    content: "Closing (also called settlement) is the final step. Your closing agent — a title agent, settlement agent, escrow officer, or attorney depending on your state — coordinates the entire process: gathering all required documents, calculating final figures, disbursing funds, and recording the deed.\n\nBefore closing day, you should: receive and review your Closing Disclosure at least 3 business days before closing (compare it line-by-line to your Loan Estimate), verify your wire transfer instructions BY PHONE using a number you already have (never trust emailed wire instructions), complete a final walk-through of the property, and gather your required documents (photo ID, proof of insurance, certified funds).\n\nAt the closing table, you'll sign 50-100+ pages of documents including the promissory note (your promise to repay), the deed of trust (security instrument giving the lender foreclosure rights), the closing disclosure (final costs), and various affidavits and disclosures. Your closing agent will explain each document.\n\nOnce everything is signed, funds are disbursed: the seller receives their proceeds, the real estate agents receive their commissions, and all closing costs are paid. The deed is recorded with the county, officially transferring ownership to you. You receive the keys to your new home.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
    tip: "Bring more than you think you need: two forms of ID, your checkbook (as backup), and phone numbers for your lender, agent, and insurance company in case any last-minute questions come up.",
  },
];

const documents = [
  {
    title: "Closing Disclosure",
    description: "Contains all the terms of your transaction and itemized costs. Must be provided at least 3 business days before your closing date so you can review it carefully.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>),
    color: "from-[#1a5276] to-[#0a7ea8]", bg: "bg-[#e8f0f5]", border: "border-[#c5d8e4]", accent: "text-[#1a5276]",
    href: "/closing-disclosure",
  },
  {
    title: "Promissory Note",
    description: "Your written promise to repay the mortgage loan. Includes the amount borrowed, interest rate, payment schedule, and consequences of default.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    color: "from-[#2d6b3f] to-[#1a5276]", bg: "bg-[#e9f5ed]", border: "border-[#bddcc7]", accent: "text-[#2d6b3f]",
    href: "/document-library",
  },
  {
    title: "Deed of Trust / Security Instrument",
    description: "Transfers conditional ownership of the property to secure your loan. If you fail to make payments, the lender has the right to foreclose.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>),
    color: "from-[#5b3a8c] to-[#1a5276]", bg: "bg-[#f0ecf6]", border: "border-[#d4c8e4]", accent: "text-[#5b3a8c]",
    href: "/document-library",
  },
];

export default function WhatToExpectPage() {
  return (
    <>
      <PageHero
        title="What to Expect"
        subtitle="Closing is the final phase of your home purchase — where you legally commit to your mortgage loan and become the official property owner. Here's what the journey looks like."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "What to Expect", href: "/closing-process/what-to-expect" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page intro */}
          <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Step-by-Step Closing Guide</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Follow these 8 steps from getting financially ready to receiving your keys. Each step includes what to expect and what to look out for. Bookmark this page and come back as you move through the process.</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-bold text-alta-navy mb-8 flex items-center gap-2">8 Keys to Getting the Keys {/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://images.unsplash.com/photo-1582139329536-e7284fece509?w=80&q=80" alt="House keys" className="w-9 h-9 rounded-lg object-cover shadow-sm" /></h2>
          <div className="space-y-6 mb-16">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-5 items-center`}>
                {/* Image */}
                <div className="w-full md:w-2/5 shrink-0">
                  <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${step.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-alta-teal text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-alta-teal flex items-center justify-center text-white font-bold text-sm shrink-0">{i + 1}</div>
                    <h3 className="font-bold text-alta-navy text-lg">{step.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {step.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-sm text-alta-gray leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  {step.tip && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                      <p className="text-xs text-amber-800 leading-relaxed"><strong>Tip:</strong> {step.tip}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* Key Documents */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Key Closing Documents</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {documents.map((doc) => (
              <Link key={doc.title} href={doc.href} className={`group rounded-2xl overflow-hidden border ${doc.border} shadow-sm tile-interactive`}>
                <div className={`bg-gradient-to-r ${doc.color} px-5 py-3 flex items-center gap-3`}>
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    {doc.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm">{doc.title}</h3>
                </div>
                <div className={`p-5 ${doc.bg}`}>
                  <p className="text-xs text-alta-gray leading-relaxed mb-3">{doc.description}</p>
                  <span className={`text-[11px] ${doc.accent} font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Learn more
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/closing-process/closing-options" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Explore Closing Options
            </Link>
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Get Your Checklist
            </Link>
          </div>

          <ClosingFlowNav currentStep={1} />

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
