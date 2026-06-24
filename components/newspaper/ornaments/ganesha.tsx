type Props = { className?: string; size?: number };

/**
 * Seated meditation Ganesha — simplified line art matching the client's
 * reference graphic. To swap with a custom PNG/JPG, save the file at
 * `public/images/ganesha.png` and the masthead will pick it up.
 */
export function Ganesha({ className, size = 44 }: Props) {
  return (
    <svg
      viewBox="0 0 100 110"
      width={size}
      height={(size / 100) * 110}
      className={className}
      role="img"
      aria-label="Ganesha"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Topknot / crown crest */}
      <path d="M48 9 Q 50 4 52 9" />
      <path d="M46 12 Q 50 6 54 12" />

      {/* Head — rounded forehead */}
      <path d="M36 28 Q 36 16 50 14 Q 64 16 64 28 Q 64 40 56 44" />

      {/* Left ear (the figure's left, viewer's right) */}
      <path d="M64 24 Q 76 24 74 36 Q 73 44 64 42" />
      <path d="M66 28 Q 71 30 70 36" />

      {/* Right ear (viewer's left) */}
      <path d="M36 24 Q 24 24 26 36 Q 27 44 36 42" />
      <path d="M34 28 Q 29 30 30 36" />

      {/* Eyes — almond closed */}
      <path d="M42 30 q 3 -2 6 0" />
      <path d="M52 30 q 3 -2 6 0" />

      {/* Trunk — curls down and to the figure's right */}
      <path d="M50 36 Q 50 48 54 54 Q 60 60 58 65 Q 56 68 52 65" />

      {/* Tusks (subtle) */}
      <path d="M46 40 q -1 4 -2 5" />
      <path d="M54 40 q 1 4 2 5" />

      {/* Necklace / body top */}
      <path d="M40 50 Q 50 56 60 50" />

      {/* Torso */}
      <path d="M38 54 Q 36 70 42 78" />
      <path d="M62 54 Q 64 70 58 78" />

      {/* Arms resting on knees, hand mudra suggestion */}
      <path d="M38 60 Q 30 64 30 72 Q 30 78 36 78" />
      <path d="M62 60 Q 70 64 70 72 Q 70 78 64 78" />

      {/* Crossed legs / seated base */}
      <path d="M30 86 Q 40 80 50 82 Q 60 80 70 86" />
      <path d="M28 92 Q 40 88 50 90 Q 60 88 72 92" />
      <path d="M34 96 Q 50 94 66 96" />

      {/* Small lotus base flourish */}
      <path d="M26 100 Q 50 98 74 100" />
      <path d="M36 102 q 4 -2 8 0" />
      <path d="M56 102 q 4 -2 8 0" />
    </svg>
  );
}
