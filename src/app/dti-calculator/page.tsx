"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DTIGauge from "@/components/DTIGauge";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

function InputField({ label, value, onChange, placeholder }: { label: string; value: number; onChange: (v: number) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-alta-navy mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-alta-gray text-sm">$</span>
        <input
          type="number"
          min={0}
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          placeholder={placeholder || "0"}
          className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal outline-none transition-colors"
        />
      </div>
    </div>
  );
}

export default function DTICalculatorPage() {
  // Income inputs
  const [grossSalary, setGrossSalary] = useState(6000);
  const [bonusCommission, setBonusCommission] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);

  // Housing debt inputs
  const [mortgagePayment, setMortgagePayment] = useState(1500);
  const [propertyTax, setPropertyTax] = useState(250);
  const [homeInsurance, setHomeInsurance] = useState(125);
  const [hoaFees, setHoaFees] = useState(0);

  // Other debt inputs
  const [carPayment, setCarPayment] = useState(350);
  const [studentLoans, setStudentLoans] = useState(200);
  const [creditCards, setCreditCards] = useState(100);
  const [personalLoans, setPersonalLoans] = useState(0);
  const [childSupport, setChildSupport] = useState(0);
  const [otherDebt, setOtherDebt] = useState(0);

  const calc = useMemo(() => {
    const totalIncome = grossSalary + bonusCommission + rentalIncome + otherIncome;
    const housingDebt = mortgagePayment + propertyTax + homeInsurance + hoaFees;
    const nonHousingDebt = carPayment + studentLoans + creditCards + personalLoans + childSupport + otherDebt;
    const totalDebt = housingDebt + nonHousingDebt;

    const frontEndDTI = totalIncome > 0 ? (housingDebt / totalIncome) * 100 : 0;
    const backEndDTI = totalIncome > 0 ? (totalDebt / totalIncome) * 100 : 0;

    // Max mortgage payment at 28% front-end DTI
    const maxHousingAt28 = totalIncome * 0.28;
    const maxMortgageAt28 = Math.max(0, maxHousingAt28 - propertyTax - homeInsurance - hoaFees);

    // Max mortgage payment at 36% back-end DTI
    const maxTotalAt36 = totalIncome * 0.36;
    const maxMortgageAt36 = Math.max(0, maxTotalAt36 - nonHousingDebt - propertyTax - homeInsurance - hoaFees);

    // Max mortgage payment at 43% back-end DTI (FHA/qualified mortgage limit)
    const maxTotalAt43 = totalIncome * 0.43;
    const maxMortgageAt43 = Math.max(0, maxTotalAt43 - nonHousingDebt - propertyTax - homeInsurance - hoaFees);

    // Recommended max is the lesser of front-end 28% and back-end 36%
    const recommendedMaxMortgage = Math.min(maxMortgageAt28, maxMortgageAt36);

    return {
      totalIncome,
      housingDebt,
      nonHousingDebt,
      totalDebt,
      frontEndDTI,
      backEndDTI,
      maxMortgageAt28,
      maxMortgageAt36,
      maxMortgageAt43,
      recommendedMaxMortgage,
    };
  }, [grossSalary, bonusCommission, rentalIncome, otherIncome, mortgagePayment, propertyTax, homeInsurance, hoaFees, carPayment, studentLoans, creditCards, personalLoans, childSupport, otherDebt]);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  const getInterpretation = (dti: number) => {
    if (dti <= 28) return { text: "Excellent. Lenders see you as a low-risk borrower. You should qualify for the best rates and terms available.", color: "text-[#2d6b3f]", bg: "bg-[#e8f5e9]", border: "border-[#2d6b3f]" };
    if (dti <= 36) return { text: "Good. Most conventional lenders will approve you comfortably. You have room in your budget for unexpected expenses.", color: "text-[#0a7ea8]", bg: "bg-[#e6f1f5]", border: "border-[#0a7ea8]" };
    if (dti <= 43) return { text: "Acceptable. You may still qualify for a mortgage (43% is the QM limit), but your options narrow and rates may be higher. FHA loans allow up to 50% in some cases.", color: "text-[#8b6914]", bg: "bg-[#faf4e4]", border: "border-[#8b6914]" };
    return { text: "High Risk. Most lenders will decline conventional loans above 43% DTI. You should focus on reducing debt or increasing income before applying.", color: "text-[#943030]", bg: "bg-[#fbe8e8]", border: "border-[#943030]" };
  };

  const frontInterpretation = getInterpretation(calc.frontEndDTI);
  const backInterpretation = getInterpretation(calc.backEndDTI);

  return (
    <div>
      <PageHero
        title="Debt-to-Income (DTI) Calculator"
        subtitle="Your DTI ratio is one of the most important numbers in your mortgage application. Find out where you stand and what lenders will see."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
        breadcrumb={[
          { label: "Tools", href: "/resources" },
          { label: "DTI Calculator", href: "/dti-calculator" },
        ]}
      />

      <div className="py-4 lg:py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Explainer */}
          <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8]">
            <h2 className="text-sm font-bold text-alta-navy mb-1">What is DTI?</h2>
            <p className="text-xs text-alta-gray leading-relaxed">
              Your <strong>debt-to-income ratio (DTI)</strong> compares your monthly debt payments to your gross monthly income. Lenders use two versions: the <strong>front-end ratio</strong> (housing costs only) and the <strong>back-end ratio</strong> (all monthly debts). Most conventional lenders want a front-end DTI under 28% and a back-end DTI under 36%. The qualified mortgage (QM) hard cap is 43%.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left column: Inputs */}
            <div className="lg:col-span-1 space-y-5">

              {/* Monthly Income */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#2d6b3f]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#2d6b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-alta-navy">Monthly Gross Income</h3>
                </div>
                <div className="space-y-3">
                  <InputField label="Gross Monthly Salary" value={grossSalary} onChange={setGrossSalary} placeholder="6,000" />
                  <InputField label="Bonus / Commission (monthly avg)" value={bonusCommission} onChange={setBonusCommission} />
                  <InputField label="Rental Income" value={rentalIncome} onChange={setRentalIncome} />
                  <InputField label="Other Income" value={otherIncome} onChange={setOtherIncome} />
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-alta-gray">Total Income</span>
                    <span className="text-sm font-bold text-[#2d6b3f]">${fmt(calc.totalIncome)}/mo</span>
                  </div>
                </div>
              </div>

              {/* Housing Costs */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#0a7ea8]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0a7ea8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-alta-navy">Housing Costs (PITI)</h3>
                </div>
                <div className="space-y-3">
                  <InputField label="Mortgage Payment (P&I)" value={mortgagePayment} onChange={setMortgagePayment} placeholder="1,500" />
                  <InputField label="Property Tax (monthly)" value={propertyTax} onChange={setPropertyTax} placeholder="250" />
                  <InputField label="Homeowner's Insurance (monthly)" value={homeInsurance} onChange={setHomeInsurance} placeholder="125" />
                  <InputField label="HOA Fees" value={hoaFees} onChange={setHoaFees} />
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-alta-gray">Total Housing</span>
                    <span className="text-sm font-bold text-[#0a7ea8]">${fmt(calc.housingDebt)}/mo</span>
                  </div>
                </div>
              </div>

              {/* Other Debts */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#943030]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#943030]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                  </div>
                  <h3 className="text-sm font-bold text-alta-navy">Other Monthly Debts</h3>
                </div>
                <div className="space-y-3">
                  <InputField label="Car Payment" value={carPayment} onChange={setCarPayment} placeholder="350" />
                  <InputField label="Student Loans" value={studentLoans} onChange={setStudentLoans} placeholder="200" />
                  <InputField label="Credit Cards (min payment)" value={creditCards} onChange={setCreditCards} placeholder="100" />
                  <InputField label="Personal Loans" value={personalLoans} onChange={setPersonalLoans} />
                  <InputField label="Child Support / Alimony" value={childSupport} onChange={setChildSupport} />
                  <InputField label="Other Monthly Debts" value={otherDebt} onChange={setOtherDebt} />
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium text-alta-gray">Total Other Debts</span>
                    <span className="text-sm font-bold text-[#943030]">${fmt(calc.nonHousingDebt)}/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Results */}
            <div className="lg:col-span-2 space-y-5">

              {/* Gauges */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-alta-navy mb-4">Your DTI Ratios</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <DTIGauge value={calc.frontEndDTI} label="Front-End DTI (Housing Only)" />
                    <p className="text-xs text-alta-gray mt-2">Housing: ${fmt(calc.housingDebt)} / Income: ${fmt(calc.totalIncome)}</p>
                    <div className={`mt-3 p-3 rounded-lg border-l-4 ${frontInterpretation.bg} ${frontInterpretation.border}`}>
                      <p className={`text-xs leading-relaxed ${frontInterpretation.color}`}>{frontInterpretation.text}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <DTIGauge value={calc.backEndDTI} label="Back-End DTI (All Debts)" />
                    <p className="text-xs text-alta-gray mt-2">All Debts: ${fmt(calc.totalDebt)} / Income: ${fmt(calc.totalIncome)}</p>
                    <div className={`mt-3 p-3 rounded-lg border-l-4 ${backInterpretation.bg} ${backInterpretation.border}`}>
                      <p className={`text-xs leading-relaxed ${backInterpretation.color}`}>{backInterpretation.text}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Lenders See */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-alta-navy mb-3">What Lenders See</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-[#e8f5e9] rounded-lg text-center border border-[#c8e6c9]">
                      <p className="text-[10px] text-[#2d6b3f] font-medium mb-1">Ideal Zone</p>
                      <p className="text-lg font-bold text-[#2d6b3f]">&lt;36%</p>
                      <p className="text-xs text-alta-gray">Best rates & terms</p>
                    </div>
                    <div className="p-3 bg-[#faf4e4] rounded-lg text-center border border-[#e8d9a8]">
                      <p className="text-[10px] text-[#8b6914] font-medium mb-1">Caution Zone</p>
                      <p className="text-lg font-bold text-[#8b6914]">36-43%</p>
                      <p className="text-xs text-alta-gray">Higher rates likely</p>
                    </div>
                    <div className="p-3 bg-[#fbe8e8] rounded-lg text-center border border-[#f5c6c6]">
                      <p className="text-[10px] text-[#943030] font-medium mb-1">Danger Zone</p>
                      <p className="text-lg font-bold text-[#943030]">&gt;43%</p>
                      <p className="text-xs text-alta-gray">Most lenders decline</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f4f7fa] rounded-lg">
                    <p className="text-xs text-alta-gray leading-relaxed">
                      <strong className="text-alta-navy">Your back-end DTI is {calc.backEndDTI.toFixed(1)}%.</strong>{" "}
                      {calc.backEndDTI <= 36 && "You are in a strong position. Lenders will view your debt load favorably, and you should have access to competitive interest rates and flexible loan options."}
                      {calc.backEndDTI > 36 && calc.backEndDTI <= 43 && "You are in the caution zone. While you may still qualify for a Qualified Mortgage (the QM cap is 43%), expect stricter scrutiny, higher rates, and potentially larger down payment requirements. FHA loans may offer more flexibility."}
                      {calc.backEndDTI > 43 && calc.backEndDTI <= 50 && "You exceed the Qualified Mortgage limit of 43%. Most conventional lenders will decline your application. FHA loans may still be possible up to 50% DTI with strong compensating factors (cash reserves, high credit score). Focus on paying down debt before applying."}
                      {calc.backEndDTI > 50 && "You are well above safe lending limits. Nearly all lenders will decline at this ratio. Before applying for a mortgage, prioritize aggressive debt reduction. See the tips below for strategies."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Max Mortgage Affordability */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-alta-navy mb-3">Max Mortgage Payment You Can Afford</h3>
                <p className="text-xs text-alta-gray mb-4">Based on your income and existing debts, here is the maximum mortgage payment (P&I only) at each DTI threshold. Property tax, insurance, and HOA are subtracted.</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-[#e8f5e9] rounded-xl border border-[#c8e6c9] text-center">
                    <p className="text-[10px] font-medium text-[#2d6b3f] mb-1">Conservative (28% front-end)</p>
                    <p className="text-xl font-bold text-[#2d6b3f]">${fmt(calc.maxMortgageAt28)}</p>
                    <p className="text-xs text-alta-gray mt-1">per month</p>
                  </div>
                  <div className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] text-center">
                    <p className="text-[10px] font-medium text-[#0a7ea8] mb-1">Standard (36% back-end)</p>
                    <p className="text-xl font-bold text-[#0a7ea8]">${fmt(calc.maxMortgageAt36)}</p>
                    <p className="text-xs text-alta-gray mt-1">per month</p>
                  </div>
                  <div className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] text-center">
                    <p className="text-[10px] font-medium text-[#8b6914] mb-1">Maximum QM (43% back-end)</p>
                    <p className="text-xl font-bold text-[#8b6914]">${fmt(calc.maxMortgageAt43)}</p>
                    <p className="text-xs text-alta-gray mt-1">per month</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-[#f0ecf6] rounded-lg border border-[#d4c8e4]">
                  <p className="text-xs text-alta-gray leading-relaxed">
                    <strong className="text-[#5b3a8c]">Recommended max mortgage payment: ${fmt(calc.recommendedMaxMortgage)}/mo</strong> — this is the lower of the 28% front-end and 36% back-end limits, the standard most financial advisors recommend.
                  </p>
                </div>
              </div>

              <InlineAd />

              {/* How to Lower Your DTI */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-alta-navy mb-3">How to Lower Your DTI</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { title: "Pay Down Credit Cards First", desc: "Credit cards have the highest minimum payments relative to balance. Paying off a $5,000 card can drop your DTI by 2-3%.", icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z", color: "#0a7ea8" },
                    { title: "Pay Off Small Balances", desc: "Eliminating a $150/mo car payment entirely is more impactful than reducing a $500 payment by $150. Target debts you can fully eliminate.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#2d6b3f" },
                    { title: "Increase Your Income", desc: "A side income of $500/mo lowers your DTI significantly. Lenders accept documented side income if you can show 2 years of history.", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#5b3a8c" },
                    { title: "Refinance Existing Loans", desc: "Extending a car loan or consolidating student loans can lower monthly payments. This doesn't reduce total debt but improves your ratio.", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182", color: "#8b6914" },
                    { title: "Avoid New Debt Before Applying", desc: "Do not finance furniture, a car, or open new credit cards in the months before your mortgage application. Every new payment raises your DTI.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "#943030" },
                    { title: "Add a Co-Borrower", desc: "A spouse or co-borrower's income is added to yours, lowering the combined DTI. Their debts are also counted, so run the numbers first.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", color: "#0a7ea8" },
                  ].map((tip) => (
                    <div key={tip.title} className="flex items-start gap-3 p-3 bg-[#f4f7fa] rounded-xl">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${tip.color}15` }}>
                        <svg className="w-4 h-4" style={{ color: tip.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tip.icon} /></svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-alta-navy">{tip.title}</h4>
                        <p className="text-xs text-alta-gray mt-0.5 leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DTI by loan type */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-alta-navy mb-3">DTI Limits by Loan Type</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-alta-navy">Loan Type</th>
                        <th className="text-center py-2 font-semibold text-alta-navy">Front-End Max</th>
                        <th className="text-center py-2 font-semibold text-alta-navy">Back-End Max</th>
                        <th className="text-left py-2 font-semibold text-alta-navy">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 font-medium text-alta-navy">Conventional</td>
                        <td className="py-2 text-center">28%</td>
                        <td className="py-2 text-center">36-45%</td>
                        <td className="py-2 text-alta-gray">Up to 45% with strong compensating factors (high credit, reserves)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-alta-navy">FHA</td>
                        <td className="py-2 text-center">31%</td>
                        <td className="py-2 text-center">43-50%</td>
                        <td className="py-2 text-alta-gray">Up to 50% with credit score 580+ and compensating factors</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-alta-navy">VA</td>
                        <td className="py-2 text-center">N/A</td>
                        <td className="py-2 text-center">41%</td>
                        <td className="py-2 text-alta-gray">No hard cap; 41% is a guideline. Residual income is the key factor</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-alta-navy">USDA</td>
                        <td className="py-2 text-center">29%</td>
                        <td className="py-2 text-center">41%</td>
                        <td className="py-2 text-alta-gray">Strict limits; income caps also apply</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <FirstTimeBuyerCTA />

              {/* Related Topics */}
              <div className="mt-6 mb-4">
                <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Link href="/affordability" className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group">
                    <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Affordability Calculator</h3>
                    <p className="text-xs text-alta-gray mt-1">See the true cost of homeownership beyond the mortgage payment</p>
                  </Link>
                  <Link href="/mortgage-calculator" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                    <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Mortgage Calculator</h3>
                    <p className="text-xs text-alta-gray mt-1">Calculate your monthly payment with taxes, insurance, and PMI</p>
                  </Link>
                  <Link href="/first-time-buyers" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                    <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">First-Time Buyer Guide</h3>
                    <p className="text-xs text-alta-gray mt-1">Complete 27-step timeline from pre-approval to closing day</p>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
