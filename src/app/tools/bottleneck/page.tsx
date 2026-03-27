import { getCpus, getGpus } from "@/lib/queries";
import BottleneckTool from "@/components/tools/BottleneckTool";
import Navbar from "@/components/layout/Navbar";

export default async function BottleneckPage() {
  const [cpus, gpus] = await Promise.all([getCpus(), getGpus()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold"><span className="text-gradient">Bottleneck Analyzer</span></h1>
          <p className="text-sm text-muted">
            Select your hardware and target settings to find out which component is holding you back.
          </p>
        </div>

        <BottleneckTool cpus={cpus} gpus={gpus} />
      </main>
    </div>
  );
}
