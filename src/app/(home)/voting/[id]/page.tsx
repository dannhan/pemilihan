import { notFound } from "next/navigation";

import { getPollByIdAdmin } from "@/firebase/services/admin";
import { Vote } from "@/components/vote";
import { SeeResultButton } from "@/components/see-result-button";

export default async function Page({ params }: { params: { id: string } }) {
  const { poll, options } = await getPollByIdAdmin(params.id);

  if (options.length === 0) return notFound();

  return (
    <main className="mx-auto mt-6 min-h-screen max-w-4xl items-center space-y-8 px-4">
      <h1 className="block text-center text-xl font-bold">
        {poll?.title || ""}
      </h1>
      <Vote params={params} candidates={options || []} />

      <section className="flex justify-center">
        <SeeResultButton params={params} />
      </section>
    </main>
  );
}
