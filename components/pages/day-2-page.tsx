import Image from "next/image";
import {
  CalendarDays,
  Camera,
  Car,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Music2,
  Newspaper,
  Shirt,
  Users,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { day2 } from "@/lib/content";
import { CloneIssueHeader, EditionHero, Ribbon } from "./day-1-page";

export function Day2Page() {
  return (
    <article className="clone-sheet clone-day2">
      <CloneIssueHeader page="3" />
      <EditionHero day="2" deck={day2.deck} />
      <Ribbon>{day2.journeyTitle}</Ribbon>

      <section className="clone-journey-columns">
        {day2.journey.map((step) => (
          <JourneyColumn key={step.step} step={step} />
        ))}
      </section>

      <Image
        src="/images/clone-assets/day2-couple-landscape-2754.jpg"
        alt="Shefali and Raj holding hands on the Goa shoreline"
        width={980}
        height={340}
        className="clone-wide-photo"
      />

      <section className="clone-day2-modules">
        <Day2Highlights />
        <CoupleFacts />
        <Day2Headlines />
      </section>

      <footer className="clone-page-number">♥ &nbsp; 03 &nbsp; ♥</footer>
    </article>
  );
}

const JOURNEY_IMAGES: Record<string, { src: string; width: number; height: number }> = {
  flame: { src: "/images/clone-assets/icon-grah-shanti.png", width: 220, height: 170 },
  sparkles: { src: "/images/clone-assets/icon-chooda.png", width: 220, height: 170 },
  music: { src: "/images/clone-assets/icon-baaraat.png", width: 220, height: 170 },
  crown: { src: "/images/clone-assets/icon-wedding.png", width: 220, height: 170 },
  disc: { src: "/images/clone-assets/icon-party.png", width: 220, height: 170 },
};

function JourneyColumn({
  step,
}: {
  step: (typeof day2.journey)[number];
}) {
  const img = JOURNEY_IMAGES[step.icon];
  return (
    <article className="clone-journey-card">
      <span className="clone-step-number">{step.step}</span>
      <span className="clone-journey-icon-frame" aria-hidden>
        <Image
          src={img.src}
          alt=""
          width={img.width}
          height={img.height}
          className="clone-journey-icon"
        />
      </span>
      <h2>{step.title}</h2>
      <p className="clone-time"><Clock size={16} /> {step.time}</p>
      <InfoTiny icon={MapPin} label="Location:" value={step.location} />
      <InfoTiny icon={Shirt} label="Dress Code:" value={step.outfit} />
      <div className="clone-dotted-rule" />
      <p>{step.description}</p>
    </article>
  );
}

function InfoTiny({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="clone-info-tiny">
      <Icon size={16} />
      <div><strong>{label}</strong><span>{value}</span></div>
    </div>
  );
}

function Day2Highlights() {
  const icons: Record<string, LucideIcon> = {
    calendar: CalendarDays,
    users: Users,
    heart: Heart,
    prayer: Heart,
    camera: Camera,
  };
  return (
    <article className="clone-day2-panel">
      <h3>{day2.highlightsTitle}</h3>
      <ul>
        {day2.highlights.map((item) => {
          const Icon = icons[item.icon];
          return <li key={item.text}><Icon size={23} /> <span>{item.text}</span></li>;
        })}
      </ul>
      <em>{day2.highlightsClose}</em>
    </article>
  );
}

function CoupleFacts() {
  const icons: Record<string, LucideIcon> = {
    waves: Waves,
    car: Car,
    coffee: Coffee,
    music: Music2,
    utensils: UtensilsCrossed,
    pizza: Heart,
    dance: Users,
  };
  return (
    <article className="clone-day2-panel clone-facts-panel">
      <h3>♥ {day2.factsTitle} ♥</h3>
      <p>{day2.factsSubtitle}</p>
      <div>
        {day2.facts.map((fact) => {
          const Icon = icons[fact.icon];
          return <span key={fact.text}><Icon size={20} /> {fact.text}</span>;
        })}
      </div>
    </article>
  );
}

function Day2Headlines() {
  return (
    <article className="clone-day2-panel">
      <h3>{day2.headlinesTitle}</h3>
      <ul>
        {day2.headlines.map((headline) => (
          <li key={headline}><Newspaper size={22} /> <span>{headline}</span></li>
        ))}
      </ul>
      <em>{day2.headlinesClose}</em>
    </article>
  );
}
