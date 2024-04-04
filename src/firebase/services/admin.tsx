import "server-only";

import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";
import type { Poll, Option } from "@/lib/type";

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

  return data;
}

export async function getPollByIdAdmin(id: string) {
  const pollRef = firebaseAdminFirestore.collection(colName).doc(id);
  const poll = (await pollRef.get()).data() as Poll;

  const snapshot = await pollRef.collection("options").get();

  const options: Option[] = [];
  snapshot.forEach((doc) => options.push({ id: doc.id, ...doc.data() } as Option));

  return { poll, options  };
}
