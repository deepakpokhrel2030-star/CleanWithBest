import { NextResponse } from 'next/server';
import { authenticateUser, createSession, setSessionCookie } from '@/backend/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const user = authenticateUser(body);
    const session = createSession(user.id);
    const response = NextResponse.json({ success: true, user });
    return setSessionCookie(response, session.token);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Login failed.' }, { status: 401 });
  }
}
