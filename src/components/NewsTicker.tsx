"use client";

import { useState, useEffect } from "react";

const headlines = [
  { text: "4.2 million homes sold in the U.S. in 2025 — median price $400K", source: "NAR", detail: "The National Association of Realtors reports 4.2 million existing homes sold in 2025, with the median price reaching $400,000. First-time buyers represented approximately 24% of purchases — the lowest share since NAR began tracking in 1981. Affordability remains the primary barrier.", link: "/blog" },
  { text: "Wire fraud losses hit $275.1M in 2025 — always verify wiring by phone", source: "FBI IC3", detail: "The FBI's Internet Crime Complaint Center (IC3) reported $275.1 million in real estate wire fraud losses in 2025, a 59% increase year-over-year. Criminals use business email compromise (BEC), deepfake voice calls, and hacked accounts to intercept closing funds. Recovery rates drop to under 5% after 48 hours.", link: "/stop-fraud" },
  { text: "Title searches reveal issues in 1 out of 3 residential transactions", source: "ALTA", detail: "According to ALTA, title professionals find and resolve issues in approximately one out of every three residential real estate transactions. Common issues include unpaid liens, boundary disputes, recording errors, and undisclosed heirs. Owner's title insurance protects buyers against these hidden defects.", link: "/protect-your-rights" },
  { text: "FinCEN Residential Real Estate Reporting Rule now in effect for 2026", source: "ALTA", detail: "The Financial Crimes Enforcement Network's (FinCEN) Residential Real Estate Reporting Rule requires certain real estate professionals to report beneficial ownership information for cash purchases. ALTA is actively engaging with FinCEN on implementation and compliance requirements.", link: "/blog" },
  { text: "Deepfake scams in real estate increased 40% year-over-year", source: "Entrust 2026", detail: "AI-generated deepfake scams in real estate transactions increased 40% year-over-year according to Entrust's 2026 Identity Fraud Report. Criminals are using synthetic voice and video to impersonate sellers, agents, and lenders during virtual closings.", link: "/stop-fraud" },
  { text: "Homebuyers have the right to choose their own title company under RESPA", source: "CFPB", detail: "The Real Estate Settlement Procedures Act (RESPA) gives homebuyers the legal right to select their own title insurance company and settlement services provider. Your lender or agent may recommend one, but you are NOT obligated to use them. Shopping around can save significant money.", link: "/protect-your-rights" },
  { text: "Closing Disclosure must be provided at least 3 business days before closing", source: "CFPB", detail: "Under CFPB rules (TRID), the lender must provide the Closing Disclosure at least 3 business days before closing. Compare it line-by-line with your Loan Estimate. If fees changed, ask why. You have the right to delay closing if you need more time to review.", link: "/closing-disclosure" },
  { text: "Remote Online Notarization (RON) now available in the majority of U.S. states", source: "ALTA", detail: "As of 2026, 45 states and DC have enacted permanent Remote Online Notarization legislation. RON allows homebuyers to complete their entire closing via secure audio-video session, with identity verification and tamper-evident recording. ALTA and MBA led the advocacy effort.", link: "/closing-process/closing-options" },
  { text: "6,000+ ALTA member companies protecting homebuyers across all 50 states", source: "ALTA", detail: "The American Land Title Association represents over 6,000 member companies across all 50 states — title insurance underwriters, agents, abstracters, and settlement service providers. ALTA sets industry standards through the Best Practices framework and advocates for consumer protection.", link: "/join-alta" },
  { text: "Recovery rate drops from 20% to under 5% after 48 hours — act fast on wire fraud", source: "FBI", detail: "Wire fraud recovery is a race against time. The FBI reports approximately 20% recovery if reported within 1 hour, 10% within 24 hours, and less than 5% after 48 hours. If you suspect fraud: call your bank IMMEDIATELY, then file with FBI IC3 at ic3.gov.", link: "/stop-fraud" },
  { text: "Owner's title insurance: one-time fee at closing, lifetime coverage for you and your heirs", source: "ALTA", detail: "An owner's title insurance policy is a one-time premium paid at closing — typically 0.5% to 1% of the purchase price. It protects you and your heirs for as long as you own the property against title defects including liens, forgery, undisclosed heirs, and recording errors.", link: "/protect-your-rights" },
  { text: "Texas cuts title insurance premiums by 10% starting July 2025", source: "TDI", detail: "The Texas Department of Insurance reduced title insurance premium rates by 10% effective July 2025. Texas is one of the states where title insurance rates are set by the state regulator rather than by individual companies.", link: "/blog" },
  { text: "First American reports title revenue up 42% to $1.836 billion", source: "First American", detail: "First American Financial Corporation, one of the nation's largest title insurance underwriters, reported title revenue of $1.836 billion — up 42% — driven by increased transaction volume and market share gains.", link: "/blog" },
  { text: "New fraud and notarization laws affecting closings across multiple states in 2026", source: "Alliant National", detail: "Several states enacted new fraud prevention and notarization laws in 2026 affecting real estate closings. These include enhanced identity verification requirements, expanded RON authorization, and stronger penalties for deed fraud.", link: "/blog" },
  { text: "Treasury Department explores title insurance consumer protection opportunities", source: "U.S. Treasury", detail: "The U.S. Department of the Treasury has been exploring title insurance reform and consumer protection opportunities. ALTA is actively engaged in these discussions, advocating for the value of title insurance in protecting homebuyers.", link: "/blog" },
  { text: "HUD-approved housing counselors available free through CFPB locator tool", source: "CFPB", detail: "The Consumer Financial Protection Bureau provides a free housing counselor locator at consumerfinance.gov/housing. HUD-approved counselors offer free or low-cost guidance on homebuying, credit repair, budgeting, and foreclosure prevention.", link: "/resources" },
  { text: "ALTA Best Practices framework adopted by thousands of member companies", source: "ALTA", detail: "ALTA's Best Practices framework (version 4.2, August 2025) covers 7 pillars: licensing, escrow controls, privacy & security, settlement procedures, title policy production, professional liability, and consumer complaints. Companies that adopt Best Practices demonstrate commitment to consumer protection.", link: "/join-alta" },
  { text: "Fannie Mae HomeView: free online homebuyer education course with certificate", source: "Fannie Mae", detail: "HomeView is Fannie Mae's free, interactive online course that covers the entire homebuying process — from knowing when you're ready to understanding your mortgage options. Completing the course provides a certificate that some loan programs require.", link: "/resources" },
  { text: "NAR releases consumer guide on spotting deepfake scams in real estate", source: "NAR", detail: "The National Association of Realtors published a consumer guide addressing deepfake technology threats in real estate. As AI-generated audio and video become more convincing, buyers and sellers need to verify identities through known phone numbers — never through emailed or texted links.", link: "/stop-fraud" },
  { text: "Never wire money based solely on email instructions — always call to verify", source: "FBI / ALTA", detail: "The #1 wire fraud prevention rule: ALWAYS verify wiring instructions by calling a phone number you already have on file — NOT a number from the email. Criminals hack or spoof real estate professional emails and send fake wiring instructions. One phone call can save your entire down payment.", link: "/protect-your-money" },
];

export default function NewsTicker() {
  const [selectedHeadline, setSelectedHeadline] = useState<typeof headlines[0] | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const openPanel = (headline: typeof headlines[0]) => {
    setSelectedHeadline(headline);
    setTimeout(() => setPanelVisible(true), 10);
  };

  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => setSelectedHeadline(null), 300);
  };

  useEffect(() => {
    if (!selectedHeadline) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closePanel(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [selectedHeadline]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
      <div className="news-ticker print:hidden bg-alta-navy text-white border-b border-white/10 overflow-hidden">
        <div className="flex items-center">
          <div className="shrink-0 bg-alta-teal px-2 sm:px-4 py-1.5 sm:py-2 font-bold text-[9px] sm:text-[11px] uppercase tracking-wider z-10 flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
            </span>
            <span className="hidden sm:inline">Industry </span>News
          </div>

          <div className="overflow-hidden flex-1">
            <div
              className="flex items-center whitespace-nowrap hover:[animation-play-state:paused]"
              style={{ animation: "tickerScroll 276s linear infinite", width: "max-content" }}
            >
              {[...headlines, ...headlines].map((item, i) => (
                <button
                  key={i}
                  onClick={() => openPanel(item)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] shrink-0 hover:bg-white/10 transition-colors rounded cursor-pointer"
                >
                  <span className="text-gray-300 hover:text-white transition-colors">{item.text}</span>
                  <span className="text-[10px] text-alta-teal font-semibold uppercase tracking-wider">{item.source}</span>
                  <span className="text-gray-600 mx-1">|</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right-side slide-out panel */}
      {selectedHeadline && (
        <div className="fixed inset-0 z-[9000]" onClick={closePanel}>
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${panelVisible ? "opacity-100" : "opacity-0"}`} />
          <div
            className={`absolute top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${panelVisible ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-alta-navy p-5 flex items-start justify-between">
              <div>
                <span className="text-[9px] font-bold text-alta-teal uppercase tracking-widest">{selectedHeadline.source}</span>
                <h2 className="text-white font-bold text-lg mt-1 leading-tight">{selectedHeadline.text}</h2>
              </div>
              <button onClick={closePanel} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 100px)" }}>
              <p className="text-sm text-alta-gray leading-relaxed mb-6">{selectedHeadline.detail}</p>

              <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] mb-6">
                <p className="text-xs font-bold text-alta-navy mb-1">Source</p>
                <p className="text-xs text-alta-gray">{selectedHeadline.source} — Data verified and cited on HomeClosing101</p>
              </div>

              <a
                href={selectedHeadline.link}
                className="block w-full text-center px-5 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal/90 transition-colors text-sm"
              >
                Learn More on HC101
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
