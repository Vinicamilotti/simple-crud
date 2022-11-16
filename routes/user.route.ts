import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import express from "express";

export const userRouter: Router = express.Router();

userRouter.post("/register", createUser);
