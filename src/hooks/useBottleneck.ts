"use client";

import { useState, useMemo } from "react";
import type { CpuEntry } from "@/data/cpus";
import type { GpuEntry } from "@/data/gpus";
import {
  applyContextModifiers,
  calculateBottleneck,
  getBottleneckSeverity,
  getUpgradeRecommendation,
  type BottleneckResult,
  type Resolution,
  type FpsTarget,
} from "@/lib/bottleneck";

interface BottleneckState {
  selectedCpuId: string;
  selectedGpuId: string;
  resolution: Resolution;
  fpsTarget: FpsTarget;
  selectedCpu: CpuEntry | undefined;
  selectedGpu: GpuEntry | undefined;
  effectiveCpuScore: number | undefined;
  effectiveGpuScore: number | undefined;
  result: BottleneckResult | undefined;
  severity: "none" | "minor" | "moderate" | "severe" | undefined;
  recommendation: string | undefined;
  setCpuId: (id: string) => void;
  setGpuId: (id: string) => void;
  setResolution: (r: Resolution) => void;
  setFpsTarget: (fps: FpsTarget) => void;
}

interface BottleneckProps {
  cpus: CpuEntry[];
  gpus: GpuEntry[];
}

/**
 * Manages CPU/GPU/resolution/FPS selection and derives bottleneck analysis on the fly.
 * All calculation logic lives in lib/bottleneck.ts.
 */
export function useBottleneck({ cpus, gpus }: BottleneckProps): BottleneckState {
  const [selectedCpuId, setCpuId] = useState<string>("");
  const [selectedGpuId, setGpuId] = useState<string>("");
  const [resolution, setResolution] = useState<Resolution>("1440p");
  const [fpsTarget, setFpsTarget] = useState<FpsTarget>("144");

  const selectedCpu = useMemo(
    () => cpus.find((c) => c.id === selectedCpuId),
    [cpus, selectedCpuId],
  );

  const selectedGpu = useMemo(
    () => gpus.find((g) => g.id === selectedGpuId),
    [gpus, selectedGpuId],
  );

  const adjustedScores = useMemo(() => {
    if (!selectedCpu || !selectedGpu) return undefined;
    return applyContextModifiers(selectedCpu.score, selectedGpu.score, resolution, fpsTarget);
  }, [selectedCpu, selectedGpu, resolution, fpsTarget]);

  const result = useMemo(() => {
    if (!adjustedScores) return undefined;
    return calculateBottleneck(adjustedScores.effectiveCpu, adjustedScores.effectiveGpu);
  }, [adjustedScores]);

  const severity = useMemo(() => {
    if (!result) return undefined;
    return getBottleneckSeverity(result.percentage);
  }, [result]);

  const recommendation = useMemo(() => {
    if (!result || !selectedCpu || !selectedGpu) return undefined;
    return getUpgradeRecommendation(result, selectedCpu.name, selectedGpu.name, resolution, fpsTarget);
  }, [result, selectedCpu, selectedGpu, resolution, fpsTarget]);

  return {
    selectedCpuId,
    selectedGpuId,
    resolution,
    fpsTarget,
    selectedCpu,
    selectedGpu,
    effectiveCpuScore: adjustedScores?.effectiveCpu,
    effectiveGpuScore: adjustedScores?.effectiveGpu,
    result,
    severity,
    recommendation,
    setCpuId,
    setGpuId,
    setResolution,
    setFpsTarget,
  };
}
