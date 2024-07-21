import { firebaseAdminAuth } from "@/firebase/firebaseAdmin";

/* check if user is admin */
/* todo: might check if the user is an admin instead */
export async function checkUserRecord(userId: string | undefined) {
  if (!userId) {
    return null;
  }

  let userRecord = null;

  try {
    userRecord = await firebaseAdminAuth.getUser(userId);
  } catch (error) {
    console.log(error);
  }

  return userRecord;
}
