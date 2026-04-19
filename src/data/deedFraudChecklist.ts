// ============================================================
// DEED FRAUD PROTECTION CHECKLIST
// ============================================================
// Default checklist items for the deed fraud protection toolkit.
// Stored in localStorage under key 'alta-deed-fraud-toolkit'.
// ============================================================

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  completed: boolean;
  completedDate: string | null;
  notes: string;
}

export interface ChecklistItemTemplate {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export const DEFAULT_CHECKLIST: ChecklistItemTemplate[] = [
  {
    id: 'county-alert',
    category: 'Free Monitoring',
    title: 'Register for my county\'s free property fraud alert',
    description: 'Sign up for email/phone alerts when documents are recorded against your property.',
    priority: 'critical'
  },
  {
    id: 'safelist-alerts',
    category: 'Free Monitoring',
    title: 'Add the alert sender to my email safe-senders list',
    description: 'An alert that lands in your spam folder is worse than no alert. Whitelist the sender so notifications reach your inbox.',
    priority: 'critical'
  },
  {
    id: 'test-alert',
    category: 'Free Monitoring',
    title: 'Send myself a test to confirm alerts reach my inbox',
    description: 'Many alert systems let you trigger a test notification. If yours does, use it. If not, verify the confirmation email after registration landed in your inbox, not spam.',
    priority: 'high'
  },
  {
    id: 'verify-deed',
    category: 'Verification',
    title: 'Pull a current copy of my deed from the county recorder',
    description: 'Confirm your name, legal description, and that no unauthorized filings exist.',
    priority: 'critical'
  },
  {
    id: 'title-insurance',
    category: 'Insurance',
    title: 'Locate my owner\'s title insurance policy',
    description: 'Find your policy document. Confirm you have an owner\'s policy (not just lender\'s).',
    priority: 'high'
  },
  {
    id: 'enhanced-policy',
    category: 'Insurance',
    title: 'Ask my title insurance company about enhanced coverage for post-policy forgery',
    description: 'Some enhanced title insurance policies include coverage for deed fraud occurring after the policy is issued. Ask your title insurance company which policy you have and what it covers.',
    priority: 'high'
  },
  {
    id: 'mailing-address',
    category: 'Verification',
    title: 'Verify my mailing address is current with the Assessor',
    description: 'Ensure any property notices reach you. Critical if you own a second home or rental.',
    priority: 'high'
  },
  {
    id: 'credit-freeze',
    category: 'Identity',
    title: 'Freeze my credit at all three bureaus',
    description: 'Equifax, Experian, and TransUnion. Free and reversible. Prevents fraudsters from using your identity for loans.',
    priority: 'high'
  },
  {
    id: 'credit-monitor',
    category: 'Identity',
    title: 'Set up free weekly credit report monitoring',
    description: 'AnnualCreditReport.com offers free weekly reports from all three bureaus.',
    priority: 'medium'
  },
  {
    id: 'mail-watch',
    category: 'Monitoring',
    title: 'Watch for missing property tax bills or unfamiliar mail',
    description: 'Missing tax bills, mail addressed to a stranger at your address, or foreclosure notices for loans you didn\'t take out are red flags.',
    priority: 'medium'
  },
  {
    id: 'second-home',
    category: 'Monitoring',
    title: 'If I own a second home / rental, arrange periodic in-person checks',
    description: 'Vacant and absentee-owned properties are the #1 target for deed fraud. Have a neighbor, property manager, or trusted contact check regularly.',
    priority: 'medium'
  },
  {
    id: 'document-storage',
    category: 'Preparation',
    title: 'Store key documents in a secure location',
    description: 'Deed, title insurance policy, closing disclosure, property tax records. Consider a fireproof safe or secure cloud storage.',
    priority: 'low'
  },
  {
    id: 'estate-plan',
    category: 'Preparation',
    title: 'Review my estate plan for property transfer instructions',
    description: 'Deceased owners\' properties are common fraud targets. Clear estate plans and deed transfers reduce vulnerability.',
    priority: 'low'
  }
];

/** Initialize checklist from templates with runtime state fields */
export function initializeChecklist(): ChecklistItem[] {
  return DEFAULT_CHECKLIST.map(item => ({
    ...item,
    completed: false,
    completedDate: null,
    notes: ''
  }));
}
