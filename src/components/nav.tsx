"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Nav({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/create-polling", label: "Buat Polling" },
    // { href: "/tentang-kami", label: "Tentang Kami" },
    // { href: "/", label: "Polling Terbaru" },
    // { href: "/", label: "FAQ" },
    // { href: "/", label: "Hubungi Kami" },
  ];

  const props = { links, session, isMenuOpen, setIsMenuOpen };

  return (
    <>
      <Header {...props} />
      <Sidebar {...props} />
    </>
  );
}
