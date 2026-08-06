import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Leaf, MessageCircle, Phone, ShieldCheck, Users } from 'lucide-react';

export const metadata = {
  title: 'About CleanWithBest',
  description: 'Learn about CleanWithBest, a London cleaning service focused on clear quotes, reliable communication and professional cleaning.',
};

const values = [
  { icon: ShieldCheck, title: 'Trust first', text: 'Customers invite us into homes and workplaces, so reliability and care come first.' },
  { icon: CheckCircle, title: 'Clear standards', text: 'We explain what is included and confirm the quote before the clean is booked.' },
  { icon: Leaf, title: 'Better products', text: 'We can use professional cleaning products or your preferred products when requested.' },
  { icon: Users, title: 'Respectful service', text: 'We keep communication simple, polite and practical from quote request to completion.' },
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_52%,#ecfeff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag">About Us</span>
            <h1 className="hero-title">Clear quotes, reliable cleaning, simple contact.</h1>
            <p className="hero-copy">
              We help London homes and businesses arrange cleaning without confusion. Send the job details, choose how you want to be contacted, and we will reply with a clear quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary-lg">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <a href="tel:+447503494242" className="btn-outline">
                <Phone size={16} /> +44 7503 494242
              </a>
            </div>
          </div>
          <div className="image-panel animate-float-soft">
            <Image
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900&q=85"
              alt="Clean and organised modern home"
              width={720}
              height={760}
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-tag">Our Approach</span>
            <h2 className="section-title">Simple, practical and customer focused</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              CleanWithBest was created to make professional cleaning easier to arrange. Customers should not have to search through confusing packages or chase for a reply. Our process is direct: you tell us what needs cleaning, we check the details, and we contact you by phone or WhatsApp.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We cover domestic and commercial cleaning, from regular home cleaning to end-of-tenancy and workplace cleaning. Every quote is handled with clear communication and realistic expectations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Icon className="mb-4 text-brand-700" size={24} />
                <h3 className="font-heading text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 max-w-2xl">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">A cleaner process for booking a clean</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['1', 'You request a quote', 'Send service type, postcode and contact details.'],
              ['2', 'We review the job', 'We check property size, service type and any special notes.'],
              ['3', 'We contact you', 'You receive a quote by WhatsApp or phone call.'],
              ['4', 'Cleaner attends', 'We arrange the clean for a time that works for you.'],
            ].map(([num, title, text]) => (
              <div key={num} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">{num}</span>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-slate-950">Speak to CleanWithBest</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Use the quote form, call us, or message on WhatsApp. We are available 24/7 for quote requests.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn-primary">Get a Free Quote</Link>
            <a href="tel:+447503494242" className="btn-outline"><Phone size={16} /> +44 7503 494242</a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle size={16} /> WhatsApp 7503</a>
            <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle size={16} /> WhatsApp 7789</a>
          </div>
        </div>
      </section>
    </main>
  );
}
