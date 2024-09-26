import { NextResponse } from "next/server";
import { verify } from "./app/lib/utils";

// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
  const jwt = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Allow access to static files and API routes without authentication
  const publicPaths = ["/login", "/", "/services"];

  // If JWT exists and is valid, allow access to all routes
  if (jwt) {
    try {
      await verify(jwt.value, process.env.JWT_SECRET);
      return NextResponse.next(); // Proceed to the requested page if JWT is valid
    } catch (error) {
      // If JWT is invalid or expired, clear it and redirect to login
      request.cookies.delete("token");
      request.nextUrl.pathname = "/login";
      return NextResponse.redirect(request.nextUrl);
    }
  }

  // If user is not logged in and tries to access a protected route, redirect to /login
  if (!publicPaths.includes(pathname)) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }

  // Allow access to root and login pages without authentication
  return NextResponse.next();
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
