import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifyAdminPassword } from '@/backend/adminAuth';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export async function POST(request) {
  try {
    const adminUser = process.env.ADMIN_USERNAME?.trim();
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
    if (!adminUser || !adminPasswordHash) {
      return NextResponse.json({ success: false, error: 'Admin login is not configured' }, { status: 500 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Image upload is not configured yet. Add a Vercel Blob store and BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (username !== adminUser || !verifyAdminPassword(password, adminPasswordHash)) {
      return NextResponse.json({ success: false, error: 'Invalid admin login details' }, { status: 401 });
    }

    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, error: 'Only JPG, PNG, WEBP or GIF images are allowed' }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ success: false, error: 'Image must be smaller than 5MB' }, { status: 400 });
    }

    const extension = file.name?.includes('.') ? file.name.split('.').pop() : file.type.split('/').pop();
    const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Admin upload API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
