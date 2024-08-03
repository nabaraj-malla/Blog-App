import express from "express";
import BlogController from "./blogs.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";
const blogRouter = express.Router();

const blogController = new BlogController();
blogRouter.get("/addBlog", blogController.addBlog);
blogRouter.post(
  "/newBlog",
  upload.single("coverImageURL"),
  blogController.newBlog
);

blogRouter.get("/:id", blogController.handleReadBlog);
export default blogRouter;
