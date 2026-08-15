import Link from 'next/link';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';

const SIZES = {
  compact: {
    section: 'py-10 md:py-12',
    wrap: 'max-w-2xl',
    card: 'p-5 md:p-7',
    icon: 22,
    heading: 'text-xl md:text-2xl',
    body: 'text-sm',
  },
  default: {
    section: 'py-14 md:py-16',
    wrap: 'max-w-3xl',
    card: 'p-6 md:p-10',
    icon: 30,
    heading: 'text-2xl md:text-3xl',
    body: 'text-base',
  },
  large: {
    section: 'py-16 md:py-20',
    wrap: 'max-w-4xl',
    card: 'p-8 md:p-14',
    icon: 40,
    heading: 'text-3xl md:text-5xl',
    body: 'text-base md:text-lg',
  },
};

export default function FreeWebsiteOffer({ className = '', size = 'default' }) {
  const s = SIZES[size] || SIZES.default;

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-brand-50 ${s.section} ${className}`}>
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-brand-300/25 blur-3xl" />

      <div className={`relative mx-auto px-4 ${s.wrap}`}>
        <div className={`relative rounded-2xl border-2 border-dashed border-amber-300 bg-white text-center shadow-xl shadow-amber-900/10 ${s.card}`}>
          <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-amber-950 shadow-md shadow-amber-900/20">
            <Sparkles size={13} /> Limited Offer
          </span>

          <Globe className="mx-auto mb-3 mt-2 text-brand-600" size={s.icon} />
          <h2 className={`font-heading font-extrabold text-brand-800 ${s.heading}`}>
            Run a hotel or rent out flats? Get a free website.
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-slate-600 ${s.body}`}>
            Give us your full cleaning contract and we will build you a website — <strong className="text-brand-800">100% free of charge</strong>. Want us to take over your ongoing IT too? That's available as a separate paid service — <a href="https://ujyaaloit.com" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-700 underline hover:text-brand-900">UjyaaloIT.com</a> is the best place for all your IT-related work.
          </p>

          <div className="mx-auto mt-5 max-w-xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold text-amber-800">
            Only the website build is free. Ongoing IT takeover / support is a separate paid service, not included.
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn-primary-lg">
              Sign Up My Property <ArrowRight size={18} />
            </Link>
            <a href="https://ujyaaloit.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Visit UjyaaloIT.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
