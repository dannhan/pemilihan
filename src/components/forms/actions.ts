"use server";

import { redirect } from "next/navigation";
import { firebaseAdminFirestore } from "@/firebase/firebaseAdmin";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/firebase/firebase";
import { Timestamp } from "firebase-admin/firestore";

const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

export async function update(
  newOptionsIndex: number[],
  prevIndex: number,
  formData: FormData,
) {
  // todo firebase
  const id = formData.get("id") as string;

  for (const [idx, option] of newOptionsIndex.entries()) {
    const name = formData.get(`options.${option}.value`);
    const newImage = formData.get(`options.${option}.image`) as File;
    const time = Timestamp.now();

    let image = "";
    if (newImage.size > 0) {
      const storageRef = ref(
        firebaseStorage,
        `images/${colName}/options/${id}/${prevIndex + 1 + idx}-${newImage.name}`,
      );
      const metadata = { contentType: "image/jpeg" };

      await uploadBytes(storageRef, newImage, metadata);
      image = await getDownloadURL(storageRef);
    }

    await firebaseAdminFirestore
      .collection(colName)
      .doc(id)
      .collection("options")
      .add({ name: name, date_created: time, image });
  }

  redirect("/")
}
