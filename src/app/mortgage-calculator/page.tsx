"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3500);
  const [homeInsurance, setHomeInsurance] = useState(1500);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [hoa, setHoa] = useState(0);

  const calc = useMemo(() => {
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const monthlyPI = monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyPMI = downPaymentPct < 20 ? (loanAmount * (pmiRate / 100)) / 12 : 0;
    const monthlyHOA = hoa;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
    const totalInterest = (monthlyPI * numPayments) - loanAmount;
    const totalCost = monthlyPI * numPayments + (monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA) * numPayments;

    return { downPayment, loanAmount, monthlyPI, monthlyTax, monthlyInsurance, monthlyPMI, monthlyHOA, totalMonthly, totalInterest, totalCost, numPayments };
  }, [homePrice, downPaymentPct, interestRate, loanTerm, propertyTax, homeInsurance, pmiRate, hoa]);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  // Pie chart data
  const slices = [
    { label: "Principal & Interest", value: calc.monthlyPI, color: "#0a8ebc" },
    { label: "Property Tax", value: calc.monthlyTax, color: "#d4a843" },
    { label: "Insurance", value: calc.monthlyInsurance, color: "#2d8f5e" },
    ...(calc.monthlyPMI > 0 ? [{ label: "PMI", value: calc.monthlyPMI, color: "#c0392b" }] : []),
    ...(calc.monthlyHOA > 0 ? [{ label: "HOA", value: calc.monthlyHOA, color: "#7e57c2" }] : []),
  ];
  const total = slices.reduce((a, s) => a + s.value, 0);
  let cumAngle = 0;

  return (
    <>
      <PageHero
        title="Mortgage Payment Calculator"
        subtitle="Estimate your monthly mortgage payment including principal, interest, taxes, insurance, and PMI."
        image="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80"
        breadcrumb={[{ label: "Tools", href: "/closing-process" }, { label: "Mortgage Calculator", href: "/mortgage-calculator" }]}
      />

      <div className="py-6 lg:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">See Your Full Monthly Payment</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Adjust the sliders and inputs below to see how your home price, down payment, interest rate, and other factors affect your monthly payment. This calculator includes property taxes, homeowner&apos;s insurance, and PMI.</p>
              </div>
            </div>
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
                      <span className="text-alta-teal font-bold">{downPaymentPct}% (${fmt(homePrice * downPaymentPct / 100)})</span>
                    </div>
                    <input type="range" min={0} max={50} step={1} value={downPaymentPct} onChange={(e) => setDownPaymentPct(Number(e.target.value))} className="w-full accent-[#0a8ebc]" />
                    {downPaymentPct < 20 && <p className="text-xs text-alta-red mt-1">Below 20% requires Private Mortgage Insurance (PMI)</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-alta-navy block mb-1">Interest Rate (%)</label>
                      <input type="number" step={0.125} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-alta-navy block mb-1">Loan Term</label>
                      <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
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
                <h3 className="font-bold text-alta-navy mb-4">Additional Costs</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">Property Tax ($/yr)</label>
                    <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">Home Insurance ($/yr)</label>
                    <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">PMI Rate (%)</label>
                    <input type="number" step={0.1} value={pmiRate} onChange={(e) => setPmiRate(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-alta-navy block mb-1">HOA ($/mo)</label>
                    <input type="number" value={hoa} onChange={(e) => setHoa(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-alta-navy to-[#0d3a5c] rounded-2xl p-6 text-white text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold">${fmt(calc.totalMonthly)}</p>
                <p className="text-xs text-gray-400 mt-2">{loanTerm}-year fixed at {interestRate}%</p>
              </div>

              {/* SVG Donut Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-center mb-4">
                  <svg viewBox="0 0 120 120" className="w-40 h-40">
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
                      return (
                        <path
                          key={s.label}
                          d={`M 60 60 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={s.color}
                          stroke="white"
                          strokeWidth={1}
                        />
                      );
                    })}
                    <circle cx="60" cy="60" r="25" fill="white" />
                    <text x="60" y="57" textAnchor="middle" className="fill-alta-navy font-bold" fontSize="10">${fmt(calc.totalMonthly)}</text>
                    <text x="60" y="68" textAnchor="middle" className="fill-alta-gray" fontSize="6">/month</text>
                  </svg>
                </div>
                <div className="space-y-2">
                  {slices.map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-alta-gray">{s.label}</span>
                      </div>
                      <span className="font-medium text-alta-navy">${fmt(s.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-alta-navy mb-3 text-sm">Loan Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-alta-gray">Loan Amount</span><span className="font-medium text-alta-navy">${fmt(calc.loanAmount)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Down Payment</span><span className="font-medium text-alta-navy">${fmt(calc.downPayment)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Total Interest Paid</span><span className="font-medium text-alta-red">${fmt(calc.totalInterest)}</span></div>
                  <div className="flex justify-between"><span className="text-alta-gray">Est. Closing Costs (3%)</span><span className="font-medium text-alta-navy">${fmt(homePrice * 0.03)}</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2"><span className="text-alta-navy font-semibold">Total Cost of Home</span><span className="font-bold text-alta-teal">${fmt(calc.totalCost + calc.downPayment)}</span></div>
                </div>
              </div>
            </div>
          </div>

          <InlineAd />

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Link href="/closing-process/closing-costs" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-alta-teal/20 transition-all text-center">
              <h3 className="text-sm font-semibold text-alta-navy">Closing Costs Calculator</h3>
              <p className="text-[10px] text-alta-gray mt-1">Estimate all your closing fees</p>
            </Link>
            <Link href="/first-time-buyers" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-alta-teal/20 transition-all text-center">
              <h3 className="text-sm font-semibold text-alta-navy">First-Time Buyer Guide</h3>
              <p className="text-[10px] text-alta-gray mt-1">Complete homebuying roadmap</p>
            </Link>
            <Link href="/find-company" className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-alta-teal/20 transition-all text-center">
              <h3 className="text-sm font-semibold text-alta-navy">Find a Title Company</h3>
              <p className="text-[10px] text-alta-gray mt-1">Search ALTA members near you</p>
            </Link>
          </div>

          <p className="text-[10px] text-alta-gray mt-6 text-center">* This calculator provides estimates only. Actual payments will vary based on your lender, credit score, location, and specific loan terms. Consult a mortgage professional for exact figures.</p>
        </div>
      </div>
    </>
  );
}
