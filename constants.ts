
import { Project, Experience, SkillGroup } from './types';

export const ASSETS_URL = "https://raw.githubusercontent.com/ilmn25/ilmn25/refs/heads/prod/assets";

export const PERSONAL_INFO = {
  name: 'illu',
  avatar: `${ASSETS_URL}/pfp.png`,
  title: 'Full stack developer | Game developer | Digital illustrator',
  education: "BSc (Hons) in Computer Science + Minor in Japanese @ The Hong Kong Polytechnic University Sep 2023 – Jul 2027",
  birthday: '20/05/2005',
  decoration: "+-= ═.·:·.☽ ✧  ✦  ✧ ☾.·:·.═ =-+",
  contact: {
    whatsapp: '+852 6236 5318',
    email: 'kilmn025@gmail.com',
    discord: 'ilmn'
  },
  social: {
    github: 'https://github.com/ilmn25',
    twitter: 'https://x.com/ilmn25/',
    instagram: 'https://www.instagram.com/ilmnnnnnnnnnn/',
    linkedin: 'https://www.linkedin.com/in/ilmn25/',
    youtube: 'https://www.youtube.com/@ilmn25',
    resume: 'https://docs.google.com/document/d/1EXzindBoId3J1ePtDNtXYuC0-K_bDDBOZi4cdc-akdk/edit?usp=sharing'
  }
};

export const PROJECT_NAV = [
  { id: 'unity-game', label: '3D Unity Game', category: 'Game Dev' },
  { id: 'tutor-db', label: 'Tutor Centre Management System', category: 'Web App' },
  { id: 'discord-tool', label: 'Discord Message Tool', category: 'Cloud Tools' },
  { id: 'spa-tree', label: 'SPA Specifications Generator', category: 'Automation' },
  { id: 'illustrations', label: 'Digital Illustrations', category: 'Art' },
];

export const SKILLS: SkillGroup[] = [
    {
        category: 'Languages',
        skills: ['Native English', 'Native Cantonese', 'Fluent Mandarin', 'Beginner Japanese']
    },
    {
        category: 'Frontend',
        skills: ['React', 'React Native', 'Vite', 'Tailwind']
    },
    {
        category: 'Backend & Full‑stack',
        skills: ['Node.js', 'FastAPI', 'Next.js', 'MongoDB', 'PostgreSQL']
    },
    {
        category: 'Cloud & Platforms',
        skills: ['AWS (IAM, ECS, ECR, S3)', 'Supabase', 'Vercel', 'Stripe']
    },
    {
        category: 'DevOps & VCS',
        skills: ['Docker', 'GitHub Actions', 'Git']
    },
    {
        category: 'Game Development',
        skills: ['Unity', 'Godot', 'Defold']
    },
    {
        category: 'AI & Tools',
        skills: ['RAG', 'Pinecone', 'Google AI Studio']
    },
    {
        category: 'Design & Graphics',
        skills: ['Clip Studio Paint', 'Canva', 'Figma']
    }
];

export const PROJECTS: Project[] = [
  {
    id: 'unity-game',
    title: '3D Unity Game',
    description: 'A work-in-progress survival game project built during my summer breaks.',
    category: 'game',
    tags: ['Unity', 'C#'],
    highlights: [
      'A optimized map partitioning system that manages world data in 3D chunks, enabling infinite procedural world generation.', 
      "A custom-made set of DevTools for speeding up asset creation and systems testing.",
      "An Advanced Pathfind Algorithm and Navigation system, Designed for 3D Voxel Maps where Unity's NavMesh fails, Supporting Parkour Maneuvers.",
      "Integration with Unity's Job System and Burst Compiler to offload heavy computations, maintaining 200-300+ FPS on Average with no Frame Drops.",
      "Save and Load system that can maintain the World's Map, Inventory, all Entity Behaviours, and other Metadata."
    ],
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/ilmn25/240809' },
    ]
  },
  {
    id: 'tutor-db',
    title: 'Tutor Centre Management System',
    description: 'A custom ERP and CRM solution built to streamline Attendance, client communication, and operations management for education centers..',
    category: 'web',
    tags: ['Supabase', 'PostgreSQL', 'React', 'Tailwind'],
    highlights: [ 
      'Features issues detection, multi-tenancy, Stripe Payment API integration for parents to pay online, and more',
      'Advanced data management with robust data filtering, sorting, backup, analysis, and also batch import / exporting',
      'Automated attendance with fingerprint & facial recognition hardware integration',
      'Used by a Tutor Centre in Hung Hom'
    ],
    links: [
    ]
  },
  {
    id: 'spa-tree',
    title: 'SPA HTML Tree Specification Generator',
    description: 'A prompt driven workflow to speed up the migration of legacy SPAs to AI-driven IDEs such as Google AI Studio.',
    category: 'workflow',
    tags: ['Prompt Engineering', 'Specification Generation'],
    highlights: [
      'Processes SPA HTML trees to extract routes, page structure and asset information',
      'Employs LLMs to generate clear and comprehensive specifications.',
      'Facilitates the cleanup of asset names and paths for improved organization',
      "Enables full migration of medium sized websites within a single day."
    ],
    links: [  
    ]
  },
  {
    id: 'discord-tool',
    title: 'Discord Message Tool',
    description: 'A cloud-native web app to streamline posting messages across many channels on Discord.',
    category: 'web',
    tags: ['FastAPI', 'React', 'AWS', 'Docker', 'MongoDB', 'Tailwind', 'GitHub Actions'],
    highlights: [
      'Wrapper for Discord API',
      'Hosted on AWS ECS Fargate with Docker containerization',
      'Integrated CI/CD pipeline via GitHub Actions',
      'Multilingual UI localization & device responsive UI'
    ],
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/ilmn25/251128' }
    ]
  },
  {
    id: 'illustrations',
    title: 'Digital Illustration',
    description: 'A collection of my illustrations, animations, and other art.',
    category: 'art',
    tags: ['Clip Studio Paint', 'Character Design', 'Animation', 'Video Editing'],
    highlights: [
      'Drew character design, illustration, and concept sketches tailored to client specifications',
      'Managing personal social media and freelance commissions'
    ],
    links: [
      { label: 'Twitter', url: 'https://x.com/ilmn25/' }, 
      { label: 'Instagram', url: 'https://www.instagram.com/ilmnnnnnnnnnn/' },
      { label: 'Youtube', url: 'https://www.youtube.com/@ilmn25' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Time Super English Learning Centre',
    role: 'Full Stack Developer',
    period: 'Jan 2026 - Present',
    type: 'Part-time',
    description: [
      'Sole developer of a custom ERP and CRM system for the centre, built with Supabase/PostgreSQL backend and Vite React + Tailwind frontend.',
      'Iterated features through direct collaboration with staff and owner to match their workflows and design.',
      'Features including localization, multi-tenancy, a dashboard for parents, extremely robust filtering and sorting, batch importing bookings data from excel, database snapshots and rollback, and more.'
    ]
  },
  {
    company: 'All Walks Limited',
    role: 'Unity Game Development Intern',
    period: 'Dec 2025 - Jan 2026',
    type: 'Full-time',
    description: [
      'Worked on a to-be-released game focused on mental health education.',
      'Developed and integrated core app sections within the existing framework and codebase including settings, localization, Excel to C# pipeline for constants, and gameplay.',
      'Collaborated directly with the director and senior developer to plan, prioritize, and deliver upcoming tasks, while writing and reviewing project specifications to guide development of new app features.',
      'Contributed expertise to resolve animation and graphic design issues, ensuring smoother visuals and consistent user experience.'
    ]
  },
  {
    company: 'Freelance',
    role: 'Digital Illustrator',
    period: 'Jan 2023 - Present',
    type: 'Freelance',
    description: [
      'Reached potential clients on social media platforms such as Discord by posting and sharing my art portfolio.',
      'Drew concept sketches and character art tailored to client specifications.',
      'Maintained clear communication with clients through iterative feedback cycles, and delivered projects within agreed timelines.'
    ]
  }
];
