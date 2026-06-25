import Image from "next/image";

type Variant = "portrait" | "hero";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  variant?: Variant;
};

/**
 * Two presentations:
 *  - portrait (default): 4:5 frame, fills its container — fits inside a grid column.
 *  - hero: 16:10 cinematic frame, centered and capped at ~880px — used as the
 *    standalone focal point on the front page.
 *
 * `object-cover` keeps the source from stretching; it crops when the source
 * aspect differs from the frame.
 */
export function CouplePhoto({ src, alt, caption, variant = "portrait" }: Props) {
  const isHero = variant === "hero";
  const aspectRatio = isHero ? "16 / 10" : "4 / 5";
  return (
    <figure className={isHero ? "w-full max-w-[880px] mx-auto" : "w-full"}>
      <div
        className="relative w-full border border-ink/20 bg-paper-deep overflow-hidden rounded-lg"
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isHero ? "(max-width: 768px) 92vw, 880px" : "(max-width: 768px) 90vw, 40vw"}
          className="object-cover"
          priority
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[0.7rem] font-sans uppercase tracking-[0.24em] text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
