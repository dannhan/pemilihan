import Link from "next/link";
import { notFound } from "next/navigation";

import { getResultBySlugServer } from "@/firebase/services/server";
import { getAuth } from "@/lib/auth";
import { checkUserRecord } from "@/lib/server";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Chart } from "@/components/chart";
import { ShareButton } from "@/components/share-button";
import { RefreshButton } from "@/components/refresh-button";
import { ArrowLeft } from "lucide-react";

export default async function Page({ params }: { params: { slug: string } }) {
  const fullPath = `https://checkpolling.id/polling/${params?.slug}`;

  const { poll, options, votes } = await getResultBySlugServer(params.slug);

  if (poll === null) return notFound();

  const session = await getAuth();
  const userId = session?.user.id;
  const userRecord = await checkUserRecord(userId);
  if (userRecord?.customClaims?.admin === false) return notFound();

  const counts = new Map();
  const totalCount = votes.length;

  // Count occurrences of each option
  votes.forEach(({ option }) => {
    counts.set(option, (counts.get(option) || 0) + 1);
  });

  // Calculate count and percentage for each option
  options.forEach((option) => {
    const count = counts.get(option.name) || 0;
    const percentage = totalCount ? (count / totalCount) * 100 : 0;

    option.count = count;
    option.percentage = Number(percentage.toFixed(2));
  });

  // Sort options by count
  options.sort((a, b) => b.count! - a.count!);

  // Formatting data for the chart
  const data = options.map(({ name, percentage }) => {
    return {
      id: name,
      label: name,
      value: percentage,
    };
  });

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl p-4">
      <section className="flex flex-col gap-4 rounded-lg border p-4 shadow-md md:flex-row">
        <div className="flex h-80 w-full items-center text-black md:w-96">
          <Chart data={data} />
        </div>

        <ul className="w-full space-y-2 rounded-md border p-4">
          {options.map((option) => (
            <li key={option.name} className="border-b pb-2">
              <div className="flex w-full items-center justify-between">
                <p className="break-all">{option.name}</p>

                {/* prettier-ignore */}
                <Badge variant="secondary" className="cursor-default whitespace-nowrap rounded-md font-mono">
                  {option.count} Suara
                </Badge>
              </div>

              <div className="relative">
                <Progress value={option.percentage} className="mt-2 rounded" />
                <h1 className="absolute left-2 top-0.5 leading-none text-black [font-size:0.75rem]">
                  {option.percentage}%
                </h1>
              </div>
            </li>
          ))}

          <li className="block text-xl">Total: {totalCount} suara</li>
          <li className="flex flex-col flex-nowrap gap-4 overflow-hidden md:flex-row">
            <RefreshButton />
            <Button asChild>
              <Link href="./">
                <ArrowLeft className="mr-3 h-4 w-4" />
                Kembali ke polling
              </Link>
            </Button>
            <ShareButton
              options={options}
              title={poll?.title}
              fullPath={fullPath}
            />
          </li>
        </ul>
      </section>
    </main>
  );
}
