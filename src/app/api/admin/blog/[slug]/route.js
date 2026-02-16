import { NextResponse } from 'next/server';
import { getBlogData, setBlogData } from '@/lib/data';
import { verifyAuth, unauthorized } from '@/lib/auth';

export async function GET(request, { params }) {
  if (!(await verifyAuth(request))) return unauthorized();
  const { slug } = await params;
  const data = await getBlogData();
  const post = data.posts.find(p => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  if (!(await verifyAuth(request))) return unauthorized();
  const { slug } = await params;
  const body = await request.json();
  const data = await getBlogData();
  const index = data.posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  data.posts[index] = { ...data.posts[index], ...body };
  await setBlogData(data);

  return NextResponse.json(data.posts[index]);
}

export async function DELETE(request, { params }) {
  if (!(await verifyAuth(request))) return unauthorized();
  const { slug } = await params;
  const data = await getBlogData();
  const index = data.posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  data.posts.splice(index, 1);
  await setBlogData(data);

  return NextResponse.json({ success: true });
}
