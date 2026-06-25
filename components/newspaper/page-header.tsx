import { MapPin } from "lucide-react";
import { GaneshaMark } from "./ornaments/ganesha-mark";
import { Hairline } from "./hairline";
import { masthead } from "@/lib/content";

type Props = { pageNumber: number };

export function PageHeader({ pageNumber }: Props) {
  return (
    <header className="pt-6 md:pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-4 text-ink">
        <div className="flex items-center gap-2 text-sm font-sans justify-center md:justify-start order-2 md:order-1">
          <MapPin size={14} className="text-copper" strokeWidth={1.25} />
          <span className="uppercase tracking-[0.16em]">
            {masthead.locationLabel}
          </span>
        </div>
        <div className="flex flex-col items-center text-center order-1 md:order-2">
          <div className="flex items-center gap-2">
            <GaneshaMark className="text-copper" size={56} />
            <h2
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(1.05rem, 2.8vw, 1.7rem)",
                letterSpacing: "-0.005em",
              }}
            >
              {masthead.title.toUpperCase()}
            </h2>
          </div>
          <p className="mt-1.5 text-[0.62rem] md:text-[0.65rem] font-sans uppercase tracking-[0.26em] md:tracking-[0.3em] text-ink-soft">
            {masthead.edition} <span className="text-copper">•</span> Page{" "}
            {String(pageNumber).padStart(2, "0")}
          </p>
        </div>
        <div className="flex justify-center md:justify-end font-display italic text-copper text-sm md:text-base order-3">
          {masthead.hashtag}
        </div>
      </div>
      <Hairline variant="double" className="mt-4" />
    </header>
  );
}
