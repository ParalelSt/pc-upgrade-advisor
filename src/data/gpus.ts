/**
 * GPU data with cross-calibrated gaming performance scores (0–100+).
 *
 * Scores are calibrated on the same scale as CPU scores so that a CPU
 * and GPU with equal scores produce ~0% bottleneck. Anchored at:
 *   RTX 4090 = 100  ↔  Ryzen 9 7950X3D = 100
 *   RTX 3070  = 65  ↔  Core i5-12600K   = 65
 *   RX 6600   = 46  ↔  Ryzen 5 3600     = 46
 *
 * RTX 50 series (Blackwell) scores exceed 100 as they surpass the RTX 4090 anchor.
 */
export interface GpuEntry {
  id: string;
  name: string;
  /** Gaming performance score calibrated against CPU scores (0–100+) */
  score: number;
  tdp: number;
}

/**
 * Master list of GPUs with cross-calibrated gaming performance scores.
 * Entries are grouped by vendor and generation, ordered roughly by score within each group.
 * Scores above 100 are valid for cards that exceed the RTX 4090 reference point.
 * @public
 */
export const GPUS: GpuEntry[] = [
  // NVIDIA — GTX 900 series (still in use)
  { id: "gtx-970",   name: "NVIDIA GTX 970",    score: 19, tdp: 145 },
  { id: "gtx-980",   name: "NVIDIA GTX 980",    score: 22, tdp: 165 },
  { id: "gtx-980ti", name: "NVIDIA GTX 980 Ti", score: 28, tdp: 250 },

  // NVIDIA — GTX 10 series
  { id: "gtx-1050ti", name: "NVIDIA GTX 1050 Ti", score: 14, tdp: 75 },
  { id: "gtx-1060-6gb", name: "NVIDIA GTX 1060 6GB", score: 21, tdp: 120 },
  { id: "gtx-1070", name: "NVIDIA GTX 1070", score: 27, tdp: 150 },
  { id: "gtx-1080", name: "NVIDIA GTX 1080", score: 34, tdp: 180 },
  { id: "gtx-1080ti", name: "NVIDIA GTX 1080 Ti", score: 43, tdp: 250 },

  // NVIDIA — GTX 16 series
  { id: "gtx-1650", name: "NVIDIA GTX 1650", score: 20, tdp: 75 },
  { id: "gtx-1650s", name: "NVIDIA GTX 1650 Super", score: 26, tdp: 100 },
  { id: "gtx-1660", name: "NVIDIA GTX 1660", score: 29, tdp: 120 },
  { id: "gtx-1660s", name: "NVIDIA GTX 1660 Super", score: 32, tdp: 125 },
  { id: "gtx-1660ti", name: "NVIDIA GTX 1660 Ti", score: 34, tdp: 120 },

  // NVIDIA — RTX 20 series
  { id: "rtx-2060",  name: "NVIDIA RTX 2060",       score: 39, tdp: 160 },
  { id: "rtx-2060s", name: "NVIDIA RTX 2060 Super", score: 44, tdp: 175 },
  { id: "rtx-2070",  name: "NVIDIA RTX 2070",       score: 47, tdp: 185 },
  { id: "rtx-2070s", name: "NVIDIA RTX 2070 Super", score: 50, tdp: 215 },
  { id: "rtx-2080",  name: "NVIDIA RTX 2080",       score: 53, tdp: 215 },
  { id: "rtx-2080s", name: "NVIDIA RTX 2080 Super", score: 55, tdp: 250 },
  { id: "rtx-2080ti", name: "NVIDIA RTX 2080 Ti",    score: 63, tdp: 250 },

  // NVIDIA — RTX 30 series
  { id: "rtx-3050",    name: "NVIDIA RTX 3050",    score: 40, tdp: 130 },
  { id: "rtx-3050-6gb", name: "NVIDIA RTX 3050 6GB", score: 35, tdp: 100 },
  { id: "rtx-3060",    name: "NVIDIA RTX 3060",    score: 50, tdp: 170 },
  { id: "rtx-3060ti", name: "NVIDIA RTX 3060 Ti", score: 59, tdp: 200 },
  { id: "rtx-3070", name: "NVIDIA RTX 3070", score: 65, tdp: 220 },
  { id: "rtx-3070ti", name: "NVIDIA RTX 3070 Ti", score: 70, tdp: 290 },
  { id: "rtx-3080", name: "NVIDIA RTX 3080", score: 76, tdp: 320 },
  { id: "rtx-3080ti", name: "NVIDIA RTX 3080 Ti", score: 81, tdp: 350 },
  { id: "rtx-3090", name: "NVIDIA RTX 3090", score: 84, tdp: 350 },
  { id: "rtx-3090ti", name: "NVIDIA RTX 3090 Ti", score: 86, tdp: 450 },

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

  // NVIDIA — RTX 50 series (Blackwell)
  { id: "rtx-5060",   name: "NVIDIA RTX 5060",    score: 68, tdp: 150 },
  { id: "rtx-5060ti", name: "NVIDIA RTX 5060 Ti", score: 82, tdp: 180 },
  // roughly 4070 Ti Super class
  { id: "rtx-5070", name: "NVIDIA RTX 5070", score: 88, tdp: 250 },
  { id: "rtx-5070ti", name: "NVIDIA RTX 5070 Ti", score: 103, tdp: 300 },
  { id: "rtx-5080", name: "NVIDIA RTX 5080", score: 113, tdp: 360 },
  { id: "rtx-5090", name: "NVIDIA RTX 5090", score: 135, tdp: 575 },

  // AMD — RX 5000 series (still common)
  { id: "rx-5500xt", name: "AMD RX 5500 XT", score: 33, tdp: 130 },
  { id: "rx-5600xt", name: "AMD RX 5600 XT", score: 44, tdp: 150 },
  { id: "rx-5700",   name: "AMD RX 5700",    score: 47, tdp: 180 },
  { id: "rx-5700xt", name: "AMD RX 5700 XT", score: 54, tdp: 225 },

  // AMD — RX 6000 series
  { id: "rx-6400", name: "AMD RX 6400", score: 24, tdp: 53 },
  { id: "rx-6500xt", name: "AMD RX 6500 XT", score: 28, tdp: 107 },
  { id: "rx-6600", name: "AMD RX 6600", score: 46, tdp: 132 },
  { id: "rx-6600xt", name: "AMD RX 6600 XT", score: 52, tdp: 160 },
  { id: "rx-6650xt", name: "AMD RX 6650 XT", score: 55, tdp: 180 },
  { id: "rx-6700",   name: "AMD RX 6700",    score: 57, tdp: 175 },
  { id: "rx-6700xt", name: "AMD RX 6700 XT", score: 61, tdp: 230 },
  { id: "rx-6750xt", name: "AMD RX 6750 XT", score: 64, tdp: 250 },
  { id: "rx-6800", name: "AMD RX 6800", score: 70, tdp: 250 },
  { id: "rx-6800xt", name: "AMD RX 6800 XT", score: 77, tdp: 300 },
  { id: "rx-6900xt", name: "AMD RX 6900 XT", score: 82, tdp: 300 },
  { id: "rx-6950xt", name: "AMD RX 6950 XT", score: 85, tdp: 335 },

  // AMD — RX 7000 series
  { id: "rx-7600", name: "AMD RX 7600", score: 53, tdp: 165 },
  { id: "rx-7600xt", name: "AMD RX 7600 XT", score: 58, tdp: 190 },
  { id: "rx-7700xt", name: "AMD RX 7700 XT", score: 63, tdp: 245 },
  { id: "rx-7800xt", name: "AMD RX 7800 XT", score: 73, tdp: 263 },
  { id: "rx-7900gre", name: "AMD RX 7900 GRE", score: 80, tdp: 260 },
  { id: "rx-7900xt", name: "AMD RX 7900 XT", score: 87, tdp: 315 },
  { id: "rx-7900xtx", name: "AMD RX 7900 XTX", score: 94, tdp: 355 },

  // AMD — RX 9000 series (RDNA 4)
  // RDNA 4 — strong rasterization
  { id: "rx-9070", name: "AMD RX 9070", score: 88, tdp: 220 },
  { id: "rx-9070xt", name: "AMD RX 9070 XT", score: 97, tdp: 304 },

  // Intel — Arc Alchemist
  { id: "arc-a580", name: "Intel Arc A580", score: 44, tdp: 185 },
  { id: "arc-a750", name: "Intel Arc A750", score: 50, tdp: 225 },
  { id: "arc-a770", name: "Intel Arc A770", score: 56, tdp: 225 },
  // Intel — Arc Battlemage
  { id: "arc-b570", name: "Intel Arc B570", score: 55, tdp: 150 },
  { id: "arc-b580", name: "Intel Arc B580", score: 63, tdp: 190 },
  { id: "arc-b770", name: "Intel Arc B770", score: 72, tdp: 228 },
];
