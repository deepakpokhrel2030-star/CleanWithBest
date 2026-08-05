import { NextResponse } from 'next/server';
import { addContact } from '@/backend/db';
import { getSessionUser, sessionTokenFrom } from '@/backend/auth';

export async function POST(request) {
  try {
    const user = getSessionUser(sessionTokenFrom(request));
    if (!user) {
      return NextResponse.json({ success: false, error: 'Please login before sending a company message.' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.subject || !body.message) {
      return NextResponse.json({ success: false, error: 'Subject and message are required.' }, { status: 400 });
    }

    const entry = addContact({
      name: user.name,
      email: user.email,
      phone: user.phone,
      subject: body.subject,
      message: body.message,
      source: 'customer-account',
      userId: user.id,
    });

    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    console.error('Message API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
