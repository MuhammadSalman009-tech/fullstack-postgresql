import express from "express";
import { pool } from "../db";
import { UserRepository } from "../repos/UserRepository";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserRepository.findMany();
    res.status(200).json(users);
  } catch (error) {}
});

userRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body?.name || !body?.email || !body?.avatar || !body?.gender)
    return res.status(400);
  try {
    const newUser = await UserRepository.insertOne(
      body.name,
      body.email,
      body.avatar,
      body.gender
    );
    return res.status(201);
  } catch (error) {
    return res.status(500).send(error);
  }
});
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await UserRepository.findById(id);
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { userRouter };
