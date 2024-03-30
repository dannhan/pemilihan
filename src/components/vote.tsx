"use client";

import { useState } from "react";
import { UserIcon } from "@sanity/icons";
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
      <section className="mt-4 flex flex-col items-center rounded border p-6 text-center shadow-md">
        {/* <section className="mt-4 flex flex-col items-center rounded p-6 text-center"> */}
        <p className="mb-4 text-lg">Klik tombol pilihan anda</p>
        <ul className="inline-flex w-fit items-stretch gap-4 [flex-flow:wrap]">
          {candidates.map((candidate) => (
            <li
              key={candidate.nama}
              className="h-[inherit] w-full min-[440px]:w-[calc(50%-12px)] min-[720px]:w-[calc(25%-12px)]"
            >
              <button
                className="flex h-full w-full flex-col items-center rounded border-2"
                onClick={() => {
                  setSelected(candidate.nama);
                  window.scrollTo({ top: 0 });
                }}
              >
                <div className="flex h-40 w-full items-center justify-center overflow-hidden p-2 pb-0">
                  <UserIcon className="block h-full max-h-full w-full max-w-full bg-muted" />
                </div>

                <p className="py-2">{candidate.nama}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* <Button */}
      {/*   key={candidate.nama} */}
      {/*   variant="default" */}
      {/* > */}
      {/*   {candidate.nama} */}
      {/* </Button> */}
    </>
  );
}
