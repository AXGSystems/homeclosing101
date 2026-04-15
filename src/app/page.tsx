import Link from "next/link";
import EliteProviders, { InlineAd } from "@/components/EliteProviders";
import MarketStats from "@/components/MarketStats";
import AnimatedCounter from "@/components/AnimatedCounter";
import HomepageTestimonials from "@/components/HomepageTestimonials";
import QuickEstimate from "@/components/QuickEstimate";

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
  { value: "30+", end: 30, suffix: "+", label: "In-depth guides covering every step from pre-approval to keys", color: "from-[#0a7ea8]/30 to-[#0a7ea8]/10", accent: "text-[#5ec4e6]",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg> },
  { value: "250+", end: 250, suffix: "+", label: "FAQ answers with verified source citations from CFPB, FBI & more", color: "from-[#2d6b3f]/30 to-[#2d6b3f]/10", accent: "text-[#6fcf97]",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg> },
  { value: "450+", end: 450, suffix: "+", label: "Glossary terms with real-world closing examples you can save & print", color: "from-[#5b3a8c]/30 to-[#5b3a8c]/10", accent: "text-[#b794f4]",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg> },
  { value: "4", end: 4, suffix: "", label: "Interactive calculators — mortgage, affordability, closing costs & more", color: "from-[#8b6914]/30 to-[#8b6914]/10", accent: "text-[#f0d06e]",
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" /></svg> },
];

const steps = [
  { num: "1", title: "Get Your Finances Ready", desc: "Check your credit, pay down debts, save for your down payment and closing costs.", bg: "bg-[#e8f0f5]", borderColor: "border-[#1a5276]" },
  { num: "2", title: "Get Pre-Approved", desc: "Compare lenders, learn your loan options, and lock in financing.", bg: "bg-[#e9f5ed]", borderColor: "border-[#2d6b3f]" },
  { num: "3", title: "Find a Property", desc: "Work with a real estate agent to find the right home.", bg: "bg-[#f0ecf6]", borderColor: "border-[#5b3a8c]" },
  { num: "4", title: "Make an Offer", desc: "Submit your purchase proposal and negotiate terms.", bg: "bg-[#faf4e4]", borderColor: "border-[#8b6914]" },
  { num: "5", title: "Sign the Purchase Agreement", desc: "Formalize the deal with a binding contract.", bg: "bg-[#e8f0f5]", borderColor: "border-[#1a5276]" },
  { num: "6", title: "Get Funding", desc: "Finalize your mortgage through underwriting and appraisal.", bg: "bg-[#e9f5ed]", borderColor: "border-[#2d6b3f]" },
  { num: "7", title: "Get Insurance", desc: "Secure homeowner's insurance and owner's title insurance.", bg: "bg-[#e6f1f5]", borderColor: "border-[#0a7ea8]" },
  { num: "8", title: "Close & Get Your Keys", desc: "Sign documents, transfer funds, and officially become a homeowner.", keys: true, bg: "bg-[#faf4e4]", borderColor: "border-[#d4a843]" },
];

const resourceColors = ["#1a5276", "#2d6b3f", "#5b3a8c", "#8b6914", "#943030", "#0a7ea8"];
const resourceBgs = ["bg-[#e8f0f5] border-[#c5d8e4]", "bg-[#e9f5ed] border-[#bddcc7]", "bg-[#f0ecf6] border-[#d4c8e4]", "bg-[#faf4e4] border-[#e8d9a8]", "bg-[#f5e8e8] border-[#e4c5c5]", "bg-[#e6f1f5] border-[#c0dbe6]"];
const resources = [
  { name: "American Land Title Association (ALTA)", desc: "The national trade organization for the title insurance industry — best practices, advocacy, and consumer protection", url: "https://www.alta.org/", logo: "/logos/alta.svg", halo: "#0a8ebc" },
  { name: "Consumer Financial Protection Bureau", desc: "Homeownership guides, settlement cost booklet, and complaint filing", url: "https://www.consumerfinance.gov/owning-a-home/", logo: "/logos/cfpb.svg", halo: "#20aa3f" },
  { name: "HUD Housing Counselor Locator", desc: "Find a HUD-approved housing counselor near you — free guidance", url: "https://www.consumerfinance.gov/housing/", logo: "/logos/hud.svg", halo: "#003A70" },
  { name: "FBI Internet Crime Complaint Center", desc: "Report wire fraud and internet crimes — real estate fraud prevention resources", url: "https://www.ic3.gov/", logo: "/logos/fbi-ic3.png", halo: "#002868" },
  { name: "Fannie Mae HomePath", desc: "Free homebuyer education course with certificate of completion", url: "https://www.homepath.com/", logo: "/logos/fanniemae.png", halo: "#003DA5" },
  { name: "Freddie Mac My Home", desc: "Tools, calculators, and educational resources for homebuyers", url: "https://myhome.freddiemac.com/", logo: "/logos/freddiemac.png", halo: "#00703C" },
  { name: "National Association of Realtors", desc: "Find a Realtor, market data, and consumer guides", url: "https://www.nar.realtor/", logo: "/logos/nar.svg", halo: "#006BB6" },

  { name: "Appraisal Institute", desc: "Professional appraisal resources and find-an-appraiser tool", url: "https://www.appraisalinstitute.org/", logo: "/logos/appraisal-institute.svg", halo: "#1B3A5C" },
  { name: "National Assoc. of Insurance Commissioners", desc: "State insurance regulator directory and consumer complaint resources", url: "https://content.naic.org/", logo: "/logos/naic.svg", halo: "#003366" },
  { name: "Federal Housing Finance Agency", desc: "Conforming loan limits, housing data, and GSE oversight", url: "https://www.fhfa.gov/", logo: "/logos/fhfa-mark.svg", halo: "#003A70" },
  { name: "IRS Homeowner Tax Benefits", desc: "Mortgage interest deduction, property tax deduction, and capital gains exclusion guides", url: "https://www.irs.gov/publications/p530", logo: "/logos/irs-mark.svg", halo: "#003366" },
  { name: "FEMA Flood Map Service Center", desc: "Check if your property is in a flood zone — affects insurance requirements", url: "https://msc.fema.gov/", logo: "/logos/fema.svg", halo: "#003366" },
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

              {/* Popular Right Now */}
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">Popular right now</p>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 px-1 -mx-1">
                  {[
                    { label: "Wire Fraud Guide", href: "/stop-fraud", hot: true },
                    { label: "Mortgage Calculator", href: "/mortgage-calculator" },
                    { label: "First-Time Buyers", href: "/first-time-buyers" },
                    { label: "HC101 Trivia", href: "/trivia" },
                    { label: "Closing Checklist", href: "/closing-process/closing-checklist" },
                  ].map((item: { label: string; href: string; hot?: boolean }) => (
                    <Link key={item.href} href={item.href} className="shrink-0 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white font-medium hover:bg-white/20 transition-colors border border-white/10">
                      {item.hot && <span className="text-[#943030] mr-1">●</span>}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Estimate — desktop only */}
              <QuickEstimate />
            </div>

            {/* Right — key stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.value} className={`stat-card relative overflow-hidden backdrop-blur-md rounded-xl p-5 border border-white/20 hover:border-white/40 transition-all hover:scale-[1.03] shadow-lg shadow-black/10`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}`} />
                  <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-sm" />
                  <div className="relative text-center">
                    <div className={`${stat.accent} mb-2 flex justify-center`}>{stat.icon}</div>
                    <p className={`text-3xl lg:text-4xl font-bold mb-1.5 ${stat.accent}`}>
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={1800} />
                    </p>
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
            <h2 className="text-3xl font-bold text-alta-navy mb-3">The Importance of Homebuyer Education</h2>
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
                <p className="text-[10px] text-red-400 mt-3 font-medium">Source: FBI IC3 2025 Report</p>
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

      {/* How HomeClosing101 Helps */}
      <section className="py-14 lg:py-18 bg-gradient-to-b from-[#f0f4f8] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">How HomeClosing101 Helps</h2>
            <p className="text-alta-gray max-w-xl mx-auto">Three pillars that guide every homebuyer from first search to final signature.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Learn */}
            <Link href="/closing-process" className="group relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0a7ea8]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0a7ea8]/20 transition-colors">
                <svg className="w-8 h-8 text-[#0a7ea8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
              </div>
              <h3 className="text-xl font-bold text-alta-navy mb-2">Learn</h3>
              <p className="text-sm text-alta-gray leading-relaxed">30+ in-depth guides covering every step of the closing process, title insurance, and homebuyer rights.</p>
              <span className="inline-flex items-center text-sm font-medium text-[#0a7ea8] mt-4 group-hover:gap-2 transition-all">
                Explore guides
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
            {/* Calculate */}
            <Link href="/closing-process/closing-costs" className="group relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#8b6914]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#8b6914]/20 transition-colors">
                <svg className="w-8 h-8 text-[#8b6914]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-alta-navy mb-2">Calculate</h3>
              <p className="text-sm text-alta-gray leading-relaxed">Interactive mortgage, affordability, and closing cost calculators so you know exactly what to budget.</p>
              <span className="inline-flex items-center text-sm font-medium text-[#8b6914] mt-4 group-hover:gap-2 transition-all">
                Run the numbers
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
            {/* Protect */}
            <Link href="/protect-your-money" className="group relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#943030]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#943030]/20 transition-colors">
                <svg className="w-8 h-8 text-[#943030]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-alta-navy mb-2">Protect</h3>
              <p className="text-sm text-alta-gray leading-relaxed">Wire fraud prevention, title insurance guides, and safeguards to defend your investment and your money.</p>
              <span className="inline-flex items-center text-sm font-medium text-[#943030] mt-4 group-hover:gap-2 transition-all">
                Stay protected
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-[#0a7ea8] via-[#5b3a8c] to-[#d4a843]" />

      {/* Feature Cards */}
      <section className="py-14 lg:py-18 bg-alta-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">Your Journey Consolidated</h2>
            <p className="text-alta-gray max-w-xl mx-auto">From understanding costs to protecting your investment — 25+ pages of deep, verified guides.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                data-accent={f.accent}
                className="feature-card group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
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

      {/* Ad between features and roadmap */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4"><InlineAd /></div>

      {/* The Road to Homeownership — street with houses */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-[#e8f4ec] to-[#dceef5] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">The Road to Homeownership</h2>
            <p className="text-alta-gray max-w-lg mx-auto">Eight key milestones from getting your finances ready to getting the keys.</p>
          </div>

          {/* Road */}
          <div className="relative">
            {/* The road surface */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16 sm:h-20 bg-[#4a4a4a] rounded-full hidden md:block" />
            {/* Yellow center dashes */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 hidden md:flex items-center justify-between">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-8 h-1 bg-[#f0c030] rounded-full" />
              ))}
            </div>
            {/* White edge lines */}
            <div className="absolute left-2 right-2 top-1/2 -translate-y-[calc(50%+28px)] h-0.5 bg-white/80 rounded-full hidden md:block" />
            <div className="absolute left-2 right-2 top-1/2 translate-y-[calc(-50%+28px)] h-0.5 bg-white/80 rounded-full hidden md:block" />

            {/* Houses along the road */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-2">
              {steps.map((step: { num: string; title: string; desc: string; keys?: boolean; bg: string; borderColor: string }, i: number) => (
                <div key={step.num} className={`flex flex-col items-center ${i % 2 === 0 ? 'md:-translate-y-16' : 'md:translate-y-16'}`}>
                  {/* House shape */}
                  <div className={`relative w-full max-w-[140px] group`}>
                    {/* Roof */}
                    <div className={`relative mx-auto w-0 h-0 border-l-[60px] border-r-[60px] border-b-[30px] ${step.keys ? 'border-b-[#d4a843]' : 'border-b-[#1a5276]'} border-l-transparent border-r-transparent`} />
                    {/* House body */}
                    <div className={`${step.bg} border-2 ${step.borderColor} rounded-b-lg p-3 text-center shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all`}>
                      {/* Step number */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-white text-xs font-bold ${step.keys ? 'bg-[#d4a843]' : 'bg-alta-teal'}`}>
                        {step.keys ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
                        ) : step.num}
                      </div>
                      <h3 className={`font-bold text-xs leading-tight ${step.keys ? 'text-[#d4a843]' : 'text-alta-navy'}`}>{step.title}</h3>
                      <p className="text-[10px] text-alta-gray mt-1 leading-snug hidden sm:block">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/closing-process/what-to-expect" className="inline-flex items-center px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-[#077a9e] transition-colors shadow-md">
              Detailed Walkthrough of Each Step
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-[#1a5276] via-[#0a7ea8] to-[#2d6b3f]" />

      {/* Where to start — large photo-backed cards */}
      <section className="py-10 bg-alta-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-2">Where Should I Start?</h2>
            <p className="text-sm text-alta-gray">Choose your situation — we&apos;ll point you to the right guide.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "First-Time Buyer", desc: "Complete 27-step timeline from building credit to getting the keys — with expandable deep dives on every step.", href: "/first-time-buyers", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", color: "from-[#0a7ea8] to-[#077a9e]" },
              { label: "Ready to Close", desc: "Interactive checklist, document guide, wire fraud prevention, and everything you need for closing day.", href: "/closing-process/closing-checklist", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", color: "from-[#1a2744] to-[#0f1b33]" },
              { label: "Shopping for a Lender", desc: "Compare 4 loan types side-by-side, estimate closing costs, and learn how to read your Loan Estimate like a pro.", href: "/mortgage-calculator", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", color: "from-[#2d6b3f] to-[#1e5530]" },
              { label: "Worried About Fraud", desc: "How wire fraud works, the 5 safeguards, and exactly what to do if you suspect you're being targeted.", href: "/protect-your-money", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80", color: "from-[#943030] to-[#7a2020]" },
            ].map((s) => (
              <Link key={s.label} href={s.href} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all h-48">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${s.image}')` }} />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-80 group-hover:opacity-70 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow">{s.label}</h3>
                  <p className="text-xs text-white/80 leading-relaxed">{s.desc}</p>
                  <span className="text-xs text-white/60 mt-2 flex items-center gap-1 group-hover:text-white transition-colors font-medium">
                    Start here
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Title Insurance? — ALTA core product callout */}
      <section className="py-14 lg:py-18 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a5276 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#2d6b3f]/10 px-4 py-1.5 rounded-full mb-4">
              <svg className="w-4 h-4 text-[#2d6b3f]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              <span className="text-xs font-semibold text-[#2d6b3f] uppercase tracking-wider">Protect Your Investment</span>
            </div>
            <h2 className="text-3xl font-bold text-alta-navy mb-3">Why Title Insurance Matters</h2>
            <p className="text-alta-gray max-w-2xl mx-auto leading-relaxed">Your home is likely the biggest purchase you will ever make. Title insurance is a one-time cost that protects your ownership rights for as long as you own the property.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { title: "What It Covers", desc: "Forgery, undisclosed heirs, recording errors, liens, encroachments, and other defects that could threaten your ownership.", color: "#2d6b3f", bg: "bg-[#e9f5ed]", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
              { title: "One-Time Premium", desc: "Unlike other insurance, you pay once at closing. No monthly premiums, no annual renewals. Protection lasts as long as you or your heirs own the property.", color: "#0a7ea8", bg: "bg-[#e6f1f5]", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" },
              { title: "Owner's vs. Lender's", desc: "Your lender requires a policy to protect their loan — but only an owner's policy protects you. It is optional, but strongly recommended by ALTA and the CFPB.", color: "#5b3a8c", bg: "bg-[#f0ecf6]", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
            ].map((item) => (
              <div key={item.title} className={`${item.bg} rounded-2xl p-6 border border-transparent hover:border-[${item.color}]/20 transition-all hover:shadow-md`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${item.color}15` }}>
                  <svg className="w-6 h-6" style={{ color: item.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                </div>
                <h3 className="text-lg font-semibold text-alta-navy mb-2">{item.title}</h3>
                <p className="text-sm text-alta-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/protect-your-rights" className="inline-flex items-center px-7 py-3.5 bg-[#2d6b3f] text-white font-semibold rounded-lg hover:bg-[#245a34] transition-colors shadow-md">
              Learn About Title Insurance
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-[#2d6b3f] via-[#0a7ea8] to-[#943030]" />

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
                { num: "22%", text: "Buyers received fraudulent messages" },
                { num: "40%", text: "Rise in deepfake scams" },
              ].map((s) => (
                <div key={s.num} className="bg-white rounded-xl p-4 border border-red-100 text-center tile-interactive">
                  <p className="text-2xl font-bold text-alta-red">{s.num}</p>
                  <p className="text-xs text-alta-gray mt-1">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad between fraud warning and resources */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4"><InlineAd /></div>

      {/* Testimonials */}
      <HomepageTestimonials />

      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-[#943030] via-[#d4a843] to-[#1a5276]" />

      {/* External Resources */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-alta-navy mb-3">Trusted Resources</h2>
            <p className="text-alta-gray max-w-xl mx-auto">Verified links to government agencies and industry organizations that support homebuyers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resources.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card group rounded-2xl bg-white border-2 border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ ['--halo-color' as string]: r.halo }}
              >
                {/* Large logo at top */}
                <div className="flex items-center justify-center pt-8 pb-6 px-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.logo} alt={r.name} className="max-h-16 max-w-[90%] object-contain" loading="lazy" />
                </div>
                {/* Thin accent line */}
                <div className="mx-5 h-0.5 rounded-full opacity-25" style={{ backgroundColor: r.halo }} />
                {/* Content */}
                <div className="px-5 pt-3 pb-5">
                  <h3 className="text-[13px] font-bold text-alta-navy mb-1.5 leading-tight transition-colors" style={{ transitionDuration: '200ms' }}>{r.name}</h3>
                  <p className="text-[11px] text-alta-gray leading-relaxed mb-3">{r.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: r.halo }}>
                    Visit site
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools — dark horizontal strip */}
      <section className="py-8 bg-gradient-to-r from-[#0f1b33] to-[#1a2744]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Tools</h2>
              <p className="text-xs text-gray-400">Run the numbers. Track your progress. Find your team.</p>
            </div>
            <Link href="/resources" className="text-xs text-alta-teal font-medium flex items-center gap-1 hover:text-white transition-colors shrink-0">
              View all tools
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { title: "Mortgage Calculator", href: "/mortgage-calculator", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" },
              { title: "Affordability", href: "/affordability", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
              { title: "Closing Checklist", href: "/closing-process/closing-checklist", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Find a Company", href: "/find-company", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
              { title: "HC101 Trivia", href: "/trivia", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z", isNew: true },
              { title: "My Journey", href: "/my-journey", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", isNew: true },
              { title: "Rent vs Buy", href: "/rent-vs-buy", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5", isNew: true },
            ].map((t: { title: string; href: string; icon: string; isNew?: boolean }) => (
              <Link key={t.title} href={t.href} className="group flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-alta-teal/20 flex items-center justify-center shrink-0 group-hover:bg-alta-teal transition-colors">
                  <svg className="w-5 h-5 text-alta-teal group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={t.icon} /></svg>
                </div>
                <span className="text-sm font-medium text-white">{t.title}</span>
                {t.isNew && <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-alta-teal text-white rounded-full">New</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rotating sponsor logos */}
      <EliteProviders />

      {/* Full-width CTA */}
      <section className="relative py-10 lg:py-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947092-78b1e4f7e5a3?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b33]/97 via-[#1a2744]/93 to-[#0a7ea8]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(90,58,140,0.15),transparent_60%)]" />
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
