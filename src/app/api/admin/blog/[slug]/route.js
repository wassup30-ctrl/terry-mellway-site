import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/blog.json');

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n');
}

export async function GET(request, { params }) {
  const { slug } = await params;
  const data = readData();
  const post = data.posts.find(p => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  const body = await request.json();
  const data = readData();
  const index = data.posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  data.posts[index] = { ...data.posts[index], ...body };
  writeData(data);

  return NextResponse.json(data.posts[index]);
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  const data = readData();
  const index = data.posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  data.posts.splice(index, 1);
  writeData(data);

  return NextResponse.json({ success: true });
}
