"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { LogOutIcon, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeSwitcher } from "./mode-switcher";
import { LoginIcon } from "./icons/login";

export function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
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
    <>
      <header className="sticky top-0 z-40 overflow-x-clip">
        <nav className="border-b py-2.5 backdrop-blur">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-5 px-4">
            <Link href="/" className="flex items-center">
              <Image width={32} height={32} src="/logo.png" alt="logo" />
              <span className="ms-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Polling Kita
              </span>
            </Link>

            <div className="flex items-center gap-5 md:order-2">
              <ul className="mt-0 hidden space-x-4 font-semibold text-foreground/50 md:flex">
                {links.map(({ href, label }) => (
                  <li key={`${href}-${label}`}>
                    <Link
                      href={href}
                      className={cn(
                        "transition-colors hover:text-foreground/80",
                        "block py-2",
                        href === pathname && "text-foreground/90",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ModeSwitcher />

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="hidden md:flex h-8 w-8 cursor-pointer">
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="mt-2">
                    <DropdownMenuLabel className="font-medium text-foreground">
                      {session.user?.name || ""}
                      <br />
                      {session.user?.email || ""}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => signOut()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  className="hidden rounded-lg px-5 md:flex"
                  asChild
                >
                  <Link href="/login">
                    Login
                    <LoginIcon className="ml-2 h-3 w-3" />
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
          </div>
        </nav>
      </header>

      {/* sidenav */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-screen w-[21rem] max-w-[100%] translate-x-full flex-col overflow-y-auto border-l bg-background transition-transform duration-300",
          isMenuOpen && "translate-x-0",
        )}
      >
        <header className="flex h-[57px] items-center justify-between border-b p-4">
          <h1 className="text-lg font-semibold">Menu</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <X />
          </Button>
        </header>

        <ul className="flex grow flex-col p-4 font-semibold text-foreground/50">
          {links.map(({ href, label }) => (
            <li key={`${href}-${label}`}>
              <Link
                href={href}
                className={cn(
                  "block py-2 transition-colors hover:text-foreground/80",
                  href === pathname && "text-foreground/90",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}

          <li className="flex grow flex-col justify-end">
            {session ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarImage src={session.user?.image || ""} alt="@shadcn" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="truncate leading-5">
                    {session.user?.name || ""}
                  </h1>
                  <h1 className="truncate leading-5">
                    {session.user?.email || ""}
                  </h1>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="grow justify-end p-0 hover:bg-transparent text-destructive hover:text-destructive/80"
                  onClick={() => signOut()}
                >
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <Button size="sm" className="flex px-5" asChild>
                <Link href="/login">
                  Login
                  <LoginIcon className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            )}
          </li>
        </ul>
      </aside>
      <div
        className={cn(
          "invisible fixed left-0 top-0 z-40 h-screen w-screen cursor-default bg-black/50 opacity-0 transition-all duration-300",
          isMenuOpen && "visible opacity-100",
        )}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
