import { getResultById } from "@/firebase/services/admin";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Chart } from "./chart";

export default async function Page({ params }: { params: { id: string } }) {
  const { options, votes } = await getResultById(params.id);

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
        </ul>
      </section>
    </main>
  );
}
