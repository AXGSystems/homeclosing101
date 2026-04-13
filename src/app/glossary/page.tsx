"use client";

import { useState, useMemo, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import { glossaryData, type GlossaryTerm } from "@/data/glossaryData";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const letterColors: Record<string, string> = {
  A: "#1a5276", B: "#2d6b3f", C: "#5b3a8c", D: "#8b6914", E: "#943030",
  F: "#0a7ea8", G: "#1a5276", H: "#2d6b3f", I: "#5b3a8c", J: "#8b6914",
  K: "#943030", L: "#0a7ea8", M: "#1a5276", N: "#2d6b3f", O: "#5b3a8c",
  P: "#8b6914", Q: "#943030", R: "#0a7ea8", S: "#1a5276", T: "#2d6b3f",
  U: "#5b3a8c", V: "#8b6914", W: "#943030", X: "#0a7ea8", Y: "#1a5276",
  Z: "#2d6b3f",
};

const totalAllTerms = Object.values(glossaryData).reduce((acc, arr) => acc + arr.length, 0);

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [clipped, setClipped] = useState<Record<string, GlossaryTerm>>({});
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [showClipList, setShowClipList] = useState(false);

  const filteredData = useMemo(() => {
    if (!search && !activeLetter) return glossaryData;
    const result: typeof glossaryData = {};
    for (const [letter, terms] of Object.entries(glossaryData)) {
      if (activeLetter && letter !== activeLetter) continue;
      const filtered = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(search.toLowerCase()) ||
          t.definition.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) result[letter] = filtered;
    }
    return result;
  }, [search, activeLetter]);

  const totalTerms = Object.values(filteredData).reduce((acc, arr) => acc + arr.length, 0);
  const clippedCount = Object.keys(clipped).length;

  const toggleClip = (t: GlossaryTerm) => {
    setClipped((prev) => {
      const next = { ...prev };
      if (next[t.term]) {
        delete next[t.term];
      } else {
        next[t.term] = t;
      }
      return next;
    });
  };

  const printClipList = () => {
    const terms = Object.values(clipped).sort((a, b) => a.term.localeCompare(b.term));
    const html = `<!DOCTYPE html><html><head><title>My Glossary</title>
<style>@page{margin:0.5in;size:auto}body{font-family:system-ui,sans-serif;max-width:700px;margin:0 auto;padding:20px;color:#1a1a1a}
.header{text-align:center;padding-bottom:16px;margin-bottom:24px;border-bottom:2px solid #0a8ebc}
.header h1{font-size:20px;color:#0f2b46;margin:0 0 4px}.header p{font-size:11px;color:#9ca3af;margin:0}
.term{margin-bottom:16px;padding:10px 14px;border-left:3px solid #0a8ebc;background:#f8fafb;border-radius:0 8px 8px 0;break-inside:avoid}
.term h2{font-size:14px;color:#0f2b46;margin:0 0 4px}.term p{font-size:12px;color:#4a5568;margin:0;line-height:1.5}
.term .ex{font-size:11px;color:#0a7ea8;margin-top:6px;font-style:italic}
.footer{text-align:center;margin-top:24px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:9px;color:#9ca3af}
</style></head><body>
<div class="header"><h1>My Glossary</h1><p>HomeClosing101.org — An ALTA Educational Initiative — ${terms.length} saved terms</p></div>
${terms.map(t => `<div class="term"><h2>${t.term}</h2><p>${t.definition}</p>${t.example ? `<p class="ex">${t.example}</p>` : ''}</div>`).join('')}
<div class="footer">HomeClosing101.org — An educational initiative of the American Land Title Association (ALTA)</div>
</body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); win.print(); }
  };

  return (
    <>
    <PageHero
      title="Real Estate Glossary"
      subtitle={`${totalAllTerms} searchable terms — from abstract to zoning. Click any term for details and closing examples.`}
      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
      breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Glossary", href: "/glossary" }]}
    />

    {/* Term detail modal */}
    {selectedTerm && (
      <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setSelectedTerm(null)}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setSelectedTerm(null)} className="absolute top-4 right-4 p-1 text-alta-gray hover:text-alta-navy">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: letterColors[selectedTerm.term.charAt(0)] || '#0a8ebc' }}>
              {selectedTerm.term.charAt(0)}
            </div>
            <h3 className="text-2xl font-bold text-alta-navy">{selectedTerm.term}</h3>
          </div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-alta-teal uppercase tracking-wider mb-1">Definition</p>
            <p className="text-alta-gray leading-relaxed">{selectedTerm.definition}</p>
          </div>
          {selectedTerm.example && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl border border-blue-100 mb-4">
              <p className="text-sm font-semibold text-alta-teal uppercase tracking-wider mb-1">How This Applies at Closing</p>
              <p className="text-sm text-alta-gray leading-relaxed">{selectedTerm.example}</p>
            </div>
          )}
          <button
            onClick={() => toggleClip(selectedTerm)}
            className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
              clipped[selectedTerm.term]
                ? "bg-alta-teal text-white"
                : "bg-alta-light text-alta-navy hover:bg-alta-teal/10"
            }`}
          >
            <svg className="w-4 h-4" fill={clipped[selectedTerm.term] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            {clipped[selectedTerm.term] ? "Saved to My List" : "Save to My List"}
          </button>
        </div>
      </div>
    )}

    {/* Clip list modal */}
    {showClipList && (
      <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setShowClipList(false)}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-bold text-alta-navy">My Saved Terms</h3>
              <p className="text-xs text-alta-gray">{clippedCount} term{clippedCount !== 1 ? "s" : ""} saved</p>
            </div>
            <div className="flex items-center gap-2">
              {clippedCount > 0 && (
                <button onClick={printClipList} className="px-3 py-1.5 bg-alta-navy text-white text-xs font-semibold rounded-lg hover:bg-alta-teal transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  Print List
                </button>
              )}
              <button onClick={() => setShowClipList(false)} className="p-1 text-alta-gray hover:text-alta-navy">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {clippedCount === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                <p className="text-sm text-alta-gray">No terms saved yet.</p>
                <p className="text-xs text-alta-gray mt-1">Click the bookmark icon on any term to save it here.</p>
              </div>
            ) : (
              Object.values(clipped)
                .sort((a, b) => a.term.localeCompare(b.term))
                .map((t) => (
                  <div key={t.term} className="flex items-start gap-3 p-3 bg-alta-light rounded-xl group">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: letterColors[t.term.charAt(0)] || '#0a8ebc' }}>
                      {t.term.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-alta-navy">{t.term}</p>
                      <p className="text-xs text-alta-gray leading-relaxed line-clamp-2">{t.definition}</p>
                    </div>
                    <button onClick={() => toggleClip(t)} className="p-1 text-alta-gray hover:text-[#943030] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" title="Remove">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    )}

    <div className="py-1.5 lg:py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Sticky toolbar: intro + search + ad — all lock under the mini hero */}
        <div className="sticky top-[128px] sm:top-[138px] z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 bg-white pb-3 pt-3 shadow-md rounded-b-xl">
          {/* Compact intro */}
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-lg bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-alta-navy">Your Real Estate Dictionary — {totalAllTerms} Terms</p>
              <p className="text-xs text-alta-gray leading-snug">Search, browse by letter, or click any term for details. <strong className="text-alta-navy">Save terms</strong> to build a printable list.</p>
            </div>
          </div>

          {/* Search + My List */}
          <div className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alta-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
                className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm text-alta-navy"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-alta-gray hover:text-alta-navy transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            <button
              onClick={() => setShowClipList(true)}
              className="relative px-3 py-2.5 bg-alta-navy text-white rounded-lg hover:bg-alta-teal transition-colors flex items-center gap-1.5 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
              <span className="hidden sm:inline text-xs font-semibold">My List</span>
              {clippedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-alta-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">{clippedCount}</span>
              )}
            </button>
          </div>

          {/* Letter nav */}
          <div className="flex flex-wrap gap-1 mb-2">
            <button
              onClick={() => { setActiveLetter(null); setSearch(""); }}
              className={`px-2 h-7 text-[11px] font-semibold rounded transition-colors ${
                !activeLetter ? "bg-alta-teal text-white shadow-sm" : "bg-alta-light text-alta-gray hover:text-alta-teal"
              }`}
            >
              All ({totalAllTerms})
            </button>
            {allLetters.map((l) => {
              const count = glossaryData[l]?.length || 0;
              const hasTerms = count > 0;
              return (
                <button
                  key={l}
                  onClick={() => { setActiveLetter(l === activeLetter ? null : l); setSearch(""); }}
                  disabled={!hasTerms}
                  className={`w-7 h-7 text-[11px] font-semibold rounded transition-colors ${
                    l === activeLetter
                      ? "text-white shadow-sm"
                      : hasTerms
                      ? "bg-alta-light text-alta-gray hover:text-white"
                      : "bg-gray-50 text-gray-300 cursor-not-allowed"
                  }`}
                  style={l === activeLetter ? { backgroundColor: letterColors[l] } : hasTerms ? {} : {}}
                  onMouseEnter={(e) => { if (hasTerms && l !== activeLetter) { e.currentTarget.style.backgroundColor = letterColors[l]; e.currentTarget.style.color = 'white'; } }}
                  onMouseLeave={(e) => { if (hasTerms && l !== activeLetter) { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; } }}
                >
                  {l}
                </button>
              );
            })}
          </div>

          {/* Count + sponsor ad strip */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-alta-gray">
              {search ? `Showing ${totalTerms} of ${totalAllTerms} terms for "${search}"` : activeLetter ? `Showing ${totalTerms} of ${totalAllTerms} terms starting with ${activeLetter}` : `Showing all ${totalTerms} terms`}
            </p>
          </div>

          {/* Inline sponsor ad inside sticky */}
          <StickyGlossaryAd />
        </div>

        {/* Terms */}
        <div className="space-y-8">
          {Object.entries(filteredData)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms], groupIdx) => {
              const color = letterColors[letter] || '#0a8ebc';
              const showAd = !activeLetter && !search && groupIdx > 0 && groupIdx % 4 === 0;
              return (
                <div key={letter}>
                {showAd && <div className="py-2"><InlineAd /></div>}
                <div id={`letter-${letter}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ backgroundColor: color }}>
                      {letter}
                    </div>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
                    <span className="text-xs font-medium" style={{ color }}>{terms.length} term{terms.length > 1 ? "s" : ""}</span>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {terms.map((t) => {
                      const isClipped = !!clipped[t.term];
                      return (
                        <div
                          key={t.term}
                          className="relative p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive group cursor-pointer"
                          style={{ borderLeftWidth: '3px', borderLeftColor: color }}
                          onClick={() => setSelectedTerm(t)}
                        >
                          {/* Clip button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleClip(t); }}
                            className={`absolute top-3 right-3 p-1 rounded transition-all ${
                              isClipped ? 'text-alta-teal' : 'text-gray-300 opacity-0 group-hover:opacity-100 hover:text-alta-teal'
                            }`}
                            title={isClipped ? "Remove from list" : "Save to list"}
                          >
                            <svg className="w-4 h-4" fill={isClipped ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                          </button>
                          <div className="flex items-start gap-3 pr-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}>
                              {t.term.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-alta-navy text-sm group-hover:text-alta-teal transition-colors">{t.term}</h3>
                              <p className="text-xs text-alta-gray mt-1 leading-relaxed line-clamp-2">{t.definition}</p>
                              {t.example && (
                                <span className="inline-flex items-center gap-0.5 mt-2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                                  View example
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                </div>
              );
            })}
        </div>

        <InlineAd />

        {totalTerms === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-alta-light flex items-center justify-center">
              <svg className="w-10 h-10 text-alta-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <p className="text-alta-navy font-semibold text-lg mb-1">No terms found</p>
            <p className="text-sm text-alta-gray max-w-xs mx-auto">
              We couldn&apos;t find any terms matching &quot;{search || activeLetter}&quot;. Try a different keyword or browse by letter.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveLetter(null); }}
              className="mt-4 px-5 py-2 bg-alta-teal text-white text-sm font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors"
            >
              Clear &amp; Show All Terms
            </button>
          </div>
        )}

        <FirstTimeBuyerCTA />
      </div>
    </div>
    </>
  );
}

/* ─── Sticky Glossary Ad ─── */
const adSponsors = [
  { name: "CertifID", logo: "https://www.alta.org/images/wplogos/1165795.png", url: "https://certifid.com/", blurb: "Wire fraud prevention and identity verification platform protecting real estate transactions from cyber threats.", shade: "bg-blue-50/80 border-blue-200/60" },
  { name: "Qualia", logo: "https://www.alta.org/images/wplogos/1141461.png", url: "https://www.qualia.com/", blurb: "Digital real estate closing platform connecting title, lending, and real estate professionals for faster closings.", shade: "bg-indigo-50/80 border-indigo-200/60" },
  { name: "SoftPro", logo: "https://www.alta.org/images/wplogos/0005926.png", url: "https://www.softprocorp.com/", blurb: "Leading closing, title, and escrow software for real estate professionals — trusted by thousands nationwide.", shade: "bg-green-50/80 border-green-200/60" },
  { name: "Closinglock", logo: "https://www.alta.org/images/wplogos/1168010.png", url: "https://www.closinglock.com/", blurb: "Secure payment platform for the real estate industry — protecting wire transfers and preventing fraud.", shade: "bg-red-50/80 border-red-200/60" },
  { name: "First American Title", logo: "https://www.alta.org/images/wplogos/0000226.png", url: "https://www.firstam.com/", blurb: "Nation's leading provider of title insurance, settlement services, and risk solutions for real estate transactions.", shade: "bg-cyan-50/80 border-cyan-200/60" },
  { name: "WFG National Title", logo: "https://www.alta.org/images/wplogos/0002642.png", url: "https://wfgtitle.com/", blurb: "Technology-driven title insurance and settlement services company focused on innovation and agent support.", shade: "bg-purple-50/80 border-purple-200/60" },
  { name: "Old Republic National Title", logo: "https://www.alta.org/images/wplogos/0004443.png", url: "https://www.oldrepublictitle.com/", blurb: "One of the largest title insurance groups in the nation, providing title and escrow services since 1907.", shade: "bg-amber-50/80 border-amber-200/60" },
  { name: "Stewart Title", logo: "https://www.alta.org/images/wplogos/0002809.png", url: "https://www.stewart.com/", blurb: "Global real estate services company providing title insurance and settlement solutions worldwide.", shade: "bg-teal-50/80 border-teal-200/60" },
  { name: "FNF Family of Companies", logo: "https://www.alta.org/images/wplogos/0000218.png", url: "https://www.fnf.com/", blurb: "Fidelity National Financial — the nation's largest group of title insurance companies and a Fortune 500 leader.", shade: "bg-sky-50/80 border-sky-200/60" },
  { name: "DataTrace", logo: "https://www.alta.org/images/wplogos/0003471.png", url: "https://www.datatracetitle.com/", blurb: "Title data solutions and automation technology powering faster, more accurate title searches and decisions.", shade: "bg-orange-50/80 border-orange-200/60" },
];

function StickyGlossaryAd() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setIdx(Math.floor(Math.random() * adSponsors.length));
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % adSponsors.length);
        setFading(false);
      }, 400);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const s = adSponsors[idx];

  return (
    <div className="mt-2">
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border ${s.shade} ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ transition: "opacity 400ms ease, box-shadow 200ms ease" }}
      >
        <div className="flex items-center gap-4 p-3 sm:p-4">
          {/* Logo — full color, same style as InlineAd */}
          <div className="w-28 sm:w-36 shrink-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.logo} alt={s.name} className="h-10 sm:h-12 w-auto object-contain max-w-[130px]" />
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-semibold text-alta-teal uppercase tracking-widest mb-0.5">ALTA Member Spotlight</p>
            <p className="text-sm font-bold text-alta-navy truncate">{s.name}</p>
            <p className="text-xs text-alta-gray leading-relaxed line-clamp-2 hidden sm:block mt-0.5">{s.blurb}</p>
          </div>
          {/* CTA */}
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1 px-4 py-2 bg-alta-teal text-white rounded-lg text-xs font-semibold hover:bg-alta-teal-dark transition-colors">
              Learn More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
