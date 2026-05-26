import { NextResponse } from 'next/server';
import { addContact } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    const entry = addContact(body);
    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
