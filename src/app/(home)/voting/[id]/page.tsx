import Link from "next/link";

import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vote } from "@/components/vote";

import type { Poll, Option } from "@/lib/type";

export default async function Page({ params }: { params: { id: string } }) {
  const pollRef = firebaseAdminFirestore.collection("polls").doc(params.id);
  const poll = (await pollRef.get()).data() as Poll;

  const snapshot = await pollRef.collection("options").get();

  const data: Option[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Option));

  return (
    <main className="mx-auto my-8 min-h-screen max-w-4xl px-4">
      {/* <Button asChild variant="outline" size="sm"> */}
      {/*   <Link href="/" className="font-light"> */}
      {/*     <ChevronLeft className="mr-2 h-3 w-3" /> */}
      {/*     Kembali */}
      {/*   </Link> */}
      {/* </Button> */}

      {/* todo */}
      <Vote title={poll.title} candidates={data || []} />
    </main>
  );
}
