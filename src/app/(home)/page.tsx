import Link from "next/link";
import { getPublicPollsAdmin } from "@/firebase/services/admin";

export default async function Page() {
  const data = await getPublicPollsAdmin();

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl p-4">
      <ul className="space-y-2 md:space-y-3">
        {data.map((vote) => (
          <li key={vote.id} className="rounded-md border bg-card p-4 shadow-md">
            <Link href={`/voting/${vote.id}`} className="cursor-pointer">
              <h1 className="font-bold sm:text-lg md:text-xl">{vote.title}</h1>
              <p className="pt-2 text-xs text-gray-500 sm:text-sm">
                Dibuat:{" "}
                {new Date(vote.date_created.seconds * 1000).toLocaleDateString(
                  "en-GB",
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
