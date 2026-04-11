// County-level effective property tax rates for major counties
// Calculated from median property tax / median home value
// Sources: Tax Foundation, Census Bureau ACS, tax-rates.org (2024 data)
// Coverage: Top counties by population in each state (~300 counties covering ~70% of US homebuyers)

export interface CountyTaxData {
  county: string;
  rate: number; // effective tax rate as percentage
}

// Format: state abbreviation -> array of { county, rate }
// Sorted by population (largest first) within each state
export const countyTaxRates: Record<string, CountyTaxData[]> = {
  AL: [
    { county: "Jefferson", rate: 0.47 }, { county: "Mobile", rate: 0.39 },
    { county: "Madison", rate: 0.42 }, { county: "Montgomery", rate: 0.43 },
    { county: "Shelby", rate: 0.41 }, { county: "Baldwin", rate: 0.30 },
    { county: "Tuscaloosa", rate: 0.33 }, { county: "Lee", rate: 0.35 },
  ],
  AK: [
    { county: "Anchorage", rate: 1.14 }, { county: "Matanuska-Susitna", rate: 1.10 },
    { county: "Fairbanks North Star", rate: 1.22 }, { county: "Kenai Peninsula", rate: 0.94 },
  ],
  AZ: [
    { county: "Maricopa", rate: 0.56 }, { county: "Pima", rate: 0.77 },
    { county: "Pinal", rate: 0.65 }, { county: "Yavapai", rate: 0.49 },
    { county: "Mohave", rate: 0.55 }, { county: "Coconino", rate: 0.51 },
  ],
  AR: [
    { county: "Pulaski", rate: 0.77 }, { county: "Benton", rate: 0.47 },
    { county: "Washington", rate: 0.50 }, { county: "Sebastian", rate: 0.62 },
    { county: "Faulkner", rate: 0.55 }, { county: "Garland", rate: 0.47 },
  ],
  CA: [
    { county: "Los Angeles", rate: 0.76 }, { county: "San Diego", rate: 0.73 },
    { county: "Orange", rate: 0.68 }, { county: "Riverside", rate: 0.93 },
    { county: "San Bernardino", rate: 0.88 }, { county: "Santa Clara", rate: 0.67 },
    { county: "Alameda", rate: 0.72 }, { county: "Sacramento", rate: 0.82 },
    { county: "Contra Costa", rate: 0.75 }, { county: "San Francisco", rate: 0.63 },
    { county: "Fresno", rate: 0.86 }, { county: "San Mateo", rate: 0.56 },
    { county: "Kern", rate: 0.91 }, { county: "Ventura", rate: 0.72 },
  ],
  CO: [
    { county: "Denver", rate: 0.51 }, { county: "El Paso", rate: 0.49 },
    { county: "Arapahoe", rate: 0.45 }, { county: "Jefferson", rate: 0.50 },
    { county: "Adams", rate: 0.53 }, { county: "Douglas", rate: 0.48 },
    { county: "Larimer", rate: 0.49 }, { county: "Boulder", rate: 0.50 },
    { county: "Weld", rate: 0.53 },
  ],
  CT: [
    { county: "Fairfield", rate: 1.54 }, { county: "Hartford", rate: 2.07 },
    { county: "New Haven", rate: 2.24 }, { county: "Litchfield", rate: 1.42 },
    { county: "New London", rate: 1.59 }, { county: "Middlesex", rate: 1.70 },
  ],
  DE: [
    { county: "New Castle", rate: 0.63 }, { county: "Sussex", rate: 0.37 },
    { county: "Kent", rate: 0.52 },
  ],
  DC: [{ county: "District of Columbia", rate: 0.57 }],
  FL: [
    { county: "Miami-Dade", rate: 0.86 }, { county: "Broward", rate: 0.97 },
    { county: "Palm Beach", rate: 0.95 }, { county: "Hillsborough", rate: 0.90 },
    { county: "Orange", rate: 0.85 }, { county: "Pinellas", rate: 0.79 },
    { county: "Duval", rate: 0.88 }, { county: "Lee", rate: 0.78 },
    { county: "Polk", rate: 0.84 }, { county: "Brevard", rate: 0.78 },
    { county: "Volusia", rate: 0.79 }, { county: "Seminole", rate: 0.77 },
    { county: "Sarasota", rate: 0.72 }, { county: "Pasco", rate: 0.82 },
  ],
  GA: [
    { county: "Fulton", rate: 1.08 }, { county: "Gwinnett", rate: 0.92 },
    { county: "Cobb", rate: 0.93 }, { county: "DeKalb", rate: 1.14 },
    { county: "Chatham", rate: 0.96 }, { county: "Cherokee", rate: 0.78 },
    { county: "Clayton", rate: 0.99 }, { county: "Forsyth", rate: 0.68 },
    { county: "Henry", rate: 0.89 }, { county: "Richmond", rate: 1.01 },
  ],
  HI: [
    { county: "Honolulu", rate: 0.28 }, { county: "Hawaii", rate: 0.27 },
    { county: "Maui", rate: 0.21 }, { county: "Kauai", rate: 0.19 },
  ],
  ID: [
    { county: "Ada", rate: 0.58 }, { county: "Canyon", rate: 0.69 },
    { county: "Kootenai", rate: 0.47 }, { county: "Bonneville", rate: 0.62 },
  ],
  IL: [
    { county: "Cook", rate: 2.10 }, { county: "DuPage", rate: 2.01 },
    { county: "Lake", rate: 2.56 }, { county: "Will", rate: 2.36 },
    { county: "Kane", rate: 2.41 }, { county: "McHenry", rate: 2.49 },
    { county: "Winnebago", rate: 2.52 }, { county: "Madison", rate: 1.76 },
    { county: "St. Clair", rate: 1.96 }, { county: "Champaign", rate: 1.96 },
  ],
  IN: [
    { county: "Marion", rate: 0.99 }, { county: "Lake", rate: 1.10 },
    { county: "Allen", rate: 0.83 }, { county: "Hamilton", rate: 0.71 },
    { county: "St. Joseph", rate: 0.92 }, { county: "Elkhart", rate: 0.70 },
  ],
  IA: [
    { county: "Polk", rate: 1.58 }, { county: "Linn", rate: 1.44 },
    { county: "Scott", rate: 1.69 }, { county: "Johnson", rate: 1.27 },
    { county: "Black Hawk", rate: 1.58 }, { county: "Woodbury", rate: 1.71 },
  ],
  KS: [
    { county: "Johnson", rate: 1.29 }, { county: "Sedgwick", rate: 1.42 },
    { county: "Shawnee", rate: 1.46 }, { county: "Wyandotte", rate: 1.37 },
    { county: "Douglas", rate: 1.45 },
  ],
  KY: [
    { county: "Jefferson", rate: 0.93 }, { county: "Fayette", rate: 0.83 },
    { county: "Kenton", rate: 0.95 }, { county: "Boone", rate: 0.83 },
    { county: "Warren", rate: 0.69 },
  ],
  LA: [
    { county: "East Baton Rouge", rate: 0.54 }, { county: "Jefferson", rate: 0.42 },
    { county: "Orleans", rate: 0.73 }, { county: "Caddo", rate: 0.67 },
    { county: "St. Tammany", rate: 0.36 },
  ],
  ME: [
    { county: "Cumberland", rate: 1.19 }, { county: "York", rate: 1.10 },
    { county: "Penobscot", rate: 1.35 }, { county: "Kennebec", rate: 1.38 },
  ],
  MD: [
    { county: "Montgomery", rate: 0.87 }, { county: "Prince George's", rate: 1.08 },
    { county: "Baltimore County", rate: 1.04 }, { county: "Baltimore City", rate: 2.25 },
    { county: "Anne Arundel", rate: 0.85 }, { county: "Howard", rate: 0.91 },
    { county: "Frederick", rate: 0.89 }, { county: "Harford", rate: 0.99 },
  ],
  MA: [
    { county: "Middlesex", rate: 1.12 }, { county: "Suffolk", rate: 0.95 },
    { county: "Worcester", rate: 1.28 }, { county: "Essex", rate: 1.17 },
    { county: "Norfolk", rate: 1.12 }, { county: "Bristol", rate: 1.21 },
    { county: "Plymouth", rate: 1.14 },
  ],
  MI: [
    { county: "Wayne", rate: 1.96 }, { county: "Oakland", rate: 1.40 },
    { county: "Macomb", rate: 1.52 }, { county: "Kent", rate: 1.11 },
    { county: "Genesee", rate: 1.94 }, { county: "Washtenaw", rate: 1.60 },
    { county: "Ingham", rate: 1.72 },
  ],
  MN: [
    { county: "Hennepin", rate: 1.13 }, { county: "Ramsey", rate: 1.18 },
    { county: "Dakota", rate: 0.95 }, { county: "Anoka", rate: 1.01 },
    { county: "Washington", rate: 0.93 }, { county: "St. Louis", rate: 1.07 },
  ],
  MS: [
    { county: "Hinds", rate: 1.04 }, { county: "Harrison", rate: 0.63 },
    { county: "DeSoto", rate: 0.67 }, { county: "Rankin", rate: 0.62 },
    { county: "Jackson", rate: 0.54 },
  ],
  MO: [
    { county: "St. Louis County", rate: 1.03 }, { county: "Jackson", rate: 1.10 },
    { county: "St. Louis City", rate: 1.22 }, { county: "St. Charles", rate: 0.90 },
    { county: "Greene", rate: 0.83 }, { county: "Clay", rate: 1.02 },
    { county: "Boone", rate: 0.93 },
  ],
  MT: [
    { county: "Yellowstone", rate: 0.78 }, { county: "Missoula", rate: 0.82 },
    { county: "Gallatin", rate: 0.64 }, { county: "Flathead", rate: 0.70 },
    { county: "Cascade", rate: 0.87 },
  ],
  NE: [
    { county: "Douglas", rate: 1.69 }, { county: "Lancaster", rate: 1.60 },
    { county: "Sarpy", rate: 1.56 }, { county: "Hall", rate: 1.62 },
  ],
  NV: [
    { county: "Clark", rate: 0.53 }, { county: "Washoe", rate: 0.54 },
    { county: "Douglas", rate: 0.34 }, { county: "Carson City", rate: 0.55 },
  ],
  NH: [
    { county: "Hillsborough", rate: 2.09 }, { county: "Rockingham", rate: 1.69 },
    { county: "Merrimack", rate: 2.01 }, { county: "Strafford", rate: 2.16 },
  ],
  NJ: [
    { county: "Bergen", rate: 2.15 }, { county: "Middlesex", rate: 2.40 },
    { county: "Essex", rate: 2.39 }, { county: "Hudson", rate: 1.46 },
    { county: "Monmouth", rate: 1.71 }, { county: "Ocean", rate: 1.64 },
    { county: "Union", rate: 2.30 }, { county: "Passaic", rate: 2.52 },
    { county: "Camden", rate: 2.88 }, { county: "Morris", rate: 2.07 },
    { county: "Burlington", rate: 2.01 }, { county: "Mercer", rate: 2.14 },
    { county: "Somerset", rate: 1.94 }, { county: "Salem", rate: 2.32 },
  ],
  NM: [
    { county: "Bernalillo", rate: 0.86 }, { county: "Dona Ana", rate: 0.77 },
    { county: "Santa Fe", rate: 0.49 }, { county: "Sandoval", rate: 0.68 },
  ],
  NY: [
    { county: "Kings (Brooklyn)", rate: 0.69 }, { county: "Queens", rate: 0.72 },
    { county: "New York (Manhattan)", rate: 0.88 }, { county: "Suffolk", rate: 1.89 },
    { county: "Nassau", rate: 1.79 }, { county: "Bronx", rate: 0.80 },
    { county: "Richmond (Staten Island)", rate: 0.90 }, { county: "Westchester", rate: 1.62 },
    { county: "Erie", rate: 2.19 }, { county: "Monroe", rate: 2.32 },
    { county: "Onondaga", rate: 2.40 }, { county: "Albany", rate: 1.97 },
    { county: "Rockland", rate: 1.81 }, { county: "Dutchess", rate: 1.72 },
  ],
  NC: [
    { county: "Mecklenburg", rate: 0.83 }, { county: "Wake", rate: 0.78 },
    { county: "Guilford", rate: 0.95 }, { county: "Forsyth", rate: 0.85 },
    { county: "Cumberland", rate: 0.78 }, { county: "Durham", rate: 0.92 },
    { county: "Buncombe", rate: 0.55 }, { county: "Union", rate: 0.71 },
  ],
  ND: [
    { county: "Cass", rate: 1.08 }, { county: "Burleigh", rate: 0.92 },
    { county: "Grand Forks", rate: 1.10 }, { county: "Ward", rate: 1.02 },
  ],
  OH: [
    { county: "Franklin", rate: 1.62 }, { county: "Cuyahoga", rate: 2.17 },
    { county: "Hamilton", rate: 1.62 }, { county: "Summit", rate: 1.84 },
    { county: "Montgomery", rate: 1.72 }, { county: "Lucas", rate: 1.99 },
    { county: "Butler", rate: 1.26 }, { county: "Stark", rate: 1.44 },
    { county: "Lorain", rate: 1.44 }, { county: "Delaware", rate: 1.19 },
  ],
  OK: [
    { county: "Oklahoma", rate: 0.89 }, { county: "Tulsa", rate: 0.92 },
    { county: "Cleveland", rate: 0.83 }, { county: "Canadian", rate: 0.78 },
    { county: "Comanche", rate: 0.86 },
  ],
  OR: [
    { county: "Multnomah", rate: 1.00 }, { county: "Washington", rate: 0.85 },
    { county: "Clackamas", rate: 0.84 }, { county: "Lane", rate: 0.93 },
    { county: "Marion", rate: 0.97 }, { county: "Deschutes", rate: 0.66 },
  ],
  PA: [
    { county: "Philadelphia", rate: 1.06 }, { county: "Allegheny", rate: 2.01 },
    { county: "Montgomery", rate: 1.30 }, { county: "Bucks", rate: 1.30 },
    { county: "Delaware", rate: 1.60 }, { county: "Chester", rate: 1.26 },
    { county: "Lancaster", rate: 1.42 }, { county: "York", rate: 1.44 },
    { county: "Berks", rate: 1.51 }, { county: "Lehigh", rate: 1.36 },
  ],
  RI: [
    { county: "Providence", rate: 1.50 }, { county: "Kent", rate: 1.25 },
    { county: "Washington", rate: 1.05 }, { county: "Newport", rate: 0.94 },
    { county: "Bristol", rate: 1.15 },
  ],
  SC: [
    { county: "Greenville", rate: 0.53 }, { county: "Richland", rate: 0.65 },
    { county: "Charleston", rate: 0.40 }, { county: "Horry", rate: 0.37 },
    { county: "Spartanburg", rate: 0.55 }, { county: "Lexington", rate: 0.44 },
    { county: "York", rate: 0.54 },
  ],
  SD: [
    { county: "Minnehaha", rate: 1.22 }, { county: "Pennington", rate: 1.04 },
    { county: "Lincoln", rate: 1.10 }, { county: "Brown", rate: 1.33 },
  ],
  TN: [
    { county: "Shelby", rate: 0.88 }, { county: "Davidson", rate: 0.64 },
    { county: "Knox", rate: 0.68 }, { county: "Hamilton", rate: 0.66 },
    { county: "Rutherford", rate: 0.58 }, { county: "Williamson", rate: 0.44 },
    { county: "Sumner", rate: 0.54 },
  ],
  TX: [
    { county: "Harris", rate: 1.90 }, { county: "Dallas", rate: 1.83 },
    { county: "Tarrant", rate: 1.94 }, { county: "Bexar", rate: 1.88 },
    { county: "Travis", rate: 1.68 }, { county: "Collin", rate: 1.80 },
    { county: "Denton", rate: 1.77 }, { county: "Fort Bend", rate: 2.05 },
    { county: "Williamson", rate: 1.82 }, { county: "Montgomery", rate: 1.85 },
    { county: "El Paso", rate: 2.01 }, { county: "Hidalgo", rate: 1.82 },
    { county: "Galveston", rate: 1.98 }, { county: "Brazoria", rate: 2.03 },
    { county: "Hays", rate: 1.74 }, { county: "Nueces", rate: 1.87 },
  ],
  UT: [
    { county: "Salt Lake", rate: 0.59 }, { county: "Utah", rate: 0.49 },
    { county: "Davis", rate: 0.56 }, { county: "Weber", rate: 0.60 },
    { county: "Washington", rate: 0.46 }, { county: "Cache", rate: 0.51 },
  ],
  VT: [
    { county: "Chittenden", rate: 1.68 }, { county: "Rutland", rate: 2.03 },
    { county: "Washington", rate: 1.85 }, { county: "Windsor", rate: 1.92 },
    { county: "Windham", rate: 1.78 },
  ],
  VA: [
    { county: "Fairfax", rate: 0.95 }, { county: "Virginia Beach", rate: 0.80 },
    { county: "Prince William", rate: 0.93 }, { county: "Loudoun", rate: 0.90 },
    { county: "Chesterfield", rate: 0.77 }, { county: "Henrico", rate: 0.79 },
    { county: "Arlington", rate: 0.93 }, { county: "Norfolk", rate: 1.01 },
    { county: "Chesapeake", rate: 0.85 }, { county: "Richmond City", rate: 1.12 },
  ],
  WA: [
    { county: "King", rate: 0.84 }, { county: "Pierce", rate: 0.99 },
    { county: "Snohomish", rate: 0.82 }, { county: "Spokane", rate: 0.97 },
    { county: "Clark", rate: 0.86 }, { county: "Thurston", rate: 0.93 },
    { county: "Kitsap", rate: 0.84 },
  ],
  WV: [
    { county: "Kanawha", rate: 0.59 }, { county: "Berkeley", rate: 0.44 },
    { county: "Cabell", rate: 0.59 }, { county: "Monongalia", rate: 0.52 },
    { county: "Raleigh", rate: 0.59 },
  ],
  WI: [
    { county: "Milwaukee", rate: 2.22 }, { county: "Dane", rate: 1.69 },
    { county: "Waukesha", rate: 1.54 }, { county: "Brown", rate: 1.74 },
    { county: "Racine", rate: 2.06 }, { county: "Outagamie", rate: 1.65 },
    { county: "Winnebago", rate: 1.73 }, { county: "Kenosha", rate: 1.80 },
  ],
  WY: [
    { county: "Laramie", rate: 0.62 }, { county: "Natrona", rate: 0.61 },
    { county: "Campbell", rate: 0.50 }, { county: "Sweetwater", rate: 0.56 },
    { county: "Fremont", rate: 0.65 },
  ],
};
