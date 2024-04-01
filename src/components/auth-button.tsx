"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./icons/google";

export function GoogleSignInButton() {
  return (
    <Button
      className={cn(
        "w-full rounded-md",
        "border bg-white text-gray-800 shadow-md hover:bg-gray-200",
        "dark:bg-gray-900/60 dark:text-secondary-foreground dark:text-white hover:dark:bg-gray-900",
        "focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus-visible:outline-none",
      )}
      onClick={() => signIn("google")}
    >
      <GoogleIcon className="mr-8 h-5 w-5" />
      Continue with Google
    </Button>
  );
}
