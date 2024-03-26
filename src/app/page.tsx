"use client";

import Link from "next/link";
import { votes } from "./data";

export const dynamic = "force-static";

export default function Component() {
  return (
    <main className="mx-auto my-8 min-h-screen max-w-4xl px-4 text-center">
      {votes.map((vote) => (
        <Link key={vote.id} href={`/voting/${vote.id}`}>
          <div className="my-4 cursor-pointer rounded-md border bg-card p-4 text-left shadow-md">
            <h1 className="text-xl font-bold">{vote.title}</h1>
            <p className="pt-2 text-sm text-gray-500">{vote.description}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
