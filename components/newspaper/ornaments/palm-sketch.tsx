type Props = { className?: string; width?: number };

export function PalmSketch({ className, width = 220 }: Props) {
  return (
    <svg
      viewBox="0 0 220 100"
      width={width}
      height={(width / 220) * 100}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* sun */}
      <circle cx="180" cy="22" r="9" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        const x1 = 180 + Math.cos(a) * 13;
        const y1 = 22 + Math.sin(a) * 13;
        const x2 = 180 + Math.cos(a) * 18;
        const y2 = 22 + Math.sin(a) * 18;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {/* mountains */}
      <path d="M0 70 L 30 50 L 50 64 L 90 38 L 130 66 L 160 56 L 200 72" />
      {/* sea + sand */}
      <path d="M0 78 H 220" />
      <path d="M0 88 Q 50 84 110 88 T 220 90" />
      {/* palm trunk + fronds */}
      <path d="M40 96 C 36 78, 30 60, 26 46" />
      <path d="M26 46 q -14 -4 -22 4" />
      <path d="M26 46 q -8 -10 -18 -10" />
      <path d="M26 46 q 4 -12 18 -16" />
      <path d="M26 46 q 14 -2 22 6" />
      <path d="M26 46 q 12 4 16 12" />
      {/* birds */}
      <path d="M130 22 q 4 -4 8 0 q 4 -4 8 0" />
      <path d="M150 14 q 3 -3 6 0 q 3 -3 6 0" />
    </svg>
  );
}
