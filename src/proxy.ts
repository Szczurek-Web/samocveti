import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

function verifyTokenEdge(token: string, secret: string): boolean {
  const parts = token.split(':');
  if (parts.length < 2) return false;
  const payload = parts.slice(0, -1).join(':');
  const signature = parts[parts.length - 1];
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !pathname.startsWith('/admin/logout')) {
    const token = request.cookies.get('admin-token')?.value;
    const secret = process.env.ADMIN_PASSWORD || 'fallback-secret-key';
    
    const isValid = token ? verifyTokenEdge(token, secret) : false;
    
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
