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

const talkCollection = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      title: z.string(),
      info: z.string(),
      event: z.string(),
      event_url: z.string().optional(),
    }),
});

export const collections = {
  posts: postCollection,
  talks: talkCollection,
};
