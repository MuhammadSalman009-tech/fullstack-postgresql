import express from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/AuthMiddleware";
import { AuthRepository } from "../repos/AuthRepository";
const authRouter = express.Router();

//signup endpoint
authRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const gender = Boolean(req.body.gender);
    if (!body?.name || !body?.email || !body?.password)
      return res.status(400).send("all fields are required");
    const user = await AuthRepository.findByEmail(body.email);
    if (user.rowCount > 0) return res.status(400).send("user already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const userId = await AuthRepository.insertOne(
      body.name,
      body.email,
      gender,
      hashedPassword
    );

    const token = jwt.sign(
      { userID: userId, username: body.name },
      process.env.JWT_KEY
    );
    req.session = { jwt: token };

    return res.status(201).json({ msg: "user created successsfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

//signin endpoint
authRouter.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    if (!body?.email || !body?.password)
      return res.status(400).send("all fields are required");

    const user = await AuthRepository.findByEmail(body.email);

    if (user.rowCount === 0)
      return res.status(400).send("Invalid email or password");

    const validUser = await bcrypt.compare(
      body.password,
      user.rows[0].password
    );

    if (!validUser) return res.status(400).send("Invalid email or password");

    const token = jwt.sign(
      { userID: user.rows[0].id, username: user.rows[0].name },
      process.env.JWT_KEY
    );
    req.session = { jwt: token };

    return res.status(201).json({ msg: "login successfull!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

//current user
authRouter.get("/signout", async (req, res) => {
  req.session = null;
  res.status(200).json({ msg: "Logout Successfull!" });
});
//current user
authRouter.get("/current", requireAuth, async (req, res) => {
  res.status(200).json(req.user);
});
export { authRouter };
