type Props = { className?: string; width?: number };

export function Flourish({ className, width = 120 }: Props) {
  return (
    <svg
      viewBox="0 0 240 20"
      width={width}
      height={(width / 240) * 20}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0 10 H 90" />
      <path d="M150 10 H 240" />
      <path d="M95 10 q 8 -8 16 0 q 8 8 16 0" />
      <circle cx="120" cy="10" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FlourishOpen({ className, width = 60 }: Props) {
  return (
    <svg
      viewBox="0 0 80 16"
      width={width}
      height={(width / 80) * 16}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0 8 q 14 -10 24 0 q 10 10 24 0 q 14 -10 32 0" />
    </svg>
  );
}
