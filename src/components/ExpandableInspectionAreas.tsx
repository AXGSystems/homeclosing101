"use client";

import { useState } from "react";

const inspectionAreas = [
  {
    area: "Structural & Foundation",
    icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21",
    color: "#1a5276",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    items: ["Foundation cracks, settling, or water damage", "Load-bearing walls and framing condition", "Floor levelness and joist integrity", "Basement/crawlspace moisture and structure"],
    detail: "The foundation is the most critical component of any home — if it fails, everything above it is compromised. Inspectors examine the foundation from the exterior (looking for cracks, displacement, and drainage issues) and the interior (checking basement walls, crawlspace piers, and slab condition).",
    redFlags: [
      { flag: "Horizontal cracks wider than 1/4 inch", risk: "May indicate lateral soil pressure or structural movement. Repair: $5,000-$15,000+ for wall stabilization with carbon fiber or steel braces.", severity: "high" },
      { flag: "Stair-step cracks in brick or block", risk: "Indicates differential settlement — one part of the foundation is sinking more than another. May require underpinning ($10,000-$50,000+).", severity: "high" },
      { flag: "Floors sloping more than 1 inch per 15 feet", risk: "Sign of significant structural movement. Could be foundation settling, deteriorated beams, or joist damage. Always warrants a structural engineer's assessment.", severity: "high" },
      { flag: "Doors and windows sticking or not closing", risk: "Often caused by the house shifting. While sometimes cosmetic, persistent sticking across multiple openings indicates structural movement.", severity: "medium" },
      { flag: "Water staining in basement or crawlspace", risk: "May indicate poor drainage, hydrostatic pressure, or grading issues. Waterproofing solutions range from $2,000 (exterior grading) to $15,000+ (interior drainage system).", severity: "medium" },
      { flag: "Bouncy or sagging floors", risk: "Could be undersized joists, cut/notched joists, deteriorated support beams, or missing columns. Repair: $1,500-$5,000 for sister joists or new support posts.", severity: "medium" },
    ],
    questions: ["Has the foundation ever been repaired?", "Has a structural engineer ever evaluated this property?", "Is there a history of water intrusion in the basement or crawlspace?", "Were any load-bearing walls removed during renovations?"],
    cost: "Structural engineer assessment: $300-$800. Foundation repair: $2,000-$50,000+ depending on severity.",
  },
  {
    area: "Roof & Exterior",
    icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    color: "#2d6b3f",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    items: ["Roof age, condition, and remaining life expectancy", "Gutters, downspouts, and drainage", "Siding, trim, and exterior paint condition", "Windows and doors (seals, operation, glass condition)"],
    detail: "The roof is your home's first line of defense against the elements. A new roof costs $8,000-$25,000+ depending on size and material, so understanding its remaining lifespan is critical. The inspector evaluates not just the roofing material but also the flashing, ventilation, gutters, and drainage — all of which affect how long the roof will last.",
    redFlags: [
      { flag: "Missing, curling, or buckled shingles", risk: "Indicates the roof is nearing end of life. Asphalt shingles last 20-30 years. Replacement: $8,000-$15,000 for standard asphalt on a typical home.", severity: "high" },
      { flag: "Multiple layers of roofing", risk: "Most building codes allow only 2 layers. Multiple layers add weight stress and make leak detection difficult. Full tear-off adds $1,000-$3,000 to replacement cost.", severity: "medium" },
      { flag: "Damaged or missing flashing", risk: "Flashing around chimneys, vents, valleys, and wall junctions is where most leaks start. Repair: $200-$500 per area. If ignored, water damage can cost thousands.", severity: "medium" },
      { flag: "Sagging roof deck or ridge line", risk: "May indicate structural issues — water-damaged decking, undersized rafters, or failed trusses. Requires immediate investigation. Repair: $1,000-$10,000+.", severity: "high" },
      { flag: "Inadequate attic ventilation", risk: "Poor ventilation causes heat and moisture buildup that degrades shingles from the inside, voids manufacturer warranties, and promotes mold growth.", severity: "medium" },
      { flag: "Clogged or damaged gutters/downspouts", risk: "Water overflow damages fascia, soffits, siding, and foundation. Proper drainage directs water at least 6 feet from the foundation.", severity: "low" },
    ],
    questions: ["How old is the roof?", "Has the roof ever leaked?", "When were the gutters last cleaned?", "Is there a transferable roof warranty?"],
    cost: "Roof replacement: $8,000-$25,000. Gutter replacement: $1,000-$3,000. Window replacement: $300-$1,000 per window.",
  },
  {
    area: "Plumbing",
    icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636",
    color: "#0a7ea8",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    items: ["Water heater age, condition, and capacity", "Water pressure and flow at all fixtures", "Pipe material (copper, PEX, galvanized, polybutylene)", "Drain function, sewer line condition, signs of leaks"],
    detail: "Plumbing problems can range from a $50 faucet repair to a $25,000+ sewer line replacement. The inspector tests every fixture, checks pipe materials, assesses the water heater, and looks for signs of current or past leaks. The sewer line — which connects your home to the municipal system — is not part of a standard inspection but is one of the most valuable specialty inspections you can add.",
    redFlags: [
      { flag: "Polybutylene (gray) pipes", risk: "Manufactured 1978-1995, these pipes are prone to sudden failure. Many insurance companies won't write policies for homes with polybutylene. Full re-pipe: $4,000-$15,000.", severity: "high" },
      { flag: "Galvanized steel pipes", risk: "Common in pre-1970 homes, they corrode from the inside out, reducing water pressure and eventually leaking. Full re-pipe to copper or PEX: $5,000-$15,000.", severity: "high" },
      { flag: "Water heater over 10 years old", risk: "Average lifespan is 8-12 years. An aging unit may fail without warning, causing flooding. Replacement: $1,200-$3,000 for tank; $3,000-$5,000 for tankless.", severity: "medium" },
      { flag: "Low water pressure throughout", risk: "Could indicate corroded pipes, a failing pressure regulator, or a municipal supply issue. Diagnosis needed before assuming worst case.", severity: "medium" },
      { flag: "Slow drains in multiple fixtures", risk: "May indicate a sewer line blockage, tree root intrusion, or bellied pipe. A sewer camera inspection ($150-$300) reveals the exact problem.", severity: "medium" },
      { flag: "Active leaks or water staining", risk: "Even small leaks cause mold, structural damage, and rot over time. Repair costs vary: $150 for a fixture to $5,000+ for hidden pipe replacement.", severity: "high" },
    ],
    questions: ["What type of pipes does this home have?", "How old is the water heater?", "Has the sewer line ever been scoped or repaired?", "Is the home on a well or septic system?"],
    cost: "Water heater replacement: $1,200-$5,000. Re-pipe: $4,000-$15,000. Sewer line replacement: $5,000-$25,000.",
  },
  {
    area: "Electrical",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    color: "#8b6914",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
    items: ["Panel capacity (100, 150, or 200 amp service)", "Wiring type and condition (knob-and-tube, aluminum, copper)", "GFCI outlets in wet areas (kitchen, bath, garage, exterior)", "Smoke and CO detector placement and function"],
    detail: "Electrical problems are the leading cause of residential fires. The inspector evaluates the main electrical panel (capacity, condition, brand), tests outlets for proper wiring and grounding, checks for GFCI protection in required locations, and identifies any hazardous wiring types. Homes built before 1970 may have obsolete or dangerous wiring that affects safety and insurability.",
    redFlags: [
      { flag: "Federal Pacific (FPE) or Zinsco panels", risk: "These panels have known safety defects — breakers may fail to trip during overloads, creating fire risk. Many electricians recommend complete replacement: $2,000-$4,000.", severity: "high" },
      { flag: "Knob-and-tube wiring", risk: "Pre-1940s wiring without a ground conductor. Not inherently dangerous if undisturbed, but cannot safely carry modern electrical loads. Many insurance companies won't insure or charge premiums. Rewiring: $8,000-$20,000.", severity: "high" },
      { flag: "Aluminum branch wiring (1965-1973)", risk: "Aluminum connections loosen over time and can arc, causing fires. CPSC estimates aluminum-wired homes are 55 times more likely to have fire-hazard conditions. Remediation with COPALUM connectors: $3,000-$8,000.", severity: "high" },
      { flag: "Double-tapped breakers", risk: "Two wires on a single breaker — a common DIY mistake that causes overheating. Fix: $150-$300 per occurrence to add a tandem breaker or sub-panel.", severity: "medium" },
      { flag: "Missing GFCI protection", risk: "Required in wet areas (bathrooms, kitchen, garage, exterior, laundry) since the 1970s-1990s. Adding GFCI outlets: $100-$200 per location.", severity: "low" },
      { flag: "100-amp service in a large home", risk: "Modern homes need 200-amp service to handle A/C, appliances, and electronics. Upgrading: $1,500-$3,000.", severity: "medium" },
    ],
    questions: ["What is the electrical panel brand and capacity?", "Has any electrical work been done? Were permits pulled?", "Is there knob-and-tube or aluminum wiring anywhere?", "When was the panel last inspected or upgraded?"],
    cost: "Panel upgrade: $1,500-$4,000. Full rewire: $8,000-$20,000. GFCI outlets: $100-$200 each.",
  },
  {
    area: "HVAC",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "#943030",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    items: ["Heating system type, age, and condition", "Air conditioning capacity and function", "Ductwork condition and insulation", "Thermostat operation and programmability"],
    detail: "HVAC systems are the most expensive operating systems in a home — and among the most expensive to replace. The inspector evaluates the furnace/heat pump age and condition, tests the air conditioning (if temperature permits), inspects visible ductwork, and checks the thermostat. Average HVAC lifespan is 15-20 years, with replacement costs of $5,000-$12,000+ for a complete system.",
    redFlags: [
      { flag: "System over 15 years old", risk: "HVAC systems older than 15 years are nearing end of life and operate less efficiently. Budget for replacement within 3-5 years: $5,000-$12,000 for a full system (furnace + A/C).", severity: "medium" },
      { flag: "Cracked heat exchanger", risk: "A cracked heat exchanger can leak carbon monoxide — a life-threatening hazard. Repair is often not cost-effective; full furnace replacement: $3,000-$6,000.", severity: "high" },
      { flag: "Refrigerant leaks or low charge", risk: "Reduced cooling capacity and higher energy bills. If using R-22 (Freon), which was phased out in 2020, repairs are extremely expensive. May require A/C replacement: $3,000-$7,000.", severity: "medium" },
      { flag: "Disconnected or damaged ductwork", risk: "Leaky ducts can waste 20-30% of conditioned air, significantly increasing energy costs. Duct sealing: $1,000-$3,000. Full replacement: $3,000-$7,000.", severity: "medium" },
      { flag: "Mismatched components", risk: "A new A/C paired with an old furnace (or vice versa) may be incompatible, reducing efficiency and lifespan. Common in homes with partial HVAC replacements.", severity: "low" },
      { flag: "No maintenance records", risk: "Lack of regular maintenance (annual tune-ups, filter changes) significantly shortens HVAC lifespan and increases breakdown risk.", severity: "low" },
    ],
    questions: ["How old is the HVAC system?", "When was the last professional service?", "Has the heat exchanger been inspected?", "What refrigerant type does the A/C use?"],
    cost: "HVAC tune-up: $100-$200. Furnace replacement: $3,000-$6,000. A/C replacement: $3,000-$7,000. Full system: $5,000-$12,000.",
  },
  {
    area: "Interior",
    icon: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    color: "#5b3a8c",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    items: ["Walls, ceilings, and floors for damage or defects", "Kitchen appliances operation (if included in sale)", "Bathroom fixtures, ventilation, and moisture", "Attic insulation, ventilation, and signs of pests"],
    detail: "The interior inspection covers everything inside the home — walls, ceilings, floors, doors, windows, kitchens, bathrooms, and the attic. While many interior issues are cosmetic, some signal deeper problems: ceiling stains may indicate roof leaks, musty odors suggest mold, and uneven floors point to structural movement. The inspector also checks the attic for insulation depth, ventilation adequacy, and signs of pest intrusion.",
    redFlags: [
      { flag: "Ceiling stains or bubbling paint", risk: "Almost always indicates a current or past water leak — from the roof, plumbing, or condensation. The stain itself is cosmetic, but the underlying cause must be identified and repaired.", severity: "high" },
      { flag: "Musty or moldy odors", risk: "Indicates moisture problems and possible mold. Professional mold testing ($200-$600) identifies the type and concentration. Remediation: $1,500-$9,000 depending on scope.", severity: "high" },
      { flag: "Cracks around windows and doors", risk: "May indicate settling or structural movement — especially if cracks are diagonal or widening. Small hairline cracks are often cosmetic; anything wider than 1/8 inch warrants investigation.", severity: "medium" },
      { flag: "Insufficient attic insulation", risk: "Less than R-38 (about 10-14 inches of fiberglass) means higher energy bills and potential ice dam issues. Adding insulation: $1,500-$3,500.", severity: "low" },
      { flag: "No bathroom exhaust fans", risk: "Without proper ventilation, moisture from showers causes mold growth, paint peeling, and wood rot. Installing an exhaust fan: $200-$400 per bathroom.", severity: "low" },
      { flag: "Signs of pest intrusion in attic", risk: "Droppings, nesting material, chewed wiring, or staining indicate current or past pest activity. Pest inspection and remediation: $200-$2,000 depending on type.", severity: "medium" },
    ],
    questions: ["Are there any known moisture or mold issues?", "Has the attic insulation been upgraded?", "Are all bathroom fans vented to the exterior (not just the attic)?", "Has the home ever had a pest problem?"],
    cost: "Attic insulation: $1,500-$3,500. Mold remediation: $1,500-$9,000. Exhaust fan installation: $200-$400 each.",
  },
];

export default function ExpandableInspectionAreas() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {inspectionAreas.map((area, i) => (
          <button
            key={area.area}
            onClick={() => setSelected(i)}
            className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group text-left cursor-pointer"
          >
            {/* Image background */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${area.image}')` }} />
            <div className="absolute inset-0 bg-gradient-to-t opacity-90 group-hover:opacity-80 transition-opacity" style={{ background: `linear-gradient(to top, ${area.color}ee, ${area.color}cc)` }} />

            <div className="relative p-5 min-h-[180px] flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={area.icon} /></svg>
                </div>
                <h3 className="font-bold text-white text-lg">{area.area}</h3>
              </div>
              <div>
                <ul className="space-y-1 mb-3">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/80">
                      <svg className="w-3 h-3 text-white/60 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-[10px] text-white/50 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Click for red flags, costs & questions to ask</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Full detail modal */}
      {selected !== null && (() => {
        const area = inspectionAreas[selected];
        return (
          <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white bg-black/20 rounded-full z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {/* Header */}
              <div className="relative h-32 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${area.image}')` }} />
                <div className="absolute inset-0 opacity-85" style={{ background: `linear-gradient(to top, ${area.color}, ${area.color}cc)` }} />
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={area.icon} /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{area.area}</h3>
                </div>
              </div>

              <div className="p-6">
                {/* Overview */}
                <p className="text-sm text-alta-gray leading-relaxed mb-6">{area.detail}</p>

                {/* Red flags */}
                <h4 className="text-lg font-bold text-alta-navy mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#943030]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
                  Red Flags & Repair Costs
                </h4>
                <div className="space-y-3 mb-6">
                  {area.redFlags.map((rf) => (
                    <div key={rf.flag} className={`p-3 rounded-xl border ${rf.severity === 'high' ? 'bg-red-50/50 border-red-200' : rf.severity === 'medium' ? 'bg-amber-50/50 border-amber-200' : 'bg-blue-50/50 border-blue-200'}`}>
                      <div className="flex items-start gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${rf.severity === 'high' ? 'bg-[#943030] text-white' : rf.severity === 'medium' ? 'bg-[#8b6914] text-white' : 'bg-[#1a5276] text-white'}`}>
                          {rf.severity}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-alta-navy">{rf.flag}</p>
                          <p className="text-xs text-alta-gray leading-relaxed mt-0.5">{rf.risk}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Questions to ask */}
                <h4 className="text-lg font-bold text-alta-navy mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                  Questions to Ask Your Inspector
                </h4>
                <ul className="space-y-2 mb-6">
                  {area.questions.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm text-alta-gray">
                      <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      {q}
                    </li>
                  ))}
                </ul>

                {/* Cost summary */}
                <div className="p-4 rounded-xl border border-gray-100" style={{ backgroundColor: `${area.color}08` }}>
                  <h4 className="text-sm font-bold text-alta-navy mb-1">Typical Repair Costs</h4>
                  <p className="text-xs text-alta-gray leading-relaxed">{area.cost}</p>
                </div>

                <p className="text-[10px] text-alta-teal mt-4 font-medium">Sources: ASHI, InterNACHI, HomeAdvisor</p>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
