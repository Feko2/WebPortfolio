"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project, categoryLabels } from "@/data/projects";
import { NordicKnot } from "@/components/ui/SkyFrame";
import { asset } from "@/lib/asset";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  function ProjectCard({ project, index }, ref) {
    const categoryMeaning =
      categoryLabels[project.category].split("(")[1]?.replace(")", "") ??
      project.category;

    return (
      <motion.section
        ref={ref}
        id={`project-${project.id}`}
        data-project-id={project.id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.4 }}
        className="scroll-mt-6 py-10 first:pt-2"
      >
        {/* Index + category tag */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-skyrim text-[10px] tracking-[0.25em] text-foreground/30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 h-px bg-foreground/[0.06]" />
          <span className="text-[8px] tracking-[0.15em] uppercase text-sky-400/55 font-skyrim">
            {categoryMeaning}
          </span>
        </div>

        {/* Showcase zone — image or placeholder */}
        <div
          className="w-full aspect-[16/9] mb-6 relative
            border border-foreground/[0.06] bg-foreground/[0.015] overflow-hidden
            flex items-center justify-center"
        >
          {project.image ? (
            <Image
              src={asset(project.image)}
              alt={project.name}
              fill
              className="object-cover"
            />
          ) : (
            <NordicKnot size={30} className="text-foreground/[0.07]" />
          )}
        </div>

        {/* Name + tagline */}
        <h2 className="font-skyrim text-2xl lg:text-[28px] tracking-[0.18em] text-foreground/90 leading-tight mb-1.5">
          {project.name}
        </h2>
        <p className="text-[13px] text-foreground/45 italic mb-6">
          {project.tagline}
        </p>

        {/* Date & Role stats */}
        <div className="flex gap-12 mb-6">
          <div>
            <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
              Date
            </span>
            <span className="font-skyrim text-base text-foreground/65">
              {project.date}
            </span>
          </div>
          <div>
            <span className="text-[9px] tracking-[0.2em] text-foreground/25 uppercase block mb-1">
              Role
            </span>
            <span className="font-skyrim text-base text-foreground/65">
              {project.role}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/55 leading-relaxed mb-6 max-w-2xl">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="mb-7 space-y-2.5 max-w-2xl">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-3 items-start">
              <span className="mt-[7px] w-1.5 h-1.5 rotate-45 bg-sky-400/45 shrink-0" />
              <span className="text-[13px] text-foreground/50 leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Enchantments (tech stack) */}
        <div className="mb-7">
          <span className="text-[9px] tracking-[0.25em] text-foreground/25 uppercase block mb-3">
            Enchantments
          </span>
          <div className="flex flex-wrap gap-2">
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
        {(project.demo || project.github) && (
          <div className="flex gap-4">
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
      </motion.section>
    );
  }
);
