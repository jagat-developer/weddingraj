import {
  Users,
  UserRound,
  MessageCircle,
  Plane,
  TrainFront,
  IdCard,
  Sun,
  Shirt,
  Smartphone,
  Music2,
  Heart,
  Search,
  Tag,
  Gift,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Hairline } from "./hairline";
import { Flourish } from "./ornaments/flourish";
import { rsvp } from "@/lib/content";

const RSVP_FIELD_ICONS: Record<string, LucideIcon> = {
  users: Users,
  user: UserRound,
  whatsapp: MessageCircle,
};

const NOTE_ICONS: Record<string, LucideIcon> = {
  id: IdCard,
  sun: Sun,
  shirt: Shirt,
  phone: Smartphone,
  dance: Music2,
  heart: Heart,
};

const CLASS_ICONS: Record<string, LucideIcon> = {
  search: Search,
  heart: Heart,
  users: Users,
  tag: Tag,
  gift: Gift,
  megaphone: Megaphone,
};

function RibbonLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Flourish width={48} className="text-burgundy" />
      <span className="bg-burgundy text-paper px-5 py-1.5 text-[0.72rem] tracking-[0.32em] uppercase font-sans">
        {children}
      </span>
      <Flourish width={48} className="text-burgundy -scale-x-100" />
    </div>
  );
}

export function RsvpCard() {
  return (
    <article className="bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full flex flex-col">
      <RibbonLabel>{rsvp.invite.label}</RibbonLabel>

      <p className="mt-5 text-center font-display italic text-ink text-[1.05rem]">
        {rsvp.invite.intro}
      </p>

      <Hairline className="my-4">
        <span className="text-copper text-[0.7rem]">❦</span>
      </Hairline>

      <p className="text-center eyebrow text-ink-soft text-[0.66rem]">
        {rsvp.invite.instruction}
      </p>

      <ul className="mt-5 space-y-3.5">
        {rsvp.invite.fields.map((f) => {
          const Icon = RSVP_FIELD_ICONS[f.icon];
          return (
            <li key={f.label} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-burgundy text-paper flex items-center justify-center flex-shrink-0">
                {Icon && <Icon size={16} strokeWidth={1.6} />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="eyebrow text-ink text-[0.66rem]">{f.label}</p>
                <span className="block mt-1 border-b border-dotted border-ink/30 h-3" aria-hidden />
              </div>
            </li>
          );
        })}
      </ul>

      <Hairline className="mt-auto pt-5">
        <span className="text-copper text-[0.7rem]">❦</span>
      </Hairline>

      <div className="mt-5 border border-ink/20 rounded-lg px-5 py-4 text-center">
        <p className="eyebrow text-ink-soft text-[0.66rem]">{rsvp.invite.toLabel}</p>
        <p
          className="mt-1 font-display italic text-burgundy"
          style={{ fontSize: "clamp(1.55rem, 2.4vw, 1.85rem)" }}
        >
          {rsvp.invite.toName}
        </p>
      </div>
    </article>
  );
}

export function WordSearchPuzzle() {
  const grid = rsvp.puzzle.grid;
  return (
    <article className="bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full flex flex-col">
      <RibbonLabel>{rsvp.puzzle.label}</RibbonLabel>

      <p className="mt-5 text-center eyebrow text-burgundy">
        {rsvp.puzzle.instruction}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display font-bold text-ink text-[0.96rem]">
        {rsvp.puzzle.words.map((w, i) => (
          <span key={w} className="flex items-center gap-2">
            {w.toUpperCase()}
            {i < rsvp.puzzle.words.length - 1 && (
              <Heart size={9} fill="currentColor" strokeWidth={0} className="text-burgundy" />
            )}
          </span>
        ))}
      </div>

      <div
        className="mt-5 grid gap-px bg-ink/15 border border-ink/20 mx-auto"
        style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`, maxWidth: 460 }}
      >
        {grid.flatMap((row, ri) =>
          row.map((c, ci) => (
            <span
              key={`${ri}-${ci}`}
              className="bg-paper text-center font-sans font-medium text-ink text-[0.78rem] md:text-[0.86rem] aspect-square flex items-center justify-center"
            >
              {c}
            </span>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-end text-burgundy">
        <Search size={20} strokeWidth={1.6} />
      </div>
    </article>
  );
}

export function TravelInfo() {
  return (
    <article className="bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full">
      <RibbonLabel>{rsvp.travel.label}</RibbonLabel>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TravelMode mode={rsvp.travel.flight} icon={Plane} />
          <Hairline className="my-5">
            <span className="text-burgundy">
              <Heart size={11} fill="currentColor" strokeWidth={0} />
            </span>
          </Hairline>
          <TravelMode mode={rsvp.travel.train} icon={TrainFront} />
        </div>

        <div>
          <p className="text-center eyebrow text-burgundy text-[0.66rem]">
            {rsvp.travel.notes.title}
          </p>
          <Hairline className="my-3" />
          <ul className="space-y-3">
            {rsvp.travel.notes.items.map((n) => {
              const Icon = NOTE_ICONS[n.icon];
              return (
                <li key={n.text} className="grid grid-cols-[22px_1fr] gap-3 items-start">
                  <span className="text-burgundy mt-0.5">
                    {Icon && <Icon size={15} strokeWidth={1.6} />}
                  </span>
                  <span className="font-sans text-[0.86rem] leading-[1.55] text-ink">
                    {n.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

function TravelMode({
  mode,
  icon: Icon,
}: {
  mode: { title: string; airport?: string; station?: string; distance: string };
  icon: LucideIcon;
}) {
  const placeName = "airport" in mode ? mode.airport : mode.station;
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-paper border border-ink/15 flex items-center justify-center text-burgundy flex-shrink-0">
          <Icon size={18} strokeWidth={1.6} />
        </span>
        <h4
          className="font-display font-bold text-burgundy leading-tight"
          style={{ fontSize: "clamp(0.98rem, 1.5vw, 1.1rem)", letterSpacing: "0.02em" }}
        >
          {mode.title.toUpperCase()}
        </h4>
      </div>
      <p className="mt-2 font-display font-bold text-ink text-[1rem]">{placeName}</p>
      <p className="mt-1 font-display italic text-ink-soft text-[0.85rem]">
        {mode.distance}
      </p>
    </div>
  );
}

export function ClassifiedAds() {
  return (
    <article className="bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full">
      <RibbonLabel>{rsvp.classifieds.label}</RibbonLabel>

      <ul className="mt-5 space-y-3.5">
        {rsvp.classifieds.items.map((c) => {
          const Icon = CLASS_ICONS[c.icon];
          return (
            <li key={c.tag} className="grid grid-cols-[28px_1fr] gap-3 items-start">
              <span className="text-burgundy mt-0.5">
                {Icon && <Icon size={17} strokeWidth={1.6} />}
              </span>
              <p className="font-sans text-[0.92rem] leading-snug text-ink">
                <span className="font-bold uppercase tracking-[0.06em] text-burgundy">
                  {c.tag}:
                </span>{" "}
                {c.text}
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
