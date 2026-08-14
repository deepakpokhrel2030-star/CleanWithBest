'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  PoundSterling,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const QUICK_TOPICS = [
  { label: 'Prices', icon: PoundSterling, prompt: 'What are your cleaning prices?' },
  { label: 'Book today', icon: CalendarCheck, prompt: 'Can I book cleaning today?' },
  { label: 'How long?', icon: Clock, prompt: 'How long will my clean take?' },
  { label: 'Trust', icon: ShieldCheck, prompt: 'Can I trust the cleaner?' },
];

const SUGGESTIONS = [
  'Hotel & Airbnb cleaning price?',
  'Recurring contract cleaning?',
  'Do you bring products?',
  'Can I book today?',
  'Do you clean offices?',
  'Free website for my hotel?',
  'What is the minimum booking?',
  'Can I get a quote?',
];

const FALLBACK_TOPICS = 'prices, bookings, cleaning types, timing, products, areas, access, payments, complaints, contact details and quote requests';

const ANSWERS = [
  {
    title: 'Greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: 'Hello, I am BestieBot. I can help with prices, services, bookings, quote details, timings, products, areas and contact options.',
  },
  {
    title: 'Thanks',
    keywords: ['thank', 'thanks', 'cheers', 'ok', 'okay', 'great'],
    answer: 'You are welcome. If you want the team to contact you, send a quote request or message us on WhatsApp with your postcode and cleaning details.',
  },
  {
    title: 'Prices',
    keywords: ['price', 'cost', 'rate', 'rates', 'hour', 'hourly', 'how much', 'charge', 'charges', 'minimum'],
    answer: 'Every service starts from a minimum of £20 per hour. Hotel and Airbnb continuous cleaning starts from £20 per hour with a 5-hour minimum per booking. Office cleaning starts from £21.50 per hour, and recurring contract cleaning starts from £20 per hour.',
  },
  {
    title: 'Quote',
    keywords: ['quote', 'estimate', 'quotation', 'price me', 'how to get quote'],
    answer: 'For a clear quote, send your name, phone number, postcode, property type (hotel, Airbnb or business), number of rooms, cleaning service, how often you need us, and preferred start date.',
  },
  {
    title: 'Booking',
    keywords: ['book', 'booking', 'start', 'schedule', 'available', 'appointment', 'reserve'],
    answer: 'To book, use the quote form and leave your contact details. The team will reply by WhatsApp or phone with the price and available times.',
  },
  {
    title: 'Urgent',
    keywords: ['today', 'same day', 'urgent', 'emergency', 'soon', 'tomorrow', 'asap', 'last minute'],
    answer: 'For urgent or same-day cleaning, call or WhatsApp first. We will check cleaner availability and reply as quickly as possible.',
  },
  {
    title: 'Timing',
    keywords: ['time', 'how long', 'duration', 'hours', 'take', 'finish', 'arrival'],
    answer: 'Timing depends on the property and booking. Hotel and Airbnb turnovers usually run a 5-hour minimum per visit, while business and recurring contracts are scheduled around your opening hours.',
  },
  {
    title: 'Business Only',
    keywords: ['home', 'house', 'flat', 'apartment', 'domestic', 'residential', 'my house', 'my flat'],
    answer: 'We no longer offer one-off house cleaning. We focus on continuous cleaning for hotels, Airbnb and serviced apartments, plus recurring contract and business cleaning — all from a £20/hour minimum.',
  },
  {
    title: 'Commercial',
    keywords: ['office', 'commercial', 'business', 'shop', 'retail', 'restaurant', 'gym', 'school', 'workplace', 'clinic', 'warehouse', 'washroom'],
    answer: 'Yes, we clean offices, retail spaces, restaurants, gyms, schools, warehouses and other commercial premises. Office cleaning starts from £21.50 per hour, and every other business service starts from £20 per hour.',
  },
  {
    title: 'Recurring Contracts',
    keywords: ['recurring', 'contract', 'ongoing', 'daily', 'weekly', 'fortnightly', 'schedule cleaning'],
    answer: 'Yes, recurring and contract cleaning is one of our core services — daily, weekly or fortnightly visits from £20 per hour, with a consistent team assigned where possible.',
  },
  {
    title: 'Products',
    keywords: ['products', 'equipment', 'bring', 'supplies', 'hoover', 'vacuum', 'mop', 'cloths'],
    answer: 'We can bring professional cleaning products and equipment. If you prefer us to use your products, mention that when requesting a quote.',
  },
  {
    title: 'Eco Products',
    keywords: ['eco', 'green', 'safe products', 'chemical', 'chemicals', 'low odour', 'low-odour', 'non toxic', 'non-toxic'],
    answer: 'Eco-friendly and low-odour cleaning products can be requested. Tell us about any allergy or compliance requirements before booking.',
  },
  {
    title: 'Trust',
    keywords: ['insured', 'guarantee', 'safe', 'checked', 'trust', 'background', 'vetted', 'reliable', 'security'],
    answer: 'CleanWithBest uses vetted cleaners and offers a satisfaction guarantee. If something is not right, contact us within 24 hours so we can help.',
  },
  {
    title: 'Access',
    keywords: ['key', 'keys', 'access', 'not home', 'away', 'let yourself', 'entry', 'door code'],
    answer: 'If you cannot be home, we can discuss safe access instructions before the appointment. Please do not send keys, door codes or private access details inside this chatbot.',
  },
  {
    title: 'Areas',
    keywords: ['area', 'areas', 'london', 'postcode', 'cover', 'near me', 'location', 'zone'],
    answer: 'We cover hotels, Airbnb properties and businesses across London. Send your postcode in the quote form and we will confirm cleaner availability for your area.',
  },
  {
    title: 'Nearby Areas',
    keywords: ['outside london', 'essex', 'surrey', 'kent', 'hertfordshire'],
    answer: 'We mainly cover London. For nearby areas, send your postcode and we will confirm whether a cleaner is available.',
  },
  {
    title: 'Stains',
    keywords: ['mould', 'mold', 'stain', 'limescale', 'grease', 'hard water', 'burnt', 'marks'],
    answer: 'We can help with many stains, grease and limescale, but results depend on the surface and how long the mark has been there. Send photos by WhatsApp for better advice.',
  },
  {
    title: 'After Builders',
    keywords: ['after builders', 'builder', 'renovation', 'construction', 'dust', 'paint', 'plaster'],
    answer: 'After-builders cleaning is available by quote. We usually need property size, dust level, rooms affected and whether windows, floors or appliances need special attention.',
  },
  {
    title: 'Airbnb',
    keywords: ['airbnb', 'short let', 'short-let', 'guest', 'checkout', 'check out', 'linen', 'hotel', 'hotels', 'serviced apartment', 'turnover', 'housekeeping'],
    answer: 'Yes, we offer continuous cleaning for hotels, Airbnb and serviced apartments, not just one-off visits — built for back-to-back guest turnovers. Pricing starts from £20 per hour with a 5-hour minimum, and we can also run full housekeeping for an entire hotel. Share the postcode, property size, checkout time and linen requirements in the quote form.',
  },
  {
    title: 'IT Services',
    keywords: ['it services', 'website', 'web design', 'free website', 'ujyaalo', 'ujyaaloit', 'web developer', 'build a website'],
    answer: 'Yes, for a limited time. Give us your full hotel, Airbnb or flats cleaning contract and we will build you a website free of charge. Only the website build is free — taking over your ongoing IT is a separate paid service through our partner UjyaaloIT.com (ujyaaloit.com), so check the site for details.',
  },
  {
    title: 'Payment',
    keywords: ['payment', 'pay', 'cash', 'card', 'invoice', 'bank transfer', 'receipt'],
    answer: 'Payment details are confirmed when we contact you about the booking. Commercial clients can ask about invoice options.',
  },
  {
    title: 'Change Booking',
    keywords: ['cancel', 'reschedule', 'change time', 'change booking', 'late', 'delay'],
    answer: 'For cancellations or rescheduling, contact us by phone or WhatsApp as early as possible so we can adjust the cleaner schedule.',
  },
  {
    title: 'Complaint',
    keywords: ['complaint', 'problem', 'issue', 'not happy', 'bad clean', 'missed', 'poor'],
    answer: 'If there is a problem, contact us within 24 hours with details and photos if possible. The team will review it and help arrange the next step.',
  },
  {
    title: 'Contact',
    keywords: ['whatsapp', 'phone', 'call', 'contact', 'number', 'email', 'mail'],
    answer: 'You can call +44 7503 494242 or +44 7789 602945. WhatsApp is available on both numbers, and email is cleanwithbest@gmail.com.',
  },
];

function normalise(text) {
  return text.toLowerCase().replace(/[^a-z0-9£.\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreAnswer(text, item) {
  return item.keywords.reduce((score, keyword) => {
    if (text.includes(keyword)) return score + Math.max(2, keyword.length / 4);
    const words = keyword.split(/\s+/);
    return score + words.filter(word => word.length > 2 && text.includes(word)).length * 0.5;
  }, 0);
}

function findAnswer(input) {
  const text = normalise(input);

  const ranked = ANSWERS
    .map(item => ({ ...item, score: scoreAnswer(text, item) }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.score >= 2) return ranked[0].answer;

  const hasQuestion = /\?|what|when|where|why|how|can|do|does|is|are|will|please|need|want/.test(input.toLowerCase());
  if (hasQuestion) {
    return `I may not know that exact answer yet, but I can still help you get it quickly. I can answer about ${FALLBACK_TOPICS}. For anything specific, send it through the quote form or WhatsApp us and the team will reply.`;
  }

  return `I can help with ${FALLBACK_TOPICS}. Try asking "How much for a 10-room hotel?" or tap one of the quick buttons below.`;
}

function BestieBotMascot({ compact = false, hero = false, launcher = false }) {
  return (
    <svg
      className={`bestiebot-svg ${compact ? 'bestiebot-svg-compact' : ''} ${hero ? 'bestiebot-svg-hero' : ''} ${launcher ? 'bestiebot-svg-launcher' : ''}`}
      viewBox="0 0 128 150"
      role="img"
      aria-label="BestieBot cleaning assistant"
    >
      <defs>
        <linearGradient id="bestieShell" x1="30" x2="98" y1="21" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset=".52" stopColor="#e0f2fe" />
          <stop offset="1" stopColor="#2b7ddd" />
        </linearGradient>
        <linearGradient id="bestieScreen" x1="37" x2="91" y1="46" y2="79" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8ffff" />
          <stop offset="1" stopColor="#bff4ff" />
        </linearGradient>
        <linearGradient id="bestieBody" x1="42" x2="86" y1="84" y2="132" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dff7ff" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      <ellipse className="bestiebot-svg-shadow" cx="64" cy="139" rx="34" ry="7" fill="rgb(19 77 150 / .16)" />

      <g className="bestiebot-svg-body">
        <path className="bestiebot-svg-arm-left" d="M42 103 C31 106 25 113 22 123" fill="none" stroke="#134d96" strokeWidth="7" strokeLinecap="round" />
        <path className="bestiebot-svg-arm-right" d="M86 103 C98 101 105 94 109 83" fill="none" stroke="#134d96" strokeWidth="7" strokeLinecap="round" />
        <circle className="bestiebot-svg-hand-left" cx="21" cy="124" r="7" fill="#f8ffff" stroke="#134d96" strokeWidth="4" />
        <circle className="bestiebot-svg-hand-right" cx="110" cy="82" r="7" fill="#f8ffff" stroke="#134d96" strokeWidth="4" />

        <rect x="40" y="84" width="48" height="48" rx="17" fill="url(#bestieBody)" stroke="#134d96" strokeWidth="4.5" />
        <path d="M53 101 H75" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" opacity=".95" />
        <circle className="bestiebot-svg-light" cx="64" cy="119" r="5" fill="#facc15" stroke="#134d96" strokeWidth="2.5" />

        <path className="bestiebot-svg-foot-left" d="M45 135 H59" stroke="#134d96" strokeWidth="8" strokeLinecap="round" />
        <path className="bestiebot-svg-foot-right" d="M69 135 H83" stroke="#134d96" strokeWidth="8" strokeLinecap="round" />
      </g>

      <g className="bestiebot-svg-head">
        <path className="bestiebot-svg-antenna" d="M64 26 V14" stroke="#134d96" strokeWidth="4.5" strokeLinecap="round" />
        <circle className="bestiebot-svg-antenna-dot" cx="64" cy="10" r="6" fill="#facc15" stroke="#134d96" strokeWidth="3" />
        <rect x="32" y="27" width="64" height="62" rx="22" fill="url(#bestieShell)" stroke="#134d96" strokeWidth="5" />
        <path d="M43 38 C49 33 57 31 68 31" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" opacity=".9" />
        <rect x="40" y="47" width="48" height="30" rx="14" fill="url(#bestieScreen)" stroke="#134d96" strokeWidth="4" />
        <circle className="bestiebot-svg-eye bestiebot-svg-eye-left" cx="55" cy="62" r="4.5" fill="#134d96" />
        <circle className="bestiebot-svg-eye bestiebot-svg-eye-right" cx="73" cy="62" r="4.5" fill="#134d96" />
        <path d="M57 71 C61 74 67 74 71 71" fill="none" stroke="#134d96" strokeWidth="3.5" strokeLinecap="round" />
        <circle className="bestiebot-svg-cheek bestiebot-svg-cheek-left" cx="47" cy="68" r="3.2" fill="#facc15" opacity=".9" />
        <circle className="bestiebot-svg-cheek bestiebot-svg-cheek-right" cx="81" cy="68" r="3.2" fill="#facc15" opacity=".9" />
        <rect x="23" y="54" width="12" height="20" rx="6" fill="#f8ffff" stroke="#134d96" strokeWidth="4" />
        <rect x="93" y="54" width="12" height="20" rx="6" fill="#f8ffff" stroke="#134d96" strokeWidth="4" />
        <path className="bestiebot-svg-headset" d="M102 73 C100 85 91 92 79 94" fill="none" stroke="#2b7ddd" strokeWidth="4" strokeLinecap="round" />
        <circle className="bestiebot-svg-mic" cx="77" cy="94" r="4" fill="#facc15" stroke="#134d96" strokeWidth="2.5" />
      </g>

      <g className="bestiebot-svg-sparkles">
        <path className="bestiebot-svg-sparkle-one" d="M17 39 L20 45 L26 48 L20 51 L17 57 L14 51 L8 48 L14 45 Z" fill="#facc15" />
        <path className="bestiebot-svg-sparkle-two" d="M106 103 L109 108 L114 111 L109 114 L106 119 L103 114 L98 111 L103 108 Z" fill="#38bdf8" />
      </g>
    </svg>
  );
}

function TypingDots() {
  return (
    <span className="bestiebot-typing-dots" aria-label="BestieBot is typing">
      <span />
      <span />
      <span />
    </span>
  );
}

const welcomeMessage = {
  id: 'welcome',
  role: 'bot',
  text: 'Hi, I am BestieBot. Tell me about your hotel, Airbnb or business, or ask about prices, booking, products, trust or contact details.',
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const typingTimerRef = useRef(null);

  const visibleMessages = useMemo(() => messages.slice(-12), [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visibleMessages, typing]);

  useEffect(() => () => window.clearTimeout(typingTimerRef.current), []);

  const resetChat = () => {
    window.clearTimeout(typingTimerRef.current);
    setTyping(false);
    setInput('');
    setMessages([welcomeMessage]);
  };

  const sendMessage = text => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages(current => [...current, userMessage]);
    setInput('');
    setTyping(true);

    const responseDelay = Math.min(900, Math.max(420, trimmed.length * 12));
    typingTimerRef.current = window.setTimeout(() => {
      setMessages(current => [
        ...current,
        {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: findAnswer(trimmed),
        },
      ]);
      setTyping(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }, responseDelay);
  };

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[70] flex max-w-[calc(100vw-1.5rem)] flex-col items-end sm:bottom-6 sm:right-6 sm:max-w-[calc(100vw-2rem)]">
      {open && (
        <div className="animate-bestiebot-panel relative mb-2 flex h-[min(620px,calc(100dvh-6.5rem))] w-[calc(100vw-1.5rem)] max-w-[440px] flex-col overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-b from-cyan-50 via-emerald-50 to-amber-50 shadow-2xl shadow-cyan-900/15 sm:h-[640px] sm:w-[calc(100vw-2rem)]">
          <span className="bestiebot-bg-bubble bestiebot-bg-bubble-one" />
          <span className="bestiebot-bg-bubble bestiebot-bg-bubble-two" />
          <span className="bestiebot-bg-bubble bestiebot-bg-bubble-three" />

          <div className="bestiebot-shine relative z-10 border-b border-cyan-100 bg-gradient-to-r from-cyan-100 via-emerald-100 to-amber-100 px-3.5 py-3 text-slate-800 sm:px-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="bestiebot-portrait relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-cyan-100">
                  <BestieBotMascot hero />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-300 text-[9px] font-black text-amber-900">
                    AI
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-base font-extrabold text-slate-800">BestieBot</p>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-cyan-800">
                    <span className="bestiebot-status-dot h-2 w-2 rounded-full bg-emerald-500" />
                    Friendly cleaning assistant
                  </p>
                  <p className="mt-1 hidden text-xs font-semibold text-slate-600 min-[380px]:block">
                    Ask anything about your clean.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" onClick={resetChat} className="rounded-lg p-2 text-cyan-800 hover:bg-white/70 hover:text-brand-700" aria-label="Reset chatbot">
                  <RotateCcw size={16} />
                </button>
                <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-cyan-800 hover:bg-white/70 hover:text-brand-700" aria-label="Minimise chatbot">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {QUICK_TOPICS.map(({ label, icon: Icon, prompt }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="bestiebot-topic-button rounded-xl border border-white/70 bg-white/70 px-2.5 py-2 text-left text-xs font-black text-slate-700 shadow-sm hover:bg-white hover:text-brand-700"
                >
                  <Icon size={14} className="mb-1 text-emerald-600" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div ref={scrollRef} className="relative z-10 flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-4">
            {visibleMessages.map(message => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'bot' && (
                  <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 ring-1 ring-cyan-200">
                    <BestieBotMascot compact />
                  </span>
                )}
                <div className={`animate-bestiebot-bubble max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                  message.role === 'user'
                    ? 'rounded-br-md bg-emerald-100 text-emerald-950 ring-1 ring-emerald-200'
                    : 'rounded-bl-md bg-white/90 text-slate-700 ring-1 ring-cyan-100'
                }`}>
                  {message.role === 'bot' && (
                    <span className="mb-1 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-cyan-700">
                      <Sparkles size={12} /> BestieBot
                    </span>
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2">
                <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 ring-1 ring-cyan-200">
                  <BestieBotMascot compact />
                </span>
                <div className="animate-bestiebot-bubble rounded-2xl rounded-bl-md bg-white/90 px-3.5 py-2.5 shadow-sm ring-1 ring-cyan-100">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 border-t border-cyan-100 bg-white/90 p-2.5 backdrop-blur sm:p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="animate-bestiebot-chip shrink-0 rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1.5 text-xs font-bold text-cyan-800 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              onSubmit={event => {
                event.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder="Ask about your cleaning..."
                className="min-w-0 flex-1 rounded-xl border border-cyan-100 bg-cyan-50/60 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-cyan-700/60 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              />
              <button type="submit" disabled={typing} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300" aria-label="Send message">
                <Send size={16} />
              </button>
            </form>

            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <a href="tel:+447503494242" className="rounded-lg bg-slate-50 px-2 py-2 text-center font-black text-brand-700 hover:bg-brand-50">
                <Phone size={13} className="mx-auto mb-0.5" /> Call
              </a>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-50 px-2 py-2 text-center font-black text-emerald-700 hover:bg-emerald-100">
                <MessageCircle size={13} className="mx-auto mb-0.5" /> WhatsApp
              </a>
              <a href="mailto:cleanwithbest@gmail.com" className="rounded-lg bg-amber-50 px-2 py-2 text-center font-black text-amber-700 hover:bg-amber-100">
                <Mail size={13} className="mx-auto mb-0.5" /> Email
              </a>
            </div>

            <Link href="/quote" className="mt-2 flex items-center justify-center rounded-xl bg-brand-600 px-3 py-2 text-sm font-black text-white hover:bg-brand-700">
              Request a proper quote
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className="animate-bestiebot-launcher bestiebot-launcher group relative flex h-[4.45rem] w-[4rem] items-center justify-center border-0 bg-transparent p-0 transition hover:scale-105 sm:h-[4.9rem] sm:w-[4.35rem]"
        aria-label={open ? 'Minimise chatbot' : 'Maximise chatbot'}
      >
        {open ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-800 shadow-xl shadow-cyan-900/20 ring-1 ring-cyan-100">
            <X size={25} />
          </span>
        ) : (
          <BestieBotMascot launcher />
        )}
      </button>
    </div>
  );
}
