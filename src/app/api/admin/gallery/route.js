import { NextResponse } from 'next/server';
import { getGalleryData, setGalleryData } from '@/lib/data';
import { verifyAuth, unauthorized } from '@/lib/auth';

const CATEGORY_MAP = {
  'coloured-pencil': 'colouredPencil',
  'watercolour': 'watercolour',
  'acrylic-oil': 'acrylicOil',
};

export async function GET(request) {
  if (!(await verifyAuth(request))) return unauthorized();
  const data = await getGalleryData();
  return NextResponse.json(data);
}

export async function POST(request) {
  if (!(await verifyAuth(request))) return unauthorized();
  const body = await request.json();
  const { category, ...artwork } = body;

  const key = CATEGORY_MAP[category];
  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = await getGalleryData();
  data[key].push(artwork);
  await setGalleryData(data);

  const index = data[key].length - 1;
  return NextResponse.json({ id: `${category}-${index}`, ...artwork }, { status: 201 });
}
