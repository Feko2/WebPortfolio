export interface SkillNode {
  x: number;
  y: number;
  label: string;
}

/** A symbol is drawn as a set of stroked polylines (in the 800x500 viewBox). */
export type GlyphPolyline = [number, number][];

export interface SkillCategory {
  id: string;
  name: string;
  level: number;
  description: string;
  /** Flavor name of what the constellation depicts, e.g. "the Serpent". */
  symbolLabel: string;
  /** Faint icon revealed behind the constellation (polylines, 800x500 space). */
  glyph: GlyphPolyline[];
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
    symbolLabel: "the Serpent",
    glyph: [
      [[289,322],[284,310],[280,298],[278,286],[277,273],[277,261],[278,248],[280,236],[284,225],[289,213],[295,203],[301,193],[309,184],[318,176],[327,169],[337,163],[347,158],[358,154],[369,151],[380,149],[391,149],[402,149],[413,151],[423,154],[433,157],[443,162],[452,168],[460,174],[468,181],[474,189],[480,197],[485,206],[489,215],[492,225],[494,234],[495,244],[495,254],[494,263],[492,272],[489,281],[486,290],[481,298],[476,305],[470,312],[464,318],[457,324],[449,328],[442,332],[434,335],[425,337],[417,338],[409,339],[401,338],[393,337],[385,335],[378,332],[371,329],[364,325],[358,320],[353,315],[348,309],[344,303],[340,297],[337,290],[335,283],[334,276],[333,270],[333,263],[334,256],[336,250],[338,243]],
      [[289,322],[255,310],[259,336],[289,322]],
      [[255,323],[235,315]],
      [[255,324],[235,331]],
    ],
    constellation: [
      { x: 289, y: 322, label: "Core" },
      { x: 301, y: 193, label: "PyTorch" },
      { x: 402, y: 149, label: "scikit-learn" },
      { x: 489, y: 215, label: "NLTK" },
      { x: 476, y: 305, label: "LangGraph" },
      { x: 409, y: 339, label: "Data Pipelines" },
      { x: 348, y: 309, label: "Computer Vision" },
      { x: 338, y: 243, label: "Automation" },
    ],
    connections: [[0, 1],[1, 2],[2, 3],[3, 4],[4, 5],[5, 6],[6, 7]],
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 80,
    description:
      "The versatile tongue of the web — from reactive frontends to server-side conjuration, powering interactive experiences and real-time applications.",
    symbolLabel: "the Bolt",
    glyph: [
      [[440,95],[360,255],[412,255],[372,405],[478,233],[420,233],[452,120],[440,95]],
    ],
    constellation: [
      { x: 440, y: 95, label: "Core" },
      { x: 360, y: 255, label: "React" },
      { x: 412, y: 255, label: "Next.js" },
      { x: 372, y: 405, label: "TypeScript" },
      { x: 478, y: 233, label: "Node.js" },
      { x: 420, y: 233, label: "Framer Motion" },
      { x: 452, y: 120, label: "REST APIs" },
    ],
    connections: [[0, 1],[1, 2],[2, 3],[3, 4],[4, 5],[5, 6],[6, 0]],
  },
  {
    id: "csharp",
    name: "C# & C++",
    level: 72,
    description:
      "The twin disciplines of systems and simulation — forging game engines, 3D environments, and high-performance applications in Unity and .NET.",
    symbolLabel: "the Rocket",
    glyph: [
      [[400,100],[442,165],[442,330],[360,330],[360,165],[400,100]],
      [[442,300],[478,362],[442,335]],
      [[360,300],[322,362],[360,335]],
      [[378,330],[400,388],[422,330]],
      [[423,205],[422,210],[420,215],[417,220],[413,223],[409,226],[404,227],[398,227],[393,226],[389,223],[385,220],[382,215],[380,210],[379,205],[380,200],[382,195],[385,190],[389,187],[393,184],[398,183],[404,183],[409,184],[413,187],[417,190],[420,195],[422,200],[423,205]],
    ],
    constellation: [
      { x: 400, y: 103, label: "C#" },
      { x: 442, y: 168, label: "Unity" },
      { x: 360, y: 168, label: ".NET" },
      { x: 442, y: 328, label: "Simulation" },
      { x: 360, y: 328, label: "C++" },
      { x: 476, y: 360, label: "OOP" },
      { x: 400, y: 386, label: "Game Systems" },
    ],
    connections: [[0, 1],[0, 2],[1, 3],[2, 4],[3, 5],[3, 6],[4, 6]],
  },
  {
    id: "ai-ml",
    name: "AI & ML",
    level: 82,
    description:
      "The arcane school of artificial intelligence — training models to see, learn, and reason through deep learning, reinforcement learning, and multi-agent orchestration.",
    symbolLabel: "the Mind",
    glyph: [
      [[345,215],[352,175],[385,158],[401,180],[417,158],[450,175],[462,215],[470,255],[452,300],[412,322],[401,300],[390,322],[350,300],[332,255],[345,215]],
      [[401,180],[401,300]],
    ],
    constellation: [
      { x: 401, y: 178, label: "Deep Learning" },
      { x: 352, y: 200, label: "PyTorch" },
      { x: 450, y: 200, label: "Computer Vision" },
      { x: 335, y: 258, label: "Q-Learning" },
      { x: 467, y: 258, label: "LangGraph" },
      { x: 372, y: 312, label: "NLP" },
      { x: 430, y: 312, label: "scikit-learn" },
      { x: 401, y: 300, label: "Multi-Agent" },
    ],
    connections: [[0, 1],[0, 2],[1, 3],[2, 4],[3, 5],[4, 6],[5, 7],[6, 7],[0, 7]],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    level: 74,
    description:
      "The craft of infrastructure and deployment — orchestrating services across Oracle Cloud and Google Cloud, with automated pipelines and API-driven architectures.",
    symbolLabel: "the Sky",
    glyph: [
      [[341,314],[336,313],[332,312],[327,310],[323,308],[319,305],[315,301],[312,298],[309,294],[307,289],[305,285],[304,280],[303,275],[303,270],[304,265],[305,260],[306,256],[308,251],[311,247],[314,243],[318,240],[322,237],[326,235],[331,233],[335,231],[340,230],[345,230],[326,233],[327,228],[329,222],[331,216],[333,211],[337,206],[341,202],[345,198],[350,194],[355,191],[361,189],[366,187],[372,186],[378,186],[384,186],[390,187],[395,189],[401,191],[406,194],[411,198],[415,202],[419,206],[423,211],[425,216],[427,222],[429,228],[430,233],[400,223],[402,219],[405,215],[408,211],[411,208],[414,205],[418,203],[422,201],[426,199],[430,198],[435,197],[439,196],[444,196],[448,196],[452,197],[457,198],[461,200],[465,202],[469,204],[472,207],[475,210],[478,214],[481,217],[483,221],[485,225],[486,230],[487,234],[475,240],[479,241],[483,242],[486,243],[490,245],[493,247],[496,250],[499,253],[501,256],[503,260],[504,264],[505,268],[506,271],[506,275],[506,279],[505,283],[503,287],[502,291],[499,294],[497,297],[494,300],[491,302],[487,304],[484,306],[480,307],[476,308],[472,308],[338,312],[472,308]],
    ],
    constellation: [
      { x: 332, y: 300, label: "OCI" },
      { x: 320, y: 255, label: "Google Cloud" },
      { x: 362, y: 220, label: "ORDS" },
      { x: 410, y: 205, label: "REST APIs" },
      { x: 455, y: 218, label: "Oracle APEX" },
      { x: 492, y: 260, label: "Git" },
      { x: 470, y: 300, label: "Postman" },
    ],
    connections: [[0, 1],[1, 2],[2, 3],[3, 4],[4, 5],[5, 6],[6, 0]],
  },
  {
    id: "databases",
    name: "Databases",
    level: 78,
    description:
      "The knowledge of data preservation — designing relational schemas, optimizing queries, and modeling data across Oracle, MySQL, and SQL Server.",
    symbolLabel: "the Vault",
    glyph: [
      [[475,180],[473,185],[468,190],[459,195],[447,199],[433,202],[417,203],[400,204],[383,203],[367,202],[353,199],[341,195],[332,190],[327,185],[325,180],[327,175],[332,170],[341,165],[353,161],[367,158],[383,157],[400,156],[417,157],[433,158],[447,161],[459,165],[468,170],[473,175],[475,180]],
      [[325,180],[325,330]],
      [[475,180],[475,330]],
      [[475,330],[474,334],[471,337],[467,341],[461,344],[453,347],[444,349],[434,351],[423,353],[412,354],[400,354],[388,354],[377,353],[366,351],[356,349],[347,347],[339,344],[333,341],[329,337],[326,334],[325,330]],
      [[475,240],[474,244],[471,247],[467,251],[461,254],[453,257],[444,259],[434,261],[423,263],[412,264],[400,264],[388,264],[377,263],[366,261],[356,259],[347,257],[339,254],[333,251],[329,247],[326,244],[325,240]],
      [[475,285],[474,289],[471,292],[467,296],[461,299],[453,302],[444,304],[434,306],[423,308],[412,309],[400,309],[388,309],[377,308],[366,306],[356,304],[347,302],[339,299],[333,296],[329,292],[326,289],[325,285]],
    ],
    constellation: [
      { x: 330, y: 168, label: "SQL" },
      { x: 470, y: 168, label: "Oracle DB" },
      { x: 400, y: 210, label: "MySQL" },
      { x: 325, y: 300, label: "SQL Server" },
      { x: 475, y: 300, label: "Data Modeling" },
      { x: 400, y: 348, label: "APEX Dashboards" },
    ],
    connections: [[0, 2],[2, 1],[0, 3],[1, 4],[3, 5],[4, 5]],
  },
  {
    id: "java-r",
    name: "Java & R",
    level: 62,
    description:
      "The classical languages of academia — Java for rigorous object-oriented design and algorithms, R for statistical analysis and research computation.",
    symbolLabel: "the Chalice",
    glyph: [
      [[335,200],[350,340],[450,340],[465,200],[335,200]],
      [[482,226],[477,223],[472,222],[466,221],[461,221],[456,222],[450,224],[446,227],[441,230],[438,235],[435,239],[433,244],[431,250],[431,255],[431,260],[433,266],[435,271],[438,275],[441,280],[446,283],[450,286],[456,288],[461,289],[466,289],[472,288],[477,287],[482,284]],
      [[375,170],[385,150],[375,130]],
      [[415,170],[425,150],[415,130]],
    ],
    constellation: [
      { x: 335, y: 205, label: "Java" },
      { x: 465, y: 205, label: "OOP" },
      { x: 497, y: 252, label: "Algorithms" },
      { x: 352, y: 335, label: "R" },
      { x: 448, y: 335, label: "Statistics" },
    ],
    connections: [[0, 1],[0, 3],[1, 4],[3, 4],[1, 2]],
  },
  {
    id: "frontend",
    name: "Frontend",
    level: 80,
    description:
      "The school of illusion and craft — shaping pixels into immersive interfaces through responsive design, animation, and modern component architectures.",
    symbolLabel: "the Window",
    glyph: [
      [[310,160],[490,160],[490,350],[310,350],[310,160]],
      [[310,195],[490,195]],
      [[336,177],[336,178],[335,180],[334,181],[333,182],[332,183],[331,183],[329,183],[328,183],[327,182],[326,181],[325,180],[324,178],[324,177],[324,176],[325,174],[326,173],[327,172],[328,171],[329,171],[331,171],[332,171],[333,172],[334,173],[335,174],[336,176],[336,177]],
      [[358,177],[358,178],[357,180],[356,181],[355,182],[354,183],[353,183],[351,183],[350,183],[349,182],[348,181],[347,180],[346,178],[346,177],[346,176],[347,174],[348,173],[349,172],[350,171],[351,171],[353,171],[354,171],[355,172],[356,173],[357,174],[358,176],[358,177]],
      [[380,177],[380,178],[379,180],[378,181],[377,182],[376,183],[375,183],[373,183],[372,183],[371,182],[370,181],[369,180],[368,178],[368,177],[368,176],[369,174],[370,173],[371,172],[372,171],[373,171],[375,171],[376,171],[377,172],[378,173],[379,174],[380,176],[380,177]],
    ],
    constellation: [
      { x: 310, y: 160, label: "React" },
      { x: 490, y: 160, label: "Next.js" },
      { x: 490, y: 350, label: "Tailwind CSS" },
      { x: 310, y: 350, label: "TypeScript" },
      { x: 310, y: 196, label: "Framer Motion" },
      { x: 490, y: 196, label: "Responsive" },
      { x: 400, y: 275, label: "CSS & SVG" },
    ],
    connections: [[0, 1],[1, 2],[2, 3],[3, 0],[4, 5],[4, 6],[6, 5]],
  },
];
