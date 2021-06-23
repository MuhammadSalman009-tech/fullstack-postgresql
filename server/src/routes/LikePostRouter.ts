import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";
import { LikePostRepository } from "../repos/LikePostRepository";

//post router object
const postLikeRouter = express.Router();

//Like / Unlike a post
postLikeRouter.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  //check if the user already liked the post or not
  const count = await LikePostRepository.findById(body.post_id, user.userID);
  //if liked then unlike and vice versa
  if (count > 0) {
    const unlike = await LikePostRepository.deleteOne(
      body.post_id,
      user.userID
    );
    res.status(200).json({ msg: "unliked" });
  } else {
    const like = await LikePostRepository.insertOne(body.post_id, user.userID);
    res.status(200).json({ msg: "liked" });
  }
});

//get number of likes on a post
postLikeRouter.post("/all", async (req, res) => {
  const body = req.body;
  const result = await pool.query(
    `select COUNT(*) as likes from post_reactions WHERE post_id=$1`,
    [body.post_id]
  );
  const likes = result.rows[0].likes;

  res.status(200).json({ likes: likes });
});

export { postLikeRouter };
