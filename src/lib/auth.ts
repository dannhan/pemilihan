import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "@/firebase/firebaseAdmin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebase";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          firebaseAuth,
          "admin@checkpolling.id",
          (credentials as any).password || "",
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error));
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;

        const firebaseToken = await firebaseAdminAuth.createCustomToken(
          token.sub,
        );
        session.firebaseToken = firebaseToken;
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        if (!user.id) {
          // todo: do proper typing
          // @ts-expect-error
          user.id = user?.uid || null;
          // @ts-expect-error
          token.name = user?.displayName || "";
        }

        token.sub = user.id;
      }

      return token;
    },
  },
  // @ts-expect-error
  adapter: FirestoreAdapter(firebaseAdminFirestore),
  // debug: process.env.NODE_ENV !== "production",
};

export const getAuth = async () => await getServerSession(authOptions);
