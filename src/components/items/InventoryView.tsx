"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";
import { ItemList } from "./ItemList";
import { ProjectDetail } from "./ProjectDetail";
import { InventoryBar } from "./InventoryBar";

export function InventoryView() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Spacer to clear the fixed TopBar */}
      <div className="shrink-0 h-[56px]" />

      {/* Main content: item list | detail panel */}
      <div className="flex-1 flex min-h-0">
        {/* ── Left: project list ──────────────────────────────── */}
        <div className="w-64 lg:w-72 shrink-0 flex flex-col pl-10 lg:pl-14 border-r border-foreground/[0.06]">
          <ItemList
            items={projects}
            selectedId={selectedProject.id}
            onSelect={setSelectedProject}
          />
        </div>

        {/* ── Right: project detail ───────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 px-8 lg:px-12 overflow-y-auto">
          <ProjectDetail project={selectedProject} />
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <InventoryBar projectCount={projects.length} />
    </div>
  );
}
