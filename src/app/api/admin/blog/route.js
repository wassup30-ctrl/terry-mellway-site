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

export async function GET() {
  const data = readData();
  return NextResponse.json(data.posts);
}

export async function POST(request) {
  const post = await request.json();

  if (!post.slug || !post.title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
  }

  const data = readData();

  if (data.posts.some(p => p.slug === post.slug)) {
    return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
  }

  data.posts.unshift(post);
  writeData(data);

  return NextResponse.json(post, { status: 201 });
}
