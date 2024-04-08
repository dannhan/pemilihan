import { notFound } from "next/navigation";

import { getPollByIdAdmin } from "@/firebase/services/admin";
import { Vote } from "@/components/vote";
import { SeeResultButton } from "@/components/see-result-button";
import { ShareButton } from "@/components/share-button";

export default async function Page({ params }: { params: { id: string } }) {
  const { poll, options } = await getPollByIdAdmin(params.id);

  if (options.length === 0) return notFound();

  const fullPath = `https://checkpolling.id/${params?.id}`;

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
          <ShareButton options={options} title={poll?.title} fullPath={fullPath}/>
        </div>
      </div>
    </main>
  );
}
