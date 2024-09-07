import { NextResponse } from "next/server";
import { sign, verify } from "./app/lib/utils";
import { SignJWT, jwtVerify, base64url, jwtDecrypt } from "jose";

// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
  const jwt = request.cookies.get("token");
  const url = request.url;
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    try {
      const tokenValue = await verify(jwt.value, process.env.JWT_SECRET);
      request.nextUrl.pathname = "/jobs";
      return NextResponse.redirect(request.nextUrl);
    } catch (error) {
      request.nextUrl.pathname = "/login";
      return NextResponse.redirect(request.nextUrl);
    }
  }

  //following code will handle reset_password,login,forgotpassword,root routes
  if (
    pathname.startsWith("/reset_password") ||
    pathname === "/login" ||
    pathname === "/forgotpassword" ||
    pathname === "/"
  ) {
    try {
      const tokenValue = await verify(jwt.value, process.env.JWT_SECRET);
      request.nextUrl.pathname = "/jobs";
      return NextResponse.redirect(request.nextUrl);
    } catch (error) {
      return NextResponse.next();
    }
  }

  //following code will handle all the protected routes
  try {
    const tokenValue = await verify(jwt.value, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
