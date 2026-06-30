import Image from "next/image";
import {
  Clock,
  MapPin,
  Newspaper,
  Shirt,
  Sparkles,
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
          image="/images/clone-assets/haldi-scene.jpg"
          alt="Poolside Haldi setup with yellow drapes and marigolds"
          imageWidth={459}
          imageHeight={322}
        />
        <Day1EventCard
          label="Evening Edition"
          data={day1.sangeet}
          image="/images/clone-assets/sangeet-stage.jpg"
          alt="Sangeet stage with chandeliers and lights"
          imageWidth={464}
          imageHeight={322}
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
      <span className="clone-leaf" aria-hidden>❧</span>
      <h1>Day <span className="clone-edition-day-number">{day}</span> Edition</h1>
      <span className="clone-leaf right" aria-hidden>❧</span>
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
}: {
  label: string;
  data: EventCardData;
  image: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
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
      <figure className="clone-event-image">
        <Image src={image} alt={alt} width={imageWidth} height={imageHeight} />
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
    ["LOVE", "Strong Buy", TrendingUp],
    ["LAUGHTER", "Rising Rapidly", TrendingUp],
    ["DANCE MOVES", "Bull Market", TrendingUp],
    ["GOOD VIBES", "Record Highs", TrendingUp],
    ["TEQUILA", "Limited Supply", Sparkles],
    ["SLEEP", "Falling Fast", TrendingDown],
  ] as const;
  return (
    <article className="clone-mini-panel">
      <h3><span className="clone-bank">▤</span> Wedding Stock Exchange</h3>
      <p>Market Report</p>
      <table className="clone-stock-table">
        <tbody>
          {rows.map(([symbol, trend, Icon]) => (
            <tr key={symbol}>
              <th>{symbol}</th>
              <td><Icon size={14} /> {trend}</td>
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
