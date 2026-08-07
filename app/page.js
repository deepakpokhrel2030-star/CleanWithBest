import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock3,
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
    text: 'A reliable weekly, fortnightly or monthly clean for the rooms you use every day.',
    href: '/services/regular-home-cleaning',
  },
  {
    icon: Sparkles,
    title: 'Deep cleaning',
    price: 'From £179',
    text: 'More time, more detail and a proper reset for kitchens, bathrooms and living spaces.',
    href: '/services/deep-cleaning',
  },
  {
    icon: ShieldCheck,
    title: 'End of tenancy',
    price: 'From £179',
    text: 'A detailed clean for move-outs, landlords, tenants and letting agents.',
    href: '/services/end-of-tenancy-cleaning',
  },
  {
    icon: Building2,
    title: 'Commercial cleaning',
    price: 'From £18/hr',
    text: 'Offices, retail, restaurants, gyms and shared workspaces cleaned around your hours.',
    href: '/services/office-cleaning',
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

const process = [
  ['01', 'Tell us the job', 'Choose the service, postcode, property size and how you want us to contact you.'],
  ['02', 'We check the details', 'We review the work needed and prepare a clear quote before anything is booked.'],
  ['03', 'You get a reply', 'We contact you by WhatsApp or call, then arrange the cleaner if you want to go ahead.'],
];

const trust = [
  'Available 24/7 for quote requests',
  'Clear prices before booking',
  'Domestic and commercial teams',
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
            <span className="section-tag"><Star size={14} className="text-accent-500" /> London cleaning service</span>
            <h1 className="hero-title">Cleaning made simple for homes and workplaces.</h1>
            <p className="hero-copy">
              Request a quote once and CleanWithBest will contact you by WhatsApp or phone. Regular cleaning starts from £17/hour, with clear prices for deep cleans, tenancy cleans and business cleaning.
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
              alt="Professional cleaner working in a bright home"
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
          {['Regular cleaning £17/hr', 'Deep cleans from £179', 'End of tenancy from £179', '24/7 quote requests'].map(item => (
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
                alt="Cleaner using professional cleaning cloth in a bright home"
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
              <p className="text-lg font-extrabold text-brand-800">Regular cleaning starts at £17/hr.</p>
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
