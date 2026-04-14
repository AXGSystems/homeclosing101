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
    body: "Your trusted guide to understanding the home closing process — an educational initiative of the American Land Title Association (ALTA). Whether you're buying your first home or your fifth, we break down the process so you can close with confidence.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Your Tools",
    body: "Use our closing cost calculators to estimate your expenses, follow interactive checklists to stay organized, and explore a 450+ term glossary so you never feel lost in the paperwork.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.386 3.069a.75.75 0 01-1.08-.819l1.028-5.993-4.354-4.244a.75.75 0 01.416-1.28l6.017-.873L10.73 0a.75.75 0 011.34 0l2.687 5.03 6.017.873a.75.75 0 01.416 1.28l-4.354 4.244 1.028 5.993a.75.75 0 01-1.08.819L12 15.17z" />
      </svg>
    ),
  },
  {
    title: "Save As You Go",
    body: "Found a glossary term you want to remember? Have a question for your closing agent? Save items to your personal Closing Folder and access everything in one place when you need it most.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    title: "Get Started",
    body: "Ready to dive in? Start with our First-Time Buyer's Guide for a step-by-step walkthrough, or jump straight into the Closing Process to see what happens from contract to keys.",
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

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setShow(true);
      }
    } catch {
      // localStorage unavailable — skip tour silently
    }
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      if (dontShow) {
        localStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      // ignore
    }
  }, [dontShow]);

  const complete = useCallback(() => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }, []);

  if (!show) return null;

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome tour"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-alta-teal via-alta-navy to-alta-gold" />

        <div className="px-6 pt-6 pb-2 sm:px-8 sm:pt-8">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-alta-light flex items-center justify-center text-alta-teal mb-4">
            {slide.icon}
          </div>

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
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-alta-teal scale-110" : "bg-gray-300 hover:bg-gray-400"
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
