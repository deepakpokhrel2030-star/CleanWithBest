'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogIn, LogOut, UserRound } from 'lucide-react';

export default function AccountNav({ mobile = false, onNavigate }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (mounted) setUser(data.user);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [pathname]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    onNavigate?.();
    router.push('/');
    router.refresh();
  };

  if (user) {
    return (
      <div className={mobile ? 'space-y-2' : 'flex items-center gap-2'}>
        <Link href="/account" onClick={onNavigate} className={mobile ? 'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-700 bg-brand-50' : 'inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700'}>
          <UserRound size={16} /> Account
        </Link>
        <button onClick={logout} className={mobile ? 'flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50' : 'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800'}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    );
  }

  return (
    <div className={mobile ? 'grid grid-cols-2 gap-2' : 'flex items-center gap-2'}>
      <Link href="/login" onClick={onNavigate} className={mobile ? 'flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700' : 'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900'}>
        <LogIn size={16} /> Login
      </Link>
      <Link href="/register" onClick={onNavigate} className={mobile ? 'rounded-xl bg-accent-500 px-3 py-3 text-center text-sm font-bold text-white' : 'rounded-lg bg-accent-500 px-4 py-2 text-sm font-bold text-white hover:bg-accent-600'}>
        Register
      </Link>
    </div>
  );
}
