import { getCpus, getGpus, getGames } from "@/lib/queries";
import FpsCalculatorTool from "@/components/tools/FpsCalculatorTool";
import Navbar from "@/components/layout/Navbar";

export default async function FpsCalculatorPage() {
  const [cpus, gpus, games] = await Promise.all([getCpus(), getGpus(), getGames()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold"><span className="text-gradient">FPS Estimator</span></h1>
          <p className="text-sm text-muted">
            Estimated average FPS across popular games based on your hardware and target resolution.
          </p>
        </div>

        <FpsCalculatorTool cpus={cpus} gpus={gpus} games={games} />
      </main>
    </div>
  );
}
