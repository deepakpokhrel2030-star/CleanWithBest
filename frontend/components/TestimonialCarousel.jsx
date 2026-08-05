'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  { name: 'Jessica M.', role: 'Homeowner', date: 'Feb 2026', text: 'Absolutely incredible service! Sarah cleaned our 3-bed flat from top to bottom and it\'s never looked better. Will definitely be booking regularly. Thank you CleanWithBest!', rating: 5 },
  { name: 'Tom R.', role: 'Tenant', date: 'Jan 2026', text: 'Used CleanWithBest for our end of tenancy clean and got our full deposit back! Thorough, professional and incredibly friendly. Highly recommend to anyone moving out.', rating: 5 },
  { name: 'Amanda S.', role: 'Office Manager, TechCo', date: 'Jan 2026', text: 'We\'ve been using CleanWithBest for our office for over 2 years now. Consistent, reliable, and the cleaners always go above and beyond. Our team loves coming into work on Mondays!', rating: 5 },
  { name: 'Karen L.', role: 'Homeowner', date: 'Dec 2025', text: 'The deep clean was absolutely worth every penny. They cleaned areas I hadn\'t touched in years — behind appliances, inside cupboards. Absolutely spotless result.', rating: 5 },
  { name: 'David C.', role: 'Property Developer', date: 'Dec 2025', text: 'Booked at short notice for a post-renovation clean. The team was professional, worked quickly and the result was stunning. Highly recommended for commercial cleans!', rating: 5 },
  { name: 'Patricia H.', role: 'Regular Client', date: 'Nov 2025', text: 'Maria has been cleaning our home every fortnight for over a year and she\'s fantastic. Trustworthy, thorough and friendly. We wouldn\'t use anyone else. Highly recommended!', rating: 5 },
  { name: 'Michael T.', role: 'Business Owner', date: 'Nov 2025', text: 'Exceptional commercial cleaning. Our office has never been this clean. The team are professional and work around our hours perfectly. Well worth every penny.', rating: 5 },
  { name: 'Sophie K.', role: 'Landlord', date: 'Oct 2025', text: 'Used CleanWithBest for end of tenancy on three properties now. Always immaculate. My tenants\' deposits are never an issue thanks to their thorough work.', rating: 5 },
  { name: 'James W.', role: 'Homeowner', date: 'Oct 2025', text: 'Fantastic deep clean. The bathroom was completely transformed and the kitchen gleams like new. The cleaners were on time and very professional. Five stars without hesitation.', rating: 5 },
  { name: 'Rachel T.', role: 'First-Time Customer', date: 'Sep 2025', text: 'Got a quote within an hour, the price was fair and transparent, and the clean was outstanding. Couldn\'t be happier and have already booked a regular fortnightly slot!', rating: 5 },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const max = Math.max(0, reviews.length - cols);
  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(max, c + 1)), [max]);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c >= max ? 0 : c + 1)), 5000);
    return () => clearInterval(t);
  }, [max]);

  const visible = reviews.slice(current, current + cols);

  return (
    <div>
      <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {visible.map((r, i) => (
          <div key={`${current}-${i}`} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5 text-amber-400">
                {'★'.repeat(r.rating)}
              </div>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4 italic">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {r.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                <div className="text-xs text-slate-400">{r.role} · {r.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-600 w-6' : 'bg-slate-200 hover:bg-slate-300 w-2'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} disabled={current === 0}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-600 hover:text-brand-600 disabled:opacity-30 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} disabled={current >= max}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-600 hover:text-brand-600 disabled:opacity-30 transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
