import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";

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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
