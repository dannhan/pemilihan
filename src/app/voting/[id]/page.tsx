"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Thanks } from "@/components/thanks";

import { votes } from "../../data";
import { candidates } from "../data";

export default function Component({ params }: { params: { id: string } }) {
  const [selected, setSelected] = useState<null | string>(null);
  const vote = votes.find((v) => (v.id = params.id));

  return (
    <main className="mx-auto my-8 min-h-screen max-w-4xl px-4">
      <Button asChild variant="outline" size="sm">
        <Link href="/" className="font-light">
          <ChevronLeft className="mr-2 h-3 w-3" />
          Kembali
        </Link>
      </Button>

      {selected ? (
        <Thanks />
      ) : (
        <>
          <h1 className="mb-4 mt-4 text-center text-xl font-bold">
            {vote?.title}
          </h1>
          <section className="rounded border p-6 text-center shadow-md">
            <p className="mb-4 text-lg">Klik tombol pilihan anda</p>
            <div className="flex flex-col space-y-2">
              {candidates.map((candidate) => (
                <Button
                  key={candidate}
                  variant="default"
                  onClick={() => setSelected(candidate)}
                >
                  {candidate}
                </Button>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
