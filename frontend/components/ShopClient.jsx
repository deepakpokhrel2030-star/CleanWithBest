'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Minus, Package, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';

const fallbackImage = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=900&q=85';

function priceToPence(price = '') {
  const match = String(price).replace(/,/g, '').match(/(\d+(?:\.\d{1,2})?)/);
  if (!match) return 0;
  return Math.round(Number(match[1]) * 100);
}

function money(pence) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(pence / 100);
}

export default function ShopClient({ products }) {
  const [basket, setBasket] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    try {
      const savedBasket = JSON.parse(window.localStorage.getItem('cleanwithbest:basket') || '[]');
      if (Array.isArray(savedBasket)) setBasket(savedBasket);
    } catch {
      setBasket([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cleanwithbest:basket', JSON.stringify(basket));
  }, [basket]);

  const productMap = useMemo(() => new Map(products.map(product => [product.id, product])), [products]);
  const basketItems = basket
    .map(item => ({ ...item, product: productMap.get(item.id) }))
    .filter(item => item.product);
  const subtotal = basketItems.reduce((total, item) => total + priceToPence(item.product.price) * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 5000 ? 499 : 0;
  const total = subtotal + shipping;
  const itemCount = basket.reduce((total, item) => total + item.quantity, 0);

  const addToBasket = product => {
    setCheckoutError('');
    setBasket(current => {
      const found = current.find(item => item.id === product.id);
      if (found) {
        return current.map(item => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, 20) } : item);
      }
      return [...current, { id: product.id, quantity: 1 }];
    });
  };

  const updateQuantity = (id, nextQuantity) => {
    setBasket(current => current
      .map(item => item.id === id ? { ...item, quantity: Math.max(1, Math.min(20, nextQuantity)) } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const removeItem = id => {
    setBasket(current => current.filter(item => item.id !== id));
  };

  const checkout = async () => {
    setCheckingOut(true);
    setCheckoutError('');
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: basket }),
    });
    const json = await res.json();
    setCheckingOut(false);

    if (!json.success) {
      setCheckoutError(json.error || 'Could not start checkout.');
      return;
    }

    window.location.href = json.url;
  };

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_45%,#ecfeff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag"><ShoppingBag size={14} className="text-accent-500" /> CleanWithBest shop</span>
            <h1 className="hero-title">Cleaning products delivered anywhere in the UK.</h1>
            <p className="hero-copy">
              Buy cleaning supplies directly online. Add products to your basket, pay securely, and we will arrange UK delivery.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#products" className="btn-primary-lg w-full sm:w-auto">
                Shop Products <ArrowRight size={18} />
              </a>
              <div className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-100 bg-white px-5 py-3 text-sm font-bold text-brand-800 shadow-sm">
                <Truck size={18} className="text-accent-600" /> UK delivery
              </div>
            </div>
          </div>

          <div className="image-panel">
            <img
              src={fallbackImage}
              alt="Cleaning products arranged for online shopping"
              className="h-[380px] w-full object-cover md:h-[500px]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white p-4 shadow-lg">
              <p className="text-xs font-bold uppercase text-brand-700">Secure online checkout</p>
              <p className="mt-1 text-sm font-semibold text-brand-800">Free UK delivery on orders over £50.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="soft-section py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <div className="mb-8">
              <span className="section-tag">Shop</span>
              <h2 className="section-title">Available products</h2>
              <p className="section-sub mt-3">Choose your cleaning products and checkout for UK delivery.</p>
            </div>

            {products.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm">
                <Package size={44} className="mx-auto mb-4 text-slate-300" />
                <h3 className="font-heading text-2xl font-bold text-brand-800">No products available now</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-500">Come back later.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {products.map(product => (
                  <article key={product.id} className="service-card flex h-full flex-col overflow-hidden p-0">
                    <div className="aspect-[4/3] bg-slate-100">
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
                      <button type="button" onClick={() => addToBasket(product)} className="btn-primary mt-5 w-full">
                        <Plus size={16} /> Add to Basket
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="sticky top-28 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-brand-800">Basket</h2>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{itemCount} items</span>
            </div>

            {basketItems.length === 0 ? (
              <div className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
                Your basket is empty.
              </div>
            ) : (
              <div className="space-y-4">
                {basketItems.map(({ id, quantity, product }) => (
                  <div key={id} className="rounded-lg border border-slate-100 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">{product.name}</p>
                        <p className="text-sm font-semibold text-brand-700">{product.price}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${product.name}`}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button type="button" onClick={() => updateQuantity(id, quantity - 1)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label={`Decrease ${product.name}`}>
                        <Minus size={14} />
                      </button>
                      <span className="flex h-9 w-10 items-center justify-center rounded-lg bg-slate-50 text-sm font-bold text-slate-800">{quantity}</span>
                      <button type="button" onClick={() => updateQuantity(id, quantity + 1)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label={`Increase ${product.name}`}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <div className="flex justify-between text-slate-600"><span>UK delivery</span><span>{shipping ? money(shipping) : 'Free'}</span></div>
                  <div className="flex justify-between text-lg font-extrabold text-brand-800"><span>Total</span><span>{money(total)}</span></div>
                </div>

                {checkoutError && <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">{checkoutError}</p>}
                <button type="button" onClick={checkout} disabled={checkingOut || basketItems.length === 0} className="btn-primary w-full">
                  <ShoppingBag size={16} /> {checkingOut ? 'Starting checkout...' : 'Checkout Securely'}
                </button>
                <p className="text-xs leading-relaxed text-slate-400">Payment is processed securely. Delivery is available to UK addresses only.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
