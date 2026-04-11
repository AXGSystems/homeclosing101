"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

export default function AffordabilityPage() {
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPaymentSaved, setDownPaymentSaved] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [dtiLimit, setDtiLimit] = useState(36);

  const calc = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxTotalDebt = monthlyIncome * (dtiLimit / 100);
    const maxMortgagePayment = maxTotalDebt - monthlyDebts;
    if (maxMortgagePayment <= 0) return { maxHome: 0, maxPayment: 0, monthlyIncome, comfortable: 0, stretch: 0 };

    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const maxLoan = monthlyRate > 0
      ? maxMortgagePayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
      : maxMortgagePayment * numPayments;

    const maxHome = maxLoan + downPaymentSaved;
    const comfortable = maxHome * 0.85;
    const stretch = maxHome * 1.1;

    return { maxHome, maxPayment: maxMortgagePayment, monthlyIncome, comfortable, stretch };
  }, [annualIncome, monthlyDebts, downPaymentSaved, interestRate, loanTerm, dtiLimit]);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  const dtiUsed = annualIncome > 0 ? ((monthlyDebts + calc.maxPayment) / (annualIncome / 12) * 100) : 0;

  return (
    <>
      <PageHero
        title="How Much Home Can I Afford?"
        subtitle="Calculate your maximum home price based on your income, debts, and savings. Understand your debt-to-income ratio and buying power."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[{ label: "Tools", href: "/closing-process" }, { label: "Affordability", href: "/affordability" }]}
      />

      <div className="py-3 lg:py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Know Your Buying Power Before You Shop</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Most lenders use the 28/36 rule: your housing costs shouldn&apos;t exceed 28% of gross income, and total debts shouldn&apos;t exceed 36%. Adjust the DTI slider below to see how different limits affect your buying power.</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-alta-navy mb-5">Your Financial Profile</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-alta-navy">Annual Gross Income</label>
                    <span className="text-alta-teal font-bold">${fmt(annualIncome)}</span>
                  </div>
                  <input type="range" min={20000} max={500000} step={5000} value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full accent-[#0a8ebc]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-alta-navy">Monthly Debts (car, student loans, credit cards)</label>
                    <span className="text-alta-teal font-bold">${fmt(monthlyDebts)}</span>
                  </div>
                  <input type="range" min={0} max={5000} step={50} value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} className="w-full accent-[#0a8ebc]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-alta-navy">Down Payment Saved</label>
                    <span className="text-alta-teal font-bold">${fmt(downPaymentSaved)}</span>
                  </div>
                  <input type="range" min={0} max={500000} step={5000} value={downPaymentSaved} onChange={(e) => setDownPaymentSaved(Number(e.target.value))} className="w-full accent-[#0a8ebc]" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">Rate (%)</label>
                    <input type="number" step={0.125} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">Term</label>
                    <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      <option value={30}>30 yr</option><option value={15}>15 yr</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">DTI Limit</label>
                    <select value={dtiLimit} onChange={(e) => setDtiLimit(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      <option value={28}>28% Conservative</option><option value={36}>36% Standard</option><option value={43}>43% FHA Max</option><option value={50}>50% VA/Stretch</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-5">
              {/* Main result */}
              <div className="bg-gradient-to-br from-alta-navy to-[#0d3a5c] rounded-2xl p-6 text-white text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">You Can Afford Up To</p>
                <p className="text-4xl lg:text-5xl font-bold">${fmt(calc.maxHome)}</p>
                <p className="text-xs text-gray-400 mt-2">Based on {dtiLimit}% DTI at {interestRate}% for {loanTerm} years</p>
              </div>

              {/* Range */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 tile-interactive">
                <h3 className="font-bold text-alta-navy mb-3 text-sm">Your Price Range</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-lg font-bold text-green-700">${fmt(calc.comfortable)}</p>
                    <p className="text-[10px] text-green-600 font-medium">Comfortable</p>
                  </div>
                  <div className="p-3 bg-alta-light rounded-xl border-2 border-alta-teal">
                    <p className="text-lg font-bold text-alta-teal">${fmt(calc.maxHome)}</p>
                    <p className="text-[10px] text-alta-teal font-medium">Target</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-lg font-bold text-amber-700">${fmt(calc.stretch)}</p>
                    <p className="text-[10px] text-amber-600 font-medium">Stretch</p>
                  </div>
                </div>
              </div>

              {/* DTI Gauge */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 tile-interactive">
                <h3 className="font-bold text-alta-navy mb-3 text-sm">Debt-to-Income Ratio</h3>
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full transition-all ${dtiUsed <= 36 ? 'bg-green-500' : dtiUsed <= 43 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(dtiUsed, 100)}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-alta-gray">
                  <span>0%</span><span className="text-green-600">28% ideal</span><span className="text-amber-600">36%</span><span className="text-red-600">43% FHA</span><span>50%+</span>
                </div>
                <p className="text-center mt-2 text-sm"><span className="font-bold text-alta-navy">{Math.round(dtiUsed)}%</span> <span className="text-alta-gray">of your income goes to debt</span></p>
              </div>

              {/* Monthly breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 tile-interactive">
                <h3 className="font-bold text-alta-navy mb-3 text-sm">Monthly Budget</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-alta-gray">Gross Monthly Income</span><span className="font-medium text-alta-navy">${fmt(calc.monthlyIncome)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Existing Monthly Debts</span><span className="font-medium text-alta-red">-${fmt(monthlyDebts)}</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-2"><span className="text-alta-navy font-semibold">Max Mortgage Payment</span><span className="font-bold text-alta-teal">${fmt(calc.maxPayment)}</span></div>
                </div>
              </div>
            </div>
          </div>

          <InlineAd />

          {/* Hidden costs of homeownership */}
          <h2 className="text-xl font-bold text-alta-navy mb-4 mt-6">Hidden Costs Beyond the Mortgage</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Your mortgage payment is just the beginning. Real homeownership costs include ongoing expenses many first-time buyers don&apos;t budget for. Factor these into your affordability calculation:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { cost: "Maintenance & Repairs", amount: "1-2% of home value/year", detail: "For a $350K home, budget $3,500-$7,000 annually. HVAC replacement: $5,000-$10,000. Roof: $8,000-$15,000. Water heater: $800-$1,500.", color: "bg-blue-50 border-blue-200" },
              { cost: "Property Taxes", amount: "0.27%-2.33% of value/year", detail: "Varies dramatically by state and county. Hawaii: 0.27%. New Jersey: 2.33%. Your county assessor sets the assessed value. Can be appealed.", color: "bg-green-50 border-green-200", source: "Tax Foundation" },
              { cost: "Homeowner's Insurance", amount: "$1,200-$3,000+/year", detail: "Required by lenders. Covers fire, storms, theft, liability. Flood insurance is separate and required in FEMA flood zones. Shop at least 3 providers.", color: "bg-amber-50 border-amber-200" },
              { cost: "HOA Fees", amount: "$0-$500+/month", detail: "If applicable. Covers shared amenities, exterior maintenance, insurance on common areas. Review the HOA's financial health before buying — weak reserves mean special assessments.", color: "bg-purple-50 border-purple-200" },
              { cost: "Utilities", amount: "$200-$500+/month", detail: "Electric, gas, water, sewer, trash, internet. Typically 50-100% more than renting because you're paying for an entire house, not an apartment unit.", color: "bg-red-50 border-red-200" },
              { cost: "PMI (if <20% down)", amount: "0.5-1.5% of loan/year", detail: "For a $300K loan at 0.7%: $2,100/year ($175/month). Removable at 20% equity on conventional loans. FHA MIP is for life on most loans. VA has no PMI.", color: "bg-teal-50 border-teal-200", source: "CFPB" },
            ].map((c) => (
              <div key={c.cost} className={`p-4 ${c.color} rounded-xl border tile-interactive`}>
                <h3 className="text-sm font-bold text-alta-navy">{c.cost}</h3>
                <p className="text-xs font-semibold text-alta-teal mt-0.5">{c.amount}</p>
                <p className="text-[10px] text-alta-gray mt-1 leading-relaxed">{c.detail}</p>
                {c.source && <p className="text-[9px] text-alta-teal mt-1 font-medium">Source: {c.source}</p>}
              </div>
            ))}
          </div>

          {/* The real budget */}
          <div className="p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 mb-8">
            <h3 className="font-bold text-alta-navy mb-3">What Your Real Monthly Budget Looks Like</h3>
            <p className="text-xs text-alta-gray mb-3 leading-relaxed">Example for a $350,000 home with 10% down, 6.5% rate, 30-year conventional loan in a state with 1% property tax:</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-alta-gray">Principal & Interest</span><span className="font-medium text-alta-navy">$1,991</span></div>
              <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-alta-gray">Property Tax (1%)</span><span className="font-medium text-alta-navy">$292</span></div>
              <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-alta-gray">Homeowner&apos;s Insurance</span><span className="font-medium text-alta-navy">$150</span></div>
              <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-alta-gray">PMI (0.7% — under 20% down)</span><span className="font-medium text-amber-600">$184</span></div>
              <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-alta-gray">Maintenance Reserve (1.5%)</span><span className="font-medium text-alta-gray">$438</span></div>
              <div className="flex justify-between p-2 bg-white rounded-lg"><span className="text-alta-gray">Utilities (avg)</span><span className="font-medium text-alta-gray">$300</span></div>
              <div className="flex justify-between p-2 bg-alta-teal/10 rounded-lg border border-alta-teal/20"><span className="font-semibold text-alta-navy">True Monthly Cost</span><span className="font-bold text-alta-teal">$3,355</span></div>
            </div>
            <p className="text-[10px] text-alta-gray mt-3">The mortgage payment alone is $1,991 — but the true cost of owning the home is $3,355/month when you include everything. Budget for the REAL number, not just the mortgage.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/mortgage-calculator" className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy">Mortgage Calculator</h3>
              <p className="text-[10px] text-alta-gray mt-1">Exact monthly payments with taxes and PMI</p>
            </Link>
            <Link href="/closing-process/closing-costs" className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy">Closing Costs</h3>
              <p className="text-[10px] text-alta-gray mt-1">Estimate 2-5% in upfront closing fees</p>
            </Link>
            <Link href="/first-time-buyers" className="p-4 bg-white rounded-xl border border-gray-100 tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy">First-Time Guide</h3>
              <p className="text-[10px] text-alta-gray mt-1">Complete roadmap to homeownership</p>
            </Link>
          </div>

          <p className="text-[10px] text-alta-gray mt-6 text-center">* This is an estimate for educational purposes. Your actual buying power depends on credit score, specific loan program, and lender requirements. Get pre-approved by a lender for an accurate number.</p>
        </div>
      </div>
    </>
  );
}
