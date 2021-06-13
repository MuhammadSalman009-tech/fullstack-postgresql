import express from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/AuthMiddleware";
import { PostRepository } from "../repos/PostRepository";
const postRouter = express.Router();

//list all posts
postRouter.get("/", async (req, res) => {
  const posts = await PostRepository.findMany();
  res.json(posts);
});

//create a post
postRouter.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = (req as any).user;
  if (!body?.description || !body?.image) return res.status(400);
  try {
    const newPost = await PostRepository.insertOne(
      body.description,
      body.image,
      user.userID
    );
    return res.status(201).send("post created successfully!");
  } catch (error) {
    return res.status(500).send(error);
  }
});

//fetch single post
postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = PostRepository.findById(id);
    res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//delete a post
postRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedPost = await pool.query("DELETE FROM posts WHERE p.id=$1", [id]);
  console.log("deleted");

  res.json(deletedPost);
});
export { postRouter };
