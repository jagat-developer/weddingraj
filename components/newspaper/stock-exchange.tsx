import { Landmark } from "lucide-react";
import { day1 } from "@/lib/content";

export function StockExchange() {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center gap-2 text-burgundy">
        <Landmark size={16} strokeWidth={1.6} />
        <h3
          className="font-display font-bold text-ink"
          style={{
            fontSize: "clamp(0.96rem, 1.5vw, 1.12rem)",
            letterSpacing: "0.02em",
          }}
        >
          {day1.loveMarket.title.toUpperCase()}
        </h3>
      </header>
      <p className="mt-1 eyebrow text-ink-soft text-[0.6rem]">
        {day1.loveMarket.subtitle}
      </p>

      <ul className="mt-3 border-t border-ink/20 divide-y divide-ink/12 text-[0.93rem] flex-1">
        {day1.loveMarket.rows.map((r) => {
          const isUp = r.dir === "up";
          return (
            <li
              key={r.label}
              className="grid grid-cols-[1fr_auto] items-baseline gap-3 py-2.5"
            >
              <span className="font-sans uppercase tracking-[0.12em] text-ink">
                {r.label}
              </span>
              <span className="flex items-baseline gap-1.5 font-display italic text-ink-soft tabular-nums">
                <span
                  className={`text-[0.78em] leading-none translate-y-px ${
                    isUp ? "text-burgundy" : "text-copper"
                  }`}
                  aria-hidden
                >
                  {isUp ? "▲" : "▼"}
                </span>
                {r.change}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 pt-3 border-t border-ink/15 font-display italic text-ink text-[0.9rem] text-center leading-snug">
        {day1.loveMarket.footer}
      </p>
    </section>
  );
}
