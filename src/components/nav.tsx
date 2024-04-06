"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Nav({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const redirect = encodeURIComponent(pathname);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/create-polling", label: "Buat Polling" },
    { href: "/about-us", label: "Tentang Kami" },
  ];

  session && links.push({ href: "/dashboard", label: "Dashboard" });

  const props = { links, session, isMenuOpen, setIsMenuOpen, redirect };

  return (
    <>
      <Header {...props} />
      <Sidebar {...props} />
    </>
  );
}
