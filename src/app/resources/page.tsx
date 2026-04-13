"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import AltaMembershipCTA from "@/components/AltaMembershipCTA";

const buyingResources = [
  { name: "Consumer Financial Protection Bureau (CFPB)", desc: "Homeownership guides, settlement cost booklet, and complaint filing", url: "https://www.consumerfinance.gov/owning-a-home/", logo: "https://www.google.com/s2/favicons?domain=consumerfinance.gov&sz=64", brandColor: "#20aa3f", bgTint: "bg-[#e9f5ed]", borderColor: "border-[#bddcc7]", accentBorder: "border-l-[#20aa3f]",
    modalContent: { what: "The CFPB is an independent federal agency created in 2010 under the Dodd-Frank Act. Its mission is to protect consumers in the financial marketplace, including mortgage lending and real estate settlement services. The CFPB writes and enforces rules for financial institutions, educates consumers, and handles complaints.", resources: "The CFPB offers: the 'Owning a Home' interactive guide (covers the entire homebuying process), the Home Loan Toolkit (20-page PDF guide), interactive Loan Estimate and Closing Disclosure explainers, a mortgage complaint filing system, the 'Ask CFPB' database with answers to common questions, and the housing counselor locator tool.", whyItMatters: "The CFPB created the standardized Loan Estimate and Closing Disclosure forms you will receive during your transaction. They enforce the rules that protect your right to shop for title insurance and settlement services. If you have a complaint about your lender, servicer, or settlement agent, the CFPB complaint system is one of the most effective consumer protection tools available." }
  },
  { name: "HUD Housing Counselor Locator", desc: "Find a HUD-approved housing counselor in your area", url: "https://www.consumerfinance.gov/housing/", logo: "https://www.google.com/s2/favicons?domain=hud.gov&sz=64", brandColor: "#003A70", bgTint: "bg-[#e8f0f5]", borderColor: "border-[#c5d8e4]", accentBorder: "border-l-[#003A70]",
    modalContent: { what: "The U.S. Department of Housing and Urban Development (HUD) approves and funds housing counseling agencies across the country. These agencies provide free or low-cost, one-on-one counseling on all aspects of homeownership: pre-purchase planning, credit repair, budgeting, mortgage options, avoiding scams, and post-purchase support including foreclosure prevention.", resources: "HUD-approved counselors offer: pre-purchase homebuyer counseling, financial literacy education, credit counseling and repair guidance, help understanding loan options, assistance with down payment assistance programs, foreclosure prevention counseling, and reverse mortgage counseling. Services are available in person, by phone, and online.", whyItMatters: "A HUD-approved counselor provides personalized guidance based on your specific situation — unlike generic online resources. Some loan programs (FHA, USDA, certain down payment assistance programs) require a homebuyer education certificate from a HUD-approved counselor. Even if not required, first-time buyers benefit enormously from one-on-one counseling." }
  },
  { name: "Fannie Mae HomePath", desc: "Homebuyer education, resources, and foreclosure listings", url: "https://www.homepath.com/", logo: "https://www.google.com/s2/favicons?domain=fanniemae.com&sz=64", brandColor: "#003DA5", bgTint: "bg-[#e8ecf5]", borderColor: "border-[#c5cfe4]", accentBorder: "border-l-[#003DA5]",
    modalContent: { what: "Fannie Mae (the Federal National Mortgage Association) is a government-sponsored enterprise (GSE) that purchases and guarantees mortgages from lenders, providing liquidity to the mortgage market. HomePath is Fannie Mae's consumer-facing platform that lists Fannie Mae-owned properties for sale (foreclosures) and provides homebuyer education resources.", resources: "HomePath offers: listings of Fannie Mae-owned properties available for purchase (often at below-market prices), the HomeReady mortgage program (low down payment, flexible income sources), HomeView homebuyer education course (free, certificate provided), and first-look programs that give owner-occupant buyers priority over investors for the first 30 days of listing.", whyItMatters: "Fannie Mae sets the underwriting standards that most conventional lenders follow. Understanding Fannie Mae's programs and requirements helps you navigate the mortgage process. HomePath properties can be opportunities for first-time buyers, and HomeView education provides foundational knowledge regardless of which loan program you use." }
  },
  { name: "Freddie Mac My Home", desc: "Tools, calculators, and educational resources for homebuyers", url: "https://myhome.freddiemac.com/", logo: "https://www.google.com/s2/favicons?domain=freddiemac.com&sz=64", brandColor: "#C41230", bgTint: "bg-[#f5e8ea]", borderColor: "border-[#e4c5ca]", accentBorder: "border-l-[#C41230]",
    modalContent: { what: "Freddie Mac (the Federal Home Loan Mortgage Corporation) is a GSE similar to Fannie Mae — it purchases and guarantees mortgages, providing stability and affordability to the housing market. My Home by Freddie Mac is their consumer resource platform with tools, calculators, and educational content for homebuyers.", resources: "Freddie Mac offers: affordability calculators, rent vs buy analysis tools, the CreditSmart education curriculum (free, in English and Spanish), Home Possible mortgage program (3% down payment for low-to-moderate income buyers), and comprehensive guides covering every phase of the homebuying process.", whyItMatters: "Like Fannie Mae, Freddie Mac sets mortgage standards that affect conventional lending. Their tools are particularly useful for budgeting and comparing scenarios. The Home Possible program is an important option for buyers who need a low down payment. CreditSmart is valuable for anyone looking to understand and improve their credit before applying for a mortgage." }
  },
];

const industryResources = [
  { name: "American Land Title Association (ALTA)", desc: "National trade organization for the title insurance industry", url: "https://www.alta.org/", logo: "https://www.alta.org/images/alta-logo.svg", brandColor: "#0a8ebc", bgTint: "bg-[#e6f1f5]", borderColor: "border-[#b4d8e8]", accentBorder: "border-l-[#0a8ebc]",
    modalContent: { what: "ALTA is the national trade association founded in 1907 representing the title insurance and settlement services industry. ALTA's members include title insurance companies, title agents, independent abstracters, and settlement companies. ALTA advocates for industry standards, consumer protection, and the value of title insurance.", resources: "ALTA offers: the HomeClosing101 consumer education platform (this site), the ALTA member directory (find a title company), the Best Practices Framework (industry standard for operations), policy forms used industry-wide, advocacy for consumer protection legislation, and research on title insurance claims and industry trends.", whyItMatters: "ALTA members handle the title search, insurance, and settlement services for your home purchase. ALTA's Best Practices Framework is the industry standard for consumer protection. When choosing a title company, look for ALTA membership as a sign of professionalism and commitment to industry standards." }
  },
  { name: "National Association of Realtors (NAR)", desc: "Find a Realtor, market data, and consumer guides", url: "https://www.nar.realtor/", logo: "https://www.google.com/s2/favicons?domain=nar.realtor&sz=64", brandColor: "#006BB6", bgTint: "bg-[#e8f0f5]", borderColor: "border-[#c5d8e4]", accentBorder: "border-l-[#006BB6]",
    modalContent: { what: "NAR is the largest trade association in the United States, representing over 1.5 million real estate professionals including agents, brokers, property managers, and appraisers. NAR sets ethical standards for its members through the Code of Ethics and provides market research, advocacy, and consumer resources.", resources: "NAR offers: the Realtor.com property search platform, market statistics and housing data, the Code of Ethics (binding on all Realtors), consumer guides on buying and selling, a 'Find a Realtor' directory, and research reports on housing affordability, demographics, and market trends.", whyItMatters: "If you are working with a real estate agent who is a Realtor (capital R), they are bound by NAR's Code of Ethics, which includes obligations of honesty, fair dealing, and consumer protection. NAR's market data helps you understand pricing trends in your area." }
  },
  { name: "National Association of Insurance Commissioners", desc: "State insurance regulator information and consumer resources", url: "https://content.naic.org/", logo: "https://www.google.com/s2/favicons?domain=naic.org&sz=64", brandColor: "#1a5276", bgTint: "bg-[#e8f0f5]", borderColor: "border-[#c5d8e4]", accentBorder: "border-l-[#1a5276]",
    modalContent: { what: "The NAIC is the standard-setting organization created and governed by the insurance commissioners of all 50 states, the District of Columbia, and five U.S. territories. While the NAIC does not regulate insurance directly (that is done at the state level), it develops model laws, regulations, and guidelines that states adopt.", resources: "The NAIC provides: a state insurance department directory, model insurance regulations, consumer guides on various types of insurance, an insurance company financial data database, complaint ratio data for insurance companies, and information about state insurance regulatory actions.", whyItMatters: "Insurance is regulated at the state level, and the NAIC coordinates efforts across states. If you need to file a complaint about a title insurance company or homeowner's insurance provider, the NAIC can direct you to the right state department. Their complaint data helps you research insurers before choosing one." }
  },
  { name: "Appraisal Institute", desc: "Professional appraisal resources and find-an-appraiser tool", url: "https://www.appraisalinstitute.org/", logo: "https://www.google.com/s2/favicons?domain=appraisalinstitute.org&sz=64", brandColor: "#1B3A5C", bgTint: "bg-[#e8ecf2]", borderColor: "border-[#c5d0e0]", accentBorder: "border-l-[#1B3A5C]",
    modalContent: { what: "The Appraisal Institute is the largest professional organization for real estate appraisers, with members holding the MAI (commercial) and SRA (residential) designations — the most recognized appraisal credentials. The organization sets educational and ethical standards for the appraisal profession.", resources: "The Appraisal Institute offers: a 'Find an Appraiser' directory, consumer guides on understanding appraisals, information about the appraisal process, educational resources about property valuation, and advocacy for appraisal standards and consumer protection.", whyItMatters: "Your lender requires an appraisal to confirm the property's value supports the loan amount. Understanding the appraisal process helps you know what to expect and how to handle a low appraisal. If you ever need an independent appraisal (estate planning, divorce, property tax appeal), the Appraisal Institute directory helps you find a qualified professional." }
  },
  { name: "American Escrow Association", desc: "Consumer resources about the escrow process", url: "https://www.a-e-a.org/", logo: "https://www.google.com/s2/favicons?domain=a-e-a.org&sz=64", brandColor: "#2d6b3f", bgTint: "bg-[#e9f5ed]", borderColor: "border-[#bddcc7]", accentBorder: "border-l-[#2d6b3f]",
    modalContent: { what: "The American Escrow Association (AEA) is a national trade organization representing the escrow settlement industry. Escrow is the process of a neutral third party holding funds and documents on behalf of the buyer and seller until all conditions of the transaction are met. In many states, the title company serves as the escrow agent.", resources: "The AEA provides: information about the escrow process, state-specific escrow practices, consumer guides on what to expect during escrow, industry standards for escrow handling, and educational resources for escrow professionals.", whyItMatters: "During your home purchase, your earnest money deposit and closing funds are held in escrow — a neutral account managed by the settlement agent. Understanding the escrow process helps you know where your money is, who is responsible for it, and what protections exist. After closing, your lender will likely maintain an escrow account for property taxes and insurance." }
  },
  { name: "Inman Real Estate News", desc: "Industry news and market analysis", url: "https://www.inman.com/", logo: "https://www.google.com/s2/favicons?domain=inman.com&sz=64", brandColor: "#5b3a8c", bgTint: "bg-[#f0ecf6]", borderColor: "border-[#d4c8e4]", accentBorder: "border-l-[#5b3a8c]",
    modalContent: { what: "Inman is an independent real estate news organization covering the residential real estate industry. Founded in 1996, it provides news, analysis, and commentary on market trends, technology, regulations, and business practices affecting the real estate industry.", resources: "Inman publishes: daily real estate news and analysis, market trend reports, technology reviews, regulatory and legislative updates, and investigative reporting on industry practices. Some content requires a subscription, but many articles and market updates are freely accessible.", whyItMatters: "Staying informed about the real estate market helps you make better decisions. Inman covers market conditions, interest rate trends, regulatory changes, and emerging technologies that affect homebuyers. While targeted at industry professionals, their reporting provides valuable insights for informed consumers." }
  },
];

const documents = [
  { name: "Sample Closing Disclosure", desc: "See what a completed Closing Disclosure looks like — the document you'll review 3 days before closing.", url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/", logo: "https://www.google.com/s2/favicons?domain=consumerfinance.gov&sz=64", brandColor: "#20aa3f", bgTint: "bg-[#e9f5ed]", borderColor: "border-[#bddcc7]", accentBorder: "border-l-[#20aa3f]",
    modalContent: { what: "The Closing Disclosure is a 5-page standardized form created by the CFPB that details the final terms of your mortgage loan. It replaced the HUD-1 Settlement Statement in 2015 as part of the TRID (TILA-RESPA Integrated Disclosure) rule. The CFPB provides an interactive, annotated sample that explains every field on the form.", resources: "The CFPB sample includes: field-by-field explanations, tips on what to check, a comparison feature to match against your Loan Estimate, and common questions about the form. It is available in an interactive web format that lets you click on any section for detailed explanations.", whyItMatters: "You must receive this document at least 3 business days before closing. It contains the final, actual numbers for your loan — interest rate, monthly payment, closing costs, and cash to close. Reviewing it carefully against your Loan Estimate is one of the most important steps in the entire closing process. Errors found after closing are much harder to correct." }
  },
  { name: "Sample Loan Estimate", desc: "Review a sample Loan Estimate — the document you'll receive within 3 days of applying for a mortgage.", url: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/", logo: "https://www.google.com/s2/favicons?domain=consumerfinance.gov&sz=64", brandColor: "#20aa3f", bgTint: "bg-[#e9f5ed]", borderColor: "border-[#bddcc7]", accentBorder: "border-l-[#20aa3f]",
    modalContent: { what: "The Loan Estimate is a 3-page standardized form that every lender must provide within 3 business days of receiving your complete mortgage application. It shows the estimated loan terms, projected monthly payment, and itemized closing costs. The CFPB provides an annotated sample with explanations for each section.", resources: "The CFPB sample includes: interactive annotations for every field, a comparison worksheet to evaluate multiple Loan Estimates, information about fee tolerances (which fees can and cannot increase), and tips for shopping effectively among multiple lenders.", whyItMatters: "The Loan Estimate is your primary tool for comparing mortgage offers. Because it is standardized, you can compare apples to apples across lenders. Understanding each field helps you identify the true cost of each offer — not just the interest rate, but the total package of fees, points, and terms." }
  },
];

const fraudResources = [
  { name: "FBI Internet Crime Complaint Center (IC3)", desc: "Report wire fraud and internet-related crimes", url: "https://www.ic3.gov/", logo: "https://www.google.com/s2/favicons?domain=fbi.gov&sz=64", brandColor: "#002868", bgTint: "bg-[#e8ecf5]", borderColor: "border-[#c5cfe4]", accentBorder: "border-l-[#002868]",
    modalContent: { what: "The FBI's IC3 is the federal government's central repository for internet crime complaints. It collects, analyzes, and refers internet crime complaints to the appropriate law enforcement agencies. IC3 is particularly important for real estate wire fraud, which the FBI considers one of the fastest-growing internet crimes affecting consumers.", resources: "IC3 provides: an online complaint filing system, annual internet crime reports with statistics and trends, public service announcements about emerging threats, the Recovery Asset Team (RAT) that works with financial institutions to freeze fraudulent transfers, and coordination with federal, state, and local law enforcement.", whyItMatters: "If you are a victim of wire fraud during your real estate transaction, filing an IC3 complaint immediately is critical. The FBI's Recovery Asset Team has a success rate of approximately 73% for recovering funds when notified within the first 72 hours. Time is the most critical factor — contact your bank AND file an IC3 complaint as quickly as possible." }
  },
  { name: "FinCEN (Financial Crimes Enforcement Network)", desc: "Report suspicious financial activity and real estate transactions", url: "https://www.fincen.gov/", logo: "https://www.google.com/s2/favicons?domain=fincen.gov&sz=64", brandColor: "#1a5276", bgTint: "bg-[#e8f0f5]", borderColor: "border-[#c5d8e4]", accentBorder: "border-l-[#1a5276]",
    modalContent: { what: "FinCEN is a bureau of the U.S. Department of the Treasury. It collects and analyzes financial transaction data to combat money laundering, terrorist financing, and other financial crimes. FinCEN's Geographic Targeting Orders (GTOs) require title companies to identify the natural persons behind shell companies used in certain all-cash real estate purchases.", resources: "FinCEN provides: suspicious activity report (SAR) filing for financial institutions, Geographic Targeting Orders for real estate, a tip line for reporting suspected financial crimes, guidance on anti-money laundering compliance, and data sharing with law enforcement agencies.", whyItMatters: "FinCEN's efforts help prevent criminals from using real estate to launder money. Their Geographic Targeting Orders have identified significant levels of money laundering in high-value real estate markets. For consumers, FinCEN's work helps ensure that real estate transactions are legitimate and that financial institutions maintain proper controls." }
  },
  { name: "CertifID 2026 State of Wire Fraud Report", desc: "Latest data on wire fraud trends affecting real estate", url: "https://www.certifid.com/state-of-wire-fraud", logo: "https://www.alta.org/images/wplogos/1165795.png", brandColor: "#0a7ea8", bgTint: "bg-[#e6f1f5]", borderColor: "border-[#b4d8e8]", accentBorder: "border-l-[#0a7ea8]",
    modalContent: { what: "CertifID is a wire fraud prevention technology company that works with title companies, lenders, and real estate professionals. Their annual State of Wire Fraud Report aggregates data from the real estate industry to provide the most current picture of wire fraud threats, trends, and prevention strategies.", resources: "The report includes: current statistics on wire fraud attempts and losses in real estate, analysis of attack methods and trends, case studies of fraud incidents, prevention recommendations, and data on which participants in the transaction are most targeted (buyers, sellers, agents, lenders).", whyItMatters: "Wire fraud tactics evolve constantly. Understanding the current threat landscape helps you stay vigilant. The report provides actionable prevention strategies and highlights the most common attack patterns. It also demonstrates why your title company's wire fraud prevention measures are so important." }
  },
  { name: "NAR: Spotting Deepfake Scams in Real Estate", desc: "Consumer guide to recognizing AI-generated fraud in transactions", url: "https://www.nar.realtor/the-facts/consumer-guide-spotting-deepfake-scams-in-real-estate", logo: "https://www.google.com/s2/favicons?domain=nar.realtor&sz=64", brandColor: "#006BB6", bgTint: "bg-[#e8f0f5]", borderColor: "border-[#c5d8e4]", accentBorder: "border-l-[#006BB6]",
    modalContent: { what: "This NAR consumer guide addresses the emerging threat of deepfake technology — AI-generated audio and video — being used to impersonate real estate professionals, lenders, and other parties in real estate transactions. As AI technology advances, fraudsters are using synthetic voices and video calls to authorize fraudulent wire transfers and identity theft.", resources: "The guide covers: how deepfake technology works, real examples of deepfake scams in real estate, how to verify the identity of people you communicate with during a transaction, red flags that indicate a deepfake, and steps to protect yourself from AI-generated fraud.", whyItMatters: "AI-generated fraud is a growing threat in real estate. Criminals can now create convincing audio impersonations of your real estate agent, lender, or settlement agent, and use them to redirect wire transfers or extract personal information. Understanding this threat and knowing how to verify identities adds another layer of protection to your transaction." }
  },
];

const sectionStyles: Record<string, { color: string; icon: string; image: string }> = {
  "Buying a Home": { color: "from-[#1a5276] to-[#154463]", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
  "Sample Closing Documents": { color: "from-[#8b6914] to-[#705410]", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80" },
  "Fraud Reporting & Prevention": { color: "from-[#943030] to-[#7a2020]", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80" },
  "Industry & Real Estate Organizations": { color: "from-[#2d6b3f] to-[#235532]", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
};

const sectionGradients: Record<string, string> = {
  "Buying a Home": "from-[#1a5276] to-[#0a7ea8]",
  "Sample Closing Documents": "from-[#8b6914] to-[#1a5276]",
  "Fraud Reporting & Prevention": "from-[#943030] to-[#1a5276]",
  "Industry & Real Estate Organizations": "from-[#2d6b3f] to-[#1a5276]",
};

function ResourceSection({ title, items, onOpenModal }: { title: string; items: { name: string; desc: string; url: string; logo?: string; brandColor?: string; bgTint?: string; borderColor?: string; accentBorder?: string; modalContent: { what: string; resources: string; whyItMatters: string } }[]; onOpenModal: (modal: { title: string; gradient: string; content: React.ReactNode }) => void }) {
  const style = sectionStyles[title] || sectionStyles["Buying a Home"];
  const gradient = sectionGradients[title] || "from-[#1a5276] to-[#0a7ea8]";
  return (
    <div className="mb-12">
      {/* Section header with image */}
      <div className="relative rounded-xl overflow-hidden mb-5 h-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${style.image}')` }} />
        <div className={`absolute inset-0 bg-gradient-to-r ${style.color} opacity-30`} />
        <div className="relative z-10 flex items-center gap-3 h-full px-5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="text-xs text-white/70">{items.length} resources</p>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((r) => (
          <div
            key={r.name}
            onClick={() => onOpenModal({
              title: r.name,
              gradient,
              content: (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-[#1a5276] mb-2">What This Organization Does</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.modalContent.what}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2d6b3f] mb-2">Resources They Offer</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.modalContent.resources}</p>
                  </div>
                  <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4]">
                    <h3 className="text-sm font-bold text-[#1a5276] mb-2">Why It Matters to Homebuyers</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.modalContent.whyItMatters}</p>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a7ea8] text-white rounded-lg font-semibold text-sm hover:bg-[#077a9e] transition-colors"
                  >
                    Visit {r.name.split('(')[0].trim()}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              )
            })}
            className={`feature-card flex items-start gap-3 p-4 rounded-xl border border-l-4 group cursor-pointer tile-interactive ${r.bgTint || 'bg-white'} ${r.borderColor || 'border-gray-200'} ${r.accentBorder || 'border-l-[#0a7ea8]'}`}
            data-accent="teal"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {r.logo ? <img src={r.logo} alt="" className="w-6 h-6 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : (
                <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{r.name}</h3>
              <p className="text-xs text-alta-gray mt-0.5">{r.desc}</p>
            </div>
            <div className="w-5 h-5 rounded-full bg-alta-light flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

  return (
    <div>
    <PageHero title="Resources & Tools" subtitle="Everything HC101 offers — interactive calculators, printable checklists, 450+ glossary terms, and trusted external links — all in one place." image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80" breadcrumb={[{label:"Resources",href:"/resources"}]} />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 p-4 bg-[#e6f1f5] rounded-2xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Your Complete Resource Hub</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Every tool built into HC101, plus verified external links to government agencies, industry organizations, and official documents. <span className="text-alta-teal font-medium">Click any external resource for details on what they offer and why it matters.</span></p>
            </div>
          </div>
        </div>

        {/* HC101 Tools & Downloads */}
        <div className="mb-12">
          <div className="relative rounded-xl overflow-hidden mb-5 h-24">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a7ea8] to-[#077a9e] opacity-30" />
            <div className="relative z-10 flex items-center gap-3 h-full px-5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">HC101 Tools & Downloads</h2>
                <p className="text-xs text-white/70">Interactive tools, checklists, and guides built into this site</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Mortgage Payment Calculator", desc: "Compare Conventional, FHA, VA & USDA with county-level property tax rates and detailed payment breakdowns.", href: "/mortgage-calculator", badge: "Calculator" },
              { name: "Closing Cost Estimator", desc: "Interactive calculator that estimates your total closing costs with itemized fees based on home price and location.", href: "/closing-process/closing-costs", badge: "Calculator" },
              { name: "Interactive Closing Checklist", desc: "33-item checklist with progress tracking across 5 phases. Check off items and print a blank copy for closing day.", href: "/closing-process/closing-checklist", badge: "Checklist" },
              { name: "Document Checklist", desc: "Everything to bring on closing day organized by category — ID, insurance, funds, and supporting documents.", href: "/document-checklist", badge: "Checklist" },
              { name: "Questions to Ask", desc: "40+ printable questions organized by who you're asking — your lender, agent, title company, and inspector.", href: "/questions-to-ask", badge: "Printable" },
              { name: "Real Estate Glossary", desc: "450+ searchable terms with real-world closing examples. Save terms to build a custom printable list.", href: "/glossary", badge: "Reference" },
              { name: "250+ FAQ Knowledge Base", desc: "Every answer verified and sourced from CFPB, FBI, NAR, ALTA, IRS, FHA, VA, and other authorities.", href: "/faq", badge: "Reference" },
              { name: "First-Time Buyer Timeline", desc: "5-phase, 27-item expandable timeline — each step with detailed breakdown, action items, and source citations.", href: "/first-time-buyers", badge: "Guide" },
              { name: "Document Library", desc: "Links to official CFPB forms, sample documents, homebuyer education courses, and state-specific resources.", href: "/document-library", badge: "Library" },
              { name: "State Insurance Directory", desc: "Contact information for all 50 state insurance departments + DC — verified addresses, phone numbers, and websites.", href: "/homeowners-insurance", badge: "Directory" },
              { name: "Wire Fraud Prevention Guide", desc: "How the scam works, 5 safeguards, and what to do if you're a victim — with FBI IC3 recovery data.", href: "/protect-your-money", badge: "Guide" },
              { name: "Source Index", desc: "Complete list of every data source cited across the site — CFPB, FBI, NAR, ALTA, IRS, and more.", href: "/sources", badge: "Reference" },
              { name: "HC101 Trivia Challenge", desc: "Jeopardy-style homebuying trivia — 25 questions across 5 categories. Test your knowledge and earn your title!", href: "/trivia", badge: "Game" },
            ].map((t) => (
              <Link key={t.name} href={t.href} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 border-l-4 border-l-[#0a7ea8] shadow-sm tile-interactive group">
                <div className="w-9 h-9 rounded-lg bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0 group-hover:bg-alta-teal group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors truncate">{t.name}</h3>
                    <span className="text-[9px] font-bold bg-alta-light text-alta-teal px-1.5 py-0.5 rounded shrink-0">{t.badge}</span>
                  </div>
                  <p className="text-xs text-alta-gray leading-relaxed line-clamp-2">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <InlineAd />

        {/* External Resources header */}
        <h2 className="text-xl font-bold text-alta-navy mb-2">External Resources</h2>
        <p className="text-sm text-alta-gray mb-6 leading-relaxed">Trusted links to government agencies, industry organizations, and official documents. All links open in a new tab. <span className="text-alta-teal font-medium">Click any resource for details.</span></p>

        <ResourceSection title="Buying a Home" items={buyingResources} onOpenModal={setActiveModal} />
        <ResourceSection title="Sample Closing Documents" items={documents} onOpenModal={setActiveModal} />
        <InlineAd />
        <ResourceSection title="Fraud Reporting & Prevention" items={fraudResources} onOpenModal={setActiveModal} />
        <ResourceSection title="Industry & Real Estate Organizations" items={industryResources} onOpenModal={setActiveModal} />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/glossary" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
            Real Estate Glossary
          </Link>
          <Link href="/blog" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
            Blog & News
          </Link>
        </div>
      </div>

      {/* ALTA Membership CTA */}
      <AltaMembershipCTA />
    </div>

    {/* Modal */}
    {activeModal && (
      <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setActiveModal(null)}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setActiveModal(null)} className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className={`bg-gradient-to-r ${activeModal.gradient} px-6 py-5`}>
            <h2 className="text-xl font-bold text-white pr-10">{activeModal.title}</h2>
          </div>
          <div className="p-6">{activeModal.content}</div>
        </div>
      </div>
    )}
    </div>
  );
}
