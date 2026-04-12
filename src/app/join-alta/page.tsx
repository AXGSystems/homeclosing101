"use client";

import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";

const benefits = [
  { title: "Industry Best Practices", desc: "Access ALTA's comprehensive Best Practices framework — the gold standard for title and settlement operations.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-[#2d6b3f] to-[#235532]", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { title: "Advocacy on Capitol Hill", desc: "ALTA represents your interests before Congress, federal agencies, and state legislatures on policy that affects your business.", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z", color: "from-[#1a5276] to-[#154463]", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80" },
  { title: "ALTA ONE Conference", desc: "The premier annual event for the title industry — networking, education, and innovation with thousands of professionals.", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", color: "from-[#5b3a8c] to-[#482d70]", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { title: "Education & Certification", desc: "Professional development courses, webinars, NTP designation, and continuing education for your team.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5", color: "from-[#8b6914] to-[#705410]", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80" },
  { title: "Member Directory Listing", desc: "Get listed in the ALTA member directory and HomeClosing101 — putting your company in front of homebuyers nationwide.", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z", color: "from-[#0a7ea8] to-[#077a9e]", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { title: "Wire Fraud Resources", desc: "Access to CertifID partnerships, fraud prevention toolkits, and cybersecurity best practices for your firm.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "from-[#943030] to-[#7a2020]", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80" },
];

const stats = [
  { value: "6,000+", label: "Member Companies" },
  { value: "50", label: "States Represented" },
  { value: "116+", label: "Years of Advocacy" },
  { value: "#1", label: "Title Industry Association" },
];

export default function JoinAltaPage() {
  return (
    <>
      <PageHero
        title="In the Title Industry?"
        subtitle="Join 6,000+ member companies in the American Land Title Association — the voice of the title insurance and settlement services industry since 1907."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Join ALTA", href: "/join-alta" }]}
      />

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
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                <p className="text-3xl font-bold text-alta-teal">{s.value}</p>
                <p className="text-xs text-alta-gray mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Benefits grid */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Why Join ALTA?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {benefits.map((b) => (
              <div key={b.title} className="feature-card rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white group" data-accent="teal">
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
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-alta-navy mb-2">{b.title}</h3>
                  <p className="text-xs text-alta-gray leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* About ALTA */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">About the American Land Title Association</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Founded in 1907", desc: "ALTA has represented the title insurance and settlement services industry for over 116 years. From handwritten abstracts to digital closings, ALTA has been the voice of the industry through every era.", color: "from-[#1a5276] to-[#154463]", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Washington, D.C. Headquarters", desc: "601 Pennsylvania Avenue NW, Suite 750 — steps from the U.S. Capitol. Direct advocacy on policies affecting the title industry and homebuyers.", color: "from-[#2d6b3f] to-[#235532]", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" },
              { title: "ALTA Best Practices", desc: "The 7-pillar framework is the gold standard for title and settlement operations — licensing, escrow, data privacy, settlements, title policies, liability, and complaints.", color: "from-[#5b3a8c] to-[#482d70]", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "TIPAC Political Action", desc: "The Title Industry Political Action Committee supports candidates who understand the industry. ALTA has defended title insurance, protected consumer choice, and promoted fraud prevention.", color: "from-[#8b6914] to-[#705410]", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
            ].map((item) => (
              <div key={item.title} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white tile-interactive">
                <div className={`bg-gradient-to-r ${item.color} p-4 flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-xs text-alta-gray leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Membership tiers */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Who Can Join?</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">ALTA membership is open to companies and individuals across the title insurance and settlement services ecosystem. Member types include:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {[
              { type: "Title Insurance Underwriters", desc: "Companies that issue title insurance policies — the largest underwriters in the country are ALTA members.", color: "border-l-[#1a5276]", icon: "bg-[#e8f0f5] text-[#1a5276]" },
              { type: "Title Agents & Abstracters", desc: "Local and regional title agents who conduct searches, issue commitments, and facilitate closings.", color: "border-l-[#2d6b3f]", icon: "bg-[#e9f5ed] text-[#2d6b3f]" },
              { type: "Settlement/Escrow Companies", desc: "Companies providing settlement, escrow, and closing services to buyers and sellers.", color: "border-l-[#0a7ea8]", icon: "bg-[#e6f1f5] text-[#0a7ea8]" },
              { type: "Attorneys", desc: "Real estate attorneys who provide title opinions, handle closings, or work in the title insurance space.", color: "border-l-[#5b3a8c]", icon: "bg-[#f0ecf6] text-[#5b3a8c]" },
              { type: "Technology Providers", desc: "Companies providing software, platforms, and tools to the title and settlement industry.", color: "border-l-[#8b6914]", icon: "bg-[#faf4e4] text-[#8b6914]" },
              { type: "Associate Members", desc: "Individuals and companies with a professional interest in the title industry — lenders, real estate firms, and more.", color: "border-l-[#943030]", icon: "bg-[#f5e8e8] text-[#943030]" },
            ].map((m) => (
              <div key={m.type} className={`p-4 bg-white rounded-xl border border-gray-100 border-l-4 ${m.color} shadow-sm tile-interactive`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1">{m.type}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Key events */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">ALTA Events, Webinars & Education</h2>
          <p className="text-sm text-alta-gray mb-6 leading-relaxed">ALTA hosts events throughout the year — from the flagship annual conference to weekly webinars and regional education. These are where the industry connects, learns, and leads.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              { name: "ALTA ONE", desc: "The premier annual conference for the title industry — keynotes, breakout sessions, networking, and an expo hall with thousands of professionals. Held each fall in a major U.S. city.", badge: "Flagship Event", color: "from-[#1a5276] to-[#154463]", url: "https://www.alta.org/altaone/" },
              { name: "ALTA Advocacy Summit", desc: "Title professionals travel to Washington, D.C. to meet with their members of Congress and advocate for policies that protect the industry and consumers.", badge: "Annual", color: "from-[#943030] to-[#7a2020]", url: "https://www.alta.org/advocacy/" },
              { name: "ALTA EDge", desc: "Regional education events providing focused professional development, compliance training, and networking in cities across the country.", badge: "Regional", color: "from-[#2d6b3f] to-[#235532]", url: "https://www.alta.org/education/" },
              { name: "Webinar Series", desc: "Free and member-exclusive webinars covering regulatory updates, technology trends, cybersecurity, fraud prevention, and business strategy — typically weekly.", badge: "Ongoing", color: "from-[#0a7ea8] to-[#077a9e]", url: "https://www.alta.org/education/webinars/" },
              { name: "NTP Designation Program", desc: "The National Title Professional designation recognizes title industry professionals who demonstrate knowledge, experience, and commitment to best practices.", badge: "Certification", color: "from-[#5b3a8c] to-[#482d70]", url: "https://www.alta.org/ntp/" },
              { name: "Title Topics Podcast", desc: "ALTA's official podcast featuring interviews with industry leaders, regulatory updates, and discussions on technology, fraud, and market trends.", badge: "Media", color: "from-[#8b6914] to-[#705410]", url: "https://www.alta.org/publications/" },
            ].map((e) => (
              <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group bg-white">
                <div className={`bg-gradient-to-r ${e.color} px-4 py-2.5 flex items-center justify-between`}>
                  <h3 className="font-bold text-white text-sm">{e.name}</h3>
                  <span className="text-[9px] font-bold text-white/70 bg-white/15 px-2 py-0.5 rounded-full">{e.badge}</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-alta-gray leading-relaxed mb-2">{e.desc}</p>
                  <span className="text-xs text-alta-teal font-medium flex items-center gap-1">
                    Learn more
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <InlineAd />

          {/* Testimonials */}
          <MemberTestimonials />

          {/* ALTA Publications & Resources */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Publications & Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-14">
            {[
              { name: "TitleNews Magazine", desc: "ALTA's flagship publication covering industry trends, regulatory developments, technology, and member success stories. Published bi-monthly.", color: "border-l-[#1a5276]" },
              { name: "ALTA Policy Forms", desc: "Access to standardized title insurance policy forms used industry-wide — owner's policies, loan policies, endorsements, and commitments.", color: "border-l-[#2d6b3f]" },
              { name: "Advocacy Resources", desc: "Stay current on federal and state legislation, regulatory changes, and ALTA's positions on policies that affect the industry.", color: "border-l-[#5b3a8c]" },
              { name: "HomeClosing101", desc: "ALTA's consumer education platform — the site you're on right now. Helping homebuyers understand closing, protect their rights, and avoid fraud.", color: "border-l-[#0a7ea8]" },
            ].map((p) => (
              <div key={p.name} className={`p-4 bg-white rounded-xl border border-gray-100 border-l-4 ${p.color} shadow-sm tile-interactive`}>
                <h3 className="text-sm font-bold text-alta-navy mb-1">{p.name}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Why members stay */}
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

          {/* ALTA Best Practices deep dive */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">The 7 Pillars of ALTA Best Practices</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Companies that adopt ALTA Best Practices demonstrate a commitment to consumer protection, operational excellence, and regulatory compliance. Here&apos;s what each pillar covers:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {[
              { num: "1", title: "Licensing", desc: "Maintain proper state licensing for all employees involved in title and settlement operations." },
              { num: "2", title: "Escrow Controls", desc: "Implement comprehensive escrow account management with regular reconciliation, positive pay, and segregated accounts." },
              { num: "3", title: "Privacy & Security", desc: "Protect consumer data with encryption, access controls, employee training, and incident response plans. Includes wire fraud prevention." },
              { num: "4", title: "Settlement Procedures", desc: "Follow documented, auditable procedures for every closing to ensure accuracy, compliance, and consumer protection." },
              { num: "5", title: "Title Policy Production", desc: "Issue title insurance policies promptly and accurately, with proper documentation and recording verification." },
              { num: "6", title: "Professional Liability", desc: "Maintain appropriate errors & omissions insurance and fidelity coverage to protect consumers and the company." },
              { num: "7", title: "Consumer Complaints", desc: "Establish a formal process for receiving, tracking, and resolving consumer complaints in a timely manner." },
            ].map((p) => (
              <div key={p.num} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#1a5276] text-white flex items-center justify-center text-xs font-bold">{p.num}</span>
                  <h3 className="text-sm font-bold text-alta-navy">{p.title}</h3>
                </div>
                <p className="text-xs text-alta-gray leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
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

/* ── Fading Testimonials Component ── */
const testimonials = [
  { quote: "ALTA Best Practices certification gave our company the credibility we needed to win new lender partnerships. It's the gold standard.", role: "Title Agency Owner", location: "Texas" },
  { quote: "The Advocacy Summit is where I go every year to make sure our legislators understand what title professionals do for consumers. It matters.", role: "VP of Operations", location: "Virginia" },
  { quote: "ALTA ONE isn't just a conference — it's where I've met the partners, vendors, and mentors who've shaped my career in the title industry.", role: "Settlement Agent", location: "Florida" },
  { quote: "The webinars keep my team current on regulatory changes without pulling them out of the office. The ROI on membership pays for itself.", role: "Compliance Director", location: "California" },
  { quote: "When wire fraud hit our industry, ALTA was at the forefront of the response — model legislation, CertifID partnerships, and Best Practices Pillar 3.", role: "Title Company President", location: "Ohio" },
  { quote: "The NTP designation set me apart in a competitive market. Clients and lenders recognize it as a mark of professionalism and expertise.", role: "National Title Professional", location: "Arizona" },
];

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
