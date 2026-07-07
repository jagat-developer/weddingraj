import Image from "next/image";
import { CalendarDays, Gem, Heart, MapPin } from "lucide-react";
import { GaneshaMark } from "@/components/newspaper/ornaments/ganesha-mark";
import { families, masthead, story } from "@/lib/content";

export function FrontPage() {
  return (
    <article className="clone-sheet clone-front">
      <header className="clone-front-masthead">
        <div className="clone-mark" aria-hidden={false}>
          <GaneshaMark className="text-copper" size={58} />
        </div>
        <div className="clone-topline">
          <span>Special Wedding Edition</span>
          <span className="font-display italic text-copper">{masthead.hashtag}</span>
        </div>
        <h1 className="clone-paper-title">The Wedding Times</h1>
        <div className="clone-tagline">
          {masthead.tagline.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="clone-info-bar">
          <span><MapPin size={18} fill="currentColor" /> Goa, India</span>
          <span><Heart size={18} /> A celebration of love &amp; new beginnings</span>
          <span><Gem size={18} /> Priceless</span>
        </div>
      </header>

      <section className="clone-breaking">
        <p>Breaking News</p>
        <h2>Shefali &amp; Raj</h2>
        <h3>To Tie The Knot In Goa</h3>
      </section>

      <section className="clone-front-grid">
        <aside className="clone-story">
          <p className="clone-section-label">The Story</p>
          <h3>{story.deck}</h3>
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="clone-signature">Shefali &amp; Raj</p>
        </aside>

        <figure className="clone-front-photo">
          <Image
            src="/images/clone-assets/front-couple-img-0909.jpg"
            alt="Shefali and Raj sitting together in tall grass"
            width={2048}
            height={1365}
            priority
          />
        </figure>

        <aside className="clone-destination">
          <div className="clone-destination-title">
            <span>Destination</span>
            <span>Report</span>
          </div>
          <p className="clone-section-label">Location</p>
          <h3>Kenilworth Resort &amp; Spa, Goa</h3>
          <Image
            src="/images/clone-assets/destination-palm-wave-sketch.png"
            alt="Palm tree, sun, and ocean wave sketch"
            width={760}
            height={868}
            className="clone-destination-filler"
          />
          <div className="clone-date-group">
            <p className="clone-section-label">Celebration Dates</p>
            <DatePill day="Monday" date="1 February, 2027" />
            <span className="clone-amp">&amp;</span>
            <DatePill day="Tuesday" date="2 February, 2027" />
          </div>
        </aside>
      </section>

      <section className="clone-families">
        <h3>
          <span className="clone-family-title-heart" aria-hidden>♥</span>
          <span>Meet The Families Behind The Celebration</span>
          <span className="clone-family-title-heart" aria-hidden>♥</span>
        </h3>
        <div className="clone-family-grid">
          <FamilyBox title="Shefali's Family" members={families.shefali.members} />
          <div className="clone-family-heart"><Heart size={22} fill="currentColor" /></div>
          <FamilyBox title="Raj's Family" members={families.raj.members} columns />
        </div>
      </section>

      <footer className="clone-invite-banner">
        <Heart size={18} fill="currentColor" />
        <div>
          <strong>You Are Officially Invited</strong>
          <span>Join us as we celebrate the greatest headline of our lives.</span>
        </div>
        <Heart size={18} fill="currentColor" />
      </footer>
      <p className="clone-footer-note">RSVP &amp; Details Inside</p>
    </article>
  );
}

function DatePill({ day, date }: { day: string; date: string }) {
  return (
    <div className="clone-date-pill">
      <CalendarDays size={18} />
      <span>{day}</span>
      <strong>{date}</strong>
    </div>
  );
}

function FamilyBox({
  title,
  members,
  columns = false,
}: {
  title: string;
  members: readonly string[];
  columns?: boolean;
}) {
  return (
    <div className="clone-family-box">
      <h4>{title}</h4>
      <ul className={columns ? "clone-two-col-list" : ""}>
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
