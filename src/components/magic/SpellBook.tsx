"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parchmentSections, ParchmentSection, ParchmentEntry } from "@/data/resume";
import { locations } from "@/data/locations";

export type SpellBookProps = {
  onOpenMap: (locationId: string) => void;
  onOpenItems: (projectId: string) => void;
};

const metaLinkClass =
  "text-[11px] tracking-wide text-[#2c2c2c]/70 hover:text-[#1a1a1a] " +
  "underline decoration-dotted decoration-[#1a1a1a]/30 decoration-from-font underline-offset-[3px] " +
  "hover:decoration-[#1a1a1a]/70 bg-transparent border-none p-0 m-0 " +
  "cursor-pointer font-inherit align-baseline text-left font-newspaper-body";

function mapLinkCaption(locationId: string): string {
  const loc = locations.find((l) => l.id === locationId);
  return loc?.city ?? loc?.name ?? locationId;
}

function EntryMetaLine({
  entry,
  onOpenMap,
  onOpenItems,
}: {
  entry: ParchmentEntry;
  onOpenMap: (locationId: string) => void;
  onOpenItems: (projectId: string) => void;
}) {
  const mapLinks =
    entry.links?.filter((l): l is typeof l & { mapLocationId: string } => Boolean(l.mapLocationId)) ??
    [];
  const projectLinks =
    entry.links?.filter((l): l is typeof l & { projectId: string } => Boolean(l.projectId)) ?? [];

  const period = entry.period;

  const renderPeriodAndMap = () => {
    if (!period) {
      if (mapLinks.length === 0) return null;
      return (
        <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          {mapLinks.map((l, i) => (
            <span key={l.mapLocationId} className="contents">
              {i > 0 && <span className="text-[#1a1a1a]/30">·</span>}
              <button
                type="button"
                className={metaLinkClass}
                onClick={() => onOpenMap(l.mapLocationId)}
              >
                {mapLinkCaption(l.mapLocationId)}
              </button>
            </span>
          ))}
        </span>
      );
    }

    if (mapLinks.length === 0) {
      return (
        <span className="text-[11px] tracking-wide text-[#2c2c2c]/65 font-newspaper-body uppercase">
          {period}
        </span>
      );
    }

    if (mapLinks.length === 1) {
      return (
        <button type="button" className={metaLinkClass} onClick={() => onOpenMap(mapLinks[0].mapLocationId)}>
          {period}
        </button>
      );
    }

    const parts = period.split(/\s*·\s*/);
    if (parts.length === mapLinks.length) {
      return (
        <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[11px] tracking-wide text-[#2c2c2c]/65 font-newspaper-body">
          {parts.map((part, i) => (
            <span key={`${entry.id}-map-${mapLinks[i].mapLocationId}`} className="contents">
              {i > 0 && <span className="text-[#1a1a1a]/30">·</span>}
              <button
                type="button"
                className={metaLinkClass}
                onClick={() => onOpenMap(mapLinks[i].mapLocationId)}
              >
                {part.trim()}
              </button>
            </span>
          ))}
        </span>
      );
    }

    return (
      <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <span className="text-[11px] tracking-wide text-[#2c2c2c]/65 font-newspaper-body">{period}</span>
        {mapLinks.map((l) => (
          <button
            key={l.mapLocationId}
            type="button"
            className={metaLinkClass}
            onClick={() => onOpenMap(l.mapLocationId)}
          >
            {mapLinkCaption(l.mapLocationId)}
          </button>
        ))}
      </span>
    );
  };

  const mapBlock = renderPeriodAndMap();

  if (!mapBlock && projectLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {mapBlock}
      {mapBlock && projectLinks.length > 0 && (
        <span className="text-[#1a1a1a]/30 select-none" aria-hidden>
          ·
        </span>
      )}
      {projectLinks.map((l, i) => (
        <span key={l.projectId} className="contents">
          {i > 0 && (
            <span className="text-[#1a1a1a]/30 select-none" aria-hidden>
              ·
            </span>
          )}
          <button type="button" className={metaLinkClass} onClick={() => onOpenItems(l.projectId)}>
            {l.label ?? "Project"}
          </button>
        </span>
      ))}
    </div>
  );
}

export function SpellBook({ onOpenMap, onOpenItems }: SpellBookProps) {
  const [active, setActive] = useState<ParchmentSection>(parchmentSections[0]);

  return (
    <div
      className="relative w-full h-full flex flex-col min-h-0"
      style={{
        background:
          "linear-gradient(165deg, #f4f0e6 0%, #ede8dc 22%, #e8e2d4 48%, #ebe5d8 72%, #f0ebe0 100%)",
        boxShadow: "inset 0 0 100px rgba(120, 110, 90, 0.08)",
      }}
    >
      {/* Aged newsprint texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Clears fixed TopBar (~42px) with comfortable gap below */}
      <div className="relative z-10 shrink-0 h-20" aria-hidden />

      <div className="relative z-10 flex flex-1 min-h-0 w-full flex-col px-8 lg:px-12 pb-16">
        {/* Masthead */}
        <header className="shrink-0 text-center mb-6">
          <p className="font-newspaper-body text-[10px] tracking-[0.35em] uppercase text-[#2c2c2c]/55 mb-2">
            Monterrey, N.L. · Est. 2024
          </p>
          <h1 className="font-newspaper-display text-3xl lg:text-4xl font-bold tracking-tight text-[#1a1a1a] leading-none">
            The Activities Gazette
          </h1>
          <p className="font-newspaper-body text-[11px] tracking-[0.2em] uppercase text-[#2c2c2c]/50 mt-2">
            Community · Recognition · Work &amp; Research
          </p>
          <hr className="newspaper-rule-double mt-4" />
        </header>

        <div className="flex flex-1 min-h-0 w-full">
          {/* Section index */}
          <aside className="w-[min(260px,30vw)] shrink-0 flex flex-col pr-5 border-r border-[#1a1a1a]/20">
            <p className="font-newspaper-body text-[9px] tracking-[0.3em] uppercase text-[#2c2c2c]/45 mb-4">
              Sections
            </p>
            <nav className="space-y-0 flex-1 min-h-0 overflow-y-auto">
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
                    className={`w-full text-left px-0 py-2.5 border-b border-[#1a1a1a]/12 transition-colors cursor-pointer bg-transparent
                      ${isActive ? "border-b-[#1a1a1a]/50" : "hover:border-b-[#1a1a1a]/30"}`}
                  >
                    <span
                      className={`font-newspaper-display text-[13px] block leading-snug
                        ${isActive ? "font-bold text-[#1a1a1a] underline decoration-[#1a1a1a]/40 underline-offset-4" : "text-[#2c2c2c]/60"}`}
                    >
                      {section.title}
                    </span>
                    {section.subtitle && (
                      <span className="font-newspaper-body text-[9px] tracking-wide block mt-1 leading-relaxed text-[#2c2c2c]/42">
                        {section.subtitle}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#1a1a1a]/20 shrink-0">
              <p className="font-newspaper-body text-[9px] tracking-wide text-[#2c2c2c]/45 mb-2 leading-relaxed">
                Résumé available
              </p>
              <a
                href="/felipe-ramos-cv-en.pdf"
                download="Felipe_Ramos_CV_EN.pdf"
                className="flex items-center justify-center w-full font-newspaper-body text-[10px] tracking-[0.15em] uppercase
                  px-3 py-2.5 border border-[#1a1a1a]/35 border-double
                  text-[#1a1a1a]/80 bg-[#f4f0e6]/60
                  hover:bg-[#ede8dc] transition-colors"
              >
                Download PDF
              </a>
            </div>
          </aside>

          {/* Articles */}
          <div className="flex-1 min-w-0 pl-8 lg:pl-12 overflow-y-auto text-[#1a1a1a]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <header className="mb-6 pb-4">
                  <h2 className="font-newspaper-display text-2xl lg:text-[1.75rem] font-bold tracking-tight text-[#1a1a1a]">
                    {active.title}
                  </h2>
                  {active.subtitle && (
                    <p className="mt-1.5 font-newspaper-body text-sm tracking-wide text-[#2c2c2c]/60 italic">
                      {active.subtitle}
                    </p>
                  )}
                  <hr className="newspaper-rule-single mt-4" />
                </header>

                <ul className="space-y-0 list-none">
                  {active.entries.map((entry, i) => (
                    <motion.li
                      key={entry.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.05 }}
                      className={`py-6 ${i > 0 ? "border-t border-[#1a1a1a]/15" : ""}`}
                    >
                      <div className="mb-2">
                        <h3 className="font-newspaper-display text-lg lg:text-xl font-bold text-[#1a1a1a] leading-tight">
                          {entry.title}
                        </h3>
                        {entry.period && (
                          <p className="mt-1 font-newspaper-body text-[10px] tracking-[0.12em] uppercase text-[#2c2c2c]/55">
                            {entry.period} —
                          </p>
                        )}
                      </div>
                      <div className="mb-2">
                        <EntryMetaLine entry={entry} onOpenMap={onOpenMap} onOpenItems={onOpenItems} />
                      </div>
                      <p className="font-newspaper-body text-[13px] leading-[1.65] text-[#2c2c2c]/85 max-w-2xl newspaper-drop-cap">
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
    </div>
  );
}
