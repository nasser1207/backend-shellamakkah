import { Router } from "express";
import { verifySupabaseJwt } from "../middlewares/verifySupabaseJwt.js";

const router = Router();

router.get("/me", verifySupabaseJwt, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.sub,
      email: req.user.email,
      provider: req.user.provider,
      role: req.user.role,
    },
  });
});

export default router;
