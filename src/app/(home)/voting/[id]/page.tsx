import { notFound } from "next/navigation";

import { Share2, User } from "lucide-react";
import { getPollByIdAdmin } from "@/firebase/services/admin";
import { SeeResultButton } from "@/components/see-result-button";
import { Button } from "@/components/ui/button";
import { Vote } from "@/components/vote";

export default async function Page({ params }: { params: { id: string } }) {
  const { poll, options } = await getPollByIdAdmin(params.id);

  if (options.length === 0) return notFound();

  return (
    <main className="mx-auto min-h-screen max-w-[40rem] items-center px-4">
      <h1 className="my-6 text-center text-2xl font-bold leading-none">
        {poll?.title || ""}
      </h1>

      <Vote
        params={params}
        candidates={options || []}
        className="rounded-md sm:border sm:p-4 sm:shadow-md"
      />

      <div className="my-4 flex w-full flex-col justify-center">
        <div className="mx-auto flex w-full max-w-80 flex-col gap-2 sm:max-w-none">
          <SeeResultButton params={params} />
          <Button variant="secondary" className="border hidden">
            <Share2 className="mr-3 h-4 w-4" />
            Bagikan Poling
          </Button>
        </div>
      </div>
    </main>
  );
}
