"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hc101-cookie-consent";

type Consent = "accepted" | "rejected";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

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
    <>
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
                continue with essential cookies only.{" "}
                <button
                  type="button"
                  onClick={() => setShowPolicy(true)}
                  className="underline decoration-white/40 hover:decoration-white font-medium"
                >
                  View privacy policy
                </button>
                .
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

      {showPolicy && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Privacy policy"
          onClick={() => setShowPolicy(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/30 bg-white/90 backdrop-blur-2xl shadow-2xl ring-1 ring-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
              <h2 className="text-lg font-bold text-alta-navy">Privacy Policy</h2>
              <button
                onClick={() => setShowPolicy(false)}
                className="p-1.5 text-gray-500 hover:text-alta-navy hover:bg-gray-100/60 rounded-lg transition-colors"
                aria-label="Close privacy policy"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 text-sm leading-relaxed text-alta-gray space-y-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Last updated: April 2026
              </p>

              <p>
                HomeClosing101 is an educational initiative of the American Land Title Association
                (ALTA). We respect your privacy and are committed to being transparent about the
                limited information we collect.
              </p>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">What we collect</h3>
                <p>
                  We collect anonymous usage data (pages visited, time on site, device type,
                  browser) through cookies and similar technologies to understand how visitors use
                  the site and to improve our content. If you submit feedback, save items to your
                  Closing Folder, or contact us, we collect only what you provide.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">How we use it</h3>
                <p>
                  Usage data helps us measure performance and improve the site. We do not sell your
                  personal information. We do not use your data for advertising targeting outside
                  of HomeClosing101. Sponsor content on the site is contextual, not behavioral.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">Cookies</h3>
                <p>
                  Essential cookies keep the site working (preferences, saved items). Optional
                  cookies help us measure traffic and improve content. Choosing &ldquo;Essential
                  only&rdquo; disables the optional set. You can clear cookies in your browser at
                  any time.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">Your rights</h3>
                <p>
                  You have the right to know what data we hold about you, request its deletion, and
                  opt out of non-essential cookies. Residents of California (CCPA), Virginia, and
                  the EU/UK (GDPR) have additional rights under their local laws. To exercise any
                  of these, email{" "}
                  <a href="mailto:privacy@alta.org" className="text-alta-teal underline">
                    privacy@alta.org
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">Security</h3>
                <p>
                  We use industry-standard safeguards to protect any information you share. No
                  system is perfectly secure, so we recommend not submitting sensitive personal
                  information (SSN, bank accounts, etc.) through this site.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">Third parties</h3>
                <p>
                  We use reputable third-party services for hosting, analytics, and email delivery.
                  These providers are bound by their own privacy terms and only process data as
                  needed to operate the site.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-alta-navy mb-1">Contact</h3>
                <p>
                  Questions about this policy? Email{" "}
                  <a href="mailto:privacy@alta.org" className="text-alta-teal underline">
                    privacy@alta.org
                  </a>
                  . We may update this policy periodically; material changes will be reflected in
                  the &ldquo;Last updated&rdquo; date above.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 px-6 py-4 bg-white/80 backdrop-blur-xl border-t border-gray-200/60 flex justify-end">
              <button
                onClick={() => setShowPolicy(false)}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-alta-teal text-white hover:bg-alta-teal-dark transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
