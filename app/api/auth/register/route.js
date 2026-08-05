import { NextResponse } from 'next/server';
import { createSession, registerUser, setSessionCookie } from '@/backend/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ success: false, error: 'Name, email and password are required.' }, { status: 400 });
    }
    if (body.password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const user = registerUser(body);
    const session = createSession(user.id);
    const response = NextResponse.json({ success: true, user });
    return setSessionCookie(response, session.token);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || 'Registration failed.' }, { status: 400 });
  }
}
