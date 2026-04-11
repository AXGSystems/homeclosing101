// State flags stored locally in /public/flags/ (downloaded from flagpedia.net, public domain)
// Colors sampled from actual state flags

export interface StateFlagData {
  abbr: string;
  flag: string;
  colors: [string, string]; // [primary, secondary] hex from flag
  nickname: string;
  population: string;
}

export const stateFlags: Record<string, StateFlagData> = {
  AL: { abbr: "AL", flag: "/flags/al.webp", colors: ["#AD1F2D", "#FFFFFF"], nickname: "Yellowhammer State", population: "5.1M" },
  AK: { abbr: "AK", flag: "/flags/ak.webp", colors: ["#002B5C", "#FFCC00"], nickname: "The Last Frontier", population: "734K" },
  AZ: { abbr: "AZ", flag: "/flags/az.webp", colors: ["#BF0A30", "#FFD700"], nickname: "Grand Canyon State", population: "7.4M" },
  AR: { abbr: "AR", flag: "/flags/ar.webp", colors: ["#CE1126", "#003087"], nickname: "The Natural State", population: "3.0M" },
  CA: { abbr: "CA", flag: "/flags/ca.webp", colors: ["#FFFFFF", "#8B5E3C"], nickname: "Golden State", population: "39.0M" },
  CO: { abbr: "CO", flag: "/flags/co.webp", colors: ["#002868", "#CE1126"], nickname: "Centennial State", population: "5.9M" },
  CT: { abbr: "CT", flag: "/flags/ct.webp", colors: ["#0C2340", "#FFFFFF"], nickname: "Constitution State", population: "3.6M" },
  DE: { abbr: "DE", flag: "/flags/de.webp", colors: ["#003A70", "#BFB37C"], nickname: "First State", population: "1.0M" },
  DC: { abbr: "DC", flag: "/flags/dc.svg", colors: ["#E81B39", "#FFFFFF"], nickname: "Nation's Capital", population: "689K" },
  FL: { abbr: "FL", flag: "/flags/fl.webp", colors: ["#FFFFFF", "#CE1126"], nickname: "Sunshine State", population: "22.6M" },
  GA: { abbr: "GA", flag: "/flags/ga.webp", colors: ["#002868", "#CE1126"], nickname: "Peach State", population: "11.0M" },
  HI: { abbr: "HI", flag: "/flags/hi.webp", colors: ["#002868", "#CE1126"], nickname: "Aloha State", population: "1.4M" },
  ID: { abbr: "ID", flag: "/flags/id.webp", colors: ["#002868", "#D4A843"], nickname: "Gem State", population: "1.9M" },
  IL: { abbr: "IL", flag: "/flags/il.webp", colors: ["#FFFFFF", "#002868"], nickname: "Prairie State", population: "12.5M" },
  IN: { abbr: "IN", flag: "/flags/in.webp", colors: ["#002868", "#D4A843"], nickname: "Hoosier State", population: "6.8M" },
  IA: { abbr: "IA", flag: "/flags/ia.webp", colors: ["#CE1126", "#002868"], nickname: "Hawkeye State", population: "3.2M" },
  KS: { abbr: "KS", flag: "/flags/ks.webp", colors: ["#002868", "#D4A843"], nickname: "Sunflower State", population: "2.9M" },
  KY: { abbr: "KY", flag: "/flags/ky.webp", colors: ["#002868", "#D4A843"], nickname: "Bluegrass State", population: "4.5M" },
  LA: { abbr: "LA", flag: "/flags/la.webp", colors: ["#002868", "#FFFFFF"], nickname: "Pelican State", population: "4.6M" },
  ME: { abbr: "ME", flag: "/flags/me.webp", colors: ["#003478", "#D4A843"], nickname: "Pine Tree State", population: "1.4M" },
  MD: { abbr: "MD", flag: "/flags/md.webp", colors: ["#CE1126", "#000000"], nickname: "Old Line State", population: "6.2M" },
  MA: { abbr: "MA", flag: "/flags/ma.webp", colors: ["#FFFFFF", "#002868"], nickname: "Bay State", population: "7.0M" },
  MI: { abbr: "MI", flag: "/flags/mi.webp", colors: ["#002868", "#D4A843"], nickname: "Great Lakes State", population: "10.0M" },
  MN: { abbr: "MN", flag: "/flags/mn.webp", colors: ["#002868", "#D4A843"], nickname: "North Star State", population: "5.7M" },
  MS: { abbr: "MS", flag: "/flags/ms.webp", colors: ["#002868", "#CE1126"], nickname: "Magnolia State", population: "2.9M" },
  MO: { abbr: "MO", flag: "/flags/mo.webp", colors: ["#CE1126", "#002868"], nickname: "Show-Me State", population: "6.2M" },
  MT: { abbr: "MT", flag: "/flags/mt.webp", colors: ["#002868", "#D4A843"], nickname: "Treasure State", population: "1.1M" },
  NE: { abbr: "NE", flag: "/flags/ne.webp", colors: ["#002868", "#D4A843"], nickname: "Cornhusker State", population: "2.0M" },
  NV: { abbr: "NV", flag: "/flags/nv.webp", colors: ["#003087", "#C4A53E"], nickname: "Silver State", population: "3.2M" },
  NH: { abbr: "NH", flag: "/flags/nh.webp", colors: ["#002868", "#D4A843"], nickname: "Granite State", population: "1.4M" },
  NJ: { abbr: "NJ", flag: "/flags/nj.webp", colors: ["#FABB20", "#002868"], nickname: "Garden State", population: "9.3M" },
  NM: { abbr: "NM", flag: "/flags/nm.webp", colors: ["#FFD700", "#CE1126"], nickname: "Land of Enchantment", population: "2.1M" },
  NY: { abbr: "NY", flag: "/flags/ny.webp", colors: ["#002868", "#D4A843"], nickname: "Empire State", population: "19.6M" },
  NC: { abbr: "NC", flag: "/flags/nc.webp", colors: ["#002868", "#CE1126"], nickname: "Tar Heel State", population: "10.7M" },
  ND: { abbr: "ND", flag: "/flags/nd.webp", colors: ["#002868", "#D4A843"], nickname: "Peace Garden State", population: "780K" },
  OH: { abbr: "OH", flag: "/flags/oh.webp", colors: ["#CE1126", "#002868"], nickname: "Buckeye State", population: "11.8M" },
  OK: { abbr: "OK", flag: "/flags/ok.webp", colors: ["#007A4D", "#FFFFFF"], nickname: "Sooner State", population: "4.0M" },
  OR: { abbr: "OR", flag: "/flags/or.webp", colors: ["#002868", "#D4A843"], nickname: "Beaver State", population: "4.2M" },
  PA: { abbr: "PA", flag: "/flags/pa.webp", colors: ["#002868", "#D4A843"], nickname: "Keystone State", population: "13.0M" },
  RI: { abbr: "RI", flag: "/flags/ri.webp", colors: ["#FFFFFF", "#002868"], nickname: "Ocean State", population: "1.1M" },
  SC: { abbr: "SC", flag: "/flags/sc.webp", colors: ["#003087", "#FFFFFF"], nickname: "Palmetto State", population: "5.3M" },
  SD: { abbr: "SD", flag: "/flags/sd.webp", colors: ["#003F87", "#D4A843"], nickname: "Mount Rushmore State", population: "910K" },
  TN: { abbr: "TN", flag: "/flags/tn.webp", colors: ["#CE1126", "#002868"], nickname: "Volunteer State", population: "7.1M" },
  TX: { abbr: "TX", flag: "/flags/tx.webp", colors: ["#002868", "#CE1126"], nickname: "Lone Star State", population: "30.5M" },
  UT: { abbr: "UT", flag: "/flags/ut.webp", colors: ["#002868", "#D4A843"], nickname: "Beehive State", population: "3.4M" },
  VT: { abbr: "VT", flag: "/flags/vt.webp", colors: ["#003F87", "#D4A843"], nickname: "Green Mountain State", population: "647K" },
  VA: { abbr: "VA", flag: "/flags/va.webp", colors: ["#002868", "#FFFFFF"], nickname: "Old Dominion", population: "8.6M" },
  WA: { abbr: "WA", flag: "/flags/wa.webp", colors: ["#006C47", "#D4A843"], nickname: "Evergreen State", population: "7.8M" },
  WV: { abbr: "WV", flag: "/flags/wv.webp", colors: ["#002868", "#FFFFFF"], nickname: "Mountain State", population: "1.8M" },
  WI: { abbr: "WI", flag: "/flags/wi.webp", colors: ["#002868", "#FFFFFF"], nickname: "Badger State", population: "5.9M" },
  WY: { abbr: "WY", flag: "/flags/wy.webp", colors: ["#002868", "#CE1126"], nickname: "Cowboy State", population: "577K" },
};
