type Props = { className?: string; width?: number };

export function Signature({ className, width = 160 }: Props) {
  return (
    <svg
      viewBox="0 0 240 60"
      width={width}
      height={(width / 240) * 60}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 36 c 8 -14, 18 -16, 22 -6 c 2 8 -6 12 -10 10 c -4 -2 -2 -10 6 -10 c 10 0 14 4 22 -6 c 2 -2 6 -2 6 2 c 0 4 -4 8 -2 10 c 4 4 12 -2 16 -8" />
      <path d="M76 30 q 6 -8 10 -2 q -6 8 -2 12 q 6 6 14 -4 q -4 -10 4 -10 q 6 0 6 8 q 6 -8 12 -2 q 4 4 -2 12 q 8 4 14 -4" />
      <path d="M140 26 q 4 -6 8 -2 q -2 6 -2 12 q 4 -10 12 -8 q 10 2 6 12" />
      <path d="M170 30 q 8 -10 14 -4 q -4 6 -2 12 q 6 -10 14 -6 q 8 4 4 12" />
      <path d="M206 38 c 4 -2 8 -4 12 -10 c 2 8 -4 10 4 10 q -4 6 -10 4 q 4 4 12 0" />
      <path d="M44 50 q 100 -2 180 0" strokeDasharray="1 4" opacity="0.5" />
    </svg>
  );
}
