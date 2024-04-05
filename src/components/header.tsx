import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
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

type Props = {
  links: { href: string; label: string }[];
  session: Session | null;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  redirect: string;
};

export function Header({
  session,
  links,
  isMenuOpen,
  setIsMenuOpen,
  redirect,
}: Props) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 overflow-x-clip">
      <nav className="border-b bg-background/50 py-2.5 backdrop-blur dark:bg-background/85">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-5 px-4">
          <Link href="/" className="flex items-center">
            <Image width={32} height={32} src="/logo.png" alt="logo" />
            <span className="ms-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Check Polling
            </span>
          </Link>

          <div className="flex items-center gap-5 md:order-2">
            <ul className="mt-0 hidden space-x-4 font-medium text-foreground/50 md:flex">
              {links.map(({ href, label }) => (
                <li key={`${href}-${label}`}>
                  <Link
                    href={href}
                    className={cn(
                      "transition-colors hover:text-primary/80",
                      href === pathname && "text-primary/90",
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
                  <Avatar className="hidden h-8 w-8 cursor-pointer md:flex">
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
                variant="outline"
                size="sm"
                className="hidden rounded-full border-2 border-primary px-5 text-primary hover:bg-primary hover:text-primary-foreground md:flex"
                asChild
              >
                <Link href={`/login?redirect=${redirect}`}>
                  Login
                  <LoginIcon className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded px-2.5 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-[1.3rem] w-[1.3rem]" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
