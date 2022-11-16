import { Express, NextFunction, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route";
import { postRouter } from "./routes/posts.route";

dotenv.config();
const app: Express = express();
const HTTP_PORT = process.env.PORT;

app.use(express.json());
app.use("/", userRouter);
app.use("/posts/", postRouter);

app.listen(HTTP_PORT, () => {
  console.log("Running on", HTTP_PORT);
});
