import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";

//post router object
const postLikeRouter = express.Router();

//Create Like
// postLikeRouter.post("/", requireAuth, async (req, res) => {
//   const body = req.body;
//   const user = req.user;
//   const postLikes = await pool.query(`SELECT likes FROM posts WHERE id=$1`, [
//     body.post_id,
//   ]);
//   const n = postLikes.rows[0].likes;
//   const updateLikes = await pool.query(
//     `UPDATE posts SET likes=$1+1 WHERE id=$2`,
//     [n, body.post_id]
//   );
//   const newLike = await pool.query(
//     `INSERT INTO post_reactions(id,user_id,post_id,created_at,updated_at)
//     VALUES(gen_random_uuid(),$1,$2,now(),now())`,
//     [user.userID, body.post_id]
//   );
//   res.json({ msg: "Post liked successfully" });
// });

//Update Like / Unlike
postLikeRouter.put("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;
  var unliked;
  var liked;
  const result = await pool.query(
    `select ARRAY_POSITION(likes,$1) as index from posts where id=$2`,
    [user.userID, body.post_id]
  );
  console.log(result.rows[0].index);
  if (result.rows[0].index > 0) {
    unliked = await pool.query(
      `UPDATE posts SET likes=array_remove(likes,$1) where id=$2`,
      [user.userID, body.post_id]
    );
    console.log(unliked);
  } else {
    liked = await pool.query(
      `UPDATE posts SET likes=array_append(likes,$1) where id=$2`,
      [user.userID, body.post_id]
    );
    console.log(liked);
  }
  if (liked) return res.status(200).json({ msg: "liked" });
  return res.status(200).json({ msg: "unliked" });
});

export { postLikeRouter };
