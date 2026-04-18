"use client";

import { useState, useEffect } from "react";

/**
 * SponsorBadge — A tiny inline badge that sits next to a section heading.
 * Shows "Presented by [Sponsor Logo]" in a subtle, non-intrusive way.
 *
 * Usage: <SponsorBadge /> (place directly after an <h2> inside a flex wrapper)
 *
 * Or wrap your heading:
 * <div className="flex items-center gap-3 flex-wrap">
 *   <h2 className="...">Section Title</h2>
 *   <SponsorBadge />
 * </div>
 */

const badgeSponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/" },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/" },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/" },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/" },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/" },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/" },
];

export default function SponsorBadge() {
  const [sponsor, setSponsor] = useState<typeof badgeSponsors[0] | null>(null);

  useEffect(() => {
    setSponsor(badgeSponsors[Math.floor(Math.random() * badgeSponsors.length)]);
  }, []);

  if (!sponsor) return null;

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 print:hidden opacity-60 hover:opacity-100 transition-opacity"
      title={`Presented by ${sponsor.name}`}
    >
      <span className="hidden sm:inline text-[9px] text-gray-400 font-medium tracking-wide">Presented by</span>
      <span className="w-px h-3 bg-gray-200 hidden sm:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className="h-5 w-auto object-contain"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </a>
  );
}
