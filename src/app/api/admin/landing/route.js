import { NextResponse } from 'next/server';
import { getLandingData, setLandingData } from '@/lib/data';
import { verifyAuth, unauthorized } from '@/lib/auth';

export async function GET(request) {
  if (!(await verifyAuth(request))) return unauthorized();
  const data = await getLandingData();
  return NextResponse.json(data);
}

export async function PUT(request) {
  if (!(await verifyAuth(request))) return unauthorized();
  const data = await request.json();
  await setLandingData(data);
  return NextResponse.json(data);
}
