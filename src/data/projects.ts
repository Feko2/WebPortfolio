export type ProjectCategory = "weapons" | "armor" | "potions" | "scrolls";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  date: string;
  role: string;
  description: string;
  enchantments: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  weapons: "Weapons (Frontend)",
  armor: "Armor (Backend)",
  potions: "Potions (Tools)",
  scrolls: "Scrolls (Full Stack)",
};

export const projects: Project[] = [
  {
    id: "ophnet",
    name: "OphNet",
    category: "scrolls",
    date: "2024",
    role: "Research Lead",
    description:
      "A computer vision–based glaucoma detection framework, formalizing supervised segmentation and geometric feature extraction for clinical risk estimation. Built in collaboration with Hospital de la Ceguera using emerging retinal imaging devices.",
    enchantments: ["Python", "PyTorch", "Computer Vision", "Clinical Data Pipelines"],
  },
  {
    id: "warehouse-sim",
    name: "Warehouse Automaton",
    category: "scrolls",
    date: "2024",
    role: "Lead Developer",
    description:
      "An autonomous multi-agent warehouse simulation with Q-Learning policies for dynamic path adjustment, optimal task allocation, and collision avoidance. Integrates Python backend with Unity 3D visualization.",
    enchantments: ["Python", "Unity", "Q-Learning", "C#"],
  },
  {
    id: "portfolio",
    name: "Skyrim Portfolio",
    category: "weapons",
    date: "2025",
    role: "Creator",
    description:
      "This interactive web portfolio crafted in the style of Skyrim's menus. Features constellation skill trees, an inventory of projects, a world map of experience, and a spell book resume.",
    enchantments: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "oracle-mvp",
    name: "Ticket Forge",
    category: "armor",
    date: "2024",
    role: "Software Engineer",
    description:
      "An internal ticket automation MVP at Oracle enabling automated escalation of high-priority tickets. Includes a ticket ingestion pipeline via ORDS REST APIs, relational data modeling, and APEX dashboards for team accountability.",
    enchantments: ["Oracle APEX", "ORDS", "SQL", "REST APIs"],
  },
];
