"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const fmt = (n: number) => Math.round(n).toLocaleString();
const fmtDollar = (n: number) => `$${fmt(Math.abs(n))}`;

const hiddenCosts = [
  {
    title: "Property Taxes",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    range: "$3,000 - $12,000/year",
    color: "border-l-[#0a7ea8]",
    bgColor: "bg-[#e6f1f5]",
    summary: "Averages 1.1% of home value nationally, but varies widely by state. Can increase annually with reassessments.",
    details: [
      "National average effective rate is 1.1% of assessed value",
      "New Jersey, Illinois, and Texas have rates above 2%",
      "Hawaii, Alabama, and Colorado are under 0.6%",
      "Reassessments after purchase can raise your bill significantly",
      "Some states offer homestead exemptions that reduce taxable value",
      "Property tax appeals are possible and often successful",
    ],
  },
  {
    title: "Homeowner's Insurance",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    range: "$1,800 - $5,000+/year",
    color: "border-l-[#2d6b3f]",
    bgColor: "bg-[#e9f5ed]",
    summary: "Premiums rising 8-12% annually in 2026. Coastal and disaster-prone areas seeing 20%+ increases.",
    details: [
      "National average around $2,100/year in 2025 (Bankrate)",
      "Florida, Louisiana, and Oklahoma have the highest premiums",
      "Climate-related claims driving double-digit increases in 2026",
      "Some insurers exiting high-risk markets entirely",
      "Flood insurance is separate and costs $700-$2,000+ extra",
      "Review coverage annually; replacement cost rises with inflation",
    ],
  },
  {
    title: "Maintenance & Repairs",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.077A1.5 1.5 0 014.5 16.93V7.07a1.5 1.5 0 011.536-1.316l5.384 3.076a1.5 1.5 0 010 2.634zM16.5 12h.008v.008H16.5V12zm0 3h.008v.008H16.5V15zm0-6h.008v.008H16.5V9z" />
      </svg>
    ),
    range: "$4,000 - $8,000/year",
    color: "border-l-[#d4a843]",
    bgColor: "bg-[#fdf6e3]",
    summary: "The 1-2% rule: budget 1-2% of your home's value annually. Older homes trend higher.",
    details: [
      "The 1% rule is a minimum; 1.5-2% is more realistic for older homes",
      "HVAC replacement: $5,000-$12,000 (lifespan 15-20 years)",
      "Roof replacement: $8,000-$25,000 (lifespan 20-30 years)",
      "Water heater: $1,000-$3,000 (lifespan 8-12 years)",
      "Appliance replacements average $300-$1,500 each",
      "Emergency repairs (plumbing, electrical) can cost $500-$5,000+",
    ],
  },
  {
    title: "HOA Fees + Special Assessments",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    range: "$200 - $500+/month",
    color: "border-l-[#5b3a8c]",
    bgColor: "bg-[#f0ecf6]",
    summary: "44% of homes have an HOA. Fees average $250/month but can exceed $500 in some communities.",
    details: [
      "44% of U.S. homes are in HOA communities (Census/CAI data)",
      "Average monthly fee: $250, but ranges from $100 to $1,000+",
      "Fees typically increase 3-5% annually",
      "Special assessments for major repairs can cost $1,000-$10,000+",
      "Review HOA financials and reserve fund before buying",
      "Underfunded reserves signal future special assessments",
    ],
  },
  {
    title: "Utilities",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    range: "$200 - $400/month",
    color: "border-l-[#0a7ea8]",
    bgColor: "bg-[#e6f1f5]",
    summary: "Electric, gas, water, sewer, trash, and internet add up quickly. Larger homes cost more to heat and cool.",
    details: [
      "Average household spends $300/month on utilities (EIA data)",
      "Electricity: $100-$200/month (higher with electric heat/AC)",
      "Natural gas: $50-$120/month (heating dependent)",
      "Water/sewer: $50-$100/month",
      "Trash/recycling: $20-$50/month",
      "Internet/cable: $50-$150/month",
    ],
  },
  {
    title: "Lawn Care & Landscaping",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    range: "$100 - $300/month",
    color: "border-l-[#2d6b3f]",
    bgColor: "bg-[#e9f5ed]",
    summary: "Professional lawn service runs $100-$300/month. DIY requires equipment investment of $500-$2,000+.",
    details: [
      "Basic mowing service: $30-$80 per visit, weekly in season",
      "Seasonal cleanup (spring/fall): $200-$500 each",
      "Tree trimming: $300-$1,000 per session",
      "Irrigation system maintenance: $100-$300/year",
      "DIY mower + equipment: $500-$2,000 upfront",
      "Snow removal in cold climates: $30-$75 per visit",
    ],
  },
  {
    title: "Pest Control",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    range: "$30 - $50/month",
    color: "border-l-[#d4a843]",
    bgColor: "bg-[#fdf6e3]",
    summary: "Quarterly pest control costs $360-$600/year. Termite treatment can add $500-$2,500 if needed.",
    details: [
      "Quarterly general pest service: $100-$150 per visit",
      "Termite inspection: $75-$150 annually",
      "Termite treatment if needed: $500-$2,500",
      "Mosquito treatment (warm climates): $50-$100/month seasonal",
      "Rodent control: $200-$500 per incident",
      "Preventive treatments protect your largest investment",
    ],
  },
  {
    title: "Home Warranty",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    range: "$300 - $600/year",
    color: "border-l-[#5b3a8c]",
    bgColor: "bg-[#f0ecf6]",
    summary: "Covers repair/replacement of major systems and appliances. Service call fees are $75-$125 per visit.",
    details: [
      "Basic plan: $300-$400/year (major systems only)",
      "Comprehensive plan: $450-$600/year (systems + appliances)",
      "Service call fee: $75-$125 per claim",
      "Common exclusions: pre-existing conditions, cosmetic issues",
      "Most useful in years 1-5 of ownership or with older homes",
      "Read the fine print carefully before purchasing",
    ],
  },
];

// Cost bar colors for the breakdown chart
const costBarColors = [
  { label: "Mortgage (P&I)", color: "#0f1b33" },
  { label: "Property Tax", color: "#0a7ea8" },
  { label: "Insurance", color: "#2d6b3f" },
  { label: "Maintenance", color: "#d4a843" },
  { label: "HOA", color: "#5b3a8c" },
  { label: "Utilities", color: "#0a8ebc" },
];

export default function TrueCostPage() {
  const [homePrice, setHomePrice] = useState(400000);
  const [mortgageRate, setMortgageRate] = useState(6.75);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1);
  const [insuranceCost, setInsuranceCost] = useState(2100);
  const [hoaFee, setHoaFee] = useState(0);
  const [utilitiesMonthly, setUtilitiesMonthly] = useState(300);
  const [maintenancePct, setMaintenancePct] = useState(1.5);
  const [expandedTile, setExpandedTile] = useState<number | null>(null);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const numPayments = 30 * 12;
    const monthlyMortgage =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        : loanAmount / numPayments;

    const annualPropertyTax = homePrice * (propertyTaxRate / 100);
    const annualMaintenance = homePrice * (maintenancePct / 100);
    const annualHOA = hoaFee * 12;
    const annualUtilities = utilitiesMonthly * 12;
    const annualInsurance = insuranceCost;

    const annualMortgage = monthlyMortgage * 12;

    const annualHiddenCosts =
      annualPropertyTax + annualInsurance + annualMaintenance + annualHOA + annualUtilities;
    const annualTotalCost = annualMortgage + annualHiddenCosts;
    const monthlyTotalCost = annualTotalCost / 12;

    // 5-year total
    const fiveYearTotal = annualTotalCost * 5;

    // Cost breakdown for chart
    const breakdown = [
      { label: "Mortgage (P&I)", annual: annualMortgage, color: "#0f1b33" },
      { label: "Property Tax", annual: annualPropertyTax, color: "#0a7ea8" },
      { label: "Insurance", annual: annualInsurance, color: "#2d6b3f" },
      { label: "Maintenance", annual: annualMaintenance, color: "#d4a843" },
      { label: "HOA", annual: annualHOA, color: "#5b3a8c" },
      { label: "Utilities", annual: annualUtilities, color: "#0a8ebc" },
    ].filter((item) => item.annual > 0);

    return {
      monthlyMortgage,
      monthlyTotalCost,
      annualMortgage,
      annualHiddenCosts,
      annualTotalCost,
      fiveYearTotal,
      breakdown,
      annualPropertyTax,
      annualInsurance,
      annualMaintenance,
      annualHOA,
      annualUtilities,
    };
  }, [homePrice, mortgageRate, downPaymentPct, propertyTaxRate, insuranceCost, hoaFee, utilitiesMonthly, maintenancePct]);

  const maxBreakdown = Math.max(...results.breakdown.map((b) => b.annual));

  return (
    <>
      <PageHero
        title="The True Cost of Homeownership"
        subtitle="Your mortgage payment is just the beginning. Bankrate's 2025 study found hidden homeownership costs average $21,000 per year beyond the mortgage. Find out what your real monthly cost will be."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "Tools & Calculators", href: "/mortgage-calculator" },
          { label: "True Cost of Homeownership", href: "/true-cost" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Stat callout */}
          <div className="mb-6 p-4 bg-[#fdf6e3] rounded-2xl border border-[#e8d5a0] border-l-4 border-l-[#d4a843] shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4a843]/10 flex items-center justify-center text-[#d4a843] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">The $21,000 Surprise</h2>
                <p className="text-sm text-alta-gray leading-relaxed">
                  According to Bankrate&apos;s 2025 analysis, the average homeowner spends approximately <strong className="text-alta-navy">$21,000 per year</strong> on
                  hidden costs beyond the mortgage payment -- including property taxes, insurance, maintenance, and utilities.
                  That adds <strong className="text-alta-navy">$1,750/month</strong> to your actual housing cost. Use the calculator below to find your real number.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-6">
            {/* Inputs */}
            <div className="space-y-5">
              {/* Home & Mortgage */}
              <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#0a7ea8] shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Home & Mortgage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Home Price</label>
                      <span className="text-alta-teal font-bold">${fmt(homePrice)}</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={1500000}
                      step={10000}
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>$100K</span>
                      <span>$1.5M</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <label className="font-medium text-alta-navy">Down Payment</label>
                        <span className="text-alta-teal font-bold">{downPaymentPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={30}
                        step={1}
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        className="w-full accent-[#0a8ebc]"
                      />
                      <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                        <span>0%</span>
                        <span>30%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <label className="font-medium text-alta-navy">Mortgage Rate</label>
                        <span className="text-alta-teal font-bold">{mortgageRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={10}
                        step={0.125}
                        value={mortgageRate}
                        onChange={(e) => setMortgageRate(Number(e.target.value))}
                        className="w-full accent-[#0a8ebc]"
                      />
                      <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                        <span>3%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-alta-gray">
                    Estimated monthly mortgage (P&I): <strong className="text-alta-navy">{fmtDollar(results.monthlyMortgage)}/mo</strong> on a 30-year fixed loan
                  </p>
                </div>
              </div>

              {/* Taxes & Insurance */}
              <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#2d6b3f] shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Taxes & Insurance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Property Tax Rate</label>
                      <span className="text-alta-teal font-bold">{propertyTaxRate}% ({fmtDollar(homePrice * propertyTaxRate / 100)}/yr)</span>
                    </div>
                    <input
                      type="range"
                      min={0.3}
                      max={3}
                      step={0.1}
                      value={propertyTaxRate}
                      onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>0.3% (Hawaii)</span>
                      <span>3% (New Jersey)</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Homeowner&apos;s Insurance</label>
                      <span className="text-alta-teal font-bold">{fmtDollar(insuranceCost)}/yr</span>
                    </div>
                    <input
                      type="range"
                      min={600}
                      max={8000}
                      step={100}
                      value={insuranceCost}
                      onChange={(e) => setInsuranceCost(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>$600</span>
                      <span>$8,000</span>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">
                      Insurance premiums are rising 8-12% in 2026 -- adjust higher if you&apos;re in a coastal or disaster-prone area.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Costs */}
              <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#d4a843] shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Additional Monthly Costs</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">HOA Fee</label>
                      <span className="text-alta-teal font-bold">{fmtDollar(hoaFee)}/mo</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={800}
                      step={25}
                      value={hoaFee}
                      onChange={(e) => setHoaFee(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>$0</span>
                      <span>$800/mo</span>
                    </div>
                    <p className="text-xs text-alta-gray mt-0.5">
                      44% of homes have an HOA. Average fee: $250/month.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Maintenance Budget</label>
                      <span className="text-alta-teal font-bold">{maintenancePct}% ({fmtDollar(homePrice * maintenancePct / 100)}/yr)</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={3}
                      step={0.25}
                      value={maintenancePct}
                      onChange={(e) => setMaintenancePct(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>0.5% (newer home)</span>
                      <span>3% (older home)</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Utilities</label>
                      <span className="text-alta-teal font-bold">{fmtDollar(utilitiesMonthly)}/mo</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={600}
                      step={25}
                      value={utilitiesMonthly}
                      onChange={(e) => setUtilitiesMonthly(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>$100/mo</span>
                      <span>$600/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results panel */}
            <div className="space-y-5">
              {/* Mortgage Only vs Real Cost */}
              <div className="rounded-2xl border-2 border-[#d4a843] bg-gradient-to-br from-[#d4a843]/5 to-[#d4a843]/10 p-5 shadow-md">
                <div className="text-center mb-4">
                  <p className="text-xs text-alta-gray uppercase tracking-wider font-medium mb-2">Your Real Monthly Cost</p>
                  <div className="text-3xl font-bold text-alta-navy">
                    {fmtDollar(results.monthlyTotalCost)}
                    <span className="text-sm font-normal text-alta-gray">/mo</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl border border-gray-200">
                    <div>
                      <p className="text-xs text-alta-gray">Mortgage Only</p>
                      <p className="text-lg font-bold text-alta-navy">{fmtDollar(results.monthlyMortgage)}/mo</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-alta-gray">Hidden Costs</p>
                      <p className="text-lg font-bold text-[#d4a843]">+{fmtDollar(results.annualHiddenCosts / 12)}/mo</p>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl border border-gray-200">
                    <p className="text-xs text-alta-gray">5-Year Total Ownership Cost</p>
                    <p className="text-xl font-bold text-alta-navy">{fmtDollar(results.fiveYearTotal)}</p>
                    <p className="text-[11px] text-alta-gray mt-0.5">
                      That is {fmtDollar(results.fiveYearTotal - results.annualMortgage * 5)} more than mortgage payments alone
                    </p>
                  </div>
                </div>
              </div>

              {/* Annual Cost Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Annual Cost Breakdown</h3>
                <div className="space-y-3">
                  {results.breakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-alta-navy">{item.label}</span>
                        <span className="font-bold" style={{ color: item.color }}>{fmtDollar(item.annual)}/yr</span>
                      </div>
                      <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${maxBreakdown > 0 ? (item.annual / maxBreakdown) * 100 : 0}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-alta-navy">Total Annual Cost</span>
                    <span className="font-bold text-alta-navy">{fmtDollar(results.annualTotalCost)}/yr</span>
                  </div>
                  <div className="flex justify-between text-xs text-alta-gray mt-1">
                    <span>Hidden costs alone</span>
                    <span className="font-medium text-[#d4a843]">{fmtDollar(results.annualHiddenCosts)}/yr</span>
                  </div>
                </div>
              </div>

              {/* Monthly breakdown detail */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-3 text-sm">Monthly Breakdown</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-alta-gray">Mortgage (P&I)</span>
                    <span className="font-medium text-alta-navy">{fmtDollar(results.monthlyMortgage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alta-gray">Property Tax</span>
                    <span className="font-medium text-alta-navy">{fmtDollar(results.annualPropertyTax / 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alta-gray">Insurance</span>
                    <span className="font-medium text-alta-navy">{fmtDollar(results.annualInsurance / 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-alta-gray">Maintenance</span>
                    <span className="font-medium text-alta-navy">{fmtDollar(results.annualMaintenance / 12)}</span>
                  </div>
                  {results.annualHOA > 0 && (
                    <div className="flex justify-between">
                      <span className="text-alta-gray">HOA</span>
                      <span className="font-medium text-alta-navy">{fmtDollar(hoaFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-alta-gray">Utilities</span>
                    <span className="font-medium text-alta-navy">{fmtDollar(utilitiesMonthly)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-alta-navy">Total Monthly</span>
                    <span className="font-bold text-alta-navy">{fmtDollar(results.monthlyTotalCost)}</span>
                  </div>
                </div>
              </div>

              <InlineAd />
            </div>
          </div>

          {/* Budget Rule Callout */}
          <div className="mt-8 p-5 bg-gradient-to-r from-[#0a7ea8]/10 to-[#2d6b3f]/10 rounded-2xl border-2 border-[#0a7ea8]/30 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0a7ea8] flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-alta-navy text-lg mb-1">The 35% Budget Rule</h3>
                <p className="text-sm text-alta-gray leading-relaxed mb-3">
                  Financial advisors recommend that your <strong className="text-alta-navy">total housing cost</strong> -- not just your mortgage -- should
                  stay below <strong className="text-alta-navy">35% of your take-home pay</strong>. That includes property taxes, insurance, maintenance, HOA, and utilities.
                </p>
                <div className="bg-white/60 rounded-xl p-3 border border-gray-200">
                  <p className="text-xs text-alta-gray mb-1">Based on your calculated total of <strong className="text-alta-navy">{fmtDollar(results.monthlyTotalCost)}/month</strong>, you would need:</p>
                  <p className="text-lg font-bold text-alta-navy">
                    {fmtDollar(results.monthlyTotalCost / 0.35)}/month take-home pay
                  </p>
                  <p className="text-[11px] text-alta-gray">
                    That is {fmtDollar((results.monthlyTotalCost / 0.35) * 12)}/year after taxes to comfortably afford this home
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Costs Section */}
          <div className="mt-10 mb-6">
            <h2 className="text-xl font-bold text-alta-navy mb-1">Hidden Costs Most Buyers Miss</h2>
            <p className="text-sm text-alta-gray mb-6">
              Click any tile below to see detailed breakdowns and what to budget for each category.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {hiddenCosts.map((cost, index) => (
                <div key={cost.title}>
                  <button
                    onClick={() => setExpandedTile(expandedTile === index ? null : index)}
                    className={`w-full text-left p-4 rounded-2xl border border-gray-200 border-l-4 ${cost.color} ${cost.bgColor} shadow-sm hover:shadow-md transition-all group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-alta-navy shrink-0 group-hover:scale-105 transition-transform">
                        {cost.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-sm font-bold text-alta-navy">{cost.title}</h4>
                          <svg
                            className={`w-4 h-4 text-alta-teal shrink-0 transition-transform ${expandedTile === index ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <p className="text-xs font-semibold text-alta-teal mb-1">{cost.range}</p>
                        <p className="text-xs text-alta-gray leading-relaxed">{cost.summary}</p>
                      </div>
                    </div>
                  </button>
                  {expandedTile === index && (
                    <div className="mt-1 mx-4 p-4 bg-white rounded-b-xl border border-t-0 border-gray-200 shadow-sm animate-in slide-in-from-top-2 duration-200">
                      <ul className="space-y-2">
                        {cost.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-alta-gray">
                            <span className="w-1.5 h-1.5 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Assumptions */}
          <div className="mt-8 bg-alta-light rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-alta-navy mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Sources & Assumptions
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-alta-gray">
              {[
                "Bankrate 2025 Hidden Costs of Homeownership study",
                "30-year fixed-rate mortgage, fully amortizing",
                "Property tax rates from Tax Foundation state data",
                "Insurance averages from NAIC and Bankrate 2025",
                "Maintenance estimate uses the 1-2% of home value rule",
                "HOA data from Community Associations Institute (CAI)",
                "Utility averages from U.S. Energy Information Administration",
                "Does not include PMI, closing costs, or opportunity costs",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <FirstTimeBuyerCTA />

          {/* Related Topics */}
          <div className="mt-8 mb-8">
            <h3 className="font-bold text-alta-navy mb-4">Related Topics</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Mortgage Calculator",
                  desc: "Compare Conventional, FHA, VA & USDA with county-level property tax rates.",
                  href: "/mortgage-calculator",
                  color: "border-l-[#0a7ea8]",
                },
                {
                  label: "Homeowner's Insurance",
                  desc: "What's covered, what's not, and how to shop for the best rate.",
                  href: "/homeowners-insurance",
                  color: "border-l-[#2d6b3f]",
                },
                {
                  label: "HOA Guide",
                  desc: "Everything you need to know about homeowners associations before buying.",
                  href: "/hoa-guide",
                  color: "border-l-[#5b3a8c]",
                },
              ].map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className={`flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 border-l-4 ${topic.color} shadow-sm hover:shadow-md hover:border-alta-teal/30 transition-all group`}
                >
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                      {topic.label}
                    </h4>
                    <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{topic.desc}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-alta-teal shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
