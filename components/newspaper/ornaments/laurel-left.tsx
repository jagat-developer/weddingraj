type Props = { className?: string; size?: number };

export function LaurelLeft({ className, size = 80 }: Props) {
  return (
    <svg
      viewBox="0 0 92 174"
      width={size}
      height={Math.round(size * 1.9)}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M45 158 C34 126 34 95 43 66 C50 43 61 26 70 12"
        stroke="currentColor"
        strokeWidth="3.2"
        vectorEffect="non-scaling-stroke"
      />
      <g stroke="currentColor" strokeWidth="2.75" vectorEffect="non-scaling-stroke">
        <path d="M42 132 C27 127 20 116 25 108 C39 107 49 116 47 130 C46 132 44 132 42 132Z" />
        <path d="M48 118 C64 108 78 111 83 121 C74 132 58 131 48 121Z" />
        <path d="M38 108 C24 102 18 91 24 84 C38 85 47 95 43 108Z" />
        <path d="M48 92 C64 82 77 84 82 94 C73 105 58 105 48 96Z" />
        <path d="M40 81 C27 74 23 63 30 57 C43 59 50 70 45 82Z" />
        <path d="M53 65 C68 54 81 55 86 64 C79 75 63 77 53 69Z" />
        <path d="M49 51 C38 42 36 30 44 26 C56 31 61 43 54 53Z" />
        <path d="M64 34 C76 23 88 23 91 31 C84 42 72 45 64 37Z" />
      </g>
      <g stroke="currentColor" strokeWidth="2" opacity="0.78" vectorEffect="non-scaling-stroke">
        <path d="M46 130 L30 116" />
        <path d="M50 119 L75 121" />
        <path d="M42 106 L27 92" />
        <path d="M50 94 L73 94" />
        <path d="M44 79 L31 64" />
        <path d="M55 66 L78 64" />
        <path d="M53 50 L45 31" />
        <path d="M66 35 L84 31" />
      </g>
    </svg>
  );
}
