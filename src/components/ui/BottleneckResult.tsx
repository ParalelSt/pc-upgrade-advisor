import type { BottleneckResult, Resolution, FpsTarget } from "@/lib/bottleneck";
import Card from "./Card";

interface Props {
  result: BottleneckResult;
  severity: "none" | "minor" | "moderate" | "severe";
  recommendation: string;
  effectiveCpuScore: number;
  effectiveGpuScore: number;
  resolution: Resolution;
  fpsTarget: FpsTarget;
}

const SEVERITY_COLOR = {
  none: "text-emerald-400",
  minor: "text-yellow-400",
  moderate: "text-orange-400",
  severe: "text-red-400",
} as const;

const SEVERITY_BAR_CLASS = {
  none: "bg-gradient-to-r from-emerald-500 to-teal-400",
  minor: "bg-gradient-to-r from-yellow-500 to-amber-400",
  moderate: "bg-gradient-to-r from-orange-500 to-red-400",
  severe: "bg-gradient-to-r from-red-600 to-pink-500",
} as const;

const SEVERITY_LABEL = {
  none: "Balanced",
  minor: "Minor Bottleneck",
  moderate: "Moderate Bottleneck",
  severe: "Severe Bottleneck",
} as const;

/**
 * Displays the bottleneck analysis result with a visual bar and recommendation.
 * Scores shown are effective scores (adjusted for resolution and FPS target).
 */
export default function BottleneckResultCard({
  result,
  severity,
  recommendation,
  effectiveCpuScore,
  effectiveGpuScore,
  resolution,
  fpsTarget,
}: Props) {
  const scoreBarWidth = `${result.percentage}%`;
  const severityColor = SEVERITY_COLOR[severity];
  const severityBarClass = SEVERITY_BAR_CLASS[severity];
  const severityLabel = SEVERITY_LABEL[severity];

  const limitingLabel = (() => {
    if (result.limitedBy === "none") return null;
    if (result.limitedBy === "cpu") return "CPU is limiting";
    return "GPU is limiting";
  })();

  // Cap display at 100 since modifiers can push above the raw max
  const displayCpu = Math.min(effectiveCpuScore, 100);
  const displayGpu = Math.min(effectiveGpuScore, 100);

  return (
    <Card className="shadow-[0_0_40px_rgba(99,102,241,0.08)] overflow-hidden">
      {/* Gradient accent line at the top of the card */}
      <div className="-mx-6 -mt-6 mb-6 h-px bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-400" />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-semibold text-foreground">Analysis Result</h2>
            <span className="text-xs text-muted">{resolution} · {fpsTarget}fps target</span>
          </div>
          <span className={`text-sm font-medium ${severityColor}`}>{severityLabel}</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-muted">
            <span>Bottleneck</span>
            <span className={`font-mono font-semibold ${severityColor}`}>
              {result.percentage}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-raised overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${severityBarClass}`}
              style={{ width: scoreBarWidth }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ScoreBar
            label="CPU Effective Score"
            score={displayCpu}
            isLimiting={result.limitedBy === "cpu"}
          />
          <ScoreBar
            label="GPU Effective Score"
            score={displayGpu}
            isLimiting={result.limitedBy === "gpu"}
          />
        </div>

        {limitingLabel && (
          <div className="rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm">
            <span className="text-muted">Limiting factor: </span>
            <span className={`font-semibold ${severityColor}`}>{limitingLabel}</span>
          </div>
        )}

        <p className="text-sm text-muted leading-relaxed">{recommendation}</p>
      </div>
    </Card>
  );
}

function ScoreBar({ label, score, isLimiting }: { label: string; score: number; isLimiting: boolean }) {
  const barWidth = `${score}%`;
  const barClass = isLimiting
    ? "bg-gradient-to-r from-red-500 to-orange-400"
    : "bg-gradient-to-r from-violet-500 to-cyan-400";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="font-mono">{score}/100</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-raised overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: barWidth }}
        />
      </div>
    </div>
  );
}
