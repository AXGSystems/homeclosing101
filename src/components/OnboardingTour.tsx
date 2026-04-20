"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hc101-toured";

interface Slide {
  title: string;
  body: string;
  icon: React.ReactNode;
}

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

  // Temporarily forced on every visit — ignore STORAGE_KEY gate
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setShow(true);
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    void dontShow;
    void STORAGE_KEY;
  }, [dontShow]);

  const complete = useCallback(() => {
    setShow(false);
  }, []);

  if (!show) return null;

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome tour"
      onClick={dismiss}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-alta-teal via-alta-navy to-alta-gold" />

        {/* Close X button */}
        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={dismiss}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close tour"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-2 sm:px-8">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-alta-light flex items-center justify-center text-alta-teal mb-4">
            {slide.icon}
          </div>

          {/* Slide counter */}
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest text-center mb-2">
            {current + 1} of {slides.length}
          </p>

          {/* Content */}
          <h2 className="text-xl sm:text-2xl font-bold text-alta-navy text-center mb-3">
            {slide.title}
          </h2>
          <p className="text-alta-gray text-center text-sm sm:text-base leading-relaxed mb-6">
            {slide.body}
          </p>

          {/* CTA links on last slide */}
          {isLast && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a
                href="/first-time-buyers"
                onClick={complete}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-alta-teal text-white text-sm font-semibold hover:bg-alta-teal-dark transition-colors"
              >
                First-Time Buyer&apos;s Guide
              </a>
              <a
                href="/closing-process"
                onClick={complete}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border-2 border-alta-navy text-alta-navy text-sm font-semibold hover:bg-alta-navy hover:text-white transition-colors"
              >
                The Closing Process
              </a>
            </div>
          )}

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mb-4" aria-label="Slide progress">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? "w-6 h-2.5 bg-alta-teal" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="border-t border-gray-100 px-6 py-4 sm:px-8 flex items-center justify-between gap-3">
          {/* Don't show again */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-alta-teal accent-alta-teal"
            />
            <span className="text-xs text-alta-gray">Don&apos;t show again</span>
          </label>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={dismiss}
              className="px-3 py-1.5 text-xs text-alta-gray hover:text-alta-navy transition-colors"
            >
              Skip
            </button>
            {current > 0 && (
              <button
                onClick={() => setCurrent((p) => p - 1)}
                className="px-4 py-1.5 text-sm font-medium text-alta-navy border border-gray-200 rounded-lg hover:bg-alta-light transition-colors"
              >
                Back
              </button>
            )}
            {!isLast ? (
              <button
                onClick={() => setCurrent((p) => p + 1)}
                className="px-4 py-1.5 text-sm font-medium text-white bg-alta-teal rounded-lg hover:bg-alta-teal-dark transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={complete}
                className="px-4 py-1.5 text-sm font-medium text-white bg-alta-green rounded-lg hover:opacity-90 transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
