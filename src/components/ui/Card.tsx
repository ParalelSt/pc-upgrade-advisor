interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Dark-themed surface card wrapper.
 */
export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}
