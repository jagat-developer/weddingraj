import { Masthead } from "@/components/newspaper/masthead";
import { HeadlineBlock } from "@/components/newspaper/headline-block";
import { StoryColumn } from "@/components/newspaper/story-column";
import { CouplePhoto } from "@/components/newspaper/couple-photo";
import { DestinationCard } from "@/components/newspaper/destination-card";
import { FamiliesBlock } from "@/components/newspaper/families-block";
import { InvitedBanner } from "@/components/newspaper/invited-banner";

export function FrontPage() {
  return (
    <article className="broadsheet">
      <Masthead />

      <HeadlineBlock />

      <section className="mt-8 md:mt-10 fp-grid">
        <div className="fp-story">
          <StoryColumn />
        </div>
        <div className="fp-photo">
          <CouplePhoto
            src="/images/couple.svg"
            alt="Shefali and Raj on the Goa shoreline"
          />
        </div>
        <div className="fp-dest">
          <DestinationCard />
        </div>
        <div className="fp-families">
          <FamiliesBlock />
        </div>
      </section>

      <InvitedBanner />
    </article>
  );
}
