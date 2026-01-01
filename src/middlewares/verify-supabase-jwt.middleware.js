import { jwtVerify, createRemoteJWKSet } from "jose";

const SUPABASE_PROJECT_URL = process.env.SUPABASE_URL;
const SUPABASE_JWKS_URL = new URL(
  `${SUPABASE_PROJECT_URL}/auth/v1/.well-known/jwks.json`
);

const JWKS = createRemoteJWKSet(SUPABASE_JWKS_URL);

export async function verifySupabaseJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${SUPABASE_PROJECT_URL}/auth/v1`,
      audience: "authenticated",
    });

    req.user = payload;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
