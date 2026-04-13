"use client";

import { useState, useEffect } from "react";

const sponsors = [
  {
    name: "First American Title",
    logo: "https://www.alta.org/images/wplogos/0000226.png",
    url: "https://www.firstam.com/",
    blurb: "Nation's leading provider of title insurance, settlement services, and risk solutions for real estate transactions.",
  },
  {
    name: "Old Republic National Title",
    logo: "https://www.alta.org/images/wplogos/0004443.png",
    url: "https://www.oldrepublictitle.com/",
    blurb: "One of the largest title insurance groups in the nation, providing title and escrow services since 1907.",
  },
  {
    name: "Stewart Title",
    logo: "https://www.alta.org/images/wplogos/0002809.png",
    url: "https://www.stewart.com/",
    blurb: "Global real estate services company providing title insurance and settlement solutions worldwide.",
  },
  {
    name: "FNF Family of Companies",
    logo: "https://www.alta.org/images/wplogos/0000218.png",
    url: "https://www.fnf.com/",
    blurb: "Fidelity National Financial — the nation's largest group of title insurance companies and a Fortune 500 leader.",
  },
  {
    name: "WFG National Title",
    logo: "https://www.alta.org/images/wplogos/0002642.png",
    url: "https://wfgtitle.com/",
    blurb: "Technology-driven title insurance and settlement services company focused on innovation and agent support.",
  },
  {
    name: "Westcor Land Title",
    logo: "https://www.alta.org/images/wplogos/1022814.png",
    url: "https://www.wltic.com/",
    blurb: "National title insurance underwriter offering agents competitive rates and comprehensive coverage solutions.",
  },
  {
    name: "SoftPro",
    logo: "https://www.alta.org/images/wplogos/0005926.png",
    url: "https://www.softprocorp.com/",
    blurb: "Leading closing, title, and escrow software for real estate professionals — trusted by thousands nationwide.",
  },
  {
    name: "Qualia",
    logo: "https://www.alta.org/images/wplogos/1141461.png",
    url: "https://www.qualia.com/",
    blurb: "Digital real estate closing platform connecting title, lending, and real estate professionals for faster closings.",
  },
  {
    name: "CertifID",
    logo: "https://www.alta.org/images/wplogos/1165795.png",
    url: "https://certifid.com/",
    blurb: "Wire fraud prevention and identity verification platform protecting real estate transactions from cyber threats.",
  },
  {
    name: "Closinglock",
    logo: "https://www.alta.org/images/wplogos/1168010.png",
    url: "https://www.closinglock.com/",
    blurb: "Secure payment platform for the real estate industry — protecting wire transfers and preventing fraud.",
  },
  {
    name: "DataTrace",
    logo: "https://www.alta.org/images/wplogos/0003471.png",
    url: "https://www.datatracetitle.com/",
    blurb: "Title data solutions and automation technology powering faster, more accurate title searches and decisions.",
  },
];

export default function SponsorSidebar() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % sponsors.length);
        setFading(false);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const sponsor = sponsors[current];

  return (
    <div className="sticky top-28">
      <p className="text-[9px] font-semibold text-alta-gray uppercase tracking-widest mb-3">ALTA Member Spotlight</p>
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-alta-teal/30 transition-all ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 400ms ease, box-shadow 200ms ease, border-color 200ms ease" }}
      >
        <div className="flex items-center justify-center h-16 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-14 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <h3 className="text-sm font-semibold text-alta-navy text-center mb-2">{sponsor.name}</h3>
        <p className="text-xs text-alta-gray text-center leading-relaxed mb-3">{sponsor.blurb}</p>
        <span className="flex items-center justify-center gap-1 text-xs font-medium text-alta-teal">
          Visit Website
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      </a>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1 mt-3">
        {sponsors.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 200); }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-alta-teal" : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
