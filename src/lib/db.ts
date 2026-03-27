import { neon } from "@neondatabase/serverless";

/**
 * Returns a Neon SQL tagged-template function connected via the DATABASE_URL env variable.
 * Uses HTTP transport — no persistent connection needed in serverless/edge environments.
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}
