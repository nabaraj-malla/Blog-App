import { BlogModel } from "../blogs/blogs.schema.js";
import { CommentModel } from "./comment.schema.js";

class CommentController {
  async addComment(req, res) {
    console.log("add comment function");
    const { commentContent } = req.body;
    // const userId = req.params.userId; since we can get user through req.user
    const blogId = req.params.blogId;
    console.log("blog", blogId);
    const comment = new CommentModel({
      commentContent,
      user: req.user._id,
      blog: blogId,
    });
    await comment.save();
    res.redirect(`/blog/${req.params.blogId}`);
    // res.redirect("/blogs/blogId");
  }
}

export default CommentController;
