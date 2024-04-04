import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { LogOutIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoginIcon } from "./icons/login";

type Props = {
  links: { href: string; label: string }[];
  session: Session | null;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export function Sidebar({ session, links, isMenuOpen, setIsMenuOpen }: Props) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-[100dvh] w-[21rem] max-w-[100%] translate-x-full flex-col overflow-y-auto border-l bg-background transition-transform duration-300",
          isMenuOpen && "translate-x-0",
        )}
      >
        <header className="flex h-[57px] items-center justify-between border-b p-4">
          <h1 className="text-lg font-semibold">Menu</h1>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5"
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
              <div className="max-w-100% flex items-center gap-2">
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarImage src={session.user?.image || ""} alt="@shadcn" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>

                <div className="overflow-hidden">
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
                  className="grow justify-end p-0 text-destructive hover:bg-transparent hover:text-destructive/80"
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
