import "server-only";

import {
  firebaseAdminBucket,
  firebaseAdminFirestore,
} from "@/firebase/firebaseAdmin";
import type { Poll, Option, Vote } from "@/lib/type";

// use tests collection on development
const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

/********** READ FUNCTIONS  **********/
export async function getPublicPollsServer() {
  const collectionRef = firebaseAdminFirestore.collection(colName);
  const snapshot = await collectionRef
    .select("title", "date_created", "private", "slug")
    .where("private", "==", false)
    .orderBy("date_created", "desc")
    .get();

  const data: Poll[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Poll));

  return data;
}

export async function getPollBySlugServer(slug: string) {
  const pollCollectionRef = firebaseAdminFirestore.collection(colName);
  const pollSnapshot = await pollCollectionRef
    .select("title", "date_created", "private", "userId")
    .where("slug", "==", slug)
    .orderBy("date_created", "desc")
    .get();

  let rawPoll: Poll[] = [];
  pollSnapshot.forEach((doc) =>
    rawPoll.push({ id: doc.id, ...doc.data() } as Poll),
  );

  const poll = rawPoll[0];

  if (!poll?.id) {
    return { poll: null };
  }

  const pollDocRef = firebaseAdminFirestore.collection(colName).doc(poll.id);

  const snapshot = await pollDocRef
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

  return { poll, options };
}

export async function getResultBySlugServer(slug: string) {
  // fetch poll by slug and get it id
  const pollCollectionRef = firebaseAdminFirestore.collection(colName);
  const pollSnapshot = await pollCollectionRef
    .select("title", "date_created", "private", "userId")
    .where("slug", "==", slug)
    .orderBy("date_created", "desc")
    .get();

  let rawPoll: Poll[] = [];
  pollSnapshot.forEach((doc) =>
    rawPoll.push({ id: doc.id, ...doc.data() } as Poll),
  );

  const poll = rawPoll[0];

  if (!poll?.id) {
    return { poll: null };
  }

  const pollDocRef = firebaseAdminFirestore.collection(colName).doc(poll.id);

  // Batched read operation to fetch both options and votes collections
  const snapshot = await firebaseAdminFirestore.runTransaction(
    async (transaction) => {
      // todo i am not sure if it use promise all
      const [optionsSnapshot, votesSnapshot] = await Promise.all([
        transaction.get(pollDocRef.collection("options").select("name")),
        transaction.get(pollDocRef.collection("votes")),
      ]);

      return { optionsSnapshot, votesSnapshot };
    },
  );

  // Process options
  const options: Omit<Option, "id" | "image">[] = [];
  snapshot.optionsSnapshot.forEach((doc) =>
    options.push({ ...doc.data() } as Option),
  );

  // Process votes
  const votes: Vote[] = [];
  snapshot.votesSnapshot.forEach((doc) => votes.push(doc.data() as Vote));

  return { poll, options, votes };
}

export async function getPollsServer() {
  const collectionRef = firebaseAdminFirestore.collection(colName);
  const snapshot = await collectionRef
    .select("title", "date_created", "private", "slug")
    .orderBy("date_created", "desc")
    .get();

  const data: Poll[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Poll));

  return data;
}

/* legacy (by id) */
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

  return { poll, options };
}

export async function getResultByIdAdmin(id: string) {
  const pollRef = firebaseAdminFirestore.collection(colName).doc(id);
  const poll = (await pollRef.get()).data() as Poll;

  // Batched read operation to fetch both options and votes collections
  const snapshot = await firebaseAdminFirestore.runTransaction(
    async (transaction) => {
      // todo i am not sure if it use promise all
      const [optionsSnapshot, votesSnapshot] = await Promise.all([
        transaction.get(pollRef.collection("options").select("name")),
        transaction.get(pollRef.collection("votes")),
      ]);

      return { optionsSnapshot, votesSnapshot };
    },
  );

  // Process options
  const options: Omit<Option, "id" | "image">[] = [];
  snapshot.optionsSnapshot.forEach((doc) =>
    options.push({ ...doc.data() } as Option),
  );

  // Process votes
  const votes: Vote[] = [];
  snapshot.votesSnapshot.forEach((doc) => votes.push(doc.data() as Vote));

  return { poll, options, votes };
}

/* legacy (user related) */
export async function getUserPollsAdmin(userId: string) {
  const collectionRef = firebaseAdminFirestore.collection(colName);
  const snapshot = await collectionRef
    .select("title", "date_created", "private", "slug")
    .where("userId", "==", userId)
    .orderBy("date_created", "desc")
    .get();

  const data: Poll[] = [];
  snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Poll));

  return data;
}


/********** DELETE FUNCTIONS  **********/
// todo: this is very expensive operation
export async function deletePollByIdServer(pollId: string) {
  const pollRef = firebaseAdminFirestore.collection(colName).doc(pollId);
  const optionsQuery = pollRef.collection("options");
  const votesQuery = pollRef.collection("votes");

  try {
    // delete image folder document
    const folderPath = `images/${colName}/options/${pollId}`;
    await deleteStorageFolder(folderPath);

    // // delete poll document
    await pollRef.delete();

    // // Delete options and votes collections
    await deleteQueryBatch(optionsQuery);
    await deleteQueryBatch(votesQuery);

    return true; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting poll:", error);
    return false; // Return false if deletion fails
  }

  // prettier-ignore
  async function deleteQueryBatch(query: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>) {
    const batchSize = 500; // Batch size for efficient deletion

    while (true) {
      const snapshot = await query.limit(batchSize).get();

      // No more documents to delete
      if (snapshot.size === 0)
        return;

      // Delete documents in a batch
      const batch = firebaseAdminFirestore.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    }
  }

  async function deleteStorageFolder(folderPath: string) {
    // Delete files in the folder
    await deleteFilesInFolder(folderPath);

    // Delete folder reference
    await firebaseAdminBucket.deleteFiles({ prefix: folderPath });
  }

  async function deleteFilesInFolder(folderPath: string) {
    const [files] = await firebaseAdminBucket.getFiles({ prefix: folderPath });
    const deletePromises = files.map((file) => file.delete());

    await Promise.all(deletePromises);
  }
}
