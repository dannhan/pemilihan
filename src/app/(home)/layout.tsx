import { getAuth } from "@/lib/auth";
import { checkUserRecord } from "@/lib/server";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about-us", label: "Tentang Kami" },
  ];

  if (session) {
    const userId = session.user.id;
    const userRecord = await checkUserRecord(userId);

    /* if user is an admin add admin only links */
    if (userRecord?.customClaims?.admin) {
      navLinks.push({ href: "/create-polling", label: "Buat Polling" });
      navLinks.push({ href: "/dashboard", label: "Dashboard" });
    }
  }

  return (
    <>
      <Nav session={session} links={navLinks} />
      {children}
      <Footer />
    </>
  );
}
