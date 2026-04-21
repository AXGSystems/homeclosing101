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
  suffix: string;
  blurb: string;
}

const demoTemplates: Template[] = [
  {
    suffix: "Premier Title & Escrow",
    blurb: "Full-service residential closings with 48-hour title commitments and cyber-verified wire transfers.",
  },
  {
    suffix: "Heritage Title Services",
    blurb: "Family-owned ALTA member with four decades of local market expertise and ALTA Best Practices certification.",
  },
  {
    suffix: "Closing Partners Group",
    blurb: "Tech-forward settlement agency offering Remote Online Notarization (RON) and hybrid closings statewide.",
  },
];

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function getStatePartners(stateCode: string, stateName: string): StatePartner[] {
  const cities = cityByState[stateCode] || ["Capital City", "Metro Area", "Downtown"];
  return demoTemplates.map((t, i) => {
    const city = cities[i] || cities[0];
    const combined = `${stateName} ${t.suffix}`;
    return {
      id: `${stateCode}-${i}`,
      name: combined,
      city,
      blurb: t.blurb,
      phone: "(555) 000-0000",
      website: `https://example.com/${slug(combined)}`,
      isDemo: true,
    };
  });
}
