"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AnimatedCounter from "./AnimatedCounter";

interface StatItem {
  end: number;
  prefix: string;
  suffix: string;
  label: string;
  detail: string;
  deepDive: string;
  source: string;
  sourceUrl?: string;
  decimals: number;
  image: string;
  color: string;
}

const stats: StatItem[] = [
  { end: 4.2, prefix: "", suffix: "M", label: "Homes sold in the U.S. in 2025", detail: "Despite higher mortgage rates, millions of Americans still achieved homeownership — and each one went through the closing process.", deepDive: "The National Association of Realtors reported 4.2 million existing-home sales in 2025. While down from the pandemic peak of 6.1 million in 2021, this represents a stabilizing market. Each of these transactions involved title searches, closing disclosures, wire transfers, and dozens of signed documents. First-time buyers accounted for approximately 24% of all purchases — the lowest share since NAR began tracking in 1981, driven by affordability challenges. Understanding the closing process has never been more important, as higher home prices mean higher stakes at the closing table.", source: "NAR", sourceUrl: "https://www.nar.realtor/research-and-statistics", decimals: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", color: "from-[#1a5276] to-[#154463]" },
  { end: 400, prefix: "$", suffix: "K", label: "Median home sale price nationwide", detail: "At this price, closing costs of 2-5% mean $8,000-$20,000 in fees on top of your down payment.", deepDive: "The median existing-home sale price reached $400,000 in 2025 — meaning half of all homes sold for more and half for less. At this price point, a buyer putting 10% down needs $40,000 for the down payment PLUS $8,000-$20,000 in closing costs (2-5%). That's $48,000-$60,000 in cash needed at closing. Many first-time buyers are surprised by the closing cost component, which includes lender fees, title insurance, appraisal, recording fees, prepaid taxes and insurance, and escrow deposits. Use our closing cost calculator to estimate your specific costs.", source: "NAR 2025", sourceUrl: "https://www.nar.realtor/research-and-statistics/housing-statistics", decimals: 0, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", color: "from-[#2d6b3f] to-[#235532]" },
  { end: 37, prefix: "", suffix: " days", label: "Average time from accepted offer to closing", detail: "The typical home purchase takes about 5 weeks. FHA and VA loans may take slightly longer.", deepDive: "The average time from accepted offer to closing is approximately 37 days for conventional loans, though this varies by loan type: FHA loans average 40-45 days, VA loans average 40-50 days, and cash transactions can close in as little as 14 days. During this period, your lender completes underwriting (verifying your finances), orders an appraisal, and the title company conducts a title search. Delays commonly occur due to: appraisal issues (low values, scheduling), underwriting conditions (additional documentation requests), title defects requiring curative work, and inspection negotiation. The TRID rule requires a minimum 3-business-day review period for the Closing Disclosure.", source: "CFPB", sourceUrl: "https://www.consumerfinance.gov/owning-a-home/", decimals: 0, image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80", color: "from-[#0a7ea8] to-[#077a9e]" },
  { end: 3.5, prefix: "", suffix: "%", label: "Average closing costs as % of purchase price", detail: "On a $400K home, that's ~$14,000 in fees — lender charges, title insurance, taxes, and prepaids.", deepDive: "Closing costs typically range from 2-5% of the purchase price. On a $400,000 home at the average of 3.5%, that's $14,000. These costs include: lender origination fees (0.5-1% of loan), appraisal ($400-$600), credit report ($30-$50), title search and insurance ($1,000-$3,000), recording fees ($50-$250), transfer taxes (varies by state), prepaid homeowner's insurance (1 year upfront), prepaid property tax (2-6 months), prepaid daily interest (closing to month-end), and initial escrow deposits. You can negotiate some of these — origination fees are negotiable, and you have the right to shop for title insurance under RESPA.", source: "CFPB", sourceUrl: "https://www.consumerfinance.gov/owning-a-home/closing/", decimals: 1, image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80", color: "from-[#8b6914] to-[#705410]" },
  { end: 8, prefix: "", suffix: "%", label: "Median down payment for first-time buyers", detail: "Far less than the 20% many assume. FHA allows 3.5%, VA and USDA allow 0% down.", deepDive: "The median down payment for first-time homebuyers in 2025 was just 8% — far below the 20% many believe is required. Here's the reality by loan type: Conventional loans require as little as 3% down (though 20% eliminates PMI), FHA loans require 3.5% with a 580+ credit score, VA loans require 0% down for eligible military and veterans, and USDA loans require 0% for eligible rural areas. Down payment assistance programs exist in every state — many first-time buyers qualify but never apply because they don't know the programs exist. Check with your state's Housing Finance Agency.", source: "NAR 2025", sourceUrl: "https://www.nar.realtor/research-and-statistics/research-reports/highlights-from-the-profile-of-home-buyers-and-sellers", decimals: 0, image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80", color: "from-[#5b3a8c] to-[#482d70]" },
  { end: 275, prefix: "$", suffix: "M", label: "Lost to real estate wire fraud in 2025", detail: "Criminals intercept closing funds using spoofed emails and deepfakes. Always verify by phone.", deepDive: "The FBI's Internet Crime Complaint Center (IC3) reported $275.1 million in real estate wire fraud losses in 2025 — a 59% increase from the prior year. The average individual loss is approximately $150,000, often the buyer's entire down payment and closing costs. How it works: criminals hack into email accounts of real estate agents, lenders, or title companies, monitor transactions for weeks, then send fake 'updated' wiring instructions near closing. Recovery rates: ~20% if reported within 1 hour, ~10% within 24 hours, and less than 5% after 48 hours. The single most effective prevention: ALWAYS verify wiring instructions by calling your title company using a phone number you already have — never use a number from an email.", source: "FBI IC3", sourceUrl: "https://www.ic3.gov/", decimals: 0, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80", color: "from-[#943030] to-[#7a2020]" },
  { end: 1, prefix: "", suffix: " in 3", label: "Title searches find issues that get resolved", detail: "Liens, errors, missing heirs, forged documents — title professionals catch problems before you close.", deepDive: "According to ALTA, title searches reveal issues requiring resolution in approximately one out of every three residential real estate transactions. Common issues include: unpaid mortgages or liens from previous owners, delinquent property taxes or special assessments, errors in public records (misspelled names, incorrect legal descriptions), missing signatures on prior deeds, undisclosed heirs with potential ownership claims, unreleased judgments or mechanic's liens, and boundary disputes. Title professionals perform 'curative work' to resolve these issues before closing. Owner's title insurance then protects you against problems the search couldn't find — forged documents, unknown heirs, and recording errors that may surface years later.", source: "ALTA", sourceUrl: "https://www.alta.org/", decimals: 0, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80", color: "from-[#1a2744] to-[#0f1b33]" },
  { end: 6000, prefix: "", suffix: "+", label: "ALTA member companies protecting buyers", detail: "Title companies, settlement agents, and abstractors following ALTA Best Practices.", deepDive: "The American Land Title Association represents more than 6,000 member companies — title insurance companies, title agents, settlement companies, and abstractors operating in all 50 states. ALTA members follow the ALTA Best Practices framework, a set of seven pillars covering licensing, escrow trust accounting, privacy and data security, settlement procedures, title policy production, professional liability insurance, and consumer complaints. When choosing a title company, look for ALTA membership as a sign of commitment to industry standards and consumer protection. You have the legal right under RESPA to choose your own title company — don't feel pressured to use whoever your lender or agent suggests.", source: "ALTA", sourceUrl: "https://www.alta.org/best-practices/", decimals: 0, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", color: "from-[#0a7ea8] to-[#077a9e]" },
  { end: 45, prefix: "", suffix: " states", label: "Now allow Remote Online Notarization", detail: "Thanks to ALTA and MBA advocacy, most homebuyers can now close entirely online.", deepDive: "As of 2026, 45 states and the District of Columbia have enacted permanent Remote Online Notarization (RON) legislation — up from just one state (Virginia) in 2011. This rapid expansion was driven by the joint advocacy of the American Land Title Association (ALTA) and the Mortgage Bankers Association (MBA), who partnered in 2017 to develop model legislation. RON allows you to complete your entire closing via secure audio-video session: identity verification through knowledge-based authentication, electronic document signing witnessed by a commissioned notary, and a tamper-evident recording of the entire session. At the federal level, the bipartisan SECURE Notarization Act aims to establish national standards and enable RON in the remaining states.", source: "ALTA/MBA", sourceUrl: "https://www.alta.org/advocacy/ron", decimals: 0, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", color: "from-[#2d6b3f] to-[#1e5530]" },
  { end: 59, prefix: "", suffix: "%", label: "Year-over-year increase in wire fraud", detail: "AI-generated deepfakes and business email compromise are the primary attack vectors.", deepDive: "Wire fraud targeting real estate transactions surged 59% year-over-year, driven by advances in AI that make fraudulent communications nearly indistinguishable from legitimate ones. Key trends: criminals now use AI-generated deepfake voice calls impersonating your agent or title company, business email compromise (BEC) attacks that hijack real email threads, and look-alike domain spoofing (e.g., @titIe-company.com with a capital I instead of lowercase L). The 5 safeguards: (1) Always call to verify wiring instructions using a number you already have, (2) Be suspicious of any 'updated' wire instructions via email, (3) Use Forward instead of Reply to prevent thread hijacking, (4) Ask your bank to verify the account name matches the title company, (5) Call to confirm receipt immediately after wiring.", source: "FBI IC3", sourceUrl: "https://www.ic3.gov/", decimals: 0, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80", color: "from-[#943030] to-[#7a2020]" },
  { end: 50, prefix: "", suffix: "-100+", label: "Pages of documents signed at closing", detail: "Your closing agent walks you through each one — promissory note, deed, CD, and more.", deepDive: "At the closing table, you'll sign between 50 and 100+ pages of documents. The key documents include: the Closing Disclosure (final terms and costs — you should have reviewed this 3+ days before), the Promissory Note (your personal promise to repay the loan — specifies amount, rate, term, and consequences of default), the Deed of Trust or Mortgage (gives the lender a security interest in your property), the Deed (transfers ownership from seller to you), title insurance commitments, various affidavits (occupancy, identity, compliance), the escrow agreement, and initial escrow disclosure. Don't feel rushed — your closing agent is there to explain each document. If you don't understand something, ask before signing.", source: "ALTA", decimals: 0, image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80", color: "from-[#5b3a8c] to-[#482d70]" },
  { end: 3, prefix: "", suffix: " days", label: "Minimum Closing Disclosure review period", detail: "Federal law (TRID) requires your lender to provide the CD at least 3 business days before closing.", deepDive: "The TRID rule (TILA-RESPA Integrated Disclosure) requires your lender to provide the Closing Disclosure at least 3 business days before your scheduled closing. This mandatory cooling-off period gives you time to review every fee, compare it to your original Loan Estimate, and ask questions before you're at the signing table. Certain changes reset the 3-day clock: if the APR increases by more than 0.125%, if the loan product changes (e.g., fixed to adjustable), or if a prepayment penalty is added. When you receive your CD, compare it line-by-line to your Loan Estimate. Fees fall into three tolerance buckets: zero tolerance (can't increase at all), 10% tolerance (aggregate can increase up to 10%), and unlimited tolerance (can change freely).", source: "CFPB", sourceUrl: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/", decimals: 0, image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80", color: "from-[#8b6914] to-[#705410]" },
];

const VISIBLE = 3;
const INTERVAL = 30000;
const SETS = Math.ceil(stats.length / VISIBLE);

export default function MarketStats() {
  const [activeSet, setActiveSet] = useState(0);
  const [fading, setFading] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setActiveSet((prev) => (prev + 1) % SETS);
      setFading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (hovering || selectedStat) return;
    timerRef.current = setInterval(advance, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hovering, selectedStat, advance]);

  const currentStats = stats.slice(activeSet * VISIBLE, activeSet * VISIBLE + VISIBLE);

  return (
    <div>
      <div
        className={`grid md:grid-cols-3 gap-4 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {currentStats.map((d, i) => (
          <button
            key={`${activeSet}-${i}`}
            onClick={() => setSelectedStat(d)}
            className="relative rounded-2xl overflow-hidden shadow-lg group text-left cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="aspect-[4/3] relative">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${d.image}')` }} />
              <div className={`absolute inset-0 bg-gradient-to-t ${d.color} opacity-85`} />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div>
                  <p className="text-4xl font-bold text-white">
                    {d.end === 50 ? (
                      <span>50-100+</span>
                    ) : d.end === 1 && d.suffix === " in 3" ? (
                      <span>1 in 3</span>
                    ) : (
                      <AnimatedCounter end={d.end} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
                    )}
                  </p>
                  <p className="text-sm text-white/90 leading-snug font-medium mt-1">{d.label}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-3">{d.detail}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[9px] text-white/40 font-medium uppercase tracking-wider">{d.source}</p>
                    <span className="text-[9px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">Click for more</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: SETS }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(true); setTimeout(() => { setActiveSet(i); setFading(false); }, 300); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeSet ? "w-8 bg-alta-teal" : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Detail modal */}
      {selectedStat && (
        <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setSelectedStat(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header with image */}
            <div className="relative h-36 overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${selectedStat.image}')` }} />
              <div className={`absolute inset-0 bg-gradient-to-t ${selectedStat.color} opacity-80`} />
              <button onClick={() => setSelectedStat(null)} className="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white bg-black/20 rounded-full z-10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="absolute bottom-4 left-5">
                <p className="text-4xl font-bold text-white">
                  {selectedStat.end === 50 ? "50-100+" : selectedStat.end === 1 && selectedStat.suffix === " in 3" ? "1 in 3" : `${selectedStat.prefix}${selectedStat.decimals > 0 ? selectedStat.end.toFixed(selectedStat.decimals) : selectedStat.end.toLocaleString()}${selectedStat.suffix}`}
                </p>
                <p className="text-sm text-white/90 font-medium">{selectedStat.label}</p>
              </div>
            </div>
            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-alta-gray leading-relaxed mb-4">{selectedStat.deepDive}</p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-alta-teal font-medium uppercase tracking-wider">Source: {selectedStat.source}</p>
                {selectedStat.sourceUrl && (
                  <a href={selectedStat.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-alta-teal hover:underline flex items-center gap-1">
                    View source
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
