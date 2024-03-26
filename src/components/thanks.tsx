import Image from "next/image";

export function Thanks() {
  return (
    <section className="rounded p-6 text-center">
      <Image
        height={144}
        width={144}
        alt=""
        data-qa-loaded="true"
        src="/thanks.gif"
        className="mx-auto mb-4"
      />

      <h1 className="text-4xl">Terima Kasih</h1>
      <h2 className="text-xl">Pilihan anda berhasil disimpan!</h2>
    </section>
  );
}
