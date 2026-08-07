import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Phone, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Domestic Cleaning Services',
  description: 'Professional home cleaning from £17/hr. Regular cleaning, deep cleaning, end of tenancy and more. Fully insured, vetted cleaners.',
};

const services = [
  {
    id: 'regular', slug: 'regular-home-cleaning', code: 'REG', title: 'Regular Home Cleaning', price: 'From £17/hr',
    tagline: 'Keep your home consistently spotless',
    desc: 'Our regular home cleaning service is perfect for busy households who want a consistently clean home without the hassle. Choose from weekly, fortnightly or monthly visits — always the same cleaner who knows your home.',
    includes: ['All surfaces dusted and wiped down', 'Kitchen worktops, sink and hob cleaned', 'Bathroom cleaned and sanitised', 'Vacuuming throughout', 'Mopping hard floors', 'Skirting boards and light switches wiped', 'Bins emptied and re-lined', 'Glass and mirrors polished'],
    popular: false,
  },
  {
    id: 'deep', slug: 'deep-cleaning', code: 'DEEP', title: 'Deep Cleaning', price: 'From £179',
    tagline: 'A thorough top-to-bottom transformation',
    desc: 'Our deep cleaning service is far more thorough than a regular clean. We tackle every nook and cranny — areas that accumulate grime but are often overlooked. Perfect as a seasonal clean, before a party, or after a renovation.',
    includes: ['Everything in a regular clean, plus:', 'Inside oven, microwave and fridge', 'Inside all kitchen cupboards and drawers', 'Behind and under furniture and appliances', 'Limescale removal from all fixtures', 'Grout scrubbing in bathrooms', 'Blind and window ledge deep clean', 'Wall marks and scuff removal'],
    popular: false,
  },
  {
    id: 'end-of-tenancy', slug: 'end-of-tenancy-cleaning', code: 'TEN', title: 'End of Tenancy Cleaning', price: 'From £179',
    tagline: 'Guaranteed to get your deposit back',
    desc: 'Our end of tenancy cleaning service is designed to meet the highest landlord and letting agency standards. We follow a comprehensive checklist and guarantee our work — if the landlord isn\'t satisfied, we return and re-clean for free.',
    includes: ['Full deep clean of every room', 'Oven, hob, extractor fan degreasing', 'Inside all cupboards, wardrobes and drawers', 'Bathroom and en-suite deep sanitise', 'Interior window cleaning', 'Wall marks removed', 'Sealant and grouting cleaned', 'We follow the official tenancy deposit scheme checklist'],
    popular: true,
  },
  {
    id: 'move', slug: 'move-in-move-out-cleaning', code: 'MOVE', title: 'Move In / Move Out', price: 'From £179',
    tagline: 'Start fresh or leave nothing behind',
    desc: 'Whether you\'re moving into a new property or leaving your current home spotless for the next residents, our move-in/move-out cleaning service ensures the property is thoroughly cleaned to a professional standard.',
    includes: ['Complete property clean throughout', 'All surfaces sanitised', 'Kitchen and bathroom deep clean', 'Floors vacuumed and mopped', 'Windows cleaned internally', 'Bins emptied and sanitised', 'Same comprehensive standard as end of tenancy', 'Certificate of cleaning available on request'],
    popular: false,
  },
  {
    id: 'carpet', slug: 'carpet-upholstery-cleaning', code: 'CARPET', title: 'Carpet & Upholstery Cleaning', price: 'From £43/room',
    tagline: 'Revive your carpets and soft furnishings',
    desc: 'Professional hot water extraction cleaning removes deep-set stains, odors, bacteria and allergens that vacuuming alone can\'t tackle. We use professional-grade equipment to refresh carpets, rugs, sofas, chairs and curtains.',
    includes: ['Pre-treatment of all visible stains', 'Hot water extraction deep clean', 'Deodorising treatment included', 'Fabric protection spray (optional add-on)', 'Fast drying — typically 2–4 hours', 'Safe for all carpet fibre types', 'Rugs, sofas and chairs also treated'],
    popular: false,
  },
  {
    id: 'mattress', slug: 'mattress-cleaning', code: 'MATT', title: 'Mattress Cleaning', price: 'From £23 per mattress',
    tagline: 'Sleep cleaner, breathe easier',
    desc: 'Your mattress can harbour dust mites, dead skin cells, sweat and bacteria — all of which affect your sleep quality and health. Our professional mattress cleaning uses steam and UV treatment to sanitise and refresh.',
    includes: ['Vacuum pre-treatment to remove debris', 'High-temperature steam sanitisation', 'UV light dust mite treatment', 'Stain spot removal treatment', 'Deodorising and freshening spray', 'Allergen reduction — great for asthma sufferers', 'All mattress sizes and types covered'],
    popular: false,
  },
  {
    id: 'ironing', slug: 'ironing-laundry', code: 'IRON', title: 'Ironing & Laundry', price: 'From £18/hr',
    tagline: 'Reclaim your weekends',
    desc: 'Our professional ironing and laundry service takes one of the most tedious household chores off your hands. We can collect, launder and iron your clothes, or simply tackle the ironing pile you\'ve been avoiding.',
    includes: ['Collection and return service available', 'All garment types accepted', 'Shirts, trousers, dresses, bedding and more', 'Hung, folded or bagged to your preference', 'Fast 24-hour turnaround available', 'Careful handling of delicate and designer items', 'Combine with a cleaning visit for extra convenience'],
    popular: false,
  },
  {
    id: 'windows', slug: 'window-cleaning', code: 'WIN', title: 'Window Cleaning', price: 'From £29',
    tagline: 'Crystal-clear views, brighter rooms',
    desc: 'Streak-free window cleaning for homes and apartments. Our cleaners use pure water technology to deliver spotless results on interior and exterior windows without harsh chemicals.',
    includes: ['Interior and exterior window cleaning', 'Window frames and sills wiped clean', 'Streak-free pure water technology', 'Ground and upper floor access', 'Conservatory roof cleaning available', 'Regular scheduled visits available'],
    popular: false,
  },
];

const faqs = [
  { q: 'How do I prepare for my cleaning visit?', a: 'You don\'t need to do much! Simply tidy clutter so our cleaners can focus on the actual cleaning. Leave a note or mention any specific priorities when booking.' },
  { q: 'Do I need to be home during the clean?', a: 'Not at all. Many customers provide a key or entry code. All our cleaners are fully vetted, insured and trustworthy. We lock up securely when done.' },
  { q: 'Do your cleaners bring their own equipment?', a: 'Yes — all professional cleaning products and equipment are supplied. If you prefer us to use your own products for allergy reasons, just let us know.' },
  { q: 'What if I\'m not happy with the clean?', a: 'Contact us within 24 hours and we\'ll return to re-clean the affected areas at absolutely no extra charge. Your satisfaction is guaranteed.' },
  { q: 'Are your cleaners insured?', a: 'Absolutely. All our cleaning staff are fully insured. You\'re completely protected against any accidental damage or loss.' },
  { q: 'Can I have the same cleaner each time?', a: 'Yes — for regular bookings we always try to send the same cleaner. Consistency matters, and your cleaner will learn exactly how you like things done.' },
  { q: 'Do you work evenings and weekends?', a: 'We offer flexible scheduling including early mornings, evenings and some weekend slots. Let us know your preferences when getting a quote.' },
  { q: 'How long does each service take?', a: 'Timings depend on property size. A regular clean for a 2-bed flat takes around 2–3 hours. A deep clean typically takes 4–6 hours. We\'ll give you an estimated time when quoting.' },
];

export default function DomesticPage() {
  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_50%,#ecfeff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag">Domestic Cleaning</span>
            <h1 className="hero-title">Reliable home cleaning, priced clearly.</h1>
            <p className="hero-copy">Regular cleaning starts from £17/hour. Deep cleans, end-of-tenancy and specialist home services are quoted clearly before we start.</p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {['Clear quote before booking', 'Vetted cleaning team', 'Products can be supplied', 'Call or WhatsApp response'].map(i => (
                <div key={i} className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900 shadow-sm">
                  <CheckCircle size={15} className="shrink-0 text-accent-600" />{i}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary-lg">Get a Home Quote <ArrowRight size={18} /></Link>
              <a href="tel:+447503494242" className="btn-outline"><Phone size={15}/> +44 7503 494242</a>
            </div>
          </div>
          <div className="image-panel animate-float-soft">
            <Image
              src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=85"
              alt="Clean bright bedroom after domestic cleaning"
              width={720}
              height={760}
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-lg bg-white/90 p-3 text-center text-xs font-bold text-slate-700 shadow-lg backdrop-blur">
              {['Kitchen', 'Bathroom', 'Bedrooms'].map(item => <span key={item} className="rounded-md bg-slate-50 px-2 py-2">{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-room */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-tag">What We Clean</span>
            <h2 className="section-title mb-4">Room-by-Room Cleaning Checklist</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Here's exactly what our cleaners cover in every room during a standard regular clean.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { short: 'K', title: 'Kitchen', color: 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50',
                tasks: ['Sanitise all worktops', 'Clean hob & oven exterior', 'Clean sink & taps', 'Wipe appliance exteriors', 'Clean inside microwave', 'Mop floor', 'Wipe cabinet doors', 'Empty & re-line bins'] },
              { short: 'B', title: 'Bedroom', color: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50',
                tasks: ['Make beds / change linen', 'Dust all surfaces', 'Vacuum carpets / mop floors', 'Wipe mirrors', 'Clean interior windows', 'Wipe skirting boards', 'Tidy general areas', 'Vacuum under beds'] },
              { short: 'BA', title: 'Bathroom', color: 'border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50',
                tasks: ['Sanitise toilet inside & out', 'Clean bath and shower', 'Clean sink & taps', 'Scrub tiles & remove limescale', 'Polish mirrors', 'Mop floor', 'Replace towels', 'Empty & sanitise bin'] },
              { short: 'L', title: 'Living Room', color: 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50',
                tasks: ['Dust all surfaces & ornaments', 'Vacuum sofas & cushions', 'Vacuum carpets / mop floors', 'Wipe skirting boards & doors', 'Clean switches & sockets', 'Polish furniture', 'Clean interior windows', 'Tidy general areas'] },
            ].map(({ short, title, color, tasks }) => (
              <div key={title} className={`rounded-lg border p-6 transition hover:-translate-y-1 hover:shadow-lg ${color}`}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white font-heading text-sm font-black text-brand-700 shadow-sm">{short}</div>
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4">{title}</h3>
                <ul className="space-y-2">
                  {tasks.map(t => <li key={t} className="checklist-item">{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick price strip */}
      <div className="border-y border-slate-200 bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-slate-700 text-sm font-semibold">
          {services.slice(0, 5).map(({ slug, title, price }) => (
            <Link key={slug} href={`/services/${slug}`} className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-brand-50 hover:text-brand-800">
              <span className="text-accent-600">✓</span> {title}: <span className="text-brand-700">{price}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* All services */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-10 md:space-y-12">
          {services.map(({ id, slug, code, title, price, tagline, desc, includes, popular }) => (
            <div key={id} id={id} className="grid md:grid-cols-2 gap-10 items-start scroll-mt-24">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Link href={`/services/${slug}`} aria-label={`View ${title}`} className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-brand-50 px-2 font-heading text-xs font-black text-brand-700 transition hover:bg-brand-100">{code}</Link>
                  {popular && <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>}
                  <span className="price-badge">{price}</span>
                </div>
                <Link href={`/services/${slug}`} className="group inline-flex items-center gap-2">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-1 group-hover:text-brand-700">{title}</h2>
                  <ArrowRight size={18} className="mb-1 text-brand-500 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
                <p className="text-brand-600 font-semibold mb-4">{tagline}</p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">{desc}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/services/${slug}`} className="btn-outline text-sm">
                    View Service Page <ArrowRight size={14} />
                  </Link>
                  <Link href="/quote" className="btn-primary text-sm">
                    Get a Quote — {price} <ArrowRight size={14} />
                  </Link>
                  <a href="tel:+447503494242" className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 transition-colors">
                    <Phone size={13} /> Call for a Quote
                  </a>
                </div>
              </div>
              <div className={`rounded-lg p-6 border ${popular ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-slate-100'}`}>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <CheckCircle size={16} className="text-accent-600" /> What's Included
                </h3>
                <ul className="space-y-2.5">
                  {includes.map(item => <li key={item} className="checklist-item">{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits strip */}
      <section className="bg-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-800 mb-8">Why Choose Our Domestic Cleaning?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Fully Insured', 'Vetted Staff', 'Eco Products', 'Flexible Hours', 'Fair Pricing', '100% Guaranteed'].map(label => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 py-5 px-3">
                <CheckCircle className="mx-auto mb-2 text-accent-300" size={24} />
                <div className="text-slate-800 text-sm font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">FAQs</span>
            <h2 className="section-title">Domestic Cleaning FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900 text-sm">{q}</span>
                  <span className="faq-icon text-slate-400 text-xl shrink-0">+</span>
                </summary>
                <div className="px-6 pb-5 pt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-50">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-12 md:py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="mx-auto mb-4 text-accent-600" size={30} />
          <h2 className="font-heading text-3xl font-bold text-brand-800 mb-3">Ready for a cleaner home?</h2>
          <p className="text-slate-600 mb-8 text-lg">Send the quote form once and we will contact you by WhatsApp or phone.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary-lg">Get a Home Quote</Link>
            <a href="tel:+447503494242" className="btn-outline"><Phone size={16}/> +44 7503 494242</a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp +44 7503 494242</a>
            <a href="tel:+447789602945" className="btn-outline"><Phone size={16}/> +44 7789 602945</a>
            <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp +44 7789 602945</a>
          </div>
        </div>
      </section>
    </main>
  );
}
