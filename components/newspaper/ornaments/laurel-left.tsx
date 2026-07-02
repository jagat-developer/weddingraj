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
        d="M38 160 C47 132 48 102 40 74 C34 50 24 29 15 11"
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
      <g
        stroke="currentColor"
        strokeWidth="2.25"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M39 137 C24 136 14 127 14 116 C29 114 41 122 43 136" />
        <path d="M45 123 C59 111 75 109 83 119 C72 132 55 133 45 123" />
        <path d="M43 107 C28 105 19 95 21 84 C36 84 46 93 47 106" />
        <path d="M45 91 C58 78 74 76 82 85 C72 99 55 100 45 91" />
        <path d="M38 77 C25 72 19 61 23 51 C37 54 45 65 42 78" />
        <path d="M41 63 C51 49 66 44 75 52 C68 66 52 70 41 63" />
        <path d="M31 49 C20 42 17 31 23 23 C35 30 40 42 34 51" />
        <path d="M34 38 C42 24 55 18 63 24 C58 38 45 45 34 38" />
      </g>
      <g stroke="currentColor" strokeWidth="1.55" opacity="0.72" vectorEffect="non-scaling-stroke">
        <path d="M41 134 L23 120" />
        <path d="M47 121 L74 119" />
        <path d="M45 104 L28 89" />
        <path d="M47 89 L73 85" />
        <path d="M40 75 L27 56" />
        <path d="M43 61 L66 53" />
        <path d="M32 47 L24 28" />
        <path d="M36 37 L57 25" />
      </g>
    </svg>
  );
}
