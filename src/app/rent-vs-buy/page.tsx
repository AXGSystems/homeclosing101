"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const fmt = (n: number) => Math.round(n).toLocaleString();
const fmtDollar = (n: number) => `$${fmt(Math.abs(n))}`;

export default function RentVsBuyPage() {
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [annualRentIncrease, setAnnualRentIncrease] = useState(3);
  const [homeAppreciation, setHomeAppreciation] = useState(3.5);
  const [yearsToCompare, setYearsToCompare] = useState(7);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 100 / 12;
    const numPayments = 30 * 12; // 30-year fixed
    const monthlyMortgage =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        : loanAmount / numPayments;

    // Property tax: ~1.1% of home value annually
    const annualPropertyTaxRate = 0.011;
    // Home insurance: ~0.35% of home value annually
    const annualInsuranceRate = 0.0035;
    // Maintenance: ~1% of home value annually
    const annualMaintenanceRate = 0.01;
    // PMI if down < 20%: ~0.5% of loan annually
    const annualPMIRate = downPaymentPct < 20 ? 0.005 : 0;
    // Closing costs: ~3% of home price (one-time)
    const closingCosts = homePrice * 0.03;

    // Year-by-year calculation
    let totalRent = 0;
    let totalOwnership = closingCosts + downPayment;
    let currentRent = monthlyRent;
    let currentHomeValue = homePrice;
    let loanBalance = loanAmount;
    let breakEvenYear: number | null = null;

    // Track cumulative totals for break-even (net cost = total paid - equity)
    let cumulativeRentCost = 0;
    let cumulativeOwnershipNetCost = closingCosts; // upfront closing costs

    for (let year = 1; year <= yearsToCompare; year++) {
      // Rent cost for this year
      const yearRent = currentRent * 12;
      totalRent += yearRent;
      cumulativeRentCost += yearRent;

      // Ownership costs for this year
      const yearMortgage = monthlyMortgage * 12;
      const yearPropertyTax = currentHomeValue * annualPropertyTaxRate;
      const yearInsurance = currentHomeValue * annualInsuranceRate;
      const yearMaintenance = currentHomeValue * annualMaintenanceRate;

      // PMI drops off when equity reaches 20%
      const equityPct = 1 - loanBalance / currentHomeValue;
      const yearPMI = equityPct < 0.2 ? loanBalance * annualPMIRate : 0;

      const yearOwnershipCost =
        yearMortgage + yearPropertyTax + yearInsurance + yearMaintenance + yearPMI;
      totalOwnership += yearOwnershipCost;

      // Calculate principal paid this year (reduces loan balance)
      let principalPaidThisYear = 0;
      for (let m = 0; m < 12; m++) {
        const interestPayment = loanBalance * (mortgageRate / 100 / 12);
        const principalPayment = monthlyMortgage - interestPayment;
        principalPaidThisYear += principalPayment;
        loanBalance = Math.max(0, loanBalance - principalPayment);
      }

      // Home appreciation
      currentHomeValue *= 1 + homeAppreciation / 100;

      // Net ownership cost = total paid - equity built
      const equityBuilt = currentHomeValue - loanBalance - downPayment; // net equity gain beyond down payment
      cumulativeOwnershipNetCost += yearOwnershipCost;
      const netOwnershipCost = cumulativeOwnershipNetCost - equityBuilt;

      // Check break-even
      if (breakEvenYear === null && netOwnershipCost <= cumulativeRentCost) {
        breakEvenYear = year;
      }

      // Rent increases for next year
      currentRent *= 1 + annualRentIncrease / 100;
    }

    // Final equity
    const finalEquity = currentHomeValue - loanBalance;
    // Net ownership cost = total cash out - equity gained
    const netOwnershipCost = totalOwnership - finalEquity;
    const difference = totalRent - netOwnershipCost;

    return {
      totalRent,
      totalOwnership,
      finalEquity,
      netOwnershipCost,
      difference, // positive = buying saves, negative = renting cheaper
      breakEvenYear,
      buyingIsCheaper: difference > 0,
      closingCosts,
      downPayment,
      monthlyMortgage,
    };
  }, [
    monthlyRent,
    homePrice,
    downPaymentPct,
    mortgageRate,
    annualRentIncrease,
    homeAppreciation,
    yearsToCompare,
  ]);

  // Bar chart values
  const maxBar = Math.max(results.totalRent, results.netOwnershipCost);

  return (
    <>
      <PageHero
        title="Rent vs. Buy Calculator"
        subtitle="Compare the true cost of renting versus buying a home over time. Factor in equity, appreciation, taxes, and maintenance to find your break-even point."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "Resources", href: "/resources" },
          { label: "Rent vs Buy", href: "/rent-vs-buy" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Intro card */}
          <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0a7ea8]/10 flex items-center justify-center text-[#0a7ea8] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Should You Rent or Buy?</h2>
                <p className="text-sm text-alta-gray leading-relaxed">
                  The answer depends on your local market, how long you plan to stay, and your financial situation.
                  This calculator compares total costs over time, including equity you build as a homeowner.
                  Adjust the inputs below to model your specific scenario.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-6">
            {/* Inputs */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#0a7ea8] shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Rental Costs</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Monthly Rent</label>
                      <span className="text-alta-teal font-bold">${fmt(monthlyRent)}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={5000}
                      step={50}
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>$500</span>
                      <span>$5,000</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Annual Rent Increase</label>
                      <span className="text-alta-teal font-bold">{annualRentIncrease}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={0.5}
                      value={annualRentIncrease}
                      onChange={(e) => setAnnualRentIncrease(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>1%</span>
                      <span>5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#2d6b3f] shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Home Purchase Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Home Purchase Price</label>
                      <span className="text-alta-teal font-bold">${fmt(homePrice)}</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={1000000}
                      step={5000}
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="w-full accent-[#0a8ebc]"
                    />
                    <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                      <span>$100K</span>
                      <span>$1M</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <label className="font-medium text-alta-navy">Down Payment</label>
                      <span className="text-alta-teal font-bold">
                        {downPaymentPct}% (${fmt(homePrice * downPaymentPct / 100)})
                      </span>
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
                    {downPaymentPct < 20 && (
                      <p className="text-xs text-amber-600 mt-1">
                        Below 20% requires Private Mortgage Insurance (PMI) — approximately ${fmt(results.monthlyMortgage > 0 ? (homePrice - homePrice * downPaymentPct / 100) * 0.005 / 12 : 0)}/mo
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
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
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <label className="font-medium text-alta-navy">Appreciation Rate</label>
                        <span className="text-alta-teal font-bold">{homeAppreciation}%</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        step={0.5}
                        value={homeAppreciation}
                        onChange={(e) => setHomeAppreciation(Number(e.target.value))}
                        className="w-full accent-[#0a8ebc]"
                      />
                      <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                        <span>1%</span>
                        <span>8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#5b3a8c] shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Comparison Period</h3>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-alta-navy">Years to Compare</label>
                    <span className="text-alta-teal font-bold">{yearsToCompare} years</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={yearsToCompare}
                    onChange={(e) => setYearsToCompare(Number(e.target.value))}
                    className="w-full accent-[#0a8ebc]"
                  />
                  <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results panel */}
            <div className="space-y-5">
              {/* Verdict card */}
              <div
                className={`rounded-2xl border-2 p-5 shadow-md ${
                  results.buyingIsCheaper
                    ? "border-[#2d6b3f] bg-gradient-to-br from-[#2d6b3f]/5 to-[#2d6b3f]/10"
                    : "border-[#0a7ea8] bg-gradient-to-br from-[#0a7ea8]/5 to-[#0a7ea8]/10"
                }`}
              >
                <div className="text-center mb-4">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${
                      results.buyingIsCheaper ? "bg-[#2d6b3f]" : "bg-[#0a7ea8]"
                    }`}
                  >
                    {results.buyingIsCheaper ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Buying saves {fmtDollar(results.difference)}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                        Renting is cheaper by {fmtDollar(results.difference)}
                      </>
                    )}
                  </div>
                  <p className="text-xs text-alta-gray mt-2">
                    Over {yearsToCompare} {yearsToCompare === 1 ? "year" : "years"}
                  </p>
                </div>

                {results.breakEvenYear !== null ? (
                  <div className="text-center p-3 bg-white/60 rounded-xl border border-gray-200">
                    <p className="text-xs text-alta-gray">Break-even point</p>
                    <p className="text-lg font-bold text-alta-navy">
                      Year {results.breakEvenYear}
                    </p>
                    <p className="text-[11px] text-alta-gray">
                      Buying becomes cheaper than renting after {results.breakEvenYear}{" "}
                      {results.breakEvenYear === 1 ? "year" : "years"}
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-3 bg-white/60 rounded-xl border border-gray-200">
                    <p className="text-xs text-alta-gray">Break-even point</p>
                    <p className="text-sm font-bold text-alta-navy">
                      Not reached within {yearsToCompare} years
                    </p>
                    <p className="text-[11px] text-alta-gray">
                      Try extending the comparison period or adjusting inputs
                    </p>
                  </div>
                )}
              </div>

              {/* Cost breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-4">Cost Comparison</h3>
                <div className="space-y-4">
                  {/* Total Rent */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-alta-navy">Total Rent Paid</span>
                      <span className="font-bold text-[#0a7ea8]">{fmtDollar(results.totalRent)}</span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0a7ea8] to-[#0a8ebc] rounded-full transition-all duration-500"
                        style={{ width: `${maxBar > 0 ? (results.totalRent / maxBar) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-alta-gray mt-0.5">
                      {yearsToCompare} years of rent with {annualRentIncrease}% annual increases
                    </p>
                  </div>

                  {/* Net Ownership Cost */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-alta-navy">Net Cost of Buying</span>
                      <span className="font-bold text-[#2d6b3f]">
                        {results.netOwnershipCost < 0
                          ? `-${fmtDollar(results.netOwnershipCost)}`
                          : fmtDollar(results.netOwnershipCost)}
                      </span>
                    </div>
                    <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2d6b3f] to-[#3da35d] rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            maxBar > 0 && results.netOwnershipCost > 0
                              ? (results.netOwnershipCost / maxBar) * 100
                              : results.netOwnershipCost <= 0
                              ? 2
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-alta-gray mt-0.5">
                      Total paid minus equity built ({fmtDollar(results.finalEquity)} in equity)
                    </p>
                  </div>
                </div>

                {/* Detailed breakdown */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-alta-navy mb-3 uppercase tracking-wider">
                    Ownership Breakdown
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-alta-gray">Down Payment</span>
                      <span className="font-medium text-alta-navy">{fmtDollar(results.downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alta-gray">Closing Costs (est. 3%)</span>
                      <span className="font-medium text-alta-navy">{fmtDollar(results.closingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alta-gray">Total Ownership Costs</span>
                      <span className="font-medium text-alta-navy">{fmtDollar(results.totalOwnership)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alta-gray">Home Equity Built</span>
                      <span className="font-medium text-[#2d6b3f]">-{fmtDollar(results.finalEquity)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="font-bold text-alta-navy">Net Cost of Ownership</span>
                      <span className="font-bold text-alta-navy">
                        {results.netOwnershipCost < 0 ? `-${fmtDollar(results.netOwnershipCost)}` : fmtDollar(results.netOwnershipCost)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alta-gray">Monthly Mortgage (P&I)</span>
                      <span className="font-medium text-alta-navy">{fmtDollar(results.monthlyMortgage)}/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <InlineAd />
            </div>
          </div>

          {/* Key Assumptions */}
          <div className="mt-8 bg-alta-light rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-alta-navy mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Key Assumptions
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-alta-gray">
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>30-year fixed-rate mortgage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Property tax: 1.1% of home value annually</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Homeowner&apos;s insurance: 0.35% of home value annually</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Maintenance: 1% of home value annually</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>PMI: 0.5% of loan balance (if down payment &lt; 20%)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Closing costs: 3% of purchase price (one-time)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Does not include tax deductions for mortgage interest</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Does not include opportunity cost of down payment investment</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Renter&apos;s insurance not included (typically $15-30/mo)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 bg-alta-teal rounded-full mt-1.5 shrink-0" />
                <span>Selling costs (5-6% agent commissions) not included</span>
              </div>
            </div>
          </div>

          <FirstTimeBuyerCTA />

          {/* Related Topics */}
          <div className="mt-8 mb-8">
            <h3 className="font-bold text-alta-navy mb-4">Related Topics</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Affordability Calculator",
                  desc: "Calculate how much home you can afford based on income, debts, and down payment.",
                  href: "/affordability",
                  color: "border-l-[#0a7ea8]",
                },
                {
                  label: "Mortgage Calculator",
                  desc: "Compare Conventional, FHA, VA & USDA with county-level property tax rates.",
                  href: "/mortgage-calculator",
                  color: "border-l-[#2d6b3f]",
                },
                {
                  label: "First-Time Buyer Guide",
                  desc: "5-phase, 27-step roadmap from credit prep to closing day.",
                  href: "/first-time-buyers",
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
