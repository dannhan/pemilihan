import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export function HeaderLink({ href, label }: Props) {
  return (
    <Link href={href} className="transition-colors hover:text-foreground/90">
      {label}
    </Link>
  );
}
