import { Router } from "express";
import { verifySupabaseJwt } from "../middlewares/verify-supabase-jwt.middleware.js";
import {
  getCurrentUser,
  login,
  signUp,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/me", verifySupabaseJwt, getCurrentUser);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
