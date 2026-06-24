import { LaurelLeft } from "./ornaments/laurel-left";
import { LaurelRight } from "./ornaments/laurel-right";
import { Flourish } from "./ornaments/flourish";
import { day1 } from "@/lib/content";

export function EditionTitle() {
  return (
    <section className="mt-6 md:mt-8 text-center">
      <div className="flex items-center justify-center gap-4 md:gap-8">
        <LaurelLeft className="text-burgundy" size={60} />
        <h1
          className="font-display font-black text-ink leading-[0.95]"
          style={{
            fontSize: "clamp(2.4rem, 8vw, 5.25rem)",
            letterSpacing: "-0.005em",
          }}
        >
          <span className="text-ink">DAY </span>
          <span className="text-burgundy">1</span>
          <span className="text-ink"> EDITION</span>
        </h1>
        <LaurelRight className="text-burgundy" size={60} />
      </div>
      <p
        className="mt-2 font-display italic text-copper"
        style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.45rem)" }}
      >
        {day1.deck}
      </p>
      <div className="mt-3 flex justify-center text-copper">
        <Flourish width={150} />
      </div>
    </section>
  );
}
