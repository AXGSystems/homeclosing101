"use client";

import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/* AUDITED DATA — do not modify statistics, costs, or source citations */
/* ------------------------------------------------------------------ */
const ESCALATION_STAGES = [
  {
    key: "day-0",
    timeLabel: "Day 0: Today",
    timeBarFill: 0.02,
    costLabel: "$0",
    costValue: 0,
    headline: "Set up free monitoring in 10 minutes.",
    detail:
      "Register for your county's free property fraud alert program. Cost: $0. Time: about 10 minutes. Your county notifies you every time a document is recorded against your property — typically within 24 to 48 hours.",
    statusColor: "#2d7a3e",
  },
  {
    key: "fraud-occurs",
    timeLabel: "The fraud occurs",
    timeBarFill: 0.18,
    costLabel: "Unknown — yet",
    costValue: 0,
    headline: "A forged deed is recorded at the county.",
    detail:
      "Your county recorder accepts the document because it appears valid on its face. Absent monitoring, you may not discover the fraud for months. The FBI has documented cases where owners only learn of the fraud when foreclosure notices arrive or new \"buyers\" show up to take possession — particularly for vacant, second-home, or mortgage-free properties.",
    statusColor: "#a04040",
  },
  {
    key: "discovery",
    timeLabel: "Discovery: months later",
    timeBarFill: 0.4,
    costLabel: "Attorney retained",
    costValue: 30000,
    headline: "You learn something is wrong — the hard way.",
    detail:
      "Common discovery paths include a foreclosure notice for a loan you never took out, a stranger arriving at your property, missing property tax bills, or a buyer claiming to own your home. You retain a real estate attorney and often a handwriting or document examination expert. Legal fees begin accumulating immediately, and the clock on resolution starts now — not when the fraud first occurred.",
    statusColor: "#a04040",
  },
  {
    key: "litigation",
    timeLabel: "Litigation begins",
    timeBarFill: 0.7,
    costLabel: "Property frozen",
    costValue: 90000,
    headline: "Quiet title lawsuit. Your property is frozen.",
    detail:
      "Your attorney files a quiet title action to invalidate the forged deed and a lis pendens — a public notice that your property is in litigation. During litigation, the property cannot be sold, refinanced, or used as collateral. If the fraudster took out loans in your name, your credit may be damaged and you may be defending against multiple parties at once: the fraudster, any lenders who accepted the forged documents, and potentially innocent third-party buyers who purchased the property in good faith.",
    statusColor: "#7a2020",
  },
  {
    key: "resolution",
    timeLabel: "Resolution",
    timeBarFill: 1.0,
    costLabel: "$143K average",
    costValue: 143000,
    headline:
      "The cost is substantial — even when title insurance covers it.",
    detail:
      "An independent Milliman analysis commissioned by ALTA found that fraud and forgery claims cost title insurers an average of more than $143,000 per case — roughly five times the cost of other title insurance claims. These are the claims title insurance pays to resolve. If your policy does not cover a particular incident (for example, certain post-policy forgeries under a standard owner's policy), those resolution costs may fall to you. And under any scenario, you may lose months or years of the ability to sell, refinance, or borrow against your property while the matter is being resolved. This is why early detection through free county alerts matters so much.",
    statusColor: "#7a2020",
  },
];

/* ------------------------------------------------------------------ */
/* SVG sub-component: smooth escalation curve                         */
/* ------------------------------------------------------------------ */
function EscalationCurve({ activeStage }: { activeStage: number }) {
  const points = ESCALATION_STAGES.slice(0, activeStage + 1).map((s) => ({
    x: 48 + s.timeBarFill * 530,
    y: 180 - (s.costValue / 143000) * 140,
  }));

  if (points.length < 2) return null;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    path += ` Q ${cpX} ${prev.y} ${cpX} ${(prev.y + curr.y) / 2} T ${curr.x} ${curr.y}`;
  }

  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${path} L ${last.x} 180 L ${first.x} 180 Z`;

  return (
    <g style={{ transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }}>
      <path d={areaPath} fill="url(#vulnAreaGrad)" />
      <path
        d={path}
        fill="none"
        stroke="#a04040"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function EscalationExplainer() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying) return;
    if (activeStage >= ESCALATION_STAGES.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setActiveStage((s) => s + 1), 3800);
    return () => clearTimeout(timer);
  }, [isPlaying, activeStage]);

  const stage = ESCALATION_STAGES[activeStage];
  const protectedCostY = 180;
  const vulnerableCostY = 180 - (stage.costValue / 143000) * 140;

  const reset = () => {
    setActiveStage(0);
    setIsPlaying(false);
  };

  const play = () => {
    if (activeStage >= ESCALATION_STAGES.length - 1) setActiveStage(0);
    setIsPlaying(true);
  };

  return (
    <div className="rounded border border-[#dde3ea] bg-gradient-to-b from-[#fbfcfd] to-[#f0f4f8] p-5 my-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_3px_rgba(0,45,90,0.04)]">
      {/* Header + dot nav */}
      <div className="flex justify-between items-center mb-3.5 flex-wrap gap-2.5">
        <div className="text-[11px] font-bold text-alta-navy tracking-[0.5px] uppercase">
          Cost Escalation Over Time
        </div>
        <div className="flex gap-1.5 items-center">
          {ESCALATION_STAGES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => {
                setActiveStage(i);
                setIsPlaying(false);
              }}
              aria-label={`Jump to ${s.timeLabel}`}
              className="h-2 rounded-full border-none p-0 cursor-pointer"
              style={{
                width: i === activeStage ? 22 : 8,
                background:
                  i <= activeStage
                    ? i === 0
                      ? "#2d7a3e"
                      : "#a04040"
                    : "#cfd7e0",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* SVG chart */}
      <div className="relative bg-white rounded-sm border border-[#e8edf2] overflow-hidden">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="vulnAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a04040" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#a04040" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="protAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2d7a3e" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2d7a3e" stopOpacity="0.03" />
            </linearGradient>
            <filter
              id="softGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Y-axis labels — scaled to $143K Milliman fraud/forgery claim average */}
          <g fontFamily="Georgia, serif" fontSize="10" fill="#8a98a7">
            <text x="8" y="44">
              $143K
            </text>
            <text x="8" y="90">
              $90K
            </text>
            <text x="8" y="136">
              $30K
            </text>
            <text x="8" y="184">
              $0
            </text>
          </g>

          {/* Grid lines */}
          {[40, 86, 132, 180].map((y, i) => (
            <line
              key={i}
              x1="48"
              x2="580"
              y1={y}
              y2={y}
              stroke="#eef2f6"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line
            x1="48"
            x2="580"
            y1="180"
            y2="180"
            stroke="#c2cdd8"
            strokeWidth="1.5"
          />
          <line
            x1="48"
            x2="48"
            y1="30"
            y2="180"
            stroke="#c2cdd8"
            strokeWidth="1.5"
          />

          {/* Protected flat line at $0 */}
          <path
            d={`M 48 ${protectedCostY} L ${48 + stage.timeBarFill * 530} ${protectedCostY} L ${48 + stage.timeBarFill * 530} 180 L 48 180 Z`}
            fill="url(#protAreaGrad)"
            style={{
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <line
            x1="48"
            x2={48 + stage.timeBarFill * 530}
            y1={protectedCostY}
            y2={protectedCostY}
            stroke="#2d7a3e"
            strokeWidth="2.5"
            strokeDasharray="6,4"
            style={{
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Vulnerable escalating line */}
          <EscalationCurve activeStage={activeStage} />

          {/* Protected endpoint */}
          <circle
            cx={48 + stage.timeBarFill * 530}
            cy={protectedCostY}
            r="5"
            fill="#2d7a3e"
            stroke="white"
            strokeWidth="2"
            filter="url(#softGlow)"
            style={{
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Vulnerable endpoint */}
          <circle
            cx={48 + stage.timeBarFill * 530}
            cy={vulnerableCostY}
            r="7"
            fill={stage.statusColor}
            stroke="white"
            strokeWidth="2.5"
            filter="url(#softGlow)"
            style={{
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Legend */}
          <g fontFamily="Source Sans Pro, Arial, sans-serif" fontSize="10.5">
            <g transform="translate(58, 36)">
              <line
                x1="0"
                x2="18"
                y1="6"
                y2="6"
                stroke="#2d7a3e"
                strokeWidth="2.5"
                strokeDasharray="4,3"
              />
              <text x="24" y="10" fill="#2d7a3e" fontWeight="700">
                Protected (monitoring set up)
              </text>
            </g>
            <g transform="translate(58, 54)">
              <line
                x1="0"
                x2="18"
                y1="6"
                y2="6"
                stroke="#a04040"
                strokeWidth="2.5"
              />
              <text x="24" y="10" fill="#a04040" fontWeight="700">
                Vulnerable (no monitoring)
              </text>
            </g>
          </g>

          {/* X-axis labels */}
          <g
            fontFamily="Source Sans Pro, Arial, sans-serif"
            fontSize="9"
            fill="#5a6b7d"
          >
            <text x="50" y="202" textAnchor="start">
              Day 0
            </text>
            <text x="168" y="202" textAnchor="middle">
              Fraud occurs
            </text>
            <text x="283" y="202" textAnchor="middle">
              Discovery
            </text>
            <text x="420" y="202" textAnchor="middle">
              Litigation
            </text>
            <text x="575" y="202" textAnchor="end">
              Resolution
            </text>
          </g>

          {/* Stage marker */}
          <line
            x1={48 + stage.timeBarFill * 530}
            x2={48 + stage.timeBarFill * 530}
            y1="30"
            y2="180"
            stroke={stage.statusColor}
            strokeWidth="1"
            strokeDasharray="2,3"
            opacity="0.5"
            style={{
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>
      </div>

      {/* Active stage detail */}
      <div
        className="bg-white rounded-sm p-4 mt-3.5"
        style={{
          border: `1px solid ${stage.statusColor}`,
          borderLeft: `5px solid ${stage.statusColor}`,
          transition: "border-color 0.4s ease",
        }}
      >
        <div className="flex justify-between items-start gap-3 flex-wrap mb-2">
          <div className="flex-1 min-w-[160px]">
            <div
              className="text-[10.5px] font-bold tracking-[0.5px] uppercase mb-0.5"
              style={{ color: stage.statusColor }}
            >
              {stage.timeLabel}
            </div>
            <div className="font-serif text-[17px] font-medium text-[#2c3e50] leading-tight">
              {stage.headline}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#8a98a7] uppercase tracking-[0.3px] font-semibold">
              Legal cost to-date
            </div>
            <div
              className="font-serif text-xl font-bold"
              style={{ color: stage.statusColor }}
            >
              {stage.costLabel}
            </div>
          </div>
        </div>
        <div className="text-[13.5px] text-[#3a4a5c] leading-relaxed">
          {stage.detail}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={isPlaying ? () => setIsPlaying(false) : play}
          className="inline-flex items-center gap-1.5 bg-alta-navy text-white border-none px-4 py-2 text-[13px] font-semibold rounded-sm cursor-pointer tracking-[0.3px]"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="10" y1="15" x2="10" y2="9" />
                <line x1="14" y1="15" x2="14" y2="9" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
              </svg>
              {activeStage === 0 ? "Play escalation" : "Continue"}
            </>
          )}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 bg-white text-alta-navy border border-alta-navy px-4 py-2 text-[13px] font-semibold rounded-sm cursor-pointer tracking-[0.3px]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1,4 1,10 7,10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Reset
        </button>
        <div className="ml-auto self-center text-[11.5px] text-[#7a8898] italic">
          Stage {activeStage + 1} of {ESCALATION_STAGES.length}
        </div>
      </div>
    </div>
  );
}
