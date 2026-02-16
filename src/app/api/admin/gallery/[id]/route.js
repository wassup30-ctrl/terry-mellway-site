import { NextResponse } from 'next/server';
import { getGalleryData, setGalleryData } from '@/lib/data';
import { verifyAuth, unauthorized } from '@/lib/auth';

const CATEGORY_MAP = {
  'coloured-pencil': 'colouredPencil',
  'watercolour': 'watercolour',
  'acrylic-oil': 'acrylicOil',
};

function parseId(id) {
  const lastDash = id.lastIndexOf('-');
  const categorySlug = id.substring(0, lastDash);
  const index = parseInt(id.substring(lastDash + 1), 10);
  return { categorySlug, index };
}

export async function GET(request, { params }) {
  if (!(await verifyAuth(request))) return unauthorized();
  const { id } = await params;
  const { categorySlug, index } = parseId(id);
  const key = CATEGORY_MAP[categorySlug];

  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = await getGalleryData();
  const artwork = data[key]?.[index];

  if (!artwork) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ id, category: categorySlug, ...artwork });
}

export async function PUT(request, { params }) {
  if (!(await verifyAuth(request))) return unauthorized();
  const { id } = await params;
  const { categorySlug, index } = parseId(id);
  const key = CATEGORY_MAP[categorySlug];

  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = await getGalleryData();
  if (!data[key]?.[index]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json();
  const { category: _cat, ...artwork } = body;
  data[key][index] = { ...data[key][index], ...artwork };
  await setGalleryData(data);

  return NextResponse.json({ id, category: categorySlug, ...data[key][index] });
}

export async function DELETE(request, { params }) {
  if (!(await verifyAuth(request))) return unauthorized();
  const { id } = await params;
  const { categorySlug, index } = parseId(id);
  const key = CATEGORY_MAP[categorySlug];

  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = await getGalleryData();
  if (!data[key]?.[index]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  data[key].splice(index, 1);
  await setGalleryData(data);

  return NextResponse.json({ success: true });
}
