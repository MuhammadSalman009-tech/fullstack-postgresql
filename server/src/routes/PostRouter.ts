import express from "express";
import { requireAuth } from "../middleware/AuthMiddleware";
import { PostRepository } from "../repos/PostRepository";
import multer from "multer";

//post router object
const postRouter = express.Router();
//multer image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
//list all posts
postRouter.get("/", async (req, res) => {
  console.log("got request");

  const posts = await PostRepository.findMany();
  res.json(posts);
});

//create a post
postRouter.post("/", requireAuth, upload.single("image"), async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (!body?.description || !body?.title || !req.file.fieldname)
    return res.status(400).json({ msg: "all fileds are required" });
  try {
    const newPost = await PostRepository.insertOne(
      body.description,
      req.file.path,
      user.userID,
      body.title
    );
    console.log(newPost);
    //returning response
    return res.status(201).json({ msg: "post created successfully!" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

//fetch single post
postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostRepository.findById(id);
    res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//delete a post
postRouter.delete("/:id", requireAuth, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    const deletedPostCount = await PostRepository.deleteOne(id, user.userID);
    res.status(200).json({ deletedPostCount });
  } catch (error) {
    res.status(500).json(error);
  }
});
export { postRouter };
