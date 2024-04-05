import { getResultById } from "@/firebase/services/admin";
import { Badge } from "@/components/ui/badge";
import { Chart } from "./chart";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// todo performance and font style
export default async function Page({ params }: { params: { id: string } }) {
  const { options, votes } = await getResultById(params.id);

  const result: any = {};
  const totalCount = votes.length;
  votes.forEach(({ option }) => {
    result[option] = (result[option] || 0) + 1;
  });
  options.forEach((option) => {
    const optionCount = result[option.name] || 0;
    option.count = optionCount;
    option.percentage = (optionCount / totalCount) * 100;
  });

  return (
    <main className="mx-auto mt-6 min-h-screen max-w-screen-xl items-center space-y-2 px-4">
      <section className="flex flex-col gap-4 rounded border p-4 shadow-md md:flex-row">
        <div className="flex h-80 w-full items-center text-black md:w-96">
          <Chart
            data={options.map(({ name, percentage }) => ({
              id: name,
              label: name,
              value: percentage,
            }))}
          />
        </div>

        <div className="w-full rounded border p-4">
          {options
            .sort((a, b) => b.count! - a.count!)
            .map((option) => (
              <div key={option.name} className="mb-2 border-b pb-2">
                <div className="flex w-full justify-between">
                  {option.name}
                  <Badge
                    variant="secondary"
                    className="items-center rounded-md font-mono"
                  >
                    {option.count} Suara
                  </Badge>
                </div>

                <div className="relative">
                  <Progress
                    value={option.percentage}
                    className="mt-2 rounded"
                  />
                  <h1
                    className={cn(
                      "absolute left-2 top-0.5 leading-none text-black [font-size:0.75rem]",
                    )}
                  >
                    {option.percentage?.toFixed(2)}%
                  </h1>
                </div>
              </div>
            ))}

          <h1 className="block text-xl">Total: {totalCount} suara</h1>
        </div>
      </section>
    </main>
  );
}
