"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { ItemList } from "./ItemList";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listFocusId, setListFocusId] = useState<string>(() => projects[0]?.id ?? "");

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  const navIndex = selectedProject
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const openProject = useCallback((project: Project) => {
    setListFocusId(project.id);
    setSelectedId(project.id);
  }, []);

  const closeProject = useCallback(() => setSelectedId(null), []);

  const stepProject = useCallback(
    (delta: 1 | -1) => {
      if (navIndex === -1 || projects.length === 0) return;
      const next = (navIndex + delta + projects.length) % projects.length;
      const nextProject = projects[next];
      setListFocusId(nextProject.id);
      setSelectedId(nextProject.id);
    },
    [navIndex]
  );

  // Honour deep links (from Activities / world map) — open the project directly.
  useEffect(() => {
    if (!initialProjectId) return;
    const match = projects.find((p) => p.id === initialProjectId);
    if (match) openProject(match);
    onInitialProjectConsumed?.();
  }, [initialProjectId, onInitialProjectConsumed, openProject]);

  // While a showcase is open, ESC should close it (not the whole section).
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
      <div className="shrink-0 h-[56px]" />

      <div className="flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectShowcase
              key={selectedProject.id}
              project={selectedProject}
              index={navIndex}
              total={projects.length}
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
              <aside className="w-48 lg:w-56 shrink-0 flex flex-col pl-10 lg:pl-14 pt-2 border-r border-foreground/[0.06]">
                <p className="font-skyrim text-[9px] tracking-[0.3em] uppercase text-foreground/25 px-5 mb-3">
                  All Projects
                </p>
                <ItemList
                  items={projects}
                  selectedId={listFocusId}
                  onSelect={openProject}
                  onHover={setListFocusId}
                />
              </aside>
              <div className="flex-1 min-w-0 flex flex-col pl-px">
                <ProjectGrid
                  projects={projects}
                  onSelect={openProject}
                  onHover={setListFocusId}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <InventoryBar
        projectCount={projects.length}
        currentLabel={selectedProject ? selectedProject.name : "All Projects"}
      />
    </div>
  );
}
