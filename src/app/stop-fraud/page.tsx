import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import FraudStats from "@/components/FraudStats";
import ExpandableFraudSteps from "@/components/ExpandableFraudSteps";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stop Fraud 101",
  description: "FBI and agency-sourced fraud prevention steps to protect yourself during the home closing process.",
};

const preventionSteps = [
  {
    num: "1",
    title: "Verify Wiring Instructions In Person or By Phone",
    desc: "Get wiring instructions from the fund recipient in person. If received another way, confirm by phone using a number you already have — NEVER a number from a suspicious email.",
    source: "FBI IC3 / NAR",
  },
  {
    num: "2",
    title: "Enable Multi-Factor Authentication (MFA) on All Accounts",
    desc: "Turn on MFA for every email account, banking app, and platform used in your transaction. If any participant refuses to use MFA, they are a liability to the entire transaction.",
    source: "CertifID / FBI",
  },
  {
    num: "3",
    title: "Be Suspicious of Last-Minute Changes",
    desc: "Title companies and lenders have established processes that don't suddenly change. Any email requesting a change to wiring instructions — especially near closing — should be treated as a scam until verified.",
    source: "NAR Consumer Guide",
  },
  {
    num: "4",
    title: "Forward Emails, Never Reply",
    desc: "When communicating about financial details, use FORWARD and manually type the recipient's address. Replying can route your message to a look-alike address controlled by criminals.",
    source: "ALTA",
  },
  {
    num: "5",
    title: "Use Out-of-Band Verification (OOB)",
    desc: "Confirm all financial details through a SECOND, independent communication channel. If you received wire instructions by email, verify by phone. If by phone, verify by email. Never rely on a single channel.",
    source: "FBI / CertifID 2026",
  },
  {
    num: "6",
    title: "Confirm Your Bank Verifies Account Names",
    desc: "Before wiring funds, ask your bank to verify that the receiving account name matches the expected recipient (your title company). If it doesn't match, stop the transfer.",
    source: "CFPB",
  },
  {
    num: "7",
    title: "Confirm Receipt Immediately",
    desc: "After wiring money, call your title company or settlement agent immediately to confirm the funds arrived. The first hour is critical — recovery rates drop from 20% to below 5% after 48 hours.",
    source: "FBI IC3",
  },
  {
    num: "8",
    title: "Watch for Deepfakes and AI-Generated Communications",
    desc: "Deepfake scams in real estate increased 40% year-over-year. Be wary of video calls, voice messages, or emails that seem slightly off — criminals can now mimic voices and create realistic fake documents using AI.",
    source: "NAR / Entrust 2026 Report",
  },
  {
    num: "9",
    title: "Educate Yourself Before the Transaction Begins",
    desc: "At the START of the homebuying process, talk with your real estate agent about each step — including how funds will be transferred. Know the verification process before urgency takes over.",
    source: "NAR Consumer Guide",
  },
  {
    num: "10",
    title: "Ask Your Title Company About Their Fraud Prevention",
    desc: "Ask if they use wire verification technology (like CertifID), have cybersecurity insurance, follow ALTA Best Practices, and what their process is for confirming wire details.",
    source: "ALTA Best Practices",
  },
];

const recoverySteps = [
  { action: "Contact your bank immediately", detail: "Request a wire recall. Every minute counts.", timing: "Within minutes" },
  { action: "Call your title company", detail: "Alert them that funds may have been misdirected.", timing: "Same hour" },
  { action: "File with FBI IC3", detail: "Report at ic3.gov. Include all transaction details.", timing: "Same day" },
  { action: "File with FinCEN", detail: "Report suspicious financial activity at fincen.gov.", timing: "Same day" },
  { action: "Contact local law enforcement", detail: "File a police report with all documentation.", timing: "Same day" },
  { action: "Notify your real estate agent", detail: "They may be able to assist with recovery efforts.", timing: "Same day" },
];

const stats = [
  { value: "$275.1M", label: "Real estate wire fraud losses in 2025", source: "FBI IC3" },
  { value: "1,760%", label: "Increase in BEC attacks since AI tools became available", source: "CertifID 2026" },
  { value: "~20%", label: "Recovery rate if reported within 1 hour", source: "FBI" },
  { value: "<5%", label: "Recovery rate after 48 hours", source: "FBI" },
  { value: "22%", label: "Of homebuyers receive fraudulent communications", source: "CertifID 2026" },
  { value: "40%", label: "Year-over-year increase in deepfake scams", source: "Entrust 2026" },
];

export default function StopFraudPage() {
  return (
    <>
    <PageHero title="Stop Fraud 101" subtitle="10 prevention steps sourced from the FBI, CFPB, NAR, ALTA, and CertifID. Print them out and keep them with your closing documents." image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80" breadcrumb={[{label:"Protect Your Property",href:"/protect-your-rights"},{label:"Stop Fraud 101",href:"/stop-fraud"}]} />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Page intro */}
        <div className="mb-6 p-4 bg-[#f5e8e8] rounded-2xl border border-[#e4c5c5] border-l-4 border-l-[#943030] sm:sticky sm:top-[142px] z-20 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Your Fraud Prevention Toolkit</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Every step below is verified by federal agencies and industry authorities. Print this page, share it with your family, and refer to it throughout your closing process. Wire fraud is preventable — but only if you know what to watch for.</p>
            </div>
          </div>
        </div>

        {/* EMERGENCY: What to do RIGHT NOW if you're a victim */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[#7a1a1a] via-[#943030] to-[#7a1a1a] px-5 py-3">
            <h2 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.168-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.457-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
              What To Do RIGHT NOW If You&apos;re a Victim
            </h2>
          </div>
          <div className="bg-gradient-to-b from-red-50 to-white p-5 border-2 border-t-0 border-[#943030]/30 rounded-b-2xl">
            <p className="text-xs text-alta-gray mb-4 font-medium">Every minute matters. Do these three things immediately — in this order:</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                <span className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-[#943030] text-white flex items-center justify-center text-sm font-black shadow-md">1</span>
                <h3 className="text-sm font-bold text-alta-navy mt-1 mb-1">Call Your Bank</h3>
                <p className="text-xs text-alta-gray leading-relaxed">Request an immediate wire recall. Ask for the fraud department. Provide the transaction reference number, amount, and receiving bank. Do not hang up until they confirm the recall has been initiated.</p>
                <p className="text-[10px] text-[#943030] font-bold mt-2 uppercase tracking-wider">Do this within minutes</p>
              </div>
              <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                <span className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-[#943030] text-white flex items-center justify-center text-sm font-black shadow-md">2</span>
                <h3 className="text-sm font-bold text-alta-navy mt-1 mb-1">Report to FBI IC3</h3>
                <p className="text-xs text-alta-gray leading-relaxed">File at <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer" className="text-alta-teal underline font-semibold">ic3.gov</a>. The FBI&apos;s Recovery Asset Team (RAT) has frozen fraudulent transfers for victims who reported quickly. Include all emails, wire confirmations, and account numbers.</p>
                <p className="text-[10px] text-[#943030] font-bold mt-2 uppercase tracking-wider">Same hour</p>
              </div>
              <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                <span className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-[#943030] text-white flex items-center justify-center text-sm font-black shadow-md">3</span>
                <h3 className="text-sm font-bold text-alta-navy mt-1 mb-1">Call Your Title Company</h3>
                <p className="text-xs text-alta-gray leading-relaxed">Use a phone number you already have on file — NOT one from a suspicious email. Alert them that funds may have been misdirected. They may be able to coordinate with the receiving bank.</p>
                <p className="text-[10px] text-[#943030] font-bold mt-2 uppercase tracking-wider">Same hour</p>
              </div>
            </div>
            <p className="text-[10px] text-alta-teal font-medium mt-3">Source: FBI IC3 Recovery Asset Team (RAT) protocol, CFPB consumer advisory</p>
          </div>
        </div>

        {/* Interactive stats — click any tile for deep-dive details */}
        <FraudStats />

        {/* 10 Prevention Steps */}
        <h2 className="text-2xl font-bold text-alta-navy mb-4">10 Steps to Prevent Wire Fraud</h2>
        <p className="text-sm text-alta-gray mb-4">Click any step for a detailed explanation of why it matters and how to implement it.</p>
        <ExpandableFraudSteps />

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

        {/* If You're a Victim */}
        <h2 className="text-2xl font-bold text-alta-navy mb-4">If You Suspect You&apos;re a Victim</h2>
        <p className="text-alta-gray mb-6">Speed is everything. Follow these steps in order — the first hour is your best window for recovery.</p>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 mb-12">
          <div className="space-y-3">
            {recoverySteps.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                <span className="w-6 h-6 rounded-full bg-alta-red text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-alta-navy">{r.action}</p>
                      <p className="text-xs text-alta-gray">{r.detail}</p>
                    </div>
                    <span className="text-[10px] bg-red-100 text-alta-red px-2 py-0.5 rounded-full font-medium shrink-0">{r.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting Links */}
        <InlineAd />

        <h2 className="text-2xl font-bold text-alta-navy mb-4">Where to Report Fraud</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { name: "FBI Internet Crime Complaint Center (IC3)", desc: "Report wire fraud and internet crimes", url: "https://www.ic3.gov/" },
            { name: "FinCEN", desc: "Report suspicious financial activity", url: "https://www.fincen.gov/" },
            { name: "CFPB Complaint Portal", desc: "File complaints about financial services", url: "https://www.consumerfinance.gov/complaint/" },
            { name: "FTC Report Fraud", desc: "Federal Trade Commission fraud reporting", url: "https://reportfraud.ftc.gov/" },
          ].map((r) => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="group p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] tile-interactive" data-accent="red">
              <h3 className="text-sm font-semibold text-alta-navy group-hover:text-alta-teal transition-colors">{r.name}</h3>
              <p className="text-xs text-alta-gray mt-0.5">{r.desc}</p>
              <span className="text-xs text-alta-teal font-medium mt-2 inline-flex items-center gap-1">
                Visit site
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
            </a>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

        {/* Real-world fraud scenarios */}
        <h2 className="text-2xl font-bold text-alta-navy mb-4">How Fraud Actually Happens: 3 Real Scenarios</h2>
        <div className="space-y-4 mb-10">
          {[
            { title: "The Spoofed Email", scenario: "A buyer receives an email that appears to be from their title company with 'updated' wiring instructions. The email uses the same logo, signature block, and formatting as previous legitimate emails. The only difference: one letter in the domain name (e.g., @titIe-company.com with a capital I instead of lowercase L). The buyer wires $287,000 to the criminal's account. By the time the title company calls to ask where the funds are, the money has been moved through three accounts and is unrecoverable.", lesson: "Always call your title company at a number YOU already have — never a number from an email. Verify the domain character by character.", source: "Based on patterns reported to FBI IC3" },
            { title: "The Hacked Agent", scenario: "A real estate agent's email account is compromised through a phishing attack. The criminal monitors the inbox for weeks, learning the details of pending transactions. Three days before closing, the criminal — using the agent's actual email account — sends the buyer 'corrected' wire instructions. Because the email comes from the real agent's verified address, the buyer complies without calling to verify.", lesson: "Even emails from verified, known contacts can be compromised. ALWAYS verify wire instructions by phone, regardless of who the email appears to come from. Multi-factor authentication on all email accounts is essential.", source: "CertifID 2026 Report" },
            { title: "The After-Hours Rush", scenario: "A buyer receives a call at 5:45 PM on Thursday — their closing is Friday morning. The caller, impersonating the settlement agent, says the wire must be sent tonight because 'the bank processes overnight and the closing will be delayed.' The buyer panics and wires $165,000 without verifying through the proper channels. Friday morning, the real settlement agent has no record of the call.", lesson: "Legitimate settlement agents don't create last-minute urgency around wire transfers. If you feel rushed, stop. Real closings can be rescheduled — your money can't be unwired.", source: "FBI IC3 advisory" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm tile-interactive">
              <div className="bg-[#943030] px-5 py-3">
                <h3 className="text-white font-bold text-sm">Scenario {i + 1}: {s.title}</h3>
              </div>
              <div className="p-5 bg-white space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-alta-gray uppercase tracking-wider mb-1">What Happened</p>
                  <p className="text-sm text-alta-gray leading-relaxed">{s.scenario}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-[10px] font-semibold text-[#8b6914] uppercase tracking-wider mb-1">The Lesson</p>
                  <p className="text-xs text-alta-gray leading-relaxed">{s.lesson}</p>
                </div>
                <p className="text-[9px] text-alta-teal font-medium">{s.source}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

        {/* Wire transfer safety checklist */}
        <h2 className="text-2xl font-bold text-alta-navy mb-4">Your Wire Transfer Safety Checklist</h2>
        <p className="text-sm text-alta-gray mb-4">Before you wire ANY money for your closing, verify every item on this list. Print it and check each box:</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-10">
          {[
            "I received wiring instructions through a secure portal or in person — NOT solely by email",
            "I called my settlement agent at a phone number I already had on file to verify the instructions",
            "I confirmed the bank name, routing number, and account number match what I was told by phone",
            "The account name on the wire matches my title company's name — not an individual's name",
            "I verified the exact dollar amount to wire with my settlement agent by phone",
            "I checked with my bank about their wire cutoff time (many stop at 3-4 PM)",
            "I will call my settlement agent immediately after the wire processes to confirm receipt",
            "I have NOT received any last-minute emails changing the wiring instructions",
            "I have NOT been pressured to wire urgently or 'the closing will be delayed'",
            "I have my settlement agent's direct phone number saved — not from an email",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-xl border border-gray-100 tile-interactive">
              <div className="w-4 h-4 rounded border-2 border-[#943030]/40 shrink-0 mt-0.5" />
              <p className="text-xs text-alta-navy leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/protect-your-money" className="px-5 py-2.5 bg-[#943030] text-white font-semibold rounded-lg hover:bg-[#7a2020] transition-colors text-center text-sm">
            Wire Fraud Overview
          </Link>
          <Link href="/closing-process/closing-checklist" className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm">
            Closing Checklist
          </Link>
          <Link href="/questions-to-ask" className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm">
            Questions to Ask
          </Link>
          <PrintButton />
        </div>

        <div className="mt-8 mb-4">
          <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/protect-your-money" className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Money</h3>
              <p className="text-xs text-alta-gray mt-1">Wire fraud overview, recovery steps, and what your title company should do</p>
            </Link>
            <Link href="/protect-your-rights" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Property Rights</h3>
              <p className="text-xs text-alta-gray mt-1">How owner's title insurance shields you from hidden title defects</p>
            </Link>
            <Link href="/find-company" className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Find a Title Company</h3>
              <p className="text-xs text-alta-gray mt-1">Search for ALTA member title and settlement companies near you</p>
            </Link>
          </div>
        </div>

        <FirstTimeBuyerCTA />
      </div>
    </div>
    </>
  );
}
