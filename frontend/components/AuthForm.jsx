'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, Phone, User } from 'lucide-react';

export default function AuthForm({ mode = 'login' }) {
  const router = useRouter();
  const isRegister = mode === 'register';
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    const res = await fetch(`/api/auth/${isRegister ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus('idle');

    if (!data.success) {
      setError(data.error || 'Something went wrong.');
      return;
    }

    router.push('/account');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-900/5 p-6 sm:p-8 space-y-4">
      {isRegister && (
        <div>
          <label className="label">Full Name *</label>
          <div className="relative">
            <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input name="name" value={form.name} onChange={handleChange} required className="input-field pl-11" placeholder="Your full name" />
          </div>
        </div>
      )}

      <div>
        <label className="label">Email *</label>
        <div className="relative">
          <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field pl-11" placeholder="you@example.com" />
        </div>
      </div>

      {isRegister && (
        <div>
          <label className="label">Phone</label>
          <div className="relative">
            <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field pl-11" placeholder="+44 7789 602945" />
          </div>
        </div>
      )}

      <div>
        <label className="label">Password *</label>
        <div className="relative">
          <LockKeyhole size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="input-field pl-11 pr-11"
            placeholder={isRegister ? 'Create a password' : 'Enter your password'}
          />
          <button type="button" onClick={() => setShowPassword(value => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-primary-lg w-full">
        {status === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Please wait...</> : isRegister ? 'Create Account' : 'Login'}
      </button>

      <p className="text-center text-sm text-slate-500">
        {isRegister ? 'Already have an account?' : 'New customer?'}{' '}
        <Link href={isRegister ? '/login' : '/register'} className="font-bold text-brand-600 hover:text-brand-800">
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </p>
    </form>
  );
}
