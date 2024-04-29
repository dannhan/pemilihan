import { firebaseAdminAuth } from "@/firebase/firebaseAdmin";
import { getAuth } from "@/lib/auth";

export default async function Page() {
  const session = await getAuth();
  if (process.env.NODE_ENV === "production" || !session) return <h1>Hello World!</h1>;

  const userId = session.user.id;
  firebaseAdminAuth.setCustomUserClaims(userId, { admin: true });

  const userRecord = await firebaseAdminAuth.getUser(userId)
  console.log(userRecord)
  console.log(userRecord.customClaims?.admin)

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
