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
  const [muted, setMuted] = useState(false);

  // Read mute preference from localStorage on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(MUTE_KEY) === "1") setMuted(true);
    } catch {}
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
  // An accumulator + threshold prevents the first wheel tick at the boundary
  // from triggering — the reader must keep scrolling in the same direction.
  const wheelCoolingRef = useRef(false);
  const overscrollAccumRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  useEffect(() => {
    const COOLDOWN = 1200;
    const RESET_GAP = 220; // ms — accumulator resets if user pauses scrolling
    const OVERSCROLL_THRESHOLD = 140; // accumulated deltaY at the boundary

    const trigger = (forward: boolean) => {
      wheelCoolingRef.current = true;
      overscrollAccumRef.current = 0;
      window.setTimeout(() => {
        wheelCoolingRef.current = false;
      }, COOLDOWN);
      goToRef.current(indexRef.current + (forward ? 1 : -1));
    };

    const onWheel = (e: WheelEvent) => {
      if (wheelCoolingRef.current) return;

      // 1) Horizontal swipe — independent of scroll position.
      if (Math.abs(e.deltaX) > 30 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
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
        el.scrollTop + window.innerHeight >= el.scrollHeight - 4;
      const atTop = el.scrollTop <= 4;

      if (e.deltaY > 0 && atBottom) {
        overscrollAccumRef.current += e.deltaY;
        if (overscrollAccumRef.current > OVERSCROLL_THRESHOLD) trigger(true);
      } else if (e.deltaY < 0 && atTop) {
        overscrollAccumRef.current += Math.abs(e.deltaY);
        if (overscrollAccumRef.current > OVERSCROLL_THRESHOLD) trigger(false);
      } else {
        overscrollAccumRef.current = 0;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  const variants: Variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.22 } },
        exit: { opacity: 0, transition: { duration: 0.18 } },
      }
    : {
        enter: (dir: number) => ({
          x: dir > 0 ? "32%" : "-32%",
          rotateY: dir > 0 ? -22 : 22,
          opacity: 0,
          filter: "blur(2px)",
        }),
        center: {
          x: 0,
          rotateY: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.82, ease: EASE },
        },
        exit: (dir: number) => ({
          x: dir > 0 ? "-32%" : "32%",
          rotateY: dir > 0 ? 22 : -22,
          opacity: 0,
          filter: "blur(2px)",
          transition: { duration: 0.82, ease: EASE },
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
          style={{
            transformOrigin: direction >= 0 ? "left center" : "right center",
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
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-3 py-2 rounded-full bg-paper/90 backdrop-blur-sm border border-ink/15 shadow-sm"
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
        <ChevronLeft size={18} strokeWidth={1.75} />
      </button>

      <div className="flex items-center gap-1.5">
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
              className={`block h-1.5 rounded-full transition-all ${
                i === index ? "w-7 bg-burgundy" : "w-1.5 bg-ink/30 group-hover:bg-ink/55"
              }`}
              style={{
                transitionDuration: "var(--dur-base)",
                transitionTimingFunction: "var(--ease-out-emil)",
              }}
            />
          </button>
        ))}
      </div>

      <span className="hidden sm:inline font-display italic text-ink-soft text-xs">
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
        <ChevronRight size={18} strokeWidth={1.75} />
      </button>

      <span className="hidden sm:block w-px h-4 bg-ink/15" aria-hidden />

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
          <VolumeX size={16} strokeWidth={1.75} />
        ) : (
          <Volume2 size={16} strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
