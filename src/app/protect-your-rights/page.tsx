import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import ExpandableRiskTiles from "@/components/ExpandableRiskTiles";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import ContextualSponsor from "@/components/ContextualSponsor";
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

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-[#e9f5ed] rounded-2xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2d6b3f]/10 flex items-center justify-center text-[#2d6b3f] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Understand Your Most Important Protection</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Title insurance is the only insurance that protects what already happened — hidden liens, fraud, and errors in public records that could threaten your ownership. Learn the difference between the two types and why the owner&apos;s policy is essential.</p>
              </div>
            </div>
          </div>
          {/* Your Rights Checklist */}
          <div className="mb-8 p-5 bg-gradient-to-br from-[#e9f5ed] to-white rounded-2xl border-2 border-[#2d6b3f]/20 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2d6b3f] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy text-lg">Your Rights Checklist</h2>
                <p className="text-xs text-alta-gray mt-0.5">Federal law protects homebuyers at every stage. Know these rights before you close.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#bddcc7]">
                <div className="w-5 h-5 rounded border-2 border-[#2d6b3f] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2d6b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-alta-navy">Right to Choose Your Title Company</p>
                  <p className="text-sm text-alta-gray leading-relaxed mt-0.5">Under the Real Estate Settlement Procedures Act (RESPA), Section 9, no seller can require a buyer to use a specific title company as a condition of sale. You can shop for the provider that best fits your needs.</p>
                  <p className="text-[10px] text-alta-teal font-medium mt-1">12 U.S.C. 2608 (RESPA Section 9)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#bddcc7]">
                <div className="w-5 h-5 rounded border-2 border-[#2d6b3f] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2d6b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-alta-navy">Right to 3-Business-Day CD Review</p>
                  <p className="text-sm text-alta-gray leading-relaxed mt-0.5">The TILA-RESPA Integrated Disclosure (TRID) rule requires your lender to provide the Closing Disclosure at least 3 business days before closing. Use this time to compare it to your Loan Estimate.</p>
                  <p className="text-[10px] text-alta-teal font-medium mt-1">12 CFR 1026.19(f) (TRID Rule / Reg Z)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#bddcc7]">
                <div className="w-5 h-5 rounded border-2 border-[#2d6b3f] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2d6b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-alta-navy">Right to Shop for Settlement Services</p>
                  <p className="text-sm text-alta-gray leading-relaxed mt-0.5">Your Loan Estimate includes a &quot;Services You Can Shop For&quot; section. You have the right to select your own providers for those services, including title insurance, pest inspections, and surveys.</p>
                  <p className="text-[10px] text-alta-teal font-medium mt-1">12 CFR 1026.19(e)(1)(vi) (TRID Rule)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#bddcc7]">
                <div className="w-5 h-5 rounded border-2 border-[#2d6b3f] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#2d6b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-alta-navy">Right to File Complaints</p>
                  <p className="text-sm text-alta-gray leading-relaxed mt-0.5">If you believe a settlement service provider violated RESPA, you can file a complaint with the Consumer Financial Protection Bureau (CFPB) at <a href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noopener noreferrer" className="text-alta-teal underline font-semibold">consumerfinance.gov/complaint</a> or your state&apos;s department of insurance.</p>
                  <p className="text-[10px] text-alta-teal font-medium mt-1">12 U.S.C. 2607 (RESPA Section 8)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key distinction */}
          <div className="grid md:grid-cols-2 gap-4 mb-14">
            <div className="relative p-6 rounded-2xl overflow-hidden border border-red-200">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100/50" />
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#943030]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
              <div key={item.text} className="group flex items-start gap-3 p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] shadow-sm tile-interactive">
                <div className="w-9 h-9 rounded-lg bg-[#2d6b3f]/10 flex items-center justify-center text-[#2d6b3f] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                </div>
                <span className="text-sm text-alta-navy leading-snug group-hover:text-alta-teal transition-colors">{item.text}</span>
              </div>
            ))}
          </div>

          <InlineAd />

          <ContextualSponsor context="title" />

          {/* Case studies */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Real-Life Cases</h2>
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            {caseStudies.map((cs) => (
              <div key={cs.location} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white tile-interactive">
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

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* How the title search works */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">How the Title Search Process Works</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">
            Before your title insurance policy can be issued, a title professional conducts a thorough examination of public records related to your property. This process — called a title search or title examination — is one of the most important steps in the closing process. According to ALTA, title searches reveal issues that need resolution in approximately one out of every three residential transactions.
          </p>
          <div className="space-y-3 mb-10">
            {[
              { step: "1", title: "Public Records Review", desc: "The title examiner searches county recorder's office records, court records, and tax records going back decades — often to the original land patent. They trace every deed, mortgage, lien, judgment, easement, and encumbrance that has ever been recorded against the property." },
              { step: "2", title: "Chain of Title Verification", desc: "The examiner verifies an unbroken chain of ownership from the current seller back through every previous owner. Any gaps, irregularities, or missing links in the chain must be investigated and resolved before the title can be considered clear." },
              { step: "3", title: "Lien and Judgment Search", desc: "Outstanding debts attached to the property are identified: unpaid property taxes, mechanic's liens from contractors, HOA liens, federal tax liens, and civil judgments against current or previous owners. These must be paid off or released before closing." },
              { step: "4", title: "Title Commitment Issued", desc: "Based on the search results, the title company issues a title commitment (also called a preliminary title report). This document has two critical sections: Schedule A (lists the proposed policy details — owner, lender, purchase price, legal description) and Schedule B (lists exceptions — specific items the policy will NOT cover, such as existing easements, mineral rights reservations, or HOA covenants). Review Schedule B carefully: anything listed there is excluded from your coverage. Ask your title company to explain every exception and whether any can be removed before closing." },
              { step: "5", title: "Issue Resolution (Curative Work)", desc: "If the search uncovers problems — missing signatures, unreleased mortgages, boundary disputes, estate issues — the title company works to resolve (cure) them before closing. This is one of the most valuable services title professionals provide." },
              { step: "6", title: "Policy Issuance", desc: "Once all issues are resolved and the transaction closes, the title company issues the final title insurance policy. The owner's policy protects you; the lender's policy protects the bank. Your owner's policy remains in effect for as long as you or your heirs own the property." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] shadow-sm tile-interactive">
                <span className="w-8 h-8 rounded-full bg-alta-teal text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                <div>
                  <h3 className="font-bold text-alta-navy text-sm">{s.title}</h3>
                  <p className="text-sm text-alta-gray leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* The 10 covered risks explained */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">What Your Owner&apos;s Policy Actually Covers</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">
            The current ALTA Owner&apos;s Policy lists specific covered risks. Click any risk below to see how title insurance protects you in detail.
          </p>
          <p className="text-[10px] text-alta-teal font-medium mb-4">Source: ALTA Standard Owner&apos;s Policy</p>
          <ExpandableRiskTiles />

          {/* Dollar comparison */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">The Math: Why Title Insurance is Worth It</h2>
          <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200 mb-10">
            <div className="grid md:grid-cols-3 gap-4 text-center mb-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl font-bold text-alta-teal">$1,750</p>
                <p className="text-xs text-alta-gray mt-1">Typical owner&apos;s policy cost<br />(on a $350K home at 0.5%)</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl font-bold text-alta-navy">$350,000</p>
                <p className="text-xs text-alta-gray mt-1">What your policy protects<br />(your full home value)</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="text-2xl font-bold text-alta-red">$50,000+</p>
                <p className="text-xs text-alta-gray mt-1">Average legal defense cost<br />for a title dispute (without insurance)</p>
              </div>
            </div>
            <p className="text-sm text-alta-gray text-center leading-relaxed">
              For a one-time payment of approximately 0.5% of your home&apos;s value, you get coverage for the entire time you own the property — including full legal defense costs. Without title insurance, a single title dispute could cost you tens of thousands in legal fees, even if you ultimately win. If you lose, you could lose your entire investment.
            </p>
          </div>

          <InlineAd />

          {/* Cost and shopping */}
          <div className="grid md:grid-cols-2 gap-5 mb-6 mt-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-alta-navy mb-2 text-lg">Cost & Your Right to Shop</h3>
              <p className="text-sm text-alta-gray mb-2 leading-relaxed">
                Owner&apos;s title insurance typically costs between 0.5% and 1% of the purchase price — a one-time fee for lifetime coverage. Rates are regulated by each state&apos;s department of insurance. In some states (like Texas), rates are set by the state and are the same everywhere. In others, rates vary by company — which is why shopping matters.
              </p>
              <p className="text-sm text-alta-gray mb-2 leading-relaxed">
                Under the federal Real Estate Settlement Procedures Act (RESPA), you have the legal right to choose your own title insurance company. Your lender or real estate agent may recommend a provider, but <strong className="text-alta-navy">you are not obligated to use them</strong>.
              </p>
              <p className="text-sm text-alta-gray leading-relaxed">
                <strong className="text-alta-navy">Tip:</strong> Ask about the simultaneous issue rate — when you purchase both an owner&apos;s and lender&apos;s policy from the same company at the same time, you typically get a significant discount on the second policy.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-alta-navy mb-2 text-lg">Filing a Claim</h3>
              <p className="text-sm text-alta-gray mb-2 leading-relaxed">
                If you discover a concern about your property&apos;s title at any point during your ownership, contact your title insurance company promptly. Common triggers for claims include:
              </p>
              <ul className="text-sm text-alta-gray space-y-1.5 mb-2">
                <li className="flex items-start gap-2"><span className="text-alta-teal">-</span>Someone claims ownership or an interest in your property</li>
                <li className="flex items-start gap-2"><span className="text-alta-teal">-</span>A lien or judgment appears that wasn&apos;t disclosed at closing</li>
                <li className="flex items-start gap-2"><span className="text-alta-teal">-</span>A boundary dispute arises with a neighbor</li>
                <li className="flex items-start gap-2"><span className="text-alta-teal">-</span>You discover an easement that restricts your use of the property</li>
                <li className="flex items-start gap-2"><span className="text-alta-teal">-</span>You try to sell and the buyer&apos;s title search reveals a defect</li>
              </ul>
              <p className="text-sm text-alta-gray leading-relaxed">
                <strong className="text-alta-navy">What to provide:</strong> Your property address, policy number (if available), description of the issue, and any relevant documents. Your insurer will investigate, provide legal defense if needed, and pay covered losses up to your policy amount.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/find-company" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Find a Title Company
            </Link>
            <Link href="/find-policy" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Find My Existing Policy
            </Link>
            <Link href="/faq" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Title Insurance FAQ
            </Link>
            <Link href="/sources" className="px-5 py-2.5 border-2 border-gray-300 text-alta-gray font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center text-sm">
              View Sources
            </Link>
          </div>

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/protect-your-money" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Money</h3>
                <p className="text-xs text-alta-gray mt-1">Recognize and prevent wire fraud targeting homebuyers at closing</p>
              </Link>
              <Link href="/homeowners-insurance" className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Homeowner's Insurance</h3>
                <p className="text-xs text-alta-gray mt-1">Coverage types, costs, and what to look for in a policy</p>
              </Link>
              <Link href="/glossary" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Glossary</h3>
                <p className="text-xs text-alta-gray mt-1">Look up any real estate or title insurance term you encounter</p>
              </Link>
            </div>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
