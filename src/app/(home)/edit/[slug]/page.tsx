import { notFound } from "next/navigation";

import { getPollBySlugServer } from "@/firebase/services/server";

import { getAuth } from "@/lib/auth";
import { checkUserRecord } from "@/lib/server";

import { EditPollingForm } from "@/components/forms/edit-polling-form";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getAuth();
  if (!session) return notFound();

  const userId = session.user.id;
  const userRecord = await checkUserRecord(userId);
  if (userRecord?.customClaims?.admin === false) return notFound();

  const { poll, options } = await getPollBySlugServer(params.slug);
  if (poll === null) return notFound();

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-4">
      <h1 className="mt-4 text-center text-2xl">Buat Polling Anda Sendiri</h1>
      <section className="my-4 flex flex-col rounded border p-6 shadow-md">
        <EditPollingForm id={poll.id} title={poll.title} options={options}  />
      </section>
    </main>
  );
}
