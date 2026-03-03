"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";

interface ItemListProps {
  items: Project[];
  selectedId: string;
  onSelect: (project: Project) => void;
}

export function ItemList({ items, selectedId, onSelect }: ItemListProps) {
  return (
    <div className="flex-1 overflow-y-auto pt-2">
      <AnimatePresence mode="popLayout">
        {items.map((project, i) => {
          const isSelected = selectedId === project.id;
          return (
            <motion.button
              key={project.id}
              layout
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              onClick={() => onSelect(project)}
              className={`w-full text-left px-5 py-2.5 cursor-pointer transition-all duration-150 block
                ${
                  isSelected
                    ? "bg-foreground/[0.06] text-foreground/85"
                    : "text-foreground/40 hover:text-foreground/60 hover:bg-foreground/[0.02]"
                }`}
            >
              <span className="text-[13px] tracking-wide">
                {project.name}
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
