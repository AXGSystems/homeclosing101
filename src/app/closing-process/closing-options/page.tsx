import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Options",
  description: "Detailed guide to in-person, hybrid, mail-away, and remote digital closings — how each works, who's involved, what you'll sign, and which states allow RON.",
};

const options = [
  {
    title: "In-Person Closing",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
    summary: "All parties meet at the settlement provider's office to review and sign transfer documents together.",
    howItWorks: [
      "You, your real estate agent, and possibly the seller meet at the title company or attorney's office",
      "The closing agent walks you through each document, explaining what you're signing",
      "You sign the deed, promissory note, deed of trust, and Closing Disclosure",
      "You provide your certified check or wire transfer confirmation for closing costs and down payment",
      "The closing agent collects all signatures, disburses funds, and records the deed with the county",
      "You receive your keys — typically the same day or within 24-48 hours after recording",
    ],
    whoAttends: "Buyer, seller (sometimes), real estate agents, closing/settlement agent, possibly an attorney (required in some states)",
    duration: "Typically 30-90 minutes depending on complexity",
    pros: ["Face-to-face guidance from your closing agent", "Immediate answers to questions", "All parties present to resolve last-minute issues", "Familiar and straightforward process"],
    cons: ["Requires scheduling coordination among multiple parties", "Travel to the office required", "May need to take time off work", "Can feel rushed if the office is busy"],
    bestFor: "Buyers who want hands-on guidance, complex transactions, and first-time homebuyers who benefit from having an expert walk them through each document.",
  },
  {
    title: "Mail-Away / Mobile Notary",
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&q=80",
    summary: "The settlement provider sends closing documents to you via courier. A notary meets you at a location of your choice to witness your signing.",
    howItWorks: [
      "Your settlement agent prepares all closing documents and sends them to you via overnight courier or secure delivery",
      "You review the documents at your own pace before the notary arrives",
      "A notary public meets you at your home, office, or another convenient location",
      "The notary verifies your identity, witnesses your signatures, and notarizes the required documents",
      "Signed documents are returned to the settlement agent via courier",
      "The settlement agent disburses funds and records the deed once all signatures are collected",
    ],
    whoAttends: "Buyer and a mobile notary (seller signs separately, often at a different time/location)",
    duration: "Document review: at your pace. Signing with notary: 20-45 minutes",
    pros: ["Convenient for out-of-state or relocating buyers", "Flexible scheduling — evenings and weekends often available", "No travel to an office required", "Review documents at your own pace before signing"],
    cons: ["May cost extra for mobile notary services ($150-$300)", "Settlement agent isn't present to explain documents in person", "Mail delays can affect timing", "You may need to fund separately from signing"],
    bestFor: "Out-of-state buyers, military personnel, buyers with mobility challenges, or anyone who can't travel to a settlement office.",
  },
  {
    title: "Hybrid Closing",
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80",
    summary: "You pre-sign most documents electronically through a secure portal, then visit the office briefly to execute only the key transfer documents that require wet signatures.",
    howItWorks: [
      "Your settlement agent sends you a secure link to a digital signing portal (like Qualia, SoftPro, or Notarize)",
      "You review and electronically sign most disclosures, affidavits, and ancillary documents from home",
      "You then visit the settlement office for a brief appointment to sign the deed, promissory note, and deed of trust — documents that typically require a wet (ink) signature and notarization",
      "The closing agent verifies everything, disburses funds, and records the deed",
      "Total office time is dramatically reduced — often 15-30 minutes instead of 60-90",
    ],
    whoAttends: "Buyer and closing agent at the office (digital portion is done solo at home)",
    duration: "Digital portion: at your pace. Office visit: 15-30 minutes",
    pros: ["Significantly less time in the office", "Review most documents at your own pace at home", "Ask questions electronically before the appointment", "Best of digital convenience and in-person security"],
    cons: ["Still requires an office visit for key documents", "Requires comfort with electronic signing platforms", "Not available from all settlement providers", "May require printing and scanning some documents"],
    bestFor: "Buyers comfortable with technology who want to minimize office time but still want a human present for the critical signing.",
  },
  {
    title: "Remote Online Notarization (RON)",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&q=80",
    summary: "A fully digital closing where all documents — including the deed and note — are signed electronically and notarized via a live audio-video session with a commissioned remote notary.",
    howItWorks: [
      "Your settlement agent sets up a secure video session on a RON platform (such as Notarize, Nexsys, or Pavaso)",
      "You verify your identity through knowledge-based authentication (KBA) questions and credential analysis — the platform verifies your ID in real time",
      "A commissioned remote online notary joins the video call and walks you through each document",
      "You sign each document electronically while the notary watches via live video",
      "The notary applies their electronic notarial seal and certificate to each notarized document",
      "The entire session is recorded and stored as a tamper-evident record",
      "Your settlement agent disburses funds and records the deed electronically",
    ],
    whoAttends: "Buyer and a remote online notary (via live video). No one needs to be in the same physical location.",
    duration: "Typically 30-60 minutes for the video session",
    pros: ["Complete the entire closing from anywhere with internet", "No travel, no office visit, no scheduling around business hours", "Full recording of the session for security and dispute resolution", "Identity verification is often MORE rigorous than in-person", "Accessible for buyers with disabilities or in remote areas"],
    cons: ["Requires reliable internet connection and a device with camera/microphone", "Not available in all states (see state availability below)", "Some county recorders don't yet accept electronically notarized documents", "Some lenders don't support RON closings", "Less personal — you're interacting through a screen"],
    bestFor: "Tech-savvy buyers, remote workers, military personnel overseas, or anyone in a state that permits RON who wants maximum convenience.",
  },
];

export default function ClosingOptionsPage() {
  return (
    <>
      <PageHero
        title="Closing Options"
        subtitle="Today's homebuyers have more choices than ever for how they complete their closing. Find the method that works best for you."
        image="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "Closing Options", href: "/closing-process/closing-options" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sticky top-[130px] sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Choose How You Close</h2>
                <p className="text-sm text-alta-gray leading-relaxed">The closing method you choose affects how you sign documents, where you need to be, and how long the process takes. Not all options are available in every state or from every settlement provider. Ask your title company which methods they support before your closing date is set. Below is a detailed comparison of all four options — how they work step by step, who&apos;s involved, and which is best for your situation.</p>
              </div>
            </div>
          </div>

          {/* Detailed option breakdowns */}
          <div className="space-y-8 mb-10">
            {options.map((opt, i) => (
              <div key={opt.title} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-white">
                {/* Header with image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${opt.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Option {i + 1} of 4</span>
                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">{opt.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-alta-gray leading-relaxed mb-5">{opt.summary}</p>

                  {/* Quick facts */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div className="p-3 bg-alta-light rounded-xl">
                      <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Who Attends</p>
                      <p className="text-xs text-alta-gray">{opt.whoAttends}</p>
                    </div>
                    <div className="p-3 bg-alta-light rounded-xl">
                      <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Typical Duration</p>
                      <p className="text-xs text-alta-gray">{opt.duration}</p>
                    </div>
                  </div>

                  {/* How it works */}
                  <h3 className="font-bold text-alta-navy mb-3">How It Works — Step by Step</h3>
                  <div className="space-y-2 mb-5">
                    {opt.howItWorks.map((step, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <span className="w-6 h-6 rounded-full bg-alta-teal text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{j + 1}</span>
                        <p className="text-sm text-alta-gray leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <h4 className="text-sm font-bold text-green-700 mb-2">Advantages</h4>
                      <ul className="space-y-1.5">
                        {opt.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-xs text-green-800">
                            <svg className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <h4 className="text-sm font-bold text-amber-700 mb-2">Things to Consider</h4>
                      <ul className="space-y-1.5">
                        {opt.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2 text-xs text-amber-800">
                            <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Best for */}
                  <div className="p-3 bg-gradient-to-r from-alta-teal/5 to-alta-teal/10 rounded-xl border border-alta-teal/20">
                    <p className="text-xs text-alta-gray"><strong className="text-alta-navy">Best for:</strong> {opt.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* What documents you'll sign */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">Documents You&apos;ll Sign at Closing</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Regardless of which closing method you choose, you&apos;ll sign essentially the same set of documents. The method only changes HOW and WHERE you sign them — not what you sign. Key documents include:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { name: "Closing Disclosure", desc: "Final terms and costs of your mortgage. You should have reviewed this 3+ days before closing. Source: CFPB TRID Rule" },
              { name: "Promissory Note", desc: "Your legal promise to repay the loan. Specifies amount, rate, term, and consequences of default." },
              { name: "Deed of Trust / Mortgage", desc: "Gives the lender a security interest in your property. If you default, this is what allows foreclosure." },
              { name: "Deed", desc: "Transfers legal ownership of the property from the seller to you. Recorded with the county after closing." },
              { name: "Title Insurance Commitments", desc: "Documents related to your lender's and owner's title insurance policies. Lists covered risks and exceptions." },
              { name: "Affidavits and Declarations", desc: "Various sworn statements — occupancy intent, identity verification, name affidavits, and compliance disclosures." },
              { name: "Escrow Agreement", desc: "Sets up your escrow account for property taxes and insurance, specifying the initial deposit and monthly contributions." },
              { name: "Initial Escrow Disclosure", desc: "Itemizes the amounts going into your escrow account and the projected disbursement schedule." },
            ].map((doc) => (
              <div key={doc.name} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-1">{doc.name}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>

          {/* State availability note */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200 mb-6">
            <h3 className="font-bold text-alta-navy mb-2">RON State Availability</h3>
            <p className="text-sm text-alta-gray leading-relaxed mb-3">
              Remote Online Notarization (RON) laws vary by state. As of 2026, the majority of U.S. states have enacted permanent RON legislation, but availability depends on your specific county recorder&apos;s office accepting electronically notarized documents, and your lender supporting the process. States that were early adopters include Virginia, Texas, Florida, Michigan, and Nevada. Source: ALTA
            </p>
            <p className="text-sm text-alta-gray leading-relaxed">
              <strong className="text-alta-navy">Important:</strong> Even if your state allows RON, your lender or settlement provider may not offer it. Always ask about available closing methods early in the process so you can plan accordingly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Closing Checklist
            </Link>
            <Link href="/closing-disclosure" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Understanding Your Closing Disclosure
            </Link>
            <Link href="/find-company" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Find a Company
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
