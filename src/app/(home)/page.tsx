import Link from "next/link";
import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";
import type { Poll } from "@/lib/type";

// todo: place this anywhere else
export default async function Page() {
  const collectionRef = firebaseAdminFirestore.collection("polls");
  const snapshot = await collectionRef.select("title", "date_created", "private").where("private", "==", false).orderBy("date_created", "desc").get();

  const data: Poll[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Poll));

  console.log({ data });

  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4 text-center">
      {data.map((vote) => (
        <Link key={vote.id} href={`/voting/${vote.id}`}>
          <div className="my-4 cursor-pointer rounded-md border bg-card p-4 text-left shadow-md">
            <h1 className="text-xl font-bold">{vote.title}</h1>
            <p className="pt-2 text-sm text-gray-500">
              {/* Dibuat: {vote.date_created} */}
              Dibuat: {new Date(vote.date_created.seconds * 1000).toLocaleDateString("en-GB")}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}
