import { SectionEyebrow } from "./section-eyebrow";
import { Signature } from "./ornaments/signature";
import { story } from "@/lib/content";

export function StoryColumn() {
  return (
    <article className="text-body">
      <SectionEyebrow tone="ink">{story.kicker}</SectionEyebrow>

      <p
        className="mt-3 font-display text-ink leading-tight"
        style={{ fontSize: "clamp(1.55rem, 2.5vw, 1.95rem)" }}
      >
        It all started{" "}
        <em className="font-display italic text-copper">
          {story.deck.replace("It all started ", "")}
        </em>
      </p>

      <div className="mt-4 col-prose font-serif text-[0.98rem] leading-[1.65] text-justify hyphens-auto space-y-3 text-body">
        <p className="has-dropcap">{story.paragraphs[0]}</p>
        {story.paragraphs.slice(1).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-5">
        <Signature className="text-burgundy" width={160} />
      </div>
    </article>
  );
}
