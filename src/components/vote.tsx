"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Option } from "@/lib/type";

import { Share2, User } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Thanks } from "@/components/thanks";
import { SeeResultButton } from "@/components/see-result-button";
import { Button } from "./ui/button";
import { postVoteClient } from "@/firebase/services/client";

export function Vote({
  params,
  candidates,
  className,
}: {
  params: { id: string };
  candidates: Option[];
  className?: string;
}) {
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (candidate: Option) => {
    setIsLoading(true);
    await postVoteClient(params.id, candidate.name);
    setIsLoading(false);

    setSelected(true);
    window.scrollTo({ top: 0 });
  };

  return selected ? (
    <Thanks />
  ) : (
    <>
      <section className={className}>
        <ul className={cn("flex w-full flex-wrap gap-8")}>
          {candidates.map((candidate) => (
            <li
              key={candidate.name}
              className="flex w-full justify-center rounded sm:w-[calc(50%-16px)]"
            >
              <button
                className="group h-full w-full max-w-80 rounded border"
                onClick={() => onSubmit(candidate)}
                disabled={isLoading}
              >
                <AspectRatio ratio={4 / 3}>
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
                </AspectRatio>

                <p className="rounded-b py-2 transition-colors group-hover:bg-muted">
                  {candidate.name}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 flex flex-col justify-center">
        <div className="flex flex-col gap-2">
          <SeeResultButton params={params} />
          <Button variant="secondary" className="border">
            <Share2 className="mr-3 h-4 w-4" />
            Bagikan Poling
          </Button>
        </div>
      </div>
    </>
  );
}
