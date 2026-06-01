"use client";

import Link from "next/link";

/**
 * Friendly "not available in this version" page shown by RouteGuard when a
 * visitor lands directly on a page that the active site version has disabled.
 * Rendered inside the normal shell (header/footer stay), never a hard 404.
 */
export default function UnavailablePanel() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f4f8] text-[#1a5276]">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M9.172 16.172a4 4 0 015.656 0M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1a2744]">
          This section isn&rsquo;t available right now
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          This part of HomeClosing101 isn&rsquo;t included in the version of the
          site you&rsquo;re viewing. The core closing-process, protection and
          company-finder resources are always available.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0a8ebc] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#077a9e]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
