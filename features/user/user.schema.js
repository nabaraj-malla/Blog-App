import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /([a-zA-Z0-9_\-]+)@user\.([a-zA-Z0-9]{3,5})/,
        "Enter valid email address",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      match: [
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[\S]{8,}/,
        "password validation failed",
      ],
    },
    profileImageURL: {
      type: String,
      default: "/images/defaultProfile.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.log("prehook");
  console.log(this);
  const user = this;
  // if (!user.isModified(user.password)) {
  //   next();
  // }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  console.log("hashedPasword", hashedPassword);
  user.password = hashedPassword;
  console.log("before save user", user);
  next();
});

export const UserModel = mongoose.model("user", userSchema);
