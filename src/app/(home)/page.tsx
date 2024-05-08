import { getPublicPollsServer } from "@/firebase/services/server";
import { PollList } from "@/components/poll-list";

export default async function Page() {
  const data = await getPublicPollsServer();
  const formattedData = data.map((datum) => ({
    ...datum,
    date_created: new Date(
      datum.date_created.seconds * 1000,
    ).toLocaleDateString("en-GB"),
  }));

  return (
    <main className="mx-auto min-h-screen max-w-screen-xl p-4">
      <PollList polls={formattedData} />
    </main>
  );
}
