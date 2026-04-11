import Link from "next/link";
import PageHero from "@/components/PageHero";
import AltaMembershipCTA from "@/components/AltaMembershipCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Resources",
  description: "Trusted external resources for homebuyers — government agencies, industry organizations, and sample documents.",
};

const buyingResources = [
  { name: "Consumer Financial Protection Bureau (CFPB)", desc: "Homeownership guides, settlement cost booklet, and complaint filing", url: "https://www.consumerfinance.gov/owning-a-home/" },
  { name: "HUD Housing Counselor Locator", desc: "Find a HUD-approved housing counselor in your area", url: "https://www.consumerfinance.gov/housing/" },
  { name: "Fannie Mae HomePath", desc: "Homebuyer education, resources, and foreclosure listings", url: "https://www.homepath.com/" },
  { name: "Freddie Mac My Home", desc: "Tools, calculators, and educational resources for homebuyers", url: "https://myhome.freddiemac.com/" },
];

const industryResources = [
  { name: "American Land Title Association (ALTA)", desc: "National trade organization for the title insurance industry", url: "https://www.alta.org/" },
  { name: "National Association of Realtors (NAR)", desc: "Find a Realtor, market data, and consumer guides", url: "https://www.nar.realtor/" },
  { name: "National Association of Insurance Commissioners", desc: "State insurance regulator information and consumer resources", url: "https://content.naic.org/" },
  { name: "Appraisal Institute", desc: "Professional appraisal resources and find-an-appraiser tool", url: "https://www.appraisalinstitute.org/" },
  { name: "American Escrow Association", desc: "Consumer resources about the escrow process", url: "https://www.a-e-a.org/" },
  { name: "Inman Real Estate News", desc: "Industry news and market analysis", url: "https://www.inman.com/" },
];

const documents = [
  { name: "Sample Closing Disclosure", desc: "See what a completed Closing Disclosure looks like — the document you'll review 3 days before closing.", url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" },
  { name: "Sample Loan Estimate", desc: "Review a sample Loan Estimate — the document you'll receive within 3 days of applying for a mortgage.", url: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/" },
];

const fraudResources = [
  { name: "FBI Internet Crime Complaint Center (IC3)", desc: "Report wire fraud and internet-related crimes", url: "https://www.ic3.gov/" },
  { name: "FinCEN (Financial Crimes Enforcement Network)", desc: "Report suspicious financial activity and real estate transactions", url: "https://www.fincen.gov/" },
  { name: "CertifID 2026 State of Wire Fraud Report", desc: "Latest data on wire fraud trends affecting real estate", url: "https://www.certifid.com/state-of-wire-fraud" },
  { name: "NAR: Spotting Deepfake Scams in Real Estate", desc: "Consumer guide to recognizing AI-generated fraud in transactions", url: "https://www.nar.realtor/the-facts/consumer-guide-spotting-deepfake-scams-in-real-estate" },
];

const sectionStyles: Record<string, { color: string; icon: string; image: string }> = {
  "Buying a Home": { color: "from-[#1a5276] to-[#154463]", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
  "Sample Closing Documents": { color: "from-[#8b6914] to-[#705410]", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80" },
  "Fraud Reporting & Prevention": { color: "from-[#943030] to-[#7a2020]", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80" },
  "Industry & Real Estate Organizations": { color: "from-[#2d6b3f] to-[#235532]", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
};

function ResourceSection({ title, items }: { title: string; items: { name: string; desc: string; url: string }[] }) {
  const style = sectionStyles[title] || sectionStyles["Buying a Home"];
  return (
    <div className="mb-12">
      {/* Section header with image */}
      <div className="relative rounded-xl overflow-hidden mb-5 h-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${style.image}')` }} />
        <div className={`absolute inset-0 bg-gradient-to-r ${style.color} opacity-30`} />
        <div className="relative z-10 flex items-center gap-3 h-full px-5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="text-xs text-white/70">{items.length} resources</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="feature-card flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 group"
            data-accent="teal"
          >
            <div className="w-9 h-9 rounded-lg bg-alta-light flex items-center justify-center text-alta-teal shrink-0 group-hover:bg-alta-teal group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{r.name}</h3>
              <p className="text-xs text-alta-gray mt-0.5">{r.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div>
    <PageHero title="Other Resources" subtitle="Trusted links to government agencies, industry organizations, sample documents, and fraud reporting tools." image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80" breadcrumb={[{label:"Resources",href:"/resources"}]} />
    <div className="py-3 lg:py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Verified External Resources</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Every link below is to a trusted government agency, industry organization, or verified reporting tool. Use these resources alongside HomeClosing101 to prepare for your closing.</p>
            </div>
          </div>
        </div>

        {/* Quick start by topic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "250+ FAQ", count: "Answers", href: "/faq", color: "from-[#1a5276] to-[#154463]" },
            { label: "80+ Terms", count: "Glossary", href: "/glossary", color: "from-[#2d6b3f] to-[#235532]" },
            { label: "19 Docs", count: "Library", href: "/document-library", color: "from-[#5b3a8c] to-[#482d70]" },
            { label: "30+ Sources", count: "Index", href: "/sources", color: "from-[#8b6914] to-[#705410]" },
          ].map((l) => (
            <Link key={l.label} href={l.href} className="group rounded-xl overflow-hidden tile-interactive">
              <div className={`bg-gradient-to-r ${l.color} p-3 text-center`}>
                <p className="text-lg font-bold text-white">{l.label}</p>
                <p className="text-[10px] text-white/70">{l.count}</p>
              </div>
            </Link>
          ))}
        </div>

        <ResourceSection title="Buying a Home" items={buyingResources} />
        <ResourceSection title="Sample Closing Documents" items={documents} />
        <ResourceSection title="Fraud Reporting & Prevention" items={fraudResources} />
        <ResourceSection title="Industry & Real Estate Organizations" items={industryResources} />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/glossary" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
            Real Estate Glossary
          </Link>
          <Link href="/blog" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
            Blog & News
          </Link>
        </div>
      </div>

      {/* ALTA Membership CTA */}
      <AltaMembershipCTA />
    </div>
    </div>
  );
}
