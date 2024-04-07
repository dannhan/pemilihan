"use client";

import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RefreshButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      type="submit"
      onClick={() => router.refresh()}
      className={className}
    >
      <RefreshCcw className="mr-3 h-4 w-4" />
      Refresh Data
    </Button>
  );
}
