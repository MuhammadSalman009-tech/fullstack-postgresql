import express from "express";
import dotenv from "dotenv";
import { postRouter } from "./routes/PostRouter";
import { userRouter } from "./routes/UserRouter";
import { authRouter } from "./routes/AuthRouter";
import cookieSession from "cookie-session";
import cors from "cors";
import { postLikeRouter } from "./routes/LikePostRouter";
import { postCommentRouter } from "./routes/CommentRouter";
import { commentLikeRouter } from "./routes/LikeCommentRouter";
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
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
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

//post-comments like endpoint
app.use("/api/posts/comment/like", commentLikeRouter);

app.listen(5000, () => {
  console.log("listnning on port 5000...");
});
