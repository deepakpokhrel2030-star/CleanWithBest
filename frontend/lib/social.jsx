import { Facebook, Instagram } from 'lucide-react';

export function TikTokMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M14.3 3.4v10.2a4.9 4.9 0 1 1-4.9-4.9" stroke="#25F4EE" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.9 3.4c.5 3 2.2 4.9 5 5.3" stroke="#FE2C55" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.1 3.4v10.2a4.9 4.9 0 1 1-4.9-4.9" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.7 3.4c.5 3 2.2 4.9 5 5.3" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const socialLinks = [
  {
    Icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Cleanwithbest/61584162025224/',
    className: 'border-[#1877F2]/20 bg-[#1877F2] text-white hover:bg-[#166FE5]',
  },
  {
    Icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/cleanwithbest',
    className: 'border-pink-200 bg-[linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)] text-white hover:opacity-90',
  },
  {
    Icon: TikTokMark,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@cleanwithbest',
    className: 'border-slate-800 bg-[#010101] text-white hover:bg-[#111111]',
  },
];
