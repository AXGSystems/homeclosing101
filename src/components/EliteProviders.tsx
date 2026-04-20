"use client";

import { useState, useEffect } from "react";

const sponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/", blurb: "Nation's leading provider of title insurance, settlement services, and risk solutions for real estate transactions." },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/", blurb: "One of the largest title insurance groups in the nation, providing title and escrow services since 1907." },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/", blurb: "Global real estate services company providing title insurance and settlement solutions worldwide." },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/", blurb: "Fidelity National Financial — the nation's largest group of title insurance companies and a Fortune 500 leader." },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/", blurb: "Technology-driven title insurance and settlement services company focused on innovation and agent support." },
  { name: "Westcor Land Title", logo: "https://www.alta.org/images/wplogos/1022814.png", url: "https://www.wltic.com/", blurb: "National title insurance underwriter offering agents competitive rates and comprehensive coverage solutions." },
  { name: "SoftPro", logo: "https://www.alta.org/images/wplogos/0005926.png", url: "https://www.softprocorp.com/", blurb: "Leading closing, title, and escrow software for real estate professionals — trusted by thousands nationwide." },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/", blurb: "Digital real estate closing platform connecting title, lending, and real estate professionals for faster closings." },
  { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/", blurb: "Secure payment platform for the real estate industry — protecting wire transfers and preventing fraud." },
  { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/", blurb: "Wire fraud prevention and identity verification platform protecting real estate transactions from cyber threats." },
  { name: "DataTrace", logo: "https://www.alta.org/images/wplogos/0003471.png", url: "https://www.datatracetitle.com/", blurb: "Title data solutions and automation technology powering faster, more accurate title searches and decisions." },
  { name: "AccuTitle", logo: "https://www.alta.org/images/wplogos/1030584.png", url: "https://www.accutitle.com/", blurb: "Comprehensive closing and title production software streamlining the settlement process." },
];

// Show 3 at a time, rotate every 5 seconds
export default function EliteProviders() {
  const [activeSet, setActiveSet] = useState(0);
  const [fading, setFading] = useState(false);
  const setsCount = Math.ceil(sponsors.length / 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveSet((prev) => (prev + 1) % setsCount);
        setFading(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [setsCount]);

  const currentSponsors = sponsors.slice(activeSet * 3, activeSet * 3 + 3);

  return (
    <section className="print:hidden py-6 bg-alta-light/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-center gap-8 md:gap-16 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
          {currentSponsors.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 opacity-100 hover:scale-105 transition-all duration-300"
              title={s.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.logo}
                alt={s.name}
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => { if (!e.currentTarget.src.endsWith('/logos/alta.svg')) e.currentTarget.src = '/logos/alta.svg'; }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Full-width inline sponsor banner for content pages
export function InlineAd() {
  const [sponsor, setSponsor] = useState(sponsors[0]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const randomStart = Math.floor(Math.random() * sponsors.length);
    setSponsor(sponsors[randomStart]);

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSponsor(sponsors[Math.floor(Math.random() * sponsors.length)]);
        setFading(false);
      }, 400);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-ad print:hidden my-10 @container">
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-2xl border border-gray-100 bg-gradient-to-br from-alta-light to-white shadow-sm hover:shadow-lg hover:border-alta-teal/30 transition-all overflow-hidden ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 400ms ease, box-shadow 200ms ease" }}
      >
        <div className="flex flex-col @xl:flex-row @xl:items-center gap-5 p-5 @sm:p-6 @xl:p-8">
          {/* Logo */}
          <div className="w-full @xl:w-40 flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sponsor.logo} alt={sponsor.name} className="h-14 @sm:h-16 w-auto object-contain max-w-[140px]" loading="lazy" onError={(e) => { if (!e.currentTarget.src.endsWith('/logos/alta.svg')) e.currentTarget.src = '/logos/alta.svg'; }} />
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0 text-center @xl:text-left">
            <p className="text-[9px] font-semibold text-alta-teal uppercase tracking-widest mb-1">ALTA Member Spotlight</p>
            <h3 className="text-lg font-bold text-alta-navy mb-1.5">{sponsor.name}</h3>
            <p className="text-sm text-alta-gray leading-relaxed">{sponsor.blurb}</p>
          </div>
          {/* CTA */}
          <div className="shrink-0 w-full @xl:w-auto flex justify-center @xl:justify-end">
            <span className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-alta-teal text-white rounded-lg font-semibold text-sm hover:bg-alta-teal-dark transition-colors whitespace-nowrap">
              Learn More
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
