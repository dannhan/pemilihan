import Link from "next/link";
import { getUserPollsAdmin } from "@/firebase/services/admin";
import { getAuth } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DeletePollForm } from "./delete-poll-form";

export default async function Page() {
  const session = await getAuth();
  if (!session) return null;

  const data = await getUserPollsAdmin(session.user.id);

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
              href={`/voting/${vote.id}`}
              className="grow cursor-pointer focus:outline-1"
            >
              <h1 className="font-medium">{vote.title}</h1>
              <p className="text-[13px] font-medium text-muted-foreground">
                Dibuat: {dateFormat(new Date(vote.date_created.seconds * 1000))}
              </p>
            </Link>


            <DeletePollForm pollId={vote.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
