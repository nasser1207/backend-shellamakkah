import { Router } from "express";
import { supabase } from "../config/supabase.js";

const router = Router();

router.get("/ping", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: "Supabase connected successfully",
    data,
  });
});

export default router;
