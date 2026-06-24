import { existsSync } from "node:fs";
import { join } from "node:path";
import { Ganesha as SvgGanesha } from "./ganesha";

type Props = { size?: number; className?: string };

/**
 * Renders the Ganesha graphic.
 *  - If `public/images/ganesha.png` (or .jpg / .jpeg / .svg) exists,
 *    that file is used.
 *  - Otherwise the inline SVG fallback is rendered.
 * The check runs at render time on the server — no broken-image flash.
 *
 * To use the client's Ganesha graphic, save the file at
 *   public/images/ganesha.png   (or .jpg / .jpeg / .svg)
 */
const CANDIDATES = ["ganesha.png", "ganesha.jpg", "ganesha.jpeg", "ganesha.svg"];

function findGaneshaFile(): string | null {
  const dir = join(process.cwd(), "public", "images");
  for (const name of CANDIDATES) {
    if (existsSync(join(dir, name))) return `/images/${name}`;
  }
  return null;
}

export function GaneshaMark({ size = 44, className }: Props) {
  const src = findGaneshaFile();
  if (!src) return <SvgGanesha size={size} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Ganesha"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}
