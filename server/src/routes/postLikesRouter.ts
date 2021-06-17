import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";

//post router object
const postLikeRouter = express.Router();

//Create Like
postLikeRouter.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  const postLikes = await pool.query(`SELECT likes FROM posts WHERE id=$1`, [
    body.post_id,
  ]);
  const n = postLikes.rows[0].likes;
  const updateLikes = await pool.query(
    `UPDATE posts SET likes=$1+1 WHERE id=$2`,
    [n, body.post_id]
  );
  const newLike = await pool.query(
    `INSERT INTO post_reactions(id,user_id,post_id,created_at,updated_at)
    VALUES(gen_random_uuid(),$1,$2,now(),now())`,
    [user.userID, body.post_id]
  );
  res.json({ msg: "Post liked successfully" });
});

//Update Like / Unlike
postLikeRouter.put("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  const postLikes = await pool.query(`SELECT likes FROM posts WHERE id=$1`, [
    body.post_id,
  ]);
  const n = postLikes.rows[0].likes;
  const updateLikes = await pool.query(
    `UPDATE posts SET likes=$1-1 WHERE id=$2`,
    [n, body.post_id]
  );
  const newLike = await pool.query(
    `DELETE from post_reactions WHERE post_id=$1 AND user_id=$2;`,
    [body.post_id, user.userID]
  );
  res.json({ msg: "Post updated successfully" });
});

export { postLikeRouter };
