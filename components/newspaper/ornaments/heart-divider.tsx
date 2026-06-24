type Props = { className?: string; width?: number };

export function HeartDivider({ className, width = 200 }: Props) {
  return (
    <svg
      viewBox="0 0 400 20"
      width={width}
      height={(width / 400) * 20}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0 10 H 180" />
      <path d="M220 10 H 400" />
      <path
        d="M200 6 c -3 -4 -9 -2 -9 3 c 0 4 9 7 9 7 s 9 -3 9 -7 c 0 -5 -6 -7 -9 -3 z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
