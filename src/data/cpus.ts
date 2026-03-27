/**
 * CPU data with cross-calibrated gaming performance scores (0–100).
 *
 * Scores are calibrated on the same scale as GPU scores so that a CPU
 * and GPU with equal scores produce ~0% bottleneck. Anchored at:
 *   RTX 4090 = 100  ↔  Ryzen 9 7950X3D = 100
 *   RTX 3070  = 65  ↔  Core i5-12600K   = 65
 *   RX 6600   = 46  ↔  Ryzen 5 3600     = 46
 */
export interface CpuEntry {
  id: string;
  name: string;
  /** Gaming performance score calibrated against GPU scores (0–100) */
  score: number;
  tdp: number;
}

/** @public */
export const CPUS: CpuEntry[] = [
  // Intel — Core i3
  { id: "i3-12100", name: "Intel Core i3-12100", score: 40, tdp: 60 },
  { id: "i3-13100", name: "Intel Core i3-13100", score: 43, tdp: 60 },

  // Intel — Core i5
  { id: "i5-10400", name: "Intel Core i5-10400", score: 46, tdp: 65 },
  { id: "i5-11400", name: "Intel Core i5-11400", score: 50, tdp: 65 },
  { id: "i5-12400", name: "Intel Core i5-12400", score: 57, tdp: 65 },
  { id: "i5-13400", name: "Intel Core i5-13400", score: 61, tdp: 65 },
  { id: "i5-12600k", name: "Intel Core i5-12600K", score: 65, tdp: 125 },
  { id: "i5-13600k", name: "Intel Core i5-13600K", score: 72, tdp: 125 },
  { id: "i5-14600k", name: "Intel Core i5-14600K", score: 74, tdp: 125 },

  // Intel — Core i7
  { id: "i7-10700k", name: "Intel Core i7-10700K", score: 60, tdp: 125 },
  { id: "i7-12700k", name: "Intel Core i7-12700K", score: 73, tdp: 125 },
  { id: "i7-13700k", name: "Intel Core i7-13700K", score: 84, tdp: 125 },
  { id: "i7-14700k", name: "Intel Core i7-14700K", score: 85, tdp: 125 },

  // Intel — Core i9
  { id: "i9-12900k", name: "Intel Core i9-12900K", score: 84, tdp: 125 },
  { id: "i9-13900k", name: "Intel Core i9-13900K", score: 92, tdp: 125 },
  { id: "i9-14900k", name: "Intel Core i9-14900K", score: 95, tdp: 125 },

  // AMD — Ryzen 5
  { id: "r5-3600", name: "AMD Ryzen 5 3600", score: 46, tdp: 65 },
  { id: "r5-5600", name: "AMD Ryzen 5 5600", score: 58, tdp: 65 },
  { id: "r5-5600x", name: "AMD Ryzen 5 5600X", score: 61, tdp: 65 },
  { id: "r5-7600", name: "AMD Ryzen 5 7600", score: 65, tdp: 65 },
  { id: "r5-7600x", name: "AMD Ryzen 5 7600X", score: 68, tdp: 105 },

  // AMD — Ryzen 7
  { id: "r7-5700x", name: "AMD Ryzen 7 5700X", score: 63, tdp: 65 },
  { id: "r7-5800x", name: "AMD Ryzen 7 5800X", score: 68, tdp: 105 },
  // 3D V-Cache gives the 5800X3D a large gaming advantage over raw IPC
  { id: "r7-5800x3d", name: "AMD Ryzen 7 5800X3D", score: 83, tdp: 105 },
  { id: "r7-7700x", name: "AMD Ryzen 7 7700X", score: 82, tdp: 105 },
  // 3D V-Cache — near top-end gaming CPU despite lower core count
  { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", score: 91, tdp: 120 },

  // AMD — Ryzen 9
  { id: "r9-5900x", name: "AMD Ryzen 9 5900X", score: 76, tdp: 105 },
  { id: "r9-5950x", name: "AMD Ryzen 9 5950X", score: 80, tdp: 105 },
  { id: "r9-7900x", name: "AMD Ryzen 9 7900X", score: 90, tdp: 170 },
  { id: "r9-7950x", name: "AMD Ryzen 9 7950X", score: 93, tdp: 170 },
  { id: "r9-7950x3d", name: "AMD Ryzen 9 7950X3D", score: 100, tdp: 120 },
];
