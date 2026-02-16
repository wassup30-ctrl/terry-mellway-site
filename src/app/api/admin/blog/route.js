import { NextResponse } from 'next/server';
import { getBlogData, setBlogData } from '@/lib/data';
import { verifyAuth, unauthorized } from '@/lib/auth';

export async function GET(request) {
  if (!(await verifyAuth(request))) return unauthorized();
  const data = await getBlogData();
  return NextResponse.json(data.posts);
}

export async function POST(request) {
  if (!(await verifyAuth(request))) return unauthorized();
  const post = await request.json();

  if (!post.slug || !post.title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
  }

  const data = await getBlogData();

  if (data.posts.some(p => p.slug === post.slug)) {
    return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
  }

  data.posts.unshift(post);
  await setBlogData(data);

  return NextResponse.json(post, { status: 201 });
}
