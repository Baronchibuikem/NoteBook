import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/users";
import { auth } from "../utils/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", auth, getAllUsers);
router.get("/user/:userId", auth, getUserById);
router.delete("/user/delete/:userId", auth, deleteUser);

export default router;
