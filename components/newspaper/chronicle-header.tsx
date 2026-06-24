import { Flourish } from "./ornaments/flourish";
import { Hairline } from "./hairline";
import { day1 } from "@/lib/content";

export function ChronicleHeader() {
  return (
    <section className="mt-10 text-center">
      <Hairline variant="double" />

      <p className="mt-4 eyebrow text-ink-soft text-[0.7rem] tracking-[0.34em]">
        {day1.chronicle.subtitle}
      </p>
      <h2
        className="mt-2 font-display font-black text-ink leading-[1] tracking-[-0.005em]"
        style={{ fontSize: "clamp(1.95rem, 4vw, 2.85rem)" }}
      >
        {day1.chronicle.title.toUpperCase()}
      </h2>

      <div className="mt-3 flex justify-center text-copper">
        <Flourish width={160} />
      </div>

      <p className="mt-3 eyebrow text-burgundy">Breaking News</p>
      <p
        className="mt-1 font-display font-bold italic text-ink"
        style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)" }}
      >
        {day1.chronicle.breaking}
      </p>

      <Hairline className="mt-5" />
    </section>
  );
}
