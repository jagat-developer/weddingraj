import { Stars, Check, X } from "lucide-react";
import { day1 } from "@/lib/content";

export function HeadlinesList() {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center gap-2 text-burgundy">
        <Stars size={16} strokeWidth={1.6} />
        <h3
          className="font-display font-bold text-ink"
          style={{
            fontSize: "clamp(0.96rem, 1.5vw, 1.12rem)",
            letterSpacing: "0.02em",
          }}
        >
          {day1.horoscope.title.toUpperCase()}
        </h3>
      </header>
      <p className="mt-1 eyebrow text-ink-soft text-[0.6rem]">
        {day1.horoscope.audience}
      </p>

      <div className="mt-3 border-t border-ink/20 pt-4 flex-1 space-y-5">
        <div>
          <p className="font-display italic text-ink text-[0.92rem]">
            {day1.horoscope.doIntro}
          </p>
          <ul className="mt-2 space-y-1.5">
            {day1.horoscope.doList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-sans text-[0.92rem] text-ink"
              >
                <Check
                  size={13}
                  strokeWidth={2}
                  className="text-burgundy mt-1 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display italic text-ink text-[0.92rem]">
            {day1.horoscope.avoidIntro}
          </p>
          <ul className="mt-2 space-y-1.5">
            {day1.horoscope.avoidList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-sans text-[0.92rem] text-ink"
              >
                <X
                  size={13}
                  strokeWidth={2}
                  className="text-copper mt-1 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
