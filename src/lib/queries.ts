import { cacheLife } from "next/cache";
import { getDb } from "./db";
import type { CpuEntry } from "@/data/cpus";
import type { GpuEntry } from "@/data/gpus";
import type { GameEntry } from "@/data/games";

/**
 * Fetches all CPUs ordered by score descending.
 * Cached for up to 1 day — hardware data changes infrequently.
 */
export async function getCpus(): Promise<CpuEntry[]> {
  "use cache";
  cacheLife("days");
  const sql = getDb();
  const rows = await sql`SELECT id, name, score, tdp FROM cpus ORDER BY score DESC`;
  return rows as CpuEntry[];
}

/**
 * Fetches all GPUs ordered by score descending.
 * Cached for up to 1 day — hardware data changes infrequently.
 */
export async function getGpus(): Promise<GpuEntry[]> {
  "use cache";
  cacheLife("days");
  const sql = getDb();
  const rows = await sql`SELECT id, name, score, tdp FROM gpus ORDER BY score DESC`;
  return rows as GpuEntry[];
}

/**
 * Fetches all games ordered by name ascending.
 * Cached for up to 1 day — game list changes infrequently.
 */
export async function getGames(): Promise<GameEntry[]> {
  "use cache";
  cacheLife("days");
  const sql = getDb();
  const rows = await sql`SELECT id, name, base_fps AS "baseFps", cpu_weight AS "cpuWeight", gpu_weight AS "gpuWeight", genre FROM games ORDER BY name ASC`;
  return rows as GameEntry[];
}
