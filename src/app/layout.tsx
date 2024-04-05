import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { FirebaseAuthProvider } from "@/components/providers/firebase-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { TopLoader } from "@/components/top-loader";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polling Kita",
  description: "Polling Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plus_Jakarta_Sans.className}>
        <NextAuthProvider>
          <FirebaseAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
            >
              <TopLoader />
              {children}
            </ThemeProvider>
          </FirebaseAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
