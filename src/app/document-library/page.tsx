import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Library",
  description: "Download official forms, sample documents, checklists, and guides from CFPB, ALTA, and other trusted sources.",
};

const documentSections = [
  {
    title: "Official CFPB Forms & Guides",
    desc: "These documents are published by the Consumer Financial Protection Bureau and are the official federal resources for homebuyers.",
    color: "from-[#1a5276] to-[#154463]",
    docs: [
      { name: "Your Home Loan Toolkit", desc: "The CFPB's step-by-step guide to the mortgage process — from budgeting to closing. Includes worksheets, checklists, and conversation starters. 20 pages.", url: "https://files.consumerfinance.gov/f/201503_cfpb_your-home-loan-toolkit-web.pdf", type: "PDF", source: "CFPB" },
      { name: "Sample Loan Estimate (Annotated)", desc: "See what a completed Loan Estimate looks like with explanations for every field. Use this to understand the form before you receive yours.", url: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/", type: "Web Tool", source: "CFPB" },
      { name: "Sample Closing Disclosure (Annotated)", desc: "Interactive walkthrough of every section of the 5-page Closing Disclosure. Compare your actual document against this sample.", url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/", type: "Web Tool", source: "CFPB" },
      { name: "Buying a House — CFPB Guide", desc: "Complete overview of the homebuying process from the federal consumer protection agency — budgeting, shopping, closing.", url: "https://www.consumerfinance.gov/owning-a-home/", type: "Web Guide", source: "CFPB" },
      { name: "CFPB Mortgage Shopping Worksheet", desc: "A worksheet to compare Loan Estimates from multiple lenders side by side. Helps you identify the best deal.", url: "https://files.consumerfinance.gov/f/201503_cfpb_mortgage-shopping-worksheet.pdf", type: "PDF", source: "CFPB" },
    ],
  },
  {
    title: "HomeClosing101 Printable Resources",
    desc: "These resources are available directly on our site and can be printed for use during your closing process.",
    color: "from-[#2d6b3f] to-[#235532]",
    docs: [
      { name: "Interactive Closing Checklist", desc: "28-item checklist across 5 phases — from pre-approval to closing day. Track your progress online or print a blank copy.", url: "/closing-process/closing-checklist", type: "Interactive", source: "HomeClosing101" },
      { name: "Questions to Ask Your Title Professional", desc: "40+ questions organized by category: choosing a company, costs, title search, closing process, and after closing.", url: "/questions-to-ask", type: "Printable", source: "HomeClosing101" },
      { name: "Closing Day Document Checklist", desc: "23 documents organized by category with required/optional badges. Everything you need to bring to your closing appointment.", url: "/document-checklist", type: "Printable", source: "HomeClosing101" },
      { name: "Stop Fraud 101 Prevention Guide", desc: "10 prevention steps sourced from the FBI, CFPB, NAR, and ALTA. Print and share with everyone involved in your transaction.", url: "/stop-fraud", type: "Printable", source: "FBI / CFPB / NAR / ALTA" },
      { name: "State Insurance Department Directory", desc: "Contact information for all 50 states + DC insurance departments — with calling script. Verified via NAIC/I.I.I.", url: "/find-policy", type: "Searchable", source: "NAIC / I.I.I." },
    ],
  },
  {
    title: "Homebuyer Education Programs",
    desc: "Free and low-cost courses that provide homebuyer education certificates — often required for certain loan programs.",
    color: "from-[#5b3a8c] to-[#482d70]",
    docs: [
      { name: "Fannie Mae HomeView", desc: "Free, interactive online course covering the entire homebuying process. Provides a certificate of completion. Meets HUD requirements.", url: "https://www.fanniemae.com/education", type: "Free Course", source: "Fannie Mae" },
      { name: "Freddie Mac CreditSmart", desc: "Free online homebuyer education covering credit, budgeting, and the mortgage process. Available in English and Spanish.", url: "https://myhome.freddiemac.com/resources/creditsmart", type: "Free Course", source: "Freddie Mac" },
      { name: "HUD Housing Counselor Locator", desc: "Find a HUD-approved housing counselor near you for free or low-cost one-on-one guidance through the homebuying process.", url: "https://www.consumerfinance.gov/housing/", type: "Locator Tool", source: "CFPB / HUD" },
      { name: "Framework Homebuyer Education", desc: "Online course with videos covering buying and owning a home. Meets HUD and National Industry Standards. $75.", url: "https://www.frameworkhomeownership.org/", type: "Paid Course", source: "Framework" },
    ],
  },
  {
    title: "Government & Industry Resources",
    desc: "Official tools and calculators from government-sponsored enterprises and industry organizations.",
    color: "from-[#8b6914] to-[#705410]",
    docs: [
      { name: "Fannie Mae Mortgage Calculator", desc: "Calculate monthly payments including taxes, insurance, PMI, and HOA. Official Fannie Mae tool.", url: "https://yourhome.fanniemae.com/calculators-tools/mortgage-calculator", type: "Calculator", source: "Fannie Mae" },
      { name: "Freddie Mac Homebuyer Tools", desc: "Calculators, worksheets, and checklists to prepare for homebuying. Personalized based on your situation.", url: "https://myhome.freddiemac.com/resources/calculators", type: "Tool Suite", source: "Freddie Mac" },
      { name: "ALTA Best Practices Framework", desc: "The 7 pillars of ALTA's Title Insurance and Settlement Company Best Practices — the industry standard for consumer protection.", url: "https://www.alta.org/best-practices/", type: "Framework", source: "ALTA" },
      { name: "FBI IC3 Complaint Portal", desc: "If you're a victim of wire fraud or internet crime during your real estate transaction, file a complaint here immediately.", url: "https://www.ic3.gov/", type: "Reporting", source: "FBI" },
      { name: "NAIC Insurance Department Directory", desc: "Complete directory of state insurance departments with staff contacts, searchable by state.", url: "https://content.naic.org/state-insurance-departments", type: "Directory", source: "NAIC" },
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

export default function DocumentLibraryPage() {
  return (
    <>
      <PageHero
        title="Document Library"
        subtitle="Download official forms, sample documents, checklists, and guides from CFPB, ALTA, Fannie Mae, Freddie Mac, and other trusted sources."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Document Library", href: "/document-library" }]}
      />

      <div className="py-3 lg:py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Closing Document Hub</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Every document and tool linked below is from an official, verified source — government agencies, ALTA, or directly from HomeClosing101. Use these resources throughout your closing process. PDFs can be downloaded and printed. Web tools are interactive and available 24/7.</p>
              </div>
            </div>
          </div>

          {/* Document count summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-blue-600">{documentSections.reduce((a, s) => a + s.docs.length, 0)}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">Total Resources</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-green-600">{documentSections[0].docs.length}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">Official CFPB</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-purple-600">{documentSections[1].docs.length}</p>
              <p className="text-[10px] text-alta-gray font-medium mt-1">HC101 Printables</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm text-center tile-interactive">
              <p className="text-2xl font-bold text-amber-600">{documentSections[2].docs.length + documentSections[3].docs.length}</p>
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
                    <a
                      key={doc.name}
                      href={doc.url}
                      target={doc.url.startsWith("/") ? undefined : "_blank"}
                      rel={doc.url.startsWith("/") ? undefined : "noopener noreferrer"}
                      className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-alta-teal/20 transition-all group"
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
                      <svg className="w-4 h-4 text-alta-gray shrink-0 mt-1 group-hover:text-alta-teal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={doc.url.startsWith("/") ? "M9 5l7 7-7 7" : "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"} /></svg>
                    </a>
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
        </div>
      </div>
    </>
  );
}
