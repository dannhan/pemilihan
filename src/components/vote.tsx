"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Thanks } from "@/components/thanks";

export function Vote({
  title,
  candidates,
}: {
  title: string;
  candidates: { nama: string }[];
}) {
  const [selected, setSelected] = useState<null | string>(null);

  return selected ? (
    <Thanks />
  ) : (
    <>
      <h1 className="mt-4 text-center text-xl font-bold">{title}</h1>
      <section className="mt-4 rounded border p-6 text-center shadow-md">
        <p className="mb-4 text-lg">Klik tombol pilihan anda</p>
        <div className="flex flex-col space-y-2">
          {candidates.map((candidate) => (
            <Button
              key={candidate.nama}
              variant="default"
              onClick={() => setSelected(candidate.nama)}
            >
              {candidate.nama}
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}
