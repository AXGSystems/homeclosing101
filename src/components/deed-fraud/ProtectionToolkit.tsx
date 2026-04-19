"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface ChecklistItemData {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  completed: boolean;
  completedDate?: string;
  notes: string;
}

export interface ToolkitStats {
  total: number;
  completed: number;
  critical: number;
  criticalDone: number;
}

interface ProtectionToolkitProps {
  checklist: ChecklistItemData[];
  toggleItem: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  stats: ToolkitStats;
}

/* ------------------------------------------------------------------ */
/* Priority badge colors                                               */
/* ------------------------------------------------------------------ */
const PRIORITY_COLORS: Record<string, { border: string; badge: string; badgeBg: string }> = {
  critical: { border: "#a04040", badge: "#a04040", badgeBg: "bg-red-50 text-red-700" },
  high: { border: "#7a5a00", badge: "#7a5a00", badgeBg: "bg-amber-50 text-amber-700" },
  medium: { border: "#3a6a8a", badge: "#3a6a8a", badgeBg: "bg-blue-50 text-blue-700" },
  low: { border: "#7a8898", badge: "#7a8898", badgeBg: "bg-gray-50 text-gray-600" },
};

/* ------------------------------------------------------------------ */
/* ChecklistItem                                                       */
/* ------------------------------------------------------------------ */
function ChecklistItem({
  item,
  toggleItem,
  updateNotes,
}: {
  item: ChecklistItemData;
  toggleItem: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
}) {
  const [showNotes, setShowNotes] = useState(!!item.notes);
  const colors = PRIORITY_COLORS[item.priority];

  return (
    <div
      className="rounded-sm mb-2 transition-colors duration-200"
      style={{
        border: "1px solid #e8edf2",
        borderLeft: `4px solid ${colors.border}`,
        padding: 14,
        background: item.completed ? "#f0faf2" : "white",
      }}
    >
      <div className="flex gap-3 items-start">
        {/* Toggle button */}
        <button
          onClick={() => toggleItem(item.id)}
          className="bg-transparent border-none cursor-pointer p-0.5 mt-px"
          style={{ color: item.completed ? "#2d7a3e" : "#c2cdd8" }}
          aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
        >
          {item.completed ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              className="text-sm font-semibold"
              style={{
                color: item.completed ? "#5a6b7d" : "#2c3e50",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.title}
            </span>
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${colors.badgeBg}`}
            >
              {item.priority}
            </span>
          </div>
          <div
            className="text-[13px] text-[#5a6b7d] leading-normal"
            style={{
              marginBottom:
                item.completed || showNotes ? 8 : 0,
            }}
          >
            {item.description}
          </div>

          {/* Completed date stamp */}
          {item.completed && item.completedDate && (
            <div className="text-[11px] text-[#2d7a3e] font-semibold mb-1 flex items-center gap-1">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline align-middle"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Completed{" "}
              {new Date(item.completedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          )}

          {/* Notes */}
          {showNotes || item.notes ? (
            <textarea
              placeholder="Add notes (e.g., confirmation number, date registered, phone number called)..."
              value={item.notes}
              onChange={(e) => updateNotes(item.id, e.target.value)}
              className="w-full min-h-[50px] p-2 text-xs border border-[#dde3ea] rounded-sm font-sans resize-y box-border mt-1.5"
            />
          ) : (
            <button
              onClick={() => setShowNotes(true)}
              className="bg-transparent border-none text-[#3a6a8a] text-xs cursor-pointer p-0 mt-1"
            >
              + Add notes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ProtectionToolkit (main export)                                     */
/* ------------------------------------------------------------------ */
export default function ProtectionToolkit({
  checklist,
  toggleItem,
  updateNotes,
  stats,
}: ProtectionToolkitProps) {
  // Group checklist items by category
  const grouped = checklist.reduce<Record<string, ChecklistItemData[]>>(
    (acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    },
    {}
  );

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-[#5a6b7d]">
            {stats.completed} of {stats.total} steps completed
          </span>
          <span className="text-xs font-bold text-alta-navy">{pct}%</span>
        </div>
        <div className="w-full h-2 bg-[#e8edf2] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background:
                pct === 100
                  ? "#2d7a3e"
                  : pct >= 50
                  ? "#0a8ebc"
                  : "#d4a843",
            }}
          />
        </div>
        {stats.critical > 0 && stats.criticalDone < stats.critical && (
          <div className="text-[11px] text-[#a04040] font-semibold mt-1.5">
            {stats.criticalDone} of {stats.critical} critical items completed
          </div>
        )}
      </div>

      {/* Grouped checklist */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-5">
          <div className="text-[11px] font-bold text-[#8a98a7] tracking-[0.8px] uppercase mb-2.5 pb-1.5 border-b border-[#e8edf2]">
            {category}
          </div>
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              toggleItem={toggleItem}
              updateNotes={updateNotes}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
