import { NextResponse } from 'next/server';

const SESSION_SECRET = process.env.ADMIN_SECRET || 'tm-admin-session-key';

async function computeToken() {
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

export async function verifyAuth(request) {
  const token = request.cookies.get('admin_token')?.value;
  const expected = await computeToken();
  return !!(token && token === expected);
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
