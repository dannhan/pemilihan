import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const headersList = headers();
  const referer = headersList.get("SIGNATURE_HEADER_NAME");

  console.log({ headersList, referer });
  // revalidatePath("/", "layout");

  return Response.json({ revalidated: true });
}

export async function GET() {
  revalidatePath("/", "layout");

  return Response.json({ revalidated: true });
}
