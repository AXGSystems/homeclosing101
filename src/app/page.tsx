import Link from "next/link";
import EliteProviders from "@/components/EliteProviders";
import MarketStats from "@/components/MarketStats";

const features = [
  {
    title: "The Closing Process",
    description: "Learn what to expect at every step — from pre-approval to getting the keys to your new home.",
    href: "/closing-process",
    accent: "teal",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Protect Your Rights",
    description: "Understand owner's title insurance and how it defends your property from hidden claims and fraud.",
    href: "/protect-your-rights",
    accent: "green",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Protect Your Money",
    description: "Wire fraud losses topped $275M last year. Learn to recognize scams and safeguard your closing funds.",
    href: "/protect-your-money",
    accent: "red",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Closing Cost Calculator",
    description: "Estimate your closing costs with our interactive calculator. Input your price, see every fee.",
    href: "/closing-process/closing-costs",
    accent: "gold",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    title: "Find a Company",
    description: "Search for ALTA member title insurance and settlement companies in your area.",
    href: "/find-company",
    accent: "navy",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Real Estate Glossary",
    description: "80+ searchable terms — from abstract to warranty deed. Instant A-Z lookup.",
    href: "/glossary",
    accent: "purple",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const stats = [
  { value: "25+", label: "In-depth guides covering every step from pre-approval to keys", color: "from-[#0a7ea8]/30 to-[#0a7ea8]/10", accent: "text-[#5ec4e6]" },
  { value: "250+", label: "FAQ answers with verified source citations from CFPB, FBI & more", color: "from-[#2d6b3f]/30 to-[#2d6b3f]/10", accent: "text-[#6fcf97]" },
  { value: "200+", label: "Glossary terms with real-world closing examples you can save & print", color: "from-[#5b3a8c]/30 to-[#5b3a8c]/10", accent: "text-[#b794f4]" },
  { value: "4", label: "Interactive calculators — mortgage, affordability, closing costs & more", color: "from-[#8b6914]/30 to-[#8b6914]/10", accent: "text-[#f0d06e]" },
];

const steps = [
  { num: "1", title: "Get Pre-Approved", desc: "Understand your budget and lock in your financing options." },
  { num: "2", title: "Find Your Home", desc: "Work with a real estate agent to find the right property." },
  { num: "3", title: "Make an Offer", desc: "Submit your purchase proposal and negotiate terms." },
  { num: "4", title: "Order Title Search", desc: "A professional reviews public records for any claims on the property." },
  { num: "5", title: "Get Insurance", desc: "Secure homeowner's insurance and owner's title insurance." },
  { num: "6", title: "Close & Get Keys", desc: "Sign documents, transfer funds, and officially become a homeowner." },
];

const resources = [
  { name: "Consumer Financial Protection Bureau", desc: "Homeownership guides and settlement cost booklet", url: "https://www.consumerfinance.gov/owning-a-home/" },
  { name: "HUD Housing Counselor Locator", desc: "Find a HUD-approved housing counselor near you", url: "https://www.consumerfinance.gov/housing/" },
  { name: "Fannie Mae HomePath", desc: "Homebuyer education and resources", url: "https://www.homepath.com/" },
  { name: "Freddie Mac My Home", desc: "Tools and resources for homebuyers", url: "https://myhome.freddiemac.com/" },
  { name: "National Association of Realtors", desc: "Find a Realtor and market data", url: "https://www.nar.realtor/" },
  { name: "Appraisal Institute", desc: "Professional appraisal resources", url: "https://www.appraisalinstitute.org/" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-8 lg:py-14 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b33]/95 via-[#1a2744]/90 to-[#0a8ebc]/80" />
        {/* Radial glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-alta-teal/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full translate-y-1/3 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <span className="text-xs font-medium text-gray-200 uppercase tracking-wider">An ALTA Educational Initiative</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.08]">
                The Homebuyer&apos;s Guide to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Closing with Confidence</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-lg mb-4 leading-relaxed">
                Every year, millions of Americans buy a home — and most walk into the closing process with no idea what they&apos;re signing, what they&apos;re paying for, or how to protect themselves.
              </p>
              <p className="text-sm text-gray-400 max-w-lg mb-8 leading-relaxed">
                HomeClosing101 changes that. Built by the <strong className="text-white">American Land Title Association</strong>, this is your free, comprehensive, no-nonsense guide to understanding closing costs, protecting your property rights, avoiding wire fraud, and making informed decisions at every step — backed by verified data from the CFPB, FBI, NAR, and ALTA.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/first-time-buyers"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-alta-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg shadow-black/10"
                >
                  Start Here
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/closing-process/closing-checklist"
                  className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Closing Checklist
                </Link>
                <Link
                  href="/closing-process/closing-costs"
                  className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Cost Calculator
                </Link>
              </div>
            </div>

            {/* Right — key stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.value} className={`stat-card relative overflow-hidden backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:border-white/30 transition-all hover:scale-[1.03]`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}`} />
                  <div className="absolute inset-0 bg-white/5" />
                  <div className="relative">
                    <p className={`text-3xl lg:text-4xl font-bold mb-1.5 ${stat.accent}`}>{stat.value}</p>
                    <p className="text-xs text-gray-300 leading-snug">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters — the hook */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">Why Every Homebuyer Needs This</h2>
            <p className="text-alta-gray max-w-2xl mx-auto leading-relaxed">The closing process is the most consequential financial event most people will ever experience — yet it&apos;s the one they prepare for the least. Here&apos;s what the data says.</p>
          </div>

          {/* Compelling data points */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b33]/90 via-[#0f1b33]/60 to-transparent" />
              <div className="relative p-6 pt-28">
                <p className="text-3xl font-bold text-white mb-1">$13,357</p>
                <p className="text-sm text-gray-300 mb-2">Average closing costs on a $400K home</p>
                <p className="text-xs text-gray-400 leading-relaxed">Most buyers don&apos;t budget for this. Closing costs typically run 2-5% of the purchase price — on top of your down payment. That&apos;s thousands of dollars in fees many buyers don&apos;t see coming.</p>
                <p className="text-[10px] text-alta-teal mt-3 font-medium">Source: CFPB</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d1010]/90 via-[#3d1010]/60 to-transparent" />
              <div className="relative p-6 pt-28">
                <p className="text-3xl font-bold text-white mb-1">$275.1M</p>
                <p className="text-sm text-gray-300 mb-2">Lost to real estate wire fraud in 2025</p>
                <p className="text-xs text-gray-400 leading-relaxed">Criminals use AI, deepfakes, and hacked emails to intercept closing funds. The average victim loses their entire down payment — approximately $150,000. Recovery rates drop below 5% after 48 hours.</p>
                <p className="text-[10px] text-red-400 mt-3 font-medium">Source: FBI IC3 2024 Report</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md group">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e5530]/90 via-[#1e5530]/60 to-transparent" />
              <div className="relative p-6 pt-28">
                <p className="text-3xl font-bold text-white mb-1">1 in 3</p>
                <p className="text-sm text-gray-300 mb-2">Title searches find issues before closing</p>
                <p className="text-xs text-gray-400 leading-relaxed">Liens, errors, missing heirs, forged documents — title professionals catch problems in roughly one-third of transactions. Owner&apos;s title insurance protects you from what even the search can&apos;t find.</p>
                <p className="text-[10px] text-green-400 mt-3 font-medium">Source: ALTA</p>
              </div>
            </div>
          </div>

          {/* Pull quote */}
          <div className="p-6 bg-alta-light rounded-2xl border border-gray-100 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-alta-teal/10 flex items-center justify-center shrink-0 mt-1">
                <svg className="w-5 h-5 text-alta-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" /></svg>
              </div>
              <div>
                <p className="text-alta-navy leading-relaxed italic">&ldquo;The closing table is no place to learn what you&apos;re signing. Homebuyers who prepare — who understand their Loan Estimate, their Closing Disclosure, their title insurance, and their rights — save money, avoid scams, and close with confidence.&rdquo;</p>
                <p className="text-sm text-alta-gray mt-3 font-medium">— HomeClosing101 Mission</p>
              </div>
            </div>
          </div>

          {/* Animated market stats */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-alta-navy mb-2">The 2025 Housing Market at a Glance</h3>
            <p className="text-sm text-alta-gray">Real data from NAR, CFPB, Census Bureau, and FBI IC3.</p>
          </div>
          <MarketStats />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-14 lg:py-18 bg-alta-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">Everything You Need to Know</h2>
            <p className="text-alta-gray max-w-xl mx-auto">From understanding costs to protecting your investment — 25+ pages of deep, verified guides.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                data-accent={f.accent}
                className="feature-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Card image */}
                <div className="relative h-36 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${f.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="card-icon w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-alta-teal">
                      {f.icon}
                    </div>
                  </div>
                </div>
                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-alta-navy mb-2">{f.title}</h3>
                  <p className="text-sm text-alta-gray leading-relaxed">{f.description}</p>
                  <div className="mt-3 flex items-center text-sm font-medium text-alta-teal">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access tools */}
      <section className="py-8 bg-alta-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-alta-navy mb-2">Interactive Tools</h2>
            <p className="text-sm text-alta-gray">Calculators, checklists, and search tools to help you through every step.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { title: "Mortgage Calculator", desc: "Compare FHA, VA, Conventional & USDA with county tax rates", href: "/mortgage-calculator", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z", color: "from-[#1a5276] to-[#154463]" },
              { title: "Affordability", desc: "How much home can you afford? DTI gauge included", href: "/affordability", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25", color: "from-[#2d6b3f] to-[#235532]" },
              { title: "Closing Checklist", desc: "32-item interactive checklist with progress tracking", href: "/closing-process/closing-checklist", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-[#5b3a8c] to-[#482d70]" },
              { title: "Find a Company", desc: "Search ALTA member title companies by state & city", href: "/find-company", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z", color: "from-[#8b6914] to-[#705410]" },
            ].map((t) => (
              <Link key={t.title} href={t.href} className="group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white tile-interactive">
                <div className={`bg-gradient-to-r ${t.color} p-3 flex items-center gap-2`}>
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={t.icon} /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">{t.title}</h3>
                </div>
                <div className="p-3">
                  <p className="text-[11px] text-alta-gray leading-snug">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Where to start based on your situation */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-alta-navy mb-2">Where Should I Start?</h2>
            <p className="text-sm text-alta-gray">Choose your situation for a personalized starting point.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "First-Time Buyer", desc: "Complete guide from credit to keys", href: "/first-time-buyers", color: "from-[#0a7ea8] to-[#077a9e]", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
              { label: "Ready to Close", desc: "Checklist, documents & wire safety", href: "/closing-process/closing-checklist", color: "from-[#1a2744] to-[#0f1b33]", icon: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" },
              { label: "Shopping for a Lender", desc: "Compare loans & understand costs", href: "/mortgage-calculator", color: "from-[#2d6b3f] to-[#1e5530]", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
              { label: "Worried About Fraud", desc: "FBI prevention steps", href: "/stop-fraud", color: "from-[#943030] to-[#7a2020]", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" },
            ].map((s) => (
              <Link key={s.label} href={s.href} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white tile-interactive">
                <div className={`bg-gradient-to-r ${s.color} px-4 py-3 flex items-center gap-3`}>
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{s.label}</h3>
                    <p className="text-[10px] text-white/70 truncate">{s.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Overview */}
      <section className="py-10 lg:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-2">The Road to Homeownership</h2>
            <p className="text-sm text-alta-gray">Six key milestones from pre-approval to getting your keys.</p>
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.num} className={`relative flex gap-4 items-start ${i < steps.length - 1 ? "step-connector" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-alta-teal text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-alta-navy">{step.title}</h3>
                  <p className="text-sm text-alta-gray mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/closing-process/what-to-expect" className="inline-flex items-center text-alta-teal font-semibold hover:text-alta-teal-dark transition-colors">
              Detailed walkthrough of each step
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Wire Fraud Warning — expanded */}
      <section className="py-14 bg-red-50 border-y border-red-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-full mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alta-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-alta-red"></span>
                </span>
                <span className="text-xs font-semibold text-alta-red uppercase tracking-wider">Active Threat</span>
              </div>
              <h2 className="text-3xl font-bold text-alta-navy mb-3">Wire Fraud Is the #1 Threat to Homebuyers</h2>
              <p className="text-alta-gray mb-4 leading-relaxed">
                The FBI reported $275.1 million in real estate wire fraud losses in 2025 — a 59% increase from the prior year. Criminals use AI-generated emails, deepfakes, and hacked accounts to intercept your closing funds.
              </p>
              <p className="text-alta-navy font-semibold mb-6">
                NEVER wire money based solely on email instructions. Always verify by phone using a number you already have.
              </p>
              <Link href="/protect-your-money" className="inline-flex items-center px-6 py-3 bg-alta-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                Learn How to Protect Yourself
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "$275.1M", text: "Reported losses in 2025" },
                { num: "59%", text: "Year-over-year increase" },
                { num: "1 in 4", text: "Buyers received suspicious messages" },
                { num: "40%", text: "Rise in deepfake scams" },
              ].map((s) => (
                <div key={s.num} className="bg-white rounded-xl p-4 border border-red-100 text-center">
                  <p className="text-2xl font-bold text-alta-red">{s.num}</p>
                  <p className="text-xs text-alta-gray mt-1">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">Trusted Resources</h2>
            <p className="text-alta-gray max-w-xl mx-auto">Verified links to government agencies and industry organizations that support homebuyers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="feature-card bg-alta-light rounded-xl p-5 border border-gray-100"
                data-accent="teal"
              >
                <h3 className="text-sm font-semibold text-alta-navy mb-1">{r.name}</h3>
                <p className="text-xs text-alta-gray">{r.desc}</p>
                <div className="mt-3 flex items-center text-xs font-medium text-alta-teal">
                  Visit site
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Rotating sponsor logos */}
      <EliteProviders />

      {/* Full-width CTA */}
      <section className="relative py-6 lg:py-9 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947092-78b1e4f7e5a3?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b33]/95 via-[#1a2744]/90 to-[#0a8ebc]/85" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">Ready to Close with Confidence?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Use our interactive tools to track your progress, estimate your costs, and make sure nothing falls through the cracks.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/closing-process/closing-checklist" className="px-7 py-3.5 bg-white text-alta-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center">
                  Interactive Checklist
                </Link>
                <Link href="/closing-process/closing-costs" className="px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Cost Calculator
                </Link>
                <Link href="/find-company" className="px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center">
                  Find a Company
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/faq" className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors text-center">
                <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                <p className="text-white font-semibold text-sm">FAQ</p>
                <p className="text-gray-400 text-xs mt-0.5">Common questions</p>
              </Link>
              <Link href="/glossary" className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors text-center">
                <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                <p className="text-white font-semibold text-sm">Glossary</p>
                <p className="text-gray-400 text-xs mt-0.5">80+ terms</p>
              </Link>
              <Link href="/questions-to-ask" className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors text-center">
                <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                <p className="text-white font-semibold text-sm">Questions to Ask</p>
                <p className="text-gray-400 text-xs mt-0.5">40+ printable</p>
              </Link>
              <Link href="/stop-fraud" className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors text-center">
                <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                <p className="text-white font-semibold text-sm">Stop Fraud 101</p>
                <p className="text-gray-400 text-xs mt-0.5">10 prevention steps</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
