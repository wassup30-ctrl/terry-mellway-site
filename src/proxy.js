import { NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_SECRET = process.env.ADMIN_SECRET || 'tm-admin-session-key';

function computeToken() {
  return crypto.createHmac('sha256', SESSION_SECRET).update('admin-session').digest('hex');
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API
  if (
    pathname === '/admin/login' ||
    pathname === '/admin/login/' ||
    pathname.startsWith('/api/admin/auth')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;
  const expected = computeToken();

  if (!token || token !== expected) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
