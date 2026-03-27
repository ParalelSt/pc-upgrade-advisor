"use client";

import { useState, useMemo } from "react";
import type { CpuEntry } from "@/data/cpus";
import type { GpuEntry } from "@/data/gpus";
import type { GameEntry } from "@/data/games";
import { estimateAllGames, type GameFpsResult } from "@/lib/fpsEstimator";
import type { Resolution } from "@/lib/bottleneck";

interface FpsEstimatorState {
  selectedCpuId: string;
  selectedGpuId: string;
  resolution: Resolution;
  results: GameFpsResult[];
  setCpuId: (id: string) => void;
  setGpuId: (id: string) => void;
  setResolution: (r: Resolution) => void;
}

interface FpsEstimatorProps {
  cpus: CpuEntry[];
  gpus: GpuEntry[];
  games: GameEntry[];
}

/**
 * Manages CPU/GPU/resolution selection and derives per-game FPS estimates.
 * All calculation logic lives in lib/fpsEstimator.ts.
 */
export function useFpsEstimator({ cpus, gpus, games }: FpsEstimatorProps): FpsEstimatorState {
  const [selectedCpuId, setCpuId] = useState<string>("");
  const [selectedGpuId, setGpuId] = useState<string>("");
  const [resolution, setResolution] = useState<Resolution>("1440p");

  const selectedCpu = useMemo(
    () => cpus.find((c) => c.id === selectedCpuId),
    [cpus, selectedCpuId],
  );

  const selectedGpu = useMemo(
    () => gpus.find((g) => g.id === selectedGpuId),
    [gpus, selectedGpuId],
  );

  const results = useMemo(() => {
    if (!selectedCpu || !selectedGpu) return [];
    return estimateAllGames(games, selectedCpu.score, selectedGpu.score, resolution);
  }, [selectedCpu, selectedGpu, games, resolution]);

  return {
    selectedCpuId,
    selectedGpuId,
    resolution,
    results,
    setCpuId,
    setGpuId,
    setResolution,
  };
}
