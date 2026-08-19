import express from "express";
import { login, loginEmail, registerEmail, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerEmail);
router.post("/login-email", loginEmail);
router.post("/login", login);
router.get("/logout", logout);

export default router;