// ============================================================
// COUNTY DATABASE - Tier 1 (Verified) + Tier 2 (Fallback patterns)
// ============================================================
// Data verified via web research as of April 2026.
// Full 3,100-county expansion plan documented in the handoff doc.
// Each entry: { state, county, programName, registrationUrl, cost, method, phone, verified }
// ============================================================

export interface CountyProgram {
  programName: string | null;
  registrationUrl: string;
  cost: string;
  method: string;
  phone: string | null;
  notes: string;
  verified: string;
  noProgram?: boolean;
}

export interface LookupResult {
  type: 'statewide' | 'verified' | 'no-program' | 'fallback';
  data?: CountyProgram;
  state: string;
  county: string;
  stateName?: string;
  searchUrl?: string;
  pfaTry?: string;
}

export interface USState {
  code: string;
  name: string;
}

export interface CountyDatabaseType {
  _statewide: Record<string, CountyProgram>;
  [stateCode: string]: Record<string, CountyProgram> | Record<string, CountyProgram>;
}

export const COUNTY_DATABASE: CountyDatabaseType = {
  // Statewide programs - apply to ALL counties in the state
  _statewide: {
    'VA': {
      programName: 'Virginia Deed Alert',
      registrationUrl: 'https://risweb.vacourts.gov/VADeedAlert/',
      cost: 'Free',
      method: 'Email / online portal',
      phone: null,
      notes: 'Statewide program covering all Virginia Circuit Courts. Register once to monitor any participating circuit court.',
      verified: '2026-04'
    }
  },
  // County-specific verified programs
  AZ: {
    'Maricopa County': {
      programName: 'Maricopa Title Alert',
      registrationUrl: 'https://recorder.maricopa.gov/MaricopaTitleAlert/',
      cost: 'Free',
      method: 'Email and/or SMS text',
      phone: '602-506-3535',
      notes: 'Launched June 2023. Arizona state law now requires every county to offer a similar alert system.',
      verified: '2026-04'
    }
  },
  CA: {
    'Los Angeles County': {
      programName: 'Property Owner e-Notification Alert',
      registrationUrl: 'https://assessor.lacounty.gov/news-information/enotification',
      cost: 'Free',
      method: 'Email + mailed paper copy',
      phone: '800-593-8222',
      notes: 'Combined program with Assessor, Registrar-Recorder/County Clerk, and DCBA. Email alerts within 48 hours of recording.',
      verified: '2026-04'
    }
  },
  IL: {
    'Cook County': {
      programName: 'Cook County Property Fraud Alert',
      registrationUrl: 'https://www.cookcountyclerkil.gov/recordings/property-fraud-unit',
      cost: 'Free',
      method: 'Phone call or email',
      phone: '312-603-4000',
      notes: 'Clerk\'s Office has a dedicated Property Fraud Unit that coordinates investigation with law enforcement.',
      verified: '2026-04'
    },
    'McHenry County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://www.propertyfraudalert.com/',
      cost: 'Free',
      method: 'Email, text, or phone call',
      phone: '815-334-4110',
      notes: 'Participates in the nationwide Property Fraud Alert program.',
      verified: '2026-04'
    }
  },
  TX: {
    'Tarrant County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://www.propertyfraudalert.com/TXTarrant',
      cost: 'Free',
      method: 'Email or phone call',
      phone: null,
      notes: 'Monitors 90+ document types recorded in the County Clerk\'s office.',
      verified: '2026-04'
    },
    'Dallas County': {
      programName: 'Dallas County Property Fraud Alert',
      registrationUrl: 'https://www.dallascounty.org/government/county-clerk/recording/property-fraud.php',
      cost: 'Free',
      method: 'Email or phone call',
      phone: null,
      notes: 'Administered by the County Clerk\'s Recording Division in partnership with Kofile Technologies.',
      verified: '2026-04'
    },
    'El Paso County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://www.propertyfraudalert.com/TXElPaso',
      cost: 'Free',
      method: 'Email, text, or phone call',
      phone: null,
      notes: 'Participates in the nationwide Property Fraud Alert program.',
      verified: '2026-04'
    },
    'Harris County': {
      programName: null,
      registrationUrl: 'https://www.cclerk.hctx.net/applications/websearch/RP.aspx',
      cost: 'Manual check only',
      method: 'Self-service search (no automated alerts)',
      phone: '713-755-6405',
      notes: 'Harris County does not currently offer a free automated alert system. You can search the Real Property Records portal manually. Contact your state legislators to request a statewide alert program.',
      verified: '2026-04',
      noProgram: true
    }
  },
  MO: {
    'St. Louis County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://stlouiscountymo.gov/st-louis-county-departments/revenue/recorder-of-deeds/property-fraud-alert/',
      cost: 'Free',
      method: 'Email, text, or phone call',
      phone: null,
      notes: 'St. Louis County Recorder of Deeds participates in the nationwide Property Fraud Alert program.',
      verified: '2026-04'
    }
  },
  NJ: {
    'Burlington County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://www.propertyfraudalert.com/NJBurlington',
      cost: 'Free',
      method: 'Email, text, or phone call',
      phone: '609-265-5122',
      notes: 'Administered by the Burlington County Clerk\'s Office.',
      verified: '2026-04'
    }
  },
  OH: {
    'Miami County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://www.miamicountyohio.gov/980/Property-Fraud-Alert',
      cost: 'Free',
      method: 'Email, text, or phone call',
      phone: null,
      notes: 'Participates in the nationwide Property Fraud Alert program.',
      verified: '2026-04'
    }
  },
  FL: {
    'Sumter County': {
      programName: 'Property Fraud Alert',
      registrationUrl: 'https://www.sumterclerk.com/property-fraud-alert',
      cost: 'Free',
      method: 'Email, text, or phone call',
      phone: null,
      notes: 'Florida Clerks statewide offer Property Fraud Alert — check your specific county clerk.',
      verified: '2026-04'
    }
  },
  GA: {
    _stateNote: {
      programName: 'Filing Activity Notification System (FANS)',
      registrationUrl: 'https://fans.gsccca.org/',
      cost: 'Free',
      method: 'Email',
      phone: null,
      notes: 'Georgia statewide system operated by the Georgia Superior Court Clerks\' Cooperative Authority. Covers all Georgia counties.',
      verified: '2026-04'
    }
  }
};

// US States for dropdown - includes DC
export const US_STATES: USState[] = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' }, { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' }, { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' }, { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' }, { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' }, { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' }, { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' }, { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
];
