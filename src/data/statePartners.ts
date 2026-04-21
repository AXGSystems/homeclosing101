/**
 * Demo state-based title company partners used to populate the
 * find-a-title-company sidebar with in-state prospects. All entries
 * are fictional placeholders marked isDemo:true — real member data
 * will replace these once the membership directory lands.
 */

export interface StatePartner {
  id: string;
  name: string;
  city: string;
  blurb: string;
  phone: string;
  website: string;
  isDemo: boolean;
}

const cityByState: Record<string, string[]> = {
  AL: ["Birmingham", "Montgomery", "Huntsville"],
  AK: ["Anchorage", "Fairbanks", "Juneau"],
  AZ: ["Phoenix", "Tucson", "Scottsdale"],
  AR: ["Little Rock", "Fayetteville", "Fort Smith"],
  CA: ["Los Angeles", "San Francisco", "San Diego"],
  CO: ["Denver", "Colorado Springs", "Boulder"],
  CT: ["Hartford", "New Haven", "Stamford"],
  DE: ["Wilmington", "Dover", "Newark"],
  DC: ["Washington", "Georgetown", "Capitol Hill"],
  FL: ["Miami", "Orlando", "Tampa"],
  GA: ["Atlanta", "Savannah", "Augusta"],
  HI: ["Honolulu", "Hilo", "Kailua"],
  ID: ["Boise", "Meridian", "Idaho Falls"],
  IL: ["Chicago", "Naperville", "Springfield"],
  IN: ["Indianapolis", "Fort Wayne", "Evansville"],
  IA: ["Des Moines", "Cedar Rapids", "Davenport"],
  KS: ["Wichita", "Overland Park", "Topeka"],
  KY: ["Louisville", "Lexington", "Bowling Green"],
  LA: ["New Orleans", "Baton Rouge", "Shreveport"],
  ME: ["Portland", "Augusta", "Bangor"],
  MD: ["Baltimore", "Annapolis", "Rockville"],
  MA: ["Boston", "Cambridge", "Worcester"],
  MI: ["Detroit", "Grand Rapids", "Ann Arbor"],
  MN: ["Minneapolis", "St. Paul", "Rochester"],
  MS: ["Jackson", "Gulfport", "Biloxi"],
  MO: ["Kansas City", "St. Louis", "Springfield"],
  MT: ["Billings", "Missoula", "Bozeman"],
  NE: ["Omaha", "Lincoln", "Bellevue"],
  NV: ["Las Vegas", "Reno", "Henderson"],
  NH: ["Manchester", "Nashua", "Concord"],
  NJ: ["Newark", "Jersey City", "Princeton"],
  NM: ["Albuquerque", "Santa Fe", "Las Cruces"],
  NY: ["New York", "Buffalo", "Rochester"],
  NC: ["Charlotte", "Raleigh", "Greensboro"],
  ND: ["Fargo", "Bismarck", "Grand Forks"],
  OH: ["Columbus", "Cleveland", "Cincinnati"],
  OK: ["Oklahoma City", "Tulsa", "Norman"],
  OR: ["Portland", "Salem", "Eugene"],
  PA: ["Philadelphia", "Pittsburgh", "Harrisburg"],
  RI: ["Providence", "Warwick", "Cranston"],
  SC: ["Charleston", "Columbia", "Greenville"],
  SD: ["Sioux Falls", "Rapid City", "Aberdeen"],
  TN: ["Nashville", "Memphis", "Knoxville"],
  TX: ["Houston", "Dallas", "Austin"],
  UT: ["Salt Lake City", "Provo", "Park City"],
  VT: ["Burlington", "Montpelier", "Rutland"],
  VA: ["Richmond", "Virginia Beach", "Arlington"],
  WA: ["Seattle", "Spokane", "Tacoma"],
  WV: ["Charleston", "Huntington", "Morgantown"],
  WI: ["Milwaukee", "Madison", "Green Bay"],
  WY: ["Cheyenne", "Casper", "Jackson"],
};

interface Template {
  format: string; // use {state} as a placeholder for the state name
  blurb: string;
}

const demoTemplates: Template[] = [
  {
    format: "{state} Premier Title Company",
    blurb: "Full-service residential closings with 48-hour title commitments and a dedicated closing coordinator assigned to every file.",
  },
  {
    format: "Heritage Land Title of {state}",
    blurb: "Family-owned ALTA member with four decades of local market expertise and independent abstract examiners on staff.",
  },
  {
    format: "{state} Settlement Services",
    blurb: "Concierge closing experience for residential, commercial, and new-construction transactions across the state.",
  },
  {
    format: "Continental Title Agency — {state}",
    blurb: "Licensed in 17 states with streamlined escrow, wire verification, and multi-state refinance capability.",
  },
  {
    format: "Metropolitan Abstract & Title of {state}",
    blurb: "Specialty title research and curative work for complex transactions — probate, foreclosure, and boundary disputes.",
  },
  {
    format: "{state} Guaranty Title Trust",
    blurb: "Large-account closings, commercial lending, and escrow trust services with SOC 2 Type II cyber controls.",
  },
  {
    format: "Cornerstone Title of {state}",
    blurb: "Veteran-owned settlement agency specializing in first-time buyer and VA loan transactions statewide.",
  },
  {
    format: "{state} National Title Group",
    blurb: "Regional underwriter with attorney-led closings and same-week title commitment turnaround.",
  },
  {
    format: "Bluebonnet Title &amp; Abstract",
    blurb: "Boutique closing firm delivering white-glove service for luxury and relocation transactions.",
  },
];

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getStatePartners(stateCode: string, stateName: string): StatePartner[] {
  const cities = cityByState[stateCode] || ["Capital City", "Metro Area", "Downtown"];
  const offset = hash(stateCode) % demoTemplates.length;
  const selected: Template[] = [0, 1, 2].map((i) => demoTemplates[(offset + i) % demoTemplates.length]);
  return selected.map((t, i) => {
    const city = cities[i] || cities[0];
    const name = t.format.replace("{state}", stateName);
    return {
      id: `${stateCode}-${i}`,
      name,
      city,
      blurb: t.blurb,
      phone: "(555) 000-0000",
      website: `https://example.com/${slug(name)}`,
      isDemo: true,
    };
  });
}
