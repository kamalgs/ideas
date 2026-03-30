import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  rating: z.number().int().min(1).max(5).optional(),
});

export const collections = {
  books: defineCollection({ type: 'content', schema: postSchema }),
  movies: defineCollection({ type: 'content', schema: postSchema }),
  thoughts: defineCollection({ type: 'content', schema: postSchema }),
  research: defineCollection({ type: 'content', schema: postSchema }),
  product: defineCollection({ type: 'content', schema: postSchema }),
};
