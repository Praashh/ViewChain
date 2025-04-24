import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const tokenKey = process.env.AUTH_SECRET as string;
  const sessionToken = req.cookies.get(tokenKey)?.value 
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }
}

export const config = {
  matcher: ['/marketplace/:path*'],
};