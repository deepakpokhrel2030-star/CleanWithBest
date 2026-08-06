import Link from 'next/link';
import { Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Music2 } from 'lucide-react';

const domesticLinks = [
  ['Regular Home Cleaning', '/domestic#regular'],
  ['Deep Cleaning', '/domestic#deep'],
  ['End of Tenancy', '/domestic#end-of-tenancy'],
  ['Move In / Move Out', '/domestic#move'],
  ['Carpet & Upholstery', '/domestic#carpet'],
  ['Mattress Cleaning', '/domestic#mattress'],
  ['Ironing & Laundry', '/domestic#ironing'],
];

const commercialLinks = [
  ['Office Cleaning', '/commercial#office'],
  ['Retail Cleaning', '/commercial#retail'],
  ['Restaurant Cleaning', '/commercial#restaurant'],
  ['Gym & Fitness', '/commercial#gym'],
  ['School Cleaning', '/commercial#school'],
  ['Warehouse Cleaning', '/commercial#warehouse'],
  ['Washroom Services', '/commercial#washroom'],
  ['Medical Cleaning', '/commercial#medical'],
];

const areas = ['Westminster', 'Chelsea', 'Kensington', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets', 'Southwark', 'Lambeth', 'Wandsworth', 'Fulham', 'Ealing'];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="border-b border-white/10 bg-brand-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-2xl font-bold text-white">Need a cleaner?</p>
            <p className="mt-1 text-sm text-white/75">Send a quote request and we will contact you by phone or WhatsApp.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote" className="btn-white">Get a Free Quote</Link>
            <a href="tel:+447503494242" className="btn-outline-white">Call +44 7503 494242</a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline-white">WhatsApp +44 7503 494242</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading text-2xl font-extrabold tracking-tight mb-4 inline-block">
              <span className="text-brand-400">Clean</span>
              <span className="text-accent-400">WithBest</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-sm">
              Professional cleaning services for homes and businesses across London. Clear quotes, friendly communication, and reliable cleaners.
            </p>
            <div className="mb-6 grid gap-2 text-sm">
              <a href="tel:+447503494242" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:text-white transition-colors"><Phone size={14} className="text-brand-400" />+44 7503 494242</a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:text-white transition-colors"><MessageCircle size={14} className="text-brand-400" />WhatsApp +44 7503 494242</a>
              <a href="tel:+447789602945" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:text-white transition-colors"><Phone size={14} className="text-brand-400" />+44 7789 602945</a>
              <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:text-white transition-colors"><MessageCircle size={14} className="text-brand-400" />WhatsApp +44 7789 602945</a>
              <a href="mailto:cleanwithbest@gmail.com" className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 hover:text-white transition-colors"><Mail size={14} className="text-brand-400" />cleanwithbest@gmail.com</a>
              <div className="flex items-center gap-2 px-3 py-1"><Clock size={14} className="text-brand-400" /><span>Available 24/7</span></div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/people/Cleanwithbest/61584162025224/' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/cleanwithbest' },
                { Icon: Music2, label: 'TikTok', href: 'https://www.tiktok.com/@cleanwithbest' },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/8 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-brand-600 hover:text-white transition-all duration-200">
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Domestic */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Domestic</h4>
            <ul className="space-y-2">
              {domesticLinks.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Commercial */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Commercial</h4>
            <ul className="space-y-2">
              {commercialLinks.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company + Areas */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {[['Home', '/'], ['About Us', '/about'], ['Contact', '/contact'], ['Get a Quote', '/quote'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-3">Areas We Cover</h4>
            <div className="flex flex-wrap gap-1">
              {areas.slice(0, 8).map(a => (
                <Link key={a} href="/#areas" className="text-xs bg-white/8 hover:bg-brand-600 hover:text-white px-2 py-1 rounded-md transition-colors">{a}</Link>
              ))}
              <Link href="/#areas" className="text-xs text-brand-400 hover:text-white px-2 py-1">+more</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CleanWithBest Ltd. All rights reserved. Reg. No. 12345678 | VAT: GB 987 6543 21</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
