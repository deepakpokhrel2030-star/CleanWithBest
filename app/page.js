import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock3,
  Hotel,
  Mail,
  MessageCircle,
  Phone,
  Repeat,
  Utensils,
  Sparkles,
  Star,
} from 'lucide-react';
import FreeWebsiteOffer from '@/frontend/components/FreeWebsiteOffer';

export const metadata = {
  title: 'CleanWithBest - Hotel, Airbnb & Business Cleaning',
  description: 'Continuous cleaning for hotels, Airbnb and businesses across London, from £20/hour. Request a quote and we will contact you by WhatsApp or phone.',
};

const services = [
  {
    icon: Hotel,
    title: 'Hotel & Airbnb cleaning',
    price: 'From £20/hr (min. 5 hrs)',
    text: 'Continuous turnover cleaning for hotels, Airbnb and serviced apartments — we can run full housekeeping for an entire hotel.',
    href: '/services/hotel-airbnb-cleaning',
  },
  {
    icon: Repeat,
    title: 'Recurring & contract cleaning',
    price: 'From £20/hr',
    text: 'Daily, weekly or fortnightly contract cleaning for any business, with consistent standards on every visit.',
    href: '/services/recurring-contract-cleaning',
  },
  {
    icon: Building2,
    title: 'Office cleaning',
    price: 'From £21.50/hr',
    text: 'Desks, washrooms, kitchens and common areas cleaned around your working hours.',
    href: '/services/office-cleaning',
  },
  {
    icon: Utensils,
    title: 'Restaurant & hospitality',
    price: 'From £20/hr',
    text: 'Food-safe cleaning for restaurants, cafes, bars and hospitality venues.',
    href: '/services/restaurant-hospitality-cleaning',
  },
];

const prices = [
  ['Hotel & Airbnb cleaning', 'from £20/hr (min. 5 hrs)'],
  ['Recurring & contract cleaning', 'from £20/hr'],
  ['Office cleaning', 'from £21.50/hr'],
  ['Retail cleaning', 'from £20/hr'],
  ['Restaurant & hospitality', 'from £20/hr'],
  ['Gym & fitness', 'from £20/hr'],
  ['School & education', 'from £20/hr'],
  ['Warehouse & industrial', 'from £20/hr'],
];

const process = [
  ['01', 'Tell us the job', 'Choose the service, postcode, property size and how you want us to contact you.'],
  ['02', 'We check the details', 'We review the work needed and prepare a clear quote before anything is booked.'],
  ['03', 'You get a reply', 'We contact you by WhatsApp or call, then arrange the cleaner if you want to go ahead.'],
];

const trust = [
  'Available 24/7 for quote requests',
  'Clear prices before booking',
  'Hotel, Airbnb & business teams',
  'WhatsApp and phone response',
];

export default function HomePage() {
  return (
    <main className="bg-white">
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_42%,#ecfeff_100%)]" />
        <div className="absolute left-0 top-24 h-48 w-48 rounded-full bg-accent-400/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag"><Star size={14} className="text-accent-500" /> Hotel Cleaning Contracts &bull; Airbnb Cleaning</span>
            <h1 className="hero-title">Continuous cleaning for hotels, Airbnb and businesses.</h1>
            <p className="hero-copy">
              Request a quote once and CleanWithBest will contact you by WhatsApp or phone. Hotel and Airbnb continuous cleaning starts from £20/hour, with clear hourly prices for recurring contracts and business cleaning.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <Link href="/quote" className="btn-primary-lg w-full sm:w-auto">
                Request a Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:+447503494242" className="btn-outline w-full sm:w-auto">
                <Phone size={18} /> +44 7503 494242
              </a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trust.map(item => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <CheckCircle size={16} className="text-accent-600" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="image-panel animate-float-soft">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&q=85"
              alt="Professional cleaner at work in a hotel room"
              width={720}
              height={820}
              priority
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white p-4 shadow-lg">
              <p className="text-xs font-bold uppercase text-brand-700">Fast quote response</p>
              <p className="mt-1 text-sm font-semibold text-brand-800">Send the form and we will call or WhatsApp you with the next step.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-700 bg-brand-800 py-5 text-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 text-sm font-bold sm:grid-cols-2 lg:grid-cols-4">
          {['Hotel & Airbnb from £20/hr', 'Recurring cleaning from £20/hr', 'Office cleaning from £21.50/hr', '24/7 quote requests'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <Sparkles size={15} className="text-accent-400" /> {item}
            </div>
          ))}
        </div>
      </section>

      <section className="soft-section py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-tag">Services</span>
              <h2 className="section-title">Choose what needs cleaning</h2>
              <p className="section-sub mt-3">Simple options, clear starting prices, and a quote before we book the work.</p>
            </div>
            <Link href="/quote" className="btn-primary shrink-0">
              Start Quote <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, price, text, href }) => (
              <Link key={title} href={href} className="service-card group">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-700 text-white transition group-hover:bg-brand-800">
                  <Icon size={22} />
                </span>
                <h3 className="font-heading text-lg font-bold text-brand-800">{title}</h3>
                <p className="mt-2 text-sm font-extrabold text-brand-700">{price}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                  View details <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <span className="section-tag">How it works</span>
            <h2 className="section-title">From quote request to cleaner booked</h2>
            <p className="section-sub mt-3">The process is designed for people who want a quick answer without reading complicated packages.</p>
            <div className="mt-6 image-panel">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85"
                alt="Cleaner using professional cleaning cloth in a hotel room"
                width={720}
                height={430}
                className="h-72 w-full object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            {process.map(([num, title, text]) => (
              <div key={num} className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:bg-white hover:shadow-lg">
                <div className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white font-heading text-sm font-black text-brand-700 shadow-sm ring-1 ring-slate-200">{num}</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-800">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-brand-800 p-6 text-white">
              <Clock3 className="mb-4 text-accent-400" size={26} />
              <h3 className="font-heading text-xl font-bold">Need it quickly?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Call or WhatsApp for the fastest response. We are available 24/7 for quote requests.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="section-tag">Prices</span>
            <h2 className="section-title">Clear starting rates</h2>
            <p className="section-sub mt-3">These are guide prices. Final quotes depend on property size, condition, access and any extra requests.</p>
            <div className="mt-6 rounded-lg border border-brand-100 bg-white p-5 shadow-sm">
              <p className="text-lg font-extrabold text-brand-800">Hotel &amp; Airbnb cleaning starts at £20/hr (min. 5 hrs).</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Send your postcode and service type for a confirmed quote.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {prices.map(([service, price]) => (
              <div key={service} className="stat-pill flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-700">{service}</span>
                <span className="text-sm font-extrabold text-brand-700">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FreeWebsiteOffer />

      <section className="relative overflow-hidden bg-brand-900 py-12 md:py-14 text-white">
        <Image
          src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1600&q=80"
          alt="Professional cleaning tools arranged neatly"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-brand-900/75" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Mail className="mx-auto mb-4 text-accent-400" size={34} />
          <h2 className="font-heading text-3xl font-extrabold md:text-4xl">Ready to ask for a quote?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">Send your details once. We will contact you by WhatsApp or phone and help you choose the right cleaning service.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn-white-lg">
              Request a Quote <ArrowRight size={18} />
            </Link>
            <a href="mailto:cleanwithbest@gmail.com" className="btn-white">
              <Mail size={18} /> Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
