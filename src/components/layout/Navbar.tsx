import Link from "next/link";

/**
 * Top navigation bar shared across all pages.
 */
export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold">
          <span className="text-gradient">PC Upgrade Advisor</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/tools/bottleneck" className="hover:text-foreground transition-colors">
            Bottleneck
          </Link>
          <Link href="/tools/psu-calculator" className="hover:text-foreground transition-colors opacity-40 cursor-not-allowed pointer-events-none">
            PSU Calc
          </Link>
          <Link href="/tools/fps-calculator" className="hover:text-foreground transition-colors opacity-40 cursor-not-allowed pointer-events-none">
            FPS Check
          </Link>
        </nav>
      </div>
    </header>
  );
}
