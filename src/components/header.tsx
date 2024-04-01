"use client";

import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { HeaderLink } from "./header-link";
import { HeaderAvatar } from "./header-avatar";

export function Header({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/create-polling", label: "Buat Polling" },
    // { href: "/tentang-kami", label: "Tentang Kami" },
    // { href: "/", label: "Polling Terbaru" },
    // { href: "/", label: "FAQ" },
    // { href: "/", label: "Hubungi Kami" },
  ];

  return (
    <header className="sticky top-0">
      <nav className="border-b py-2.5 backdrop-blur">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-2 px-4">
          <Link href="/" className="flex items-center">
            <Image width={32} height={32} src="/logo.png" alt="logo" />
          </Link>

          <div className="flex items-center gap-2 md:order-2">
            <ModeToggle className="transition-transform" />

            {session ? (
              <HeaderAvatar session={session} />
            ) : (
              <Button size="sm" className="rounded-lg px-5" asChild>
                <Link href="/login">
                  Login
                  <svg
                    className="ml-2 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    ></path>
                  </svg>
                </Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="rounded px-2.5 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-[1.3rem] w-[1.3rem]" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>

          <div
            className={cn(
              "hidden w-full items-center justify-between md:order-1 md:flex md:w-auto md:flex-grow md:justify-end",
              isMenuOpen && "flex",
            )}
          >
            <ul className="mt-4 flex flex-col font-semibold text-foreground/50 md:mt-0 md:flex-row md:space-x-8">
              {links.map(({ href, label }) => (
                <li key={`${href}-${label}`}>
                  <HeaderLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
