"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
};

export function HeaderLink({ href, label }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        "block py-2 pl-3 pr-4 md:bg-transparent md:p-0",
        href === pathname && "text-foreground/90",
      )}
    >
      {label}
    </Link>
  );
}
