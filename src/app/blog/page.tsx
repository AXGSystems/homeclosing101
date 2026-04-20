"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";
import ShareButtons from "@/components/ShareButtons";

interface Article {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  source: string;
  sourceUrl: string;
  keyTakeaways: string[];
}

const articles: Article[] = [
  {
    title: "FBI Reports $275 Million in Real Estate Wire Fraud Losses",
    excerpt: "The FBI's Internet Crime Complaint Center reports a 59% year-over-year increase in real estate wire fraud, with losses totaling $275.1 million in 2025.",
    content: "The FBI's Internet Crime Complaint Center (IC3) 2025 Internet Crime Report reveals that real estate wire fraud continues to escalate dramatically. Criminals are using increasingly sophisticated tactics — including AI-generated deepfake voice calls, business email compromise (BEC), and hacked real estate agent accounts — to intercept closing funds.\n\nThe average individual loss is approximately $150,000, often representing the buyer's entire down payment and closing costs. Recovery rates remain dire: approximately 20% if reported within 1 hour, 10% within 24 hours, and less than 5% after 48 hours.\n\nThe FBI recommends that homebuyers ALWAYS verify wiring instructions by phone using a known number, never trust 'updated' wire instructions received via email, and confirm receipt with their settlement agent immediately after wiring. The IC3's Recovery Asset Team (RAT) has successfully frozen funds in many cases when notified quickly.",
    date: "March 2026",
    category: "Wire Fraud",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    source: "FBI IC3 2025 Internet Crime Report",
    sourceUrl: "https://www.ic3.gov/Media/PDF/AnnualReport/2025_IC3Report.pdf",
    keyTakeaways: [
      "Wire fraud losses hit $275.1 million in 2025, up 59% year-over-year",
      "Average individual loss is $150,000 — often the buyer's entire down payment",
      "Recovery drops to under 5% if not reported within 48 hours",
      "Always verify wiring instructions by phone using a number you already have on file",
    ],
  },
  {
    title: "CFPB: Understanding Your Closing Disclosure",
    excerpt: "The Consumer Financial Protection Bureau provides a comprehensive guide to the 5-page Closing Disclosure — the most important document you'll review before closing.",
    content: "The CFPB's 'Know Before You Owe' initiative requires lenders to provide the Closing Disclosure at least 3 business days before closing. This standardized 5-page document replaced the old HUD-1 Settlement Statement in 2015 under the TRID rule.\n\nPage 1 shows your loan terms, interest rate, and projected monthly payments. Page 2 itemizes every closing cost — organized into Sections A through H covering origination charges, services you can and cannot shop for, taxes, prepaids, and escrow deposits. Page 3 provides cost comparisons, including total costs over 5 years and the APR. Pages 4-5 cover loan disclosures and contact information.\n\nThe CFPB emphasizes comparing the Closing Disclosure line-by-line with your Loan Estimate. Certain fee increases are prohibited (zero tolerance), others are capped at 10%, and some can change freely. If you notice discrepancies, contact your lender immediately — before you sit at the closing table.",
    date: "February 2026",
    category: "Closing Process",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    source: "CFPB Know Before You Owe",
    sourceUrl: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/",
    keyTakeaways: [
      "Your lender must provide the Closing Disclosure at least 3 business days before closing",
      "Compare every line item against your original Loan Estimate to catch fee changes",
      "Some fees have zero tolerance for increases — if they changed, push back",
      "Pages 2-3 itemize all closing costs and show total cost over 5 years",
    ],
  },
  {
    title: "ALTA: Title Searches Reveal Issues in 1 of 3 Transactions",
    excerpt: "The American Land Title Association reports that title professionals find and resolve issues in approximately one-third of all residential real estate transactions.",
    content: "According to the American Land Title Association, title searches reveal issues requiring resolution in approximately one out of every three residential real estate transactions. These aren't minor paperwork errors — they're substantive problems that, if left unresolved, could threaten the buyer's ownership rights.\n\nCommon issues discovered during title searches include: unpaid mortgages or liens from previous owners, delinquent property taxes or special assessments, errors in public records (misspelled names, incorrect legal descriptions), missing signatures on prior deeds, undisclosed heirs with potential ownership claims, unreleased judgments or mechanic's liens, and boundary disputes.\n\nTitle professionals perform 'curative work' to resolve these issues before closing — contacting prior lenders for lien releases, working with courts to clear judgments, and correcting recording errors. Owner's title insurance then protects the buyer against problems that even the most thorough search couldn't uncover: forged documents, unknown heirs, and recording errors that may surface years later.",
    date: "January 2026",
    category: "Title Insurance",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    source: "American Land Title Association",
    sourceUrl: "https://www.alta.org/advocacy/title-insurance-consumer-protections/",
    keyTakeaways: [
      "1 in 3 residential transactions has a title issue that must be resolved before closing",
      "Common problems include unpaid liens, tax delinquencies, and missing signatures on deeds",
      "Title professionals perform curative work to fix issues before you close",
      "Owner's title insurance protects against hidden defects that even thorough searches miss",
    ],
  },
  {
    title: "NAR: Median Home Price Reaches $400,000 — What Buyers Need to Know",
    excerpt: "The National Association of Realtors reports the median existing-home sale price hit $400,000, with first-time buyers making up just 24% of purchases.",
    content: "The National Association of Realtors' latest housing statistics show the median existing-home sale price reached $400,000 — meaning half of all homes sold for more. At this price, buyers need to budget well beyond the down payment.\n\nClosing costs typically run 2-5% of the purchase price ($8,000-$20,000 on a $400K home), and first-time buyers put down a median of just 8% ($32,000). That means a first-time buyer purchasing at the median price needs $40,000-$52,000 in cash at closing.\n\nFirst-time buyers represented approximately 24% of all purchases — the lowest share since NAR began tracking in 1981. Affordability remains the primary barrier, with the combination of higher prices and elevated mortgage rates pushing monthly payments well above historical averages. Down payment assistance programs exist in every state but remain underutilized — NAR recommends checking with your state's Housing Finance Agency.",
    date: "December 2025",
    category: "Market Data",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    source: "NAR Research & Statistics",
    sourceUrl: "https://www.nar.realtor/research-and-statistics/housing-statistics",
    keyTakeaways: [
      "Median home price reached $400,000 — budget $40K-$52K in cash for down payment plus closing costs",
      "First-time buyers are just 24% of purchases, the lowest share ever recorded",
      "Closing costs run 2-5% of purchase price on top of your down payment",
      "Down payment assistance programs exist in every state but are underutilized",
    ],
  },
  {
    title: "Remote Online Notarization Now Available in 45 States",
    excerpt: "Thanks to ALTA and MBA advocacy, RON legislation has passed in 45 states and DC, allowing homebuyers to close entirely online via secure video.",
    content: "As of 2026, 45 states and the District of Columbia have enacted permanent Remote Online Notarization (RON) legislation — up from just one state (Virginia) in 2011. This rapid expansion was driven by the joint advocacy of the American Land Title Association (ALTA) and the Mortgage Bankers Association (MBA), who partnered in 2017 to develop model legislation.\n\nRON allows homebuyers to complete their entire closing via secure audio-video session. The process includes identity verification through knowledge-based authentication (KBA), electronic document signing witnessed by a commissioned notary, and a tamper-evident recording of the entire session — arguably more secure than in-person closings.\n\nAt the federal level, the bipartisan SECURE Notarization Act (HR 1777) aims to establish national minimum standards and enable RON in the remaining states. Early adopters include Virginia (2011), Texas, Florida, Michigan, and Nevada. Even in states that allow RON, availability depends on your lender and title company supporting the technology.",
    date: "November 2025",
    category: "Industry",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    source: "ALTA, MBA RON Adoption Map",
    sourceUrl: "https://www.mba.org/advocacy-and-policy/residential-policy-issues/remote-online-notarization",
    keyTakeaways: [
      "45 states plus DC now allow Remote Online Notarization for real estate closings",
      "RON sessions include identity verification, live video with a notary, and tamper-evident recordings",
      "The SECURE Notarization Act aims to enable RON nationwide with federal standards",
      "Ask your title company if they support RON — availability varies by lender and provider",
    ],
  },
  {
    title: "CFPB: Your Right to Choose Your Own Title Company",
    excerpt: "Under RESPA, homebuyers have the legal right to select their own title insurance company. Shopping around can save hundreds of dollars.",
    content: "The Real Estate Settlement Procedures Act (RESPA) gives homebuyers the legal right to choose their own title insurance company and settlement services provider. Your lender or real estate agent may recommend a provider, but you are NOT obligated to use them — and shopping around can save significant money.\n\nThe CFPB recommends getting quotes from at least 2-3 title companies before deciding. Title insurance rates are regulated by each state's department of insurance — in some states (like Texas), rates are set by the state and are the same everywhere. In others, rates vary by company, making comparison shopping especially valuable.\n\nKey things to compare: the premium for the owner's policy, the simultaneous issue rate (discount when buying both owner's and lender's policies together), settlement/escrow fees, and title search charges. RESPA also prohibits kickbacks — no one involved in your transaction can receive a fee for referring you to a specific title company. If you feel pressured to use a particular provider, that's a red flag.",
    date: "October 2025",
    category: "Consumer Rights",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    source: "CFPB Settlement Cost Booklet",
    sourceUrl: "https://www.consumerfinance.gov/owning-a-home/",
    keyTakeaways: [
      "RESPA guarantees your right to choose your own title company — you are never obligated to use a referral",
      "Get quotes from 2-3 title companies to compare premiums and fees",
      "Kickbacks for title company referrals are illegal under RESPA",
      "Ask about the simultaneous issue rate for a discount when buying both owner's and lender's policies",
    ],
  },
  {
    title: "How the Home Inspection Protects Your $400,000 Investment",
    excerpt: "86% of home inspections reveal issues. A $400 inspection can uncover $40,000 in hidden problems — here's what inspectors check and why you should attend.",
    content: "A home inspection is a 2-4 hour visual examination of a property's major systems conducted by a licensed, independent inspector. The resulting report — typically 30-60 pages with photos — documents every deficiency found, rated by severity.\n\nInspectors evaluate six major areas: structural/foundation (cracks, settling, moisture), roof and exterior (shingles, flashing, gutters, siding), plumbing (pipe materials, water heater, drains), electrical (panel, wiring type, GFCI outlets), HVAC (furnace, A/C, ductwork), and interior (walls, ceilings, attic, moisture). The typical inspection costs $300-$500 and reveals issues in approximately 86% of homes.\n\nAttending the inspection in person is the single best thing you can do as a buyer. Walking through with the inspector helps you understand which findings are critical safety issues ($10,000+ repairs) versus cosmetic items ($200 fixes). Common high-cost findings include: foundation problems ($5,000-$50,000), roof replacement ($8,000-$25,000), electrical panel defects ($2,000-$4,000), and plumbing re-pipe ($4,000-$15,000).",
    date: "September 2025",
    category: "Inspections",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    source: "ASHI, InterNACHI",
    sourceUrl: "https://www.homeinspector.org/resources/for-consumers",
    keyTakeaways: [
      "86% of home inspections reveal issues — a $300-$500 inspection can save you tens of thousands",
      "Attend the inspection in person to learn which issues are critical vs. cosmetic",
      "Foundation, roof, electrical, and plumbing are the big-ticket items to watch for",
      "The inspection report (30-60 pages) gives you leverage for repair negotiations",
    ],
  },
  {
    title: "FHA vs VA vs Conventional: Choosing the Right Mortgage",
    excerpt: "A detailed comparison of the major loan types — down payment requirements, mortgage insurance, credit scores, and total cost over the life of the loan.",
    content: "Choosing the right mortgage type is one of the most impactful financial decisions in the homebuying process. Each loan type has different requirements and tradeoffs:\n\nConventional loans (backed by Fannie Mae/Freddie Mac) require 3-20% down with a 620+ credit score. PMI is required below 20% down but can be removed once you reach 20% equity — unlike FHA's permanent MIP. Best for buyers with strong credit and savings.\n\nFHA loans (insured by HUD) require just 3.5% down with a 580+ credit score and allow DTI ratios up to 50%. However, MIP is required for the life of the loan if you put less than 10% down — making refinancing to conventional a common strategy once you build equity.\n\nVA loans (guaranteed by the VA) offer 0% down, no monthly mortgage insurance, and no minimum credit score (though most lenders want 620+). Available to active-duty military, veterans, and eligible surviving spouses. The VA funding fee (2.15% first use) can be financed or waived for disabled veterans.\n\nUSDA loans offer 0% down for eligible rural/suburban areas with lower guarantee fees than FHA. Income limits apply (115% of area median income).",
    date: "August 2025",
    category: "Mortgages",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
    source: "FHA.com, VA.gov, USDA.gov",
    sourceUrl: "https://www.consumerfinance.gov/owning-a-home/loan-options/",
    keyTakeaways: [
      "Conventional PMI can be removed at 20% equity — FHA MIP stays for the life of the loan",
      "VA loans offer 0% down with no monthly mortgage insurance for eligible veterans",
      "FHA allows credit scores as low as 580 with 3.5% down and higher DTI ratios",
      "USDA loans offer 0% down in eligible rural/suburban areas with income limits",
    ],
  },
  {
    title: "Down Payment Assistance: Programs Most Buyers Don't Know About",
    excerpt: "Every state has programs to help first-time buyers with down payments and closing costs — grants, forgivable loans, and below-market rates.",
    content: "Thousands of down payment assistance (DPA) programs exist at the state, county, and city level — yet most first-time buyers never apply because they don't know the programs exist. According to NAR, the median first-time buyer down payment is just 8%, and many programs can reduce or eliminate that requirement entirely.\n\nState Housing Finance Agencies (HFAs) are the primary source of DPA. Every state has one, offering grants (free money that doesn't need to be repaid), forgivable loans (forgiven after 5-10 years of occupancy), deferred-payment loans (repaid only when you sell or refinance), and below-market interest rates.\n\nEligibility typically depends on: income (usually 80-120% of area median income), purchase price limits, first-time buyer status (defined as not having owned a home in the past 3 years), and completing a homebuyer education course. FHA loans allow the entire 3.5% minimum down payment to come from gift funds or approved DPA programs.\n\nTo find programs in your area, search '[your state] housing finance agency' or use HUD's housing counselor locator at consumerfinance.gov/housing.",
    date: "July 2025",
    category: "First-Time Buyers",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    source: "NCSHA, HUD",
    sourceUrl: "https://www.consumerfinance.gov/housing/",
    keyTakeaways: [
      "Every state has a Housing Finance Agency offering grants, forgivable loans, and below-market rates",
      "First-time buyer = anyone who hasn't owned a home in the past 3 years",
      "FHA allows your entire 3.5% down payment to come from DPA programs or gift funds",
      "Search '[your state] housing finance agency' or use HUD's counselor locator to find programs",
    ],
  },
  {
    title: "ALTA Best Practices: How Your Title Company Protects You",
    excerpt: "ALTA's 7-pillar Best Practices framework covers licensing, escrow trust accounting, cybersecurity, and consumer protection — what to look for when choosing a title company.",
    content: "The American Land Title Association's Best Practices framework provides a comprehensive set of standards for title insurance companies and settlement agents. Developed after the 2008 financial crisis to strengthen consumer protection, the framework covers seven pillars:\n\nPillar 1: Licensing — ensuring all employees are properly licensed and registered. Pillar 2: Escrow Trust Accounting — maintaining separate trust accounts for client funds with regular reconciliation. Pillar 3: Privacy and Data Security — protecting consumer information with encryption, access controls, and cybersecurity training. Pillar 4: Settlement Procedures — following standardized processes for recording, disbursement, and document handling. Pillar 5: Title Policy Production — issuing policies accurately and promptly. Pillar 6: Professional Liability Insurance — carrying E&O and cyber liability coverage. Pillar 7: Consumer Complaints — maintaining a formal process for handling and resolving complaints.\n\nWhen choosing a title company, ask if they follow ALTA Best Practices and whether they've completed a third-party assessment. Over 6,000 ALTA member companies have adopted these standards.",
    date: "June 2025",
    category: "Title Insurance",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    source: "ALTA Best Practices",
    sourceUrl: "https://www.alta.org/best-practices/",
    keyTakeaways: [
      "ALTA Best Practices cover 7 pillars including licensing, escrow accounting, and cybersecurity",
      "Ask your title company if they follow ALTA Best Practices and have third-party assessment",
      "Pillar 2 requires separate trust accounts for your closing funds with regular reconciliation",
      "Over 6,000 ALTA member companies have adopted these consumer protection standards",
    ],
  },
];

const catColors: Record<string, string> = {
  "Title Insurance": "bg-[#e9f5ed] text-[#2d6b3f]",
  "Consumer Rights": "bg-[#e9f5ed] text-[#2d6b3f]",
  "Market Data": "bg-[#e8f0f5] text-[#1a5276]",
  "Wire Fraud": "bg-[#f5e8e8] text-[#943030]",
  "Inspections": "bg-[#faf4e4] text-[#8b6914]",
  "Mortgages": "bg-[#f0ecf6] text-[#5b3a8c]",
  "First-Time Buyers": "bg-[#e6f1f5] text-[#0a7ea8]",
  "Closing Process": "bg-[#e8f0f5] text-[#1a5276]",
  "Industry": "bg-[#e9f5ed] text-[#2d6b3f]",
};

const allCategories = [
  "All",
  "Wire Fraud",
  "Closing Process",
  "Title Insurance",
  "Market Data",
  "Industry",
  "Consumer Rights",
  "Inspections",
  "Mortgages",
  "First-Time Buyers",
];

function getRelatedArticles(current: Article, count: number = 3): Article[] {
  const sameCat = articles.filter(
    (a) => a.category === current.category && a.title !== current.title
  );
  const others = articles.filter(
    (a) => a.category !== current.category && a.title !== current.title
  );
  return [...sameCat, ...others].slice(0, count);
}

function ArticleCard({
  article,
  onSelect,
  featured = false,
}: {
  article: Article;
  onSelect: (a: Article) => void;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div className="mb-8">
        <button
          onClick={() => onSelect(article)}
          className="w-full text-left group rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white tile-interactive"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-56 md:h-auto overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${article.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span
                className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full ${catColors[article.category]}`}
              >
                {article.category}
              </span>
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                Featured
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3 text-xs text-alta-gray">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <svg
                  className="w-3.5 h-3.5 text-alta-gray"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{article.readTime} read</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-alta-navy mb-3 group-hover:text-alta-teal transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-alta-teal flex items-center gap-1">
                  Read full article
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <p className="text-[9px] text-alta-gray">
                  Source: {article.source}
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(article)}
      className="text-left group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white tile-interactive relative"
    >
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span
          className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full ${catColors[article.category] || "bg-gray-100 text-gray-700"}`}
        >
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2 text-xs text-alta-gray">
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <svg
            className="w-3.5 h-3.5 text-alta-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{article.readTime} read</span>
        </div>
        <h3 className="font-bold text-alta-navy mb-2 group-hover:text-alta-teal transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-alta-gray leading-relaxed mb-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-alta-teal font-medium">
            Source: {article.source}
          </p>
          <span className="flex items-center gap-1 text-xs font-medium text-alta-teal opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read more
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [linkCopied, setLinkCopied] = useState(false);

  const openPanel = useCallback((article: Article) => {
    setSelectedArticle(article);
    requestAnimationFrame(() => setPanelVisible(true));
  }, []);

  const closePanel = useCallback(() => {
    setPanelVisible(false);
    setTimeout(() => setSelectedArticle(null), 300);
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closePanel]);

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featuredArticle = activeCategory === "All" ? articles[0] : null;
  const gridArticles = featuredArticle
    ? filteredArticles.slice(1)
    : filteredArticles;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleEmailShare = () => {
    if (!selectedArticle) return;
    const subject = encodeURIComponent(
      selectedArticle.title + " — HomeClosing101"
    );
    const body = encodeURIComponent(
      `${selectedArticle.excerpt}\n\nRead more: ${window.location.href}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <>
      <PageHero
        title="Industry News & Advice"
        subtitle="Real articles sourced from ALTA, CFPB, FBI IC3, NAR, and industry professionals. Click any article to read the full summary."
        image="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&q=80"
        breadcrumb={[{ label: "News & Advice", href: "/blog" }]}
      />

      {/* Right-side slide-out panel */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[700]" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${panelVisible ? "opacity-100" : "opacity-0"}`}
            onClick={closePanel}
          />
          {/* Panel */}
          <div
            data-panel-scroll
            className={`absolute top-0 right-0 h-full w-full sm:w-[500px] lg:w-[600px] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${panelVisible ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closePanel}
              className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10 transition-colors"
              aria-label="Close panel"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Hero image */}
            <div className="relative h-[200px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${selectedArticle.image}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-5 right-16">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${catColors[selectedArticle.category] || "bg-gray-100 text-gray-700"}`}
                  >
                    {selectedArticle.category}
                  </span>
                  <span className="text-[10px] text-white/70">
                    {selectedArticle.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[10px] text-white/70">
                    {selectedArticle.readTime} read
                  </span>
                </div>
              </div>
            </div>

            {/* Panel body */}
            <div className="p-6">
              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-alta-navy mb-2 leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Source attribution */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <svg
                  className="w-3.5 h-3.5 text-alta-teal shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.475a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757"
                  />
                </svg>
                <a
                  href={selectedArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-alta-teal font-medium hover:underline"
                >
                  {selectedArticle.source}
                </a>
              </div>

              {/* Full article content */}
              {selectedArticle.content.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-sm text-alta-gray leading-relaxed mb-4"
                >
                  {para}
                </p>
              ))}

              {/* Key Takeaways */}
              <div className="mt-6 p-5 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8]">
                <h3 className="text-sm font-bold text-alta-navy mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#0a7ea8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {selectedArticle.keyTakeaways.map((takeaway, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-alta-gray leading-relaxed"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[#0a7ea8] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                <ShareButtons
                  path="/blog"
                  title={selectedArticle.title + " — HomeClosing101"}
                />
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-alta-gray text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                  {linkCopied ? "Copied!" : "Copy link"}
                </button>
                <button
                  onClick={handleEmailShare}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-alta-gray text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  Email
                </button>
                <SaveToFolderBtn
                  type="note"
                  title={selectedArticle.title}
                  content={selectedArticle.excerpt}
                  label="Save Article"
                />
              </div>

              {/* Read at source button */}
              <a
                href={selectedArticle.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-alta-teal text-white text-sm font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors"
              >
                Read at source
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              {/* Related Articles */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-alta-navy mb-4">
                  Related Articles
                </h3>
                <div className="space-y-3">
                  {getRelatedArticles(selectedArticle).map((related) => (
                    <button
                      key={related.title}
                      onClick={() => {
                        setSelectedArticle(related);
                        const panelEl = document.querySelector(
                          "[data-panel-scroll]"
                        );
                        if (panelEl) panelEl.scrollTop = 0;
                      }}
                      className="w-full text-left group/related flex gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div
                        className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                        style={{
                          backgroundImage: `url('${related.image}')`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${catColors[related.category] || "bg-gray-100 text-gray-700"}`}
                        >
                          {related.category}
                        </span>
                        <h4 className="text-xs font-semibold text-alta-navy mt-1 line-clamp-2 group-hover/related:text-alta-teal transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-[10px] text-alta-gray mt-0.5">
                          {related.readTime} read
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0a7ea8]/10 flex items-center justify-center text-[#0a7ea8] shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">
                  Verified Industry News & Advice
                </h2>
                <p className="text-sm text-alta-gray leading-relaxed">
                  Every article is sourced from authoritative organizations —
                  ALTA, CFPB, FBI, NAR, and industry professionals. Click any
                  article to read the full summary, then follow the source link
                  for the original data.
                </p>
              </div>
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="mb-5 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? cat === "All"
                      ? "bg-alta-navy text-white shadow-sm"
                      : (catColors[cat] || "bg-gray-100 text-gray-700") +
                        " ring-2 ring-current/30 shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article count */}
          {activeCategory !== "All" && (
            <p className="mb-4 text-sm text-alta-gray">
              Showing{" "}
              <span className="font-semibold text-alta-navy">
                {filteredArticles.length}
              </span>{" "}
              of {articles.length} articles
            </p>
          )}

          {/* Empty state */}
          {filteredArticles.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-alta-navy mb-1">
                No articles in this category yet
              </h3>
              <p className="text-sm text-alta-gray mb-4">
                We are working on adding more content. Try another category or
                view all articles.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="px-5 py-2 bg-alta-teal text-white text-sm font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}

          {/* Featured article */}
          {featuredArticle && (
            <ArticleCard
              article={articles[0]}
              onSelect={openPanel}
              featured
            />
          )}

          {/* Article grid */}
          {gridArticles.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {gridArticles.slice(0, 4).map((article) => (
                <ArticleCard
                  key={article.title}
                  article={article}
                  onSelect={openPanel}
                />
              ))}
            </div>
          )}

          {gridArticles.length > 4 && <InlineAd />}

          {/* More articles */}
          {gridArticles.length > 4 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {gridArticles.slice(4).map((article) => (
                <ArticleCard
                  key={article.title}
                  article={article}
                  onSelect={openPanel}
                />
              ))}
            </div>
          )}

          {/* Quick links */}
          <div className="p-6 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold text-alta-navy mb-4">
              Explore More
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link
                href="/faq"
                className="group flex items-center gap-3 p-3 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive"
              >
                <div className="w-9 h-9 rounded-lg bg-[#5b3a8c]/10 flex items-center justify-center text-[#5b3a8c] shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                    250+ FAQ
                  </h3>
                  <p className="text-xs text-alta-gray">Verified answers</p>
                </div>
              </Link>
              <Link
                href="/glossary"
                className="group flex items-center gap-3 p-3 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1a5276]/10 flex items-center justify-center text-[#1a5276] shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                    450+ Glossary
                  </h3>
                  <p className="text-xs text-alta-gray">Real estate terms</p>
                </div>
              </Link>
              <Link
                href="/stop-fraud"
                className="group flex items-center gap-3 p-3 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] tile-interactive"
              >
                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-[#943030] shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">
                    Stop Fraud 101
                  </h3>
                  <p className="text-xs text-alta-gray">Prevention guide</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Subscribe callout */}
          <div className="mt-6 p-6 bg-gradient-to-br from-[#e6f1f5] to-white rounded-2xl border border-[#b4d8e8] shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0a7ea8]/10 flex items-center justify-center text-[#0a7ea8] shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-alta-navy mb-1">
                  Subscribe to Industry Updates
                </h3>
                <p className="text-sm text-alta-gray leading-relaxed mb-3">
                  Coming soon — subscribe to get the latest industry news and
                  homebuyer tips delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    disabled
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="px-5 py-2 bg-gray-300 text-white text-sm font-semibold rounded-lg cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
