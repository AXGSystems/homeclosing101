"use client";

const headlines = [
  { text: "Wire fraud losses hit $275.1M in 2025 — up 59% from the prior year", source: "FBI IC3 Report", url: "https://www.bdmag.com/fbi-cybercrime-report-shows-need-for-more-real-estate-protection/" },
  { text: "1,760% increase in business email compromise attacks since AI tools became available", source: "CertifID 2026", url: "https://www.certifid.com/article/2026-state-of-wire-fraud-report" },
  { text: "1 in 4 recent homebuyers received a suspicious message during their transaction", source: "CertifID", url: "https://www.certifid.com/state-of-wire-fraud" },
  { text: "FinCEN Residential Real Estate Reporting Rule now in effect for 2026", source: "ALTA", url: "https://www.alta.org/news-and-publications/industry-news" },
  { text: "Deepfake scams in real estate increased 40% year-over-year", source: "Entrust 2026", url: "https://www.nar.realtor/the-facts/consumer-guide-spotting-deepfake-scams-in-real-estate" },
  { text: "60% of title professionals report fraud attempts are increasing", source: "CertifID 2026", url: "https://www.certifid.com/article/2026-state-of-wire-fraud-report" },
  { text: "56% of consumers would not work with a firm again after a wire fraud incident", source: "CertifID", url: "https://www.certifid.com/state-of-wire-fraud" },
  { text: "New fraud and notarization laws affecting closings take effect across multiple states", source: "Alliant National", url: "https://alliantnational.com/2026/02/19/how-new-fraud-and-notarization-laws-affect-real-estate-closings/" },
  { text: "Title insurance leaders betting on technology and efficiency for 2026 growth", source: "HousingWire", url: "https://www.housingwire.com/articles/title-insurance-leaders-bet-on-technology-efficiency-for-2026-growth/" },
  { text: "U.S. title insurance operating margin improved to 11.4% in 2025", source: "Industry Data", url: "https://www.alta.org/news-and-publications/industry-news" },
  { text: "First American reports title revenue up 42% to $1.836 billion", source: "First American", url: "https://www.firstam.com/" },
  { text: "Texas cuts title insurance premiums by 10% starting July 2025", source: "TDI", url: "https://tdi.texas.gov" },
  { text: "AI-related fraud complaints top $893M in losses according to FBI", source: "FBI IC3", url: "https://www.ic3.gov/" },
  { text: "BEC attacks account for $2.77 billion in total losses nationwide", source: "FBI 2024 Report", url: "https://www.ic3.gov/" },
  { text: "Recovery rate drops from 20% to under 5% after 48 hours — act fast on wire fraud", source: "FBI", url: "https://www.ic3.gov/" },
  { text: "Title searches reveal issues in 1 out of 3 residential transactions", source: "ALTA", url: "https://www.alta.org/" },
  { text: "CFPB updates guidance on homebuyer closing cost transparency requirements", source: "CFPB", url: "https://www.consumerfinance.gov/owning-a-home/" },
  { text: "NAR releases consumer guide on spotting deepfake scams in real estate", source: "NAR", url: "https://www.nar.realtor/the-facts/consumer-guide-spotting-deepfake-scams-in-real-estate" },
  { text: "Owner's title insurance costs typically 0.5%–1% of purchase price for lifetime coverage", source: "ALTA", url: "https://www.alta.org/" },
  { text: "Homebuyers have the right to choose their own title company under federal RESPA law", source: "CFPB", url: "https://www.consumerfinance.gov/" },
  { text: "Multi-factor authentication now considered essential for all real estate email accounts", source: "CertifID 2026", url: "https://www.certifid.com/article/how-to-prevent-wire-fraud" },
  { text: "Out-of-band verification required for safe closings in 2026 per industry guidelines", source: "FBI / ALTA", url: "https://www.alta.org/" },
  { text: "Remote Online Notarization (RON) now available in the majority of U.S. states", source: "ALTA", url: "https://www.alta.org/" },
  { text: "Fidelity National reports title revenue up 8% to $2.3 billion in Q3 2025", source: "FNF", url: "https://www.fnf.com/" },
  { text: "Wire fraud protection now seen as both necessity and revenue stream for title companies", source: "NMP", url: "https://nationalmortgageprofessional.com/news/wire-fraud-protection-now-seen-both-necessity-and-revenue-stream" },
  { text: "ALTA releases 2026 on-demand FinCEN bootcamp recordings for compliance", source: "ALTA", url: "https://www.alta.org/" },
  { text: "Buyer cash-to-close fraud represents 30% of all wire fraud cases", source: "CertifID 2026", url: "https://www.certifid.com/state-of-wire-fraud" },
  { text: "Closing Disclosure must be provided at least 3 business days before closing", source: "CFPB", url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" },
  { text: "Americans 60 and older lost $7.748 billion to cybercrime in 2025", source: "FBI IC3", url: "https://www.ic3.gov/" },
  { text: "Always verify wiring instructions by phone using a number you already have on file", source: "FBI / NAR", url: "https://www.nar.realtor/wire-fraud" },
  { text: "Stewart Title named to Forbes 2026 Best-In-State Employers list", source: "Stewart", url: "https://www.stewart.com/" },
  { text: "Title industry invests in AI to automate data extraction and detect fraud", source: "HousingWire", url: "https://www.housingwire.com/" },
  { text: "ALTA Best Practices framework adopted by thousands of member companies nationwide", source: "ALTA", url: "https://www.alta.org/" },
  { text: "9,359 real estate and rental fraud complaints filed with FBI in 2024", source: "FBI IC3", url: "https://www.ic3.gov/" },
  { text: "Lender's title policy only protects the bank — owner's policy protects YOU", source: "ALTA", url: "https://www.alta.org/" },
  { text: "HUD-approved housing counselors available free through CFPB locator tool", source: "CFPB", url: "https://www.consumerfinance.gov/housing/" },
  { text: "Fannie Mae and Freddie Mac offer homebuyer education resources online", source: "FHFA", url: "https://www.homepath.com/" },
  { text: "NAIC insurance department directory updated February 2026 with new contact info", source: "NAIC", url: "https://content.naic.org/state-insurance-departments" },
  { text: "Appraisal Institute reports rising demand for property valuation amid market shifts", source: "Appraisal Institute", url: "https://www.appraisalinstitute.org/" },
  { text: "FTC receives record number of real estate fraud complaints in 2025", source: "FTC", url: "https://reportfraud.ftc.gov/" },
  { text: "National Association of Realtors updates Code of Ethics for wire fraud awareness", source: "NAR", url: "https://www.nar.realtor/" },
  { text: "Escrow fraud prevention tools see 200% adoption increase among title companies", source: "Industry Data", url: "https://www.alta.org/" },
  { text: "State insurance departments regulate title insurance rates to protect consumers", source: "NAIC", url: "https://content.naic.org/state-insurance-departments" },
  { text: "ALTA ONE 2026 conference dates announced — premier title industry event", source: "ALTA", url: "https://www.alta.org/events/" },
  { text: "SoftPro and Qualia lead digital transformation of title and escrow industry", source: "Industry", url: "https://www.alta.org/" },
  { text: "CertifID launches enhanced wire fraud prevention tools for 2026 closings", source: "CertifID", url: "https://certifid.com/" },
  { text: "Closinglock reports secure payment adoption up 150% year-over-year", source: "Closinglock", url: "https://www.closinglock.com/" },
  { text: "DataTrace expands AI-powered title search automation to 40 states", source: "DataTrace", url: "https://www.datatracetitle.com/" },
  { text: "Treasury Department explores title insurance reform opportunities for consumers", source: "U.S. Treasury", url: "https://home.treasury.gov/news/featured-stories/exploring-title-insurance-consumer-protection-and-opportunities-for-potential-reforms" },
  { text: "Never accept wiring instruction changes received by email — always call to verify", source: "FBI / ALTA", url: "https://www.alta.org/" },
];

export default function NewsTicker() {
  const doubledHeadlines = [...headlines, ...headlines];

  return (
    <div className="bg-alta-navy text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center">
          {/* Label */}
          <div className="shrink-0 bg-alta-red px-4 py-2 font-bold text-[11px] uppercase tracking-wider z-10 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Industry Alerts
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
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs hover:text-alta-teal transition-colors shrink-0"
                >
                  <span className="text-gray-300">{item.text}</span>
                  <span className="text-[10px] text-alta-teal font-medium uppercase tracking-wider">{item.source}</span>
                  <span className="text-gray-600 mx-2">|</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
