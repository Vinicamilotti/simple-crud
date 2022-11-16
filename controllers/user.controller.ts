import { Express, Request, Response } from "express";
import { CreateUser } from "../types/user.types";
import prisma from "../utils/prisma";

const createUser = async (req: Request, res: Response) => {
  const data: CreateUser = req.body;
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
};

export { createUser };
