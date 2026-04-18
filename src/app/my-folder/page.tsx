"use client";

import { useState, useEffect, useMemo } from "react";
import PageHero from "@/components/PageHero";
import type { ClosingFolderItem } from "@/components/ClosingFolderProvider";
import { useClosingFolder } from "@/components/ClosingFolderProvider";

const TYPE_CONFIG: Record<
  ClosingFolderItem["type"],
  { label: string; plural: string; icon: string }
> = {
  glossary: { label: "Glossary Term", plural: "Glossary Terms", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  checklist: { label: "Checklist Item", plural: "Checklist Items", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  question: { label: "Question", plural: "Questions", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  note: { label: "Note", plural: "Notes", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
};

const TYPE_ORDER: ClosingFolderItem["type"][] = ["glossary", "checklist", "question", "note"];

export default function MyFolderPage() {
  const { items, removeItem, clearAll } = useClosingFolder();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, ClosingFolderItem[]> = {};
    for (const item of items) {
      if (!map[item.type]) map[item.type] = [];
      map[item.type].push(item);
    }
    return map;
  }, [items]);

  const handleClearAll = () => {
    if (window.confirm("Remove all items from your Closing Folder? This cannot be undone.")) {
      clearAll();
    }
  };

  const isEmpty = items.length === 0;

  return (
    <>
      <PageHero
        title="My Closing Folder"
        subtitle="Your personalized collection of glossary terms, checklist items, questions, and notes saved from across HomeClosing101."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
        breadcrumb={[
          { label: "Resources", href: "/resources" },
          { label: "My Closing Folder", href: "/my-folder" },
        ]}
      />

      {/* Print-only branded header */}
      <div className="hidden print:block mb-6 px-6">
        <div className="flex items-center justify-between border-b-2 border-[#0a7ea8] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0a7ea8] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
            </div>
            <div>
              <span className="font-bold text-[#1a5276] text-lg">HomeClosing</span>
              <span className="font-bold text-[#0a7ea8] text-lg">101</span>
              <div className="text-[8px] text-gray-500 uppercase tracking-widest -mt-0.5">Your Roadmap to a Confident Closing</div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 font-medium">My Closing Folder</p>
            <p className="text-[10px] text-gray-400">{hydrated ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""}</p>
            <p className="text-[10px] text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
          <p className="text-[9px] text-gray-500 leading-relaxed">This personalized report was generated from HomeClosing101 (homeclosing101.org), an educational initiative of the American Land Title Association (ALTA). Content is for educational purposes only and does not constitute legal, financial, or insurance advice. Consult qualified professionals for guidance specific to your transaction.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 print:py-0 print:px-0">
        {/* Action bar — hidden on print */}
        {hydrated && !isEmpty && (
          <div className="flex flex-wrap items-center gap-3 mb-8 print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg shadow hover:bg-alta-teal/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download as PDF
            </button>
            <p className="text-[10px] text-gray-400 hidden sm:block">Tip: In the print dialog, select &quot;Save as PDF&quot; as the destination</p>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-red-600 font-semibold rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
            <span className="text-sm text-gray-500 ml-auto">
              {items.length} item{items.length !== 1 ? "s" : ""} saved
            </span>
          </div>
        )}

        {/* Empty state */}
        {hydrated && isEmpty && (
          <div className="text-center py-20 print:hidden">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-alta-navy mb-2">Your folder is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Browse the site and save glossary terms, checklist items, and questions. They will appear here, ready to print as a personalized report.
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {!hydrated && (
          <div className="space-y-6 animate-pulse print:hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg" />
            ))}
          </div>
        )}

        {/* Grouped items */}
        {hydrated && !isEmpty && (
          <div className="space-y-10">
            {TYPE_ORDER.filter((type) => grouped[type]?.length).map((type) => {
              const config = TYPE_CONFIG[type];
              const sectionItems = grouped[type];
              return (
                <section key={type}>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
                    <svg className="w-5 h-5 text-alta-teal shrink-0 print:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                    </svg>
                    <h2 className="text-lg font-bold text-alta-navy">
                      {config.plural}
                      <span className="ml-2 text-sm font-normal text-gray-500">({sectionItems.length})</span>
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {sectionItems.map((item) => (
                      <div key={item.id} className="group relative bg-white border border-gray-100 rounded-lg p-4 print:border-0 print:p-2 print:rounded-none print:border-b print:border-gray-300">
                        {/* Remove button — screen only */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 print:hidden"
                          aria-label={`Remove ${item.title}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {type === "glossary" && (
                          <>
                            <p className="font-bold text-alta-navy">{item.title}</p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.content}</p>
                          </>
                        )}

                        {type === "checklist" && (
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded-sm shrink-0 print:border-gray-600" />
                            <p className="text-sm text-gray-700">{item.title}{item.content ? ` — ${item.content}` : ""}</p>
                          </div>
                        )}

                        {type === "question" && (
                          <>
                            <p className="font-bold text-alta-navy">{item.title}</p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.content}</p>
                          </>
                        )}

                        {type === "note" && (
                          <>
                            <p className="font-semibold text-alta-navy">{item.title}</p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Print-only branded footer */}
        {hydrated && !isEmpty && (
          <div className="hidden print:block mt-12 pt-4 border-t-2 border-[#0a7ea8] px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#0a7ea8] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                </div>
                <span className="text-[10px] text-gray-500">HomeClosing101 | homeclosing101.org</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500">An educational initiative of the</p>
                <p className="text-[10px] text-[#0a7ea8] font-bold">American Land Title Association (ALTA)</p>
                <p className="text-[8px] text-gray-400">alta.org | 202.296.3671</p>
              </div>
            </div>
            <p className="text-[7px] text-gray-400 text-center mt-3">© {new Date().getFullYear()} American Land Title Association. HomeClosing101 is an educational initiative of ALTA. All content is for informational purposes only.</p>
          </div>
        )}
      </main>
    </>
  );
}
