import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";

const user = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
    minLength: [8, "Password must contain at least 8 character"],
    select: false,
  },
});

// //for hashing password
// user.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// //for comparing password with hashed password
// user.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// //generating json web token
// user.methods.generateJsonWebToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// user.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   return resetToken;
// };

user.pre("save", async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

export default mongoose.model("User", user);
