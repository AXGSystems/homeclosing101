"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import ExpandableTile from "@/components/ExpandableTile";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────────────── */

const bundleOfRights = [
  {
    title: "Right of Possession",
    summary: "You hold legal title to the property.",
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
    detail:
      "When you close on a home and the deed is recorded in your name, you become the legal owner. This means the property is yours to occupy and live in. The deed — typically a warranty deed or grant deed — is your proof of ownership and is filed with the county recorder\u2019s office. As the legal titleholder, only you (or someone you authorize) can transfer, encumber, or otherwise deal with the property.",
  },
  {
    title: "Right of Control",
    summary: "You can use the property as you wish, within the law.",
    icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
    detail:
      "As the owner, you decide how the property is used — whether to live in it, rent it out, remodel the kitchen, or plant a garden. However, this right is not absolute. You must comply with local zoning laws, building codes, HOA rules (if applicable), and any deed restrictions. For example, a residential zoning designation means you generally cannot operate a commercial warehouse from your home.",
  },
  {
    title: "Right of Enjoyment",
    summary: "Peaceful use without outside interference.",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    detail:
      "This right guarantees your ability to use and enjoy your property without interference from others. If a neighbor continuously creates excessive noise, allows hazardous conditions, or otherwise disrupts your reasonable use, you may have legal recourse through nuisance claims. The covenant of quiet enjoyment, often included in deeds and leases, reinforces this right.",
  },
  {
    title: "Right of Exclusion",
    summary: "You can deny access to others, with limited exceptions.",
    icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
    detail:
      "You have the legal right to control who enters your property. You can refuse entry to anyone without your permission. Important exceptions exist: law enforcement with a valid warrant, utility workers with recorded easement rights, government inspectors in certain emergency or health/safety situations, and emergency responders. Trespassing laws protect this right — unauthorized entry onto your property can result in civil and criminal penalties.",
  },
  {
    title: "Right of Disposition",
    summary: "You can sell, lease, transfer, or will the property.",
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    detail:
      "As the owner, you can dispose of your property however you choose — sell it on the open market, gift it to a family member, lease it to tenants, place it in a trust, or leave it to heirs in your will. The only limitations come from existing liens (like a mortgage, which must be satisfied at sale), court orders, or co-ownership agreements. If you own the property jointly, the other owner(s) must also agree to any transfer.",
  },
];

const limitations = [
  {
    title: "Zoning Laws",
    desc: "Local governments classify land as residential, commercial, industrial, agricultural, or mixed-use. Zoning dictates what you can build, how tall structures can be, setback requirements, and what activities are permitted. Rezoning requests are possible but require public hearings and approval.",
    icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  },
  {
    title: "HOA CC&Rs",
    desc: "If your property is in a homeowners association, you are bound by its Covenants, Conditions & Restrictions (CC&Rs). These can regulate exterior paint colors, landscaping, fencing, parking, rental restrictions, and more. CC&Rs run with the land — they apply to all future owners too.",
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
  },
  {
    title: "Easements",
    desc: "An easement grants someone else the right to use a portion of your property for a specific purpose — such as a utility company accessing power lines, a neighbor using a shared driveway, or a drainage system running through your yard. Easements are typically recorded against the title and survive transfers of ownership.",
    icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  },
  {
    title: "Eminent Domain",
    desc: "Under the Fifth Amendment, the government can take private property for public use — roads, schools, utilities, infrastructure — but must provide \u201cjust compensation.\u201d The process typically involves an appraisal, a written offer, and negotiation. Property owners have the right to challenge the valuation and, in some cases, the stated public purpose.",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
  },
  {
    title: "Environmental Regulations",
    desc: "Federal, state, and local environmental laws can restrict what you do with your land. Wetlands are protected under the Clean Water Act, and development may be prohibited or heavily regulated. If endangered species inhabit your property, the Endangered Species Act may limit clearing or construction.",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    title: "Building Codes & Permits",
    desc: "Any structural modification, electrical work, plumbing change, or addition typically requires a building permit and must comply with local building codes. Unpermitted work can result in fines, forced demolition, and complications when selling the property. Always pull permits before major renovations.",
    icon: "M11.42 15.17l-5.648-3.261A1.5 1.5 0 005.25 13.26v5.68a1.5 1.5 0 00.772 1.314l5.648 3.261a1.5 1.5 0 001.46.039l5.898-3.102A1.5 1.5 0 0019.5 19.1V13.5a1.5 1.5 0 00-.772-1.314L13.08 8.925a1.5 1.5 0 00-1.46-.039L5.722 12.01",
  },
  {
    title: "Property Tax Liens",
    desc: "If you fail to pay property taxes, the local government can place a lien on your property. Prolonged nonpayment can lead to a tax sale, where the government sells your property to satisfy the debt. Keeping property taxes current is essential to protecting your ownership.",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    title: "Mortgage Lender Restrictions",
    desc: "Your mortgage agreement may contain clauses that restrict certain actions — such as requiring lender approval before making major structural changes, maintaining adequate insurance, or prohibiting commercial use. The due-on-sale clause gives the lender the right to demand full repayment if you transfer the property without approval.",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const fairHousingClasses = [
  "Race",
  "Color",
  "National Origin",
  "Religion",
  "Sex (including sexual orientation and gender identity)",
  "Familial Status (families with children under 18)",
  "Disability (physical or mental)",
];

const fairHousingViolations = [
  "Refuse to sell, rent, or negotiate housing",
  "Set different terms or conditions based on a protected class",
  "Falsely deny that housing is available",
  "Steer buyers toward or away from certain neighborhoods",
  "Discriminate in advertising (e.g., \u201cno children\u201d)",
  "Refuse reasonable accommodations for disabilities",
  "Retaliate against anyone filing a fair housing complaint",
];

const transactionRights = [
  {
    title: "Right to Choose Your Own Title Company",
    desc: "Under RESPA Section 9 (12 U.S.C. 2608), no seller may require a buyer to purchase title insurance from a particular company as a condition of the sale. You have the freedom to shop for and select the title company of your choice.",
    law: "RESPA Section 9",
  },
  {
    title: "Right to Receive a Loan Estimate Within 3 Business Days",
    desc: "After you submit a mortgage application, your lender must provide a Loan Estimate within 3 business days. This standardized form shows your estimated interest rate, monthly payment, closing costs, and other key loan terms.",
    law: "TRID Rule (12 CFR 1026.19(e))",
  },
  {
    title: "Right to Receive a Closing Disclosure 3 Days Before Closing",
    desc: "Your lender must deliver the Closing Disclosure at least 3 business days before your scheduled closing. This gives you time to review final costs, compare them to your Loan Estimate, and ask questions before signing.",
    law: "TRID Rule (12 CFR 1026.19(f))",
  },
  {
    title: "Right to Shop for Settlement Services",
    desc: "Your Loan Estimate includes a \u201cServices You Can Shop For\u201d section listing providers you can choose yourself — including title insurance, pest inspections, and surveys. Your lender cannot force you to use their preferred vendors for these services.",
    law: "TRID Rule (12 CFR 1026.19(e)(1)(vi))",
  },
  {
    title: "Right Against Kickbacks and Referral Fees",
    desc: "RESPA Section 8 (12 U.S.C. 2607) prohibits anyone from giving or receiving a fee, kickback, or anything of value in exchange for referring settlement service business. This protects you from inflated costs driven by behind-the-scenes payments.",
    law: "RESPA Section 8",
  },
  {
    title: "Right to File Complaints",
    desc: "If you believe a settlement service provider violated your rights, you can file a complaint with the Consumer Financial Protection Bureau (CFPB) at consumerfinance.gov/complaint, your state attorney general\u2019s office, or your state department of insurance.",
    law: "RESPA / Dodd-Frank Act",
  },
];

const protectionSteps = [
  {
    step: "1",
    title: "Get a Survey Before Closing",
    desc: "A professional land survey confirms property boundaries, identifies encroachments, and reveals easements. It protects you from boundary disputes and ensures you know exactly what you are buying. Many lenders require one; even if yours does not, it is a smart investment.",
  },
  {
    step: "2",
    title: "Get Owner\u2019s Title Insurance",
    desc: "An owner\u2019s title insurance policy protects you against hidden title defects like liens, fraud, forgery, and recording errors. It is a one-time fee paid at closing that covers you for as long as you or your heirs own the property. Do not confuse this with the lender\u2019s policy, which only protects the bank.",
  },
  {
    step: "3",
    title: "Record Your Deed Properly",
    desc: "After closing, your deed must be recorded with the county recorder\u2019s office to provide public notice of your ownership. Your title company or closing attorney typically handles this, but confirm it was done. An unrecorded deed can leave your ownership vulnerable to competing claims.",
  },
  {
    step: "4",
    title: "Keep Property Tax Payments Current",
    desc: "Delinquent property taxes create a lien that takes priority over nearly all other claims, including your mortgage. Prolonged nonpayment can result in a tax sale. If your taxes are escrowed, verify your lender is making payments on time.",
  },
  {
    step: "5",
    title: "Address Encroachments Promptly",
    desc: "If a neighbor\u2019s fence, shed, driveway, or landscaping extends onto your property, address it immediately. Ignoring encroachments can, over time, lead to adverse possession claims or permanent easements by prescription.",
  },
  {
    step: "6",
    title: "Maintain Your Boundaries",
    desc: "Walk your property lines periodically. Repair or replace boundary markers and fences. If you notice changes \u2014 a neighbor moving a fence line, new construction near a boundary \u2014 have a surveyor confirm the line and document your concerns in writing.",
  },
];

/* ──────────────────────────────────────────────────────────────────────
   ACCORDION COMPONENT (section-level)
   ────────────────────────────────────────────────────────────────────── */

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[var(--border-color)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-[var(--bg-secondary)] hover:bg-alta-light/60 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-alta-navy text-sm sm:text-base">{title}</span>
        <svg
          className={`w-5 h-5 text-alta-teal shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────────────── */

export default function PropertyRightsPage() {
  return (
    <>
      <PageHero
        title="Your Property Rights: What Every Homeowner Should Know"
        subtitle="Understanding your rights as a property owner is essential to protecting your investment, your family, and your future. This guide covers the fundamental rights that come with homeownership, what can limit them, and how to protect them."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "Protect Your Property", href: "/protect-your-rights" },
          { label: "Property Rights", href: "/property-rights" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ── SECTION 1: Bundle of Rights ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">The Bundle of Rights</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            Property ownership in the United States is often described as a &quot;bundle of rights&quot; &mdash; five fundamental legal rights that come with holding title to real property. Think of it as five sticks in a bundle: together, they represent full ownership. Each right can be separated, transferred, or limited under certain circumstances.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
            {bundleOfRights.map((right) => (
              <ExpandableTile
                key={right.title}
                expandedTitle={right.title}
                expandedContent={
                  <div>
                    <p className="text-sm text-alta-gray leading-relaxed">{right.detail}</p>
                  </div>
                }
                className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2d6b3f]/10 flex items-center justify-center text-[#2d6b3f] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={right.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-alta-navy">{right.title}</h3>
                    <p className="text-xs text-alta-gray leading-relaxed mt-1">{right.summary}</p>
                  </div>
                </div>
              </ExpandableTile>
            ))}
          </div>

          {/* ── SECTION 2: What Can Limit Your Rights ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">What Can Limit Your Property Rights</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            Owning property does not mean unlimited freedom. Federal, state, and local laws &mdash; as well as private agreements &mdash; can restrict what you can do with your property. Understanding these limitations before you buy can prevent costly surprises.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-14">
            {limitations.map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] shadow-sm tile-interactive">
                <div className="w-9 h-9 rounded-lg bg-[#8b6914]/10 flex items-center justify-center text-[#8b6914] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-alta-navy">{item.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* ── SECTION 3: Fair Housing Act ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2 mt-10">Fair Housing Act Protections</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            The Fair Housing Act (Title VIII of the Civil Rights Act of 1968, as amended) prohibits discrimination in the sale, rental, and financing of housing based on protected characteristics. The law applies to most housing transactions and is enforced by the U.S. Department of Housing and Urban Development (HUD).
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {/* Protected Classes */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
              <h3 className="font-bold text-alta-navy mb-3 text-lg">Federally Protected Classes</h3>
              <p className="text-xs text-alta-gray mb-3 leading-relaxed">
                Under the Fair Housing Act, it is illegal to discriminate against any person based on:
              </p>
              <ul className="space-y-2">
                {fairHousingClasses.map((cls) => (
                  <li key={cls} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded border-2 border-alta-teal flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-alta-navy">{cls}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What They Cannot Do */}
            <div className="p-5 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200">
              <h3 className="font-bold text-alta-navy mb-3 text-lg">What Sellers &amp; Agents CANNOT Do</h3>
              <ul className="space-y-2">
                {fairHousingViolations.map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#943030] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-alta-gray">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to file + state protections */}
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200">
              <h3 className="font-bold text-alta-navy mb-2">How to File a Fair Housing Complaint</h3>
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                If you believe you have been discriminated against, you can file a complaint with HUD within one year of the alleged violation:
              </p>
              <ul className="text-sm text-alta-gray space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-alta-teal font-bold">-</span>
                  <span>Call the HUD Fair Housing Hotline: <strong className="text-alta-navy">1-800-669-9777</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-alta-teal font-bold">-</span>
                  <span>TTY: <strong className="text-alta-navy">1-800-927-9275</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-alta-teal font-bold">-</span>
                  <span>
                    Online:{" "}
                    <a href="https://www.hud.gov/program_offices/fair_housing_equal_opp/online-complaint" target="_blank" rel="noopener noreferrer" className="text-alta-teal underline font-semibold">
                      hud.gov/fairhousing
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200">
              <h3 className="font-bold text-alta-navy mb-2">State &amp; Local Protections</h3>
              <p className="text-sm text-alta-gray leading-relaxed">
                Many states and localities extend fair housing protections beyond federal law. Additional protected classes may include source of income, marital status, sexual orientation, gender identity, age, veteran status, or student status. Check with your state&apos;s civil rights agency or local human rights commission to understand the full scope of protections in your area.
              </p>
            </div>
          </div>

          {/* ── SECTION 4: Mineral Rights ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Mineral Rights &amp; Surface Rights</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            When you buy a home, you might assume you own everything above and below the surface. That is not always the case. In the United States, property rights can be &quot;split&quot; &mdash; meaning one person can own the surface (your house, yard, and structures) while someone else owns the subsurface mineral rights (oil, gas, coal, metals, and other resources).
          </p>

          <div className="space-y-4 mb-14">
            <Accordion title="What Is a &quot;Split Estate&quot;?">
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                A split estate occurs when the surface rights and mineral rights are owned by different parties. This is common in states with significant oil, gas, or mining activity &mdash; including Texas, Colorado, Wyoming, Pennsylvania, North Dakota, and West Virginia.
              </p>
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                In a split estate, the mineral rights owner may have the legal right to access the surface to extract resources &mdash; even without the surface owner&apos;s consent. This is because mineral rights are generally considered the &quot;dominant estate,&quot; meaning they take priority over surface rights in disputes about access.
              </p>
              <p className="text-sm text-alta-gray leading-relaxed">
                If you are buying rural or semi-rural property, this is one of the most important things to investigate before closing.
              </p>
            </Accordion>

            <Accordion title="How to Check If You Own Mineral Rights">
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                Determining mineral rights ownership requires a careful examination of the property&apos;s title history:
              </p>
              <ul className="text-sm text-alta-gray space-y-1.5 mb-3">
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">1.</span><span><strong className="text-alta-navy">Review the deed language.</strong> Look for phrases like &quot;reserving all mineral rights&quot; or &quot;excepting oil, gas, and other minerals.&quot; These indicate a prior owner retained mineral rights.</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">2.</span><span><strong className="text-alta-navy">Order a title search.</strong> A thorough title search should trace mineral rights through the chain of title. Ask your title company specifically about mineral reservations.</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">3.</span><span><strong className="text-alta-navy">Check county records.</strong> Mineral deeds and leases are recorded separately from surface deeds. Search the county recorder&apos;s office for mineral conveyances.</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">4.</span><span><strong className="text-alta-navy">Consult a land attorney.</strong> If there is any ambiguity, a real estate attorney experienced in mineral rights can provide clarity.</span></li>
              </ul>
            </Accordion>

            <Accordion title="Impact on Rural Properties">
              <p className="text-sm text-alta-gray leading-relaxed mb-3">
                Severed mineral rights can significantly affect rural property values and usability. Potential impacts include:
              </p>
              <ul className="text-sm text-alta-gray space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span>Drilling rigs, access roads, and pipelines placed on your land without your permission</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span>Noise, dust, and environmental disruption from extraction activities</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span>Reduced property value or difficulty selling due to active mineral leases</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span>Potential liability concerns related to contamination or surface damage</span></li>
              </ul>
              <p className="text-sm text-alta-gray leading-relaxed mt-3">
                Some states require mineral rights holders to negotiate a surface use agreement before accessing the land. Others do not. Know your state&apos;s rules.
              </p>
            </Accordion>
          </div>

          <InlineAd />

          {/* ── SECTION 5: Transaction Rights ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2 mt-10">Your Rights During a Real Estate Transaction</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            Federal law provides specific protections for homebuyers during the closing process. The Real Estate Settlement Procedures Act (RESPA) and the TILA-RESPA Integrated Disclosure (TRID) rule ensure transparency, fair dealing, and your right to shop for services.
          </p>

          <div className="space-y-3 mb-14">
            {transactionRights.map((right) => (
              <div key={right.title} className="flex items-start gap-4 p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] shadow-sm tile-interactive">
                <div className="w-5 h-5 rounded border-2 border-alta-teal flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-alta-navy">{right.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-1">{right.desc}</p>
                  <p className="text-[10px] text-alta-teal font-medium mt-1">{right.law}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 6: Adverse Possession ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Adverse Possession &amp; Boundary Disputes</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            Adverse possession is a legal doctrine that allows someone to claim ownership of land they have occupied openly, continuously, and without the owner&apos;s permission for a statutory period &mdash; typically between 5 and 20 years, depending on the state. It sounds unlikely, but it happens more often than most homeowners realize, particularly with boundary encroachments.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-14">
            <div className="p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-200">
              <h3 className="font-bold text-alta-navy mb-3">Requirements for Adverse Possession</h3>
              <p className="text-xs text-alta-gray mb-3 leading-relaxed">
                For someone to claim adverse possession, their use of the land must generally be:
              </p>
              <ul className="text-sm text-alta-gray space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span><strong className="text-alta-navy">Open and notorious</strong> &mdash; visible, not hidden</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span><strong className="text-alta-navy">Actual</strong> &mdash; they physically use the land (building, farming, fencing)</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span><strong className="text-alta-navy">Exclusive</strong> &mdash; not shared with the true owner</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span><strong className="text-alta-navy">Continuous</strong> &mdash; uninterrupted for the statutory period</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">-</span><span><strong className="text-alta-navy">Hostile</strong> &mdash; without the owner&apos;s permission (some states also require good-faith belief of ownership)</span></li>
              </ul>
            </div>

            <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200">
              <h3 className="font-bold text-alta-navy mb-3">How to Prevent &amp; Resolve</h3>
              <ul className="text-sm text-alta-gray space-y-2">
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">1.</span><span><strong className="text-alta-navy">Get a survey</strong> before closing and whenever you suspect a boundary issue</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">2.</span><span><strong className="text-alta-navy">Inspect your property</strong> regularly &mdash; walk the boundaries at least annually</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">3.</span><span><strong className="text-alta-navy">Address encroachments immediately</strong> &mdash; send a written notice and, if necessary, grant a revocable license to prevent adverse claims</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">4.</span><span><strong className="text-alta-navy">Communicate with neighbors</strong> &mdash; many boundary disputes are resolved amicably through conversation and a shared survey</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">5.</span><span><strong className="text-alta-navy">Mediation first</strong> &mdash; boundary disputes can often be resolved through mediation, which is faster and cheaper than litigation</span></li>
                <li className="flex items-start gap-2"><span className="text-alta-teal font-bold">6.</span><span><strong className="text-alta-navy">Consult an attorney</strong> if an encroachment is significant, longstanding, or the neighbor refuses to cooperate</span></li>
              </ul>
            </div>
          </div>

          {/* ── SECTION 7: Protecting Your Rights ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Protecting Your Property Rights</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">
            The best way to protect your property rights is to be proactive. These six steps can prevent the most common threats to homeownership.
          </p>

          <div className="space-y-3 mb-10">
            {protectionSteps.map((s) => (
              <div key={s.step} className="flex gap-4 items-start p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] shadow-sm tile-interactive">
                <span className="w-8 h-8 rounded-full bg-[#2d6b3f] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-bold text-alta-navy text-sm">{s.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* ── Legal Disclaimer ── */}
          <div className="mt-10 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-alta-gray shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div>
                <h3 className="text-sm font-bold text-alta-navy mb-1">Legal Disclaimer</h3>
                <p className="text-xs text-alta-gray leading-relaxed">
                  The information on this page is for general educational purposes only and does not constitute legal advice. Property rights, fair housing protections, mineral rights, adverse possession rules, and other legal topics vary significantly by state and locality. For advice specific to your situation, consult a licensed real estate attorney in your jurisdiction.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* ── Related Topics ── */}
          <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/protect-your-rights" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Property Rights</h3>
              <p className="text-[10px] text-alta-gray mt-1">How owner&apos;s title insurance protects against hidden threats</p>
            </Link>
            <Link href="/protect-your-money" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Money</h3>
              <p className="text-[10px] text-alta-gray mt-1">Recognize and prevent wire fraud targeting homebuyers at closing</p>
            </Link>
            <Link href="/closing-process" className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">The Closing Process</h3>
              <p className="text-[10px] text-alta-gray mt-1">Step-by-step guide to what happens on closing day</p>
            </Link>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
