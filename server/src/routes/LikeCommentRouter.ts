import express from "express";
import { requireAuth } from "../middleware/AuthMiddleware";
import { LikeCommentRepository } from "../repos/LikeCommentRepository";

//like-comment router object
const commentLikeRouter = express.Router();

//Like / Unlike a comment
commentLikeRouter.post("/", requireAuth, async (req, res) => {
  console.log("got request");

  const body = req.body;
  const user = req.user;
  //check if the user already liked the comment or not
  const count = await LikeCommentRepository.findById(
    body.comment_id,
    user.userID
  );
  //if liked then unlike and vice versa
  if (count > 0) {
    const unlike = await LikeCommentRepository.deleteOne(
      body.comment_id,
      user.userID
    );
    res.status(200).json({ msg: "unliked" });
  } else {
    const like = await LikeCommentRepository.insertOne(
      body.comment_id,
      user.userID
    );
    res.status(200).json({ msg: "liked" });
  }
});

export { commentLikeRouter };
