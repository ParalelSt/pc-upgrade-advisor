/**
 * CPU data with cross-calibrated gaming performance scores (0–100+).
 *
 * Scores are calibrated on the same scale as GPU scores so that a CPU
 * and GPU with equal scores produce ~0% bottleneck. Anchored at:
 *   RTX 4090 = 100  ↔  Ryzen 9 7950X3D = 100
 *   RTX 3070  = 65  ↔  Core i5-12600K   = 65
 *   RX 6600   = 46  ↔  Ryzen 5 3600     = 46
 *
 * Higher resolution anchors:
 *   Ryzen 7 9800X3D   = 99  (current best gaming CPU as of 2026-03)
 *   Ryzen 9 9950X     = 96
 *   Core Ultra 9 285K = 93
 */
export interface CpuEntry {
  id: string;
  name: string;
  /** Gaming performance score calibrated against GPU scores (0–100) */
  score: number;
  tdp: number;
}

/**
 * Master list of CPUs with cross-calibrated gaming performance scores.
 * Entries are grouped by vendor and tier, ordered roughly by score within each group.
 * @public
 */
export const CPUS: CpuEntry[] = [
  // Intel — 8th / 9th gen (still widely used)
  { id: "i5-8600k",  name: "Intel Core i5-8600K",  score: 52, tdp: 95 },
  { id: "i7-8700k",  name: "Intel Core i7-8700K",  score: 58, tdp: 95 },
  { id: "i7-9700k",  name: "Intel Core i7-9700K",  score: 57, tdp: 95 },
  { id: "i9-9900k",  name: "Intel Core i9-9900K",  score: 63, tdp: 95 },

  // Intel — Core i3
  { id: "i3-12100", name: "Intel Core i3-12100", score: 40, tdp: 60 },
  { id: "i3-13100", name: "Intel Core i3-13100", score: 43, tdp: 60 },
  { id: "i3-14100", name: "Intel Core i3-14100", score: 43, tdp: 60 },

  // Intel — Core i5
  { id: "i5-10400",  name: "Intel Core i5-10400",  score: 46, tdp: 65 },
  { id: "i5-10600k", name: "Intel Core i5-10600K", score: 59, tdp: 125 },
  { id: "i5-11400",  name: "Intel Core i5-11400",  score: 50, tdp: 65 },
  { id: "i5-11600k", name: "Intel Core i5-11600K", score: 62, tdp: 125 },
  { id: "i5-12400",  name: "Intel Core i5-12400",  score: 57, tdp: 65 },
  { id: "i5-12400f", name: "Intel Core i5-12400F", score: 57, tdp: 65 },
  { id: "i5-13400",  name: "Intel Core i5-13400",  score: 61, tdp: 65 },
  { id: "i5-13400f", name: "Intel Core i5-13400F", score: 60, tdp: 65 },
  { id: "i5-13500",  name: "Intel Core i5-13500",  score: 65, tdp: 65 },
  { id: "i5-14400",  name: "Intel Core i5-14400",  score: 61, tdp: 65 },
  { id: "i5-12600k", name: "Intel Core i5-12600K", score: 65, tdp: 125 },
  { id: "i5-13600k", name: "Intel Core i5-13600K", score: 72, tdp: 125 },
  { id: "i5-14500",  name: "Intel Core i5-14500",  score: 66, tdp: 65 },
  { id: "i5-14600",  name: "Intel Core i5-14600",  score: 71, tdp: 65 },
  { id: "i5-14600k", name: "Intel Core i5-14600K", score: 74, tdp: 125 },

  // Intel — Core i7
  { id: "i7-10700k", name: "Intel Core i7-10700K", score: 60, tdp: 125 },
  { id: "i7-11700k", name: "Intel Core i7-11700K", score: 68, tdp: 125 },
  { id: "i7-12700",  name: "Intel Core i7-12700",  score: 71, tdp: 65 },
  { id: "i7-12700k", name: "Intel Core i7-12700K", score: 73, tdp: 125 },
  { id: "i7-13700",  name: "Intel Core i7-13700",  score: 83, tdp: 65 },
  { id: "i7-13700k", name: "Intel Core i7-13700K", score: 84, tdp: 125 },
  { id: "i7-14700",  name: "Intel Core i7-14700",  score: 81, tdp: 65 },
  { id: "i7-14700k", name: "Intel Core i7-14700K", score: 85, tdp: 125 },

  // Intel — Core i9
  { id: "i9-12900k", name: "Intel Core i9-12900K", score: 84, tdp: 125 },
  { id: "i9-13900k", name: "Intel Core i9-13900K", score: 92, tdp: 125 },
  { id: "i9-14900k", name: "Intel Core i9-14900K", score: 95, tdp: 125 },
  { id: "i9-14900ks", name: "Intel Core i9-14900KS", score: 96, tdp: 125 },

  // Intel — Core Ultra 200 (Arrow Lake)
  { id: "cu5-245k", name: "Intel Core Ultra 5 245K", score: 71, tdp: 125 },
  { id: "cu7-265k", name: "Intel Core Ultra 7 265K", score: 82, tdp: 125 },
  { id: "cu9-285k", name: "Intel Core Ultra 9 285K", score: 93, tdp: 125 },

  // AMD — Ryzen 1000 / 2000 (older but still in use)
  { id: "r5-1600",  name: "AMD Ryzen 5 1600",  score: 33, tdp: 65 },
  { id: "r7-1700",  name: "AMD Ryzen 7 1700",  score: 35, tdp: 65 },
  { id: "r5-2600",  name: "AMD Ryzen 5 2600",  score: 38, tdp: 65 },
  { id: "r7-2700x", name: "AMD Ryzen 7 2700X", score: 44, tdp: 105 },

  // AMD — Ryzen 3000
  { id: "r5-3600x", name: "AMD Ryzen 5 3600X", score: 50, tdp: 95 },
  { id: "r7-3700x", name: "AMD Ryzen 7 3700X", score: 53, tdp: 65 },
  { id: "r7-3800x", name: "AMD Ryzen 7 3800X", score: 55, tdp: 105 },
  { id: "r9-3900x", name: "AMD Ryzen 9 3900X", score: 63, tdp: 105 },
  { id: "r9-3950x", name: "AMD Ryzen 9 3950X", score: 67, tdp: 105 },

  // AMD — Ryzen 3/5 (budget)
  { id: "r3-5300g", name: "AMD Ryzen 3 5300G", score: 43, tdp: 65 },
  { id: "r5-3600",  name: "AMD Ryzen 5 3600",  score: 46, tdp: 65 },
  { id: "r5-5500", name: "AMD Ryzen 5 5500", score: 54, tdp: 65 },
  { id: "r5-5600g", name: "AMD Ryzen 5 5600G", score: 55, tdp: 65 },
  { id: "r5-5600", name: "AMD Ryzen 5 5600", score: 58, tdp: 65 },
  { id: "r5-5600x", name: "AMD Ryzen 5 5600X", score: 61, tdp: 65 },
  { id: "r5-7500f", name: "AMD Ryzen 5 7500F", score: 63, tdp: 65 },
  { id: "r5-7600",  name: "AMD Ryzen 5 7600",  score: 65, tdp: 65 },
  { id: "r5-7600x", name: "AMD Ryzen 5 7600X", score: 68, tdp: 105 },

  // AMD — Ryzen 7
  { id: "r7-5700g", name: "AMD Ryzen 7 5700G", score: 58, tdp: 65 },
  { id: "r7-5700x", name: "AMD Ryzen 7 5700X", score: 63, tdp: 65 },
  { id: "r7-5800x", name: "AMD Ryzen 7 5800X", score: 68, tdp: 105 },
  // 3D V-Cache gaming advantage
  { id: "r7-5800x3d", name: "AMD Ryzen 7 5800X3D", score: 83, tdp: 105 },
  { id: "r7-7700",  name: "AMD Ryzen 7 7700",  score: 79, tdp: 65 },
  { id: "r7-7700x", name: "AMD Ryzen 7 7700X", score: 82, tdp: 105 },
  // 3D V-Cache — near top-end gaming CPU despite lower core count
  { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", score: 91, tdp: 120 },

  // AMD — Ryzen 9 (AM4/AM5)
  { id: "r9-5900x", name: "AMD Ryzen 9 5900X", score: 76, tdp: 105 },
  { id: "r9-5950x", name: "AMD Ryzen 9 5950X", score: 80, tdp: 105 },
  { id: "r9-7900",  name: "AMD Ryzen 9 7900",  score: 87, tdp: 170 },
  { id: "r9-7900x", name: "AMD Ryzen 9 7900X", score: 90, tdp: 170 },
  { id: "r9-7950x", name: "AMD Ryzen 9 7950X", score: 93, tdp: 170 },
  { id: "r9-7950x3d", name: "AMD Ryzen 9 7950X3D", score: 100, tdp: 120 },

  // AMD — Ryzen 9000 (Granite Ridge)
  { id: "r5-9600",  name: "AMD Ryzen 5 9600",  score: 67, tdp: 65 },
  { id: "r5-9600x", name: "AMD Ryzen 5 9600X", score: 70, tdp: 65 },
  { id: "r7-9700x", name: "AMD Ryzen 7 9700X", score: 83, tdp: 65 },
  // 3D V-Cache — fastest gaming CPU
  { id: "r7-9800x3d", name: "AMD Ryzen 7 9800X3D", score: 99, tdp: 120 },
  { id: "r9-9900",  name: "AMD Ryzen 9 9900",  score: 89, tdp: 120 },
  { id: "r9-9900x", name: "AMD Ryzen 9 9900X", score: 92, tdp: 120 },
  { id: "r9-9950x", name: "AMD Ryzen 9 9950X", score: 96, tdp: 170 },
];
