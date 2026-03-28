"use client";

import { useState, useEffect, ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";
import { getSavedSetups } from "@/lib/setupActions";
import { SetupContext, type SetupContextType } from "@/lib/setupContext";
import type { SavedSetup } from "@/lib/setupActions";

export function SetupProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [setups, setSetups] = useState<SavedSetup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    if (!isSignedIn) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getSavedSetups();
      setSetups(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch setups"));
      setSetups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      refetch();
    } else if (isLoaded && !isSignedIn) {
      setSetups([]);
    }
  }, [isSignedIn, isLoaded]);

  const value: SetupContextType = {
    setups,
    loading,
    error,
    addSetup: (setup) => {
      setSetups((prev) => [setup, ...prev]);
    },
    removeSetup: (id) => {
      setSetups((prev) => prev.filter((s) => s.id !== id));
    },
    refetch,
  };

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>;
}
