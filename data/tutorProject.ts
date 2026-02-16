import { ASSETS_URL } from '../constants';

export interface ProjectFeature {
  title: string;
  description: string;
  iconType: 'database' | 'layout' | 'shield' | 'import';
  image: string;
}

const TUTOR_BASE = `${ASSETS_URL}/tutor`;

export const TUTOR_HIGHLIGHTS = [
  "Used by a live tutor centre in Hung Hom",
  "Sole developer from architecture to deployment",
  "Postgres and Supabase driven data RLS",
  "Multi-Language localization"
];

export const TUTOR_FEATURES: ProjectFeature[] = [ 
  {
    title: "Data RLS with Attribute-Based Access Control",
    description: "Separate secure portals for parents, teachers, and admins. Provides real-time updates into schedules, payment status, and attendance for relevant users.",
    iconType: 'database',
    image: `${TUTOR_BASE}/1.png`
  },
  {
    title: "Attendance Automation with External Hardware",
    description: "Integration with Fingerprint and Facial Recognition Hardware for hands-free attendance marking.",
    iconType: 'shield',
    image: `${TUTOR_BASE}/19.png`
  },
  {
    title: "Robust records filtering, sorting, and Data Analysis",
    description: "The system detects discrepancies such as unpaid or missed sessions, allowing admins to resolve them by sending invoices, cancelling, or rescheduling at a click of a button.",
    iconType: 'import',
    image: `${TUTOR_BASE}/13.png`
  },
  {
    title: "Stripe API Integration",
    description: "Parents can pay invoices with credit / debit cards online through Stripe.",
    iconType: 'shield',
    image: `${TUTOR_BASE}/25.png`
  },
  {
    title: "Data Integrity & Rollback",
    description: "Implementation of database snapshots and manual rollback systems to ensure administrative errors can be corrected without data loss.",
    iconType: 'shield',
    image: `${TUTOR_BASE}/8.png`
  },
  {
    title: "Multi-tenant Support",
    description: "Built with multiple centres in mind for future-proofing and scalability.",
    iconType: 'layout',
    image: `${TUTOR_BASE}/31.png`
  }
];

export const TUTOR_GALLERY = Array.from({ length: 32 }, (_, i) => `${TUTOR_BASE}/${i + 1}.png`);

export const TUTOR_GALLERY_GROUPS: Record<string, number[]> = { 
  "Home Page": [36, 37],
  "Admin Member Dashboards": [1, 2, 3, 22],
  "Admin Attendance Dashboard": [18, 19, 20, 21],
  "Admin Course Schedules Editor": [4, 5, 6],
  "Admin Data Import / Exporting / Rollback": [7, 8, 9, 33],
  "Admin Issues Dashboard": [11, 12, 13, 14], 
  "Admin Invoices Dashboard": [10, 15, 16, 17],
  "Parent Attendance Dashboard": [23, 24, 29],
  "Parent Issues Dashboard": [26, 27, 28],
  "Parent Invoices Payment Page": [25, 30],
  "Screen Size Responive UI": [34, 35],
  "Supabase": [31, 32]
};