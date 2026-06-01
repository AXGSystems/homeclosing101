"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import SponsorTip from "@/components/SponsorTip";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import ExpandableTile from "@/components/ExpandableTile";

const howItHappens = [
  {
    title: "Forged Quitclaim Deeds",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    summary: "Criminals forge quitclaim deeds using stolen identities to transfer property ownership to themselves.",
    detail: "A quitclaim deed transfers whatever ownership interest a person has in a property — without warranties. Criminals exploit this by forging a quitclaim deed in the real owner's name, using stolen or fabricated identity documents. The forged deed is recorded at the county recorder's office, and the criminal then appears as the legal owner. They may take out loans against the property or sell it to an unsuspecting buyer before the real owner discovers what happened.",
    source: "FBI / ALTA",
  },
  {
    title: "Seller Impersonation",
    icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    summary: "54% of real estate agents encountered seller impersonation in 2023 — criminals pose as property owners to sell homes they don't own.",
    detail: "Seller impersonation fraud occurs when a criminal poses as a property owner to initiate a sale. According to CertifID's 2023 State of Wire Fraud report, 54% of real estate agents encountered seller impersonation fraud. The criminal typically targets vacant properties or homes owned by out-of-state owners, uses fake IDs, and works with unsuspecting agents and title companies. They push for quick closings and wire transfers before the real owner is alerted.",
    source: "CertifID 2023 State of Wire Fraud Report",
  },
  {
    title: "Vacant Property Targeting",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    summary: "Out-of-state owners, vacant lots, and inherited properties are prime targets for title theft schemes.",
    detail: "Criminals specifically target properties where the owner is unlikely to notice suspicious activity: vacant land, rental properties managed by third parties, homes owned by elderly individuals in care facilities, and properties owned by out-of-state or overseas owners. These properties are identified through public records, and criminals exploit the fact that the real owner may not receive or notice county correspondence about title changes. Inherited properties in probate are also frequent targets.",
    source: "ALTA / FBI IC3",
  },
  {
    title: "Deepfake Voice & Video Impersonation",
    icon: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    summary: "AI-generated deepfake audio and video are being used to impersonate sellers and authorize transactions in virtual closings.",
    detail: "As remote and virtual closings have become more common, criminals are using AI-generated deepfake technology to impersonate property owners on video calls. They use publicly available photos and voice samples from social media to create convincing fake video and audio. In some cases, deepfake callers have authorized wire transfers and approved closing documents while impersonating the real property owner. This is an emerging and rapidly growing threat as AI tools become more accessible.",
    source: "NAR / Entrust 2026 Identity Fraud Report",
  },
  {
    title: "Synthetic Identity Fraud with AI Documents",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
    summary: "Criminals use AI to generate realistic fake driver's licenses, notary stamps, and supporting documents to complete fraudulent property transfers.",
    detail: "Synthetic identity fraud combines real and fabricated information to create entirely new identities. Criminals use AI tools to generate realistic government IDs, notary stamps, and supporting documentation that can pass casual inspection. These synthetic identities are used to impersonate property owners, forge deeds, and even create fake notarized documents. The quality of AI-generated documents has improved dramatically, making visual inspection alone insufficient to detect fraud.",
    source: "ALTA / FBI IC3",
  },
];

const warningSigns = [
  {
    sign: "Unexpected property tax bills or notices",
    detail: "If you receive tax bills for amounts you don't recognize, or notices about delinquent taxes you've been paying, someone may have altered your property records.",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    sign: "Mail addressed to unknown people at your address",
    detail: "Receiving mail — especially financial or legal documents — for people you don't know at your property address could indicate someone has used your address in a fraudulent filing.",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    sign: "Unfamiliar liens or mortgages on your title report",
    detail: "If a title search reveals liens, mortgages, or encumbrances you never authorized, it could mean someone took out a loan against your property using a forged deed.",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  {
    sign: "Notice of sale or foreclosure you didn't initiate",
    detail: "If you receive a foreclosure notice or learn your property has been listed for sale without your knowledge, act immediately — this is a strong indicator of title theft.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    sign: "Changes to your property records you didn't authorize",
    detail: "If your name has been removed from the deed, or a new deed has been recorded transferring your property, contact your county recorder and an attorney immediately.",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
];

const protectionSteps = [
  {
    title: "Monitor Your County Recorder's Office",
    desc: "Many county recorder offices offer free property fraud alert services. When any document is recorded against your property — a deed, lien, or mortgage — you receive an email or text notification. This is your first line of defense.",
    action: "Search for '[your county] property fraud alert' to find your local service.",
  },
  {
    title: "Get Owner's Title Insurance",
    desc: "Owner's title insurance is a one-time purchase at closing that protects you for as long as you or your heirs own the property. If someone files a forged deed, your title insurance company will pay for legal defense and cover financial losses. This is the only product that provides actual financial protection against deed fraud.",
    action: "Ask your title company about owner's title insurance at closing.",
  },
  {
    title: "Set Up Property Fraud Alerts",
    desc: "Beyond your county recorder, services like your county assessor's office and some title companies offer ongoing monitoring. Some will alert you when there are changes to your property tax records, ownership records, or when someone pulls a title search on your property.",
    action: "Contact your county assessor and your title company to ask about monitoring options.",
  },
  {
    title: "Check Your Property Records Annually",
    desc: "At least once a year, search your property records at your county recorder's website or office. Verify that you are still listed as the owner, no unfamiliar documents have been recorded, and no liens or mortgages have been placed without your knowledge.",
    action: "Set a calendar reminder to check your property records every year.",
  },
  {
    title: "Be Suspicious of Unsolicited Offers",
    desc: "If you receive unsolicited offers to buy your property — especially if the offer comes by mail, text, or email and seems unusually generous — be cautious. Criminals sometimes send fake offers as a pretext to gather personal information or to distract you while they file fraudulent documents.",
    action: "Never provide personal information in response to an unsolicited offer.",
  },
];

const comparisonData = {
  titleLock: {
    name: "Title Lock Services",
    cost: "$15 - $30 / month",
    type: "Monitoring service (ongoing subscription)",
    whatItDoes: [
      "Monitors your property title records for changes",
      "Sends you alerts if a new document is recorded",
      "May provide some assistance with identity restoration",
    ],
    whatItDoesNot: [
      "Does NOT prevent anyone from filing a fraudulent deed",
      "Does NOT pay for legal defense if your title is challenged",
      "Does NOT cover financial losses from title theft",
      "Does NOT remove fraudulent documents from your record",
      "Does NOT provide insurance coverage of any kind",
    ],
    verdict: "Title lock is essentially a monitoring service. Many county recorder offices offer similar free alert services. Title lock does NOT provide the financial protection of insurance.",
  },
  titleInsurance: {
    name: "Owner's Title Insurance",
    cost: "One-time premium at closing (typically $500 - $3,500 based on purchase price)",
    type: "Insurance policy (one-time purchase, lifetime coverage)",
    whatItDoes: [
      "Covers legal defense costs if your ownership is challenged",
      "Covers financial losses from covered title defects, including forged deeds",
      "Protects you for as long as you or your heirs own the property",
      "Backed by regulated insurance companies with financial reserves",
      "Covers a wide range of title defects beyond just deed fraud",
    ],
    whatItDoesNot: [
      "Does NOT actively monitor your title records for changes",
      "Does NOT send you alerts about new filings",
      "Does NOT cover issues that arise after the policy date (unless they stem from pre-policy events)",
    ],
    verdict: "Owner's title insurance is the only product that provides actual financial protection against deed fraud. It covers both legal defense and financial losses — something title lock services do not offer.",
  },
};

const victimSteps = [
  {
    step: "File a Police Report Immediately",
    detail: "Contact your local law enforcement and file a report. Get a copy of the report number — you will need it for every subsequent step.",
    timing: "Immediately",
  },
  {
    step: "Contact Your Title Insurance Company",
    detail: "If you have owner's title insurance, contact your insurer right away. They will assign legal counsel to protect your ownership and cover defense costs.",
    timing: "Same day",
  },
  {
    step: "File with the FBI IC3",
    detail: "Report the fraud at ic3.gov. The FBI's Internet Crime Complaint Center handles property fraud and can coordinate with federal agencies.",
    timing: "Same day",
  },
  {
    step: "Contact Your County Recorder",
    detail: "Ask the county recorder's office to flag the fraudulent deed. Some counties can place a fraud alert or affidavit on your property record to prevent further fraudulent filings.",
    timing: "Same day",
  },
  {
    step: "Consult a Real Estate Attorney",
    detail: "You will likely need a quiet title action — a court proceeding that establishes your rightful ownership and removes the fraudulent deed from the record. An attorney experienced in real estate fraud is essential.",
    timing: "Within 48 hours",
  },
];

export default function DeedTheftPage() {
  return (
    <>
      <PageHero
        title="Title Theft & Title Fraud: How to Protect Your Property"
        subtitle="Title theft — also called deed fraud — is one of the fastest-growing property crimes in America. Learn how criminals steal property ownership, the warning signs, and how to protect yourself."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
        breadcrumb={[
          { label: "Protect Your Property", href: "/protect-your-rights" },
          { label: "Title Theft & Title Fraud", href: "/deed-theft" },
        ]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* What is Title Theft */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-4">What Is Title Theft?</h2>
            <div className="p-5 bg-[#f5e8e8] rounded-2xl border border-[#e4c5c5] border-l-4 border-l-[#943030]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-alta-gray leading-relaxed mb-3">
                    <strong className="text-alta-navy">Title theft</strong>, also known as title fraud or deed fraud, occurs when someone forges a deed to transfer your property ownership without your knowledge or consent. The criminal records the forged deed at the county recorder&apos;s office, making it appear that they — or a shell company they control — are the legal owner of your property.
                  </p>
                  <p className="text-sm text-alta-gray leading-relaxed mb-3">
                    Once the fraudulent deed is recorded, the criminal can take out mortgages against your property, sell it to an unsuspecting buyer, or simply strip the equity. You may not discover the theft until you receive a foreclosure notice, try to sell or refinance, or notice unfamiliar charges on your property tax records.
                  </p>
                  <p className="text-sm text-alta-gray leading-relaxed">
                    The average cost of real estate fraud to victims is approximately <strong className="text-[#943030]">$172,000</strong>. Recovery can take months or years — and without owner&apos;s title insurance, the financial burden falls entirely on the victim.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { value: "$172K", label: "Average fraud loss", source: "FBI IC3" },
              { value: "54%", label: "Of agents saw seller impersonation", source: "CertifID 2023" },
              { value: "9,600+", label: "Title fraud complaints in 2023", source: "FBI IC3" },
              { value: "#1", label: "Fastest-growing property crime", source: "ALTA" },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-black text-[#943030]">{stat.value}</p>
                <p className="text-[10px] text-alta-gray font-medium mt-1">{stat.label}</p>
                <p className="text-[9px] text-alta-teal font-medium mt-0.5">{stat.source}</p>
              </div>
            ))}
          </div>

          {/* How It Happens — expandable tiles */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-2">How Title Theft Happens</h2>
            <p className="text-sm text-alta-gray mb-4">Click any tile to learn the full details of how criminals execute these schemes.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {howItHappens.map((item, i) => (
                <ExpandableTile
                  key={i}
                  expandedTitle={item.title}
                  expandedContent={
                    <div className="space-y-3">
                      <p className="text-sm text-alta-gray leading-relaxed">{item.detail}</p>
                      <p className="text-[10px] text-alta-teal font-medium">Source: {item.source}</p>
                    </div>
                  }
                  className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-alta-navy mb-1">{item.title}</h3>
                      <p className="text-xs text-alta-gray leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                </ExpandableTile>
              ))}
            </div>
          </section>

          <InlineAd />

          <SponsorTip context="fraud" />

          {/* Warning Signs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-4">Warning Signs Your Property May Be at Risk</h2>
            <div className="space-y-2">
              {warningSigns.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914]">
                  <div className="w-8 h-8 rounded-lg bg-[#8b6914]/10 flex items-center justify-center text-[#8b6914] shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-alta-navy">{item.sign}</h3>
                    <p className="text-xs text-alta-gray leading-relaxed mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* How to Protect Yourself */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-4">How to Protect Yourself</h2>
            <div className="space-y-3">
              {protectionSteps.map((item, i) => (
                <div key={i} className="relative p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-alta-teal text-white flex items-center justify-center text-sm font-black shadow-md">{i + 1}</span>
                  <h3 className="text-sm font-bold text-alta-navy mt-1 mb-1">{item.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-[10px] text-alta-teal font-semibold">{item.action}</p>
                </div>
              ))}
            </div>

            {/* Title Lock honest assessment */}
            <div className="mt-4 p-4 bg-[#faf4e4] rounded-2xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914]">
              <h3 className="text-sm font-bold text-alta-navy mb-2">A Note About &quot;Title Lock&quot; Services</h3>
              <p className="text-xs text-alta-gray leading-relaxed mb-2">
                Title lock services (typically $15-$30/month) are <strong>monitoring services, not insurance</strong>. They alert you when a document is recorded against your property title — which is useful — but they do <strong>not</strong> prevent fraud, do <strong>not</strong> cover legal defense costs, and do <strong>not</strong> cover financial losses. Many county recorder offices offer similar monitoring alerts for free.
              </p>
              <p className="text-xs text-alta-gray leading-relaxed">
                Only <strong>owner&apos;s title insurance</strong> provides actual financial protection against title theft, covering both legal defense and losses. If you already have owner&apos;s title insurance, a title lock subscription may be redundant.
              </p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Title Lock vs Title Insurance Comparison */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-4">Title Lock vs. Title Insurance: Know the Difference</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Title Lock */}
              <div className="rounded-2xl overflow-hidden border border-[#e8d9a8] shadow-sm">
                <div className="bg-gradient-to-r from-[#8b6914] to-[#a67c1a] px-5 py-3">
                  <h3 className="text-white font-bold text-sm">{comparisonData.titleLock.name}</h3>
                  <p className="text-white/80 text-xs">{comparisonData.titleLock.cost}</p>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-[10px] text-alta-gray font-semibold uppercase tracking-wider mb-2">{comparisonData.titleLock.type}</p>
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-[#2d6b3f] uppercase tracking-wider mb-1.5">What It Does</p>
                    {comparisonData.titleLock.whatItDoes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <svg className="w-3.5 h-3.5 text-[#2d6b3f] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <p className="text-xs text-alta-gray">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-[#943030] uppercase tracking-wider mb-1.5">What It Does NOT Do</p>
                    {comparisonData.titleLock.whatItDoesNot.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <svg className="w-3.5 h-3.5 text-[#943030] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        <p className="text-xs text-alta-gray">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-[#faf4e4] rounded-lg border border-[#e8d9a8]">
                    <p className="text-[10px] text-alta-gray leading-relaxed"><strong className="text-[#8b6914]">Bottom line:</strong> {comparisonData.titleLock.verdict}</p>
                  </div>
                </div>
              </div>

              {/* Title Insurance */}
              <div className="rounded-2xl overflow-hidden border border-[#bddcc7] shadow-sm">
                <div className="bg-gradient-to-r from-[#2d6b3f] to-[#3d8b52] px-5 py-3">
                  <h3 className="text-white font-bold text-sm">{comparisonData.titleInsurance.name}</h3>
                  <p className="text-white/80 text-xs">{comparisonData.titleInsurance.cost}</p>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-[10px] text-alta-gray font-semibold uppercase tracking-wider mb-2">{comparisonData.titleInsurance.type}</p>
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-[#2d6b3f] uppercase tracking-wider mb-1.5">What It Does</p>
                    {comparisonData.titleInsurance.whatItDoes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <svg className="w-3.5 h-3.5 text-[#2d6b3f] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <p className="text-xs text-alta-gray">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-[#943030] uppercase tracking-wider mb-1.5">Limitations</p>
                    {comparisonData.titleInsurance.whatItDoesNot.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <svg className="w-3.5 h-3.5 text-[#943030] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        <p className="text-xs text-alta-gray">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-[#e9f5ed] rounded-lg border border-[#bddcc7]">
                    <p className="text-[10px] text-alta-gray leading-relaxed"><strong className="text-[#2d6b3f]">Bottom line:</strong> {comparisonData.titleInsurance.verdict}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineAd />

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* What to Do If You're a Victim */}
          <section className="mb-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-[#7a1a1a] via-[#943030] to-[#7a1a1a] px-5 py-3">
                <h2 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
                  <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.168-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.457-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                  What to Do If You&apos;re a Victim of Title Theft
                </h2>
              </div>
              <div className="bg-gradient-to-b from-red-50 to-white p-5 border-2 border-t-0 border-[#943030]/30 rounded-b-2xl">
                <p className="text-xs text-alta-gray mb-4 font-medium">Time is critical. Follow these steps in order:</p>
                <div className="space-y-3">
                  {victimSteps.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-100">
                      <span className="w-6 h-6 rounded-full bg-[#943030] text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-alta-navy">{item.step}</p>
                            <p className="text-xs text-alta-gray mt-0.5">{item.detail}</p>
                          </div>
                          <span className="text-[10px] bg-red-100 text-[#943030] px-2 py-0.5 rounded-full font-medium shrink-0">{item.timing}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* The Role of Title Insurance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-alta-navy mb-4">The Role of Title Insurance in Title Fraud Protection</h2>
            <div className="p-5 bg-[#e9f5ed] rounded-2xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2d6b3f]/10 flex items-center justify-center text-[#2d6b3f] shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-alta-gray leading-relaxed">
                    <strong className="text-alta-navy">Owner&apos;s title insurance</strong> is the most comprehensive protection available against title theft and title fraud. When you purchase an owner&apos;s policy at closing, you are protected for as long as you — or your heirs — own the property.
                  </p>
                  <p className="text-sm text-alta-gray leading-relaxed">
                    If someone files a forged deed to steal your property, your title insurance company will:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Pay for legal counsel to defend your ownership in court",
                      "Cover the costs of a quiet title action to remove the fraudulent deed",
                      "Compensate you for financial losses if your title cannot be restored",
                      "Continue to protect your heirs if the property is inherited",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-[#2d6b3f] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span className="text-sm text-alta-gray">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-alta-gray leading-relaxed">
                    Unlike title lock services, owner&apos;s title insurance is a one-time purchase — there are no monthly fees. It is regulated by state insurance departments and backed by companies with the financial reserves to pay claims.
                  </p>
                  <p className="text-[10px] text-alta-teal font-medium">Source: ALTA Consumer Resources</p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/protect-your-rights" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Property Rights</h3>
                <p className="text-[10px] text-alta-gray mt-1">How owner&apos;s title insurance shields you from hidden title defects</p>
              </Link>
              <Link href="/stop-fraud" className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Stop Fraud 101</h3>
                <p className="text-[10px] text-alta-gray mt-1">10 FBI-sourced prevention steps for wire fraud during your closing</p>
              </Link>
              <Link href="/protect-your-money" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Money</h3>
                <p className="text-[10px] text-alta-gray mt-1">Wire fraud overview, recovery steps, and what your title company should do</p>
              </Link>
            </div>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
