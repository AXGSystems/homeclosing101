'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send, Sparkles, Download, Loader2, GripHorizontal, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import DateWeatherWidget from '@/components/DateWeatherWidget';

const sponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/", blurb: "Nation's leading provider of title insurance, settlement services, and risk solutions." },
  { name: "Old Republic Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/", blurb: "One of the largest title insurance groups in the nation since 1907." },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/", blurb: "Global real estate services company providing title insurance and settlement solutions." },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/", blurb: "Fidelity National Financial — nation's largest title insurance group, Fortune 500." },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/", blurb: "Technology-driven title insurance and settlement services company." },
  { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/", blurb: "Wire fraud prevention and identity verification for real estate transactions." },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/", blurb: "Digital real estate closing platform connecting title, lending, and real estate pros." },
  { name: "SoftPro", logo: "https://www.alta.org/images/wplogos/0005926.png", url: "https://www.softprocorp.com/", blurb: "Leading closing, title, and escrow software trusted by thousands nationwide." },
  { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/", blurb: "Secure payment platform for real estate — protecting wire transfers from fraud." },
  { name: "Westcor Land Title", logo: "https://www.alta.org/images/wplogos/1022814.png", url: "https://www.wltic.com/", blurb: "National title insurance underwriter with competitive rates and broad coverage." },
  { name: "DataTrace", logo: "https://www.alta.org/images/wplogos/0003471.png", url: "https://www.datatracetitle.com/", blurb: "Title data solutions and automation powering faster, more accurate title searches." },
];

// SponsorBadge is now integrated directly into the HomeClosingAI component

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  // What happens at the closing table (must be before general closing process)
  if (q.includes('closing table') || q.includes('closing day') || q.includes('signing day') || q.includes('settlement day')) {
    return `**What Happens at the Closing Table**\n\nClosing day is when you sign the final documents and officially become a homeowner.\n\n**Who's typically there:**\n- You (the buyer)\n- The seller (or their representative)\n- A settlement/closing agent\n- A notary public\n- Sometimes your real estate agent and/or attorney\n\n**What you'll sign:**\n- **Closing Disclosure** — Final costs and loan terms\n- **Promissory Note** — Your promise to repay the mortgage\n- **Deed of Trust/Mortgage** — Secures the loan with the property\n- **Deed** — Transfers ownership from seller to you\n- Various affidavits and disclosures\n\n**What to bring:**\n- Government-issued photo ID\n- Certified/cashier's check or wire confirmation\n- Proof of homeowner's insurance\n\n**How long it takes:** Usually 30–90 minutes.\n\n**After signing:** The deed is recorded with the county, and you get the keys!\n\nUse our **Closing Checklist** at /closing-process/closing-checklist to prepare.\n\n_Source: HC101 Closing Process page — all data verified._`;
  }

  // Closing process
  if (q.includes('closing') && (q.includes('process') || q.includes('what') || q.includes('how'))) {
    return `**The Home Closing Process**\n\nClosing (also called "settlement") is when you legally commit to your mortgage and become the official homeowner. Here are the 8 key steps:\n\n1. **Get Your Finances Ready** — Credit, debts, savings\n2. **Get Pre-Approved** — Compare lenders, lock in financing\n3. **Find a Property** — Work with an agent\n4. **Make an Offer** — Negotiate terms\n5. **Sign Purchase Agreement** — Formalize the deal\n6. **Get Funding** — Finalize your mortgage\n7. **Get Insurance** — Homeowner's + title insurance\n8. **Close the Transaction** — Sign docs, get keys!\n\nWant details on any step? Just ask!\n\n_Source: HC101 Closing Process page — all data verified._`;
  }

  // Title insurance
  if (q.includes('title insurance') || q.includes('title policy') || q.includes('owner\'s policy')) {
    return `**Owner's Title Insurance**\n\nA one-time purchase at closing that protects your property rights **for as long as you own the home**.\n\n**What it covers:**\n- Unpaid mortgages/liens from previous owners\n- Forged documents or fraudulent signatures\n- Unknown heirs with claims\n- Errors in public records\n- Undisclosed easements\n\n**Cost:** Typically 0.5%–1% of purchase price\n\n**Important:** A *lender's policy* only protects the bank. You need an *owner's policy* to protect YOUR investment.\n\nTitle searches find issues in **1 out of 3** transactions.\n\n_Source: HC101 Protect Your Rights page (ALTA data) — all data verified._`;
  }

  // Wire fraud
  if (q.includes('wire fraud') || q.includes('fraud') || q.includes('scam') || q.includes('wire')) {
    return `**Wire Fraud Warning**\n\nWire fraud is the **#1 threat** to homebuyers. Losses hit **$275.1 million** in 2025.\n\n**How it works:**\n1. Criminals hack real estate email accounts\n2. They send fake wiring instructions near closing\n3. You wire funds to the criminal's account\n4. Money disappears within 24-48 hours\n\n**5 Safeguards:**\n1. **CALL to verify** wire instructions (use a known number)\n2. **Never trust email** changes to wire details\n3. **Forward, don't reply** to financial emails\n4. **Ask your bank** to verify the account name\n5. **Confirm receipt** immediately after wiring\n\nIf you think you're a victim: Contact your bank IMMEDIATELY, then file with FBI at ic3.gov.\n\n_Source: HC101 Stop Fraud & Protect Your Money pages (FBI IC3 data) — all data verified._`;
  }

  // Closing costs
  if (q.includes('cost') || q.includes('how much') || q.includes('expensive') || q.includes('fees') || q.includes('price')) {
    return `**Closing Costs: 2%–5% of Purchase Price**\n\nFor a $350,000 home, expect $7,000–$17,500.\n\n**Major fee categories:**\n- **Loan Origination:** 0.5%–1% of loan\n- **Appraisal:** $300–$600\n- **Home Inspection:** $300–$500\n- **Title Search:** $200–$400\n- **Owner's Title Insurance:** 0.5%–1% of price\n- **Lender's Title Insurance:** $500–$1,500\n- **Settlement Fee:** $500–$2,000\n- **Recording Fees:** $50–$250\n- **Homeowner's Insurance:** $800–$2,000/yr\n\nUse our **Closing Cost Calculator** at /closing-process/closing-costs for a personalized estimate!\n\n_Source: HC101 Closing Costs page — all data verified._`;
  }

  // Closing disclosure
  if (q.includes('disclosure') || q.includes('document') || q.includes('paperwork')) {
    return `**Key Closing Documents**\n\n1. **Closing Disclosure** — 5-page document with all terms and costs. Must be provided **at least 3 business days** before closing. Compare it to your Loan Estimate!\n\n2. **Promissory Note** — Your written promise to repay the mortgage. Includes amount, rate, schedule, and consequences of default.\n\n3. **Deed of Trust** — Transfers conditional ownership to secure your loan. The lender can foreclose if you don't pay.\n\n**Tip:** Review your Closing Disclosure carefully. If anything looks different from your Loan Estimate, ask your settlement agent BEFORE signing.\n\n_Source: HC101 Closing Process page — all data verified._`;
  }

  // Closing options / remote
  if (q.includes('remote') || q.includes('online') || q.includes('option') || q.includes('ron') || q.includes('notary')) {
    return `**Closing Options**\n\n1. **In Person** — Traditional. Meet at the settlement office to sign everything.\n\n2. **Mail Away / Mobile Notary** — Documents mailed to you, notary comes to your location.\n\n3. **Hybrid** — Pre-sign most docs digitally, visit office only for main transfer documents.\n\n4. **Remote Online Notarization (RON)** — Fully digital. Sign everything from anywhere through a secure portal.\n\nAvailability varies by state. Not all options are available everywhere. Check with your title company!\n\n_Source: HC101 Closing Process page — all data verified._`;
  }

  // Find company
  if (q.includes('find') && (q.includes('company') || q.includes('title'))) {
    return `**Finding a Title Company**\n\nYou have the **right to choose** your own title company under federal law (RESPA).\n\n**Tips:**\n- Look for ALTA members at alta.org/find-a-company\n- Ask if they follow ALTA Best Practices\n- Compare fees from 2-3 companies\n- Ask about their wire fraud prevention process\n- Check reviews and get agent recommendations\n\n**Important:** Your lender or agent may recommend a provider, but you are NOT obligated to use them. Shopping around can save money!\n\n_Source: HC101 Find a Company page — all data verified._`;
  }

  // Checklist
  if (q.includes('checklist') || q.includes('list') || q.includes('prepare') || q.includes('ready')) {
    return `**Closing Checklist Highlights**\n\n**Before you start:**\n- Check credit score\n- Get pre-approved\n- Choose a real estate agent\n\n**After offer accepted:**\n- Lock your interest rate\n- Schedule inspections\n- Shop for title insurance\n- Review title commitment\n\n**One week before:**\n- Review Closing Disclosure\n- Verify wire instructions BY PHONE\n- Schedule final walk-through\n- Set up utilities\n\n**Closing day:**\n- Bring photo ID\n- Bring proof of insurance\n- Bring certified funds\n- Sign and get your keys!\n\nUse our **Interactive Checklist** at /closing-process/closing-checklist to track your progress!\n\n_Source: HC101 Closing Checklist page — all data verified._`;
  }

  // Glossary / terms
  if (q.includes('what is') || q.includes('define') || q.includes('mean') || q.includes('glossary')) {
    if (q.includes('escrow')) return `**Escrow** — The deposit of money or documents with an impartial third party pending the completion of a real estate transaction. Your escrow agent holds funds until all conditions are met, then distributes them to the appropriate parties.\n\n_Source: HC101 Glossary — all data verified._`;
    if (q.includes('deed')) return `**Deed** — A written document that legally conveys real estate title from one party to another. A **Warranty Deed** is the strongest form, guaranteeing clear title. A **Quit Claim Deed** transfers whatever interest the grantor may have without any guarantees.\n\n_Source: HC101 Glossary — all data verified._`;
    if (q.includes('lien')) return `**Lien** — A legal claim against real estate used as security for the payment of a debt. Common types include mortgage liens, tax liens, mechanic's liens (for unpaid construction work), and judgment liens.\n\n_Source: HC101 Glossary — all data verified._`;
    if (q.includes('appraisal')) return `**Appraisal** — A professional assessment of a property's fair market value, typically required by your lender. An appraiser evaluates the property's condition, features, and comparable recent sales. Cost: typically $300–$600.\n\n_Source: HC101 Glossary & Appraisal Guide pages — all data verified._`;
    return `I can define real estate terms for you! Try asking:\n- "What is escrow?"\n- "What does lien mean?"\n- "Define appraisal"\n\nOr browse our full **Real Estate Glossary** at /glossary with 450+ searchable terms.\n\n_Source: HC101 Glossary — all data verified._`;
  }

  // First-time buyer
  if (q.includes('first time') || q.includes('first-time') || q.includes('new buyer') || q.includes('never bought')) {
    return `**First-Time Homebuyer Advice**\n\nBuying your first home is exciting — and a little overwhelming. Here's where to start:\n\n1. **Check your credit score** — Aim for 620+ (conventional) or 580+ (FHA)\n2. **Set a realistic budget** — Factor in down payment, closing costs (2-5%), and monthly payments\n3. **Get pre-approved** — Shows sellers you're serious and locks your rate\n4. **Research assistance programs** — Many states offer down payment grants for first-time buyers\n5. **Hire a buyer's agent** — They represent YOUR interests, not the seller's\n6. **Get a home inspection** — Never skip this step\n7. **Understand your Closing Disclosure** — Review it carefully before signing\n\nVisit our **First-Time Buyers Guide** at /first-time-buyers for a complete walkthrough!\n\n_Source: HC101 First-Time Buyers page — all data verified._`;
  }

  // Down payment assistance
  if (q.includes('down payment') || q.includes('downpayment') || q.includes('assistance program') || q.includes('dpa')) {
    return `**Down Payment Assistance Programs**\n\nMany buyers don't realize there are programs that can help cover your down payment and closing costs.\n\n**Types of assistance:**\n- **Grants** — Free money that doesn't need to be repaid\n- **Forgivable loans** — Forgiven after you live in the home for a set period (often 5-10 years)\n- **Deferred loans** — No payments until you sell, refinance, or pay off the mortgage\n- **Matched savings** — Programs that match your savings dollar-for-dollar\n\n**Where to look:**\n- Your state housing finance agency (HFA)\n- HUD's list of local homebuyer programs at hud.gov\n- FHA loans require as little as 3.5% down\n- VA loans and USDA loans may require 0% down\n\n**Tip:** Ask your lender about programs you may qualify for — many buyers leave money on the table.\n\n_Source: HC101 First-Time Buyers page — all data verified._`;
  }

  // DTI ratio
  if (q.includes('dti') || q.includes('debt-to-income') || q.includes('debt to income')) {
    return `**Debt-to-Income (DTI) Ratio Explained**\n\nYour DTI ratio is one of the most important numbers in your mortgage application. It measures how much of your gross monthly income goes toward debt payments.\n\n**How to calculate:**\nTotal Monthly Debts / Gross Monthly Income = DTI%\n\n**Example:** $2,000 in debts / $6,000 income = 33% DTI\n\n**What counts as debt:**\n- Future mortgage payment (PITI)\n- Car loans\n- Student loans\n- Credit card minimum payments\n- Child support / alimony\n\n**What does NOT count:**\n- Utilities, groceries, insurance premiums\n- Cell phone, subscriptions\n\n**Lender guidelines:**\n- **Conventional:** 43-45% max DTI (some allow up to 50%)\n- **FHA:** Up to 57% with compensating factors\n- **VA:** No hard cap, but 41% is the benchmark\n\n**Tip:** Paying down credit cards before applying can dramatically improve your DTI and help you qualify for a better rate.\n\n_Source: HC101 DTI Calculator page — all data verified._`;
  }

  // Escrow process (full response, not just glossary definition)
  if (q.includes('escrow') && !q.includes('what is') && !q.includes('define') && !q.includes('mean')) {
    return `**The Escrow Process**\n\nEscrow is a neutral third party that holds money and documents until all conditions of the real estate transaction are met.\n\n**Before closing:**\n- Your **earnest money deposit** goes into an escrow account when your offer is accepted\n- The escrow agent holds it safely until closing\n- If the deal falls through for a valid reason, you typically get it back\n\n**At closing:**\n- The escrow/settlement agent coordinates document signing\n- They collect funds from the buyer and lender\n- They distribute payments to the seller, agents, and service providers\n- They record the deed with the county\n\n**After closing:**\n- Your lender may set up an **escrow account** for property taxes and homeowner's insurance\n- A portion of each mortgage payment goes into this account\n- The lender pays your taxes and insurance on your behalf\n\nLearn more in our **Escrow Guide** at /escrow-guide.\n\n_Source: HC101 Escrow Guide page — all data verified._`;
  }

  // Home inspection
  if (q.includes('inspection') || q.includes('inspector')) {
    return `**Home Inspection Tips**\n\nA home inspection is your chance to uncover problems BEFORE you buy. Never skip it.\n\n**What inspectors check:**\n- Roof, gutters, and exterior\n- Foundation and structural elements\n- Plumbing, electrical, and HVAC systems\n- Windows, doors, and insulation\n- Attic, basement, and crawl spaces\n\n**Specialty inspections to consider:**\n- **Radon testing** — Odorless gas, #2 cause of lung cancer\n- **Termite/pest inspection** — Often required by lenders\n- **Sewer scope** — Can reveal costly pipe damage\n- **Mold testing** — Especially in humid climates\n\n**Tips:**\n- Attend the inspection in person if possible\n- Ask questions — good inspectors love to teach\n- Review the report carefully before your inspection contingency deadline\n- Negotiate repairs or credits based on findings\n\n**Cost:** Typically $300-$500 depending on home size.\n\nSee our full **Home Inspection Guide** at /home-inspection.\n\n_Source: HC101 Home Inspection page — all data verified._`;
  }

  // Homeowner's vs title insurance
  if ((q.includes('homeowner') && q.includes('insurance') && !q.includes('title')) || (q.includes('difference') && q.includes('insurance')) || (q.includes('homeowner') && q.includes('title'))) {
    return `**Homeowner's Insurance vs. Title Insurance**\n\nThese are two completely different types of protection:\n\n**Homeowner's Insurance:**\n- Protects against **future** damage (fire, storms, theft, liability)\n- **Paid annually** (or monthly through escrow)\n- **Required** by your lender\n- Covers the physical structure and your belongings\n\n**Title Insurance:**\n- Protects against **past** issues with ownership (liens, forgery, errors)\n- **One-time payment** at closing\n- **Owner's policy** is optional but strongly recommended\n- **Lender's policy** is required by your lender\n- Covers you for as long as you own the home\n\n**Bottom line:** You need BOTH. Homeowner's insurance protects the house itself. Title insurance protects your legal right to own it.\n\nLearn more at /homeowners-insurance and /protect-your-rights.\n\n_Source: HC101 Homeowners Insurance & Protect Your Rights pages — all data verified._`;
  }

  // After closing / what to do after closing
  if (q.includes('after closing') || q.includes('after i close') || q.includes('new homeowner') || q.includes('what now')) {
    return `**What to Do After Closing**\n\nCongratulations — you're a homeowner! Here's your post-closing checklist:\n\n**Immediately:**\n- **Change the locks** — You don't know who has copies of the old keys\n- **Set up utilities** — Electric, gas, water, internet, trash\n- **File your homestead exemption** — Can significantly lower your property taxes\n- **Save your closing documents** — Store your deed, title policy, and Closing Disclosure in a safe place\n\n**Within 30 days:**\n- **Update your address** — USPS, DMV, bank accounts, subscriptions\n- **Review your first mortgage statement** — Confirm the terms match your Closing Disclosure\n- **Build an emergency fund** — Aim for 1-3% of the home's value annually for maintenance\n\n**Ongoing:**\n- **Keep your title insurance policy** — It protects you for as long as you own the home\n- **Don't fall for deed scams** — Ignore mail that asks you to pay for a copy of your deed\n- **Track home improvements** — Receipts can reduce capital gains taxes when you sell\n\nVisit our full **After Closing Guide** at /after-closing for more details.\n\n_Source: HC101 After Closing page — all data verified._`;
  }

  // Appraisal (enhanced — low appraisal / appraisal gap)
  if (q.includes('appraisal came in low') || q.includes('low appraisal') || q.includes('appraisal gap')) {
    return `**What to Do When the Appraisal Comes in Low**\n\nA low appraisal means the appraiser valued the home below your agreed purchase price. This is more common than you think — and you have options.\n\n**Your 4 options:**\n\n1. **Renegotiate the price** — Ask the seller to lower the price to the appraised value. This is the most common resolution.\n\n2. **Cover the gap with cash** — Pay the difference between the appraised value and the purchase price out of pocket. Your lender will only lend based on the appraised value.\n\n3. **Request a Reconsideration of Value (ROV)** — Provide your lender with comparable sales the appraiser may have missed. If justified, the value may be revised upward.\n\n4. **Walk away** — If you have an appraisal contingency in your contract, you can cancel the deal and get your earnest money back.\n\n**Example:** Home price $400,000, appraised at $380,000. The $20,000 gap is yours to solve — the lender won't cover it.\n\n**Tip:** An appraisal contingency is your safety net. Never waive it unless you can afford to cover a potential gap.\n\nLearn more in our **Appraisal Guide** at /appraisal-guide.\n\n_Source: HC101 Appraisal Guide page — all data verified._`;
  }

  // HOA
  if (q.includes('hoa') || q.includes('homeowners association') || q.includes('condo fees')) {
    return `**HOA — What Homebuyers Need to Know**\n\nA Homeowners Association (HOA) manages shared spaces and enforces community rules. Monthly fees typically range from **$200-$400**, but luxury or urban condos can exceed **$1,000/month**.\n\n**What HOA fees usually cover:**\n- Common area maintenance (pool, gym, landscaping)\n- Exterior building maintenance (condos)\n- Trash and water (sometimes)\n- Insurance for shared structures\n- Reserve fund for major repairs\n\n**Red flags to watch for:**\n- **Low reserve fund** — Could mean a special assessment is coming\n- **Frequent special assessments** — Sign of poor financial planning\n- **Pending litigation** — Could affect your ability to get a mortgage\n- **Excessive restrictions** — Read the CC&Rs before you buy\n\n**Questions to ask before buying:**\n- What are the current monthly dues and when did they last increase?\n- What is the reserve fund balance?\n- Are there any pending special assessments or lawsuits?\n- What do the CC&Rs restrict (rentals, pets, renovations)?\n\n**Important:** Your lender factors HOA fees into your DTI ratio, so higher fees reduce your buying power.\n\nLearn more in our **HOA Guide** at /hoa-guide.\n\n_Source: HC101 HOA Guide page — all data verified._`;
  }

  // Negotiation / what can I negotiate
  if (q.includes('negotiate') || q.includes('negotiable') || q.includes('seller concession') || q.includes('credits')) {
    return `**What You Can (and Can't) Negotiate at Closing**\n\nMany closing costs are negotiable — but not all of them. Here's what to know.\n\n**Negotiable costs:**\n- **Seller concessions** — Ask the seller to cover part of your closing costs (up to 3-6% depending on loan type)\n- **Title insurance premiums** — Shop around; prices vary between companies\n- **Settlement/closing fees** — Some companies will match competitors\n- **Home warranty** — Ask the seller to include one\n- **Repairs or credits** — Based on inspection findings\n- **Real estate agent commissions** — Can sometimes be negotiated\n\n**Non-negotiable costs:**\n- **Government recording fees** — Set by the county\n- **Transfer taxes** — Set by state/local law\n- **Prepaid property taxes** — Based on tax rate\n- **Prepaid homeowner's insurance** — Based on your policy\n\n**Seller concession limits by loan type:**\n- **Conventional:** 3% (less than 10% down), 6% (10-25% down), 9% (25%+ down)\n- **FHA:** Up to 6%\n- **VA:** Up to 4%\n\n**Tip:** In a buyer's market, sellers are more willing to negotiate. In a hot market, asking for too many concessions can cost you the deal.\n\nSee our **Negotiation Guide** at /negotiation-guide for strategies.\n\n_Source: HC101 Negotiation Guide page — all data verified._`;
  }

  // Tax benefits
  if (q.includes('tax') && !q.includes('transfer tax') || q.includes('deduction') || q.includes('mortgage interest deduction') || q.includes('homestead')) {
    return `**Tax Benefits of Homeownership**\n\nOwning a home comes with several valuable tax deductions. Here are the major ones:\n\n**Key deductions:**\n- **Mortgage interest** — Deductible on loans up to $750,000 (married filing jointly). This is often the largest homeowner tax break.\n- **Property taxes** — Deductible up to $10,000 combined with state/local income taxes (SALT cap)\n- **Mortgage points** — Points paid at closing to lower your rate are deductible in the year of purchase\n- **Home office** — If you're self-employed and use a dedicated space exclusively for business\n\n**Other tax benefits:**\n- **Homestead exemption** — Many states reduce your property tax assessment for primary residences. File with your county after closing!\n- **Capital gains exclusion** — When you sell, up to $250,000 in profit ($500,000 married) is tax-free if you've lived there 2+ of the last 5 years\n- **Energy credits** — Federal tax credits for solar panels, heat pumps, and energy-efficient upgrades\n\n**Important:** You must **itemize deductions** to claim mortgage interest and property taxes. If your total itemized deductions don't exceed the standard deduction ($30,000 married / $15,000 single for 2025), you may not benefit.\n\n**Tip:** Consult a tax professional for advice specific to your situation.\n\nLearn more at /tax-benefits.\n\n_Source: HC101 Tax Benefits page — all data verified._`;
  }

  // Hidden costs / true cost
  if (q.includes('hidden cost') || q.includes('true cost') || q.includes('surprise') || q.includes('unexpected')) {
    return `**The Hidden Costs of Homeownership**\n\nThe purchase price is just the beginning. The average homeowner spends approximately **$18,118 per year** beyond their mortgage payment (Bankrate 2025 analysis).\n\n**Costs buyers often miss:**\n- **Property taxes** — $2,500-$8,000+/year depending on location\n- **Homeowner's insurance** — $1,500-$3,000+/year (more in disaster-prone areas)\n- **Maintenance & repairs** — Budget 1-3% of home value annually ($3,500-$10,500 on a $350K home)\n- **Utilities** — Often higher than renting: $200-$400+/month\n- **HOA fees** — $200-$400+/month if applicable\n- **PMI** — $100-$300+/month if your down payment is under 20%\n- **Lawn care & landscaping** — $100-$300/month\n- **Pest control** — $400-$600/year\n- **Appliance replacement** — Major appliances last 10-15 years\n\n**The big surprises:**\n- **Special assessments** — HOA can levy unexpected charges for major repairs\n- **Foundation or roof issues** — Can cost $5,000-$15,000+\n- **Sewer line replacement** — $3,000-$25,000\n- **Tree removal** — $500-$2,000 per tree\n\n**Tip:** Before buying, add up ALL expected monthly costs — not just the mortgage. Use the 28/36 rule: spend no more than 28% of gross income on housing costs.\n\nSee the full breakdown at /after-closing.\n\n_Source: HC101 After Closing page (Bankrate 2025 data) — all data verified._`;
  }

  // Deal falling through / cancellation
  if (q.includes('cancel') || q.includes('back out') || q.includes('walk away') || q.includes('cold feet') || q.includes('contingency')) {
    return `**Can I Back Out of Buying a Home?**\n\nThe short answer: **it depends on your contingencies and timing.**\n\n**When you CAN walk away (and keep your earnest money):**\n- **Inspection contingency** — Home has major issues you can't resolve with the seller\n- **Appraisal contingency** — Home appraises below the purchase price\n- **Financing contingency** — Your mortgage falls through despite good-faith effort\n- **Title contingency** — Title search reveals unresolvable issues\n- **Sale contingency** — Your current home doesn't sell\n\n**When you CAN'T (or it will cost you):**\n- **After contingency deadlines pass** — You've waived your protections\n- **After waiving contingencies** — Common in competitive markets; risky move\n- **Cold feet alone** — Not a legal reason to cancel\n- **At the closing table** — Technically possible but you'll likely lose your earnest money\n\n**Earnest money at risk:**\n- Typically **1-3% of purchase price** ($3,500-$10,500 on a $350K home)\n- If you cancel outside a contingency, the seller usually keeps it\n- The seller could also sue for additional damages (rare but possible)\n\n**Tip:** Never waive contingencies unless you fully understand the financial risk. They are your contractual safety net.\n\nLearn more about contingencies in our **FAQ** at /faq.\n\n_Source: HC101 FAQ page — all data verified._`;
  }

  // Rate lock
  if (q.includes('rate lock') || q.includes('lock in') || q.includes('lock my rate')) {
    return `**Mortgage Rate Locks Explained**\n\nA rate lock is a lender's guarantee that your interest rate won't change for a set period while your loan is processed.\n\n**How it works:**\n- You "lock" your rate with your lender after pre-approval or when you have an accepted offer\n- The lender guarantees that rate for a set period, regardless of market changes\n- If rates go up, you're protected. If rates drop significantly, you may be stuck (unless you have a float-down option)\n\n**Typical lock periods:**\n- **30 days** — Most common, usually the cheapest\n- **45 days** — Standard for most purchases\n- **60 days** — Needed for longer closings; slightly higher cost\n- **90+ days** — Available but usually costs more (higher rate or fees)\n\n**When to lock:**\n- **After your offer is accepted** — You have a target closing date\n- **When you're comfortable with the rate** — Don't try to time the market perfectly\n- **Allow a buffer** — If closing is expected in 35 days, lock for 45\n\n**What happens if your lock expires:**\n- You'll need to re-lock at **current market rates** (which could be higher)\n- Some lenders charge a fee to extend the lock\n- Extensions are typically 7-15 days and cost 0.125%-0.25% of the loan\n\n**Tip:** Ask your lender about a **float-down option** — it lets you take advantage of lower rates if they drop after you lock, usually for a small fee.\n\nLearn more about mortgage rates in our **First-Time Buyers Guide** at /first-time-buyers.\n\n_Source: HC101 First-Time Buyers page — all data verified._`;
  }

  // ALTA Best Practices
  if (q.includes('alta') || q.includes('best practice') || q.includes('american land title')) {
    return `**ALTA Best Practices**\n\nThe American Land Title Association (ALTA) developed a set of **Best Practices** — a framework of policies and procedures that title and settlement companies follow to protect consumers.\n\n**The 7 Pillars:**\n1. **Licensing** — Maintain proper state licenses\n2. **Escrow Trust Accounting** — Safeguard client funds\n3. **Privacy & Information Security** — Protect personal data\n4. **Settlement Procedures** — Follow proper closing protocols\n5. **Title Policy Production** — Ensure accurate title policies\n6. **Insurance & Fidelity Coverage** — Carry appropriate insurance\n7. **Consumer Complaints** — Have a process to handle issues\n\n**Why it matters to you:**\nCompanies that follow ALTA Best Practices have been assessed for strong consumer protections. When choosing a title company, ask if they are ALTA Best Practices certified.\n\nFind ALTA members at alta.org/find-a-company or visit /find-company.\n\n_Source: HC101 ALTA Best Practices & Join ALTA pages — all data verified._`;
  }

  // Loan types / compare
  if (q.includes('loan type') || q.includes('compare loan') || q.includes('fha vs') || q.includes('conventional vs') || q.includes('va vs')) {
    return `**Comparing Common Loan Types**\n\n**Conventional Loan**\n- Down payment: 3%–20%\n- Credit score: 620+ typical\n- PMI required if < 20% down (removable)\n- Best for: Strong credit, decent savings\n\n**FHA Loan**\n- Down payment: 3.5% (580+ score) or 10% (500-579)\n- Credit score: 580+ (some lenders allow 500)\n- MIP required for life of loan (if < 10% down)\n- Best for: Lower credit scores, smaller down payment\n\n**VA Loan**\n- Down payment: 0%\n- Credit score: No VA minimum (lenders often want 620+)\n- No PMI/MIP — but has a funding fee\n- Best for: Veterans, active military, eligible spouses\n\n**USDA Loan**\n- Down payment: 0%\n- Credit score: 640+ typical\n- Must be in eligible rural/suburban area\n- Income limits apply\n- Best for: Moderate-income buyers in qualifying areas\n\n**Tip:** Get pre-approved with 2-3 lenders to compare rates and terms. Even a 0.25% rate difference can save thousands over the life of the loan.\n\nVisit our **First-Time Buyers Guide** at /first-time-buyers for more details!\n\n_Source: HC101 First-Time Buyers page — all data verified._`;
  }

  // CertifID
  if (q.includes('certifid')) {
    return `**CertifID — Wire Fraud Prevention**\n\nCertifID is a leading wire fraud prevention platform used by title companies and real estate professionals to verify identities and secure wire transfers.\n\n**How it works:**\n1. Your title company sends you a secure CertifID request\n2. You verify your identity through the platform\n3. Wire instructions are delivered through an encrypted, verified channel\n4. Both parties are confirmed before funds transfer\n\n**Why it matters:**\n- Wire fraud costs homebuyers **$275.1 million** annually\n- CertifID adds a critical layer of verification\n- Used by thousands of title companies nationwide\n\n**Tip:** Ask your title company if they use CertifID or a similar wire verification platform. It's one of the best safeguards against closing-day fraud.\n\nLearn more about wire fraud protection at /stop-fraud.\n\n_Source: HC101 Stop Fraud page (FBI IC3 data) — all data verified._`;
  }

  // Report fraud
  if (q.includes('report') && (q.includes('fraud') || q.includes('scam'))) {
    return `**How to Report Wire Fraud**\n\nIf you suspect you've been a victim of wire fraud, act IMMEDIATELY — every minute counts.\n\n**Step 1: Call your bank NOW**\n- Request an emergency recall of the wire transfer\n- Best chance of recovery is within **24 hours**\n\n**Step 2: Contact the FBI**\n- File a complaint at **ic3.gov** (Internet Crime Complaint Center)\n- Call your local FBI field office\n\n**Step 3: Notify your title company and real estate agent**\n- They may be compromised and need to alert other clients\n\n**Step 4: File a police report**\n- Contact your local law enforcement\n\n**Step 5: Report to the FTC**\n- File at **reportfraud.ftc.gov**\n\n**Recovery window:** The sooner you act, the better. After 72 hours, recovery becomes extremely difficult. Some victims have recovered funds weeks later, but speed is critical.\n\nLearn more about prevention at /stop-fraud.\n\n_Source: HC101 Stop Fraud page — all data verified._`;
  }

  // Help
  if (q.includes('help') || q.includes('what can you')) {
    return `**HomeClosing101 AI — I can help with:**\n\n- **Closing process:** "How does closing work?"\n- **Title insurance:** "What is title insurance?"\n- **Wire fraud:** "How do I avoid wire fraud?"\n- **Costs:** "How much are closing costs?"\n- **Documents:** "What documents do I need?"\n- **Closing options:** "Can I close remotely?"\n- **Finding companies:** "How do I find a title company?"\n- **Checklist:** "What should I prepare?"\n- **First-time buyers:** "I've never bought a home before"\n- **Down payment help:** "What is down payment assistance?"\n- **DTI ratio:** "What is debt-to-income?"\n- **Escrow:** "How does escrow work?"\n- **Home inspection:** "What should I know about inspections?"\n- **Insurance types:** "Homeowner's vs title insurance"\n- **ALTA Best Practices:** "What are ALTA Best Practices?"\n- **Closing day:** "What happens at the closing table?"\n- **After closing:** "What do I do after closing?"\n- **Low appraisal:** "My appraisal came in low"\n- **HOA fees:** "What should I know about HOA?"\n- **Negotiation:** "What can I negotiate?"\n- **Tax benefits:** "What are the tax benefits?"\n- **Hidden costs:** "What are the hidden costs?"\n- **Backing out:** "Can I back out of buying?"\n- **Rate lock:** "Should I lock my rate?"\n- **Definitions:** "What is escrow?"\n\nAll statistics and information come directly from HomeClosing101's verified content. I don't make up numbers — every figure I cite is sourced from our pages.\n\nI'm here to help you close with confidence!`;
  }

  // Default
  return `I'm not sure I understood that, but I can help with a wide range of closing topics!\n\n**Popular questions:**\n- **"How does closing work?"** — Step-by-step process\n- **"What is title insurance?"** — Why you need it\n- **"How much are closing costs?"** — Fee breakdown\n- **"How do I avoid wire fraud?"** — Protection tips\n- **"I'm a first-time buyer"** — Where to start\n- **"My appraisal came in low"** — Your 4 options\n- **"What can I negotiate?"** — Save on closing costs\n- **"What do I do after closing?"** — New homeowner checklist\n- **"What are the hidden costs?"** — The $18K/year reality\n- **"Can I back out?"** — Contingencies explained\n\nSay **"help"** for my full list of topics.\n\nYou can also browse our **FAQ** at /faq for 250+ answered questions, or search 450+ terms in our **Glossary** at /glossary.\n\n_All statistics come directly from HC101's verified content._`;
}

// Smart follow-up suggestions keyed by topic detected in the question
function getFollowUps(question: string): string[] {
  const q = question.toLowerCase();

  if (q.includes('closing table') || q.includes('closing day') || q.includes('signing day') || q.includes('settlement day'))
    return ['What documents will I sign?', 'Can I close remotely?', 'How long does closing take?'];
  if (q.includes('closing') && (q.includes('process') || q.includes('what') || q.includes('how')))
    return ['What are closing costs?', 'What happens at the closing table?', 'How do I avoid wire fraud?'];
  if (q.includes('title insurance') || q.includes('title policy') || q.includes('owner\'s policy'))
    return ['How much does title insurance cost?', 'How do I find a title company?', 'What are ALTA Best Practices?'];
  if (q.includes('wire fraud') || q.includes('fraud') || q.includes('scam') || q.includes('wire'))
    return ['What is CertifID?', 'How do I report wire fraud?', 'What happens at the closing table?'];
  if (q.includes('cost') || q.includes('how much') || q.includes('expensive') || q.includes('fees') || q.includes('price'))
    return ['What is title insurance?', 'What is DTI ratio?', 'Are there down payment programs?'];
  if (q.includes('disclosure') || q.includes('document') || q.includes('paperwork'))
    return ['What happens at closing?', 'What is escrow?', 'Can I close remotely?'];
  if (q.includes('remote') || q.includes('online') || q.includes('ron') || q.includes('notary'))
    return ['What documents will I sign?', 'How do I find a title company?', 'What are closing costs?'];
  if (q.includes('find') && (q.includes('company') || q.includes('title')))
    return ['What are ALTA Best Practices?', 'What is title insurance?', 'How do I avoid wire fraud?'];
  if (q.includes('checklist') || q.includes('list') || q.includes('prepare') || q.includes('ready'))
    return ['What are closing costs?', 'How do I avoid wire fraud?', 'What documents will I sign?'];
  if (q.includes('first time') || q.includes('first-time') || q.includes('new buyer') || q.includes('never bought'))
    return ['What are closing costs?', 'What is title insurance?', 'Are there down payment programs?'];
  if (q.includes('down payment') || q.includes('downpayment') || q.includes('assistance program') || q.includes('dpa'))
    return ['What is my DTI ratio?', 'First-time buyer tips', 'What are closing costs?'];
  if (q.includes('dti') || q.includes('debt-to-income') || q.includes('debt to income'))
    return ['Compare loan types', 'First-time buyer tips', 'What are closing costs?'];
  if (q.includes('escrow'))
    return ['What happens at closing?', 'What is title insurance?', 'What are closing costs?'];
  if (q.includes('inspection') || q.includes('inspector'))
    return ['What is the closing checklist?', 'What are closing costs?', 'First-time buyer tips'];
  if (q.includes('alta') || q.includes('best practice') || q.includes('american land title'))
    return ['How do I find a title company?', 'What is title insurance?', 'How do I avoid wire fraud?'];
  if (q.includes('loan') || q.includes('mortgage') || q.includes('fha') || q.includes('conventional') || q.includes('va loan') || q.includes('compare'))
    return ['What is my DTI ratio?', 'What are closing costs?', 'First-time buyer tips'];
  if (q.includes('after closing') || q.includes('after i close') || q.includes('new homeowner') || q.includes('what now'))
    return ['What are the hidden costs?', 'What are the tax benefits?', 'What is title insurance?'];
  if (q.includes('appraisal came in low') || q.includes('low appraisal') || q.includes('appraisal gap'))
    return ['Can I back out of buying?', 'What can I negotiate?', 'What are closing costs?'];
  if (q.includes('hoa') || q.includes('homeowners association') || q.includes('condo fees'))
    return ['What are the hidden costs?', 'What is my DTI ratio?', 'What can I negotiate?'];
  if (q.includes('negotiate') || q.includes('negotiable') || q.includes('seller concession') || q.includes('credits'))
    return ['What are closing costs?', 'What can I negotiate?', 'First-time buyer tips'];
  if (q.includes('tax') || q.includes('deduction') || q.includes('mortgage interest deduction') || q.includes('homestead'))
    return ['What do I do after closing?', 'What are the hidden costs?', 'What are closing costs?'];
  if (q.includes('hidden cost') || q.includes('true cost') || q.includes('surprise') || q.includes('unexpected'))
    return ['What about HOA fees?', 'What are the tax benefits?', 'What can I negotiate?'];
  if (q.includes('cancel') || q.includes('back out') || q.includes('walk away') || q.includes('cold feet') || q.includes('contingency'))
    return ['My appraisal came in low', 'What can I negotiate?', 'How does escrow work?'];
  if (q.includes('rate lock') || q.includes('lock in') || q.includes('lock my rate'))
    return ['Compare loan types', 'What are closing costs?', 'First-time buyer tips'];
  return ['How does closing work?', 'What is title insurance?', 'How do I avoid wire fraud?'];
}

// Page-aware suggestion chips
function getPageSuggestions(pathname: string): string[] {
  const p = pathname.toLowerCase();
  if (p.includes('first-time'))
    return ['First-time buyer tips', 'What are closing costs?', 'What is title insurance?', 'Are there down payment programs?', 'What is my DTI ratio?', 'Compare loan types'];
  if (p.includes('wire-fraud') || p.includes('protect'))
    return ['How do I avoid wire fraud?', 'What is CertifID?', 'How do I report wire fraud?', 'What is title insurance?', 'What are ALTA Best Practices?', 'How does closing work?'];
  if (p.includes('closing-cost'))
    return ['What are closing costs?', 'What is title insurance?', 'What is my DTI ratio?', 'Are there down payment programs?', 'How does closing work?', 'Compare loan types'];
  if (p.includes('glossary'))
    return ['What is escrow?', 'What is title insurance?', 'What are closing costs?', 'How does closing work?', 'What is my DTI ratio?', 'First-time buyer tips'];
  if (p.includes('closing-process') || p.includes('closing-checklist'))
    return ['How does closing work?', 'What happens at the closing table?', 'What are closing costs?', 'How do I avoid wire fraud?', 'What documents will I sign?', 'Can I close remotely?'];
  if (p.includes('escrow'))
    return ['How does escrow work?', 'What is title insurance?', 'What are closing costs?', 'What happens at closing?', 'How do I avoid wire fraud?', 'First-time buyer tips'];
  if (p.includes('faq'))
    return ['How does closing work?', 'What is title insurance?', 'How do I avoid wire fraud?', 'What are closing costs?', 'First-time buyer tips', 'What is my DTI ratio?'];
  // Default suggestions
  return ['What is title insurance?', 'How do I avoid wire fraud?', 'What are closing costs?', 'First-time buyer tips', "What's my DTI ratio?", 'Compare loan types'];
}

// Escape HTML special characters to prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Convert internal paths in response text to clickable links (returns HTML)
// Negative lookbehind (?<!<) prevents matching /strong, /a, etc. inside closing HTML tags
function linkifyPaths(html: string): string {
  return html.replace(
    /(?:at |visit |see |browse )?(?<!<)(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)/gi,
    (match, path) => {
      const label = path;
      return `<a href="${path}" class="text-alta-teal underline underline-offset-2 hover:text-alta-navy transition-colors" data-internal-link="${path}">${label}</a>`;
    }
  );
}

// Typing indicator component
function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '600ms' }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms', animationDuration: '600ms' }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '600ms' }} />
      </div>
    </div>
  );
}

export default function HomeClosingAI() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [lastUserQuestion, setLastUserQuestion] = useState('');
  const [sponsorIdx, setSponsorIdx] = useState(0);
  const [sponsorFading, setSponsorFading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, loading]);

  // Rotate sponsors
  useEffect(() => {
    const start = Math.floor(Math.random() * sponsors.length);
    setSponsorIdx(start);
    const interval = setInterval(() => {
      setSponsorFading(true);
      setTimeout(() => {
        setSponsorIdx((prev) => (prev + 1) % sponsors.length);
        setSponsorFading(false);
      }, 350);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const sendQuestion = (q: string) => {
    if (!q.trim() || loading || typing) return;
    const userMsg: Message = { role: 'user', content: q.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLastUserQuestion(q.trim());
    setInput('');
    setTyping(true);

    // Show typing dots for 300ms, then "Thinking..." spinner, then the response
    setTimeout(() => {
      setTyping(false);
      setLoading(true);
      setTimeout(() => {
        const response = generateResponse(q.trim());
        setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
        setLoading(false);
      }, 300 + Math.random() * 400);
    }, 300);
  };

  const handleSend = () => {
    sendQuestion(input);
  };

  const quickActions = getPageSuggestions(pathname || '/');

  const sponsor = sponsors[sponsorIdx];

  const [minimized, setMinimized] = useState(false);

  // Drag / resize / expand state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem('hc101-ai-position');
      if (p) setPosition(JSON.parse(p));
      const s = localStorage.getItem('hc101-ai-size');
      if (s) setSize(JSON.parse(s));
    } catch { /* ignore */ }
  }, []);

  const startDrag = (e: React.PointerEvent, element: HTMLElement | null) => {
    if (!element || isExpanded) return;
    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    let latest = { x: rect.left, y: rect.top };
    setPosition(latest);

    const handleMove = (ev: PointerEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - width, ev.clientX - offsetX));
      const newY = Math.max(0, Math.min(window.innerHeight - height, ev.clientY - offsetY));
      latest = { x: newX, y: newY };
      setPosition(latest);
    };
    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      try { localStorage.setItem('hc101-ai-position', JSON.stringify(latest)); } catch { /* ignore */ }
    };
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    e.preventDefault();
    e.stopPropagation();
  };

  const startResize = (e: React.PointerEvent, element: HTMLElement | null) => {
    if (!element || isExpanded) return;
    const rect = element.getBoundingClientRect();
    if (!position) setPosition({ x: rect.left, y: rect.top });
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = rect.width;
    const startH = rect.height;
    let latest = { width: startW, height: startH };
    setSize(latest);

    const handleMove = (ev: PointerEvent) => {
      const newW = Math.max(320, Math.min(window.innerWidth - 20, startW + (ev.clientX - startX)));
      const newH = Math.max(380, Math.min(window.innerHeight - 20, startH + (ev.clientY - startY)));
      latest = { width: newW, height: newH };
      setSize(latest);
    };
    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      try { localStorage.setItem('hc101-ai-size', JSON.stringify(latest)); } catch { /* ignore */ }
    };
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
    e.preventDefault();
    e.stopPropagation();
  };

  const resetLayout = () => {
    setPosition(null);
    setSize(null);
    setIsExpanded(false);
    try {
      localStorage.removeItem('hc101-ai-position');
      localStorage.removeItem('hc101-ai-size');
    } catch { /* ignore */ }
  };

  const collapsedStyle: React.CSSProperties = position
    ? { left: position.x, top: position.y, right: 'auto', transform: 'none' }
    : {};

  const chatPanelStyle: React.CSSProperties = isExpanded
    ? { top: '5vh', left: '5vw', right: 'auto', width: '90vw', height: '90vh', maxWidth: 'none', maxHeight: 'none', transform: 'none' }
    : {
        ...(position ? { left: position.x, top: position.y, right: 'auto', transform: 'none' } : {}),
        ...(size ? { width: size.width, height: size.height, maxWidth: 'none', maxHeight: 'none' } : {}),
      };

  return (
    <div id="home-closing-ai" className="print:hidden">
      {/* Minimized: visible tab on right edge */}
      {!open && minimized && (
        <button
          onClick={() => setMinimized(false)}
          className="fixed bottom-28 sm:bottom-1/3 right-0 z-[600] bg-gradient-to-b from-alta-navy to-alta-teal text-white rounded-l-2xl px-3 py-6 shadow-xl hover:brightness-110 hover:px-4 transition-all"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-xs font-bold tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 rotate-90" />
            Ask HC101
          </span>
        </button>
      )}

      {/* Default collapsed: sponsor widget + button (smaller) */}
      {!open && !minimized && (
        <>
        {/* Mobile: slim side tab */}
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden fixed bottom-28 right-0 z-[600] bg-gradient-to-b from-alta-navy to-alta-teal text-white rounded-l-xl px-1.5 py-3 shadow-lg"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-[9px] font-bold tracking-wider flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 rotate-90" />
            Ask HC101
          </span>
        </button>

        {/* Desktop: sponsor + AI button with minimize option */}
        <div
          className={`hidden sm:block fixed z-[600] w-[290px] group/widget ${position ? '' : 'top-1/2 -translate-y-1/2 right-4'}`}
          style={collapsedStyle}
          data-ai-container
        >
          {/* Drag handle bar */}
          <div
            onPointerDown={(e) => {
              const container = (e.currentTarget.parentElement) as HTMLElement | null;
              startDrag(e, container);
            }}
            className="flex items-center justify-center h-4 bg-gradient-to-b from-gray-100 to-gray-50 rounded-t-xl border border-gray-100 border-b-0 cursor-move hover:bg-gray-100 transition-colors"
            title="Drag to move"
          >
            <GripHorizontal className="w-3.5 h-3.5 text-gray-400" />
          </div>
          {/* Control buttons (hover to reveal) */}
          <div className="absolute -top-2 -left-2 flex items-center gap-1 opacity-0 group-hover/widget:opacity-100 transition-opacity z-10">
            {position && (
              <button
                onClick={resetLayout}
                className="w-6 h-6 rounded-full bg-alta-teal hover:bg-alta-teal-dark text-white flex items-center justify-center shadow"
                aria-label="Reset position"
                title="Reset to default position"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={() => setMinimized(true)}
              className="w-6 h-6 rounded-full bg-gray-400 hover:bg-gray-600 text-white flex items-center justify-center shadow"
              aria-label="Minimize"
              title="Minimize"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {/* Sponsor top half */}
          <div className="relative">
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`peer flex items-center gap-3 bg-white px-4 py-3 shadow-lg border border-gray-100 border-t-0 border-b-0 hover:bg-gray-50 transition-all w-full ${sponsorFading ? 'opacity-0' : 'opacity-100'}`}
              style={{ transition: 'opacity 350ms ease' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sponsor.logo} alt={sponsor.name} className="h-7 w-auto object-contain max-w-[90px] shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="border-l border-gray-100 pl-2.5 min-w-0">
                <p className="text-[8px] text-alta-gray uppercase tracking-wider font-semibold leading-none">Sponsor</p>
                <p className="text-[11px] text-alta-navy font-semibold leading-tight mt-0.5 truncate">{sponsor.name}</p>
              </div>
            </a>
            {/* Hover popup */}
            <div className="absolute bottom-full right-0 mb-2 w-[300px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 pointer-events-none peer-hover:opacity-100 peer-hover:pointer-events-auto transition-opacity duration-200 z-[610] hidden sm:block sm:opacity-0 sm:peer-hover:opacity-100">
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sponsor.logo} alt={sponsor.name} className="h-10 w-auto object-contain max-w-[100px]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div>
                  <p className="text-sm font-bold text-alta-navy">{sponsor.name}</p>
                  <p className="text-[10px] text-alta-teal font-medium">ALTA Member</p>
                </div>
              </div>
              <p className="text-xs text-alta-gray leading-relaxed mb-3">{sponsor.blurb}</p>
              <p className="text-[11px] text-alta-teal font-medium flex items-center gap-1">
                {sponsor.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </p>
              <div className="absolute bottom-0 right-8 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-100"></div>
            </div>
          </div>
          {/* AI button middle */}
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-alta-navy to-alta-teal text-white px-5 py-3 shadow-2xl hover:brightness-110 transition-all duration-300 flex items-center gap-2.5 group w-full justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/alta.svg"
              alt="ALTA"
              className="h-4 w-auto group-hover:scale-105 transition-transform"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="w-px h-4 bg-white/30" />
            <Sparkles className="w-4 h-4 text-white/80 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm">Ask HomeClosing101</span>
          </button>
          {/* Date & weather bottom tab */}
          <DateWeatherWidget />
        </div>
        </>
      )}

      {/* Chat panel — with sponsor inside header */}
      {open && (
        <div
          className={`fixed z-[600] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden ${
            isExpanded
              ? ''
              : position
                ? ''
                : 'top-1/2 -translate-y-1/2 right-2 sm:right-6 w-[calc(100vw-1rem)] sm:w-[420px] max-w-[420px] h-[70vh] sm:h-[580px] max-h-[calc(100vh-6rem)]'
          }`}
          style={chatPanelStyle}
          data-ai-container
        >
          {/* Sponsor banner — compact on mobile, full showcase on desktop */}
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 block border-b border-gray-100 hover:bg-gray-50 transition-all ${sponsorFading ? 'opacity-0' : 'opacity-100'}`}
            style={{ transition: 'opacity 350ms ease' }}
          >
            {/* Mobile: slim inline bar */}
            <div className="sm:hidden flex items-center gap-2.5 px-3 py-2 bg-gray-50">
              <p className="text-[8px] text-alta-gray font-semibold uppercase tracking-wider shrink-0">Sponsor</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sponsor.logo} alt={sponsor.name} className="h-5 w-auto object-contain max-w-[70px] shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <p className="text-[10px] text-alta-navy font-semibold truncate flex-1">{sponsor.name}</p>
              <svg className="w-3 h-3 text-alta-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </div>
            {/* Desktop: full showcase */}
            <div className="hidden sm:block px-5 py-4 bg-gradient-to-b from-gray-50 to-white">
              <p className="text-[9px] text-alta-gray font-semibold uppercase tracking-widest text-center mb-3">Sponsored by</p>
              <div className="flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto object-contain max-w-[180px]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <p className="text-[11px] text-alta-gray text-center leading-relaxed mb-2">{sponsor.blurb}</p>
              <p className="text-[10px] text-alta-teal font-medium text-center flex items-center justify-center gap-1">
                {sponsor.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </p>
            </div>
          </a>
          {/* Header */}
          <div
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest('button')) return;
              const container = (e.currentTarget.parentElement) as HTMLElement | null;
              startDrag(e, container);
            }}
            className={`bg-gradient-to-r from-alta-navy to-[#0d3a5c] text-white px-5 py-3 flex items-center justify-between flex-shrink-0 ${isExpanded ? '' : 'cursor-move'}`}
            title={isExpanded ? '' : 'Drag to move'}
          >
            <div className="flex items-center gap-3 pointer-events-none">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/alta.svg" alt="ALTA" className="h-4 w-auto" />
              </div>
              <div>
                <div className="font-bold text-sm">HomeClosing101</div>
                <div className="text-[10px] text-white/50">Your Closing Assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => {
                const welcomeText = 'AI: Welcome to HomeClosing101 — your personal closing assistant.\n\n';
                const text = welcomeText + messages.map(m => `${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`).join('\n\n');
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'HomeClosing101_Conversation.txt'; a.click();
              }} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Download conversation" aria-label="Download conversation">
                <Download className="w-4 h-4" />
              </button>
              {(position || size || isExpanded) && (
                <button
                  onClick={resetLayout}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  title="Reset to default position"
                  aria-label="Reset layout"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
                aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome message when no messages yet */}
            {messages.length === 0 && !typing && !loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-gray-100 text-gray-800 rounded-bl-md">
                  <div dangerouslySetInnerHTML={{ __html: "Welcome to <strong>HomeClosing101</strong> — your personal closing assistant.<br/><br/>I can answer questions about the closing process, title insurance, costs, wire fraud protection, and more. All statistics and information come directly from HomeClosing101's verified content — every figure I cite is sourced from our pages.<br/><br/>Ask me anything — or tap a suggestion below." }} />
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-alta-navy text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  <div
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === 'A' && target.dataset.internalLink) {
                        e.preventDefault();
                        window.location.href = target.dataset.internalLink;
                      }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: msg.role === 'assistant'
                        ? linkifyPaths(
                            msg.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/^(\d+)\.\s+/gm, '<br/>$1. ')
                              .replace(/^- /gm, '<br/>&bull; ')
                              .replace(/\n/g, '<br/>')
                              .replace(/(<br\/>){3,}/g, '<br/><br/>')
                              .replace(/^<br\/>/, '')
                          )
                        : escapeHtml(msg.content)
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br/>')
                    }}
                  />
                </div>
              </div>
            ))}
            {/* Typing dots indicator */}
            {typing && <TypingDots />}
            {/* Thinking spinner */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-alta-teal" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            {/* Smart follow-up chips after the last assistant message */}
            {messages.length >= 2 && !loading && !typing && messages[messages.length - 1].role === 'assistant' && (
              <div className="flex flex-wrap gap-1.5 pl-1">
                {getFollowUps(lastUserQuestion).map(fq => (
                  <button
                    key={fq}
                    onClick={() => sendQuestion(fq)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-alta-teal/30 text-alta-teal bg-alta-teal/5 hover:border-alta-teal hover:bg-alta-teal/10 transition-all"
                  >
                    {fq}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested question chips — show when no user messages yet */}
          {messages.length === 0 && !typing && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickActions.map(action => (
                <button
                  key={action}
                  onClick={() => sendQuestion(action)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-alta-teal hover:text-alta-teal hover:bg-alta-teal/5 transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex items-center gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Ask about home closing..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-alta-teal focus:ring-1 focus:ring-alta-teal/20"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading || typing}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-alta-navy text-white hover:bg-alta-teal disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {/* Resize handle (bottom-right) */}
          {!isExpanded && (
            <div
              onPointerDown={(e) => {
                const container = (e.currentTarget.parentElement) as HTMLElement | null;
                startResize(e, container);
              }}
              className="hidden sm:block absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10 group/resize"
              title="Drag to resize"
            >
              <svg className="w-4 h-4 text-gray-300 group-hover/resize:text-alta-teal transition-colors" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11 5L5 11M13 9L9 13M13 13L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
