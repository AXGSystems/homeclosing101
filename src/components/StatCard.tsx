"use client";

import { type ReactNode } from "react";

export default function StatCard({
  accent,
  color,
  icon,
  children,
}: {
  accent: string;
  color: string;
  icon: ReactNode;
  children: ReactNode;
  index: number;
}) {
  return (
    <div
      className="stat-card relative overflow-hidden backdrop-blur-lg rounded-2xl border border-white/25 transition-all duration-200 hover:scale-[1.03] hover:border-white/50"
      style={{
        boxShadow:
          "0 0 20px rgba(10, 142, 188, 0.15), 0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
      <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-sm" />
      <div className="relative text-center p-4 lg:p-5">
        <div
          className={`${accent} mb-2 flex justify-center`}
        >
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}
