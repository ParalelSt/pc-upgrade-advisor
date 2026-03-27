import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface ToolCard {
  title: string;
  description: string;
  href: string;
  available: boolean;
}

const TOOLS: ToolCard[] = [
  {
    title: "Bottleneck Analyzer",
    description: "Find out if your CPU or GPU is holding back your system and which component you should upgrade first.",
    href: "/tools/bottleneck",
    available: true,
  },
  {
    title: "PSU Calculator",
    description: "Calculate how much wattage your build needs and find the right power supply.",
    href: "/tools/psu-calculator",
    available: false,
  },
  {
    title: "FPS Estimator",
    description: "Estimate in-game FPS for popular titles based on your hardware.",
    href: "/tools/fps-calculator",
    available: false,
  },
  {
    title: "Game Requirements",
    description: "Check if your PC can run the games you want to play.",
    href: "/tools/game-check",
    available: false,
  },
];

export default function HomePage() {
  const availableTools = TOOLS.filter((t) => t.available);
  const comingTools = TOOLS.filter((t) => !t.available);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-16 flex flex-col gap-16">
        <section className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-3xl font-semibold leading-tight">
            <span className="text-gradient">PC Upgrade Advisor</span>
          </h1>
          <p className="text-muted leading-relaxed">
            Free tools to help you understand your PC, find bottlenecks, calculate power needs,
            and figure out the best upgrade for your budget.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Available now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent group"
              >
                <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {tool.title}
                </span>
                <span className="text-sm text-muted leading-relaxed">{tool.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">Coming soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comingTools.map((tool) => (
              <div
                key={tool.href}
                className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-6 opacity-50 cursor-not-allowed"
              >
                <span className="font-semibold text-foreground">{tool.title}</span>
                <span className="text-sm text-muted leading-relaxed">{tool.description}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
