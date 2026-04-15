"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";

const topics = [
  "General Question",
  "Closing Process",
  "Title Insurance",
  "Closing Costs",
  "Wire Fraud / Security",
  "Finding a Title Company",
  "Mortgage / Financing",
  "Documents & Disclosures",
  "Site Feedback",
  "Other",
];

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim() || sending) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "support", ...form }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Failed to send your question. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        title="Questions & Support"
        subtitle="Can't find what you're looking for? Our team is here to help."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=400&fit=crop&q=80"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid md:grid-cols-5 gap-8 sm:gap-12">

          {/* Left column — info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-alta-navy mb-3">How Can We Help?</h2>
              <p className="text-sm text-alta-gray leading-relaxed">
                Whether you have a question about the home closing process, need clarification on a topic,
                or want to share feedback about HomeClosing101, we&apos;d love to hear from you.
              </p>
            </div>

            <div className="bg-alta-light rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-alta-navy">Before You Write</h3>
              <div className="space-y-3">
                <a href="/faq" className="flex items-center gap-3 text-sm text-alta-gray hover:text-alta-teal transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                    <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Browse our <strong>FAQ</strong> — 250+ answered questions</span>
                </a>
                <a href="/glossary" className="flex items-center gap-3 text-sm text-alta-gray hover:text-alta-teal transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                    <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span>Search the <strong>Glossary</strong> — 450+ real estate terms</span>
                </a>
                <a href="/questions-to-ask" className="flex items-center gap-3 text-sm text-alta-gray hover:text-alta-teal transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                    <svg className="w-4 h-4 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span><strong>Questions to Ask</strong> your title company</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-alta-navy to-[#0d3a5c] rounded-2xl p-5 text-white">
              <h3 className="text-sm font-bold mb-2">Response Time</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Questions are sent directly to ALTA&apos;s HomeClosing101 team.
                We typically respond within 1&ndash;2 business days.
              </p>
            </div>
          </div>

          {/* Right column — form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-alta-green/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-alta-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-alta-navy mb-2">Message Sent!</h2>
                <p className="text-sm text-alta-gray mb-6">
                  Thank you for reaching out. Our team will review your question and get back to you
                  {form.email ? ` at ${form.email}` : ""} within 1&ndash;2 business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", topic: topics[0], message: "" });
                  }}
                  className="px-6 py-2.5 bg-alta-teal text-white text-sm font-semibold rounded-xl hover:bg-alta-teal-dark transition-colors"
                >
                  Send Another Question
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-alta-navy mb-1">Send Us a Question</h2>
                  <p className="text-xs text-alta-gray">Fields marked with * are required</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-alta-red">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1.5">
                    Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/10"
                  >
                    {topics.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-alta-gray uppercase tracking-wider mb-1.5">
                    Your Question <span className="text-alta-red">*</span>
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what you need help with..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/10"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-alta-red text-sm rounded-xl px-4 py-3 border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!form.message.trim() || !form.email.trim() || sending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-alta-teal to-alta-green text-white font-bold text-sm transition-all hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100"
                >
                  {sending ? "Sending..." : "Submit Question"}
                </button>

                <p className="text-xs text-alta-gray text-center">
                  Your question will be sent to the HomeClosing101 support team at ALTA.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
