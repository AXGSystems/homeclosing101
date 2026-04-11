import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In the Title Industry? Join ALTA",
  description: "Join the American Land Title Association — 6,000+ member companies, industry best practices, advocacy, and more.",
};

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
          {/* Page intro */}
          <div className="mb-10 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Grow Your Business with ALTA</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Whether you&apos;re a title agent, underwriter, attorney, or settlement professional, ALTA membership gives you the tools, advocacy, and network to thrive. Join 6,000+ companies who trust ALTA to represent the title industry.</p>
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
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm tile-interactive">
              <h3 className="font-bold text-alta-navy mb-2">Founded in 1907</h3>
              <p className="text-xs text-alta-gray leading-relaxed">ALTA has represented the title insurance and settlement services industry for over 116 years. From the days of handwritten abstracts to today&apos;s digital closings, ALTA has been the voice of the industry through every era of real estate.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm tile-interactive">
              <h3 className="font-bold text-alta-navy mb-2">Washington, D.C. Headquarters</h3>
              <p className="text-xs text-alta-gray leading-relaxed">Located at 601 Pennsylvania Avenue NW, Suite 750 — steps from the U.S. Capitol. ALTA&apos;s proximity to federal lawmakers enables direct advocacy on policies affecting the title industry and homebuyers.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm tile-interactive">
              <h3 className="font-bold text-alta-navy mb-2">ALTA Best Practices</h3>
              <p className="text-xs text-alta-gray leading-relaxed">The 7-pillar Best Practices framework is the gold standard for title and settlement operations. It covers licensing, escrow handling, data privacy, settlement procedures, title policy production, professional liability, and consumer complaints. Adopted by thousands of member companies.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm tile-interactive">
              <h3 className="font-bold text-alta-navy mb-2">TIPAC Political Action</h3>
              <p className="text-xs text-alta-gray leading-relaxed">The Title Industry Political Action Committee (TIPAC) supports federal candidates who understand the title industry. ALTA&apos;s advocacy efforts have successfully defended against threats to title insurance, protected consumer choice, and promoted fraud prevention legislation.</p>
            </div>
          </div>

          {/* Membership tiers */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">Who Can Join?</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">ALTA membership is open to companies and individuals across the title insurance and settlement services ecosystem. Member types include:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {[
              { type: "Title Insurance Underwriters", desc: "Companies that issue title insurance policies — the largest underwriters in the country are ALTA members." },
              { type: "Title Agents & Abstracters", desc: "Local and regional title agents who conduct searches, issue commitments, and facilitate closings." },
              { type: "Settlement/Escrow Companies", desc: "Companies providing settlement, escrow, and closing services to buyers and sellers." },
              { type: "Attorneys", desc: "Real estate attorneys who provide title opinions, handle closings, or work in the title insurance space." },
              { type: "Technology Providers", desc: "Companies providing software, platforms, and tools to the title and settlement industry." },
              { type: "Associate Members", desc: "Individuals and companies with a professional interest in the title industry — lenders, real estate firms, and more." },
            ].map((m) => (
              <div key={m.type} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-1">{m.type}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Key events */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">ALTA Events & Education</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { name: "ALTA ONE", desc: "The premier annual conference for the title industry. Thousands of professionals gather for education, networking, and innovation. Held each fall in a major U.S. city.", url: "https://www.alta.org/events/" },
              { name: "ALTA Advocacy Summit", desc: "Annual event where title professionals meet with their members of Congress on Capitol Hill to advocate for industry priorities and consumer protection.", url: "https://www.alta.org/events/" },
              { name: "ALTA EDge", desc: "Regional education events held throughout the year providing focused professional development, compliance training, and networking for title professionals.", url: "https://www.alta.org/events/" },
            ].map((e) => (
              <a key={e.name} href={e.url} target="_blank" rel="noopener noreferrer" className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm tile-interactive group">
                <h3 className="font-bold text-alta-navy mb-2 group-hover:text-alta-teal transition-colors">{e.name}</h3>
                <p className="text-xs text-alta-gray leading-relaxed mb-2">{e.desc}</p>
                <span className="text-xs text-alta-teal font-medium flex items-center gap-1">
                  Learn more
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </span>
              </a>
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
