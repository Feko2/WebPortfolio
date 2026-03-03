"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { spellSchools, SpellSchool } from "@/data/resume";

export function SpellBook() {
  const [activeSchool, setActiveSchool] = useState<SpellSchool>(spellSchools[0]);

  return (
    <div className="w-full h-full flex pt-20 pb-16">
      {/* Left panel - spell schools */}
      <div className="w-[300px] flex flex-col pl-10 pr-6 border-r border-foreground/6">
        <h3 className="font-skyrim text-[10px] tracking-[0.35em] text-foreground/30 mb-8 uppercase">
          Schools of Magic
        </h3>
        <div className="space-y-0.5 flex-1">
          {spellSchools.map((school, i) => {
            const isActive = activeSchool.id === school.id;
            return (
              <motion.button
                key={school.id}
                onClick={() => setActiveSchool(school)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`w-full text-left px-4 py-3.5 cursor-pointer transition-all duration-300
                  border-l-2 bg-transparent flex items-center gap-3.5 group
                  ${
                    isActive
                      ? "border-l-sky-400/50 bg-sky-500/[0.04]"
                      : "border-l-transparent hover:bg-foreground/[0.02] hover:border-l-foreground/15"
                  }`}
                whileHover={{ x: 3 }}
              >
                <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity">
                  {school.icon}
                </span>
                <div className="min-w-0">
                  <span
                    className={`font-skyrim text-xs tracking-[0.2em] block transition-all duration-300 ${
                      isActive ? "text-foreground/85 text-glow-cyan" : "text-foreground/40"
                    }`}
                  >
                    {school.skyrimName}
                  </span>
                  <span className="text-[9px] text-foreground/20 tracking-wider block truncate">
                    {school.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Ornate separator */}
        <div className="flex items-center gap-2 my-4">
          <Image src="/SkyUI/dividers/ornate-l.png" alt="" width={14} height={14} className="opacity-20" />
          <div className="flex-1 h-px bg-foreground/8" />
          <Image src="/SkyUI/dividers/ornate-r.png" alt="" width={14} height={14} className="opacity-20" />
        </div>

        {/* Cast spell (download CV) */}
        <div className="pb-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full font-skyrim text-[10px] tracking-[0.25em] px-4 py-3.5 
              border border-sky-500/15 text-sky-400/50 
              hover:bg-sky-500/[0.04] hover:border-sky-500/30 hover:text-sky-400/80
              transition-all duration-400 cursor-pointer relative overflow-hidden group"
          >
            <span className="relative z-10">Cast Spell (Download CV)</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-sky-500/0
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>
        </div>
      </div>

      {/* Right panel - spell entries */}
      <div className="flex-1 px-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSchool.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* School header with dragon icon */}
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{activeSchool.icon}</span>
              <h2 className="font-skyrim text-2xl tracking-[0.25em] text-foreground/90 text-glow-cyan">
                {activeSchool.skyrimName}
              </h2>
              <Image
                src="/SkyUI/icons/dragon.png"
                alt=""
                width={22}
                height={22}
                className="opacity-20 ml-2"
              />
            </div>
            <p className="font-skyrim text-[10px] tracking-[0.2em] text-foreground/30 mb-4 pl-[44px]">
              {activeSchool.name}
            </p>
            <div className="flex items-center gap-2 mb-8">
              <Image src="/SkyUI/dividers/ornate-l.png" alt="" width={18} height={18} className="opacity-20" />
              <div className="flex-1 h-px bg-foreground/6" />
              <Image src="/SkyUI/dividers/ornate-r.png" alt="" width={18} height={18} className="opacity-20" />
            </div>

            {/* Spell entries */}
            <div className="space-y-3">
              {activeSchool.entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border border-foreground/[0.04] hover:border-foreground/10 
                    transition-all duration-300 p-5 group hover:bg-foreground/[0.015]
                    relative overflow-hidden"
                >
                  {/* Subtle left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-500/0 
                    group-hover:bg-sky-500/20 transition-colors duration-300" />

                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm text-foreground/65 tracking-wide 
                      group-hover:text-foreground/85 transition-colors duration-300">
                      {entry.name}
                    </h4>
                    {entry.level && (
                      <span className="text-[9px] font-skyrim tracking-[0.2em] text-sky-400/40 
                        group-hover:text-sky-400/60 shrink-0 ml-6 pt-0.5 transition-colors duration-300">
                        {entry.level}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-foreground/30 leading-relaxed group-hover:text-foreground/45 
                    transition-colors duration-300">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
