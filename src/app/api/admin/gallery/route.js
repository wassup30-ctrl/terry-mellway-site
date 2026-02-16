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

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { category, ...artwork } = body;

  const key = CATEGORY_MAP[category];
  if (!key) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const data = readData();
  data[key].push(artwork);
  writeData(data);

  const index = data[key].length - 1;
  return NextResponse.json({ id: `${category}-${index}`, ...artwork }, { status: 201 });
}
