import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentContent: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("comment", commentSchema);
