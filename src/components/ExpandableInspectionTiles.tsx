"use client";

import { useState } from "react";

const specialtyInspections = [
  { name: "Radon Testing", cost: "$100-$200", detail: "Radon is a naturally occurring radioactive gas — the #2 cause of lung cancer after smoking. It seeps into homes from the ground and can be present in ANY home regardless of age, location, or construction type. The EPA recommends testing every home. If levels exceed 4 pCi/L, mitigation systems ($800-$1,500) reduce radon by up to 99%. Many buyers make this part of their inspection contingency. Testing takes 48-72 hours with a continuous radon monitor.", source: "EPA", color: "#1a5276" },
  { name: "Sewer/Drain Scope", cost: "$150-$300", detail: "A camera inspection of the main sewer line from the house to the street. Reveals root intrusion, bellied (sagging) pipes, offset joints, cracks, scale buildup, and blockages. Strongly recommended for homes over 20 years old — sewer line replacement costs $5,000-$25,000+. Older homes may have clay, cast iron, or Orangeburg pipes that deteriorate over time. This is one of the most valuable specialty inspections because sewer problems are invisible until they cause a backup.", source: "ASHI", color: "#2d6b3f" },
  { name: "Termite/Pest Inspection", cost: "$75-$150", detail: "Also called a Wood-Destroying Insect (WDI) inspection. Checks for termites, carpenter ants, powder post beetles, and wood-boring beetles. Required by some lenders (especially VA loans) and in many southern and coastal states. Termite damage costs U.S. homeowners an estimated $5 billion per year. Unlike other insect damage, termite damage is NOT covered by homeowner's insurance. Treatment costs $200-$900 depending on type and severity.", source: "NPMA", color: "#5b3a8c" },
  { name: "Mold Testing", cost: "$200-$600", detail: "Air quality and surface samples identify mold type and concentration. Recommended if the general inspector finds visible mold, musty odors, or moisture issues. Not all mold is dangerous — but some species (like Stachybotrys 'black mold') can cause serious health problems. Professional remediation costs $1,500-$9,000 depending on scope. Mold thrives in areas with moisture: basements, crawlspaces, bathrooms, and around leaks. The key to mold prevention is moisture control.", source: "EPA", color: "#8b6914" },
  { name: "Well Water Testing", cost: "$100-$500", detail: "Required if the property has a private well (not connected to municipal water). FHA and VA loans require well water testing. Tests for bacteria (coliform, E. coli), nitrates, pH, hardness, iron, manganese, and sometimes radon in water. Additional tests may be needed based on local conditions — agricultural areas may need pesticide testing, mining areas may need heavy metal testing. Well water quality can change over time, so testing at purchase is critical.", source: "EPA", color: "#943030" },
  { name: "Septic System", cost: "$250-$500", detail: "Required if the property has a septic system instead of municipal sewer. Includes pumping the tank and inspecting its condition, checking the drain field for proper absorption, and verifying the system is adequately sized for the home. Septic system replacement costs $15,000-$30,000+. Systems typically need pumping every 3-5 years. Failed systems can contaminate groundwater and create health hazards. Many lenders require septic inspection.", source: "EPA", color: "#0a7ea8" },
  { name: "Structural Assessment", cost: "$300-$800", detail: "A licensed structural engineer evaluates the foundation, framing, and load-bearing elements. Recommended if the general inspector notes significant cracks (wider than 1/4 inch), uneven floors (more than 1 inch per 15 feet), sticking doors/windows, or bowing walls. The engineer provides a definitive assessment and specific repair recommendations with cost estimates. Foundation repair costs range from $2,000 for minor crack sealing to $50,000+ for major stabilization.", source: "ASCE", color: "#4a5568" },
  { name: "Chimney Inspection", cost: "$150-$500", detail: "If the home has a fireplace, wood stove, or gas logs. A Level 2 inspection (recommended for home sales) includes visual examination plus video scanning of the interior flue. Checks for creosote buildup (fire hazard), liner damage, crown and cap condition, and structural integrity. Chimney fires cause an estimated $125 million in property damage annually. Relining a chimney costs $2,500-$7,000. The Chimney Safety Institute of America recommends annual inspections.", source: "CSIA", color: "#1a5276" },
];

export default function ExpandableInspectionTiles() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {specialtyInspections.map((si, i) => (
          <div
            key={si.name}
            onClick={() => setExpandedIdx(i)}
            className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">{si.name}</h3>
              <span className="text-[10px] font-medium text-alta-teal bg-alta-light px-2 py-0.5 rounded shrink-0">{si.cost}</span>
            </div>
            <p className="text-xs text-alta-gray leading-relaxed line-clamp-2">{si.detail.slice(0, 120)}...</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[9px] text-alta-teal font-medium">Source: {si.source}</p>
              <p className="text-[9px] text-alta-teal opacity-0 group-hover:opacity-100 transition-opacity">Click for full details</p>
            </div>
          </div>
        ))}
      </div>

      {expandedIdx !== null && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setExpandedIdx(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setExpandedIdx(null)} className="absolute top-3 right-3 p-1.5 text-alta-gray hover:text-alta-navy bg-white/80 rounded-full z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="px-6 py-4 border-b border-gray-100" style={{ borderLeft: `4px solid ${specialtyInspections[expandedIdx].color}` }}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-alta-navy">{specialtyInspections[expandedIdx].name}</h3>
                <span className="text-sm font-bold" style={{ color: specialtyInspections[expandedIdx].color }}>{specialtyInspections[expandedIdx].cost}</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-alta-gray leading-relaxed mb-4">{specialtyInspections[expandedIdx].detail}</p>
              <p className="text-[10px] text-alta-teal font-medium">Source: {specialtyInspections[expandedIdx].source}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
