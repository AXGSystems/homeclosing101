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
    return `I can define real estate terms for you! Try asking:\n- "What is escrow?"\n- "What does lien mean?"\n- "Define appraisal"\n\nOr browse our full **Real Estate Glossary** at /glossary with 80+ searchable terms.`;
  }

  // Help
  if (q.includes('help') || q.includes('what can you')) {
    return `**HomeClosing101 AI — I can help with:**\n\n- **Closing process:** "How does closing work?"\n- **Title insurance:** "What is title insurance?"\n- **Wire fraud:** "How do I avoid wire fraud?"\n- **Costs:** "How much are closing costs?"\n- **Documents:** "What documents do I need?"\n- **Closing options:** "Can I close remotely?"\n- **Finding companies:** "How do I find a title company?"\n- **Checklist:** "What should I prepare?"\n- **Definitions:** "What is escrow?"\n\nI'm here to help you close with confidence!`;
  }

  // Default
  return `Great question! I can help with:\n\n- **"How does closing work?"** — Step-by-step process\n- **"What is title insurance?"** — Why you need it\n- **"How do I avoid wire fraud?"** — Protection tips\n- **"How much are closing costs?"** — Fee breakdown\n- **"What documents do I need?"** — Key paperwork\n- **"Can I close remotely?"** — Closing options\n\nTry asking one of these, or say **"help"** for a full list!`;
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
              <img src={sponsor.logo} alt={sponsor.name} className="h-7 w-auto object-contain max-w-[90px] shrink-0" />
              <div className="border-l border-gray-100 pl-2.5 min-w-0">
                <p className="text-[8px] text-alta-gray uppercase tracking-wider font-semibold leading-none">Sponsor</p>
                <p className="text-[11px] text-alta-navy font-semibold leading-tight mt-0.5 truncate">{sponsor.name}</p>
              </div>
            </a>
            {/* Hover popup — hidden on mobile (no hover support) */}
            <div className="absolute bottom-full right-0 mb-2 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 pointer-events-none peer-hover:opacity-100 peer-hover:pointer-events-auto transition-opacity duration-200 z-[610] hidden sm:block sm:opacity-0 sm:peer-hover:opacity-100">
              <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sponsor.logo} alt={sponsor.name} className="h-10 w-auto object-contain max-w-[100px]" />
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
              <img src={sponsor.logo} alt={sponsor.name} className="h-5 w-auto object-contain max-w-[70px] shrink-0" />
              <p className="text-[10px] text-alta-navy font-semibold truncate flex-1">{sponsor.name}</p>
              <svg className="w-3 h-3 text-alta-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </div>
            {/* Desktop: full showcase */}
            <div className="hidden sm:block px-5 py-4 bg-gradient-to-b from-gray-50 to-white">
              <p className="text-[9px] text-alta-gray font-semibold uppercase tracking-widest text-center mb-3">Sponsored by</p>
              <div className="flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto object-contain max-w-[180px]" />
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
              }} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" title="Download conversation">
                <Download className="w-4 h-4" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
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
