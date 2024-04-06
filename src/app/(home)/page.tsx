import Link from "next/link";
import { getPublicPollsAdmin } from "@/firebase/services/admin";

export default async function Page() {
  const data = await getPublicPollsAdmin();

  const dateFormat = (date: Date) =>
    new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(date);

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl p-4">
      <ul className="space-y-2 md:space-y-3">
        {data.map((vote) => (
          <li key={vote.id} className="rounded-md border-b bg-card p-4">
            <Link href={`/voting/${vote.id}`} className="cursor-pointer group">
              <h1 className="font-semibold sm:text-lg md:text-xl group-hover:underline">{vote.title}</h1>
              <p className="text-xs text-gray-500 sm:text-sm">
                Dibuat: {dateFormat(new Date(vote.date_created.seconds * 1000))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
