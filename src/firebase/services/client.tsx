import { z } from "zod";

import { createPollFormSchema as formSchema } from "@/lib/schema";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseAuth, firebaseFirestore } from "@/firebase/firebase";
import { User } from "firebase/auth";

const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// create new poll from client side
export async function postPollClient(values: z.infer<typeof formSchema>) {
  /* legacy */
  const user = firebaseAuth.currentUser;

  if (!user) {
    alert("Anda harus login untuk membuat poll!");
    throw new Error("Auth error");
  }
  /* legacy */

  try {
    const title = values.title.split(" ").join("-").toLowerCase();
    const encodedTitle = encodeURIComponent(title);
    const slug = `${getRndInteger(1111, 9999)}${encodedTitle}`;

    const storage = getStorage();
    const pollRef = await addDoc(collection(firebaseFirestore, colName), {
      title: values.title,
      private: values.private,
      multiple: values.multiple,
      comment: values.comment,
      date_created: serverTimestamp(),
      userId: user?.uid || "admin",
      slug,
    });
    const pollId = pollRef.id;

    // Upload options and images (if available)
    for (const [idx, option] of values.options.entries()) {
      let image = "";

      if (option.image) {
        const storageRef = ref(
          storage,
          `images/${colName}/options/${pollId}/${idx}-${option.image.name}`,
        );
        const metadata = { contentType: "image/jpeg" };

        await uploadBytes(storageRef, option.image, metadata);
        image = await getDownloadURL(storageRef);
      }

      await addDoc(
        collection(firebaseFirestore, `${colName}/${pollId}/options`),
        { name: option.value, image, date_created: serverTimestamp() },
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function postVoteClient(
  pollId: string,
  option: string,
  user: User,
) {
  const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";
  await setDoc(
    doc(
      firebaseFirestore,
      `${colName}/${pollId}/votes`,
      `${user.uid}_${pollId}`,
    ),
    {
      option,
    },
  ).catch((error) => {
    throw error;
  });
}
