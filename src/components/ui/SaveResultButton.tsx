"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { saveResult } from "@/lib/resultActions";
import Button from "./Button";

interface Props {
  type: "bottleneck" | "fps";
  label: string;
  data: Record<string, unknown>;
}

/**
 * Button that saves the current result to the database.
 * Prompts sign-in if the user is not authenticated.
 */
export default function SaveResultButton({ type, label, data }: Props) {
  const { isSignedIn, isLoaded } = useAuth();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = async () => {
    if (!isSignedIn) {
      window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setStatus("saving");
    const id = await saveResult(type, label, data);
    setStatus(id ? "saved" : "error");

    if (id) {
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  if (!isLoaded) return null;

  const buttonText = (() => {
    if (status === "saving") return "Saving…";
    if (status === "saved") return "Saved!";
    if (status === "error") return "Error — retry?";
    if (!isSignedIn) return "Sign in to save";
    return "Save result";
  })();

  const overrideClass = (() => {
    if (status === "saved") return "!bg-emerald-600/20 !border-emerald-500 !text-emerald-400 !cursor-default";
    if (status === "error") return "!bg-red-600/20 !border-red-500 !text-red-400";
    if (status === "saving") return "!cursor-wait";
    return "";
  })();

  return (
    <Button
      variant="accent"
      onClick={handleSave}
      disabled={status === "saving" || status === "saved"}
      className={overrideClass}
    >
      {buttonText}
    </Button>
  );
}
