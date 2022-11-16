import { Express, Request, Response } from "express";
import { CreateUser, DeleteUser, UpdateUser } from "../types/user.types";
import prisma from "../utils/prisma";

const createUser = async (req: Request, res: Response) => {
  const data: CreateUser = req.body;
  const thereIsUser = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (!thereIsUser) {
    const create = await prisma.user.create({ data: data });
    if (create.id) {
      const respose = {
        message: "User created",
        username: create.username,
        type: create.type,
        id: create.id,
      };
      res.json(respose);
    } else {
      res.json({
        message: "Something went wrong",
      });
    }
  } else {
    res.json({ message: "Username already taken" });
  }
};

const getAllUSers = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  const allUsersInfo = allUsers.map((item) => {
    return {
      username: item.username,
      id: item.id,
      type: item.type,
    };
  });
  res.json(allUsersInfo);
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({ where: { id } });
  const response = {
    username: user?.username,
    id: user?.id,
    type: user?.type,
  };
  res.json(response);
};

const getUserByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;
  const user = await prisma.user.findUnique({ where: { username } });
  const response = {
    username: user?.username,
    id: user?.id,
    type: user?.type,
  };
  res.json(response);
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const request: UpdateUser = req.body;
  const thereIsUser = await prisma.user.findUnique({ where: { id } });
  if (thereIsUser) {
    const { username, password } = request;
    const isPossible = username == thereIsUser.username ? true : false;
    const isAuth = password == thereIsUser.password ? true : false;
    if (isPossible && isAuth) {
      await prisma.user.update({
        where: { id },
        data: {
          password: request.newData.password,
        },
      });
      res.json({ message: "Password changed" }).status(203);
    } else {
      res.json({ message: "Wrong user or password" });
    }
  } else {
    res.json({ message: "User not found" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const request: DeleteUser = req.body;
  const thereIsUser = await prisma.user.findUnique({ where: { id } });
  if (thereIsUser) {
    const { username, password } = request;
    const isPossible = username == thereIsUser.username ? true : false;
    const isAuth = password == thereIsUser.password ? true : false;
    if (isPossible && isAuth) {
      await prisma.user.delete({
        where: { id },
      });
      res.json({ message: "User Deleted" }).status(203);
    } else {
      res.json({ message: "Wrong user or password" });
    }
  } else {
    res.json({ message: "User not found" });
  }
};

export {
  createUser,
  getAllUSers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
