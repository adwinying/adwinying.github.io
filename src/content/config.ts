import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    date: z.date(),
    tags: z.string().array(),
    thumbnail: z.string().optional(),
    title: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = {
  posts: postCollection,
};
