import Image from "next/image";
import {
  Gift,
  Heart,
  IdCard,
  MapPin,
  Megaphone,
  Plane,
  Search,
  Shirt,
  Smartphone,
  Sun,
  Tag,
  TrainFront,
  Users,
  type LucideIcon,
} from "lucide-react";
import { InteractiveWordSearch } from "@/components/newspaper/interactive-word-search";
import { RsvpForm } from "@/components/newspaper/rsvp-form";
import { rsvp } from "@/lib/content";
import { CloneIssueHeader, Ribbon } from "./day-1-page";

export function RsvpPage() {
  return (
    <article className="clone-sheet clone-rsvp">
      <CloneIssueHeader page="4" />
      <section className="clone-rsvp-title">
        <span>❧</span>
        <h1>RSVP <b>&amp;</b> Guest Information</h1>
        <span className="right">❧</span>
        <p>{rsvp.deck}</p>
      </section>

      <section className="clone-rsvp-grid">
        <WordSearch />
        <Classifieds />
      </section>

      <section id="guest-information" className="clone-rsvp-full-row scroll-mt-20">
        <TravelInfo />
      </section>

      <section id="rsvp-form" className="clone-rsvp-form-bottom scroll-mt-20">
        <RsvpCard />
      </section>

      <blockquote className="clone-rsvp-quote">
        “ {rsvp.closing.quote} ”
      </blockquote>
      <footer className="clone-rsvp-footer">
        <span>{rsvp.closing.end}</span>
        <strong>{rsvp.closing.signature}</strong>
      </footer>
    </article>
  );
}

function RsvpCard() {
  return (
    <article className="clone-rsvp-card clone-rsvp-submit-card">
      <Ribbon>RSVP</Ribbon>
      <RsvpForm
        intro={rsvp.invite.intro}
        instruction={rsvp.invite.instruction}
        assistance={rsvp.invite.assistance}
      />
    </article>
  );
}

function WordSearch() {
  return (
    <article className="clone-rsvp-card">
      <Ribbon>{rsvp.puzzle.label}</Ribbon>
      <InteractiveWordSearch
        grid={rsvp.puzzle.grid}
        instruction={rsvp.puzzle.instruction}
        words={rsvp.puzzle.words}
      />
    </article>
  );
}

function TravelInfo() {
  const noteIcons: Record<string, LucideIcon> = {
    id: IdCard,
    sun: Sun,
    shirt: Shirt,
    phone: Smartphone,
    dance: Users,
    heart: Heart,
  };
  return (
    <article className="clone-rsvp-card clone-travel">
      <Ribbon>{rsvp.travel.label}</Ribbon>
      <div className="clone-travel-grid">
        <div>
          <TravelMode icon={Plane} title={rsvp.travel.flight.title} place={rsvp.travel.flight.airport} distance={rsvp.travel.flight.distance} />
          <TravelMode icon={TrainFront} title={rsvp.travel.train.title} place={rsvp.travel.train.station} distance={rsvp.travel.train.distance} />
        </div>
        <div>
          <h3>{rsvp.travel.notes.title}</h3>
          <ul>
            {rsvp.travel.notes.items.map((item) => {
              const Icon = noteIcons[item.icon];
              return <li key={item.text}><Icon size={18} /> {item.text}</li>;
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

function TravelMode({
  icon: Icon,
  title,
  place,
  distance,
}: {
  icon: LucideIcon;
  title: string;
  place: string;
  distance: string;
}) {
  return (
    <section className="clone-travel-mode">
      <Icon size={30} />
      <h3>{title}</h3>
      <strong>{place}</strong>
      <p><MapPin size={15} /> {distance}</p>
    </section>
  );
}

function Classifieds() {
  const icons: Record<string, LucideIcon> = {
    search: Search,
    heart: Heart,
    users: Users,
    tag: Tag,
    gift: Gift,
    megaphone: Megaphone,
  };
  return (
    <article className="clone-rsvp-card clone-classifieds">
      <Ribbon>{rsvp.classifieds.label}</Ribbon>
      <ul>
        {rsvp.classifieds.items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.tag}>
              <Icon size={24} />
              <span><strong>{item.tag}:</strong> {item.text}</span>
            </li>
          );
        })}
      </ul>
      <figure className="clone-classifieds-sketch" aria-hidden>
        <Image
          src="/images/clone-assets/destination-sketch.jpg"
          alt=""
          width={448}
          height={320}
        />
      </figure>
    </article>
  );
}
