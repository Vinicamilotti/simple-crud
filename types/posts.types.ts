import { z } from "zod";

const PostSchema = z.object({
  username: z.string(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  postId: z.number(),
});

export type Post = z.TypeOf<typeof PostSchema>;

const createPostSchama = z.object({
  username: z.string(),
  password: z.string(),
  title: z.string(),
  content: z.string(),
});

export type CreatePost = z.TypeOf<typeof createPostSchama>;
