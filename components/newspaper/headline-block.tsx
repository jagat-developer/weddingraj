import { SectionEyebrow } from "./section-eyebrow";
import { headline } from "@/lib/content";

export function HeadlineBlock() {
  return (
    <div className="mt-8 md:mt-10 text-center">
      <SectionEyebrow withFlourish tone="burgundy">
        {headline.kicker}
      </SectionEyebrow>
      <h1
        className="mt-3 font-display font-black text-ink leading-[0.94]"
        style={{
          fontSize: "clamp(2.75rem, 9vw, 5.75rem)",
          letterSpacing: "0.005em",
        }}
      >
        {headline.primary.toUpperCase()}
      </h1>
      <p
        className="mt-2 font-display font-medium uppercase text-copper"
        style={{
          fontSize: "clamp(1rem, 2.4vw, 1.5rem)",
          letterSpacing: "0.32em",
        }}
      >
        {headline.subhead}
      </p>
    </div>
  );
}
