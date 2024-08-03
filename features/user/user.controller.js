import { UserModel } from "./user.schema.js";
import { getToken } from "../../middlewares/jwt.middleware.js";
import { verifyToken } from "../../middlewares/jwt.middleware.js";
import bcrypt from "bcrypt";

class UserController {
  async renderSignin(req, res) {
    return res.render("signin");
  }

  async renderSignup(req, res) {
    return res.render("signup");
  }

  async signup(req, res) {
    const { fullName, email, password } = req.body;
    console.log("req.file", req.file);
    let { filename } = req.file;
    console.log("profileImageURL", filename);
    const profileImageURL = "/images/" + filename;
    const newUser = new UserModel({
      fullName,
      email,
      password,
      profileImageURL,
    });
    await newUser.save();
    return res.redirect("/");
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      console.log("user", user);
      const result = await bcrypt.compare(password, user.password);
      console.log("result", result);
      if (user && result) {
        const token = getToken(user);
        console.log("token", token);
        if (token) return res.cookie("token", token).redirect("/");
      } else {
        res.render("signin", {
          Myerror: "Invalid credentials",
        });
      }
    } catch (error) {
      res.render("signin", {
        Myerror: "Invalid credentials",
      });
    }
  }

  logout(req, res) {
    res.clearCookie("token").redirect("/");
  }
  //   async singin(req, res) {
  //     const { email, password } = req.body;
  //     const user = await UserModel.findOne({ email });

  //     if (!user) {
  //       return res.redirect("/user/signin");
  //     }

  //     console.log("user after signin", user);
  //     const result = await bcrypt.compare(password, user.password);
  //     console.log("result", result);
  //     if (result) {
  //       // session
  //       //   req.session.userEmail = email;
  //       // cookie
  //       //   let cookieData = {
  //       //     email: email,
  //       //     name: "nabaraj",
  //       //   };
  //       //   res.cookie("nabarajCookie", cookieData);
  //     }
  //   }
}

export default UserController;
