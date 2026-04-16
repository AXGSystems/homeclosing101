"use client";

import { type ReactNode } from "react";

export default function StatCard({
  accent,
  color,
  icon,
  children,
  index,
}: {
  accent: string;
  color: string;
  icon: ReactNode;
  children: ReactNode;
  index: number;
}) {
  const accentHex = accent.includes("5ec4e6")
    ? "#5ec4e6"
    : accent.includes("c8d6e5")
      ? "#c8d6e5"
      : "#f87171";

  return (
    <div
      className="stat-card relative overflow-hidden backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/25 transition-all duration-300 hover:scale-[1.06] hover:border-white/50"
      style={{
        boxShadow:
          "0 0 20px rgba(10, 142, 188, 0.15), 0 8px 32px rgba(0,0,0,0.2)",
        animation: "statFloat 3s ease-in-out infinite",
        animationDelay: `${index * 0.4}s`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${accentHex}40, 0 0 60px ${accentHex}20, 0 12px 40px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 20px rgba(10, 142, 188, 0.15), 0 8px 32px rgba(0,0,0,0.2)";
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
      <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-sm" />
      <div className="relative text-center">
        <div
          className={`${accent} mb-3 flex justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
        >
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}
