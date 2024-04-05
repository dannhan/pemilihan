"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Option } from "@/lib/type";

import { User } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Thanks } from "@/components/thanks";

import { firebaseAuth } from "@/firebase/firebase";
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
  const router = useRouter();

  const onSubmit = async (candidate: Option) => {
    setIsLoading(true);
    const user = firebaseAuth.currentUser;
    if (!user) {
      // remember the last page and redirect to that page after login
      alert("Anda harus login terlebih dahulu!");
      router.push("/login");

      return;
    }

    await postVoteClient(params.id, candidate.name, user);
    setIsLoading(false);

    setSelected(true);
    window.scrollTo({ top: 0 });
  };

  return selected ? (
    <Thanks />
  ) : (
    <section className={className}>
      <ul className={cn("flex w-full flex-wrap gap-4 sm:gap-8")}>
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
  );
}
