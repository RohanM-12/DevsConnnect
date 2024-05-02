import { Router } from "express";
import multer from "multer";

import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
} from "../controllers/postController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const postRoutes = Router();

postRoutes.post("/createPost", upload.single("thumbnailImage"), createPost);
postRoutes.get("/getPosts", getAllPosts);
postRoutes.get("/getPost/:id", getSinglePost);
postRoutes.delete("/deletePost/:id", deletePost);

export default postRoutes;
