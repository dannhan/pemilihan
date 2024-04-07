"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePoll } from "./actions";

export function DeletePollForm({ pollId }: { pollId: string }) {
  return (
    <form action={deletePoll}>
      <input type="text" name="pollId" className="hidden" value={pollId} />
      <DeleteButton />
    </form>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      size="sm"
      className="border-2 border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
      type="submit"
      disabled={pending}
    >
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Hapus
    </Button>
  );
}
