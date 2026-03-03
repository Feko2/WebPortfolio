"use client";

interface MuteButtonProps {
  muted: boolean;
  onToggle: () => void;
}

export function MuteButton({ muted, onToggle }: MuteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center
        bg-black/40 border border-white/10 rounded-sm hover:border-white/30 
        transition-all duration-300 group cursor-pointer"
      aria-label={muted ? "Unmute" : "Mute"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-foreground/60 group-hover:text-foreground/90 transition-colors"
      >
        {muted ? (
          <>
            <path
              d="M11 5L6 9H2v6h4l5 4V5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="23"
              y1="9"
              x2="17"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="17"
              y1="9"
              x2="23"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <path
              d="M11 5L6 9H2v6h4l5 4V5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
