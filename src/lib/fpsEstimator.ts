/**
 * Pure functions for per-game FPS estimation.
 * No side effects — safe to call anywhere.
 */

import type { GameEntry } from "@/data/games";
import type { Resolution } from "./bottleneck";

/**
 * Resolution multipliers applied to the estimated GPU contribution.
 * Higher resolution means more GPU work → fewer FPS.
 */
const RESOLUTION_FPS_MULTIPLIER: Record<Resolution, number> = {
  "1080p": 1.30,
  "1440p": 1.00,
  "4K": 0.58,
};

export interface GameFpsResult {
  game: GameEntry;
  estimatedFps: number;
  /** Whether the result is CPU-limited for this game */
  isCpuLimited: boolean;
}

/**
 * Estimates average FPS for a single game given CPU and GPU scores plus resolution.
 *
 * Formula:
 *   effectiveFps = baseFps × (cpuContribution + gpuContribution)
 *
 * Where each contribution is the component's score ratio vs the reference build (70),
 * weighted by that game's CPU/GPU weight.
 *
 * @param game - Game entry with base FPS and weights
 * @param cpuScore - CPU performance score (0–100)
 * @param gpuScore - GPU performance score (0–100)
 * @param resolution - Target render resolution
 */
export function estimateGameFps(
  game: GameEntry,
  cpuScore: number,
  gpuScore: number,
  resolution: Resolution,
): GameFpsResult {
  const REFERENCE_SCORE = 70;

  const cpuRatio = cpuScore / REFERENCE_SCORE;
  const gpuRatio = (gpuScore / REFERENCE_SCORE) * RESOLUTION_FPS_MULTIPLIER[resolution];

  const scaleFactor = cpuRatio * game.cpuWeight + gpuRatio * game.gpuWeight;
  const estimatedFps = Math.round(game.baseFps * scaleFactor);

  const cpuContributionAbs = cpuRatio * game.cpuWeight;
  const gpuContributionAbs = gpuRatio * game.gpuWeight;
  const isCpuLimited = cpuContributionAbs < gpuContributionAbs;

  return { game, estimatedFps, isCpuLimited };
}

/**
 * Estimates FPS across all provided games and sorts by FPS descending.
 * @param games - List of games to estimate
 * @param cpuScore - CPU performance score (0–100)
 * @param gpuScore - GPU performance score (0–100)
 * @param resolution - Target render resolution
 */
export function estimateAllGames(
  games: GameEntry[],
  cpuScore: number,
  gpuScore: number,
  resolution: Resolution,
): GameFpsResult[] {
  return games
    .map((g) => estimateGameFps(g, cpuScore, gpuScore, resolution))
    .sort((a, b) => b.estimatedFps - a.estimatedFps);
}

/**
 * Returns a human-readable performance label for an FPS value.
 * @param fps - Estimated frames per second
 */
export function getFpsLabel(fps: number): "unplayable" | "playable" | "smooth" | "high" | "ultra" {
  if (fps < 30) return "unplayable";
  if (fps < 60) return "playable";
  if (fps < 100) return "smooth";
  if (fps < 200) return "high";
  return "ultra";
}
