"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { projects, Project } from "@/data/projects";
import { ItemList } from "./ItemList";
import { ProjectCard } from "./ProjectCard";
import { InventoryBar } from "./InventoryBar";

export type InventoryViewProps = {
  initialProjectId?: string | null;
  onInitialProjectConsumed?: () => void;
};

export function InventoryView({
  initialProjectId,
  onInitialProjectConsumed,
}: InventoryViewProps = {}) {
  const [activeId, setActiveId] = useState<string>(
    () =>
      projects.find((p) => p.id === initialProjectId)?.id ?? projects[0].id
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isProgrammaticScroll = useRef(false);

  const scrollToProject = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    const root = scrollRef.current;
    if (!el || !root) return;
    setActiveId(id);
    // Suppress observer-driven active changes while the smooth scroll runs.
    isProgrammaticScroll.current = true;
    root.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  }, []);

  // Sync the active list item with whichever card is near the viewport center.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.getAttribute("data-project-id");
        if (id) setActiveId(id);
      },
      { root, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Honour deep links (from the Chronicle / world map).
  useEffect(() => {
    if (!initialProjectId) return;
    const match = projects.find((p) => p.id === initialProjectId);
    if (match) {
      // Jump without animation on deep-link entry.
      const el = sectionRefs.current[match.id];
      const root = scrollRef.current;
      if (el && root) root.scrollTop = el.offsetTop - 8;
      setActiveId(match.id);
    }
    onInitialProjectConsumed?.();
  }, [initialProjectId, onInitialProjectConsumed]);

  const handleSelect = (project: Project) => scrollToProject(project.id);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Spacer to clear the fixed TopBar */}
      <div className="shrink-0 h-[56px]" />

      <div className="flex-1 flex min-h-0">
        {/* ── Left: project list (scroll navigation) ──────────── */}
        <div className="w-64 lg:w-72 shrink-0 flex flex-col pl-10 lg:pl-14 border-r border-foreground/[0.06]">
          <ItemList
            items={projects}
            selectedId={activeId}
            onSelect={handleSelect}
          />
        </div>

        {/* ── Right: scrollable showcase of every project ─────── */}
        <div
          ref={scrollRef}
          className="flex-1 min-w-0 px-8 lg:px-14 overflow-y-auto no-scrollbar"
        >
          <div className="max-w-3xl mx-auto divide-y divide-foreground/[0.05]">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                ref={(el) => {
                  sectionRefs.current[project.id] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <InventoryBar projectCount={projects.length} />
    </div>
  );
}
