import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { allServices, commercialServices, domesticServices, getServiceBySlug } from '@/frontend/lib/services';

export function generateStaticParams() {
  return allServices.map(service => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.title} from CleanWithBest. ${service.description}`,
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = (service.category === 'Domestic' ? domesticServices : commercialServices)
    .filter(item => item.slug !== service.slug)
    .slice(0, 6);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[linear-gradient(115deg,#ffffff_0%,#f8fafc_48%,#ecfeff_100%)]">
        <div className="mx-auto max-w-7xl px-4 pb-9 pt-4 md:pb-12 md:pt-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <span className="section-tag">
                <Sparkles size={14} className="text-accent-600" /> {service.category} cleaning
              </span>
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

            <aside className="rounded-xl border border-brand-100 bg-white p-6 shadow-xl shadow-brand-900/8">
              <p className="text-xs font-black uppercase tracking-widest text-brand-600">Quick summary</p>
              <h2 className="mt-2 font-heading text-2xl font-extrabold text-brand-800">{service.tagline}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Send the quote form and we will confirm the right price, timing and contact method before booking.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <span className="section-tag">Included</span>
            <h2 className="font-heading text-3xl font-extrabold text-slate-950">What this service covers</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.includes.map(item => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                  <CheckCircle size={17} className="mt-0.5 shrink-0 text-accent-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl bg-brand-800 p-6 text-white shadow-xl shadow-brand-900/10">
              <h2 className="font-heading text-xl font-bold">Need this cleaned?</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                Tell us the property details and we will reply by WhatsApp or call.
              </p>
              <Link href={`/quote?service=${encodeURIComponent(service.title)}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-brand-800 hover:bg-brand-50">
                Request Quote <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-brand-800">Contact direct</h2>
              <div className="mt-4 grid gap-2">
                <a href="tel:+447503494242" className="btn-outline justify-center"><Phone size={16} /> +44 7503 494242</a>
                <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center"><MessageCircle size={16} /> WhatsApp</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-tag">More services</span>
              <h2 className="font-heading text-3xl font-extrabold text-slate-950">Other {service.category.toLowerCase()} cleaning options</h2>
            </div>
            <Link href={service.category === 'Domestic' ? '/domestic' : '/commercial'} className="text-sm font-extrabold text-brand-700 hover:text-brand-900">
              View all {service.category.toLowerCase()} services
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(item => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <p className="text-xs font-black uppercase tracking-widest text-brand-600">{item.price}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-slate-950">{item.shortTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
