"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  parchmentSections,
  ParchmentSection,
  ParchmentLink,
  type ParchmentEntry,
} from "@/data/resume";

export type SpellBookProps = {
  onOpenMap: (locationId: string) => void;
  onOpenItems: (projectId: string) => void;
};

function ParchmentInlineLink({
  link,
  onOpenMap,
  onOpenItems,
}: {
  link: ParchmentLink;
  onOpenMap: (locationId: string) => void;
  onOpenItems: (projectId: string) => void;
}) {
  const handleClick = () => {
    if (link.mapLocationId) onOpenMap(link.mapLocationId);
    else if (link.projectId) onOpenItems(link.projectId);
  };

  if (!link.mapLocationId && !link.projectId) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline p-0 m-0 align-baseline bg-transparent border-0 cursor-pointer
        text-xs tracking-wide text-[rgba(75,48,18,0.62)] underline underline-offset-[3px]
        decoration-[rgba(90,55,20,0.4)] hover:text-[rgba(28,16,4,0.9)]
        hover:decoration-[rgba(28,16,4,0.55)] transition-colors text-left font-sans"
    >
      {link.label}
    </button>
  );
}

function EntryLocationLine({
  entry,
  onOpenMap,
  onOpenItems,
}: {
  entry: ParchmentEntry;
  onOpenMap: (locationId: string) => void;
  onOpenItems: (projectId: string) => void;
}) {
  const links =
    entry.links?.filter((l) => l.mapLocationId || l.projectId) ?? [];
  if (!entry.period && links.length === 0) return null;

  return (
    <span className="text-xs tracking-wide text-[rgba(75,48,18,0.55)] leading-relaxed max-w-xl">
      {entry.period}
      {links.map((link, li) => (
        <span key={`${entry.id}-${link.label}-${li}`}>
          {(entry.period || li > 0) && (
            <span className="mx-1.5 text-[rgba(75,48,18,0.38)]" aria-hidden>
              ·
            </span>
          )}
          <ParchmentInlineLink
            link={link}
            onOpenMap={onOpenMap}
            onOpenItems={onOpenItems}
          />
        </span>
      ))}
    </span>
  );
}

export function SpellBook({ onOpenMap, onOpenItems }: SpellBookProps) {
  const [active, setActive] = useState<ParchmentSection>(parchmentSections[0]);

  return (
    <div
      className="relative w-full h-full flex flex-col min-h-0"
      style={{
        background:
          "linear-gradient(165deg, #e8d4b8 0%, #d9c4a4 18%, #cbb592 42%, #d4c09a 65%, #e0cfa8 100%)",
        boxShadow: "inset 0 0 120px rgba(90, 60, 30, 0.12)",
      }}
    >
      {/* Aged paper texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Clears fixed TopBar (~42px) with comfortable gap below */}
      <div className="relative z-10 shrink-0 h-20" aria-hidden />

      <div className="relative z-10 flex flex-1 min-h-0 w-full pb-16">
        {/* Section navigation */}
        <aside
          className="w-[min(280px,32vw)] shrink-0 flex flex-col pl-8 pr-6 border-r border-[rgba(60,35,12,0.18)]"
        >
          <p
            className="font-skyrim text-[9px] tracking-[0.35em] uppercase mb-6"
            style={{ color: "rgba(45, 28, 8, 0.45)" }}
          >
            Chronicle
          </p>
          <nav className="space-y-1 flex-1 min-h-0 overflow-y-auto">
            {parchmentSections.map((section, i) => {
              const isActive = active.id === section.id;
              return (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => setActive(section)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`w-full text-left px-3 py-3 rounded-sm border transition-colors cursor-pointer
                    ${
                      isActive
                        ? "border-[rgba(60,35,12,0.4)] bg-[rgba(255,248,230,0.55)] shadow-sm"
                        : "border-transparent hover:bg-[rgba(255,248,230,0.35)] hover:border-[rgba(60,35,12,0.15)]"
                    }`}
                >
                  <span
                    className="font-skyrim text-[11px] tracking-[0.2em] block leading-snug"
                    style={{
                      color: isActive ? "rgba(35, 20, 5, 0.88)" : "rgba(45, 28, 8, 0.5)",
                    }}
                  >
                    {section.title}
                  </span>
                  {section.subtitle && (
                    <span
                      className="text-[9px] tracking-wide block mt-1 leading-relaxed"
                      style={{ color: "rgba(55, 35, 12, 0.42)" }}
                    >
                      {section.subtitle}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          <div
            className="mt-4 pt-4 border-t border-[rgba(60,35,12,0.15)] shrink-0"
          >
            <a
              href="/felipe-ramos-cv-en.pdf"
              download="Felipe_Ramos_CV_EN.pdf"
              className="flex items-center justify-center w-full font-skyrim text-[9px] tracking-[0.25em] uppercase
                px-3 py-3 rounded-sm border border-[rgba(60,35,12,0.35)]
                text-[rgba(45,28,8,0.75)] bg-[rgba(255,248,230,0.4)]
                hover:bg-[rgba(255,248,230,0.65)] transition-colors"
            >
              Download CV (PDF)
            </a>
          </div>
        </aside>

        {/* Entries */}
        <div
          className="flex-1 min-w-0 pl-10 lg:pl-16 pr-8 lg:pr-12 overflow-y-auto"
          style={{
            color: "rgba(40, 22, 6, 0.82)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <header className="mb-8 pb-6 border-b border-[rgba(60,35,12,0.2)]">
                <h1 className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-[rgba(30,18,5,0.92)]">
                  {active.title}
                </h1>
                {active.subtitle && (
                  <p className="mt-2 text-sm tracking-wide text-[rgba(55,35,12,0.55)]">
                    {active.subtitle}
                  </p>
                )}
              </header>

              <ul className="space-y-8 list-none">
                {active.entries.map((entry, i) => (
                  <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                    className="pl-0"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-2">
                      <h2 className="font-serif text-lg font-semibold text-[rgba(28,16,4,0.92)]">
                        {entry.title}
                      </h2>
                      <EntryLocationLine
                        entry={entry}
                        onOpenMap={onOpenMap}
                        onOpenItems={onOpenItems}
                      />
                    </div>
                    <p className="text-[13px] leading-relaxed text-[rgba(45,28,10,0.78)] max-w-2xl">
                      {entry.body}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
