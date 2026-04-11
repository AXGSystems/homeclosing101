import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Source Index — Where Our Data Comes From",
  description: "Every fact, statistic, and resource on HomeClosing101 is sourced from verified government agencies and industry authorities. See the full list.",
};

const sources = [
  {
    category: "Government Agencies",
    items: [
      { name: "Consumer Financial Protection Bureau (CFPB)", url: "https://www.consumerfinance.gov/", used: "Closing Disclosure rules, Loan Estimate requirements, homebuyer rights under RESPA, settlement cost guidance, housing counselor locator" },
      { name: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/", used: "Wire fraud loss statistics ($275.1M in 2025), real estate fraud complaint counts (9,359 in 2024), recovery rate timelines, BEC attack data ($2.77B total)" },
      { name: "Financial Crimes Enforcement Network (FinCEN)", url: "https://www.fincen.gov/", used: "Residential Real Estate Reporting Rule (effective 2026), suspicious activity reporting requirements" },
      { name: "Federal Trade Commission (FTC)", url: "https://reportfraud.ftc.gov/", used: "Fraud reporting portal, consumer protection guidance" },
      { name: "U.S. Department of Housing and Urban Development (HUD)", url: "https://www.hud.gov/", used: "Housing counselor programs, RESPA regulations, fair housing requirements" },
      { name: "U.S. Department of the Treasury", url: "https://home.treasury.gov/", used: "Title insurance reform exploration and consumer protection analysis" },
    ],
  },
  {
    category: "Industry Trade Associations",
    items: [
      { name: "American Land Title Association (ALTA)", url: "https://www.alta.org/", used: "Title search issue rates (1 in 3 transactions), Best Practices framework, member directory data, title insurance policy structure, industry statistics, 6,000+ member count, RON state availability" },
      { name: "National Association of Realtors (NAR)", url: "https://www.nar.realtor/", used: "Home sales volume (4.2M in 2025), median home prices ($400K), wire fraud consumer guide, deepfake scam consumer guide, Code of Ethics" },
      { name: "National Association of Insurance Commissioners (NAIC)", url: "https://content.naic.org/", used: "State insurance department directory (all 51 jurisdictions), regulatory framework, insurance department contact verification" },
      { name: "Insurance Information Institute (I.I.I.)", url: "https://www.iii.org/", used: "State insurance department addresses, phone numbers, and website URLs — verified February 2026" },
      { name: "Appraisal Institute", url: "https://www.appraisalinstitute.org/", used: "Professional appraisal standards, find-an-appraiser tool" },
      { name: "American Escrow Association", url: "https://www.a-e-a.org/", used: "Escrow process consumer resources" },
    ],
  },
  {
    category: "Industry Research & Reports",
    items: [
      { name: "CertifID — 2026 State of Wire Fraud Report", url: "https://www.certifid.com/state-of-wire-fraud", used: "1,760% increase in BEC attacks, 1 in 4 buyers received suspicious messages, 60% of title professionals report increasing fraud, 56% consumer trust impact, buyer cash-to-close fraud (30% of cases)" },
      { name: "Entrust — 2026 Identity Fraud Report", url: "https://www.entrust.com/", used: "40% year-over-year increase in deepfake scams, AI-related fraud complaints ($893.3M in losses)" },
      { name: "HousingWire", url: "https://www.housingwire.com/", used: "Title industry technology trends, company financial performance data" },
      { name: "National Mortgage Professional (NMP)", url: "https://nationalmortgageprofessional.com/", used: "Wire fraud protection as revenue stream analysis" },
    ],
  },
  {
    category: "Government-Sponsored Enterprises",
    items: [
      { name: "Fannie Mae — Your Home", url: "https://yourhome.fanniemae.com/", used: "Mortgage calculator methodology, homebuyer education courses, affordability tools" },
      { name: "Freddie Mac — My Home", url: "https://myhome.freddiemac.com/", used: "Homebuyer tools, calculators, worksheets, and educational checklists" },
    ],
  },
  {
    category: "Title Industry Companies (ALTA Members)",
    items: [
      { name: "First American Financial Corporation", url: "https://www.firstam.com/", used: "Title revenue data ($1.836B, +42%), company logo (ALTA sponsor)" },
      { name: "Fidelity National Financial (FNF)", url: "https://www.fnf.com/", used: "Title revenue data ($2.3B Q3 2025), company logo (ALTA sponsor)" },
      { name: "Stewart Title Guaranty Company", url: "https://www.stewart.com/", used: "Company logo (ALTA sponsor)" },
      { name: "Old Republic National Title", url: "https://www.oldrepublictitle.com/", used: "Wire fraud prevention best practices, company logo (ALTA sponsor)" },
      { name: "WFG National Title Insurance Company", url: "https://wfgtitle.com/", used: "Company logo (ALTA sponsor)" },
      { name: "Westcor Land Title Insurance Company", url: "https://www.wltic.com/", used: "Company logo (ALTA sponsor)" },
      { name: "CertifID", url: "https://certifid.com/", used: "Wire fraud prevention data, company logo (ALTA sponsor)" },
      { name: "Qualia", url: "https://www.qualia.com/", used: "Company logo (ALTA sponsor)" },
      { name: "SoftPro", url: "https://www.softprocorp.com/", used: "Company logo (ALTA sponsor)" },
      { name: "Closinglock", url: "https://www.closinglock.com/", used: "Company logo (ALTA sponsor)" },
      { name: "DataTrace", url: "https://www.datatracetitle.com/", used: "Company logo (ALTA sponsor)" },
      { name: "AccuTitle", url: "https://www.accutitle.com/", used: "Company logo (ALTA sponsor)" },
    ],
  },
  {
    category: "Content Sources",
    items: [
      { name: "HomeClosing101.org (original)", url: "https://www.homeclosing101.org/", used: "FAQ content (Parts 1 & 2), closing process steps, title insurance definitions, find-a-company member directory data, state-by-state company listings, glossary terms" },
      { name: "Alliant National Title Insurance Co.", url: "https://alliantnational.com/", used: "2026 fraud and notarization law changes" },
      { name: "Plymouth Title Insurance", url: "https://www.plymouthtitleinsurance.com/", used: "2026 wire fraud protection strategies" },
      { name: "Flagpedia.net", url: "https://flagpedia.net/", used: "U.S. state flag images (public domain)" },
      { name: "Unsplash", url: "https://unsplash.com/", used: "Photography used in hero banners, feature cards, and section headers (Unsplash License — free for commercial use)" },
    ],
  },
];

export default function SourcesPage() {
  return (
    <>
      <PageHero
        title="Source Index"
        subtitle="Every fact, statistic, and resource on HomeClosing101 is sourced from verified government agencies, industry authorities, and public data. Nothing on this site is fabricated."
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Sources", href: "/sources" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-4 p-4 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 sticky top-[120px] sm:top-[130px] z-20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Verified, Transparent, Accountable</h2>
                <p className="text-sm text-alta-gray leading-relaxed">HomeClosing101 is committed to accuracy. Every statistic, regulation, and recommendation on this site is sourced from the organizations listed below. We encourage you to visit these sources directly to verify any information and stay up to date.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {sources.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl font-bold text-alta-navy mb-4 pb-2 border-b border-gray-100">{section.category}</h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.name} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-alta-teal/20 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-alta-navy hover:text-alta-teal transition-colors text-sm inline-flex items-center gap-1">
                            {item.name}
                            <svg className="w-3 h-3 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                          <p className="text-xs text-alta-gray mt-1 leading-relaxed"><strong className="text-alta-navy">Used for:</strong> {item.used}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
            <h3 className="font-bold text-alta-navy mb-2">Report an Error</h3>
            <p className="text-sm text-alta-gray">If you find any information on HomeClosing101 that is inaccurate, outdated, or improperly sourced, please contact ALTA at <strong>202.296.3671</strong> or visit <a href="https://www.alta.org" target="_blank" rel="noopener noreferrer" className="text-alta-teal font-medium hover:underline">alta.org</a>. We take accuracy seriously and will correct any verified errors promptly.</p>
          </div>
        </div>
      </div>
    </>
  );
}
