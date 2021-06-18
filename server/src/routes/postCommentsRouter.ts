import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";

//post router object
const postCommentRouter = express.Router();

//Get comments
postCommentRouter.post("/all", async (req, res) => {
  const body = req.body;
  try {
    const result = await pool.query(
      `select c.description,c.created_at,c.id,u.name 
      from comments as c 
      inner join users as u 
      ON u.id = c.user_id 
      inner join posts as p ON p.id=c.post_id 
      WHERE c.post_id=$1`,
      [body.post_id]
    );
    const comments = result.rows;
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
    const result = await pool.query(
      `INSERT INTO comments(id,description,user_id,post_id,created_at) values(gen_random_uuid(),$1,$2,$3,NOW())`,
      [body.description, user.userID, body.post_id]
    );
    console.log(result);
    return res.status(201).json({ msg: "Comment created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export { postCommentRouter };
