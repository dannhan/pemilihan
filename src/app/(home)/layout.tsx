import { firebaseAdminAuth } from "@/firebase/firebaseAdmin";
import { getAuth } from "@/lib/auth";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/about-us", label: "Tentang Kami" },
  ];

  if (session) {
    const userId = session.user.id;
    const userRecord = await firebaseAdminAuth.getUser(userId);

    if (userRecord.customClaims?.admin) {
      links.push({ href: "/create-polling", label: "Buat Polling" });
      links.push({ href: "/dashboard", label: "Dashboard" });
    }
  }

  return (
    <>
      <Nav session={session} links={links} />
      {children}
      <Footer />
    </>
  );
}
