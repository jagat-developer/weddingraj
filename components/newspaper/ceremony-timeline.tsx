import {
  Flower2,
  UtensilsCrossed,
  Sun,
  Sparkles,
  Mic,
  Wine,
  Disc3,
  type LucideIcon,
} from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Hairline } from "./hairline";
import { day1 } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  flower: Flower2,
  utensils: UtensilsCrossed,
  sun: Sun,
  sparkles: Sparkles,
  mic: Mic,
  wine: Wine,
  disc: Disc3,
};

export function CeremonyTimeline() {
  const { title, deck, entries } = day1.timeline;
  return (
    <section className="mt-10 py-2">
      <Hairline />

      <header className="text-center mt-5">
        <SectionEyebrow tone="burgundy">Today&apos;s Schedule</SectionEyebrow>
        <h2
          className="mt-2 font-display font-bold text-ink leading-tight"
          style={{
            fontSize: "clamp(1.55rem, 2.8vw, 2.1rem)",
            letterSpacing: "-0.005em",
          }}
        >
          {title.toUpperCase()}
        </h2>
        <p
          className="mt-1 font-display italic text-ink-soft"
          style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.05rem)" }}
        >
          {deck}
        </p>
      </header>

      {/* Desktop: horizontal timeline */}
      <ol className="hidden md:flex relative mt-8 items-start justify-between gap-2 px-1">
        <span
          className="absolute top-[1.45rem] left-[4%] right-[4%] h-px bg-ink/30"
          aria-hidden
        />
        {entries.map((entry, i) => {
          const Icon = ICONS[entry.icon];
          return (
            <li
              key={`${entry.time}-${i}`}
              className="relative flex flex-col items-center text-center"
              style={{ flex: "1 1 0" }}
            >
              <p className="font-sans uppercase text-[0.66rem] tracking-[0.18em] text-ink mb-2">
                {entry.time}
              </p>
              <span className="relative z-10 w-2 h-2 rounded-full bg-burgundy" />
              <div className="mt-3 w-11 h-11 lg:w-12 lg:h-12 flex items-center justify-center">
                {Icon && (
                  <Icon
                    size={22}
                    strokeWidth={1.4}
                    className="text-burgundy"
                  />
                )}
              </div>
              <p className="mt-1 font-sans uppercase text-[0.62rem] tracking-[0.14em] text-ink-soft leading-tight">
                {entry.label}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Mobile: vertical timeline */}
      <ol className="md:hidden mt-6 relative pl-2 space-y-4">
        <span
          className="absolute left-[1.4rem] top-3 bottom-3 w-px bg-ink/30"
          aria-hidden
        />
        {entries.map((entry, i) => {
          const Icon = ICONS[entry.icon];
          return (
            <li key={`${entry.time}-${i}`} className="flex items-center gap-4 relative">
              <div className="relative z-10 w-10 h-10 flex items-center justify-center flex-shrink-0 bg-paper">
                {Icon && (
                  <Icon size={18} strokeWidth={1.5} className="text-burgundy" />
                )}
              </div>
              <div>
                <p className="font-sans uppercase text-[0.66rem] tracking-[0.2em] text-ink">
                  {entry.time}
                </p>
                <p className="font-display text-ink text-[1.02rem] leading-tight">
                  {entry.label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <Hairline className="mt-7" />
    </section>
  );
}
