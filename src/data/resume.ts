export interface SpellEntry {
  id: string;
  name: string;
  description: string;
  level?: string;
}

export interface SpellSchool {
  id: string;
  name: string;
  skyrimName: string;
  icon: string;
  entries: SpellEntry[];
}

export const spellSchools: SpellSchool[] = [
  {
    id: "destruction",
    name: "Technical Skills",
    skyrimName: "Destruction",
    icon: "🔥",
    entries: [
      { id: "ts1", name: "Python", description: "Machine learning, computer vision pipelines, data engineering, and automation scripting", level: "Expert" },
      { id: "ts2", name: "JavaScript & TypeScript", description: "React, Next.js, Node.js — full-stack web development with type-safe architectures", level: "Advanced" },
      { id: "ts3", name: "C# & C++", description: "Unity game engine, .NET framework, simulation systems, and high-performance applications", level: "Advanced" },
      { id: "ts4", name: "AI & Machine Learning", description: "PyTorch, scikit-learn, LangGraph, NLTK — deep learning, NLP, and multi-agent systems", level: "Expert" },
      { id: "ts5", name: "Cloud & Infrastructure", description: "Oracle Cloud (OCI), Google Cloud, ORDS REST APIs, Oracle APEX dashboards", level: "Advanced" },
      { id: "ts6", name: "Databases", description: "Oracle Database, MySQL, Microsoft SQL Server — relational modeling and query optimization", level: "Advanced" },
      { id: "ts7", name: "Java & R", description: "Object-oriented design, algorithms, statistical analysis, and research computation", level: "Intermediate" },
    ],
  },
  {
    id: "restoration",
    name: "Education",
    skyrimName: "Restoration",
    icon: "✨",
    entries: [
      {
        id: "ed1",
        name: "B.S. Computer Technologies Engineering",
        description: "Instituto Tecnológico de Estudios Superiores de Monterrey — GPA 90.12/100. Courses in Software Architecture, Data Structures & Advanced Algorithms, and Software Systems Development.",
        level: "2022 - 2026",
      },
    ],
  },
  {
    id: "alteration",
    name: "Work Experience",
    skyrimName: "Alteration",
    icon: "🔮",
    entries: [
      {
        id: "we1",
        name: "Oracle — Software Engineering Intern",
        description: "Defined system architecture for an internal ticket automation MVP. Implemented ticket ingestion pipeline using ORDS REST APIs with rule-based escalation logic. Designed relational data models and built Oracle APEX dashboards for team accountability.",
        level: "Feb 2025 - Feb 2026",
      },
    ],
  },
  {
    id: "conjuration",
    name: "Notable Projects",
    skyrimName: "Conjuration",
    icon: "👻",
    entries: [
      {
        id: "np1",
        name: "OphNet — Glaucoma Diagnostic Research",
        description: "Lead development of a computer vision–based glaucoma detection framework. Built a clinical data ingestion pipeline in collaboration with Hospital de la Ceguera for structured dataset construction from retinal imaging devices.",
        level: "Aug 2025 - Present",
      },
      {
        id: "np2",
        name: "Multi-Agent Warehouse Simulation",
        description: "Designed a Q-Learning policy for robots to dynamically adjust paths and optimize task allocation. Built an autonomous warehouse simulation using Python and Unity with collision avoidance.",
        level: "Aug 2024 - Dec 2024",
      },
      {
        id: "np3",
        name: "Skyrim Portfolio",
        description: "This interactive web portfolio — a creative experience inspired by The Elder Scrolls V: Skyrim, featuring constellation skill trees, an inventory of projects, and a spell book resume.",
        level: "2026",
      },
    ],
  },
  {
    id: "illusion",
    name: "Leadership & Activities",
    skyrimName: "Illusion",
    icon: "👁️",
    entries: [
      {
        id: "la1",
        name: "Vice President — Astronomical Society",
        description: "Led the Astronomical Society at Tecnológico de Monterrey. Coordinated and taught the Cosmonauts project, delivering astronomy classes to 50+ students.",
        level: "Feb 2024 - Jan 2025",
      },
      {
        id: "la2",
        name: "Quasar Scientific Magazine",
        description: "Supervisor and collaborator of Quasar, the largest scientific magazine at Tecnológico de Monterrey.",
        level: "2024 - 2025",
      },
    ],
  },
  {
    id: "enchanting",
    name: "Languages",
    skyrimName: "Enchanting",
    icon: "💎",
    entries: [
      { id: "lg1", name: "Spanish", description: "Native speaker", level: "Native" },
      { id: "lg2", name: "English", description: "Full professional proficiency — C2 Advanced certification", level: "C2 Advanced" },
    ],
  },
];
