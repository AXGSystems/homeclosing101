// Effective property tax rates by state (2024 data)
// Source: World Population Review / Tax Foundation / Census Bureau ACS
// National average: ~0.90%

export const propertyTaxRates: Record<string, { rate: number; name: string }> = {
  AL: { rate: 0.39, name: "Alabama" },
  AK: { rate: 1.16, name: "Alaska" },
  AZ: { rate: 0.56, name: "Arizona" },
  AR: { rate: 0.59, name: "Arkansas" },
  CA: { rate: 0.71, name: "California" },
  CO: { rate: 0.49, name: "Colorado" },
  CT: { rate: 1.79, name: "Connecticut" },
  DE: { rate: 0.55, name: "Delaware" },
  DC: { rate: 0.57, name: "District of Columbia" },
  FL: { rate: 0.82, name: "Florida" },
  GA: { rate: 0.83, name: "Georgia" },
  HI: { rate: 0.27, name: "Hawaii" },
  ID: { rate: 0.56, name: "Idaho" },
  IL: { rate: 2.11, name: "Illinois" },
  IN: { rate: 0.77, name: "Indiana" },
  IA: { rate: 1.49, name: "Iowa" },
  KS: { rate: 1.34, name: "Kansas" },
  KY: { rate: 0.80, name: "Kentucky" },
  LA: { rate: 0.55, name: "Louisiana" },
  ME: { rate: 1.17, name: "Maine" },
  MD: { rate: 1.02, name: "Maryland" },
  MA: { rate: 1.15, name: "Massachusetts" },
  MI: { rate: 1.35, name: "Michigan" },
  MN: { rate: 1.05, name: "Minnesota" },
  MS: { rate: 0.76, name: "Mississippi" },
  MO: { rate: 0.91, name: "Missouri" },
  MT: { rate: 0.79, name: "Montana" },
  NE: { rate: 1.54, name: "Nebraska" },
  NV: { rate: 0.50, name: "Nevada" },
  NH: { rate: 1.89, name: "New Hampshire" },
  NJ: { rate: 2.33, name: "New Jersey" },
  NM: { rate: 0.74, name: "New Mexico" },
  NY: { rate: 1.64, name: "New York" },
  NC: { rate: 0.73, name: "North Carolina" },
  ND: { rate: 0.99, name: "North Dakota" },
  OH: { rate: 1.43, name: "Ohio" },
  OK: { rate: 0.85, name: "Oklahoma" },
  OR: { rate: 0.86, name: "Oregon" },
  PA: { rate: 1.41, name: "Pennsylvania" },
  RI: { rate: 1.39, name: "Rhode Island" },
  SC: { rate: 0.53, name: "South Carolina" },
  SD: { rate: 1.14, name: "South Dakota" },
  TN: { rate: 0.58, name: "Tennessee" },
  TX: { rate: 1.63, name: "Texas" },
  UT: { rate: 0.55, name: "Utah" },
  VT: { rate: 1.78, name: "Vermont" },
  VA: { rate: 0.76, name: "Virginia" },
  WA: { rate: 0.88, name: "Washington" },
  WV: { rate: 0.55, name: "West Virginia" },
  WI: { rate: 1.59, name: "Wisconsin" },
  WY: { rate: 0.58, name: "Wyoming" },
};

// Loan type configurations with real 2026 rules
// Sources: FHA.com, VA.gov, USDA Rural Development, Fannie Mae
export interface LoanTypeConfig {
  name: string;
  minDown: number;           // Minimum down payment %
  minCredit: number;         // Minimum credit score (typical)
  upfrontMIP: number;        // Upfront mortgage insurance % (0 if none)
  annualMIP: number;         // Annual mortgage insurance % (0 if none)
  mipRemovable: boolean;     // Can MIP be removed?
  mipRemovalNote: string;    // When/how MIP is removed
  maxDTI: number;            // Maximum DTI ratio %
  loanLimit2026: number;     // Conforming/FHA loan limit baseline
  description: string;
}

export const loanTypes: Record<string, LoanTypeConfig> = {
  conventional: {
    name: "Conventional",
    minDown: 3,
    minCredit: 620,
    upfrontMIP: 0,
    annualMIP: 0.5,          // PMI ~0.5% for good credit, varies 0.3-1.5%
    mipRemovable: true,
    mipRemovalNote: "PMI can be removed at 20% equity by request, or automatically at 22% equity under the Homeowners Protection Act.",
    maxDTI: 45,
    loanLimit2026: 806500,   // 2025 conforming limit
    description: "Standard mortgage backed by Fannie Mae or Freddie Mac. Best rates with 20%+ down and 740+ credit. PMI required below 20% down.",
  },
  fha: {
    name: "FHA",
    minDown: 3.5,
    minCredit: 580,
    upfrontMIP: 1.75,        // 1.75% UFMIP added to loan balance
    annualMIP: 0.55,         // 0.55% annual MIP for most borrowers (>15yr, LTV>95%)
    mipRemovable: false,
    mipRemovalNote: "For loans with LTV > 90% at origination, annual MIP is required for the LIFE of the loan. For LTV ≤ 90%, MIP drops off after 11 years. The only way to remove FHA MIP early is to refinance into a conventional loan.",
    maxDTI: 43,
    loanLimit2026: 524225,   // FHA floor limit 2025
    description: "Government-insured loan through the Federal Housing Administration. Lower credit and down payment requirements. MIP required for the life of most loans.",
  },
  va: {
    name: "VA",
    minDown: 0,
    minCredit: 0,            // No official minimum, lenders typically want 620+
    upfrontMIP: 2.15,        // VA funding fee (first use, no down payment)
    annualMIP: 0,            // NO monthly mortgage insurance
    mipRemovable: true,
    mipRemovalNote: "VA loans have NO monthly mortgage insurance — ever. The one-time VA funding fee (2.15% first use, 3.3% subsequent use) can be financed into the loan. Exempt for veterans with service-connected disabilities.",
    maxDTI: 41,
    loanLimit2026: 0,        // No loan limit for qualified veterans (since 2020)
    description: "Zero-down mortgage for eligible active-duty, veterans, and surviving spouses. No monthly mortgage insurance. VA funding fee applies (waived for disabled veterans).",
  },
  usda: {
    name: "USDA",
    minDown: 0,
    minCredit: 640,
    upfrontMIP: 1.0,         // 1% upfront guarantee fee
    annualMIP: 0.35,         // 0.35% annual guarantee fee
    mipRemovable: false,
    mipRemovalNote: "USDA guarantee fees (both upfront and annual) are required for the life of the loan. To remove, refinance into a conventional loan once you have 20% equity.",
    maxDTI: 41,
    loanLimit2026: 0,        // Based on income limits, not loan limits
    description: "Zero-down mortgage for eligible rural and suburban areas. Income limits apply (typically 115% of area median income). Lowest mortgage insurance costs.",
  },
};
