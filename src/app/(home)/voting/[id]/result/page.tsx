import Link from "next/link";
import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";

import { ChevronLeft } from "lucide-react";
import type { Option } from "@/lib/type";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

  const pollRef = firebaseAdminFirestore.collection(colName).doc(params.id);

  const options: Option[] = [];
  const snapshot = await pollRef.collection("options").get();
  snapshot.forEach((doc) =>
    options.push({ id: doc.id, ...doc.data() } as Option),
  );

  const votesRef = pollRef.collection("votes");

  return (
    <main className="mx-auto mt-6 min-h-screen max-w-4xl items-center space-y-2 px-4">
      <Button asChild variant="outline" size="sm">
        <Link href={`/voting/${params.id}`} className="font-light">
          <ChevronLeft className="mr-2 h-3 w-3" />
          Kembali Ke Polling
        </Link>
      </Button>

      <h1 className="block text-xl">
        Total Suara: {(await votesRef.count().get()).data().count}
      </h1>

      {options.map(async (option) => (
        <h1 key={option.name} className="block text-xl">
          {`${option.name}: ${(await votesRef.where("optionName", "==", option.name).count().get()).data().count}`}
        </h1>
      ))}
    </main>
  );
}
