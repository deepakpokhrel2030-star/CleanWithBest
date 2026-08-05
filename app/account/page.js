import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CalendarCheck, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AccountMessageForm from '@/frontend/components/AccountMessageForm';
import { getSessionUser } from '@/backend/auth';

export const metadata = {
  title: 'My Account',
  description: 'CleanWithBest customer account and company messaging.',
};

export const dynamic = 'force-dynamic';

export default function AccountPage() {
  const token = cookies().get('cwb_session')?.value;
  const user = getSessionUser(token);
  if (!user) redirect('/login');

  return (
    <main className="bg-slate-50">
      <section className="bg-brand-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <span className="section-tag-light">My Account</span>
            <h1 className="font-heading text-4xl font-extrabold text-white md:text-5xl">Welcome, {user.name}</h1>
            <p className="mt-4 text-lg text-white/70">Send a direct message to CleanWithBest and we will handle it from the company dashboard.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-100">
              <ShieldCheck size={26} className="text-brand-700" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900">Account Details</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-400">Name</p>
                <p className="font-medium text-slate-800">{user.name}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400">Email</p>
                <p className="font-medium text-slate-800">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="font-semibold text-slate-400">Phone</p>
                  <p className="font-medium text-slate-800">{user.phone}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-brand-100 bg-brand-50 p-6">
            <h3 className="font-heading text-lg font-bold text-slate-900">Need a new quote?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Use the full quote form for pricing, rooms and cleaning details.</p>
            <Link href="/quote" className="btn-primary mt-5 w-full">Get a Free Quote</Link>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Mail, label: 'Message Company', value: 'Direct inbox' },
              { icon: CalendarCheck, label: 'Response Time', value: 'Within 2 hours' },
              { icon: Sparkles, label: 'Support', value: '24/7 team' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <Icon size={20} className="mb-3 text-accent-600" />
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="font-heading text-xl font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold text-slate-900">Send a Message to the Company</h2>
            <AccountMessageForm />
          </div>
        </div>
      </section>
    </main>
  );
}
