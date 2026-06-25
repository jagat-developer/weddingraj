import {
  Flame,
  Sparkles,
  Music2,
  Crown,
  Disc3,
  MapPin,
  Shirt,
  Clock,
  type LucideIcon,
} from "lucide-react";
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
      <div className="flex items-center justify-center gap-4 text-ink">
        <Flourish width={56} className="text-ink/40" />
        <span className="text-[0.7rem] tracking-[0.34em] uppercase font-sans font-medium">
          {day2.journeyTitle}
        </span>
        <Flourish width={56} className="text-ink/40 -scale-x-100" />
      </div>

      <ol className="mt-7 grid grid-cols-2 md:grid-cols-6 gap-x-3 gap-y-7 md:gap-x-4 md:gap-y-10 items-start md:[&>li]:col-span-2 md:[&>li:nth-child(4)]:col-start-2">
        {(day2.journey as readonly (typeof day2.journey)[number][]).map((step) => {
          const Icon = ICONS[step.icon];
          const subtitle = "subtitle" in step ? (step as { subtitle?: string }).subtitle : undefined;
          const time = "time" in step ? (step as { time?: string }).time : undefined;
          return (
            <li
              key={step.step}
              className="relative flex flex-col text-center px-2"
            >
              {/* number — outline disc, editorial */}
              <div className="mx-auto w-8 h-8 rounded-full border border-ink/35 bg-paper text-ink flex items-center justify-center font-display font-medium text-[0.88rem]">
                {step.step}
              </div>

              {Icon && (
                <Icon
                  size={28}
                  strokeWidth={1.1}
                  className="text-ink-soft mx-auto mt-5"
                />
              )}

              <h3
                className="mt-3 font-display font-semibold text-ink leading-[1.15]"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.12rem)",
                  letterSpacing: "0.04em",
                }}
              >
                {step.title.toUpperCase()}
              </h3>

              {subtitle && (
                <p className="mt-1 font-display italic text-ink-soft text-[0.82rem] leading-snug">
                  ({subtitle})
                </p>
              )}

              {time && (
                <p className="mt-3 flex items-center justify-center gap-1.5 font-display font-semibold text-burgundy text-[0.95rem]">
                  <Clock size={13} strokeWidth={1.4} />
                  {time}
                </p>
              )}

              <div className="mt-4 border-t border-ink/15 pt-3 space-y-2.5 text-left">
                <Row
                  icon={<MapPin size={13} strokeWidth={1.25} />}
                  label="Location"
                  value={step.location}
                />
                <Row
                  icon={<Shirt size={13} strokeWidth={1.25} />}
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
