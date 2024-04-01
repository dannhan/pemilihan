import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const capitalizeParams =
    params.id.charAt(0).toUpperCase() + params.id.slice(1);

  return (
    <main className="mx-auto my-8 min-h-screen max-w-4xl px-4">
      <Button asChild variant="outline" size="sm">
        <Link href="/" className="font-light">
          <ChevronLeft className="mr-2 h-3 w-3" />
          Kembali
        </Link>
      </Button>

      {/* todo */}
      {/* <Vote */}
      {/*   candidates={data || []} */}
      {/*   title={data} */}
      {/* /> */}
    </main>
  );
}
