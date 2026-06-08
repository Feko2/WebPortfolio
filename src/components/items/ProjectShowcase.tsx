"use client";

import { motion } from "framer-motion";
import { Project, categoryLabels } from "@/data/projects";
import { ProjectBanner } from "./ProjectBanner";
import { NordicKnot } from "@/components/ui/SkyFrame";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const easing = [0.16, 1, 0.3, 1] as const;

function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group hidden md:flex items-center gap-2 cursor-pointer
        text-foreground/25 hover:text-foreground/60 transition-colors duration-200
        ${direction === "next" ? "flex-row-reverse" : ""}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-200 ${
          direction === "prev" ? "group-hover:-translate-x-0.5" : "rotate-180 group-hover:translate-x-0.5"
        }`}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="font-skyrim text-[9px] tracking-[0.25em] uppercase">{label}</span>
    </button>
  );
}

export function ProjectShowcase({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: ProjectShowcaseProps) {
  const categoryMeaning =
    categoryLabels[project.category].split("(")[1]?.replace(")", "") ?? project.category;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: easing }}
      className="absolute inset-0 flex flex-col"
    >
      {/* Spacer to clear the fixed TopBar */}
      <div className="shrink-0 h-[56px]" />

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="max-w-3xl mx-auto px-6 lg:px-0 pb-16 pt-2">
          {/* Breadcrumb / return control */}
          <button
            onClick={onClose}
            className="cursor-pointer flex items-center gap-2 mb-6 text-foreground/30
              hover:text-foreground/55 transition-colors duration-200"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-skyrim text-[10px] tracking-[0.2em] uppercase">
              Projects
            </span>
          </button>

          {/* Hero banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease: easing }}
            className="w-full aspect-[16/8] mb-8 relative"
          >
            <ProjectBanner category={project.category} />

            {/* Index + category overlay */}
            <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
              <span className="font-skyrim text-[10px] tracking-[0.3em] text-foreground/45 bg-black/30 backdrop-blur-[2px] px-2.5 py-1">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-sky-400/60 font-skyrim bg-black/30 backdrop-blur-[2px] px-2.5 py-1">
                {categoryMeaning}
              </span>
            </div>
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: easing }}
          >
            <h1 className="font-skyrim text-3xl lg:text-4xl tracking-[0.16em] text-foreground/90 leading-tight mb-2">
              {project.name}
            </h1>
            <p className="text-sm text-foreground/45 italic mb-7 max-w-xl">
              {project.tagline}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-10 mb-7 pb-7 border-b border-foreground/[0.06]">
              <div>
                <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
                  Date
                </span>
                <span className="font-skyrim text-base text-foreground/65">{project.date}</span>
              </div>
              <MidStat />
              <div>
                <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
                  Role
                </span>
                <span className="font-skyrim text-base text-foreground/65">{project.role}</span>
              </div>
              <MidStat />
              <div>
                <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
                  Type
                </span>
                <span className="font-skyrim text-base text-foreground/65">{categoryMeaning}</span>
              </div>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: easing }}
          >
            <SectionLabel>The Project</SectionLabel>
            <p className="text-[14px] text-foreground/55 leading-[1.8] mb-9 max-w-2xl">
              {project.description}
            </p>

            <SectionLabel>Key Contributions</SectionLabel>
            <ul className="mb-9 space-y-3 max-w-2xl">
              {project.highlights.map((point) => (
                <li key={point} className="flex gap-3.5 items-start">
                  <span className="mt-[7px] w-1.5 h-1.5 rotate-45 bg-sky-400/45 shrink-0" />
                  <span className="text-[13px] text-foreground/50 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <SectionLabel>Enchantments</SectionLabel>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.enchantments.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-3 py-1.5 border border-sky-500/15 text-sky-400/55
                    bg-sky-500/[0.03] tracking-wider font-skyrim"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action links */}
            {(project.demo || project.github) && (
              <div className="flex gap-4 mb-14">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-skyrim text-[11px] tracking-[0.2em] px-6 py-2.5
                      border border-foreground/15 text-foreground/55
                      hover:bg-foreground/5 hover:border-foreground/25 hover:text-foreground/75
                      transition-all duration-300"
                  >
                    Equip (Demo)
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-skyrim text-[11px] tracking-[0.2em] px-6 py-2.5
                      border border-foreground/8 text-foreground/35
                      hover:text-foreground/55 hover:border-foreground/18
                      transition-all duration-300"
                  >
                    Inspect (GitHub)
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-foreground/[0.06]">
            <NavArrow direction="prev" onClick={onPrev} label="Previous" />
            <NordicKnot size={14} className="text-foreground/10" />
            <NavArrow direction="next" onClick={onNext} label="Next" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MidStat() {
  return <div className="w-px h-7 bg-foreground/[0.07]" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-skyrim text-[10px] tracking-[0.25em] uppercase text-foreground/35">
        {children}
      </span>
      <div className="flex-1 h-px bg-foreground/[0.05]" />
    </div>
  );
}
