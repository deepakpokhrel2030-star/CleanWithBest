'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown, Mail } from 'lucide-react';

const nav = [
  {
    label: 'Domestic',
    href: '/domestic',
    mega: [
      { heading: 'Regular Services', links: [
        { label: 'Regular Home Cleaning', href: '/domestic#regular', tag: null },
        { label: 'Deep Cleaning', href: '/domestic#deep', tag: null },
        { label: 'End of Tenancy Cleaning', href: '/domestic#end-of-tenancy', tag: 'Popular' },
        { label: 'Move In / Move Out', href: '/domestic#move', tag: null },
      ]},
      { heading: 'Specialist Cleans', links: [
        { label: 'Carpet & Upholstery Cleaning', href: '/domestic#carpet', tag: null },
        { label: 'Mattress Cleaning', href: '/domestic#mattress', tag: null },
        { label: 'Ironing & Laundry', href: '/domestic#ironing', tag: null },
        { label: 'Window Cleaning', href: '/domestic#windows', tag: null },
      ]},
    ],
  },
  {
    label: 'Commercial',
    href: '/commercial',
    mega: [
      { heading: 'Business Cleaning', links: [
        { label: 'Office Cleaning', href: '/commercial#office', tag: 'Popular' },
        { label: 'Retail Cleaning', href: '/commercial#retail', tag: null },
        { label: 'Restaurant & Hospitality', href: '/commercial#restaurant', tag: null },
        { label: 'Gym & Fitness Centers', href: '/commercial#gym', tag: null },
      ]},
      { heading: 'Specialist Commercial', links: [
        { label: 'School & Education', href: '/commercial#school', tag: null },
        { label: 'Warehouse & Industrial', href: '/commercial#warehouse', tag: null },
        { label: 'Washroom Services', href: '/commercial#washroom', tag: null },
        { label: 'Medical & Healthcare', href: '/commercial#medical', tag: null },
      ]},
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    mega: [
      { heading: 'Company', links: [
        { label: 'Our Story', href: '/about', tag: null },
        { label: 'Our Team', href: '/about#team', tag: null },
        { label: 'Our Values', href: '/about#values', tag: null },
        { label: 'Accreditations', href: '/about#accreditations', tag: null },
      ]},
      { heading: 'Trust', links: [
        { label: 'Why Choose Us', href: '/#why-us', tag: null },
        { label: 'Areas We Cover', href: '/#areas', tag: null },
        { label: 'FAQs', href: '/#faq', tag: null },
      ]},
    ],
  },
  { label: 'Contact', href: '/contact', mega: null },
];

export default function Header() {
  const [open, setOpen] = useState(null); // desktop mega open
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const leaveTimer = useRef(null);

  const handleNavEnter = (label) => {
    clearTimeout(leaveTimer.current);
    setOpen(label);
  };
  const handleNavLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(null), 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = e => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => { setMobileOpen(false); setMobileExpanded(null); };

  return (
    <>
      {/* ── Top bar ── */}
      <div className="bg-brand-950 text-slate-300 text-xs py-2 hidden md:block" style={{ backgroundColor: '#050e1f' }}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a href="tel:+447789602945" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} /> +44 7789 602945
            </a>
            <a href="mailto:cleanwithbest@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={11} /> cleanwithbest@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>✓ 100% Satisfaction Guaranteed</span>
            <span>·</span>
            <span>£10M Public Liability</span>
            <span>·</span>
            <span>Mon–Fri 8am–6pm</span>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm border-b border-slate-100'}`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center h-[68px] gap-6">

          {/* Logo */}
          <Link href="/" onClick={closeAll} className="font-heading text-[22px] font-extrabold tracking-tight shrink-0">
            <span className="text-brand-600">Clean</span>
            <span className="text-accent-600">WithBest</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {nav.map(item => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.mega && handleNavEnter(item.label)}
                onMouseLeave={handleNavLeave}>
                {item.mega ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${open === item.label ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'}`}
                    >
                      {item.label}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${open === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Mega dropdown */}
                    {open === item.label && (
                      <div
                        className="absolute top-full left-0 bg-white rounded-2xl shadow-2xl border border-slate-100 pt-6 pb-5 px-5 z-50 min-w-[440px] grid grid-cols-2 gap-5"
                        onMouseEnter={() => handleNavEnter(item.label)}
                        onMouseLeave={handleNavLeave}
                      >
                        {item.mega.map(col => (
                          <div key={col.heading}>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">{col.heading}</p>
                            <div className="space-y-0.5">
                              {col.links.map(l => (
                                <Link key={l.href} href={l.href} onClick={() => setOpen(null)}
                                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all group">
                                  <span>{l.label}</span>
                                  {l.tag && <span className="text-xs bg-brand-100 text-brand-600 font-semibold px-2 py-0.5 rounded-full">{l.tag}</span>}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="col-span-2 border-t border-slate-100 pt-3 mt-1 flex items-center justify-between">
                          <span className="text-xs text-slate-400">View all {item.label.toLowerCase()} services</span>
                          <Link href={item.href} onClick={() => setOpen(null)} className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                            See All {item.label} →
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href}
                    className="px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-all duration-150 block">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <a href="tel:+447789602945" className="text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <Phone size={14} /> +44 7789 602945
            </a>
            <Link href="/quote"
              className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-all shadow-sm hover:shadow-md">
              Book Now — Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden ml-auto p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <Link href="/" onClick={closeAll} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">Home</Link>
              {nav.map(item => (
                <div key={item.label}>
                  {item.mega ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(e => e === item.label ? null : item.label)}
                        className="w-full flex justify-between items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        {item.label}
                        <ChevronDown size={15} className={`text-slate-400 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-3 mt-1 space-y-0.5">
                          {item.mega.flatMap(col => col.links).map(l => (
                            <Link key={l.href} href={l.href} onClick={closeAll}
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-brand-600 hover:bg-brand-50">
                              {l.label}
                              {l.tag && <span className="text-xs bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full font-semibold">{l.tag}</span>}
                            </Link>
                          ))}
                          <Link href={item.href} onClick={closeAll} className="block px-3 py-2 rounded-lg text-sm font-bold text-brand-600 hover:bg-brand-50">
                            All {item.label} Services →
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} onClick={closeAll} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">{item.label}</Link>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 pb-5 pt-2 border-t border-slate-100 space-y-2">
              <a href="tel:+447789602945" className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-brand-600">
                <Phone size={15} /> +44 7789 602945
              </a>
              <Link href="/quote" onClick={closeAll}
                className="block text-center bg-brand-600 text-white font-bold text-sm py-3 rounded-xl hover:bg-brand-700 transition-colors">
                Book Now — Free Quote
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
