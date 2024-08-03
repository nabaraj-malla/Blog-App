import express from "express";
import UserController from "./user.controller.js";
import { upload } from "../../middlewares/file-upload.middleware.js";

const userRouter = express.Router();
const userController = new UserController();
userRouter.get("/signup", userController.renderSignup);
userRouter.get("/signin", userController.renderSignin);
userRouter.post(
  "/signup",
  upload.single("profileImageURL"),
  userController.signup
);
userRouter.post("/signin", userController.signin);
userRouter.get("/logout", userController.logout);

export default userRouter;
