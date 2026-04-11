import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First-Time Homebuyer Guide",
  description: "Complete guide for first-time homebuyers — timeline, budget, mortgage types, and everything you need to know.",
};

const timeline = [
  { month: "6-12 Months Before", title: "Get Your Finances Ready", items: ["Check and improve your credit score (aim for 620+, ideally 740+)", "Pay down existing debts to lower your DTI ratio", "Start saving for down payment (3-20% of home price)", "Research mortgage pre-approval requirements", "Set a realistic budget using our affordability calculator"], color: "blue", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80" },
  { month: "3-6 Months Before", title: "Build Your Team", items: ["Get pre-approved for a mortgage (not just pre-qualified)", "Choose a real estate agent you trust", "Research neighborhoods, schools, commute times", "Understand the difference between FHA, VA, conventional, and USDA loans", "Start attending open houses to learn the market"], color: "green", image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80" },
  { month: "1-3 Months Before", title: "Find & Secure Your Home", items: ["Submit offers on homes you love (be prepared to compete)", "Negotiate price, repairs, and closing date", "Sign the purchase agreement", "Pay earnest money deposit (typically 1-3%)", "Lock in your mortgage interest rate"], color: "amber", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80" },
  { month: "2-4 Weeks Before", title: "Due Diligence", items: ["Schedule home inspection ($300-$500)", "Order home appraisal (lender arranges this)", "Shop for homeowner's insurance", "Shop for owner's title insurance (protects YOU)", "Review title commitment for any issues", "Set up utilities and mail forwarding"], color: "purple", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
  { month: "Final Week", title: "Prepare to Close", items: ["Receive and review Closing Disclosure (3 days before)", "Compare to your original Loan Estimate", "Verify wire transfer instructions BY PHONE (never email)", "Schedule and complete final walk-through", "Gather ID, insurance proof, and certified funds", "Confirm closing date, time, and location"], color: "red", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80" },
];

const loanTypes = [
  { type: "Conventional", down: "3-20%", credit: "620+", best: "Strong credit, 20% down avoids PMI", pmi: "Required if < 20% down" },
  { type: "FHA", down: "3.5%", credit: "580+", best: "Lower credit scores, smaller down payment", pmi: "Required for life of loan" },
  { type: "VA", down: "0%", credit: "No minimum", best: "Active military and veterans", pmi: "No PMI required" },
  { type: "USDA", down: "0%", credit: "640+", best: "Rural and suburban areas", pmi: "Guarantee fee required" },
];

const mistakes = [
  { title: "Skipping Pre-Approval", desc: "Without pre-approval, sellers won't take your offer seriously and you won't know your real budget." },
  { title: "Not Shopping for Title Insurance", desc: "You have the right to choose your own title company. Shopping around can save hundreds of dollars." },
  { title: "Trusting Email Wire Instructions", desc: "Wire fraud losses hit $275M in 2025. ALWAYS verify wiring details by phone." },
  { title: "Skipping the Home Inspection", desc: "A $400 inspection can uncover $40,000 in hidden problems. Never waive this." },
  { title: "Making Big Purchases Before Closing", desc: "New car? New furniture on credit? This can tank your loan approval at the last minute." },
  { title: "Not Understanding Closing Costs", desc: "Budget 2-5% of the home price for closing costs on top of your down payment." },
];

const colorMap: Record<string, { bg: string; badge: string }> = {
  blue: { bg: "from-blue-500 to-blue-600", badge: "bg-blue-100 text-blue-700" },
  green: { bg: "from-green-500 to-green-600", badge: "bg-green-100 text-green-700" },
  amber: { bg: "from-amber-500 to-amber-600", badge: "bg-amber-100 text-amber-700" },
  purple: { bg: "from-purple-500 to-purple-600", badge: "bg-purple-100 text-purple-700" },
  red: { bg: "from-red-500 to-red-600", badge: "bg-red-100 text-red-700" },
};

export default function FirstTimeBuyersPage() {
  return (
    <>
      <PageHero
        title="First-Time Homebuyer Guide"
        subtitle="Everything you need to know about buying your first home — from building credit to getting the keys. A complete timeline and resource guide."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[{ label: "First-Time Buyers", href: "/first-time-buyers" }]}
      />

      <div className="py-3 lg:py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Roadmap to Homeownership</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Buying your first home is exciting but complex. This guide breaks the entire process into a clear timeline so you know exactly what to do and when. Bookmark this page and refer to it throughout your journey.</p>
              </div>
            </div>
          </div>

          {/* Quick tools */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Affordability", href: "/affordability", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12" },
              { label: "Mortgage Calc", href: "/mortgage-calculator", icon: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008z" },
              { label: "Closing Costs", href: "/closing-process/closing-costs", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0" },
              { label: "Checklist", href: "/closing-process/closing-checklist", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((t) => (
              <Link key={t.label} href={t.href} className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-alta-teal/20 transition-all text-center group">
                <div className="w-10 h-10 rounded-xl bg-alta-light flex items-center justify-center text-alta-teal mx-auto mb-2 group-hover:bg-alta-teal group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={t.icon} /></svg>
                </div>
                <p className="text-xs font-semibold text-alta-navy">{t.label}</p>
              </Link>
            ))}
          </div>

          {/* Timeline */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Your Homebuying Timeline</h2>
          <div className="space-y-6 mb-12">
            {timeline.map((phase, i) => {
              const c = colorMap[phase.color];
              return (
                <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="relative h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${phase.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${c.badge}`}>{phase.month}</span>
                        <h3 className="text-lg font-bold text-white mt-1 drop-shadow">{phase.title}</h3>
                      </div>
                      <span className="text-xs text-white/60">Step {i + 1} of {timeline.length}</span>
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-alta-gray">
                          <svg className="w-4 h-4 text-alta-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <InlineAd />

          {/* Loan Types */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Understanding Loan Types</h2>
          <p className="text-alta-gray mb-6">The type of mortgage you choose affects your down payment, monthly payment, and total cost. Here&apos;s how they compare:</p>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm border border-gray-100 rounded-2xl overflow-hidden">
              <thead className="bg-alta-navy text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Loan Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Min Down</th>
                  <th className="px-4 py-3 text-left font-semibold">Credit Score</th>
                  <th className="px-4 py-3 text-left font-semibold">PMI</th>
                  <th className="px-4 py-3 text-left font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loanTypes.map((l) => (
                  <tr key={l.type} className="hover:bg-alta-light/50">
                    <td className="px-4 py-3 font-semibold text-alta-navy">{l.type}</td>
                    <td className="px-4 py-3 text-alta-teal font-medium">{l.down}</td>
                    <td className="px-4 py-3">{l.credit}</td>
                    <td className="px-4 py-3 text-xs">{l.pmi}</td>
                    <td className="px-4 py-3 text-xs text-alta-gray">{l.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Common Mistakes */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">6 Costly Mistakes First-Time Buyers Make</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {mistakes.map((m, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 mb-3">
                  <span className="font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-bold text-alta-navy mb-1 text-sm">{m.title}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Interactive Closing Checklist
            </Link>
            <Link href="/questions-to-ask" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Questions to Ask Your Title Company
            </Link>
            <Link href="/stop-fraud" className="px-6 py-3 border-2 border-alta-red text-alta-red font-semibold rounded-lg hover:bg-alta-red hover:text-white transition-colors text-center">
              Stop Fraud 101
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
