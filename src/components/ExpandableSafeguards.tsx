"use client";

import { useState } from "react";

const fraudFlow = [
  { step: "1", title: "Criminals Monitor", desc: "Hackers infiltrate email accounts or monitor public listings for pending sales.", color: "from-[#4a5568] to-[#3a4455]", severity: "bg-gray-200", detail: "Criminals use two primary methods to identify targets: (1) Hacking into real estate agent, lender, or title company email accounts through phishing attacks — they then silently monitor conversations for weeks, learning details of pending transactions. (2) Monitoring public real estate listings and county records for pending sales, then impersonating the title company or agent. The average time a criminal spends monitoring before striking is 2-4 weeks. They learn your name, the property address, the closing date, and the settlement agent — making their fake communications highly convincing." },
  { step: "2", title: "Fake Instructions", desc: "Near closing, a spoofed email arrives with 'updated' wire instructions.", color: "from-[#8b6914] to-[#705410]", severity: "bg-amber-200", detail: "The criminal sends an email that appears identical to legitimate communications — same logo, same signature block, same writing style. The email typically says wire instructions have 'changed' or been 'updated' and provides new bank routing and account numbers pointing to the criminal's account. The timing is deliberate: 1-3 days before closing when urgency is highest and you're least likely to question changes. The sender address may be the real agent's hacked account, or a look-alike domain (e.g., @titIe-company.com with a capital I instead of lowercase L)." },
  { step: "3", title: "Money Wired", desc: "Under pressure to close, the buyer wires funds to the criminal's account.", color: "from-[#943030] to-[#7a2020]", severity: "bg-red-200", detail: "The buyer, feeling pressure to meet the closing deadline and trusting the email, initiates a wire transfer to the fraudulent account. The average individual loss in a real estate wire fraud case is approximately $150,000 — often the buyer's entire down payment and closing costs. The wire processes within minutes, and the buyer typically doesn't realize anything is wrong until the real settlement agent asks where the funds are — often hours later." },
  { step: "4", title: "Funds Disappear", desc: "Money is moved through multiple accounts within hours. Recovery is rare.", color: "from-[#5c1818] to-[#3d1010]", severity: "bg-red-400", detail: "Within 30 minutes of receiving the wire, criminals begin moving funds through multiple domestic accounts using 'money mules.' Within hours, funds are often converted to cryptocurrency or wired internationally. Recovery rates: approximately 20% if reported within 1 hour, 10% within 24 hours, and less than 5% after 48 hours. The FBI's Recovery Asset Team (RAT) has successfully frozen funds in many cases when notified quickly — but speed is absolutely critical. After 72 hours, recovery becomes nearly impossible." },
];

const safeguards = [
  { title: "Call to Verify", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", description: "ALWAYS confirm wiring instructions by phone using a number you already have — NEVER use a number from an email.", detail: "This single step prevents more wire fraud than any other measure. When you call, use a phone number from: your original closing documents, the title company's website (type it in directly — don't click links in emails), your agent's business card, or a number you've used before. If the person who answers seems confused or can't verify your transaction details, hang up and try a different known number. Never use a callback number provided in a suspicious email — criminals set up fake phone lines specifically for this purpose.", color: { bg: "bg-[#e8f0f5]", border: "border-[#c5d8e4]", icon: "bg-[#1a5276]", num: "bg-[#1a5276]" } },
  { title: "Stay Alert for Changes", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z", description: "Be extremely suspicious of any email that changes wiring instructions, especially close to closing.", detail: "Legitimate title companies establish wiring instructions early in the process and almost never change them. If you receive ANY communication — email, text, voicemail, or even a phone call — requesting a change to wiring details, treat it as potentially fraudulent until verified through a separate channel. Red flags: urgency language ('must wire today'), changes within 48 hours of closing, instructions to wire to a different bank or account, and the account name not matching your title company.", color: { bg: "bg-[#e9f5ed]", border: "border-[#bddcc7]", icon: "bg-[#2d6b3f]", num: "bg-[#2d6b3f]" } },
  { title: "Forward, Don't Reply", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", description: "Use FORWARD and manually type the recipient's address to prevent criminals from intercepting the thread.", detail: "When you hit 'Reply' on an email, your response goes to whatever address is in the 'Reply-To' field — which criminals can set to a look-alike address that they control. By using 'Forward' instead, you're forced to manually type the recipient's email address, ensuring it goes to the correct person. This simple habit breaks the most common attack vector in real estate wire fraud. Take it one step further: when typing the address, look up the correct email from a trusted source (website, business card) rather than copying from the email thread.", color: { bg: "bg-[#faf4e4]", border: "border-[#e8d9a8]", icon: "bg-[#8b6914]", num: "bg-[#8b6914]" } },
  { title: "Verify with Your Bank", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z", description: "Ask your bank to verify the account name matches the intended recipient before wiring.", detail: "Before your bank processes the wire transfer, explicitly ask them to verify that the receiving account name matches your title company or settlement agent. If the account is registered to an individual (not a company), a different company name, or an overseas entity — stop the transfer immediately. Legitimate closing funds always go to the title company's or attorney's trust/escrow account. Also ask about your bank's wire transfer cutoff time — many stop processing at 3-4 PM, and wiring too late may delay your closing.", color: { bg: "bg-[#f0ecf6]", border: "border-[#d4c8e4]", icon: "bg-[#5b3a8c]", num: "bg-[#5b3a8c]" } },
  { title: "Confirm Receipt Immediately", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", description: "After wiring, call your title company right away. Recovery drops from 20% to under 5% after 48 hours.", detail: "The moment your bank confirms the wire has been sent, call your settlement agent to verify receipt. Don't wait for them to call you. Don't send an email asking for confirmation. CALL. If they say they haven't received it within 30 minutes, contact your bank's wire fraud department immediately and request a recall. The FBI's data is clear: recovery rates drop from approximately 20% within the first hour to less than 5% after 48 hours. Every minute matters. Have your bank's wire fraud hotline number saved in your phone before closing day.", color: { bg: "bg-[#e6f1f5]", border: "border-[#b4d8e8]", icon: "bg-[#0a7ea8]", num: "bg-[#0a7ea8]" } },
];

export default function ExpandableSafeguards() {
  const [expandedFlow, setExpandedFlow] = useState<number | null>(null);
  const [expandedSafeguard, setExpandedSafeguard] = useState<number | null>(null);

  return (
    <>
      {/* Fraud flow tiles */}
      <h2 className="text-2xl font-bold text-alta-navy mb-6">How Wire Fraud Works</h2>
      <div className="flex flex-col md:flex-row items-stretch gap-0 mb-14">
        {fraudFlow.map((s, i) => (
          <div key={s.step} className="flex items-stretch flex-1">
            <div
              onClick={() => setExpandedFlow(i)}
              className="relative rounded-2xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl overflow-hidden shadow-sm flex-1 tile-interactive cursor-pointer group"
            >
              <div className={`h-1.5 ${s.severity}`} />
              <div className={`bg-gradient-to-br ${s.color} p-4 text-white h-full`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">{s.step}</span>
                  <h3 className="font-bold text-sm">{s.title}</h3>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">{s.desc}</p>
                <p className="text-[9px] text-white/50 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details</p>
              </div>
            </div>
            {i < 3 && (
              <>
                <div className="hidden md:flex items-center justify-center w-6 shrink-0 text-alta-red">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className="md:hidden flex justify-center py-1 text-alta-red">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Safeguard tiles */}
      <h2 className="text-2xl font-bold text-alta-navy mb-6">5 Safeguards to Protect Yourself</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {safeguards.map((sg, i) => (
          <div
            key={i}
            onClick={() => setExpandedSafeguard(i)}
            className={`p-5 ${sg.color.bg} rounded-2xl border ${sg.color.border} tile-interactive group relative cursor-pointer`}
          >
            <span className={`absolute top-3 right-3 w-6 h-6 rounded-full ${sg.color.num} text-white flex items-center justify-center text-xs font-bold`}>{i + 1}</span>
            <div className={`w-11 h-11 rounded-xl ${sg.color.icon} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={sg.icon} /></svg>
            </div>
            <h3 className="font-bold text-alta-navy mb-1">{sg.title}</h3>
            <p className="text-xs text-alta-gray leading-relaxed">{sg.description}</p>
            <p className="text-[9px] text-alta-teal mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Click for full details</p>
          </div>
        ))}
      </div>

      {/* Fraud flow modal */}
      {expandedFlow !== null && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setExpandedFlow(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setExpandedFlow(null)} className="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white bg-black/20 rounded-full z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className={`bg-gradient-to-r ${fraudFlow[expandedFlow].color} px-6 py-5 rounded-t-2xl`}>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">{fraudFlow[expandedFlow].step}</span>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-wider">Step {fraudFlow[expandedFlow].step} of 4</p>
                  <h3 className="text-xl font-bold text-white">{fraudFlow[expandedFlow].title}</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-alta-gray leading-relaxed">{fraudFlow[expandedFlow].detail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Safeguard modal */}
      {expandedSafeguard !== null && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setExpandedSafeguard(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setExpandedSafeguard(null)} className="absolute top-3 right-3 p-1.5 text-alta-gray hover:text-alta-navy bg-white/80 rounded-full z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${safeguards[expandedSafeguard].color.icon} flex items-center justify-center text-white`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={safeguards[expandedSafeguard].icon} /></svg>
              </div>
              <div>
                <p className="text-[10px] text-alta-teal uppercase tracking-wider font-semibold">Safeguard {expandedSafeguard + 1} of 5</p>
                <h3 className="text-lg font-bold text-alta-navy">{safeguards[expandedSafeguard].title}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-alta-gray leading-relaxed">{safeguards[expandedSafeguard].detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
