import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResultById } from "@/firebase/services/admin";

export default async function Page({ params }: { params: { id: string } }) {
  const { options, votes } = await getResultById(params.id);

  const result: any = {};
  votes.forEach(({ option }) => {
    result[option] = (result[option] || 0) + 1;
  });
  options.forEach((option) => {
    option.count = result[option.name] || 0;
  });

  return (
    <main className="mx-auto mt-6 min-h-screen max-w-4xl items-center space-y-2 px-4">
      <Button asChild variant="outline" size="sm">
        <Link href={`/voting/${params.id}`} className="font-light">
          <ChevronLeft className="mr-2 h-3 w-3" />
          Kembali Ke Polling
        </Link>
      </Button>

      {options
        .sort((a, b) => b.count! - a.count!)
        .map((option) => (
          <h1 key={option.name} className="block text-xl">
            {`${option.name}: ${option.count}`}
          </h1>
        ))}

      <h1 className="block text-xl">Total Suara: {votes.length}</h1>
    </main>
  );
}
