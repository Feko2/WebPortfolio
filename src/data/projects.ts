export interface Project {
  id: string;
  name: string;
  /** Domain tags shown on cards and in the showcase (e.g. "AI", "Full Stack"). */
  tags: string[];
  date: string;
  role: string;
  /** Short one-line summary shown under the title. */
  tagline: string;
  description: string;
  /** Notable achievements / capabilities, rendered as a bullet list. */
  highlights: string[];
  enchantments: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "ophnet",
    name: "OphNet",
    tags: ["Research", "Computer Vision"],
    date: "2025 — Present",
    role: "Research Lead",
    tagline: "Computer-vision glaucoma detection for clinical screening.",
    description:
      "A computer vision–based glaucoma detection framework that formalizes supervised segmentation and geometric feature extraction for clinical risk estimation. Built in collaboration with Hospital de la Ceguera using emerging retinal imaging devices, with deployment sites reaching Mérida.",
    highlights: [
      "Lead the research effort and clinical-data architecture end to end.",
      "Supervised optic disc/cup segmentation feeding cup-to-disc ratio features.",
      "Clinical data pipelines for emerging retinal imaging hardware.",
      "Active clinical deployment beyond the lab, including a Mérida site.",
    ],
    enchantments: ["Python", "PyTorch", "Computer Vision", "Clinical Data Pipelines"],
    github: "https://github.com/Feko2/Ophnet",
  },
  {
    id: "financ-ia",
    name: "Financ.ia",
    tags: ["Full Stack", "AI"],
    date: "2026",
    role: "Creator",
    tagline: "AI market & regulatory intelligence for Mexican finance.",
    description:
      "A full-stack AI platform delivering market and regulatory intelligence for the Mexican financial ecosystem. It ingests documents from Banxico, CNBV, BMV and the DOF, then extracts structured signals through LLM-powered analysis, exposing them via a unified dashboard with semantic search and RAG-powered Q&A.",
    highlights: [
      "Market module: per-entity sentiment, risk-signal extraction by category & severity, sector heatmaps.",
      "Regulatory module: obligation extraction and an auto-built deadline calendar from CNBV/Banxico texts.",
      "Semantic search and sourced RAG answers across all documents via pgvector embeddings.",
      "6-service Docker stack — FastAPI, Celery/Redis, PostgreSQL 16, and a Next.js dashboard.",
    ],
    enchantments: ["FastAPI", "Next.js", "PostgreSQL + pgvector", "OpenAI / RAG"],
    github: "https://github.com/Feko2/financ-ia",
  },
  {
    id: "warehouse-sim",
    name: "Warehouse Automaton",
    tags: ["Machine Learning", "Simulation"],
    date: "2024",
    role: "Lead Developer",
    tagline: "Multi-agent warehouse simulation driven by Q-Learning.",
    description:
      "An autonomous multi-agent warehouse simulation in which agents learn to navigate, allocate tasks and avoid collisions. A Python reinforcement-learning backend drives the policies while a Unity 3D scene visualizes the warehouse in real time.",
    highlights: [
      "Q-Learning policies for dynamic path adjustment under changing layouts.",
      "Optimal task allocation across multiple cooperating agents.",
      "Collision-avoidance behaviour emerging from the learned policy.",
      "Python backend bridged to a real-time Unity 3D visualization.",
    ],
    enchantments: ["Python", "Unity", "Q-Learning", "C#"],
  },
  {
    id: "agronomai",
    name: "AgronomAI",
    tags: ["Full Stack", "IoT"],
    date: "2025",
    role: "Full-Stack Developer",
    tagline: "Real-time agricultural sensor monitoring with AI insights.",
    description:
      "A full-stack platform to monitor and analyze agricultural sensor data, giving farmers real-time insight into soil conditions across multiple parcels. A Spring Boot API on Oracle's Autonomous Database serves a modern React dashboard with AI-powered recommendations.",
    highlights: [
      "Tracks humidity, nitrogen and pH across multiple parcels in real time.",
      "AI-generated recommendations for data-driven crop management.",
      "Spring Boot 3 REST API persisted on Oracle Autonomous Database (ATP).",
      "React + Vite + Tailwind dashboard with Axios-driven live data.",
    ],
    enchantments: ["Spring Boot", "React", "Oracle ATP", "Java"],
    github: "https://github.com/Feko2/AgronomAI",
  },
  {
    id: "compilador",
    name: "Phase Compiler",
    tags: ["Compilers", "Tools"],
    date: "2026",
    role: "Creator",
    tagline: "A phase-by-phase compiler with a visual HTML report.",
    description:
      "A phase-structured compiler for a small imperative language (Pascal/C style), built on the Lark parser. It runs the complete pipeline from source text to execution and emits a rich HTML report that visualizes every stage of the translation.",
    highlights: [
      "Full pipeline: lexing → parsing → AST → semantics → intermediate code → execution.",
      "HTML report with colored tokens, parse tree, IR, memory state and program output.",
      "Single dependency (Lark) with an editable install and `python -m compilador` entry point.",
      "Covered by a test suite for the language's core constructs.",
    ],
    enchantments: ["Python", "Lark", "Compilers", "AST / Interpreters"],
    github: "https://github.com/Feko2/compilador",
  },
  {
    id: "oracle-sr-scraper",
    name: "SR Scraper",
    tags: ["Automation"],
    date: "2025",
    role: "Software Engineer",
    tagline: "Unattended Oracle Fusion export automation in Playwright.",
    description:
      "A resilient service-request exporter for Oracle Fusion built with Playwright and TypeScript. It handles Oracle SSO authentication, runs daily CSV exports unattended, and can optionally push results to ORDS endpoints.",
    highlights: [
      "Automates daily Oracle Fusion service-request CSV exports.",
      "Manages SSO sign-in so scheduled runs complete without manual intervention.",
      "Optional POST to ORDS (smoke test today, OAuth-ready).",
      "Hardened with retry logic and robustness fixes for unattended runs.",
    ],
    enchantments: ["TypeScript", "Playwright", "Node.js", "Automation"],
    github: "https://github.com/Feko2/oracle-sr-scraper",
  },
  {
    id: "reto-ml",
    name: "NPFC Temporal Analysis",
    tags: ["Machine Learning", "Research"],
    date: "2026",
    role: "ML Engineer",
    tagline: "Multimodal temporal analysis of cognitive-affective signals.",
    description:
      "A multimodal analysis workspace for the NPFC cognitive-affective dataset. It synchronizes physiological and behavioural streams and studies their temporal structure rather than treating task classification as the main outcome.",
    highlights: [
      "Synchronizes EEG band powers, EDA, BVP/heart rate, temperature and facial-emotion signals.",
      "Focuses on transitions, lag and cross-modal agreement over time.",
      "Reproducible pipelines for both the public teaser slice and the full dataset.",
      "Jupyter notebooks layered over a packaged, installable Python library.",
    ],
    enchantments: ["Python", "Pandas", "Signal Processing", "Jupyter"],
    github: "https://github.com/Feko2/reto-ml",
  },
  {
    id: "portfolio",
    name: "Skyrim Portfolio",
    tags: ["Web", "Frontend"],
    date: "2025",
    role: "Creator",
    tagline: "An interactive portfolio styled after Skyrim's menus.",
    description:
      "This very site — an interactive web portfolio crafted in the style of Skyrim's interface. Each section of the game's menus becomes a way to explore my work, wired together with smooth motion, ambient audio and authentic SkyUI-inspired assets.",
    highlights: [
      "Constellation skill trees, an inventory of projects, a world map of experience and a spell-book résumé.",
      "Framer Motion transitions and Howler-driven ambient audio and UI sounds.",
      "Custom SkyUI-inspired markers, frames and dividers.",
      "Static-exported Next.js, deployed to GitHub Pages.",
    ],
    enchantments: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Feko2/WebPortfolio",
  },
  {
    id: "oracle-mvp",
    name: "Ticket Forge",
    tags: ["Backend", "Enterprise"],
    date: "2024 — 2025",
    role: "Software Engineer",
    tagline: "Internal ticket-automation MVP built at Oracle.",
    description:
      "An internal ticket automation MVP built during my Oracle internship, enabling automated escalation of high-priority tickets and giving engineering teams clearer accountability through dashboards.",
    highlights: [
      "Defined the system architecture for the automation MVP.",
      "Ticket ingestion pipeline via ORDS REST APIs over a relational data model.",
      "Automated escalation rules for high-priority tickets.",
      "Oracle APEX dashboards for engineer accountability.",
    ],
    enchantments: ["Oracle APEX", "ORDS", "SQL", "REST APIs"],
  },
];
