"use client";

import { GoogleSignInButton } from "@/components/auth-button";

export default function Page() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section className="mt-4 flex flex-col gap-6 rounded-lg border p-6 shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Anda disarankan membuat akun untuk mengelola polling Anda.
            <br />
            Saat ini, kami hanya menyediakan login melalui akun Google.
          </p>
        </div>
        <GoogleSignInButton />
      </section>
    </main>
  );
}
