/**
 * GPU data with cross-calibrated gaming performance scores (0–100).
 *
 * Scores are calibrated on the same scale as CPU scores so that a CPU
 * and GPU with equal scores produce ~0% bottleneck. Anchored at:
 *   RTX 4090 = 100  ↔  Ryzen 9 7950X3D = 100
 *   RTX 3070  = 65  ↔  Core i5-12600K   = 65
 *   RX 6600   = 46  ↔  Ryzen 5 3600     = 46
 */
export interface GpuEntry {
  id: string;
  name: string;
  /** Gaming performance score calibrated against CPU scores (0–100) */
  score: number;
  tdp: number;
}

/** @public */
export const GPUS: GpuEntry[] = [
  // NVIDIA — GTX 10 series
  { id: "gtx-1060-6gb", name: "NVIDIA GTX 1060 6GB", score: 21, tdp: 120 },
  { id: "gtx-1070", name: "NVIDIA GTX 1070", score: 27, tdp: 150 },
  { id: "gtx-1080", name: "NVIDIA GTX 1080", score: 34, tdp: 180 },
  { id: "gtx-1080ti", name: "NVIDIA GTX 1080 Ti", score: 43, tdp: 250 },

  // NVIDIA — GTX 16 series
  { id: "gtx-1660", name: "NVIDIA GTX 1660", score: 29, tdp: 120 },
  { id: "gtx-1660s", name: "NVIDIA GTX 1660 Super", score: 32, tdp: 125 },
  { id: "gtx-1660ti", name: "NVIDIA GTX 1660 Ti", score: 34, tdp: 120 },

  // NVIDIA — RTX 20 series
  { id: "rtx-2060", name: "NVIDIA RTX 2060", score: 39, tdp: 160 },
  { id: "rtx-2060s", name: "NVIDIA RTX 2060 Super", score: 44, tdp: 175 },
  { id: "rtx-2070s", name: "NVIDIA RTX 2070 Super", score: 50, tdp: 215 },
  { id: "rtx-2080s", name: "NVIDIA RTX 2080 Super", score: 55, tdp: 250 },
  { id: "rtx-2080ti", name: "NVIDIA RTX 2080 Ti", score: 63, tdp: 250 },

  // NVIDIA — RTX 30 series
  { id: "rtx-3060", name: "NVIDIA RTX 3060", score: 50, tdp: 170 },
  { id: "rtx-3060ti", name: "NVIDIA RTX 3060 Ti", score: 59, tdp: 200 },
  { id: "rtx-3070", name: "NVIDIA RTX 3070", score: 65, tdp: 220 },
  { id: "rtx-3070ti", name: "NVIDIA RTX 3070 Ti", score: 70, tdp: 290 },
  { id: "rtx-3080", name: "NVIDIA RTX 3080", score: 76, tdp: 320 },
  { id: "rtx-3080ti", name: "NVIDIA RTX 3080 Ti", score: 81, tdp: 350 },
  { id: "rtx-3090", name: "NVIDIA RTX 3090", score: 84, tdp: 350 },

  // NVIDIA — RTX 40 series
  { id: "rtx-4060", name: "NVIDIA RTX 4060", score: 56, tdp: 115 },
  { id: "rtx-4060ti", name: "NVIDIA RTX 4060 Ti", score: 65, tdp: 165 },
  { id: "rtx-4070", name: "NVIDIA RTX 4070", score: 74, tdp: 200 },
  { id: "rtx-4070s", name: "NVIDIA RTX 4070 Super", score: 79, tdp: 220 },
  { id: "rtx-4070ti", name: "NVIDIA RTX 4070 Ti", score: 84, tdp: 285 },
  { id: "rtx-4070tis", name: "NVIDIA RTX 4070 Ti Super", score: 88, tdp: 285 },
  { id: "rtx-4080", name: "NVIDIA RTX 4080", score: 93, tdp: 320 },
  { id: "rtx-4080s", name: "NVIDIA RTX 4080 Super", score: 96, tdp: 320 },
  { id: "rtx-4090", name: "NVIDIA RTX 4090", score: 100, tdp: 450 },

  // AMD — RX 6000 series
  { id: "rx-6600", name: "AMD RX 6600", score: 46, tdp: 132 },
  { id: "rx-6600xt", name: "AMD RX 6600 XT", score: 52, tdp: 160 },
  { id: "rx-6700xt", name: "AMD RX 6700 XT", score: 61, tdp: 230 },
  { id: "rx-6800", name: "AMD RX 6800", score: 70, tdp: 250 },
  { id: "rx-6800xt", name: "AMD RX 6800 XT", score: 77, tdp: 300 },
  { id: "rx-6900xt", name: "AMD RX 6900 XT", score: 82, tdp: 300 },

  // AMD — RX 7000 series
  { id: "rx-7600", name: "AMD RX 7600", score: 53, tdp: 165 },
  { id: "rx-7700xt", name: "AMD RX 7700 XT", score: 63, tdp: 245 },
  { id: "rx-7800xt", name: "AMD RX 7800 XT", score: 73, tdp: 263 },
  { id: "rx-7900xt", name: "AMD RX 7900 XT", score: 87, tdp: 315 },
  { id: "rx-7900xtx", name: "AMD RX 7900 XTX", score: 94, tdp: 355 },
];
