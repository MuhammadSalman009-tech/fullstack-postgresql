import express from "express";
import { pool } from "./db";
import dotenv from "dotenv";
import { postRouter } from "./routes/postsRouter";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import cookieSession from "cookie-session";
import cors from "cors";
import { postLikeRouter } from "./routes/postLikesRouter";
import { postCommentRouter } from "./routes/postCommentsRouter";
dotenv.config();

const app = express();

//cookie-session middleware
app.use(
  cookieSession({
    name: "jwt",
    keys: ["salman"],
  })
);
//cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
//json middleware
app.use(express.json());

//images endpoint
app.use("/uploads", express.static("uploads"));

//posts endpoint
app.use("/api/posts", postRouter);

//users endpoint
app.use("/api/users", userRouter);

//Auth endpoint
app.use("/api/auth", authRouter);

//post-likes endpoint
app.use("/api/posts/like", postLikeRouter);

//post-comments endpoint
app.use("/api/posts/comment", postCommentRouter);

app.listen(5000, () => {
  console.log("listnning on port 5000...");
});
