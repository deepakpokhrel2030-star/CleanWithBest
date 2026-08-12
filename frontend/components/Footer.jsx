import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { commercialServices, domesticServices } from '@/frontend/lib/services';
import { socialLinks } from '@/frontend/lib/social';

const serviceLinks = [
  ...domesticServices.slice(0, 4),
  ...commercialServices.slice(0, 2),
].map(service => [service.shortTitle, `/services/${service.slug}`]);

const companyLinks = [
  ['Home', '/'],
  ['Domestic', '/domestic'],
  ['Commercial', '/commercial'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Admin', '/admin'],
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
