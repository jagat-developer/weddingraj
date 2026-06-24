import { PageHeader } from "@/components/newspaper/page-header";
import { EditionTitle } from "@/components/newspaper/edition-title";
import { EventCard } from "@/components/newspaper/event-card";
import { CeremonyTimeline } from "@/components/newspaper/ceremony-timeline";
import { HeartDivider } from "@/components/newspaper/ornaments/heart-divider";
import { day1 } from "@/lib/content";

export function Day1Page() {
  return (
    <article className="broadsheet">
      <PageHeader pageNumber={2} />

      <EditionTitle />

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <EventCard
          variant="afternoon"
          data={day1.haldi}
          image="/images/haldi.svg"
          imageAlt="Poolside Haldi ceremony with marigold drapes and palm trees"
        />
        <EventCard
          variant="evening"
          data={day1.sangeet}
          image="/images/sangeet.svg"
          imageAlt="Indoor Sangeet stage with chandeliers and a dance floor"
        />
      </section>

      <CeremonyTimeline />

      <footer className="mt-10">
        <div className="flex justify-center text-burgundy/70">
          <HeartDivider width={260} />
        </div>
        <p className="mt-3 text-center font-display font-bold text-ink text-lg">
          02
        </p>
      </footer>
    </article>
  );
}
