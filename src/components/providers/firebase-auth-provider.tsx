"use client";

// todo
import { ReactNode, useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { signInWithCustomToken } from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebase";

async function syncFirebaseAuth(session: Session | null) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(firebaseAuth, session.firebaseToken);
    } catch (error) {
      console.error(`Error signing in with custom token ${error}`);
    }
  } else {
    firebaseAuth.signOut();
  }
}

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
}
