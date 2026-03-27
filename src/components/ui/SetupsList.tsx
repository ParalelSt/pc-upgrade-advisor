"use client";

import { useState, useTransition } from "react";
import type { SavedSetup } from "@/lib/setupActions";
import { deleteSetup } from "@/lib/setupActions";
import Button from "./Button";

interface Props {
  setups: SavedSetup[];
}

export default function SetupsList({ setups: initial }: Props) {
  const [setups, setSetups] = useState(initial);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    setSetups((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => {
      deleteSetup(id);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {setups.map((setup) => (
        <div
          key={setup.id}
          className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-border/50 bg-surface text-sm"
        >
          <span className="text-foreground font-medium truncate">{setup.name}</span>
          <Button
            variant="danger"
            onClick={() => handleDelete(setup.id)}
            className="shrink-0"
            aria-label={`Delete setup ${setup.name}`}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
