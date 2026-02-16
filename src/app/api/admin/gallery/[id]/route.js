import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/gallery.json');

const CATEGORY_MAP = {
  'coloured-pencil': 'colouredPencil',
  'watercolour': 'watercolour',
  'acrylic-oil': 'acrylicOil',
};

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n');
}

function parseId(id) {
  // id format: "coloured-pencil-0", "watercolour-2", "acrylic-oil-5"
  const lastDash = id.lastIndexOf('-');
  const categorySlug = id.substring(0, lastDash);
  const index = parseInt(id.substring(lastDash + 1), 10);
  return { categorySlug, index };
}

export async function GET(request, { params }) {
  const { id } = await params;
  const { categorySlug, index } = parseId(id);
  const key = CATEGORY_MAP[categorySlug];

  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = readData();
  const artwork = data[key]?.[index];

  if (!artwork) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ id, category: categorySlug, ...artwork });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { categorySlug, index } = parseId(id);
  const key = CATEGORY_MAP[categorySlug];

  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = readData();
  if (!data[key]?.[index]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json();
  const { category: _cat, ...artwork } = body;
  data[key][index] = { ...data[key][index], ...artwork };
  writeData(data);

  return NextResponse.json({ id, category: categorySlug, ...data[key][index] });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { categorySlug, index } = parseId(id);
  const key = CATEGORY_MAP[categorySlug];

  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = readData();
  if (!data[key]?.[index]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  data[key].splice(index, 1);
  writeData(data);

  return NextResponse.json({ success: true });
}
