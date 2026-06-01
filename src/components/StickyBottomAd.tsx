"use client";

import { useState, useEffect } from "react";
import { useAdEnabled } from "@/lib/adminConfig";
import { trackAdEvent } from "@/components/Analytics";

const sponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/", cta: "Get Title Insurance" },
  { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/", cta: "Prevent Wire Fraud" },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/", cta: "Modern Closings" },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/", cta: "Find a Title Agent" },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/", cta: "Title Services" },
  { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/", cta: "Secure Payments" },
];

export default function StickyBottomAd() {
  const enabled = useAdEnabled("StickyBottomAd");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [sponsor] = useState(() => sponsors[Math.floor(Math.random() * sponsors.length)]);
  const [impressionFired, setImpressionFired] = useState(false);

  useEffect(() => {
    // Don't show if user already dismissed this session
    try { if (sessionStorage.getItem("hc101-bottom-ad-dismissed")) { setDismissed(true); return; } } catch {}

    const onScroll = () => {
      const scrolled = window.scrollY > 600;
      const nearBottom = window.innerHeight + window.scrollY < document.body.scrollHeight - 200;
      setVisible(scrolled && nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!enabled || !visible || impressionFired) return;
    trackAdEvent("StickyBottomAd", sponsor.name, "impression");
    setImpressionFired(true);
  }, [enabled, visible, sponsor, impressionFired]);

  if (!enabled || dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 transition-transform duration-500 print:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Sponsor content */}
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAdEvent("StickyBottomAd", sponsor.name, "click")}
            className="flex items-center gap-3 flex-1 min-w-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sponsor.logo} alt={sponsor.name} className="w-6 h-6 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="min-w-0 hidden sm:block">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">ALTA Member Sponsor</p>
              <p className="text-xs font-semibold text-alta-navy truncate group-hover:text-alta-teal transition-colors">{sponsor.name}</p>
            </div>
            <span className="shrink-0 px-4 py-1.5 bg-alta-teal text-white text-xs font-semibold rounded-lg hover:bg-alta-teal/90 transition-colors">
              {sponsor.cta}
            </span>
          </a>
          {/* Dismiss */}
          <button
            onClick={() => {
              setDismissed(true);
              try { sessionStorage.setItem("hc101-bottom-ad-dismissed", "1"); } catch {}
            }}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
