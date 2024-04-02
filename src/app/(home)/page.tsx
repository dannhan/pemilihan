import Link from "next/link";
import { adminDb } from "@/firebase/firebaseAdmin";

// todo: place this anywhere else
type Poll = {
  id: string;
  title: string;
  date_created: string;
};

export default async function Page() {
  const collectionRef = adminDb.collection("polls");
  const snapshot = await collectionRef.select("title", "date_created").get();

  const data: Poll[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Poll));

  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4 text-center">
      {data.map((vote) => (
        <Link key={vote.id} href={`/voting/${vote.id}`}>
          <div className="my-4 cursor-pointer rounded-md border bg-card p-4 text-left shadow-md">
            <h1 className="text-xl font-bold">{vote.title}</h1>
            <p className="pt-2 text-sm text-gray-500">
              Dibuat: {vote.date_created}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}
