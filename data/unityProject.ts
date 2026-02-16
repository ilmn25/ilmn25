
import { ASSETS_URL } from '../constants';

export interface GameFeature {
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
  };
}

const UNITY_BASE = `${ASSETS_URL}/unity`;

export const GAME_FEATURES: GameFeature[] = [
  {
    title: "Cubic Map Chunking System",
    description: "A highly optimized spatial partitioning system that manages world data in 3D chunks, enabling infinite procedural world generation.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dUQk0CVaHIA',
      thumbnailUrl: `${UNITY_BASE}/15.png`
    }
  },
  {
    title: "Custom 3D A* Pathfinding and Navigation",
    description: "An Advanced Pathfind Algorithm and Navigation system, Designed for 3D Voxel Maps where Unity's NavMesh fails, Supporting Parkour Maneuvers.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=cHSwMKmvdKo',
      thumbnailUrl: `${UNITY_BASE}/22.png`
    }
  },
  {
    title: "Saving and Loading",
    description: "Save and Load system that can maintain the World's Map, Inventory, all Entity Behaviours, and other Metadata.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=pHN1In7Jz3c',
      thumbnailUrl: `${UNITY_BASE}/1.png`
    }
  },
  {
    title: "Multithreading",
    description: "Integration with Unity's Job System and Burst Compiler to offload heavy computations, maintaining 200-300+ FPS on Average with no Frame Drops.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=h6h2cAwZeKU',
      thumbnailUrl: `${UNITY_BASE}/18.png`
    }
  },
  {
    title: "Robust UI",
    description: "A World Space UI which has Robust Hotkeys for Item Splitting and Swapping, Text Animations, and Panel Tweening.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=1PNA1rKgP9I',
      thumbnailUrl: `${UNITY_BASE}/10.png`
    }
  },
  {
    title: "Custom Devtools",
    description: "A custom-made set of development tools for speeding up asset creation and testing.",
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=Y2vqaBKJf1U',
      thumbnailUrl: `${UNITY_BASE}/21.png`
    }
  }
];

export const EXTRA_VIDEOS = [
  { 
    url: "https://www.youtube.com/watch?v=__OSAV3GbGY",
    description: "Guns, melee weapons, and enemies."
  },
  { 
    url: "https://www.youtube.com/watch?v=ROuUr2vpfWY",
    description: "Persisting entities logic beyond map load range."
  },
  { 
    url: "https://www.youtube.com/watch?v=kDc6MWXrDJI",
    description: "Copy and pasting map entities and structure using custom Devtools."
  },
  { 
    url: "https://www.youtube.com/watch?v=l7XCsAYvVVY",
    description: "House building and Day-Night cycle"
  },
  { 
    url: "https://www.youtube.com/watch?v=p-Q9H5iNqXw",
    description: "Multi-tasking by controlling multiple characters"
  }
];

export const GAME_GALLERY = Array.from({ length: 22 }, (_, i) => `${UNITY_BASE}/${i + 1}.png`);
