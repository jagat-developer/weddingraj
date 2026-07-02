type Props = { className?: string; size?: number };

export function LaurelLeft({ className, size = 80 }: Props) {
  return (
    <svg
      viewBox="0 0 96 176"
      width={size}
      height={Math.round(size * 1.83)}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M24 160 C38 128 45 96 50 68 C54 45 62 25 75 10"
        stroke="currentColor"
        strokeWidth="4.2"
        vectorEffect="non-scaling-stroke"
      />
      <g
        fill="currentColor"
        fillOpacity="0.42"
        stroke="currentColor"
        strokeWidth="2.35"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M35 139 C16 132 11 113 25 101 C43 105 52 122 39 139 C38 140 36 140 35 139Z" />
        <path d="M45 116 C62 98 85 96 92 111 C80 130 58 130 45 119Z" />
        <path d="M44 93 C26 84 23 65 36 55 C54 61 61 78 48 95 C47 96 45 96 44 93Z" />
        <path d="M56 72 C72 53 91 49 96 63 C87 81 66 86 56 75Z" />
        <path d="M56 50 C45 33 50 14 66 9 C82 21 80 41 60 52 C59 53 57 52 56 50Z" />
        <path d="M64 33 C74 14 90 10 96 22 C93 40 76 46 64 36Z" />
      </g>
      <g stroke="currentColor" strokeWidth="2.45" opacity="0.82" vectorEffect="non-scaling-stroke">
        <path d="M37 134 L26 116" />
        <path d="M49 115 L76 109" />
        <path d="M46 89 L37 69" />
        <path d="M59 71 L82 61" />
        <path d="M60 48 L65 20" />
        <path d="M67 34 L88 22" />
      </g>
      <g stroke="#fffdf8" strokeWidth="2.7" opacity="0.62" vectorEffect="non-scaling-stroke">
        <path d="M25 126 C22 121 21 116 24 112" />
        <path d="M67 103 C73 101 78 101 82 104" />
        <path d="M38 79 C34 75 33 70 35 66" />
        <path d="M76 58 C81 56 85 56 88 59" />
        <path d="M61 24 C63 18 67 15 71 14" />
      </g>
    </svg>
  );
}
