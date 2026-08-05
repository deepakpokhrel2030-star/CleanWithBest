import { NextResponse } from 'next/server';
import { getQuotes, getContacts, deleteQuote, deleteContact, updateQuoteStatus, updateContactStatus } from '@/backend/db';

export async function POST(request) {
  try {
    const { username, password, action, type, id, status } = await request.json();
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@CleanBest2024';

    if (username !== adminUser || password !== adminPass) {
      return NextResponse.json({ success: false, error: 'Invalid admin login details' }, { status: 401 });
    }

    if (action === 'getData') {
      return NextResponse.json({ success: true, quotes: getQuotes(), contacts: getContacts() });
    }

    if (action === 'delete') {
      if (type === 'quote') deleteQuote(id);
      if (type === 'contact') deleteContact(id);
      return NextResponse.json({ success: true });
    }

    if (action === 'updateStatus') {
      if (type === 'quote') updateQuoteStatus(id, status);
      if (type === 'contact') updateContactStatus(id, status);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
