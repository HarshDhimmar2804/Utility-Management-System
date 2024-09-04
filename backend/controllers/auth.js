import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).send("Email , Password and full name is required");
    }
    const user = await User.create({ fullName, email, password });
    res.cookie("jwtt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal server Error");
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required");
    }
    const user = await User.findOne({ email }).select(
      "email password fullName"
    );
    if (!user) {
      return res.status(400).send("User with given email not found");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect");
    }

    res.cookie("jwtt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    console.log({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal server Error");
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwtt", "", { maxAge: 1, secure: true, sameSite: "None" });
    return res.status(200).send("Logout  successfully");
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal server Error");
  }
};

export const checkUser = async (req, res) => {
  const token = req.cookies.jwtt; // Get the token from cookies
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace with your secret key
    return res.status(200).json({ isAuthenticated: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
