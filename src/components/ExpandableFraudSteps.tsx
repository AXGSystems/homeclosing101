"use client";

import { useState } from "react";

const steps = [
  { num: "1", title: "Verify Wiring Instructions In Person or By Phone", desc: "Get wiring instructions from the fund recipient in person. If received another way, confirm by phone using a number you already have.", detail: "This is the single most important step. Criminals count on you trusting emailed instructions without verification. When you call, use a phone number from your original closing documents, your agent's business card, or the title company's website — NEVER a number from the suspicious email itself. If the person answering seems surprised by your call or can't verify the details, that's a red flag.", source: "FBI IC3 / NAR" },
  { num: "2", title: "Enable Multi-Factor Authentication on All Accounts", desc: "Turn on MFA for every email account, banking app, and platform used in your transaction.", detail: "MFA is the #1 defense against Business Email Compromise. Even if a criminal obtains your password through phishing, they can't access your account without the second factor (typically a code sent to your phone). Enable MFA on: your personal email, your bank accounts, any closing portals, and your real estate agent should have it on theirs too. If any participant in your transaction refuses to use MFA, they are a liability.", source: "CertifID / FBI" },
  { num: "3", title: "Be Suspicious of Last-Minute Changes", desc: "Title companies and lenders have established processes that don't suddenly change near closing.", detail: "Criminals time their attacks for maximum urgency — typically 1-3 days before closing when you're most stressed and least likely to question changes. Legitimate title companies establish wire instructions early and don't change them. If you receive ANY communication changing wire details — especially via email — treat it as fraudulent until proven otherwise. Call your settlement agent immediately using a known number.", source: "NAR Consumer Guide" },
  { num: "4", title: "Forward Emails, Never Reply", desc: "When communicating about financial details, use FORWARD and manually type the recipient's address.", detail: "Replying to an email sends your response to whatever address is in the 'reply-to' field — which criminals can set to a look-alike address (e.g., john@titIe-company.com with a capital I instead of lowercase L). Forwarding forces you to type the recipient's address manually, ensuring it goes to the right person. This simple habit can prevent the most common wire fraud attack vector.", source: "ALTA" },
  { num: "5", title: "Use Out-of-Band Verification", desc: "Confirm all financial details through a SECOND, independent communication channel.", detail: "Out-of-band (OOB) verification means using a completely separate communication channel to verify information received through the first channel. If you received wire instructions by email, verify by phone. If by phone, verify by email (to a known address). The key: the second channel must be independent — not a phone number or email from the same potentially compromised communication. This makes it nearly impossible for a criminal controlling one channel to deceive you.", source: "FBI / CertifID 2026" },
  { num: "6", title: "Confirm Your Bank Verifies Account Names", desc: "Before wiring funds, ask your bank to verify the account name matches the expected recipient.", detail: "When you initiate a wire transfer, ask your bank to verify that the receiving account name matches your title company or settlement agent's name. If the account is in an individual's name, a different company name, or an offshore entity — stop immediately. Legitimate closing funds always go to the title company's or attorney's escrow account, never to a personal account.", source: "CFPB" },
  { num: "7", title: "Confirm Receipt Immediately", desc: "After wiring money, call your title company right away to confirm the funds arrived.", detail: "The window for recovering misdirected wire funds closes rapidly: ~20% recovery within 1 hour, ~10% within 24 hours, and less than 5% after 48 hours. By calling immediately after wiring, you create the shortest possible response time if something went wrong. Don't wait for confirmation — be proactive. If your settlement agent says they haven't received the wire within 30 minutes, contact your bank's wire fraud department immediately.", source: "FBI IC3" },
  { num: "8", title: "Watch for Deepfakes and AI Communications", desc: "Deepfake scams in real estate increased 40% year-over-year. Be wary of anything that seems slightly off.", detail: "Criminals can now use AI to clone voices, create realistic video, and generate convincing written communications. If someone calls claiming to be your agent or settlement officer with changed instructions, hang up and call them back at their known number. Be suspicious of video calls where the person seems slightly off — AI deepfakes often have subtle facial movement anomalies. The technology to create convincing deepfakes is now free and available to anyone.", source: "NAR / Entrust 2026 Report" },
  { num: "9", title: "Educate Yourself Before the Transaction", desc: "At the START of the homebuying process, discuss wire procedures with your agent and settlement company.", detail: "The best time to prevent wire fraud is before urgency sets in. At the beginning of your transaction, ask your real estate agent and title company: How will wiring instructions be provided? What is their verification process? Do they use wire verification technology? What should I do if I receive unexpected wire instructions? Having this conversation early means you'll recognize fraudulent communications immediately when they arrive near closing.", source: "NAR Consumer Guide" },
  { num: "10", title: "Ask Your Title Company About Their Fraud Prevention", desc: "Companies using CertifID, Closinglock, or similar tools provide an additional layer of protection.", detail: "When choosing a title company, ask specifically: Do you use wire verification technology? (CertifID and Closinglock verify both sender and recipient identity before funds transfer.) Do you have cybersecurity insurance? Do your employees receive regular fraud prevention training? Have you adopted ALTA Best Practices Pillar 3 (Privacy and Data Security)? A company that can't answer these questions confidently may not have adequate protections in place.", source: "ALTA Best Practices" },
];

export default function ExpandableFraudSteps() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-3 mb-10">
        {steps.map((step, i) => (
          <div
            key={i}
            onClick={() => setExpandedIdx(i)}
            className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#943030] text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-[#7a2020] transition-colors">
              {step.num}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-alta-navy text-sm group-hover:text-alta-teal transition-colors">{step.title}</h3>
              <p className="text-xs text-alta-gray mt-1">{step.desc}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[9px] text-alta-teal font-medium uppercase tracking-wider">Source: {step.source}</p>
                <p className="text-[9px] text-alta-teal opacity-0 group-hover:opacity-100 transition-opacity">Click for details</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {expandedIdx !== null && (
        <div className="fixed inset-0 z-[700] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setExpandedIdx(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto animate-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setExpandedIdx(null)} className="absolute top-3 right-3 p-1.5 text-alta-gray hover:text-alta-navy bg-white/80 rounded-full z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="bg-gradient-to-r from-[#943030] to-[#7a2020] px-6 py-4 rounded-t-2xl flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">{steps[expandedIdx].num}</span>
              <h3 className="text-white font-bold pr-8">{steps[expandedIdx].title}</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-alta-gray leading-relaxed">{steps[expandedIdx].detail}</p>
              <div className="p-3 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5]">
                <p className="text-[10px] font-semibold text-[#943030] uppercase tracking-wider">Source: {steps[expandedIdx].source}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
