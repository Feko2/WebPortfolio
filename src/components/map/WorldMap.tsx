"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { locations, paths, Location } from "@/data/locations";

const typeColors = {
  education: "#4dc9f6",
  work: "#b8860b",
  project: "#2ecc71",
};

const typeLabels = {
  education: "Hall of Learning",
  work: "Guild Hall",
  project: "Adventurer's Mark",
};

const typeMarkers: Record<string, string> = {
  education: "/SkyUI/markers/college.png",
  work: "/SkyUI/markers/fort.png",
  project: "/SkyUI/markers/standing-stone.png",
};

export function WorldMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    hasMoved.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved.current = true;
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setScale((s) => Math.max(0.5, Math.min(2.5, s - e.deltaY * 0.001)));
  }, []);

  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Map container */}
      <div
        className="absolute inset-[-20%] w-[140%] h-[140%]"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: dragging.current ? "none" : "transform 0.15s ease-out",
        }}
      >
        {/* Parchment base */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(160deg, #c9a96e 0%, #b8956a 15%, #a8855a 30%, #b8956a 50%, #c4a265 70%, #d4b275 85%, #c9a96e 100%)
            `,
          }}
        />

        {/* Parchment texture - stains and age marks */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 25%, rgba(100, 60, 20, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 75% 15%, rgba(100, 60, 20, 0.1) 0%, transparent 30%),
            radial-gradient(ellipse at 45% 70%, rgba(100, 60, 20, 0.12) 0%, transparent 35%),
            radial-gradient(ellipse at 85% 80%, rgba(100, 60, 20, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 30% 60%, rgba(120, 80, 30, 0.06) 0%, transparent 20%),
            radial-gradient(circle at 60% 40%, rgba(80, 50, 15, 0.05) 0%, transparent 15%)
          `,
        }} />

        {/* Burnt edges vignette */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 200px rgba(50, 25, 0, 0.5), inset 0 0 400px rgba(30, 15, 0, 0.25)",
          }}
        />

        {/* Decorative border lines */}
        <div className="absolute inset-[8%] border border-amber-900/15 pointer-events-none" />
        <div className="absolute inset-[9%] border border-amber-900/8 pointer-events-none" />

        {/* Map title */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center">
          <h2
            className="font-skyrim text-xl tracking-[0.5em] whitespace-nowrap"
            style={{ color: "rgba(60, 35, 10, 0.6)" }}
          >
            The Developer&apos;s Journey
          </h2>
          <div className="w-32 h-px mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-900/20 to-transparent" />
        </div>

        {/* Compass rose decoration (bottom right) */}
        <div className="absolute bottom-[15%] right-[15%]">
          <svg width="60" height="60" viewBox="0 0 60 60" opacity="0.2">
            <g transform="translate(30, 30)">
              <polygon points="0,-25 3,-3 0,0 -3,-3" fill="rgba(60,35,10,0.6)" />
              <polygon points="25,0 3,3 0,0 3,-3" fill="rgba(60,35,10,0.5)" />
              <polygon points="0,25 -3,3 0,0 3,3" fill="rgba(60,35,10,0.4)" />
              <polygon points="-25,0 -3,-3 0,0 -3,3" fill="rgba(60,35,10,0.5)" />
              <circle r="2" fill="rgba(60,35,10,0.4)" />
            </g>
            <text x="30" y="3" textAnchor="middle" fontSize="5" fill="rgba(60,35,10,0.4)" fontFamily="serif">N</text>
          </svg>
        </div>

        {/* SVG paths between locations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {paths.map(([fromId, toId], i) => {
            const from = locations.find((l) => l.id === fromId)!;
            const to = locations.find((l) => l.id === toId)!;
            return (
              <line
                key={`path-${i}`}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="rgba(80, 50, 20, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
            );
          })}
        </svg>

        {/* Location markers */}
        {locations.map((location, i) => (
          <motion.button
            key={location.id}
            className="absolute cursor-pointer bg-transparent border-none outline-none group"
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.3 }}
            onClick={(e) => {
              e.stopPropagation();
              if (!hasMoved.current) {
                setSelectedLocation(
                  selectedLocation?.id === location.id ? null : location
                );
              }
            }}
          >
            <Image
              src={typeMarkers[location.type]}
              alt={location.name}
              width={32}
              height={32}
              className="drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 4px ${typeColors[location.type]}60)`,
              }}
            />
            <span
              className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap
                text-[8px] tracking-[0.15em] font-skyrim opacity-60 group-hover:opacity-100 
                transition-opacity pointer-events-none"
              style={{ color: "rgba(55, 30, 10, 0.75)" }}
            >
              {location.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected location tooltip - fixed on screen */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 w-[380px]
              shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(175, 135, 70, 0.97), rgba(155, 115, 55, 0.97))",
              borderTop: "1px solid rgba(200, 160, 80, 0.4)",
              borderBottom: "2px solid rgba(100, 60, 20, 0.3)",
            }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="font-skyrim text-sm tracking-[0.2em] leading-tight"
                  style={{ color: "rgba(35, 20, 5, 0.9)" }}
                >
                  {selectedLocation.name}
                </h3>
                <span
                  className="text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm shrink-0 ml-3"
                  style={{
                    color: typeColors[selectedLocation.type],
                    backgroundColor: "rgba(40, 25, 10, 0.15)",
                    border: `1px solid ${typeColors[selectedLocation.type]}30`,
                  }}
                >
                  {typeLabels[selectedLocation.type]}
                </span>
              </div>
              <p className="font-skyrim text-[11px] tracking-wider mb-0.5" style={{ color: "rgba(45, 25, 5, 0.8)" }}>
                {selectedLocation.title}
              </p>
              <p className="text-[10px] tracking-wider mb-3" style={{ color: "rgba(60, 35, 10, 0.5)" }}>
                {selectedLocation.period}
              </p>
              <div className="w-full h-px bg-amber-900/15 mb-3" />
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(45, 25, 8, 0.65)" }}>
                {selectedLocation.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-20 right-8 z-20 flex flex-col gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 border border-white/5">
        {Object.entries(typeLabels).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: typeColors[type as keyof typeof typeColors] }}
            />
            <span className="text-[9px] tracking-wider text-foreground/35">{label}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-20 left-8 z-20">
        <p className="text-[9px] tracking-[0.15em] text-foreground/25">
          Drag to pan · Scroll to zoom · Click markers
        </p>
      </div>
    </div>
  );
}
