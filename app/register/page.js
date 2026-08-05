import Link from 'next/link';
import AuthForm from '@/frontend/components/AuthForm';

export const metadata = {
  title: 'Register',
  description: 'Create a CleanWithBest customer account.',
};

export default function RegisterPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(46,196,182,0.2),transparent_36%),linear-gradient(45deg,rgba(255,255,255,0.08),transparent_44%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1fr_460px]">
          <div className="max-w-2xl">
            <span className="section-tag-light">Fast Support</span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">Create your CleanWithBest account</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/72">
              Register once, then contact the company from your account whenever you need help with bookings, quotes or feedback.
            </p>
            <Link href="/login" className="mt-7 inline-flex font-bold text-accent-400 hover:text-accent-300">
              Already registered? Login →
            </Link>
          </div>
          <AuthForm mode="register" />
        </div>
      </section>
    </main>
  );
}
