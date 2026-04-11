import Link from "next/link";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Options",
  description: "Explore different closing methods — in-person, hybrid, mail-away, and remote digital closings.",
};

const options = [
  {
    title: "In-Person Closing",
    description: "The traditional method. All parties meet at the settlement provider's office to sign transfer documents — either on paper or digitally.",
    pros: ["Face-to-face guidance from your closing agent", "Immediate answers to questions", "Familiar and straightforward"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
  },
  {
    title: "Mail-Away / Mobile Notary",
    description: "The settlement provider sends closing documents to you. A notary meets you at an agreed location to witness the signing.",
    pros: ["Convenient for out-of-state buyers", "Flexible scheduling", "No office visit required"],
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&q=80",
  },
  {
    title: "Hybrid Closing",
    description: "Pre-sign most documents through a digital portal, then visit the office only for the main transfer documents.",
    pros: ["Less time in the office", "Review documents at your pace", "Best of both worlds"],
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80",
  },
  {
    title: "Remote Digital Closing (RON)",
    description: "Also known as Remote Online Notarization. Digitally access and sign all documents from anywhere through a secure portal.",
    pros: ["Complete from anywhere with internet", "Fully digital process", "Recorded for security"],
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&q=80",
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

      <div className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {options.map((opt) => (
              <div key={opt.title} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow">
                <div className="relative h-44">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${opt.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h2 className="absolute bottom-4 left-5 text-xl font-bold text-white drop-shadow-lg">{opt.title}</h2>
                </div>
                <div className="p-5">
                  <p className="text-sm text-alta-gray mb-3 leading-relaxed">{opt.description}</p>
                  <ul className="space-y-1.5">
                    {opt.pros.map((pro) => (
                      <li key={pro} className="flex items-center gap-2 text-sm text-alta-gray">
                        <svg className="w-4 h-4 text-alta-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl border border-blue-100 mb-8">
            <h3 className="font-bold text-alta-navy mb-2">Important Note</h3>
            <p className="text-sm text-alta-gray">
              Not all closing options are available in every state. Your settlement provider may control notary selection in some areas for fraud prevention. Check with your title company about which options are available for your transaction.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Closing Checklist
            </Link>
            <Link href="/find-company" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Find a Company
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
