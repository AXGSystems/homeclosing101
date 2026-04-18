"use client";

import { useState, useEffect } from "react";

/**
 * SponsorShowcase — A premium full-width showcase ad for high-visibility placements.
 * Features a large hero-style layout with sponsor branding, message, and CTA.
 * Ideal for homepage, first-time-buyers, and high-traffic pages.
 *
 * Usage: <SponsorShowcase />
 */

const showcaseSponsors = [
  {
    name: "First American Title",
    logo: "https://www.alta.org/images/wplogos/0000226.png",
    url: "https://www.firstam.com/",
    headline: "Protecting Homebuyers Since 1889",
    description: "First American Title Insurance Company is the nation's leading provider of title insurance, settlement services, and risk solutions — protecting millions of real estate transactions every year.",
    stats: [
      { value: "#1", label: "Title Insurer" },
      { value: "130+", label: "Years of Service" },
      { value: "50", label: "States" },
    ],
    gradient: "from-[#003366] to-[#0066cc]",
  },
  {
    name: "FNF Family of Companies",
    logo: "https://www.alta.org/images/wplogos/0000218.png",
    url: "https://www.fnf.com/",
    headline: "America's Largest Title Insurance Group",
    description: "Fidelity National Financial is a Fortune 500 company and the nation's largest group of title insurance companies, processing millions of transactions annually through its family of trusted brands.",
    stats: [
      { value: "F500", label: "Fortune Ranked" },
      { value: "#1", label: "By Market Share" },
      { value: "12K+", label: "Employees" },
    ],
    gradient: "from-[#1a3a5c] to-[#2a6a9c]",
  },
  {
    name: "CertifID",
    logo: "https://www.alta.org/images/wplogos/1165795.png",
    url: "https://certifid.com/",
    headline: "Stop Wire Fraud Before It Starts",
    description: "CertifID is the real estate industry's leading wire fraud prevention platform — verifying identities and securing payments to protect homebuyers from the #1 threat in real estate.",
    stats: [
      { value: "$275M", label: "Fraud Prevented" },
      { value: "1M+", label: "Transactions Secured" },
      { value: "5K+", label: "Title Companies" },
    ],
    gradient: "from-[#0a7ea8] to-[#003366]",
  },
  {
    name: "Stewart Title",
    logo: "https://www.alta.org/images/wplogos/0002809.png",
    url: "https://www.stewart.com/",
    headline: "Global Real Estate Services",
    description: "Stewart Title provides title insurance and settlement solutions across the globe, combining trusted local expertise with world-class technology to serve homebuyers and industry professionals.",
    stats: [
      { value: "130+", label: "Years" },
      { value: "Global", label: "Coverage" },
      { value: "Top 4", label: "Title Insurer" },
    ],
    gradient: "from-[#1a5276] to-[#2d6b3f]",
  },
];

export default function SponsorShowcase() {
  const [sponsor, setSponsor] = useState(showcaseSponsors[0]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = Math.floor(Math.random() * showcaseSponsors.length);
    setSponsor(showcaseSponsors[start]);

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSponsor(showcaseSponsors[Math.floor(Math.random() * showcaseSponsors.length)]);
        setFading(false);
      }, 500);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-12 print:hidden">
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}
        style={{ transition: "opacity 500ms ease, box-shadow 300ms ease" }}
      >
        <div className={`bg-gradient-to-r ${sponsor.gradient} p-6 sm:p-8 lg:p-10`}>
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            {/* Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/95 flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sponsor.logo} alt={sponsor.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mb-2">ALTA Member Spotlight</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{sponsor.headline}</h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">{sponsor.description}</p>
              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-4">
                {sponsor.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">{s.value}</p>
                    <p className="text-[9px] text-white/50 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* CTA */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-alta-navy font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-colors text-sm">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
