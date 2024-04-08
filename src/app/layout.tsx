import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { FirebaseAuthProvider } from "@/components/providers/firebase-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { TopLoader } from "@/components/top-loader";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check Polling",
  description:
    "Tertarik untuk mengadakan jajak pendapat atau membuat survei online di WhatsApp, Facebook, dan Twitter? Cara-caranya sangat mudah dan gratis",
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
              <TailwindIndicator />
            </ThemeProvider>
          </FirebaseAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
