import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firebaseAdminAuth, firebaseAdminFirestore } from "@/firebase/firebaseAdmin";

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
      }
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;

        const firebaseToken = await firebaseAdminAuth.createCustomToken(token.sub);
        session.firebaseToken = firebaseToken;
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
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
