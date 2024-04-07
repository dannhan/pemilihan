"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
      const redirect = encodeURIComponent(`/voting/${params.id}`);

      alert("Anda harus login terlebih dahulu!");
      router.push(`/login?redirect=${redirect}`);

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
      <ul className="flex w-full flex-wrap gap-4 sm:gap-8">
        {candidates.map((candidate) => (
          <li
            key={candidate.name}
            className="flex w-full justify-center rounded sm:w-[calc(50%-16px)]"
          >
            <button
              className="group flex h-full w-full max-w-80 flex-col items-center rounded border"
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
                  <svg
                    data-sanity-icon="user"
                    width="1em"
                    height="1em"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block h-full w-full max-w-full bg-muted"
                  >
                    <path
                      d="M8 14.5C7 15 5.5 16 5.5 19.5H19.5C19.5 16 18.3416 15.1708 17 14.5C16 14 14 14 14 12.5C14 11 15 10.25 15 8.25C15 6.25 14 5.25 12.5 5.25C11 5.25 10 6.25 10 8.25C10 10.25 11 11 11 12.5C11 14 9 14 8 14.5Z"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </AspectRatio>

              <p className="h-full w-full break-words rounded-b p-2 transition-colors">
                {candidate.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
