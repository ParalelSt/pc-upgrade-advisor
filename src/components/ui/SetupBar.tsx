"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { saveSetup } from "@/lib/setupActions";
import { useSetups } from "@/lib/setupContext";
import Button from "./Button";

interface Props {
  cpuId: string;
  gpuId: string;
  cpuName: string;
  gpuName: string;
  onLoad: (cpuId: string, gpuId: string) => void;
}

/**
 * Compact bar rendered above the CPU/GPU selects.
 * - Lets signed-in users load a previously saved setup (pre-fills CPU + GPU).
 * - Lets signed-in users save the current CPU+GPU selection as a new setup.
 * Uses shared SetupContext for global state across the app.
 */
export default function SetupBar({ cpuId, gpuId, cpuName, gpuName, onLoad }: Props) {
  const { isSignedIn, isLoaded } = useAuth();
  const { setups: localSetups, loading: setupsLoading, addSetup } = useSetups();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <p className="text-xs text-muted">
        <a href="/sign-in" className="underline underline-offset-2 hover:text-foreground transition-colors">
          Sign in
        </a>{" "}
        to save and load your setups.
      </p>
    );
  }

  const canSave = cpuId !== "" && gpuId !== "";

  const handleSave = async () => {
    if (!canSave) return;
    // Prevent duplicates by name
    const name = `${cpuName} + ${gpuName}`;
    if (localSetups.some((s) => s.name === name)) return;

    setSaveStatus("saving");
    const id = await saveSetup(name, cpuId, gpuId);
    if (id) {
      addSetup({
        id,
        name,
        cpuId,
        gpuId,
        createdAt: new Date().toISOString(),
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } else {
      setSaveStatus("idle");
    }
  };

  const saveLabel = (() => {
    if (saveStatus === "saving") return "Saving…";
    if (saveStatus === "saved") return "Saved!";
    const name = cpuName && gpuName ? `${cpuName} + ${gpuName}` : "";
    if (name && localSetups.some((s) => s.name === name)) return "Already saved";
    return "Save setup";
  })();

  const isSaveDisabled =
    !canSave ||
    saveStatus === "saving" ||
    saveStatus === "saved" ||
    (cpuName && gpuName && localSetups.some((s) => s.name === `${cpuName} + ${gpuName}`));

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {setupsLoading && (
        <p className="text-xs text-muted">Loading setups…</p>
      )}

      {!setupsLoading && localSetups.length > 0 && (
        <select
          className="flex-1 min-w-0 text-xs bg-surface border border-border/50 text-muted rounded-lg px-3 py-2 focus:outline-none focus:border-accent/50 transition-colors"
          defaultValue=""
          onChange={(e) => {
            const setup = localSetups.find((s) => s.id === e.target.value);
            if (setup) onLoad(setup.cpuId, setup.gpuId);
            e.target.value = "";
          }}
        >
          <option value="" disabled>Load a saved setup…</option>
          {localSetups.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      )}

      {canSave && (
        <Button
          variant="ghost"
          onClick={handleSave}
          disabled={!!isSaveDisabled}
          className={saveStatus === "saved" ? "border-emerald-500/50! text-emerald-400!" : ""}
        >
          {saveLabel}
        </Button>
      )}

      {!canSave && !setupsLoading && localSetups.length === 0 && (
        <p className="text-xs text-muted">Select a CPU and GPU to save your setup.</p>
      )}
    </div>
  );
}
