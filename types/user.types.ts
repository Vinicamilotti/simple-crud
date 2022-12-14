import { z } from "zod";

const UserSchema = z.object({
  userId: z.string(),
  userAPIKey: z.string(),
  username: z.string(),
  password: z.string(),
  userType: z.enum(["normal", "admin"]),
});

export type User = z.TypeOf<typeof UserSchema>;

const CreateUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateUser = z.TypeOf<typeof CreateUserSchema>;

const updateUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  newData: z.object({
    password: z.string(),
  }),
});
export type UpdateUser = z.TypeOf<typeof updateUserSchema>;

const deleteUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type DeleteUser = z.TypeOf<typeof deleteUserSchema>;
