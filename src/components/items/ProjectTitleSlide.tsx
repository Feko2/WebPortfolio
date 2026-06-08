"use client";

import { motion } from "framer-motion";
import { NordicKnot } from "@/components/ui/SkyFrame";

interface ProjectTitleSlideProps {
  projectCount: number;
}

const easing = [0.16, 1, 0.3, 1] as const;

export function ProjectTitleSlide({ projectCount }: ProjectTitleSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: easing }}
      className="h-full flex items-center justify-center px-10 lg:px-16"
    >
      <div className="max-w-xl w-full text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="font-skyrim text-[10px] tracking-[0.45em] uppercase text-foreground/30 mb-6"
        >
          Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: easing }}
          className="font-skyrim text-4xl lg:text-5xl tracking-[0.14em] text-foreground/90 leading-tight mb-3"
        >
          Felipe Ramos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-base lg:text-lg text-foreground/45 italic mb-10"
        >
          Selected software engineering work
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.28, duration: 0.6, ease: easing }}
          className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-10 origin-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34, duration: 0.4 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <div>
            <span className="font-skyrim text-2xl text-foreground/75 block leading-none">
              {projectCount}
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-foreground/30 mt-1.5 block">
              Projects
            </span>
          </div>
          <div className="w-px h-10 bg-foreground/[0.08]" />
          <div>
            <span className="font-skyrim text-2xl text-foreground/75 block leading-none">
              2024
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-foreground/30 mt-1.5 block">
              — Present
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.4 }}
          className="flex items-center justify-center gap-3 text-foreground/25"
        >
          <NordicKnot size={12} className="text-foreground/15" />
          <span className="font-skyrim text-[9px] tracking-[0.3em] uppercase">
            Select a project to begin
          </span>
          <NordicKnot size={12} className="text-foreground/15" />
        </motion.div>
      </div>
    </motion.div>
  );
}
