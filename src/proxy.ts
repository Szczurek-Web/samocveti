import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionToken,
} from '@/lib/admin-session';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;

    const isValid = Boolean(
      token &&
        secret &&
        (await verifyAdminSessionToken(token, secret)),
    );

    if (!isValid) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
