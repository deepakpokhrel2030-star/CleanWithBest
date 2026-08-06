'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

const SUGGESTIONS = [
  'How much is regular cleaning?',
  'Do you do end of tenancy?',
  'How can I book?',
  'Do you clean offices?',
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
];

function findAnswer(input) {
  const text = input.toLowerCase();
  const match = ANSWERS.find(item => item.keywords.some(keyword => text.includes(keyword)));
  return match?.answer || 'I can help with prices, services, booking, areas, contact details and cleaning questions. For anything specific, send a quote request and our team will contact you by WhatsApp or phone.';
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi, I am the CleanWithBest assistant. Ask me about cleaning prices, services, booking or contact details.',
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
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-3 flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 text-slate-900">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Bot size={19} />
              </span>
              <div>
                <p className="font-heading text-sm font-bold">CleanWithBest Chat</p>
                <p className="text-xs text-slate-500">Instant answers for common questions</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Minimise chatbot">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {visibleMessages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-200 hover:text-brand-700"
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
                placeholder="Ask about prices or booking..."
                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700" aria-label="Send message">
                <Send size={16} />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <Link href="/quote" className="font-bold text-brand-700 hover:text-brand-900">Request quote</Link>
              <a href="https://wa.me/447503494242" target="_blank" rel="noopener noreferrer" className="font-bold text-green-700 hover:text-green-900">WhatsApp us</a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl shadow-slate-900/20 transition hover:bg-brand-700"
        aria-label={open ? 'Minimise chatbot' : 'Maximise chatbot'}
      >
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
