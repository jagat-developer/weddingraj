type Props = { className?: string; size?: number };

export function LaurelLeft({ className, size = 80 }: Props) {
  return (
    <svg
      viewBox="0 0 72 126"
      width={size}
      height={size * 1.75}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M48 8 C34 27 28 48 31 70 C33 88 28 108 16 119" />
      <path d="M44 20 C32 16 21 19 13 28 C26 33 37 30 44 20Z" />
      <path d="M39 33 C27 30 16 34 8 44 C21 48 33 44 39 33Z" />
      <path d="M34 47 C22 46 12 52 5 63 C18 65 29 59 34 47Z" />
      <path d="M32 62 C20 63 11 71 6 84 C19 84 29 75 32 62Z" />
      <path d="M33 77 C22 81 15 91 13 105 C25 101 33 91 33 77Z" />
      <path d="M36 30 C47 28 57 34 63 45 C51 46 42 41 36 30Z" />
      <path d="M32 45 C43 44 53 51 58 63 C46 63 37 57 32 45Z" />
      <path d="M31 60 C42 62 50 70 53 83 C41 81 34 73 31 60Z" />
      <path d="M32 75 C42 80 48 90 48 103 C37 98 32 88 32 75Z" />
    </svg>
  );
}
