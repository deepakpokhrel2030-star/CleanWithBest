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
    <header className={`sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl transition-shadow ${scrolled ? 'shadow-lg shadow-slate-900/5' : ''}`}>
      <div className="bg-brand-800 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs font-semibold">
          <a href="tel:+447503494242" className="inline-flex min-w-0 items-center gap-2 hover:text-accent-400">
            <Phone size={14} className="shrink-0 text-accent-400" />
            <span className="truncate">24/7 quotes: +44 7503 494242</span>
          </a>
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <a href="tel:+447789602945" className="hidden hover:text-accent-400 sm:inline">+44 7789 602945</a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-white ring-1 ring-white/15 hover:bg-white/15">
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center gap-5 px-4">
        <Link href="/" onClick={closeMenu} className="group flex shrink-0 items-center">
          <Image
            src="/brand/cleanwithbest-logo.png"
            alt="CleanWithBest"
            width={220}
            height={138}
            priority
            className="h-16 w-auto object-contain transition group-hover:-translate-y-0.5"
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg bg-slate-100/80 p-1 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                isActive(href)
                  ? 'bg-white text-brand-800 shadow-sm'
                  : 'text-slate-600 hover:bg-white/70 hover:text-brand-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-brand-800">About</Link>
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
              <Link href="/about" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">About</Link>
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
