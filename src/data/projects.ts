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
    date: "2025",
    role: "Research Lead",
    description:
      "A computer vision–based glaucoma detection framework, formalizing supervised segmentation and geometric feature extraction for clinical risk estimation. Built in collaboration with Hospital de la Ceguera using emerging retinal imaging devices.",
    enchantments: ["Python", "PyTorch", "Computer Vision", "Clinical Data Pipelines"],
    github: "https://github.com/Feko2/Ophnet",
  },
  {
    id: "financ-ia",
    name: "Financ.ia",
    category: "scrolls",
    date: "2026",
    role: "Creator",
    description:
      "A full-stack AI platform delivering market and regulatory intelligence for the Mexican financial ecosystem. Ingests documents from Banxico, CNBV, BMV and the DOF, then extracts sentiment, risk signals and regulatory obligations using LLM-powered analysis with pgvector semantic search and RAG Q&A.",
    enchantments: ["FastAPI", "Next.js", "PostgreSQL + pgvector", "OpenAI / RAG"],
    github: "https://github.com/Feko2/financ-ia",
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
    id: "agronomai",
    name: "AgronomAI",
    category: "scrolls",
    date: "2025",
    role: "Full-Stack Developer",
    description:
      "A full-stack platform to monitor and analyze agricultural sensor data, tracking soil humidity, nitrogen and pH across parcels in real time. AI-powered recommendations help farmers make data-driven decisions, backed by a Spring Boot API on Oracle Autonomous Database and a React dashboard.",
    enchantments: ["Spring Boot", "React", "Oracle ATP", "Java"],
    github: "https://github.com/Feko2/AgronomAI",
  },
  {
    id: "compilador",
    name: "Phase Compiler",
    category: "potions",
    date: "2026",
    role: "Creator",
    description:
      "A phase-structured compiler for a small imperative language, running the full pipeline from lexing and parsing to AST, semantic analysis, intermediate code and execution. Generates an HTML report visualizing every stage — colored tokens, parse tree, IR, memory and program output.",
    enchantments: ["Python", "Lark", "Compilers", "AST / Interpreters"],
    github: "https://github.com/Feko2/compilador",
  },
  {
    id: "oracle-sr-scraper",
    name: "SR Scraper",
    category: "potions",
    date: "2025",
    role: "Software Engineer",
    description:
      "A resilient Oracle Fusion service-request exporter built with Playwright, reusing the browser SSO profile to automate daily CSV exports and optionally POST results to ORDS. Hardened with retry logic and robustness improvements for unattended runs.",
    enchantments: ["TypeScript", "Playwright", "Node.js", "Automation"],
    github: "https://github.com/Feko2/oracle-sr-scraper",
  },
  {
    id: "reto-ml",
    name: "NPFC Temporal Analysis",
    category: "armor",
    date: "2026",
    role: "ML Engineer",
    description:
      "A multimodal temporal analysis workspace for the NPFC cognitive-affective dataset, synchronizing EEG band powers, EDA, BVP/heart rate, temperature and facial-emotion signals. Focuses on temporal structure — transitions, lag and cross-modal agreement — over plain task classification.",
    enchantments: ["Python", "Pandas", "Signal Processing", "Jupyter"],
    github: "https://github.com/Feko2/reto-ml",
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
    github: "https://github.com/Feko2/WebPortfolio",
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
