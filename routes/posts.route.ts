import express, { Router } from "express";
import {
  allPosts,
  deletePost,
  newPost,
  postById,
  updatePost,
} from "../controllers/posts.controller";

const postRouter: Router = express.Router();

postRouter.post("/new", newPost);

postRouter.get("/", allPosts);

postRouter.get("/:id", postById);

postRouter.patch("/:id", updatePost);

postRouter.delete("/:id", deletePost);

export { postRouter };
