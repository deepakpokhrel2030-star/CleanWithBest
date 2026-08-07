'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';

const navItems = [
  ['Home', '/'],
  ['Domestic', '/domestic'],
  ['Commercial', '/commercial'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);
  const isActive = href => pathname === href;

  return (
    <header className={`sticky top-0 z-50 border-b border-slate-200 bg-white transition-shadow ${scrolled ? 'shadow-md shadow-slate-900/5' : ''}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-4">
        <Link href="/" onClick={closeMenu} className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="/brand/cleanwithbest-mark.png"
            alt="CleanWithBest"
            width={96}
            height={80}
            priority
            className="h-11 w-auto object-contain transition group-hover:-translate-y-0.5 sm:h-12"
          />
          <span className="flex items-baseline whitespace-nowrap font-black tracking-tight leading-none text-brand-800">
            <span className="text-xl sm:text-2xl">Clean</span>
            <span className="mx-1 text-sm text-brand-500 sm:text-base">with</span>
            <span className="text-xl sm:text-2xl">Best</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-bold transition ${
                isActive(href)
                  ? 'text-brand-800'
                  : 'text-slate-600 hover:text-brand-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <a href="tel:+447503494242" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-800 hover:text-brand-600">
            <Phone size={16} className="text-accent-600" /> +44 7503 494242
          </a>
          <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-brand-100 px-3 py-2 text-sm font-bold text-brand-700 hover:bg-brand-50">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <Link href="/quote" className="btn-primary px-5 py-2.5">
            Get Free Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(open => !open)}
          className="ml-auto rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
          aria-label="Open menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-1">
              {navItems.map(([label, href]) => (
                <Link key={href} href={href} onClick={closeMenu} className={`rounded-lg px-3 py-3 text-sm font-bold ${isActive(href) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-4 grid gap-2">
              <Link href="/quote" onClick={closeMenu} className="btn-primary justify-center">
                Get Free Quote
              </Link>
              <a href="tel:+447503494242" className="btn-outline justify-center">
                <Phone size={16} /> +44 7503 494242
              </a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
