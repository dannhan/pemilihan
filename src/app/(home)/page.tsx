import Link from "next/link";

import { SanityDocument } from "next-sanity";

import { loadQuery } from "@/sanity/lib/store";
import { VOTES_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-static";

export default async function Page() {
  const initial = await loadQuery<SanityDocument[]>(VOTES_QUERY);

  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4 text-center">
      {initial.data.map((vote) => (
        <Link key={vote.daerah} href={`/voting/${vote.daerah.toLowerCase()}`}>
          <div className="my-4 cursor-pointer rounded-md border bg-card p-4 text-left shadow-md">
            <h1 className="text-xl font-bold">{vote.title}</h1>
            <p className="pt-2 text-sm text-gray-500">{vote.description}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
