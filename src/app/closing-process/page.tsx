import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
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
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    accent: "from-[#1a5276] to-[#154463]",
  },
  {
    title: "Closing Options",
    description: "In-person, hybrid, mail-away, and remote digital — choose the closing method that works for you.",
    href: "/closing-process/closing-options",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    accent: "from-[#2d6b3f] to-[#235532]",
  },
  {
    title: "Closing Checklist",
    description: "An interactive, printable checklist to track every task leading up to your closing day.",
    href: "/closing-process/closing-checklist",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    accent: "from-[#5b3a8c] to-[#482d70]",
  },
  {
    title: "Closing Costs Explained",
    description: "Understand every fee and use our live calculator to estimate your total closing costs.",
    href: "/closing-process/closing-costs",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    accent: "from-[#8b6914] to-[#705410]",
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

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Intro section */}
          <div className="mb-10">
            <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-alta-navy mb-3">What Is a Real Estate Closing?</h2>
                <p className="text-sm text-alta-gray leading-relaxed mb-3">Closing — also called settlement — is the moment everything comes together. It&apos;s the final step in buying a home, where ownership legally transfers from the seller to you. You&apos;ll sign the mortgage documents, pay your closing costs and down payment, and receive the keys to your new home.</p>
                <p className="text-sm text-alta-gray leading-relaxed mb-3">The process typically takes <strong className="text-alta-navy">30-45 days</strong> from accepted offer to closing day, and involves coordination between your lender, real estate agents, title company, insurance providers, and local government. Along the way, you&apos;ll encounter inspections, appraisals, title searches, insurance decisions, and a stack of documents to review and sign.</p>
                <p className="text-sm text-alta-gray leading-relaxed">It can feel overwhelming — but it doesn&apos;t have to be. The guides below break every phase into clear, actionable steps so you know exactly what&apos;s happening, why it matters, and what to do next. Whether you&apos;re a first-time buyer or a seasoned homeowner, understanding the closing process is the best way to protect yourself and close with confidence.</p>
              </div>
              <div className="relative h-48 md:h-full min-h-[200px] rounded-2xl overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0a7ea8]/15 flex items-center justify-center text-[#0a7ea8] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Explore Each Phase</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Choose a topic below to dive deeper. Each guide is packed with real data, expert tips, and interactive tools.</p>
              </div>
            </div>
          </div>
          {/* Visual flow timeline */}
          <div className="relative mb-10">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[38px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-1 bg-gradient-to-r from-[#1a5276] via-[#2d6b3f] via-[#5b3a8c] to-[#8b6914] rounded-full opacity-20" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {sections.map((s, i) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Numbered circle */}
                  <div className={`w-[76px] h-[76px] rounded-full bg-gradient-to-br ${s.accent} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3 ring-4 ring-white`}>
                    {i + 1}
                  </div>
                  <span className="text-xs font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Step cards */}
          <div className="space-y-5">
            {sections.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="feature-card group flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300"
                data-accent="teal"
              >
                {/* Gradient header with step number */}
                <div className={`relative md:w-64 shrink-0 bg-gradient-to-br ${s.accent} flex items-center justify-center p-6 md:p-8`}>
                  <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${s.image}')` }} />
                  <div className="relative text-center">
                    <div className="text-5xl font-black text-white/30 mb-1">0{i + 1}</div>
                    <h2 className="text-lg font-bold text-white drop-shadow-lg">{s.title}</h2>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                  <p className="text-sm text-alta-gray leading-relaxed mb-4">{s.description}</p>
                  <span className="text-sm font-semibold text-alta-teal flex items-center gap-1 group-hover:gap-2 transition-all">
                    Start Step {i + 1}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <InlineAd />

          {/* Key closing stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 mb-8">
            {[
              { val: "30-45", label: "Days from offer to close (conventional)", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
              { val: "50-100+", label: "Pages of documents you'll sign", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
              { val: "3 days", label: "Minimum CD review period (federal law)", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
              { val: "2-5%", label: "Closing costs as % of home price", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
            ].map((s) => (
              <div key={s.val} className={`p-3 ${s.bg} rounded-xl border ${s.border} text-center tile-interactive`}>
                <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                <p className="text-[9px] text-alta-gray mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Additional resources */}
          <h2 className="text-xl font-bold text-alta-navy mb-4">More Closing Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Home Inspection Guide", desc: "What inspectors check, specialty inspections, and how to choose an inspector", href: "/home-inspection", bg: "bg-[#e8f0f5]", border: "border-[#c5d8e4]", accent: "border-l-[#1a5276]" },
              { title: "Homeowner's Insurance", desc: "What it covers, how to shop, what lenders require, and typical costs", href: "/homeowners-insurance", bg: "bg-[#e9f5ed]", border: "border-[#bddcc7]", accent: "border-l-[#2d6b3f]" },
              { title: "Understanding Escrow", desc: "How escrow works before, during, and after closing — earnest money to monthly payments", href: "/escrow-guide", bg: "bg-[#f0ecf6]", border: "border-[#d4c8e4]", accent: "border-l-[#5b3a8c]" },
              { title: "Your Loan Estimate", desc: "Page-by-page breakdown with comparison tips and red flags to watch for", href: "/loan-estimate", bg: "bg-[#faf4e4]", border: "border-[#e8d9a8]", accent: "border-l-[#8b6914]" },
              { title: "Your Closing Disclosure", desc: "5-page review guide with tolerance rules and 5-step review process", href: "/closing-disclosure", bg: "bg-[#f5e8e8]", border: "border-[#e4c5c5]", accent: "border-l-[#943030]" },
              { title: "Document Checklist", desc: "Everything to bring on closing day — organized by category", href: "/document-checklist", bg: "bg-[#e6f1f5]", border: "border-[#b4d8e8]", accent: "border-l-[#0a7ea8]" },
              { title: "Document Library", desc: "Official CFPB forms, sample documents, and education courses", href: "/document-library", bg: "bg-[#e8f0f5]", border: "border-[#c5d8e4]", accent: "border-l-[#1a5276]" },
              { title: "Stop Fraud 101", desc: "10 FBI-sourced prevention steps to protect your closing funds", href: "/stop-fraud", bg: "bg-[#f5e8e8]", border: "border-[#e4c5c5]", accent: "border-l-[#943030]" },
            ].map((r) => (
              <Link key={r.title} href={r.href} className={`p-4 ${r.bg} rounded-xl border ${r.border} border-l-4 ${r.accent} shadow-sm tile-interactive group`}>
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">{r.title}</h3>
                <p className="text-[11px] text-alta-gray mt-1 leading-snug">{r.desc}</p>
              </Link>
            ))}
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
