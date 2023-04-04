import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      date: z.date(),
      tags: z.string().array(),
      thumbnail: z.union([image(), z.null()]),
      title: z.string(),
      excerpt: z.string(),
    }),
});

export const collections = {
  posts: postCollection,
};
