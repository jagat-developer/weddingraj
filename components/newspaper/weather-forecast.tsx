import { CloudSun, Sun, Music2, type LucideIcon } from "lucide-react";
import { day1 } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  sun: Sun,
  music: Music2,
};

export function WeatherForecast() {
  return (
    <section className="flex flex-col h-full">
      <header className="flex items-center gap-2 text-burgundy">
        <CloudSun size={16} strokeWidth={1.6} />
        <h3
          className="font-display font-bold text-ink"
          style={{
            fontSize: "clamp(0.96rem, 1.5vw, 1.12rem)",
            letterSpacing: "0.02em",
          }}
        >
          {day1.weatherDesk.title.toUpperCase()}
        </h3>
      </header>

      <div className="mt-3 border-t border-ink/20 pt-4 space-y-5 flex-1">
        {day1.weatherDesk.alerts.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <article key={a.period} className="font-sans">
              <p className="eyebrow text-ink-soft text-[0.6rem]">{a.period}</p>
              <div className="mt-1 flex items-center gap-2">
                {Icon && (
                  <Icon size={14} strokeWidth={1.6} className="text-burgundy" />
                )}
                <h4
                  className="font-display font-bold text-burgundy leading-tight"
                  style={{
                    fontSize: "clamp(0.94rem, 1.4vw, 1.05rem)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {a.title.toUpperCase()}
                </h4>
              </div>
              <p className="mt-1.5 font-sans text-[0.86rem] leading-[1.55] text-body">
                {a.copy}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
