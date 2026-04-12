"use client";

import { useRef, useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    end: 37, prefix: "", suffix: " days", label: "Average time from accepted offer to closing", detail: "The typical home purchase takes about 5 weeks to close. FHA and VA loans may take slightly longer due to additional requirements.", source: "CFPB", decimals: 0,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
    color: "from-[#1a5276]/80 to-[#154463]/90",
  },
  {
    end: 3.5, prefix: "", suffix: "%", label: "Average closing costs as a percentage of purchase price", detail: "On a $400K home, that's approximately $14,000 in fees beyond your down payment — lender charges, title insurance, taxes, and prepaids.", source: "CFPB", decimals: 1,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    color: "from-[#2d6b3f]/80 to-[#235532]/90",
  },
  {
    end: 8, prefix: "", suffix: "%", label: "Median down payment for first-time homebuyers", detail: "First-time buyers put down a median of 8% — far less than the 20% many assume is required. FHA allows 3.5% and VA/USDA allow 0%.", source: "NAR 2025", decimals: 0,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
    color: "from-[#8b6914]/80 to-[#705410]/90",
  },
  {
    end: 275, prefix: "$", suffix: "M", label: "Lost to real estate wire fraud in 2025 alone", detail: "Criminals intercept closing funds using spoofed emails and deepfakes. Always verify wiring instructions by phone — never trust email.", source: "FBI IC3", decimals: 0,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
    color: "from-[#943030]/80 to-[#7a2020]/90",
  },
  {
    end: 50, prefix: "", suffix: "-100+", label: "Pages of documents you'll sign at the closing table", detail: "The promissory note, deed of trust, Closing Disclosure, and dozens of affidavits and disclosures. Your closing agent will walk you through each one.", source: "ALTA", decimals: 0,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    color: "from-[#5b3a8c]/80 to-[#482d70]/90",
  },
  {
    end: 6000, prefix: "", suffix: "+", label: "ALTA member companies protecting homebuyers nationwide", detail: "Title companies, settlement agents, and abstractors who follow ALTA Best Practices for security, accuracy, and consumer protection.", source: "ALTA", decimals: 0,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    color: "from-[#0a7ea8]/80 to-[#077a9e]/90",
  },
  {
    end: 250, prefix: "", suffix: "+", label: "FAQ questions answered on this site with verified sources", detail: "Every answer sourced from CFPB, FBI, NAR, ALTA, IRS, FHA, VA, and other authoritative sources — no fluff, no fabrication.", source: "HC101", decimals: 0,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
    color: "from-[#1a2744]/80 to-[#0f1b33]/90",
  },
  {
    end: 45, prefix: "", suffix: " states", label: "Now allow Remote Online Notarization (RON) closings", detail: "Thanks to ALTA and MBA advocacy, homebuyers in 45 states + DC can close entirely online via secure audio-video sessions.", source: "ALTA/MBA", decimals: 0,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    color: "from-[#2d6b3f]/80 to-[#1e5530]/90",
  },
];

export default function MarketStats() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => { el.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 300;
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-alta-navy hover:bg-alta-teal hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {canScrollRight && (
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-alta-navy hover:bg-alta-teal hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      {/* Fade edges */}
      {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-[5] pointer-events-none" />}
      {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-[5] pointer-events-none" />}

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 -mx-2 px-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {stats.map((d, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[280px] sm:w-[300px] h-[220px] rounded-2xl overflow-hidden shadow-lg snap-start group"
          >
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${d.image}')` }} />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${d.color}`} />
            {/* Glass panel */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <p className="text-3xl font-bold text-white mb-1">
                  {d.end === 50 ? (
                    <><AnimatedCounter end={50} decimals={0} />-100+</>
                  ) : (
                    <AnimatedCounter end={d.end} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
                  )}
                </p>
                <p className="text-xs text-white/90 leading-snug mb-2">{d.label}</p>
                <p className="text-[10px] text-white/60 leading-relaxed line-clamp-2">{d.detail}</p>
                <p className="text-[9px] text-white/40 mt-2 font-medium uppercase tracking-wider">{d.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {stats.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (el) el.scrollTo({ left: i * 316, behavior: "smooth" });
            }}
            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-alta-teal transition-colors"
          />
        ))}
      </div>
    </div>
  );
}
