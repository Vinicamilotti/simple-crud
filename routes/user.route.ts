import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUSers,
  getUserById,
  getUserByUsername,
  getUserPosts,
  updateUser,
} from "../controllers/user.controller";
import express from "express";

export const userRouter: Router = express.Router();

userRouter.post("/register", createUser);

userRouter.get("/users", getAllUSers);

userRouter.get("/users/:id", getUserById);

userRouter.get("/users/username/:username", getUserByUsername);

userRouter.patch("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);

userRouter.get("/users/username/:username/posts", getUserPosts);
