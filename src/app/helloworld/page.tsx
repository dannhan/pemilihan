import { firebaseAuth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { getAuth } from "@/lib/auth";
import { firebaseAdminAuth } from "@/firebase/firebaseAdmin";

export default async function Page() {
  const session = await getAuth();
  if (process.env.NODE_ENV === "production" || !session)
    return <h1>Hello World!</h1>;

  const userId = session.user.id;
  firebaseAdminAuth.setCustomUserClaims(userId, { admin: true });
  const userRecord = await firebaseAdminAuth.getUser(userId);
  console.log(userRecord.customClaims?.admin);

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}

async function _() {
  const email = "";
  const password = "";

  await signInWithEmailAndPassword(firebaseAuth, email, password).catch(
    (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return <pre>{JSON.stringify({ errorCode, errorMessage }, null, 2)}</pre>;
    },
  );

  const user = firebaseAuth.currentUser;
  if (user) updateProfile(user, { displayName: "Admin" });
}
