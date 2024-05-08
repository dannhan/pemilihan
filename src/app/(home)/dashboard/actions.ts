"use server";

import { deletePollByIdServer } from "@/firebase/services/server";
import { revalidatePath } from "next/cache";

export async function deletePoll(formData: FormData) {
  const pollId = formData.get("pollId");

  if (typeof pollId !== "string") {
    return;
  }

  await deletePollByIdServer(pollId);
  revalidatePath("/dashboard");
}
