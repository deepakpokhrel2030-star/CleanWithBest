import Image from 'next/image';
import Link from 'next/link';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {
  Phone, ArrowRight, CheckCircle, Shield, Star, Clock, Leaf,
  Award, Users, ThumbsUp, Quote
} from 'lucide-react';

export const metadata = {
  title: 'CleanWithBest – Professional Cleaning Services',
  description: 'Top-rated domestic and commercial cleaning services. 4.9★ rated, fully insured, satisfaction guaranteed. From £15/hr.',
};

/* ─────────────────── DATA ─────────────────── */
const claims = [
  { icon: '🛡️', label: '£10M Public Liability Cover' },
  { icon: '✅', label: '100% Satisfaction Guarantee' },
  { icon: '⭐', label: 'Top 5% Cleaners Only' },
  { icon: '🔍', label: '100% Background Checked' },
  { icon: '📋', label: '6+ Months Experience Required' },
  { icon: '🌿', label: 'Eco-Friendly Products' },
  { icon: '💰', label: 'Living Wage Employer' },
];

const rooms = [
  {
    emoji: '🍳', title: 'Kitchen', color: 'from-orange-50 to-amber-50 border-orange-100',
    tasks: ['Clean & sanitise all worktops', 'Clean hob, oven exterior & extractor', 'Clean sink, taps & draining board', 'Wipe down all appliance exteriors', 'Clean inside microwave', 'Mop kitchen floor', 'Wipe cabinet doors & handles', 'Empty & re-line bins'],
  },
  {
    emoji: '🛏️', title: 'Bedroom', color: 'from-blue-50 to-indigo-50 border-blue-100',
    tasks: ['Make beds / change linen (on request)', 'Dust all surfaces & furniture', 'Vacuum carpets or mop hard floors', 'Wipe mirrors & glass', 'Clean windows (interior)', 'Wipe skirting boards', 'Tidy general areas', 'Vacuum under beds'],
  },
  {
    emoji: '🚿', title: 'Bathroom', color: 'from-teal-50 to-cyan-50 border-teal-100',
    tasks: ['Clean & sanitise toilet inside & out', 'Clean bath, shower & screen', 'Clean sink, taps & vanity', 'Scrub tiles & remove limescale', 'Polish mirrors & glass', 'Mop bathroom floor', 'Replace towels & toiletries', 'Empty & sanitise bin'],
  },
  {
    emoji: '🛋️', title: 'Living Room', color: 'from-purple-50 to-pink-50 border-purple-100',
    tasks: ['Dust all surfaces & ornaments', 'Vacuum sofas & cushions', 'Vacuum carpets or mop floors', 'Wipe skirting boards & doors', 'Clean light switches & sockets', 'Polish furniture', 'Clean windows (interior)', 'Tidy & straighten general areas'],
  },
];

const pricingCards = [
  {
    title: 'Regular Cleaning', from: 'From £15/hr', badge: 'Most Popular',
    desc: 'Perfect for weekly, fortnightly or monthly maintenance cleans to keep your home consistently spotless.',
    features: ['Flexible scheduling', 'Same cleaner each visit', 'Fully insured', 'All equipment supplied'],
    href: '/domestic#regular', color: 'bg-brand-600',
  },
  {
    title: 'Deep Cleaning', from: 'From £169', badge: null,
    desc: 'A thorough top-to-bottom clean covering every surface, inside appliances and all the areas a regular clean misses.',
    features: ['Inside oven & fridge', 'Behind appliances', 'Full bathroom deep clean', 'Limescale removal'],
    href: '/domestic#deep', color: 'bg-slate-800',
  },
  {
    title: 'End of Tenancy', from: 'From £195', badge: 'Deposit Guaranteed',
    desc: 'Comprehensive clean to landlord standards. We\'ll ensure you get your full deposit back — or we re-clean for free.',
    features: ['Landlord checklist followed', 'Deposit-back guarantee', 'Certificate on request', '8hr average clean time'],
    href: '/domestic#end-of-tenancy', color: 'bg-accent-600',
  },
];

const oneOff = [
  { title: 'Carpet Cleaning', price: 'From £65/room', icon: '🪣', href: '/domestic#carpet' },
  { title: 'Mattress Cleaning', price: 'From £45 each', icon: '🛏️', href: '/domestic#mattress' },
  { title: 'After Builders', price: 'From £249', icon: '🏗️', href: '/domestic#deep' },
  { title: 'Window Cleaning', price: 'From £35', icon: '🪟', href: '/domestic#windows' },
  { title: 'Ironing & Laundry', price: 'From £20/hr', icon: '👕', href: '/domestic#ironing' },
  { title: 'Move In/Out', price: 'From £169', icon: '📦', href: '/domestic#move' },
];

const domesticServices = [
  { icon: '🏠', title: 'Regular Home Cleaning', desc: 'Weekly, fortnightly or monthly — kept spotless all year round.', price: 'From £15/hr' },
  { icon: '✨', title: 'Deep Cleaning', desc: 'Full top-to-bottom clean including inside appliances and hidden areas.', price: 'From £169' },
  { icon: '🔑', title: 'End of Tenancy', desc: 'Deposit-back guaranteed clean to full landlord standard.', price: 'From £195', popular: true },
  { icon: '🛋️', title: 'Carpet & Upholstery', desc: 'Steam cleaning to remove stains, odors and allergens.', price: 'From £65/room' },
];

const commercialServices = [
  { icon: '🏢', title: 'Office Cleaning', desc: 'Daily or weekly office cleaning — early morning or evening slots available.', price: 'From £25/hr', popular: true },
  { icon: '🍽️', title: 'Restaurant & Hospitality', desc: 'Deep kitchen cleaning and dining area sanitation to health standards.', price: 'Custom quote' },
  { icon: '🛍️', title: 'Retail Cleaning', desc: 'Store cleaning around your trading hours, zero disruption.', price: 'From £22/hr' },
  { icon: '🏋️', title: 'Gym & Fitness', desc: 'Equipment disinfection, changing rooms, studio floor cleaning.', price: 'Custom quote' },
];

const guarantees = [
  { icon: Shield, title: '£10M Public Liability', desc: 'Every clean is fully insured against accidental damage or loss.' },
  { icon: CheckCircle, title: '100% Satisfaction', desc: 'Not happy? We\'ll return within 24 hours and re-clean at no extra charge.' },
  { icon: Award, title: 'Top 5% Cleaners', desc: 'Rigorous vetting — less than 5% of applicants make our team.' },
  { icon: Star, title: '6+ Months Experience', desc: 'Every cleaner has proven professional experience from day one.' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'Non-toxic, environmentally responsible products — safe for kids and pets.' },
  { icon: Clock, title: 'Always On Time', desc: 'Punctual arrival, job completed within the agreed time window.' },
  { icon: ThumbsUp, title: 'No Hidden Fees', desc: 'The price we quote is the price you pay. Always transparent.' },
  { icon: Users, title: 'Background Checked', desc: 'All staff are fully vetted, referenced and personally interviewed.' },
];

const bizTestimonials = [
  { name: 'Michael Barnes', role: 'Director', company: 'Apex Accountants', text: 'CleanWithBest has transformed our workspace. Employees are more productive and clients always comment on how clean the office looks.' },
  { name: 'Lisa Chen', role: 'CEO', company: 'Nova Creative Agency', text: 'Reliable, professional, and thorough. We\'ve tried several companies and none come close. Our meeting rooms always look immaculate.' },
  { name: 'James O\'Brien', role: 'Property Manager', company: 'Keystone Lettings', text: 'Switched to CleanWithBest eight months ago. The difference is night and day. Consistent quality and excellent communication every time.' },
  { name: 'Sophie Williams', role: 'Operations Manager', company: 'FitLife Gym', text: 'Our members notice and love it. The team are discreet, always on time and leave the gym in perfect condition every single morning.' },
];

const areaZones = [
  {
    zone: 'Zone 1 — Central London',
    areas: ['City of London', 'Westminster', 'Kensington & Chelsea', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets', 'Southwark', 'Lambeth', 'Wandsworth'],
  },
  {
    zone: 'Zone 2 — Inner London',
    areas: ['Hammersmith & Fulham', 'Brent', 'Haringey', 'Newham', 'Lewisham', 'Greenwich', 'Waltham Forest', 'Barking & Dagenham'],
  },
  {
    zone: 'Zone 3–4 — Outer London',
    areas: ['Ealing', 'Hounslow', 'Richmond upon Thames', 'Kingston upon Thames', 'Merton', 'Croydon', 'Bromley', 'Bexley', 'Havering', 'Redbridge', 'Barnet', 'Enfield', 'Harrow', 'Hillingdon'],
  },
  {
    zone: 'Zone 5–6 — Greater London',
    areas: ['Sutton', 'Walthamstow', 'Stratford', 'Canary Wharf', 'Docklands', 'East Ham', 'Ilford', 'Romford', 'Chingford'],
  },
];

const faqs = [
  { q: 'How much does cleaning cost?', a: 'Regular home cleaning starts from just £15/hr. Deep cleaning starts from £169, and end of tenancy cleaning from £195. All quotes are fixed-price with no hidden fees. Contact us for a free, personalised quote.' },
  { q: 'Do I need to be home during the clean?', a: 'Not at all. Many of our customers provide a key or entry code. All our cleaners are fully vetted, insured and trustworthy. We lock up securely when done.' },
  { q: 'Do cleaners bring their own equipment and products?', a: 'Yes — we supply all professional cleaning products and equipment. If you prefer us to use your own products (e.g. for allergy reasons), just let us know in advance.' },
  { q: 'What happens if I\'m not happy with the result?', a: 'Your satisfaction is guaranteed. If you\'re not 100% happy, contact us within 24 hours and we\'ll return to re-clean the affected areas completely free of charge.' },
  { q: 'How quickly can you start?', a: 'In most cases we can arrange a clean within 24–48 hours. For regular bookings, we\'ll find the most convenient recurring slot that fits your schedule.' },
  { q: 'Are your cleaners insured and background checked?', a: 'Absolutely. All staff are covered by £10M public liability insurance, fully background-checked, reference-verified and personally interviewed before joining our team.' },
  { q: 'Do you offer a regular cleaning service?', a: 'Yes! We offer weekly, fortnightly and monthly regular cleaning contracts. Regular clients benefit from the same assigned cleaner, so they learn your home and preferences perfectly over time.' },
  { q: 'Can I cancel or reschedule a booking?', a: 'Yes. We ask for 48 hours notice for cancellations or rescheduling. We understand plans change and we\'ll always try to accommodate you with a new time that works.' },
];

/* ─────────────────── PAGE ─────────────────── */
export default function HomePage() {
  return (
    <main>

      {/* ══════════ HERO ══════════ */}
      <section className="relative flex items-center overflow-hidden bg-brand-900">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
          alt="Professional cleaning"
          fill priority
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/95 via-brand-900/85 to-brand-800/75" />

        <div className="relative max-w-5xl mx-auto px-4 pt-10 pb-16 z-10 w-full text-center">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ⭐⭐⭐⭐⭐ Rated 4.9/5 on Google
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ 1,200+ Verified Reviews
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              📍 Serving All London
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-5">
            London's Most Trusted<br />
            <span className="text-accent-400">Cleaning Service</span>
          </h1>
          <p className="text-xl text-white/70 font-medium mb-3 max-w-2xl mx-auto">Professional domestic &amp; commercial cleaning across all London zones.</p>
          <p className="text-3xl font-bold text-accent-400 mb-10">
            From just <span className="text-white">£15/hour</span> <span className="text-white/50 text-xl font-normal">— no hidden fees</span>
          </p>

          {/* Trust bullets */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-12">
            {['£10M public liability insurance', 'Award-winning cleaning service', '100% background checked staff', 'Top 5% of cleaners — rigorously vetted'].map(item => (
              <span key={item} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <span className="w-4 h-4 rounded-full bg-accent-500/25 border border-accent-500/50 flex items-center justify-center text-accent-400 text-xs flex-shrink-0">✓</span>
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-white-lg">
              Get a Free Quote — 2 Min Form
            </Link>
            <a href="tel:+447789602945" className="btn-outline-white-lg flex items-center gap-2">
              <Phone size={17} /> Call +44 7789 602945
            </a>
          </div>

          {/* Pricing teasers */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: 'Regular Clean', price: 'From £15/hr' },
              { label: 'Deep Cleaning', price: 'From £169' },
              { label: 'End of Tenancy', price: 'From £195' },
              { label: 'Office Cleaning', price: 'From £25/hr' },
            ].map(({ label, price }) => (
              <div key={label} className="bg-white/10 border border-white/15 rounded-2xl px-3 py-4 backdrop-blur-sm">
                <p className="text-white/60 text-xs font-medium mb-1">{label}</p>
                <p className="text-white font-bold text-base">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 7 KEY CLAIMS STRIP ══════════ */}
      <div className="bg-brand-700 py-5 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-6 min-w-max md:min-w-0 flex-wrap md:flex-nowrap">
            {claims.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white text-sm font-semibold whitespace-nowrap">
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ ABOUT INTRO ══════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">About CleanWithBest</span>
            <h2 className="section-title mb-5">
              We Clean Your Home<br />As Though It Were Our Own
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-base">
              At CleanWithBest, we believe a clean space is a happy space. Our professional cleaning teams are carefully vetted, trained and equipped with the best eco-friendly products to deliver outstanding results — every single time.
            </p>
            <p className="text-slate-600 leading-relaxed mb-7 text-base">
              Whether you need a one-time deep clean or an ongoing regular service, our flexible packages are tailored to fit your schedule and budget. We serve both homes and businesses with the same dedication and high standards.
            </p>
            <ul className="grid grid-cols-2 gap-3 mb-8">
              {['Top 5% of applicants hired', '6+ months experience required', 'Fully background-checked', 'Living wage employer', '£10M insured', 'Eco-friendly products'].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle size={15} className="text-accent-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <Link href="/about" className="btn-primary">Learn More <ArrowRight size={15} /></Link>
              <Link href="/quote" className="btn-primary bg-transparent text-brand-600 border-2 border-brand-200 hover:bg-brand-50">Get a Quote</Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80"
                alt="Professional cleaner"
                width={600} height={460}
                className="object-cover w-full h-[420px]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-slate-100">
              <div className="font-heading text-4xl font-extrabold text-brand-600">4.9★</div>
              <div className="text-sm font-semibold text-slate-700">Google Rating</div>
              <div className="text-xs text-slate-400 mt-0.5">1,200+ verified reviews</div>
            </div>
            <div className="absolute -top-5 -right-5 bg-accent-500 rounded-2xl shadow-xl p-4 text-white text-center">
              <div className="font-heading text-3xl font-extrabold">15+</div>
              <div className="text-xs font-semibold">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ ROOM-BY-ROOM ══════════ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">What We Clean</span>
            <h2 className="section-title mb-4">Room-by-Room Cleaning</h2>
            <p className="section-sub mx-auto text-center">
              Every room in your home cleaned to a professional standard. Here's exactly what's included in a standard clean.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map(({ emoji, title, color, tasks }) => (
              <div key={title} className={`rounded-2xl border bg-gradient-to-br ${color} p-6 hover:shadow-lg transition-all duration-300`}>
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4">{title}</h3>
                <ul className="space-y-2">
                  {tasks.map(t => (
                    <li key={t} className="checklist-item">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            All tasks are included as standard. Additional tasks available on request. <Link href="/quote" className="text-brand-600 font-semibold hover:underline">Ask us anything →</Link>
          </p>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">Transparent Pricing</span>
            <h2 className="section-title mb-4">Simple, Clear Pricing</h2>
            <p className="section-sub mx-auto text-center">
              No hidden fees. No nasty surprises. The price we quote is the price you pay — always.
            </p>
          </div>

          {/* Main pricing cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingCards.map(({ title, from, badge, desc, features, href, color }) => (
              <div key={title} className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
                <div className={`${color} p-6 text-white`}>
                  {badge && (
                    <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{badge}</span>
                  )}
                  <h3 className="font-heading text-xl font-bold mb-1">{title}</h3>
                  <div className="text-3xl font-extrabold font-heading">{from}</div>
                </div>
                <div className="bg-white p-6 border border-t-0 border-slate-100 rounded-b-3xl">
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
                  <ul className="space-y-2 mb-6">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="text-accent-600">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={href} className="btn-primary w-full justify-center text-sm">
                    Book Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* One-off services grid */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="font-heading font-bold text-slate-900 text-xl mb-6 text-center">Other Services & Pricing</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {oneOff.map(({ title, price, icon, href }) => (
                <Link key={title} href={href}
                  className="bg-white rounded-2xl p-4 text-center border border-slate-100 hover:border-brand-300 hover:shadow-md transition-all duration-200 group">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-semibold text-slate-900 text-xs mb-1 group-hover:text-brand-600 transition-colors">{title}</div>
                  <div className="text-brand-600 text-xs font-bold">{price}</div>
                </Link>
              ))}
            </div>
            <p className="text-center text-slate-400 text-xs mt-5">Prices are indicative. Final price depends on property size and condition. <Link href="/quote" className="text-brand-600 font-semibold">Get an exact quote →</Link></p>
          </div>
        </div>
      </section>

      {/* ══════════ DOMESTIC SERVICES ══════════ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-tag">Home Cleaning</span>
              <h2 className="section-title">Domestic Cleaning Services</h2>
            </div>
            <Link href="/domestic" className="btn-primary shrink-0">
              All Domestic Services <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domesticServices.map(({ icon, title, desc, price, popular }) => (
              <div key={title} className={`card p-6 relative group`}>
                {popular && <span className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">Popular</span>}
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
                <div className="price-badge mb-4">{price}</div>
                <Link href="/quote" className="text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book Now <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COMMERCIAL SERVICES ══════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-tag">Business Cleaning</span>
              <h2 className="section-title">Commercial Cleaning Services</h2>
            </div>
            <Link href="/commercial" className="btn-primary shrink-0">
              All Commercial Services <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialServices.map(({ icon, title, desc, price, popular }) => (
              <div key={title} className={`card p-6 relative group`}>
                {popular && <span className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">Popular</span>}
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
                <div className="price-badge mb-4">{price}</div>
                <Link href="/quote" className="text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Get a Quote <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BOOKING STEPS ══════════ */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag-light">Simple Booking</span>
            <h2 className="section-title-light mb-4">How to Book a Clean</h2>
            <p className="text-white/60 max-w-xl mx-auto">From quote to sparkling clean in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-white/15" />
            {[
              { num: '01', title: 'Get a Free Quote', desc: 'Fill in our form or call us. You\'ll receive a transparent, fixed quote within 2 hours.', icon: '📋', cta: 'Get Quote', href: '/quote' },
              { num: '02', title: 'Book Your Slot', desc: 'Choose your preferred date and time. We\'ll confirm a cleaner for your area.', icon: '📅', cta: null },
              { num: '03', title: 'We Clean', desc: 'Your vetted cleaner arrives on time, fully equipped, and delivers a spotless result.', icon: '🧹', cta: null },
              { num: '04', title: 'You Relax', desc: 'Come home to a perfectly clean space. Not happy? We re-clean free of charge.', icon: '😊', cta: null },
            ].map(({ num, title, desc, icon, cta, href }) => (
              <div key={num} className="text-center relative z-10">
                <div className="w-18 h-18 mx-auto mb-5 relative">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-3xl">{icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-accent-500 rounded-full flex items-center justify-center text-white text-xs font-extrabold">
                    {num.replace('0', '')}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-4">{desc}</p>
                {cta && href && (
                  <Link href={href} className="btn-white text-sm px-5 py-2">{cta}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">Our Guarantees</span>
            <h2 className="section-title mb-4">Why Choose CleanWithBest?</h2>
            <p className="section-sub mx-auto text-center">
              We don't just clean — we commit. Eight reasons to trust us with your home or business.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-100 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                  <Icon size={22} className="text-brand-600" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ GOOGLE REVIEWS ══════════ */}
      <section id="reviews" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-tag">Customer Reviews</span>
            <h2 className="section-title mb-4">What Our Customers Say</h2>
          </div>

          {/* Review summary */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex flex-col items-center bg-white border-2 border-slate-100 rounded-3xl px-10 py-6 shadow-sm">
              <div className="font-heading text-6xl font-extrabold text-brand-600 leading-none">4.9</div>
              <div className="text-2xl text-amber-400 my-2">★★★★★</div>
              <div className="text-slate-500 text-sm font-medium">Based on 1,200+ Google Reviews</div>
            </div>
            <div className="space-y-2">
              {[[5,'85%'],[4,'11%'],[3,'3%'],[2,'1%'],[1,'0%']].map(([stars, pct]) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 w-3">{stars}</span>
                  <span className="text-amber-400 text-sm">★</span>
                  <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: pct }} />
                  </div>
                  <span className="text-sm text-slate-400">{pct}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" />Excellent communication</div>
              <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" />Punctual & reliable</div>
              <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" />Outstanding results</div>
              <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={16} className="text-green-500" />Worth every penny</div>
            </div>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* ══════════ BUSINESS TESTIMONIALS ══════════ */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">Business Clients</span>
            <h2 className="section-title mb-4">Trusted by Businesses</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bizTestimonials.map(({ name, role, company, text }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border-l-4 border-brand-600 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <Quote size={20} className="text-brand-200 mb-3" />
                <p className="text-slate-600 text-sm leading-relaxed italic mb-4">{text}</p>
                <div className="pt-3 border-t border-slate-50">
                  <div className="font-semibold text-slate-900 text-sm">{name}</div>
                  <div className="text-xs text-slate-400">{role}, {company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ACCREDITATIONS ══════════ */}
      <section className="py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-8">Accreditations & Certifications</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏅', title: 'Best Cleaning Company', sub: 'Regional Business Awards 2024 Winner' },
              { icon: '🌿', title: 'Eco-Friendly Certified', sub: 'Green Cleaning Alliance Member' },
              { icon: '💼', title: 'Living Wage Employer', sub: 'Paying all staff a fair living wage' },
              { icon: '🎓', title: 'BICSc Certified', sub: 'British Institute of Cleaning Science' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all duration-200">
                <div className="text-4xl shrink-0">{icon}</div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-brand-50 border-l-4 border-brand-600 rounded-r-2xl p-5 max-w-3xl mx-auto">
            <p className="text-slate-600 text-sm leading-relaxed">
              🏷️ We are proud to be a <strong className="text-slate-900">Living Wage Employer</strong>. Every member of our cleaning team is paid a fair living wage. We believe ethical business starts from within — taking care of our people means they take better care of yours.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ AREAS ══════════ */}
      <section id="areas" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">Service Coverage</span>
            <h2 className="section-title mb-4">Areas We Cover Across London</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              We serve homes and businesses across all London zones and boroughs. Don't see your postcode?{' '}
              <Link href="/contact" className="text-brand-600 font-semibold hover:underline">Contact us</Link> — we likely cover you!
            </p>
          </div>
          <div className="space-y-8 mb-10">
            {areaZones.map(({ zone, areas }) => (
              <div key={zone}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{zone}</p>
                <div className="flex flex-wrap gap-2">
                  {areas.map(area => (
                    <span key={area} className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium hover:bg-brand-600 hover:text-white hover:border-brand-600 cursor-default transition-all duration-200">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/quote" className="btn-primary">Get a Quote for Your Area <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">FAQs</span>
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know before booking.</p>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900 text-sm md:text-base">{q}</span>
                  <span className="faq-icon text-slate-400 text-xl font-thin shrink-0 w-6 h-6 flex items-center justify-center">+</span>
                </summary>
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">{a}</div>
              </details>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-8">
            Still have questions? <a href="tel:+447789602945" className="text-brand-600 font-semibold hover:underline">Call us on +44 7789 602945</a> or <Link href="/contact" className="text-brand-600 font-semibold hover:underline">send a message</Link>.
          </p>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="bg-brand-900 py-20" id="quote">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-accent-500/20 text-accent-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">Ready to Book?</span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Get a Free Quote in<br />Under 2 Minutes
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
            Fill in your property details online. We respond within 2 hours with a fixed, transparent price — no hidden fees, ever.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['Response within 2 hours', 'Fixed transparent pricing', 'No obligation to book', 'Flexible scheduling'].map(i => (
              <span key={i} className="flex items-center gap-2 text-white/75 text-sm font-medium">
                <CheckCircle size={15} className="text-accent-400 shrink-0" />{i}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/quote" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl">
              Get My Free Quote <ArrowRight size={20} />
            </Link>
            <a href="tel:+447789602945" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all">
              <Phone size={18} /> +44 7789 602945
            </a>
          </div>
          <p className="text-white/40 text-sm">Mon–Fri 8am–6pm · cleanwithbest@gmail.com</p>
        </div>
      </section>

    </main>
  );
}
