"use client";

import { ExternalLink } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface CountyProgramData {
  programName: string | null;
  registrationUrl: string;
  cost: string;
  method: string;
  phone: string | null;
  notes: string;
  verified?: string;
  noProgram?: boolean;
}

export interface LookupResultVerified {
  type: "verified";
  state: string;
  county: string;
  data: CountyProgramData;
}

export interface LookupResultStatewide {
  type: "statewide";
  data: CountyProgramData;
}

export interface LookupResultNoProgram {
  type: "no-program";
  state: string;
  county: string;
  data: CountyProgramData;
}

export interface LookupResultFallback {
  type: "fallback";
  county: string;
  stateName: string;
  searchUrl: string;
  pfaTry: string;
}

export type LookupResult =
  | LookupResultVerified
  | LookupResultStatewide
  | LookupResultNoProgram
  | LookupResultFallback;

/* ------------------------------------------------------------------ */
/*  US States list                                                     */
/* ------------------------------------------------------------------ */

export const US_STATES = [
  { code: "AL", name: "Alabama" },  { code: "AK", name: "Alaska" },  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },   { code: "KS", name: "Kansas" },  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

/* ------------------------------------------------------------------ */
/*  County database                                                    */
/* ------------------------------------------------------------------ */

export const COUNTY_DATABASE: Record<string, Record<string, CountyProgramData>> = {
  _statewide: {
    VA: {
      programName: "Virginia Deed Alert",
      registrationUrl: "https://risweb.vacourts.gov/VADeedAlert/",
      cost: "Free",
      method: "Email / online portal",
      phone: null,
      notes: "Statewide program covering all Virginia Circuit Courts. Register once to monitor any participating circuit court.",
      verified: "2026-04",
    },
  },
  AZ: {
    "Maricopa County": {
      programName: "Maricopa Title Alert",
      registrationUrl: "https://recorder.maricopa.gov/MaricopaTitleAlert/",
      cost: "Free",
      method: "Email and/or SMS text",
      phone: "602-506-3535",
      notes: "Launched June 2023. Arizona state law now requires every county to offer a similar alert system.",
      verified: "2026-04",
    },
  },
  CA: {
    "Los Angeles County": {
      programName: "Property Owner e-Notification Alert",
      registrationUrl: "https://assessor.lacounty.gov/news-information/enotification",
      cost: "Free",
      method: "Email + mailed paper copy",
      phone: "800-593-8222",
      notes: "Combined program with Assessor, Registrar-Recorder/County Clerk, and DCBA. Email alerts within 48 hours of recording.",
      verified: "2026-04",
    },
  },
  IL: {
    "Cook County": {
      programName: "Cook County Property Fraud Alert",
      registrationUrl: "https://www.cookcountyclerkil.gov/recordings/property-fraud-unit",
      cost: "Free",
      method: "Phone call or email",
      phone: "312-603-4000",
      notes: "Clerk's Office has a dedicated Property Fraud Unit that coordinates investigation with law enforcement.",
      verified: "2026-04",
    },
    "McHenry County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://www.propertyfraudalert.com/",
      cost: "Free",
      method: "Email, text, or phone call",
      phone: "815-334-4110",
      notes: "Participates in the nationwide Property Fraud Alert program.",
      verified: "2026-04",
    },
  },
  TX: {
    "Tarrant County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://www.propertyfraudalert.com/TXTarrant",
      cost: "Free",
      method: "Email or phone call",
      phone: null,
      notes: "Monitors 90+ document types recorded in the County Clerk's office.",
      verified: "2026-04",
    },
    "Dallas County": {
      programName: "Dallas County Property Fraud Alert",
      registrationUrl: "https://www.dallascounty.org/government/county-clerk/recording/property-fraud.php",
      cost: "Free",
      method: "Email or phone call",
      phone: null,
      notes: "Administered by the County Clerk's Recording Division in partnership with Kofile Technologies.",
      verified: "2026-04",
    },
    "El Paso County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://www.propertyfraudalert.com/TXElPaso",
      cost: "Free",
      method: "Email, text, or phone call",
      phone: null,
      notes: "Participates in the nationwide Property Fraud Alert program.",
      verified: "2026-04",
    },
    "Harris County": {
      programName: null,
      registrationUrl: "https://www.cclerk.hctx.net/applications/websearch/RP.aspx",
      cost: "Manual check only",
      method: "Self-service search (no automated alerts)",
      phone: "713-755-6405",
      notes: "Harris County does not currently offer a free automated alert system. You can search the Real Property Records portal manually. Contact your state legislators to request a statewide alert program.",
      verified: "2026-04",
      noProgram: true,
    },
  },
  MO: {
    "St. Louis County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://stlouiscountymo.gov/st-louis-county-departments/revenue/recorder-of-deeds/property-fraud-alert/",
      cost: "Free",
      method: "Email, text, or phone call",
      phone: null,
      notes: "St. Louis County Recorder of Deeds participates in the nationwide Property Fraud Alert program.",
      verified: "2026-04",
    },
  },
  NJ: {
    "Burlington County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://www.propertyfraudalert.com/NJBurlington",
      cost: "Free",
      method: "Email, text, or phone call",
      phone: "609-265-5122",
      notes: "Administered by the Burlington County Clerk's Office.",
      verified: "2026-04",
    },
  },
  OH: {
    "Miami County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://www.miamicountyohio.gov/980/Property-Fraud-Alert",
      cost: "Free",
      method: "Email, text, or phone call",
      phone: null,
      notes: "Participates in the nationwide Property Fraud Alert program.",
      verified: "2026-04",
    },
  },
  FL: {
    "Sumter County": {
      programName: "Property Fraud Alert",
      registrationUrl: "https://www.sumterclerk.com/property-fraud-alert",
      cost: "Free",
      method: "Email, text, or phone call",
      phone: null,
      notes: "Florida Clerks statewide offer Property Fraud Alert -- check your specific county clerk.",
      verified: "2026-04",
    },
  },
  GA: {
    _stateNote: {
      programName: "Filing Activity Notification System (FANS)",
      registrationUrl: "https://fans.gsccca.org/",
      cost: "Free",
      method: "Email",
      phone: null,
      notes: "Georgia statewide system operated by the Georgia Superior Court Clerks' Cooperative Authority. Covers all Georgia counties.",
      verified: "2026-04",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Helper: get available counties for a selected state                */
/* ------------------------------------------------------------------ */

export function getAvailableCounties(stateCode: string): string[] {
  const stateData = COUNTY_DATABASE[stateCode];
  if (!stateData) return [];
  return Object.keys(stateData).filter((k) => k !== "_stateNote");
}

/* ------------------------------------------------------------------ */
/*  Helper: perform lookup                                             */
/* ------------------------------------------------------------------ */

export function performLookup(
  selectedState: string,
  selectedCounty: string,
  customCounty: string
): LookupResult | null {
  if (!selectedState) return null;

  const county = selectedCounty || customCounty.trim();
  const stateName = US_STATES.find((s) => s.code === selectedState)?.name ?? selectedState;

  // Check statewide programs
  const statewide = (COUNTY_DATABASE._statewide as Record<string, CountyProgramData>)[selectedState];
  if (statewide) {
    return { type: "statewide", data: statewide };
  }

  // Check Georgia-style _stateNote
  const stateData = COUNTY_DATABASE[selectedState];
  if (stateData?._stateNote) {
    return { type: "statewide", data: stateData._stateNote };
  }

  // Check county-specific verified data
  if (county && stateData?.[county]) {
    const data = stateData[county];
    if (data.noProgram) {
      return { type: "no-program", state: stateName, county, data };
    }
    return { type: "verified", state: stateName, county, data };
  }

  // Fallback
  const countyName = county || `[your county]`;
  const searchQuery = encodeURIComponent(`${countyName} ${stateName} recorder property fraud alert`);
  return {
    type: "fallback",
    county: countyName,
    stateName,
    searchUrl: `https://www.google.com/search?q=${searchQuery}`,
    pfaTry: "https://www.propertyfraudalert.com/",
  };
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DetailRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex gap-3 py-1">
      <span className="font-semibold text-alta-gray min-w-[100px]">{label}:</span>
      <span className={muted ? "text-gray-400 italic" : "text-gray-800"}>{value}</span>
    </div>
  );
}

function ResultDetails({ data }: { data: CountyProgramData }) {
  return (
    <div className="bg-gray-50 p-3.5 rounded-lg mb-3.5 text-[13px]">
      <DetailRow label="Cost" value={data.cost} />
      <DetailRow label="Notification" value={data.method} />
      {data.phone && <DetailRow label="Phone" value={data.phone} />}
      {data.verified && <DetailRow label="Last verified" value={data.verified} muted />}
    </div>
  );
}

function RegisterButton({ url, label = "Register Now" }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-alta-navy text-white px-5 py-2.5 rounded text-sm font-semibold uppercase tracking-wide hover:bg-alta-navy/90 transition-colors"
    >
      {label} <ExternalLink size={14} />
    </a>
  );
}

function ResultCard({
  borderColor,
  label,
  children,
}: {
  borderColor: "green" | "red" | "amber";
  label: string;
  children: React.ReactNode;
}) {
  const colorMap = {
    green: { border: "border-alta-green", leftBorder: "border-l-alta-green", badge: "bg-alta-green" },
    red:   { border: "border-alta-red",   leftBorder: "border-l-alta-red",   badge: "bg-alta-red" },
    amber: { border: "border-alta-gold",  leftBorder: "border-l-alta-gold",  badge: "bg-alta-gold" },
  };
  const c = colorMap[borderColor];

  return (
    <div className={`border ${c.border} border-l-[5px] ${c.leftBorder} rounded bg-white p-5`}>
      <div className={`inline-block ${c.badge} text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide mb-3`}>
        {label}
      </div>
      {children}
    </div>
  );
}

function LookupResultDisplay({ result }: { result: LookupResult }) {
  if (result.type === "statewide") {
    return (
      <ResultCard borderColor="green" label="Statewide Program Available">
        <h3 className="text-lg font-semibold text-alta-navy mb-1">{result.data.programName}</h3>
        <p className="text-sm text-gray-600 mb-3.5">{result.data.notes}</p>
        <ResultDetails data={result.data} />
        <RegisterButton url={result.data.registrationUrl} />
      </ResultCard>
    );
  }

  if (result.type === "verified") {
    return (
      <ResultCard borderColor="green" label="Free Program Verified">
        <h3 className="text-lg font-semibold text-alta-navy mb-1">{result.data.programName}</h3>
        <div className="text-sm text-gray-500 mb-2.5">
          {result.county}, {result.state}
        </div>
        {result.data.notes && (
          <p className="text-sm text-gray-600 mb-3.5">{result.data.notes}</p>
        )}
        <ResultDetails data={result.data} />
        <RegisterButton url={result.data.registrationUrl} />
      </ResultCard>
    );
  }

  if (result.type === "no-program") {
    return (
      <ResultCard borderColor="red" label="No Free Alert Program Yet">
        <h3 className="text-lg font-semibold text-alta-navy mb-1">
          {result.county}, {result.state}
        </h3>
        <p className="text-sm text-gray-600 mb-3.5">{result.data.notes}</p>
        <ResultDetails data={result.data} />
        <RegisterButton url={result.data.registrationUrl} label="Search Records Manually" />
      </ResultCard>
    );
  }

  // Fallback
  return (
    <ResultCard borderColor="amber" label="County Not in Verified Database">
      <h3 className="text-lg font-semibold text-alta-navy mb-1">
        {result.county}, {result.stateName}
      </h3>
      <p className="text-sm text-gray-600 mb-3.5">
        This county isn&apos;t in our verified database yet. Here&apos;s how to find out if they offer a free alert program:
      </p>

      <div className="bg-gray-50 p-3.5 rounded mb-3.5">
        <div className="text-[13px] font-semibold text-alta-navy mb-2">Step 1: Search the web</div>
        <a
          href={result.searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-alta-teal hover:underline inline-flex items-center gap-1"
        >
          Search: &quot;{result.county} recorder property fraud alert&quot; <ExternalLink size={12} />
        </a>
      </div>

      <div className="bg-gray-50 p-3.5 rounded mb-3.5">
        <div className="text-[13px] font-semibold text-alta-navy mb-2">
          Step 2: Try the nationwide Property Fraud Alert service
        </div>
        <a
          href={result.pfaTry}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-alta-teal hover:underline inline-flex items-center gap-1"
        >
          Check propertyfraudalert.com for your county <ExternalLink size={12} />
        </a>
      </div>

      <div className="bg-gray-50 p-3.5 rounded">
        <div className="text-[13px] font-semibold text-alta-navy mb-2">
          Step 3: Call your recorder&apos;s office directly
        </div>
        <div className="text-[13px] text-gray-600">
          Ask: <em>&quot;Does your office offer a free property fraud alert or recorder notification service?&quot;</em>{" "}
          If not, ask whether they can recommend a trusted option, and consider contacting your state legislators to request one.
        </div>
      </div>
    </ResultCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface CountyLookupProps {
  selectedState: string;
  setSelectedState: (v: string) => void;
  selectedCounty: string;
  setSelectedCounty: (v: string) => void;
  customCounty: string;
  setCustomCounty: (v: string) => void;
  lookupResult: LookupResult | null;
  handleLookup: () => void;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CountyLookup({
  selectedState,
  setSelectedState,
  selectedCounty,
  setSelectedCounty,
  customCounty,
  setCustomCounty,
  lookupResult,
  handleLookup,
}: CountyLookupProps) {
  const availableCounties = getAvailableCounties(selectedState);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-7 mt-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1.5">
        <svg className="w-5 h-5 text-alta-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h2 className="font-serif text-[22px] font-medium text-alta-navy">
          Find Your County&apos;s Fraud Alert Program
        </h2>
      </div>
      <p className="text-sm text-alta-gray mb-5">
        Select your state and county to find the free property fraud alert program in your area.
      </p>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
        <div>
          <label className="block text-xs font-semibold text-alta-navy mb-1.5 tracking-wide uppercase">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCounty("");
              setCustomCounty("");
            }}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded bg-white text-gray-800 cursor-pointer focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/20"
          >
            <option value="">Select a state...</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-alta-navy mb-1.5 tracking-wide uppercase">
            County
          </label>
          {availableCounties.length > 0 ? (
            <select
              value={selectedCounty}
              onChange={(e) => {
                setSelectedCounty(e.target.value);
              }}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded bg-white text-gray-800 cursor-pointer focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/20"
            >
              <option value="">Select or type below...</option>
              {availableCounties.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={customCounty}
              onChange={(e) => {
                setCustomCounty(e.target.value);
              }}
              placeholder={selectedState ? "e.g., King County" : "Select state first..."}
              disabled={!selectedState}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/20"
            />
          )}
        </div>
      </div>

      {/* Extra text input when counties exist but user wants another */}
      {availableCounties.length > 0 && (
        <input
          type="text"
          value={customCounty}
          onChange={(e) => {
            setCustomCounty(e.target.value);
            setSelectedCounty("");
          }}
          placeholder="...or type another county not listed above"
          className="w-full px-3 py-2.5 text-[13px] border border-gray-300 rounded mb-3.5 focus:border-alta-teal focus:ring-2 focus:ring-alta-teal/20"
        />
      )}

      {/* Lookup button */}
      <button
        onClick={handleLookup}
        disabled={!selectedState}
        className="bg-alta-navy text-white px-7 py-3 text-sm font-semibold uppercase tracking-wide rounded transition-colors hover:bg-alta-navy/90 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Find My Program
      </button>

      {/* Results */}
      {lookupResult && (
        <div className="mt-5 border-t border-gray-200 pt-5">
          <LookupResultDisplay result={lookupResult} />
        </div>
      )}
    </div>
  );
}
