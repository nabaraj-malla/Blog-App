import express from "express";
import CommentController from "./comment.controller.js";
const commentRouter = express.Router();

const commentController = new CommentController();
commentRouter.post("/:blogId", commentController.addComment);
export default commentRouter;
