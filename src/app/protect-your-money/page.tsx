import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protect Your Money",
  description: "Learn how to recognize and prevent wire fraud targeting homebuyers during the closing process.",
};

const safeguards = [
  { title: "Call to Verify", description: "ALWAYS confirm wiring instructions by phone using a number you already have — NEVER use a number from an email.", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
  { title: "Stay Alert for Changes", description: "Be extremely suspicious of any email that changes wiring instructions, especially close to closing.", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" },
  { title: "Forward, Don't Reply", description: "Use FORWARD and manually type the recipient's address to prevent criminals from intercepting the thread.", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
  { title: "Verify with Your Bank", description: "Ask your bank to verify the account name matches the intended recipient before wiring.", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" },
  { title: "Confirm Receipt Immediately", description: "After wiring, call your title company right away. Recovery rates drop from 20% to below 5% after 48 hours.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

export default function ProtectYourMoneyPage() {
  return (
    <>
      <PageHero
        title="Protect Your Money"
        subtitle="Wire fraud is the #1 financial threat facing homebuyers. Criminals stole $275.1 million from real estate transactions in 2025 alone."
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80"
        breadcrumb={[{ label: "Protect Your Money", href: "/protect-your-money" }]}
      />

      <div className="py-6 lg:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8 p-5 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Don&apos;t Become a Victim</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Real estate wire fraud is rising fast — fueled by AI, deepfakes, and business email compromise. This page explains how the scam works, the 5 safeguards you must follow, and exactly what to do if you suspect you&apos;re being targeted. Share this with everyone involved in your transaction.</p>
              </div>
            </div>
          </div>
          {/* Big warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 lg:p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-700 mb-2">Critical Warning</h2>
                <p className="text-alta-navy font-semibold mb-2">NEVER wire money based solely on instructions received via email.</p>
                <p className="text-sm text-alta-gray">Criminals use email spoofing, hacked accounts, and AI-generated deepfakes to impersonate title companies. Once money is wired to a criminal, recovery is extremely difficult.</p>
              </div>
            </div>
          </div>

          {/* How it works — visual flow */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">How Wire Fraud Works</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-14">
            {[
              { step: "1", title: "Criminals Monitor", desc: "Hackers infiltrate email accounts or monitor public listings for pending sales.", color: "from-gray-500 to-gray-600" },
              { step: "2", title: "Fake Instructions", desc: "Near closing, a spoofed email arrives with 'updated' wire instructions.", color: "from-amber-500 to-amber-600" },
              { step: "3", title: "Money Wired", desc: "Under pressure to close, the buyer wires funds to the criminal's account.", color: "from-red-500 to-red-600" },
              { step: "4", title: "Funds Disappear", desc: "Money is moved through multiple accounts within hours. Recovery is rare.", color: "from-red-700 to-red-800" },
            ].map((s) => (
              <div key={s.step} className="relative rounded-2xl overflow-hidden shadow-sm">
                <div className={`bg-gradient-to-br ${s.color} p-5 text-white h-full`}>
                  <span className="text-3xl font-bold opacity-30 absolute top-2 right-3">{s.step}</span>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Safeguards */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">5 Safeguards to Protect Yourself</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {safeguards.map((sg, i) => (
              <div key={i} className="feature-card p-5 bg-white rounded-2xl border border-gray-100 shadow-sm" data-accent="teal">
                <div className="w-11 h-11 rounded-xl bg-alta-light flex items-center justify-center text-alta-teal mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={sg.icon} /></svg>
                </div>
                <h3 className="font-bold text-alta-navy mb-1">{sg.title}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{sg.description}</p>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* If you're a victim */}
          <div className="relative p-6 bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-2xl border border-amber-200 mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -translate-y-1/2 translate-x-1/4" />
            <h3 className="font-bold text-alta-navy text-lg mb-3 relative">If You Think You&apos;re a Victim</h3>
            <ol className="text-sm text-alta-gray space-y-2 list-decimal list-inside relative">
              <li>Contact your bank <strong>immediately</strong> and request a wire recall</li>
              <li>Contact your title company and real estate agent</li>
              <li>File a complaint with the FBI&apos;s Internet Crime Complaint Center (IC3) at <strong>ic3.gov</strong></li>
              <li>Contact local law enforcement</li>
            </ol>
            <p className="text-sm text-alta-navy font-semibold mt-3 relative">The first 24 hours are your best window for recovering wired funds.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/stop-fraud" className="px-6 py-3 bg-alta-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-center">
              Stop Fraud 101 — Full Guide
            </Link>
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Closing Checklist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
