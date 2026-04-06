export interface Location {
  id: string;
  name: string;
  type: "education" | "work" | "project";
  city: string;
  x: number;
  y: number;
  title: string;
  period: string;
  description: string;
}

/**
 * Positions are percentages (0–100) on `public/images/mexico-map.png`, origin top-left.
 * Calibrated for: Monterrey NE, Zapopan/Guadalajara west-central, CDMX central, Mérida on northern Yucatán.
 */
export const locations: Location[] = [
  {
    id: "tec",
    name: "Tecnológico de Monterrey",
    type: "education",
    city: "Monterrey, NL",
    x: 54,
    y: 23,
    title: "B.S. Computer Technologies Engineering",
    period: "August 2022 - June 2026",
    description:
      "Studying Software Architecture, Data Structures & Advanced Algorithms, and Software Systems Development. GPA 90.12/100. For the multi-agent warehouse simulation and other projects built at Tec, open Items (compass East). For education and experience in résumé form, open Magic (compass West).",
  },
  {
    id: "oracle",
    name: "Oracle",
    type: "work",
    city: "Zapopan, JAL",
    x: 37,
    y: 48,
    title: "Software Engineering Intern",
    period: "February 2025 - February 2026",
    description:
      "Defined system architecture for a ticket automation MVP. Built ingestion pipelines with ORDS REST APIs and Oracle APEX dashboards for engineer accountability.",
  },
  {
    id: "ophnet",
    name: "OphNet Research Lab",
    type: "project",
    city: "Ciudad de México, CDMX",
    x: 50,
    y: 53,
    title: "Glaucoma Diagnostic Research Lead",
    period: "August 2025 - Present",
    description:
      "Leading a computer vision–based glaucoma detection framework in collaboration with Hospital de la Ceguera, building clinical data pipelines for retinal imaging devices.",
  },
  {
    id: "ophnet-merida",
    name: "OphNet Clinic",
    type: "project",
    city: "Mérida, YUC",
    x: 77,
    y: 36,
    title: "Clinical Deployment — OphNet",
    period: "August 2025 - Present",
    description:
      "Deployment site for the OphNet glaucoma detection framework. Clinical data pipelines and retinal imaging services in active use.",
  },
];

export const paths: [string, string][] = [
  ["tec", "oracle"],
  ["tec", "ophnet"],
  ["oracle", "ophnet"],
  ["ophnet", "ophnet-merida"],
];
