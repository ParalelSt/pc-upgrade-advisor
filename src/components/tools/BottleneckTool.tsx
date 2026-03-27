"use client";

import type { CpuEntry } from "@/data/cpus";
import type { GpuEntry } from "@/data/gpus";
import { useBottleneck } from "@/hooks/useBottleneck";
import type { Resolution, FpsTarget } from "@/lib/bottleneck";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import BottleneckResultCard from "@/components/ui/BottleneckResult";
import DonationSection from "@/components/ui/DonationSection";

interface Props {
  cpus: CpuEntry[];
  gpus: GpuEntry[];
}

const RESOLUTION_OPTIONS: { value: Resolution; label: string }[] = [
  { value: "1080p", label: "1080p — Full HD" },
  { value: "1440p", label: "1440p — Quad HD" },
  { value: "4K", label: "4K — Ultra HD" },
];

const FPS_OPTIONS: { value: FpsTarget; label: string }[] = [
  { value: "60", label: "60 FPS" },
  { value: "144", label: "144 FPS" },
  { value: "240", label: "240 FPS" },
];

/**
 * Client component for the Bottleneck Analyzer tool.
 * Receives pre-fetched CPU and GPU lists from the server page.
 */
export default function BottleneckTool({ cpus, gpus }: Props) {
  const {
    selectedCpuId,
    selectedGpuId,
    resolution,
    fpsTarget,
    effectiveCpuScore,
    effectiveGpuScore,
    result,
    severity,
    recommendation,
    setCpuId,
    setGpuId,
    setResolution,
    setFpsTarget,
  } = useBottleneck({ cpus, gpus });

  const cpuOptions = cpus.map((c) => ({ value: c.id, label: c.name }));
  const gpuOptions = gpus.map((g) => ({ value: g.id, label: g.name }));

  const hasResult =
    result !== undefined &&
    severity !== undefined &&
    recommendation !== undefined &&
    effectiveCpuScore !== undefined &&
    effectiveGpuScore !== undefined;

  const isReady = selectedCpuId !== "" && selectedGpuId !== "";

  const resultSection = hasResult ? (
    <BottleneckResultCard
      result={result}
      severity={severity}
      recommendation={recommendation}
      effectiveCpuScore={effectiveCpuScore}
      effectiveGpuScore={effectiveGpuScore}
      resolution={resolution}
      fpsTarget={fpsTarget}
    />
  ) : null;

  const waitingMessage = !isReady ? (
    <p className="text-center text-sm text-muted py-6">
      Select a CPU and GPU above to see your bottleneck analysis.
    </p>
  ) : null;

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <div className="flex flex-col gap-6">
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
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Resolution"
              options={RESOLUTION_OPTIONS}
              value={resolution}
              onChange={(v) => setResolution(v as Resolution)}
            />
            <Select
              label="FPS Target"
              options={FPS_OPTIONS}
              value={fpsTarget}
              onChange={(v) => setFpsTarget(v as FpsTarget)}
            />
          </div>
        </div>
      </Card>

      {resultSection}
      {waitingMessage}

      <DonationSection />
    </div>
  );
}
