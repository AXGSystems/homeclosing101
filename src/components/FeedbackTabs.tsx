"use client";

import { useState } from "react";

type TabType = "bug" | "suggestion" | null;

export default function FeedbackTabs() {
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (type: TabType) => {
    if (!form.message.trim()) return;
    const subject = type === "bug" ? "Bug Report — HomeClosing101" : "Suggestion — HomeClosing101";
    const body = `${type === "bug" ? "Bug Report" : "Suggestion"}\n\nFrom: ${form.name || "Anonymous"}\nEmail: ${form.email || "Not provided"}\n\n${form.message}`;
    window.location.href = `mailto:feedback@homeclosing101.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab(null);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="print:hidden">
      {/* Side tabs — fixed on left edge */}
      <div className="fixed left-0 bottom-[160px] z-40 flex flex-col gap-1">
        {/* Report A Bug tab */}
        <button
          onClick={() => { setActiveTab(activeTab === "bug" ? null : "bug"); setSubmitted(false); }}
          className={`flex items-center gap-1.5 px-2 py-3 sm:px-3 sm:py-4 rounded-r-xl shadow-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "bug"
              ? "bg-alta-red text-white translate-x-0"
              : "bg-white text-alta-red border border-l-0 border-gray-200 hover:bg-red-50 -translate-x-0.5 hover:translate-x-0"
          }`}
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Report Bug
        </button>

        {/* Suggestion Box tab */}
        <button
          onClick={() => { setActiveTab(activeTab === "suggestion" ? null : "suggestion"); setSubmitted(false); }}
          className={`flex items-center gap-1.5 px-2 py-3 sm:px-3 sm:py-4 rounded-r-xl shadow-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            activeTab === "suggestion"
              ? "bg-alta-teal text-white translate-x-0"
              : "bg-white text-alta-teal border border-l-0 border-gray-200 hover:bg-teal-50 -translate-x-0.5 hover:translate-x-0"
          }`}
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Suggestions
        </button>
      </div>

      {/* Panel overlay */}
      {activeTab && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setActiveTab(null)}
          />

          {/* Panel */}
          <div className="fixed left-2 sm:left-4 bottom-[100px] sm:bottom-[120px] z-50 w-[calc(100vw-1rem)] sm:w-[380px] max-w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className={`px-5 py-4 text-white ${activeTab === "bug" ? "bg-gradient-to-r from-alta-red to-red-700" : "bg-gradient-to-r from-alta-teal to-teal-700"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activeTab === "bug" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  <div>
                    <h3 className="font-bold text-sm">{activeTab === "bug" ? "Report A Bug" : "Suggestion Box"}</h3>
                    <p className="text-[10px] text-white/70">
                      {activeTab === "bug" ? "Help us fix issues" : "We'd love your ideas"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="px-5 py-10 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-alta-green/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-alta-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-bold text-alta-navy">Thank you!</p>
                <p className="text-sm text-alta-gray mt-1">Your {activeTab === "bug" ? "report" : "suggestion"} has been sent.</p>
              </div>
            ) : (
              <div className="px-5 py-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1">Name <span className="text-alta-gray/50">(optional)</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-alta-teal focus:ring-1 focus:ring-alta-teal/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1">Email <span className="text-alta-gray/50">(optional)</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-alta-teal focus:ring-1 focus:ring-alta-teal/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1">
                    {activeTab === "bug" ? "Describe the issue" : "Your suggestion"} <span className="text-alta-red">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={activeTab === "bug" ? "What happened? What page were you on?" : "What would make HomeClosing101 better?"}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:border-alta-teal focus:ring-1 focus:ring-alta-teal/20"
                  />
                </div>
                <button
                  onClick={() => handleSubmit(activeTab)}
                  disabled={!form.message.trim()}
                  className={`w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40 ${
                    activeTab === "bug"
                      ? "bg-alta-red hover:bg-red-700"
                      : "bg-alta-teal hover:bg-alta-teal-dark"
                  }`}
                >
                  {activeTab === "bug" ? "Submit Bug Report" : "Submit Suggestion"}
                </button>
                <p className="text-[10px] text-alta-gray text-center">
                  This will open your email client to send the report.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
