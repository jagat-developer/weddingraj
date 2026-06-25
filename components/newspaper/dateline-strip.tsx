import { MapPin, Calendar } from "lucide-react";
import { venue } from "@/lib/content";
import { Flourish } from "./ornaments/flourish";

/**
 * Quiet front-page dateline — venue and dates as a single horizontal line,
 * flanked by tiny flourishes. Replaces the heavier DestinationCard for the
 * "simple but attractive" layout.
 */
export function DatelineStrip() {
  return (
    <div className="flex flex-col items-center text-ink">
      <Flourish width={120} className="text-burgundy/35" />

      <div className="mt-3 flex items-center justify-center gap-3 md:gap-5 flex-wrap text-center">
        <span className="flex items-center gap-2 font-display">
          <MapPin size={15} className="text-burgundy" strokeWidth={1.25} />
          <span
            className="text-ink"
            style={{ fontSize: "clamp(0.98rem, 1.5vw, 1.18rem)" }}
          >
            {venue.name}, {venue.city}
          </span>
        </span>

        <span className="hidden md:block text-copper/60 text-xs">❦</span>

        <span className="flex items-center gap-2 font-display italic text-ink">
          <Calendar size={15} className="text-burgundy" strokeWidth={1.25} />
          <span style={{ fontSize: "clamp(0.98rem, 1.5vw, 1.18rem)" }}>
            1–2 February 2027
          </span>
        </span>
      </div>

      <Flourish width={120} className="mt-3 text-burgundy/35 -scale-y-100" />
    </div>
  );
}
