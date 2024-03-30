// ./schema/recommendation/recommendationType.ts

import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const recommendationType = defineType({
  name: "recommendation",
  title: "Recommendation",
  type: "object",
  fields: [
    defineField({
      name: "book",
      type: "reference",
      to: [{ type: "book" }],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "book.title",
      author: "book.author",
      year: "book.year",
      featured: "featured",
    },
    prepare: ({ title, author, year, featured }) => ({
      title: [featured ? "⭐️ " : "", `${title ?? `No book selected`}`].join(
        ` `,
      ),
      subtitle: author && year ? `${author} (${year})` : undefined,
      media: BookIcon,
    }),
  },
});
