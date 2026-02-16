import { NextResponse } from 'next/server';
import crypto from 'crypto';

const VALID_USERNAME = 'terry';
const VALID_PASSWORD_HASH = '4ec7f65d9fa591c8418fa5292133cad4ecb11a858690cc6946f504c3efb5f7da';
const SESSION_SECRET = process.env.ADMIN_SECRET || 'tm-admin-session-key';

export function generateToken() {
  return crypto.createHmac('sha256', SESSION_SECRET).update('admin-session').digest('hex');
}

export async function POST(request) {
  const { username, password } = await request.json();

  const passwordHash = crypto.createHash('sha256').update(password || '').digest('hex');

  if (username !== VALID_USERNAME || passwordHash !== VALID_PASSWORD_HASH) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken();
  const res = NextResponse.json({ success: true });

  res.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
