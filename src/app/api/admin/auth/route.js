import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

const VALID_USERNAME = 'terry';
const VALID_PASSWORD_HASH = '4ec7f65d9fa591c8418fa5292133cad4ecb11a858690cc6946f504c3efb5f7da';
const SESSION_SECRET = process.env.ADMIN_SECRET || 'tm-admin-session-key';

async function sha256hex(input) {
  const enc = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', enc.encode(input));
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generateToken() {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('admin-session'));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function GET(request) {
  if (await verifyAuth(request)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(request) {
  const { username, password } = await request.json();

  const passwordHash = await sha256hex(password || '');

  if (username !== VALID_USERNAME || passwordHash !== VALID_PASSWORD_HASH) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await generateToken();
  const res = NextResponse.json({ success: true });

  res.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
