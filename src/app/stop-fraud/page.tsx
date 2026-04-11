import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import FraudStats from "@/components/FraudStats";
import { InlineAd } from "@/components/EliteProviders";
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
  { value: "1 in 4", label: "Buyers received suspicious messages during transactions", source: "CertifID" },
  { value: "40%", label: "Year-over-year increase in deepfake scams", source: "Entrust 2026" },
];

export default function StopFraudPage() {
  return (
    <>
    <PageHero title="Stop Fraud 101" subtitle="10 prevention steps sourced from the FBI, CFPB, NAR, ALTA, and CertifID. Print them out and keep them with your closing documents." image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80" breadcrumb={[{label:"Protect Your Money",href:"/protect-your-money"},{label:"Stop Fraud 101",href:"/stop-fraud"}]} />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Page intro */}
        <div className="mb-4 p-4 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 sticky top-[120px] sm:top-[130px] z-20 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-alta-red shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Your Fraud Prevention Toolkit</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Every step below is verified by federal agencies and industry authorities. Print this page, share it with your family, and refer to it throughout your closing process. Wire fraud is preventable — but only if you know what to watch for.</p>
            </div>
          </div>
        </div>

        {/* Interactive stats — click any tile for deep-dive details */}
        <FraudStats />

        {/* 10 Prevention Steps */}
        <h2 className="text-2xl font-bold text-alta-navy mb-6">10 Steps to Prevent Wire Fraud</h2>
        <div className="space-y-4 mb-12">
          {preventionSteps.map((step) => (
            <div key={step.num} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive">
              <div className="w-10 h-10 rounded-full bg-alta-red text-white flex items-center justify-center font-bold text-sm shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-alta-navy">{step.title}</h3>
                <p className="text-sm text-alta-gray mt-1">{step.desc}</p>
                <p className="text-[10px] text-alta-teal mt-2 font-medium uppercase tracking-wider">Source: {step.source}</p>
              </div>
            </div>
          ))}
        </div>

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
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="feature-card p-4 bg-white rounded-xl border border-gray-100" data-accent="red">
              <h3 className="text-sm font-semibold text-alta-navy">{r.name}</h3>
              <p className="text-xs text-alta-gray mt-0.5">{r.desc}</p>
              <span className="text-xs text-alta-teal font-medium mt-2 inline-flex items-center gap-1">
                Visit site
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/protect-your-money" className="px-6 py-3 bg-alta-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-center">
            More on Wire Fraud Protection
          </Link>
          <Link href="/closing-process/closing-checklist" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
            Closing Checklist
          </Link>
          <PrintButton />
        </div>
      </div>
    </div>
    </>
  );
}
