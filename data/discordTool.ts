
import { ASSETS_URL } from '../constants';

export interface DiscordFeature {
  title: string;
  description: string;
  icon: string;
  image: string;
}

const DISCORD_BASE = `${ASSETS_URL}/discord`;

export const DISCORD_HIGHLIGHTS = [
  "Hosted on AWS ECS Fargate with Docker",
  "CI/CD via GitHub Actions",
  "NoSQL DB with MongoDB",
  "Multi-Language localization",
  "Screen Size Responive UI"
];

export const DISCORD_STRUCTURED_STACK = [
  { category: "/server", tools: ["FastAPI", "Python"] },
  { category: "/web", tools: ["React", "Tailwind", "JSX"] },
  { category: "Database", tools: ["MongoDB"] },
  { category: "Storage", tools: ["AWS S3"] },
  { category: "Keys", tools: ["AWS Secrets Manager"] },
  { category: "Hosting", tools: ["AWS ECS Fargate", "AWS ECR", "Docker"] },
  { category: "Discord", tools: ["dolfies/discord.py-self"] }
];
 

export const DISCORD_GALLERY = [
  `${DISCORD_BASE}/6.png`,
  `${DISCORD_BASE}/5.png`,
  `${DISCORD_BASE}/4.png`,
  `${DISCORD_BASE}/3.png`,
  `${DISCORD_BASE}/1.png`
];
