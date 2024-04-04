import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";

import { Vote } from "@/components/vote";

import type { Poll, Option } from "@/lib/type";
// import { BackButton } from "@/components/back-button";

export default async function Page({ params }: { params: { id: string } }) {
  const colName = process.env.NODE_ENV === "production" ? "polls" : "tests";

  const pollRef = firebaseAdminFirestore.collection(colName).doc(params.id);
  const poll = (await pollRef.get()).data() as Poll;

  const snapshot = await pollRef.collection("options").get();

  const data: Option[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Option));

  return (
    <main className="mx-auto my-8 min-h-screen max-w-4xl px-4">
      {/* <BackButton /> */}

      {/* todo */}
      <Vote title={poll.title} candidates={data || []} />
    </main>
  );
}
