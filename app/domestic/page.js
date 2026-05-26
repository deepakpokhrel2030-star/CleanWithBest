import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Phone, ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'Domestic Cleaning Services',
  description: 'Professional home cleaning from £15/hr. Regular cleaning, deep cleaning, end of tenancy and more. Fully insured, vetted cleaners.',
};

const services = [
  {
    id: 'regular', emoji: '🏠', title: 'Regular Home Cleaning', price: 'From £15/hr',
    tagline: 'Keep your home consistently spotless',
    desc: 'Our regular home cleaning service is perfect for busy households who want a consistently clean home without the hassle. Choose from weekly, fortnightly or monthly visits — always the same cleaner who knows your home.',
    includes: ['All surfaces dusted and wiped down', 'Kitchen worktops, sink and hob cleaned', 'Bathroom cleaned and sanitised', 'Vacuuming throughout', 'Mopping hard floors', 'Skirting boards and light switches wiped', 'Bins emptied and re-lined', 'Glass and mirrors polished'],
    popular: false,
  },
  {
    id: 'deep', emoji: '✨', title: 'Deep Cleaning', price: 'From £169',
    tagline: 'A thorough top-to-bottom transformation',
    desc: 'Our deep cleaning service is far more thorough than a regular clean. We tackle every nook and cranny — areas that accumulate grime but are often overlooked. Perfect as a seasonal clean, before a party, or after a renovation.',
    includes: ['Everything in a regular clean, plus:', 'Inside oven, microwave and fridge', 'Inside all kitchen cupboards and drawers', 'Behind and under furniture and appliances', 'Limescale removal from all fixtures', 'Grout scrubbing in bathrooms', 'Blind and window ledge deep clean', 'Wall marks and scuff removal'],
    popular: false,
  },
  {
    id: 'end-of-tenancy', emoji: '🔑', title: 'End of Tenancy Cleaning', price: 'From £195',
    tagline: 'Guaranteed to get your deposit back',
    desc: 'Our end of tenancy cleaning service is designed to meet the highest landlord and letting agency standards. We follow a comprehensive checklist and guarantee our work — if the landlord isn\'t satisfied, we return and re-clean for free.',
    includes: ['Full deep clean of every room', 'Oven, hob, extractor fan degreasing', 'Inside all cupboards, wardrobes and drawers', 'Bathroom and en-suite deep sanitise', 'Interior window cleaning', 'Wall marks removed', 'Sealant and grouting cleaned', 'We follow the official tenancy deposit scheme checklist'],
    popular: true,
  },
  {
    id: 'move', emoji: '📦', title: 'Move In / Move Out', price: 'From £169',
    tagline: 'Start fresh or leave nothing behind',
    desc: 'Whether you\'re moving into a new property or leaving your current home spotless for the next residents, our move-in/move-out cleaning service ensures the property is thoroughly cleaned to a professional standard.',
    includes: ['Complete property clean throughout', 'All surfaces sanitised', 'Kitchen and bathroom deep clean', 'Floors vacuumed and mopped', 'Windows cleaned internally', 'Bins emptied and sanitised', 'Same comprehensive standard as end of tenancy', 'Certificate of cleaning available on request'],
    popular: false,
  },
  {
    id: 'carpet', emoji: '🛋️', title: 'Carpet & Upholstery Cleaning', price: 'From £65/room',
    tagline: 'Revive your carpets and soft furnishings',
    desc: 'Professional hot water extraction cleaning removes deep-set stains, odors, bacteria and allergens that vacuuming alone can\'t tackle. We use professional-grade equipment to refresh carpets, rugs, sofas, chairs and curtains.',
    includes: ['Pre-treatment of all visible stains', 'Hot water extraction deep clean', 'Deodorising treatment included', 'Fabric protection spray (optional add-on)', 'Fast drying — typically 2–4 hours', 'Safe for all carpet fibre types', 'Rugs, sofas and chairs also treated'],
    popular: false,
  },
  {
    id: 'mattress', emoji: '🛏️', title: 'Mattress Cleaning', price: 'From £45 per mattress',
    tagline: 'Sleep cleaner, breathe easier',
    desc: 'Your mattress can harbour dust mites, dead skin cells, sweat and bacteria — all of which affect your sleep quality and health. Our professional mattress cleaning uses steam and UV treatment to sanitise and refresh.',
    includes: ['Vacuum pre-treatment to remove debris', 'High-temperature steam sanitisation', 'UV light dust mite treatment', 'Stain spot removal treatment', 'Deodorising and freshening spray', 'Allergen reduction — great for asthma sufferers', 'All mattress sizes and types covered'],
    popular: false,
  },
  {
    id: 'ironing', emoji: '👕', title: 'Ironing & Laundry', price: 'From £20/hr',
    tagline: 'Reclaim your weekends',
    desc: 'Our professional ironing and laundry service takes one of the most tedious household chores off your hands. We can collect, launder and iron your clothes, or simply tackle the ironing pile you\'ve been avoiding.',
    includes: ['Collection and return service available', 'All garment types accepted', 'Shirts, trousers, dresses, bedding and more', 'Hung, folded or bagged to your preference', 'Fast 24-hour turnaround available', 'Careful handling of delicate and designer items', 'Combine with a cleaning visit for extra convenience'],
    popular: false,
  },
  {
    id: 'windows', emoji: '🪟', title: 'Window Cleaning', price: 'From £35',
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
  { q: 'Are your cleaners insured?', a: 'Absolutely. All our cleaning staff are covered by £10M public liability insurance. You\'re completely protected against any accidental damage or loss.' },
  { q: 'Can I have the same cleaner each time?', a: 'Yes — for regular bookings we always try to send the same cleaner. Consistency matters, and your cleaner will learn exactly how you like things done.' },
  { q: 'Do you work evenings and weekends?', a: 'We offer flexible scheduling including early mornings, evenings and some weekend slots. Let us know your preferences when getting a quote.' },
  { q: 'How long does each service take?', a: 'Timings depend on property size. A regular clean for a 2-bed flat takes around 2–3 hours. A deep clean typically takes 4–6 hours. We\'ll give you an estimated time when quoting.' },
];

export default function DomesticPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-950 to-brand-700 py-20" style={{ background: 'linear-gradient(135deg, #050e1f 0%, #1a5fb4 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Domestic Cleaning</span>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Domestic Cleaning<br />Services
              </h1>
              <p className="text-white/70 text-lg mb-3">Professional home cleaning — from just £15/hour</p>
              <ul className="space-y-2 mb-8">
                {['£10M public liability insurance', 'Award-winning cleaning service', 'Replacement & sickness cover', '100% background checked cleaners'].map(i => (
                  <li key={i} className="flex items-center gap-2.5 text-white/80 text-sm">
                    <span className="w-4 h-4 rounded-full bg-accent-500/30 border border-accent-500/50 flex items-center justify-center text-accent-300 text-xs flex-shrink-0">✓</span>{i}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/quote" className="btn-white-lg">Book a Cleaner Now!</Link>
                <a href="tel:+447789602945" className="btn-outline-white-lg"><Phone size={15}/> Call Us</a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <Image
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80"
                alt="Home cleaning"
                width={550} height={400}
                className="rounded-3xl object-cover w-full h-[360px] shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                <div className="font-heading text-3xl font-extrabold text-brand-600">4.9★</div>
                <div className="text-xs font-semibold text-slate-600">Google Rated · 1,200+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-room */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">What We Clean</span>
            <h2 className="section-title mb-4">Room-by-Room Cleaning Checklist</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Here's exactly what our cleaners cover in every room during a standard regular clean.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🍳', title: 'Kitchen', color: 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50',
                tasks: ['Sanitise all worktops', 'Clean hob & oven exterior', 'Clean sink & taps', 'Wipe appliance exteriors', 'Clean inside microwave', 'Mop floor', 'Wipe cabinet doors', 'Empty & re-line bins'] },
              { emoji: '🛏️', title: 'Bedroom', color: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50',
                tasks: ['Make beds / change linen', 'Dust all surfaces', 'Vacuum carpets / mop floors', 'Wipe mirrors', 'Clean interior windows', 'Wipe skirting boards', 'Tidy general areas', 'Vacuum under beds'] },
              { emoji: '🚿', title: 'Bathroom', color: 'border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50',
                tasks: ['Sanitise toilet inside & out', 'Clean bath and shower', 'Clean sink & taps', 'Scrub tiles & remove limescale', 'Polish mirrors', 'Mop floor', 'Replace towels', 'Empty & sanitise bin'] },
              { emoji: '🛋️', title: 'Living Room', color: 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50',
                tasks: ['Dust all surfaces & ornaments', 'Vacuum sofas & cushions', 'Vacuum carpets / mop floors', 'Wipe skirting boards & doors', 'Clean switches & sockets', 'Polish furniture', 'Clean interior windows', 'Tidy general areas'] },
            ].map(({ emoji, title, color, tasks }) => (
              <div key={title} className={`rounded-2xl border p-6 ${color} hover:shadow-lg transition-all duration-300`}>
                <div className="text-4xl mb-3">{emoji}</div>
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
      <div className="bg-brand-600 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-white text-sm font-semibold">
          {[['Regular Clean', 'From £15/hr'], ['Deep Clean', 'From £169'], ['End of Tenancy', 'From £195'], ['Move In/Out', 'From £169'], ['Carpet Cleaning', 'From £65/room']].map(([service, price]) => (
            <span key={service} className="flex items-center gap-2">
              <span className="text-accent-300">✓</span> {service}: <span className="text-accent-300">{price}</span>
            </span>
          ))}
        </div>
      </div>

      {/* All services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {services.map(({ id, emoji, title, price, tagline, desc, includes, popular }) => (
            <div key={id} id={id} className="grid md:grid-cols-2 gap-10 items-start scroll-mt-24">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{emoji}</span>
                  {popular && <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>}
                  <span className="price-badge">{price}</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-1">{title}</h2>
                <p className="text-brand-600 font-semibold mb-4">{tagline}</p>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">{desc}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/quote" className="btn-primary text-sm">
                    Book Now — {price} <ArrowRight size={14} />
                  </Link>
                  <a href="tel:+447789602945" className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 transition-colors">
                    <Phone size={13} /> Call for a Quote
                  </a>
                </div>
              </div>
              <div className={`rounded-2xl p-6 border ${popular ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-slate-100'}`}>
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
      <section className="bg-brand-900 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-8">Why Choose Our Domestic Cleaning?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[['🛡️', 'Fully Insured'], ['⭐', '4.9★ Rated'], ['✅', 'Vetted Staff'], ['🌿', 'Eco Products'], ['⏰', 'Flexible Hours'], ['💰', 'Fair Pricing']].map(([icon, label]) => (
              <div key={label} className="bg-white/10 rounded-2xl py-5 px-3">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-white text-sm font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">FAQs</span>
            <h2 className="section-title">Domestic Cleaning FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-3">Ready for a Cleaner Home?</h2>
          <p className="text-white/80 mb-8 text-lg">Get a free, no-obligation quote. We'll respond within 2 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-white-lg">Book a Cleaner Now!</Link>
            <a href="tel:+447789602945" className="btn-outline-white-lg"><Phone size={16}/> +44 7789 602945</a>
          </div>
        </div>
      </section>
    </main>
  );
}
