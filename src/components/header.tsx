"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
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
      <header className="sticky top-0 overflow-x-clip">
        <nav className="border-b py-2.5 backdrop-blur">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-5 px-4">
            <Link href="/" className="flex items-center">
              <Image width={32} height={32} src="/logo.png" alt="logo" />
            </Link>

            <div className="flex items-center gap-5 md:order-2">
              <ModeSwitcher />

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
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
                <Button size="sm" className="rounded-lg px-5" asChild>
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

            {/* sidenav */}
            <div
              className={cn(
                "invisible fixed left-0 top-0 h-screen w-screen cursor-default bg-black/50 opacity-0 transition-opacity duration-300",
                isMenuOpen && "visible opacity-100 md:invisible",
              )}
              onClick={() => setIsMenuOpen(false)}
            />
            <aside
              className={cn(
                "fixed right-0 top-0 z-20 h-screen w-[21rem] max-w-[90%] translate-x-full overflow-y-auto border-l bg-background transition-transform duration-300",
                "md:static md:order-1 md:flex md:h-auto md:w-auto md:flex-grow md:translate-x-0 md:justify-end  md:border-none",
                isMenuOpen && "block translate-x-0",
              )}
            >
              <header className="flex h-[57px] items-center justify-between border-b p-4 md:hidden">
                <h1 className="text-lg font-semibold">Menu</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <X />
                </Button>
              </header>

              <ul className="flex flex-col p-4 font-semibold text-foreground/50 md:mt-0 md:flex-row md:space-x-4 md:p-0">
                {links.map(({ href, label }) => (
                  <li key={`${href}-${label}`}>
                    <Link
                      href={href}
                      className={cn(
                        "transition-colors hover:text-foreground/80",
                        "block py-2 md:bg-transparent md:p-0",
                        href === pathname && "text-foreground/90",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </nav>
      </header>
    </>
  );
}
