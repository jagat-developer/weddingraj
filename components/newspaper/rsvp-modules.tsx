import {
  Plane,
  TrainFront,
  IdCard,
  Sun,
  Shirt,
  Smartphone,
  Music2,
  Heart,
  Search,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import { Hairline } from "./hairline";
import { Flourish } from "./ornaments/flourish";
import { RsvpForm } from "./rsvp-form";
import { rsvp } from "@/lib/content";

const NOTE_ICONS: Record<string, LucideIcon> = {
  id: IdCard,
  sun: Sun,
  shirt: Shirt,
  phone: Smartphone,
  dance: Music2,
  heart: Heart,
};

function RibbonLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-ink">
      <Flourish width={52} className="text-ink/40" />
      <span className="text-[0.7rem] tracking-[0.34em] uppercase font-sans font-medium">
        {children}
      </span>
      <Flourish width={52} className="text-ink/40 -scale-x-100" />
    </div>
  );
}

export function RsvpCard() {
  return (
    <article className="card-lift bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full flex flex-col">
      <RibbonLabel>{rsvp.invite.label}</RibbonLabel>
      <RsvpForm
        intro={rsvp.invite.intro}
        instruction={rsvp.invite.instruction}
        assistance={rsvp.invite.assistance}
      />
    </article>
  );
}

export function WordSearchPuzzle() {
  const grid = rsvp.puzzle.grid;
  return (
    <article className="card-lift bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full flex flex-col">
      <RibbonLabel>{rsvp.puzzle.label}</RibbonLabel>

      <p className="mt-5 text-center eyebrow text-burgundy">
        {rsvp.puzzle.instruction}
      </p>

      <p className="mt-3 text-center font-display italic text-ink text-[1.02rem]">
        {rsvp.puzzle.words.map((w) => w).join(" · ")}
      </p>

      <div
        className="mt-5 grid gap-px bg-ink/10 border border-ink/20 w-full"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
        }}
      >
        {grid.flatMap((row, ri) =>
          row.map((c, ci) => (
            <span
              key={`${ri}-${ci}`}
              className="bg-paper text-center font-sans font-medium text-ink/85 text-[0.9rem] md:text-[1.05rem] aspect-square flex items-center justify-center"
            >
              {c}
            </span>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-ink-soft">
        <span className="flex items-center gap-2 font-display italic text-[0.82rem]">
          <Pencil size={13} strokeWidth={1.2} />
          Circle each word as you find it
        </span>
        <Search size={18} strokeWidth={1.1} />
      </div>
    </article>
  );
}

export function TravelInfo() {
  return (
    <article className="card-lift bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full">
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
                    {Icon && <Icon size={15} strokeWidth={1.25} />}
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
          <Icon size={18} strokeWidth={1.25} />
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
    <article className="card-lift bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 h-full">
      <RibbonLabel>{rsvp.classifieds.label}</RibbonLabel>

      <ul className="mt-5 divide-y divide-ink/10">
        {rsvp.classifieds.items.map((c) => (
          <li
            key={c.tag}
            className="py-2.5 font-serif text-[0.92rem] leading-snug text-ink"
          >
            <span className="font-sans uppercase tracking-[0.18em] text-[0.66rem] text-ink-soft mr-2">
              {c.tag}
            </span>
            <span className="font-display italic">{c.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
