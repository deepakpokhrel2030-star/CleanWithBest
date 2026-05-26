import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CleanWithBest. Call, email or fill in our contact form and we\'ll respond within 2 hours.',
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Get in Touch</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              We'd Love to Hear<br />From You
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              Our friendly team is ready to help. Whether you have a question, need a quote or want to book a clean — we're here.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left: info */}
            <div>
              <span className="section-tag">Contact Details</span>
              <h2 className="section-title mb-6">Reach Us Any Way You Like</h2>
              <div className="space-y-5 mb-10">
                {[
                  { icon: Phone, title: 'Call Us', detail: '+44 7789 602945', sub: 'Available 24/7', href: 'tel:+447789602945' },
                  { icon: Mail, title: 'Email Us', detail: 'cleanwithbest@gmail.com', sub: 'We respond within 2 hours', href: 'mailto:cleanwithbest@gmail.com' },
                  { icon: MessageCircle, title: 'Live Chat', detail: 'Chat with us online', sub: 'Available 24/7', href: '#' },
                  { icon: MapPin, title: 'Our Office', detail: '12 Bishopsgate', sub: 'London EC2N 4BQ', href: '#' },
                  { icon: Clock, title: 'Availability', detail: 'Available 24/7', sub: 'We never close', href: null },
                ].map(({ icon: Icon, title, detail, sub, href }) => (
                  <div key={title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-brand-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{title}</div>
                      {href ? (
                        <a href={href} className="text-brand-600 font-medium hover:text-brand-800 transition-colors">{detail}</a>
                      ) : (
                        <div className="text-slate-700 font-medium">{detail}</div>
                      )}
                      <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Need a quote instead?</h3>
                <p className="text-slate-500 text-sm mb-4">Head to our dedicated quote page for a more detailed quote request with pricing estimates.</p>
                <Link href="/quote" className="btn-primary text-sm">Get a Free Quote →</Link>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-100 rounded-2xl h-72 flex items-center justify-center border border-slate-200">
            <div className="text-center">
              <MapPin size={40} className="text-brand-300 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">12 Bishopsgate, London, EC2N 4BQ</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 text-sm font-semibold mt-2 inline-block hover:underline">
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Not sure what you need?</h2>
          <p className="text-white/80 mb-8">Give us a call or fill in a quote request and our team will recommend the perfect cleaning solution for your home or business.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+447789602945" className="btn-white">📞 Call +44 7789 602945</a>
            <Link href="/quote" className="btn-outline">Get a Free Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
