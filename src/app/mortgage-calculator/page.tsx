"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import { propertyTaxRates, loanTypes } from "@/data/propertyTaxRates";
import { countyTaxRates } from "@/data/countyTaxRates";

const stateOptions = Object.entries(propertyTaxRates)
  .sort(([, a], [, b]) => a.name.localeCompare(b.name))
  .map(([code, data]) => ({ code, name: data.name, rate: data.rate }));

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [loanType, setLoanType] = useState<keyof typeof loanTypes>("conventional");
  const [selectedState, setSelectedState] = useState("TX");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [homeInsurance, setHomeInsurance] = useState(1500);
  const [hoa, setHoa] = useState(0);

  const config = loanTypes[loanType];
  const effectiveDown = Math.max(downPaymentPct, config.minDown);
  const counties = countyTaxRates[selectedState] || [];
  const countyData = counties.find(c => c.county === selectedCounty);
  const taxRate = countyData ? countyData.rate : (propertyTaxRates[selectedState]?.rate || 0.9);
  const propertyTax = Math.round(homePrice * (taxRate / 100));
  const usingCountyRate = !!countyData;

  const calc = useMemo(() => {
    const downPayment = homePrice * (effectiveDown / 100);
    const baseLoan = homePrice - downPayment;
    const loanWithUFMIP = baseLoan + (baseLoan * config.upfrontMIP / 100);
    const loanAmount = loanWithUFMIP;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    const monthlyPI = monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;

    let monthlyMI = 0;
    if (loanType === "conventional" && effectiveDown < 20) {
      monthlyMI = (baseLoan * (config.annualMIP / 100)) / 12;
    } else if (loanType === "fha") {
      monthlyMI = (baseLoan * (config.annualMIP / 100)) / 12;
    } else if (loanType === "usda") {
      monthlyMI = (baseLoan * (config.annualMIP / 100)) / 12;
    }
    // VA has no monthly MI

    const monthlyHOA = hoa;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyMI + monthlyHOA;
    const totalInterest = (monthlyPI * numPayments) - loanAmount;
    const totalCost = monthlyPI * numPayments;
    const upfrontMIPAmount = baseLoan * (config.upfrontMIP / 100);
    const closingCostEstimate = homePrice * 0.03;

    return {
      downPayment, baseLoan, loanAmount, monthlyPI, monthlyTax, monthlyInsurance,
      monthlyMI, monthlyHOA, totalMonthly, totalInterest, totalCost,
      upfrontMIPAmount, closingCostEstimate, numPayments,
    };
  }, [homePrice, effectiveDown, interestRate, loanTermYears, loanType, config, propertyTax, homeInsurance, hoa]);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  const slices = [
    { label: "Principal & Interest", value: calc.monthlyPI, color: "#0a8ebc" },
    { label: "Property Tax", value: calc.monthlyTax, color: "#d4a843" },
    { label: "Insurance", value: calc.monthlyInsurance, color: "#2d8f5e" },
    ...(calc.monthlyMI > 0 ? [{ label: loanType === "conventional" ? "PMI" : loanType === "fha" ? "FHA MIP" : "Guarantee Fee", value: calc.monthlyMI, color: "#c0392b" }] : []),
    ...(calc.monthlyHOA > 0 ? [{ label: "HOA", value: calc.monthlyHOA, color: "#7e57c2" }] : []),
  ];
  const total = slices.reduce((a, s) => a + s.value, 0);
  let cumAngle = 0;

  return (
    <>
      <PageHero
        title="Mortgage Payment Calculator"
        subtitle="Estimate your monthly payment by loan type with real state property tax rates. Compare Conventional, FHA, VA, and USDA side by side."
        image="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Mortgage Calculator", href: "/mortgage-calculator" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-[#c5d8e4] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0a7ea8]/10 flex items-center justify-center text-[#0a7ea8] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Compare Loan Types with Real Tax Rates</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Select your loan type to see how down payment requirements, mortgage insurance, and funding fees differ. Property tax is calculated using your state&apos;s actual effective tax rate from the Tax Foundation/Census Bureau. All loan rules sourced from FHA.com, VA.gov, and USDA Rural Development.</p>
              </div>
            </div>
          </div>

          {/* Loan type selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.entries(loanTypes).map(([key, lt]) => (
              <button
                key={key}
                onClick={() => {
                  setLoanType(key as keyof typeof loanTypes);
                  if (lt.minDown > downPaymentPct) setDownPaymentPct(lt.minDown);
                }}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  loanType === key
                    ? "border-alta-teal bg-alta-teal/5 shadow-md"
                    : "border-gray-100 bg-white hover:border-alta-teal/30 hover:shadow-sm"
                }`}
              >
                <p className={`text-sm font-bold ${loanType === key ? "text-alta-teal" : "text-alta-navy"}`}>{lt.name}</p>
                <p className="text-[10px] text-alta-gray mt-0.5">Min {lt.minDown}% down{lt.minCredit > 0 ? ` | ${lt.minCredit}+ credit` : ""}</p>
              </button>
            ))}
          </div>

          {/* Loan type info bar */}
          <div className="p-4 bg-alta-light rounded-xl border border-gray-100 mb-6">
            <p className="text-xs text-alta-gray leading-relaxed">{config.description}</p>
            {config.upfrontMIP > 0 && (
              <p className="text-xs text-alta-navy mt-2"><strong>Upfront fee:</strong> {config.upfrontMIP}% ({loanType === "va" ? "VA funding fee" : loanType === "fha" ? "FHA UFMIP" : "USDA guarantee fee"}) = <strong>${fmt(calc.upfrontMIPAmount)}</strong> {loanType !== "va" && "(added to loan balance)"}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Inputs */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Loan Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Home Price</label>
                      <span className="text-alta-teal font-bold">${fmt(homePrice)}</span>
                    </div>
                    <input type="range" min={50000} max={2000000} step={5000} value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full accent-[#0a8ebc]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Down Payment</label>
                      <span className="text-alta-teal font-bold">{effectiveDown}% (${fmt(homePrice * effectiveDown / 100)})</span>
                    </div>
                    <input type="range" min={config.minDown} max={50} step={1} value={effectiveDown} onChange={(e) => setDownPaymentPct(Number(e.target.value))} className="w-full accent-[#0a8ebc]" />
                    {loanType === "conventional" && effectiveDown < 20 && <p className="text-xs text-amber-600 mt-1">Below 20% requires Private Mortgage Insurance (PMI) — approximately ${fmt(calc.monthlyMI)}/mo</p>}
                    {loanType === "fha" && <p className="text-xs text-amber-600 mt-1">FHA annual MIP of 0.55% ({config.mipRemovalNote.split('.')[0]})</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-alta-navy block mb-1">Interest Rate (%)</label>
                      <input type="number" step={0.125} min={0} max={15} value={interestRate} onChange={(e) => { const v = Number(e.target.value); if (!isNaN(v) && v >= 0 && v <= 15) setInterestRate(v); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-alta-navy block mb-1">Loan Term</label>
                      <select value={loanTermYears} onChange={(e) => setLoanTermYears(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                        <option value={30}>30 years</option>
                        <option value={20}>20 years</option>
                        <option value={15}>15 years</option>
                        <option value={10}>10 years</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Location & Additional Costs</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">State (for base property tax rate)</label>
                    <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCounty(""); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      {stateOptions.map((s) => (
                        <option key={s.code} value={s.code}>{s.name} — {s.rate}% avg effective rate</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">County</label>
                    <select
                      value={selectedCounty}
                      onChange={(e) => setSelectedCounty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                    >
                      <option value="">Use state average ({propertyTaxRates[selectedState]?.rate}%)</option>
                      {counties.map((c) => (
                        <option key={c.county} value={c.county}>{c.county} County — {c.rate}%</option>
                      ))}
                    </select>
                    <div className="mt-1.5 text-[10px] text-alta-gray">
                      <p>
                        {usingCountyRate ? (
                          <span className="text-green-600 font-medium">Using {selectedCounty} County rate: {taxRate}%</span>
                        ) : (
                          <span>Using {propertyTaxRates[selectedState]?.name} state average: {propertyTaxRates[selectedState]?.rate}%</span>
                        )}
                        {" "}= <strong>${fmt(propertyTax)}/year</strong> (${fmt(propertyTax / 12)}/mo)
                      </p>
                      {!usingCountyRate && counties.length > 0 && (
                        <p className="text-amber-600 mt-1">Select your county above for a more accurate property tax estimate. Rates vary significantly by county.</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-alta-navy block mb-1">Home Insurance ($/yr)</label>
                      <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-alta-navy block mb-1">HOA ($/mo)</label>
                      <input type="number" value={hoa} onChange={(e) => setHoa(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-alta-navy to-[#0d3a5c] rounded-2xl p-6 text-white text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{config.name} Loan — Estimated Monthly Payment</p>
                <p className="text-4xl font-bold">${fmt(calc.totalMonthly)}</p>
                <p className="text-xs text-gray-400 mt-1">{loanTermYears}-year fixed at {interestRate}% in {propertyTaxRates[selectedState]?.name}</p>
              </div>

              {/* Donut Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-center mb-4">
                  <svg viewBox="0 0 120 120" className="w-36 h-36">
                    {slices.map((s) => {
                      const pct = s.value / total;
                      const startAngle = cumAngle;
                      cumAngle += pct * 360;
                      const endAngle = cumAngle;
                      const largeArc = pct > 0.5 ? 1 : 0;
                      const startRad = (startAngle - 90) * Math.PI / 180;
                      const endRad = (endAngle - 90) * Math.PI / 180;
                      const x1 = 60 + 45 * Math.cos(startRad);
                      const y1 = 60 + 45 * Math.sin(startRad);
                      const x2 = 60 + 45 * Math.cos(endRad);
                      const y2 = 60 + 45 * Math.sin(endRad);
                      return <path key={s.label} d={`M 60 60 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={s.color} stroke="white" strokeWidth={1} />;
                    })}
                    <circle cx="60" cy="60" r="25" fill="white" />
                    <text x="60" y="57" textAnchor="middle" className="fill-alta-navy font-bold" fontSize="10">${fmt(calc.totalMonthly)}</text>
                    <text x="60" y="68" textAnchor="middle" className="fill-alta-gray" fontSize="6">/month</text>
                  </svg>
                </div>
                <div className="space-y-1.5">
                  {slices.map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-alta-gray">{s.label}</span>
                      </div>
                      <span className="font-medium text-alta-navy">${fmt(s.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-3 text-sm">{config.name} Loan Summary</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-alta-gray">Home Price</span><span className="font-medium text-alta-navy">${fmt(homePrice)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Down Payment ({effectiveDown}%)</span><span className="font-medium text-alta-navy">${fmt(calc.downPayment)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Base Loan Amount</span><span className="font-medium text-alta-navy">${fmt(calc.baseLoan)}</span></div>
                  {config.upfrontMIP > 0 && (
                    <div className="flex justify-between"><span className="text-alta-gray">Upfront {loanType === "va" ? "Funding Fee" : "MIP/Fee"} ({config.upfrontMIP}%)</span><span className="font-medium text-amber-600">+${fmt(calc.upfrontMIPAmount)}</span></div>
                  )}
                  <div className="flex justify-between border-t border-gray-100 pt-1.5"><span className="text-alta-navy font-semibold">Total Loan</span><span className="font-bold text-alta-teal">${fmt(calc.loanAmount)}</span></div>
                  <div className="flex justify-between mt-2"><span className="text-alta-gray">Property Tax ({taxRate}%)</span><span className="font-medium text-alta-navy">${fmt(propertyTax)}/yr</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Total Interest Over Life</span><span className="font-medium text-alta-red">${fmt(calc.totalInterest)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Est. Closing Costs (3%)</span><span className="font-medium text-alta-navy">${fmt(calc.closingCostEstimate)}</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-1.5"><span className="text-alta-navy font-semibold">Total Cost of Home</span><span className="font-bold text-alta-teal">${fmt(calc.totalCost + calc.downPayment + calc.closingCostEstimate)}</span></div>
                </div>
              </div>
            </div>
          </div>

          <InlineAd />

          {/* Detailed Analysis */}
          <div className="mt-8 p-6 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold text-alta-navy mb-4">Detailed Analysis: Your {config.name} Loan</h2>

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {/* Cash needed */}
              <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-3">Cash Needed at Closing</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-alta-gray">Down Payment</span><span className="font-medium">${fmt(calc.downPayment)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Estimated Closing Costs</span><span className="font-medium">${fmt(calc.closingCostEstimate)}</span></div>
                  {loanType === "va" && <div className="flex justify-between"><span className="text-alta-gray">VA Funding Fee (if not financed)</span><span className="font-medium">${fmt(calc.upfrontMIPAmount)}</span></div>}
                  <div className="flex justify-between border-t border-gray-100 pt-2"><span className="font-semibold text-alta-navy">Total Cash Needed</span><span className="font-bold text-alta-teal">${fmt(calc.downPayment + calc.closingCostEstimate + (loanType === "va" ? calc.upfrontMIPAmount : 0))}</span></div>
                </div>
              </div>

              {/* Mortgage insurance details */}
              <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-3">Mortgage Insurance</h3>
                {calc.monthlyMI > 0 ? (
                  <div className="space-y-2 text-xs text-alta-gray">
                    <p><strong className="text-alta-navy">Type:</strong> {loanType === "conventional" ? "Private Mortgage Insurance (PMI)" : loanType === "fha" ? "FHA Annual MIP" : "USDA Annual Guarantee Fee"}</p>
                    <p><strong className="text-alta-navy">Rate:</strong> {config.annualMIP}% annually</p>
                    <p><strong className="text-alta-navy">Monthly cost:</strong> <span className="text-alta-red font-semibold">${fmt(calc.monthlyMI)}/mo</span></p>
                    <p><strong className="text-alta-navy">Removal:</strong> {config.mipRemovalNote}</p>
                  </div>
                ) : loanType === "va" ? (
                  <div className="text-xs text-alta-gray">
                    <p className="text-green-600 font-semibold mb-1">No monthly mortgage insurance required.</p>
                    <p>VA loans never require monthly MI regardless of down payment. The one-time VA funding fee ({config.upfrontMIP}% = ${fmt(calc.upfrontMIPAmount)}) replaces it.</p>
                    <p className="mt-1">Veterans with service-connected disabilities are exempt from the funding fee.</p>
                  </div>
                ) : (
                  <p className="text-xs text-green-600 font-medium">No mortgage insurance required with {effectiveDown}% down.</p>
                )}
              </div>
            </div>

            {/* Property tax context */}
            <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive mb-6">
              <h3 className="text-sm font-bold text-alta-navy mb-2">
                Property Tax: {usingCountyRate ? `${selectedCounty} County, ` : ""}{propertyTaxRates[selectedState]?.name}
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-alta-teal">{taxRate}%</p>
                  <p className="text-[10px] text-alta-gray">{usingCountyRate ? "County Rate" : "State Avg Rate"}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-alta-navy">${fmt(propertyTax)}</p>
                  <p className="text-[10px] text-alta-gray">Annual Tax</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-alta-navy">${fmt(propertyTax / 12)}</p>
                  <p className="text-[10px] text-alta-gray">Monthly (in escrow)</p>
                </div>
              </div>
              <div className="text-[10px] text-alta-gray space-y-1">
                {usingCountyRate ? (
                  <p className="text-green-600"><strong>Using {selectedCounty} County rate:</strong> {taxRate}% — more accurate than the state average of {propertyTaxRates[selectedState]?.rate}%. Note: your actual tax may still vary based on city, school district, and special assessment districts within the county.</p>
                ) : (
                  <p className="text-amber-600"><strong>Using state average.</strong> Select your county above for a more accurate estimate. County rates in {propertyTaxRates[selectedState]?.name} range from {counties.length > 0 ? `${Math.min(...counties.map(c => c.rate))}% to ${Math.max(...counties.map(c => c.rate))}%` : 'varies'}.</p>
                )}
                <p>Sources: Tax Foundation, Census Bureau ACS (2024), county tax assessor data via tax-rates.org</p>
              </div>
            </div>

            {/* 5-year and total cost */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
                <p className="text-xs text-alta-gray mb-1">Total Payments (5 years)</p>
                <p className="text-lg font-bold text-alta-navy">${fmt(calc.totalMonthly * 60)}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
                <p className="text-xs text-alta-gray mb-1">Total Payments ({loanTermYears} years)</p>
                <p className="text-lg font-bold text-alta-navy">${fmt(calc.totalMonthly * calc.numPayments)}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
                <p className="text-xs text-alta-gray mb-1">Total Interest Paid</p>
                <p className="text-lg font-bold text-alta-red">${fmt(calc.totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* Loan type comparison table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-alta-navy mb-4">Loan Type Comparison at ${fmt(homePrice)}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-100 rounded-xl overflow-hidden">
                <thead className="bg-alta-navy text-white">
                  <tr>
                    <th className="px-3 py-2.5 text-left font-semibold">Feature</th>
                    {Object.values(loanTypes).map((lt) => (
                      <th key={lt.name} className={`px-3 py-2.5 text-left font-semibold ${lt.name === config.name ? "bg-alta-teal" : ""}`}>{lt.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-alta-light/50"><td className="px-3 py-2 font-medium text-alta-navy">Min Down Payment</td>{Object.values(loanTypes).map((lt) => <td key={lt.name} className="px-3 py-2">{lt.minDown}%</td>)}</tr>
                  <tr className="hover:bg-alta-light/50"><td className="px-3 py-2 font-medium text-alta-navy">Min Credit Score</td>{Object.values(loanTypes).map((lt) => <td key={lt.name} className="px-3 py-2">{lt.minCredit || "None (620+ typical)"}</td>)}</tr>
                  <tr className="hover:bg-alta-light/50"><td className="px-3 py-2 font-medium text-alta-navy">Upfront Fee</td>{Object.values(loanTypes).map((lt) => <td key={lt.name} className="px-3 py-2">{lt.upfrontMIP > 0 ? `${lt.upfrontMIP}%` : "None"}</td>)}</tr>
                  <tr className="hover:bg-alta-light/50"><td className="px-3 py-2 font-medium text-alta-navy">Monthly MI Rate</td>{Object.values(loanTypes).map((lt) => <td key={lt.name} className="px-3 py-2">{lt.annualMIP > 0 ? `${lt.annualMIP}%/yr` : "None"}</td>)}</tr>
                  <tr className="hover:bg-alta-light/50"><td className="px-3 py-2 font-medium text-alta-navy">MI Removable?</td>{Object.values(loanTypes).map((lt) => <td key={lt.name} className="px-3 py-2">{lt.mipRemovable ? "Yes" : "No*"}</td>)}</tr>
                  <tr className="hover:bg-alta-light/50"><td className="px-3 py-2 font-medium text-alta-navy">Max DTI</td>{Object.values(loanTypes).map((lt) => <td key={lt.name} className="px-3 py-2">{lt.maxDTI}%</td>)}</tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-alta-gray mt-2">* FHA MIP is permanent for most loans (LTV &gt; 90% at origination). USDA guarantee fees are for the life of the loan. Sources: FHA.com, VA.gov, USDA Rural Development, Fannie Mae</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            <Link href="/affordability" className="group p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">Affordability Calculator</h3>
              <p className="text-[10px] text-alta-gray mt-1">How much home can you afford?</p>
            </Link>
            <Link href="/closing-process/closing-costs" className="group p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs Calculator</h3>
              <p className="text-[10px] text-alta-gray mt-1">Estimate all your closing fees</p>
            </Link>
            <Link href="/first-time-buyers" className="group p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">First-Time Buyer Guide</h3>
              <p className="text-[10px] text-alta-gray mt-1">Complete homebuying roadmap</p>
            </Link>
          </div>

          <p className="text-[10px] text-alta-gray mt-6 text-center">* This calculator provides estimates only. Actual payments vary by lender, credit score, location, and loan terms. Property tax rates are state averages — your actual tax depends on county and local assessments. Consult a mortgage professional for exact figures. Sources: Tax Foundation, Census Bureau, FHA.com, VA.gov, USDA.gov, Fannie Mae.</p>
        </div>
      </div>
    </>
  );
}
