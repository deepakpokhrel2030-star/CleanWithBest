import Link from 'next/link';
import AuthForm from '@/frontend/components/AuthForm';

export const metadata = {
  title: 'Login',
  description: 'Login to your CleanWithBest customer account.',
};

export default function LoginPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(46,196,182,0.18),transparent_38%),linear-gradient(45deg,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1fr_440px]">
          <div className="max-w-2xl">
            <span className="section-tag-light">Customer Account</span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">Login to manage your cleaning requests</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/72">
              Send messages to the company after login, ask about bookings, and keep your contact details ready for faster support.
            </p>
            <Link href="/register" className="mt-7 inline-flex font-bold text-accent-400 hover:text-accent-300">
              New here? Create an account →
            </Link>
          </div>
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  );
}
