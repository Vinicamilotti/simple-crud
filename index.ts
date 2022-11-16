import { Express, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route";

dotenv.config();
const app: Express = express();
const HTTP_PORT = process.env.PORT;

app.use(express.json());
app.use("/", userRouter);

app.listen(HTTP_PORT, () => {
  console.log("Running on", HTTP_PORT);
});
