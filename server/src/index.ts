import express from "express";
import { pool } from "./db";
import dotenv from "dotenv";
import { postRouter } from "./routes/postsRouter";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import cookieSession from "cookie-session";

dotenv.config();

const app = express();

app.use(
  cookieSession({
    signed: false,
  })
);
app.use(express.json());
//posts endpoint
app.use("/api/posts", postRouter);

//users endpoint
app.use("/api/users", userRouter);

//Auth endpoint
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("listnning on port 5000...");
});
