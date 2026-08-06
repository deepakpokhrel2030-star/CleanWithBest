'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';

const navItems = [
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
    <header className={`sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-lg shadow-slate-900/5' : 'shadow-sm'}`}>
      <div className="border-b border-slate-100 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
          <a href="tel:+447503494242" className="inline-flex min-w-0 items-center gap-2 text-sm font-extrabold tracking-tight hover:text-accent-300 sm:text-base">
            <Phone size={17} className="shrink-0 text-accent-400" />
            <span className="truncate">Call +44 7503 494242</span>
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <a href="tel:+447789602945" className="hidden text-sm font-bold text-white/70 hover:text-white md:inline">
              +44 7789 602945
            </a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-accent-500 px-3 py-1.5 text-xs font-black text-slate-950 hover:bg-accent-400">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4">
        <Link href="/" onClick={closeMenu} className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 font-heading text-base font-black text-white shadow-sm transition group-hover:bg-brand-700">C</span>
          <span className="font-heading text-xl font-extrabold tracking-tight">
            <span className="text-brand-700">Clean</span>
            <span className="text-accent-600">WithBest</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                isActive(href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Link href="/quote" className="btn-primary px-5 py-2.5">
            Get Free Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(open => !open)}
          className="ml-auto rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          aria-label="Open menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-1">
              <Link href="/" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Home</Link>
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
