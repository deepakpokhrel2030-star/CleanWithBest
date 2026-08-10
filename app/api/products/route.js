import { NextResponse } from 'next/server';
import { getProducts } from '@/backend/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ success: false, products: [], error: 'Server error' }, { status: 500 });
  }
}
