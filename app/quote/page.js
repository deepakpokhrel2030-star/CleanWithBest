import QuoteForm from '@/components/QuoteForm';
import { CheckCircle, Phone, Clock } from 'lucide-react';

export const metadata = {
  title: 'Get a Free Quote',
  description: 'Get a free, no-obligation cleaning quote from CleanWithBest. We respond within 2 hours with transparent pricing.',
};

export default function QuotePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Free Quote</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Get Your Free,<br />No-Obligation Quote
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              Fill in the form below and we'll get back to you within 2 hours with a transparent, competitive quote. No hidden fees. Ever.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Form */}
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why us */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4">Why CleanWithBest?</h3>
                <ul className="space-y-3">
                  {[
                    [CheckCircle, '100% Satisfaction Guarantee'],
                    [CheckCircle, 'Fully Insured Cleaners'],
                    [CheckCircle, 'Top 5% Vetted Cleaners'],
                    [Clock, 'Response Within 2 Hours'],
                    [CheckCircle, 'Eco-Friendly Products'],
                    [CheckCircle, 'Fair Pricing, No Hidden Fees'],
                  ].map(([Icon, label]) => (
                    <li key={label} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Icon size={16} className="text-accent-600 shrink-0" /> {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call instead */}
              <div className="bg-brand-600 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">Prefer to Call?</h3>
                <p className="text-white/75 text-sm mb-4">Speak directly with our friendly team for an instant quote.</p>
                <a href="tel:+447789602945" className="flex items-center gap-2 font-bold text-lg hover:text-accent-300 transition-colors">
                  <Phone size={18} /> +44 7789 602945
                </a>
                <p className="text-white/50 text-xs mt-2">Mon–Fri: 8am–6pm</p>
              </div>

              {/* Process */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  {[
                    { num: '1', text: 'We review your quote request' },
                    { num: '2', text: 'We call or email you within 2 hours' },
                    { num: '3', text: 'You receive a transparent, fixed quote' },
                    { num: '4', text: 'You choose if and when to book' },
                    { num: '5', text: 'We send your dedicated cleaner!' },
                  ].map(({ num, text }) => (
                    <div key={num} className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">{num}</div>
                      <span className="text-sm text-slate-600">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
