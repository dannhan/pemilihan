"use client";

import { useState } from "react";
import Image from "next/image";
import { Option } from "@/lib/type";

import { User } from "lucide-react";
import { Thanks } from "@/components/thanks";

export function Vote({
  title,
  candidates,
}: {
  title: string;
  candidates: Option[];
}) {
  const [selected, setSelected] = useState<null | string>(null);

  return selected ? (
    <Thanks />
  ) : (
    <>
      {/* <h1 className="mt-4 text-center text-xl font-bold">{title}</h1> */}
      <h1 className="my-4 text-xl font-bold">{title}</h1>

      {/* <section className="mt-4 flex flex-col items-center rounded border p-6 text-center shadow-md"> */}
      <section className="mt-4 flex flex-col items-center rounded text-center">
        {/* <p className="mb-4 text-lg">Klik tombol pilihan anda</p> */}

        <ul className="inline-flex w-full items-stretch gap-4 [flex-flow:wrap] min-[480px]:gap-6 min-[720px]:gap-x-12">
          {candidates.map((candidate) => (
            <li
              key={candidate.name}
              className="h-[inherit] w-full min-[440px]:w-[calc(50%-12px)] min-[720px]:w-[calc(50%-24px)]"
            >
              <button
                className="flex h-full w-full flex-col items-center rounded border-2"
                onClick={() => {
                  setSelected(candidate.name);
                  window.scrollTo({ top: 0 });
                }}
              >
                <div className="flex h-40 w-full items-center justify-center overflow-hidden pb-0">
                  {candidate.image ? (
                    <div className="relative h-full w-full bg-muted">
                      <Image
                        fill
                        alt="candidate"
                        src={candidate.image}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <User className="block h-full max-h-full w-full max-w-full bg-muted" />
                  )}
                </div>

                <p className="py-2">{candidate.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
