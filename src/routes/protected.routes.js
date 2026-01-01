import { Router } from "express";
import { verifySupabaseJwt } from "../middlewares/verify-supabase-jwt.middleware.js";

const router = Router();

router.get("/secure-data", verifySupabaseJwt, (req, res) => {
  res.json({
    success: true,
    message: "You are authenticated",
    userId: req.user.sub,
  });
});

export default router;
