import { MapPin, Heart, Gem } from "lucide-react";
import { GaneshaMark } from "./ornaments/ganesha-mark";
import { Hairline } from "./hairline";
import { masthead } from "@/lib/content";

export function Masthead() {
  return (
    <header className="pt-6 md:pt-9">
      {/* top strip */}
      <div className="flex items-center justify-between gap-3 text-ink flex-wrap">
        <span className="eyebrow text-[0.62rem] md:text-[0.72rem] order-1">
          {masthead.edition}
        </span>
        <GaneshaMark className="text-copper order-2 mx-auto md:mx-0" size={54} />
        <span className="font-display italic text-copper text-[0.78rem] md:text-base tracking-wide order-3">
          {masthead.hashtag}
        </span>
      </div>

      <Hairline variant="double" className="mt-4" />

      {/* title */}
      <h1
        className="text-ink font-display font-black text-center mt-5 leading-[0.92]"
        style={{
          fontSize: "clamp(2.6rem, 9vw, 6rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {masthead.title.toUpperCase()}
      </h1>

      {/* tagline */}
      <div className="mt-3 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 md:gap-x-4 text-copper text-[0.68rem] md:text-sm font-sans uppercase tracking-[0.28em] md:tracking-[0.34em]">
        {masthead.tagline.map((w, i) => (
          <span key={w} className="flex items-center gap-2 md:gap-4">
            {w}
            {i < masthead.tagline.length - 1 && (
              <Heart size={9} fill="currentColor" strokeWidth={0} />
            )}
          </span>
        ))}
      </div>

      <Hairline variant="double" className="mt-4" />

      {/* info bar: Goa | celebration | Priceless */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-ink text-sm font-sans">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <MapPin size={14} className="text-copper" strokeWidth={1.75} />
          <span className="uppercase tracking-[0.18em]">
            {masthead.locationLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-center font-display italic">
          <Heart size={13} className="text-copper" strokeWidth={1.75} />
          <span>{masthead.centerLabel}</span>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-end">
          <Gem size={13} className="text-copper" strokeWidth={1.75} />
          <span className="uppercase tracking-[0.18em]">
            {masthead.priceLabel}
          </span>
        </div>
      </div>

      <Hairline className="mt-4" />
    </header>
  );
}
