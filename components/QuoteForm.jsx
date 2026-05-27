'use client';
import { useState, useCallback } from 'react';
import { CheckCircle, Loader2, ChevronRight, MapPin, Search } from 'lucide-react';

/* ── Data ── */
const SERVICES = [
  'Regular Cleaning', 'Deep Cleaning', 'End of Tenancy',
  'Move In / Move Out', 'Carpet & Upholstery', 'Mattress Cleaning',
  'Ironing & Laundry', 'Window Cleaning', 'Office Cleaning', 'Other',
];

const PROPERTY_TYPES = [
  { value: 'flat',       label: 'Flat / Apartment', icon: '🏢' },
  { value: 'house',      label: 'House',             icon: '🏠' },
  { value: 'studio',     label: 'Studio',            icon: '🛋️' },
  { value: 'commercial', label: 'Commercial',        icon: '🏗️' },
];

const BEDROOMS  = ['Studio', '1', '2', '3', '4', '5', '6+'];
const BATHROOMS = ['1', '2', '3', '4+'];

const EXTRA_ROOMS = [
  { value: 'kitchen',      label: 'Kitchen',           icon: '🍳' },
  { value: 'living_room',  label: 'Living Room',        icon: '🛋️' },
  { value: 'dining_room',  label: 'Dining Room',        icon: '🍴' },
  { value: 'hallway',      label: 'Hallway / Landing',  icon: '🚪' },
  { value: 'conservatory', label: 'Conservatory',       icon: '🌿' },
  { value: 'study',        label: 'Study / Office',     icon: '💼' },
  { value: 'utility',      label: 'Utility Room',       icon: '🔧' },
  { value: 'garage',       label: 'Garage',             icon: '🚗' },
  { value: 'cellar',       label: 'Cellar / Basement',  icon: '⬇️' },
  { value: 'loft',         label: 'Loft / Attic',       icon: '⬆️' },
];

const FREQUENCIES = [
  { value: 'one_off',     label: 'One-Off' },
  { value: 'weekly',      label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'every3weeks', label: 'Every 3 Weeks' },
  { value: 'monthly',     label: 'Monthly' },
];

const EMPTY_FORM = {
  service: '', propertyType: '', bedrooms: '', bathrooms: '', rooms: [],
  frequency: '', postcode: '', address: '', preferredDate: '',
  firstName: '', lastName: '', email: '', phone: '', message: '',
};

/* ── Pill selector ── */
function PillSelect({ options, value, onChange, multi = false }) {
  const isSelected = v => multi ? (value || []).includes(v) : value === v;
  const toggle = v => {
    if (!multi) return onChange(v);
    const arr = value || [];
    onChange(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const lbl = typeof opt === 'string' ? opt : opt.label;
        const ico = typeof opt === 'object' ? opt.icon : null;
        return (
          <button key={val} type="button" onClick={() => toggle(val)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
              isSelected(val)
                ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
            }`}>
            {ico && <span>{ico}</span>}
            {lbl}
          </button>
        );
      })}
    </div>
  );
}

/* ── Counter ── */
function Counter({ value, onChange, options, label }) {
  return (
    <div>
      <p className="label mb-2">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`w-12 h-12 rounded-xl border text-sm font-bold transition-all ${
              value === opt
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-600'
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Section label ── */
function SectionLabel({ num, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{num}</div>
      <div>
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ── Main form ── */
export default function QuoteForm() {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');

  /* postcode + address lookup state */
  const [pcStatus,   setPcStatus]   = useState('idle'); // idle | loading | valid | invalid
  const [pcInfo,     setPcInfo]     = useState(null);
  const [addrList,   setAddrList]   = useState([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [addrError,  setAddrError]  = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  /* ── Postcode validation + address lookup ── */
  const findAddresses = useCallback(async () => {
    let clean = form.postcode.replace(/\s+/g, '');
    if (clean.length < 5) { setAddrError('Please enter a valid postcode first.'); return; }

    setAddrLoading(true);
    setAddrError('');
    setAddrList([]);
    setShowDropdown(false);
    setPcStatus('loading');
    setPcInfo(null);

    try {
      /* Step 1 — validate postcode via postcodes.io (~100ms, free) */
      let pcRes  = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`);
      let pcData = await pcRes.json();

      /* Auto-correct: O vs 0 typo */
      if (pcData.status !== 200) {
        const corrected = clean.replace(/O/gi, '0');
        if (corrected !== clean) {
          const retryRes  = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(corrected)}`);
          const retryData = await retryRes.json();
          if (retryData.status === 200) {
            pcData = retryData;
            clean  = corrected;
            set('postcode', retryData.result.postcode);
          }
        }
      }

      if (pcData.status !== 200) {
        setPcStatus('invalid');
        setAddrError('Postcode not found. Please double-check — make sure you typed 0 (zero) not the letter O.');
        setAddrLoading(false);
        return;
      }

      setPcInfo(pcData.result);
      setPcStatus('valid');

      const pc = pcData.result.postcode;

      /* Step 2 — fetch addresses via server-side route (avoids CORS/token issues) */
      const addrRes  = await fetch(`/api/address?postcode=${encodeURIComponent(pc)}`);
      const addrData = await addrRes.json();

      if (addrData.addresses?.length) {
        setAddrList(addrData.addresses);
        setShowDropdown(true);
      } else {
        const debugInfo = addrData.debug ? ` [debug: ${addrData.debug}${addrData.error ? ' / ' + addrData.error : ''}]` : '';
        setAddrError(`No addresses found for this postcode. Please enter your address below.${debugInfo}`);
      }

    } catch (err) {
      setAddrError(`Address lookup failed: ${String(err)}`);
    } finally {
      setAddrLoading(false);
    }
  }, [form.postcode]);

  const selectAddress = addr => {
    set('address', addr);
    setShowDropdown(false);
  };

  /* ── Submit ── */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.service || !form.propertyType || !form.postcode || !form.address || !form.firstName || !form.email || !form.phone) {
      alert('Please fill in all required fields including your address.');
      return;
    }
    setStatus('loading');
    try {
      const payload = {
        ...form,
        rooms: form.rooms.join(', '),
        summary: `${form.propertyType} · ${form.bedrooms} bed · ${form.bathrooms} bath · ${form.rooms.length} extra rooms`,
        postcodeDistrict: pcInfo ? `${pcInfo.ward}, ${pcInfo.admin_district}` : '',
      };
      const res  = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(EMPTY_FORM);
        setPcStatus('idle'); setPcInfo(null);
        setAddrList([]); setShowDropdown(false); setAddrError('');
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">Quote Request Sent!</h3>
        <p className="text-slate-500 mb-2">Thank you! We'll get back to you within 2 hours with a transparent, competitive quote.</p>
        <p className="text-slate-400 text-sm mb-6">Check your inbox at <strong>{form.email}</strong></p>
        <button onClick={() => setStatus('idle')} className="btn-primary">Submit Another Quote</button>
      </div>
    );
  }

  const sectionNum = (n) => {
    const isResidential = form.propertyType && form.propertyType !== 'commercial';
    if (n === 'rooms')   return isResidential ? '4' : '3';
    if (n === 'freq')    return isResidential ? '5' : (form.propertyType ? '4' : '3');
    if (n === 'addr')    return isResidential ? '6' : (form.propertyType ? '5' : '4');
    if (n === 'contact') return isResidential ? '7' : (form.propertyType ? '6' : '5');
    return n;
  };

  const postcodeReady = form.postcode.replace(/\s/g, '').length >= 5;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-brand-600 px-6 py-4">
        <h3 className="font-heading font-bold text-white text-lg">Get Your Free Quote</h3>
        <p className="text-white/70 text-xs mt-0.5">Fill in the details below — we'll respond within 2 hours</p>
      </div>

      <div className="p-6 space-y-7">

        {/* 1 — Service type */}
        <div className="pb-6 border-b border-slate-100">
          <SectionLabel num="1" title="What service do you need? *" subtitle="Select the cleaning service required" />
          <PillSelect options={SERVICES} value={form.service} onChange={v => set('service', v)} />
        </div>

        {/* 2 — Property type */}
        <div className="pb-6 border-b border-slate-100">
          <SectionLabel num="2" title="Property type *" subtitle="What type of property are we cleaning?" />
          <PillSelect options={PROPERTY_TYPES} value={form.propertyType} onChange={v => set('propertyType', v)} />
        </div>

        {/* 3 — Bedrooms & Bathrooms */}
        {form.propertyType && form.propertyType !== 'commercial' && (
          <div className="pb-6 border-b border-slate-100">
            <SectionLabel num="3" title="Property size" subtitle="How many bedrooms and bathrooms?" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Counter label="Bedrooms *" options={BEDROOMS} value={form.bedrooms} onChange={v => set('bedrooms', v)} />
              <Counter label="Bathrooms / Ensuites *" options={BATHROOMS} value={form.bathrooms} onChange={v => set('bathrooms', v)} />
            </div>
          </div>
        )}

        {/* 4 — Extra rooms */}
        {form.propertyType && (
          <div className="pb-6 border-b border-slate-100">
            <SectionLabel num={sectionNum('rooms')} title="Which rooms need cleaning?" subtitle="Tick all rooms that require attention" />
            <PillSelect options={EXTRA_ROOMS} value={form.rooms} onChange={v => set('rooms', v)} multi />
            {form.rooms.length > 0 && (
              <p className="text-xs text-brand-600 font-medium mt-3">
                ✓ {form.rooms.length} room{form.rooms.length > 1 ? 's' : ''} selected:{' '}
                {form.rooms.map(r => EXTRA_ROOMS.find(x => x.value === r)?.label).join(', ')}
              </p>
            )}
          </div>
        )}

        {/* 5 — Frequency */}
        <div className="pb-6 border-b border-slate-100">
          <SectionLabel num={sectionNum('freq')} title="How often?" subtitle="Regular bookings get preferential pricing" />
          <PillSelect options={FREQUENCIES} value={form.frequency} onChange={v => set('frequency', v)} />
        </div>

        {/* 6 — Address */}
        <div className="pb-6 border-b border-slate-100">
          <SectionLabel num={sectionNum('addr')} title="Your address *" subtitle="Enter your postcode to find your address" />

          <div className="space-y-3">

            {/* Postcode + Find button */}
            <div>
              <label className="label">Postcode *</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    value={form.postcode}
                    onChange={e => {
                      const val = e.target.value.toUpperCase();
                      set('postcode', val);
                      set('address', '');
                      setPcStatus('idle'); setPcInfo(null);
                      setAddrList([]); setShowDropdown(false); setAddrError('');
                    }}
                    placeholder="e.g. SW1A 1AA"
                    maxLength={8}
                    className="input-field font-mono tracking-widest uppercase pr-9 w-full"
                    required
                    autoComplete="postal-code"
                  />
                  {pcStatus === 'loading'  && <Loader2 size={15} className="absolute right-3 top-3.5 text-slate-400 animate-spin" />}
                  {pcStatus === 'valid'    && <CheckCircle size={15} className="absolute right-3 top-3.5 text-green-500" />}
                </div>
                <button
                  type="button"
                  onClick={findAddresses}
                  disabled={!postcodeReady || addrLoading}
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shrink-0"
                >
                  {addrLoading
                    ? <><Loader2 size={14} className="animate-spin" /> Searching...</>
                    : <><Search size={14} /> Find Address</>
                  }
                </button>
              </div>
              {pcStatus === 'valid' && pcInfo && (
                <p className="text-xs text-green-600 mt-1.5 font-medium">
                  ✓ {[pcInfo.ward, pcInfo.admin_district].filter(Boolean).join(', ')} — we cover this area!
                </p>
              )}
              {pcStatus === 'invalid' && (
                <p className="text-xs text-red-500 mt-1.5">Postcode not found. Please check and try again.</p>
              )}
            </div>

            {/* Address dropdown */}
            {showDropdown && addrList.length > 0 && (
              <div>
                <label className="label">Select your address *</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm max-h-52 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-400 bg-slate-50 border-b border-slate-100 hover:bg-slate-100"
                  >
                    — Select an address —
                  </button>
                  {addrList.map((addr, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectAddress(addr)}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 border-b border-slate-50 last:border-0 transition-colors"
                    >
                      <MapPin size={12} className="inline mr-2 text-slate-400" />
                      {addr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected address display */}
            {form.address && (
              <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-700 mb-0.5">Selected address:</p>
                  <p className="text-sm text-slate-700">{form.address}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { set('address', ''); setShowDropdown(addrList.length > 0); }}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors shrink-0"
                >
                  Change
                </button>
              </div>
            )}

            {/* Manual address input — shown when no dropdown available */}
            {pcStatus === 'valid' && !showDropdown && !form.address && (
              <div>
                {addrError && (
                  <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-2">
                    {addrError}
                  </p>
                )}
                <label className="label">House number &amp; street *</label>
                <input
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder={`e.g. 42 ${pcInfo?.thoroughfare || 'High Street'}`}
                  className="input-field"
                  autoFocus
                />
              </div>
            )}

            {/* Preferred date */}
            <div>
              <label className="label">Preferred Start Date</label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={e => set('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* 7 — Contact details */}
        <div>
          <SectionLabel num={sectionNum('contact')} title="Your contact details *" subtitle="So we can send your personalised quote" />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">First Name *</label>
                <input value={form.firstName} onChange={e => set('firstName', e.target.value)} required placeholder="Jane" className="input-field" />
              </div>
              <div>
                <label className="label">Last Name *</label>
                <input value={form.lastName} onChange={e => set('lastName', e.target.value)} required placeholder="Smith" className="input-field" />
              </div>
            </div>
            <div>
              <label className="label">Email Address *</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required placeholder="jane@example.co.uk" className="input-field" />
            </div>
            <div>
              <label className="label">Phone Number *</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required placeholder="07700 900000" className="input-field" />
            </div>
            <div>
              <label className="label">Additional Instructions <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea
                value={form.message}
                onChange={e => set('message', e.target.value)}
                rows={3}
                placeholder="Any special instructions, access notes, pets in the property..."
                className="input-field resize-none"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        {(form.service || form.propertyType) && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-700 mb-2">Your quote summary:</p>
            {form.service     && <p>📋 Service: <strong>{form.service}</strong></p>}
            {form.propertyType && <p>🏠 Property: <strong>{PROPERTY_TYPES.find(t => t.value === form.propertyType)?.label}</strong></p>}
            {form.bedrooms    && <p>🛏️ Bedrooms: <strong>{form.bedrooms === 'Studio' ? 'Studio' : `${form.bedrooms} Bedroom${form.bedrooms === '1' ? '' : 's'}`}</strong></p>}
            {form.bathrooms   && <p>🚿 Bathrooms: <strong>{form.bathrooms}</strong></p>}
            {form.rooms.length > 0 && <p>🏡 Extra rooms: <strong>{form.rooms.length} selected</strong></p>}
            {form.frequency   && <p>🗓️ Frequency: <strong>{FREQUENCIES.find(f => f.value === form.frequency)?.label}</strong></p>}
            {form.address     && <p>📍 Address: <strong>{form.address}</strong></p>}
            {form.postcode    && <p>📮 Postcode: <strong>{form.postcode}</strong></p>}
          </div>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            Something went wrong. Please try again or call us on <strong>+44 7789 602945</strong>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full justify-center py-4 text-base rounded-xl"
        >
          {status === 'loading'
            ? <><Loader2 size={18} className="animate-spin" /> Sending your quote request...</>
            : <>Get My Free Quote <ChevronRight size={18} /></>
          }
        </button>
        <p className="text-center text-xs text-slate-400">
          🔒 Your details are safe with us. We never share your information with third parties.
        </p>
      </div>
    </form>
  );
}
