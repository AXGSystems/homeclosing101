'use client';

import { useState, useEffect } from 'react';
import { useClosingFolder, type ClosingFolderItem } from './ClosingFolderProvider';

interface SaveToFolderBtnProps {
  type: ClosingFolderItem['type'];
  title: string;
  content: string;
  /** Optional: deterministic ID to detect duplicates across sessions */
  dedupId?: string;
  label?: string;
  savedLabel?: string;
  className?: string;
}

export default function SaveToFolderBtn({
  type,
  title,
  content,
  dedupId,
  label = 'Save to Folder',
  savedLabel = 'Saved!',
  className = '',
}: SaveToFolderBtnProps) {
  const { items, addItem } = useClosingFolder();
  const [flash, setFlash] = useState(false);

  // Check if already saved by matching title + type, or dedupId in title
  const isSaved = items.some(
    (i) =>
      i.type === type &&
      (dedupId ? i.title === title && i.content === content : i.title === title)
  );

  useEffect(() => {
    if (flash) {
      const t = setTimeout(() => setFlash(false), 1500);
      return () => clearTimeout(t);
    }
  }, [flash]);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) return;
    addItem({ type, title, content });
    setFlash(true);
  };

  const showing = flash || isSaved;

  return (
    <button
      onClick={handleSave}
      disabled={isSaved}
      title={showing ? 'Saved to folder' : label}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all duration-200 print:hidden ${
        showing
          ? 'text-[#2d6b3f] opacity-60'
          : 'text-gray-400 hover:text-[#0a7ea8] opacity-50 hover:opacity-100'
      } ${className}`}
      aria-label={showing ? savedLabel : label}
    >
      {showing ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      )}
      {flash && <span className="text-[#2d6b3f]">Saved</span>}
    </button>
  );
}
