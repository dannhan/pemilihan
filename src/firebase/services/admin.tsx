import "server-only";

import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";
import type { Poll, Option, Vote } from "@/lib/type";

const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

export async function getPublicPollsAdmin() {
  const collectionRef = firebaseAdminFirestore.collection(colName);
  const snapshot = await collectionRef
    .select("title", "date_created", "private")
    .where("private", "==", false)
    .orderBy("date_created", "desc")
    .get();

  const data: Poll[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Poll));

  console.log("PUBLIC POLLS RETRIEVED...");
  return data;
}

export async function getPollByIdAdmin(id: string) {
  const pollRef = firebaseAdminFirestore.collection(colName).doc(id);
  const poll = (await pollRef.get()).data() as Poll;

  const snapshot = await pollRef
    .collection("options")
    .orderBy("date_created")
    .get();

  const options: Option[] = [];
  snapshot.forEach((doc) =>
    options.push({
      id: doc.id,
      name: doc.data().name,
      image: doc.data().image,
    } as Option),
  );

  console.log("POLL RETRIEVED...");
  return { poll, options };
}

export async function getResultById(id: string) {
  const pollRef = firebaseAdminFirestore.collection(colName).doc(id);

  // Batched read operation to fetch both options and votes collections
  const snapshot = await firebaseAdminFirestore.runTransaction(async (transaction) => {
    // todo i am not sure if it use promise all
    const [optionsSnapshot, votesSnapshot] = await Promise.all([
      transaction.get(pollRef.collection("options").select("name")),
      transaction.get(pollRef.collection("votes")),
    ]);

    console.log("POLL RESULT RETRIEVED...");
    return { optionsSnapshot, votesSnapshot };
  });

  // Process options
  const options: Omit<Option, "id" | "image">[] = [];
  snapshot.optionsSnapshot.forEach((doc) => options.push({ ...doc.data() } as Option));

  // Process votes
  const votes: Vote[] = [];
  snapshot.votesSnapshot.forEach((doc) => votes.push(doc.data() as Vote));

  return { options, votes };
}
