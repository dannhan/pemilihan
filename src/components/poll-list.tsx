"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export function PollList({
  polls,
}: {
  polls: {
    id: string;
    title: string;
    private: boolean;
    date_created: string;
  }[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = polls.filter((product) =>
    product.title.includes(searchTerm),
  );

  return (
    <section>
      <div className="mb-2">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-8 pr-3 text-muted-foreground border-r" />
          </div>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            id="simple-search"
            className="pl-14 text-sm transition-none"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
      </div>

      <ul className="space-y-2 md:space-y-3">
        {searchResults.map((vote) => (
          <li key={vote.id} className="rounded-md border bg-card p-4 shadow-md">
            <Link href={`/voting/${vote.id}`} className="cursor-pointer">
              <h1 className="font-bold sm:text-lg md:text-xl">{vote.title}</h1>
              <p className="pt-2 text-xs text-gray-500 sm:text-sm">
                Dibuat: {vote.date_created}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
