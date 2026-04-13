"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

/* ═══════════════════════════════════════════════════════
   MODAL DATA TYPE
   ═══════════════════════════════════════════════════════ */
interface ModalData {
  title: string;
  subtitle?: string;
  gradient: string;
  paragraphs: string[];
  bullets?: string[];
  stats?: { value: string; label: string }[];
  links?: { label: string; url: string }[];
}

/* ═══════════════════════════════════════════════════════
   SHARED MODAL COMPONENT
   ═══════════════════════════════════════════════════════ */
function DetailModal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true" aria-label={data.title} onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div ref={modalRef} tabIndex={-1} className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {/* Header */}
        <div className={`bg-gradient-to-r ${data.gradient} px-4 sm:px-6 py-4 sm:py-5`}>
          <h2 className="text-lg sm:text-xl font-bold text-white pr-10">{data.title}</h2>
          {data.subtitle && <p className="text-xs sm:text-sm text-white/70 mt-1">{data.subtitle}</p>}
        </div>
        {/* Body */}
        <div className="p-4 sm:p-6">
          {/* Stats row */}
          {data.stats && data.stats.length > 0 && (
            <div className={`grid ${data.stats.length <= 2 ? 'grid-cols-2' : data.stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'} gap-3 mb-5`}>
              {data.stats.map((s) => (
                <div key={s.label} className="p-3 bg-alta-light rounded-xl text-center">
                  <p className="text-lg font-bold text-alta-teal">{s.value}</p>
                  <p className="text-[10px] text-alta-gray leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          )}
          {/* Paragraphs */}
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-alta-gray leading-relaxed mb-3">{p}</p>
          ))}
          {/* Bullet list */}
          {data.bullets && data.bullets.length > 0 && (
            <ul className="space-y-2 my-4">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-alta-gray">
                  <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {/* Links */}
          {data.links && data.links.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-100">
              {data.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-alta-teal/10 text-alta-teal text-xs font-semibold rounded-lg hover:bg-alta-teal/20 transition-colors">
                  {l.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BENEFITS DATA
   ═══════════════════════════════════════════════════════ */
const benefits = [
  {
    title: "Industry Best Practices",
    desc: "Access ALTA's comprehensive Best Practices framework — the gold standard for title and settlement operations.",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "from-[#2d6b3f] to-[#235532]",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    modal: {
      title: "ALTA Best Practices Framework",
      subtitle: "The industry gold standard for title and settlement operations",
      gradient: "from-[#2d6b3f] to-[#235532]",
      stats: [
        { value: "7", label: "Pillars" },
        { value: "6,000+", label: "Companies Certified" },
        { value: "50", label: "States" },
        { value: "2013", label: "Year Established" },
      ],
      paragraphs: [
        "Developed after the 2008 financial crisis to strengthen consumer protection and industry accountability, the ALTA Best Practices framework is a comprehensive set of standards that title insurance companies and settlement agents voluntarily adopt. The framework has become the de facto requirement for doing business with major lenders — Fannie Mae, Freddie Mac, and the CFPB all reference ALTA Best Practices in their vendor management guidance.",
        "The framework covers seven pillars: (1) Licensing — ensuring proper state licensing; (2) Escrow Trust Accounting — segregated accounts with positive pay and daily reconciliation; (3) Privacy & Information Security — encryption, access controls, incident response, and wire fraud prevention; (4) Settlement Procedures — documented, auditable closing workflows; (5) Title Policy Production — accurate and timely policy issuance; (6) Professional Liability Insurance — E&O and cyber coverage; (7) Consumer Complaints — formal intake, tracking, and resolution processes.",
        "Companies that adopt Best Practices can pursue third-party assessments through firms like CPA firms or ALTA-approved assessors. The assessment validates compliance across all seven pillars and is typically renewed annually. Many lenders now require Best Practices certification as a condition of their approved closing agent lists.",
      ],
      bullets: [
        "Pillar 3 (Privacy & Security) updated in 2023 to address AI-powered wire fraud and deepfake threats",
        "Third-party assessment validates compliance — widely recognized by lenders and regulators",
        "Free self-assessment tools available to all ALTA members",
        "Best Practices Quick Guide and implementation resources in the member portal",
        "Companies that achieve certification can display the ALTA Best Practices seal",
      ],
      links: [
        { label: "Best Practices Overview", url: "https://www.alta.org/best-practices/" },
        { label: "Self-Assessment Tool", url: "https://www.alta.org/best-practices/" },
      ],
    } as ModalData,
  },
  {
    title: "Advocacy on Capitol Hill",
    desc: "ALTA represents your interests before Congress, federal agencies, and state legislatures on policy that affects your business.",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
    color: "from-[#1a5276] to-[#154463]",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    modal: {
      title: "Advocacy on Capitol Hill",
      subtitle: "601 Pennsylvania Avenue NW — steps from the U.S. Capitol",
      gradient: "from-[#1a5276] to-[#154463]",
      stats: [
        { value: "116+", label: "Years of Advocacy" },
        { value: "535", label: "Members of Congress Engaged" },
        { value: "50", label: "State Legislatures Monitored" },
      ],
      paragraphs: [
        "ALTA's government affairs team operates from 601 Pennsylvania Avenue NW in Washington, D.C. — steps from the U.S. Capitol. The team monitors and engages on federal and state legislation that affects title insurance, settlement services, and real property rights. When Congress considers bills that could impact how title companies operate, ALTA is at the table.",
        "Key federal advocacy wins include defending the role of title insurance in RESPA reform, partnering with the Mortgage Bankers Association to advance Remote Online Notarization (RON) legislation in 45 states and at the federal level through the SECURE Notarization Act, and protecting consumer choice in title insurance selection against attempts to eliminate owner's policies.",
        "At the state level, ALTA tracks legislation in all 50 states and D.C., providing alerts, model legislation, and talking points to members. Through the Title Action Network (TAN), ALTA mobilizes grassroots advocacy, enabling individual title professionals to contact their legislators with one click when critical issues arise.",
        "ALTA also engages with federal agencies including the CFPB, FHFA, HUD, FinCEN, and the IRS on regulatory matters. The association's position papers and industry data are frequently cited in regulatory proceedings and Congressional testimony.",
        "Current 2026 advocacy priorities include: opposing the Title Acceptance Pilot (a lender's title insurance waiver on refinances that ALTA calls a 'false promise of savings'), engaging with FinCEN on beneficial ownership reporting requirements, advocating against unregulated title insurance alternatives with FHFA and the GSEs, supporting NTRAPS legislation to prohibit unfair real estate fee agreements, and combating seller impersonation fraud with sophisticated identity theft schemes.",
      ],
      bullets: [
        "SECURE Notarization Act (HR 1777) — bipartisan bill to enable RON nationwide",
        "Successfully defended owner's title insurance against elimination proposals",
        "Advocacy Summit — May 11–13, 2026 in Washington, D.C.",
        "Opposing Title Acceptance Pilot and unregulated title insurance alternatives",
        "FinCEN beneficial ownership reporting — advocacy for practical compliance",
        "State legislative tracking and alerts for all 50 states through the member portal",
        "TIPAC raises funds to support candidates who champion property rights",
      ],
      links: [
        { label: "ALTA Advocacy", url: "https://www.alta.org/advocacy/" },
        { label: "Title Action Network", url: "https://www.alta.org/tan/" },
        { label: "TIPAC", url: "https://www.alta.org/advocacy/tipac/" },
      ],
    } as ModalData,
  },
  {
    title: "ALTA ONE Conference",
    desc: "The premier annual event for the title industry — networking, education, and innovation with thousands of professionals.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    color: "from-[#5b3a8c] to-[#482d70]",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    modal: {
      title: "ALTA ONE 2026",
      subtitle: "October 12–15, 2026 — Scottsdale, Arizona",
      gradient: "from-[#5b3a8c] to-[#482d70]",
      stats: [
        { value: "2,000+", label: "Attendees" },
        { value: "4 Days", label: "Of Programming" },
        { value: "100+", label: "Sessions & Speakers" },
        { value: "50+", label: "Exhibitors" },
      ],
      paragraphs: [
        "ALTA ONE is the title industry's flagship annual conference — the largest gathering of title insurance professionals, settlement agents, underwriters, attorneys, and technology providers in the country. The 2026 edition takes place October 12–15 at a premier resort in Scottsdale, Arizona.",
        "The conference features keynote presentations from industry leaders, multi-track breakout sessions covering business operations, technology, regulatory compliance, and leadership, plus an expo hall showcasing the latest title and settlement technology. Past tracks have included AI and automation in title production, cybersecurity and wire fraud prevention, operational efficiency, M&A strategy, and next-gen closing experiences.",
        "Beyond the sessions, ALTA ONE is where the industry's most important business relationships are built. Evening networking events, roundtable discussions, and informal gatherings create opportunities that don't exist anywhere else. First-time attendees consistently cite the networking as the single most valuable element.",
        "Registration typically opens in spring with early-bird pricing. ALTA members receive significantly discounted rates, and group discounts are available for companies sending multiple attendees.",
      ],
      bullets: [
        "Multi-track agenda: Business Operations, Technology, Compliance, Leadership",
        "Expo hall with 50+ vendors showcasing title and settlement technology",
        "Evening networking events and industry celebrations",
        "Early-bird and ALTA member pricing available",
        "CE/CLE credits available for many sessions",
        "Past keynotes have featured industry CEOs, regulators, and technology leaders",
      ],
      links: [
        { label: "ALTA ONE 2026", url: "https://www.alta.org/altaone/" },
        { label: "Register", url: "https://www.alta.org/altaone/" },
      ],
    } as ModalData,
  },
  {
    title: "Education & Certification",
    desc: "Professional development courses, webinars, NTP designation, and continuing education for your team.",
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    color: "from-[#8b6914] to-[#705410]",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
    modal: {
      title: "Education & Professional Development",
      subtitle: "NTP designation, ALTA Learning, webinars, and CE credits",
      gradient: "from-[#8b6914] to-[#705410]",
      paragraphs: [
        "ALTA provides a comprehensive education ecosystem for title professionals at every career stage. The centerpiece is the National Title Professional (NTP) designation — the industry's most recognized credential, demonstrating knowledge, experience, and commitment to excellence in title insurance and settlement services.",
        "NTP candidates must meet eligibility requirements including years of industry experience, completion of ALTA-approved education courses, and demonstrated professional contributions. The designation includes a Credly digital badge that can be displayed on LinkedIn, email signatures, and business cards. NTP holders are recognized throughout the industry as having achieved the highest standard of professional competence.",
        "ALTA Learning (powered by the Elevate platform, developed with LTI) offers on-demand online courses covering title insurance fundamentals, regulatory compliance, escrow management, and advanced topics. Courses are designed by the ALTA Education Committee with input from industry practitioners.",
        "Regular free webinars cover emerging topics — recent subjects include AI in title production, cybersecurity updates, regulatory changes, and business strategy. Most webinars qualify for CE/CLE credits in participating states.",
      ],
      bullets: [
        "NTP designation — the gold standard professional credential in title insurance",
        "ALTA Learning / Elevate platform with on-demand courses",
        "Free member webinars on compliance, technology, and business strategy",
        "CE/CLE credits available in participating states",
        "ALTA EDge conference focused entirely on education and professional development",
        "Education Committee curates curriculum with real-world industry practitioners",
      ],
      links: [
        { label: "NTP Designation", url: "https://www.alta.org/career-and-learning/national-title-professional/" },
        { label: "ALTA Learning", url: "https://elevate.alta.org/" },
        { label: "Education", url: "https://www.alta.org/education/" },
      ],
    } as ModalData,
  },
  {
    title: "Member Directory Listing",
    desc: "Get listed in the ALTA member directory and HomeClosing101 — putting your company in front of homebuyers nationwide.",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    color: "from-[#0a7ea8] to-[#077a9e]",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    modal: {
      title: "Member Directory & Consumer Visibility",
      subtitle: "Put your company in front of homebuyers searching for title services",
      gradient: "from-[#0a7ea8] to-[#077a9e]",
      paragraphs: [
        "ALTA membership includes listing in the official member directory — a searchable database of title insurance companies, agents, abstracters, and settlement service providers across all 50 states. Consumers, lenders, and real estate agents use this directory to find ALTA-member companies, which signals credibility, Best Practices compliance, and industry legitimacy.",
        "Your company profile in the directory can include contact information, services offered, geographic coverage, and Best Practices certification status. This visibility matters: lenders increasingly require that their approved closing agents be ALTA members with Best Practices certification.",
        "HomeClosing101 — the consumer education platform you're reading right now — also connects homebuyers with ALTA member companies through the Find a Title Company tool. As ALTA's consumer-facing presence grows, member companies benefit from increased consumer awareness and direct referral traffic.",
        "The directory is also a networking tool for members — helping you identify potential partners, underwriters, and service providers in new markets as your business expands.",
      ],
      bullets: [
        "Searchable listing in the official ALTA member directory",
        "Visibility to consumers, lenders, and real estate agents nationwide",
        "Best Practices certification badge displayed on your profile",
        "HomeClosing101 integration through the Find a Title Company tool",
        "Credibility signal that lenders increasingly require for approved agent lists",
      ],
      links: [
        { label: "Member Directory", url: "https://www.alta.org/membership/" },
        { label: "Find a Company", url: "/find-company" },
      ],
    } as ModalData,
  },
  {
    title: "Wire Fraud Resources",
    desc: "Access to CertifID partnerships, fraud prevention toolkits, and cybersecurity best practices for your firm.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    color: "from-[#943030] to-[#7a2020]",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    modal: {
      title: "Wire Fraud Prevention Resources",
      subtitle: "Protecting the industry — and consumers — from the #1 threat",
      gradient: "from-[#943030] to-[#7a2020]",
      stats: [
        { value: "$275M", label: "Annual Losses (FBI IC3)" },
        { value: "59%", label: "Year-over-Year Increase" },
        { value: "$150K", label: "Average Individual Loss" },
        { value: "<5%", label: "Recovery After 48 Hours" },
      ],
      paragraphs: [
        "Real estate wire fraud is the single biggest threat facing the title and settlement industry. The FBI's IC3 reports $275 million in annual losses, with criminals using AI-generated deepfake voice calls, business email compromise (BEC), and hacked real estate agent accounts to intercept closing funds. ALTA has been at the forefront of the industry response since 2015.",
        "ALTA's partnership with CertifID provides members with discounted access to wire fraud prevention technology — secure wire verification that confirms account ownership before funds are sent. CertifID's platform has prevented hundreds of millions in fraudulent transfers since its founding.",
        "Best Practices Pillar 3 (Privacy & Information Security) was updated to specifically address AI-powered fraud threats, requiring member companies to implement multi-factor authentication, employee cybersecurity training, incident response plans, and wire verification procedures. The 2023 update added requirements around deepfake detection and social engineering awareness.",
        "ALTA also provides free consumer-facing resources — including the content on this site — to educate homebuyers about wire fraud risks. The association's position is that consumer awareness is the most effective fraud prevention: a buyer who knows to verify wiring instructions by phone will not fall victim to a BEC attack.",
      ],
      bullets: [
        "CertifID partnership — discounted wire verification for ALTA members",
        "Best Practices Pillar 3 updated for AI-powered fraud and deepfakes",
        "Free cybersecurity webinars and training resources",
        "Consumer education through HomeClosing101 and ALTA.org",
        "Model wire verification procedures for your closing operations",
        "Incident response guidance — what to do within the first hour",
      ],
      links: [
        { label: "Wire Fraud Prevention", url: "https://www.alta.org/business-tools/wire-fraud.cfm" },
        { label: "CertifID", url: "https://www.certifid.com/" },
        { label: "Stop Fraud 101", url: "/stop-fraud" },
      ],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   ABOUT ALTA DATA
   ═══════════════════════════════════════════════════════ */
const aboutCards = [
  {
    title: "Founded in 1907",
    desc: "ALTA has represented the title insurance and settlement services industry for over 116 years. From handwritten abstracts to digital closings, ALTA has been the voice of the industry through every era.",
    color: "from-[#1a5276] to-[#154463]",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    modal: {
      title: "116+ Years of Industry Leadership",
      subtitle: "Founded 1907 — the oldest title industry trade association",
      gradient: "from-[#1a5276] to-[#154463]",
      paragraphs: [
        "The American Land Title Association was founded in 1907 in Chicago, Illinois, bringing together title insurance companies and abstracters who recognized the need for a unified national voice. At the time, title searches were performed by hand in dusty courthouse record rooms, and title insurance was a relatively new concept — the first title insurance company, the Law Association of Philadelphia, had been founded just 31 years earlier in 1876.",
        "Over more than a century, ALTA has guided the industry through every major transformation: the standardization of title insurance policies, the creation of uniform policy forms adopted nationwide, the transition from paper to digital records, the development of electronic closing technology, and most recently the adoption of Remote Online Notarization (RON).",
        "Today ALTA is headquartered at 601 Pennsylvania Avenue NW, Suite 750, Washington, D.C. — directly between the U.S. Capitol and the White House. The association has a full-time staff of policy experts, education professionals, communications specialists, and industry advocates who work on behalf of 6,000+ member companies.",
        "ALTA's mission is to promote the safe and efficient transfer of real property by supporting the role of title insurance, advocating for consumer protection, setting industry standards, and advancing professional development for title professionals.",
      ],
      links: [
        { label: "About ALTA", url: "https://www.alta.org/about/" },
      ],
    } as ModalData,
  },
  {
    title: "Washington, D.C. Headquarters",
    desc: "601 Pennsylvania Avenue NW, Suite 750 — steps from the U.S. Capitol. Direct advocacy on policies affecting the title industry and homebuyers.",
    color: "from-[#2d6b3f] to-[#235532]",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
    modal: {
      title: "ALTA Headquarters — Washington, D.C.",
      subtitle: "601 Pennsylvania Avenue NW, Suite 750",
      gradient: "from-[#2d6b3f] to-[#235532]",
      paragraphs: [
        "ALTA's headquarters sits on Pennsylvania Avenue — the corridor connecting the U.S. Capitol and the White House. This location is strategic: the association's government affairs team has direct access to members of Congress, committee staff, federal agencies, and coalition partners.",
        "The D.C. office houses the full-time staff responsible for government affairs and advocacy, education and professional development programs, member services and communications, the ALTA Good Deeds Foundation, industry research and data, and consumer education initiatives including HomeClosing101.",
        "ALTA's government affairs team engages daily with Congress and federal regulators on issues including RESPA enforcement, Remote Online Notarization legislation, cybersecurity and wire fraud policy, housing finance reform, and consumer protection in real estate transactions. The team monitors legislation in all 50 states and provides rapid alerts to members when action is needed.",
        "Members can visit the D.C. office, meet with ALTA staff, and participate in Hill visits during the annual Advocacy Summit. Contact ALTA at 202.296.3671.",
      ],
      links: [
        { label: "Contact ALTA", url: "https://www.alta.org/about/" },
      ],
    } as ModalData,
  },
  {
    title: "ALTA Best Practices",
    desc: "The 7-pillar framework is the gold standard for title and settlement operations — licensing, escrow, data privacy, settlements, title policies, liability, and complaints.",
    color: "from-[#5b3a8c] to-[#482d70]",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    modal: {
      title: "ALTA Best Practices — 7 Pillars",
      subtitle: "The framework that defines industry excellence",
      gradient: "from-[#5b3a8c] to-[#482d70]",
      paragraphs: [
        "The ALTA Best Practices framework was developed in 2013 in response to the Consumer Financial Protection Bureau's heightened expectations for lenders to manage their third-party service providers — including title and settlement companies. Now at version 4.2 (published August 2025), the framework gives title companies a concrete, auditable set of standards to demonstrate operational excellence.",
        "The seven pillars are: (1) Licensing — verify and maintain all required state and local licenses; (2) Escrow Trust Accounting — segregate client funds with daily reconciliation, positive pay, and three-way reconciliation; (3) Privacy & Information Security — protect NPI with encryption, access controls, training, and incident response; (4) Settlement Procedures — follow documented closing workflows with proper recording and disbursement; (5) Title Policy Production — issue policies accurately and promptly after closing; (6) Professional Liability Insurance — carry adequate E&O and fidelity coverage; (7) Consumer Complaints — maintain a formal process to receive, track, and resolve complaints.",
        "Companies pursuing Best Practices certification can use ALTA's free self-assessment tools or engage a third-party assessor (typically a CPA firm) for independent verification. The assessment evaluates written policies, procedures, and actual compliance across all seven pillars. Certification is typically renewed annually.",
      ],
      bullets: [
        "Pillar 1: Licensing — all employees properly licensed and registered",
        "Pillar 2: Escrow Controls — segregated trust accounts, daily reconciliation, positive pay",
        "Pillar 3: Privacy & Security — encryption, MFA, training, incident response, wire fraud prevention",
        "Pillar 4: Settlement Procedures — documented closing workflows, compliant disbursement",
        "Pillar 5: Title Policy Production — timely, accurate policy issuance",
        "Pillar 6: Professional Liability — E&O, fidelity, and cyber coverage",
        "Pillar 7: Consumer Complaints — formal intake, tracking, and resolution process",
      ],
      links: [
        { label: "Best Practices", url: "https://www.alta.org/best-practices/" },
      ],
    } as ModalData,
  },
  {
    title: "TIPAC Political Action",
    desc: "The Title Industry Political Action Committee supports candidates who understand the industry. ALTA has defended title insurance, protected consumer choice, and promoted fraud prevention.",
    color: "from-[#8b6914] to-[#705410]",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    modal: {
      title: "TIPAC — Title Industry Political Action Committee",
      subtitle: "The collective political voice of the title insurance industry",
      gradient: "from-[#8b6914] to-[#705410]",
      paragraphs: [
        "The Title Industry Political Action Committee (TIPAC) is ALTA's nonpartisan political action committee. TIPAC raises voluntary contributions from ALTA members and directs them to candidates for federal office — both Democrats and Republicans — who support property rights, consumer protection, and policies that strengthen the real estate transaction process.",
        "TIPAC contributions are guided by a board that evaluates candidates based on their positions on issues directly affecting the title industry: RESPA enforcement, title insurance regulation, Remote Online Notarization, housing finance reform, and cybersecurity policy. The PAC does not endorse candidates based on party affiliation — only on their record and positions on title industry issues.",
        "Contributions to TIPAC are voluntary and separate from ALTA membership dues. Members can contribute at various levels, and many state land title associations coordinate their own PAC efforts in partnership with TIPAC to support candidates at the state level as well.",
        "TIPAC participation is one of the most direct ways title professionals can influence the policy landscape. Combined with ALTA's lobbying efforts and TAN's grassroots advocacy, TIPAC ensures the industry has a presence at every level of the political process.",
      ],
      links: [
        { label: "TIPAC", url: "https://www.alta.org/advocacy/tipac/" },
        { label: "ALTA Advocacy", url: "https://www.alta.org/advocacy/" },
      ],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════ */
const stats = [
  { value: "6,000+", label: "Member Companies" },
  { value: "50", label: "States Represented" },
  { value: "116+", label: "Years of Advocacy" },
  { value: "#1", label: "Title Industry Association" },
];

/* ═══════════════════════════════════════════════════════
   MEMBERSHIP TYPES DATA
   ═══════════════════════════════════════════════════════ */
const membershipTypes = [
  {
    type: "Title Insurance Underwriters",
    desc: "Companies that issue title insurance policies — the largest underwriters in the country are ALTA members.",
    color: "border-l-[#1a5276]",
    icon: "bg-[#e8f0f5] text-[#1a5276]",
    modal: {
      title: "Title Insurance Underwriters",
      subtitle: "Companies that issue title insurance policies nationwide",
      gradient: "from-[#1a5276] to-[#154463]",
      paragraphs: [
        "Title insurance underwriters are the companies that actually issue title insurance policies — backing the guarantee with their financial reserves. The largest title insurance underwriters in the United States are ALTA members, including the 'Big Four' families of underwriters that collectively insure the vast majority of residential and commercial real estate transactions.",
        "Underwriter membership in ALTA provides access to industry data, regulatory intelligence, policy form development input, and a direct voice in the advocacy that shapes federal and state regulation of title insurance. Underwriters also benefit from ALTA's consumer education efforts, which help homebuyers understand the value of title insurance.",
        "ALTA's Title Insurance Underwriter members participate in policy form committees that develop and update the standardized ALTA policy forms used throughout the industry — including the Owner's Policy, Loan Policy, and the various endorsement forms that address specific title risks.",
      ],
      bullets: [
        "Access to ALTA policy form development and update process",
        "Industry data on title insurance premiums, claims, and market trends",
        "Federal and state regulatory intelligence and advocacy",
        "Input on Best Practices framework evolution",
        "Consumer education through HomeClosing101 and ALTA.org",
      ],
      links: [
        { label: "Membership Info", url: "https://www.alta.org/membership/" },
      ],
    } as ModalData,
  },
  {
    type: "Title Agents & Abstracters",
    desc: "Local and regional title agents who conduct searches, issue commitments, and facilitate closings.",
    color: "border-l-[#2d6b3f]",
    icon: "bg-[#e9f5ed] text-[#2d6b3f]",
    modal: {
      title: "Title Agents & Abstracters",
      subtitle: "The local professionals who search records and issue commitments",
      gradient: "from-[#2d6b3f] to-[#235532]",
      stats: [
        { value: "$325", label: "Starting Annual Dues" },
        { value: "6,000+", label: "Member Companies" },
      ],
      paragraphs: [
        "Title agents and abstracters form the backbone of the title industry. These local and regional professionals conduct title searches in county records, prepare abstracts of title, issue title commitments, resolve title defects, and facilitate the closing process. They work directly with homebuyers, sellers, lenders, and real estate agents.",
        "ALTA membership gives title agents access to Best Practices certification — increasingly required by lenders to be on their approved closing agent lists. Agents also benefit from ALTA's education programs (including the NTP designation), industry networking at ALTA ONE and ALTA EDge, and the advocacy that protects their business at the state and federal level.",
        "Abstracters — professionals who compile the chain of title from public records — are a critical part of the title process, especially in states where abstracts of title are used in lieu of or alongside title insurance. ALTA membership connects abstracters with the broader title community and provides resources for professional development.",
        "Agent/Abstractor annual dues are based on revenue: $325 for companies with up to $200K revenue, scaling to $1,765 for $900K–$1M revenue, with increments of $175 per additional $100K above $1M. Installment plans are available by contacting ALTA directly.",
      ],
      bullets: [
        "Best Practices certification — the key to lender-approved closing agent lists",
        "NTP designation for professional recognition and career advancement",
        "ALTA EDge conference with tracks specifically designed for agents",
        "State legislative tracking and advocacy on issues affecting agents",
        "Networking with underwriters, technology providers, and peers",
      ],
      links: [
        { label: "Membership Info", url: "https://www.alta.org/membership/" },
      ],
    } as ModalData,
  },
  {
    type: "Settlement/Escrow Companies",
    desc: "Companies providing settlement, escrow, and closing services to buyers and sellers.",
    color: "border-l-[#0a7ea8]",
    icon: "bg-[#e6f1f5] text-[#0a7ea8]",
    modal: {
      title: "Settlement & Escrow Companies",
      subtitle: "Professionals managing the closing transaction from contract to keys",
      gradient: "from-[#0a7ea8] to-[#077a9e]",
      paragraphs: [
        "Settlement and escrow companies manage the closing transaction — holding earnest money deposits, coordinating document execution, managing disbursements, and ensuring that all conditions of the purchase agreement are met before closing. In many states, settlement agents also serve as the title agent, combining both functions.",
        "ALTA membership is particularly valuable for settlement companies because Best Practices Pillar 2 (Escrow Trust Accounting) and Pillar 4 (Settlement Procedures) directly address their core operations. Lenders scrutinize escrow handling more than almost any other vendor function, and Best Practices certification provides the documentation and process assurance they need.",
        "The settlement industry is rapidly evolving with hybrid and fully remote closings, eClosing technology, and Remote Online Notarization. ALTA's education programs and conferences keep settlement professionals current on these changes, and ALTA's advocacy ensures that the regulatory framework supports innovation while protecting consumers.",
      ],
      bullets: [
        "Best Practices Pillars 2 & 4 provide escrow and settlement frameworks",
        "Education on eClosing, RON, and hybrid closing technology",
        "Wire fraud prevention resources critical for escrow operations",
        "Networking with title underwriters, agents, and technology providers",
      ],
      links: [
        { label: "Membership Info", url: "https://www.alta.org/membership/" },
      ],
    } as ModalData,
  },
  {
    type: "Attorneys",
    desc: "Real estate attorneys who provide title opinions, handle closings, or work in the title insurance space.",
    color: "border-l-[#5b3a8c]",
    icon: "bg-[#f0ecf6] text-[#5b3a8c]",
    modal: {
      title: "Attorney Members",
      subtitle: "Real estate attorneys in title, closing, and settlement practice",
      gradient: "from-[#5b3a8c] to-[#482d70]",
      paragraphs: [
        "In many states — particularly in the Northeast and Southeast — real estate attorneys play a central role in the closing process, providing title opinions, examining abstracts, supervising closings, and issuing title insurance as agents of underwriters. ALTA membership connects these attorneys with the broader title industry community.",
        "Attorney members benefit from ALTA's policy form updates (which directly affect the policies they issue), CLE-eligible education programs, and regulatory tracking that covers the intersection of real estate law and title insurance regulation. The NTP designation is available to qualifying attorneys and demonstrates cross-disciplinary expertise.",
        "ALTA's advocacy work often addresses issues at the intersection of law and title — including attorney-agent licensing, unauthorized practice of law considerations, and the regulatory treatment of attorney-conducted closings under RESPA and state law.",
      ],
      bullets: [
        "CLE-eligible education through ALTA Learning and conferences",
        "Policy form updates that affect attorney-issued policies",
        "Advocacy on attorney-agent licensing and UPL issues",
        "NTP designation available for qualifying attorneys",
        "Networking at ALTA ONE and ALTA EDge with industry peers",
      ],
      links: [
        { label: "Membership Info", url: "https://www.alta.org/membership/" },
      ],
    } as ModalData,
  },
  {
    type: "Technology Providers",
    desc: "Companies providing software, platforms, and tools to the title and settlement industry.",
    color: "border-l-[#8b6914]",
    icon: "bg-[#faf4e4] text-[#8b6914]",
    modal: {
      title: "Technology Provider Members",
      subtitle: "The companies building the tools that power modern title operations",
      gradient: "from-[#8b6914] to-[#705410]",
      paragraphs: [
        "Technology providers are an increasingly important part of the ALTA ecosystem. These companies develop the software, platforms, and services that title companies rely on daily — title production systems, closing and settlement platforms, eClosing and RON technology, wire fraud prevention tools, document management, and more.",
        "Companies like Qualia, SoftPro, RamQuest, ClosingLock, CertifID, and DataTrace are all part of the ALTA community. Membership gives technology providers direct access to the professionals who use their products, insight into industry trends and regulatory changes that will affect product development, and expo opportunities at ALTA ONE and ALTA EDge.",
        "ALTA's technology-focused conference tracks and webinars help technology providers understand the operational realities of their customers, while the association's advocacy on issues like eRecording, RON, and digital identity directly affects the market for title technology solutions.",
      ],
      bullets: [
        "Expo and sponsorship opportunities at ALTA ONE and ALTA EDge",
        "Direct access to 6,000+ potential customers",
        "Insight into regulatory trends affecting product development",
        "Technology tracks at ALTA conferences",
        "Partner with ALTA on industry innovation initiatives",
      ],
      links: [
        { label: "Membership Info", url: "https://www.alta.org/membership/" },
      ],
    } as ModalData,
  },
  {
    type: "Associate Members",
    desc: "Individuals and companies with a professional interest in the title industry — lenders, real estate firms, and more.",
    color: "border-l-[#943030]",
    icon: "bg-[#f5e8e8] text-[#943030]",
    modal: {
      title: "Associate Members",
      subtitle: "Professionals with a stake in the title and settlement industry",
      gradient: "from-[#943030] to-[#7a2020]",
      paragraphs: [
        "Associate membership is designed for individuals and companies with a professional interest in the title industry who don't fit into the other membership categories. This includes mortgage lenders, real estate brokerages, home builders, appraisers, surveyors, and other professionals whose work intersects with title insurance and settlement services.",
        "Associate members receive access to ALTA's industry research and publications, member pricing for conferences and events, networking opportunities with title professionals, and visibility into the regulatory and legislative landscape that affects the broader real estate transaction process.",
        "For lenders in particular, associate membership provides valuable insight into the title and settlement operations that are a critical part of every mortgage origination — helping them select and manage their vendor relationships more effectively.",
      ],
      bullets: [
        "Industry research, publications, and TitleNews Online",
        "Member pricing for ALTA ONE, ALTA EDge, and webinars",
        "Networking with title professionals across all 50 states",
        "Insight into regulatory trends affecting real estate transactions",
      ],
      links: [
        { label: "Membership Info", url: "https://www.alta.org/membership/" },
      ],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   EVENTS DATA
   ═══════════════════════════════════════════════════════ */
const events = [
  {
    name: "ALTA ONE 2026",
    desc: "The ultimate gathering of title professionals. Network, collaborate, and be inspired by industry leaders. Keynotes, breakout sessions, and expo hall.",
    when: "Oct 12-15, 2026 | Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    badge: "Flagship",
    color: "from-[#1a5276] to-[#154463]",
    url: "https://www.alta.org/altaone/",
    modal: {
      title: "ALTA ONE 2026",
      subtitle: "October 12–15, 2026 — The Westin Kierland Resort & Spa, Scottsdale, AZ",
      gradient: "from-[#1a5276] to-[#154463]",
      stats: [
        { value: "2,000+", label: "Expected Attendees" },
        { value: "4 Days", label: "Of Programming" },
        { value: "100+", label: "Sessions" },
        { value: "30+", label: "Conference Partners" },
      ],
      paragraphs: [
        "ALTA ONE is the title industry's premier annual conference — four days of keynote presentations, multi-track breakout sessions, an expo hall showcasing the latest technology, and unparalleled networking opportunities. The 2026 edition takes place at The Westin Kierland Resort & Spa in Scottsdale, Arizona. Conference partners include SoftPro, Stewart Title, Qualia, FNF Family of Companies, First American, Closinglock, Old Republic, CertifID, Westcor, DataTrace, and many more.",
        "The conference agenda typically features tracks covering Business Strategy & Leadership, Technology & Innovation, Regulatory & Compliance, and Operations & Best Practices. Attendees can customize their experience across dozens of sessions, choosing the topics most relevant to their role and business needs.",
        "Past ALTA ONE conferences have featured presentations on AI in title production, the future of Remote Online Notarization, M&A trends in the title industry, cybersecurity and wire fraud prevention, and leadership development. The expo hall features the industry's top technology providers, underwriters, and service companies.",
        "The evening events and networking opportunities are consistently rated as the most valuable aspect of ALTA ONE. From welcome receptions to closing celebrations, the informal connections made at ALTA ONE drive business relationships throughout the year.",
      ],
      bullets: [
        "Multi-track sessions: Strategy, Technology, Compliance, Operations",
        "Expo hall with 50+ industry vendors and technology providers",
        "Keynotes from industry leaders, regulators, and innovators",
        "Evening networking events and industry celebrations",
        "Early-bird and ALTA member pricing available",
        "CE/CLE credits for qualifying sessions",
      ],
      links: [
        { label: "ALTA ONE 2026", url: "https://www.alta.org/altaone/" },
      ],
    } as ModalData,
  },
  {
    name: "ALTA EDge 2026",
    desc: "Education-first experience with Business Operations and Technology tracks — AI, automation, leadership, and operational excellence.",
    when: "Mar 18-20, 2026 | Frisco, TX",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80",
    badge: "Education",
    color: "from-[#2d6b3f] to-[#235532]",
    url: "https://meetings.alta.org/edge2026/",
    modal: {
      title: "ALTA EDge 2026",
      subtitle: "March 18–20, 2026 — Frisco, Texas",
      gradient: "from-[#2d6b3f] to-[#235532]",
      paragraphs: [
        "ALTA EDge is the association's education-focused conference — designed for title professionals who want deep, practical learning without the larger-scale expo environment of ALTA ONE. The 2026 edition takes place in Frisco, Texas (part of the Dallas-Fort Worth metro area), making it accessible to the large concentration of title professionals in the South-Central region.",
        "EDge features two primary tracks: Business Operations and Technology. The Business Operations track covers topics like operational efficiency, escrow management, compliance, HR and talent development, and financial management. The Technology track focuses on AI and automation, digital closings, cybersecurity, and emerging tools that are transforming title operations.",
        "The smaller, more intimate format of EDge allows for more interactive sessions — panel discussions, workshops, and roundtables where attendees can engage directly with presenters and peers. Many attendees describe EDge as the conference where they get the most actionable takeaways for immediate implementation.",
      ],
      bullets: [
        "Two tracks: Business Operations and Technology",
        "Intimate format with interactive sessions and workshops",
        "AI, automation, and digital closing deep-dives",
        "Operational efficiency and compliance best practices",
        "Networking in a focused, education-first environment",
        "CE/CLE credits available",
      ],
      links: [
        { label: "ALTA EDge 2026", url: "https://meetings.alta.org/edge2026/" },
      ],
    } as ModalData,
  },
  {
    name: "Advocacy Summit 2026",
    desc: "Title professionals meet with their members of Congress on Capitol Hill to advocate for the industry and consumer protection.",
    when: "May 11-13, 2026 | Washington, D.C.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80",
    badge: "Advocacy",
    color: "from-[#943030] to-[#7a2020]",
    url: "https://www.alta.org/advocacy/",
    modal: {
      title: "ALTA Advocacy Summit",
      subtitle: "May 11–13, 2026 — Washington, D.C.",
      gradient: "from-[#943030] to-[#7a2020]",
      paragraphs: [
        "The 2026 ALTA Advocacy Summit takes place May 11–13 in Washington, D.C. — bringing title professionals from across the country to meet face-to-face with their members of Congress and advocate for policies that protect the title industry and the consumers it serves.",
        "Attendees are briefed by ALTA's government affairs team on the current legislative landscape, including bills and regulatory actions affecting title insurance, settlement services, and real property rights. They then visit their Senators and Representatives on Capitol Hill, armed with talking points and industry data prepared by ALTA.",
        "The Advocacy Summit has been instrumental in building Congressional support for the SECURE Notarization Act, defending the role of owner's title insurance, and ensuring that title professionals have a seat at the table when housing policy is debated. Many participants describe it as one of the most impactful experiences of their careers — seeing firsthand how their voice can influence policy.",
        "ALTA staff coordinates the Hill visits, arranges meetings with Congressional offices, and provides logistics support. No prior lobbying experience is required — ALTA prepares attendees with everything they need to be effective advocates.",
      ],
      bullets: [
        "Face-to-face meetings with Senators and Representatives",
        "ALTA government affairs team provides briefings and talking points",
        "No lobbying experience required — ALTA provides full preparation",
        "Network with title professionals from across the country",
        "See firsthand how the industry's voice influences policy",
      ],
      links: [
        { label: "ALTA Advocacy", url: "https://www.alta.org/advocacy/" },
      ],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   PROGRAMS DATA
   ═══════════════════════════════════════════════════════ */
const programs = [
  {
    name: "Title Action Network (TAN)",
    desc: "The industry's free grassroots advocacy network. TAN sends action alerts on state and federal issues that affect your business and customers — enabling you to contact your legislators with one click. Free for members and non-members.",
    stat: "Free to join",
    url: "https://www.alta.org/tan/",
    color: "from-[#943030] to-[#7a2020]",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    modal: {
      title: "Title Action Network (TAN)",
      subtitle: "5,159 members and growing — free grassroots advocacy",
      gradient: "from-[#943030] to-[#7a2020]",
      stats: [
        { value: "5,159", label: "Current Members" },
        { value: "FREE", label: "Cost to Join" },
        { value: "~2 min", label: "Signup Time" },
      ],
      paragraphs: [
        "The Title Action Network (TAN) is ALTA's free grassroots advocacy platform. When state or federal legislation threatens the title industry or consumer property rights, TAN sends action alerts directly to registered members with pre-drafted messages that can be sent to the relevant legislators with one click.",
        "TAN is free for everyone — you do not need to be an ALTA member to participate. The network is designed to amplify the voice of individual title professionals who may not have the time or resources to monitor legislation on their own. When thousands of title professionals send the same message to their legislators simultaneously, it creates a powerful signal that policymakers cannot ignore.",
        "Recent TAN campaigns have focused on Remote Online Notarization legislation at the state level, defense of title insurance in states where alternative products have been proposed, support for the SECURE Notarization Act at the federal level, and opposition to proposals that would eliminate owner's title insurance requirements.",
        "Signing up takes less than a minute. TAN sends alerts only when action is needed — typically a few times per year — so participants are never overwhelmed with communications.",
      ],
      bullets: [
        "Completely free — no ALTA membership required",
        "One-click messaging to your state and federal legislators",
        "Pre-drafted messages prepared by ALTA's policy team",
        "Alerts only when action is needed — no spam",
        "Join the thousands of title professionals already participating",
      ],
      links: [
        { label: "Join TAN Free", url: "https://www.alta.org/tan/" },
      ],
    } as ModalData,
  },
  {
    name: "ALTA Good Deeds Foundation",
    desc: "Founded in 2020 to bolster the charitable efforts of title professionals. Awards grants to 501(c)(3) organizations supported by title industry members. You don't need to be an ALTA member to apply.",
    stat: "Over $1.3M awarded in 5 years",
    url: "https://www.altagooddeeds.org/",
    color: "from-[#2d6b3f] to-[#235532]",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    modal: {
      title: "ALTA Good Deeds Foundation",
      subtitle: "Amplifying the charitable impact of title professionals",
      gradient: "from-[#2d6b3f] to-[#235532]",
      stats: [
        { value: "$1.3M+", label: "Total Awarded in 5 Years" },
        { value: "169+", label: "Charities Supported" },
        { value: "41+", label: "States + D.C." },
        { value: "2020", label: "Founded by Mary O'Donnell" },
      ],
      paragraphs: [
        "The ALTA Good Deeds Foundation was established in 2020 by ALTA Past President Mary O'Donnell to recognize and amplify the charitable work that title professionals are already doing in their communities. The foundation — a 501(c)(3) nonprofit — awards grants to charitable organizations championed by individuals in the title insurance and settlement services industry.",
        "In just five years, the Good Deeds Foundation has awarded over $1.3 million to more than 169 charities across 41 states and the District of Columbia, with recent grant rounds of $125,000. Grants support a wide range of causes — housing assistance, youth programs, food banks, health organizations, education, veterans' services, and community development.",
        "The application process is straightforward: a title professional nominates a 501(c)(3) organization they actively support, explains their involvement, and the foundation's board reviews applications on a regular cycle. You do not need to be an ALTA member to nominate a charity — the program is open to all title industry professionals.",
        "The foundation is funded by voluntary contributions from ALTA members, event proceeds, and corporate sponsors. It operates as an independent 501(c)(3) with its own board of directors drawn from the title industry.",
      ],
      bullets: [
        "Open to all title professionals — no ALTA membership required to apply",
        "Grants to 501(c)(3) organizations championed by title industry members",
        "169 charities funded across 41 states and D.C. since 2020",
        "Causes include housing, youth, food security, health, veterans, and education",
        "Funded by voluntary member contributions and corporate sponsors",
      ],
      links: [
        { label: "Good Deeds Foundation", url: "https://www.altagooddeeds.org/" },
        { label: "Apply for a Grant", url: "https://www.altagooddeeds.org/" },
      ],
    } as ModalData,
  },
  {
    name: "TIPAC",
    desc: "Title Industry Political Action Committee — the collective political voice of the title insurance industry. TIPAC builds relationships with members of Congress who champion property rights, consumer protection, and smart regulation.",
    stat: "Official ALTA PAC",
    url: "https://www.alta.org/advocacy/tipac/",
    color: "from-[#1a5276] to-[#154463]",
    icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z",
    modal: {
      title: "TIPAC — Political Action Committee",
      subtitle: "The title industry's nonpartisan voice in federal elections",
      gradient: "from-[#1a5276] to-[#154463]",
      paragraphs: [
        "TIPAC — the Title Industry Political Action Committee — is ALTA's nonpartisan PAC that supports candidates for federal office who understand and champion the title industry. TIPAC directs voluntary contributions to incumbents and candidates based solely on their positions on issues affecting title insurance, settlement services, and real property rights.",
        "TIPAC contributions support candidates who advocate for consumer choice in title insurance selection, Remote Online Notarization legislation, strong RESPA enforcement against kickbacks and referral fees, cybersecurity and wire fraud prevention policy, housing finance reform that preserves the role of title insurance, and protection of property rights in eminent domain and regulatory takings cases.",
        "TIPAC is a bipartisan effort — the PAC supports both Democrats and Republicans who have demonstrated their commitment to these issues. Contributions are voluntary and separate from ALTA membership dues. Members can contribute at various levels, with recognition at ALTA events for significant contributors.",
      ],
      bullets: [
        "Nonpartisan — supports candidates based on policy positions, not party",
        "Voluntary contributions separate from ALTA membership dues",
        "Focuses on title insurance, property rights, and consumer protection issues",
        "Works in coordination with ALTA's lobbying and TAN's grassroots advocacy",
        "Recognition at ALTA events for TIPAC contributors",
      ],
      links: [
        { label: "TIPAC", url: "https://www.alta.org/advocacy/tipac/" },
      ],
    } as ModalData,
  },
  {
    name: "NTP Designation",
    desc: "The National Title Professional designation recognizes professionals who demonstrate the knowledge, experience, and dedication essential to the safe and efficient transfer of real property. Includes Credly digital badge and industry recognition.",
    stat: "Career distinction",
    url: "https://www.alta.org/career-and-learning/national-title-professional/",
    color: "from-[#5b3a8c] to-[#482d70]",
    icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    modal: {
      title: "National Title Professional (NTP) Designation",
      subtitle: "The industry's most recognized professional credential",
      gradient: "from-[#5b3a8c] to-[#482d70]",
      paragraphs: [
        "The National Title Professional (NTP) designation is the title industry's premier professional credential. Established by ALTA, the NTP recognizes individuals who have demonstrated the knowledge, experience, and professional commitment essential to the safe and efficient transfer of real property.",
        "To earn the NTP designation, candidates must meet specific eligibility requirements: minimum 5 years of title industry experience, ALTA membership, State Land Title Association membership, completion of 3 mandatory courses (Title 101, Title 201, and Ethics in the Title Industry — or passing an NTP equivalency exam), and TAN membership. The NTP must be renewed every 3 years with a minimum of 30 renewal points, at least 10 of which must come from direct ALTA involvement.",
        "NTP holders receive a Credly digital badge that can be displayed on LinkedIn profiles, email signatures, and business cards — providing instant credibility with clients, lenders, and industry peers. The designation is recognized throughout the title industry as a mark of excellence and commitment to professional standards.",
        "The NTP program is administered by ALTA's Career & Learning division. Candidates apply through the ALTA website, and applications are reviewed by the NTP Committee. Successful candidates are recognized at ALTA events and listed in the NTP directory.",
      ],
      bullets: [
        "Industry experience requirement ensures real-world competence",
        "ALTA-approved education courses in title insurance and compliance",
        "Credly digital badge for LinkedIn, email, and business cards",
        "Recognition at ALTA events and listing in the NTP directory",
        "Demonstrates commitment to professional excellence and consumer protection",
        "Sets you apart in a competitive market — clients and lenders recognize the NTP",
      ],
      links: [
        { label: "NTP Designation", url: "https://www.alta.org/career-and-learning/national-title-professional/" },
        { label: "Apply Now", url: "https://www.alta.org/career-and-learning/national-title-professional/" },
      ],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   BEST PRACTICES PILLARS DATA
   ═══════════════════════════════════════════════════════ */
const bestPracticesPillars = [
  {
    num: "1", title: "Licensing",
    desc: "Maintain proper state licensing for all employees involved in title and settlement operations.",
    modal: {
      title: "Pillar 1: Licensing",
      subtitle: "Ensuring proper authorization to operate",
      gradient: "from-[#1a5276] to-[#154463]",
      paragraphs: [
        "Pillar 1 requires title companies to establish and maintain written procedures to ensure that all employees involved in title and settlement operations are properly licensed, registered, or otherwise authorized by their state's regulatory agency. This includes title agents, settlement agents, notaries, and escrow officers.",
        "Companies must maintain current copies of all licenses and registrations, implement a process for tracking renewal dates, and promptly update records when employees join or leave the company. The pillar also covers the company's own business licenses, corporate registrations, and any required state filings.",
        "Compliance with Pillar 1 is foundational — without proper licensing, none of the other pillars matter. Third-party assessors verify that licensing records are current, that renewal tracking is in place, and that the company has a process for ensuring new employees obtain required licenses before performing regulated activities.",
      ],
      bullets: [
        "Written procedures for license tracking and renewal",
        "Current copies of all employee licenses and registrations",
        "Process for onboarding new employees with licensing requirements",
        "Company business licenses and state registrations maintained",
        "Regular audits to verify compliance",
      ],
      links: [{ label: "Best Practices", url: "https://www.alta.org/best-practices/" }],
    } as ModalData,
  },
  {
    num: "2", title: "Escrow Controls",
    desc: "Implement comprehensive escrow account management with regular reconciliation, positive pay, and segregated accounts.",
    modal: {
      title: "Pillar 2: Escrow Trust Accounting",
      subtitle: "Protecting client funds with rigorous controls",
      gradient: "from-[#2d6b3f] to-[#235532]",
      paragraphs: [
        "Pillar 2 addresses the handling of client funds — one of the most critical and sensitive aspects of title and settlement operations. Companies must maintain escrow trust accounts that are separate from operating accounts, implement three-way reconciliation (bank statement vs. book balance vs. individual file balances), and use positive pay controls to prevent unauthorized disbursements.",
        "The pillar requires daily reconciliation of escrow accounts, prompt identification and resolution of any discrepancies, written procedures for handling outstanding checks and unclaimed funds, and regular reporting to management on the status of trust accounts.",
        "This pillar directly addresses the risk of escrow mismanagement and embezzlement — problems that have historically caused significant harm to consumers and the industry's reputation. Lenders scrutinize escrow controls more than almost any other aspect of vendor management, making Pillar 2 compliance essential for business development.",
      ],
      bullets: [
        "Segregated trust accounts — never commingled with operating funds",
        "Three-way reconciliation: bank, books, and individual file balances",
        "Positive pay controls to prevent unauthorized disbursements",
        "Daily reconciliation with prompt discrepancy resolution",
        "Written procedures for outstanding checks and unclaimed funds",
        "Regular management reporting on trust account status",
      ],
      links: [{ label: "Best Practices", url: "https://www.alta.org/best-practices/" }],
    } as ModalData,
  },
  {
    num: "3", title: "Privacy & Security",
    desc: "Protect consumer data with encryption, access controls, employee training, and incident response plans. Includes wire fraud prevention.",
    modal: {
      title: "Pillar 3: Privacy & Information Security",
      subtitle: "Protecting consumer data and preventing wire fraud",
      gradient: "from-[#943030] to-[#7a2020]",
      stats: [
        { value: "$275M", label: "Annual Wire Fraud Losses" },
        { value: "59%", label: "YoY Increase" },
      ],
      paragraphs: [
        "Pillar 3 is the most frequently updated pillar — reflecting the rapidly evolving cybersecurity threat landscape. The current version requires companies to implement comprehensive information security programs covering data encryption (both at rest and in transit), access controls with multi-factor authentication, employee cybersecurity training, and documented incident response plans.",
        "The 2023 update specifically addressed AI-powered threats including deepfake voice calls used in business email compromise (BEC) attacks, social engineering tactics that exploit publicly available information, and the need for out-of-band verification of all wire transfer instructions.",
        "Wire fraud prevention is a central focus of Pillar 3. Companies must implement wire verification procedures that include confirming wiring instructions via a known phone number (not one provided in an email), using secure wire verification platforms (such as CertifID), and training all employees to recognize and report suspicious communications.",
        "Pillar 3 also covers physical security (locked offices, clean desk policies), data retention and destruction, vendor management for cloud services and software providers, and compliance with state and federal privacy regulations including the Gramm-Leach-Bliley Act.",
      ],
      bullets: [
        "Data encryption at rest and in transit",
        "Multi-factor authentication for all systems",
        "Annual employee cybersecurity training",
        "Documented incident response plan",
        "Wire verification procedures (phone callback, CertifID)",
        "Deepfake and social engineering awareness training",
        "Physical security and clean desk policies",
        "Vendor management for cloud and SaaS providers",
      ],
      links: [
        { label: "Best Practices", url: "https://www.alta.org/best-practices/" },
        { label: "Wire Fraud Prevention", url: "/stop-fraud" },
      ],
    } as ModalData,
  },
  {
    num: "4", title: "Settlement Procedures",
    desc: "Follow documented, auditable procedures for every closing to ensure accuracy, compliance, and consumer protection.",
    modal: {
      title: "Pillar 4: Settlement Procedures",
      subtitle: "Standardized closing workflows for accuracy and compliance",
      gradient: "from-[#0a7ea8] to-[#077a9e]",
      paragraphs: [
        "Pillar 4 requires title companies to establish written procedures for the entire settlement process — from opening a title order through recording, disbursement, and post-closing. The goal is to ensure that every closing follows a consistent, auditable workflow that protects consumers and satisfies lender requirements.",
        "Key requirements include document preparation and review checklists, proper handling and execution of closing documents, timely and accurate recording of documents in the appropriate jurisdiction, compliant disbursement of funds according to the settlement statement, post-closing procedures including delivery of policies and final documents to all parties.",
        "Pillar 4 also addresses the handling of closings conducted remotely — including eClosing and RON (Remote Online Notarization) transactions — ensuring that the same procedural safeguards apply regardless of the closing format.",
      ],
      bullets: [
        "Written procedures for the entire settlement workflow",
        "Document preparation and review checklists",
        "Timely recording in the appropriate jurisdiction",
        "Compliant disbursement per the settlement statement",
        "Post-closing delivery of policies and documents",
        "RON and eClosing procedures with equivalent safeguards",
      ],
      links: [{ label: "Best Practices", url: "https://www.alta.org/best-practices/" }],
    } as ModalData,
  },
  {
    num: "5", title: "Title Policy Production",
    desc: "Issue title insurance policies promptly and accurately, with proper documentation and recording verification.",
    modal: {
      title: "Pillar 5: Title Policy Production",
      subtitle: "Accurate, timely policy issuance after closing",
      gradient: "from-[#5b3a8c] to-[#482d70]",
      paragraphs: [
        "Pillar 5 addresses the production and delivery of title insurance policies — ensuring that both owner's and lender's policies are issued promptly after closing, that they accurately reflect the terms of the transaction, and that all required endorsements are included.",
        "Companies must have written procedures for policy production timelines, quality control review before issuance, delivery to the insured and/or lender, and tracking of outstanding policies. The pillar also covers the reporting of policy production to the underwriter and the proper handling of policy jackets and schedules.",
        "Timely policy production matters because the title insurance policy is the consumer's evidence of coverage. Delays in policy issuance can create problems when homeowners need to file claims or when properties are refinanced or sold — the new transaction may be delayed if the prior policy hasn't been issued.",
      ],
      bullets: [
        "Written timelines for policy issuance after closing",
        "Quality control review before policies are delivered",
        "Tracking system for outstanding policies",
        "Proper reporting of production to underwriters",
        "Endorsements included per the commitment",
      ],
      links: [{ label: "Best Practices", url: "https://www.alta.org/best-practices/" }],
    } as ModalData,
  },
  {
    num: "6", title: "Professional Liability",
    desc: "Maintain appropriate errors & omissions insurance and fidelity coverage to protect consumers and the company.",
    modal: {
      title: "Pillar 6: Professional Liability Insurance",
      subtitle: "E&O, fidelity, and cyber coverage for consumer protection",
      gradient: "from-[#8b6914] to-[#705410]",
      paragraphs: [
        "Pillar 6 requires title companies to maintain appropriate insurance coverage — including errors and omissions (E&O) insurance, fidelity bonds, and cyber liability coverage. This ensures that consumers are protected even if the company makes an error or if an employee engages in misconduct.",
        "E&O insurance covers claims arising from professional mistakes — such as missing a lien during a title search, errors in closing documents, or miscalculation of settlement figures. Fidelity bonds protect against employee dishonesty, including theft of escrow funds. Cyber liability coverage addresses the financial consequences of data breaches and cyberattacks.",
        "Companies must maintain coverage amounts appropriate for their transaction volume and risk profile, review and update coverage annually, and provide evidence of insurance to lenders and business partners upon request. Many lenders now require specific minimum coverage amounts as a condition of their approved closing agent lists.",
      ],
      bullets: [
        "Errors & Omissions (E&O) insurance for professional liability",
        "Fidelity bonds covering employee dishonesty",
        "Cyber liability coverage for data breaches and attacks",
        "Annual review and appropriate coverage limits",
        "Evidence of insurance available to lenders and partners",
      ],
      links: [{ label: "Best Practices", url: "https://www.alta.org/best-practices/" }],
    } as ModalData,
  },
  {
    num: "7", title: "Consumer Complaints",
    desc: "Establish a formal process for receiving, tracking, and resolving consumer complaints in a timely manner.",
    modal: {
      title: "Pillar 7: Consumer Complaints",
      subtitle: "Formal process for complaint resolution",
      gradient: "from-[#1a5276] to-[#154463]",
      paragraphs: [
        "Pillar 7 requires title companies to establish a formal, documented process for receiving, tracking, and resolving consumer complaints. This includes designating a responsible individual or team, maintaining a complaint log, setting resolution timelines, and using complaint data to identify and address systemic issues.",
        "The complaint process must be accessible to consumers — companies should provide clear contact information for complaints on their website and in closing documents. Complaints must be acknowledged promptly (typically within 2 business days), investigated thoroughly, and resolved within a defined timeframe.",
        "Pillar 7 also emphasizes using complaint data as a management tool. Patterns in complaints can reveal training gaps, process deficiencies, or communication problems that, when addressed, improve the overall customer experience and reduce future complaints.",
      ],
      bullets: [
        "Designated complaint handler or team",
        "Accessible complaint submission process",
        "Complaint log with tracking and resolution status",
        "Prompt acknowledgment (within 2 business days)",
        "Defined resolution timelines",
        "Regular management review of complaint trends",
      ],
      links: [{ label: "Best Practices", url: "https://www.alta.org/best-practices/" }],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   EDUCATION & PUBLICATIONS DATA
   ═══════════════════════════════════════════════════════ */
const educationItems = [
  {
    name: "ALTA Learning (Elevate)",
    desc: "Online courses designed by LTI and the ALTA Education Committee — learn virtually about title insurance, compliance, and operations.",
    url: "https://elevate.alta.org/",
    color: "border-l-[#0a7ea8]",
    modal: {
      title: "ALTA Learning — Elevate Platform",
      subtitle: "On-demand professional education for title professionals",
      gradient: "from-[#0a7ea8] to-[#077a9e]",
      paragraphs: [
        "ALTA Learning (powered by the Elevate platform) is ALTA's online education portal, offering on-demand courses covering title insurance fundamentals, regulatory compliance, escrow management, cybersecurity, and advanced industry topics. Courses are developed by the ALTA Education Committee in partnership with LTI (Land Title Institute), ensuring content reflects real-world industry practices.",
        "The platform allows title professionals to learn at their own pace — completing courses on their schedule from any device. Course formats include video lectures, interactive modules, assessments, and downloadable resources. Many courses qualify for continuing education (CE) or continuing legal education (CLE) credits in participating states.",
        "ALTA members receive discounted access to Elevate courses, and some courses are available free to members as part of their membership benefits. The course catalog is regularly updated to reflect new regulatory requirements, technology changes, and emerging industry challenges.",
      ],
      bullets: [
        "On-demand courses available 24/7 from any device",
        "Developed by ALTA Education Committee and LTI",
        "CE/CLE credits available in participating states",
        "Discounted pricing for ALTA members",
        "Topics: title insurance, compliance, escrow, cybersecurity, operations",
      ],
      links: [{ label: "ALTA Learning", url: "https://elevate.alta.org/" }],
    } as ModalData,
  },
  {
    name: "Free Webinars",
    desc: "Regular webinars on regulatory updates, cybersecurity, technology, and business strategy. Open to both members and non-members.",
    url: "https://www.alta.org/education/",
    color: "border-l-[#2d6b3f]",
    modal: {
      title: "Free Industry Webinars",
      subtitle: "Regular live sessions on the topics that matter most",
      gradient: "from-[#2d6b3f] to-[#235532]",
      paragraphs: [
        "ALTA hosts regular webinars covering the most pressing topics in the title and settlement industry. These live sessions feature presentations by industry experts, regulators, and practitioners — providing timely insights on regulatory changes, technology trends, cybersecurity threats, and business strategy.",
        "Many webinars are free and open to both ALTA members and non-members, making them an accessible entry point for professionals who want to stay current without attending a full conference. Recordings are typically available after the live session for those who can't attend in real-time.",
        "Recent webinar topics have included AI and automation in title production, updates to ALTA Best Practices, state-by-state RON implementation status, wire fraud prevention strategies, and CFPB regulatory guidance. CE/CLE credits are available for qualifying sessions.",
      ],
      bullets: [
        "Free webinars open to members and non-members",
        "Live sessions with industry experts and regulators",
        "Recordings available for on-demand viewing",
        "CE/CLE credits for qualifying sessions",
        "Topics: regulatory updates, technology, cybersecurity, strategy",
      ],
      links: [{ label: "Education", url: "https://www.alta.org/education/" }],
    } as ModalData,
  },
  {
    name: "TitleNews Online",
    desc: "ALTA's industry newsletter emailed twice weekly with the top stories impacting title insurance — stay ahead of regulatory and market changes.",
    url: "https://www.alta.org/publications/title-news-online.cfm",
    color: "border-l-[#1a5276]",
    modal: {
      title: "TitleNews Online",
      subtitle: "The title industry's essential twice-weekly newsletter",
      gradient: "from-[#1a5276] to-[#154463]",
      paragraphs: [
        "TitleNews Online is ALTA's flagship industry newsletter, delivered via email twice weekly to subscribers. It curates the most important stories affecting the title insurance and settlement services industry — regulatory changes, market data, technology developments, legislative updates, cybersecurity alerts, and member spotlights.",
        "The newsletter serves as the industry's essential news source, often breaking stories that affect how title companies operate before they appear in mainstream media. Whether it's a new CFPB enforcement action, a state legislature considering changes to title insurance regulation, or a major cybersecurity threat, TitleNews Online covers it.",
        "In addition to the twice-weekly email, ALTA publishes TitleNews Magazine — a quarterly print and digital publication featuring in-depth feature articles, industry analysis, and profiles of title professionals making a difference in their communities.",
      ],
      bullets: [
        "Twice-weekly email newsletter with curated industry news",
        "Regulatory changes, market data, and legislative updates",
        "Cybersecurity alerts and technology developments",
        "TitleNews Magazine — quarterly in-depth features",
        "Essential reading for staying current in the title industry",
      ],
      links: [{ label: "TitleNews Online", url: "https://www.alta.org/publications/title-news-online.cfm" }],
    } as ModalData,
  },
  {
    name: "ALTA Policy Forms",
    desc: "Standardized title insurance policy forms used industry-wide — owner's policies, loan policies, endorsements, and commitments.",
    url: "https://www.alta.org/policy-forms/",
    color: "border-l-[#5b3a8c]",
    modal: {
      title: "ALTA Policy Forms",
      subtitle: "The standardized forms that define title insurance coverage",
      gradient: "from-[#5b3a8c] to-[#482d70]",
      paragraphs: [
        "ALTA develops and maintains the standardized title insurance policy forms used throughout the industry. These forms include the Owner's Policy (protecting the homebuyer), the Loan Policy (protecting the lender), various endorsement forms that provide additional coverage for specific risks, and the Commitment for Title Insurance (issued before closing, outlining conditions that must be met).",
        "The policy forms are developed through ALTA's Forms Committee, which includes representatives from underwriters, agents, lenders, and attorneys. The committee regularly reviews and updates the forms to reflect changes in real estate law, transaction practices, and emerging risks.",
        "Standardized forms benefit everyone in the transaction. Lenders can evaluate title coverage consistently across transactions in different states. Homebuyers receive clear, consistent policy language. And title companies can focus on the substance of coverage rather than drafting unique policy language for each transaction.",
      ],
      bullets: [
        "Owner's Policy — protects the homebuyer's ownership rights",
        "Loan Policy — protects the lender's mortgage interest",
        "Endorsements — additional coverage for specific risks",
        "Commitment for Title Insurance — pre-closing conditions",
        "Developed by ALTA's Forms Committee with industry-wide input",
        "Regularly updated to reflect changes in law and practice",
      ],
      links: [{ label: "Policy Forms", url: "https://www.alta.org/policy-forms/" }],
    } as ModalData,
  },
  {
    name: "HomeClosing101",
    desc: "ALTA's consumer education platform — the site you're on now. Helps homebuyers understand closing, protect their rights, and avoid fraud.",
    url: "/",
    color: "border-l-[#0a7ea8]",
    modal: {
      title: "HomeClosing101 — Consumer Education",
      subtitle: "The site you're on right now",
      gradient: "from-[#0a7ea8] to-[#077a9e]",
      paragraphs: [
        "HomeClosing101 is ALTA's consumer education platform — a comprehensive resource that helps homebuyers understand the closing process, protect their property rights, and avoid wire fraud. The site covers every aspect of the home closing experience, from first-time buyer basics to detailed guides on specific documents like the Closing Disclosure and Loan Estimate.",
        "The platform features 450+ verified glossary terms, 250+ FAQ answers, interactive mortgage and affordability calculators, a searchable state insurance directory, industry news sourced from FBI, CFPB, NAR, and ALTA, and an AI assistant that can answer homebuyer questions in real-time.",
        "HomeClosing101 represents ALTA's commitment to consumer education. An informed homebuyer is a protected homebuyer — and every page on this site is designed to give consumers the knowledge they need to navigate the most significant financial transaction of their lives with confidence.",
      ],
      bullets: [
        "450+ verified glossary terms with definitions",
        "250+ FAQ answers sourced from authoritative organizations",
        "Mortgage and affordability calculators",
        "State-by-state insurance directory with contacts",
        "Wire fraud prevention guide with FBI data",
        "AI assistant for real-time homebuyer questions",
      ],
      links: [{ label: "Explore HC101", url: "/" }],
    } as ModalData,
  },
  {
    name: "Advocacy Resources",
    desc: "Federal and state legislation tracking, regulatory change alerts, ALTA position papers, and talking points for engaging your legislators.",
    url: "https://www.alta.org/advocacy/",
    color: "border-l-[#943030]",
    modal: {
      title: "Advocacy Resources & Tools",
      subtitle: "Everything you need to be an effective advocate",
      gradient: "from-[#943030] to-[#7a2020]",
      paragraphs: [
        "ALTA provides its members with a comprehensive suite of advocacy resources — tools, data, and materials that empower title professionals to be effective advocates for their industry at the federal and state level.",
        "Resources include a federal and state legislation tracker (updated in real-time as bills are introduced and move through committees), ALTA position papers on key issues, one-page talking points for meetings with legislators, industry data and infographics that illustrate the value of title insurance, and sample letters and testimony that members can customize for their own advocacy efforts.",
        "The advocacy resources work in concert with TAN (Title Action Network) for grassroots mobilization and TIPAC for political contributions — giving ALTA members a complete advocacy toolkit that covers education, engagement, and action.",
      ],
      bullets: [
        "Real-time federal and state legislation tracking",
        "Position papers on key industry issues",
        "One-page talking points for legislator meetings",
        "Industry data and infographics",
        "Sample letters and testimony templates",
        "Coordinates with TAN and TIPAC for comprehensive advocacy",
      ],
      links: [{ label: "Advocacy", url: "https://www.alta.org/advocacy/" }],
    } as ModalData,
  },
];

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════ */
const testimonials = [
  { quote: "ALTA Best Practices certification gave our company the credibility we needed to win new lender partnerships. It's the gold standard.", role: "Title Agency Owner", location: "Texas" },
  { quote: "The Advocacy Summit is where I go every year to make sure our legislators understand what title professionals do for consumers. It matters.", role: "VP of Operations", location: "Virginia" },
  { quote: "ALTA ONE isn't just a conference — it's where I've met the partners, vendors, and mentors who've shaped my career in the title industry.", role: "Settlement Agent", location: "Florida" },
  { quote: "The webinars keep my team current on regulatory changes without pulling them out of the office. The ROI on membership pays for itself.", role: "Compliance Director", location: "California" },
  { quote: "When wire fraud hit our industry, ALTA was at the forefront of the response — model legislation, CertifID partnerships, and Best Practices Pillar 3.", role: "Title Company President", location: "Ohio" },
  { quote: "The NTP designation set me apart in a competitive market. Clients and lenders recognize it as a mark of professionalism and expertise.", role: "National Title Professional", location: "Arizona" },
];

/* ═══════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function JoinAltaPage() {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

  return (
    <>
      <PageHero
        title="In the Title Industry? Join ALTA."
        subtitle="6,000+ member companies. 50 states. 117 years of advocacy. The voice of the title insurance and settlement services industry."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Join ALTA", href: "/join-alta" }]}
      />

      {/* Global modal */}
      {activeModal && <DetailModal data={activeModal} onClose={() => setActiveModal(null)} />}

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* ALTA Logo + Intro */}
          <div className="mb-10 p-6 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.alta.org/images/alta-logo.svg" alt="American Land Title Association" className="h-16 sm:h-20 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-alta-navy mb-2">American Land Title Association</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Founded in 1907, ALTA is the national trade organization for the title insurance and settlement services industry. With 6,000+ member companies in all 50 states, ALTA sets the standard for consumer protection, advocates for the industry on Capitol Hill, and drives innovation through education and technology. Whether you&apos;re a title agent, underwriter, attorney, or settlement professional, ALTA membership gives you the tools, advocacy, and network to thrive.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center tile-interactive">
                <p className="text-3xl font-bold text-alta-teal">{s.value}</p>
                <p className="text-xs text-alta-gray mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── BENEFITS ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Why Join ALTA?</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Click any card to explore in depth.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {benefits.map((b) => (
              <button key={b.title} onClick={() => setActiveModal(b.modal)} className="text-left feature-card rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white group cursor-pointer" data-accent="teal">
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${b.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center shadow-lg`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                      </svg>
                    </div>
                  </div>
                  {/* Expand hint */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-alta-navy mb-2 group-hover:text-alta-teal transition-colors">{b.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed">{b.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[11px] text-alta-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* ── ABOUT ALTA ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">About the American Land Title Association</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {aboutCards.map((item) => (
              <button key={item.title} onClick={() => setActiveModal(item.modal)} className="text-left group rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white tile-interactive cursor-pointer">
                <div className={`bg-gradient-to-r ${item.color} p-4 flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <div className="ml-auto w-6 h-6 rounded-full bg-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-alta-gray leading-relaxed">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-alta-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Expand
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* ── MEMBERSHIP TYPES ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Who Can Join?</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">ALTA membership is open to companies and individuals across the title insurance and settlement services ecosystem. Agent/Abstractor dues start at $325/year (based on annual revenue). Click any to learn more.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {membershipTypes.map((m) => (
              <button key={m.type} onClick={() => setActiveModal(m.modal)} className={`text-left p-4 bg-white rounded-xl border border-gray-100 border-l-4 ${m.color} shadow-sm tile-interactive cursor-pointer group`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1 group-hover:text-alta-teal transition-colors">{m.type}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{m.desc}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-alta-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* ── EVENTS ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Events & Conferences</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">ALTA brings the title industry together through flagship conferences, education events, and grassroots advocacy. Click any event to explore.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {events.map((e) => (
              <button key={e.name} onClick={() => setActiveModal(e.modal)} className="text-left rounded-2xl overflow-hidden border border-gray-100 shadow-sm tile-interactive group bg-white cursor-pointer">
                <div className="relative h-36 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${e.image}')` }} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${e.color} opacity-70`} />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="text-[9px] font-bold text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">{e.badge}</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-bold text-white text-base drop-shadow">{e.name}</h3>
                    <p className="text-[10px] text-white/70 mt-0.5">{e.when}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-alta-gray leading-relaxed mb-2">{e.desc}</p>
                  <span className="text-xs text-alta-teal font-medium flex items-center gap-1">
                    Explore details
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* ── PROGRAMS ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Programs & Initiatives</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">Beyond events, ALTA drives impact through grassroots advocacy, charitable giving, professional recognition, and political engagement. Click any to explore.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {programs.map((p) => (
              <button key={p.name} onClick={() => setActiveModal(p.modal)} className="text-left rounded-2xl overflow-hidden border border-gray-100 shadow-sm tile-interactive group bg-white cursor-pointer">
                <div className={`bg-gradient-to-r ${p.color} px-4 py-3 flex items-center gap-3`}>
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm">{p.name}</h3>
                    <p className="text-[9px] text-white/60">{p.stat}</p>
                  </div>
                  <div className="ml-auto w-6 h-6 rounded-full bg-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-alta-gray leading-relaxed mb-2">{p.desc}</p>
                  <span className="text-xs text-alta-teal font-medium flex items-center gap-1">
                    Learn more
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </button>
            ))}
          </div>

          <InlineAd />

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* ── EDUCATION ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-2">Education & Publications</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">ALTA provides industry-leading education, publications, and policy forms that keep your team current and your operations compliant. Click any to explore.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {educationItems.map((p) => (
              <button key={p.name} onClick={() => setActiveModal(p.modal)} className={`text-left p-4 bg-white rounded-xl border border-gray-100 border-l-4 ${p.color} shadow-sm tile-interactive group cursor-pointer`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1 group-hover:text-alta-teal transition-colors">{p.name}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{p.desc}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-alta-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Expand
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            ))}
          </div>

          {/* ── TESTIMONIALS ── */}
          <MemberTestimonials />

          <div className="h-1 bg-gradient-to-r from-transparent via-alta-teal/20 to-transparent my-10" />

          {/* ── WHY MEMBERS STAY ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Why Members Stay Year After Year</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { stat: "116+", label: "Years of continuous advocacy for the title industry since 1907", color: "text-[#1a5276]", bg: "bg-[#e8f0f5]", border: "border-[#c5d8e4]" },
              { stat: "6,000+", label: "Member companies across all 50 states and D.C.", color: "text-[#2d6b3f]", bg: "bg-[#e9f5ed]", border: "border-[#bddcc7]" },
              { stat: "7", label: "Pillars in the Best Practices framework — the industry gold standard", color: "text-[#5b3a8c]", bg: "bg-[#f0ecf6]", border: "border-[#d4c8e4]" },
              { stat: "$2.77B", label: "In BEC losses ALTA helps members defend against through education and tools", color: "text-[#943030]", bg: "bg-[#f5e8e8]", border: "border-[#e4c5c5]" },
            ].map((s) => (
              <div key={s.stat} className={`p-5 ${s.bg} rounded-xl border ${s.border} tile-interactive`}>
                <p className={`text-3xl font-bold ${s.color}`}>{s.stat}</p>
                <p className="text-xs text-alta-gray mt-1 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── BEST PRACTICES PILLARS ── */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">The 7 Pillars of ALTA Best Practices</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Companies that adopt ALTA Best Practices demonstrate a commitment to consumer protection, operational excellence, and regulatory compliance. Click any pillar to explore in depth.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {bestPracticesPillars.map((p) => (
              <button key={p.num} onClick={() => setActiveModal(p.modal)} className="text-left p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#1a5276] text-white flex items-center justify-center text-xs font-bold">{p.num}</span>
                  <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">{p.title}</h3>
                </div>
                <p className="text-xs text-alta-gray leading-relaxed">{p.desc}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-alta-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Deep dive
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </button>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-alta-navy/95 to-alta-teal/85" />
            <div className="relative z-10 p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-3">Ready to Join?</h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-6">
                Become part of the nation&apos;s leading title insurance trade association. Membership is open to title insurance companies, abstracters, attorneys, and settlement service providers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://www.alta.org/membership/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white text-alta-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Apply for Membership
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <a
                  href="https://www.alta.org/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Learn More About ALTA
                </a>
              </div>
              <p className="text-[10px] text-gray-400 mt-4">Questions? Contact ALTA at 202.296.3671 or visit alta.org</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FADING TESTIMONIALS COMPONENT
   ═══════════════════════════════════════════════════════ */
function MemberTestimonials() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % testimonials.length);
        setFading(false);
      }, 500);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[idx];

  return (
    <div className="mb-14">
      <h2 className="text-2xl font-bold text-alta-navy mb-6">What Members Say</h2>
      <div className={`p-6 sm:p-8 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-alta-teal/10 flex items-center justify-center shrink-0 mt-1">
            <svg className="w-5 h-5 text-alta-teal" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" /></svg>
          </div>
          <div>
            <p className="text-alta-navy leading-relaxed italic mb-3">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-sm text-alta-teal font-medium">{t.role}</p>
            <p className="text-xs text-alta-gray">{t.location}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 300); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-alta-teal' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
