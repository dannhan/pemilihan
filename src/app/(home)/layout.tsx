import { getAuth } from "@/lib/auth";
import { Nav } from "@/components/nav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

  return (
    <>
      <Nav session={session} />
      {children}
    </>
  );
}
