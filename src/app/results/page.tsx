import { getSavedResults } from "@/lib/resultActions";
import { getSavedSetups } from "@/lib/setupActions";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import ResultsList from "@/components/ui/ResultsList";
import SetupsList from "@/components/ui/SetupsList";

export default async function ResultsPage() {
  const [results, setups] = await Promise.all([getSavedResults(), getSavedSetups()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-2xl px-6 py-12 flex flex-col gap-12">

        {/* Setups */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">
              <span className="text-gradient">My Setups</span>
            </h1>
            <p className="text-sm text-muted">Saved CPU + GPU combos you can load instantly in any tool.</p>
          </div>
          {setups.length === 0 ? (
            <Card>
              <p className="text-sm text-muted text-center py-6">
                No saved setups yet. Select a CPU and GPU in any tool and hit &ldquo;Save setup&rdquo;.
              </p>
            </Card>
          ) : (
            <SetupsList setups={setups} />
          )}
        </section>

        {/* Results */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">
              <span className="text-gradient">My Results</span>
            </h2>
            <p className="text-sm text-muted">Your saved bottleneck and FPS analyses.</p>
          </div>
          {results.length === 0 ? (
            <Card>
              <p className="text-sm text-muted text-center py-6">
                No saved results yet. Run an analysis and hit &ldquo;Save result&rdquo; to store it here.
              </p>
            </Card>
          ) : (
            <ResultsList results={results} />
          )}
        </section>

      </main>
    </div>
  );
}
