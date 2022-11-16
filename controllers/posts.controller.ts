import prisma from "../utils/prisma";
import { Express, Request, Response } from "express";
import { CreatePost, Post, UpdatePost } from "../types/posts.types";

const newPost = async (req: Request, res: Response) => {
  const data: CreatePost = req.body;
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (!user) {
    res.json({ message: "User not found" });
  }
  const isAuth = user?.password == data.password ? true : false;
  if (isAuth) {
    const { username, title, content } = data;
    const userId = user?.id;
    const newPost = await prisma.posts.create({
      data: {
        username: username,
        postTitle: title,
        content: content,
        userId: userId,
      },
    });
    res.json({ message: "post created", newPost });
  } else {
    res.json({ message: "Wrong password" });
  }
};

const allPosts = async (req: Request, res: Response) => {
  const posts = await prisma.posts.findMany();
  res.json(posts);
};

const postById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const post = await prisma.posts.findUnique({ where: { id: idInt } });
  res.json(post);
};

const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const intId = parseInt(id);
  const updatedData: UpdatePost = req.body;
  const toUpdate = updatedData.newData;
  const post = await prisma.posts.findUnique({ where: { id: intId } });
  const { username, password } = updatedData;
  const thereIsUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (thereIsUser) {
    const isPossible = username == post?.username ? true : false;
    const isAuth = password == thereIsUser.password ? true : false;
    if (!isPossible) {
      res.json({ message: "Error! This post is not yours" });
    }
    if (!isAuth) {
      res.json({ message: "Password is incorrect" });
    }
    if (isPossible && isAuth) {
      const update = await prisma.posts.update({
        where: { id: intId },
        data: {
          ...toUpdate,
        },
      });
      res.json({ message: "Post updated", update });
    }
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;
  const post = await prisma.posts.findUnique({ where: { id } });
  if (!post) {
    res.json({ message: "Post not found" }).status(404);
    return null;
  }
  const isPossible = username == post?.username ? true : false;
  if (!isPossible) {
    res.json({ message: "This post is not yours" }).status(502);
    return null;
  }
  const user = await prisma.user.findUnique({ where: { username } });
  const isAuth = user?.password == password ? true : false;
  if (!isAuth) {
    res.json({ message: "Password incorrect" }).status(502);
  }
  if (isAuth && isPossible) {
    await prisma.posts.delete({ where: { id } });
  }
};

export { newPost, allPosts, postById, updatePost, deletePost };
