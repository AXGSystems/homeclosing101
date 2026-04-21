"use client";

import { useEffect } from "react";
import { useAdEnabled } from "@/lib/adminConfig";
import { trackAdEvent } from "@/components/Analytics";
import { getStatePartners } from "@/data/statePartners";

interface StatePartnersProps {
  stateCode: string;
  stateName: string;
}

const AD_KEY = "StatePartners";

export default function StatePartners({ stateCode, stateName }: StatePartnersProps) {
  const enabled = useAdEnabled(AD_KEY);
  const partners = getStatePartners(stateCode, stateName);

  useEffect(() => {
    if (!enabled || !stateCode) return;
    partners.forEach((p) => trackAdEvent(AD_KEY, p.name, "impression"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, stateCode]);

  if (!enabled || partners.length === 0) return null;

  return (
    <div className="mt-6 print:hidden">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-semibold text-alta-gray uppercase tracking-widest">
          {stateName} Partners
        </p>
        <span
          className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200"
          title="Demo placeholder data — real ALTA members will replace this once the directory loads."
        >
          Demo
        </span>
      </div>
      <div className="space-y-3">
        {partners.map((p) => (
          <a
            key={p.id}
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAdEvent(AD_KEY, p.name, "click")}
            className="group block p-3.5 bg-white rounded-xl border border-gray-100 hover:border-alta-teal/30 hover:shadow-md transition-all relative"
          >
            {/* Demo ribbon */}
            <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/70">
              Demo
            </span>
            <div className="flex items-start gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-alta-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1 pr-10">
                <h4 className="text-xs font-bold text-alta-navy leading-tight group-hover:text-alta-teal transition-colors">
                  {p.name}
                </h4>
                <p className="text-[10px] text-alta-gray mt-0.5">
                  {p.city}, {stateCode}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-alta-gray leading-relaxed line-clamp-3">
              {p.blurb}
            </p>
          </a>
        ))}
      </div>
      <p className="text-[9px] text-gray-400 italic mt-2 leading-relaxed">
        Placeholder listings for feature preview. Real ALTA member partners will appear here once the directory is loaded.
      </p>
    </div>
  );
}
