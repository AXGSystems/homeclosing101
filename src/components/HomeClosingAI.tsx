'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Download, Loader2 } from 'lucide-react';

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
    return `**What Happens at the Closing Table**\n\nClosing day is when you sign the final documents and officially become a homeowner.\n\n**Who's typically there:**\n- You (the buyer)\n- The seller (or their representative)\n- A settlement/closing agent\n- A notary public\n- Sometimes your real estate agent and/or attorney\n\n**What you'll sign:**\n- **Closing Disclosure** — Final costs and loan terms\n- **Promissory Note** — Your promise to repay the mortgage\n- **Deed of Trust/Mortgage** — Secures the loan with the property\n- **Deed** — Transfers ownership from seller to you\n- Various affidavits and disclosures\n\n**What to bring:**\n- Government-issued photo ID\n- Certified/cashier's check or wire confirmation\n- Proof of homeowner's insurance\n\n**How long it takes:** Usually 1-2 hours.\n\n**After signing:** The deed is recorded with the county, and you get the keys!\n\nUse our **Closing Checklist** at /closing-process/closing-checklist to prepare.`;
  }

  // Closing process
  if (q.includes('closing') && (q.includes('process') || q.includes('what') || q.includes('how'))) {
    return `**The Home Closing Process**\n\nClosing (also called "settlement") is when you legally commit to your mortgage and become the official homeowner. Here are the 8 key steps:\n\n1. **Get Your Finances Ready** — Credit, debts, savings\n2. **Get Pre-Approved** — Compare lenders, lock in financing\n3. **Find a Property** — Work with an agent\n4. **Make an Offer** — Negotiate terms\n5. **Sign Purchase Agreement** — Formalize the deal\n6. **Get Funding** — Finalize your mortgage\n7. **Get Insurance** — Homeowner's + title insurance\n8. **Close the Transaction** — Sign docs, get keys!\n\nWant details on any step? Just ask!`;
  }

  // Title insurance
  if (q.includes('title insurance') || q.includes('title policy') || q.includes('owner\'s policy')) {
    return `**Owner's Title Insurance**\n\nA one-time purchase at closing that protects your property rights **for as long as you own the home**.\n\n**What it covers:**\n- Unpaid mortgages/liens from previous owners\n- Forged documents or fraudulent signatures\n- Unknown heirs with claims\n- Errors in public records\n- Undisclosed easements\n\n**Cost:** Typically 0.5%–1% of purchase price\n\n**Important:** A *lender's policy* only protects the bank. You need an *owner's policy* to protect YOUR investment.\n\nTitle searches find issues in **1 out of 3** transactions.`;
  }

  // Wire fraud
  if (q.includes('wire fraud') || q.includes('fraud') || q.includes('scam') || q.includes('wire')) {
    return `**Wire Fraud Warning**\n\nWire fraud is the **#1 threat** to homebuyers. Losses hit **$275.1 million** in 2025.\n\n**How it works:**\n1. Criminals hack real estate email accounts\n2. They send fake wiring instructions near closing\n3. You wire funds to the criminal's account\n4. Money disappears within 24-48 hours\n\n**5 Safeguards:**\n1. **CALL to verify** wire instructions (use a known number)\n2. **Never trust email** changes to wire details\n3. **Forward, don't reply** to financial emails\n4. **Ask your bank** to verify the account name\n5. **Confirm receipt** immediately after wiring\n\nIf you think you're a victim: Contact your bank IMMEDIATELY, then file with FBI at ic3.gov.`;
  }

  // Closing costs
  if (q.includes('cost') || q.includes('how much') || q.includes('expensive') || q.includes('fees') || q.includes('price')) {
    return `**Closing Costs: 2%–5% of Purchase Price**\n\nFor a $350,000 home, expect $7,000–$17,500.\n\n**Major fee categories:**\n- **Loan Origination:** 0.5%–1% of loan\n- **Appraisal:** $300–$600\n- **Home Inspection:** $300–$500\n- **Title Search:** $200–$400\n- **Owner's Title Insurance:** 0.5%–1% of price\n- **Lender's Title Insurance:** $500–$1,500\n- **Settlement Fee:** $500–$2,000\n- **Recording Fees:** $50–$250\n- **Homeowner's Insurance:** $800–$2,000/yr\n\nUse our **Closing Cost Calculator** at /closing-process/closing-costs for a personalized estimate!`;
  }

  // Closing disclosure
  if (q.includes('disclosure') || q.includes('document') || q.includes('paperwork')) {
    return `**Key Closing Documents**\n\n1. **Closing Disclosure** — 5-page document with all terms and costs. Must be provided **at least 3 business days** before closing. Compare it to your Loan Estimate!\n\n2. **Promissory Note** — Your written promise to repay the mortgage. Includes amount, rate, schedule, and consequences of default.\n\n3. **Deed of Trust** — Transfers conditional ownership to secure your loan. The lender can foreclose if you don't pay.\n\n**Tip:** Review your Closing Disclosure carefully. If anything looks different from your Loan Estimate, ask your settlement agent BEFORE signing.`;
  }

  // Closing options / remote
  if (q.includes('remote') || q.includes('online') || q.includes('option') || q.includes('ron') || q.includes('notary')) {
    return `**Closing Options**\n\n1. **In Person** — Traditional. Meet at the settlement office to sign everything.\n\n2. **Mail Away / Mobile Notary** — Documents mailed to you, notary comes to your location.\n\n3. **Hybrid** — Pre-sign most docs digitally, visit office only for main transfer documents.\n\n4. **Remote Online Notarization (RON)** — Fully digital. Sign everything from anywhere through a secure portal.\n\nAvailability varies by state. Not all options are available everywhere. Check with your title company!`;
  }

  // Find company
  if (q.includes('find') && (q.includes('company') || q.includes('title'))) {
    return `**Finding a Title Company**\n\nYou have the **right to choose** your own title company under federal law (RESPA).\n\n**Tips:**\n- Look for ALTA members at alta.org/find-a-company\n- Ask if they follow ALTA Best Practices\n- Compare fees from 2-3 companies\n- Ask about their wire fraud prevention process\n- Check reviews and get agent recommendations\n\n**Important:** Your lender or agent may recommend a provider, but you are NOT obligated to use them. Shopping around can save money!`;
  }

  // Checklist
  if (q.includes('checklist') || q.includes('list') || q.includes('prepare') || q.includes('ready')) {
    return `**Closing Checklist Highlights**\n\n**Before you start:**\n- Check credit score\n- Get pre-approved\n- Choose a real estate agent\n\n**After offer accepted:**\n- Lock your interest rate\n- Schedule inspections\n- Shop for title insurance\n- Review title commitment\n\n**One week before:**\n- Review Closing Disclosure\n- Verify wire instructions BY PHONE\n- Schedule final walk-through\n- Set up utilities\n\n**Closing day:**\n- Bring photo ID\n- Bring proof of insurance\n- Bring certified funds\n- Sign and get your keys!\n\nUse our **Interactive Checklist** at /closing-process/closing-checklist to track your progress!`;
  }

  // Glossary / terms
  if (q.includes('what is') || q.includes('define') || q.includes('mean') || q.includes('glossary')) {
    if (q.includes('escrow')) return `**Escrow** — The deposit of money or documents with an impartial third party pending the completion of a real estate transaction. Your escrow agent holds funds until all conditions are met, then distributes them to the appropriate parties.`;
    if (q.includes('deed')) return `**Deed** — A written document that legally conveys real estate title from one party to another. A **Warranty Deed** is the strongest form, guaranteeing clear title. A **Quit Claim Deed** transfers whatever interest the grantor may have without any guarantees.`;
    if (q.includes('lien')) return `**Lien** — A legal claim against real estate used as security for the payment of a debt. Common types include mortgage liens, tax liens, mechanic's liens (for unpaid construction work), and judgment liens.`;
    if (q.includes('appraisal')) return `**Appraisal** — A professional assessment of a property's fair market value, typically required by your lender. An appraiser evaluates the property's condition, features, and comparable recent sales. Cost: typically $300–$600.`;
    return `I can define real estate terms for you! Try asking:\n- "What is escrow?"\n- "What does lien mean?"\n- "Define appraisal"\n\nOr browse our full **Real Estate Glossary** at /glossary with 450+ searchable terms.`;
  }

  // First-time buyer
  if (q.includes('first time') || q.includes('first-time') || q.includes('new buyer') || q.includes('never bought')) {
    return `**First-Time Homebuyer Advice**\n\nBuying your first home is exciting — and a little overwhelming. Here's where to start:\n\n1. **Check your credit score** — Aim for 620+ (conventional) or 580+ (FHA)\n2. **Set a realistic budget** — Factor in down payment, closing costs (2-5%), and monthly payments\n3. **Get pre-approved** — Shows sellers you're serious and locks your rate\n4. **Research assistance programs** — Many states offer down payment grants for first-time buyers\n5. **Hire a buyer's agent** — They represent YOUR interests, not the seller's\n6. **Get a home inspection** — Never skip this step\n7. **Understand your Closing Disclosure** — Review it carefully before signing\n\nVisit our **First-Time Buyers Guide** at /first-time-buyers for a complete walkthrough!`;
  }

  // Down payment assistance
  if (q.includes('down payment') || q.includes('downpayment') || q.includes('assistance program') || q.includes('dpa')) {
    return `**Down Payment Assistance Programs**\n\nMany buyers don't realize there are programs that can help cover your down payment and closing costs.\n\n**Types of assistance:**\n- **Grants** — Free money that doesn't need to be repaid\n- **Forgivable loans** — Forgiven after you live in the home for a set period (often 5-10 years)\n- **Deferred loans** — No payments until you sell, refinance, or pay off the mortgage\n- **Matched savings** — Programs that match your savings dollar-for-dollar\n\n**Where to look:**\n- Your state housing finance agency (HFA)\n- HUD's list of local homebuyer programs at hud.gov\n- FHA loans require as little as 3.5% down\n- VA loans and USDA loans may require 0% down\n\n**Tip:** Ask your lender about programs you may qualify for — many buyers leave money on the table.`;
  }

  // DTI ratio
  if (q.includes('dti') || q.includes('debt-to-income') || q.includes('debt to income')) {
    return `**Debt-to-Income (DTI) Ratio Explained**\n\nYour DTI ratio is one of the most important numbers in your mortgage application. It measures how much of your gross monthly income goes toward debt payments.\n\n**How to calculate:**\nTotal Monthly Debts / Gross Monthly Income = DTI%\n\n**Example:** $2,000 in debts / $6,000 income = 33% DTI\n\n**What counts as debt:**\n- Future mortgage payment (PITI)\n- Car loans\n- Student loans\n- Credit card minimum payments\n- Child support / alimony\n\n**What does NOT count:**\n- Utilities, groceries, insurance premiums\n- Cell phone, subscriptions\n\n**Lender guidelines:**\n- **Conventional:** 43-45% max DTI (some allow up to 50%)\n- **FHA:** Up to 57% with compensating factors\n- **VA:** No hard cap, but 41% is the benchmark\n\n**Tip:** Paying down credit cards before applying can dramatically improve your DTI and help you qualify for a better rate.`;
  }

  // Escrow process (full response, not just glossary definition)
  if (q.includes('escrow') && !q.includes('what is') && !q.includes('define') && !q.includes('mean')) {
    return `**The Escrow Process**\n\nEscrow is a neutral third party that holds money and documents until all conditions of the real estate transaction are met.\n\n**Before closing:**\n- Your **earnest money deposit** goes into an escrow account when your offer is accepted\n- The escrow agent holds it safely until closing\n- If the deal falls through for a valid reason, you typically get it back\n\n**At closing:**\n- The escrow/settlement agent coordinates document signing\n- They collect funds from the buyer and lender\n- They distribute payments to the seller, agents, and service providers\n- They record the deed with the county\n\n**After closing:**\n- Your lender may set up an **escrow account** for property taxes and homeowner's insurance\n- A portion of each mortgage payment goes into this account\n- The lender pays your taxes and insurance on your behalf\n\nLearn more in our **Escrow Guide** at /escrow-guide.`;
  }

  // Home inspection
  if (q.includes('inspection') || q.includes('inspector')) {
    return `**Home Inspection Tips**\n\nA home inspection is your chance to uncover problems BEFORE you buy. Never skip it.\n\n**What inspectors check:**\n- Roof, gutters, and exterior\n- Foundation and structural elements\n- Plumbing, electrical, and HVAC systems\n- Windows, doors, and insulation\n- Attic, basement, and crawl spaces\n\n**Specialty inspections to consider:**\n- **Radon testing** — Odorless gas, #2 cause of lung cancer\n- **Termite/pest inspection** — Often required by lenders\n- **Sewer scope** — Can reveal costly pipe damage\n- **Mold testing** — Especially in humid climates\n\n**Tips:**\n- Attend the inspection in person if possible\n- Ask questions — good inspectors love to teach\n- Review the report carefully before your inspection contingency deadline\n- Negotiate repairs or credits based on findings\n\n**Cost:** Typically $300-$500 depending on home size.\n\nSee our full **Home Inspection Guide** at /home-inspection.`;
  }

  // Homeowner's vs title insurance
  if ((q.includes('homeowner') && q.includes('insurance') && !q.includes('title')) || (q.includes('difference') && q.includes('insurance')) || (q.includes('homeowner') && q.includes('title'))) {
    return `**Homeowner's Insurance vs. Title Insurance**\n\nThese are two completely different types of protection:\n\n**Homeowner's Insurance:**\n- Protects against **future** damage (fire, storms, theft, liability)\n- **Paid annually** (or monthly through escrow)\n- **Required** by your lender\n- Covers the physical structure and your belongings\n\n**Title Insurance:**\n- Protects against **past** issues with ownership (liens, forgery, errors)\n- **One-time payment** at closing\n- **Owner's policy** is optional but strongly recommended\n- **Lender's policy** is required by your lender\n- Covers you for as long as you own the home\n\n**Bottom line:** You need BOTH. Homeowner's insurance protects the house itself. Title insurance protects your legal right to own it.\n\nLearn more at /homeowners-insurance and /protect-your-rights.`;
  }

  // ALTA Best Practices
  if (q.includes('alta') || q.includes('best practice') || q.includes('american land title')) {
    return `**ALTA Best Practices**\n\nThe American Land Title Association (ALTA) developed a set of **Best Practices** — a framework of policies and procedures that title and settlement companies follow to protect consumers.\n\n**The 7 Pillars:**\n1. **Licensing** — Maintain proper state licenses\n2. **Escrow Trust Accounting** — Safeguard client funds\n3. **Privacy & Information Security** — Protect personal data\n4. **Settlement Procedures** — Follow proper closing protocols\n5. **Title Policy Production** — Ensure accurate title policies\n6. **Insurance & Fidelity Coverage** — Carry appropriate insurance\n7. **Consumer Complaints** — Have a process to handle issues\n\n**Why it matters to you:**\nCompanies that follow ALTA Best Practices have been assessed for strong consumer protections. When choosing a title company, ask if they are ALTA Best Practices certified.\n\nFind ALTA members at alta.org/find-a-company or visit /find-company.`;
  }

  // Help
  if (q.includes('help') || q.includes('what can you')) {
    return `**HomeClosing101 AI — I can help with:**\n\n- **Closing process:** "How does closing work?"\n- **Title insurance:** "What is title insurance?"\n- **Wire fraud:** "How do I avoid wire fraud?"\n- **Costs:** "How much are closing costs?"\n- **Documents:** "What documents do I need?"\n- **Closing options:** "Can I close remotely?"\n- **Finding companies:** "How do I find a title company?"\n- **Checklist:** "What should I prepare?"\n- **First-time buyers:** "I've never bought a home before"\n- **Down payment help:** "What is down payment assistance?"\n- **DTI ratio:** "What is debt-to-income?"\n- **Escrow:** "How does escrow work?"\n- **Home inspection:** "What should I know about inspections?"\n- **Insurance types:** "Homeowner's vs title insurance"\n- **ALTA Best Practices:** "What are ALTA Best Practices?"\n- **Closing day:** "What happens at the closing table?"\n- **Definitions:** "What is escrow?"\n\nI'm here to help you close with confidence!`;
  }

  // Default
  return `I'm not sure I understood that, but I can help with a wide range of closing topics!\n\n**Popular questions:**\n- **"How does closing work?"** — Step-by-step process\n- **"What is title insurance?"** — Why you need it\n- **"How much are closing costs?"** — Fee breakdown\n- **"How do I avoid wire fraud?"** — Protection tips\n- **"I'm a first-time buyer"** — Where to start\n- **"What is DTI?"** — Debt-to-income explained\n- **"How does escrow work?"** — The escrow process\n- **"What happens at the closing table?"** — Signing day walkthrough\n- **"What are ALTA Best Practices?"** — Consumer protections\n\nSay **"help"** for my full list of topics.\n\nYou can also browse our **FAQ** at /faq for 250+ answered questions, or search 450+ terms in our **Glossary** at /glossary.`;
}

export default function HomeClosingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to **HomeClosing101** — your personal closing assistant.\n\nI can answer questions about the closing process, title insurance, costs, wire fraud protection, and more.\n\nAsk me anything — or say **\"help\"** to see what I can do.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sponsorIdx, setSponsorIdx] = useState(0);
  const [sponsorFading, setSponsorFading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const q = input.trim();
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateResponse(q);
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
      setLoading(false);
    }, 400 + Math.random() * 600);
  };

  const quickActions = [
    'How does closing work?',
    'What is title insurance?',
    'Closing costs breakdown',
    'Wire fraud tips',
    'Closing checklist',
    'Help',
  ];

  const sponsor = sponsors[sponsorIdx];

  return (
    <>
      {/* Collapsed: tab on mobile, full widget on desktop */}
      {!open && (
        <>
        {/* Mobile: slim side tab */}
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden fixed bottom-28 right-0 z-[600] bg-gradient-to-b from-alta-navy to-alta-teal text-white rounded-l-xl px-2 py-4 shadow-lg"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <span className="text-[10px] font-bold tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 rotate-90" />
            Ask HC101
          </span>
        </button>

        {/* Desktop: full sponsor + AI button */}
        <div className="hidden sm:block fixed top-1/2 -translate-y-1/2 right-6 z-[600] w-[250px] group/widget">
          {/* Sponsor top half */}
          <div className="relative">
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`peer flex items-center gap-2.5 bg-white rounded-t-2xl px-4 py-3 shadow-lg border border-gray-100 border-b-0 hover:bg-gray-50 transition-all w-full ${sponsorFading ? 'opacity-0' : 'opacity-100'}`}
              style={{ transition: 'opacity 350ms ease' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sponsor.logo} alt={sponsor.name} className="h-7 w-auto object-contain max-w-[90px] shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="border-l border-gray-100 pl-2.5 min-w-0">
                <p className="text-[8px] text-alta-gray uppercase tracking-wider font-semibold leading-none">Sponsor</p>
                <p className="text-[11px] text-alta-navy font-semibold leading-tight mt-0.5 truncate">{sponsor.name}</p>
              </div>
            </a>
            {/* Hover popup — hidden on mobile (no hover support) */}
            <div className="absolute bottom-full right-0 mb-2 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 pointer-events-none peer-hover:opacity-100 peer-hover:pointer-events-auto transition-opacity duration-200 z-[610] hidden sm:block sm:opacity-0 sm:peer-hover:opacity-100">
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
          {/* AI button bottom half */}
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-alta-navy to-alta-teal text-white rounded-b-2xl px-5 py-2.5 shadow-2xl hover:brightness-110 transition-all duration-300 flex items-center gap-2.5 group w-full justify-center"
          >
            <Sparkles className="w-4 h-4 text-white/80 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-sm">Ask HomeClosing101</span>
          </button>
        </div>
        </>
      )}

      {/* Chat panel — with sponsor inside header */}
      {open && (
        <div className="fixed top-1/2 -translate-y-1/2 right-2 sm:right-6 z-[600] w-[calc(100vw-1rem)] sm:w-[420px] max-w-[420px] h-[70vh] sm:h-[580px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
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
          <div className="bg-gradient-to-r from-alta-navy to-[#0d3a5c] text-white px-5 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-alta-teal/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">HomeClosing101</div>
                <div className="text-[10px] text-white/50">Your Closing Assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => {
                const text = messages.map(m => `${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`).join('\n\n');
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'HomeClosing101_Conversation.txt'; a.click();
              }} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Download conversation" aria-label="Download conversation">
                <Download className="w-4 h-4" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-alta-navy text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-alta-teal" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickActions.map(action => (
                <button
                  key={action}
                  onClick={() => {
                    setInput(action);
                    setTimeout(() => {
                      const userMsg: Message = { role: 'user', content: action, timestamp: new Date() };
                      setMessages(prev => [...prev, userMsg]);
                      setInput('');
                      setLoading(true);
                      setTimeout(() => {
                        const response = generateResponse(action);
                        setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
                        setLoading(false);
                      }, 400 + Math.random() * 600);
                    }, 50);
                  }}
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
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-alta-navy text-white hover:bg-alta-teal disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
