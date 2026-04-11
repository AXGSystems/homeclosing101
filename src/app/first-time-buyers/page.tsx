import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import LoanComparisonChart from "@/components/LoanComparisonChart";
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
  blue: { bg: "from-[#1a5276] to-[#154463]", badge: "bg-blue-100 text-blue-700" },
  green: { bg: "from-[#2d6b3f] to-[#235532]", badge: "bg-green-100 text-green-700" },
  amber: { bg: "from-[#8b6914] to-[#705410]", badge: "bg-amber-100 text-amber-700" },
  purple: { bg: "from-[#5b3a8c] to-[#482d70]", badge: "bg-purple-100 text-purple-700" },
  red: { bg: "from-[#943030] to-[#7a2020]", badge: "bg-red-100 text-red-700" },
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

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sticky top-[130px] sm:top-[142px] z-20 shadow-md">
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
          {/* Interactive loan comparison chart */}
          <LoanComparisonChart />

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

          {/* Down payment assistance */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Down Payment Assistance Programs</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Many first-time buyers don&apos;t realize that thousands of programs exist to help with down payments and closing costs. These programs are offered by state housing finance agencies, counties, cities, and nonprofits. Eligibility typically depends on income, purchase price, and location.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { type: "State Housing Finance Agencies (HFAs)", desc: "Every state has an HFA that offers down payment assistance, below-market interest rates, and homebuyer education. Programs vary by state but often provide grants or forgivable loans covering 3-5% of the purchase price. Search '[your state] housing finance agency' to find yours.", source: "NCSHA" },
              { type: "FHA Down Payment Assistance", desc: "FHA loans allow down payment gifts from family members, employers, and approved down payment assistance programs. The 3.5% minimum can come entirely from gift funds — you don't need to contribute your own savings. Gift letters are required documenting the source.", source: "FHA.com" },
              { type: "VA Loan (Zero Down)", desc: "Active-duty military, veterans, and eligible surviving spouses can purchase with zero down payment and no monthly mortgage insurance. The VA funding fee (2.15% first use) can be financed into the loan or waived entirely for veterans with service-connected disabilities.", source: "VA.gov" },
              { type: "USDA Rural Development Loans", desc: "Zero-down loans for properties in eligible rural and suburban areas (which covers more areas than you'd expect). Income limits apply — typically 115% of area median income. Lower mortgage insurance than FHA. Check USDA eligibility maps for your area.", source: "USDA.gov" },
              { type: "Employer-Assisted Housing", desc: "Some employers offer down payment assistance, forgivable loans, or housing stipends as part of their benefits package. Check with your HR department — this benefit is more common than many buyers realize, especially at large companies and hospitals.", source: "Industry" },
              { type: "Nonprofit & Community Programs", desc: "Organizations like Habitat for Humanity, NeighborWorks, and local CDFIs offer homebuyer assistance including grants, low-interest loans, and sweat equity programs. HUD-approved housing counselors can connect you with programs in your area.", source: "HUD" },
            ].map((p) => (
              <div key={p.type} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-1">{p.type}</h3>
                <p className="text-xs text-alta-gray leading-relaxed mb-1">{p.desc}</p>
                <p className="text-[10px] text-alta-teal font-medium">Source: {p.source}</p>
              </div>
            ))}
          </div>

          {/* Credit score guidance */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Understanding Your Credit Score</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Your credit score is the single biggest factor in the interest rate you&apos;ll receive — and even a small rate difference adds up to thousands over the life of your loan. Here&apos;s what the ranges mean for mortgage eligibility:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { range: "740+", label: "Excellent", desc: "Best rates, lowest PMI, all loan types available", color: "bg-green-50 border-green-200 text-green-700" },
              { range: "700-739", label: "Good", desc: "Competitive rates, standard PMI, conventional eligible", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { range: "620-699", label: "Fair", desc: "Higher rates, higher PMI, FHA may be better option", color: "bg-amber-50 border-amber-200 text-amber-700" },
              { range: "580-619", label: "Below Avg", desc: "FHA with 3.5% down, limited conventional options", color: "bg-red-50 border-red-200 text-red-700" },
            ].map((s) => (
              <div key={s.range} className={`p-4 ${s.color} rounded-xl border tile-interactive text-center`}>
                <p className="text-2xl font-bold">{s.range}</p>
                <p className="text-xs font-semibold mt-0.5">{s.label}</p>
                <p className="text-[10px] mt-1 opacity-80">{s.desc}</p>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* What buyers wish they knew */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">What First-Time Buyers Wish They Knew</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Based on surveys of recent homebuyers by NAR and CFPB, these are the most common regrets and surprises. Learn from their experience.</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { insight: "Closing costs were more than expected", detail: "Many buyers budget only for the down payment and are surprised by 2-5% in closing costs on top of it. On a $350K home, that's $7,000-$17,500 in additional cash needed at closing.", color: "bg-amber-50 border-amber-200" },
              { insight: "Should have shopped more lenders", detail: "Buyers who compared 3+ Loan Estimates saved an average of $1,500 over the life of their loan compared to those who went with the first lender they talked to. The CFPB recommends comparing at least 3.", color: "bg-blue-50 border-blue-200" },
              { insight: "Didn't understand the inspection report", detail: "Inspection reports can be 40+ pages of technical findings. Attending the inspection in person and asking the inspector to explain priorities vs cosmetic issues is the single best way to understand what matters.", color: "bg-green-50 border-green-200" },
              { insight: "Underestimated ongoing homeowner costs", detail: "Beyond the mortgage: property taxes, insurance, HOA fees, maintenance (budget 1-2% of home value per year), utilities, and unexpected repairs. Budget for these BEFORE you buy, not after.", color: "bg-purple-50 border-purple-200" },
              { insight: "Wish they'd gotten owner's title insurance", detail: "Buyers who skipped owner's title insurance and later faced a title claim had to pay for legal defense out of pocket — often $20,000-$75,000+ even for baseless claims. The one-time premium is a fraction of the risk.", color: "bg-red-50 border-red-200" },
              { insight: "Didn't know about down payment assistance", detail: "Thousands of programs exist at the state, county, and city level to help with down payments and closing costs. Many first-time buyers qualify but never apply because they don't know the programs exist. Check with your state HFA.", color: "bg-teal-50 border-teal-200" },
            ].map((item) => (
              <div key={item.insight} className={`p-4 ${item.color} rounded-xl border tile-interactive`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1">&ldquo;{item.insight}&rdquo;</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center text-sm">
              Interactive Closing Checklist
            </Link>
            <Link href="/mortgage-calculator" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Mortgage Calculator
            </Link>
            <Link href="/questions-to-ask" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Questions to Ask
            </Link>
            <Link href="/stop-fraud" className="px-5 py-2.5 border-2 border-alta-red text-alta-red font-semibold rounded-lg hover:bg-alta-red hover:text-white transition-colors text-center text-sm">
              Stop Fraud 101
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
