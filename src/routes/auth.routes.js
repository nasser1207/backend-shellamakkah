import { Router } from "express";
import { verifySupabaseJwt } from "../middlewares/verify-supabase-jwt.middleware.js";
const router = Router();

router.get("/google", (req, res) => {
  const redirectUrl =
    `https://pvjxwysqrckitfvinlhv.supabase.co/auth/v1/authorize` +
    `?provider=google` +
    `&redirect_to=http://localhost:5000/api/v1/auth/callback`;

  res.redirect(redirectUrl);
});

router.get("/callback", (req, res) => {
  res.sendFile("oauth-callback.html", {
    root: "src/public",
  });
});

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
