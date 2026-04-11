export interface TitleCompany {
  name: string;
  address: string;
  city: string;
  state: string;
  stateAbbr: string;
  zip: string;
  phone: string;
  altaMember: boolean;
  services: string[];
}

// Sample directory data — representative companies across all 50 states
// In production this would be backed by the ALTA membership API
export const titleCompanies: TitleCompany[] = [
  // Alabama
  { name: "Old Republic National Title Insurance Co.", address: "2 N. Jackson St, Suite 600", city: "Montgomery", state: "Alabama", stateAbbr: "AL", zip: "36104", phone: "334-834-9555", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "First American Title Insurance Co.", address: "3535 Grandview Pkwy, Suite 200", city: "Birmingham", state: "Alabama", stateAbbr: "AL", zip: "35243", phone: "205-969-4600", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // Alaska
  { name: "Fidelity National Title Agency of Alaska", address: "3000 A St, Suite 100", city: "Anchorage", state: "Alaska", stateAbbr: "AK", zip: "99503", phone: "907-562-1270", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },

  // Arizona
  { name: "Fidelity National Title Agency", address: "2425 E Camelback Rd, Suite 100", city: "Phoenix", state: "Arizona", stateAbbr: "AZ", zip: "85016", phone: "602-567-8100", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },
  { name: "Stewart Title & Trust of Tucson", address: "5285 E Williams Cir, Suite 1000", city: "Tucson", state: "Arizona", stateAbbr: "AZ", zip: "85711", phone: "520-745-8900", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // California
  { name: "First American Title Insurance Co.", address: "1 First American Way", city: "Santa Ana", state: "California", stateAbbr: "CA", zip: "92707", phone: "714-250-3000", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },
  { name: "Chicago Title Company", address: "725 S Figueroa St, Suite 200", city: "Los Angeles", state: "California", stateAbbr: "CA", zip: "90017", phone: "213-488-4300", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },
  { name: "Stewart Title of California", address: "2121 N California Blvd, Suite 400", city: "Walnut Creek", state: "California", stateAbbr: "CA", zip: "94596", phone: "925-934-7700", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "WFG National Title Insurance Co.", address: "12909 Alcosta Blvd, Suite 150", city: "San Ramon", state: "California", stateAbbr: "CA", zip: "94583", phone: "925-901-1000", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // Colorado
  { name: "Land Title Guarantee Company", address: "3033 E 1st Ave, Suite 600", city: "Denver", state: "Colorado", stateAbbr: "CO", zip: "80206", phone: "303-321-1880", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },
  { name: "First American Title Insurance Co.", address: "1125 17th St, Suite 1000", city: "Denver", state: "Colorado", stateAbbr: "CO", zip: "80202", phone: "303-294-4100", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Connecticut
  { name: "CATIC Title Insurance Company", address: "101 Corporate Pl", city: "Rocky Hill", state: "Connecticut", stateAbbr: "CT", zip: "06067", phone: "860-257-0606", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Delaware
  { name: "Delmarva Settlement Group", address: "28366 Lewes Georgetown Hwy", city: "Milton", state: "Delaware", stateAbbr: "DE", zip: "19968", phone: "302-684-8448", altaMember: true, services: ["Settlement Services", "Title Insurance"] },

  // Florida
  { name: "Old Republic National Title Insurance Co.", address: "400 Second Ave S", city: "St. Petersburg", state: "Florida", stateAbbr: "FL", zip: "33701", phone: "813-222-2200", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },
  { name: "First American Title Insurance Co.", address: "4300 W Cypress St, Suite 600", city: "Tampa", state: "Florida", stateAbbr: "FL", zip: "33607", phone: "813-871-4200", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "Stewart Title Company", address: "200 SW 1st Ave, Suite 800", city: "Fort Lauderdale", state: "Florida", stateAbbr: "FL", zip: "33301", phone: "954-764-2900", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // Georgia
  { name: "Morris Hardwick Schneider", address: "1 Glenlake Pkwy, Suite 300", city: "Atlanta", state: "Georgia", stateAbbr: "GA", zip: "30328", phone: "770-394-0400", altaMember: true, services: ["Settlement Services", "Title Insurance"] },

  // Hawaii
  { name: "Title Guaranty of Hawaii", address: "235 Queen St", city: "Honolulu", state: "Hawaii", stateAbbr: "HI", zip: "96813", phone: "808-533-6261", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },

  // Idaho
  { name: "Alliance Title & Escrow Corp.", address: "7941 W Rifleman St", city: "Boise", state: "Idaho", stateAbbr: "ID", zip: "83704", phone: "208-947-1554", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },

  // Illinois
  { name: "Chicago Title Insurance Company", address: "10 S LaSalle St, Suite 3100", city: "Chicago", state: "Illinois", stateAbbr: "IL", zip: "60603", phone: "312-223-2000", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "First American Title Insurance Co.", address: "200 W Madison St, Suite 800", city: "Chicago", state: "Illinois", stateAbbr: "IL", zip: "60606", phone: "312-917-7373", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // Indiana
  { name: "First American Title Insurance Co.", address: "135 N Pennsylvania St, Suite 1200", city: "Indianapolis", state: "Indiana", stateAbbr: "IN", zip: "46204", phone: "317-231-7300", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Iowa
  { name: "Iowa Title Guaranty", address: "1963 Bell Ave, Suite 250", city: "Des Moines", state: "Iowa", stateAbbr: "IA", zip: "50315", phone: "515-281-5764", altaMember: true, services: ["Title Insurance"] },

  // Kansas
  { name: "Kansas Secured Title", address: "4740 W 135th St", city: "Leawood", state: "Kansas", stateAbbr: "KS", zip: "66224", phone: "913-663-7500", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // Kentucky
  { name: "Commonwealth Land Title Insurance Co.", address: "250 W Main St, Suite 1800", city: "Lexington", state: "Kentucky", stateAbbr: "KY", zip: "40507", phone: "859-253-0030", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Louisiana
  { name: "First American Title Insurance Co.", address: "1555 Poydras St, Suite 1580", city: "New Orleans", state: "Louisiana", stateAbbr: "LA", zip: "70112", phone: "504-529-3600", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Maryland
  { name: "Old Republic National Title Insurance Co.", address: "100 Painters Mill Rd, Suite 600", city: "Owings Mills", state: "Maryland", stateAbbr: "MD", zip: "21117", phone: "410-363-2800", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Massachusetts
  { name: "Stewart Title Guaranty Company", address: "99 High St, Suite 2900", city: "Boston", state: "Massachusetts", stateAbbr: "MA", zip: "02110", phone: "617-onal-5300", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Michigan
  { name: "First American Title Insurance Co.", address: "1 Woodward Ave, Suite 800", city: "Detroit", state: "Michigan", stateAbbr: "MI", zip: "48226", phone: "313-965-0700", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // Minnesota
  { name: "Old Republic National Title Insurance Co.", address: "400 Second Ave S", city: "Minneapolis", state: "Minnesota", stateAbbr: "MN", zip: "55401", phone: "612-371-1111", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Missouri
  { name: "Stewart Title Company", address: "7701 Forsyth Blvd, Suite 900", city: "St. Louis", state: "Missouri", stateAbbr: "MO", zip: "63105", phone: "314-615-8100", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Nevada
  { name: "First American Title Insurance Co.", address: "3960 Howard Hughes Pkwy, Suite 500", city: "Las Vegas", state: "Nevada", stateAbbr: "NV", zip: "89169", phone: "702-732-1345", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },

  // New Jersey
  { name: "Fidelity National Title Insurance Co.", address: "1 Meadowlands Plaza, Suite 200", city: "East Rutherford", state: "New Jersey", stateAbbr: "NJ", zip: "07073", phone: "201-933-7100", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // New York
  { name: "First American Title Insurance Co.", address: "633 Third Ave, 15th Floor", city: "New York", state: "New York", stateAbbr: "NY", zip: "10017", phone: "212-922-9700", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "Stewart Title Insurance Company", address: "300 E 42nd St, 5th Floor", city: "New York", state: "New York", stateAbbr: "NY", zip: "10017", phone: "212-922-0050", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // North Carolina
  { name: "Investors Title Insurance Company", address: "121 N Columbia St", city: "Chapel Hill", state: "North Carolina", stateAbbr: "NC", zip: "27514", phone: "919-968-2200", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Ohio
  { name: "First American Title Insurance Co.", address: "250 Civic Center Dr, Suite 400", city: "Columbus", state: "Ohio", stateAbbr: "OH", zip: "43215", phone: "614-228-4015", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Oregon
  { name: "First American Title Insurance Co.", address: "200 SW Market St, Suite 250", city: "Portland", state: "Oregon", stateAbbr: "OR", zip: "97201", phone: "503-222-3651", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },

  // Pennsylvania
  { name: "Conestoga Title Insurance Co.", address: "137 E King St", city: "Lancaster", state: "Pennsylvania", stateAbbr: "PA", zip: "17602", phone: "717-299-4805", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "Old Republic National Title Insurance Co.", address: "1700 Market St, Suite 1600", city: "Philadelphia", state: "Pennsylvania", stateAbbr: "PA", zip: "19103", phone: "215-241-8100", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Tennessee
  { name: "First American Title Insurance Co.", address: "424 Church St, Suite 1900", city: "Nashville", state: "Tennessee", stateAbbr: "TN", zip: "37219", phone: "615-244-2190", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Texas
  { name: "Stewart Title Guaranty Company", address: "1360 Post Oak Blvd, Suite 100", city: "Houston", state: "Texas", stateAbbr: "TX", zip: "77056", phone: "713-625-8100", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },
  { name: "First American Title Insurance Co.", address: "14800 Quorum Dr, Suite 300", city: "Dallas", state: "Texas", stateAbbr: "TX", zip: "75254", phone: "972-458-3737", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "Westcor Land Title Insurance Co.", address: "201 S Lakeline Blvd, Suite 802", city: "Cedar Park", state: "Texas", stateAbbr: "TX", zip: "78613", phone: "512-527-0200", altaMember: true, services: ["Title Insurance"] },

  // Utah
  { name: "First American Title Insurance Co.", address: "15 W South Temple, Suite 800", city: "Salt Lake City", state: "Utah", stateAbbr: "UT", zip: "84101", phone: "801-578-8888", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },

  // Virginia
  { name: "Old Republic National Title Insurance Co.", address: "1 Dulles Tech Center, Suite 200", city: "Herndon", state: "Virginia", stateAbbr: "VA", zip: "20171", phone: "703-691-0400", altaMember: true, services: ["Title Insurance", "Settlement Services"] },
  { name: "Ekko Title", address: "2200 Clarendon Blvd, Suite 1100", city: "Arlington", state: "Virginia", stateAbbr: "VA", zip: "22201", phone: "703-936-4100", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Washington
  { name: "First American Title Insurance Co.", address: "818 Stewart St, Suite 800", city: "Seattle", state: "Washington", stateAbbr: "WA", zip: "98101", phone: "206-728-0400", altaMember: true, services: ["Title Insurance", "Escrow", "Settlement Services"] },

  // Washington DC
  { name: "Centric Title Group", address: "1825 K St NW, Suite 700", city: "Washington", state: "District of Columbia", stateAbbr: "DC", zip: "20006", phone: "202-223-0707", altaMember: true, services: ["Title Insurance", "Settlement Services"] },

  // Wisconsin
  { name: "Knight Barry Title Group", address: "400 N Executive Dr", city: "Brookfield", state: "Wisconsin", stateAbbr: "WI", zip: "53005", phone: "262-790-3600", altaMember: true, services: ["Title Insurance", "Settlement Services", "Escrow"] },
];

export const allStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];
