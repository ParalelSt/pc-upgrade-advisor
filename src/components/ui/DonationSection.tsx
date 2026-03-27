/**
 * Minimal donation call-to-action section.
 * Shown below tool results to support running costs.
 */
export default function DonationSection() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-6 py-5 text-center">
      <p className="text-sm text-muted">
        PC Upgrade Advisor is free. If it helped you, consider buying me a coffee.
      </p>
      <a
        href="https://ko-fi.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-surface-raised border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        Support this project
      </a>
    </div>
  );
}
