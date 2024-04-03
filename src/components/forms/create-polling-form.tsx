"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { createPollFormSchema as formSchema } from "@/lib/schema";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "@/firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Readable } from "stream";
import { useState } from "react";

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  title: "",
  options: [{ value: "" }, { value: "" }],
  private: false,
  multiple: false,
  comment: false,
};

export function CreatePollingForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>, e: any) => {
    const user = firebaseAuth.currentUser;
    const colName = "polls";

    if (!user) {
      alert("Anda harus login untuk membuat poll!");
      return;
    }

    try {
      const docRef = await addDoc(collection(firebaseFirestore, colName), {
        title: values.title,
        private: values.private,
        multiple: values.multiple,
        comment: values.comment,
        date_created: serverTimestamp(),
        userId: user?.uid,
      });
      const pollId = docRef.id;

      for (const option of values.options) {
        let image = ""; 

        if (option.image) {
          const storage = getStorage();

          const metadata = {
            contentType: "image/jpeg",
          };

          // Upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = ref(storage, "images/" + option.image.name);
          const uploadTask = uploadBytesResumable(
            storageRef,
            option.image,
            metadata,
          );

          image = await new Promise((resolve) => {
            uploadTask.on("state_changed", () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })
                .catch((error) => alert(error.message));
            });
          });
        }

        await addDoc(
          collection(firebaseFirestore, `${colName}/${pollId}/options`),
          {
            name: option.value,
            image,
          },
        );
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      alert("Something wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TitleFormField form={form} />

        <div>
          {fields.map((item, index) => {
            return (
              <OptionFormField
                key={item.id}
                item={item}
                index={index}
                form={form}
                remove={remove}
              />
            );
          })}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Tambah
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-1.5">
          <FormLabel>Settings</FormLabel>
          <SettingFormField form={form} name="private">
            Private (hanya melalui link langsung)
          </SettingFormField>
          <SettingFormField form={form} name="multiple">
            Bisa memilih lebih dari 1 pilihan
          </SettingFormField>
          <SettingFormField form={form} name="comment">
            Tidak bisa memberi komentar
          </SettingFormField>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function TitleFormField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  const maxChars = 160;

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pertanyaan</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              minLength={10}
              maxLength={160}
              className="text-lg"
            />
          </FormControl>
          <FormDescription>
            Characters left:{" "}
            <span className="font-semibold">
              {maxChars - form.watch("title").length}
            </span>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function OptionFormField({
  item,
  index,
  form,
  remove,
}: {
  item: FieldArrayWithId<FormValues>;
  index: number;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  remove: UseFieldArrayRemove;
}) {
  const [value, setValue] = useState("");

  return (
    <FormField
      key={item.id}
      control={form.control}
      name={`options.${index}.value`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(index !== 0 && "sr-only")}>
            Ketikan Pilihan Dibawah Ini
          </FormLabel>
          <FormControl>
            <div className="relative flex flex-col md:flex-row">
              <Input
                {...field}
                autoComplete="off"
                placeholder="Pilihan"
                required
                className={cn(
                  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
                  "rounded-b-none border-b-0",
                  "md:rounded md:rounded-r-none md:border-b",
                )}
              />
              {index > 1 ? (
                <Button
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="absolute right-0 rounded-b-none rounded-l-none md:rounded-r"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              ) : (
                ""
              )}

              <FormField
                control={form.control}
                name={`options.${index}.image`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className={cn(
                          "flex w-full items-center rounded-b",
                          "md:w-fit md:rounded-none md:rounded-r",
                        )}
                      >
                        <FormLabel
                          htmlFor={`dropzone-file-${index}`}
                          className="h-10 cursor-pointer rounded-bl border bg-muted px-3 py-2.5 md:rounded-none"
                        >
                          JPG/PNG
                        </FormLabel>
                        <Input
                          {...field}
                          id={`dropzone-file-${index}`}
                          type="file"
                          accept="image/png, image/jpeg"
                          className="rounded-l-none rounded-tr-none border file:hidden md:rounded-tr"
                          value={value}
                          onChange={(e) => {
                            setValue(e.target.value);
                            field.onChange(
                              e.target.files ? e.target.files[0] : "",
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function SettingFormField({
  name,
  form,
  children,
}: {
  name: "private" | "multiple" | "comment";
  form: UseFormReturn<z.infer<typeof formSchema>>;
  children: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="h-4 w-4 cursor-pointer border-foreground/20"
              />
            </FormControl>
            <FormLabel className="text-sm text-muted-foreground">
              {children}
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}
