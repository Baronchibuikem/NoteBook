import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/users";
import { getAllCurrentUserPost, addPost } from "../controllers/posts";
import { auth } from "../utils/auth";

const router = express.Router();

// for managing users
router.post("/register", register);
router.post("/login", login);
router.get("/users", auth, getAllUsers);
router.get("/user/:userId", auth, getUserById);
router.delete("/user/delete/:userId", auth, deleteUser);

// for managing post
router.get("/user/:username/posts", auth, getAllCurrentUserPost);
router.post("/user/addpost", auth, addPost);

export default router;
