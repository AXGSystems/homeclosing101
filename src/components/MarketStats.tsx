"use client";

import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { end: 4.2, prefix: "", suffix: "M", label: "Homes sold in 2025", color: "text-white", bg: "bg-gradient-to-br from-[#1a5276] to-[#154463]", source: "NAR", dark: true, decimals: 1 },
  { end: 400, prefix: "$", suffix: "K", label: "Median home price", color: "text-[#2d6b3f]", bg: "bg-[#e9f5ed]", source: "NAR 2025", dark: false, decimals: 0 },
  { end: 3.5, prefix: "", suffix: "%", label: "Average closing costs", color: "text-white", bg: "bg-gradient-to-br from-[#0a7ea8] to-[#077a9e]", source: "CFPB", dark: true, decimals: 1 },
  { end: 8, prefix: "", suffix: "%", label: "Median first-time down payment", color: "text-[#8b6914]", bg: "bg-[#faf4e4]", source: "NAR", dark: false, decimals: 0 },
  { end: 33, prefix: "1 in ", suffix: "", label: "Title searches find issues", color: "text-white", bg: "bg-gradient-to-br from-[#1a2744] to-[#0f1b33]", source: "ALTA", dark: true, decimals: 0 },
  { end: 37, prefix: "", suffix: " days", label: "Avg offer to close", color: "text-[#5b3a8c]", bg: "bg-[#f0ecf6]", source: "CFPB", dark: false, decimals: 0 },
];

export default function MarketStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((d) => (
        <div key={d.label} className={`p-3 ${d.bg} rounded-xl border ${d.dark ? "border-transparent" : "border-gray-200"} text-center tile-interactive`}>
          <p className={`text-xl font-bold ${d.color}`}>
            {d.end === 33 ? (
              // Special case for "1 in 3"
              "1 in 3"
            ) : (
              <AnimatedCounter end={d.end} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
            )}
          </p>
          <p className={`text-[9px] mt-0.5 leading-tight ${d.dark ? "text-white/70" : "text-alta-gray"}`}>{d.label}</p>
          <p className={`text-[8px] mt-1 ${d.dark ? "text-white/50" : "text-alta-gray opacity-60"}`}>{d.source}</p>
        </div>
      ))}
    </div>
  );
}
