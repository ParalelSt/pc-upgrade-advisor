import type { GameFpsResult } from "@/lib/fpsEstimator";
import { getFpsLabel } from "@/lib/fpsEstimator";

interface Props {
  results: GameFpsResult[];
}

const FPS_LABEL_COLOR = {
  unplayable: "text-red-400",
  playable: "text-orange-400",
  smooth: "text-yellow-400",
  high: "text-emerald-400",
  ultra: "text-cyan-400",
} as const;

const FPS_BAR_CLASS = {
  unplayable: "bg-gradient-to-r from-red-600 to-red-500",
  playable: "bg-gradient-to-r from-orange-500 to-amber-400",
  smooth: "bg-gradient-to-r from-yellow-500 to-amber-400",
  high: "bg-gradient-to-r from-emerald-500 to-teal-400",
  ultra: "bg-gradient-to-r from-violet-500 to-cyan-400",
} as const;

/**
 * Renders a sorted list of per-game FPS estimates with visual bars.
 */
export default function GameFpsList({ results }: Props) {
  // Cap bar width at ~600fps for a reasonable max reference
  const MAX_FPS_DISPLAY = 400;

  return (
    <div className="flex flex-col gap-1">
      {results.map(({ game, estimatedFps, isCpuLimited }) => {
        const label = getFpsLabel(estimatedFps);
        const labelColor = FPS_LABEL_COLOR[label];
        const barClass = FPS_BAR_CLASS[label];
        const barWidth = `${Math.min((estimatedFps / MAX_FPS_DISPLAY) * 100, 100)}%`;

        const limitTag = isCpuLimited ? "CPU" : "GPU";

        return (
          <div key={game.id} className="flex flex-col gap-1 py-2.5 border-b border-border last:border-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm text-foreground truncate">{game.name}</span>
                <span className="shrink-0 text-xs text-muted bg-surface-raised px-1.5 py-0.5 rounded">
                  {game.genre}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted">{limitTag}</span>
                <span className={`font-mono text-sm font-semibold ${labelColor}`}>
                  {estimatedFps} fps
                </span>
              </div>
            </div>
            <div className="h-1 w-full rounded-full bg-surface-raised overflow-hidden">
              <div
                className={`h-full rounded-full ${barClass}`}
                style={{ width: barWidth }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
