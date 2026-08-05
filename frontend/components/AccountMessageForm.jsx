'use client';
import { useState } from 'react';
import { CheckCircle, Loader2, Send } from 'lucide-react';

export default function AccountMessageForm() {
  const [form, setForm] = useState({ subject: 'Existing Booking', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus('idle');

    if (!data.success) {
      setError(data.error || 'Unable to send message.');
      return;
    }

    setForm({ subject: 'Existing Booking', message: '' });
    setStatus('success');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
      <div>
        <label className="label">Message Topic</label>
        <select name="subject" value={form.subject} onChange={event => setForm(current => ({ ...current, subject: event.target.value }))} className="input-field">
          <option>Existing Booking</option>
          <option>New Cleaning Request</option>
          <option>Change My Appointment</option>
          <option>Complaint or Feedback</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="label">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={event => setForm(current => ({ ...current, message: event.target.value }))}
          required
          rows={6}
          className="input-field resize-none"
          placeholder="Write your message to CleanWithBest..."
        />
      </div>

      {status === 'success' && (
        <p className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle size={17} /> Message sent to the company.
        </p>
      )}
      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
        {status === 'loading' ? <><Loader2 size={17} className="animate-spin" /> Sending...</> : <><Send size={17} /> Send Message</>}
      </button>
    </form>
  );
}
