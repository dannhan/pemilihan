"use client";

import { GoogleSignInButton } from "@/components/auth-button";

export default function Page() {
  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4">
      <section className="mt-4 flex flex-col rounded border p-6 shadow-md">
        <GoogleSignInButton />
      </section>
    </main>
  );
}
