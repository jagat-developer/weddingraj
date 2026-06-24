type Props = {
  variant?: "thin" | "double" | "strong";
  className?: string;
  children?: React.ReactNode;
};

export function Hairline({ variant = "thin", className = "", children }: Props) {
  if (variant === "double") {
    return (
      <div className={className}>
        <div className="rule-strong" />
        <div className="mt-[3px] rule" />
      </div>
    );
  }

  if (children) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 rule" />
        <div className="flex-shrink-0 text-copper">{children}</div>
        <div className="flex-1 rule" />
      </div>
    );
  }

  return (
    <div
      className={`${variant === "strong" ? "rule-strong" : "rule"} ${className}`}
    />
  );
}
