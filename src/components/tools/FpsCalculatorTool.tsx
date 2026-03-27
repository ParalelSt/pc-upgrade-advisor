"use client";

import type { CpuEntry } from "@/data/cpus";
import type { GpuEntry } from "@/data/gpus";
import type { GameEntry } from "@/data/games";
import { useFpsEstimator } from "@/hooks/useFpsEstimator";
import type { Resolution } from "@/lib/bottleneck";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import GameFpsList from "@/components/ui/GameFpsList";
import SaveResultButton from "@/components/ui/SaveResultButton";
import DonationSection from "@/components/ui/DonationSection";
import SetupBar from "@/components/ui/SetupBar";

interface Props {
  cpus: CpuEntry[];
  gpus: GpuEntry[];
  games: GameEntry[];
}

const RESOLUTION_OPTIONS: { value: Resolution; label: string }[] = [
  { value: "1080p", label: "1080p — Full HD" },
  { value: "1440p", label: "1440p — Quad HD" },
  { value: "4K", label: "4K — Ultra HD" },
];

/**
 * Client component for the FPS Estimator tool.
 * Receives pre-fetched CPU, GPU, and game lists from the server page.
 */
export default function FpsCalculatorTool({ cpus, gpus, games }: Props) {
  const {
    selectedCpuId,
    selectedGpuId,
    resolution,
    results,
    setCpuId,
    setGpuId,
    setResolution,
  } = useFpsEstimator({ cpus, gpus, games });

  const cpuOptions = cpus.map((c) => ({ value: c.id, label: c.name }));
  const gpuOptions = gpus.map((g) => ({ value: g.id, label: g.name }));

  const hasResults = results.length > 0;
  const isReady = selectedCpuId !== "" && selectedGpuId !== "";

  const selectedCpu = cpus.find((c) => c.id === selectedCpuId);
  const selectedGpu = gpus.find((g) => g.id === selectedGpuId);

  const saveLabel = selectedCpu && selectedGpu
    ? `${selectedCpu.name} + ${selectedGpu.name}`
    : "";

  const saveData = hasResults ? {
    cpuId: selectedCpuId,
    gpuId: selectedGpuId,
    cpuName: selectedCpu?.name,
    gpuName: selectedGpu?.name,
    resolution,
    games: results.map((r) => ({ name: r.game.name, fps: r.estimatedFps })),
  } : {};

  const emptyState = !isReady ? (
    <div className="flex flex-col items-center justify-center h-full min-h-50 text-center gap-2">
      <p className="text-sm text-muted">Select a CPU and GPU to see estimated FPS.</p>
    </div>
  ) : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Left — inputs */}
        <Card className="flex flex-col gap-6 lg:sticky lg:top-6">
          <SetupBar
            cpuId={selectedCpuId}
            gpuId={selectedGpuId}
            cpuName={selectedCpu?.name ?? ""}
            gpuName={selectedGpu?.name ?? ""}
            onLoad={(cid, gid) => { setCpuId(cid); setGpuId(gid); }}
          />
          <Select
            label="CPU"
            options={cpuOptions}
            value={selectedCpuId}
            placeholder="Select your CPU"
            onChange={setCpuId}
          />
          <Select
            label="GPU"
            options={gpuOptions}
            value={selectedGpuId}
            placeholder="Select your GPU"
            onChange={setGpuId}
          />
          <Select
            label="Resolution"
            options={RESOLUTION_OPTIONS}
            value={resolution}
            onChange={(v) => setResolution(v as Resolution)}
          />
          {isReady && (
            <div className="flex flex-col gap-1 pt-2 border-t border-border">
              <p className="text-xs text-muted">
                FPS values are estimates based on relative hardware scores, not measured benchmarks.
              </p>
            </div>
          )}
        </Card>

        {/* Right — results */}
        <Card className="shadow-[0_0_40px_rgba(99,102,241,0.08)] overflow-hidden">
          <div className="-mx-6 -mt-6 mb-6 h-px bg-linear-to-r from-violet-500 via-blue-400 to-cyan-400" />
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">Game Performance</h2>
            {isReady && (
              <span className="text-xs text-muted">{resolution} · Ultra settings</span>
            )}
          </div>
          {hasResults ? <GameFpsList results={results} /> : emptyState}
          {hasResults && (
            <div className="flex justify-end mt-4 pt-4 border-t border-border">
              <SaveResultButton type="fps" label={saveLabel} data={saveData} />
            </div>
          )}
        </Card>
      </div>

      <DonationSection />
    </div>
  );
}
