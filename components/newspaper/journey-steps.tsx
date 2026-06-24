import {
  Flame,
  Sparkles,
  Music2,
  Crown,
  Disc3,
  MapPin,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Flourish } from "./ornaments/flourish";
import { day2 } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  sparkles: Sparkles,
  music: Music2,
  crown: Crown,
  disc: Disc3,
};

export function JourneySteps() {
  return (
    <section className="mt-8 md:mt-10">
      <div className="flex items-center justify-center gap-3 text-burgundy">
        <Flourish width={48} />
        <span className="bg-burgundy text-paper px-5 py-1.5 text-[0.74rem] tracking-[0.32em] uppercase font-sans">
          {day2.journeyTitle}
        </span>
        <Flourish width={48} className="-scale-x-100" />
      </div>

      <ol className="mt-7 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3 items-start">
        {(day2.journey as readonly (typeof day2.journey)[number][]).map((step, i) => {
          const Icon = ICONS[step.icon];
          const subtitle = "subtitle" in step ? step.subtitle : undefined;
          return (
            <li
              key={step.step}
              className="relative flex flex-col text-center px-2"
            >
              {/* number bubble */}
              <div className="mx-auto w-9 h-9 rounded-full bg-burgundy text-paper flex items-center justify-center font-display font-bold text-[0.95rem]">
                {step.step}
              </div>

              {/* dotted connector to next item — desktop only */}
              {i < day2.journey.length - 1 && (
                <span
                  className="hidden md:block absolute top-[1.1rem] left-[calc(50%+1.6rem)] right-[calc(-50%+1.6rem)] border-t border-dotted border-ink/30"
                  aria-hidden
                />
              )}

              {Icon && (
                <Icon
                  size={48}
                  strokeWidth={1.3}
                  className="text-burgundy mx-auto mt-5"
                />
              )}

              <h3
                className="mt-3 font-display font-bold text-burgundy leading-[1.1]"
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                  letterSpacing: "0.02em",
                }}
              >
                {step.title.toUpperCase()}
              </h3>

              {subtitle && (
                <p className="mt-1 font-display italic text-ink-soft text-[0.82rem] leading-snug">
                  ({subtitle})
                </p>
              )}

              <div className="mt-4 border-t border-ink/15 pt-3 space-y-2.5 text-left">
                <Row
                  icon={<MapPin size={13} strokeWidth={1.6} />}
                  label="Location"
                  value={step.location}
                />
                <Row
                  icon={<Shirt size={13} strokeWidth={1.6} />}
                  label="Outfit"
                  value={step.outfit}
                />
              </div>

              <p className="mt-3 border-t border-ink/15 pt-3 font-sans text-[0.86rem] leading-[1.55] text-body text-left">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[16px_1fr] gap-2 items-start">
      <span className="text-burgundy mt-0.5">{icon}</span>
      <div className="leading-snug">
        <p className="eyebrow text-burgundy text-[0.58rem]">{label}</p>
        <p className="font-display italic text-ink text-[0.92rem]">{value}</p>
      </div>
    </div>
  );
}
