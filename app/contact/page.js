import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import ContactForm from '@/frontend/components/ContactForm';

export const metadata = {
  title: 'Contact CleanWithBest',
  description: 'Contact CleanWithBest by phone, WhatsApp, email or message form.',
};

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

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_52%,#ecfeff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag">Contact</span>
            <h1 className="hero-title">Call, WhatsApp, email or send a message.</h1>
            <p className="hero-copy">
              For the fastest reply, call or WhatsApp us. For general questions, send a message and we will get back to you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="tel:+447503494242" className="btn-primary-lg">
                <Phone size={18} /> +44 7503 494242
              </a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick details</p>
            <div className="mt-4 space-y-3">
              <a href="tel:+447503494242" className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 font-bold text-slate-900 hover:text-brand-700">
                <span className="inline-flex items-center gap-3"><Phone size={18} className="text-brand-600" /> Main phone</span>
                <span>+44 7503 494242</span>
              </a>
              <a href="tel:+447789602945" className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 font-bold text-slate-900 hover:text-brand-700">
                <span className="inline-flex items-center gap-3"><Phone size={18} className="text-brand-600" /> Second phone</span>
                <span>+44 7789 602945</span>
              </a>
              <a href="mailto:cleanwithbest@gmail.com" className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 font-bold text-slate-900 hover:text-brand-700">
                <span className="inline-flex items-center gap-3"><Mail size={18} className="text-brand-600" /> Email</span>
                <span className="break-all text-right">cleanwithbest@gmail.com</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[380px_1fr]">
          <div className="space-y-6">
            <div className="image-panel">
              <Image
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=700&q=85"
                alt="Professional cleaning products ready for home cleaning"
                width={620}
                height={420}
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-brand-800">Best ways to reach us</h2>
              <div className="mt-5 grid gap-3">
                <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                  <MessageCircle size={16} /> WhatsApp +44 7503 494242
                </a>
                <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center">
                  <MessageCircle size={16} /> WhatsApp +44 7789 602945
                </a>
                <Link href="/quote" className="btn-white justify-center border border-brand-100 bg-brand-50">
                  <Send size={16} /> Request a quote
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-brand-800">Social media</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ Icon, label, href, className }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border shadow-sm transition hover:-translate-y-0.5 ${className}`} aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-brand-800">Send a message</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Use this for questions that do not need an instant answer. For prices, the quote form gives us the right details faster.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
