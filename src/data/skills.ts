export interface SkillNode {
  x: number;
  y: number;
  label: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  level: number;
  description: string;
  constellation: SkillNode[];
  connections: [number, number][];
}

export const skills: SkillCategory[] = [
  {
    id: "python",
    name: "Python",
    level: 88,
    description:
      "The ancient language of serpentine logic — wielded for machine learning, computer vision pipelines, data engineering, and autonomous agent systems.",
    constellation: [
      { x: 400, y: 100, label: "Core" },
      { x: 280, y: 190, label: "PyTorch" },
      { x: 520, y: 190, label: "scikit-learn" },
      { x: 220, y: 290, label: "NLTK" },
      { x: 400, y: 270, label: "LangGraph" },
      { x: 580, y: 290, label: "Data Pipelines" },
      { x: 310, y: 380, label: "Computer Vision" },
      { x: 490, y: 380, label: "Automation" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7],
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 80,
    description:
      "The versatile tongue of the web — from reactive frontends to server-side conjuration, powering interactive experiences and real-time applications.",
    constellation: [
      { x: 400, y: 110, label: "Core" },
      { x: 300, y: 200, label: "React" },
      { x: 500, y: 200, label: "Next.js" },
      { x: 250, y: 300, label: "TypeScript" },
      { x: 400, y: 290, label: "Node.js" },
      { x: 550, y: 300, label: "Framer Motion" },
      { x: 400, y: 390, label: "REST APIs" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6],
    ],
  },
  {
    id: "csharp",
    name: "C# & C++",
    level: 72,
    description:
      "The twin disciplines of systems and simulation — forging game engines, 3D environments, and high-performance applications in Unity and .NET.",
    constellation: [
      { x: 400, y: 120, label: "C#" },
      { x: 300, y: 220, label: "Unity" },
      { x: 500, y: 220, label: ".NET" },
      { x: 250, y: 320, label: "Simulation" },
      { x: 400, y: 310, label: "C++" },
      { x: 550, y: 320, label: "OOP" },
      { x: 400, y: 400, label: "Game Systems" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [5, 6],
    ],
  },
  {
    id: "ai-ml",
    name: "AI & ML",
    level: 82,
    description:
      "The arcane school of artificial intelligence — training models to see, learn, and reason through deep learning, reinforcement learning, and multi-agent orchestration.",
    constellation: [
      { x: 400, y: 100, label: "Deep Learning" },
      { x: 280, y: 200, label: "PyTorch" },
      { x: 520, y: 200, label: "Computer Vision" },
      { x: 220, y: 310, label: "Q-Learning" },
      { x: 400, y: 280, label: "LangGraph" },
      { x: 580, y: 310, label: "NLP" },
      { x: 310, y: 390, label: "scikit-learn" },
      { x: 490, y: 390, label: "Multi-Agent" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7],
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    level: 74,
    description:
      "The craft of infrastructure and deployment — orchestrating services across Oracle Cloud and Google Cloud, with automated pipelines and API-driven architectures.",
    constellation: [
      { x: 400, y: 130, label: "OCI" },
      { x: 300, y: 220, label: "Google Cloud" },
      { x: 500, y: 220, label: "ORDS" },
      { x: 250, y: 320, label: "REST APIs" },
      { x: 400, y: 310, label: "Oracle APEX" },
      { x: 550, y: 320, label: "Git" },
      { x: 400, y: 400, label: "Postman" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6],
    ],
  },
  {
    id: "databases",
    name: "Databases",
    level: 78,
    description:
      "The knowledge of data preservation — designing relational schemas, optimizing queries, and modeling data across Oracle, MySQL, and SQL Server.",
    constellation: [
      { x: 400, y: 120, label: "SQL" },
      { x: 300, y: 220, label: "Oracle DB" },
      { x: 500, y: 220, label: "MySQL" },
      { x: 350, y: 330, label: "SQL Server" },
      { x: 450, y: 330, label: "Data Modeling" },
      { x: 400, y: 410, label: "APEX Dashboards" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5], [1, 2],
    ],
  },
  {
    id: "java-r",
    name: "Java & R",
    level: 62,
    description:
      "The classical languages of academia — Java for rigorous object-oriented design and algorithms, R for statistical analysis and research computation.",
    constellation: [
      { x: 400, y: 140, label: "Java" },
      { x: 320, y: 250, label: "OOP" },
      { x: 480, y: 250, label: "Algorithms" },
      { x: 350, y: 350, label: "R" },
      { x: 450, y: 350, label: "Statistics" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4],
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    level: 80,
    description:
      "The school of illusion and craft — shaping pixels into immersive interfaces through responsive design, animation, and modern component architectures.",
    constellation: [
      { x: 400, y: 110, label: "React" },
      { x: 300, y: 200, label: "Next.js" },
      { x: 500, y: 200, label: "Tailwind CSS" },
      { x: 250, y: 300, label: "TypeScript" },
      { x: 400, y: 290, label: "Framer Motion" },
      { x: 550, y: 300, label: "Responsive" },
      { x: 400, y: 380, label: "CSS & SVG" },
    ],
    connections: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [5, 6],
    ],
  },
];
