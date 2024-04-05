import { notFound } from "next/navigation";

import { getPollByIdAdmin } from "@/firebase/services/admin";
import { Vote } from "@/components/vote";

export default async function Page({ params }: { params: { id: string } }) {
  const { poll, options } = await getPollByIdAdmin(params.id);

  if (options.length === 0) return notFound();

  return (
    <main className="mx-auto min-h-screen max-w-[40rem] items-center px-4">
      <h1 className="leading-none text-center text-2xl font-bold my-6">
        {poll?.title || ""}
      </h1>

      <Vote params={params} candidates={options || []} className="rounded-md sm:border sm:p-4 sm:shadow-md" />
    </main>
  );
}
