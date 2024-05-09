import Link from "next/link";
import { notFound } from "next/navigation";

import { firebaseAdminAuth } from "@/firebase/firebaseAdmin";
import { getPollsServer } from "@/firebase/services/server";
import { getAuth } from "@/lib/auth";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeletePollForm } from "@/components/forms/delete-poll-form";

export default async function Page() {
  const session = await getAuth();
  if (!session) return notFound();

  const userId = session.user.id;
  const userRecord = await firebaseAdminAuth.getUser(userId);
  if (userRecord.customClaims?.admin === false) return notFound();

  const data = await getPollsServer();

  const dateFormat = (date: Date) =>
    new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(date);

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl p-4">
      <div className="mb-4 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-xl font-medium text-foreground/80">Dashboard</h1>
        <Button className="max-w-fit rounded-sm px-3 py-1.5 text-sm" asChild>
          <Link href="/create-polling">
            <Plus className="mr-2 h-4 w-4 py-0" />
            Buat polling baru
          </Link>
        </Button>
      </div>

      <ul className="space-y-2 md:space-y-3">
        {data.map((vote) => (
          <li
            key={vote.id}
            className="flex flex-col justify-between gap-4 rounded-lg border bg-card px-3 py-2 shadow-md sm:flex-row sm:items-center"
          >
            <Link
              href={`/polling/${vote.slug}`}
              className="grow cursor-pointer focus:outline-1"
            >
              <h1 className="font-medium">{vote.title}</h1>
              <p className="text-[13px] font-medium text-muted-foreground">
                Dibuat: {dateFormat(new Date(vote.date_created.seconds * 1000))}
              </p>
            </Link>

            <div className="flex justify-end gap-2">
              <Link href={`/edit/${vote.slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="border-2 px-4"
                >
                  Edit
                </Button>
              </Link>
              <DeletePollForm pollId={vote.id} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
