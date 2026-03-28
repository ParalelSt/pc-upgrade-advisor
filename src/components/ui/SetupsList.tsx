"use client";

import { useState, useTransition } from "react";
import { deleteSetup } from "@/lib/setupActions";
import { useSetups } from "@/lib/setupContext";
import Button from "./Button";
import Card from "./Card";
import ConfirmDialog from "./ConfirmDialog";

export default function SetupsList() {
  const { setups, removeSetup } = useSetups();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    removeSetup(pendingDeleteId);
    startTransition(() => {
      deleteSetup(pendingDeleteId);
    });
    setPendingDeleteId(null);
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
            onClick={() => setPendingDeleteId(setup.id)}
            className="shrink-0"
            aria-label={`Delete setup ${setup.name}`}
          >
            Delete
          </Button>
        </div>
      ))}
      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete setup"
        message="This will permanently delete this saved setup. This can't be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
