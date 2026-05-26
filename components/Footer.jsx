import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

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
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading text-2xl font-extrabold tracking-tight mb-4 inline-block">
              <span className="text-brand-400">Clean</span>
              <span className="text-accent-400">WithBest</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Professional cleaning services for homes and businesses. Trusted by thousands of satisfied customers. Fully insured, top-rated, satisfaction guaranteed.
            </p>
            <div className="space-y-2 mb-6 text-sm">
              <div className="flex items-center gap-2"><Phone size={14} className="text-brand-400" /><a href="tel:+442036330390" className="hover:text-white transition-colors">020 3633 0390</a></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-brand-400" /><a href="mailto:cleanwithbest@gmail.com" className="hover:text-white transition-colors">cleanwithbest@gmail.com</a></div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-brand-400" /><span>Monday to Friday, 8am – 6pm</span></div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-brand-400" /><span>12 Bishopsgate, London EC2N 4BQ</span></div>
            </div>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/8 hover:bg-brand-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                  <Icon size={16} />
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
              {[['Home', '/'], ['About Us', '/about'], ['Contact', '/contact'], ['Get a Quote', '/quote'], ['Reviews', '/#testimonials'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']].map(([label, href]) => (
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
