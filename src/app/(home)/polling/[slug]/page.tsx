import { notFound } from "next/navigation";

import { getPollBySlugServer } from "@/firebase/services/server"
import { firebaseAdminAuth } from "@/firebase/firebaseAdmin";
import { getAuth } from "@/lib/auth";
import { Vote } from "@/components/vote";
import { SeeResultButton } from "@/components/see-result-button";
import { ShareButton } from "@/components/share-button";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { poll } = await getPollBySlugServer(params.slug);

  if (poll === null) return {};

  return {
    title: `Check Polling | ${poll.title}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { poll, options } = await getPollBySlugServer(params.slug);

  if (poll === null) return notFound();

  const fullPath = `https://checkpolling.id/polling/${params?.slug}`;
  const session = await getAuth();

  const userId = session?.user.id;
  const userRecord = userId ? await firebaseAdminAuth.getUser(userId) : null;

  return (
    <main className="mx-auto min-h-screen max-w-[40rem] items-center px-4">
      <h1 className="my-6 text-center text-2xl font-bold leading-none">
        {poll?.title || ""}
      </h1>

      <Vote
        id={poll.id}
        params={params}
        candidates={options || []}
        className="rounded-md sm:border sm:p-4 sm:shadow-md"
      />

      <div className="my-4 flex w-full flex-col justify-center">
        <div className="mx-auto flex w-full max-w-80 flex-col gap-2 sm:max-w-none">
          {userRecord?.customClaims?.admin ? (
            <SeeResultButton params={params} />
          ) : (
            ""
          )}
          <ShareButton
            options={options}
            title={poll?.title}
            fullPath={fullPath}
          />
        </div>
      </div>
    </main>
  );
}
