"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleSignInButton } from "@/components/auth-button";

export default function Page() {
  const [adminLogin, setAdminLogin] = useState(false);

  // todo: make this better by using url params
  return adminLogin ? (
    <Signin />
  ) : (
    <main className="flex min-h-[100dvh] w-full items-center justify-center">
      <section className="mt-4 flex flex-col gap-6 rounded-lg p-6 md:border md:shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Anda disarankan membuat akun untuk mengelola polling Anda.
            <br className="max-[520px]:hidden" />
            Saat ini, kami hanya menyediakan login melalui akun Google.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <GoogleSignInButton />
          <Button variant="secondary" onClick={() => setAdminLogin(true)}>
            Login admin
          </Button>
        </div>
      </section>
    </main>
  );
}

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordFalse, setIsPasswordFalse] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);
    await signIn("credentials", {
      password,
      redirect: false,
      callbackUrl: "/",
    })
      .then((response) => {
        console.log(response);
        if (response?.ok) {
          router.push("/");
          router.refresh();
          return;
        }

        setIsPasswordFalse(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form
        className="mt-10 space-y-4 sm:mx-auto sm:w-full sm:max-w-sm"
        onSubmit={handleSignIn}
      >
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/5"
          />
          {isPasswordFalse && (
            <p className="text-sm text-red-600">Password Salah</p>
          )}
        </div>

        <Button
          disabled={!password || isLoading}
          className="w-full justify-center"
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </div>
  );
}
