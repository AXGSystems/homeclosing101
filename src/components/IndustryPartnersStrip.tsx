/**
 * IndustryPartnersStrip — slim strip above the sponsor row showing the
 * title-industry ecosystem HC101 sits inside (ALTA + co-advocates +
 * regulatory authorities). Distinct from SponsorFooterStrip, which shows
 * commercial sponsors.
 */

const partners = [
  { name: "American Land Title Association", short: "ALTA", url: "https://www.alta.org/" },
  { name: "Mortgage Bankers Association", short: "MBA", url: "https://www.mba.org/" },
  { name: "MISMO", short: "MISMO", url: "https://www.mismo.org/" },
  { name: "National Association of Realtors", short: "NAR", url: "https://www.nar.realtor/" },
  { name: "Consumer Financial Protection Bureau", short: "CFPB", url: "https://www.consumerfinance.gov/" },
  { name: "National Association of Insurance Commissioners", short: "NAIC", url: "https://content.naic.org/" },
];

export default function IndustryPartnersStrip() {
  return (
    <div className="print:hidden bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <p className="text-[10px] text-gray-400 text-center font-medium tracking-wide uppercase mb-2">
          Title-industry ecosystem — authorities HomeClosing101 references and partners with
        </p>
        <div className="flex items-center justify-center gap-4 sm:gap-7 flex-wrap">
          {partners.map((p) => (
            <a
              key={p.short}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={p.name}
              className="text-[11px] font-bold text-alta-gray hover:text-alta-teal transition-colors tracking-wide"
            >
              {p.short}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
