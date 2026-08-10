import Link from 'next/link';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export const metadata = {
  title: 'Order Received - CleanWithBest',
};

export default function ShopSuccessPage({ searchParams }) {
  return (
    <main className="bg-white">
      <section className="soft-section py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <CheckCircle size={34} />
          </div>
          <span className="section-tag"><ShoppingBag size={14} /> Shop order</span>
          <h1 className="font-heading text-4xl font-extrabold text-brand-800">Thank you for your order.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Your payment has been received. We will prepare your cleaning products and arrange delivery to your UK address.
          </p>
          {searchParams?.order && (
            <p className="mt-4 text-sm font-bold text-slate-400">Order #{searchParams.order}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-primary">Continue Shopping</Link>
            <Link href="/" className="btn-outline">Back Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
