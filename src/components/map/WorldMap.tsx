"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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

const MAP_ASPECT = 43 / 24;
const MIN_SCALE = 1;
const MAX_SCALE = 3;
/** Opens slightly zoomed so Mexico fills more of the frame; user can scroll/pinch to adjust. */
const INITIAL_SCALE = 1.5;

export function WorldMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [scale, setScale] = useState(INITIAL_SCALE);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);

  const clampPan = useCallback(
    (x: number, y: number, s: number) => {
      if (!containerRef.current || !mapRef.current) return { x, y };
      const container = containerRef.current.getBoundingClientRect();
      const mapW = container.width * s;
      const mapH = container.height * s;

      const maxX = Math.max(0, (mapW - container.width) / 2);
      const maxY = Math.max(0, (mapH - container.height) / 2);

      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    hasMoved.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved.current = true;
      setPan((p) => clampPan(p.x + dx, p.y + dy, scale));
      lastPos.current = { x: e.clientX, y: e.clientY };
    },
    [scale, clampPan]
  );

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const newScale = Math.max(
        MIN_SCALE,
        Math.min(MAX_SCALE, scale - e.deltaY * 0.002)
      );
      setScale(newScale);
      setPan((p) => clampPan(p.x, p.y, newScale));
    },
    [scale, clampPan]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchStartDist.current = Math.hypot(dx, dy);
        pinchStartScale.current = scale;
      } else if (e.touches.length === 1) {
        dragging.current = true;
        hasMoved.current = false;
        lastPos.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    },
    [scale]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const newScale = Math.max(
          MIN_SCALE,
          Math.min(
            MAX_SCALE,
            pinchStartScale.current * (dist / pinchStartDist.current)
          )
        );
        setScale(newScale);
        setPan((p) => clampPan(p.x, p.y, newScale));
      } else if (e.touches.length === 1 && dragging.current) {
        const dx = e.touches[0].clientX - lastPos.current.x;
        const dy = e.touches[0].clientY - lastPos.current.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved.current = true;
        setPan((p) => clampPan(p.x + dx, p.y + dy, scale));
        lastPos.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    },
    [scale, clampPan]
  );

  const handleTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    setPan((p) => clampPan(p.x, p.y, scale));
  }, [scale, clampPan]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      {/* Outer wrapper handles interaction */}
      <div
        ref={containerRef}
        className="relative w-full cursor-grab active:cursor-grabbing select-none"
        style={{
          aspectRatio: `${MAP_ASPECT}`,
          maxHeight: "calc(100vh - 10rem)",
          maxWidth: "100%",
          touchAction: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Zoomable/pannable map layer */}
        <div
          ref={mapRef}
          className="absolute inset-0 origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: dragging.current ? "none" : "transform 0.15s ease-out",
          }}
        >
          {/* Map image */}
          <Image
            src="/images/mexico-map.png"
            alt="Parchment map of Mexico"
            fill
            className="object-contain pointer-events-none"
            priority
            draggable={false}
          />

          {/* SVG paths between locations */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {paths.map(([fromId, toId], i) => {
              const from = locations.find((l) => l.id === fromId);
              const to = locations.find((l) => l.id === toId);
              if (!from || !to) return null;
              return (
                <line
                  key={`path-${i}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="rgba(80, 50, 20, 0.35)"
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
              transition={{
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 200,
              }}
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
                  filter: `drop-shadow(0 0 6px ${typeColors[location.type]}80)`,
                }}
              />
              <span
                className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[8px] tracking-[0.15em] font-skyrim opacity-60 group-hover:opacity-100
                  transition-opacity pointer-events-none"
                style={{ color: "rgba(55, 30, 10, 0.85)" }}
              >
                {location.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Legend (overlays on top, not affected by pan/zoom) */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 border border-white/5">
          {Object.entries(typeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: typeColors[type as keyof typeof typeColors],
                }}
              />
              <span className="text-[9px] tracking-wider text-foreground/35">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="absolute top-4 left-4 z-20">
          <p className="text-[9px] tracking-[0.15em] text-foreground/25">
            Drag to pan · Scroll to zoom · Click markers
          </p>
        </div>
      </div>

      {/* Selected location tooltip - fixed on screen, outside map container */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 w-[380px] max-w-[90vw]
              shadow-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(175, 135, 70, 0.97), rgba(155, 115, 55, 0.97))",
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
              <p
                className="font-skyrim text-[11px] tracking-wider mb-0.5"
                style={{ color: "rgba(45, 25, 5, 0.8)" }}
              >
                {selectedLocation.title}
              </p>
              <p
                className="text-[10px] tracking-wider mb-3"
                style={{ color: "rgba(60, 35, 10, 0.5)" }}
              >
                {selectedLocation.period}
              </p>
              <div className="w-full h-px bg-amber-900/15 mb-3" />
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: "rgba(45, 25, 8, 0.65)" }}
              >
                {selectedLocation.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
