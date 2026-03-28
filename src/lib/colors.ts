/**
 * Shared color mappings for result severity and FPS labels.
 * Used across result display components for consistent theming.
 */

export const SEVERITY_COLORS = {
  none: "text-emerald-400",
  minor: "text-yellow-400",
  moderate: "text-orange-400",
  severe: "text-red-400",
} as const;

export const FPS_LABEL_COLORS = {
  unplayable: "text-red-400",
  playable: "text-orange-400",
  smooth: "text-yellow-400",
  high: "text-emerald-400",
  ultra: "text-cyan-400",
} as const;
