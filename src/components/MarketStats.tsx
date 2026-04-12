"use client";

import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { end: 4.2, prefix: "", suffix: "M", label: "Homes sold in the U.S. in 2025", detail: "Despite higher mortgage rates, millions of Americans still achieved homeownership — and each one went through the closing process.", source: "NAR", decimals: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", color: "from-[#1a5276] to-[#154463]" },
  { end: 400, prefix: "$", suffix: "K", label: "Median home sale price nationwide", detail: "At this price, closing costs of 2-5% mean $8,000-$20,000 in fees on top of your down payment. Budgeting matters.", source: "NAR 2025", decimals: 0, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", color: "from-[#2d6b3f] to-[#235532]" },
  { end: 37, prefix: "", suffix: " days", label: "Average time from accepted offer to closing", detail: "The typical home purchase takes about 5 weeks. FHA and VA loans may take slightly longer due to additional requirements.", source: "CFPB", decimals: 0, image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80", color: "from-[#0a7ea8] to-[#077a9e]" },
  { end: 3.5, prefix: "", suffix: "%", label: "Average closing costs as % of purchase price", detail: "On a $400K home, that's ~$14,000 in fees beyond your down payment — lender charges, title insurance, taxes, and prepaids.", source: "CFPB", decimals: 1, image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80", color: "from-[#8b6914] to-[#705410]" },
  { end: 8, prefix: "", suffix: "%", label: "Median down payment for first-time buyers", detail: "Far less than the 20% many assume is required. FHA allows 3.5%, VA and USDA allow 0% down.", source: "NAR 2025", decimals: 0, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80", color: "from-[#5b3a8c] to-[#482d70]" },
  { end: 275, prefix: "$", suffix: "M", label: "Lost to real estate wire fraud in 2025", detail: "Criminals intercept closing funds using spoofed emails and deepfakes. Always verify wiring instructions by phone.", source: "FBI IC3", decimals: 0, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80", color: "from-[#943030] to-[#7a2020]" },
  { end: 1, prefix: "", suffix: " in 3", label: "Title searches find issues that get resolved", detail: "Liens, errors, missing heirs, forged documents — title professionals catch problems in roughly one-third of transactions.", source: "ALTA", decimals: 0, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80", color: "from-[#1a2744] to-[#0f1b33]" },
  { end: 6000, prefix: "", suffix: "+", label: "ALTA member companies protecting buyers", detail: "Title companies, settlement agents, and abstractors following ALTA Best Practices for security and consumer protection.", source: "ALTA", decimals: 0, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", color: "from-[#0a7ea8] to-[#077a9e]" },
  { end: 45, prefix: "", suffix: " states", label: "Now allow Remote Online Notarization", detail: "Thanks to ALTA and MBA advocacy, homebuyers in 45 states + DC can close entirely online via secure video.", source: "ALTA/MBA", decimals: 0, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", color: "from-[#2d6b3f] to-[#1e5530]" },
  { end: 59, prefix: "", suffix: "%", label: "Year-over-year increase in wire fraud", detail: "Wire fraud losses jumped 59% from the prior year. AI-generated deepfakes and business email compromise are the primary attack vectors.", source: "FBI IC3", decimals: 0, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80", color: "from-[#943030] to-[#7a2020]" },
  { end: 50, prefix: "", suffix: "-100+", label: "Pages of documents signed at closing", detail: "Promissory note, deed of trust, Closing Disclosure, and dozens of affidavits. Your closing agent walks you through each one.", source: "ALTA", decimals: 0, image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80", color: "from-[#5b3a8c] to-[#482d70]" },
  { end: 3, prefix: "", suffix: " days", label: "Minimum Closing Disclosure review period", detail: "Federal law (TRID) requires your lender to provide the Closing Disclosure at least 3 business days before closing.", source: "CFPB", decimals: 0, image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80", color: "from-[#8b6914] to-[#705410]" },
];

// Show 3 at a time, auto-rotate every 6 seconds
const VISIBLE = 3;
const INTERVAL = 6000;
const SETS = Math.ceil(stats.length / VISIBLE);

export default function MarketStats() {
  const [activeSet, setActiveSet] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveSet((prev) => (prev + 1) % SETS);
        setFading(false);
      }, 500);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const currentStats = stats.slice(activeSet * VISIBLE, activeSet * VISIBLE + VISIBLE);

  return (
    <div>
      <div
        className={`grid md:grid-cols-3 gap-4 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        {currentStats.map((d, i) => (
          <div
            key={`${activeSet}-${i}`}
            className="relative h-[240px] rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${d.image}')` }} />
            {/* Color overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${d.color} opacity-85`} />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-3xl font-bold text-white mb-1">
                  {d.end === 50 ? (
                    <span>50-100+</span>
                  ) : d.end === 1 && d.suffix === " in 3" ? (
                    <span>1 in 3</span>
                  ) : (
                    <AnimatedCounter end={d.end} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
                  )}
                </p>
                <p className="text-sm text-white/90 leading-snug font-medium mb-2">{d.label}</p>
                <p className="text-xs text-white/60 leading-relaxed">{d.detail}</p>
                <p className="text-[9px] text-white/40 mt-2 font-medium uppercase tracking-wider">{d.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: SETS }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(true); setTimeout(() => { setActiveSet(i); setFading(false); }, 300); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeSet ? "w-8 bg-alta-teal" : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
