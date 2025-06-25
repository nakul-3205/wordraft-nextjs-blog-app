import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Debug logs (remove later if you want)
  console.log(" Middleware hit - path:", pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(" Token present?", !!token);

  // Define protected routes prefixes
  const protectedRoutes = ['/profile', '/write', '/edit', '/feed'];

  // Check if current path is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !token) {
    console.log(" No token, redirecting to login");
    const loginUrl = new URL('/login', req.url);
    // Optional: Add callback so user goes back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists or route is public, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/write', '/edit/:path*', '/feed'],
};
