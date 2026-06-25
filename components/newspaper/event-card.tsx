import Image from "next/image";
import { MapPin, Clock, Shirt, Sparkles } from "lucide-react";
import { Hairline } from "./hairline";
import type { EventCardData } from "@/lib/content";

type Variant = "afternoon" | "evening";

type Props = {
  variant: Variant;
  data: EventCardData;
  image: string;
  imageAlt: string;
};

export function EventCard({ variant, data, image, imageAlt }: Props) {
  const isEvening = variant === "evening";
  const ornament = isEvening ? (
    <Sparkles size={12} strokeWidth={1.25} />
  ) : (
    <span aria-hidden className="text-[11px] leading-none">
      ❦
    </span>
  );

  return (
    <article className="bg-paper-deep/60 border border-ink/20 overflow-hidden flex flex-col h-full">
      {/* ribbon */}
      <div className="bg-burgundy text-paper">
        <div className="flex items-center justify-center gap-3 py-2.5 px-6">
          <span className="opacity-70">{ornament}</span>
          <span
            className="font-sans text-[0.72rem] md:text-[0.78rem] font-medium"
            style={{ letterSpacing: "0.32em" }}
          >
            {data.label.toUpperCase()}
          </span>
          <span className="opacity-70">{ornament}</span>
        </div>
      </div>

      <div className="px-5 py-6 md:px-7 md:py-7 flex flex-col gap-5 flex-1">
        <h3
          className="font-display font-black text-ink leading-[1.04] text-center heading"
          style={{
            fontSize: "clamp(1.8rem, 3.4vw, 2.35rem)",
            letterSpacing: "0.005em",
          }}
        >
          {data.title.toUpperCase()}
        </h3>

        <ul className="space-y-3 font-serif text-ink">
          <Row
            icon={<MapPin size={16} strokeWidth={1.25} />}
            label="Location"
            value={data.location}
          />
          <Row
            icon={<Clock size={16} strokeWidth={1.25} />}
            label="Time"
            value={data.time}
          />
          <Row
            icon={<Shirt size={16} strokeWidth={1.25} />}
            label="Dress Code"
            value={data.dress}
          />
        </ul>

        <Hairline className="my-1">
          <span className="text-copper text-[0.7rem]">❦</span>
        </Hairline>

        <div>
          <p className="text-center eyebrow text-burgundy">What To Expect</p>
          <p className="mt-2 font-serif text-[0.96rem] leading-[1.7] text-center text-body prose-block mx-auto">
            {data.expect}
          </p>
        </div>

        <div className="mt-auto pt-2">
          <div className="relative aspect-[16/10] w-full border border-ink/25 overflow-hidden bg-paper">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="grid grid-cols-[24px_1fr] gap-3 items-start">
      <span className="text-burgundy mt-1">{icon}</span>
      <div>
        <p className="eyebrow text-burgundy text-[0.65rem]">{label}</p>
        <p className="font-display italic text-ink text-[1.02rem] leading-snug">
          {value}
        </p>
      </div>
    </li>
  );
}
