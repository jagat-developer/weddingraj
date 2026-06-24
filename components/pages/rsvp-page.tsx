import { PageHeader } from "@/components/newspaper/page-header";
import { LaurelLeft } from "@/components/newspaper/ornaments/laurel-left";
import { LaurelRight } from "@/components/newspaper/ornaments/laurel-right";
import { HeartDivider } from "@/components/newspaper/ornaments/heart-divider";
import {
  RsvpCard,
  WordSearchPuzzle,
  TravelInfo,
  ClassifiedAds,
} from "@/components/newspaper/rsvp-modules";
import { rsvp } from "@/lib/content";

export function RsvpPage() {
  return (
    <article className="broadsheet">
      <PageHeader pageNumber={4} />

      <section className="mt-6 md:mt-8 text-center">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <LaurelLeft className="text-burgundy" size={56} />
          <h1
            className="font-display font-black text-ink leading-[0.96]"
            style={{
              fontSize: "clamp(1.95rem, 6vw, 4rem)",
              letterSpacing: "-0.005em",
            }}
          >
            RSVP <span className="text-burgundy">&</span> GUEST INFORMATION
          </h1>
          <LaurelRight className="text-burgundy" size={56} />
        </div>
        <p
          className="mt-2 font-display italic text-copper"
          style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}
        >
          {rsvp.deck}
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <RsvpCard />
        <WordSearchPuzzle />
      </section>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
        <TravelInfo />
        <ClassifiedAds />
      </section>

      <section className="mt-10 text-center">
        <p
          className="font-display italic text-ink mx-auto prose-block"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)" }}
        >
          <span className="text-copper text-2xl leading-none align-[-0.1em] mr-1">
            &ldquo;
          </span>
          {rsvp.closing.quote}
          <span className="text-copper text-2xl leading-none align-[-0.1em] ml-1">
            &rdquo;
          </span>
        </p>
      </section>

      <footer className="mt-8">
        <div className="flex justify-center text-burgundy/70">
          <HeartDivider width={260} />
        </div>
        <p className="mt-3 text-center font-display italic text-ink-soft">
          {rsvp.closing.end}
        </p>
        <p
          className="mt-2 text-center font-display font-bold text-ink"
          style={{ fontSize: "clamp(1.4rem, 2vw, 1.65rem)", letterSpacing: "0.18em" }}
        >
          {rsvp.closing.signature.toUpperCase()}
        </p>
        <p className="mt-2 text-center font-display font-bold text-ink text-base">
          04
        </p>
      </footer>
    </article>
  );
}
