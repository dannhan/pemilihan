import Link from "next/link";

import { SanityDocument } from "next-sanity";

import { loadQuery } from "@/sanity/lib/store";
import { CANDIDATES_QUERY } from "@/sanity/lib/queries";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vote } from "@/components/vote";

export const dynamic = "force-static";

export default async function Page({ params }: { params: { id: string } }) {
  const capitalizeParams =
    params.id.charAt(0).toUpperCase() + params.id.slice(1);
  const initial = await loadQuery<SanityDocument>(CANDIDATES_QUERY, {
    params: capitalizeParams,
  });

  return (
    <main className="mx-auto my-8 min-h-screen max-w-4xl px-4">
      <Button asChild variant="outline" size="sm">
        <Link href="/" className="font-light">
          <ChevronLeft className="mr-2 h-3 w-3" />
          Kembali
        </Link>
      </Button>

      <Vote candidates={initial.data.kandidat} title={initial.data.title} />
    </main>
  );
}
