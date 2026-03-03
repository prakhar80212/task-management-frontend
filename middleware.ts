import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  const accessToken = request.cookies.get("accessToken");

  // Check if accessing protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // If no tokens, redirect to login
    if (!refreshToken && !accessToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Clear any remaining cookies
      response.cookies.delete("refreshToken");
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};