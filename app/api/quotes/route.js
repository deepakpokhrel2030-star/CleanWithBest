import { NextResponse } from 'next/server';
import { addQuote } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.firstName || !body.email || !body.service) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    const entry = addQuote(body);
    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
