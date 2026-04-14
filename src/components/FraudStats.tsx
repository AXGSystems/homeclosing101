"use client";

import { useState } from "react";

const stats = [
  {
    value: "$275.1M",
    label: "Real estate wire fraud losses in 2025",
    source: "FBI IC3",
    color: "from-red-500 to-red-600",
    hoverBg: "hover:bg-red-50",
    hoverBorder: "hover:border-red-300",
    detail: "The FBI's Internet Crime Complaint Center reported $275.1 million in real estate wire fraud losses in 2025 — a 59% increase from $173 million in 2024. This figure only represents reported losses; actual losses are believed to be significantly higher as many victims don't file complaints. Real estate and rental fraud generated 9,359 complaints in 2024 alone.",
    context: "To put this in perspective, $275M is enough to buy approximately 687 median-priced U.S. homes ($400K each). The average individual loss in a real estate wire fraud case is approximately $150,000 — often a buyer's entire down payment and closing costs.",
    trend: "Up 59% year-over-year",
  },
  {
    value: "1,760%",
    label: "Increase in BEC attacks since AI tools became available",
    source: "CertifID 2026",
    color: "from-amber-500 to-amber-600",
    hoverBg: "hover:bg-amber-50",
    hoverBorder: "hover:border-amber-300",
    detail: "Business Email Compromise (BEC) is the primary vehicle for real estate wire fraud. Criminals gain access to legitimate email accounts of agents, lenders, or title companies — or create convincing lookalike addresses. Since generative AI tools became widely available, BEC attacks have increased 1,760% because AI can generate more convincing, personalized phishing emails at scale.",
    context: "BEC accounted for $2.77 billion in total losses across all industries in 2024, making it the most financially damaging category of cybercrime reported to the FBI. Real estate transactions are prime targets because of the large dollar amounts, time pressure, and multiple parties involved.",
    trend: "Accelerating due to AI",
  },
  {
    value: "~20%",
    label: "Recovery rate if reported within 1 hour",
    source: "FBI",
    color: "from-green-500 to-green-600",
    hoverBg: "hover:bg-green-50",
    hoverBorder: "hover:border-green-300",
    detail: "If you report wire fraud to your bank within the first hour, approximately 20% of funds can be recovered. This drops to ~10% within 24 hours and below 5% after 48 hours. Recovery becomes nearly impossible after 72 hours as criminals rapidly move funds through multiple accounts, often internationally.",
    context: "The FBI's Recovery Asset Team (RAT) has successfully frozen funds in many cases when notified quickly. In 2024, RAT initiated the Financial Fraud Kill Chain on 3,008 incidents involving over $745 million, successfully freezing $538 million (72% success rate when contacted promptly).",
    trend: "Speed is everything",
  },
  {
    value: "<5%",
    label: "Recovery rate after 48 hours",
    source: "FBI",
    color: "from-red-700 to-red-800",
    hoverBg: "hover:bg-red-50",
    hoverBorder: "hover:border-red-300",
    detail: "After 48 hours, the likelihood of recovering wired funds drops below 5%. Criminals use 'money mules' and multiple bank accounts to rapidly layer and move stolen funds — often converting to cryptocurrency or wiring internationally within hours. This is why EVERY closing participant must understand: never wire money based on emailed instructions without phone verification.",
    context: "The average time from wire initiation to the criminal's first withdrawal or transfer is approximately 30 minutes. Domestic transfers can be recalled more easily than international ones. If you suspect fraud, contact your bank's wire transfer department (not the general line) and explicitly request a wire recall.",
    trend: "Nearly impossible to recover",
  },
  {
    value: "22%",
    label: "Of homebuyers receive fraudulent communications",
    source: "CertifID 2026",
    color: "from-purple-500 to-purple-600",
    hoverBg: "hover:bg-purple-50",
    hoverBorder: "hover:border-purple-300",
    detail: "According to CertifID's 2026 State of Wire Fraud Report, 22% of homebuyers reported receiving fraudulent communications — a suspicious email, text, or phone call — during their real estate transaction. Additionally, 85% of consumers said they would pay extra for fraud protection.",
    context: "56% of consumers said they would not work with a title company or real estate firm again after a wire fraud incident — even if all funds were fully recovered. This means fraud doesn't just cost money; it permanently damages trust in the professionals involved.",
    trend: "Growing awareness among buyers",
  },
  {
    value: "40%",
    label: "Year-over-year increase in deepfake scams",
    source: "Entrust 2026",
    color: "from-indigo-500 to-indigo-600",
    hoverBg: "hover:bg-indigo-50",
    hoverBorder: "hover:border-indigo-300",
    detail: "The 2026 Entrust Identity Fraud Report found that deepfake scams increased 40% year-over-year. In real estate, criminals use AI to create realistic fake audio and video to impersonate agents, title officers, or sellers. They may send AI-generated voice messages with 'updated' wire instructions or conduct fake video calls impersonating your closing agent.",
    context: "AI-related fraud complaints totaled an estimated 22,364, leading to over $893.3 million in losses across industries. The technology to create convincing deepfakes is now available to anyone for free, making this threat escalate rapidly. Always verify identity through a separate, trusted channel — if someone calls with changes, hang up and call them back at a number you already have.",
    trend: "Rapidly escalating",
  },
];

export default function FraudStats() {
  const [selectedStat, setSelectedStat] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {stats.map((s, i) => (
          <button
            key={s.value}
            onClick={() => setSelectedStat(i)}
            className={`group relative p-4 rounded-xl border border-gray-100 shadow-sm text-center cursor-pointer transition-all tile-interactive ${s.hoverBg} ${s.hoverBorder}`}
          >
            {/* Colored top bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r ${s.color}`} />
            <p className="text-xl font-bold text-alta-red mt-1">{s.value}</p>
            <p className="text-[10px] text-alta-gray mt-1 leading-snug">{s.label}</p>
            <p className="text-[9px] text-alta-teal mt-1.5 font-semibold uppercase tracking-wider">{s.source}</p>
            <p className="text-[8px] text-alta-gray mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click for details</p>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selectedStat !== null && (
        <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setSelectedStat(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${stats[selectedStat].color} px-6 py-5 text-white`}>
              <button onClick={() => setSelectedStat(null)} className="absolute top-3 right-3 p-1 text-white/60 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <p className="text-4xl font-bold">{stats[selectedStat].value}</p>
              <p className="text-sm text-white/80 mt-1">{stats[selectedStat].label}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{stats[selectedStat].source}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{stats[selectedStat].trend}</span>
              </div>
            </div>
            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-alta-navy mb-2">What This Means</h3>
                <p className="text-sm text-alta-gray leading-relaxed">{stats[selectedStat].detail}</p>
              </div>
              <div className="p-4 bg-alta-light rounded-xl">
                <h3 className="text-sm font-bold text-alta-navy mb-2">Context</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{stats[selectedStat].context}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
