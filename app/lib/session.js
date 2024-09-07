// lib/session.js
import { withIronSessionApiRoute } from "iron-session/next";

// Ensure your secret is at least 32 characters long and complex
const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    httpOnly: true, // Helps mitigate the risk of client-side script accessing the protected cookie
    sameSite: "lax", // Adjust based on your needs, 'lax' or 'strict' is generally good for security
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
