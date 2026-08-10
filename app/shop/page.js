import { getProducts } from '@/backend/db';
import ShopClient from '@/frontend/components/ShopClient';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Shop - CleanWithBest',
  description: 'Shop cleaning products from CleanWithBest with secure online payment and UK delivery.',
};

export default async function ShopPage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Shop page error:', error);
  }

  return (
    <main className="bg-white">
      <ShopClient products={products} />
    </main>
  );
}
