import { createContext, useContext } from "react";
import type { SavedSetup } from "./setupActions";

export interface SetupContextType {
  setups: SavedSetup[];
  loading: boolean;
  error: Error | null;
  addSetup: (setup: SavedSetup) => void;
  removeSetup: (id: string) => void;
  refetch: () => Promise<void>;
}

export const SetupContext = createContext<SetupContextType | undefined>(undefined);

export function useSetups() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error("useSetups must be used within SetupProvider");
  }
  return context;
}
