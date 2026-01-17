import { supabase } from "../config/supabase.js";

export async function googleSignIn(req, res) {
  const redirectUrl =
    `https://pvjxwysqrckitfvinlhv.supabase.co/auth/v1/authorize` +
    `?provider=google` +
    `&redirect_to=http://localhost:5000/api/v1/auth/callback`;

  res.redirect(redirectUrl);
}

export async function getCurrentUser(req, res) {
  res.json({
    success: true,
    user: {
      id: req.user.sub,
      email: req.user.email,
      provider: req.user.provider,
      role: req.user.role,
    },
  });
}

export async function signUp(req, res) {
  const { email, password, name, phone, agreeToTerms } = req.body;
  console.log(req.body);
  if (!email || !password || !name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  if (!agreeToTerms) {
    return res.status(400).json({
      success: false,
      message: "You must agree to terms and conditions",
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        agreed_to_terms: true,
      },
    },
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  console.log("token", data);
  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      name,
      phone,
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  return res.json({
    success: true,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in,
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name,
      phone: data.user.user_metadata?.phone,
      provider: "email",
    },
  });
}
