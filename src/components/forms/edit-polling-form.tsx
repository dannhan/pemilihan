"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Option } from "@/lib/type";

import { Plus, X, LoaderCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { update } from "./actions";

type Props = {
  id?: string;
  title: string;
  options: Option[];
  children?: React.ReactNode;
};

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mt-8" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Simpan Polling
    </Button>
  );
}

export function EditPollingForm({ id, title, options }: Props) {
  const prevLen = options.length;

  const [index, setIndex] = useState(prevLen);
  const [newOptions, setNewOptions] = useState<number[]>([]);

  const updateNewOptions = update.bind(null, newOptions, prevLen);

  return (
    <form action={updateNewOptions}>
      <input name="id" value={id} className="hidden" />

      {/* polling title */}
      <div className="space-y-2">
        <Label>Pertanyaan</Label>
        <Textarea
          name="title"
          defaultValue={title}
          minLength={10}
          maxLength={160}
          className="text-lg"
          // todo
          disabled
        />
      </div>

      {/* old polling options */}
      <div className="mt-8 space-y-2">
        <Label>Ketikan Pilihan Dibawah Ini</Label>
        {options.map((e, i) => {
          return (
            <OptionInput key={e.id} index={i} textValue={e.name} imageName={e.image} disabled />
          );
        })}
      </div>

      {/* update form */}
      <div>
        {/* new polling options */}
        <div>
          <div className="mt-2">
            {newOptions.map((e, i) => (
              <div key={e}>
                <OptionInput index={e} deleteIndex={0} name={`options.${e}`}>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      const newArray = newOptions.filter(
                        (_, index) => index !== i,
                      );
                      setNewOptions(newArray);
                    }}
                    className={cn(
                      "absolute right-0 top-0 w-12 rounded-b-none rounded-l-none border px-3 md:rounded-r",
                      "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
                      "md:static",
                    )}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </OptionInput>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              setIndex(index + 1);
              setNewOptions([...newOptions, index]);
            }}
          >
            Tambah
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}

function OptionInput({
  index,
  textValue,
  disabled,
  deleteIndex,
  children,
  name,
  imageName,
}: {
  index: number;
  textValue?: string;
  disabled?: boolean;
  deleteIndex?: number;
  children?: React.ReactNode;
  name?: string;
  imageName?: string;
}) {
  return (
    // wrapper
    <div className="relative mb-2 flex flex-col md:flex-row md:items-center">
      {/* input text */}
      <Input
        autoComplete="off"
        placeholder="Pilihan"
        value={textValue}
        disabled={disabled}
        name={`${name}.value`}
        className={cn(
          "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
          "rounded-b-none md:rounded md:rounded-r-none",
          /* this is for trash icon */ index >=
          (deleteIndex !== undefined ? deleteIndex : 100) &&
          "w-[calc(100%-3rem)] rounded-r-none md:w-full",
        )}
        required
      />

      {/* image dropzone */}
      <div
        className={cn(
          "flex w-full items-center rounded-b",
          "md:w-fit md:rounded-none md:rounded-r",
        )}
      >
        <Input
          id={`dropzone-file-${index}`}
          name={`${name}.image`}
          accept="image/png, image/jpeg"
          disabled={disabled}
          type={imageName ? "text" : "file"}
          // todo: simplify this
          value={imageName ? (extractFileNameFromURL(imageName) || undefined) : undefined}
          className={cn(
            "peer rounded-l-none rounded-tr-none border border-l-0 file:hidden",
            "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
            "md:max-w-44 md:rounded-tr",
            /* this is for trash icon */ index >=
            (deleteIndex !== undefined ? deleteIndex : 100) &&
            "md:max-w-32 md:rounded-r-none",
          )}
        />
        <Label
          htmlFor={`dropzone-file-${index}`}
          className={cn(
            "order-first h-10 cursor-pointer bg-secondary px-3 py-2.5 hover:bg-secondary/80",
            "rounded-bl border border-r-0 md:rounded-none",
            "peer-focus-visible:border-primary",
          )}
        >
          JPG/PNG
        </Label>

        {/* for deleting */}
        {children}
      </div>
    </div>
  );
}

function extractFileNameFromURL(url: string) {
  // Regular expression to extract the file name from the URL
  const regex = /%2..*%2F(.*?)\?alt/;

  // Executing the regular expression on the URL
  const match = regex.exec(url);

  // If a match is found, return the captured group (file name)
  if (match && match.length > 1) {
    return match[1];
  } else {
    // If no match is found, return null or an appropriate error message
    return null;
  }
}
