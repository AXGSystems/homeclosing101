"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import DTIGauge from "@/components/DTIGauge";

const hiddenCosts = [
  {
    cost: "Maintenance & Repairs", amount: "1-2% of home value/year",
    detail: "For a $350K home, budget $3,500-$7,000 annually. HVAC replacement: $5,000-$10,000. Roof: $8,000-$15,000. Water heater: $800-$1,500.",
    color: "bg-blue-50 border-blue-200",
    gradient: "from-[#1a5276] to-[#0a7ea8]",
    modalContent: {
      covers: "Maintenance and repairs cover everything needed to keep your home functional and in good condition. This includes routine upkeep (HVAC servicing, gutter cleaning, lawn care) and unexpected repairs (plumbing leaks, appliance failures, roof damage).",
      calculation: "The 1-2% rule is based on the age and condition of the home. Newer homes (under 10 years) trend toward 1%. Older homes (20+ years) trend toward 2% or more as major systems approach end-of-life. The rule accounts for the eventual replacement of major components: roof (every 20-30 years), HVAC (15-20 years), water heater (10-15 years), appliances (10-15 years), and exterior paint (5-10 years).",
      variations: "Maintenance costs vary significantly by climate and region. Homes in areas with harsh winters face higher costs from freeze-thaw damage, ice damming, and heating system wear. Coastal homes deal with salt air corrosion and hurricane preparedness. Desert climates require more HVAC usage and cooling system maintenance. States with termite risk (Southeast, Texas, California) require annual inspections and potential treatment.",
      tips: "Build a dedicated home maintenance fund — set up automatic monthly transfers. Get a home warranty for the first year (covers major systems and appliances). Learn basic maintenance tasks: changing HVAC filters, testing sump pumps, flushing water heaters. Schedule seasonal inspections to catch small issues before they become expensive. Keep a home maintenance log to track what was done and when."
    }
  },
  {
    cost: "Property Taxes", amount: "0.27%-2.33% of value/year",
    detail: "Varies dramatically by state and county. Hawaii: 0.27%. New Jersey: 2.33%. Your county assessor sets the assessed value. Can be appealed.",
    color: "bg-green-50 border-green-200", source: "Tax Foundation",
    gradient: "from-[#2d6b3f] to-[#1a5276]",
    modalContent: {
      covers: "Property taxes fund local services: public schools (typically the largest portion), fire and police departments, road maintenance, parks, libraries, and local government operations. Some areas also levy special assessments for specific improvements like sidewalks or sewer upgrades.",
      calculation: "Your property tax is calculated by multiplying your home's assessed value by the local tax rate (mill rate). The assessed value is determined by your county assessor and may differ from market value. Tax rates are set annually by local taxing authorities (school districts, cities, counties). Some states have homestead exemptions that reduce the taxable value of your primary residence.",
      variations: "Property tax rates vary dramatically. Hawaii has the lowest effective rate (approximately 0.27%), while New Jersey has the highest (approximately 2.33%). Within a single state, rates can differ by county. Some states (California with Proposition 13, Texas with no state income tax) have unique property tax structures. States with no income tax often have higher property taxes to compensate. Check your specific county assessor's website for exact rates.",
      tips: "Research property tax rates BEFORE you buy — they significantly affect affordability. Check if the home's assessed value is accurate by comparing to recent comparable sales. If the assessment seems too high, file a property tax appeal with your county (success rates can be 30-50% in some areas). Look into homestead exemptions, senior exemptions, and veteran exemptions that may apply. Remember that property taxes typically increase over time as assessments rise."
    }
  },
  {
    cost: "Homeowner's Insurance", amount: "$1,200-$3,000+/year",
    detail: "Required by lenders. Covers fire, storms, theft, liability. Flood insurance is separate and required in FEMA flood zones. Shop at least 3 providers.",
    color: "bg-amber-50 border-amber-200",
    gradient: "from-[#8b6914] to-[#943030]",
    modalContent: {
      covers: "A standard HO-3 policy covers six areas: dwelling (structure), other structures (detached garage, shed), personal property (belongings), loss of use (temporary living expenses if displaced), personal liability (if someone is injured on your property), and medical payments to others. It protects against named perils including fire, lightning, windstorm, hail, theft, vandalism, and more.",
      calculation: "Premiums are based on: replacement cost of your home (not market value), location (weather risk, crime rates, proximity to fire station), construction type, age of home, claims history, credit score (in most states), deductible amount, and coverage limits. Higher deductibles lower premiums. Bundling with auto insurance can save 15-25%.",
      variations: "Insurance costs vary dramatically by state. Florida and Louisiana are among the most expensive due to hurricane risk. Oklahoma and Kansas face higher rates due to tornado and hail exposure. California wildfire zones have seen rate increases and insurer departures. Some states (Florida, California, Louisiana) have state-backed insurers of last resort. Flood insurance is separate and required in FEMA-designated flood zones — average cost $700-$1,500/year through the NFIP.",
      tips: "Shop at least 3-5 providers — premiums can vary 50%+ for identical coverage. Choose replacement cost coverage, not actual cash value. Ask about all available discounts: bundling, new home, security system, claims-free, roof age. Review your policy annually — coverage needs change as you renovate or acquire valuable items. Consider an umbrella policy for additional liability protection beyond your homeowner's policy limits."
    }
  },
  {
    cost: "HOA Fees", amount: "$0-$500+/month",
    detail: "If applicable. Covers shared amenities, exterior maintenance, insurance on common areas. Review the HOA's financial health before buying — weak reserves mean special assessments.",
    color: "bg-purple-50 border-purple-200",
    gradient: "from-[#5b3a8c] to-[#1a5276]",
    modalContent: {
      covers: "HOA fees typically cover: maintenance of common areas (landscaping, pools, clubhouses), exterior building maintenance (in condos/townhomes), shared insurance, trash/recycling, snow removal, and reserve fund contributions for major future repairs. Some HOAs also cover water, cable, or internet. The exact coverage varies by community — read the CC&Rs (Covenants, Conditions & Restrictions) carefully.",
      calculation: "HOA fees are based on the community's annual operating budget divided among homeowners, plus contributions to the reserve fund. Larger communities with more amenities generally have higher fees. Condos and townhomes typically have higher fees than single-family HOAs because exterior maintenance is included. Fees increase over time as maintenance costs rise. Special assessments occur when the reserve fund is insufficient for a major repair.",
      variations: "HOA fees vary enormously. Single-family home HOAs might charge $50-$200/month for basic landscaping and amenities. Condo HOAs range from $200-$500+/month and include exterior maintenance and building insurance. Luxury communities and high-rises can exceed $1,000/month. States like Florida have specific laws governing HOA disclosures and reserve requirements. Always request the HOA's financial statements and reserve study before purchasing.",
      tips: "Before buying, request: the current budget, reserve study, meeting minutes from the last 2 years, and any pending or planned special assessments. A healthy HOA should have reserves equal to at least 70% of their projected needs. Ask about recent or planned fee increases. Review the rules and restrictions — they affect how you can use your property. Check for any pending litigation involving the HOA. Factor HOA fees into your DTI calculation — lenders include them."
    }
  },
  {
    cost: "Utilities", amount: "$200-$500+/month",
    detail: "Electric, gas, water, sewer, trash, internet. Typically 50-100% more than renting because you're paying for an entire house, not an apartment unit.",
    color: "bg-red-50 border-red-200",
    gradient: "from-[#943030] to-[#8b6914]",
    modalContent: {
      covers: "Homeowner utility costs include: electricity, natural gas or propane, water and sewer, trash and recycling collection, internet and cable, and potentially additional costs like septic pumping (rural areas), well water testing, or propane delivery. Unlike renting, you are responsible for ALL utility costs for the entire structure.",
      calculation: "Utility costs depend on: home size (square footage), climate zone, insulation quality and home energy efficiency, number of occupants, age and efficiency of HVAC system, local utility rates, and usage habits. A 2,000 sq ft home typically costs $200-$400/month in moderate climates. Homes in extreme heat or cold zones can exceed $500/month during peak seasons. Request utility history from the seller or utility company before buying.",
      variations: "Electricity rates vary by state — from under $0.10/kWh in states like Louisiana and Washington to over $0.30/kWh in Hawaii and Connecticut. Natural gas costs are highest in the Northeast. Water and sewer rates vary by municipality. Some areas have tiered pricing that increases with usage. Rural properties may have well and septic costs instead of municipal water and sewer. Solar-equipped homes can dramatically reduce electricity costs.",
      tips: "Ask the seller for 12 months of utility bills to understand seasonal patterns. Get an energy audit before or shortly after purchase — many utilities offer free audits. Upgrade to a programmable or smart thermostat. Seal air leaks around windows, doors, and the attic. Consider LED lighting throughout. Insulate the attic to recommended R-values for your climate zone. Set up budget billing with your utility company to even out seasonal spikes."
    }
  },
  {
    cost: "PMI (if <20% down)", amount: "0.5-1.5% of loan/year",
    detail: "For a $300K loan at 0.7%: $2,100/year ($175/month). Removable at 20% equity on conventional loans. FHA MIP is for life on most loans. VA has no PMI.",
    color: "bg-teal-50 border-teal-200", source: "CFPB",
    gradient: "from-[#0a7ea8] to-[#1a5276]",
    modalContent: {
      covers: "Private Mortgage Insurance (PMI) protects your LENDER (not you) if you default on your loan. It's required on conventional loans when your down payment is less than 20% of the home's purchase price. PMI covers the lender's risk of the additional loan amount above the 80% loan-to-value threshold. Although it protects the lender, you pay the premium.",
      calculation: "PMI rates typically range from 0.5% to 1.5% of the original loan amount per year, depending on: your credit score (higher score = lower PMI), loan-to-value ratio (larger down payment = lower PMI), loan type and term, and the insurer. For example, a $300,000 loan at 0.7% PMI = $2,100/year or $175/month. PMI is added to your monthly mortgage payment and collected through your escrow account.",
      variations: "Conventional loans: PMI can be removed once you reach 20% equity (by law, it must automatically terminate at 22% equity based on the original amortization schedule). FHA loans: Mortgage Insurance Premium (MIP) is required for the life of the loan if your down payment is less than 10% (if 10%+ down, MIP drops off after 11 years). VA loans: No PMI required, though there is a one-time VA funding fee. USDA loans: Have an upfront guarantee fee and annual fee similar to FHA MIP.",
      tips: "To minimize or eliminate PMI: save for a 20% down payment if possible. If you can't, focus on improving your credit score — the difference between a 680 and 760 credit score can cut your PMI rate in half. Once you have 20% equity (through payments, appreciation, or both), contact your lender to request PMI removal — don't wait for automatic termination at 22%. Some lenders offer lender-paid PMI (LPMI) in exchange for a slightly higher interest rate — run the numbers to see which costs less over your expected ownership period. Consider making extra principal payments to reach 20% equity faster."
    }
  },
];

export default function AffordabilityPage() {
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPaymentSaved, setDownPaymentSaved] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [dtiLimit, setDtiLimit] = useState(36);
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

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
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Affordability", href: "/affordability" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-white rounded-2xl border border-[#c5d8e4] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0a7ea8]/10 flex items-center justify-center text-[#0a7ea8] shrink-0">
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
            <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#0a7ea8] shadow-sm p-6">
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
                <h3 className="font-bold text-alta-navy mb-2 text-sm text-center">Debt-to-Income Ratio</h3>
                <DTIGauge value={dtiUsed} label="of your gross income goes to debt" />
                <div className="flex justify-between text-[9px] text-alta-gray mt-2 px-2">
                  <span>0%</span><span className="text-[#2d6b3f]">28%</span><span className="text-[#0a7ea8]">36%</span><span className="text-[#8b6914]">43%</span><span className="text-[#943030]">50%+</span>
                </div>
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

          <div className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] my-6">
            <p className="text-xs text-alta-gray"><strong className="text-[#8b6914]">Did you know?</strong> The FBI&apos;s Internet Crime Complaint Center (IC3) reports that Americans lost over $12.5 billion to internet crime in 2023, with real estate and rental fraud among the top categories. Always verify wire instructions by phone before sending closing funds.</p>
          </div>

          {/* Hidden costs of homeownership */}
          <h2 className="text-xl font-bold text-alta-navy mb-4 mt-6">Hidden Costs Beyond the Mortgage</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Your mortgage payment is just the beginning. Real homeownership costs include ongoing expenses many first-time buyers don&apos;t budget for. Factor these into your affordability calculation. <span className="text-alta-teal font-medium">Click any card for detailed guidance.</span></p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {hiddenCosts.map((c) => (
              <div
                key={c.cost}
                onClick={() => setActiveModal({
                  title: c.cost,
                  gradient: c.gradient,
                  content: (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm font-bold text-[#1a5276] mb-1">Typical Range</p>
                        <p className="text-lg font-bold text-[#0a7ea8]">{c.amount}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">What This Cost Covers</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.covers}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">How It&apos;s Calculated</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.calculation}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">State-by-State Variations</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.variations}</p>
                      </div>
                      <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                        <h3 className="text-sm font-bold text-[#1a5276] mb-2">Tips to Reduce This Cost</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.modalContent.tips}</p>
                      </div>
                      {c.source && <p className="text-xs text-[#0a7ea8] font-medium">Source: {c.source}</p>}
                    </div>
                  )
                })}
                className={`p-4 ${c.color} rounded-xl border tile-interactive cursor-pointer group relative`}
              >
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3.5 h-3.5 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </div>
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
            <Link href="/mortgage-calculator" className="group p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">Mortgage Calculator</h3>
              <p className="text-[10px] text-alta-gray mt-1">Exact monthly payments with taxes and PMI</p>
            </Link>
            <Link href="/closing-process/closing-costs" className="group p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">Closing Costs</h3>
              <p className="text-[10px] text-alta-gray mt-1">Estimate 2-5% in upfront closing fees</p>
            </Link>
            <Link href="/first-time-buyers" className="group p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive text-center">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">First-Time Guide</h3>
              <p className="text-[10px] text-alta-gray mt-1">Complete roadmap to homeownership</p>
            </Link>
          </div>

          <p className="text-[10px] text-alta-gray mt-6 text-center">* This is an estimate for educational purposes. Your actual buying power depends on credit score, specific loan program, and lender requirements. Get pre-approved by a lender for an accurate number.</p>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className={`bg-gradient-to-r ${activeModal.gradient} px-6 py-5`}>
              <h2 className="text-xl font-bold text-white pr-10">{activeModal.title}</h2>
            </div>
            <div className="p-6">{activeModal.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
