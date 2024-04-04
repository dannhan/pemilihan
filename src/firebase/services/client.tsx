import { z } from "zod";

import { createPollFormSchema as formSchema } from "@/lib/schema";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseAuth, firebaseFirestore } from "@/firebase/firebase";

const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

// create new poll from client side
export async function postPollClient(values: z.infer<typeof formSchema>) {
  const user = firebaseAuth.currentUser;

  if (!user) {
    alert("Anda harus login untuk membuat poll!");
    return;
  }

  try {
    const storage = getStorage();
    const pollRef = await addDoc(collection(firebaseFirestore, colName), {
      title: values.title,
      private: values.private,
      multiple: values.multiple,
      comment: values.comment,
      date_created: serverTimestamp(),
      userId: user?.uid,
    });
    const pollId = pollRef.id;

    // Upload options and images (if available)
    for (const [idx, option] of values.options.entries()) {
      let image = "";

      if (option.image) {
        const storageRef = ref(
          storage,
          `images/${colName}/options/${pollId}/${option.image.name}-${idx}`,
        );
        const metadata = { contentType: "image/jpeg" };

        await uploadBytes(storageRef, option.image, metadata);
        image = await getDownloadURL(storageRef);
      }

      await addDoc(
        collection(firebaseFirestore, `${colName}/${pollId}/options`),
        { name: option.value, image },
      );
    }
  } catch (error) {
    throw error;
  }
}
