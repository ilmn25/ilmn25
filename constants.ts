import { Project, Experience, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: 'illu',
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
    vgen: 'https://vgen.co/ilmn25/portfolio',
    linkedin: 'https://www.linkedin.com/in/ilmn25/'
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
    skills: ['Clip Studio Paint', 'Figma', 'Canvas']
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
    description: 'A bespoke full-stack attendance and bookings web application for the centre, built to streamline complex staff workflows and parent interactions.',
    category: 'web',
    tags: ['Supabase', 'PostgreSQL', 'React', 'Tailwind'],
    highlights: [
      'Built with Supabase/PostgreSQL backend and Vite React + Tailwind frontend',
      'Features localization, multi-tenancy, and an interactive dashboard for parents',
      'Advanced data management: batch Excel importing, robust filtering and sorting, and database rollback systems'
    ],
    links: [
      { label: 'Website', url: 'https://ilmn25.github.io/260131-web/#/' }
    ]
  },
  {
    id: 'digital-art',
    title: 'Digital Illustration',
    description: 'A professional creative portfolio showcasing high-quality character design, 2D animation, and digital illustration.',
    category: 'art',
    tags: ['Clip Studio Paint', 'Character Design', 'Animation', 'Video Editing'],
    highlights: [
      'Specializing in high-quality character design, illustration, and concept sketches tailored to client specifications',
      'Proficiency in 2D animation and creative video editing for social media outreach',
      'Managing social media presence and freelance commissions via Discord with iterative feedback cycles'
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
    company: 'Time Super English Tutor Centre',
    role: 'Full Stack Webapp Developer',
    period: 'Jan 2026 - Present',
    type: 'Part-time',
    description: [
      'Sole developer of a custom attendance and bookings web app for the centre, built with Supabase/PostgreSQL backend and Vite React + Tailwind frontend.',
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
      'Drew high quality concept sketches and character art tailored to client specifications.',
      'Maintained clear communication with clients through iterative feedback cycles, and delivered projects within agreed timelines, ensuring satisfaction.'
    ]
  }
];