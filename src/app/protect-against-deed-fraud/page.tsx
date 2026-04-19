"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import CountyLookup from "@/components/deed-fraud/CountyLookup";
import EscalationExplainer from "@/components/deed-fraud/EscalationExplainer";
import ProtectionToolkit from "@/components/deed-fraud/ProtectionToolkit";
import ExportModal from "@/components/deed-fraud/ExportModal";
import CallScript from "@/components/deed-fraud/CallScript";
import SafeSenderSetup from "@/components/deed-fraud/SafeSenderSetup";
import { COUNTY_DATABASE, US_STATES } from "@/data/countyDatabase";
import type { CountyProgram } from "@/data/countyDatabase";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LookupResult = any;
import { initializeChecklist } from "@/data/deedFraudChecklist";
import type { ChecklistItemData } from "@/components/deed-fraud/ProtectionToolkit";

const STORAGE_KEY = "alta-deed-fraud-toolkit";

interface UserInfo { name: string; email: string; }

export default function ProtectAgainstDeedFraud() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [customCounty, setCustomCounty] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItemData[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [expandedSection, setExpandedSection] = useState<string | null>("what-is-it");
  const [showExportModal, setShowExportModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setChecklist(data.checklist || initializeChecklist() as ChecklistItemData[]);
        setUserInfo(data.userInfo || { name: "", email: "" });
        setSelectedState(data.selectedState || "");
        setSelectedCounty(data.selectedCounty || "");
      } else {
        setChecklist(initializeChecklist() as ChecklistItemData[]);
      }
    } catch { setChecklist(initializeChecklist() as ChecklistItemData[]); }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (checklist.length > 0 && mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ checklist, userInfo, selectedState, selectedCounty, lastUpdated: new Date().toISOString() }));
      } catch {}
    }
  }, [checklist, userInfo, selectedState, selectedCounty, mounted]);

  const availableCounties = useMemo(() => {
    if (!selectedState) return [];
    const stateData = COUNTY_DATABASE[selectedState] || {};
    return Object.keys(stateData).filter(k => !k.startsWith("_")).sort();
  }, [selectedState]);

  const statewideProgram = useMemo((): CountyProgram | null => {
    return COUNTY_DATABASE._statewide?.[selectedState] || (COUNTY_DATABASE[selectedState] as Record<string, CountyProgram>)?._stateNote || null;
  }, [selectedState]);

  const handleLookup = useCallback(() => {
    if (!selectedState) return;
    const stateData = COUNTY_DATABASE[selectedState] || {};
    const countyKey = selectedCounty || customCounty;
    if (statewideProgram) { setLookupResult({ type: "statewide", data: statewideProgram, state: selectedState, county: countyKey || "All counties" }); return; }
    const countyData = (stateData as Record<string, CountyProgram>)[selectedCounty];
    if (selectedCounty && countyData) { setLookupResult({ type: countyData.noProgram ? "no-program" : "verified", data: countyData, state: selectedState, county: selectedCounty }); return; }
    const stateName = US_STATES.find(s => s.code === selectedState)?.name || selectedState;
    const county = customCounty || selectedCounty || "your county";
    setLookupResult({ type: "fallback", state: selectedState, stateName, county, searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${county} ${stateName} recorder property fraud alert`)}`, pfaTry: `https://www.propertyfraudalert.com/${selectedState}${county.replace(/\s+County.*/i, "").replace(/\s+/g, "")}` });
  }, [selectedState, selectedCounty, customCounty, statewideProgram]);

  const toggleItem = useCallback((id: string) => {
    setChecklist(prev => prev.map(item => item.id !== id ? item : { ...item, completed: !item.completed, completedDate: !item.completed ? new Date().toISOString() : undefined }));
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, notes } : item));
  }, []);

  const resetToolkit = useCallback(() => {
    if (window.confirm("Reset your toolkit? All checked items and notes will be cleared.")) {
      setChecklist(initializeChecklist() as ChecklistItemData[]);
      setUserInfo({ name: "", email: "" });
    }
  }, []);

  const stats = useMemo(() => {
    const completed = checklist.filter(i => i.completed).length;
    const criticalItems = checklist.filter(i => i.priority === "critical");
    return { completed, total: checklist.length, critical: criticalItems.length, criticalDone: criticalItems.filter(i => i.completed).length };
  }, [checklist]);

  const toggle = (id: string) => setExpandedSection(prev => prev === id ? null : id);

  return (
    <>
      <PageHero
        title="Protect Your Home From Deed Fraud"
        subtitle="Free tools, county-specific alerts, and a step-by-step protection checklist — most homeowners can set up free monitoring in about 10 minutes."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[{ label: "Protect Your Money", href: "/protect-your-money" }, { label: "Protect Against Deed Fraud", href: "/protect-against-deed-fraud" }]}
      />

      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Sticky intro */}
          <div className="mb-6 p-4 bg-[#f5e8e8] rounded-2xl border border-[#e4c5c5] border-l-4 border-l-[#943030] sm:sticky sm:top-[142px] z-20 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#943030]/10 flex items-center justify-center text-[#943030] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Consumer Protection Guide</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Deed fraud is when someone forges your signature on a deed to steal your property. It&apos;s rare but serious. This guide helps you set up free monitoring, check your county&apos;s alert program, and build a personalized protection plan — all at no cost.</p>
              </div>
            </div>
          </div>

          {/* ═══ SECTION: What is deed fraud? ═══ */}
          <Section id="what-is-it" expanded={expandedSection} toggle={toggle} title="What is deed fraud?">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">Deed fraud is a form of real estate identity theft. A criminal uses stolen personal information to forge a deed transferring your property to themselves or a shell company, then records it with the county recorder&apos;s office. Once recorded, the fraudulent deed sits in the public record until it is removed by court order.</p>
            <p className="text-sm text-alta-gray leading-relaxed mb-2 font-semibold text-alta-navy">Common targets include:</p>
            <ul className="space-y-1.5 mb-3">
              {["Vacant land and second homes", "Rental and investment properties", "Homes owned free and clear (no mortgage)", "Properties of elderly or deceased owners", "Homeowners with out-of-state mailing addresses"].map(t => (
                <li key={t} className="flex items-start gap-2 text-sm text-alta-gray"><svg className="w-4 h-4 text-[#943030] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>{t}</li>
              ))}
            </ul>
            <p className="text-sm text-alta-gray leading-relaxed">A forged deed is legally void, but untangling it typically requires a lawsuit, legal fees, and significant time. Early detection is the most effective defense.</p>
          </Section>

          {/* ═══ SECTION: Why this matters ═══ */}
          <Section id="why-it-matters" expanded={expandedSection} toggle={toggle} title="Why this matters: the cost of not being protected">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">Ten minutes of setup today costs nothing. If your property is ever targeted, the financial and time cost of remediation is substantial — an independent Milliman analysis commissioned by ALTA found that fraud and forgery claims cost title insurers an <strong className="text-alta-navy">average of more than $143,000 per case</strong>, roughly five times the cost of other title insurance claims.</p>
            <EscalationExplainer />
            <div className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] my-4">
              <p className="font-bold text-[#943030] text-sm mb-1">Homeowner&apos;s insurance does not cover this.</p>
              <p className="text-xs text-alta-gray leading-relaxed">Most people assume their homeowner&apos;s insurance would cover something this severe. It does not. A title insurance policy you purchased at closing covers title defects that existed <em>before</em> your policy was issued — it typically does not cover forgeries recorded <em>after</em>, unless your title insurance company issued you an enhanced policy.</p>
            </div>
            <p className="text-[10px] text-alta-gray italic mt-3">Sources: Milliman, Analysis of Claims and Claims-Related Losses in the Land Title Insurance Industry (commissioned by ALTA, May 2024); FBI IC3 2024 &amp; 2025 Internet Crime Reports; NAR 2025 Deed &amp; Title Fraud Survey.</p>
          </Section>

          {/* ═══ SECTION: Title insurance coverage ═══ */}
          <Section id="title-insurance" expanded={expandedSection} toggle={toggle} title="What does my title insurance cover?">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">An <strong className="text-alta-navy">owner&apos;s title insurance policy</strong> protects you against title defects — including fraud and forgery — that existed <em>before</em> your policy was issued. Standard owner&apos;s policies typically do <strong>not</strong> cover fraudulent deeds recorded <em>after</em> your policy was issued. That&apos;s where monitoring comes in.</p>
            <div className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] mb-3">
              <p className="text-sm text-alta-gray leading-relaxed"><strong className="text-alta-navy">Important:</strong> Some title insurance companies offer enhanced policies that include coverage for certain forgeries recorded after the policy is issued. Contact your title insurance company and ask which policy you have and whether an upgrade is available.</p>
            </div>
          </Section>

          {/* ═══ SECTION: Free monitoring ═══ */}
          <Section id="free-monitoring" expanded={expandedSection} toggle={toggle} title="Set up free monitoring in about 10 minutes">
            <p className="text-sm text-alta-gray leading-relaxed mb-4">Many counties and several states now offer <strong className="text-alta-navy">free</strong> property fraud alert services. When a document is recorded against your property, you get an email, text, or phone call — usually within 24 to 48 hours. No subscription, no monthly fee.</p>
          </Section>

          {/* ═══ COUNTY LOOKUP TOOL ═══ */}
          <CountyLookup
            selectedState={selectedState}
            setSelectedState={(v: string) => { setSelectedState(v); setSelectedCounty(""); setCustomCounty(""); setLookupResult(null); }}
            selectedCounty={selectedCounty}
            setSelectedCounty={(v: string) => { setSelectedCounty(v); setLookupResult(null); }}
            customCounty={customCounty}
            setCustomCounty={(v: string) => { setCustomCounty(v); setSelectedCounty(""); setLookupResult(null); }}
            lookupResult={lookupResult}
            handleLookup={handleLookup}
          />

          <InlineAd />

          {/* ═══ SECTION: Phone call script ═══ */}
          <Section id="call-script" expanded={expandedSection} toggle={toggle} title="What to say if you have to call your county">
            <p className="text-sm text-alta-gray leading-relaxed mb-4">If your county doesn&apos;t have online registration or you prefer to call, use this script. You can also print it from the export button below.</p>
            <CallScript />
          </Section>

          {/* ═══ SECTION: Safe sender setup ═══ */}
          <Section id="safe-sender" expanded={expandedSection} toggle={toggle} title="Make sure alerts reach your inbox">
            <p className="text-sm text-alta-gray leading-relaxed mb-4">An alert that lands in your spam folder is worse than no alert — it gives you false security. After you register, add the alert sender to your email&apos;s safe-senders list:</p>
            <SafeSenderSetup />
          </Section>

          {/* ═══ SECTION: Additional steps ═══ */}
          <Section id="additional-steps" expanded={expandedSection} toggle={toggle} title="Additional free protection steps">
            <ul className="space-y-3">
              {[
                { title: "Pull a current copy of your deed", desc: "Visit your county recorder's website or office. Confirm your name, legal description, and that no unauthorized filings exist." },
                { title: "Freeze your credit at all three bureaus", desc: "Equifax, Experian, and TransUnion — free and reversible. Prevents fraudsters from using your identity for loans against your property." },
                { title: "Set up free weekly credit monitoring", desc: "AnnualCreditReport.com offers free weekly reports. Watch for unauthorized accounts or inquiries." },
                { title: "Verify your mailing address with the Assessor", desc: "Ensure property tax notices and any legal correspondence reach you. Critical for second homes and rentals." },
                { title: "Watch for missing property tax bills", desc: "A missing tax bill, mail addressed to a stranger, or foreclosure notices for loans you didn't take are red flags." },
              ].map(s => (
                <li key={s.title} className="p-3 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f]">
                  <p className="text-sm font-bold text-alta-navy">{s.title}</p>
                  <p className="text-xs text-alta-gray mt-0.5 leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* ═══ SECTION: If targeted ═══ */}
          <Section id="if-targeted" expanded={expandedSection} toggle={toggle} title="If you suspect you've been targeted">
            <div className="space-y-3">
              {[
                { step: "1", title: "Do not panic — a forged deed is legally void", desc: "You are still the legal owner. The forged deed creates a cloud on your title that must be removed, but it does not transfer actual ownership." },
                { step: "2", title: "Contact your title insurance company", desc: "If you have an owner's policy, report the suspected fraud. Your policy may cover legal defense costs." },
                { step: "3", title: "File a police report", desc: "Document the suspected fraud with local law enforcement. Get a copy of the report number." },
                { step: "4", title: "Report to the FBI IC3", desc: "File at ic3.gov. The FBI tracks real estate fraud patterns nationally." },
                { step: "5", title: "Contact your county recorder", desc: "Ask them to flag the fraudulent recording. Some counties can add a fraud alert notation." },
                { step: "6", title: "Consult a real estate attorney", desc: "You may need to file a quiet title action to remove the fraudulent deed from the public record." },
              ].map(s => (
                <div key={s.step} className="flex gap-3 items-start p-3 bg-white rounded-xl border border-gray-200 tile-interactive">
                  <span className="w-7 h-7 rounded-full bg-[#943030] text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                  <div>
                    <p className="text-sm font-bold text-alta-navy">{s.title}</p>
                    <p className="text-xs text-alta-gray mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ═══ SECTION: Paid services ═══ */}
          <Section id="paid-services" expanded={expandedSection} toggle={toggle} title="What about paid monitoring services?">
            <p className="text-sm text-alta-gray leading-relaxed mb-3">Several companies offer paid property monitoring subscriptions, typically $10–$30 per month. Before subscribing, consider:</p>
            <ul className="space-y-2 mb-3">
              {[
                "Check whether your county already offers a free alert program (use the lookup tool above)",
                "Understand that no monitoring service — free or paid — can prevent a forged deed from being recorded. They can only alert you after the fact.",
                "Some paid services add credit monitoring, identity theft protection, or legal consultation. Evaluate whether you already have these through other subscriptions.",
                "The FTC has published consumer guidance noting that free county services often provide the same core alert functionality as paid services.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-alta-gray"><svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>{t}</li>
              ))}
            </ul>
            <p className="text-sm text-alta-gray leading-relaxed">A paid service is a personal choice, not a necessity. The toolkit below helps you track your protection steps regardless of which approach you choose.</p>
          </Section>

          <InlineAd />

          {/* ═══ PROTECTION TOOLKIT ═══ */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-alta-navy">My Deed Fraud Protection Toolkit</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowExportModal(true)} className="px-3 py-1.5 bg-alta-teal text-white text-xs font-semibold rounded-lg hover:bg-alta-teal/90 transition-colors">Export / Print</button>
                <button onClick={resetToolkit} className="px-3 py-1.5 text-xs text-gray-400 hover:text-[#943030] transition-colors">Reset</button>
              </div>
            </div>
            <p className="text-sm text-alta-gray mb-4">Track your protection steps. Your progress is saved in your browser — nothing is sent to ALTA. Use the Export button to save a PDF or email yourself a copy.</p>
            {mounted && <ProtectionToolkit checklist={checklist} toggleItem={toggleItem} updateNotes={updateNotes} stats={stats} />}
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-8 text-xs text-alta-gray leading-relaxed">
            <p className="font-semibold text-alta-navy mb-1">Disclaimer</p>
            <p>This page is provided for educational purposes by the American Land Title Association (ALTA). It does not constitute legal advice. ALTA does not issue title insurance policies or have access to policies issued. For policy inquiries, contact your settlement agent or title insurance company directly. County program information was verified as of the dates shown and may change. Always confirm details directly with your county recorder&apos;s office.</p>
          </div>

          {/* Related Topics */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-alta-navy mb-4">Related Topics</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/deed-theft" className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Deed Theft Overview</h3>
                <p className="text-xs text-alta-gray mt-1">What it is, how it happens, and title lock vs title insurance</p>
              </Link>
              <Link href="/protect-your-rights" className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Protect Your Property Rights</h3>
                <p className="text-xs text-alta-gray mt-1">How owner&apos;s title insurance shields you from title defects</p>
              </Link>
              <Link href="/identity-protection" className="p-4 bg-[#e8f0f5] rounded-xl border border-[#c5d8e4] border-l-4 border-l-[#1a5276] tile-interactive group">
                <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">Identity Protection</h3>
                <p className="text-xs text-alta-gray mt-1">Protecting your personal information during a real estate transaction</p>
              </Link>
            </div>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          checklist={checklist}
          userInfo={userInfo}
          lookupResult={lookupResult}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </>
  );
}

/* ═══ Accordion Section Component ═══ */
function Section({ id, expanded, toggle, title, children }: { id: string; expanded: string | null; toggle: (id: string) => void; title: string; children: React.ReactNode }) {
  const isOpen = expanded === id;
  return (
    <div className="mb-4">
      <button onClick={() => toggle(id)} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-alta-teal/30 transition-colors text-left group">
        <h2 className="text-base font-bold text-alta-navy group-hover:text-alta-teal transition-colors">{title}</h2>
        <svg className={`w-5 h-5 text-alta-gray shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <div className="mt-2 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
}
