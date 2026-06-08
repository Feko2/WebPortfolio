"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { CategoryList, FilterCategory } from "./CategoryList";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectShowcase } from "./ProjectShowcase";
import { InventoryBar } from "./InventoryBar";

export type InventoryViewProps = {
  initialProjectId?: string | null;
  onInitialProjectConsumed?: () => void;
};

export function InventoryView({
  initialProjectId,
  onInitialProjectConsumed,
}: InventoryViewProps = {}) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  // The showcase navigates within whichever list is currently in view —
  // the filtered list if the selection belongs to it, otherwise the full set.
  const navList = useMemo(() => {
    if (selectedProject && filteredProjects.some((p) => p.id === selectedProject.id)) {
      return filteredProjects;
    }
    return projects;
  }, [filteredProjects, selectedProject]);

  const navIndex = selectedProject
    ? navList.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const openProject = useCallback((project: Project) => setSelectedId(project.id), []);
  const closeProject = useCallback(() => setSelectedId(null), []);

  const stepProject = useCallback(
    (delta: 1 | -1) => {
      if (navIndex === -1 || navList.length === 0) return;
      const next = (navIndex + delta + navList.length) % navList.length;
      setSelectedId(navList[next].id);
    },
    [navIndex, navList]
  );

  // Honour deep links (from Activities / world map) — open the project directly.
  useEffect(() => {
    if (!initialProjectId) return;
    const match = projects.find((p) => p.id === initialProjectId);
    if (match) {
      setActiveCategory("all");
      setSelectedId(match.id);
    }
    onInitialProjectConsumed?.();
  }, [initialProjectId, onInitialProjectConsumed]);

  // While a showcase is open, ESC should close it (not the whole section).
  // Captured ahead of the section-level keyboard handler and stopped from
  // propagating further.
  useEffect(() => {
    if (!selectedProject) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeProject();
      } else if (e.key === "ArrowLeft") {
        stepProject(-1);
      } else if (e.key === "ArrowRight") {
        stepProject(1);
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [selectedProject, closeProject, stepProject]);

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Spacer to clear the fixed TopBar */}
      <div className="shrink-0 h-[56px]" />

      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectShowcase
              key={selectedProject.id}
              project={selectedProject}
              index={navIndex}
              total={navList.length}
              onClose={closeProject}
              onPrev={() => stepProject(-1)}
              onNext={() => stepProject(1)}
            />
          ) : (
            <motion.div
              key="launcher"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex"
            >
              <div className="w-48 lg:w-56 shrink-0 flex flex-col pl-10 lg:pl-14 pt-2 border-r border-foreground/[0.06]">
                <CategoryList active={activeCategory} onChange={setActiveCategory} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col pl-px">
                <ProjectGrid projects={filteredProjects} onSelect={openProject} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <InventoryBar
        projectCount={projects.length}
        currentLabel={
          selectedProject
            ? `${selectedProject.name}`
            : activeCategory === "all"
              ? "All Projects"
              : filteredProjects.length + " shown"
        }
      />
    </div>
  );
}
