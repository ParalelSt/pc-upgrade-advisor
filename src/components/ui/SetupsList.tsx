"use client";

import { useTransition } from "react";
import { deleteSetup } from "@/lib/setupActions";
import { useSetups } from "@/lib/setupContext";
import Button from "./Button";
import Card from "./Card";

export default function SetupsList() {
  const { setups, removeSetup } = useSetups();
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Delete this setup? This can't be undone.")) return;
    removeSetup(id);
    startTransition(() => {
      deleteSetup(id);
    });
  };

  if (setups.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted text-center py-6">
          No saved setups yet. Select a CPU and GPU in any tool and hit &ldquo;Save setup&rdquo;.
        </p>
      </Card>
    );
  }

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
