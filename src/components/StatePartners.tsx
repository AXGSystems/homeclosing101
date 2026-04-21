"use client";

import { useEffect, useState } from "react";
import { useAdEnabled } from "@/lib/adminConfig";
import { trackAdEvent } from "@/components/Analytics";
import { getStatePartners } from "@/data/statePartners";

interface StatePartnersProps {
  stateCode: string;
  stateName: string;
}

const AD_KEY = "StatePartners";
const ROTATION_MS = 6000;

export default function StatePartners({ stateCode, stateName }: StatePartnersProps) {
  const enabled = useAdEnabled(AD_KEY);
  const partners = getStatePartners(stateCode, stateName);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  // Reset index when state changes
  useEffect(() => {
    setCurrent(0);
  }, [stateCode]);

  // Auto-rotate
  useEffect(() => {
    if (!enabled || partners.length <= 1) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % partners.length);
        setFading(false);
      }, 350);
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, [enabled, partners.length]);

  // Impression on visible partner change
  useEffect(() => {
    if (!enabled || !partners[current]) return;
    trackAdEvent(AD_KEY, partners[current].name, "impression");
  }, [enabled, current, partners]);

  if (!enabled || partners.length === 0) return null;

  const p = partners[current];

  return (
    <div className="print:hidden">
      <a
        href={p.website}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackAdEvent(AD_KEY, p.name, "click")}
        className={`group block p-4 bg-white rounded-xl border border-gray-100 hover:border-alta-teal/30 hover:shadow-md transition-all relative ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 350ms ease, box-shadow 200ms ease, border-color 200ms ease" }}
      >
        {/* Demo ribbon */}
        <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/70">
          Demo
        </span>
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-alta-teal/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 pr-10">
            <h4 className="text-sm font-bold text-alta-navy leading-tight group-hover:text-alta-teal transition-colors">
              {p.name}
            </h4>
            <p className="text-[11px] text-alta-gray mt-0.5">
              {p.city}, {stateCode}
            </p>
          </div>
        </div>
        <p className="text-[11px] text-alta-gray leading-relaxed">
          {p.blurb}
        </p>
      </a>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1 mt-3">
        {partners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => { setCurrent(i); setFading(false); }, 200);
            }}
            aria-label={`Show partner ${i + 1} of ${partners.length}`}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-alta-teal" : "bg-gray-200 hover:bg-gray-300"}`}
          />
        ))}
      </div>

      <p className="text-[9px] text-gray-400 italic mt-2 leading-relaxed text-center">
        Placeholder listings — real ALTA partners coming soon.
      </p>
    </div>
  );
}
