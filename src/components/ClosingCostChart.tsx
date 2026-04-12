"use client";

import { useState } from "react";

const costData = [
  { category: "Loan Origination", pct: 22, amount: "$1,925", color: "#1a5276", detail: "Lender fees for processing and underwriting your mortgage application. Negotiable — compare across lenders." },
  { category: "Title & Settlement", pct: 18, amount: "$1,575", color: "#0a7ea8", detail: "Title search, title insurance (owner's + lender's), settlement/escrow fee, and document preparation." },
  { category: "Prepaid Taxes & Insurance", pct: 25, amount: "$2,188", color: "#2d6b3f", detail: "Property tax escrow (2-6 months), first year homeowner's insurance, and prepaid interest through month-end." },
  { category: "Appraisal & Inspection", pct: 8, amount: "$700", color: "#5b3a8c", detail: "Home appraisal ($300-600) and home inspection ($300-500). Both protect your investment." },
  { category: "Government & Recording", pct: 10, amount: "$875", color: "#8b6914", detail: "Transfer taxes, recording fees, and other government charges. Vary significantly by state and county." },
  { category: "Other Fees", pct: 17, amount: "$1,487", color: "#943030", detail: "Credit report, flood certification, survey, notary, courier, and miscellaneous lender-required fees." },
];

export default function ClosingCostChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = costData.reduce((a, c) => a + c.pct, 0);
  let cumPct = 0;

  return (
    <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
      <h3 className="font-bold text-alta-navy mb-1 text-sm">Where Your Closing Costs Go</h3>
      <p className="text-[10px] text-alta-gray mb-4">Based on a $350,000 home with $8,750 in total closing costs (2.5%). Hover or tap any segment for details.</p>

      {/* Horizontal bar chart */}
      <div className="relative h-10 rounded-xl overflow-hidden flex mb-4">
        {costData.map((d, i) => {
          const width = (d.pct / total) * 100;
          cumPct += width;
          return (
            <div
              key={d.category}
              className="relative h-full cursor-pointer transition-all duration-200"
              style={{
                width: `${width}%`,
                backgroundColor: d.color,
                opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.4 : 1,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setHoveredIdx(hoveredIdx === i ? null : i)}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white whitespace-nowrap">
                {d.pct}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        {costData.map((d, i) => (
          <button
            key={d.category}
            className={`flex items-center gap-2 p-2 rounded-lg text-left transition-all ${
              hoveredIdx === i ? "bg-alta-light shadow-sm" : "hover:bg-alta-light/50"
            }`}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => setHoveredIdx(hoveredIdx === i ? null : i)}
          >
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
            <div>
              <p className="text-[10px] font-medium text-alta-navy leading-tight">{d.category}</p>
              <p className="text-[9px] text-alta-gray">{d.amount} ({d.pct}%)</p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {hoveredIdx !== null && (
        <div className="p-3 rounded-xl border transition-all" style={{ backgroundColor: costData[hoveredIdx].color + '10', borderColor: costData[hoveredIdx].color + '30' }}>
          <p className="text-xs text-alta-gray leading-relaxed">
            <strong className="text-alta-navy">{costData[hoveredIdx].category}:</strong> {costData[hoveredIdx].detail}
          </p>
        </div>
      )}
    </div>
  );
}
