import { NextResponse } from 'next/server';
import { clearSession, clearSessionCookie, sessionTokenFrom } from '@/backend/auth';

export async function POST(request) {
  const token = sessionTokenFrom(request);
  clearSession(token);
  const response = NextResponse.json({ success: true });
  return clearSessionCookie(response);
}
