"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ─── Data ─── */

const first24Hours = [
  {
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
    title: "Change all locks immediately",
    desc: "Rekey or replace every exterior lock, including deadbolts, side doors, and the garage entry. Change the garage door code too. You have no way to know how many copies of the previous keys exist — former owners, contractors, neighbors, or prior tenants may all have copies.",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    title: "Locate circuit breaker, water shutoff, and gas shutoff",
    desc: "Walk through the house and find the main electrical panel, the water main shutoff valve (usually near the street or in the basement), and the gas shutoff valve. Label them clearly. In an emergency, you need to find these in seconds, not minutes.",
  },
  {
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    title: "Check smoke detectors and CO detectors",
    desc: "Test every smoke and carbon monoxide detector in the house. Replace batteries in all of them regardless of age. If any are more than 10 years old, replace the entire unit. Install detectors on every floor and in every bedroom if they are missing.",
  },
  {
    icon: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z",
    title: "Take photos of the empty house",
    desc: "Before you move a single piece of furniture in, photograph every room, ceiling, floor, wall, and fixture. Document the condition of appliances, countertops, and flooring. These photos serve as your insurance baseline and protect you if you ever need to file a claim.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Confirm utilities are in your name",
    desc: "Contact electric, gas, water, sewer, internet, and trash services. Confirm all accounts have been transferred to your name as of closing day. Do not assume the seller handled this. A gap in service could leave you without heat, water, or power on move-in day.",
  },
];

const firstWeek = [
  {
    title: "Set up mail forwarding with USPS",
    desc: "Submit a change of address at usps.com or your local post office. USPS mail forwarding takes approximately 7-10 business days to take effect, so do this immediately. First-class mail is forwarded for 12 months; periodicals for 60 days.",
  },
  {
    title: "Update your address everywhere",
    desc: "Notify your bank, employer, DMV (required in most states within 30 days), health insurance, auto insurance, homeowner's insurance, credit card companies, subscriptions, Amazon, pharmacy, doctors, dentist, voter registration, and the IRS (if filing soon).",
  },
  {
    title: "Deep clean before moving furniture in",
    desc: "This is the easiest time to do a thorough cleaning — when the house is empty. Clean carpets, sanitize bathrooms and kitchen, wipe all cabinets inside and out, and check for pests. Consider a professional deep clean ($200-$400 for an average home).",
  },
  {
    title: "File homestead exemption",
    desc: "If this is your primary residence, file a homestead exemption with your county assessor's office. This reduces your property tax assessment in most states and may also provide creditor protection. Deadlines vary by state — some require filing before January 1 of the tax year, others within a year of purchase. Check your county assessor's website immediately.",
  },
  {
    title: "Store closing documents securely",
    desc: "Place all original closing documents in a fireproof, waterproof safe or safe deposit box. Scan every document and store digital copies in cloud storage (Google Drive, iCloud, Dropbox). You will need these for tax filing, refinancing, insurance claims, and if you ever sell the property.",
  },
];

const firstMonth = [
  {
    title: "Start building an emergency fund",
    desc: "Financial advisors recommend 3-6 months of mortgage payments (including taxes, insurance, and HOA) set aside in a savings account. A burst pipe, failed HVAC system, or roof leak does not wait for a convenient time. Start with $1,000 and build from there.",
  },
  {
    title: "Create a home maintenance binder",
    desc: "Organize all warranties, appliance manuals, contractor contact information, paint colors, and maintenance records in a physical binder or digital folder. Note the age and model of every major system: HVAC, water heater, roof, and appliances. This saves hours when something breaks.",
  },
  {
    title: "Get to know your home systems",
    desc: "Learn your HVAC filter size and replacement schedule (every 1-3 months), water heater age and type, how to reset the garbage disposal, which circuits control which rooms, and where cleanouts are for your plumbing. Your home inspection report is a great reference for this.",
  },
  {
    title: "Meet your neighbors",
    desc: "Introduce yourself to immediate neighbors. They are your first line of defense for package theft, suspicious activity, and local knowledge. Ask about neighborhood norms, trash day schedules, HOA rules in practice, and which local contractors they trust.",
  },
  {
    title: "Review your homeowner's insurance coverage",
    desc: "Now that you are in the house, assess whether your coverage matches your actual belongings. Standard policies do not cover floods, earthquakes, or sewer backups. Consider an umbrella policy if your assets exceed your liability limits. Document high-value items (jewelry, electronics, art) with photos and receipts.",
  },
];

const seasonalChecklist = [
  {
    season: "Spring",
    color: "bg-green-100 dark:bg-green-900/30 text-green-700",
    borderColor: "border-green-200 dark:border-green-800",
    tasks: [
      "Clean gutters and downspouts",
      "Service A/C unit before summer (replace filter, clear debris around outdoor unit)",
      "Inspect roof for winter damage",
      "Check grading around foundation — soil should slope away from house",
      "Test sump pump if applicable",
      "Power-wash exterior siding, deck, and walkways",
    ],
  },
  {
    season: "Summer",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700",
    borderColor: "border-amber-200 dark:border-amber-800",
    tasks: [
      "Inspect and seal deck or patio",
      "Check caulking around windows and doors",
      "Trim trees and bushes away from the house (6+ inches clearance)",
      "Inspect exterior paint for peeling or damage",
      "Clean dryer vent duct",
      "Test garage door auto-reverse safety feature",
    ],
  },
  {
    season: "Fall",
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700",
    borderColor: "border-orange-200 dark:border-orange-800",
    tasks: [
      "Schedule furnace inspection and tune-up",
      "Clean gutters again after leaves fall",
      "Weatherize: caulk gaps, add weatherstripping, insulate exposed pipes",
      "Reverse ceiling fan direction (clockwise in winter pushes warm air down)",
      "Test smoke and CO detectors, replace batteries",
      "Drain and store garden hoses, shut off exterior faucets",
    ],
  },
  {
    season: "Winter",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700",
    borderColor: "border-blue-200 dark:border-blue-800",
    tasks: [
      "Prevent frozen pipes: keep cabinet doors open, let faucets drip in extreme cold",
      "Monitor ice dams on roof — clear snow from edges if safe to do so",
      "Check attic insulation and ventilation",
      "Replace HVAC filter monthly during heavy heating season",
      "Inspect fireplace and chimney before first use each year",
      "Keep walkways and driveways clear of ice (liability risk)",
    ],
  },
];

const documentsToKeep = [
  { name: "Deed", why: "Proves you own the property. Recorded with your county — keep your copy." },
  { name: "Title insurance policy", why: "Protects you (and your heirs) for as long as you own the home. No expiration." },
  { name: "Survey / plat map", why: "Shows your exact property boundaries. Essential for fence disputes, additions, or resale." },
  { name: "Closing Disclosure", why: "Final accounting of every dollar in your transaction. Needed for taxes and any future disputes." },
  { name: "Home inspection report", why: "Documents the condition of the home at purchase. Useful for insurance claims and maintenance planning." },
  { name: "Warranties", why: "Appliance warranties, home warranty (if purchased), and any seller-provided repair warranties." },
  { name: "Homeowner's insurance policy", why: "Your current and all past policies — claims can be filed for events that occurred during a prior policy period." },
  { name: "Loan documents", why: "Promissory note, deed of trust, and any modification agreements. Keep for the life of the loan plus 7 years." },
];

const hiddenCosts = [
  { label: "Property taxes", range: "$2,500 - $8,000+/yr", note: "Varies dramatically by state and county" },
  { label: "Homeowner's insurance", range: "$1,200 - $3,500+/yr", note: "Higher in disaster-prone areas" },
  { label: "Maintenance & repairs", range: "$3,000 - $7,000+/yr", note: "Budget 1-2% of home value annually" },
  { label: "HOA fees", range: "$0 - $500+/mo", note: "Not all homes have an HOA" },
  { label: "Utilities", range: "$200 - $500+/mo", note: "Often higher than renting" },
  { label: "Major repairs reserve", range: "Save $2,000 - $5,000/yr", note: "Roof, HVAC, water heater, appliances" },
];

/* ─── Page ─── */

export default function AfterClosingPage() {
  return (
    <>
      <PageHero
        title="After Closing: Your New Homeowner Checklist"
        subtitle="Congratulations — you own a home. Now what? This comprehensive guide covers everything you need to do in the first 24 hours, first week, first month, and first year to protect your investment and avoid costly surprises."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "Closing Day Prep", href: "/closing-day-prep" },
          { label: "After Closing", href: "/after-closing" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Print + Save bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6 no-print">
            <PrintButton label="Print This Checklist" />
            <SaveToFolderBtn
              type="checklist"
              title="After Closing: New Homeowner Checklist"
              content="Complete post-closing checklist covering first 24 hours, first week, first month, and first year of homeownership."
            />
          </div>

          {/* Print-only header */}
          <div className="hidden print:block mb-6">
            <h1 className="text-2xl font-bold text-gray-900">After Closing: New Homeowner Checklist</h1>
            <p className="text-sm text-gray-600 mt-1">HomeClosing101.com — Your complete post-closing guide</p>
            <div className="mt-2 h-0.5 bg-gray-300" />
          </div>

          {/* ─── SECTION 1: First 24 Hours ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">First 24 Hours</h2>
                <p className="text-sm text-alta-gray">Do these before you unpack a single box. Safety and security come first.</p>
              </div>
            </div>

            <div className="space-y-4 print:space-y-2">
              {first24Hours.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 print:gap-2 p-4 print:p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 print:border-gray-300 print:rounded-none"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0 print:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="hidden print:inline text-sm">&#9744;</span>
                      <h3 className="font-semibold text-alta-navy text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-alta-gray mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECTION 2: First Week ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">First Week</h2>
                <p className="text-sm text-alta-gray">Administrative tasks that protect your finances and establish your new address.</p>
              </div>
            </div>

            <div className="space-y-4 print:space-y-2">
              {firstWeek.map((item, i) => (
                <div
                  key={item.title}
                  className="flex gap-4 print:gap-2 p-4 print:p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 print:border-gray-300 print:rounded-none"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0 print:bg-transparent print:border print:border-gray-400">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="hidden print:inline text-sm">&#9744;</span>
                      <h3 className="font-semibold text-alta-navy text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-alta-gray mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineAd />

          {/* ─── SECTION 3: First Month ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">First Month</h2>
                <p className="text-sm text-alta-gray">Set yourself up for long-term success with these foundational steps.</p>
              </div>
            </div>

            <div className="space-y-4 print:space-y-2">
              {firstMonth.map((item, i) => (
                <div
                  key={item.title}
                  className="flex gap-4 print:gap-2 p-4 print:p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 print:border-gray-300 print:rounded-none"
                >
                  <div className="w-8 h-8 rounded-full bg-alta-teal/10 flex items-center justify-center text-alta-teal font-bold text-sm shrink-0 print:bg-transparent print:border print:border-gray-400">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="hidden print:inline text-sm">&#9744;</span>
                      <h3 className="font-semibold text-alta-navy text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-alta-gray mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECTION 4: First Year — Seasonal Maintenance ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">First Year: Seasonal Maintenance Checklist</h2>
                <p className="text-sm text-alta-gray">Budget 1-2% of your home&apos;s value annually for maintenance. On a $350,000 home, that is $3,500-$7,000 per year.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 print:gap-2">
              {seasonalChecklist.map((s) => (
                <div
                  key={s.season}
                  className={`p-4 print:p-2 rounded-xl border ${s.borderColor} bg-white dark:bg-slate-800 print:border-gray-300 print:rounded-none`}
                >
                  <h3 className={`inline-block px-2.5 py-1 rounded-lg text-sm font-bold mb-3 ${s.color}`}>
                    {s.season}
                  </h3>
                  <ul className="space-y-1.5">
                    {s.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm text-alta-gray">
                        <span className="hidden print:inline">&#9744;</span>
                        <svg className="w-3.5 h-3.5 text-alta-teal shrink-0 mt-0.5 print:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <InlineAd />

          {/* ─── SECTION 5: Documents to Keep Forever ─── */}
          <section className="mb-10 print:mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0 print:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-alta-navy">Documents to Keep Forever</h2>
                <p className="text-sm text-alta-gray">Store originals in a fireproof safe. Scan copies to cloud storage. Never throw these away.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 print:gap-2">
              {documentsToKeep.map((doc) => (
                <div
                  key={doc.name}
                  className="p-3 print:p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 print:border-gray-300 print:rounded-none"
                >
                  <h3 className="font-semibold text-alta-navy text-sm">{doc.name}</h3>
                  <p className="text-sm text-alta-gray mt-1 leading-relaxed">{doc.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECTION 6: Hidden Costs Callout ─── */}
          <section className="mb-10 print:mb-6 print:break-inside-avoid">
            <div className="p-5 print:p-3 bg-amber-50 dark:bg-amber-950/20 rounded-2xl print:rounded-none border border-amber-200 dark:border-amber-800 border-l-4 border-l-amber-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 print:hidden">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="w-full">
                  <h2 className="font-bold text-amber-800 dark:text-amber-400 text-base mb-1">The Hidden Costs of Homeownership</h2>
                  <p className="text-sm text-alta-gray leading-relaxed mb-4">
                    The average U.S. homeowner spends approximately <strong className="text-alta-navy">$18,118 per year</strong> on hidden costs beyond their mortgage payment, according to Bankrate&apos;s 2025 analysis. These costs include property taxes, insurance, maintenance, utilities, and HOA fees. Knowing what to expect prevents financial shock.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {hiddenCosts.map((cost) => (
                      <div key={cost.label} className="flex items-start gap-2 text-xs">
                        <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-semibold text-alta-navy">{cost.label}:</span>{" "}
                          <span className="text-alta-gray">{cost.range}</span>
                          <span className="text-alta-gray block">{cost.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-alta-gray mt-3">Source: Bankrate &mdash; &ldquo;Hidden costs of homeownership&rdquo; (2025 analysis). Actual costs vary significantly by location, home age, and property value.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Related Topics ─── */}
          <section className="mb-10 no-print">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: "Closing Day Prep", desc: "What to bring, what to expect, and the full signing timeline", href: "/closing-day-prep" },
                { title: "Homeowner's Insurance", desc: "Coverage types, state directory, and how to file a claim", href: "/homeowners-insurance" },
                { title: "Protect Your Rights", desc: "Your legal rights as a homeowner and how title insurance protects you", href: "/protect-your-rights" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 hover:border-alta-teal transition-colors group"
                >
                  <h3 className="font-semibold text-alta-navy text-sm group-hover:text-alta-teal transition-colors">{link.title}</h3>
                  <p className="text-sm text-alta-gray mt-1">{link.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="no-print">
            <FirstTimeBuyerCTA />
          </div>
        </div>
      </div>
    </>
  );
}
