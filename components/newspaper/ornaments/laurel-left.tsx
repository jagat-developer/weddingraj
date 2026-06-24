type Props = { className?: string; size?: number };

export function LaurelLeft({ className, size = 80 }: Props) {
  return (
    <svg
      viewBox="0 0 80 120"
      width={size}
      height={size * 1.5}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M60 8 C 40 24, 28 50, 30 88 C 30 100, 36 108, 44 112" />
      {[18, 28, 40, 52, 64, 78, 92].map((y, i) => {
        const x = 56 - i * 4;
        return (
          <g key={y}>
            <path d={`M${x} ${y} q -10 -2 -14 4 q 6 4 14 -4 z`} />
            <path d={`M${x + 2} ${y + 4} q 10 -2 14 4 q -6 4 -14 -4 z`} />
          </g>
        );
      })}
    </svg>
  );
}
