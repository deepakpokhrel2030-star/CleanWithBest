import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Package, Phone, ShoppingBag, Sparkles } from 'lucide-react';
import { getProducts } from '@/backend/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cleaning Products - CleanWithBest',
  description: 'Browse cleaning products available from CleanWithBest and enquire by WhatsApp or phone.',
};

const fallbackImage = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&q=85';

function productMessage(product) {
  return encodeURIComponent(`Hello CleanWithBest, I am interested in buying ${product.name} (${product.price}).`);
}

export default async function ProductsPage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error('Products page error:', error);
  }

  return (
    <main className="bg-white">
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_45%,#ecfeff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag"><ShoppingBag size={14} className="text-accent-500" /> Cleaning products</span>
            <h1 className="hero-title">Professional cleaning supplies for your home or workplace.</h1>
            <p className="hero-copy">
              Browse products added by CleanWithBest. Message us on WhatsApp or call to check availability, arrange payment and delivery.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-primary-lg w-full sm:w-auto">
                <MessageCircle size={18} /> WhatsApp to Order
              </a>
              <a href="tel:+447503494242" className="btn-outline w-full sm:w-auto">
                <Phone size={18} /> Call Us
              </a>
            </div>
          </div>

          <div className="image-panel">
            <Image
              src={fallbackImage}
              alt="Cleaning products arranged for professional cleaning"
              width={720}
              height={820}
              priority
              className="h-[380px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white p-4 shadow-lg">
              <p className="text-xs font-bold uppercase text-brand-700">Order by message</p>
              <p className="mt-1 text-sm font-semibold text-brand-800">Ask about any product and we will confirm stock and delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="soft-section py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-tag"><Sparkles size={14} /> Shop</span>
              <h2 className="section-title">Available products</h2>
              <p className="section-sub mt-3">Products are managed from the admin dashboard and shown here when active.</p>
            </div>
            <Link href="/quote" className="btn-outline shrink-0">
              Need cleaning service? <ArrowRight size={16} />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm">
              <Package size={44} className="mx-auto mb-4 text-slate-300" />
              <h3 className="font-heading text-2xl font-bold text-brand-800">Products coming soon</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                The shop is ready. Products added in the admin dashboard will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(product => (
                <article key={product.id} className="service-card flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <img
                      src={product.imageUrl || fallbackImage}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {product.category && <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{product.category}</p>}
                    <h3 className="mt-1 font-heading text-xl font-bold text-brand-800">{product.name}</h3>
                    <p className="mt-2 text-lg font-extrabold text-brand-700">{product.price}</p>
                    {product.description && <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{product.description}</p>}
                    {product.stock && <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{product.stock}</p>}
                    <a
                      href={`https://wa.me/447503494242?text=${productMessage(product)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary mt-5 w-full"
                    >
                      <MessageCircle size={16} /> Enquire
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
