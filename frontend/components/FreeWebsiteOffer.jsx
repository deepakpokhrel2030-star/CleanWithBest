import Link from 'next/link';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';

export default function FreeWebsiteOffer({ className = '' }) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-brand-50 py-14 md:py-16 ${className}`}>
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-brand-300/25 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="relative rounded-2xl border-2 border-dashed border-amber-300 bg-white p-6 text-center shadow-xl shadow-amber-900/10 md:p-10">
          <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-amber-950 shadow-md shadow-amber-900/20">
            <Sparkles size={13} /> Limited Offer
          </span>

          <Globe className="mx-auto mb-3 mt-2 text-brand-600" size={30} />
          <h2 className="font-heading text-2xl font-extrabold text-brand-800 md:text-3xl">
            Run a hotel or rent out flats? Get a free website.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Give us your full cleaning contract and we will build you a website — <strong className="text-brand-800">100% free of charge</strong>. Want us to take over your ongoing IT too? That's available as a separate paid service — <strong className="text-brand-800">UjyaaloIT.com</strong> is the best place for all your IT-related work.
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
