"use client";

// Simplified US state outlines — each state is a clickable path
// Path data derived from public domain US Census cartographic boundaries

const statePaths: Record<string, string> = {
  AL: "M631,396 L631,444 L628,460 L621,462 L619,467 L624,472 L618,472 L609,460 L609,396Z",
  AK: "M161,453 L183,453 L183,493 L161,493Z",
  AZ: "M205,371 L272,371 L272,348 L258,326 L233,326 L205,343Z",
  AR: "M544,382 L601,382 L601,426 L544,426Z",
  CA: "M123,230 L165,230 L186,274 L186,370 L153,381 L123,340Z",
  CO: "M296,280 L378,280 L378,326 L296,326Z",
  CT: "M818,203 L844,195 L850,210 L832,218 L818,213Z",
  DE: "M783,277 L796,269 L800,284 L789,294Z",
  FL: "M622,467 L676,444 L710,455 L720,496 L692,527 L665,527 L638,502 L624,472Z",
  GA: "M634,396 L676,396 L676,444 L634,460Z",
  HI: "M267,478 L302,478 L302,503 L267,503Z",
  ID: "M228,138 L267,138 L275,196 L252,240 L228,240Z",
  IL: "M571,248 L598,248 L606,280 L598,326 L571,342 L562,310 L562,272Z",
  IN: "M600,256 L631,256 L631,326 L600,326Z",
  IA: "M490,228 L562,228 L562,272 L490,272Z",
  KS: "M388,306 L488,306 L488,354 L388,354Z",
  KY: "M600,326 L682,310 L682,346 L631,360 L600,346Z",
  LA: "M544,426 L601,426 L601,478 L571,488 L544,467Z",
  ME: "M843,112 L868,100 L878,130 L858,167 L843,152Z",
  MD: "M728,268 L786,260 L790,288 L756,298 L728,290Z",
  MA: "M823,190 L860,182 L862,196 L840,200 L823,198Z",
  MI: "M588,154 L636,140 L648,178 L634,218 L600,228 L588,200Z",
  MN: "M468,114 L538,114 L538,196 L490,210 L468,196Z",
  MS: "M576,396 L609,396 L609,460 L576,460Z",
  MO: "M498,298 L571,298 L571,370 L536,382 L498,370Z",
  MT: "M248,100 L370,100 L370,160 L248,160Z",
  NE: "M370,240 L488,240 L488,286 L388,286 L370,270Z",
  NV: "M186,230 L228,230 L238,326 L205,343 L186,310Z",
  NH: "M833,138 L848,132 L848,182 L838,190 L833,170Z",
  NJ: "M790,236 L804,230 L808,272 L796,286 L786,268Z",
  NM: "M258,348 L340,348 L340,420 L258,420Z",
  NY: "M740,160 L820,148 L828,190 L800,216 L762,218 L740,200Z",
  NC: "M650,348 L768,332 L774,354 L714,370 L650,374Z",
  ND: "M378,100 L468,100 L468,156 L378,156Z",
  OH: "M634,240 L682,236 L690,292 L660,310 L634,302Z",
  OK: "M370,348 L488,340 L488,388 L432,400 L388,394 L370,370Z",
  OR: "M123,138 L228,138 L228,200 L186,218 L123,206Z",
  PA: "M706,218 L790,208 L790,258 L728,268 L706,260Z",
  RI: "M844,204 L854,200 L856,214 L846,216Z",
  SC: "M672,370 L726,354 L736,382 L700,402 L672,390Z",
  SD: "M378,160 L468,160 L468,228 L378,228Z",
  TN: "M580,346 L700,332 L700,362 L580,376Z",
  TX: "M340,370 L432,370 L488,388 L488,494 L410,518 L340,480Z",
  UT: "M238,240 L296,240 L296,326 L258,326 L238,300Z",
  VT: "M818,132 L834,126 L834,176 L822,186 L818,166Z",
  VA: "M660,290 L756,272 L774,316 L718,336 L660,342Z",
  WA: "M140,74 L228,74 L228,138 L186,142 L140,130Z",
  WV: "M682,274 L718,262 L730,310 L698,332 L682,310Z",
  WI: "M536,140 L588,128 L600,196 L568,228 L536,218 L536,170Z",
  WY: "M270,160 L370,160 L370,240 L296,240 L270,218Z",
};

interface USMapProps {
  selectedState: string | null;
  stateColors: Record<string, [string, string]>;
  onSelect: (abbr: string) => void;
}

export default function USMapSVG({ selectedState, stateColors, onSelect }: USMapProps) {
  return (
    <svg viewBox="100 60 800 480" className="w-full h-auto" style={{ maxHeight: "420px" }}>
      {/* Background */}
      <rect x="100" y="60" width="800" height="480" fill="#f4f7fa" rx="16" />

      {/* State paths */}
      {Object.entries(statePaths).map(([abbr, d]) => {
        const isSelected = selectedState === abbr;
        const colors = stateColors[abbr];
        const fillColor = isSelected ? (colors?.[0] || "#0a8ebc") : "#d1dce8";
        const strokeColor = isSelected ? "#ffffff" : "#a0b4c8";

        return (
          <g key={abbr} onClick={() => onSelect(abbr)} className="cursor-pointer">
            <path
              d={d}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={isSelected ? 3 : 1}
              className="hover:fill-[#0a8ebc] transition-colors duration-200"
              style={{ filter: isSelected ? "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" : undefined }}
            />
            {/* State label */}
            <text
              x={getCenter(d).x}
              y={getCenter(d).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isSelected ? "#ffffff" : "#4a5568"}
              fontWeight="bold"
              fontSize={isSelected ? "13" : "10"}
              className="pointer-events-none select-none"
              style={{ textShadow: isSelected ? "0 1px 2px rgba(0,0,0,0.5)" : undefined }}
            >
              {abbr}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Get rough center of a path for label placement
function getCenter(d: string): { x: number; y: number } {
  const nums = d.match(/\d+/g)?.map(Number) || [];
  if (nums.length < 4) return { x: 0, y: 0 };
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < nums.length; i += 2) {
    xs.push(nums[i]);
    if (i + 1 < nums.length) ys.push(nums[i + 1]);
  }
  return {
    x: xs.reduce((a, b) => a + b, 0) / xs.length,
    y: ys.reduce((a, b) => a + b, 0) / ys.length,
  };
}
