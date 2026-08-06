import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  Home,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';

export const metadata = {
  title: 'CleanWithBest - Professional Cleaning Services',
  description: 'Modern domestic and commercial cleaning across London. Request a quote and we will contact you by WhatsApp or phone.',
};

const services = [
  {
    icon: Home,
    title: 'Regular home cleaning',
    price: 'From £17/hr',
    text: 'Weekly, fortnightly or monthly cleans for kitchens, bathrooms, bedrooms and living areas.',
    href: '/domestic#regular',
  },
  {
    icon: Sparkles,
    title: 'Deep cleaning',
    price: 'From £179',
    text: 'A detailed top-to-bottom clean for homes that need more time, care and attention.',
    href: '/domestic#deep',
  },
  {
    icon: ShieldCheck,
    title: 'End of tenancy',
    price: 'From £179',
    text: 'Landlord-standard cleaning for tenants, landlords and letting agents.',
    href: '/domestic#end-of-tenancy',
  },
  {
    icon: Building2,
    title: 'Commercial cleaning',
    price: 'From £18/hr',
    text: 'Offices, retail spaces, restaurants, gyms and shared commercial spaces.',
    href: '/commercial',
  },
];

const prices = [
  ['Regular cleaning', '£17/hr'],
  ['Deep cleaning', 'from £179'],
  ['End of tenancy', 'from £179'],
  ['Move in / move out', 'from £179'],
  ['Carpet cleaning', 'from £43/room'],
  ['Mattress cleaning', 'from £23'],
  ['Office cleaning', 'from £21.50/hr'],
  ['Retail cleaning', 'from £18/hr'],
];

const reasons = [
  ['Clear quotes', 'We confirm the price before you book, with no hidden charges.'],
  ['Easy contact', 'Send a quote request and we reply by WhatsApp or phone.'],
  ['Reliable cleaners', 'Cleaners are vetted, insured and prepared for the job.'],
  ['Flexible times', 'Home and business cleaning can be arranged around your schedule.'],
];

const faqs = [
  {
    q: 'How do I get a quote?',
    a: 'Use the quote form and leave your contact details. We review the job and contact you by WhatsApp or phone with the price.',
  },
  {
    q: 'Do you bring cleaning products?',
    a: 'Yes. We can bring professional products and equipment, or use your preferred products if you tell us before the clean.',
  },
  {
    q: 'Do you clean businesses?',
    a: 'Yes. We clean offices, retail spaces, restaurants, gyms, schools and other commercial premises.',
  },
  {
    q: 'What if I am not happy?',
    a: 'Tell us within 24 hours and we will arrange a return visit for the affected area.',
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&q=80"
          alt="Professional cleaner cleaning a bright modern home"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-brand-900/55" />
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white">
              <Star size={16} className="text-accent-400" />
              Professional cleaning across London
            </div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Cleaning services that are simple to book and easy to trust.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              CleanWithBest helps homes and businesses book reliable cleaners without confusion. Tell us what needs cleaning and we will contact you with a clear quote by WhatsApp or phone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-white-lg">
                Request a Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:+447503494242" className="btn-outline-white-lg">
                <Phone size={18} /> +44 7503 494242
              </a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline-white-lg">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white p-5 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-700">Get a quote in 3 steps</p>
            <div className="mt-5 space-y-4">
              {[
                ['1', 'Choose the cleaning service you need.'],
                ['2', 'Send your postcode and contact details.'],
                ['3', 'We reply by WhatsApp or call with the quote.'],
              ].map(([step, text]) => (
                <div key={step} className="flex gap-3 rounded-lg bg-slate-50 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">{step}</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{text}</p>
                </div>
              ))}
            </div>
            <Link href="/quote" className="btn-primary mt-5 w-full">
              Start Quote Request <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">Choose the cleaning service you need</h2>
              <p className="section-sub mt-3">No long forms to understand the basics. Pick a service, request a quote, and we will guide you from there.</p>
            </div>
            <Link href="/quote" className="btn-primary shrink-0">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, price, text, href }) => (
              <Link key={title} href={href} className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm font-bold text-brand-700">{price}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                  View service <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-tag">Prices</span>
            <h2 className="section-title">Clear starting rates</h2>
            <p className="section-sub mt-3">
              These are guide prices so customers can understand the cost quickly. Final quotes depend on property size, condition and access.
            </p>
            <div className="mt-6 rounded-lg border border-brand-100 bg-brand-50 p-5">
              <p className="text-sm font-bold text-slate-900">Regular cleaning starts at £17/hr.</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">For an exact quote, send your postcode, service type and preferred contact method.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {prices.map(([service, price]) => (
              <div key={service} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">{service}</span>
                <span className="text-sm font-extrabold text-brand-700">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="section-tag-light">Why Us</span>
              <h2 className="section-title-light">Built for busy customers</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                The website, quote process and service pages are designed to make cleaning easy to understand before you contact us.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map(([title, text]) => (
                <div key={title} className="rounded-lg border border-white/10 bg-white/10 p-5">
                  <CheckCircle className="mb-4 text-accent-400" size={22} />
                  <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-10 text-center">
            <span className="section-tag">FAQs</span>
            <h2 className="section-title">Quick answers</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-lg border border-slate-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                  <span className="font-semibold text-slate-900">{q}</span>
                  <span className="faq-icon text-xl text-slate-400">+</span>
                </summary>
                <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Clock className="mx-auto mb-4 text-white" size={34} />
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">Ready to get a cleaning quote?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Send your details once. We will contact you by WhatsApp or phone and help you choose the right cleaning service.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn-white-lg">
              Request a Quote <ArrowRight size={18} />
            </Link>
            <a href="mailto:cleanwithbest@gmail.com" className="btn-outline-white-lg">
              <Mail size={18} /> Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
