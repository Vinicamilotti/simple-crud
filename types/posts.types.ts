import { z } from "zod";

const PostSchema = z.object({
  username: z.string(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  postId: z.number(),
});

export type Post = z.TypeOf<typeof PostSchema>;
