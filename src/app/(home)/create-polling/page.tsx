import { notFound } from "next/navigation";

import { checkUserRecord } from "@/lib/server";
import { getAuth } from "@/lib/auth";

import { CreatePollingForm } from "@/components/forms/create-polling-form";

export default async function Page() {
  const session = await getAuth();
  if (!session) return notFound();

  /* return not found if  user is not an admin */
  /* todo:
   do this in more top level
   either using layout or middleware
  */
  const userId = session.user.id;
  const userRecord = await checkUserRecord(userId);
  if (userRecord?.customClaims?.admin === false) return notFound();

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-4">
      <h1 className="mt-4 text-center text-2xl">Buat Polling Anda Sendiri</h1>
      <section className="my-4 flex flex-col rounded border p-6 shadow-md">
        <CreatePollingForm />
      </section>
    </main>
  );
}
