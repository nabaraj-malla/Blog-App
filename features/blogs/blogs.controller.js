import { BlogModel } from "./blogs.schema.js";
import { CommentModel } from "../comments/comment.schema.js";
import mongoose from "mongoose";

class BlogController {
  addBlog(req, res) {
    res.render("addBlog", {
      user: req.user,
    });
  }

  async newBlog(req, res, next) {
    try {
      console.log("newBlog", req.body);
      const { title, body } = req.body;
      console.log("req.file", req.file);
      const { filename } = req.file;
      console.log("filename", filename);
      const createdBy = req.user._id;
      console.log(createdBy);
      const newBlog = new BlogModel({
        title,
        body,
        coverImageURL: `/images/${req.file.filename}`,
        // coverImageURL: `${req.file.path}`,
        createdBy,
      });
      await newBlog.save();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  async handleReadBlog(req, res, next) {
    try {
      const blog = await BlogModel.findById(req.params.id).populate(
        "createdBy"
      );
      // console.log("blog", blog);
      const blogId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        console.log("req.params.id is not a valid object id");
      } else {
        console.log("req.params.id is a valid object id");
      }
      const comments = await CommentModel.find({
        blog: `${req.params.id}`,
      }).populate("user");
      console.log("comments", comments);
      // console.log(comments[0].commentContent);
      // console.log(comments[1].user.fullName);
      res.render("blog", { blog, user: req.user, comments });
    } catch (error) {
      next(error);
    }
  }
}
export default BlogController;
