/**
 * Game data for FPS estimation.
 *
 * Each game has a base FPS at 1440p/Ultra on a "reference build" (CPU score 70, GPU score 70),
 * plus weight factors that describe how CPU-bound vs GPU-bound the game is.
 *
 * cpuWeight (0–1): how much of the FPS is determined by CPU score (vs GPU).
 * gpuWeight (0–1): how much of the FPS is determined by GPU score (vs CPU).
 * cpuWeight + gpuWeight = 1.
 */
export interface GameEntry {
  id: string;
  name: string;
  /** Base average FPS at 1440p/Ultra on the reference build (CPU=70, GPU=70) */
  baseFps: number;
  /** 0–1, how much the CPU score drives FPS */
  cpuWeight: number;
  /** 0–1, how much the GPU score drives FPS */
  gpuWeight: number;
  /** Game genre tag */
  genre: string;
}

/** @public */
export const GAMES: GameEntry[] = [
  // Competitive / esports — CPU-heavy, lower GPU demand
  { id: "csgo", name: "CS2", baseFps: 280, cpuWeight: 0.65, gpuWeight: 0.35, genre: "FPS" },
  { id: "valorant", name: "Valorant", baseFps: 320, cpuWeight: 0.60, gpuWeight: 0.40, genre: "FPS" },
  { id: "fortnite", name: "Fortnite", baseFps: 140, cpuWeight: 0.55, gpuWeight: 0.45, genre: "Battle Royale" },
  { id: "apex", name: "Apex Legends", baseFps: 160, cpuWeight: 0.50, gpuWeight: 0.50, genre: "Battle Royale" },
  { id: "overwatch2", name: "Overwatch 2", baseFps: 200, cpuWeight: 0.55, gpuWeight: 0.45, genre: "FPS" },

  // AAA single-player — GPU-heavy
  { id: "cyberpunk", name: "Cyberpunk 2077", baseFps: 65, cpuWeight: 0.25, gpuWeight: 0.75, genre: "RPG" },
  { id: "rdr2", name: "Red Dead Redemption 2", baseFps: 75, cpuWeight: 0.35, gpuWeight: 0.65, genre: "Action" },
  { id: "hogwarts", name: "Hogwarts Legacy", baseFps: 72, cpuWeight: 0.25, gpuWeight: 0.75, genre: "RPG" },
  { id: "ac-mirage", name: "Assassin's Creed Mirage", baseFps: 90, cpuWeight: 0.30, gpuWeight: 0.70, genre: "Action" },
  { id: "spiderman", name: "Marvel's Spider-Man 2", baseFps: 80, cpuWeight: 0.30, gpuWeight: 0.70, genre: "Action" },
  { id: "starfield", name: "Starfield", baseFps: 60, cpuWeight: 0.40, gpuWeight: 0.60, genre: "RPG" },
  { id: "alan-wake2", name: "Alan Wake 2", baseFps: 58, cpuWeight: 0.20, gpuWeight: 0.80, genre: "Horror" },

  // Open world / sandbox — balanced or CPU-bound
  { id: "minecraft", name: "Minecraft (Java)", baseFps: 220, cpuWeight: 0.70, gpuWeight: 0.30, genre: "Sandbox" },
  { id: "gta5", name: "GTA V", baseFps: 110, cpuWeight: 0.45, gpuWeight: 0.55, genre: "Action" },
  { id: "elden-ring", name: "Elden Ring", baseFps: 60, cpuWeight: 0.30, gpuWeight: 0.70, genre: "RPG" },
  { id: "witcher3", name: "The Witcher 3", baseFps: 95, cpuWeight: 0.30, gpuWeight: 0.70, genre: "RPG" },

  // Strategy / simulation — CPU-heavy
  { id: "totalwar", name: "Total War: Warhammer III", baseFps: 70, cpuWeight: 0.65, gpuWeight: 0.35, genre: "Strategy" },
  { id: "msfs", name: "Microsoft Flight Simulator", baseFps: 45, cpuWeight: 0.55, gpuWeight: 0.45, genre: "Simulation" },

  // Online multiplayer
  { id: "warzone", name: "Call of Duty: Warzone", baseFps: 130, cpuWeight: 0.45, gpuWeight: 0.55, genre: "FPS" },
  { id: "pubg", name: "PUBG", baseFps: 120, cpuWeight: 0.45, gpuWeight: 0.55, genre: "Battle Royale" },
];
