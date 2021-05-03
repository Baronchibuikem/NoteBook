import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/users";
import {
  getAllCurrentUserPost,
  addPost,
  addCategory,
  getCategory,
  getUserPostbyId,
  deletePost,
} from "../controllers/posts";
import { auth } from "../utils/auth";

const router = express.Router();

// for managing users
router.post("/register", register);
router.post("/login", login);
router.get("/users", auth, getAllUsers);
router.get("/user/:userId", auth, getUserById);
router.delete("/user/delete/:userId", auth, deleteUser);

// for managing post
router.get("/posts", auth, getAllCurrentUserPost);
router.post("/post/addpost", auth, addPost);
router.post("/addCategory", auth, addCategory);
router.get("/categories", auth, getCategory);
router.get("/post/:userId", auth, getUserPostbyId);
router.delete("/post/delete/:id", auth, deletePost);

export default router;
