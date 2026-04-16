"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface TaxSection {
  id: string;
  icon: string;
  title: string;
  color: string;
  borderColor: string;
  bgColor: string;
  bullets: string[];
  tip?: string;
  source?: string;
}

const sections: TaxSection[] = [
  {
    id: "mortgage-interest",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
    title: "Mortgage Interest Deduction",
    color: "text-[#1a5276]",
    borderColor: "border-l-[#1a5276]",
    bgColor: "bg-[#eaf2f8]",
    bullets: [
      "Deduct interest on up to $750,000 of mortgage debt (homes purchased after 12/15/2017). For mortgages taken out before that date, the limit is $1,000,000.",
      "You must itemize deductions on Schedule A — this benefit does not apply if you take the standard deduction.",
      "Your lender sends you Form 1098 each January showing the total interest you paid during the prior year.",
      "Example: A $350,000 mortgage at 6.5% generates roughly $22,750 in deductible interest in Year 1.",
    ],
    tip: "Keep your Form 1098 with your tax records. If you refinance mid-year, you may receive two 1098s — one from each lender.",
    source: "IRS Publication 936 — Home Mortgage Interest Deduction",
  },
  {
    id: "property-tax",
    icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
    title: "Property Tax Deduction",
    color: "text-[#2d6b3f]",
    borderColor: "border-l-[#2d6b3f]",
    bgColor: "bg-[#e9f5ed]",
    bullets: [
      "Deduct up to $10,000 in state and local taxes (the SALT cap). This $10,000 limit includes property tax plus state/local income tax (or sales tax) combined.",
      "You can find the amount on Form 1098 (Box 10) or on your county property tax bill.",
      "If you paid property taxes at closing (see your Closing Disclosure, page 2), those amounts count toward your deduction in that tax year.",
    ],
    tip: "The $10,000 SALT cap ($5,000 if married filing separately) was established by the Tax Cuts and Jobs Act of 2017. The cap was scheduled to expire after 2025 — check with a tax professional for the latest status on any legislative changes.",
    source: "IRS Topic No. 503 — Deductible Taxes; 26 U.S.C. \u00A7164",
  },
  {
    id: "points",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z",
    title: "Points Deduction",
    color: "text-[#5b3a8c]",
    borderColor: "border-l-[#5b3a8c]",
    bgColor: "bg-[#f0ecf6]",
    bullets: [
      "Mortgage points (also called discount points or prepaid interest) paid at closing may be fully deductible in the year of purchase.",
      "1 point = 1% of the loan amount. Example: 1 point on a $350,000 loan = $3,500.",
      "To deduct points in full the year they are paid, the loan must be for your primary residence, and paying points must be an established practice in your area.",
      "If you refinance, points are generally deducted over the life of the new loan (amortized), not all at once.",
    ],
    tip: "Points paid by the seller on your behalf are also deductible by you (the buyer). Check your Closing Disclosure for \"Discount Points\" on page 2.",
    source: "IRS Publication 936 — Points",
  },
  {
    id: "home-office",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Home Office Deduction",
    color: "text-[#8b6914]",
    borderColor: "border-l-[#8b6914]",
    bgColor: "bg-[#faf4e4]",
    bullets: [
      "Available only to self-employed taxpayers (W-2 employees cannot claim this). The space must be used regularly and exclusively for business.",
      "Simplified method: $5 per square foot, up to 300 sq ft = maximum $1,500 deduction.",
      "Regular method: Calculate the percentage of your home used for business and deduct that percentage of eligible home expenses (mortgage interest, property tax, utilities, insurance, repairs, depreciation).",
      "You can switch between methods each year — pick whichever gives you a larger deduction.",
    ],
    tip: "The simplified method is easier (no tracking individual expenses), but if your home office expenses are high, the regular method may yield a larger deduction.",
    source: "IRS Publication 587 — Business Use of Your Home",
  },
  {
    id: "capital-gains",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Capital Gains Exclusion When Selling",
    color: "text-[#1a5276]",
    borderColor: "border-l-[#1a5276]",
    bgColor: "bg-[#eaf2f8]",
    bullets: [
      "Exclude up to $250,000 in profit (single filers) or $500,000 (married filing jointly) when you sell your primary residence.",
      "You must have owned and lived in the home for at least 2 of the last 5 years before the sale (the \"ownership and use\" test).",
      "You can use this exclusion repeatedly — there is no lifetime limit — but generally only once every 2 years.",
      "Profit = Sale price minus your cost basis (purchase price + eligible improvements). Keep receipts for major improvements.",
    ],
    tip: "If you didn't meet the 2-year requirement due to a job change, health issue, or unforeseen circumstance, you may qualify for a partial exclusion.",
    source: "IRS Publication 523 — Selling Your Home; 26 U.S.C. \u00A7121",
  },
  {
    id: "energy-credits",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Energy Efficiency Credits",
    color: "text-[#2d6b3f]",
    borderColor: "border-l-[#2d6b3f]",
    bgColor: "bg-[#e9f5ed]",
    bullets: [
      "Residential Clean Energy Credit (IRC \u00A725D): 30% of the cost for solar panels, solar water heaters, wind turbines, geothermal heat pumps, and battery storage. No annual cap for most technologies. Available through 2032, then phases down.",
      "Energy Efficient Home Improvement Credit (IRC \u00A725C): Up to $3,200 per year for qualifying upgrades — including up to $2,000 for heat pumps/water heaters and $1,200 for insulation, windows, doors, and electrical panel upgrades.",
      "Both are nonrefundable credits — they reduce your tax bill dollar-for-dollar but cannot create a refund beyond what you owe.",
    ],
    tip: "Keep the Manufacturer Certification Statement for any energy products you install. You will need it if the IRS asks for documentation.",
    source: "IRS Form 5695 instructions; Inflation Reduction Act of 2022, \u00A7\u00A713301-13302",
  },
  {
    id: "homestead",
    icon: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
    title: "Homestead Exemption",
    color: "text-[#5b3a8c]",
    borderColor: "border-l-[#5b3a8c]",
    bgColor: "bg-[#f0ecf6]",
    bullets: [
      "A state/local benefit (not federal) that reduces the assessed value of your primary residence for property tax purposes.",
      "Exemption amounts vary widely by state. For example, Texas exempts $100,000 from school district taxes; Florida exempts up to $50,000; some states have no homestead exemption.",
      "You must file an application with your county assessor or tax office — it is not automatic.",
      "Deadlines vary by state (some as early as January 1 of the tax year). File as soon as possible after closing.",
    ],
    tip: "Some states offer additional exemptions for seniors (65+), disabled homeowners, and veterans. Check with your county assessor's office for all available exemptions.",
    source: "State/county assessor offices; National Conference of State Legislatures",
  },
];

/* ------------------------------------------------------------------ */
/*  ITEMIZE QUICK-CHECK                                                */
/* ------------------------------------------------------------------ */

function ItemizeCheck() {
  const [filing, setFiling] = useState<"single" | "married">("single");
  const [mortgageInterest, setMortgageInterest] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [otherItemized, setOtherItemized] = useState("");

  const standardDeduction = filing === "single" ? 15000 : 30000;
  const totalItemized =
    (parseFloat(mortgageInterest) || 0) +
    Math.min(parseFloat(propertyTax) || 0, 10000) +
    (parseFloat(otherItemized) || 0);
  const shouldItemize = totalItemized > standardDeduction;
  const difference = Math.abs(totalItemized - standardDeduction);

  return (
    <div className="bg-gradient-to-br from-[#f8fafc] to-[#eef3f8] rounded-2xl p-6 border border-gray-200">
      <h2 className="text-lg font-bold text-alta-navy mb-1 flex items-center gap-2">
        <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Am I Better Off Itemizing?
      </h2>
      <p className="text-xs text-alta-gray mb-4">
        Quick estimate for the 2025 tax year. Standard deduction: $15,000 (single) / $30,000 (married filing jointly).
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-alta-navy block mb-1">Filing Status</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFiling("single")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                filing === "single"
                  ? "bg-alta-teal text-white border-alta-teal"
                  : "bg-white text-alta-navy border-gray-300 hover:border-alta-teal"
              }`}
            >
              Single / HoH
            </button>
            <button
              onClick={() => setFiling("married")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                filing === "married"
                  ? "bg-alta-teal text-white border-alta-teal"
                  : "bg-white text-alta-navy border-gray-300 hover:border-alta-teal"
              }`}
            >
              Married Filing Jointly
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-alta-navy block mb-1">Mortgage Interest (Form 1098)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-alta-gray text-sm">$</span>
            <input
              type="number"
              value={mortgageInterest}
              onChange={(e) => setMortgageInterest(e.target.value)}
              placeholder="0"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-alta-teal focus:border-alta-teal"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-alta-navy block mb-1">Property Tax Paid</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-alta-gray text-sm">$</span>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              placeholder="0"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-alta-teal focus:border-alta-teal"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-alta-navy block mb-1">Other Itemized Deductions</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-alta-gray text-sm">$</span>
            <input
              type="number"
              value={otherItemized}
              onChange={(e) => setOtherItemized(e.target.value)}
              placeholder="0"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-alta-teal focus:border-alta-teal"
            />
          </div>
        </div>
      </div>

      {(mortgageInterest || propertyTax || otherItemized) && (
        <div className={`rounded-xl p-4 border ${shouldItemize ? "bg-[#e9f5ed] border-[#2d6b3f]/30" : "bg-[#fef3cd] border-[#8b6914]/30"}`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${shouldItemize ? "bg-[#2d6b3f]" : "bg-[#8b6914]"}`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {shouldItemize ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-alta-navy">
                {shouldItemize
                  ? "Itemizing may save you more"
                  : "The standard deduction may be better"}
              </p>
              <p className="text-xs text-alta-gray mt-1">
                Your estimated itemized deductions: <strong>${totalItemized.toLocaleString()}</strong>
                {parseFloat(propertyTax) > 10000 && " (property tax capped at $10,000 SALT limit)"}
                <br />
                {filing === "single" ? "Single" : "MFJ"} standard deduction: <strong>${standardDeduction.toLocaleString()}</strong>
                <br />
                {shouldItemize
                  ? `Itemizing could save you an additional $${difference.toLocaleString()} in deductions.`
                  : `The standard deduction is $${difference.toLocaleString()} higher. You would need more deductions to benefit from itemizing.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-alta-gray mt-3">
        This is a simplified estimate. Other itemized deductions include charitable contributions, medical expenses exceeding 7.5% of AGI, and casualty/theft losses from federally declared disasters. A CPA can provide a complete analysis.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPANDABLE SECTION                                                 */
/* ------------------------------------------------------------------ */

function TaxBenefitSection({ section }: { section: TaxSection }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id={section.id} className={`rounded-2xl border border-l-4 ${section.borderColor} ${section.bgColor} overflow-hidden transition-all`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left group"
        aria-expanded={expanded}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${section.bgColor} border ${section.borderColor}`}>
          <svg className={`w-5 h-5 ${section.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className={`text-sm font-bold ${section.color} group-hover:text-alta-teal transition-colors`}>
            {section.title}
          </h2>
          <p className="text-xs text-alta-gray mt-0.5 line-clamp-2">{section.bullets[0]}</p>
        </div>
        <svg
          className={`w-5 h-5 text-alta-gray shrink-0 mt-1 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <ul className="space-y-2 ml-[52px]">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-alta-navy leading-relaxed">
                <svg className="w-3.5 h-3.5 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {section.tip && (
            <div className="ml-[52px] mt-3 p-3 bg-white/70 rounded-lg border border-gray-200">
              <p className="text-[11px] text-alta-navy">
                <span className="font-bold text-alta-teal">Tip:</span> {section.tip}
              </p>
            </div>
          )}

          {section.source && (
            <p className="ml-[52px] mt-2 text-xs text-alta-gray italic">
              Source: {section.source}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TABLE OF CONTENTS                                                  */
/* ------------------------------------------------------------------ */

function TableOfContents() {
  return (
    <nav className="bg-[#f8fafc] rounded-2xl border border-gray-200 p-4 mb-6">
      <h2 className="text-xs font-bold text-alta-navy uppercase tracking-wider mb-2">On This Page</h2>
      <ol className="space-y-1 list-decimal list-inside">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="text-xs text-alta-teal hover:text-alta-navy transition-colors hover:underline">
              {s.title}
            </a>
          </li>
        ))}
        <li>
          <a href="#itemize-check" className="text-xs text-alta-teal hover:text-alta-navy transition-colors hover:underline">
            Am I Better Off Itemizing?
          </a>
        </li>
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function TaxBenefitsPage() {
  return (
    <>
      <PageHero
        title="Homeowner Tax Benefits & Deductions"
        subtitle="A plain-language guide to the federal tax deductions, credits, and exclusions available to homeowners — with IRS sources and a quick itemization calculator."
        image="/images/hero-closing.jpg"
        breadcrumb={[
          { label: "Resources", href: "/resources" },
          { label: "Homeowner Tax Benefits", href: "/tax-benefits" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Intro */}
        <div className="mb-6">
          <p className="text-sm text-alta-navy leading-relaxed">
            Owning a home comes with real tax advantages — but only if you know what you qualify for and how to claim them. Below is a breakdown of the most common homeowner tax benefits for the <strong>2025 tax year</strong>, sourced from IRS.gov publications. Use the quick calculator at the bottom to see whether itemizing makes sense for you.
          </p>
        </div>

        <TableOfContents />

        {/* Tax Benefit Sections */}
        <div className="space-y-4 mb-8">
          {sections.map((section) => (
            <TaxBenefitSection key={section.id} section={section} />
          ))}
        </div>

        <InlineAd />

        {/* Itemize Quick Check */}
        <div id="itemize-check" className="my-8">
          <ItemizeCheck />
        </div>

        {/* Disclaimer */}
        <div className="bg-[#fff3cd] border border-[#ffc107]/40 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#8b6914] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs font-bold text-[#8b6914] mb-1">Important Disclaimer</p>
              <p className="text-xs text-[#6d5410] leading-relaxed">
                This guide is <strong>educational only and does not constitute tax, legal, or financial advice</strong>. Tax laws change frequently, and individual circumstances vary. Always consult a qualified CPA or tax professional before making decisions based on this information. All figures reflect the 2025 tax year unless otherwise noted.
              </p>
            </div>
          </div>
        </div>

        <InlineAd />

        {/* Sources */}
        <div className="bg-[#f8fafc] rounded-xl border border-gray-200 p-4 mb-8">
          <h2 className="text-xs font-bold text-alta-navy mb-2">IRS Sources & References</h2>
          <ul className="space-y-1">
            <li className="text-[11px] text-alta-gray">IRS Publication 936 — Home Mortgage Interest Deduction</li>
            <li className="text-[11px] text-alta-gray">IRS Topic No. 503 — Deductible Taxes</li>
            <li className="text-[11px] text-alta-gray">IRS Publication 587 — Business Use of Your Home</li>
            <li className="text-[11px] text-alta-gray">IRS Publication 523 — Selling Your Home</li>
            <li className="text-[11px] text-alta-gray">IRS Form 5695 — Residential Energy Credits</li>
            <li className="text-[11px] text-alta-gray">Inflation Reduction Act of 2022, Sections 13301-13302</li>
            <li className="text-[11px] text-alta-gray">Tax Cuts and Jobs Act of 2017 (P.L. 115-97) — SALT cap, mortgage interest limit</li>
          </ul>
        </div>

        <FirstTimeBuyerCTA />

        {/* Related Topics */}
        <div className="mt-8 mb-4">
          <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/closing-process/closing-costs" className="p-4 bg-[#eaf2f8] rounded-xl border border-[#bcd4e6] border-l-4 border-l-[#1a5276] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Explained</h3>
              <p className="text-xs text-alta-gray mt-1">Understand every line item on your settlement statement</p>
            </Link>
            <Link href="/escrow-guide" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Understanding Escrow</h3>
              <p className="text-xs text-alta-gray mt-1">How escrow accounts work for taxes and insurance after closing</p>
            </Link>
            <Link href="/homeowners-insurance" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Homeowner&apos;s Insurance</h3>
              <p className="text-xs text-alta-gray mt-1">What your policy covers and how to save on premiums</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
