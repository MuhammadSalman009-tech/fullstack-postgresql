import express from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authRouter = express.Router();

//signup endpoint
authRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    if (!body?.name || !body?.email || !body?.avatar || !body?.password)
      return res.status(400).send("all fields are required");
    const isValid = await pool.query("SELECT * FROM users WHERE email=$1", [
      body.email,
    ]);
    if (isValid.rowCount > 0)
      return res.status(400).send("user already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await pool.query(
      `INSERT INTO users(id,name,email,avatar,gender,created_at,updated_at,password)
      VALUES(gen_random_uuid(),$1,$2,$3,$4,now(),now(),$5) returning id 
      `,
      [body.name, body.email, body.avatar, body.gender, hashedPassword]
    );

    const token = jwt.sign(
      { userID: user.rows[0].id, username: body.name },
      process.env.JWT_KEY
    );
    req.session = { jwt: token };

    return res.status(201).send("user created successsfully!");
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

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      body.email,
    ]);

    if (user.rowCount === 0)
      return res.status(400).send("Invalid email or password");
    console.log(user);

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

    return res.status(201).send("login successfull!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
export { authRouter };
