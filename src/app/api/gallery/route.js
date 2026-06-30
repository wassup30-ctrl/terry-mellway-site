import { NextResponse } from 'next/server';
import { getGalleryData } from '@/lib/data';

// Always read fresh from the data layer (KV) so admin edits show immediately.
export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getGalleryData();
  return NextResponse.json(data);
}
