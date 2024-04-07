import { getPublicPollsAdmin } from "@/firebase/services/admin";
import { PollList } from "@/components/poll-list";

export default async function Page() {
  const data = await getPublicPollsAdmin();
  const formattedData = data.map((datum) => ({
    ...datum,
    date_created: new Date(
      datum.date_created.seconds * 1000,
    ).toLocaleDateString("en-GB"),
  }));
  console.log({ formattedData });


  return (
    <main className="mx-auto min-h-screen max-w-screen-xl p-4">
      <PollList polls={formattedData} />
    </main>
  );
}
