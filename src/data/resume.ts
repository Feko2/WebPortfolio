/**
 * Parchment CV (West / “Magic” section): biographical entries with optional
 * deep-links to the world map (`src/data/locations.ts`) and project inventory (`src/data/projects.ts`).
 */

export interface ParchmentLink {
  /** Short label shown on the button */
  label: string;
  /** When set, navigates to Map and focuses this location id */
  mapLocationId?: string;
  /** When set, navigates to Items and selects this project id */
  projectId?: string;
}

export interface ParchmentEntry {
  id: string;
  title: string;
  body: string;
  period?: string;
  links?: ParchmentLink[];
}

export interface ParchmentSection {
  id: string;
  title: string;
  subtitle?: string;
  entries: ParchmentEntry[];
}

export const parchmentSections: ParchmentSection[] = [
  {
    id: "community",
    title: "Community & outreach",
    subtitle: "Monterrey — inclusion, astronomy, and science communication",
    entries: [
      {
        id: "inclusion-camp",
        title: "Inclusion camp — staff & handler",
        period: "Monterrey",
        body:
          "Served as staff and handler at an inclusion camp for children and adults with intellectual disabilities and autism, supporting participants through activities and ensuring a safe, welcoming environment.",
        links: [{ label: "View on map — Monterrey (Tec)", mapLocationId: "tec" }],
      },
      {
        id: "satem",
        title: "SATEM — vice president (marketing & events)",
        period: "Tec de Monterrey · Astronomical Society",
        body:
          "Vice president of SATEM, Tec de Monterrey’s astronomical society, leading marketing and event organization for talks, observations, and society initiatives.",
        links: [{ label: "View on map — Monterrey (Tec)", mapLocationId: "tec" }],
      },
      {
        id: "quasar",
        title: "Quasar scientific journal",
        period: "Tec de Monterrey",
        body:
          "Published in Quasar, the largest scientific journal at Tecnológico de Monterrey, contributing to peer-facing science communication on campus.",
        links: [{ label: "View on map — Monterrey (Tec)", mapLocationId: "tec" }],
      },
      {
        id: "cosmonautas",
        title: "Cosmonautas — astronomy & physics instruction",
        period: "Elementary & middle school · Monterrey",
        body:
          "Prepared and delivered astronomy and physics lessons for the Cosmonautas program, introducing scientific ideas to elementary and middle school students. Work tied to SATEM’s outreach mission in Monterrey.",
        links: [{ label: "View on map — Monterrey (Tec)", mapLocationId: "tec" }],
      },
    ],
  },
  {
    id: "recognition",
    title: "Recognition",
    subtitle: "Industry award",
    entries: [
      {
        id: "ikusi-velatia",
        title: "Ikusi Velatia — best network infrastructure (mid-sized company)",
        period: "Monterrey",
        body:
          "Recognized by Ikusi Velatia for creating the best-built network infrastructure for a mid-sized company — enterprise-grade design and implementation.",
        links: [{ label: "View on map — Monterrey (Tec)", mapLocationId: "tec" }],
      },
    ],
  },
  {
    id: "work-research",
    title: "Work & research",
    subtitle: "Internships and research across Mexico",
    entries: [
      {
        id: "oracle-intern",
        title: "Oracle — software engineering internship",
        period: "Zapopan, Jalisco",
        body:
          "Software internship at Oracle: architecture and delivery for internal tooling — ticket automation, ORDS REST APIs, and Oracle APEX dashboards.",
        links: [
          { label: "View on map — Zapopan (Oracle)", mapLocationId: "oracle" },
          { label: "Project details — Ticket Forge", projectId: "oracle-mvp" },
        ],
      },
      {
        id: "ophnet",
        title: "OphNet — glaucoma diagnostic research",
        period: "Ciudad de México · Mérida",
        body:
          "Research on a computer vision–based glaucoma detection framework: clinical data pipelines and deployment collaboration between CDMX and Mérida.",
        links: [
          { label: "View on map — CDMX (lab)", mapLocationId: "ophnet" },
          { label: "View on map — Mérida (clinic)", mapLocationId: "ophnet-merida" },
          { label: "Project details — OphNet", projectId: "ophnet" },
        ],
      },
    ],
  },
];
