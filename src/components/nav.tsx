"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Nav({
  session,
  links,
}: {
  session: Session | null;
  links: { href: string; label: string }[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const redirect = encodeURIComponent(pathname);

  const props = { links, session, isMenuOpen, setIsMenuOpen, redirect };

  return (
    <>
      <Header {...props} />
      <Sidebar {...props} />
    </>
  );
}
