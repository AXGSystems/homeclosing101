"use client";

interface DTIGaugeProps {
  value: number; // 0-100
  label?: string;
}

export default function DTIGauge({ value, label }: DTIGaugeProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const angle = (clampedValue / 100) * 180 - 90; // -90 to 90 degrees
  const color = clampedValue <= 28 ? "#2d6b3f" : clampedValue <= 36 ? "#0a7ea8" : clampedValue <= 43 ? "#8b6914" : "#943030";
  const status = clampedValue <= 28 ? "Excellent" : clampedValue <= 36 ? "Good" : clampedValue <= 43 ? "Acceptable" : "High Risk";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-48 h-28">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e8eef5"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Green zone (0-28%) */}
        <path
          d="M 20 100 A 80 80 0 0 1 69.6 30.4"
          fill="none"
          stroke="#2d6b3f"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Teal zone (28-36%) */}
        <path
          d="M 69.6 30.4 A 80 80 0 0 1 100 20"
          fill="none"
          stroke="#0a7ea8"
          strokeWidth="16"
          opacity="0.3"
        />
        {/* Amber zone (36-43%) */}
        <path
          d="M 100 20 A 80 80 0 0 1 130.4 30.4"
          fill="none"
          stroke="#8b6914"
          strokeWidth="16"
          opacity="0.3"
        />
        {/* Red zone (43%+) */}
        <path
          d="M 130.4 30.4 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#943030"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={100 + 60 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 60 * Math.sin((angle * Math.PI) / 180)}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        <circle cx="100" cy="100" r="6" fill={color} className="transition-all duration-700" />
        {/* Value */}
        <text x="100" y="88" textAnchor="middle" fill={color} fontWeight="bold" fontSize="20" className="transition-all duration-700">
          {Math.round(clampedValue)}%
        </text>
        <text x="100" y="108" textAnchor="middle" fill="#6b7a8d" fontSize="10">
          {status}
        </text>
      </svg>
      {label && <p className="text-[10px] text-alta-gray mt-1">{label}</p>}
    </div>
  );
}
