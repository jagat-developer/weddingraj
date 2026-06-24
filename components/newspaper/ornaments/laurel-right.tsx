import { LaurelLeft } from "./laurel-left";

type Props = { className?: string; size?: number };

export function LaurelRight({ className, size }: Props) {
  return (
    <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
      <LaurelLeft className={className} size={size} />
    </span>
  );
}
