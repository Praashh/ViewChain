import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // NextAuth uses 'next-auth.session-token' as the cookie name
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;

  // Also check for secure session token in case using HTTPS
  const secureSessionToken = req.cookies.get(
    "__Secure-next-auth.session-token"
  )?.value;

  if (!sessionToken && !secureSessionToken) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/marketplace/:path*"],
};
