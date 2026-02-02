
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    label: string;
    url: string;
    icon?: string;
  }[];
  category: 'game' | 'web' | 'art';
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
