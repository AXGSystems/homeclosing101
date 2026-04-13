"use client";

import { useRef, useEffect, useState } from "react";

const headlines = [
  { text: "4.2 million homes sold in the U.S. in 2025 — median price $400K", source: "NAR" },
  { text: "Wire fraud losses hit $275.1M in 2025 — always verify wiring by phone", source: "FBI IC3" },
  { text: "Title searches reveal issues in 1 out of 3 residential transactions", source: "ALTA" },
  { text: "FinCEN Residential Real Estate Reporting Rule now in effect for 2026", source: "ALTA" },
  { text: "Deepfake scams in real estate increased 40% year-over-year", source: "Entrust 2026" },
  { text: "Homebuyers have the right to choose their own title company under RESPA", source: "CFPB" },
  { text: "Closing Disclosure must be provided at least 3 business days before closing", source: "CFPB" },
  { text: "Remote Online Notarization (RON) now available in the majority of U.S. states", source: "ALTA" },
  { text: "6,000+ ALTA member companies protecting homebuyers across all 50 states", source: "ALTA" },
  { text: "Recovery rate drops from 20% to under 5% after 48 hours — act fast on wire fraud", source: "FBI" },
  { text: "Owner's title insurance: one-time fee at closing, lifetime coverage for you and your heirs", source: "ALTA" },
  { text: "Texas cuts title insurance premiums by 10% starting July 2025", source: "TDI" },
  { text: "First American reports title revenue up 42% to $1.836 billion", source: "First American" },
  { text: "New fraud and notarization laws affecting closings across multiple states in 2026", source: "Alliant National" },
  { text: "Treasury Department explores title insurance consumer protection opportunities", source: "U.S. Treasury" },
  { text: "HUD-approved housing counselors available free through CFPB locator tool", source: "CFPB" },
  { text: "ALTA Best Practices framework adopted by thousands of member companies", source: "ALTA" },
  { text: "Fannie Mae HomeView: free online homebuyer education course with certificate", source: "Fannie Mae" },
  { text: "NAR releases consumer guide on spotting deepfake scams in real estate", source: "NAR" },
  { text: "Never wire money based solely on email instructions — always call to verify", source: "FBI / ALTA" },
];

export default function NewsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [animDuration, setAnimDuration] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth / 2;
        const isMobile = window.innerWidth < 768;
        // Mobile needs to be MUCH faster — the narrow viewport makes slow text feel frozen
        const pixelsPerSecond = isMobile ? 3000 : 1200;
        if (scrollWidth > 0) {
          setAnimDuration(scrollWidth / pixelsPerSecond);
        } else {
          requestAnimationFrame(measure);
        }
      }
    };
    const timer = setTimeout(measure, 100);
    // Re-measure on resize (rotation, etc.)
    const onResize = () => { clearTimeout(timer); setTimeout(measure, 100); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="news-ticker print:hidden bg-alta-navy text-white border-b border-white/10 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="shrink-0 bg-alta-teal px-2 sm:px-4 py-1.5 sm:py-2 font-bold text-[9px] sm:text-[11px] uppercase tracking-wider z-10 flex items-center gap-1.5 sm:gap-2">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white"></span>
          </span>
          <span className="hidden sm:inline">Industry </span>News
        </div>

        {/* Scrolling content */}
        <div className="overflow-hidden flex-1">
          <div
            ref={scrollRef}
            className="flex items-center whitespace-nowrap hover:[animation-play-state:paused]"
            style={{
              animation: `tickerScroll ${animDuration > 0 ? animDuration : 12}s linear infinite`,
            }}
          >
            {/* Render headlines twice for seamless loop */}
            {[...headlines, ...headlines].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] shrink-0"
              >
                <span className="text-gray-300">{item.text}</span>
                <span className="text-[9px] text-alta-teal font-semibold uppercase tracking-wider">{item.source}</span>
                <span className="text-gray-600 mx-1">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
