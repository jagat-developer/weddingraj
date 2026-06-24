import { Heart } from "lucide-react";
import { LaurelLeft } from "./ornaments/laurel-left";
import { LaurelRight } from "./ornaments/laurel-right";
import { families } from "@/lib/content";

export function FamiliesBlock() {
  return (
    <section className="h-full bg-paper-warm border border-ink/15 rounded-lg px-5 py-6 md:px-7 md:py-7 relative overflow-hidden">
      <LaurelLeft
        className="text-burgundy/30 absolute -left-3 -top-3 hidden md:block"
        size={60}
      />
      <LaurelRight
        className="text-burgundy/35 absolute -right-2 -bottom-3 hidden md:block"
        size={80}
      />

      <div className="text-center relative z-10">
        <div className="flex items-center justify-center gap-3">
          <Heart
            size={13}
            className="text-burgundy"
            fill="currentColor"
            strokeWidth={0}
          />
          <h3 className="eyebrow text-ink">{families.heading}</h3>
          <Heart
            size={13}
            className="text-burgundy"
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
        <p
          className="mt-2 font-display italic text-copper"
          style={{ fontSize: "clamp(0.94rem, 1.55vw, 1.06rem)" }}
        >
          {families.intro}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto_1.45fr] gap-4 md:gap-5 items-stretch relative z-10">
        <FamilyCard
          label={families.shefali.label}
          members={families.shefali.members}
        />
        <div className="flex md:flex-col items-center justify-center text-burgundy">
          <Heart size={20} fill="currentColor" strokeWidth={0} />
        </div>
        <FamilyCard
          label={families.raj.label}
          members={families.raj.members}
          twoCols
        />
      </div>
    </section>
  );
}

function FamilyCard({
  label,
  members,
  twoCols,
}: {
  label: string;
  members: readonly string[];
  twoCols?: boolean;
}) {
  return (
    <div className="bg-paper/85 border border-ink/12 rounded-md px-4 py-4 md:px-5 md:py-5">
      <p className="text-center md:text-left eyebrow text-burgundy">{label}</p>
      <ul
        className={`mt-3 font-sans text-[0.92rem] text-ink leading-[1.7] ${
          twoCols ? "md:columns-2 md:gap-6" : ""
        }`}
      >
        {members.map((m) => (
          <li
            key={m}
            className="flex items-center gap-2 break-inside-avoid"
          >
            <Heart
              size={9}
              fill="currentColor"
              strokeWidth={0}
              className="text-burgundy flex-shrink-0"
            />
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
