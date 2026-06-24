import Image from "next/image";
import { PageHeader } from "@/components/newspaper/page-header";
import { JourneySteps } from "@/components/newspaper/journey-steps";
import {
  TimelineHighlights,
  CoupleFacts,
  Day2Headlines,
} from "@/components/newspaper/day-2-modules";
import { LaurelLeft } from "@/components/newspaper/ornaments/laurel-left";
import { LaurelRight } from "@/components/newspaper/ornaments/laurel-right";
import { HeartDivider } from "@/components/newspaper/ornaments/heart-divider";
import { day2 } from "@/lib/content";

export function Day2Page() {
  return (
    <article className="broadsheet">
      <PageHeader pageNumber={3} />

      {/* Edition title */}
      <section className="mt-6 md:mt-8 text-center">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <LaurelLeft className="text-burgundy" size={60} />
          <h1
            className="font-display font-black text-ink leading-[0.95]"
            style={{
              fontSize: "clamp(2.3rem, 7.5vw, 5rem)",
              letterSpacing: "-0.005em",
            }}
          >
            <span className="text-ink">DAY </span>
            <span className="text-burgundy">2</span>
            <span className="text-ink"> EDITION</span>
          </h1>
          <LaurelRight className="text-burgundy" size={60} />
        </div>
        <p
          className="mt-2 font-display italic text-copper"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        >
          {day2.deck}
        </p>
      </section>

      <JourneySteps />

      {/* Hero photo */}
      <section className="mt-10">
        <div className="relative w-full overflow-hidden border border-ink/20 rounded-lg" style={{ aspectRatio: "16 / 9" }}>
          <Image
            src="/images/couple.svg"
            alt="Raj and Shefali on the Goan shoreline"
            fill
            sizes="(max-width: 768px) 90vw, 1100px"
            className="object-cover"
          />
          <span className="absolute bottom-3 left-4 font-display italic text-paper/85 text-xs md:text-sm">
            {day2.photoCaption}
          </span>
        </div>
      </section>

      {/* Lower triptych */}
      <section
        className="mt-10 grid gap-8 md:gap-10"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          alignItems: "stretch",
        }}
      >
        <TimelineHighlights />
        <CoupleFacts />
        <Day2Headlines />
      </section>

      <footer className="mt-10">
        <div className="flex justify-center text-burgundy/70">
          <HeartDivider width={260} />
        </div>
        <p className="mt-3 text-center font-display italic text-ink-soft">
          {day2.footer}
        </p>
        <p className="mt-1 text-center font-display font-bold text-ink text-lg">
          03
        </p>
      </footer>
    </article>
  );
}
