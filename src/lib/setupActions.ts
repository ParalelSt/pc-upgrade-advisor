"use server";

import { auth } from "@clerk/nextjs/server";
import { getDb } from "./db";

export interface SavedSetup {
  id: string;
  name: string;
  cpuId: string;
  gpuId: string;
  createdAt: string;
}

/**
 * Saves a CPU+GPU combo as a named setup for the current user.
 * Returns the new setup's ID, or null if not authenticated.
 */
export async function saveSetup(
  name: string,
  cpuId: string,
  gpuId: string,
): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const sql = getDb();
  const rows = await sql`
    INSERT INTO setups (user_id, name, cpu_id, gpu_id)
    VALUES (${userId}, ${name}, ${cpuId}, ${gpuId})
    RETURNING id
  `;
  return (rows[0] as { id: string }).id;
}

/**
 * Fetches all saved setups for the current user, newest first.
 */
export async function getSavedSetups(): Promise<SavedSetup[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const sql = getDb();
  const rows = await sql`
    SELECT id, name, cpu_id, gpu_id, created_at
    FROM setups
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return rows.map((r) => ({
    id: r.id as string,
    name: r.name as string,
    cpuId: r.cpu_id as string,
    gpuId: r.gpu_id as string,
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

/**
 * Deletes a setup by ID, only if it belongs to the current user.
 */
export async function deleteSetup(id: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) return;

  const sql = getDb();
  await sql`DELETE FROM setups WHERE id = ${id} AND user_id = ${userId}`;
}
