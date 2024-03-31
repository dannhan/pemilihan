import { PollingForm } from "@/components/forms/polling-form";

export default function Page() {
  return (
    <main className="mx-auto my-8 min-h-screen max-w-screen-xl px-4">
      <h1 className="mt-4 text-center text-2xl">Buat Polling Anda Sendiri</h1>
      <section className="mt-4 flex flex-col rounded border p-6 shadow-md">
        <PollingForm />
      </section>
    </main>
  );
}
