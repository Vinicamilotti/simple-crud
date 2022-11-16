import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  userType: z.enum(["normal", "admin"]),
});

export type User = z.TypeOf<typeof UserSchema>;
