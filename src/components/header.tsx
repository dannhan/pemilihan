import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { HeaderLink } from "./header-link";

import { getAuth } from "@/lib/auth";
import HeaderAvatar from "./header-avatar";

export async function Header() {
  const links = [
    { href: "/", label: "Beranda" },
    { href: "/create-polling", label: "Buat Polling" },
    // { href: "/tentang-kami", label: "Tentang Kami" },
    // { href: "/", label: "Polling Terbaru" },
    // { href: "/", label: "FAQ" },
    // { href: "/", label: "Hubungi Kami" },
  ];

  const session = await getAuth();

  return (
    <header className="sticky top-0">
      <nav className="border-b py-2.5 backdrop-blur">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-2 px-4">
          <Link href="/" className="flex items-center">
            <Image width={32} height={32} src="/logo.png" alt="logo" />
          </Link>

          <ul className="ml-8 flex flex-grow justify-end gap-4 font-semibold text-foreground/50">
            {links.map(({ href, label }) => (
              <li key={`${href}-${label}`}>
                <HeaderLink href={href} label={label} />
              </li>
            ))}
          </ul>

          <ModeToggle className="transition-transform" />

          {/* todo */}
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
        </div>
      </nav>
    </header>
  );
}
