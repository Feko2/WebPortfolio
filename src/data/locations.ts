export interface Location {
  id: string;
  name: string;
  type: "education" | "work" | "project";
  x: number;
  y: number;
  title: string;
  period: string;
  description: string;
}

export const locations: Location[] = [
  {
    id: "tec",
    name: "Tecnológico de Monterrey",
    type: "education",
    x: 42,
    y: 38,
    title: "B.S. Computer Technologies Engineering",
    period: "August 2022 - June 2026",
    description:
      "Studying Software Architecture, Data Structures & Advanced Algorithms, and Software Systems Development. GPA 90.12/100.",
  },
  {
    id: "oracle",
    name: "Oracle",
    type: "work",
    x: 62,
    y: 32,
    title: "Software Engineering Intern",
    period: "February 2025 - February 2026",
    description:
      "Defined system architecture for a ticket automation MVP. Built ingestion pipelines with ORDS REST APIs and Oracle APEX dashboards for engineer accountability.",
  },
  {
    id: "ophnet",
    name: "OphNet Research Lab",
    type: "project",
    x: 35,
    y: 58,
    title: "Glaucoma Diagnostic Research Lead",
    period: "August 2025 - Present",
    description:
      "Leading a computer vision–based glaucoma detection framework in collaboration with Hospital de la Ceguera, building clinical data pipelines for retinal imaging devices.",
  },
  {
    id: "astro-society",
    name: "Astronomical Society",
    type: "project",
    x: 55,
    y: 55,
    title: "Vice President",
    period: "February 2024 - January 2025",
    description:
      "Led the society at Tecnológico de Monterrey. Coordinated the Cosmonauts project teaching astronomy to 50+ students. Supervised Quasar, the university's largest scientific magazine.",
  },
  {
    id: "warehouse-sim",
    name: "Simulation Lab",
    type: "project",
    x: 72,
    y: 52,
    title: "Multi-Agent Warehouse Simulation",
    period: "August 2024 - December 2024",
    description:
      "Designed Q-Learning policies for autonomous warehouse robots. Built the simulation in Python and Unity with path-learning algorithms for optimal task handling.",
  },
];

export const paths: [string, string][] = [
  ["tec", "oracle"],
  ["tec", "ophnet"],
  ["tec", "astro-society"],
  ["tec", "warehouse-sim"],
  ["oracle", "ophnet"],
  ["astro-society", "warehouse-sim"],
];
