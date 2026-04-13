import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import ExpandableSafeguards from "@/components/ExpandableSafeguards";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
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

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 p-4 bg-[#f5e8e8] rounded-2xl border border-[#e4c5c5] border-l-4 border-l-[#943030] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
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

          {/* Interactive fraud flow + safeguards with expandable modals */}
          <ExpandableSafeguards />

          <InlineAd />

          {/* Legitimate vs fraudulent communications */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">How to Tell Legitimate from Fraudulent Communications</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Criminals are sophisticated — their emails can look nearly identical to real ones. Here are the key differences to watch for:</p>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="p-5 bg-green-50 rounded-2xl border border-green-200">
              <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Legitimate Title Company
              </h3>
              <ul className="space-y-2 text-xs text-green-800">
                <li>- Will NEVER send wiring instructions solely by email</li>
                <li>- Provides wire details in person or via secure portal with MFA</li>
                <li>- Uses a consistent, verified email domain (not free email like Gmail)</li>
                <li>- Will happily confirm details by phone if you call THEIR number</li>
                <li>- Will NEVER rush you or pressure last-minute changes</li>
                <li>- Uses wire verification technology like CertifID or Closinglock</li>
                <li>- Has adopted ALTA Best Practices for cybersecurity</li>
              </ul>
            </div>
            <div className="p-5 bg-red-50 rounded-2xl border border-red-200">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
                Fraudulent Communication
              </h3>
              <ul className="space-y-2 text-xs text-red-800">
                <li>- Sends &quot;updated&quot; wire instructions via email, especially close to closing</li>
                <li>- Email domain is slightly misspelled (e.g., @titIe-company.com with an I instead of l)</li>
                <li>- Creates urgency: &quot;Must wire today or closing will be delayed&quot;</li>
                <li>- Provides a phone number IN the email (which they control)</li>
                <li>- Account name on wire doesn&apos;t match the title company</li>
                <li>- Changes bank or account number from what was previously provided</li>
                <li>- May use AI-generated deepfake voice or video to impersonate agents</li>
              </ul>
            </div>
          </div>

          {/* What your title company should do */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">What Your Title Company Should Be Doing</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">When choosing a title company, ask about their fraud prevention practices. Companies that follow ALTA Best Practices (Pillar 3: Privacy and Data Security) should have robust measures in place. Here&apos;s what to look for:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {[
              { title: "Wire Verification Technology", desc: "Companies using platforms like CertifID or Closinglock can verify both the sender's and recipient's identity and bank account before funds are transferred." },
              { title: "Multi-Factor Authentication", desc: "All email accounts, client portals, and systems should require MFA. If your title company doesn't use MFA on their email, they're a liability." },
              { title: "Encrypted Communication", desc: "Sensitive documents and financial details should be shared through encrypted portals — not plain email attachments." },
              { title: "Employee Training", desc: "Staff should be trained to recognize BEC attacks, social engineering, and deepfake attempts. Ask if they conduct regular cybersecurity training." },
              { title: "Cyber Insurance", desc: "Ask if the company carries errors & omissions insurance and cybersecurity insurance that covers wire fraud incidents." },
              { title: "Verbal Verification Policy", desc: "A good company will have a documented process requiring phone verification of wire instructions using a pre-established number." },
            ].map((item) => (
              <div key={item.title} className="group p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] shadow-sm tile-interactive">
                <h3 className="text-sm font-bold text-alta-navy mb-1 group-hover:text-alta-teal transition-colors">{item.title}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Recovery timeline */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4">If You&apos;re a Victim: Recovery Timeline</h2>
          <p className="text-sm text-alta-gray mb-4 leading-relaxed">Speed is everything. The FBI reports that the likelihood of recovering funds drops dramatically over time. Here&apos;s the data from the FBI&apos;s Internet Crime Complaint Center (IC3):</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
              <p className="text-2xl font-bold text-green-700">~20%</p>
              <p className="text-xs text-green-600 mt-1 font-medium">Recovery rate</p>
              <p className="text-[10px] text-green-600">Within 1 hour</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
              <p className="text-2xl font-bold text-amber-700">~10%</p>
              <p className="text-xs text-amber-600 mt-1 font-medium">Recovery rate</p>
              <p className="text-[10px] text-amber-600">Within 24 hours</p>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-center">
              <p className="text-2xl font-bold text-red-700">&lt;5%</p>
              <p className="text-xs text-red-600 mt-1 font-medium">Recovery rate</p>
              <p className="text-[10px] text-red-600">After 48 hours</p>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200 mb-6">
            <h3 className="font-bold text-alta-navy mb-3">Immediate Steps If You Suspect Fraud</h3>
            <div className="space-y-3">
              {[
                { step: "1", action: "Contact your bank immediately", detail: "Request a wire recall. Provide the transaction reference number, amount, date, and receiving bank details. Ask to speak to the fraud department.", timing: "Within minutes" },
                { step: "2", action: "Call your title company", detail: "Use a number you already have on file — NOT a number from a suspicious email. Alert them that funds may have been misdirected.", timing: "Same hour" },
                { step: "3", action: "File with the FBI's IC3", detail: "Go to ic3.gov and file a detailed complaint. Include all emails, wire confirmations, account numbers, and communication records. The FBI coordinates with financial institutions for asset recovery.", timing: "Same day" },
                { step: "4", action: "File with FinCEN if applicable", detail: "The Financial Crimes Enforcement Network tracks suspicious financial activity. Filing helps law enforcement identify patterns and networks.", timing: "Same day" },
                { step: "5", action: "Contact local law enforcement", detail: "File a police report with all documentation. You may need this for insurance claims or civil proceedings.", timing: "Same day" },
                { step: "6", action: "Document everything", detail: "Screenshot all emails, save headers, note phone numbers and times of calls. This evidence is critical for investigation and potential recovery.", timing: "Ongoing" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                  <span className="w-7 h-7 rounded-full bg-alta-red text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-alta-navy">{s.action}</p>
                        <p className="text-xs text-alta-gray mt-0.5 leading-relaxed">{s.detail}</p>
                      </div>
                      <span className="text-[9px] bg-red-100 text-alta-red px-2 py-0.5 rounded-full font-medium shrink-0">{s.timing}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-alta-gray mb-8 leading-relaxed">Sources: FBI IC3 2024 Report, CertifID 2026 State of Wire Fraud Report, ALTA Best Practices Pillar 3, NAR Consumer Guide on Wire Fraud</p>

          <InlineAd />

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="/stop-fraud" className="px-5 py-2.5 bg-alta-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-center text-sm">
              Stop Fraud 101 — 10 Prevention Steps
            </Link>
            <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
              Closing Checklist
            </Link>
            <Link href="/find-company" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
              Find a Title Company
            </Link>
            <Link href="/sources" className="px-5 py-2.5 border-2 border-gray-300 text-alta-gray font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center text-sm">
              View Sources
            </Link>
          </div>

          <div className="mt-8 mb-4">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/stop-fraud" className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Stop Fraud 101</h3>
                <p className="text-[10px] text-alta-gray mt-1">10 FBI-sourced prevention steps to protect your closing funds</p>
              </Link>
              <Link href="/protect-your-rights" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Property Rights</h3>
                <p className="text-[10px] text-alta-gray mt-1">How owner's title insurance shields you from hidden title defects</p>
              </Link>
              <Link href="/find-company" className="p-4 bg-[#f0ecf6] rounded-xl border border-[#d4c8e4] border-l-4 border-l-[#5b3a8c] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Find a Title Company</h3>
                <p className="text-[10px] text-alta-gray mt-1">Search for ALTA member title and settlement companies near you</p>
              </Link>
            </div>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
