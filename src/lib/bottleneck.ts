/**
 * Pure functions for bottleneck analysis.
 * No side effects — safe to call anywhere.
 */

export type BottleneckSide = "cpu" | "gpu" | "none";

/** Target render resolution. Higher resolution stresses the GPU more. */
export type Resolution = "1080p" | "1440p" | "4K";

/** Target frame rate. Higher FPS stresses the CPU more. */
export type FpsTarget = "60" | "144" | "240";

export interface BottleneckResult {
  /** Percentage of performance left on the table due to the weaker component */
  percentage: number;
  /** Which component is the limiting factor */
  limitedBy: BottleneckSide;
  /** Human-readable label for the limiting component */
  label: string;
}

/**
 * Score modifiers per resolution and FPS target.
 *
 * Resolution affects the GPU: higher resolution means the GPU is pushed harder,
 * so its effective score drops. At 1080p it has headroom, so its effective score rises.
 *
 * FPS target only matters at 240fps, where the CPU must complete each frame in
 * 4.2ms instead of 16.7ms at 60fps. That tight budget genuinely stresses the CPU
 * more than the GPU, so the CPU effective score is reduced.
 * At 60fps and 144fps the relative hardware balance is unchanged — both components
 * have more headroom, so no modifier is applied.
 */
const RESOLUTION_GPU_MODIFIER: Record<Resolution, number> = {
  "1080p": 1.12,
  "1440p": 1.00,
  "4K": 0.82,
};

const FPS_CPU_MODIFIER: Record<FpsTarget, number> = {
  "60": 1.00,   // No change — hardware balance is unchanged at lower FPS
  "144": 1.00,  // Baseline
  "240": 0.88,  // CPU is genuinely strained by the tight per-frame time budget
};

/**
 * Applies resolution and FPS context to raw hardware scores.
 * Returns the effective scores used for bottleneck calculation.
 * @param cpuScore - Raw CPU performance score (0–100)
 * @param gpuScore - Raw GPU performance score (0–100)
 * @param resolution - Target render resolution
 * @param fpsTarget - Target frame rate
 */
export function applyContextModifiers(
  cpuScore: number,
  gpuScore: number,
  resolution: Resolution,
  fpsTarget: FpsTarget,
): { effectiveCpu: number; effectiveGpu: number } {
  const effectiveCpu = Math.round(cpuScore * FPS_CPU_MODIFIER[fpsTarget]);
  const effectiveGpu = Math.round(gpuScore * RESOLUTION_GPU_MODIFIER[resolution]);
  return { effectiveCpu, effectiveGpu };
}

/**
 * Calculates bottleneck between CPU and GPU based on (pre-adjusted) performance scores.
 * @param cpuScore - Effective CPU score after context modifiers
 * @param gpuScore - Effective GPU score after context modifiers
 * @returns BottleneckResult with percentage and which side is limiting
 */
export function calculateBottleneck(cpuScore: number, gpuScore: number): BottleneckResult {
  const diff = Math.abs(cpuScore - gpuScore);
  const max = Math.max(cpuScore, gpuScore);
  const percentage = max === 0 ? 0 : Math.round((diff / max) * 100);

  const limitedBy = (() => {
    if (percentage < 5) return "none" as const;
    if (cpuScore < gpuScore) return "cpu" as const;
    return "gpu" as const;
  })();

  const label = (() => {
    if (limitedBy === "none") return "Balanced";
    if (limitedBy === "cpu") return "CPU Bottleneck";
    return "GPU Bottleneck";
  })();

  return { percentage, limitedBy, label };
}

/**
 * Returns a severity tier based on bottleneck percentage.
 * @param percentage - Bottleneck percentage (0–100)
 */
export function getBottleneckSeverity(percentage: number): "none" | "minor" | "moderate" | "severe" {
  if (percentage < 5) return "none";
  if (percentage < 15) return "minor";
  if (percentage < 30) return "moderate";
  return "severe";
}

/**
 * Returns an upgrade recommendation based on the bottleneck result.
 * @param result - The calculated bottleneck result
 * @param cpuName - Name of the selected CPU
 * @param gpuName - Name of the selected GPU
 * @param resolution - Target resolution (used to tailor the message)
 * @param fpsTarget - Target FPS (used to tailor the message)
 */
export function getUpgradeRecommendation(
  result: BottleneckResult,
  cpuName: string,
  gpuName: string,
  resolution: Resolution,
  fpsTarget: FpsTarget,
): string {
  if (result.limitedBy === "none") {
    return `Your CPU and GPU are well-matched at ${resolution} / ${fpsTarget}fps. You have a balanced build.`;
  }

  if (result.limitedBy === "cpu") {
    const hint = fpsTarget === "240"
      ? " At 240fps, the CPU has to process far more frames per second, amplifying this gap."
      : "";
    return `Your ${cpuName} is holding back your ${gpuName} at ${resolution} / ${fpsTarget}fps.${hint} Upgrading your CPU will unlock more performance.`;
  }

  const hint = resolution === "4K"
    ? " At 4K, the GPU has to render four times as many pixels, amplifying this gap."
    : "";
  return `Your ${gpuName} is holding back your ${cpuName} at ${resolution} / ${fpsTarget}fps.${hint} Upgrading your GPU will provide the biggest performance gain.`;
}
