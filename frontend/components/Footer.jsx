import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';

const serviceLinks = [
  ['Regular Cleaning', '/domestic#regular'],
  ['Deep Cleaning', '/domestic#deep'],
  ['End of Tenancy', '/domestic#end-of-tenancy'],
  ['Carpet Cleaning', '/domestic#carpet'],
  ['Office Cleaning', '/commercial#office'],
  ['Retail Cleaning', '/commercial#retail'],
];

const companyLinks = [
  ['Home', '/'],
  ['Domestic', '/domestic'],
  ['Commercial', '/commercial'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Admin', '/admin'],
];

function TikTokMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M14.3 3.4v10.2a4.9 4.9 0 1 1-4.9-4.9" stroke="#25F4EE" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.9 3.4c.5 3 2.2 4.9 5 5.3" stroke="#FE2C55" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1 3.4v10.2a4.9 4.9 0 1 1-4.9-4.9" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.7 3.4c.5 3 2.2 4.9 5 5.3" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const socialLinks = [
  {
    Icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Cleanwithbest/61584162025224/',
    className: 'border-[#1877F2]/20 bg-[#1877F2] text-white hover:bg-[#166FE5]',
  },
  {
    Icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/cleanwithbest',
    className: 'border-pink-200 bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)] text-white hover:opacity-90',
  },
  {
    Icon: TikTokMark,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@cleanwithbest',
    className: 'border-slate-800 bg-[#010101] text-white hover:bg-[#111111]',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="inline-flex">
            <Image
              src="/brand/cleanwithbest-logo.png"
              alt="CleanWithBest"
              width={260}
              height={163}
              className="h-20 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Domestic and commercial cleaning across London. Clear quote requests, simple contact options and reliable cleaning teams.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map(({ Icon, label, href, className }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm transition hover:-translate-y-0.5 ${className}`}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-800">Services</h2>
          <ul className="space-y-2">
            {serviceLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:text-brand-700">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-800">Pages</h2>
          <ul className="space-y-2">
            {companyLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:text-brand-700">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-800">Contact</h2>
          <div className="grid gap-2 text-sm">
            <a href="tel:+447503494242" className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 hover:text-brand-700">
              <Phone size={15} className="text-brand-400" /> +44 7503 494242
            </a>
            <a href="tel:+447789602945" className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 hover:text-brand-700">
              <Phone size={15} className="text-brand-400" /> +44 7789 602945
            </a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 hover:text-brand-700">
              <MessageCircle size={15} className="text-brand-400" /> WhatsApp +44 7503 494242
            </a>
            <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 hover:text-brand-700">
              <MessageCircle size={15} className="text-brand-400" /> WhatsApp +44 7789 602945
            </a>
            <a href="mailto:cleanwithbest@gmail.com" className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 hover:text-brand-700">
              <Mail size={15} className="text-brand-400" /> cleanwithbest@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CleanWithBest. All rights reserved.</p>
          <p>Available 24/7 for quote requests by phone, WhatsApp or email.</p>
        </div>
      </div>
    </footer>
  );
}
