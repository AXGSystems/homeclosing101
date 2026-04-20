"use client";

/**
 * SponsorFooterStrip — A slim horizontal strip showing grayscale sponsor logos.
 * Appears just above the site footer. Logos colorize on hover.
 */

const stripSponsors = [
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/" },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/" },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/" },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/" },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/" },
];

export default function SponsorFooterStrip() {
  return (
    <div className="print:hidden bg-gray-50 border-t border-gray-100 sticky bottom-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <p className="text-[10px] text-gray-400 text-center font-medium tracking-wide uppercase mb-3">
          HomeClosing101 is supported by ALTA member companies
        </p>
        <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          {stripSponsors.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-all duration-300"
              title={s.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.logo}
                alt={s.name}
                className="h-6 sm:h-7 w-auto object-contain"
                onError={(e) => { if (!e.currentTarget.src.endsWith('/logos/alta.svg')) e.currentTarget.src = '/logos/alta.svg'; }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
