'use client';

import { useState, useRef, useEffect } from 'react';
import { FolderOpen, X, Trash2, Printer } from 'lucide-react';
import { useClosingFolder, type ClosingFolderItem } from './ClosingFolderProvider';

const TYPE_LABELS: Record<ClosingFolderItem['type'], string> = {
  glossary: 'Glossary',
  checklist: 'Checklist',
  question: 'Question',
  note: 'Note',
};

const TYPE_COLORS: Record<ClosingFolderItem['type'], string> = {
  glossary: 'bg-alta-teal/10 text-alta-teal',
  checklist: 'bg-alta-green/10 text-alta-green',
  question: 'bg-alta-gold/10 text-amber-700',
  note: 'bg-alta-navy/10 text-alta-navy',
};

export default function ClosingFolderButton() {
  const { items, removeItem, clearAll } = useClosingFolder();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [open]);

  function handlePrint() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>My Closing Folder - HomeClosing101</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; color: #1a2744; padding: 40px; }
          h1 { font-size: 24px; margin-bottom: 4px; color: #1a2744; }
          .subtitle { font-size: 13px; color: #6b7a8d; margin-bottom: 24px; }
          .item { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; page-break-inside: avoid; }
          .item-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
          .badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: #f0f4f8; color: #6b7a8d; }
          .item-title { font-size: 15px; font-weight: 600; }
          .item-content { font-size: 13px; color: #374151; line-height: 1.5; white-space: pre-wrap; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7a8d; text-align: center; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <h1>My Closing Folder</h1>
        <div class="subtitle">HomeClosing101 -- Saved ${items.length} item${items.length === 1 ? '' : 's'} -- Printed ${new Date().toLocaleDateString()}</div>
        ${items.map(item => `
          <div class="item">
            <div class="item-header">
              <span class="badge">${TYPE_LABELS[item.type]}</span>
              <span class="item-title">${item.title}</span>
            </div>
            <div class="item-content">${item.content}</div>
          </div>
        `).join('')}
        <div class="footer">HomeClosing101.org -- An educational initiative of the American Land Title Association (ALTA)</div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-20 left-4 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-alta-navy text-white shadow-lg hover:bg-alta-teal transition-colors duration-200 print:hidden"
        aria-label={`My Closing Folder${items.length > 0 ? ` (${items.length} items)` : ''}`}
      >
        <FolderOpen className="w-5 h-5" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-alta-gold text-alta-navy text-[11px] font-bold">
            {items.length > 99 ? '99+' : items.length}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 print:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out print:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-alta-light">
          <div>
            <h2 className="text-lg font-bold text-alta-navy">My Closing Folder</h2>
            <p className="text-xs text-alta-gray">
              {items.length} saved item{items.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close folder panel"
          >
            <X className="w-5 h-5 text-alta-gray" />
          </button>
        </div>

        {/* Action bar */}
        {items.length > 0 && (
          <div className="flex gap-2 px-5 py-3 border-b border-gray-100">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-alta-teal text-white hover:bg-alta-teal-dark transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print My Folder
            </button>
            <button
              onClick={() => {
                if (window.confirm('Clear all saved items from your folder?')) {
                  clearAll();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 text-alta-gray hover:bg-gray-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}

        {/* Items list */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 130px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <FolderOpen className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-sm font-medium text-alta-gray">Your folder is empty</p>
              <p className="text-xs text-gray-400 mt-1">
                Save glossary terms, checklist items, questions, and notes as you browse.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {items.map(item => (
                <li key={item.id} className="px-5 py-3 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[item.type]}`}>
                          {TYPE_LABELS[item.type]}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(item.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-alta-navy truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.content}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-alta-red transition-colors shrink-0 mt-1"
                      aria-label={`Remove "${item.title}" from folder`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
