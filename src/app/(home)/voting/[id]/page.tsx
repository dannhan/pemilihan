import { notFound } from "next/navigation";
import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";

import type { Poll, Option } from "@/lib/type";
import { Vote } from "@/components/vote";
import { SeeResultButton } from "@/components/see-result-button";

export default async function Page({ params }: { params: { id: string } }) {
  const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

  const pollRef = firebaseAdminFirestore.collection(colName).doc(params.id);
  const poll = (await pollRef.get()).data() as Poll;

  const data: Option[] = [];
  const snapshot = await pollRef.collection("options").get();
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Option));

  if (data.length === 0) {
    return notFound();
  }

  return (
    <main className="mx-auto mt-6 min-h-screen max-w-4xl items-center space-y-8 px-4">
      <h1 className="block text-center text-xl font-bold">
        {poll?.title || ""}
      </h1>
      <Vote params={params} candidates={data || []} />

      <section className="flex justify-center">
        <SeeResultButton params={params} />
      </section>
    </main>
  );
}
