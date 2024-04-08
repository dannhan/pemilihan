"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PieChart } from "lucide-react";

type Props = { params: { slug: string }; className?: string };
export function SeeResultButton({ params, className }: Props) {
  const router = useRouter();

  return (
    <Button
      // todo: better way?
      onClick={() => {
        router.push(`${params.slug}/result`);
        router.refresh();
      }}
      className={className}
    >
      <PieChart className="w-4 h-4 mr-3" />
      Lihat Hasil Polling
    </Button>
  );
}
