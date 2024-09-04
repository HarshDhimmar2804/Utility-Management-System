import { Router } from "express";
import { login, signup, logout, checkUser } from "../controllers/auth.js";

const auth = Router();

auth.post("/signup", signup);
auth.post("/login", login);
auth.get("/logout", logout);
auth.get("/check", checkUser);

export default auth;
