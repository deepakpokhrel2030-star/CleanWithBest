'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Send, Sparkles, X } from 'lucide-react';

const SUGGESTIONS = [
  'Regular cleaning price?',
  'Can I book today?',
  'Do you bring products?',
  'End of tenancy clean?',
  'Do you clean offices?',
  'How do I contact you?',
];

const ANSWERS = [
  {
    keywords: ['price', 'cost', 'rate', 'rates', 'regular', 'hour', 'hourly'],
    answer: 'Regular home cleaning starts from £17 per hour. Deep cleaning and end-of-tenancy cleaning start from £179. For an exact price, send a quote request with your property details.',
  },
  {
    keywords: ['end', 'tenancy', 'landlord', 'deposit', 'move out', 'moving'],
    answer: 'Yes, we offer end-of-tenancy and move in / move out cleaning from £179. We clean to a detailed landlord-style checklist and can discuss any special requirements before booking.',
  },
  {
    keywords: ['book', 'booking', 'quote', 'start', 'schedule', 'available'],
    answer: 'To book, use the quote form and leave your contact details. We will contact you by WhatsApp or phone with the quote and available times.',
  },
  {
    keywords: ['today', 'same day', 'urgent', 'emergency', 'soon', 'tomorrow'],
    answer: 'For urgent or same-day cleaning, WhatsApp or call us first. We will check cleaner availability and reply as quickly as possible.',
  },
  {
    keywords: ['office', 'commercial', 'business', 'shop', 'retail', 'restaurant', 'gym'],
    answer: 'Yes, we clean offices, retail spaces, restaurants, gyms and other commercial premises. Office cleaning starts from £21.50 per hour and retail cleaning starts from £18 per hour.',
  },
  {
    keywords: ['whatsapp', 'phone', 'call', 'contact', 'number'],
    answer: 'You can call +44 7503 494242 or +44 7789 602945. WhatsApp is available on both numbers, and email is cleanwithbest@gmail.com.',
  },
  {
    keywords: ['products', 'equipment', 'bring', 'supplies'],
    answer: 'We can bring professional cleaning products and equipment. If you prefer us to use your own products, mention that when requesting a quote.',
  },
  {
    keywords: ['eco', 'green', 'safe products', 'chemical', 'chemicals'],
    answer: 'Eco-friendly cleaning products can be requested. Tell us if you need low-odour, pet-friendly or child-friendly products before the booking.',
  },
  {
    keywords: ['area', 'areas', 'london', 'postcode', 'cover'],
    answer: 'We cover homes and businesses across London. Send your postcode in the quote form and we will confirm availability for your area.',
  },
  {
    keywords: ['carpet', 'mattress', 'window', 'ironing', 'laundry'],
    answer: 'We also offer carpet cleaning from £43 per room, mattress cleaning from £23, window cleaning from £29, and ironing/laundry from £18 per hour.',
  },
  {
    keywords: ['insured', 'guarantee', 'safe', 'checked', 'trust'],
    answer: 'CleanWithBest uses vetted cleaners and offers a satisfaction guarantee. If something is not right, contact us within 24 hours so we can help.',
  },
  {
    keywords: ['deep clean', 'deep cleaning', 'difference', 'regular clean'],
    answer: 'Regular cleaning is for weekly or routine upkeep. Deep cleaning is more detailed and covers built-up dirt, harder-to-reach areas and heavier cleaning tasks.',
  },
  {
    keywords: ['oven', 'fridge', 'inside cupboards', 'cupboard', 'appliance'],
    answer: 'Oven, fridge and inside-cupboard cleaning can be added. Mention the exact extras in your quote request so we can price it clearly.',
  },
  {
    keywords: ['payment', 'pay', 'cash', 'card', 'invoice'],
    answer: 'Payment details are confirmed when we contact you about the booking. Commercial clients can ask about invoice options.',
  },
  {
    keywords: ['pet', 'dog', 'cat', 'pets'],
    answer: 'Pet-friendly cleaning is fine. Please tell us about pets in the property and any product preferences when you request a quote.',
  },
  {
    keywords: ['key', 'keys', 'access', 'not home', 'away'],
    answer: 'If you cannot be home, we can discuss safe access instructions before the appointment. Please do not send access details in the chatbot.',
  },
  {
    keywords: ['airbnb', 'short let', 'short-let', 'guest', 'checkout'],
    answer: 'Yes, we can help with Airbnb and short-let cleaning. Share the postcode, property size, checkout time and any linen requirements in the quote form.',
  },
  {
    keywords: ['after builders', 'builder', 'renovation', 'construction', 'dust'],
    answer: 'After-builders cleaning is available by quote. It usually needs details about property size, dust level, rooms affected and whether windows or appliances need cleaning.',
  },
  {
    keywords: ['cancel', 'reschedule', 'change time', 'change booking'],
    answer: 'For cancellations or rescheduling, contact us by phone or WhatsApp as early as possible so we can adjust the cleaner schedule.',
  },
];

function findAnswer(input) {
  const text = input.toLowerCase();
  const match = ANSWERS.find(item => item.keywords.some(keyword => text.includes(keyword)));
  return match?.answer || 'I can help with prices, services, booking, areas, contact details and cleaning questions. For anything specific, send a quote request and our team will contact you by WhatsApp or phone.';
}

function BestieBotMascot({ compact = false }) {
  return (
    <span className={`bestiebot-person ${compact ? 'bestiebot-person-compact' : ''}`} aria-hidden="true">
      <span className="bestiebot-antenna">
        <span />
      </span>
      <span className="bestiebot-head">
        <span className="bestiebot-eye bestiebot-eye-left" />
        <span className="bestiebot-eye bestiebot-eye-right" />
        <span className="bestiebot-smile" />
      </span>
      <span className="bestiebot-arm bestiebot-arm-left" />
      <span className="bestiebot-arm bestiebot-arm-right" />
      <span className="bestiebot-body">
        <span className="bestiebot-heart" />
        <span className="bestiebot-panel-light" />
      </span>
      <span className="bestiebot-foot bestiebot-foot-left" />
      <span className="bestiebot-foot bestiebot-foot-right" />
    </span>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi, I am BestieBot, the CleanWithBest robot assistant. Ask me about prices, services, bookings, products or contact details.',
    },
  ]);
  const inputRef = useRef(null);

  const visibleMessages = useMemo(() => messages.slice(-8), [messages]);

  const sendMessage = text => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages(current => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'bot', text: findAnswer(trimmed) },
    ]);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex max-w-[calc(100vw-2rem)] flex-col items-end sm:bottom-6 sm:right-6">
      {open && (
        <div className="animate-bestiebot-panel mb-2 flex h-[560px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-b from-cyan-50 via-emerald-50 to-amber-50 shadow-2xl shadow-cyan-900/15">
          <div className="bestiebot-shine relative flex items-center justify-between overflow-hidden border-b border-cyan-100 bg-gradient-to-r from-cyan-100 via-emerald-100 to-amber-100 px-4 py-3 text-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-cyan-100">
                <BestieBotMascot compact />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-300 text-[9px] font-black text-amber-900">
                  AI
                </span>
              </span>
              <div>
                <p className="font-heading text-sm font-extrabold text-slate-800">BestieBot</p>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-cyan-800">
                  <span className="bestiebot-status-dot h-2 w-2 rounded-full bg-emerald-500" />
                  CleanWithBest robot helper
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-cyan-800 hover:bg-white/70 hover:text-brand-700" aria-label="Minimise chatbot">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {visibleMessages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'bot' && (
                  <span className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 ring-1 ring-cyan-200">
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
          </div>

          <div className="border-t border-cyan-100 bg-white/85 p-3 backdrop-blur">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="animate-bestiebot-chip rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1.5 text-xs font-bold text-cyan-800 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                  style={{ animationDelay: `${index * 70}ms` }}
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
                placeholder="Ask BestieBot..."
                className="min-w-0 flex-1 rounded-xl border border-cyan-100 bg-cyan-50/60 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-cyan-700/60 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              />
              <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600" aria-label="Send message">
                <Send size={16} />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <Link href="/quote" className="font-black text-brand-700 hover:text-brand-900">Request quote</Link>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="font-black text-emerald-700 hover:text-emerald-900">WhatsApp us</a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className="animate-bestiebot-launcher group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-100 via-emerald-100 to-amber-100 text-brand-800 shadow-xl shadow-cyan-900/20 ring-2 ring-white transition hover:scale-105 hover:shadow-cyan-900/30"
        aria-label={open ? 'Minimise chatbot' : 'Maximise chatbot'}
      >
        <span className="bestiebot-orbit absolute inset-0 rounded-full border border-cyan-200" />
        <span className="bestiebot-orbit bestiebot-orbit-delay absolute inset-1 rounded-full border border-emerald-200" />
        {open ? <X size={25} className="relative z-10" /> : <BestieBotMascot />}
      </button>
    </div>
  );
}
