import Image from "next/image";
import {
  Clock,
  MapPin,
  Newspaper,
  Shirt,
  Sun,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { GaneshaMark } from "@/components/newspaper/ornaments/ganesha-mark";
import { day1, type EventCardData } from "@/lib/content";

export function Day1Page() {
  return (
    <article className="clone-sheet clone-day-page">
      <CloneIssueHeader page="2" />
      <EditionHero day="1" deck={day1.deck} />

      <section className="clone-day1-events">
        <Day1EventCard
          label="Afternoon Edition"
          data={day1.haldi}
          image="/images/clone-assets/haldi-couple-img-0703.jpg"
          alt="Shefali and Raj walking together in Haldi outfits beside bamboo and a cart wheel"
          imageWidth={2304}
          imageHeight={1536}
          imageClassName="clone-event-image-haldi"
        />
        <Day1EventCard
          label="Evening Edition"
          data={day1.sangeet}
          image="/images/clone-assets/sangeet-couple-stage-eagle-crop.jpg"
          alt="Shefali and Raj celebrating together in front of a festival stage"
          imageWidth={997}
          imageHeight={692}
          imageClassName="clone-event-image-sangeet"
        />
      </section>

      <section className="clone-bottom-modules">
        <WeatherForecast />
        <StockExchange />
        <TodayHeadlines />
      </section>

      <footer className="clone-page-number">♥ &nbsp; 02 &nbsp; ♥</footer>
    </article>
  );
}

function CloneIssueHeader({ page }: { page: string }) {
  return (
    <>
      <div className="clone-issue-ganesha" aria-hidden={false}>
        <GaneshaMark className="text-copper" size={96} />
      </div>
      <header className="clone-issue-header">
        <span><MapPin size={17} fill="currentColor" /> Goa, India</span>
        <div>
          <strong>The Wedding Times</strong>
          <em>Special Wedding Edition &bull; Page {page}</em>
        </div>
        <span className="font-display italic text-copper">#RajWaliShefali</span>
      </header>
    </>
  );
}

function EditionHero({ day, deck }: { day: string; deck: string }) {
  return (
    <section className="clone-edition-hero">
      <div className="clone-edition-title-wrap">
        <Image
          src="/images/clone-assets/title-leaf-photo.png"
          alt=""
          width={542}
          height={874}
          className="clone-leaf"
          aria-hidden="true"
          loading="eager"
        />
        <h1>Day <span className="clone-edition-day-number">{day}</span> Edition</h1>
        <Image
          src="/images/clone-assets/title-leaf-photo.png"
          alt=""
          width={542}
          height={874}
          className="clone-leaf right"
          aria-hidden="true"
          loading="eager"
        />
      </div>
      <p>{deck}</p>
    </section>
  );
}

function Day1EventCard({
  label,
  data,
  image,
  alt,
  imageWidth,
  imageHeight,
  imageClassName,
}: {
  label: string;
  data: EventCardData;
  image: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  imageClassName?: string;
}) {
  return (
    <article className="clone-event-card">
      <Ribbon>{label}</Ribbon>
      <h2>{data.title}</h2>
      <InfoRow icon={MapPin} label="Location:" value={data.location} />
      <InfoRow icon={Clock} label="Time:" value={data.time} />
      <InfoRow icon={Shirt} label="Dress Code:" value={data.dress} />
      <div className="clone-dotted-rule" />
      <h3>What To Expect:</h3>
      <p>{data.expect}</p>
      <figure className={`clone-event-image ${imageClassName ?? ""}`}>
        <Image
          src={image}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading="eager"
        />
      </figure>
    </article>
  );
}

function Ribbon({ children }: { children: React.ReactNode }) {
  return <div className="clone-ribbon">{children}</div>;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="clone-info-row">
      <Icon size={24} />
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}

function WeatherForecast() {
  const rows = [
    ["Celebration Index", "Off The Charts"],
    ["Dancing", "Extremely Likely"],
    ["Music Level", "High"],
    ["Love Is In The Air", "100%"],
    ["Sunshine", "100%"],
    ["Ocean Vibes", "Perfect"],
    ["Mood Outlook", "Celebratory"],
    ["Coconut Index", "Very High"],
    ["SPF Advisory", "Don't Skip!"],
    ["Hydration Reminder", "Drink Up!"],
    ["Good Hair Day", "High Chance"],
    ["Chance Of Getting Enough Sleep", "0%"],
  ];
  return (
    <article className="clone-mini-panel">
      <h3><Sun size={25} /> Goa Weather Forecast</h3>
      <p>Today&apos;s Conditions</p>
      <ol className="clone-weather-list">
        {rows.map(([label, value]) => (
          <li key={label}><span>{label}</span><strong>{value}</strong></li>
        ))}
      </ol>
      <div className="clone-beach-line">⌁⌁⌁ ☼ ⌁⌁⌁</div>
    </article>
  );
}

function StockExchange() {
  const rows = [
    ["LOVE", "Strong Buy", TrendingUp, "up"],
    ["LAUGHTER", "Rising Rapidly", TrendingUp, "up"],
    ["DANCE MOVES", "Bull Market", TrendingUp, "up"],
    ["GOOD VIBES", "Record Highs", TrendingUp, "up"],
    ["HAPPY TEARS", "Expected Spike", TrendingUp, "up"],
    ["SLEEP", "Falling Fast", TrendingDown, "down"],
  ] as const;
  return (
    <article className="clone-mini-panel clone-stock-panel">
      <h3><span className="clone-bank">▤</span> Wedding Stock Exchange</h3>
      <p>Market Report</p>
      <table className="clone-stock-table">
        <tbody>
          {rows.map(([symbol, trend, Icon, direction]) => (
            <tr key={symbol}>
              <th>{symbol}</th>
              <td data-trend={direction}><Icon size={14} /> {trend}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <strong className="clone-recommendation">Analyst Recommendation:</strong>
      <em>“Invest heavily in memories. Returns expected to last a lifetime.”</em>
    </article>
  );
}

function TodayHeadlines() {
  const items = [
    "Guests begin arriving in Goa",
    "Yellow attire dominates afternoon forecasts",
    "Dance floor preparations complete",
    "Secret family performances under investigation",
    "Experts predict an unforgettable evening",
    "Celebration levels expected to remain at record highs",
    "Cameras unable to keep up with candid moments",
    "DJ confirms volume will increase after sunset",
    "Outfit compliments reach all-time high",
    "Sunglasses become the accessory of the day",
    "Calories temporarily declared irrelevant",
  ];
  return (
    <article className="clone-mini-panel">
      <h3><Newspaper size={25} /> Today&apos;s Headlines</h3>
      <ul className="clone-headline-list">
        {items.map((item) => (
          <li key={item}><Newspaper size={16} /> {item}</li>
        ))}
      </ul>
    </article>
  );
}

export { CloneIssueHeader, EditionHero, Ribbon, InfoRow };
