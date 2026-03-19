"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
