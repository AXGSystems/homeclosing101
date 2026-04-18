"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import PrintButton from "@/components/PrintButton";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";

interface LoanInput {
  lender: string;
  rate: string;
  amount: string;
  termYears: string;
  points: string;
  closingCosts: string;
  monthlyPMI: string;
}

interface LoanResult {
  lender: string;
  monthlyPI: number;
  totalMonthly: number;
  totalInterest: number;
  totalCost: number;
  fiveYearCost: number;
  apr: number;
  rate: number;
  amount: number;
  termYears: number;
  points: number;
  closingCosts: number;
  monthlyPMI: number;
}

const defaultLoan = (): LoanInput => ({
  lender: "",
  rate: "",
  amount: "",
  termYears: "30",
  points: "0",
  closingCosts: "0",
  monthlyPMI: "0",
});

function calcMonthlyPI(principal: number, annualRate: number, termYears: number): number {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcAPR(principal: number, annualRate: number, termYears: number, fees: number): number {
  // APR = the rate that makes the present value of payments equal to (principal - fees)
  const n = termYears * 12;
  const monthlyPayment = calcMonthlyPI(principal, annualRate, termYears);
  const netProceeds = principal - fees;
  if (netProceeds <= 0 || monthlyPayment <= 0) return annualRate;

  let lo = annualRate / 100;
  let hi = lo + 0.1;
  for (let iter = 0; iter < 100; iter++) {
    const mid = (lo + hi) / 2;
    const rm = mid / 12;
    const pv = rm === 0 ? monthlyPayment * n : monthlyPayment * (1 - Math.pow(1 + rm, -n)) / rm;
    if (pv > netProceeds) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return ((lo + hi) / 2) * 100;
}

const fmt = (n: number) => Math.round(n).toLocaleString();
const fmtDec = (n: number, d: number = 2) => n.toFixed(d);

export default function CompareLoansPage() {
  const [loanCount, setLoanCount] = useState(2);
  const [loans, setLoans] = useState<LoanInput[]>([defaultLoan(), defaultLoan(), defaultLoan()]);

  const updateLoan = (idx: number, field: keyof LoanInput, value: string) => {
    setLoans((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const activeLoans = loans.slice(0, loanCount);

  const results: (LoanResult | null)[] = useMemo(() => {
    return activeLoans.map((loan) => {
      const rate = parseFloat(loan.rate);
      const amount = parseFloat(loan.amount);
      const termYears = parseFloat(loan.termYears);
      const points = parseFloat(loan.points) || 0;
      const closingCosts = parseFloat(loan.closingCosts) || 0;
      const monthlyPMI = parseFloat(loan.monthlyPMI) || 0;

      if (isNaN(rate) || isNaN(amount) || isNaN(termYears) || amount <= 0 || termYears <= 0) {
        return null;
      }

      const monthlyPI = calcMonthlyPI(amount, rate, termYears);
      const totalMonthly = monthlyPI + monthlyPMI;
      const n = termYears * 12;
      const totalInterest = monthlyPI * n - amount;
      const totalPMI = monthlyPMI * n;
      const totalFees = points + closingCosts;
      const totalCost = amount + totalInterest + totalFees + totalPMI;
      const fiveYearPayments = totalMonthly * 60;
      const fiveYearCost = fiveYearPayments + totalFees;
      const apr = calcAPR(amount, rate, termYears, totalFees);

      return {
        lender: loan.lender || `Loan ${activeLoans.indexOf(loan) + 1}`,
        monthlyPI,
        totalMonthly,
        totalInterest,
        totalCost,
        fiveYearCost,
        apr,
        rate,
        amount,
        termYears,
        points,
        closingCosts,
        monthlyPMI,
      };
    });
  }, [activeLoans]);

  const validResults = results.filter((r): r is LoanResult => r !== null);
  const winnerIdx = validResults.length >= 2
    ? results.indexOf(validResults.reduce((a, b) => (a.totalCost < b.totalCost ? a : b)))
    : -1;

  const keyDifferences = useMemo(() => {
    if (validResults.length < 2) return null;
    const sorted = [...validResults].sort((a, b) => a.totalCost - b.totalCost);
    const best = sorted[0];
    const lines: string[] = [];

    for (let i = 1; i < sorted.length; i++) {
      const other = sorted[i];
      const savings = other.totalCost - best.totalCost;
      const rateDiff = other.rate - best.rate;
      const feeDiff = (other.points + other.closingCosts) - (best.points + best.closingCosts);

      if (best.rate > other.rate && feeDiff < 0) {
        // Best has higher rate but lower total cost due to lower fees
        lines.push(
          `${best.lender} saves you $${fmt(savings)} over the life of the loan compared to ${other.lender}, thanks to lower fees ($${fmt(Math.abs(feeDiff))} less) which more than offset the slightly higher rate.`
        );
      } else if (best.rate < other.rate) {
        lines.push(
          `${best.lender} saves you $${fmt(savings)} over the life of the loan compared to ${other.lender} with a rate that is ${fmtDec(Math.abs(rateDiff), 3)}% lower.`
        );
      } else if (feeDiff < 0) {
        lines.push(
          `${best.lender} saves you $${fmt(savings)} over the life of the loan compared to ${other.lender} despite a similar rate because of $${fmt(Math.abs(feeDiff))} less in fees.`
        );
      } else {
        lines.push(
          `${best.lender} saves you $${fmt(savings)} over the life of the loan compared to ${other.lender}.`
        );
      }
    }

    // 5-year comparison
    const best5 = [...validResults].sort((a, b) => a.fiveYearCost - b.fiveYearCost)[0];
    if (best5.lender !== best.lender) {
      lines.push(
        `However, if you plan to sell or refinance within 5 years, ${best5.lender} is cheaper by $${fmt(best.fiveYearCost - best5.fiveYearCost)} over that period.`
      );
    }

    // Monthly payment comparison
    const lowestMonthly = [...validResults].sort((a, b) => a.totalMonthly - b.totalMonthly)[0];
    if (lowestMonthly.lender !== best.lender) {
      lines.push(
        `${lowestMonthly.lender} has the lowest monthly payment at $${fmt(lowestMonthly.totalMonthly)}/mo, which is $${fmt(best.totalMonthly - lowestMonthly.totalMonthly)}/mo less than ${best.lender}.`
      );
    }

    return lines;
  }, [validResults]);

  const saveSummary = useMemo(() => {
    if (validResults.length < 2) return "";
    const lines = [`Loan Comparison - ${new Date().toLocaleDateString()}\n`];
    validResults.forEach((r) => {
      lines.push(`${r.lender}: ${fmtDec(r.rate)}% | $${fmt(r.amount)} | ${r.termYears}yr | Monthly: $${fmt(r.totalMonthly)} | Total Cost: $${fmt(r.totalCost)} | APR: ${fmtDec(r.apr, 3)}%`);
    });
    if (keyDifferences) {
      lines.push("\nKey Differences:");
      keyDifferences.forEach((d) => lines.push(`- ${d}`));
    }
    return lines.join("\n");
  }, [validResults, keyDifferences]);

  const inputClass =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal outline-none transition-colors bg-white";
  const labelClass = "block text-xs font-semibold text-alta-navy mb-1";

  return (
    <>
      <PageHero
        title="Compare Loan Offers"
        subtitle="Enter details from your Loan Estimates to see which offer truly costs less -- monthly, over 5 years, and over the full life of the loan."
        image="/images/hero-closing.jpg"
        breadcrumb={[
          { label: "Tools & Calculators", href: "/mortgage-calculator" },
          { label: "Compare Loan Offers", href: "/compare-loans" },
        ]}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 print:py-2">
        {/* Loan count toggle */}
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <span className="text-sm font-semibold text-alta-navy">Compare:</span>
          {[2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setLoanCount(n)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                loanCount === n
                  ? "bg-alta-teal text-white"
                  : "bg-gray-100 text-alta-navy hover:bg-gray-200"
              }`}
            >
              {n} Loans
            </button>
          ))}
        </div>

        {/* Loan input cards */}
        <div className={`grid gap-4 mb-8 print:hidden ${loanCount === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {activeLoans.map((loan, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-alta-teal/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-alta-teal">{idx + 1}</span>
                </div>
                <input
                  type="text"
                  placeholder={`Lender ${idx + 1} name`}
                  value={loan.lender}
                  onChange={(e) => updateLoan(idx, "lender", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-alta-navy focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal outline-none"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Interest Rate (%)</label>
                  <input type="number" step="0.001" min="0" max="20" placeholder="6.500"
                    value={loan.rate} onChange={(e) => updateLoan(idx, "rate", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Loan Amount ($)</label>
                  <input type="number" step="1000" min="0" placeholder="300,000"
                    value={loan.amount} onChange={(e) => updateLoan(idx, "amount", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Loan Term (years)</label>
                  <input type="number" step="1" min="1" max="50" placeholder="30"
                    value={loan.termYears} onChange={(e) => updateLoan(idx, "termYears", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Points / Origination Fee ($)</label>
                  <input type="number" step="100" min="0" placeholder="0"
                    value={loan.points} onChange={(e) => updateLoan(idx, "points", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Other Closing Costs ($)</label>
                  <input type="number" step="100" min="0" placeholder="0"
                    value={loan.closingCosts} onChange={(e) => updateLoan(idx, "closingCosts", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Monthly PMI ($, if applicable)</label>
                  <input type="number" step="10" min="0" placeholder="0"
                    value={loan.monthlyPMI} onChange={(e) => updateLoan(idx, "monthlyPMI", e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison results */}
        {validResults.length >= 2 && (
          <>
            <h2 className="text-lg font-bold text-alta-navy mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-alta-navy text-white">
                    <th className="text-left px-4 py-3 rounded-tl-xl font-semibold">Metric</th>
                    {validResults.map((r, i) => (
                      <th key={i} className={`text-right px-4 py-3 font-semibold ${i === validResults.length - 1 ? "rounded-tr-xl" : ""}`}>
                        <div className="flex items-center justify-end gap-2">
                          {results.indexOf(r) === winnerIdx && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2d8f5e] text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                              Best
                            </span>
                          )}
                          {r.lender}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Interest Rate", fn: (r: LoanResult) => `${fmtDec(r.rate, 3)}%` },
                    { label: "Loan Amount", fn: (r: LoanResult) => `$${fmt(r.amount)}` },
                    { label: "Term", fn: (r: LoanResult) => `${r.termYears} years` },
                    { label: "Monthly P&I", fn: (r: LoanResult) => `$${fmt(r.monthlyPI)}`, highlight: true },
                    { label: "Monthly PMI", fn: (r: LoanResult) => r.monthlyPMI > 0 ? `$${fmt(r.monthlyPMI)}` : "--" },
                    { label: "Total Monthly Payment", fn: (r: LoanResult) => `$${fmt(r.totalMonthly)}`, highlight: true },
                    { label: "Points / Origination", fn: (r: LoanResult) => `$${fmt(r.points)}` },
                    { label: "Other Closing Costs", fn: (r: LoanResult) => `$${fmt(r.closingCosts)}` },
                    { label: "Total Interest (life of loan)", fn: (r: LoanResult) => `$${fmt(r.totalInterest)}` },
                    { label: "Total Cost (all-in)", fn: (r: LoanResult) => `$${fmt(r.totalCost)}`, highlight: true },
                    { label: "5-Year Cost", fn: (r: LoanResult) => `$${fmt(r.fiveYearCost)}` },
                    { label: "APR (fees amortized)", fn: (r: LoanResult) => `${fmtDec(r.apr, 3)}%`, highlight: true },
                  ].map((row, ri) => (
                    <tr key={ri} className={`border-b border-gray-100 ${row.highlight ? "bg-alta-teal/5 font-semibold" : ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-4 py-2.5 text-alta-navy">{row.label}</td>
                      {validResults.map((r, ci) => {
                        const isWinnerCell = results.indexOf(r) === winnerIdx && row.highlight;
                        return (
                          <td key={ci} className={`px-4 py-2.5 text-right ${isWinnerCell ? "text-[#2d8f5e]" : "text-alta-navy"}`}>
                            {row.fn(r)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Key Differences */}
            {keyDifferences && keyDifferences.length > 0 && (
              <div className="p-5 bg-gradient-to-br from-[#f0f7fa] to-[#e6f1f5] rounded-2xl border border-alta-teal/20 mb-8">
                <h3 className="text-sm font-bold text-alta-navy mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Differences
                </h3>
                <ul className="space-y-2">
                  {keyDifferences.map((line, i) => (
                    <li key={i} className="text-sm text-alta-navy/80 leading-relaxed flex items-start gap-2">
                      <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8 print:hidden">
              <PrintButton label="Print Comparison" />
              <SaveToFolderBtn
                type="note"
                title="Loan Comparison"
                content={saveSummary}
                dedupId="compare-loans-current"
                label="Save to Folder"
              />
            </div>
          </>
        )}

        {/* Empty state */}
        {validResults.length < 2 && (
          <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mb-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm font-semibold text-alta-navy mb-1">Enter at least 2 loan offers above</p>
            <p className="text-xs text-alta-gray">Fill in the interest rate and loan amount for each offer to see your side-by-side comparison.</p>
          </div>
        )}

        <InlineAd />

        {/* Pro tips */}
        <div className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] my-6">
          <h3 className="text-sm font-bold text-[#8b6914] mb-2">How to Use This Tool</h3>
          <ul className="text-xs text-[#6b5210] space-y-1.5 leading-relaxed">
            <li>1. Get your official Loan Estimates from each lender (required within 3 business days of application).</li>
            <li>2. Enter the numbers from Page 1 of each Loan Estimate into the cards above.</li>
            <li>3. Look at the total cost comparison, not just the interest rate -- a lower rate with high fees can cost more overall.</li>
            <li>4. Check the 5-year cost if you might move or refinance before the loan is paid off.</li>
            <li>5. The APR includes fees amortized over the loan term, making it the best single-number comparison.</li>
          </ul>
        </div>

        <FirstTimeBuyerCTA />
      </main>
    </>
  );
}
