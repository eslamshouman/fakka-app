export type Category = 
  | 'Orphanage and Social Support'
  | 'Development and Humanitarian Aid'
  | 'Disabled Individuals and Social Integration'
  | 'Education'
  | 'Poverty Alleviation and Food Security'
  | 'Animal'
  | 'Healthcare';

export interface Organization {
  id: string;
  name: string;
  contact: string;
  email: string;
  description: string;
  category: Category;
  impactMetrics: { amount: number; impact: string }[];
}

export interface FavoriteOrg {
  orgId: string;
  percentage: number;
  frequency: 'One-time' | 'Monthly';
}

export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  originalAmount: number;
  roundedAmount: number;
  roundUpCut: number;
}

export const mockUser = {
  name: 'Ahmed Youssef',
  memberSince: '2025',
  balance: 45.50,
  maxRoundUp: 5,
  favorites: [
    { orgId: 'org-baheya', percentage: 50, frequency: 'Monthly' },
    { orgId: 'org-foodbank', percentage: 50, frequency: 'Monthly' }
  ] as FavoriteOrg[],
  totalDonated: 1250,
  avgSpendPerMonth: 250,
};

export const transactions: Transaction[] = [
  { id: 't1', merchant: 'Carrefour', date: '2026-04-10', originalAmount: 298.00, roundedAmount: 300.00, roundUpCut: 2.00 },
  { id: 't2', merchant: 'Uber', date: '2026-04-11', originalAmount: 146.50, roundedAmount: 150.00, roundUpCut: 3.50 },
  { id: 't3', merchant: 'Starbucks', date: '2026-04-11', originalAmount: 85.00, roundedAmount: 90.00, roundUpCut: 5.00 },
  { id: 't4', merchant: 'Talabat', date: '2026-04-12', originalAmount: 312.20, roundedAmount: 315.00, roundUpCut: 2.80 },
];

export const organizations: Organization[] = [
  // Healthcare
  {
    id: 'org-baheya',
    name: 'Baheya Foundation',
    contact: '16602',
    email: 'info@baheya.org',
    description: 'Nonprofit organization for early detection and breast cancer treatment.',
    category: 'Healthcare',
    impactMetrics: [
      { amount: 50, impact: '1 Mammogram Scan Contribution' },
      { amount: 500, impact: 'Chemotherapy Session Support' }
    ]
  },
  {
    id: 'org-57357',
    name: 'Children’s Cancer Hospital Egypt 57357',
    contact: '19057',
    email: 'info@57357.org',
    description: 'Nonprofit organization to provide cancer treatments for children to achieve the dream of a better tomorrow.',
    category: 'Healthcare',
    impactMetrics: [
      { amount: 100, impact: 'Medical Supplies' },
      { amount: 1000, impact: 'Day of Care for a Child' }
    ]
  },
  // Animal
  {
    id: 'org-brooke',
    name: 'Brooke Hospital',
    contact: '02 23649312',
    email: 'info@thebrookeegypt.org',
    description: 'Nonprofit organization dictated to improve the lives of horses, donkeys and mules by providing free medical treatment.',
    category: 'Animal',
    impactMetrics: [
      { amount: 30, impact: 'Basic Medical Treatment' },
      { amount: 150, impact: 'Surgery & Rehabilitation' }
    ]
  },
  {
    id: 'org-esma',
    name: 'Egyptian Society for Mercy to Animals (ESMA)',
    contact: '+20 01222188823',
    email: 'info@asma.org',
    description: 'Nonprofit organization admit animals who are in need of assistance due to severe injury, abuse, and neglect, provide them with food, shelter and basic medical care as they prepare them for adoption.',
    category: 'Animal',
    impactMetrics: [
      { amount: 50, impact: 'Food for 5 animals for a day' },
      { amount: 200, impact: 'Vaccination Package' }
    ]
  },
  // Poverty Alleviation and Food Security
  {
    id: 'org-foodbank',
    name: 'The Egyptian Food Bank',
    contact: '02 27586200',
    email: 'customer.experience@efb.eg',
    description: 'Specialized in providing healthy food to those in need, supporting the most vulnerable families in Egypt, and addressing the challenges of accessing sufficient, safe, and nutritious food.',
    category: 'Poverty Alleviation and Food Security',
    impactMetrics: [
      { amount: 45, impact: 'Provide 1 hot meal' },
      { amount: 350, impact: 'Monthly Food Box for a family' }
    ]
  },
  {
    id: 'org-clothingbank',
    name: 'Egyptian Clothing Bank',
    contact: '17014',
    email: 'info@egyptianclothingbank.org',
    description: 'Specialized in repurposing clothes and fabric waste through sorting, repairing, transforming, alternating, recycling, and upcycling to ultimately redistribute to underprivileged families, children, and youth.',
    category: 'Poverty Alleviation and Food Security',
    impactMetrics: [
      { amount: 50, impact: 'Warm jacket for a child' },
      { amount: 150, impact: 'Full winter outfit' }
    ]
  },
  // Extra orgs based on research
  {
    id: 'org-misrelkheir',
    name: 'Misr El Kheir Foundation',
    contact: '16140',
    email: 'info@mekeg.org',
    description: 'Comprehensive development organization focusing on health, education, scientific research, social solidarity, and aspects of life.',
    category: 'Education',
    impactMetrics: [
      { amount: 100, impact: 'School Bag and Supplies' },
      { amount: 1000, impact: 'Sponsor a Student’s Tuitions' }
    ]
  },
  {
    id: 'org-dar-el-orman',
    name: 'Dar El Orman',
    contact: '19455',
    email: 'info@dar-alorman.com',
    description: 'Serving Egyptian society through various development projects like orphanages, medical care, and village restorations.',
    category: 'Orphanage and Social Support',
    impactMetrics: [
      { amount: 250, impact: 'Support an Orphan per month' },
      { amount: 1500, impact: 'Micro-project for a Widow' }
    ]
  },
  {
    id: 'org-red-crescent',
    name: 'Egyptian Red Crescent',
    contact: '15322',
    email: 'erc@egyptianrc.org',
    description: 'Provides humanitarian aid, disaster relief, and health services to vulnerable communities.',
    category: 'Development and Humanitarian Aid',
    impactMetrics: [
      { amount: 100, impact: 'Emergency First Aid Kit' },
      { amount: 500, impact: 'Disaster Relief Package' }
    ]
  }
];

export const categories: Category[] = [
  'Orphanage and Social Support',
  'Development and Humanitarian Aid',
  'Disabled Individuals and Social Integration',
  'Education',
  'Poverty Alleviation and Food Security',
  'Animal',
  'Healthcare'
];
