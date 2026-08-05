import { NextResponse } from 'next/server';
import { getSessionUser, sessionTokenFrom } from '@/backend/auth';

export async function GET(request) {
  const user = getSessionUser(sessionTokenFrom(request));
  return NextResponse.json({ success: true, user });
}
