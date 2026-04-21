"use client";

import { useState, useEffect } from "react";
import { useAdEnabled } from "@/lib/adminConfig";
import { trackAdEvent } from "@/components/Analytics";

const AD_KEY = "SponsorTip";

/**
 * SponsorTip — A small "Did you know?" callout with subtle sponsor branding.
 * Looks like educational content with a sponsor mention. One line of text.
 *
 * Usage: <SponsorTip context="closing" />
 * Contexts: "closing", "fraud", "insurance", "mortgage", "title"
 */

const tipsByContext: Record<string, { sponsor: string; url: string; tip: string }[]> = {
  closing: [
    { sponsor: "Qualia", url: "https://www.qualia.com/", tip: "Qualia processes over 1 million closings annually through its digital closing platform." },
    { sponsor: "SoftPro", url: "https://www.softprocorp.com/", tip: "SoftPro is trusted by thousands of title companies as the industry's leading closing software." },
    { sponsor: "AccuTitle", url: "https://www.accutitle.com/", tip: "AccuTitle helps settlement agents streamline closings with comprehensive title production tools." },
  ],
  fraud: [
    { sponsor: "CertifID", url: "https://certifid.com/", tip: "CertifID has protected over $100 billion in real estate transactions from wire fraud." },
    { sponsor: "Closinglock", url: "https://www.closinglock.com/", tip: "Closinglock secures wire transfers for thousands of real estate transactions every month." },
  ],
  insurance: [
    { sponsor: "First American Title", url: "https://www.firstam.com/", tip: "First American has been a leading title insurance provider for over 130 years." },
    { sponsor: "Old Republic National Title", url: "https://www.oldrepublictitle.com/", tip: "Old Republic has provided title insurance and escrow services since 1907." },
  ],
  mortgage: [
    { sponsor: "FNF Family of Companies", url: "https://www.fnf.com/", tip: "Fidelity National Financial is the nation's largest group of title insurance companies." },
    { sponsor: "Stewart Title", url: "https://www.stewart.com/", tip: "Stewart Title provides title insurance and settlement solutions in markets across the globe." },
  ],
  title: [
    { sponsor: "DataTrace", url: "https://www.datatracetitle.com/", tip: "DataTrace powers faster title searches with advanced data solutions and automation." },
    { sponsor: "WFG National Title", url: "https://wfgtitle.com/", tip: "WFG National Title is a technology-driven title insurance company focused on innovation." },
  ],
};

export default function SponsorTip({ context = "closing" }: { context?: string }) {
  const enabled = useAdEnabled(AD_KEY);
  const [tip, setTip] = useState<typeof tipsByContext.closing[0] | null>(null);

  useEffect(() => {
    const pool = tipsByContext[context] || tipsByContext.closing;
    setTip(pool[Math.floor(Math.random() * pool.length)]);
  }, [context]);

  useEffect(() => {
    if (!enabled || !tip) return;
    trackAdEvent(AD_KEY, tip.sponsor, "impression");
  }, [enabled, tip]);

  if (!enabled || !tip) return null;

  return (
    <div className="my-6 print:hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914]">
        <svg className="w-4 h-4 text-[#8b6914] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
        <p className="text-xs text-alta-gray leading-relaxed">
          <strong className="text-[#8b6914]">Did you know?</strong>{" "}
          {tip.tip}{" "}
          <a
            href={tip.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAdEvent(AD_KEY, tip.sponsor, "click")}
            className="inline-flex items-center gap-1 text-[#8b6914] font-semibold hover:underline whitespace-nowrap"
          >
            Learn more
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </p>
      </div>
    </div>
  );
}
