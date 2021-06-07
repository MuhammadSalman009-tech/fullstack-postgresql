import express from "express";
import { pool } from "./db";
const app = express();
app.use(express.json());
//list all posts
app.get("/api/posts/", async(req, res) => {
  const posts=await pool.query('SELECT * FROM posts');
  res.json(posts.rows);
});
app.post("/api/posts/", async(req, res) => {
    const body=req.body;
    if(!body?.description || !body?.user_id || !body?.image) 
        return res.status(400);
    const newPost=await pool.query(`INSERT INTO posts(id,description,image,user_id,\
    created_at,updated_at) VALUES(gen_random_uuid(),$1,$2,$3,now(),now())`,[body.description,body.image,body.user_id]);
    if(newPost.rowCount>0)
        return res.status(201);
  });
app.get("/api/posts/:id", async(req, res) => {
    const id=req.params.id;
    const post=await pool.query('SELECT * FROM posts WHERE id=$1',[id]);
    res.json(post.rows[0]);
  });
app.delete("/api/posts/:id", async(req, res) => {
const id=req.params.id;
const deletedPost=await pool.query('DELETE posts, comments FROM posts as p INNER JOIN comments as c ON p.id=c.post_id WHERE p.id=$1',[id]);
console.log("deleted");

res.json(deletedPost);
});
//list all users
app.get("/api/users/", async(req, res) => {
    const posts=await pool.query('SELECT * FROM users');
    res.json(posts.rows);
});
app.post("/api/users/", async(req, res) => {
    const body=req.body;
    console.log(body);
    
    if(!body?.name || !body?.email || !body?.avatar || !body?.gender) 
        return res.status(400);
    const newUser=await pool.query(`INSERT INTO users(id,name,email,avatar,gender,
    created_at,updated_at) VALUES(gen_random_uuid(),$1,$2,$3,$4,now(),now())`,[body.name,body.email,body.avatar,body.gender]);
    if(newUser.rowCount>0)
        return res.status(201);
  });
app.get("/api/users/:id", async(req, res) => {
    const id=req.params.id;
    const post=await pool.query('SELECT * FROM users WHERE id=$1',[id]);
    res.json(post.rows[0]);
  });

app.listen(5000, () => {
  console.log("listnning on port 5000...");
});