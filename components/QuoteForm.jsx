'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { CheckCircle, Loader2, ChevronRight, MapPin } from 'lucide-react';

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

const BEDROOMS = ['Studio', '1', '2', '3', '4', '5', '6+'];
const BATHROOMS = ['1', '2', '3', '4+'];

const EXTRA_ROOMS = [
  { value: 'kitchen',       label: 'Kitchen',            icon: '🍳' },
  { value: 'living_room',   label: 'Living Room',         icon: '🛋️' },
  { value: 'dining_room',   label: 'Dining Room',         icon: '🍴' },
  { value: 'hallway',       label: 'Hallway / Landing',   icon: '🚪' },
  { value: 'conservatory',  label: 'Conservatory',        icon: '🌿' },
  { value: 'study',         label: 'Study / Office',      icon: '💼' },
  { value: 'utility',       label: 'Utility Room',        icon: '🔧' },
  { value: 'garage',        label: 'Garage',              icon: '🚗' },
  { value: 'cellar',        label: 'Cellar / Basement',   icon: '⬇️' },
  { value: 'loft',          label: 'Loft / Attic',        icon: '⬆️' },
];

const FREQUENCIES = [
  { value: 'one_off',      label: 'One-Off' },
  { value: 'weekly',       label: 'Weekly' },
  { value: 'fortnightly',  label: 'Fortnightly' },
  { value: 'every3weeks',  label: 'Every 3 Weeks' },
  { value: 'monthly',      label: 'Monthly' },
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
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');

  /* postcode validation state */
  const [pcStatus, setPcStatus] = useState('idle'); // idle | loading | valid | invalid
  const [pcInfo, setPcInfo] = useState(null);

  /* address autocomplete */
  const addressRef = useRef(null);
  const autocompleteRef = useRef(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  /* ── Load Google Places script (only if API key provided) ── */
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key || typeof window === 'undefined') return;
    if (document.getElementById('gmaps-places-script')) {
      if (window.google?.maps?.places && addressRef.current) initAutocomplete();
      return;
    }
    const script = document.createElement('script');
    script.id = 'gmaps-places-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&region=GB&language=en`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (addressRef.current) initAutocomplete();
    };
    document.head.appendChild(script);
  }, []);

  const initAutocomplete = useCallback(() => {
    if (!window.google?.maps?.places || !addressRef.current || autocompleteRef.current) return;
    const ac = new window.google.maps.places.Autocomplete(addressRef.current, {
      componentRestrictions: { country: 'gb' },
      fields: ['formatted_address', 'address_components'],
      types: ['address'],
    });
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      if (place.formatted_address) {
        set('address', place.formatted_address);
        const pc = place.address_components?.find(c => c.types.includes('postal_code'))?.long_name;
        if (pc) {
          const upper = pc.toUpperCase();
          set('postcode', upper);
          validatePostcode(upper);
        }
      }
    });
    autocompleteRef.current = ac;
  }, []);

  /* ── Postcode validation via postcodes.io (free, no API key) ── */
  const validatePostcode = useCallback(async (pc) => {
    const clean = pc.replace(/\s+/g, '');
    if (clean.length < 5) { setPcStatus('idle'); setPcInfo(null); return; }
    setPcStatus('loading');
    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (data.status === 200) {
        setPcInfo(data.result);
        setPcStatus('valid');
      } else {
        setPcStatus('invalid');
        setPcInfo(null);
      }
    } catch {
      setPcStatus('idle');
    }
  }, []);

  const handlePostcodeBlur = () => {
    if (form.postcode.trim()) validatePostcode(form.postcode);
  };

  /* ── Submit ── */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.service || !form.propertyType || !form.postcode || !form.firstName || !form.email || !form.phone) {
      alert('Please fill in all required fields.');
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
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(EMPTY_FORM);
        setPcStatus('idle');
        setPcInfo(null);
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
    if (n === 'rooms') return form.propertyType && form.propertyType !== 'commercial' ? '4' : '3';
    if (n === 'freq')  return form.propertyType && form.propertyType !== 'commercial' ? '5' : (form.propertyType ? '4' : '3');
    if (n === 'addr')  return form.propertyType && form.propertyType !== 'commercial' ? '6' : (form.propertyType ? '5' : '4');
    if (n === 'contact') return form.propertyType && form.propertyType !== 'commercial' ? '7' : (form.propertyType ? '6' : '5');
    return n;
  };

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
            <SectionLabel
              num={sectionNum('rooms')}
              title="Which rooms need cleaning?"
              subtitle="Tick all rooms that require attention"
            />
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
          <SectionLabel num={sectionNum('addr')} title="Your address" subtitle="We serve all London postcodes" />

          <div className="space-y-3">
            {/* Full address with Google Places autocomplete */}
            <div>
              <label className="label">Start typing your address</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
                <input
                  ref={addressRef}
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="House number, street name, London..."
                  className="input-field pl-9"
                  autoComplete="street-address"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Start typing — address suggestions will appear as you type</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {/* Postcode */}
              <div>
                <label className="label">Postcode *</label>
                <div className="relative">
                  <input
                    value={form.postcode}
                    onChange={e => {
                      const val = e.target.value.toUpperCase();
                      set('postcode', val);
                      setPcStatus('idle');
                      setPcInfo(null);
                    }}
                    onBlur={handlePostcodeBlur}
                    placeholder="e.g. SW1A 1AA"
                    maxLength={8}
                    className="input-field font-mono tracking-widest uppercase pr-9"
                    required
                  />
                  {pcStatus === 'loading' && (
                    <Loader2 size={15} className="absolute right-3 top-3.5 text-slate-400 animate-spin" />
                  )}
                  {pcStatus === 'valid' && (
                    <CheckCircle size={15} className="absolute right-3 top-3.5 text-green-500" />
                  )}
                </div>
                {pcStatus === 'valid' && pcInfo && (
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    ✓ {pcInfo.ward}, {pcInfo.admin_district} — we cover this area!
                  </p>
                )}
                {pcStatus === 'invalid' && (
                  <p className="text-xs text-red-500 mt-1">Postcode not found. Please check and try again.</p>
                )}
              </div>

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
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required placeholder="07700 900000 or 020 7946 0000" className="input-field" />
            </div>
            <div>
              <label className="label">Additional Instructions <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea
                value={form.message}
                onChange={e => set('message', e.target.value)}
                rows={3}
                placeholder="Any special instructions, access notes, pets in the property, areas to focus on..."
                className="input-field resize-none"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        {(form.service || form.propertyType) && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-700 mb-2">Your quote summary:</p>
            {form.service && <p>📋 Service: <strong>{form.service}</strong></p>}
            {form.propertyType && <p>🏠 Property: <strong>{PROPERTY_TYPES.find(t => t.value === form.propertyType)?.label}</strong></p>}
            {form.bedrooms && <p>🛏️ Bedrooms: <strong>{form.bedrooms === 'Studio' ? 'Studio' : `${form.bedrooms} Bedroom${form.bedrooms === '1' ? '' : 's'}`}</strong></p>}
            {form.bathrooms && <p>🚿 Bathrooms: <strong>{form.bathrooms}</strong></p>}
            {form.rooms.length > 0 && <p>🏡 Extra rooms: <strong>{form.rooms.length} selected</strong></p>}
            {form.frequency && <p>🗓️ Frequency: <strong>{FREQUENCIES.find(f => f.value === form.frequency)?.label}</strong></p>}
            {pcStatus === 'valid' && pcInfo && <p>📍 Area: <strong>{pcInfo.ward}, {pcInfo.admin_district}</strong></p>}
            {form.postcode && <p>📮 Postcode: <strong>{form.postcode}</strong></p>}
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
