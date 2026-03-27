"use server";

import { auth } from "@clerk/nextjs/server";
import { getDb } from "./db";

export interface SavedResult {
  id: string;
  type: "bottleneck" | "fps";
  label: string;
  data: Record<string, unknown>;
  createdAt: string;
}

/**
 * Saves a result to the database for the currently signed-in user.
 * Returns the saved result's ID, or null if not authenticated.
 */
export async function saveResult(
  type: "bottleneck" | "fps",
  label: string,
  data: Record<string, unknown>,
): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const sql = getDb();
  const rows = await sql`
    INSERT INTO results (user_id, type, label, data)
    VALUES (${userId}, ${type}, ${label}, ${JSON.stringify(data)})
    RETURNING id
  `;
  return (rows[0] as { id: string }).id;
}

/**
 * Fetches all saved results for the currently signed-in user, newest first.
 */
export async function getSavedResults(): Promise<SavedResult[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const sql = getDb();
  const rows = await sql`
    SELECT id, type, label, data, created_at
    FROM results
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return rows.map((r) => ({
    id: r.id as string,
    type: r.type as "bottleneck" | "fps",
    label: r.label as string,
    data: r.data as Record<string, unknown>,
    createdAt: (r.created_at as Date).toISOString(),
  }));
}

/**
 * Deletes a saved result by ID, only if it belongs to the current user.
 */
export async function deleteResult(id: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) return;

  const sql = getDb();
  await sql`DELETE FROM results WHERE id = ${id} AND user_id = ${userId}`;
}
