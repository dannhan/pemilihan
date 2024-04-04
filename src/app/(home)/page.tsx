import Link from "next/link";
import { getPublicPollsAdmin } from "@/firebase/services/admin";

export default async function Page() {
  const data = await getPublicPollsAdmin();

  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4 text-center">
      {data.map((vote) => (
        <Link key={vote.id} href={`/voting/${vote.id}`}>
          <div className="my-2 cursor-pointer rounded-md border bg-card p-4 text-left shadow-md sm:my-3 md:my-4">
            <h1 className="font-bold sm:text-lg md:text-xl">{vote.title}</h1>
            <p className="pt-2 text-xs text-gray-500 sm:text-sm">
              Dibuat:{" "}
              {new Date(vote.date_created.seconds * 1000).toLocaleDateString(
                "en-GB",
              )}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}
