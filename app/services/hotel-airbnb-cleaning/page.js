import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  Clock3,
  ConciergeBell,
  Hotel,
  KeyRound,
  Mail,
  MessageCircle,
  Phone,
  Repeat,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
} from 'lucide-react';
import { getServiceBySlug } from '@/frontend/lib/services';
import FreeWebsiteOffer from '@/frontend/components/FreeWebsiteOffer';

const service = getServiceBySlug('hotel-airbnb-cleaning');

export const metadata = {
  title: 'Hotel & Airbnb Continuous Cleaning',
  description: 'Continuous cleaning for hotels, Airbnb and serviced apartments from £20/hour, 5-hour minimum per booking. Guest turnovers, full hotel housekeeping contracts, insured teams.',
};

const stats = [
  ['£20/hr', 'Minimum rate, every booking'],
  ['5 hrs', 'Minimum per booking'],
  ['24/7', 'Quote requests'],
  ['Full', 'Hotel housekeeping available'],
];

const differences = [
  {
    title: 'One-off cleaning',
    text: 'A single visit, booked once, with no guarantee of the same team or a fixed schedule.',
  },
  {
    title: 'Our continuous cleaning',
    text: 'An ongoing contract built around your guest turnovers, check-in/check-out times and occupancy — with a consistent team and a schedule that repeats, not a one-time job.',
    highlight: true,
  },
];

const roomAreas = [
  {
    icon: BedDouble,
    title: 'Guest Rooms',
    color: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50',
    tasks: ['Fresh linen and bed making', 'Dusting and surface wipe-down', 'Vacuum / mop floors', 'Wardrobes and drawers checked', 'Mirrors and glass polished', 'Amenities and towels restocked'],
  },
  {
    icon: ShieldCheck,
    title: 'Bathrooms',
    color: 'border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50',
    tasks: ['Full sanitising between stays', 'Shower, bath and taps cleaned', 'Toilet deep cleaned', 'Limescale removal', 'Fresh towels and toiletries', 'Bin emptied and re-lined'],
  },
  {
    icon: Utensils,
    title: 'Kitchen / Kitchenette',
    color: 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50',
    tasks: ['Worktops and appliances wiped', 'Sink and hob cleaned', 'Inside microwave / fridge check', 'Crockery and cutlery checked', 'Floor cleaned', 'Bins emptied'],
  },
  {
    icon: Users,
    title: 'Communal Areas',
    color: 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50',
    tasks: ['Reception / lobby cleaned', 'Corridors and stairwells', 'Lift and touch-point sanitising', 'Laundry room reset', 'Bins and recycling managed', 'Entrance and signage kept tidy'],
  },
];

const process = [
  ['01', 'Tell us about your property', 'Number of rooms or units, guest turnover pattern, check-in/out times and any full-hotel housekeeping needs.'],
  ['02', 'We build your schedule', 'A cleaning schedule matched to your bookings — daily turnovers, back-to-back changeovers, or full hotel housekeeping.'],
  ['03', 'A consistent team is assigned', 'Vetted, insured cleaners who get to know your property and standards, not a different person every visit.'],
  ['04', 'Ongoing turnovers and quality checks', 'We keep cleaning between every guest stay, with regular quality checks so standards stay consistent long-term.'],
];

const whoWeServe = ['Hotels', 'Airbnb hosts', 'Serviced apartments', 'Guest houses', 'B&Bs'];

const benefits = [
  { icon: Repeat, title: 'Continuous, Not One-Off', text: 'A running contract that keeps up with every guest turnover, not a single booking.' },
  { icon: KeyRound, title: 'Key Holding', text: 'We can hold keys or access codes so cleaning happens between guests without you being on-site.' },
  { icon: Users, title: 'Consistent Team', text: 'The same vetted cleaners assigned to your property wherever possible, for reliable standards.' },
  { icon: Clock3, title: 'Flexible Turnaround', text: 'Early checkout and same-day turnovers scheduled around real guest timings.' },
  { icon: ShieldCheck, title: 'Fully Insured', text: 'All cleaning staff are insured and background-checked before working on your property.' },
  { icon: ConciergeBell, title: 'Full Hotel Housekeeping', text: 'We can run complete housekeeping for an entire hotel, not just individual rooms.' },
];

const faqs = [
  { q: 'What is the minimum booking?', a: 'Every hotel and Airbnb cleaning booking has a 5-hour minimum, priced from £20 per hour.' },
  { q: 'What counts as "continuous" cleaning?', a: 'It means an ongoing contract built around your guest turnovers — daily, back-to-back, or scheduled changeovers — rather than a single one-off visit.' },
  { q: 'Can you run full housekeeping for our entire hotel?', a: 'Yes. Alongside individual turnover cleaning, we offer full hotel housekeeping contracts covering every room, floor and communal area.' },
  { q: 'Do you provide linen and laundry?', a: 'We handle fresh linen and bed making as standard. Let us know your linen and laundry setup when you request a quote and we will confirm the details.' },
  { q: 'How fast can you turn a room around between guests?', a: 'Turnaround time depends on room size and condition. Tell us your check-out and check-in times and we will build a schedule that fits between them.' },
  { q: 'Can you hold keys or access codes?', a: 'Yes, key holding is available so we can clean between guest stays without you needing to be on-site.' },
  { q: 'Do you offer same-day or early-checkout turnovers?', a: 'Yes, we offer flexible early-checkout and same-day turnover slots — tell us your guest timings when requesting a quote.' },
  { q: 'Is there a minimum contract length?', a: 'We keep contracts flexible. Send us your property details and turnover pattern and we will confirm the right arrangement.' },
];

export default function HotelAirbnbCleaningPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_48%,#ecfeff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag"><Hotel size={14} className="text-accent-600" /> Hotel & Airbnb Cleaning</span>
            <h1 className="hero-title">{service.title}</h1>
            <p className="mt-3 text-lg font-bold text-brand-700">{service.price}</p>
            <p className="hero-copy">{service.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/quote?service=${encodeURIComponent(service.title)}`} className="btn-primary-lg">
                Get a Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:+447503494242" className="btn-outline">
                <Phone size={16} /> +44 7503 494242
              </a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="image-panel animate-float-soft">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85"
              alt="Made-up hotel room bed ready for the next guest"
              width={720}
              height={760}
              priority
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 rounded-lg bg-white/90 p-3 text-center text-xs font-bold text-slate-700 shadow-lg backdrop-blur">
              {['Guest turnovers', 'Full hotel housekeeping'].map(item => <span key={item} className="rounded-md bg-slate-50 px-2 py-2">{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-brand-700 bg-brand-800 py-5 text-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 text-sm font-bold sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="flex items-center gap-2">
              <Sparkles size={15} className="shrink-0 text-accent-400" /> {value} — {label}
            </div>
          ))}
        </div>
      </section>

      {/* What is continuous cleaning */}
      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="section-tag">Why Continuous Cleaning</span>
            <h2 className="section-title">Not a one-off clean — an ongoing part of running your property</h2>
            <p className="section-sub mx-auto mt-3 max-w-2xl">Hotels, Airbnb and serviced apartments need cleaning that keeps up with guest turnover, not a single booking.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {differences.map(({ title, text, highlight }) => (
              <div key={title} className={`rounded-lg border p-6 md:p-8 ${highlight ? 'border-brand-200 bg-brand-50 shadow-lg' : 'border-slate-200 bg-slate-50'}`}>
                <h3 className={`font-heading text-xl font-bold ${highlight ? 'text-brand-800' : 'text-slate-700'}`}>{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room-by-room */}
      <section className="bg-slate-50 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="section-tag">What We Clean</span>
            <h2 className="section-title mb-4">Area-by-Area Cleaning Checklist</h2>
            <p className="mx-auto max-w-xl text-slate-500">What our cleaners cover across guest rooms, bathrooms, kitchens and communal areas on every turnover.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roomAreas.map(({ icon: Icon, title, color, tasks }) => (
              <div key={title} className={`rounded-lg border p-6 transition hover:-translate-y-1 hover:shadow-lg ${color}`}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Icon size={20} className="text-brand-700" />
                </div>
                <h3 className="mb-4 font-heading text-lg font-bold text-slate-900">{title}</h3>
                <ul className="space-y-2">
                  {tasks.map(t => <li key={t} className="checklist-item">{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
            <span className="section-tag">Included</span>
            <h2 className="font-heading text-2xl font-extrabold text-slate-950 md:text-3xl">What this service covers</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map(item => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-700">
                  <CheckCircle size={17} className="mt-0.5 shrink-0 text-accent-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 max-w-2xl">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">From first quote to ongoing cleaning</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {process.map(([num, title, text]) => (
              <div key={num} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">{num}</span>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-white py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-8 font-heading text-2xl font-bold text-brand-800">Who We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {whoWeServe.map(item => (
              <span key={item} className="stat-pill inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                <CalendarCheck size={15} className="text-brand-600" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="section-tag">Benefits</span>
            <h2 className="section-title">Why Hotels & Airbnb Hosts Choose Us</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <Icon className="mb-3 text-brand-600" size={24} />
                <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FreeWebsiteOffer />

      {/* FAQ */}
      <section className="bg-white py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <span className="section-tag">FAQs</span>
            <h2 className="section-title">Hotel & Airbnb Cleaning FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-lg border border-slate-100 bg-slate-50 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                  <span className="text-sm font-semibold text-slate-900 md:text-base">{q}</span>
                  <ChevronDown size={18} className="ml-3 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-900 py-12 text-white md:py-14">
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Mail className="mx-auto mb-4 text-accent-400" size={34} />
          <h2 className="font-heading text-3xl font-extrabold md:text-4xl">Ready to set up continuous cleaning?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-200">Send your property details once. We will contact you by WhatsApp or phone and confirm a schedule and price.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={`/quote?service=${encodeURIComponent(service.title)}`} className="btn-white-lg">
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
