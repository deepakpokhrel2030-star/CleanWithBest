'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { commercialServices, domesticServices } from '@/frontend/lib/services';

const navItems = [
  ['About', '/about'],
  ['Contact', '/contact'],
];

const serviceGroups = [
  { label: 'Domestic', href: '/domestic', items: domesticServices },
  { label: 'Commercial', href: '/commercial', items: commercialServices },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    setMobileGroup(null);
  };
  const isActive = href => pathname === href;
  const isServiceActive = group => pathname === group.href || group.items.some(item => pathname === `/services/${item.slug}`);

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
          <Link
            href="/"
            className={`text-sm font-bold transition ${isActive('/') ? 'text-brand-800' : 'text-slate-600 hover:text-brand-800'}`}
          >
            Home
          </Link>
          {serviceGroups.map(group => (
            <div key={group.label} className="group relative">
              <Link
                href={group.href}
                className={`inline-flex items-center gap-1.5 py-6 text-sm font-bold transition ${
                  isServiceActive(group) ? 'text-brand-800' : 'text-slate-600 hover:text-brand-800'
                }`}
              >
                {group.label} <ChevronDown size={15} className="transition group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 bg-white p-3 opacity-0 shadow-2xl shadow-slate-900/12 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="mb-2 flex items-center justify-between px-2">
                  <Link href={group.href} className="text-sm font-extrabold text-brand-800 hover:text-brand-600">
                    View all {group.label.toLowerCase()}
                  </Link>
                  <span className="text-xs font-bold uppercase text-slate-400">{group.items.length} services</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map(item => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="rounded-lg px-3 py-2.5 transition hover:bg-brand-50"
                    >
                      <span className="block text-sm font-bold text-slate-900">{item.shortTitle}</span>
                      <span className="mt-0.5 block text-xs font-semibold text-brand-700">{item.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
              <Link href="/" onClick={closeMenu} className={`rounded-lg px-3 py-3 text-sm font-bold ${isActive('/') ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                Home
              </Link>
              {serviceGroups.map(group => (
                <div key={group.label} className="rounded-lg border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setMobileGroup(current => current === group.label ? null : group.label)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-bold ${isServiceActive(group) ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {group.label}
                    <ChevronDown size={16} className={`transition ${mobileGroup === group.label ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileGroup === group.label && (
                    <div className="border-t border-slate-100 bg-slate-50 p-2">
                      <Link href={group.href} onClick={closeMenu} className="block rounded-md px-3 py-2 text-sm font-bold text-brand-700 hover:bg-white">
                        View all {group.label.toLowerCase()}
                      </Link>
                      {group.items.map(item => (
                        <Link key={item.slug} href={`/services/${item.slug}`} onClick={closeMenu} className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
                          {item.shortTitle}
                          <span className="ml-2 text-xs font-bold text-brand-600">{item.price}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {navItems.filter(([, href]) => href !== '/').map(([label, href]) => (
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
