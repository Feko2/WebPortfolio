"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { motion } from "framer-motion";
import { skills, SkillCategory, SkillNode } from "@/data/skills";

function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface BGStar {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      speed: number;
      phase: number;
    }

    const stars: BGStar[] = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      baseOpacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle =
          Math.sin(time * 0.001 * star.speed + star.phase) * 0.4 + 0.6;
        const alpha = star.baseOpacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 210, 240, ${alpha})`;
        ctx.fill();

        if (star.size > 1.2) {
          const glow = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 4
          );
          glow.addColorStop(0, `rgba(77, 201, 246, ${alpha * 0.2})`);
          glow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

function circularOffset(
  index: number,
  active: number,
  total: number
): number {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function findNearestNode(
  nodes: SkillNode[],
  currentIdx: number,
  direction: "up" | "down" | "left" | "right"
): number | null {
  const current = nodes[currentIdx];
  const candidates = nodes
    .map((node, i) => ({ node, i }))
    .filter(({ i }) => i !== currentIdx)
    .filter(({ node }) => {
      switch (direction) {
        case "up":
          return node.y < current.y;
        case "down":
          return node.y > current.y;
        case "left":
          return node.x < current.x;
        case "right":
          return node.x > current.x;
      }
    });

  if (candidates.length === 0) return null;

  const isVertical = direction === "up" || direction === "down";
  return candidates.reduce((best, curr) => {
    const bDist = isVertical
      ? Math.abs(best.node.y - current.y) + Math.abs(best.node.x - current.x) * 2
      : Math.abs(best.node.x - current.x) + Math.abs(best.node.y - current.y) * 2;
    const cDist = isVertical
      ? Math.abs(curr.node.y - current.y) + Math.abs(curr.node.x - current.x) * 2
      : Math.abs(curr.node.x - current.x) + Math.abs(curr.node.y - current.y) * 2;
    return cDist < bDist ? curr : best;
  }).i;
}

const NORTHERN_STAR_GLOW =
  "drop-shadow(0 0 6px rgba(255, 255, 255, 0.9)) " +
  "drop-shadow(0 0 14px rgba(180, 220, 255, 0.7)) " +
  "drop-shadow(0 0 22px rgba(77, 201, 246, 0.4))";

const ConstellationSVG = memo(function ConstellationSVG({
  skill,
  isActive,
  selectedNode,
  onNodeClick,
}: {
  skill: SkillCategory;
  isActive: boolean;
  selectedNode: number | null;
  onNodeClick?: (index: number) => void;
}) {
  const lineGlow = isActive
    ? "drop-shadow(0 0 4px rgba(77, 201, 246, 0.5))"
    : "drop-shadow(0 0 2px rgba(77, 201, 246, 0.3))";
  const starGlow = isActive
    ? "drop-shadow(0 0 6px rgba(180, 220, 255, 0.9)) drop-shadow(0 0 12px rgba(77, 201, 246, 0.5))"
    : "drop-shadow(0 0 4px rgba(180, 220, 255, 0.7)) drop-shadow(0 0 8px rgba(77, 201, 246, 0.3))";

  const isConnectionHighlighted = (from: number, to: number) =>
    selectedNode !== null && (from === selectedNode || to === selectedNode);

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connection lines with CSS glow */}
      <g style={{ filter: lineGlow }}>
        {skill.connections.map(([from, to], i) => {
          const f = skill.constellation[from];
          const t = skill.constellation[to];
          const highlighted = isConnectionHighlighted(from, to);
          return (
            <line
              key={`line-${i}`}
              x1={f.x}
              y1={f.y}
              x2={t.x}
              y2={t.y}
              stroke={
                highlighted
                  ? "rgba(200, 240, 255, 0.9)"
                  : isActive
                  ? "rgba(140, 215, 250, 0.65)"
                  : "rgba(100, 190, 235, 0.45)"
              }
              strokeWidth={highlighted ? "2.5" : "1.5"}
            />
          );
        })}
      </g>

      {/* Pulsing rings — no filter, just animated stroke */}
      {skill.constellation.map((node, i) => (
        <circle
          key={`ring-${i}`}
          cx={node.x}
          cy={node.y}
          r="10"
          fill="none"
          stroke="rgba(77, 201, 246, 0.15)"
          strokeWidth="0.5"
        >
          <animate
            attributeName="r"
            values="10;17;10"
            dur={`${2.5 + i * 0.3}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur={`${2.5 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Star nodes — per-node glow for northern star effect */}
      {skill.constellation.map((node, i) => {
        const isSelected = selectedNode === i;
        return (
          <g
            key={`star-${i}`}
            style={{
              filter: isSelected ? NORTHERN_STAR_GLOW : starGlow,
              cursor: onNodeClick ? "pointer" : "default",
            }}
            onClick={
              onNodeClick
                ? (e) => {
                    e.stopPropagation();
                    onNodeClick(i);
                  }
                : undefined
            }
          >
            {/* Invisible hit area for easier clicking */}
            {onNodeClick && (
              <circle cx={node.x} cy={node.y} r="18" fill="transparent" />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={isSelected ? 6 : 4.5}
              fill={
                isSelected
                  ? "rgba(255, 255, 255, 1)"
                  : isActive
                  ? "rgba(220, 245, 255, 1)"
                  : "rgba(200, 235, 255, 0.95)"
              }
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={isSelected ? 3 : 2}
              fill="white"
            />
          </g>
        );
      })}

      {/* Labels — clean, no filters */}
      {skill.constellation.map((node, i) => {
        const isSelected = selectedNode === i;
        return (
          <text
            key={`label-${i}`}
            x={node.x}
            y={node.y - (isSelected ? 26 : 22)}
            textAnchor="middle"
            fill={
              isSelected
                ? "rgba(255, 255, 255, 0.95)"
                : isActive
                ? "rgba(200, 230, 250, 0.8)"
                : "rgba(180, 210, 235, 0.55)"
            }
            fontSize={isSelected ? "13px" : "12px"}
            fontFamily="'Futura', 'Century Gothic', sans-serif"
            letterSpacing="0.12em"
            fontWeight={isSelected ? "600" : isActive ? "500" : "normal"}
          >
            {node.label}
          </text>
        );
      })}
    </svg>
  );
});

export function ConstellationView({ onBack }: { onBack?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusedNode, setFocusedNode] = useState<number | null>(null);
  /** After a horizontal carousel step, ignore repeat horizontal until wheel silence (same as one arrow). */
  const carouselHorizontalWheelLock = useRef(false);
  /** After wheel-triggered enter-focus, brief lock until silence (avoids double-enter before state updates). */
  const carouselVerticalWheelLock = useRef(false);
  /** Wheel handler reads this so routing updates immediately when exiting focus mid-gesture. */
  const focusedNodeRef = useRef<number | null>(null);

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const [spacing, setSpacing] = useState(550);

  const isFocused = focusedNode !== null;

  useEffect(() => {
    setFocusedNode(null);
  }, [activeIndex]);

  useEffect(() => {
    const update = () => setSpacing(window.innerWidth * 0.42);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const navigate = useCallback((dir: number) => {
    setActiveIndex((prev) => {
      let next = prev + dir;
      if (next < 0) next = skills.length - 1;
      if (next >= skills.length) next = 0;
      return next;
    });
  }, []);

  const enterFocused = useCallback(() => {
    const nodes = skills[activeIndex].constellation;
    const maxY = Math.max(...nodes.map((n) => n.y));
    const bottomIdx = nodes.findIndex((n) => n.y === maxY);
    setFocusedNode(bottomIdx);
  }, [activeIndex]);

  const exitFocused = useCallback(() => {
    setFocusedNode(null);
  }, []);

  const navigateRef = useRef(navigate);
  const enterFocusedRef = useRef(enterFocused);
  const exitFocusedRef = useRef(exitFocused);

  useLayoutEffect(() => {
    focusedNodeRef.current = focusedNode;
    navigateRef.current = navigate;
    enterFocusedRef.current = enterFocused;
    exitFocusedRef.current = exitFocused;
  });

  /** Unlock carousel wheel only when leaving focused mode — not on every activeIndex change. */
  useEffect(() => {
    if (focusedNode === null) {
      carouselHorizontalWheelLock.current = false;
      carouselVerticalWheelLock.current = false;
    }
  }, [focusedNode]);

  /* Wheel — horizontal = carousel, vertical up = enter focused mode, vertical down (focused) = exit.
   * Horizontal and vertical use separate locks so a horizontal swipe does not block scrolling up
   * to enter focus (unlike a single shared lock). Listener is mounted once (refs hold callbacks). */
  useEffect(() => {
    let accumulatedX = 0;
    let accumulatedY = 0;
    let focusAccumX = 0;
    let focusAccumY = 0;
    let gestureEndTimer: ReturnType<typeof setTimeout> | null = null;
    /**
     * Small threshold so the carousel responds quickly; further horizontal delta in the same inertia
     * stream is ignored until silence (horizontal lock only).
     */
    const HORIZONTAL_COMMIT_THRESHOLD = 36;
    /** Vertical scroll accumulated for enter focus / exit focus. */
    const VERTICAL_WHEEL_THRESHOLD = 90;
    /** Shorter silence so successive swipes feel closer to repeated arrow keys. */
    const GESTURE_END_MS = 120;

    const scheduleGestureEnd = () => {
      if (gestureEndTimer) clearTimeout(gestureEndTimer);
      gestureEndTimer = setTimeout(() => {
        carouselHorizontalWheelLock.current = false;
        carouselVerticalWheelLock.current = false;
        accumulatedX = 0;
        accumulatedY = 0;
        focusAccumX = 0;
        focusAccumY = 0;
        gestureEndTimer = null;
      }, GESTURE_END_MS);
    };

    const wheelToPixels = (ev: WheelEvent) => {
      let dx = ev.deltaX;
      let dy = ev.deltaY;
      if (ev.deltaMode === 1) {
        dx *= 16;
        dy *= 16;
      } else if (ev.deltaMode === 2) {
        dx *= 800;
        dy *= 800;
      }
      return { dx, dy };
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scheduleGestureEnd();

      const { dx, dy } = wheelToPixels(e);

      if (focusedNodeRef.current !== null) {
        focusAccumX += dx;
        focusAccumY += dy;

        if (
          focusAccumY >= VERTICAL_WHEEL_THRESHOLD &&
          focusAccumY > Math.abs(focusAccumX)
        ) {
          focusedNodeRef.current = null;
          carouselHorizontalWheelLock.current = false;
          carouselVerticalWheelLock.current = false;
          focusAccumX = 0;
          focusAccumY = 0;
          exitFocusedRef.current();
        }
        return;
      }

      accumulatedX += dx;
      accumulatedY += dy;

      if (
        !carouselHorizontalWheelLock.current &&
        Math.abs(accumulatedX) >= HORIZONTAL_COMMIT_THRESHOLD &&
        Math.abs(accumulatedX) > Math.abs(accumulatedY)
      ) {
        navigateRef.current(accumulatedX > 0 ? 1 : -1);
        carouselHorizontalWheelLock.current = true;
        accumulatedX = 0;
        return;
      }

      if (
        !carouselVerticalWheelLock.current &&
        accumulatedY <= -VERTICAL_WHEEL_THRESHOLD &&
        Math.abs(accumulatedY) > Math.abs(accumulatedX)
      ) {
        enterFocusedRef.current();
        carouselHorizontalWheelLock.current = true;
        carouselVerticalWheelLock.current = true;
        accumulatedX = 0;
        accumulatedY = 0;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (gestureEndTimer) clearTimeout(gestureEndTimer);
    };
  }, []);

  /* Unified keyboard handler — capture phase to intercept before page-level ESC */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedNode !== null) {
        let direction: "up" | "down" | "left" | "right" | null = null;

        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W")
          direction = "up";
        else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
          direction = "down";
        else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
          direction = "left";
        else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
          direction = "right";

        if (direction) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const next = findNearestNode(
            skills[activeIndex].constellation,
            focusedNode,
            direction
          );
          if (next !== null) {
            setFocusedNode(next);
          } else if (direction === "down") {
            exitFocused();
          }
          return;
        }

        if (e.key === "Escape") {
          e.preventDefault();
          e.stopImmediatePropagation();
          exitFocused();
          return;
        }
      } else {
        if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
          navigate(-1);
          return;
        }
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          navigate(1);
          return;
        }
        if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
          e.preventDefault();
          e.stopImmediatePropagation();
          enterFocused();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [focusedNode, activeIndex, navigate, enterFocused, exitFocused, onBack]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;
    const isTap = Math.abs(dx) < 5 && Math.abs(dy) < 5;

    if (isFocused) {
      if (isTap) exitFocused();
    } else {
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        navigate(dx > 0 ? -1 : 1);
      } else if (isTap) {
        const el = e.currentTarget as HTMLElement;
        const { left, width } = el.getBoundingClientRect();
        const x = e.clientX - left;
        const third = width / 3;
        if (x < third) {
          navigate(-1);
        } else if (x > width - third) {
          navigate(1);
        } else {
          enterFocused();
        }
      }
    }
    pointerStart.current = null;
  };

  const handleNodeClick = useCallback((index: number) => {
    setFocusedNode(index);
  }, []);

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <NebulaBackground />

      {/* Constellation carousel — each skill has its constellation + name */}
      <div
        className="flex-1 relative z-10 select-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {skills.map((skill, i) => {
          const offset = circularOffset(i, activeIndex, skills.length);
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          if (isFocused && absOffset > 1) return null;
          if (!isFocused && absOffset > 2) return null;

          const x = isFocused && !isActive ? offset * spacing * 2 : offset * spacing;
          const y = isActive ? (isFocused ? 30 : -20) : 0;
          const opacity =
            isFocused && !isActive ? 0 : Math.max(0, 1 - absOffset * 0.4);
          const scale = isActive
            ? isFocused
              ? 1.4
              : 1.12
            : Math.max(0.6, 0.88 - absOffset * 0.08);

          return (
            <motion.div
              key={skill.id}
              animate={{ x, y, opacity, scale }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                willChange: "transform",
                pointerEvents: "none",
                perspective: 800,
              }}
            >
              <motion.div
                style={{
                  width: "min(900px, 85vw)",
                  height: "min(500px, 58vh)",
                  transformOrigin: "center center",
                  pointerEvents: isActive && isFocused ? "auto" : "none",
                }}
                onPointerUp={isActive && isFocused ? (e) => e.stopPropagation() : undefined}
                animate={{
                  rotateX: isFocused && isActive ? 12 : 0,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ConstellationSVG
                  skill={skill}
                  isActive={isActive}
                  selectedNode={isActive ? focusedNode : null}
                  onNodeClick={isActive && isFocused ? handleNodeClick : undefined}
                />
              </motion.div>

              {/* Skill name + level + description below its own constellation */}
              <motion.div
                animate={{
                  opacity: isFocused ? 0 : 1,
                  y: isFocused ? 20 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-skyrim tracking-[0.25em] text-foreground mt-4 text-center">
                  <span className="text-2xl text-glow-cyan">{skill.name}</span>{" "}
                  <span className="text-3xl text-glow-cyan font-bold">
                    {skill.level}
                  </span>
                </h3>
                {offset === 0 && (
                  <p className="text-xs text-foreground/45 max-w-md mx-auto leading-relaxed px-6 mt-2 text-center">
                    {skill.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
