import type { ButtonHTMLAttributes } from "react";

type Variant = "accent" | "danger" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASS: Record<Variant, string> = {
  accent:
    "bg-accent/5 border-accent/50 text-accent/80 hover:border-accent hover:text-accent hover:bg-accent/10",
  danger:
    "bg-transparent border-border/50 text-muted hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5",
  ghost:
    "bg-transparent border-border/50 text-muted hover:border-border hover:text-foreground",
};

export default function Button({ variant = "ghost", className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASS[variant]} ${className}`}
    />
  );
}
