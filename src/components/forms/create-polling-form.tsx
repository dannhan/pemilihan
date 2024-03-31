"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  question: z.string().min(10).max(160, {
    message: "Question must not be longer than 160 characters.",
  }),
  options: z.array(z.object({ value: z.string().min(1) })).min(2, {
    message: "Options must be at least 2.",
  }),
  private: z.boolean().default(false).optional(),
  multiple: z.boolean().default(false).optional(),
  comment: z.boolean().default(false).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  question: "",
  options: [{ value: "" }, { value: "" }],
  private: false,
  multiple: false,
  comment: false,
};

export function CreatePollingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => console.log(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <QuestionFormField form={form} />

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

function QuestionFormField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  const maxChars = 160;

  return (
    <FormField
      control={form.control}
      name="question"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pertanyaan</FormLabel>
          <FormControl>
            <Textarea {...field} maxLength={160} className="text-lg" />
          </FormControl>
          <FormDescription>
            Characters left:{" "}
            <span className="font-semibold">
              {maxChars - form.watch("question").length}
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
            {index > 1 ? (
              <div className="relative flex">
                <Input
                  {...field}
                  required
                  autoComplete="off"
                  placeholder="Pilihan"
                  className="focus-visible:outline-none focus-visible:ring-0"
                />
                <Button
                  variant="destructive"
                  className="absolute right-0 rounded-l-none"
                  onClick={() => remove(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Input
                {...field}
                required
                autoComplete="off"
                placeholder="Pilihan"
                className="focus-visible:outline-none focus-visible:ring-0"
              />
            )}
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
