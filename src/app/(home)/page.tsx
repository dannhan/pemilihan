import Link from "next/link";

export default async function Page() {
  const data = [
    {
      daerah: "jepara",
      title:
        "Bursa Kandidat Calon Bupati dan Wakil Bupati Kabupaten Jepara Tahun",
      description:
        "Menurutmu sing cocok mimpin kabupaten Jepara selanjute sopo lurrr ???",
    },
  ];

  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4 text-center">
      {data.map((vote) => (
        <Link key={vote.daerah} href={`/voting/${vote.daerah.toLowerCase()}`}>
          <div className="my-4 cursor-pointer rounded-md border bg-card p-4 text-left shadow-md">
            <h1 className="text-xl font-bold">{vote.title}</h1>
            <p className="pt-2 text-sm text-gray-500">{vote.description}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}
