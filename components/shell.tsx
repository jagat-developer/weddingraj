"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { playPaperFlip } from "@/lib/sound";

const EASE = [0.23, 1, 0.32, 1] as const;
const MUTE_KEY = "rajsurti-muted";

export type ShellPage = {
  content: React.ReactNode;
  path: string;
  label: string;
};

type Props = {
  pages: ShellPage[];
  initialIndex?: number;
};

export function NewspaperShell({ pages, initialIndex = 0 }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  // Default to muted — sound is opt-in (premium editorial restraint).
  const [muted, setMuted] = useState(true);

  // Read mute preference from localStorage on mount (overrides the default if
  // the reader has previously enabled sound).
  useEffect(() => {
    let timeout: number | undefined;
    try {
      const stored = localStorage.getItem(MUTE_KEY);
      if (stored === "0") {
        timeout = window.setTimeout(() => setMuted(false), 0);
      }
    } catch {}
    return () => {
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      try {
        localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= pages.length || next === index) return;
      if (!muted) playPaperFlip();
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", pages[next].path);
        // Reset scroll so the new page starts from the top (otherwise the
        // browser keeps the previous numeric scrollTop, dropping the reader
        // partway down the new page).
        window.scrollTo(0, 0);
      }
    },
    [index, pages, muted]
  );

  // Stable refs so wheel/keyboard handlers below register ONCE and always
  // read the latest index + goTo. Re-registering on every index change was
  // resetting the wheel cooldown closure, letting trackpad swipes burst
  // through to the last page.
  const indexRef = useRef(index);
  const goToRef = useRef(goTo);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  // Keyboard — register once
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const t = e.target.tagName;
        if (t === "INPUT" || t === "TEXTAREA") return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown")
        goToRef.current(indexRef.current + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp")
        goToRef.current(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Wheel-driven page turns:
  //   • Horizontal trackpad swipe at any scroll position
  //   • Vertical scroll-past-the-bottom advances to next page
  //   • Vertical scroll-past-the-top goes back to previous page
  //
  // Key tunings (raised after testing — heavy scrolling was flipping pages
  // because the same momentum that put the reader at the boundary was being
  // counted as "intentional overscroll"):
  //   - BOUNDARY_SETTLE  — the reader must already have been at the edge for
  //     this long before wheel events start counting. Lets natural scroll
  //     momentum die down first.
  //   - OVERSCROLL_THRESHOLD — accumulated deltaY required after the settle.
  //     Higher = more deliberate.
  //   - HORIZONTAL_THRESHOLD — trackpad sideways-scroll sensitivity.
  const wheelCoolingRef = useRef(false);
  const overscrollAccumRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const boundarySinceRef = useRef<number | null>(null);
  useEffect(() => {
    const COOLDOWN = 1200;
    const RESET_GAP = 160;
    const OVERSCROLL_THRESHOLD = 220;
    const BOUNDARY_SETTLE = 280; // ms at boundary before overscroll counts
    const HORIZONTAL_THRESHOLD = 60;

    const trigger = (forward: boolean) => {
      wheelCoolingRef.current = true;
      overscrollAccumRef.current = 0;
      boundarySinceRef.current = null;
      window.setTimeout(() => {
        wheelCoolingRef.current = false;
      }, COOLDOWN);
      goToRef.current(indexRef.current + (forward ? 1 : -1));
    };

    const onWheel = (e: WheelEvent) => {
      if (wheelCoolingRef.current) return;

      // 1) Horizontal swipe — independent of scroll position.
      if (
        Math.abs(e.deltaX) > HORIZONTAL_THRESHOLD &&
        Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2
      ) {
        trigger(e.deltaX > 0);
        return;
      }

      // 2) Vertical scroll past the boundary.
      if (Math.abs(e.deltaY) < 3) return;

      const now = Date.now();
      if (now - lastWheelTimeRef.current > RESET_GAP) {
        overscrollAccumRef.current = 0;
      }
      lastWheelTimeRef.current = now;

      const el = document.scrollingElement || document.documentElement;
      const atBottom =
        el.scrollTop + window.innerHeight >= el.scrollHeight - 6;
      const atTop = el.scrollTop <= 6;
      const atBoundary =
        (atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0);

      // Track when the reader first arrived at this boundary.
      if (atBoundary) {
        if (boundarySinceRef.current === null) boundarySinceRef.current = now;
      } else {
        boundarySinceRef.current = null;
        overscrollAccumRef.current = 0;
        return;
      }

      // Ignore scroll momentum during the settle window.
      const timeAtBoundary = now - boundarySinceRef.current;
      if (timeAtBoundary < BOUNDARY_SETTLE) return;

      overscrollAccumRef.current += Math.abs(e.deltaY);
      if (overscrollAccumRef.current > OVERSCROLL_THRESHOLD) {
        trigger(e.deltaY > 0);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Premium editorial transition — translate + opacity only, no 3D rotation,
  // no blur. Feels like a turning page, not a 3D card flip.
  const variants: Variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.16 } },
      }
    : {
        enter: (dir: number) => ({
          x: dir > 0 ? "8%" : "-8%",
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.52, ease: EASE },
        },
        exit: (dir: number) => ({
          x: dir > 0 ? "-8%" : "8%",
          opacity: 0,
          transition: { duration: 0.42, ease: EASE },
        }),
      };

  return (
    <div className="page-stage">
      <AnimatePresence custom={direction} mode="wait" initial={false}>
        <motion.div
          key={index}
          className="page-deck"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag={reduce ? false : "x"}
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            const SWIPE = 90;
            if (info.offset.x < -SWIPE || info.velocity.x < -380) {
              goTo(index + 1);
            } else if (info.offset.x > SWIPE || info.velocity.x > 380) {
              goTo(index - 1);
            }
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {pages[index].content}
        </motion.div>
      </AnimatePresence>

      <PageControls
        index={index}
        total={pages.length}
        pages={pages}
        onGoto={goTo}
        muted={muted}
        onToggleMute={toggleMute}
      />
    </div>
  );
}

function PageControls({
  index,
  total,
  pages,
  onGoto,
  muted,
  onToggleMute,
}: {
  index: number;
  total: number;
  pages: ShellPage[];
  onGoto: (i: number) => void;
  muted: boolean;
  onToggleMute: () => void;
}) {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-5 py-3 rounded-full bg-paper/90 backdrop-blur-sm border border-ink/15 shadow-sm sm:bottom-auto sm:left-auto sm:right-3 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:px-3 sm:py-4"
      role="navigation"
      aria-label="Newspaper pages"
    >
      <button
        type="button"
        onClick={() => onGoto(index - 1)}
        disabled={index === 0}
        aria-label="Previous page"
        className="text-ink hover:text-burgundy disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1"
        style={{
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out-emil)",
        }}
      >
        <ChevronLeft size={22} strokeWidth={1.75} />
      </button>

      <div className="flex items-center gap-2 sm:flex-col">
        {pages.map((p, i) => (
          <button
            key={p.path}
            type="button"
            onClick={() => onGoto(i)}
            aria-label={`Go to ${p.label}`}
            aria-current={i === index}
            className="group p-1"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                i === index ? "w-9 bg-burgundy" : "w-2 bg-ink/30 group-hover:bg-ink/55"
              }`}
              style={{
                transitionDuration: "var(--dur-base)",
                transitionTimingFunction: "var(--ease-out-emil)",
              }}
            />
          </button>
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {pages[index].label}
      </span>

      <button
        type="button"
        onClick={() => onGoto(index + 1)}
        disabled={index === total - 1}
        aria-label="Next page"
        className="text-ink hover:text-burgundy disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1"
        style={{
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out-emil)",
        }}
      >
        <ChevronRight size={22} strokeWidth={1.75} />
      </button>

      <span className="hidden sm:block h-px w-5 bg-ink/15" aria-hidden />

      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? "Unmute page-turn sound" : "Mute page-turn sound"}
        aria-pressed={muted}
        className="text-ink hover:text-burgundy transition-colors p-1"
        style={{
          transitionDuration: "var(--dur-base)",
          transitionTimingFunction: "var(--ease-out-emil)",
        }}
        title={muted ? "Sound off" : "Sound on"}
      >
        {muted ? (
          <VolumeX size={20} strokeWidth={1.75} />
        ) : (
          <Volume2 size={20} strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
