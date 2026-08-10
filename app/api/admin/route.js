import { NextResponse } from 'next/server';
import {
  getQuotes,
  getContacts,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteQuote,
  deleteContact,
  updateQuoteStatus,
  updateContactStatus,
} from '@/backend/db';
import { verifyAdminPassword } from '@/backend/adminAuth';

export const runtime = 'nodejs';

function cleanProduct(product = {}) {
  return {
    name: String(product.name || '').trim(),
    price: String(product.price || '').trim(),
    category: String(product.category || '').trim(),
    description: String(product.description || '').trim(),
    imageUrl: String(product.imageUrl || '').trim(),
    stock: String(product.stock || '').trim(),
  };
}

export async function POST(request) {
  try {
    const { username, password, action, type, id, status, product } = await request.json();
    const loginUsername = String(username || '').trim();
    const loginPassword = String(password || '').trim();
    const adminUser = process.env.ADMIN_USERNAME?.trim();
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

    if (!adminUser || !adminPasswordHash) {
      return NextResponse.json({ success: false, error: 'Admin login is not configured' }, { status: 500 });
    }

    if (loginUsername !== adminUser || !verifyAdminPassword(loginPassword, adminPasswordHash)) {
      return NextResponse.json({ success: false, error: 'Invalid admin login details' }, { status: 401 });
    }

    if (action === 'getData') {
      const [quotes, contacts, products] = await Promise.all([
        getQuotes(),
        getContacts(),
        getProducts({ includeInactive: true }),
      ]);
      return NextResponse.json({ success: true, quotes, contacts, products });
    }

    if (action === 'saveProduct') {
      const cleanedProduct = cleanProduct(product);
      if (!cleanedProduct.name || !cleanedProduct.price) {
        return NextResponse.json({ success: false, error: 'Product name and price are required' }, { status: 400 });
      }

      const productStatus = status === 'inactive' ? 'inactive' : 'active';
      const savedProduct = id
        ? await updateProduct(id, cleanedProduct, productStatus)
        : await addProduct(cleanedProduct, productStatus);

      return NextResponse.json({ success: true, product: savedProduct });
    }

    if (action === 'delete') {
      if (type === 'quote') await deleteQuote(id);
      if (type === 'contact') await deleteContact(id);
      if (type === 'product') await deleteProduct(id);
      return NextResponse.json({ success: true });
    }

    if (action === 'updateStatus') {
      if (type === 'quote') await updateQuoteStatus(id, status);
      if (type === 'contact') await updateContactStatus(id, status);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
