import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";
import { CommentRepository } from "../repos/CommentRepository";

//post router object
const postCommentRouter = express.Router();

//Get comments
postCommentRouter.post("/all", async (req, res) => {
  const body = req.body;
  try {
    const comments = await CommentRepository.findManyById(body.post_id);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
//create comment
postCommentRouter.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (!body?.description || !body?.post_id)
    return res.status(400).send("comment can not be empty");
  try {
    const newCommentCount = await CommentRepository.insertOne(
      body.description,
      body.post_id,
      user.userID
    );
    return res.status(201).json({ msg: "Comment created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//delete comment
postCommentRouter.delete("/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    const deletedCommentCount = await CommentRepository.deleteOne(
      id,
      user.userID
    );
    res.status(200).json({ deletedCommentCount });
  } catch (error) {
    res.status(500).json(error);
  }
});

export { postCommentRouter };
