"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const feeTiles = [
  {
    title: "Common Area Maintenance",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    summary: "Landscaping, pool, gym, clubhouse, playgrounds, and walking trails.",
    detail:
      "This is typically the largest portion of your HOA fee. It covers professional landscaping and lawn care for common grounds, pool maintenance (chemicals, cleaning, lifeguards), gym equipment upkeep and replacement, clubhouse utilities and staffing, playground inspections, and trail maintenance. In communities with extensive amenities, this can represent 40-60% of total HOA dues.",
  },
  {
    title: "Exterior Building Maintenance",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
    summary: "Roofing, siding, painting, and structural repairs (especially in condos and townhomes).",
    detail:
      "In condominiums and townhome communities, the HOA is typically responsible for maintaining the building exterior — including the roof, siding, gutters, exterior paint, balconies, stairwells, elevators, and hallways. This is a major cost driver and the reason condo HOA fees are generally higher than single-family HOA fees. A well-managed HOA will have a long-term maintenance schedule and a funded reserve to handle these expenses without special assessments.",
  },
  {
    title: "Insurance for Common Areas",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    summary: "Master insurance policy covering shared structures and liability in common areas.",
    detail:
      "The HOA carries a master insurance policy (sometimes called a \"walls-out\" policy) that covers shared structures, common areas, and general liability. This includes fire, storm, and casualty damage to common buildings and amenities, liability coverage if someone is injured in a common area, and sometimes coverage for the building exterior in condos. As a homeowner, you still need your own policy (HO-6 for condos) that covers the interior of your unit, personal property, and personal liability. Ask the HOA for a copy of the master policy so you know exactly what's covered.",
  },
  {
    title: "Reserve Fund Contributions",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    summary: "Savings set aside for major future repairs like roof replacement and repaving.",
    detail:
      "A portion of your monthly dues goes into a reserve fund — essentially a savings account for major capital expenditures. This covers big-ticket items like roof replacement, repaving parking lots and roads, pool resurfacing, elevator modernization, and HVAC system replacement. A healthy reserve fund is critical: the Community Associations Institute recommends reserves be at least 70% funded. Underfunded reserves are the number one cause of special assessments. When reviewing HOA documents, always ask for the most recent reserve study — this is a professional analysis of the expected life and replacement cost of major components.",
  },
  {
    title: "Utilities (Sometimes)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    summary: "Some HOAs include trash removal, water/sewer, cable, or internet in the monthly fee.",
    detail:
      "Depending on the community, your HOA fee may bundle certain utilities. Common inclusions are trash and recycling pickup, water and sewer, basic cable TV, internet access, and security/gate monitoring. This is more common in condominiums and master-planned communities. When comparing homes, factor in which utilities are included — a higher HOA fee that bundles $150/month in utilities may actually cost less overall than a lower fee where you pay utilities separately.",
  },
];

const redFlags = [
  {
    flag: "Low Reserve Fund (Below 25% Funded)",
    detail:
      "A reserve fund below 25% funded is a serious warning sign. It means the HOA has been deferring maintenance or undercharging dues — and a special assessment is likely in the near future. The Community Associations Institute recommends reserves be at least 70% funded. Ask for the most recent reserve study and look at the percent-funded figure. Below 25%: high risk. 25-50%: moderate risk. 50-70%: acceptable. Above 70%: well-managed.",
    severity: "high",
  },
  {
    flag: "History of Special Assessments",
    detail:
      "If the HOA has levied special assessments in the past 3-5 years, find out why. A one-time assessment for an unexpected event (hurricane damage, etc.) is different from repeated assessments for deferred maintenance. Repeated special assessments suggest chronic underfunding of reserves and poor financial management. Ask how many assessments have been levied in the past 10 years and for what purpose.",
    severity: "high",
  },
  {
    flag: "Pending Litigation",
    detail:
      "If the HOA is involved in a lawsuit — either as plaintiff or defendant — it can mean significant financial exposure. Legal fees can drain reserves, and adverse judgments may result in special assessments. Common HOA lawsuits include construction defect claims, contract disputes with vendors, and lawsuits from homeowners over enforcement or discrimination. Ask the HOA or your real estate agent about any pending or threatened litigation.",
    severity: "high",
  },
  {
    flag: "High Delinquency Rate",
    detail:
      "If more than 10-15% of homeowners are behind on their dues, the HOA may struggle to meet its financial obligations. High delinquency leads to deferred maintenance, underfunded reserves, and eventually special assessments or increased dues for everyone else. Some lenders won't approve mortgages in communities with delinquency rates above 15%. Ask for the current delinquency rate and collection policy.",
    severity: "medium",
  },
  {
    flag: "Overly Restrictive Rules",
    detail:
      "Every HOA has CC&Rs (covenants, conditions, and restrictions), but some go too far. Review the rules carefully before buying. Common restrictions cover exterior paint colors, landscaping choices, pet breed/size limits, parking (including in your own driveway), renting out your home, holiday decorations, and satellite dish placement. If you can't live with the rules, don't buy in that community — changing CC&Rs typically requires a supermajority vote of all homeowners.",
    severity: "medium",
  },
];

const questionsToAsk = [
  {
    question: "What are the current monthly dues?",
    why: "Know your exact monthly obligation. Compare with similar communities in the area to see if the fee is reasonable for the amenities provided.",
  },
  {
    question: "When was the last increase? How much was it?",
    why: "A history of moderate, regular increases (3-5% annually) is actually a good sign — it means the board is keeping up with costs. No increases in 5+ years may signal deferred maintenance or a coming jump.",
  },
  {
    question: "What is the reserve fund balance and percent funded?",
    why: "This is the single most important financial indicator. Ask for the most recent reserve study. A well-funded reserve (70%+) means the community plans ahead and special assessments are less likely.",
  },
  {
    question: "Are there any pending or planned special assessments?",
    why: "A special assessment can cost thousands of dollars, sometimes with little notice. The seller is required to disclose known assessments, but ask the HOA directly as well.",
  },
  {
    question: "What are the CC&Rs (covenants, conditions, and restrictions)?",
    why: "These are the rules you'll live by. Read them carefully. Common restrictions cover exterior modifications, pets, renting your home, parking, and noise. Make sure you can comply before you buy.",
  },
  {
    question: "Can I review the last 2 years of meeting minutes?",
    why: "Meeting minutes reveal what the board is discussing — upcoming projects, budget concerns, neighbor disputes, vendor issues, and litigation. They're a window into the community's health and culture.",
  },
  {
    question: "What is the delinquency rate?",
    why: "High delinquency (over 10-15%) means some owners aren't paying, which strains the budget and can lead to deferred maintenance or increased dues for everyone else.",
  },
  {
    question: "What insurance does the HOA carry?",
    why: "Understanding the master policy helps you determine what your individual policy (HO-6) needs to cover. Ask for a copy of the declarations page showing coverage limits and deductibles.",
  },
];

const memberRights = [
  {
    right: "Vote on Board Members and Major Decisions",
    detail:
      "As a homeowner, you have the right to vote in board elections and on major community decisions such as rule changes, budget approval, and special assessments. Most HOAs hold annual meetings where elections take place. Your vote matters — the board sets the budget, approves expenditures, and enforces rules.",
  },
  {
    right: "Access Financial Records",
    detail:
      "You have the right to review the HOA's financial records, including budgets, bank statements, reserve studies, and audit reports. Most state laws require HOAs to make these documents available upon request (sometimes with a reasonable copying fee). If the board refuses, that's a red flag.",
  },
  {
    right: "Attend Board Meetings",
    detail:
      "Homeowners generally have the right to attend (and sometimes speak at) board meetings. Many states require that board meetings be open to members, with limited exceptions for sensitive matters like litigation or personnel issues. Attending meetings keeps you informed about community decisions.",
  },
  {
    right: "Receive Proper Notice",
    detail:
      "The HOA must provide proper notice before raising dues, levying special assessments, changing rules, or taking action against you (fines, liens, etc.). Notice requirements vary by state but typically range from 10 to 30 days. If you receive a fine without proper notice, you may have grounds to challenge it.",
  },
  {
    right: "Due Process for Violations",
    detail:
      "If you're accused of a rule violation, you have the right to be notified of the specific violation, given an opportunity to be heard (usually at a hearing), and treated consistently with how similar violations are handled for other homeowners. The HOA cannot selectively enforce rules against you.",
  },
  {
    right: "Run for the Board",
    detail:
      "Any homeowner in good standing can typically run for a seat on the HOA board of directors. Serving on the board gives you direct influence over budgets, rules, and community direction. If you're unhappy with how things are run, running for the board is the most effective way to make change.",
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function ExpandableTile({
  title,
  icon,
  summary,
  detail,
}: {
  title: string;
  icon: React.ReactNode;
  summary: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm tile-interactive cursor-pointer transition-all hover:shadow-md"
      onClick={() => setOpen(!open)}
    >
      <div className="p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-alta-navy text-sm">{title}</h3>
            <svg
              className={`w-4 h-4 text-alta-teal shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-sm text-alta-gray leading-relaxed mt-1">{summary}</p>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4 pt-0 ml-[52px] border-t border-[#e2eaf0] mt-0 pt-3">
          <p className="text-xs text-gray-600 leading-relaxed">{detail}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HOAGuidePage() {
  const [expandedFlag, setExpandedFlag] = useState<number | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [expandedRight, setExpandedRight] = useState<number | null>(null);

  return (
    <>
      <PageHero
        title="HOA Guide: What Every Buyer Needs to Know"
        subtitle="44% of U.S. homes now belong to a homeowners association. Before you buy, understand the fees, rules, and red flags that could affect your budget and lifestyle."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "HOA Guide", href: "/hoa-guide" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ---- What is an HOA ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-3">What is a Homeowners Association?</h2>
            <div className="p-4 bg-[#e8f0f5] rounded-2xl border border-[#c5d8e4] border-l-4 border-l-alta-teal">
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                A <strong className="text-alta-navy">homeowners association (HOA)</strong> is an organization in a
                subdivision, planned community, or condominium that makes and enforces rules for the properties and
                residents within its jurisdiction. When you purchase a home in an HOA community, you automatically become
                a member and are obligated to pay dues (also called assessments).
              </p>
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                HOAs are governed by a <strong className="text-alta-navy">board of directors</strong> — typically
                volunteer homeowners elected by the membership. The board sets the budget, hires vendors, enforces
                community rules (CC&amp;Rs), and manages reserves. Many larger HOAs also hire a professional management
                company to handle day-to-day operations.
              </p>
              <p className="text-sm text-alta-gray leading-relaxed">
                The governing documents — including the{" "}
                <strong className="text-alta-navy">Declaration of Covenants, Conditions &amp; Restrictions (CC&amp;Rs)</strong>,
                bylaws, and rules — are legally binding. They dictate everything from architectural standards to pet
                policies. Violating them can result in fines, liens, and even foreclosure in extreme cases.
              </p>
            </div>
          </section>

          {/* ---- Key Statistics ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-4">HOA by the Numbers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#1a5276] to-[#154463] p-5 text-center text-white shadow-md">
                <p className="text-3xl font-extrabold mb-1">44%</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  of U.S. homes are in an HOA community (up from 34% in 2019)
                </p>
                <p className="text-[10px] text-white/50 mt-2">Source: Foundation for Community Association Research, 2025</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#2d6b3f] to-[#235532] p-5 text-center text-white shadow-md">
                <p className="text-3xl font-extrabold mb-1">$135<span className="text-lg">/mo</span></p>
                <p className="text-xs text-white/80 leading-relaxed">Median monthly HOA fee nationwide</p>
                <p className="text-[10px] text-white/50 mt-2">Source: U.S. Census Bureau, American Housing Survey</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#5b3a8c] to-[#472d6e] p-5 text-center text-white shadow-md">
                <p className="text-3xl font-extrabold mb-1">$50 - $1,000+</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  Monthly fee range depending on amenities, location, and property type
                </p>
                <p className="text-[10px] text-white/50 mt-2">Source: Bankrate, 2025</p>
              </div>
            </div>
          </section>

          {/* ---- What Fees Cover ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">What HOA Fees Typically Cover</h2>
            <p className="text-sm text-alta-gray mb-4">
              Click any tile to see a detailed breakdown of what your monthly dues go toward.
            </p>
            <div className="space-y-3">
              {feeTiles.map((tile) => (
                <ExpandableTile
                  key={tile.title}
                  title={tile.title}
                  icon={tile.icon}
                  summary={tile.summary}
                  detail={tile.detail}
                />
              ))}
            </div>
          </section>

          <InlineAd />

          {/* ---- Red Flags ---- */}
          <section className="mb-8 mt-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">Red Flags to Look for BEFORE Buying</h2>
            <p className="text-sm text-alta-gray mb-4">
              These warning signs can signal financial trouble, mismanagement, or a community that may not suit your
              lifestyle. Investigate before you commit.
            </p>
            <div className="space-y-3">
              {redFlags.map((item, i) => (
                <div
                  key={item.flag}
                  className={`rounded-2xl border overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    item.severity === "high"
                      ? "border-red-200 bg-red-50/50"
                      : "border-amber-200 bg-amber-50/50"
                  }`}
                  onClick={() => setExpandedFlag(expandedFlag === i ? null : i)}
                >
                  <div className="p-4 flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        item.severity === "high" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-alta-navy text-sm">{item.flag}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              item.severity === "high"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.severity === "high" ? "HIGH RISK" : "MODERATE RISK"}
                          </span>
                          <svg
                            className={`w-4 h-4 text-alta-gray transition-transform duration-300 ${
                              expandedFlag === i ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFlag === i ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4 ml-11 border-t border-gray-200 pt-3">
                      <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---- Special Assessments ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-3">Special Assessments Explained</h2>
            <div className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#943030] to-[#7a2020] px-5 py-3">
                <h3 className="text-white font-bold text-sm">What is a special assessment?</h3>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-alta-gray leading-relaxed">
                  A <strong className="text-alta-navy">special assessment</strong> is a one-time charge levied by the
                  HOA board when the reserve fund doesn't have enough money to cover a major expense — such as a roof
                  replacement, repaving, structural repairs, or a legal settlement. Special assessments can range from a
                  few hundred dollars to <strong className="text-alta-navy">tens of thousands of dollars</strong> per
                  unit.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <h4 className="font-bold text-sm text-[#8b6914] mb-1">How They Happen</h4>
                    <ul className="text-xs text-gray-600 leading-relaxed space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">&#8226;</span>
                        The board identifies a major expense that exceeds available reserves
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">&#8226;</span>
                        Depending on governing documents, the board may vote to levy the assessment directly, or it may
                        require a homeowner vote
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">&#8226;</span>
                        Homeowners are notified and given a due date (sometimes with payment plan options)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">&#8226;</span>
                        Failure to pay can result in late fees, liens on your property, and even foreclosure
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-sm text-[#1a5276] mb-1">Your Rights</h4>
                    <ul className="text-xs text-gray-600 leading-relaxed space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">&#8226;</span>
                        You must receive proper written notice before any assessment is levied
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">&#8226;</span>
                        Many states require the board to hold a meeting where homeowners can voice concerns
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">&#8226;</span>
                        Some governing documents require a homeowner vote for assessments above a certain threshold
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">&#8226;</span>
                        You have the right to review the financial justification and supporting documentation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">&#8226;</span>
                        If you believe the assessment is improper, consult a real estate attorney in your state
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-[10px] text-alta-teal font-medium">
                  Source: Community Associations Institute; state HOA statutes vary
                </p>
              </div>
            </div>
          </section>

          {/* ---- Questions to Ask ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">Questions to Ask Before Buying in an HOA</h2>
            <p className="text-sm text-alta-gray mb-4">
              Request these answers in writing from the HOA or management company before you finalize your purchase.
            </p>
            <div className="space-y-2">
              {questionsToAsk.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden cursor-pointer transition-all hover:shadow-sm"
                  onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)}
                >
                  <div className="p-3 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-alta-navy/10 flex items-center justify-center text-alta-navy shrink-0 text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-alta-navy text-sm">{item.question}</h3>
                        <svg
                          className={`w-4 h-4 text-alta-gray shrink-0 transition-transform duration-300 ${
                            expandedQuestion === i ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedQuestion === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-3 pb-3 ml-10 border-t border-[#e2eaf0] pt-2">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-semibold text-alta-teal">Why this matters:</span> {item.why}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <InlineAd />

          {/* ---- Your Rights ---- */}
          <section className="mb-8 mt-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">Your Rights as an HOA Member</h2>
            <p className="text-sm text-alta-gray mb-4">
              As a dues-paying homeowner, you have legal rights. These vary by state, but the following are broadly
              recognized across the U.S.
            </p>
            <div className="space-y-2">
              {memberRights.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden cursor-pointer transition-all hover:shadow-sm"
                  onClick={() => setExpandedRight(expandedRight === i ? null : i)}
                >
                  <div className="p-3 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#2d6b3f]/10 flex items-center justify-center text-[#2d6b3f] shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-alta-navy text-sm">{item.right}</h3>
                        <svg
                          className={`w-4 h-4 text-alta-gray shrink-0 transition-transform duration-300 ${
                            expandedRight === i ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedRight === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-3 pb-3 ml-10 border-t border-[#e2eaf0] pt-2">
                      <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---- CTA & Related ---- */}
          <FirstTimeBuyerCTA />

          <section className="mt-8 mb-8">
            <h2 className="text-lg font-bold text-alta-navy mb-3">Related Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  label: "Understanding Escrow",
                  href: "/escrow-guide",
                  desc: "How escrow protects your money before and after closing.",
                },
                {
                  label: "Homeowner's Insurance",
                  href: "/homeowners-insurance",
                  desc: "What your policy covers — and what requires HOA insurance.",
                },
                {
                  label: "Closing Costs Explained",
                  href: "/closing-process/closing-costs",
                  desc: "Full breakdown of what you'll pay at closing, including HOA transfer fees.",
                },
                {
                  label: "Home Inspection Guide",
                  href: "/home-inspection",
                  desc: "What inspectors look for and how it relates to HOA responsibilities.",
                },
                {
                  label: "Questions to Ask",
                  href: "/questions-to-ask",
                  desc: "More questions every buyer should ask before signing.",
                },
                {
                  label: "Protect Your Rights",
                  href: "/protect-your-rights",
                  desc: "Know your legal protections as a homebuyer.",
                },
              ].map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group p-3 rounded-xl border border-[#c5d8e4] bg-[#fafcfe] hover:border-alta-teal/40 hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">
                    {topic.label}
                  </h3>
                  <p className="text-[11px] text-alta-gray leading-relaxed mt-1">{topic.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
