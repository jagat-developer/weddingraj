import Link from "next/link";
import { Heart } from "lucide-react";
import { invited } from "@/lib/content";

export function InvitedBanner() {
  return (
    <section className="mt-10">
      <div className="bg-ink text-paper rounded-lg px-6 py-6 md:px-10 md:py-7 text-center">
        <div className="flex items-center justify-center gap-3">
          <Heart
            size={14}
            className="text-paper/80"
            fill="currentColor"
            strokeWidth={0}
          />
          <h3
            className="font-display font-bold uppercase"
            style={{
              fontSize: "clamp(1.05rem, 2.6vw, 1.6rem)",
              letterSpacing: "0.22em",
            }}
          >
            {invited.primary}
          </h3>
          <Heart
            size={14}
            className="text-paper/80"
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
        <p
          className="mt-2 font-display italic text-paper/85"
          style={{ fontSize: "clamp(0.85rem, 1.6vw, 1rem)" }}
        >
          {invited.sub}
        </p>
      </div>
      <Link
        href="/day-1"
        className="block mt-3 text-center eyebrow text-burgundy hover:text-copper transition-colors"
        style={{ transitionDuration: "var(--dur-base)", transitionTimingFunction: "var(--ease-out-emil)" }}
      >
        {invited.footer} →
      </Link>
    </section>
  );
}
