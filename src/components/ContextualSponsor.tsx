"use client";

import { useState, useEffect } from "react";
import { useAdEnabled } from "@/lib/adminConfig";
import { trackAdEvent } from "@/components/Analytics";

/**
 * ContextualSponsor — A native-looking sponsor card that blends into educational content.
 * Place between sections on long pages. Looks like a helpful resource, not a banner ad.
 *
 * Usage: <ContextualSponsor context="closing" />
 * Contexts: "closing", "fraud", "insurance", "mortgage", "title"
 */

const sponsorsByContext: Record<string, { name: string; logo: string; url: string; message: string; cta: string }[]> = {
  closing: [
    { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/", message: "Qualia powers thousands of real estate closings with their digital closing platform — connecting title, lending, and real estate professionals.", cta: "Learn About Digital Closings" },
    { name: "SoftPro", logo: "https://www.alta.org/images/wplogos/0005926.png", url: "https://www.softprocorp.com/", message: "SoftPro is the industry's leading closing and title production software, trusted by thousands of title companies nationwide.", cta: "Explore SoftPro" },
    { name: "AccuTitle", logo: "https://www.alta.org/images/wplogos/1030584.png", url: "https://www.accutitle.com/", message: "AccuTitle streamlines the settlement process with comprehensive closing and title production software.", cta: "See How It Works" },
  ],
  fraud: [
    { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/", message: "CertifID protects real estate transactions from wire fraud with identity verification and secure payment technology used by thousands of title companies.", cta: "Learn About Wire Fraud Prevention" },
    { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/", message: "Closinglock is a secure payment platform that protects wire transfers and prevents fraud in real estate transactions.", cta: "Secure Your Wire Transfer" },
  ],
  insurance: [
    { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/", message: "First American is the nation's leading provider of title insurance, settlement services, and risk solutions for real estate transactions.", cta: "Get Title Insurance" },
    { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/", message: "Since 1907, Old Republic has been one of the largest title insurance groups in the nation, providing title and escrow services.", cta: "Find a Title Agent" },
    { name: "Westcor Land Title", logo: "https://www.alta.org/images/wplogos/1022814.png", url: "https://www.wltic.com/", message: "Westcor is a national title insurance underwriter offering agents competitive rates and comprehensive coverage solutions.", cta: "Learn More" },
  ],
  mortgage: [
    { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/", message: "Fidelity National Financial is the nation's largest group of title insurance companies and a Fortune 500 leader in financial services.", cta: "Find Your Local Office" },
    { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/", message: "Stewart Title provides global real estate services including title insurance and settlement solutions for residential and commercial transactions.", cta: "Get a Quote" },
  ],
  title: [
    { name: "DataTrace", logo: "https://www.alta.org/images/wplogos/0003471.png", url: "https://www.datatracetitle.com/", message: "DataTrace powers faster, more accurate title searches with advanced data solutions and automation technology.", cta: "Explore Title Technology" },
    { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/", message: "WFG National Title is a technology-driven title insurance and settlement services company focused on innovation and agent support.", cta: "Find an Agent" },
  ],
};

export default function ContextualSponsor({ context = "closing" }: { context?: string }) {
  const enabled = useAdEnabled("ContextualSponsor");
  const [sponsor, setSponsor] = useState<typeof sponsorsByContext.closing[0] | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const pool = sponsorsByContext[context] || sponsorsByContext.closing;
    setSponsor(pool[Math.floor(Math.random() * pool.length)]);

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSponsor(pool[Math.floor(Math.random() * pool.length)]);
        setFading(false);
      }, 400);
    }, 20000);
    return () => clearInterval(interval);
  }, [context]);

  useEffect(() => {
    if (!enabled || !sponsor) return;
    trackAdEvent("ContextualSponsor", sponsor.name, "impression");
  }, [enabled, sponsor]);

  if (!enabled || !sponsor) return null;

  return (
    <div className="my-8 print:hidden">
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackAdEvent("ContextualSponsor", sponsor.name, "click")}
        className={`block rounded-2xl border border-gray-100 bg-gradient-to-r from-white via-white to-alta-light/30 hover:shadow-lg hover:border-alta-teal/20 transition-all overflow-hidden ${fading ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: "opacity 400ms ease, box-shadow 300ms ease" }}
      >
        <div className="flex items-center gap-4 p-4 sm:p-5">
          {/* Logo */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sponsor.logo} alt={sponsor.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-bold text-alta-teal uppercase tracking-widest">ALTA Member</span>
              <span className="text-[8px] text-gray-300">|</span>
              <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Sponsored</span>
            </div>
            <h3 className="text-sm font-bold text-alta-navy mb-0.5">{sponsor.name}</h3>
            <p className="text-xs text-alta-gray leading-relaxed line-clamp-2">{sponsor.message}</p>
          </div>
          {/* CTA */}
          <div className="shrink-0 hidden sm:block">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-alta-teal text-white rounded-lg font-semibold text-xs hover:bg-alta-teal/90 transition-colors whitespace-nowrap">
              {sponsor.cta}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
