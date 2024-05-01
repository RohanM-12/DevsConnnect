import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
} from "../controllers/postController.js";

const postRoutes = Router();

postRoutes.post("/createPost", createPost);
postRoutes.get("/getPosts", getAllPosts);
postRoutes.get("/getPost/:id", getSinglePost);
postRoutes.delete("/deletePost/:id", deletePost);

export default postRoutes;
