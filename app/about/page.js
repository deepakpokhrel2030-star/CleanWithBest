import Image from 'next/image';
import Link from 'next/link';
import { Heart, Leaf, Users, Award, CheckCircle, ArrowRight, Shield, Clock } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about CleanWithBest — our story, values, team and commitment to delivering the best cleaning services.',
};

const team = [
  { name: 'Deepak Pokhrel', role: 'Co-Founder & CEO', initials: 'DP', bio: 'Co-founded CleanWithBest with a passion for delivering exceptional cleaning services across London. Drives the vision, strategy and growth of the business.' },
  { name: 'Krishna Prasad Sah', role: 'Co-Founder & Operations Director', initials: 'KS', bio: 'Co-founded CleanWithBest and oversees all day-to-day cleaning operations, quality control and client satisfaction across every service.' },
  { name: 'Emma Clarke', role: 'Head of Commercial', initials: 'EC', bio: 'Manages all B2B client relationships and bespoke commercial contracts. 10 years experience in facilities management.' },
  { name: 'Tom Patel', role: 'Training Manager', initials: 'TP', bio: 'Designs and delivers all cleaner training programs. Ensures every team member meets our exacting standards.' },
  { name: 'Olivia Brown', role: 'Client Experience', initials: 'OB', bio: 'Dedicated to making sure every single customer interaction is exceptional. The voice of the customer internally.' },
  { name: 'James Wilson', role: 'Head of Sustainability', initials: 'JW', bio: 'Champions our green cleaning initiatives and eco-friendly product sourcing across all operations.' },
];

const values = [
  { icon: Heart, title: 'Customer First, Always', desc: 'Every decision we make starts with one question: is this the best thing for our customers? Your satisfaction drives everything we do.' },
  { icon: Award, title: 'Uncompromising Quality', desc: 'We\'re not satisfied with "good enough". Our standards are sky-high and we hold every cleaner and every clean to them, without exception.' },
  { icon: Leaf, title: 'Ethical & Sustainable', desc: 'We use eco-friendly products, pay living wages and operate with integrity. Good business means being good to people and the planet.' },
  { icon: Users, title: 'People Matter', desc: 'Our team members are the heartbeat of our company. We invest in their training, wellbeing and fair pay because happy staff create happy customers.' },
  { icon: Shield, title: 'Trustworthiness', desc: 'You invite us into your home or business. We take that trust seriously. Every cleaner is fully vetted, insured and held to a strict code of conduct.' },
  { icon: Clock, title: 'Reliability', desc: 'We show up on time, every time. No excuses. Consistency and reliability are the foundations of every great cleaning relationship.' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Story</span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              We're CleanWithBest
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              Founded with a simple promise: to deliver cleaning services so good that customers never need to look elsewhere. That promise drives everything we do today.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="section-tag">Our Story</span>
              <h2 className="section-title mb-5">Built on a Belief That<br />Cleaning Can Be Done Better</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                CleanWithBest was founded by Deepak Pokhrel and Krishna Prasad Sah, who saw firsthand how frustrating it was to find a truly reliable, high-quality cleaning service in London. Too many providers over-promised and under-delivered — they set out to change that.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                We started with a simple belief: that professional cleaning should be done properly, every single time. We invest in the best people, the best products and the best processes — because we believe our clients deserve nothing less.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every clean is treated with the same care and attention as the first — because for our customers, it matters just as much every time.
              </p>
              <Link href="/quote" className="btn-primary">Work With Us <ArrowRight size={16} /></Link>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80"
                alt="Our cleaning team"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5 border-2 border-brand-50">
                <div className="font-heading text-3xl font-extrabold text-brand-600">£10M</div>
                <div className="text-sm font-semibold text-slate-700">Public Liability</div>
                <div className="text-xs text-slate-400">Fully insured</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[['£10M', 'Public Liability Cover'], ['Top 5%', 'Cleaners Only Hired'], ['100%', 'Satisfaction Guaranteed']].map(([num, label]) => (
              <div key={label} className="bg-brand-50 rounded-2xl p-6 text-center border border-brand-100">
                <div className="font-heading text-3xl md:text-4xl font-extrabold text-brand-600 mb-1">{num}</div>
                <div className="text-slate-500 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title mb-4">What We Stand For</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Our values aren't just words on a wall — they're the principles behind every decision we make and every clean we deliver.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-600" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title mb-4">Meet the People Behind the Clean</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Our leadership team brings decades of combined experience in cleaning, hospitality and business management.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(({ name, role, initials, bio }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-600 to-accent-500 rounded-full flex items-center justify-center text-white font-heading font-bold text-xl mx-auto mb-4">
                  {initials}
                </div>
                <h3 className="font-heading font-semibold text-slate-900 text-lg">{name}</h3>
                <p className="text-brand-600 text-sm font-medium mb-3">{role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-brand-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-tag-light">Certified & Trusted</span>
            <h2 className="section-title-light mb-3">Our Accreditations</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🌿', title: 'Eco-Friendly Products', sub: 'Non-toxic, safe for children & pets' },
              { icon: '💼', title: 'Living Wage Employer', sub: 'All staff paid a fair living wage' },
              { icon: '🛡️', title: '£10M Public Liability', sub: 'Full cover on every single clean' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="bg-white/10 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-3">{icon}</div>
                <h4 className="text-white font-semibold mb-1">{title}</h4>
                <p className="text-white/50 text-xs">{sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-2xl mx-auto text-center">
            <p className="text-white/60 text-sm leading-relaxed">
              We are a proud <strong className="text-white">Living Wage Employer</strong>. All our cleaning professionals are paid a fair living wage that reflects the value of their work. We believe that ethical business starts from within.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-tag">Our Promise</span>
              <h2 className="section-title mb-5">The CleanWithBest Difference</h2>
              <ul className="space-y-4">
                {[
                  ['Top 5% of applicants hired', 'We only recruit from the very top of the applicant pool. Less than 5% of applicants make our team.'],
                  ['6+ months experience required', 'No beginners. Every cleaner must demonstrate proven professional experience before joining us.'],
                  ['Full background checks', 'Every cleaner is background-checked, reference-verified and personally interviewed by our management team.'],
                  ['Ongoing training', 'Our training never stops. Regular refresher sessions keep our team up to date with best practices and new techniques.'],
                  ['£10M insured', 'Full public liability cover for complete peace of mind on every single clean.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-accent-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 text-sm">{title}</span>
                      <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-6">Ready to experience the difference?</h3>
              <p className="text-slate-600 mb-6">Get a free, no-obligation quote. We respond within 2 hours and our team is always happy to answer any questions.</p>
              <div className="space-y-3">
                <Link href="/quote" className="btn-primary w-full justify-center">Get a Free Quote</Link>
                <Link href="/contact" className="btn-primary w-full justify-center bg-white text-brand-700 hover:bg-brand-50 border-2 border-brand-200">Contact Us</Link>
                <a href="tel:+447789602945" className="flex justify-center items-center gap-2 text-brand-600 font-semibold text-sm hover:text-brand-800 transition-colors">
                  📞 +44 7789 602945
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
