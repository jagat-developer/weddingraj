import { MapPin, Shirt, Sun, Sparkles } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Hairline } from "./hairline";
import { itinerary } from "@/lib/content";

const periodIcon = {
  Haldi: Sun,
  Sangeet: Sparkles,
} as const;

export function ItineraryStrip() {
  return (
    <section className="mt-8 py-2">
      <Hairline />

      <header className="text-center mt-5">
        <SectionEyebrow tone="burgundy">{itinerary.heading}</SectionEyebrow>
        <p
          className="mt-2 font-display italic text-ink-soft"
          style={{ fontSize: "clamp(0.92rem, 1.5vw, 1.05rem)" }}
        >
          {itinerary.deck}
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {itinerary.events.map((e) => {
          const Icon = periodIcon[e.title as keyof typeof periodIcon];
          return (
            <article key={e.title} className="text-center md:text-left">
              <header className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                {Icon && (
                  <Icon size={16} strokeWidth={1.6} className="text-burgundy" />
                )}
                <h3
                  className="font-display font-bold text-ink leading-tight"
                  style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.7rem)" }}
                >
                  {e.title.toUpperCase()}
                </h3>
                <span className="font-display italic text-ink-soft text-[0.92rem]">
                  {e.when.toLowerCase()}
                </span>
              </header>

              <dl className="mt-3 space-y-1.5 text-[0.92rem]">
                <Row label="Attire" value={e.attire} icon={<Shirt size={13} strokeWidth={1.6} />} />
                <Row label="Location" value={e.location} icon={<MapPin size={13} strokeWidth={1.6} />} />
              </dl>
            </article>
          );
        })}
      </div>

      <Hairline className="mt-6" />
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
    <div className="flex items-baseline gap-3 justify-center md:justify-start">
      <span className="text-burgundy translate-y-px">{icon}</span>
      <dt className="eyebrow text-burgundy text-[0.62rem]">{label}</dt>
      <dd className="font-display italic text-ink">{value}</dd>
    </div>
  );
}
