import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import userRouter from "./features/user/user.routes.js";
import connectMongoDB from "./config/connectMongo.js";
import session from "express-session";
import auth from "./middlewares/session-middleware.js";
import cookieAuth from "./middlewares/cookie-middlewares.js";
import cookieParser from "cookie-parser";
import checkAuthentication from "./middlewares/auth.js";
import blogRouter from "./features/blogs/blogs.routes.js";
import { BlogModel } from "./features/blogs/blogs.schema.js";
import commentRouter from "./features/comments/comment.routes.js";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 4007;

// app.use(
//   session({
//     secret: "Mall@2057",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

app.set("view engine", "ejs");
// app.set("views", path.join(path.resolve(), "views"));
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
// app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkAuthentication("token"));

// session
// app.get("/", auth, (req, res) => {
//   res.render("home");
// });

// cookie
// app.get("/", cookieAuth, (req, res) => {
//   res.render("home");
// });

app.get("/", async (req, res) => {
  const allBlogs = await BlogModel.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

// app.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   //   console.log("req.cookies.nabarajCookie", req.cookies.nabarajCookie); // we can still see cookie because it has been already loaded when we clall logout routes
//   //   res.send("cookie deleted");
//   res.redirect("/");
// });

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  // if (err instanceof ApplicationError) {
  //   res.status(err.code).send(err.message);
  // }
  else {
    // logError(req.url, err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, async () => {
  console.log(`Server is listening at port no. ${PORT}`);
  connectMongoDB(process.env.MONGO_URL);
});
