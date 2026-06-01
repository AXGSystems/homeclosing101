/* ------------------------------------------------------------------ */
/*  HC101 Site Structure — master registry for the Control Center      */
/* ------------------------------------------------------------------ */
/*                                                                      */
/*  Single source of truth for every toggleable unit on the site.      */
/*  Unified key namespace consumed by SiteConfigProvider / SectionGate: */
/*                                                                      */
/*    page:/route              — a whole page                          */
/*    nav:/route               — that page's nav entry/links           */
/*    section:/route#id        — a major section on a page             */
/*    sub:/route#id.subId      — a subsection within a section         */
/*    module:Name              — a global/feature/content module       */
/*    ad:Name                  — an ad / sponsor format                */
/*                                                                      */
/*  SITE_STRUCTURE.sections is populated by the page-instrumentation    */
/*  pass (each page wraps its blocks in <SectionGate> and registers     */
/*  matching ids here).                                                 */
/* ------------------------------------------------------------------ */

export type Unit = { id: string; label: string };

export type SectionEntry = {
  id: string;
  label: string;
  subs?: Unit[];
};

export type PageEntry = {
  route: string;
  label: string;
  /** Nav grouping bucket, mirrors the Header dropdowns. */
  navGroup: string;
  sections: SectionEntry[];
};

/* ------------------------------------------------------------------ */
/*  Pages (sections filled in by the instrumentation pass)             */
/* ------------------------------------------------------------------ */

export const SITE_STRUCTURE: PageEntry[] = [
  {
    route: "/", label: "Homepage", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero", subs: [{ id: "stat-tiles", label: "Stat Tiles" }] },
      { id: "why-this-matters", label: "Why This Matters", subs: [{ id: "data-points", label: "Key Data Points" }, { id: "pull-quote", label: "Mission Pull Quote" }, { id: "market-stats", label: "2025 Market Stats" }] },
      { id: "how-it-helps", label: "How HomeClosing101 Helps", subs: [{ id: "pillars", label: "Learn / Calculate / Protect Pillars" }] },
      { id: "feature-cards", label: "Feature Cards" },
      { id: "roadmap", label: "Road to Homeownership", subs: [{ id: "data-cards", label: "Roadmap Data Cards" }] },
      { id: "where-to-start", label: "Where Should I Start" },
      { id: "title-insurance", label: "Why Title Insurance Matters", subs: [{ id: "cards", label: "Coverage Cards" }] },
      { id: "fraud-warning", label: "Wire Fraud Warning", subs: [{ id: "stats", label: "Fraud Stat Grid" }] },
      { id: "testimonials", label: "Testimonials" },
      { id: "resources", label: "Trusted Resources" },
      { id: "tools", label: "Interactive Tools" },
      { id: "cta", label: "Closing CTA" },
    ],
  },
  {
    route: "/closing-process", label: "Closing Process", navGroup: "Closing Process",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "What Is a Real Estate Closing?" },
      { id: "explore-toolbar", label: "Explore Each Phase Toolbar" },
      { id: "phase-timeline", label: "Visual Phase Timeline" },
      { id: "step-cards", label: "Step Cards" },
      { id: "key-stats", label: "Key Closing Stats" },
      { id: "resources", label: "More Closing Resources" },
    ],
  },
  {
    route: "/closing-process/closing-costs", label: "Closing Costs", navGroup: "Closing Process",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Page Intro" },
      { id: "fraud-warning", label: "Wire Fraud Warning" },
      { id: "calculator", label: "Closing Cost Calculator", subs: [{ id: "results", label: "Estimate Results" }, { id: "breakdown", label: "Detailed Breakdown" }] },
      { id: "state-card", label: "Personalized State Closing Cost Card" },
      { id: "fee-categories", label: "All Closing Costs by Category" },
      { id: "who-pays-what", label: "Who Pays What", subs: [{ id: "buyer", label: "Paid by Buyer" }, { id: "seller", label: "Paid by Seller" }] },
      { id: "reduce-costs", label: "7 Ways to Reduce Closing Costs" },
      { id: "regulations", label: "Key Federal Regulations" },
      { id: "cta", label: "Related Links / CTA" },
      { id: "flow-nav", label: "Closing Flow Navigation" },
    ],
  },
  {
    route: "/closing-process/closing-checklist", label: "Closing Checklist", navGroup: "Closing Process",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Page Intro / Roadmap" },
      { id: "toolbar", label: "Checklist Toolbar (Print / Save)" },
      { id: "session-warning", label: "Session Save Warning" },
      { id: "progress-bar", label: "Progress Bar" },
      { id: "checklist", label: "Interactive Checklist" },
      { id: "completion", label: "Completion Message" },
      { id: "print-tip", label: "Print Tip" },
      { id: "flow-nav", label: "Closing Flow Navigation" },
    ],
  },
  {
    route: "/closing-process/closing-options", label: "Closing Options", navGroup: "Closing Process",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Choose How You Close" },
      { id: "options", label: "Closing Option Breakdowns" },
      { id: "documents", label: "Documents You'll Sign at Closing" },
      { id: "ron-availability", label: "RON State Availability" },
      { id: "related-links", label: "Related Links" },
      { id: "flow-nav", label: "Closing Flow Navigation" },
    ],
  },
  {
    route: "/closing-process/what-to-expect", label: "What to Expect", navGroup: "Closing Process",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Step-by-Step Guide Intro" },
      { id: "steps", label: "8 Keys to Getting the Keys" },
      { id: "key-documents", label: "Key Closing Documents" },
      { id: "cta", label: "Call to Action Buttons" },
      { id: "closing-flow-nav", label: "Closing Flow Navigation" },
    ],
  },
  {
    route: "/closing-day-prep", label: "Closing Day Prep", navGroup: "Closing Process",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "what-to-bring", label: "What to Bring to Closing", subs: [{ id: "items-grid", label: "Items Grid" }] },
      { id: "day-before-timeline", label: "Timeline: The Day Before", subs: [{ id: "steps-list", label: "Steps List" }] },
      { id: "at-the-table", label: "At the Closing Table", subs: [{ id: "details-grid", label: "Details Grid" }] },
      { id: "after-closing", label: "After Closing To-Dos", subs: [{ id: "todos-list", label: "To-Dos List" }] },
      { id: "fraud-warning", label: "Wire Fraud Warning" },
      { id: "related-resources", label: "Related Resources" },
    ],
  },
  { route: "/closing-disclosure", label: "Closing Disclosure", navGroup: "Closing Process", sections: [] },
  {
    route: "/first-time-buyers", label: "First Time Buyers", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "welcome", label: "Welcome Intro" },
      { id: "quick-tools", label: "Quick-Access Tools", subs: [{ id: "intro-banner", label: "Tools Intro Banner" }, { id: "tool-grid", label: "Tool Grid" }] },
      { id: "timeline", label: "Homebuying Timeline" },
      { id: "did-you-know-nar", label: "Did You Know (NAR)" },
      { id: "loan-types", label: "Understanding Loan Types", subs: [{ id: "loan-chart", label: "Interactive Loan Chart" }, { id: "comparison-table", label: "Loan Comparison Table" }] },
      { id: "common-mistakes", label: "6 Costly Mistakes" },
      { id: "did-you-know-cfpb", label: "Did You Know (CFPB)" },
      { id: "down-payment-assistance", label: "Down Payment Assistance Programs" },
      { id: "credit-score", label: "Understanding Your Credit Score" },
      { id: "buyers-wish-they-knew", label: "What Buyers Wish They Knew" },
      { id: "cta", label: "Call to Action" },
    ],
  },
  {
    route: "/mortgage-calculator", label: "Mortgage Calculator", navGroup: "Tools",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro Banner" },
      { id: "calculator", label: "Calculator", subs: [{ id: "loan-type-selector", label: "Loan Type Selector" }, { id: "loan-info-bar", label: "Loan Type Info Bar" }, { id: "inputs-results", label: "Inputs & Results" }] },
      { id: "cfpb-tip", label: "CFPB Did You Know Tip" },
      { id: "detailed-analysis", label: "Detailed Analysis", subs: [{ id: "cash-and-insurance", label: "Cash Needed & Mortgage Insurance" }, { id: "property-tax-context", label: "Property Tax Context" }, { id: "cost-totals", label: "5-Year & Total Cost" }] },
      { id: "comparison-table", label: "Loan Type Comparison Table" },
      { id: "quick-scenarios", label: "Quick Scenarios" },
      { id: "related-links", label: "Related Calculators" },
      { id: "disclaimer", label: "Disclaimer" },
    ],
  },
  {
    route: "/dti-calculator", label: "DTI Calculator", navGroup: "Tools",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "explainer", label: "What Is DTI Explainer" },
      { id: "inputs", label: "Calculator Inputs", subs: [{ id: "income", label: "Monthly Gross Income" }, { id: "housing", label: "Housing Costs (PITI)" }, { id: "other-debts", label: "Other Monthly Debts" }] },
      { id: "gauges", label: "Your DTI Ratios (Gauges)" },
      { id: "what-lenders-see", label: "What Lenders See" },
      { id: "max-mortgage", label: "Max Mortgage Payment You Can Afford" },
      { id: "how-to-lower", label: "How to Lower Your DTI" },
      { id: "dti-by-loan-type", label: "DTI Limits by Loan Type" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/rent-vs-buy", label: "Rent vs Buy", navGroup: "Tools",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro: Should You Rent or Buy?" },
      { id: "calculator", label: "Rent vs. Buy Calculator", subs: [{ id: "inputs", label: "Inputs (Rental, Purchase, Period)" }, { id: "results", label: "Results (Verdict & Cost Breakdown)" }] },
      { id: "key-assumptions", label: "Key Assumptions" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/compare-loans", label: "Compare Loans", navGroup: "Tools",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "calculator", label: "Loan Comparison Calculator", subs: [{ id: "loan-count-toggle", label: "Loan Count Toggle" }, { id: "loan-inputs", label: "Loan Input Cards" }] },
      { id: "results", label: "Comparison Results", subs: [{ id: "comparison-table", label: "Side-by-Side Comparison Table" }, { id: "key-differences", label: "Key Differences" }, { id: "actions", label: "Print / Save Actions" }] },
      { id: "empty-state", label: "Empty State" },
      { id: "how-to-use", label: "How to Use This Tool" },
    ],
  },
  {
    route: "/true-cost", label: "True Cost", navGroup: "Tools",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "stat-callout", label: "The $21,000 Surprise Callout" },
      { id: "calculator", label: "True Cost Calculator", subs: [{ id: "inputs", label: "Calculator Inputs" }, { id: "results", label: "Results Panel" }] },
      { id: "budget-rule", label: "The 35% Budget Rule" },
      { id: "hidden-costs", label: "Hidden Costs Most Buyers Miss" },
      { id: "assumptions", label: "Sources & Assumptions" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/affordability", label: "Affordability", navGroup: "Tools",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro-callout", label: "Know Your Buying Power Callout" },
      { id: "calculator", label: "Affordability Calculator", subs: [{ id: "inputs", label: "Financial Profile Inputs" }, { id: "results", label: "Results Panel" }] },
      { id: "budget-reality-check", label: "Budget Reality Check" },
      { id: "fraud-warning", label: "Wire Fraud Warning" },
      { id: "hidden-costs", label: "Hidden Costs Beyond the Mortgage" },
      { id: "real-budget", label: "Real Monthly Budget Example" },
      { id: "related-links", label: "Related Tools Links" },
      { id: "disclaimer", label: "Estimate Disclaimer" },
    ],
  },
  {
    route: "/loan-estimate", label: "Loan Estimate", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro: First Look at the Numbers" },
      { id: "trid-explainer", label: "TRID, TILA & RESPA Explained" },
      { id: "timeline", label: "When You'll Receive It" },
      { id: "page-breakdown", label: "Page-by-Page Breakdown" },
      { id: "red-flags", label: "Red Flags to Watch For" },
      { id: "how-to-compare", label: "How to Compare Loan Estimates", subs: [{ id: "apr-example", label: "Why APR Matters — Real Example" }] },
      { id: "cfpb-sample", label: "CFPB Sample Loan Estimate" },
      { id: "cta", label: "Call to Action Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/le-vs-cd", label: "LE vs CD", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "why-it-matters", label: "Why This Comparison Matters" },
      { id: "checklist", label: "Interactive Comparison Checklist" },
      { id: "red-flags", label: "Red Flags" },
      { id: "what-to-do", label: "What to Do If Something Doesn't Match" },
      { id: "tolerance-rules", label: "TRID Tolerance Rules" },
      { id: "related-guides", label: "Related Guides" },
      { id: "actions", label: "Print & Save Actions" },
    ],
  },
  {
    route: "/escrow-guide", label: "Escrow Guide", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro: Your Money, Safely Managed" },
      { id: "fraud-warning", label: "Wire Fraud Warning" },
      { id: "phases", label: "The 3 Phases of Escrow" },
      { id: "escrow-math", label: "Escrow Math: Monthly Payment Breakdown" },
      { id: "escrow-waivers", label: "Escrow Waivers", subs: [{ id: "eligibility", label: "Eligibility Requirements" }, { id: "waiver-fee", label: "The Escrow Waiver Fee" }, { id: "risks", label: "Risks of Waiving Escrow" }, { id: "when-it-makes-sense", label: "When It Makes Sense" }] },
      { id: "respa-protections", label: "Federal Escrow Protections (RESPA)" },
      { id: "faq", label: "Common Escrow Questions" },
      { id: "cta-links", label: "CTA Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/home-inspection", label: "Home Inspection", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "why-it-matters", label: "Why This Matters" },
      { id: "key-stats", label: "Key Stats" },
      { id: "what-examined", label: "What a Home Inspector Examines" },
      { id: "by-home-type", label: "Inspection Guide by Home Type" },
      { id: "specialty-inspections", label: "Specialty Inspections" },
      { id: "choosing-inspector", label: "Choosing an Inspector", subs: [{ id: "what-to-look-for", label: "What to Look For" }, { id: "things-to-consider", label: "Things to Consider" }] },
      { id: "who-pays", label: "Who Pays for the Inspection" },
      { id: "after-inspection", label: "After the Inspection: Your Options" },
      { id: "never-waive-warning", label: "Never Waive the Contingency" },
      { id: "sources", label: "Sources" },
      { id: "cta-links", label: "CTA Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/appraisal-guide", label: "Appraisal Guide", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "key-stats", label: "Key Stats" },
      { id: "what-is-appraisal", label: "What Is a Home Appraisal" },
      { id: "what-appraisers-evaluate", label: "What Appraisers Evaluate" },
      { id: "low-appraisal", label: "When the Appraisal Comes In Low", subs: [{ id: "intro", label: "Low Appraisal Intro" }, { id: "options", label: "Resolution Options" }] },
      { id: "comparison", label: "Appraisal vs. Inspection vs. CMA" },
      { id: "gap-coverage", label: "Appraisal Gap Coverage" },
      { id: "tips", label: "Tips for a Smooth Appraisal" },
      { id: "sources", label: "Sources" },
      { id: "related-links", label: "Related Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/homeowners-insurance", label: "Homeowners Insurance", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro-callout", label: "Intro: Protect Your Home Callout" },
      { id: "comparison", label: "Homeowner's vs Title Insurance", subs: [{ id: "side-by-side-cards", label: "Side-by-Side Cards" }, { id: "comparison-table", label: "Head-to-Head Comparison Table" }, { id: "real-world-scenarios", label: "Real-World Scenarios" }, { id: "without-each", label: "What Happens Without Each" }, { id: "bottom-line", label: "Bottom Line: You Need Both" }] },
      { id: "what-it-covers", label: "What Homeowner's Insurance Covers" },
      { id: "what-it-does-not-cover", label: "What It Does NOT Cover" },
      { id: "how-to-shop", label: "How to Shop" },
      { id: "cost-breakdown", label: "What Does It Cost?" },
      { id: "declarations-page", label: "Understanding Your Declarations Page" },
      { id: "how-to-file-claim", label: "How to File a Claim" },
      { id: "cta-links", label: "CTA Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/property-rights", label: "Property Rights", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "bundle-of-rights", label: "The Bundle of Rights", subs: [{ id: "intro", label: "Intro" }, { id: "rights-grid", label: "Five Rights Grid" }] },
      { id: "limitations", label: "What Can Limit Your Rights", subs: [{ id: "intro", label: "Intro" }, { id: "limitations-grid", label: "Limitations Grid" }] },
      { id: "fair-housing", label: "Fair Housing Act Protections", subs: [{ id: "intro", label: "Intro" }, { id: "classes-and-violations", label: "Protected Classes & Violations" }, { id: "filing-and-state", label: "Filing a Complaint & State Protections" }] },
      { id: "mineral-rights", label: "Mineral Rights & Surface Rights", subs: [{ id: "intro", label: "Intro" }, { id: "accordions", label: "Split Estate Accordions" }] },
      { id: "transaction-rights", label: "Rights During a Transaction", subs: [{ id: "intro", label: "Intro" }, { id: "rights-list", label: "Transaction Rights List" }] },
      { id: "adverse-possession", label: "Adverse Possession & Boundary Disputes", subs: [{ id: "intro", label: "Intro" }, { id: "requirements-and-prevention", label: "Requirements & Prevention" }] },
      { id: "protecting-rights", label: "Protecting Your Property Rights", subs: [{ id: "intro", label: "Intro" }, { id: "steps", label: "Protection Steps" }] },
      { id: "legal-disclaimer", label: "Legal Disclaimer" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/protect-your-rights", label: "Title Insurance & Property Rights", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro-banner", label: "Intro Banner" },
      { id: "rights-checklist", label: "Your Rights Checklist" },
      { id: "policy-distinction", label: "Lender's vs Owner's Policy", subs: [{ id: "lenders-policy", label: "Lender's Policy" }, { id: "owners-policy", label: "Owner's Policy" }] },
      { id: "what-protects-against", label: "What Title Insurance Protects Against" },
      { id: "case-studies", label: "Real-Life Cases" },
      { id: "title-search-process", label: "How the Title Search Process Works" },
      { id: "covered-risks", label: "What Your Owner's Policy Covers" },
      { id: "cost-math", label: "The Math: Why It's Worth It" },
      { id: "cost-and-claims", label: "Cost & Filing a Claim", subs: [{ id: "cost-shopping", label: "Cost & Right to Shop" }, { id: "filing-claim", label: "Filing a Claim" }] },
      { id: "cta-links", label: "CTA Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/protect-your-money", label: "Wire Fraud Overview", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Don't Become a Victim Intro" },
      { id: "fraud-timeline", label: "Wire Fraud Timeline" },
      { id: "critical-warning", label: "Critical Warning" },
      { id: "safeguards", label: "Fraud Flow & Safeguards" },
      { id: "legit-vs-fraud", label: "Legitimate vs Fraudulent Communications", subs: [{ id: "legitimate", label: "Legitimate Title Company" }, { id: "fraudulent", label: "Fraudulent Communication" }] },
      { id: "title-company-checklist", label: "What Your Title Company Should Be Doing" },
      { id: "recovery-timeline", label: "Victim Recovery Timeline", subs: [{ id: "recovery-rates", label: "Recovery Rate Stats" }, { id: "immediate-steps", label: "Immediate Steps If You Suspect Fraud" }] },
      { id: "cta-links", label: "CTA Action Links" },
      { id: "related", label: "Related Topics", subs: [{ id: "deed-fraud-callout", label: "Deed Fraud Protection Callout" }, { id: "related-topics", label: "Related Topics Grid" }] },
    ],
  },
  {
    route: "/protect-against-deed-fraud", label: "Protect Against Title Fraud", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Consumer Protection Guide Intro" },
      { id: "what-is-it", label: "What Is Title Fraud?" },
      { id: "why-it-matters", label: "Why This Matters" },
      { id: "title-insurance", label: "What Title Insurance Covers" },
      { id: "free-monitoring", label: "Free Monitoring Setup" },
      { id: "county-lookup", label: "County Lookup Tool" },
      { id: "call-script", label: "Phone Call Script" },
      { id: "safe-sender", label: "Safe Sender Setup" },
      { id: "additional-steps", label: "Additional Protection Steps" },
      { id: "if-targeted", label: "If You're Targeted" },
      { id: "paid-services", label: "Paid Monitoring Services" },
      { id: "toolkit", label: "Protection Toolkit" },
      { id: "disclaimer", label: "Disclaimer" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/deed-theft", label: "Title Theft & Title Fraud", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "what-is-title-theft", label: "What Is Title Theft?" },
      { id: "stats", label: "Stats Bar" },
      { id: "how-it-happens", label: "How Title Theft Happens" },
      { id: "warning-signs", label: "Warning Signs" },
      { id: "how-to-protect", label: "How to Protect Yourself", subs: [{ id: "title-lock-note", label: "A Note About Title Lock Services" }] },
      { id: "comparison", label: "Title Lock vs. Title Insurance", subs: [{ id: "title-lock", label: "Title Lock Services Card" }, { id: "title-insurance", label: "Owner's Title Insurance Card" }] },
      { id: "victim-steps", label: "What to Do If You're a Victim" },
      { id: "role-of-title-insurance", label: "The Role of Title Insurance" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/stop-fraud", label: "Stop Fraud", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Fraud Prevention Toolkit Intro" },
      { id: "emergency", label: "What To Do Right Now If You're a Victim" },
      { id: "prevention-steps", label: "10 Steps to Prevent Wire Fraud" },
      { id: "if-victim", label: "If You Suspect You're a Victim" },
      { id: "where-to-report", label: "Where to Report Fraud" },
      { id: "scenarios", label: "3 Real Fraud Scenarios" },
      { id: "safety-checklist", label: "Wire Transfer Safety Checklist" },
      { id: "cta-links", label: "CTA Links Row" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/identity-protection", label: "Identity Protection", navGroup: "Protection",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro Callout" },
      { id: "why-vulnerable", label: "Why Real Estate Makes You Vulnerable" },
      { id: "who-has-info", label: "Who Has Your Information", subs: [{ id: "you-node", label: "You (The Buyer) Node" }, { id: "parties-grid", label: "Parties Grid" }] },
      { id: "how-to-protect", label: "How to Protect Yourself" },
      { id: "after-closing", label: "After-Closing Identity Checklist" },
      { id: "red-flags", label: "Red Flags During Your Transaction" },
      { id: "resources", label: "Identity Protection Resources" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/hoa-guide", label: "HOA Guide", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "what-is-hoa", label: "What is an HOA" },
      { id: "by-the-numbers", label: "HOA by the Numbers" },
      { id: "pros-cons", label: "Honest Pros and Cons", subs: [{ id: "advantages", label: "Advantages" }, { id: "disadvantages", label: "Disadvantages" }] },
      { id: "cost-comparison", label: "Cost Comparison by Property Type" },
      { id: "budget-calculator", label: "Budget Impact Calculator" },
      { id: "what-fees-cover", label: "What HOA Fees Cover" },
      { id: "red-flags", label: "Red Flags Before Buying" },
      { id: "special-assessments", label: "Special Assessments Explained", subs: [{ id: "how-they-happen", label: "How They Happen" }, { id: "your-rights", label: "Your Rights" }] },
      { id: "trends", label: "2025-2026 HOA Trends", subs: [{ id: "legislative-updates", label: "New State Laws" }] },
      { id: "questions-to-ask", label: "Questions to Ask" },
      { id: "insurance", label: "HOA Insurance Explained", subs: [{ id: "master-policy-covers", label: "Master Policy Covers" }, { id: "not-covered", label: "What It Does Not Cover" }, { id: "ho6-policy", label: "HO-6 Policy for Condo Owners" }] },
      { id: "your-rights", label: "Your Rights as a Member" },
      { id: "dispute-resolution", label: "Dispute Resolution Steps" },
      { id: "resources", label: "HOA Resources" },
      { id: "print-save", label: "Print / Save" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/after-closing", label: "After Closing", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "toolbar", label: "Print & Save Toolbar" },
      { id: "first-24-hours", label: "First 24 Hours" },
      { id: "first-week", label: "First Week" },
      { id: "first-month", label: "First Month" },
      { id: "seasonal-maintenance", label: "First Year: Seasonal Maintenance" },
      { id: "documents-to-keep", label: "Documents to Keep Forever" },
      { id: "hidden-costs", label: "Hidden Costs of Homeownership" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/tax-benefits", label: "Tax Benefits", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Introduction" },
      { id: "table-of-contents", label: "On This Page (Table of Contents)" },
      { id: "tax-benefits-list", label: "Tax Benefit Sections" },
      { id: "itemize-check", label: "Am I Better Off Itemizing? Calculator" },
      { id: "disclaimer", label: "Important Disclaimer" },
      { id: "sources", label: "IRS Sources & References" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/negotiation-guide", label: "Negotiation Guide", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "negotiable-costs", label: "Closing Costs You Can Negotiate" },
      { id: "non-negotiable-costs", label: "Closing Costs You Cannot Negotiate" },
      { id: "seller-concessions", label: "Seller Concessions", subs: [{ id: "concession-limits", label: "Max Concession Limits by Loan Type" }, { id: "how-to-ask", label: "How to Ask for Seller Concessions" }] },
      { id: "repair-credits", label: "Repair Credits vs. Repairs", subs: [{ id: "calculate-credit", label: "How to Calculate a Fair Credit Amount" }] },
      { id: "rate-buydown", label: "Rate Buydown Options", subs: [{ id: "permanent-buydown", label: "Permanent Buydown (Points)" }, { id: "temporary-buydown", label: "Temporary Buydown (2-1 / 3-2-1)" }, { id: "when-each-makes-sense", label: "When Does Each Make Sense?" }] },
      { id: "negotiation-timeline", label: "Negotiation Timeline", subs: [{ id: "deadline-warning", label: "Contingency Deadline Warning" }] },
      { id: "common-mistakes", label: "Common Negotiation Mistakes" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/questions-to-ask", label: "Questions to Ask", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro & Print Toolbar" },
      { id: "question-sections", label: "Question Categories" },
      { id: "conversation-tips", label: "Tips for Your Conversation" },
      { id: "cta", label: "First-Time Buyer CTA" },
    ],
  },
  {
    route: "/document-checklist", label: "Document Checklist", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "tabs", label: "Tab Bar & Closing Disclosure" },
      { id: "checklist-intro", label: "Checklist Intro Callout" },
      { id: "checklist-actions", label: "Print & Save Actions" },
      { id: "doc-sections", label: "Document Checklist Sections" },
      { id: "timeline", label: "Pre-Closing Document Timeline" },
      { id: "common-mistakes", label: "Common Document Mistakes" },
      { id: "cta-links", label: "CTA Links" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/document-library", label: "Document Library", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "tab-bar", label: "Tab Bar (Documents / Resources)" },
      { id: "intro", label: "Intro Callout" },
      { id: "stats", label: "Document Count Summary" },
      { id: "document-sections", label: "Document Sections" },
      { id: "actions", label: "Action Buttons" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/glossary", label: "Glossary", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "toolbar", label: "Search Toolbar", subs: [{ id: "intro", label: "Dictionary Intro" }, { id: "search", label: "Search & My List" }, { id: "letter-nav", label: "Letter Navigation" }, { id: "category-filter", label: "Category Filters" }, { id: "count", label: "Results Count" }] },
      { id: "term-of-the-day", label: "Term of the Day" },
      { id: "most-searched", label: "Most Searched Terms" },
      { id: "results", label: "Glossary Results" },
      { id: "empty-state", label: "No Results State" },
    ],
  },
  {
    route: "/faq", label: "FAQ", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Page Intro" },
      { id: "toolbar", label: "Search & Filters", subs: [{ id: "category-filters", label: "Category Filters" }] },
      { id: "faq-results", label: "FAQ Results" },
      { id: "need-more-help", label: "Need More Help" },
      { id: "still-have-questions", label: "Still Have Questions" },
    ],
  },
  { route: "/resources", label: "Resources", navGroup: "Resources", sections: [] },
  {
    route: "/trivia", label: "Trivia", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "scoreboard", label: "Scoreboard" },
      { id: "game-over", label: "Game Over Screen", subs: [{ id: "results-stats", label: "Results Stats Grid" }] },
      { id: "jeopardy-board", label: "Jeopardy Board" },
      { id: "how-to-play", label: "How to Play" },
      { id: "achievements", label: "Achievements" },
    ],
  },
  {
    route: "/find-company", label: "Find a Company", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Find a Trusted Title Professional Intro" },
      { id: "search", label: "Search ALTA Member Directory" },
      { id: "five-questions", label: "5 Questions to Ask" },
      { id: "results", label: "Search Results", subs: [{ id: "directory-iframe", label: "Directory Results (iframe)" }, { id: "best-practices-callout", label: "Best Practices Callout" }, { id: "empty-state", label: "Empty State" }] },
      { id: "respa-note", label: "RESPA Did You Know" },
      { id: "why-alta", label: "Why ALTA Membership Matters" },
      { id: "tips", label: "Tips for Choosing a Title Company" },
      { id: "right-to-shop", label: "Your Right to Shop" },
      { id: "sidebar", label: "Sponsor Sidebar" },
      { id: "tip-modal", label: "Tip Detail Modal" },
    ],
  },
  {
    route: "/find-policy", label: "Find a Policy", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "Intro: 3 Ways to Locate" },
      { id: "quick-stats", label: "Quick Stats" },
      { id: "steps", label: "Locate Steps" },
      { id: "interactive-map", label: "Interactive State Map" },
      { id: "compare-states", label: "Compare States" },
      { id: "calling-script", label: "Calling Script" },
      { id: "directory", label: "State Insurance Directory" },
      { id: "notes", label: "Notes & Disclaimer" },
    ],
  },
  {
    route: "/blog", label: "Blog", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro-banner", label: "Verified News Intro Banner" },
      { id: "filter-toolbar", label: "Category Filter Tabs" },
      { id: "articles", label: "Articles Results" },
      { id: "explore-more", label: "Explore More Links" },
      { id: "subscribe", label: "Subscribe Callout" },
    ],
  },
  {
    route: "/sources", label: "Sources", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "commitment-banner", label: "Verified & Transparent Banner" },
      { id: "source-list", label: "Source Index List" },
      { id: "report-error", label: "Report an Error" },
    ],
  },
  {
    route: "/join-alta", label: "Join ALTA", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "intro", label: "ALTA Intro" },
      { id: "stats", label: "Stats Bar" },
      { id: "benefits", label: "Why Join ALTA" },
      { id: "about-alta", label: "About ALTA" },
      { id: "membership-types", label: "Who Can Join" },
      { id: "events", label: "Events & Conferences" },
      { id: "programs", label: "Programs & Initiatives" },
      { id: "education", label: "Education & Publications" },
      { id: "testimonials", label: "What Members Say" },
      { id: "why-members-stay", label: "Why Members Stay" },
      { id: "best-practices-pillars", label: "7 Best Practices Pillars" },
      { id: "cta", label: "Join CTA" },
    ],
  },
  {
    route: "/emergency-contacts", label: "Emergency Contacts", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "print-bar", label: "Print Bar" },
      { id: "wire-fraud-emergency", label: "Wire Fraud Emergency" },
      { id: "government-agencies", label: "Government Agencies" },
      { id: "industry-organizations", label: "Industry Organizations" },
      { id: "utility-setup", label: "Utility Setup" },
      { id: "tax-legal", label: "Tax & Legal" },
      { id: "my-transaction-contacts", label: "My Transaction Contacts" },
      { id: "bottom-actions", label: "Bottom Actions" },
      { id: "related-topics", label: "Related Topics" },
    ],
  },
  {
    route: "/support", label: "Support", navGroup: "General",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "contact", label: "Contact & Form", subs: [{ id: "info", label: "Info Column" }, { id: "how-we-help", label: "How Can We Help" }, { id: "before-you-write", label: "Before You Write" }, { id: "response-time", label: "Response Time" }, { id: "form", label: "Question Form" }] },
    ],
  },
  {
    route: "/my-folder", label: "My Closing Folder", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "print-header", label: "Print Header (branded)" },
      { id: "action-bar", label: "Action Bar (PDF / Clear All)" },
      { id: "empty-state", label: "Empty State" },
      { id: "loading-skeleton", label: "Loading Skeleton" },
      { id: "saved-items", label: "Saved Items (grouped results)" },
      { id: "print-footer", label: "Print Footer (branded)" },
    ],
  },
  {
    route: "/my-journey", label: "My Journey", navGroup: "Resources",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "journey", label: "Journey Tracker", subs: [{ id: "tracker", label: "Progress Tracker" }, { id: "cta", label: "First-Time Buyer CTA" }] },
    ],
  },
  { route: "/achievements", label: "Achievements", navGroup: "Resources", sections: [] },
];

export const NAV_GROUPS = ["General", "Closing Process", "Tools", "Protection", "Resources"];

/* ------------------------------------------------------------------ */
/*  Modules — global / feature / content components                    */
/*  (Brand shell — Header, Footer, AltaDisclaimer, nav — is NOT listed  */
/*   here: it is never toggleable.)                                     */
/* ------------------------------------------------------------------ */

export const MODULES: { key: string; label: string; category: string }[] = [
  { key: "NewsTicker", label: "News Ticker", category: "Global" },
  { key: "HomeClosingAI", label: "AI Assistant", category: "Global" },
  { key: "ScrollToTop", label: "Back to Top Button", category: "Global" },
  { key: "OnboardingTour", label: "First-Visit Onboarding", category: "Global" },
  { key: "SponsorFooterStrip", label: "Footer Sponsor Strip", category: "Global" },
  { key: "FirstTimeBuyerCTA", label: "First-Time Buyer CTA", category: "Global" },
  { key: "ClosingFolderButton", label: "My Folder Button", category: "Global" },
  { key: "FeedbackWidget", label: "Feedback Widget", category: "Global" },
  { key: "JourneyTracker", label: "Journey Tracker", category: "Features" },
  { key: "AchievementSystem", label: "Achievements", category: "Features" },
  { key: "ShareButtons", label: "Share Buttons", category: "Features" },
  { key: "MiniQuiz", label: "Mini Quizzes", category: "Features" },
  { key: "DarkMode", label: "Dark Mode Toggle", category: "Features" },
  { key: "SiteSearch", label: "Header Search", category: "Features" },
  { key: "HomepageTestimonials", label: "Homepage Testimonials", category: "Content" },
  { key: "MarketStats", label: "Market Stats Rotator", category: "Content" },
  { key: "FraudStats", label: "Fraud Statistics", category: "Content" },
  { key: "EscalationExplainer", label: "Deed Fraud Escalation", category: "Content" },
  { key: "CountyLookup", label: "County Lookup Tool", category: "Content" },
  { key: "ProtectionToolkit", label: "Deed Fraud Toolkit", category: "Content" },
];

export const MODULE_CATEGORIES = ["Global", "Features", "Content"];

/* ------------------------------------------------------------------ */
/*  Ad / sponsor formats                                               */
/* ------------------------------------------------------------------ */

export const ADS: { key: string; label: string }[] = [
  { key: "InlineAd", label: "Inline Ad" },
  { key: "ContextualSponsor", label: "Contextual Sponsor" },
  { key: "SponsorShowcase", label: "Sponsor Showcase" },
  { key: "StickyBottomAd", label: "Sticky Bottom Ad" },
  { key: "SponsorTip", label: "Sponsor Tip" },
  { key: "SponsorBadge", label: "Sponsor Badge" },
  { key: "TrustedALTAMembers", label: "ALTA Members Strip" },
  { key: "EliteProviders", label: "Footer Sponsors" },
];

/* ------------------------------------------------------------------ */
/*  Fundamentals — locked ON in every version, never toggleable        */
/* ------------------------------------------------------------------ */

export const FUNDAMENTALS: ReadonlySet<string> = new Set<string>([
  // Homepage
  "page:/", "nav:/",
  // Core closing education
  "page:/closing-process", "nav:/closing-process",
  // Find a Company (ALTA member directory / core value)
  "page:/find-company", "nav:/find-company",
  // Fraud-protection core
  "page:/protect-your-rights", "nav:/protect-your-rights",
  "page:/protect-against-deed-fraud", "nav:/protect-against-deed-fraud",
]);

export function isFundamental(key: string): boolean {
  return FUNDAMENTALS.has(key);
}

/* ------------------------------------------------------------------ */
/*  Key helpers                                                        */
/* ------------------------------------------------------------------ */

export const pageKey = (route: string) => `page:${route}`;
export const navKey = (route: string) => `nav:${route}`;
export const sectionKey = (route: string, id: string) => `section:${route}#${id}`;
export const subKey = (route: string, id: string, subId: string) =>
  `sub:${route}#${id}.${subId}`;
export const moduleKey = (name: string) => `module:${name}`;
export const adKey = (name: string) => `ad:${name}`;

/** Enumerate every known toggleable key in the site. */
export function allKeys(): string[] {
  const keys: string[] = [];
  for (const p of SITE_STRUCTURE) {
    keys.push(pageKey(p.route), navKey(p.route));
    for (const s of p.sections) {
      keys.push(sectionKey(p.route, s.id));
      for (const sub of s.subs ?? []) {
        keys.push(subKey(p.route, s.id, sub.id));
      }
    }
  }
  for (const m of MODULES) keys.push(moduleKey(m.key));
  for (const a of ADS) keys.push(adKey(a.key));
  return keys;
}
