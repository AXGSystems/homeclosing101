"use client";

import { useState, ReactNode } from "react";

interface ExpandableTileProps {
  children: ReactNode;
  expandedContent?: ReactNode;
  expandedTitle?: string;
  className?: string;
}

export default function ExpandableTile({ children, expandedContent, expandedTitle, className = "" }: ExpandableTileProps) {
  const [expanded, setExpanded] = useState(false);

  if (!expandedContent) {
    // No expanded content — just render as a regular tile with hover effects
    return <div className={`tile-interactive ${className}`}>{children}</div>;
  }

  return (
    <>
      <div
        onClick={() => setExpanded(true)}
        className={`tile-interactive cursor-pointer group relative ${className}`}
      >
        {children}
        {/* Expand indicator */}
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-alta-teal/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3 h-3 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        </div>
      </div>

      {/* Expanded modal */}
      {expanded && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setExpanded(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 p-1.5 text-alta-gray hover:text-alta-navy bg-white/80 rounded-full z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {expandedTitle && (
              <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-alta-navy pr-8">{expandedTitle}</h3>
              </div>
            )}
            <div className="p-6">
              {expandedContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
