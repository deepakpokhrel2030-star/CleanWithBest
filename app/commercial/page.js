import Image from 'next/image';
import Link from 'next/link';
import { Building2, ShoppingBag, Utensils, Dumbbell, GraduationCap, Warehouse, Droplets, Stethoscope, CheckCircle, ArrowRight, ChevronDown, Phone, MessageCircle, Clock3 } from 'lucide-react';

export const metadata = {
  title: 'Commercial Cleaning Services',
  description: 'Professional commercial cleaning for offices, retail, restaurants, gyms, schools and more. Flexible scheduling, fully insured.',
};

const services = [
  {
    id: 'office',
    icon: Building2,
    title: 'Office Cleaning',
    tagline: 'A cleaner office means a more productive team',
    desc: 'We provide professional, reliable office cleaning services tailored to your business. Our trained cleaners work around your schedule — early morning, evening or weekends — ensuring zero disruption to your operations.',
    includes: ['Desks, chairs and workstation sanitising', 'Kitchen and breakroom cleaning', 'Toilet and washroom hygiene', 'Reception and common area maintenance', 'Bin emptying and recycling management', 'Carpet vacuuming and hard floor mopping', 'Window ledges and internal glass'],
    clients: 'Law firms, tech companies, media agencies, studios, accountancy practices',
    popular: true,
  },
  {
    id: 'retail',
    icon: ShoppingBag,
    title: 'Retail Cleaning',
    tagline: 'First impressions start with a clean store',
    desc: 'Your retail environment reflects your brand. We keep your store sparkling clean and welcoming for customers, working around your opening hours to ensure minimal disruption to your business.',
    includes: ['Sales floor vacuuming and mopping', 'Fitting room and changing area hygiene', 'Window and glass display cleaning', 'Counter and display sanitising', 'Staff areas and breakrooms', 'Toilet facilities', 'Entrance and exit areas'],
    clients: 'Clothing stores, supermarkets, pharmacies, beauty salons, showrooms',
  },
  {
    id: 'restaurant',
    icon: Utensils,
    title: 'Restaurant & Hospitality',
    tagline: 'Meet health standards with confidence',
    desc: 'Food-service businesses require the highest hygiene standards. Our specialist cleaning teams are trained in food-safe cleaning protocols to keep your kitchen and dining areas compliant and spotless.',
    includes: ['Deep kitchen and commercial oven cleaning', 'Grease trap and exhaust hood degreasing', 'Walk-in fridge and freezer cleaning', 'Dining area sanitising between services', 'Bar and counter deep clean', 'Floor scrubbing and anti-slip treatment', 'Health inspection ready'],
    clients: 'Restaurants, cafes, bars, hotels, catering facilities, food courts',
    popular: true,
  },
  {
    id: 'gym',
    icon: Dumbbell,
    title: 'Gym & Fitness Centers',
    tagline: 'Keep your members safe and motivated',
    desc: 'Gyms are high-traffic environments where bacteria and viruses spread quickly. Our specialist gym cleaning service ensures all equipment, changing rooms and communal areas are properly disinfected and sanitised.',
    includes: ['All gym equipment wiping and disinfection', 'Changing room and locker hygiene', 'Shower and toilet sanitising', 'Reception and lounge areas', 'Studio floor cleaning and disinfection', 'Pool deck cleaning (where applicable)', 'High-touch surface focus'],
    clients: 'Gyms, fitness studios, swimming pools, sports centers, yoga studios',
  },
  {
    id: 'school',
    icon: GraduationCap,
    title: 'School & Education',
    tagline: 'Safe, hygienic environments for learning',
    desc: 'Schools and educational facilities require careful, thorough cleaning with child-safe products. Our fully vetted staff hold the necessary checks to work in educational settings.',
    includes: ['Classrooms, labs and workshops', 'Corridor and staircase cleaning', 'Canteen and kitchen hygiene', 'Toilet blocks and changing rooms', 'Sports halls and gymnasiums', 'Library and computer suite cleaning', 'Child-safe, non-toxic products only'],
    clients: 'Primary schools, secondary schools, colleges, universities, nurseries',
  },
  {
    id: 'warehouse',
    icon: Warehouse,
    title: 'Warehouse & Industrial',
    tagline: 'Heavy-duty cleaning for large-scale facilities',
    desc: 'Industrial and warehouse environments require specialist cleaning equipment and expertise. Our teams are trained in high-access cleaning, industrial machinery cleaning and large-scale floor maintenance.',
    includes: ['Industrial floor scrubbing and polishing', 'High-access and racking cleaning', 'Machinery and equipment degreasing', 'Loading bay and dock areas', 'Welfare facilities and offices', 'Spillage cleaning and response', 'Pressure washing services'],
    clients: 'Warehouses, factories, manufacturing plants, distribution centers',
  },
  {
    id: 'washroom',
    icon: Droplets,
    title: 'Washroom Services',
    tagline: 'Complete washroom hygiene management',
    desc: 'We provide full washroom hygiene services including regular deep cleaning, consumables management and specialist sanitary services. Everything your washrooms need to remain clean, hygienic and fully stocked.',
    includes: ['Regular deep cleaning and sanitising', 'Consumables (soap, paper, sanitiser)', 'Air freshener and odor control units', 'Sanitary disposal services', 'Urinal descaling and hygiene treatment', 'Mirror and fixture polishing', 'Regular service visits scheduled to your needs'],
    clients: 'All commercial premises with shared washroom facilities',
  },
  {
    id: 'medical',
    icon: Stethoscope,
    title: 'Medical & Healthcare',
    tagline: 'Infection-control grade cleaning',
    desc: 'Healthcare facilities demand the highest standards of hygiene. Our specialist medical cleaning teams are trained in infection-control procedures, using NHS-approved products and techniques.',
    includes: ['Clinical area cleaning to infection-control standards', 'Terminal cleaning of consulting rooms', 'Waiting room and reception hygiene', 'Medical equipment surface sanitising', 'Decontamination services', 'Waste disposal and biohazard protocols', 'CQC-compliant cleaning procedures'],
    clients: 'Dental practices, GP surgeries, clinics, care homes, opticians',
  },
];

const faqs = [
  { q: 'Can you clean outside of business hours?', a: 'Absolutely. We offer early morning, evening and weekend cleaning slots to ensure zero disruption to your business operations. We\'ll work around your schedule entirely.' },
  { q: 'Do you provide the cleaning equipment and products?', a: 'Yes, we supply all professional cleaning equipment and products. We can also use your preferred products if required for compliance or environmental reasons.' },
  { q: 'Can I get a regular contract rather than one-off cleans?', a: 'Yes — most of our commercial clients opt for ongoing regular contracts (daily, 3x week, weekly etc.). This ensures consistent standards and preferential pricing.' },
  { q: 'Are your commercial cleaners DBS checked?', a: 'All our staff are fully background-checked and reference-verified. For educational and healthcare settings, we ensure appropriate enhanced checks are in place.' },
  { q: 'What is your minimum contract term?', a: 'We offer flexible arrangements. While we recommend a minimum 3-month contract for regular services to ensure scheduling consistency, we\'re happy to discuss your specific needs.' },
];

export default function CommercialPage() {
  return (
    <main>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_48%,#eef2ff_100%)]" />
        <div className="page-hero-inner">
          <div className="animate-reveal-up">
            <span className="section-tag">Commercial Cleaning</span>
            <h1 className="hero-title">Cleaner workplaces with less disruption.</h1>
            <p className="hero-copy">
              Office, retail, hospitality, gym and industrial cleaning built around your opening hours. Tell us the site details and we will send a clear business quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary-lg">Get a Business Quote <ArrowRight size={18} /></Link>
              <a href="tel:+447503494242" className="btn-outline">Call +44 7503 494242</a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp +44 7503 494242</a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Out-of-hours slots', 'Regular contracts', 'One-off deep cleans'].map(item => (
                <div key={item} className="stat-pill flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Clock3 size={15} className="text-brand-600" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="image-panel animate-float-soft">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85"
              alt="Clean modern office workspace"
              width={720}
              height={760}
              className="h-[420px] w-full object-cover md:h-[520px]"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-bold uppercase text-brand-700">Business cleaning</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">Offices, retail spaces, restaurants, gyms and shared premises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {services.map(({ id, icon: Icon, title, tagline, desc, includes, clients, popular }) => (
            <div key={id} id={id} className="grid md:grid-cols-2 gap-10 items-start scroll-mt-24">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Icon size={22} className="text-brand-600" />
                  </div>
                  {popular && <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>}
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-1">{title}</h2>
                <p className="text-brand-600 font-semibold mb-4">{tagline}</p>
                <p className="text-slate-600 leading-relaxed mb-4">{desc}</p>
                <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 mb-6">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">We serve: </span>
                  <span className="text-sm text-slate-600">{clients}</span>
                </div>
                <Link href="/quote" className="btn-primary text-sm px-5 py-2.5">
                  Get a Business Quote <ArrowRight size={14} />
                </Link>
              </div>
              <div className={`rounded-lg border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg ${popular ? 'border-brand-200 bg-brand-50' : 'bg-slate-50'}`}>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-accent-600" /> Service Includes
                </h3>
                <ul className="space-y-2.5">
                  {includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="text-accent-600 mt-0.5 shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us for business */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">Business Benefits</span>
            <h2 className="section-title mb-4">Why Businesses Choose Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Flexible Contracts', desc: 'Daily, weekly, monthly or bespoke — we design contracts around your schedule and budget.' },
              { title: 'Key Holding', desc: 'We can hold your keys securely so we can clean out of hours with zero disruption to your business.' },
              { title: 'Dedicated Contact', desc: 'Commercial clients get a clear point of contact who understands the site requirements.' },
              { title: 'Consistent Staff', desc: 'We aim to assign the same cleaning team to your premises for reliable results.' },
              { title: 'Fully Insured Staff', desc: 'Cleaning staff are fully insured for peace of mind while working on your premises.' },
              { title: 'Service Notes', desc: 'We keep cleaning requirements and quality notes clear so standards stay consistent.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="mb-3 text-brand-600" size={24} />
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag">FAQs</span>
            <h2 className="section-title">Commercial Cleaning FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="bg-white rounded-lg border border-slate-100 shadow-sm group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 text-sm md:text-base">{q}</span>
                  <ChevronDown size={18} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-3">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-950 mb-4">Ready to Transform Your Workplace?</h2>
          <p className="text-slate-600 mb-8">Get a free commercial cleaning quote. We'll respond within 2 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quote" className="btn-primary">Get a Business Quote</Link>
            <a href="tel:+447503494242" className="btn-outline"><Phone size={16} /> +44 7503 494242</a>
            <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle size={16} /> WhatsApp +44 7503 494242</a>
            <a href="tel:+447789602945" className="btn-outline"><Phone size={16} /> +44 7789 602945</a>
            <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle size={16} /> WhatsApp +44 7789 602945</a>
          </div>
        </div>
      </section>
    </main>
  );
}
