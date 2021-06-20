import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";

//post router object
const postLikeRouter = express.Router();

//Like / Unlike a post
postLikeRouter.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  //check if the user already liked the post or not
  const result = await pool.query(
    `SELECT * FROM post_reactions WHERE user_id=$1
    AND post_id=$2`,
    [user.userID, body.post_id]
  );
  //if liked then unlike and vice versa
  if (result.rowCount > 0) {
    const unlike = await pool.query(
      `DELETE from post_reactions WHERE post_id=$1 AND user_id=$2 `,
      [body.post_id, user.userID]
    );
    const res1 = await pool.query(`SELECT likes from posts where id=$1`, [
      body.post_id,
    ]);
    const n1 = res1.rows[0].likes;
    const decreamentLike = await pool.query(
      `UPDATE posts set likes=$1-1 where id=$2`,
      [n1, body.post_id]
    );
    res.status(200).json({ msg: "unliked" });
  } else {
    const like = await pool.query(
      `INSERT INTO post_reactions(id,post_id,user_id,created_at,updated_at)
        values(gen_random_uuid(),$1,$2,NOW(),NOW())`,
      [body.post_id, user.userID]
    );
    const res2 = await pool.query(`SELECT likes from posts where id=$1`, [
      body.post_id,
    ]);
    const n2 = res2.rows[0].likes;
    const inreamentLike = await pool.query(
      `UPDATE posts set likes=$1+1 where id=$2`,
      [n2, body.post_id]
    );
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
