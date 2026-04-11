import Link from "next/link";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Closing Process",
  description: "Learn everything about the home closing process — from pre-approval to getting your keys.",
};

const sections = [
  {
    title: "What to Expect",
    description: "A step-by-step walkthrough of the entire closing journey, from loan pre-approval to signing day.",
    href: "/closing-process/what-to-expect",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    accent: "from-blue-500 to-blue-600",
  },
  {
    title: "Closing Options",
    description: "In-person, hybrid, mail-away, and remote digital — choose the closing method that works for you.",
    href: "/closing-process/closing-options",
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&q=80",
    accent: "from-green-500 to-green-600",
  },
  {
    title: "Closing Checklist",
    description: "An interactive, printable checklist to track every task leading up to your closing day.",
    href: "/closing-process/closing-checklist",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    accent: "from-purple-500 to-purple-600",
  },
  {
    title: "Closing Costs Explained",
    description: "Understand every fee and use our live calculator to estimate your total closing costs.",
    href: "/closing-process/closing-costs",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    accent: "from-amber-500 to-amber-600",
  },
];

export default function ClosingProcessPage() {
  return (
    <>
      <PageHero
        title="The Closing Process"
        subtitle="Closing — also called settlement — is the final step in a real estate transaction. It's when you legally commit to your mortgage and become the official owner of your new home."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }]}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="feature-card group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white"
                data-accent="teal"
              >
                <div className="relative h-40 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${s.image}')` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${s.accent} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h2 className="text-xl font-bold text-white drop-shadow-lg">{s.title}</h2>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-alta-gray leading-relaxed mb-3">{s.description}</p>
                  <span className="text-sm font-medium text-alta-teal flex items-center gap-1">
                    Explore
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
