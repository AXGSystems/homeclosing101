"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hc101-cookie-consent";

type Consent = "accepted" | "rejected";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setShow(true);
        requestAnimationFrame(() => setMounted(true));
      }
    } catch {
      // localStorage unavailable — skip banner silently
    }
  }, []);

  const persist = useCallback((value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setMounted(false);
    setTimeout(() => setShow(false), 300);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[9998] px-4 pb-4 sm:px-6 sm:pb-6 print:hidden transition-all duration-300 ease-out ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/30 bg-alta-navy/85 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 text-white">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="flex-1 text-sm leading-relaxed">
            <p className="font-semibold text-white mb-1">This site uses cookies</p>
            <p className="text-white/80">
              HomeClosing101 uses cookies and similar technologies to remember your preferences,
              measure site performance, and improve your experience. You can accept all cookies or
              continue with essential cookies only. Read our{" "}
              <a href="/privacy" className="underline decoration-white/40 hover:decoration-white">
                privacy policy
              </a>{" "}
              for details.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
            <button
              onClick={() => persist("rejected")}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              Essential only
            </button>
            <button
              onClick={() => persist("accepted")}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-alta-teal text-white hover:bg-alta-teal-dark transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
