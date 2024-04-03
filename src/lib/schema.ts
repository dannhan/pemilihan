import { z } from "zod";

// todo

// prettier-ignore
export const createPollFormSchema = z.object({
  title: z.string().min(10).max(160, { message: "Question must not be longer than 160 characters." }),
  options: z.array(z.object({ value: z.string().min(1), image: z.any().optional() })).min(2, { message: "Options must be at least 2." }),
  private: z.boolean().default(false).optional(),
  multiple: z.boolean().default(false).optional(),
  comment: z.boolean().default(false).optional(),
});
