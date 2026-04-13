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
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
        showing
          ? 'bg-[#e9f5ed] text-[#2d6b3f] border border-[#bddcc7]'
          : 'bg-[#e6f1f5] text-[#0a7ea8] border border-[#b4d8e8] hover:bg-[#0a7ea8] hover:text-white hover:border-[#0a7ea8]'
      } ${className}`}
      aria-label={showing ? savedLabel : label}
    >
      {showing ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
          </svg>
          {flash ? savedLabel : 'Saved'}
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
