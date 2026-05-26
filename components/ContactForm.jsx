'use client';
import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
        <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-500 mb-4">Thank you for getting in touch. We'll respond within 2 hours.</p>
        <button onClick={() => setStatus('idle')} className="btn-primary text-sm">Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
      <div>
        <label className="label">Full Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="input-field" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="input-field" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="input-field" />
        </div>
      </div>
      <div>
        <label className="label">Subject *</label>
        <select name="subject" value={form.subject} onChange={handleChange} required className="input-field">
          <option value="">Select subject...</option>
          <option>General Enquiry</option>
          <option>Quote Request</option>
          <option>Existing Booking</option>
          <option>Complaint or Feedback</option>
          <option>Partnership / B2B</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="label">Message *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Write your message here..." className="input-field resize-none" />
      </div>
      {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
        {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send Message'}
      </button>
    </form>
  );
}
