"use client";

const headlines = [
  { text: "4.2 million homes sold in the U.S. in 2025 — median price $400K", source: "NAR", url: "https://www.nar.realtor/" },
  { text: "Wire fraud losses hit $275.1M in 2025 — always verify wiring by phone", source: "FBI IC3", url: "https://www.ic3.gov/" },
  { text: "Title searches reveal issues in 1 out of 3 residential transactions", source: "ALTA", url: "https://www.alta.org/" },
  { text: "FinCEN Residential Real Estate Reporting Rule now in effect for 2026", source: "ALTA", url: "https://www.alta.org/news-and-publications/industry-news" },
  { text: "Deepfake scams in real estate increased 40% year-over-year", source: "Entrust 2026", url: "https://www.nar.realtor/the-facts/consumer-guide-spotting-deepfake-scams-in-real-estate" },
  { text: "Homebuyers have the right to choose their own title company under RESPA", source: "CFPB", url: "https://www.consumerfinance.gov/" },
  { text: "Closing Disclosure must be provided at least 3 business days before closing", source: "CFPB", url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" },
  { text: "Remote Online Notarization (RON) now available in the majority of U.S. states", source: "ALTA", url: "https://www.alta.org/" },
  { text: "6,000+ ALTA member companies protecting homebuyers across all 50 states", source: "ALTA", url: "https://www.alta.org/" },
  { text: "Recovery rate drops from 20% to under 5% after 48 hours — act fast on wire fraud", source: "FBI", url: "https://www.ic3.gov/" },
  { text: "Owner's title insurance: one-time fee at closing, lifetime coverage for you and your heirs", source: "ALTA", url: "https://www.alta.org/" },
  { text: "Texas cuts title insurance premiums by 10% starting July 2025", source: "TDI", url: "https://tdi.texas.gov" },
  { text: "First American reports title revenue up 42% to $1.836 billion", source: "First American", url: "https://www.firstam.com/" },
  { text: "New fraud and notarization laws affecting closings across multiple states in 2026", source: "Alliant National", url: "https://alliantnational.com/2026/02/19/how-new-fraud-and-notarization-laws-affect-real-estate-closings/" },
  { text: "Treasury Department explores title insurance consumer protection opportunities", source: "U.S. Treasury", url: "https://home.treasury.gov/news/featured-stories/exploring-title-insurance-consumer-protection-and-opportunities-for-potential-reforms" },
  { text: "HUD-approved housing counselors available free through CFPB locator tool", source: "CFPB", url: "https://www.consumerfinance.gov/housing/" },
  { text: "ALTA Best Practices framework adopted by thousands of member companies", source: "ALTA", url: "https://www.alta.org/" },
  { text: "Fannie Mae HomeView: free online homebuyer education course with certificate", source: "Fannie Mae", url: "https://www.fanniemae.com/education" },
  { text: "NAR releases consumer guide on spotting deepfake scams in real estate", source: "NAR", url: "https://www.nar.realtor/the-facts/consumer-guide-spotting-deepfake-scams-in-real-estate" },
  { text: "Never wire money based solely on email instructions — always call to verify", source: "FBI / ALTA", url: "https://www.alta.org/" },
];

export default function NewsTicker() {
  const doubledHeadlines = [...headlines, ...headlines];

  return (
    <div className="bg-alta-navy text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center">
          {/* Label */}
          <div className="shrink-0 bg-alta-red px-2 sm:px-4 py-1.5 sm:py-2 font-bold text-[9px] sm:text-[11px] uppercase tracking-wider z-10 flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
            </span>
            <span className="hidden sm:inline">Industry </span>Alerts
          </div>

          {/* Scrolling ticker */}
          <div className="overflow-hidden flex-1">
            <div className="ticker-scroll flex items-center whitespace-nowrap">
              {doubledHeadlines.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] hover:text-alta-teal transition-colors shrink-0"
                >
                  <span className="text-gray-300">{item.text}</span>
                  <span className="text-[9px] text-alta-teal font-semibold uppercase tracking-wider">{item.source}</span>
                  <span className="text-gray-600 mx-1">|</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
