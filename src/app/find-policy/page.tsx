"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { stateInsuranceData, callingScript } from "@/data/stateInsurance";
import { stateFlags } from "@/data/stateFlags";

// State colors inspired by state flags/identity
const stateColors: Record<string, { bg: string; accent: string; text: string }> = {
  AL: { bg: "from-red-600 to-red-700", accent: "#b91c1c", text: "Yellowhammer State" },
  AK: { bg: "from-blue-800 to-blue-900", accent: "#1e3a5f", text: "The Last Frontier" },
  AZ: { bg: "from-amber-600 to-red-700", accent: "#c2410c", text: "Grand Canyon State" },
  AR: { bg: "from-red-700 to-blue-800", accent: "#991b1b", text: "The Natural State" },
  CA: { bg: "from-blue-600 to-amber-600", accent: "#2563eb", text: "Golden State" },
  CO: { bg: "from-blue-700 to-red-600", accent: "#1d4ed8", text: "Centennial State" },
  CT: { bg: "from-blue-800 to-blue-900", accent: "#1e3a5f", text: "Constitution State" },
  DE: { bg: "from-blue-700 to-amber-500", accent: "#1d4ed8", text: "First State" },
  DC: { bg: "from-red-600 to-gray-700", accent: "#b91c1c", text: "Nation's Capital" },
  FL: { bg: "from-orange-500 to-blue-600", accent: "#ea580c", text: "Sunshine State" },
  GA: { bg: "from-red-700 to-blue-800", accent: "#b91c1c", text: "Peach State" },
  HI: { bg: "from-blue-600 to-red-500", accent: "#2563eb", text: "Aloha State" },
  ID: { bg: "from-blue-700 to-blue-800", accent: "#1d4ed8", text: "Gem State" },
  IL: { bg: "from-blue-700 to-red-600", accent: "#1d4ed8", text: "Prairie State" },
  IN: { bg: "from-blue-800 to-amber-500", accent: "#1e3a5f", text: "Hoosier State" },
  IA: { bg: "from-red-600 to-blue-700", accent: "#b91c1c", text: "Hawkeye State" },
  KS: { bg: "from-blue-700 to-amber-600", accent: "#1d4ed8", text: "Sunflower State" },
  KY: { bg: "from-blue-800 to-blue-900", accent: "#1e3a5f", text: "Bluegrass State" },
  LA: { bg: "from-blue-700 to-amber-500", accent: "#1d4ed8", text: "Pelican State" },
  ME: { bg: "from-blue-800 to-amber-600", accent: "#1e3a5f", text: "Pine Tree State" },
  MD: { bg: "from-red-700 to-amber-500", accent: "#b91c1c", text: "Old Line State" },
  MA: { bg: "from-blue-800 to-amber-500", accent: "#1e3a5f", text: "Bay State" },
  MI: { bg: "from-blue-800 to-blue-900", accent: "#1e3a5f", text: "Great Lakes State" },
  MN: { bg: "from-blue-700 to-blue-800", accent: "#1d4ed8", text: "North Star State" },
  MS: { bg: "from-red-700 to-blue-800", accent: "#b91c1c", text: "Magnolia State" },
  MO: { bg: "from-red-600 to-blue-700", accent: "#b91c1c", text: "Show-Me State" },
  MT: { bg: "from-blue-800 to-amber-600", accent: "#1e3a5f", text: "Treasure State" },
  NE: { bg: "from-blue-800 to-amber-500", accent: "#1e3a5f", text: "Cornhusker State" },
  NV: { bg: "from-blue-800 to-gray-600", accent: "#1e3a5f", text: "Silver State" },
  NH: { bg: "from-blue-800 to-blue-900", accent: "#1e3a5f", text: "Granite State" },
  NJ: { bg: "from-amber-600 to-blue-700", accent: "#d97706", text: "Garden State" },
  NM: { bg: "from-amber-500 to-red-600", accent: "#d97706", text: "Land of Enchantment" },
  NY: { bg: "from-blue-800 to-amber-500", accent: "#1e3a5f", text: "Empire State" },
  NC: { bg: "from-red-600 to-blue-700", accent: "#b91c1c", text: "Tar Heel State" },
  ND: { bg: "from-blue-700 to-amber-500", accent: "#1d4ed8", text: "Peace Garden State" },
  OH: { bg: "from-red-600 to-blue-700", accent: "#b91c1c", text: "Buckeye State" },
  OK: { bg: "from-blue-600 to-blue-700", accent: "#2563eb", text: "Sooner State" },
  OR: { bg: "from-blue-800 to-amber-600", accent: "#1e3a5f", text: "Beaver State" },
  PA: { bg: "from-blue-800 to-amber-500", accent: "#1e3a5f", text: "Keystone State" },
  RI: { bg: "from-blue-700 to-amber-500", accent: "#1d4ed8", text: "Ocean State" },
  SC: { bg: "from-blue-700 to-blue-800", accent: "#1d4ed8", text: "Palmetto State" },
  SD: { bg: "from-blue-700 to-blue-800", accent: "#1d4ed8", text: "Mount Rushmore State" },
  TN: { bg: "from-red-600 to-blue-700", accent: "#b91c1c", text: "Volunteer State" },
  TX: { bg: "from-blue-800 to-red-600", accent: "#1e3a5f", text: "Lone Star State" },
  UT: { bg: "from-blue-700 to-amber-500", accent: "#1d4ed8", text: "Beehive State" },
  VT: { bg: "from-blue-800 to-green-700", accent: "#1e3a5f", text: "Green Mountain State" },
  VA: { bg: "from-blue-800 to-blue-900", accent: "#1e3a5f", text: "Old Dominion" },
  WA: { bg: "from-green-700 to-blue-700", accent: "#15803d", text: "Evergreen State" },
  WV: { bg: "from-blue-700 to-amber-500", accent: "#1d4ed8", text: "Mountain State" },
  WI: { bg: "from-blue-800 to-red-600", accent: "#1e3a5f", text: "Badger State" },
  WY: { bg: "from-blue-700 to-red-600", accent: "#1d4ed8", text: "Cowboy State" },
};

const stateCoords: Record<string, { x: number; y: number }> = {
  WA:{x:12.5,y:7},OR:{x:10,y:14},CA:{x:7,y:30},NV:{x:12,y:25},ID:{x:17,y:13},
  MT:{x:22,y:7},WY:{x:24,y:16},UT:{x:16,y:25},CO:{x:24,y:26},AZ:{x:15,y:35},
  NM:{x:22,y:36},ND:{x:33,y:7},SD:{x:33,y:14},NE:{x:33,y:21},KS:{x:33,y:28},
  OK:{x:33,y:34},TX:{x:30,y:42},MN:{x:40,y:8},IA:{x:40,y:18},MO:{x:42,y:27},
  AR:{x:42,y:35},LA:{x:42,y:43},WI:{x:47,y:10},IL:{x:48,y:22},MS:{x:48,y:38},
  MI:{x:55,y:12},IN:{x:54,y:22},AL:{x:54,y:37},OH:{x:60,y:20},KY:{x:58,y:28},
  TN:{x:55,y:32},GA:{x:60,y:38},FL:{x:63,y:47},WV:{x:63,y:26},VA:{x:68,y:28},
  NC:{x:68,y:33},SC:{x:66,y:37},PA:{x:68,y:18},NY:{x:72,y:12},NJ:{x:75,y:20},
  DE:{x:76,y:24},MD:{x:73,y:25},DC:{x:71,y:27},CT:{x:79,y:14},RI:{x:81,y:15},
  MA:{x:80,y:12},VT:{x:76,y:7},NH:{x:78,y:8},ME:{x:82,y:4},
  AK:{x:8,y:50},HI:{x:22,y:52},
};

export default function FindPolicyPage() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showScript, setShowScript] = useState(false);

  const filtered = stateInsuranceData.filter((s) =>
    s.state.toLowerCase().includes(search.toLowerCase()) ||
    s.abbr.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDept = selectedState
    ? stateInsuranceData.find((s) => s.abbr === selectedState)
    : null;

  const colors = selectedState ? stateColors[selectedState] : null;

  return (
    <>
      <PageHero
        title="Find My Title Policy"
        subtitle="Locate your existing title insurance policy or contact your state's insurance department for help."
        image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
        breadcrumb={[{ label: "Find My Policy", href: "/find-policy" }]}
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page intro */}
          <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">3 Ways to Locate Your Policy</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Your owner&apos;s title insurance policy was issued at closing and protects you for as long as you own the property. Follow the steps below, use the interactive state map to find your insurance department, or use our sample calling script to get exactly what you need.</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { step: "1", title: "Check Closing Documents", desc: "Look for \"Owner's Title Insurance Policy\" in your closing packet.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
              { step: "2", title: "Contact Your Settlement Agent", desc: "The title company or attorney who handled your closing can provide a copy.", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80" },
              { step: "3", title: "Call Your State Insurance Dept.", desc: "Use the interactive map below to find your state's contact info.", image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&q=80" },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <div className="relative h-28">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${s.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-alta-teal text-white flex items-center justify-center font-bold text-sm shadow">{s.step}</div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-alta-navy text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-alta-gray">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-alta-navy mb-4">Click Your State</h2>
            <div className="relative w-full" style={{ paddingBottom: "60%" }}>
              <svg viewBox="0 0 95 58" className="absolute inset-0 w-full h-full">
                {stateInsuranceData.map((dept) => {
                  const coords = stateCoords[dept.abbr];
                  if (!coords) return null;
                  const isSelected = selectedState === dept.abbr;
                  const sc = stateColors[dept.abbr];
                  return (
                    <g key={dept.abbr} onClick={() => setSelectedState(dept.abbr)} className="cursor-pointer">
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected ? 2.8 : 2}
                        fill={isSelected ? (sc?.accent || "#c0392b") : "#0a8ebc"}
                        stroke={isSelected ? "#ffffff" : "#077a9e"}
                        strokeWidth={isSelected ? 0.5 : 0.3}
                        className="hover:fill-[#d4a843] transition-colors"
                      />
                      <text
                        x={coords.x}
                        y={coords.y + 0.4}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white font-bold pointer-events-none select-none"
                        style={{ fontSize: "1.6px" }}
                      >
                        {dept.abbr}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected state detail — with real flag */}
            {selectedDept && colors && (() => {
              const sf = stateFlags[selectedDept.abbr];
              const primary = sf?.colors[0] || '#002868';
              const secondary = sf?.colors[1] || '#ce1126';
              return (
              <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                {/* State header with flag */}
                <div className="flex items-stretch" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                  {/* Flag */}
                  <div className="w-28 sm:w-36 shrink-0 bg-white flex items-center justify-center p-3 border-r border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sf?.flag || ""} alt={`Flag of ${selectedDept.state}`} className="w-full h-auto max-h-16 object-contain" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 px-5 py-4 text-white min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">{sf?.nickname || ''}</p>
                    <h3 className="text-xl sm:text-2xl font-bold truncate">{selectedDept.state}</h3>
                    <p className="text-xs text-white/70 mt-0.5">{selectedDept.department}</p>
                  </div>
                  {/* Stats */}
                  <div className="hidden sm:flex flex-col items-center justify-center px-5 border-l border-white/20">
                    <p className="text-xl font-bold text-white">{sf?.population || '—'}</p>
                    <p className="text-[9px] text-white/60 uppercase tracking-wider">Population</p>
                  </div>
                </div>
                {/* Details */}
                <div className="bg-white p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="w-4 h-4 text-alta-gray shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    <p className="text-sm text-alta-gray">{selectedDept.address}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${selectedDept.phone}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-alta-teal text-white rounded-lg font-semibold text-sm hover:bg-alta-teal-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Call {selectedDept.phone}
                    </a>
                    <a href={selectedDept.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-alta-teal text-alta-teal rounded-lg font-semibold text-sm hover:bg-alta-teal hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      Visit Website
                    </a>
                    <a href={`/find-company?state=${selectedDept.abbr}`} className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-alta-navy text-alta-navy rounded-lg font-semibold text-sm hover:bg-alta-navy hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      Find Companies in {selectedDept.abbr}
                    </a>
                  </div>
                </div>
              </div>
              );
            })()}
          </div>

          {/* Calling Script */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <button
              onClick={() => setShowScript(!showScript)}
              className="w-full flex items-center justify-between p-5 hover:bg-alta-light/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="font-semibold text-alta-navy">What to Say When You Call (Sample Script)</span>
              </div>
              <svg className={`w-5 h-5 text-alta-gray transition-transform ${showScript ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showScript && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <pre className="mt-4 p-4 bg-alta-light rounded-lg text-sm text-alta-navy whitespace-pre-wrap font-sans leading-relaxed">
                  {callingScript}
                </pre>
                <button
                  onClick={() => { navigator.clipboard.writeText(callingScript); }}
                  className="mt-3 text-xs font-medium text-alta-teal hover:text-alta-teal-dark inline-flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy to clipboard
                </button>
              </div>
            )}
          </div>

          {/* Searchable Directory */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-alta-navy mb-2">Full State Insurance Directory</h2>
              <p className="text-xs text-alta-gray mb-3">Verified via the Insurance Information Institute (I.I.I.) and NAIC, updated February 2026.</p>
              <input
                type="text"
                placeholder="Search by state name or abbreviation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {filtered.map((dept) => {
                const sc = stateColors[dept.abbr];
                return (
                  <button
                    key={dept.abbr}
                    onClick={() => { setSelectedState(dept.abbr); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                    className="w-full text-left p-3 border-b border-gray-50 hover:bg-alta-light/50 transition-colors last:border-0 flex items-center gap-3 group"
                  >
                    {/* Flag thumbnail */}
                    <div className="w-12 h-8 rounded overflow-hidden border border-gray-200 shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stateFlags[dept.abbr]?.flag || ""}
                        alt={`${dept.state} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-alta-navy text-sm group-hover:text-alta-teal transition-colors">{dept.state}</h3>
                      <p className="text-xs text-alta-gray truncate">{dept.department}</p>
                    </div>
                    <div className="text-right shrink-0 hidden sm:block">
                      <p className="text-xs font-semibold text-alta-teal">{dept.phone}</p>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-8 text-center text-sm text-alta-gray">No states match your search.</div>
              )}
            </div>
          </div>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 mb-4">
            <p className="text-sm text-alta-gray">
              <strong className="text-alta-navy">Note:</strong> ALTA does not issue title insurance policies or have access to policies that have been issued. Directory data sourced from the I.I.I. and NAIC, verified as of February 2026.
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-alta-gray">
              <strong className="text-alta-navy">Disclaimer:</strong> We recommend confirming contact details via your state&apos;s official .gov website before calling.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
