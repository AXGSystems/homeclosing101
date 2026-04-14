"use client";

import { useState } from "react";

const SITE_URL = "https://homeclosing101.vercel.app";

interface ShareButtonsProps {
  /** Override the path to share (defaults to current page) */
  path?: string;
  /** Override the share title */
  title?: string;
}

export default function ShareButtons({ path, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => (path ? `${SITE_URL}${path}` : typeof window !== "undefined" ? window.location.href : SITE_URL);
  const getTitle = () => title || (typeof document !== "undefined" ? document.title : "HomeClosing101");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be blocked */
    }
  };

  const emailUrl = () => {
    const subject = encodeURIComponent(getTitle());
    const body = encodeURIComponent(`Check out this page on HomeClosing101:\n\n${getUrl()}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  const twitterUrl = () => {
    const text = encodeURIComponent(`${getTitle()} ${getUrl()}`);
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank", "noopener");
  };

  const facebookUrl = () => {
    const u = encodeURIComponent(getUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, "_blank", "noopener");
  };

  const linkedinUrl = () => {
    const u = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`, "_blank", "noopener");
  };

  const btnBase = "relative group w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200";

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-gray-400 font-medium mr-1 select-none">Share</span>

      {/* Copy Link */}
      <button onClick={copyLink} className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-[#1a3550] hover:text-white`} aria-label="Copy link">
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.056a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.47 8.591" /></svg>
        )}
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {copied ? "Copied!" : "Copy link"}
        </span>
      </button>

      {/* Email */}
      <button onClick={emailUrl} className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-[#0a7ea8] hover:text-white`} aria-label="Share via email">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Email</span>
      </button>

      {/* Twitter / X */}
      <button onClick={twitterUrl} className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-[#1d9bf0] hover:text-white`} aria-label="Share on X">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">X / Twitter</span>
      </button>

      {/* Facebook */}
      <button onClick={facebookUrl} className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-[#1877f2] hover:text-white`} aria-label="Share on Facebook">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Facebook</span>
      </button>

      {/* LinkedIn */}
      <button onClick={linkedinUrl} className={`${btnBase} bg-gray-100 text-gray-500 hover:bg-[#0a66c2] hover:text-white`} aria-label="Share on LinkedIn">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[9px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">LinkedIn</span>
      </button>
    </div>
  );
}
