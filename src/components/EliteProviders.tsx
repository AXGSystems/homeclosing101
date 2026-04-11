"use client";

import { useState, useEffect } from "react";

const sponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/" },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/" },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/" },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/" },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/" },
  { name: "Westcor Land Title", logo: "https://www.alta.org/images/wplogos/1022814.png", url: "https://www.wltic.com/" },
  { name: "SoftPro", logo: "https://www.alta.org/images/wplogos/0005926.png", url: "https://www.softprocorp.com/" },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/" },
  { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/" },
  { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/" },
  { name: "DataTrace", logo: "https://www.alta.org/images/wplogos/0003471.png", url: "https://www.datatracetitle.com/" },
  { name: "AccuTitle", logo: "https://www.alta.org/images/wplogos/1030584.png", url: "https://www.accutitle.com/" },
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
    <section className="py-6 bg-alta-light/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-center gap-8 md:gap-16 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
          {currentSponsors.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
              title={s.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.logo}
                alt={s.name}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Inline ad banner for use between content sections on various pages
export function InlineAd() {
  const [sponsor, setSponsor] = useState(sponsors[0]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Pick a random sponsor on mount, rotate every 8 seconds
    const randomStart = Math.floor(Math.random() * sponsors.length);
    setSponsor(sponsors[randomStart]);

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSponsor(sponsors[Math.floor(Math.random() * sponsors.length)]);
        setFading(false);
      }, 400);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 px-5 py-3 bg-alta-light/60 rounded-lg border border-gray-100 hover:border-alta-teal/20 hover:shadow-sm transition-all duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 400ms ease" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sponsor.logo} alt={sponsor.name} className="h-6 w-auto object-contain" />
        <span className="text-[10px] text-alta-gray border-l border-gray-200 pl-3">ALTA Member</span>
      </a>
    </div>
  );
}
