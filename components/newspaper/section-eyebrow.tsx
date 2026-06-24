import { FlourishOpen } from "./ornaments/flourish";

type Props = {
  children: React.ReactNode;
  withFlourish?: boolean;
  tone?: "ink" | "copper" | "burgundy";
  className?: string;
};

const toneClass = {
  ink: "text-ink",
  copper: "text-copper",
  burgundy: "text-burgundy",
};

export function SectionEyebrow({
  children,
  withFlourish = false,
  tone = "ink",
  className = "",
}: Props) {
  const color = toneClass[tone];
  if (withFlourish) {
    return (
      <div
        className={`flex items-center justify-center gap-3 ${color} ${className}`}
      >
        <FlourishOpen className="opacity-60" width={48} />
        <span className="eyebrow">{children}</span>
        <FlourishOpen className="opacity-60 -scale-x-100" width={48} />
      </div>
    );
  }
  return <span className={`eyebrow ${color} ${className}`}>{children}</span>;
}
