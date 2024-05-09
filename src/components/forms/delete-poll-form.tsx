"use client";

import { useTransition } from "react";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deletePoll } from "./actions";

export function DeletePollForm({ pollId }: { pollId: string }) {
  // pending state
  // nb: you can do something after state changes using useEffect
  const [pending, startTransition] = useTransition();

  const onSubmit = async (formData: FormData) => {
    // todo: RUN SOME VALIDATION HERE

    startTransition(() => {
      deletePoll(formData);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
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
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Polling</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus polling ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="p-0 bg-transparent" asChild>
            <form action={onSubmit} className="w-full sm:w-fit">
              <input type="text" name="pollId" className="hidden" value={pollId} readOnly />
              <Button type="submit" variant="destructive" className="w-full sm:w-fit">Delete</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
