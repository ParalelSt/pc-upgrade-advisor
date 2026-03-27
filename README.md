# PC Upgrade Advisor

A free web tool that helps you figure out if your CPU or GPU is bottlenecking your gaming setup, estimate FPS across popular games, and decide what to upgrade next.

Live at: **[pcupgradeadvisor.com](https://pcupgradeadvisor.com)** *(update this)*

---

## What it does

- **Bottleneck Analyzer** — pick your CPU, GPU, target resolution and FPS target. It tells you which component is holding you back and by how much.
- **FPS Estimator** — estimates your average FPS across 19 games at your chosen resolution, based on relative hardware scores.
- **Saved Setups** — sign in and save your CPU+GPU combo so you can load it instantly across any tool without re-selecting every time.
- **My Results** — keeps a history of your analyses so you can compare before and after an upgrade.

Scores are cross-calibrated so a CPU and GPU with equal scores produce ~0% bottleneck. Not measured benchmarks — ballpark estimates based on relative performance.

---

## Stack

- [Next.js 16](https://nextjs.org) (App Router, server actions, `use cache`)
- [Clerk](https://clerk.com) for auth
- [Neon](https://neon.tech) serverless Postgres
- [Tailwind CSS v4](https://tailwindcss.com)

---

## Running locally

```bash
npm install
```

Create a `.env.local`:

```
DATABASE_URL=your_neon_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Then:

```bash
npm run dev
```

### Database setup

The app reads CPUs, GPUs, and games from Postgres tables. You'll need to seed them from the data files in `src/data/`. The `results` and `setups` tables need:

```sql
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  label TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE setups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  cpu_id TEXT NOT NULL,
  gpu_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## Hardware coverage

~130 CPUs and ~80 GPUs including:

- Intel 8th gen through Core Ultra 200 (Arrow Lake)
- AMD Ryzen 1000 through 9000 series (including X3D variants)
- NVIDIA GTX 970 through RTX 5090
- AMD RX 5000 through RX 9000 series
- Intel Arc Alchemist and Battlemage

---

## Contributing

If a score seems off or a common GPU/CPU is missing, open an issue. The scoring system is in `src/data/cpus.ts` and `src/data/gpus.ts` with calibration notes at the top.
