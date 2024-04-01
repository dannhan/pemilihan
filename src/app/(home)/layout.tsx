import { getAuth } from "@/lib/auth";
import { Header } from "@/components/header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
}
