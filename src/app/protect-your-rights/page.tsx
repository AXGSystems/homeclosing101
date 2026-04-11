import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protect Your Property Rights",
  description: "Learn how owner's title insurance protects your property rights from hidden threats like liens, fraud, and competing claims.",
};

const protections = [
  { text: "Unpaid mortgages and liens from previous owners", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
  { text: "Delinquent property taxes or special assessments", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { text: "Claims from unknown heirs or missing parties", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { text: "Fraudulent signatures or forged documents", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" },
  { text: "Errors in public records or legal descriptions", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { text: "Undisclosed easements or rights of way", icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" },
];

const caseStudies = [
  { location: "Missouri", summary: "A couple was saved from foreclosure when their title insurance covered a missed lien from a previous owner.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
  { location: "Texas", summary: "A builder sold homes with undisclosed liens. Buyers with owner's title insurance were protected.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
  { location: "Virginia", summary: "Criminals used falsified documents to sell properties they didn't own. Title insurance covered losses.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
  { location: "California", summary: "A non-profit lost a lawsuit over property ownership. Title insurance covered legal defense and loss.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
];

export default function ProtectYourRightsPage() {
  return (
    <>
      <PageHero
        title="Protect Your Property Rights"
        subtitle="Owner's title insurance is a one-time purchase at closing that protects your property rights for as long as you or your heirs own the home."
        image="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1920&q=80"
        breadcrumb={[{ label: "Protect Your Rights", href: "/protect-your-rights" }]}
      />

      <div className="py-6 lg:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8 p-5 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Understand Your Most Important Protection</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Title insurance is the only insurance that protects what already happened — hidden liens, fraud, and errors in public records that could threaten your ownership. Learn the difference between the two types and why the owner&apos;s policy is essential.</p>
              </div>
            </div>
          </div>
          {/* Key distinction */}
          <div className="grid md:grid-cols-2 gap-4 mb-14">
            <div className="relative p-6 rounded-2xl overflow-hidden border border-red-200">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h3 className="font-bold text-alta-navy mb-2 text-lg">Lender&apos;s Policy</h3>
                <p className="text-sm text-alta-gray">Protects only the <strong>lender&apos;s</strong> investment. Required by most mortgage companies. Does NOT protect you as the homeowner.</p>
              </div>
            </div>
            <div className="relative p-6 rounded-2xl overflow-hidden border border-green-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-bold text-alta-navy mb-2 text-lg">Owner&apos;s Policy</h3>
                <p className="text-sm text-alta-gray">Protects <strong>your</strong> investment for the life of ownership. One-time fee. Covers legal defense and financial loss.</p>
              </div>
            </div>
          </div>

          {/* What it protects against */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">What Does Title Insurance Protect Against?</h2>
          <p className="text-alta-gray mb-6">Title searches reveal problems in more than <strong className="text-alta-navy">one-third</strong> of residential transactions:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
            {protections.map((item) => (
              <div key={item.text} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-alta-teal/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-alta-light flex items-center justify-center text-alta-teal shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                </div>
                <span className="text-sm text-alta-navy leading-snug">{item.text}</span>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* Case studies */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Real-Life Cases</h2>
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            {caseStudies.map((cs) => (
              <div key={cs.location} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <div className="relative h-36">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${cs.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-alta-teal px-2.5 py-1 rounded-full">{cs.location}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-alta-gray leading-relaxed">{cs.summary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cost and shopping */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-alta-navy mb-2 text-lg">Cost & Your Right to Shop</h3>
              <p className="text-sm text-alta-gray mb-3">
                Typically 0.5%–1% of the purchase price — a one-time fee for lifetime coverage. Rates are regulated by state insurance departments.
              </p>
              <p className="text-sm font-semibold text-alta-navy">
                You have the right to choose your own title company under RESPA.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-alta-navy mb-2 text-lg">Filing a Claim</h3>
              <p className="text-sm text-alta-gray">
                Promptly notify your title insurer if you discover any concern about your property&apos;s title. Provide your property address, documentation, and policy information. Your insurer handles investigation and legal defense.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/find-company" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Find a Title Company
            </Link>
            <Link href="/find-policy" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Find My Existing Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
