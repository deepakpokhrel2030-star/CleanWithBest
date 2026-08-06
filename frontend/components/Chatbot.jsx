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
  'Regular cleaning price?',
  'End of tenancy clean?',
  'Do you bring products?',
  'Can I book today?',
  'Do you clean offices?',
  'How do I contact you?',
  'Do you clean carpets?',
  'Can I get a quote?',
];

const FALLBACK_TOPICS = 'prices, bookings, cleaning types, timing, products, areas, pets, access, payments, complaints, contact details and quote requests';

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
    keywords: ['price', 'cost', 'rate', 'rates', 'regular', 'hour', 'hourly', 'how much', 'charge', 'charges'],
    answer: 'Regular home cleaning starts from £17 per hour. Deep cleaning and end-of-tenancy cleaning start from £179. Carpet cleaning starts from £43 per room, mattress cleaning from £23 and office cleaning from £21.50 per hour.',
  },
  {
    title: 'Quote',
    keywords: ['quote', 'estimate', 'quotation', 'price me', 'how to get quote'],
    answer: 'For a clear quote, send your name, phone number, postcode, property type, number of rooms, cleaning service, preferred date and any extras like oven, carpet or inside cupboards.',
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
    answer: 'Timing depends on size and condition. A regular clean often takes 2 to 4 hours. Deep cleaning, end-of-tenancy and after-builders cleans usually need longer.',
  },
  {
    title: 'Domestic',
    keywords: ['home', 'house', 'flat', 'apartment', 'domestic', 'bathroom', 'kitchen', 'bedroom', 'living room', 'toilet'],
    answer: 'Yes, we clean houses, flats and apartments. Domestic cleaning can cover kitchens, bathrooms, bedrooms, toilets, living rooms, floors, surfaces and general tidy cleaning.',
  },
  {
    title: 'Deep Cleaning',
    keywords: ['deep clean', 'deep cleaning', 'spring clean', 'detailed clean', 'one off', 'one-off', 'heavy clean'],
    answer: 'Deep cleaning is for a more detailed clean than regular cleaning. It is useful for built-up dirt, kitchens, bathrooms, neglected areas and homes that need extra time and attention.',
  },
  {
    title: 'End Of Tenancy',
    keywords: ['end', 'tenancy', 'landlord', 'deposit', 'move out', 'moving', 'move in', 'inventory', 'letting agent'],
    answer: 'Yes, we offer end-of-tenancy and move in / move out cleaning from £179. We clean to a detailed landlord-style checklist and can discuss special requirements before booking.',
  },
  {
    title: 'Commercial',
    keywords: ['office', 'commercial', 'business', 'shop', 'retail', 'restaurant', 'gym', 'school', 'workplace', 'clinic'],
    answer: 'Yes, we clean offices, retail spaces, restaurants, gyms and other commercial premises. Office cleaning starts from £21.50 per hour and retail cleaning starts from £18 per hour.',
  },
  {
    title: 'Carpets And Extras',
    keywords: ['carpet', 'rug', 'mattress', 'sofa', 'upholstery', 'window', 'ironing', 'laundry'],
    answer: 'We offer carpet cleaning from £43 per room, mattress cleaning from £23, window cleaning from £29 and ironing/laundry from £18 per hour. Send photos or room details for clearer pricing.',
  },
  {
    title: 'Appliances',
    keywords: ['oven', 'fridge', 'freezer', 'inside cupboards', 'cupboard', 'appliance', 'microwave', 'extractor'],
    answer: 'Oven, fridge, freezer, microwave and inside-cupboard cleaning can be added. Mention each extra in your quote request so the price is clear before booking.',
  },
  {
    title: 'Products',
    keywords: ['products', 'equipment', 'bring', 'supplies', 'hoover', 'vacuum', 'mop', 'cloths'],
    answer: 'We can bring professional cleaning products and equipment. If you prefer us to use your products, mention that when requesting a quote.',
  },
  {
    title: 'Eco Products',
    keywords: ['eco', 'green', 'safe products', 'chemical', 'chemicals', 'low odour', 'low-odour', 'non toxic', 'non-toxic'],
    answer: 'Eco-friendly and low-odour cleaning products can be requested. Tell us about allergies, asthma, babies, children or pets before booking.',
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
    title: 'Pets',
    keywords: ['pet', 'dog', 'cat', 'pets', 'animal'],
    answer: 'Pet-friendly cleaning is fine. Please tell us about pets in the property and any product preferences when you request a quote.',
  },
  {
    title: 'Areas',
    keywords: ['area', 'areas', 'london', 'postcode', 'cover', 'near me', 'location', 'zone'],
    answer: 'We cover homes and businesses across London. Send your postcode in the quote form and we will confirm cleaner availability for your area.',
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
    keywords: ['airbnb', 'short let', 'short-let', 'guest', 'checkout', 'check out', 'linen'],
    answer: 'Yes, we can help with Airbnb and short-let cleaning. Share the postcode, property size, checkout time and linen requirements in the quote form.',
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

function buildQuoteHint(text) {
  const bedroomMatch = text.match(/(\d+)\s*(bed|bedroom|bedrooms)/);
  const bathroomMatch = text.match(/(\d+)\s*(bath|bathroom|bathrooms)/);
  const hasFlat = text.includes('flat') || text.includes('apartment');
  const hasHouse = text.includes('house');

  if (!bedroomMatch && !bathroomMatch && !hasFlat && !hasHouse) return null;

  const bits = [];
  if (bedroomMatch) bits.push(`${bedroomMatch[1]} bedroom${bedroomMatch[1] === '1' ? '' : 's'}`);
  if (bathroomMatch) bits.push(`${bathroomMatch[1]} bathroom${bathroomMatch[1] === '1' ? '' : 's'}`);
  if (hasFlat) bits.push('flat');
  if (hasHouse) bits.push('house');

  return `For a ${bits.join(', ')}, the final quote depends on condition, service type and extras. Regular cleaning starts from £17/hour. Send your postcode and photos if possible, and the team will confirm the price by WhatsApp or phone.`;
}

function findAnswer(input) {
  const text = normalise(input);
  const quoteHint = buildQuoteHint(text);
  if (quoteHint) return quoteHint;

  const ranked = ANSWERS
    .map(item => ({ ...item, score: scoreAnswer(text, item) }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.score >= 2) return ranked[0].answer;

  const hasQuestion = /\?|what|when|where|why|how|can|do|does|is|are|will|please|need|want/.test(input.toLowerCase());
  if (hasQuestion) {
    return `I may not know that exact answer yet, but I can still help you get it quickly. I can answer about ${FALLBACK_TOPICS}. For anything specific, send it through the quote form or WhatsApp us and the team will reply.`;
  }

  return `I can help with ${FALLBACK_TOPICS}. Try asking "How much for a 2 bedroom flat?" or tap one of the quick buttons below.`;
}

function BestieBotMascot({ compact = false, hero = false, launcher = false }) {
  return (
    <svg
      className={`bestiebot-svg ${compact ? 'bestiebot-svg-compact' : ''} ${hero ? 'bestiebot-svg-hero' : ''} ${launcher ? 'bestiebot-svg-launcher' : ''}`}
      viewBox="0 0 120 150"
      role="img"
      aria-label="BestieBot cleaning assistant"
    >
      <g className="bestiebot-svg-shadow">
        <ellipse cx="60" cy="138" rx="34" ry="8" fill="rgb(8 145 178 / .16)" />
      </g>

      <g className="bestiebot-svg-body">
        <path className="bestiebot-svg-arm-left" d="M36 86 C18 84 13 70 21 61" fill="none" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
        <path className="bestiebot-svg-arm-right" d="M84 86 C103 82 108 65 99 57" fill="none" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
        <circle className="bestiebot-svg-hand-left" cx="20" cy="60" r="8" fill="#fbbf24" stroke="#0f766e" strokeWidth="3" />
        <circle className="bestiebot-svg-hand-right" cx="99" cy="57" r="8" fill="#fbbf24" stroke="#0f766e" strokeWidth="3" />

        <rect x="37" y="72" width="46" height="48" rx="18" fill="#ccfbf1" stroke="#0f766e" strokeWidth="5" />
        <path d="M42 106 C51 116 69 118 80 106" fill="none" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="52" cy="91" r="5" fill="#10b981" />
        <circle cx="68" cy="91" r="5" fill="#fbbf24" />
        <circle className="bestiebot-svg-light" cx="74" cy="103" r="4" fill="#22d3ee" />

        <path className="bestiebot-svg-foot-left" d="M42 122 H56" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
        <path className="bestiebot-svg-foot-right" d="M65 122 H79" stroke="#0f766e" strokeWidth="9" strokeLinecap="round" />
      </g>

      <g className="bestiebot-svg-head">
        <line x1="60" y1="23" x2="60" y2="12" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
        <circle className="bestiebot-svg-antenna-dot" cx="60" cy="9" r="6" fill="#fbbf24" stroke="#0f766e" strokeWidth="3" />
        <path className="bestiebot-svg-hair-one" d="M44 25 C49 17 56 17 59 25" fill="none" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
        <path className="bestiebot-svg-hair-two" d="M60 24 C66 17 73 20 75 28" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
        <circle cx="34" cy="50" r="10" fill="#99f6e4" stroke="#0f766e" strokeWidth="4" />
        <circle cx="86" cy="50" r="10" fill="#99f6e4" stroke="#0f766e" strokeWidth="4" />
        <rect x="32" y="28" width="56" height="48" rx="20" fill="#ffffff" stroke="#0f766e" strokeWidth="5" />
        <path d="M38 61 C48 74 72 74 82 61" fill="#cffafe" />
        <circle className="bestiebot-svg-eye bestiebot-svg-eye-left" cx="49" cy="49" r="5" fill="#0f766e" />
        <circle className="bestiebot-svg-eye bestiebot-svg-eye-right" cx="71" cy="49" r="5" fill="#0f766e" />
        <circle className="bestiebot-svg-cheek bestiebot-svg-cheek-left" cx="43" cy="60" r="4" fill="#fbbf24" />
        <circle className="bestiebot-svg-cheek bestiebot-svg-cheek-right" cx="77" cy="60" r="4" fill="#fbbf24" />
        <path d="M53 61 C56 66 64 66 67 61" fill="none" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
      </g>

      <g className="bestiebot-svg-sparkles">
        <path className="bestiebot-svg-sparkle-one" d="M24 28 L28 36 L36 40 L28 44 L24 52 L20 44 L12 40 L20 36 Z" fill="#fbbf24" />
        <path className="bestiebot-svg-sparkle-two" d="M95 82 L98 88 L104 91 L98 94 L95 100 L92 94 L86 91 L92 88 Z" fill="#22d3ee" />
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
  text: 'Hi, I am BestieBot. Tell me what you need cleaned, your property size, or ask about prices, booking, products, trust or contact details.',
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
