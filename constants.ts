import { Project, Experience, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: 'illu',
  title: 'CS Student | Full stack developer | Game developer | Digital illustrator',
  education: "Bachelor's degree in Computer Science, Minor in Japanese @ PolyU HK (3rd Year)",
  decoration: "+-= ═.·:·.☽ ✧  ✦  ✧ ☾.·:·.═ =-+",
  contact: {
    whatsapp: '+852 6236 5318',
    email: 'kilmn025@gmail.com'
  },
  social: {
    github: 'https://github.com/ilmn25',
    twitter: 'https://x.com/ilmn25/'
  }
};

export const SKILLS: SkillGroup[] = [
  {
    category: 'Full-Stack Development',
    skills: ['React', 'Vite', 'React Native', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Tailwind', 'Supabase']
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS (IAM, ECS, ECR, S3)', 'Docker', 'CI/CD (Github Actions)', 'Git']
  },
  {
    category: 'Game Development',
    skills: ['Unity (3+ years)', 'Godot', 'Defold', 'C#', 'C++', 'A* Pathfinding', 'Multithreading']
  },
  {
    category: 'AI & Graphics',
    skills: ['RAG (LLM)', 'Pinecone', 'Clip Studio Paint', 'Figma', 'Digital Illustration', 'Animation']
  },
  {
    category: 'Languages',
    skills: ['Native English', 'Cantonese', 'Mandarin', 'Beginner Japanese']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'unity-game',
    title: '3D Unity Engine Core System',
    description: 'A robust 3D game engine project built on Unity focusing on performance and complex systems.',
    category: 'game',
    tags: ['Unity', 'C#', 'Multithreading', 'A*'],
    highlights: [
      '3D pathfinding algorithm based on A*',
      'Cubic map chunking system',
      'State machine and behavior module system',
      'Real-time map generation with job system/multithreading'
    ],
    links: [
      { label: 'Source Code', url: 'https://github.com/ilmn25/240809' },
      { label: 'Download (Windows)', url: 'https://github.com/ilmn25/240809/releases/download/v0.1.0/Game.zip' },
      { label: 'Demo Video', url: 'https://youtu.be/otRVF7d-Z7Q' }
    ]
  },
  {
    id: 'discord-tool',
    title: 'Automated Discord Message Tool',
    description: 'A cloud-native solution for automating job post distribution across Discord communities.',
    category: 'web',
    tags: ['FastAPI', 'React', 'AWS ECS', 'Docker', 'MongoDB'],
    highlights: [
      'Wrapper for Discord API to automate job posts',
      'Hosted on AWS ECS Fargate with Docker containerization',
      'Integrated CI/CD pipeline via GitHub Actions',
      'Multilingual UI localization'
    ],
    links: [
      { label: 'GitHub Repo', url: 'https://github.com/ilmn25' }
    ]
  },
  {
    id: 'tutor-db',
    title: 'Tutor Centre Management System',
    description: 'Custom database management system commissioned for a tutoring centre in Hung Hom.',
    category: 'web',
    tags: ['Supabase', 'PostgreSQL', 'React', 'Cloud'],
    highlights: [
      'Full-stack management of student/tutor records',
      'Supabase backend for real-time updates',
      'Optimized PostgreSQL schema for scheduling'
    ],
    links: [
      { label: 'Private Website', url: '#' }
    ]
  },
  {
    id: 'digital-art',
    title: 'Digital Illustration & Animation',
    description: 'A collection of digital artworks and animations created over 6+ years.',
    category: 'art',
    tags: ['Clip Studio Paint', 'Huion', 'Animation', 'Character Design'],
    highlights: [
      'Freelance illustration commissions for online clients since 2023',
      'Consistent output across Instagram, Twitter, and YouTube',
      'Proficiency in Huion hardware and CSP software'
    ],
    links: [
      { label: 'Twitter', url: 'https://x.com/ilmn25/' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'All Walks AWIL',
    role: 'Game Developer Intern',
    period: 'Dec 2025 - Jan 2026',
    description: [
      'Developed and integrated localization and gameplay core sections.',
      'Worked with senior developers to plan app framework improvements.',
      'Implemented UI/UX settings within the existing codebase.'
    ]
  },
  {
    company: 'Freelance',
    role: 'Digital Illustrator',
    period: 'Jan 2023 - Present',
    description: [
      'Managed digital illustration commissions for international clients.',
      'Developed a following across multiple creative platforms.',
      'Specialized in character art and social media content.'
    ]
  }
];