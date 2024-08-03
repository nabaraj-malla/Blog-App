import { BlogModel } from "./blogs.schema.js";
import { CommentModel } from "../comments/comment.schema.js";

class BlogController {
  addBlog(req, res) {
    res.render("addBlog", {
      user: req.user,
    });
  }

  async newBlog(req, res) {
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
      createdBy,
    });
    await newBlog.save();
    res.redirect("/");
  }

  async handleReadBlog(req, res) {
    const blog = await BlogModel.findById(req.params.id).populate("createdBy");
    // console.log("blog", blog);
    const comments = await CommentModel.find({
      blog: `${req.params.id}`,
    }).populate("user");
    console.log("comments", comments);
    // console.log(comments[0].commentContent);
    res.render("blog", { blog, user: req.user, comments });
  }
}

export default BlogController;
