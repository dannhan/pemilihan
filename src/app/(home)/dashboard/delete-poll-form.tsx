"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePoll } from "./actions";

// todo
/* import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; */

export function DeletePollForm({ pollId }: { pollId: string }) {
  return (
    <form action={deletePoll}>
      <input type="text" name="pollId" className="hidden" value={pollId} />
      <DeleteButton />

      {/* <AlertDialog> */}
      {/*   <AlertDialogTrigger> */}
      {/*     <Button */}
      {/*       variant="destructive" */}
      {/*       size="sm" */}
      {/*       className="border-2 border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground" */}
      {/*       type="button" */}
      {/*     > */}
      {/*       Hapus */}
      {/*     </Button> */}
      {/*   </AlertDialogTrigger> */}
      {/*   <AlertDialogContent> */}
      {/*     <AlertDialogHeader> */}
      {/*       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
      {/*       <AlertDialogDescription> */}
      {/*         This action cannot be undone. This will permanently delete your */}
      {/*         account and remove your data from our servers. */}
      {/*       </AlertDialogDescription> */}
      {/*     </AlertDialogHeader> */}
      {/*     <AlertDialogFooter> */}
      {/*       <AlertDialogCancel>Cancel</AlertDialogCancel> */}
      {/*       <AlertDialogAction>Continue</AlertDialogAction> */}
      {/*     </AlertDialogFooter> */}
      {/*   </AlertDialogContent> */}
      {/* </AlertDialog> */}
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
