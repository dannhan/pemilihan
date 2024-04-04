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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { cn } from "@/lib/utils";
import { LoaderCircle, Plus, X } from "lucide-react";
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

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const user = firebaseAuth.currentUser;
    const colName = process.env.NODE_ENV !== "production" ? "tests" : "polls";

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
        let idx = 0;

        if (option.image) {
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `images/options/${pollId}/${option.image.name}-${idx}`,
          );
          const metadata = { contentType: "image/jpeg" };

          await uploadBytes(storageRef, option.image, metadata);
          image = await getDownloadURL(storageRef);
        }

        await addDoc(
          collection(firebaseFirestore, `${colName}/${pollId}/options`),
          {
            name: option.value,
            image,
          },
        );

        idx = idx + 1;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
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

        <Button type="submit" disabled={isLoading}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Buat Polling
        </Button>
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
    <>
      <label className={cn("mb-2 block font-medium", index !== 0 && "sr-only")}>
        Ketikan Pilihan Dibawah Ini
      </label>
      <div className="relative mb-2 flex flex-col md:flex-row md:items-center">
        <FormField
          key={item.id}
          control={form.control}
          name={`options.${index}.value`}
          render={({ field }) => (
            <FormItem className="order-first grow">
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Pilihan"
                  required
                  className={cn(
                    "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
                    "rounded-b-none md:rounded md:rounded-r-none",
                    index > 1 && "w-[calc(100%-3rem)] rounded-r-none md:w-full",
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

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
                  <Input
                    {...field}
                    id={`dropzone-file-${index}`}
                    type="file"
                    accept="image/png, image/jpeg"
                    className={cn(
                      "peer rounded-l-none rounded-tr-none border border-l-0 file:hidden",
                      "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
                      "md:max-w-44 md:rounded-tr",
                      index > 1 && "md:max-w-32 md:rounded-r-none",
                    )}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      field.onChange(e.target.files ? e.target.files[0] : "");
                    }}
                  />
                  <FormLabel
                    htmlFor={`dropzone-file-${index}`}
                    className={cn(
                      "order-first h-10 cursor-pointer bg-secondary px-3 py-2.5 hover:bg-secondary/80",
                      "rounded-bl border border-r-0 md:rounded-none",
                      "peer-focus-visible:border-primary",
                    )}
                  >
                    JPG/PNG
                  </FormLabel>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {index > 1 ? (
          <Button
            variant="destructive"
            onClick={() => remove(index)}
            className={cn(
              "absolute right-0 w-12 rounded-b-none rounded-l-none border px-3 md:rounded-r",
              "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0",
              "md:static",
            )}
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          ""
        )}
      </div>
    </>
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
