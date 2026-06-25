import {
  Calendar,
  Users,
  Heart,
  HandHelping,
  Camera,
  Infinity as InfinityIcon,
  Waves,
  Car,
  Coffee,
  Music2,
  UtensilsCrossed,
  Pizza,
  Globe,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { Heart as HeartFill } from "lucide-react";
import { day2 } from "@/lib/content";

const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  users: Users,
  heart: Heart,
  prayer: HandHelping,
  camera: Camera,
  infinity: InfinityIcon,
};

const FACT_ICONS: Record<string, LucideIcon> = {
  waves: Waves,
  car: Car,
  coffee: Coffee,
  music: Music2,
  utensils: UtensilsCrossed,
  pizza: Pizza,
  dance: Music2,
  globe: Globe,
};

export function TimelineHighlights() {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center gap-2 text-burgundy">
        <HeartFill
          size={14}
          fill="currentColor"
          strokeWidth={0}
          className="text-burgundy"
        />
        <h3
          className="font-display font-bold text-ink"
          style={{
            fontSize: "clamp(0.96rem, 1.5vw, 1.12rem)",
            letterSpacing: "0.02em",
          }}
        >
          {day2.highlightsTitle.toUpperCase()}
        </h3>
      </header>

      <ul className="mt-3 border-t border-ink/20 pt-4 space-y-2.5 flex-1">
        {day2.highlights.map((h) => {
          const Icon = HIGHLIGHT_ICONS[h.icon];
          return (
            <li
              key={h.text}
              className="grid grid-cols-[24px_1fr] gap-3 items-center"
            >
              <span className="text-burgundy">
                {Icon && <Icon size={16} strokeWidth={1.25} />}
              </span>
              <span className="font-sans text-[0.92rem] text-ink">
                {h.text}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 pt-3 border-t border-ink/15 font-display italic text-ink text-[0.88rem] text-center leading-snug">
        {day2.highlightsClose}
      </p>
    </section>
  );
}

export function CoupleFacts() {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center justify-center gap-2 text-center text-burgundy">
        <HeartFill size={13} fill="currentColor" strokeWidth={0} />
        <h3
          className="font-display font-bold text-ink"
          style={{
            fontSize: "clamp(0.96rem, 1.5vw, 1.12rem)",
            letterSpacing: "0.02em",
          }}
        >
          {day2.factsTitle.toUpperCase()}
        </h3>
        <HeartFill size={13} fill="currentColor" strokeWidth={0} />
      </header>
      <p className="mt-1 text-center font-display italic text-ink-soft text-[0.84rem]">
        {day2.factsSubtitle}
      </p>

      <ul className="mt-3 border-t border-ink/20 pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 flex-1">
        {day2.facts.map((f, i) => {
          const Icon = FACT_ICONS[f.icon];
          return (
            <li
              key={i}
              className="grid grid-cols-[20px_1fr] gap-3 items-start"
            >
              <span className="text-burgundy mt-1">
                {Icon && <Icon size={16} strokeWidth={1.25} />}
              </span>
              <span className="font-sans text-[0.84rem] leading-[1.55] text-ink">
                {f.text}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Day2Headlines() {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center gap-2 text-burgundy">
        <Newspaper size={16} strokeWidth={1.25} />
        <h3
          className="font-display font-bold text-ink"
          style={{
            fontSize: "clamp(0.96rem, 1.5vw, 1.12rem)",
            letterSpacing: "0.02em",
          }}
        >
          {day2.headlinesTitle.toUpperCase()}
        </h3>
      </header>

      <ul className="mt-3 border-t border-ink/20 pt-4 space-y-3 flex-1">
        {day2.headlines.map((h) => (
          <li
            key={h}
            className="flex items-start gap-3 font-sans text-[0.9rem] leading-snug text-ink"
          >
            <Newspaper
              size={13}
              strokeWidth={1.25}
              className="text-burgundy mt-1 flex-shrink-0"
            />
            {h}
          </li>
        ))}
      </ul>

      <p className="mt-4 pt-3 border-t border-ink/15 font-display italic text-ink text-[0.88rem] text-center leading-snug">
        {day2.headlinesClose}
      </p>
    </section>
  );
}

// Re-export the heart from lucide just in case
export { Heart };
