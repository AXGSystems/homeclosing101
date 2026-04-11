"use client";

import { useState } from "react";

const loans = [
  { type: "Conventional", down: 3, rate: 6.5, pmi: 0.5, color: "#1a5276", minCredit: 620, mipLife: false },
  { type: "FHA", down: 3.5, rate: 6.25, pmi: 0.55, color: "#2d6b3f", minCredit: 580, mipLife: true },
  { type: "VA", down: 0, rate: 6.0, pmi: 0, color: "#5b3a8c", minCredit: 620, mipLife: false },
  { type: "USDA", down: 0, rate: 6.25, pmi: 0.35, color: "#8b6914", minCredit: 640, mipLife: true },
];

export default function LoanComparisonChart() {
  const [homePrice, setHomePrice] = useState(350000);
  const [hoveredLoan, setHoveredLoan] = useState<number | null>(null);

  const maxMonthly = Math.max(...loans.map(l => {
    const loan = homePrice * (1 - l.down / 100);
    const monthlyRate = l.rate / 100 / 12;
    const pi = (loan * monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1);
    const mi = (loan * l.pmi / 100) / 12;
    return pi + mi;
  }));

  return (
    <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-alta-navy text-sm">Loan Type Monthly Payment Comparison</h3>
          <p className="text-[10px] text-alta-gray">Principal + interest + mortgage insurance at current rates</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] text-alta-gray">Home price:</label>
          <select value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="text-xs border border-gray-200 rounded px-2 py-1 bg-white">
            <option value={250000}>$250K</option>
            <option value={350000}>$350K</option>
            <option value={450000}>$450K</option>
            <option value={550000}>$550K</option>
          </select>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-3">
        {loans.map((l, i) => {
          const loan = homePrice * (1 - l.down / 100);
          const monthlyRate = l.rate / 100 / 12;
          const pi = (loan * monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1);
          const mi = (loan * l.pmi / 100) / 12;
          const total = pi + mi;
          const downAmt = homePrice * l.down / 100;
          const barWidth = (total / maxMonthly) * 100;
          const isHovered = hoveredLoan === i;

          return (
            <div
              key={l.type}
              className={`cursor-pointer transition-all ${isHovered ? "scale-[1.02]" : ""}`}
              onMouseEnter={() => setHoveredLoan(i)}
              onMouseLeave={() => setHoveredLoan(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-xs font-semibold text-alta-navy">{l.type}</span>
                  <span className="text-[9px] text-alta-gray">{l.down}% down</span>
                </div>
                <span className="text-xs font-bold" style={{ color: l.color }}>${Math.round(total).toLocaleString()}/mo</span>
              </div>
              <div className="h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                {/* PI portion */}
                <div
                  className="h-full rounded-lg transition-all duration-500 flex items-center"
                  style={{ width: `${barWidth}%`, backgroundColor: l.color, opacity: isHovered ? 1 : 0.8 }}
                >
                  {barWidth > 30 && (
                    <div className="flex items-center gap-1 px-2 text-[9px] text-white">
                      <span>P&I: ${Math.round(pi).toLocaleString()}</span>
                      {mi > 0 && <span className="opacity-70">+ MI: ${Math.round(mi).toLocaleString()}</span>}
                    </div>
                  )}
                </div>
              </div>
              {/* Detail panel on hover */}
              {isHovered && (
                <div className="mt-1 p-2 rounded-lg text-[10px] text-alta-gray" style={{ backgroundColor: l.color + '08', borderLeft: `3px solid ${l.color}` }}>
                  Down: ${downAmt.toLocaleString()} | Loan: ${loan.toLocaleString()} | Rate: {l.rate}% | Credit: {l.minCredit}+ | MI: {l.pmi > 0 ? `${l.pmi}%/yr${l.mipLife ? " (life of loan)" : " (removable)"}` : "None"}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-[9px] text-alta-gray mt-3">Rates are illustrative. Your actual rate depends on credit score, lender, and market conditions. Sources: FHA.com, VA.gov, USDA.gov, Fannie Mae</p>
    </div>
  );
}
