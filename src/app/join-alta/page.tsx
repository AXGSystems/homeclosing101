import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In the Title Industry? Join ALTA",
  description: "Join the American Land Title Association — 6,000+ member companies, industry best practices, advocacy, and more.",
};

const benefits = [
  { title: "Industry Best Practices", desc: "Access ALTA's comprehensive Best Practices framework — the gold standard for title and settlement operations.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-green-500 to-green-600", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" },
  { title: "Advocacy on Capitol Hill", desc: "ALTA represents your interests before Congress, federal agencies, and state legislatures on policy that affects your business.", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z", color: "from-blue-500 to-blue-600", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80" },
  { title: "ALTA ONE Conference", desc: "The premier annual event for the title industry — networking, education, and innovation with thousands of professionals.", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", color: "from-purple-500 to-purple-600", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { title: "Education & Certification", desc: "Professional development courses, webinars, NTP designation, and continuing education for your team.", icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5", color: "from-amber-500 to-amber-600", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80" },
  { title: "Member Directory Listing", desc: "Get listed in the ALTA member directory and HomeClosing101 — putting your company in front of homebuyers nationwide.", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z", color: "from-teal-500 to-teal-600", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { title: "Wire Fraud Resources", desc: "Access to CertifID partnerships, fraud prevention toolkits, and cybersecurity best practices for your firm.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "from-red-500 to-red-600", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80" },
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

      <div className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
                <div className="relative h-36 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${b.image}')` }} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${b.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
