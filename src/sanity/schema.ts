import { defineField, defineType, type SchemaTypeDefinition } from "sanity";
import { UserIcon } from "@sanity/icons";

const voteType = defineType({
  name: "vote",
  type: "document",
  fields: [
    defineField({
      name: "daerah",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "kandidat",
      type: "array",
      of: [{ type: "kandidat" }],
    }),
  ],
  preview: {
    select: {
      title: "daerah",
    },
    prepare: ({ title }) => ({
      title,
      media: "",
    }),
  },
});

const candidateType = defineType({
  name: "kandidat",
  type: "object",
  fields: [
    defineField({
      name: "nama",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "nama",
    },
    prepare: ({ title }) => ({
      title,
      media: UserIcon,
    }),
  },
});

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [voteType, candidateType],
};
