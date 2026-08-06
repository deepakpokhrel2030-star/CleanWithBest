import Link from 'next/link';
import { Facebook, Instagram, Mail, MessageCircle, Music2, Phone, Send } from 'lucide-react';
import ContactForm from '@/frontend/components/ContactForm';

export const metadata = {
  title: 'Contact CleanWithBest',
  description: 'Contact CleanWithBest by phone, WhatsApp, email or message form.',
};

const socialLinks = [
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/people/Cleanwithbest/61584162025224/' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/cleanwithbest' },
  { Icon: Music2, label: 'TikTok', href: 'https://www.tiktok.com/@cleanwithbest' },
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <span className="section-tag">Contact</span>
            <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
              Speak to CleanWithBest.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
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

          <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
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
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-950">Best ways to reach us</h2>
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
              <h2 className="font-heading text-xl font-bold text-slate-950">Social media</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700" aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-slate-950">Send a message</h2>
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
