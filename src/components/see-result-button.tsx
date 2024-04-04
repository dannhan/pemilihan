"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = { params: { id: string } };
export function SeeResultButton({ params }: Props) {
  const router = useRouter();

  return (
    <Button
      // todo: better way?
      onClick={() => {
        router.push(`${params.id}/result`);
        router.refresh();
      }}
    >
      Lihat Hasil Polling
    </Button>
  );
}
