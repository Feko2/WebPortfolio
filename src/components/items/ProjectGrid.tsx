"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export function ProjectGrid({ projects, onSelect }: ProjectGridProps) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-1 py-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-foreground/[0.05]">
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.035, duration: 0.3 }}
              onClick={() => onSelect(project)}
              className="group relative text-left bg-[#0a0a0a] px-6 py-6 cursor-pointer
                transition-colors duration-200 hover:bg-foreground/[0.02] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-skyrim text-[10px] tracking-[0.25em] text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[8px] tracking-[0.12em] uppercase text-sky-400/40 font-skyrim truncate max-w-[60%] text-right">
                  {project.tags.join(" · ")}
                </span>
              </div>

              <h3 className="font-skyrim text-lg tracking-[0.12em] text-foreground/75 leading-snug mb-2
                group-hover:text-foreground/95 transition-colors duration-200">
                {project.name}
              </h3>
              <p className="text-[12px] text-foreground/40 italic leading-relaxed mb-6 flex-1">
                {project.tagline}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-foreground/[0.05]">
                <span className="text-[9px] tracking-[0.18em] text-foreground/25 uppercase">
                  {project.date}
                </span>
                <span
                  className="font-skyrim text-[9px] tracking-[0.2em] uppercase text-foreground/20
                    group-hover:text-foreground/55 group-hover:translate-x-0.5
                    transition-all duration-200 flex items-center gap-1.5"
                >
                  Inspect
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
