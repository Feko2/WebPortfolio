"use client";

import { motion } from "framer-motion";
import { ProjectCategory } from "@/data/projects";

export type FilterCategory = ProjectCategory | "all";

const categories: { key: FilterCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "weapons", label: "Weapons" },
  { key: "armor", label: "Armor" },
  { key: "potions", label: "Potions" },
  { key: "scrolls", label: "Scrolls" },
];

interface CategoryListProps {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

export function CategoryList({ active, onChange }: CategoryListProps) {
  return (
    <nav className="flex flex-col">
      {categories.map((cat, i) => {
        const isActive = active === cat.key;
        return (
          <div key={cat.key}>
            {i === 1 && <div className="my-3 h-px bg-foreground/6" />}
            <button
              onClick={() => onChange(cat.key)}
              className={`w-full text-left font-skyrim text-[10px] lg:text-[11px] tracking-[0.18em]
                py-2 px-2 cursor-pointer transition-all duration-200 relative
                ${
                  isActive
                    ? "text-foreground/80"
                    : "text-foreground/25 hover:text-foreground/50"
                }`}
            >
              {cat.label}
              {isActive && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-3 bg-foreground/40"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
