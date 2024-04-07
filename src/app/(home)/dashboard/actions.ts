"use server";

import { deletePollByIdAdmin } from "@/firebase/services/admin";
import { revalidatePath } from "next/cache";

export async function deletePoll(formData: FormData) {
  const pollId = formData.get("pollId");
  console.log({ pollId });

  if (typeof pollId !== "string") {
    return;
  }

  await deletePollByIdAdmin(pollId);
  revalidatePath("/dashboard");
}
