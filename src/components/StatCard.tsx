"use client";

import { type ReactNode } from "react";

export default function StatCard({
  accent,
  color,
  icon,
  children,
  backContent,
}: {
  accent: string;
  color: string;
  icon: ReactNode;
  children: ReactNode;
  backContent?: ReactNode;
  index: number;
}) {
  if (backContent) {
    return (
      <div
        className="flip-card rounded-2xl"
        style={{
          boxShadow:
            "0 0 20px rgba(10, 142, 188, 0.15), 0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flip-card-inner relative w-full" style={{ minHeight: "180px" }}>
          {/* Front face */}
          <div className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden border border-white/25 backdrop-blur-lg">
            <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
            <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-sm" />
            <div className="relative text-center p-4 lg:p-5 h-full flex flex-col items-center justify-center">
              <div className={`${accent} mb-2 flex justify-center`}>{icon}</div>
              {children}
            </div>
          </div>
          {/* Back face */}
          <div className="flip-card-back absolute inset-0 rounded-2xl overflow-hidden border border-white/25 backdrop-blur-lg">
            <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
            <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-sm" />
            <div className="relative text-center p-4 lg:p-5 h-full flex flex-col items-center justify-center">
              {backContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
