import Link from 'next/link';
import { Facebook, Instagram, Mail, MessageCircle, Music2, Phone } from 'lucide-react';
import ContactForm from '@/frontend/components/ContactForm';

export const metadata = {
  title: 'Contact CleanWithBest',
  description: 'Contact CleanWithBest by phone, WhatsApp, email or message form.',
};

const numbers = [
  ['+44 7503 494242', 'tel:+447503494242', 'https://wa.me/447503494242'],
  ['+44 7789 602945', 'tel:+447789602945', 'https://wa.me/447789602945'],
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-slate-950 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <span className="section-tag-light">Contact</span>
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Call, WhatsApp, email or send a message.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
            We are available 24/7 for quote requests. Tell us what you need and we will help you choose the right service.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-900">Contact details</h2>
              <div className="mt-5 grid gap-3">
                {numbers.map(([number, tel, whatsapp]) => (
                  <div key={number} className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-3 text-lg font-extrabold text-slate-900">{number}</p>
                    <div className="flex flex-wrap gap-2">
                      <a href={tel} className="btn-primary px-4 py-2 text-sm"><Phone size={15} /> Call</a>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm"><MessageCircle size={15} /> WhatsApp</a>
                    </div>
                  </div>
                ))}
                <a href="mailto:cleanwithbest@gmail.com" className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 font-semibold text-brand-700 hover:bg-brand-50">
                  <Mail size={18} /> cleanwithbest@gmail.com
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-slate-900">Follow us</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/people/Cleanwithbest/61584162025224/' },
                  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/cleanwithbest' },
                  { Icon: Music2, label: 'TikTok', href: 'https://www.tiktok.com/@cleanwithbest' },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:border-brand-200 hover:text-brand-700">
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-brand-100 bg-brand-50 p-6">
              <h2 className="font-heading text-xl font-bold text-slate-900">Need a quote?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">For pricing, use the quote form so we receive the service type, property details and contact preference in one place.</p>
              <Link href="/quote" className="btn-primary mt-4">Request a Quote</Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-slate-900">Send a message</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">Use this for general questions. For prices, the quote page is faster.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
