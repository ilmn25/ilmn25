import { Project, Experience, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: 'illu',
  title: 'CS Student | Full stack developer | Game developer | Digital illustrator',
  education: "BSc (Hons) in Computer Science + Minor in Japanese @ The Hong Kong Polytechnic University Sep 2023 – Jul 2027",
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
    category: 'Languages',
    skills: ['Native English', 'Native Cantonese', 'Fluent Mandarin', 'Beginner Japanese']
  },
  {
    category: 'Frontend',
    skills: ['React', 'Vite', 'React Native', 'Tailwind']
  },
  {
    category: 'Backend & Cloud',
    skills: ['FastAPI', 'AWS (IAM, ECS, ECR, S3)', 'Supabase']
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'PostgreSQL']
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'Github Actions', 'Git']
  },
  {
    category: 'Game Dev',
    skills: ['Unity', 'Godot', 'Defold', 'C#']
  },
  {
    category: 'AI',
    skills: ['RAG', 'Pinecone']
  },
  {
    category: 'Graphics & Design',
    skills: ['Clip Studio Paint', 'Figma']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'unity-game',
    title: '3D Unity Game',
    description: 'A robust 3D game project built on Unity focusing on performance and complex systems.',
    category: 'game',
    tags: ['Unity', 'C#'],
    highlights: [
      'Cubic map chunking system',
      'State machine and behavior module system',
      "Optimized real-time map generation using Unity's Job System"
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
    tags: ['FastAPI', 'React', 'AWS', 'Docker', 'MongoDB', 'Tailwind', 'GitHub Actions'],
    highlights: [
      'Wrapper for Discord API to automate job posts',
      'Hosted on AWS ECS Fargate with Docker containerization',
      'Integrated CI/CD pipeline via GitHub Actions',
      'Multilingual UI localization'
    ],
    links: [
      { label: 'Source Code', url: 'https://github.com/ilmn25/251128' }
    ]
  },
  {
    id: 'tutor-db',
    title: 'Tutor Centre Management System',
    description: 'Custom database management system commissioned for a tutoring centre in Hung Hom.',
    category: 'web',
    tags: ['Supabase', 'PostgreSQL', 'React', 'GitHub Actions'],
    highlights: [
      'Full-stack management of student/tutor records',
      'Supabase backend for real-time updates',
      'Optimized PostgreSQL schema for scheduling'
    ],
    links: [
      { label: 'Website', url: 'https://ilmn25.github.io/260131-web/#/' }
    ]
  },
  {
    id: 'digital-art',
    title: 'Digital Illustrations',
    description: 'A collection of digital artworks created over 6+ years.',
    category: 'art',
    tags: ['Clip Studio Paint', 'Character Design'],
    highlights: [
      'Freelance illustration commissions for online clients since 2023',
      'Consistent output across Instagram, Twitter, and YouTube',
      'Proficiency in Huion hardware and CSP software'
    ],
    links: [
      { label: 'Twitter', url: 'https://x.com/ilmn25/' },
      { label: 'VGen', url: 'https://vgen.co/ilmn25/portfolio' },
      { label: 'Instagram', url: 'https://www.instagram.com/ilmnnnnnnnnnn/' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Time Super English (Hung Hom)',
    role: 'Full Stack Developer',
    period: 'Jan 2026 - Present',
    type: 'Part-time',
    description: [
      'Commissioned to design and develop a full-stack management system for student and tutor records.',
      'Utilized Supabase and PostgreSQL for a real-time database with an optimized schema for efficient scheduling.',
      "Delivered a custom solution tailored to the centre's operational needs."
    ]
  },
  {
    company: 'All Walks AWIL',
    role: 'Game Developer Intern',
    period: 'Dec 2025 - Jan 2026',
    type: 'Full-time',
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
    type: 'Freelance',
    description: [
      'Managed digital illustration commissions for international clients.',
      'Developed a following across multiple creative platforms.',
      'Specialized in character art and social media content.'
    ]
  }
];