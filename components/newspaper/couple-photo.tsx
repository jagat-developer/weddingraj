import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * The frame is a natural 4:5 portrait. Any source image is shown via
 * `object-cover` so the photo is NEVER stretched — it crops gracefully
 * when the source aspect differs from the frame. The frame itself sits
 * at its natural height; the surrounding grid is top-aligned, so columns
 * may differ in height and that's fine.
 */
export function CouplePhoto({ src, alt, caption }: Props) {
  return (
    <figure className="w-full">
      <div
        className="relative w-full border border-ink/20 bg-paper-deep overflow-hidden rounded-lg"
        style={{ aspectRatio: "4 / 5" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 40vw"
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
