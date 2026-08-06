import QuoteForm from '@/frontend/components/QuoteForm';
import { CheckCircle, Phone, Clock, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Get a Free Quote',
  description: 'Get a free, no-obligation cleaning quote from CleanWithBest. Leave your contact details and we respond by WhatsApp or phone call.',
};

export default function QuotePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="section-tag-light">Free Quote</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Tell us what needs cleaning
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              Fill in the short form below. We will review the details and contact you by WhatsApp or phone call with a transparent quote.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {[
              { title: '1. Tell us the job', text: 'Choose the service, property type, postcode and any notes.' },
              { title: '2. We check the details', text: 'Our team reviews the request and confirms anything unclear.' },
              { title: '3. You get a clear quote', text: 'We contact you by WhatsApp or call with the price and earliest slot.' },
            ].map(({ title, text }) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-heading text-base font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Form */}
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why us */}
              <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4">Why CleanWithBest?</h3>
                <ul className="space-y-3">
                  {[
                    [CheckCircle, '100% Satisfaction Guarantee'],
                    [CheckCircle, 'Fully Insured Cleaners'],
                    [CheckCircle, 'Top 5% Vetted Cleaners'],
                    [Clock, 'WhatsApp or Call Within 2 Hours'],
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
              <div className="bg-brand-600 rounded-lg p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">Prefer WhatsApp or Call?</h3>
                <p className="text-white/75 text-sm mb-4">Leave your number in the quote form or speak directly with our team now.</p>
                <a href="tel:+447503494242" className="flex items-center gap-2 font-bold text-lg hover:text-accent-300 transition-colors">
                  <Phone size={18} /> +44 7503 494242
                </a>
                <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 font-bold text-lg hover:text-accent-300 transition-colors">
                  <MessageCircle size={18} /> WhatsApp +44 7503 494242
                </a>
                <a href="tel:+447789602945" className="mt-3 flex items-center gap-2 font-bold text-lg hover:text-accent-300 transition-colors">
                  <Phone size={18} /> +44 7789 602945
                </a>
                <a href="https://wa.me/447789602945" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 font-bold text-lg hover:text-accent-300 transition-colors">
                  <MessageCircle size={18} /> WhatsApp +44 7789 602945
                </a>
                <p className="text-white/50 text-xs mt-2">Available 24/7</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm">
                <h3 className="font-heading font-bold text-slate-900 text-lg mb-4">Helpful Details to Include</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  {[
                    'Property size and number of rooms',
                    'Preferred date or time window',
                    'Any difficult stains, access notes or parking notes',
                    'Whether you prefer WhatsApp or a phone call',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
