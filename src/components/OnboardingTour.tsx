"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { trackAdEvent } from "@/components/Analytics";

const STORAGE_KEY = "hc101-toured";

const tourSponsors = [
  { name: "First American Title", url: "https://www.firstam.com/", logo: "https://www.alta.org/images/wplogos/0000226.png" },
  { name: "FNF Family of Companies", url: "https://www.fnf.com/", logo: "https://www.alta.org/images/wplogos/0000218.png" },
  { name: "Stewart Title", url: "https://www.stewart.com/", logo: "https://www.alta.org/images/wplogos/0002809.png" },
  { name: "Old Republic National Title", url: "https://www.oldrepublictitle.com/", logo: "https://www.alta.org/images/wplogos/0004443.png" },
  { name: "CertifID", url: "https://certifid.com/", logo: "https://www.alta.org/images/wplogos/1165795.png" },
  { name: "Qualia", url: "https://www.qualia.com/", logo: "https://www.alta.org/images/wplogos/1141461.png" },
];

function WordFade({ text, stagger = 40 }: { text: string; stagger?: number }) {
  const words = text.split(/(\s+)/);
  return (
    <span>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-[wordFade_500ms_ease-out_forwards]"
          style={{ animationDelay: `${i * stagger}ms`, whiteSpace: "pre" }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

interface Slide {
  title: string;
  body: string;
  icon: React.ReactNode;
}

// One brand-appropriate accent per slide — drives the icon halo + tile tint
const slideColors = [
  "#0a8ebc", // 1 Welcome — teal
  "#1a5276", // 2 Closing process — navy
  "#2d6b3f", // 3 Calculators — green
  "#943030", // 4 Protect property — red
  "#5b3a8c", // 5 Glossary — purple
  "#d4a843", // 6 AI — gold
  "#077a9e", // 7 Closing folder — deep teal
  "#b45309", // 8 FAQ — amber
  "#0a7e6f", // 9 Ready — emerald-teal
];

const slides: Slide[] = [
  {
    title: "Welcome to HomeClosing101",
    body: "Your trusted, independent guide to understanding the home closing process — built by the American Land Title Association (ALTA). Whether you're buying your first home or your fifth, we break it all down so you can close with confidence.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "The 8-Step Closing Process",
    body: "Follow along from getting your finances ready all the way to getting the keys. Each step has its own dedicated page with checklists, tips, and a timeline so you always know what comes next.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.251 2.251 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Interactive Calculators & Tools",
    body: "Estimate your closing costs, compare mortgage options, calculate debt-to-income ratio, see rent vs. buy breakdowns, and more — all with real-time results personalized to your numbers.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
  },
  {
    title: "Protect Your Property",
    body: "Learn about title insurance, title theft, wire fraud prevention, and your property rights. Use our county-by-county fraud alert lookup to see if your county offers free monitoring — and follow our step-by-step protection toolkit.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "450+ Term Glossary",
    body: "Real estate jargon shouldn't be a barrier. Browse our searchable glossary with plain-English definitions for every term you'll encounter — from 'abstract of title' to 'zoning.' Save any term to your Closing Folder for quick reference.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Ask HomeClosing101 AI",
    body: "Have a question? Our AI assistant is always available in the bottom-right corner. It draws exclusively from HomeClosing101's verified content — every stat, every figure, every recommendation is sourced and cited.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Your Closing Folder",
    body: "See a glossary term, checklist, article, or calculator result you want to keep? Tap the bookmark icon to save it to your personal Closing Folder. Print everything as a branded PDF when you're ready for closing day.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    title: "250+ FAQs & Expert Resources",
    body: "Browse questions organized by topic, read blog articles with the latest industry news, explore first-time buyer guides, and access links to CFPB, HUD, and other trusted resources — all in one place.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Ready to Explore?",
    body: "Start with our First-Time Buyer's Guide for a complete walkthrough, or jump into the Closing Process to see what happens from contract to keys. Everything on this site is free, verified, and built for you.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function OnboardingTour() {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dontShow, setDontShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentKey = useRef(0);

  // Temporarily forced on every visit — ignore STORAGE_KEY gate
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setShow(true);
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const [sponsorIdx, setSponsorIdx] = useState(0);
  useEffect(() => {
    setSponsorIdx(Math.floor(Math.random() * tourSponsors.length));
  }, []);
  const sponsor = tourSponsors[sponsorIdx];

  useEffect(() => {
    if (!show || !sponsor) return;
    trackAdEvent("OnboardingTour", sponsor.name, "impression");
  }, [show, sponsor]);

  const dismiss = useCallback(() => {
    setMounted(false);
    setTimeout(() => {
      setShow(false);
      void dontShow;
      void STORAGE_KEY;
    }, 300);
  }, [dontShow]);

  const complete = useCallback(() => {
    setMounted(false);
    setTimeout(() => setShow(false), 300);
  }, []);

  const goTo = (i: number) => {
    contentKey.current += 1;
    setCurrent(i);
    setSponsorIdx((prev) => (prev + 1) % tourSponsors.length);
  };

  if (!show) return null;

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 print:hidden transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome tour"
      onClick={dismiss}
    >
      {/* Subtle teal wash — keeps main page visible */}
      <div className="absolute inset-0 bg-alta-teal/10 backdrop-blur-[2px]" />

      {/* Wrapper that positions the auras behind the card */}
      <div
        className={`relative w-full max-w-xl transition-all duration-500 ${
          mounted ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red aura behind the card */}
        <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#943030]/45 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        {/* Navy underlay */}
        <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[#0d3a5c]/55 blur-2xl" />

        {/* Glass card */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-[#0d3a5c]/75 via-[#0a8ebc]/55 to-alta-teal/55 backdrop-blur-2xl ring-1 ring-[#0d3a5c]/40 shadow-[0_20px_60px_rgba(10,30,60,0.55)]">
        {/* Top shimmer bar — visible white-on-glass */}
        <div className="h-[3px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {/* Welcome banner — glass, matches footer */}
        <div className="relative flex items-center justify-center px-12 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <p className="text-sm sm:text-base text-center text-white/90 font-semibold tracking-wide">
            Welcome to <span className="text-white font-bold">HomeClosing<span className="text-[#1a2744]">101</span></span>
            <span className="text-white/55"> — an ALTA educational initiative for homebuyers</span>
          </p>
          <button
            onClick={dismiss}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close tour"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div key={contentKey.current} className="px-6 pt-5 pb-2 sm:px-10 sm:pt-6 animate-[fadeIn_400ms_ease-out]">
          {/* Glowing icon tile — per-slide accent color */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div
              className="absolute -inset-3 rounded-[1.75rem] blur-2xl animate-pulse"
              style={{ backgroundColor: `${slideColors[current]}99`, animationDuration: "3.5s" }}
            />
            <div
              className="relative w-24 h-24 rounded-2xl border border-white/40 flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(135deg, ${slideColors[current]}, ${slideColors[current]}cc)`,
                boxShadow: `0 10px 30px ${slideColors[current]}88, inset 0 1px 0 rgba(255,255,255,0.3)`,
              }}
            >
              {slide.icon}
            </div>
          </div>

          {/* Slide counter */}
          <p className="text-[10px] text-alta-teal font-bold uppercase tracking-[0.25em] text-center mb-3">
            <span className="text-white/90">{current + 1}</span>
            <span className="text-white/40"> / {slides.length}</span>
          </p>

          {/* Title — first word in slide color, rest white, "101" soft red */}
          {(() => {
            const firstSpace = slide.title.indexOf(" ");
            const firstWord = firstSpace === -1 ? slide.title : slide.title.slice(0, firstSpace);
            const rest = firstSpace === -1 ? "" : slide.title.slice(firstSpace);
            const renderRest = (text: string) => {
              if (!text.includes("101")) return text;
              const parts = text.split("101");
              return (
                <>
                  {parts[0]}
                  <span style={{ color: "rgba(232, 120, 110, 0.55)" }}>101</span>
                  {parts[1]}
                </>
              );
            };
            return (
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 tracking-tight text-white">
                <span style={{ color: slideColors[current] }}>{firstWord}</span>
                {renderRest(rest)}
              </h2>
            );
          })()}

          {/* Body — word-by-word fade in */}
          <p className="text-white/85 text-center text-sm sm:text-base leading-relaxed mb-6 min-h-[5.5rem]">
            <WordFade key={current} text={slide.body} />
          </p>

          {/* CTA links on last slide */}
          {isLast && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
              <a
                href="/first-time-buyers"
                onClick={complete}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-alta-teal to-[#0a8ebc] text-white text-sm font-semibold shadow-lg shadow-alta-teal/30 hover:shadow-xl hover:shadow-alta-teal/40 hover:scale-[1.02] transition-all"
              >
                First-Time Buyer&apos;s Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
              <a
                href="/closing-process"
                onClick={complete}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-xl text-white text-sm font-semibold hover:bg-white/20 transition-all"
              >
                The Closing Process
              </a>
            </div>
          )}

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mb-4" aria-label="Slide progress">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2 bg-gradient-to-r from-alta-teal to-[#0a8ebc] shadow-[0_0_12px_rgba(10,142,188,0.6)]"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Sponsor mini-strip — glass styled to match tour */}
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAdEvent("OnboardingTour", sponsor.name, "click")}
            className="mx-auto mb-4 flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-white/8 backdrop-blur-xl hover:bg-white/15 transition-colors w-fit"
          >
            <span className="text-[10px] font-semibold text-white/55 uppercase tracking-[0.2em]">Sponsored by</span>
            <span className="w-px h-4 bg-white/25" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-5 w-auto object-contain"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="text-[12px] font-semibold text-white/90">{sponsor.name}</span>
            <svg className="w-3 h-3 text-white/55" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>

        {/* Footer controls — glass bar */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 sm:px-10 flex items-center justify-between gap-3">
          {/* Don't show again */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="w-4 h-4 rounded border-white/30 bg-white/10 text-alta-teal accent-alta-teal"
            />
            <span className="text-xs text-white/70">Don&apos;t show again</span>
          </label>

          {/* Site URL — center */}
          <span className="hidden sm:block text-[10px] text-white/50 font-semibold tracking-[0.15em] uppercase">
            HomeClosing101.org
          </span>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={dismiss}
              className="px-3 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              Skip
            </button>
            {current > 0 && (
              <button
                onClick={() => goTo(current - 1)}
                className="px-4 py-2 text-sm font-medium text-white/90 border border-white/20 bg-white/5 rounded-xl hover:bg-white/10 backdrop-blur-xl transition-colors"
              >
                Back
              </button>
            )}
            {!isLast ? (
              <button
                onClick={() => goTo(current + 1)}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-alta-teal to-[#0a8ebc] rounded-xl shadow-lg shadow-alta-teal/30 hover:shadow-xl hover:shadow-alta-teal/40 hover:scale-[1.02] transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={complete}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#2d6b3f] to-[#0a8ebc] rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
              >
                Done
              </button>
            )}
          </div>
        </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
