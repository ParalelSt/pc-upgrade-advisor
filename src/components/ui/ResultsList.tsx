"use client";

import { useState, useTransition } from "react";
import type { SavedResult } from "@/lib/resultActions";
import { deleteResult } from "@/lib/resultActions";
import { SEVERITY_COLORS, FPS_LABEL_COLORS } from "@/lib/colors";
import Card from "./Card";
import Button from "./Button";

interface Props {
  results: SavedResult[];
}

/**
 * Renders a list of saved results with delete capability.
 */
export default function ResultsList({ results: initial }: Props) {
  const [results, setResults] = useState(initial);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this result? This can't be undone.")) return;
    setResults((prev) => prev.filter((r) => r.id !== id));
    startTransition(() => {
      deleteResult(id);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} onDelete={handleDelete} />
      ))}
    </div>
  );
}

function ResultCard({ result, onDelete }: { result: SavedResult; onDelete: (id: string) => void }) {
  const date = new Date(result.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="shadow-[0_0_40px_rgba(99,102,241,0.08)] overflow-hidden">
      <div className="-mx-6 -mt-6 mb-4 h-px bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-400" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            {result.type === "bottleneck" ? "Bottleneck" : "FPS Estimate"}
          </span>
          <span className="text-sm font-semibold text-foreground truncate">{result.label}</span>
          <span className="text-xs text-muted">{date}</span>
        </div>
        <Button
          variant="danger"
          onClick={() => onDelete(result.id)}
          className="shrink-0"
          aria-label="Delete result"
        >
          Delete
        </Button>
      </div>

      <div className="mt-4">
        {result.type === "bottleneck" ? (
          <BottleneckSummary data={result.data} />
        ) : (
          <FpsSummary data={result.data} />
        )}
      </div>
    </Card>
  );
}

function BottleneckSummary({ data }: { data: Record<string, unknown> }) {
  const severity = data.severity as keyof typeof SEVERITY_COLOR | undefined;
  const percentage = data.percentage as number | undefined;
  const limitedBy = data.limitedBy as string | undefined;
  const resolution = data.resolution as string | undefined;
  const fpsTarget = data.fpsTarget as string | undefined;

  const severityColor = severity ? SEVERITY_COLORS[severity] : "text-muted";

  const limitLabel = (() => {
    if (!limitedBy || limitedBy === "none") return "Balanced";
    if (limitedBy === "cpu") return "CPU limited";
    return "GPU limited";
  })();

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted">Bottleneck</span>
        <span className={`font-mono font-semibold ${severityColor}`}>{percentage}%</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted">Limiting factor</span>
        <span className={`font-semibold ${severityColor}`}>{limitLabel}</span>
      </div>
      {resolution && fpsTarget && (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">Settings</span>
          <span className="text-foreground">{resolution} · {fpsTarget}fps</span>
        </div>
      )}
    </div>
  );
}

function FpsSummary({ data }: { data: Record<string, unknown> }) {
  const resolution = data.resolution as string | undefined;
  const games = data.games as Array<{ name: string; fps: number }> | undefined;

  if (!games || games.length === 0) return null;

  const avgFps = Math.round(games.reduce((sum, g) => sum + g.fps, 0) / games.length);

  const fpsLabel = (() => {
    if (avgFps < 30) return "unplayable" as const;
    if (avgFps < 60) return "playable" as const;
    if (avgFps < 100) return "smooth" as const;
    if (avgFps < 144) return "high" as const;
    return "ultra" as const;
  })();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">Avg FPS</span>
          <span className={`font-mono font-semibold ${FPS_LABEL_COLORS[fpsLabel]}`}>{avgFps} fps</span>
        </div>
        {resolution && (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">Resolution</span>
            <span className="text-foreground">{resolution}</span>
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">Games</span>
          <span className="text-foreground">{games.length}</span>
        </div>
      </div>
    </div>
  );
}
