"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type FeedbackType = "bug" | "suggestion" | "feedback" | "question";

const FEEDBACK_TYPES: { key: FeedbackType; label: string; color: string }[] = [
  { key: "bug", label: "Bug Report", color: "bg-red-50 text-red-700 border-red-200" },
  { key: "suggestion", label: "Suggestion", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: "feedback", label: "Feedback", color: "bg-green-50 text-green-700 border-green-200" },
  { key: "question", label: "Question", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

function parseBrowser(ua: string): string {
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Other";
}

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>("feedback");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.location.pathname.startsWith("/admin"));
    }
  }, []);

  if (isAdmin) return null;

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }
    setSending(true);
    setError("");

    try {
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const device = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
      const page = typeof window !== "undefined" ? window.location.pathname : "";
      const browser = parseBrowser(ua);

      const { error: sbError } = await supabase.from("hc101_feedback").insert({
        type,
        page,
        message: message.trim(),
        email: email.trim() || null,
        user_agent: ua,
        device,
        browser,
        status: "new",
      });

      if (sbError) throw sbError;

      setSubmitted(true);
      setMessage("");
      setEmail("");
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 3000);
    } catch {
      // Fallback: store in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem("hc101-feedback-queue") || "[]");
        existing.push({
          type,
          message: message.trim(),
          email: email.trim() || null,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem("hc101-feedback-queue", JSON.stringify(existing));
        setSubmitted(true);
        setMessage("");
        setEmail("");
        setTimeout(() => {
          setSubmitted(false);
          setOpen(false);
        }, 3000);
      } catch {
        setError("Failed to submit. Please try again later.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating button — bottom-right, above scroll-to-top */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-[180px] right-4 z-[9998] w-10 h-10 rounded-full bg-[#1a2744] text-white shadow-lg hover:bg-[#0a8ebc] transition-colors flex items-center justify-center print:hidden"
        aria-label="Send feedback"
        title="Send feedback"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 print:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="bg-[#1a2744] px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Send Feedback</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#1a2744]">Thank you for your feedback!</p>
                <p className="text-xs text-gray-500 mt-1">We appreciate you taking the time to help us improve.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {/* Type selector */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Type</label>
                  <div className="flex flex-wrap gap-2">
                    {FEEDBACK_TYPES.map((ft) => (
                      <button
                        key={ft.key}
                        onClick={() => setType(ft.key)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                          type === ft.key
                            ? ft.color
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {ft.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a8ebc] bg-white text-gray-900 resize-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    Email <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a8ebc] bg-white text-gray-900"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 font-medium">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="w-full py-2.5 bg-[#0a8ebc] text-white rounded-lg font-semibold text-sm hover:bg-[#077a9e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Submit Feedback"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
