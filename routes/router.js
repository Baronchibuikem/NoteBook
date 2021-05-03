import express from "express";
import { register, login } from "../controllers/users";
import { auth } from "../utils/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
