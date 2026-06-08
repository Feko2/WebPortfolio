"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { ItemList } from "./ItemList";
import { ProjectTitleSlide } from "./ProjectTitleSlide";
import { ProjectPresentation } from "./ProjectPresentation";
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

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  const navIndex = selectedProject
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const openProject = useCallback((project: Project) => {
    setSelectedId((current) => (current === project.id ? null : project.id));
  }, []);

  const stepProject = useCallback(
    (delta: 1 | -1) => {
      if (projects.length === 0) return;
      const base = navIndex === -1 ? 0 : navIndex;
      const next = (base + delta + projects.length) % projects.length;
      setSelectedId(projects[next].id);
    },
    [navIndex]
  );

  // Honour deep links (from Activities / world map) — open the project directly.
  useEffect(() => {
    if (!initialProjectId) return;
    const match = projects.find((p) => p.id === initialProjectId);
    if (match) setSelectedId(match.id);
    onInitialProjectConsumed?.();
  }, [initialProjectId, onInitialProjectConsumed]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedId(null);
      } else if (selectedProject && e.key === "ArrowLeft") {
        stepProject(-1);
      } else if (selectedProject && e.key === "ArrowRight") {
        stepProject(1);
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [selectedProject, stepProject]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="shrink-0 h-[56px]" />

      <div className="flex-1 flex min-h-0">
        <aside className="w-64 lg:w-72 shrink-0 flex flex-col pl-10 lg:pl-14 border-r border-foreground/[0.06]">
          <p className="font-skyrim text-[9px] tracking-[0.3em] uppercase text-foreground/25 px-5 pt-2 mb-3">
            All Projects
          </p>
          <ItemList
            items={projects}
            selectedId={selectedId}
            onSelect={openProject}
          />
        </aside>

        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <ProjectPresentation
                key={selectedProject.id}
                project={selectedProject}
                index={navIndex}
                total={projects.length}
                onPrev={() => stepProject(-1)}
                onNext={() => stepProject(1)}
              />
            ) : (
              <ProjectTitleSlide key="title" projectCount={projects.length} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <InventoryBar
        projectCount={projects.length}
        currentLabel={selectedProject ? selectedProject.name : "All Projects"}
      />
    </div>
  );
}
