import { MapPin, Calendar } from "lucide-react";
import { PalmSketch } from "./ornaments/palm-sketch";
import { SectionEyebrow } from "./section-eyebrow";
import { Hairline } from "./hairline";
import { venue, dates } from "@/lib/content";

export function DestinationCard() {
  return (
    <aside className="bg-paper-warm border border-ink/15 rounded-lg p-5 md:p-6">
      <SectionEyebrow tone="ink" className="block text-center">
        Destination Report
      </SectionEyebrow>

      <div className="mt-3 text-burgundy/85 flex justify-center">
        <PalmSketch width={220} />
      </div>

      <Hairline className="my-5">
        <span className="text-copper text-[0.7rem]">❦</span>
      </Hairline>

      <div className="text-center">
        <p className="eyebrow text-ink-soft">Location</p>
        <MapPin
          size={16}
          className="text-burgundy mx-auto mt-2"
          strokeWidth={1.75}
        />
        <h3
          className="mt-2 font-display font-bold text-ink leading-[1.1]"
          style={{
            fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)",
            letterSpacing: "0.008em",
          }}
        >
          {venue.name.toUpperCase()},
          <br />
          {venue.city.toUpperCase()}
        </h3>
      </div>

      <Hairline className="my-5">
        <span className="text-copper text-[0.7rem]">❦</span>
      </Hairline>

      <div className="text-center">
        <p className="eyebrow text-ink-soft">Celebration Dates</p>
        <div className="mt-3 space-y-2">
          {dates.map((d, i) => (
            <div key={d.date}>
              <div className="bg-paper border border-ink/15 rounded-lg py-3 px-4 flex items-center gap-3 justify-center">
                <Calendar size={18} className="text-burgundy" strokeWidth={1.6} />
                <div className="text-left">
                  <p className="text-[0.7rem] font-sans uppercase tracking-[0.24em] text-ink-soft">
                    {d.day}
                  </p>
                  <p className="font-display font-bold text-ink text-base md:text-lg leading-tight">
                    {d.date}
                  </p>
                </div>
              </div>
              {i === 0 && (
                <p className="font-display italic text-copper text-base mt-1.5 leading-none">
                  &amp;
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
