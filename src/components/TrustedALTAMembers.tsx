"use client";

import { useState, useEffect } from "react";
import { useAdEnabled } from "@/lib/adminConfig";
import { trackAdEvent } from "@/components/Analytics";

const sponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/" },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/" },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/" },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/" },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/" },
  { name: "Westcor Land Title", logo: "https://www.alta.org/images/wplogos/1022814.png", url: "https://www.wltic.com/" },
  { name: "SoftPro", logo: "https://www.alta.org/images/wplogos/0005926.png", url: "https://www.softprocorp.com/" },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/" },
  { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/" },
  { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/" },
];

// Shows 5 logos, rotates every 6 seconds
export default function TrustedALTAMembers() {
  const enabled = useAdEnabled("TrustedALTAMembers");
  const [offset, setOffset] = useState(0);
  const [fading, setFading] = useState(false);
  const count = 5;

  useEffect(() => {
    const randomStart = Math.floor(Math.random() * sponsors.length);
    setOffset(randomStart);

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setOffset((prev) => (prev + count) % sponsors.length);
        setFading(false);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const visible = Array.from({ length: count }, (_, i) => sponsors[(offset + i) % sponsors.length]);

  useEffect(() => {
    if (!enabled) return;
    visible.forEach((s) => trackAdEvent("TrustedALTAMembers", s.name, "impression"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, offset]);

  if (!enabled) return null;

  return (
    <div className="my-8 py-3 bg-gray-50 rounded-xl border border-gray-100">
      <p className="text-[9px] text-alta-gray text-center uppercase tracking-widest mb-2">Trusted ALTA Member Companies</p>
      <div className={`flex items-center justify-center gap-6 flex-wrap px-4 transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}>
        {visible.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAdEvent("TrustedALTAMembers", s.name, "click")}
            className="flex items-center justify-center opacity-100 transition-all duration-300 hover:scale-105"
            title={s.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.logo} alt={s.name} className="h-6 w-auto object-contain max-w-[100px]" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </a>
        ))}
      </div>
    </div>
  );
}
