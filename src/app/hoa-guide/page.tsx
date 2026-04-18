"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import PrintButton from "@/components/PrintButton";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";

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
  {
    flag: "Rapid Fee Increases (Over 10% Annually)",
    detail:
      "While moderate increases of 3-5% annually are normal and healthy, increases exceeding 10% per year signal that the HOA was previously undercharging and is now playing catch-up — or that costs are spiraling. Request the fee history for the past 5-10 years. Large, sudden jumps often precede special assessments or indicate that insurance premiums or vendor costs are out of control.",
    severity: "medium",
  },
  {
    flag: "Board Dominated by Developer",
    detail:
      "In new communities, the developer typically controls the HOA board until a certain percentage of units are sold (often 75%). During this period, the developer may keep dues artificially low to attract buyers, defer maintenance, and understate future costs. Once homeowners take over, they inherit deferred maintenance and an underfunded reserve. Ask when the developer plans to transition control and whether an independent reserve study has been conducted.",
    severity: "high",
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
  {
    question: "Are there any rental restrictions?",
    why: "Some HOAs limit the percentage of units that can be rented, require minimum lease terms (e.g., no short-term rentals), or ban rentals entirely. This matters whether you plan to rent the property or want to ensure neighborhood stability.",
  },
  {
    question: "What is the process for exterior modifications?",
    why: "If you plan to add a fence, patio, solar panels, or paint your front door, you need to know the architectural review process. Some HOAs take weeks or months to approve changes, and unapproved modifications can result in forced removal at your expense.",
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
  {
    right: "Challenge Fines and Assessments",
    detail:
      "You have the right to dispute fines and assessments through the HOA's internal grievance process. Most governing documents outline a hearing procedure where you can present your case. If internal remedies fail, many states provide mediation or arbitration programs specifically for HOA disputes.",
  },
];

const prosData = [
  {
    title: "Maintained Common Areas & Amenities",
    detail: "Pools, gyms, parks, trails, and clubhouses are professionally maintained. You share the cost with all homeowners, making amenities accessible that would be prohibitively expensive to maintain individually. A community pool that costs $30,000-$50,000/year to operate might cost each homeowner only $15-25/month.",
  },
  {
    title: "Property Value Protection",
    detail: "Architectural standards prevent eyesores — abandoned cars, unkempt yards, clashing exterior colors — that can drag down neighborhood property values. Studies by the Community Associations Institute suggest homes in HOA communities sell for 4-6% more on average than comparable non-HOA homes, though this varies significantly by market.",
  },
  {
    title: "Dispute Resolution Structure",
    detail: "When conflicts arise between neighbors — noise complaints, property line issues, parking disputes — the HOA provides a formal process for resolution. Without an HOA, your options are limited to awkward conversations, mediation, or costly lawsuits.",
  },
  {
    title: "Shared Maintenance Costs (Condos/Townhomes)",
    detail: "In condos and townhomes, the HOA handles major exterior maintenance: roof replacement, siding repairs, painting, parking lot repaving, and elevator maintenance. These costs are spread across all owners, preventing any single owner from facing a $15,000-$30,000 roof bill alone.",
  },
  {
    title: "Community Events & Social Connections",
    detail: "Many HOAs organize holiday parties, block parties, garage sales, and community events that foster neighborly connections. For new residents and families, this can be a meaningful quality-of-life benefit.",
  },
  {
    title: "Bundled Services",
    detail: "Snow removal, trash collection, landscaping, and sometimes utilities like water, sewer, cable, or internet are included in your monthly fee. Bundled services often cost less than contracting individually, and you don't have to manage multiple vendors.",
  },
];

const consData = [
  {
    title: "Monthly Fees That Increase Over Time",
    detail: "HOA fees typically increase 3-5% annually, and sometimes more. A $300/month fee today could become $445/month in 10 years at a 4% annual increase. Unlike a fixed-rate mortgage, this housing cost is never locked in. Some HOAs have raised fees by 20-50% in a single year when insurance premiums spiked or deferred maintenance caught up.",
  },
  {
    title: "Special Assessments ($5,000 - $60,000+ Per Unit)",
    detail: "When reserves fail, the board levies special assessments — one-time charges that can range from a few thousand to $60,000 or more per unit. In 2024, Champlain Towers-style building safety laws triggered assessments exceeding $100,000 per unit in some Florida condos. Special assessments can be due immediately or spread over months, but they are mandatory and non-negotiable.",
  },
  {
    title: "Restrictive Rules on Your Own Property",
    detail: "HOAs can dictate paint colors, landscaping choices, fence styles, parking (including in your own driveway), pet breeds and sizes, holiday decoration timelines, satellite dish placement, and whether you can rent out your home. Some HOAs prohibit political signs, limit the number of vehicles, or ban working on cars in your garage with the door open.",
  },
  {
    title: "Enforcement Inconsistencies",
    detail: "Selective enforcement — where some homeowners are cited while others are ignored for the same violation — is one of the most common HOA complaints. Board members or their friends may receive favorable treatment while other homeowners face fines. Inconsistent enforcement can be grounds for legal challenge but is costly and time-consuming to fight.",
  },
  {
    title: "Loss of Autonomy Over Your Property",
    detail: "When you buy into an HOA, you are agreeing to abide by rules set by others — often rules established before you moved in. Changing CC&Rs typically requires a supermajority vote (67-75% of all homeowners), making it extremely difficult to modify rules you disagree with. You own the property but cede significant control over how you use it.",
  },
  {
    title: "Volunteer Boards Making Major Financial Decisions",
    detail: "HOA boards are staffed by volunteer homeowners who may lack experience in financial management, construction oversight, contract negotiation, or legal compliance. A board that signs a bad vendor contract, fails to maintain reserves, or ignores building maintenance can cost every owner tens of thousands of dollars. Professional management helps but adds another $150-300/unit/year to costs.",
  },
  {
    title: "HOA Liens and Potential Foreclosure",
    detail: "If you fall behind on HOA dues, the association can place a lien on your property. In many states, HOAs have \"super-lien\" status, meaning their lien takes priority over even the mortgage. In extreme cases, HOAs can and do foreclose on homes for unpaid dues — sometimes for amounts as low as a few thousand dollars. ATTOM Data Solutions reported 284,933 HOA lien filings in 2025.",
  },
];

const costComparison = [
  {
    type: "Single-Family HOA",
    range: "$50 - $200/mo",
    includes: "Basic amenities (pool, park, trails), common area landscaping, entry gate maintenance. Homeowner is responsible for their own exterior, roof, and yard.",
    color: "from-[#2d6b3f] to-[#235532]",
  },
  {
    type: "Townhome HOA",
    range: "$150 - $400/mo",
    includes: "Exterior building maintenance, roof, shared walls, landscaping, insurance for common structures. Usually includes snow removal and trash.",
    color: "from-[#1a5276] to-[#154463]",
  },
  {
    type: "Condo HOA",
    range: "$200 - $800/mo",
    includes: "Full building maintenance (elevator, hallways, lobby, roof, facade), master insurance, water/sewer, sometimes heat. Higher in high-rises with doormen, concierge, or parking garages.",
    color: "from-[#5b3a8c] to-[#472d6e]",
  },
  {
    type: "Luxury Community",
    range: "$500 - $1,500+/mo",
    includes: "Golf courses, marina access, concierge services, valet parking, private beaches, 24/7 security, resort-style pools, tennis/pickleball courts. Some luxury condos in NYC and Miami exceed $5,000/mo.",
    color: "from-[#8b6914] to-[#6b5010]",
  },
];

const disputeSteps = [
  {
    step: 1,
    title: "Review Your CC&Rs",
    detail: "Start by reading the specific rule you believe was violated or misapplied. Understand the exact language — many disputes arise from ambiguous wording. Check the bylaws for the enforcement procedure, including notice requirements and hearing rights.",
  },
  {
    step: 2,
    title: "Attend Board Meetings & Speak During Open Comment",
    detail: "Most states require HOA board meetings to include an open comment period where homeowners can raise concerns. Come prepared with specific facts and a clear ask. Be professional — personal attacks undermine your credibility. Bring supporting documentation (photos, dates, correspondence).",
  },
  {
    step: 3,
    title: "Request a Formal Hearing",
    detail: "Most CC&Rs require the board to hold a hearing before imposing fines or penalties. This is your right — exercise it. At the hearing, present your case, cite the specific CC&R provision, and ask for a written decision. If the board denies your hearing request, that itself may be a violation of your governing documents.",
  },
  {
    step: 4,
    title: "Mediation Through Your State's HOA Program",
    detail: "Many states offer HOA dispute resolution programs through the attorney general's office, department of real estate, or a dedicated ombudsman. Mediation is typically faster and cheaper than litigation. States like Florida, Nevada, California, and Colorado have formal HOA mediation/arbitration programs.",
  },
  {
    step: 5,
    title: "Consult a Real Estate Attorney",
    detail: "If informal resolution fails, consult an attorney who specializes in HOA law (also called community association law). Many offer free initial consultations. Key legal issues include selective enforcement, failure to follow governing documents, breach of fiduciary duty, and violations of state HOA statutes. Costs vary but expect $200-$500/hour.",
  },
  {
    step: 6,
    title: "File a Complaint with Your State Attorney General",
    detail: "If you suspect fraud, embezzlement, or corruption by the HOA board, file a formal complaint with your state attorney general's office. This is appropriate when board members are misusing funds, failing to hold required elections, or refusing to provide financial records. Some states also allow complaints to the Department of Business and Professional Regulation or the state real estate commission.",
  },
];

const trendData = [
  {
    stat: "284,933",
    label: "HOA Liens Filed in 2025",
    detail: "HOA lien filings increased 8.6% year-over-year, reflecting rising fees and more aggressive collection practices by management companies.",
    source: "ATTOM Data Solutions, 2025",
  },
  {
    stat: "50%",
    label: "Jump in HOA Foreclosures (2022-2025)",
    detail: "HOA-related foreclosures increased approximately 50% nationally between 2022 and 2025. While still a small fraction of total foreclosures, the trend is accelerating, particularly in states with HOA super-lien statutes.",
    source: "ATTOM Data Solutions; National Association of Realtors, 2025",
  },
  {
    stat: "30-60%",
    label: "Insurance Premium Increases (FL, CA, TX)",
    detail: "Property insurance premiums have surged 30-60% in disaster-prone states, directly driving up HOA fees. In Florida, some condo HOAs saw insurance costs triple between 2022 and 2025, with premium increases passed directly to unit owners through fee hikes.",
    source: "Insurance Information Institute; Bankrate, 2025",
  },
  {
    stat: "\"Shadow Mortgages\"",
    label: "Bankrate Warning on Rising HOA Costs",
    detail: "Bankrate's 2025 housing analysis warned that HOA fees are becoming \"shadow mortgages\" — a second, perpetually increasing payment that buyers underestimate. Unlike a fixed-rate mortgage, HOA fees have no cap and no payoff date.",
    source: "Bankrate, \"The Hidden Cost of HOA Living,\" 2025",
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
          <p className="text-xs text-alta-gray leading-relaxed mt-1">{summary}</p>
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

function BudgetCalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [hoaFee, setHoaFee] = useState(250);
  const annualIncrease = 0.04;

  const calc = useMemo(() => {
    const rate = 0.07 / 12;
    const n = 360;
    const loanAmount = homePrice * 0.8;
    const monthlyMortgage = loanAmount * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const monthlyTax = (homePrice * 0.012) / 12;
    const monthlyInsurance = 150;

    const totalHousingNoHOA = monthlyMortgage + monthlyTax + monthlyInsurance;
    const totalHousing = totalHousingNoHOA + hoaFee;
    const hoaPercent = ((hoaFee / totalHousing) * 100).toFixed(1);

    let fiveYearTotal = 0;
    let tenYearTotal = 0;
    for (let year = 0; year < 10; year++) {
      const yearlyFee = hoaFee * Math.pow(1 + annualIncrease, year) * 12;
      if (year < 5) fiveYearTotal += yearlyFee;
      tenYearTotal += yearlyFee;
    }

    const feeYear10 = hoaFee * Math.pow(1 + annualIncrease, 9);

    return {
      monthlyMortgage: Math.round(monthlyMortgage),
      totalHousing: Math.round(totalHousing),
      hoaPercent,
      fiveYearTotal: Math.round(fiveYearTotal),
      tenYearTotal: Math.round(tenYearTotal),
      feeYear10: Math.round(feeYear10),
    };
  }, [homePrice, hoaFee, annualIncrease]);

  return (
    <div className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#1a5276] to-[#154463] px-5 py-3">
        <h3 className="text-white font-bold text-sm">HOA Budget Impact Calculator</h3>
        <p className="text-white/70 text-xs mt-0.5">See how HOA fees affect your total monthly housing cost</p>
      </div>
      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-alta-navy mb-1.5">
              Home Price: ${homePrice.toLocaleString()}
            </label>
            <input
              type="range"
              min={150000}
              max={1000000}
              step={10000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-alta-teal"
            />
            <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
              <span>$150k</span>
              <span>$1M</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-alta-navy mb-1.5">
              Monthly HOA Fee: ${hoaFee}/mo
            </label>
            <input
              type="range"
              min={50}
              max={1500}
              step={25}
              value={hoaFee}
              onChange={(e) => setHoaFee(Number(e.target.value))}
              className="w-full accent-alta-teal"
            />
            <div className="flex justify-between text-[10px] text-alta-gray mt-0.5">
              <span>$50</span>
              <span>$1,500</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[#e8f0f5] rounded-xl text-center">
            <p className="text-lg font-extrabold text-alta-navy">{calc.hoaPercent}%</p>
            <p className="text-[10px] text-alta-gray leading-tight mt-1">HOA as % of total monthly housing cost</p>
          </div>
          <div className="p-3 bg-[#e8f0f5] rounded-xl text-center">
            <p className="text-lg font-extrabold text-alta-navy">${calc.fiveYearTotal.toLocaleString()}</p>
            <p className="text-[10px] text-alta-gray leading-tight mt-1">Total HOA cost over 5 years</p>
          </div>
          <div className="p-3 bg-[#e8f0f5] rounded-xl text-center">
            <p className="text-lg font-extrabold text-alta-navy">${calc.tenYearTotal.toLocaleString()}</p>
            <p className="text-[10px] text-alta-gray leading-tight mt-1">Total HOA cost over 10 years</p>
          </div>
          <div className="p-3 bg-[#e8f0f5] rounded-xl text-center">
            <p className="text-lg font-extrabold text-alta-navy">${calc.feeYear10}/mo</p>
            <p className="text-[10px] text-alta-gray leading-tight mt-1">Projected monthly fee in year 10</p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-xs text-gray-700 leading-relaxed">
            <span className="font-bold text-[#8b6914]">Your ${hoaFee}/mo HOA fee will cost you ${calc.tenYearTotal.toLocaleString()} over 10 years</span>{" "}
            (assuming 4% annual increases). By year 10, your monthly fee will be approximately ${calc.feeYear10}/mo — a{" "}
            {Math.round(((calc.feeYear10 - hoaFee) / hoaFee) * 100)}% increase from today.
          </p>
          <p className="text-[10px] text-[#8b6914] font-medium mt-2">
            Factor HOA fees into your affordability calculation — lenders include them in your debt-to-income (DTI) ratio.
          </p>
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
  const [expandedPro, setExpandedPro] = useState<number | null>(null);
  const [expandedCon, setExpandedCon] = useState<number | null>(null);
  const [expandedDispute, setExpandedDispute] = useState<number | null>(null);
  const [expandedTrend, setExpandedTrend] = useState<number | null>(null);
  const [expandedCost, setExpandedCost] = useState<number | null>(null);

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

          {/* ---- Objective Pros & Cons ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">The Honest Pros and Cons of HOA Living</h2>
            <p className="text-sm text-alta-gray mb-4">
              HOAs are neither inherently good nor bad — they are a tradeoff. Here is an objective look at both sides to
              help you decide whether HOA living is right for you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* PROS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#2d6b3f]/10 flex items-center justify-center text-[#2d6b3f] shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#2d6b3f] text-sm">Advantages</h3>
                </div>
                <div className="space-y-2">
                  {prosData.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-green-200 bg-green-50/50 overflow-hidden cursor-pointer transition-all hover:shadow-sm"
                      onClick={() => setExpandedPro(expandedPro === i ? null : i)}
                    >
                      <div className="p-3 flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-alta-navy text-xs">{item.title}</h4>
                        <svg
                          className={`w-3.5 h-3.5 text-alta-gray shrink-0 transition-transform duration-300 ${expandedPro === i ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${expandedPro === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-3 pb-3 border-t border-green-200 pt-2">
                          <p className="text-[11px] text-gray-600 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-red-700 text-sm">Disadvantages</h3>
                </div>
                <div className="space-y-2">
                  {consData.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-red-200 bg-red-50/50 overflow-hidden cursor-pointer transition-all hover:shadow-sm"
                      onClick={() => setExpandedCon(expandedCon === i ? null : i)}
                    >
                      <div className="p-3 flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-alta-navy text-xs">{item.title}</h4>
                        <svg
                          className={`w-3.5 h-3.5 text-alta-gray shrink-0 transition-transform duration-300 ${expandedCon === i ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${expandedCon === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-3 pb-3 border-t border-red-200 pt-2">
                          <p className="text-[11px] text-gray-600 leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---- Cost Comparison by Property Type ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">Real Cost Comparison by Property Type</h2>
            <p className="text-sm text-alta-gray mb-4">
              HOA fees vary dramatically based on property type, amenities, and location. Here is what to expect.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {costComparison.map((item, i) => (
                <div
                  key={item.type}
                  className="rounded-2xl overflow-hidden shadow-sm border border-[#c5d8e4] cursor-pointer transition-all hover:shadow-md"
                  onClick={() => setExpandedCost(expandedCost === i ? null : i)}
                >
                  <div className={`bg-gradient-to-r ${item.color} px-4 py-3 flex items-center justify-between`}>
                    <div>
                      <h3 className="text-white font-bold text-sm">{item.type}</h3>
                      <p className="text-white/90 font-extrabold text-lg">{item.range}</p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-white/70 shrink-0 transition-transform duration-300 ${expandedCost === i ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCost === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-4">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-semibold text-alta-navy">Typically includes: </span>
                        {item.includes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">
              Source: Bankrate, 2025; U.S. Census Bureau American Housing Survey; Community Associations Institute
            </p>
          </section>

          {/* ---- Budget Impact Calculator ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-3">HOA Budget Impact Calculator</h2>
            <BudgetCalculator />
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
                  HOA board when the reserve fund doesn&apos;t have enough money to cover a major expense — such as a roof
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

          {/* ---- 2025-2026 HOA Trends ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">2025-2026 HOA Trends: What Buyers Need to Know</h2>
            <p className="text-sm text-alta-gray mb-4">
              The HOA landscape is shifting rapidly. These trends are affecting homeowners and buyers right now.
            </p>
            <div className="space-y-3">
              {trendData.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md"
                  onClick={() => setExpandedTrend(expandedTrend === i ? null : i)}
                >
                  <div className="p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5b3a8c]/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[#5b3a8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="font-extrabold text-[#5b3a8c] text-sm mr-2">{item.stat}</span>
                          <span className="font-bold text-alta-navy text-sm">{item.label}</span>
                        </div>
                        <svg
                          className={`w-4 h-4 text-alta-gray shrink-0 transition-transform duration-300 ${expandedTrend === i ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedTrend === i ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-4 pb-4 ml-[52px] border-t border-[#e2eaf0] pt-3">
                      <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                      <p className="text-[10px] text-alta-teal font-medium mt-2">{item.source}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Legislative updates */}
              <div className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm">
                <div className="p-4">
                  <h3 className="font-bold text-alta-navy text-sm mb-2">New State Laws Affecting HOAs</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-[#e8f0f5] rounded-xl">
                      <p className="text-xs text-alta-gray leading-relaxed">
                        <strong className="text-alta-navy">California SB 326</strong> — Requires inspection of exterior elevated elements (balconies, walkways, stairways) in condos with three or more units. Initial inspections must be completed by January 1, 2025, with follow-up inspections every 9 years. Non-compliance can result in civil penalties.
                      </p>
                    </div>
                    <div className="p-3 bg-[#e8f0f5] rounded-xl">
                      <p className="text-xs text-alta-gray leading-relaxed">
                        <strong className="text-alta-navy">California AB 130 (2025)</strong> — Reforms HOA enforcement practices, including new requirements for notice, hearing procedures, and limits on fine amounts. Aimed at reducing selective enforcement and protecting homeowner rights.
                      </p>
                    </div>
                    <div className="p-3 bg-[#e8f0f5] rounded-xl">
                      <p className="text-xs text-alta-gray leading-relaxed">
                        <strong className="text-alta-navy">Florida SB 4-D / SB 154 (2022-2024)</strong> — Post-Surfside reforms requiring structural inspections for condos 3+ stories, 25+ years old (or 20+ years within 3 miles of coast). Reserves for structural components can no longer be waived. These laws triggered massive special assessments across Florida.
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-alta-teal font-medium mt-3">
                    Source: California Legislature; Florida Division of Condominiums
                  </p>
                </div>
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

          {/* ---- HOA Insurance Explained ---- */}
          <section className="mb-8 mt-8">
            <h2 className="text-xl font-bold text-alta-navy mb-3">HOA Insurance Explained</h2>
            <div className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#1a5276] to-[#154463] px-5 py-3">
                <h3 className="text-white font-bold text-sm">Master Policy vs. Your Individual Policy</h3>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-alta-gray leading-relaxed">
                  Understanding the gap between the HOA&apos;s master insurance policy and your individual coverage is critical.
                  If you assume the HOA covers everything, you may be exposed to tens of thousands of dollars in uninsured losses.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                    <h4 className="font-bold text-sm text-[#1a5276] mb-2">HOA Master Policy Covers</h4>
                    <ul className="text-xs text-gray-600 leading-relaxed space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-alta-teal mt-0.5 font-bold">+</span>
                        Common area structures (clubhouse, pool, gym)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-alta-teal mt-0.5 font-bold">+</span>
                        Exterior building elements (roof, siding, hallways) in condos
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-alta-teal mt-0.5 font-bold">+</span>
                        General liability for injuries in common areas
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-alta-teal mt-0.5 font-bold">+</span>
                        Shared mechanical systems (elevator, HVAC for common areas)
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-bold text-sm text-red-700 mb-2">What It Does NOT Cover</h4>
                    <ul className="text-xs text-gray-600 leading-relaxed space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 font-bold">-</span>
                        Interior of your unit (walls-in, flooring, cabinets, fixtures)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 font-bold">-</span>
                        Your personal property (furniture, electronics, clothing)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 font-bold">-</span>
                        Your personal liability (someone injured inside your unit)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 font-bold">-</span>
                        Loss of use / temporary housing if your unit is uninhabitable
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 font-bold">-</span>
                        Master policy deductible (often $10,000-$50,000, assessed to the unit owner who files the claim)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <h4 className="font-bold text-xs text-[#8b6914] mb-1">HO-6 Policy for Condo Owners</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    If you own a condo, you need an <strong>HO-6 policy</strong> (sometimes called a &quot;walls-in&quot; policy).
                    This covers your interior finishes, personal property, personal liability, loss assessment coverage
                    (if the HOA assesses you for a claim against the master policy), and loss of use. Typical cost: $200-$500/year.
                    Critical: make sure your HO-6 includes <strong>loss assessment coverage</strong> of at least $25,000-$50,000 —
                    this covers your share if the HOA&apos;s master policy deductible or an underinsured loss is assessed to unit owners.
                  </p>
                </div>

                <p className="text-[10px] text-alta-teal font-medium">
                  Source: Insurance Information Institute; National Association of Insurance Commissioners
                </p>
              </div>
            </div>
          </section>

          {/* ---- Your Rights ---- */}
          <section className="mb-8">
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

          {/* ---- Dispute Resolution ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-2">HOA Dispute Resolution: Step by Step</h2>
            <p className="text-sm text-alta-gray mb-4">
              If you have a dispute with your HOA — a fine you believe is unjust, selective enforcement, or a board
              decision you oppose — follow these steps in order before escalating.
            </p>
            <div className="space-y-2">
              {disputeSteps.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden cursor-pointer transition-all hover:shadow-sm"
                  onClick={() => setExpandedDispute(expandedDispute === i ? null : i)}
                >
                  <div className="p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-alta-navy flex items-center justify-center text-white shrink-0 text-xs font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-alta-navy text-sm">{item.title}</h3>
                        <svg
                          className={`w-4 h-4 text-alta-gray shrink-0 transition-transform duration-300 ${expandedDispute === i ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedDispute === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-3 pb-3 ml-11 border-t border-[#e2eaf0] pt-2">
                      <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---- Resources ---- */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-3">HOA Resources</h2>
            <div className="rounded-2xl border border-[#c5d8e4] bg-[#fafcfe] overflow-hidden shadow-sm">
              <div className="p-5 space-y-4">
                <p className="text-sm text-alta-gray leading-relaxed">
                  HOA laws vary significantly by state. The following resources can help you understand your rights and
                  options in your specific jurisdiction.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                    <h4 className="font-bold text-sm text-alta-navy mb-2">Community Associations Institute</h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      The largest trade organization for HOAs and community associations. Provides research, best
                      practices, and legislative tracking.
                    </p>
                    <p className="text-xs text-alta-teal font-medium">caionline.org</p>
                  </div>
                  <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                    <h4 className="font-bold text-sm text-alta-navy mb-2">State HOA Ombudsman Programs</h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      Several states (FL, NV, CO, VA, and others) have ombudsman offices that mediate HOA disputes,
                      investigate complaints, and provide homeowner education at no cost.
                    </p>
                    <p className="text-xs text-alta-teal font-medium">Search: &quot;[your state] HOA ombudsman&quot;</p>
                  </div>
                  <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                    <h4 className="font-bold text-sm text-alta-navy mb-2">Your State&apos;s HOA Statutes</h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      Every state has laws governing HOAs. Key statutes include the Uniform Common Interest Ownership Act
                      (adopted with variations in many states), Davis-Stirling Act (CA), and Chapter 720 (FL).
                    </p>
                    <p className="text-xs text-alta-teal font-medium">Search: &quot;[your state] HOA statute&quot;</p>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-bold text-[#8b6914]">Before buying in an HOA community:</span> Request the
                    full HOA disclosure packet (also called a resale certificate or HOA estoppel). This typically includes
                    the CC&amp;Rs, bylaws, current budget, reserve study, meeting minutes, pending litigation disclosure,
                    and any planned special assessments. Your real estate agent can help you obtain this from the HOA or
                    its management company. In most states, the seller pays for this packet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---- Print / Save ---- */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <PrintButton label="Print This Guide" />
            <SaveToFolderBtn type="checklist" title="HOA Guide: What Every Buyer Needs to Know" content="Comprehensive guide to homeowners associations, including fees, pros and cons, red flags, insurance, dispute resolution, and resources." />
          </div>

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
