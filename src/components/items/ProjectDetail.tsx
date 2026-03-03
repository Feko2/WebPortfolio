"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project, categoryLabels } from "@/data/projects";
import { NordicKnot } from "@/components/ui/SkyFrame";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const categoryMeaning =
    categoryLabels[project.category].split("(")[1]?.replace(")", "") ??
    project.category;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col items-center"
      >
        {/* Showcase zone — image or placeholder (where Skyrim shows the 3D model) */}
        <div
          className="w-full max-w-md aspect-[16/9] mb-6 relative
            border border-foreground/[0.06] bg-foreground/[0.015] overflow-hidden
            flex items-center justify-center"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
            />
          ) : (
            <NordicKnot size={32} className="text-foreground/[0.07]" />
          )}
        </div>

        {/* Project name — large, centered (like Skyrim shows item name below 3D model) */}
        <h2 className="font-skyrim text-2xl lg:text-3xl tracking-[0.2em] text-foreground/85 text-center mb-1">
          {project.name}
        </h2>

        {/* Category subtitle */}
        <span className="text-[10px] font-skyrim tracking-[0.3em] text-foreground/25 uppercase text-center mb-7 block">
          {categoryMeaning}
        </span>

        {/* Date & Role stats — centered */}
        <div className="flex justify-center gap-12 mb-7">
          <div className="text-center">
            <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
              Date
            </span>
            <span className="font-skyrim text-xl text-foreground/65">
              {project.date}
            </span>
          </div>
          <div className="text-center">
            <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
              Role
            </span>
            <span className="font-skyrim text-xl text-foreground/65">
              {project.role}
            </span>
          </div>
        </div>

        {/* Ornate divider */}
        <div className="flex items-center gap-3 mb-6 w-full max-w-lg">
          <NordicKnot size={14} className="text-foreground/15 shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <NordicKnot size={14} className="text-foreground/15 shrink-0" />
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/45 leading-relaxed mb-7 max-w-lg text-center">
          {project.description}
        </p>

        {/* Enchantments (tech stack) */}
        <div className="mb-8">
          <span className="text-[9px] tracking-[0.25em] text-foreground/25 uppercase block mb-3 text-center">
            Enchantments
          </span>
          <div className="flex flex-wrap justify-center gap-2">
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
        </div>

        {/* Action links */}
        <div className="flex justify-center gap-4 mt-auto pb-4">
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
      </motion.div>
    </AnimatePresence>
  );
}
