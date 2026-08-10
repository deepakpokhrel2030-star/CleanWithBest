'use client';
import { useState } from 'react';
import { Lock, LogOut, Trash2, RefreshCw, FileText, MessageSquare, TrendingUp, Eye, EyeOff, Phone, Mail, MapPin, X, Package, Plus, Save, Edit3 } from 'lucide-react';

function Badge({ status }) {
  const colors = { new: 'bg-green-100 text-green-700', viewed: 'bg-blue-100 text-blue-700', contacted: 'bg-purple-100 text-purple-700' };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors[status] || colors.new}`}>{status}</span>;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function whatsappNumber(phone = '') {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return `44${digits.slice(1)}`;
  return digits;
}

const emptyProductForm = {
  id: null,
  name: '',
  price: '',
  category: '',
  description: '',
  imageUrl: '',
  stock: '',
  status: 'active',
};

function QuoteDetailModal({ quote, onClose, onStatusChange, onDelete, deleting }) {
  if (!quote) return null;

  const details = [
    ['Service', quote.service],
    ['Property type', quote.propertyType],
    ['Bedrooms', quote.bedrooms],
    ['Bathrooms', quote.bathrooms],
    ['Extra rooms', quote.rooms],
    ['Frequency', quote.frequency],
    ['Preferred date', quote.preferredDate],
    ['Postcode', quote.postcode],
    ['Area', quote.postcodeDistrict],
    ['Summary', quote.summary],
  ].filter(([, value]) => value);

  return (
    <div className="fixed inset-0 z-[80] bg-brand-900/60 px-4 py-6 overflow-y-auto">
      <div className="mx-auto max-w-3xl rounded-lg bg-white shadow-2xl border border-slate-200">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Quote Request</p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-slate-900">{quote.firstName} {quote.lastName}</h2>
            <p className="text-sm text-slate-400">{formatDate(quote.createdAt)}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close quote details">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-5">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                <MapPin size={16} className="text-brand-600" /> Address
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{quote.address || 'No address provided'}</p>
              {quote.postcode && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{quote.postcode}</p>}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            {quote.message && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Customer Notes</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{quote.message}</p>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Contact Details</p>
              <div className="mt-3 space-y-2 text-sm">
                <a href={`tel:${quote.phone}`} className="flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800">
                  <Phone size={15} /> {quote.phone}
                </a>
                {quote.email && (
                  <a href={`mailto:${quote.email}`} className="flex items-center gap-2 text-slate-600 hover:text-brand-700">
                    <Mail size={15} /> {quote.email}
                  </a>
                )}
                <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
                  Preferred: {quote.contactPreference || 'Call'}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <a href={`tel:${quote.phone}`} className="btn-primary w-full">
                <Phone size={16} /> Call Customer
              </a>
              <a href={`https://wa.me/${whatsappNumber(quote.phone)}`} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
                <MessageSquare size={16} /> WhatsApp
              </a>
              {quote.email && (
                <a href={`mailto:${quote.email}`} className="btn-outline w-full">
                  <Mail size={16} /> Email
                </a>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <label className="label">Status</label>
              <select
                value={quote.status}
                onChange={e => onStatusChange(quote.id, e.target.value)}
                className="input-field"
              >
                <option value="new">new</option>
                <option value="viewed">viewed</option>
                <option value="contacted">contacted</option>
              </select>
            </div>

            <button
              onClick={() => onDelete(quote.id)}
              disabled={deleting === quote.id}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <Trash2 size={16} /> Delete Quote
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ quotes: [], contacts: [], products: [] });
  const [tab, setTab] = useState('quotes');
  const [deleting, setDeleting] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productError, setProductError] = useState('');

  const adminPayload = extra => ({ username: username.trim(), password: password.trim(), ...extra });

  const login = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(adminPayload({ action: 'getData' })) });
    const json = await res.json();
    setLoading(false);
    if (json.success) { setData(json); setLoggedIn(true); }
    else setError(json.error === 'Admin login is not configured'
      ? 'Admin login is not configured on this deployment. Add ADMIN_USERNAME and ADMIN_PASSWORD_HASH.'
      : 'Incorrect admin login details. Please try again.'
    );
  };

  const refresh = async () => {
    const res = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(adminPayload({ action: 'getData' })) });
    const json = await res.json();
    if (json.success) {
      setData(json);
      if (selectedQuote) {
        setSelectedQuote(json.quotes.find(q => q.id === selectedQuote.id) || null);
      }
    }
  };

  const deleteEntry = async (type, id) => {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    setDeleting(id);
    await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(adminPayload({ action: 'delete', type, id })) });
    await refresh();
    setDeleting(null);
    if (type === 'quote' && selectedQuote?.id === id) setSelectedQuote(null);
  };

  const updateStatus = async (type, id, status) => {
    await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(adminPayload({ action: 'updateStatus', type, id, status })) });
    await refresh();
  };

  const updateQuoteStatus = (id, status) => updateStatus('quote', id, status);
  const deleteQuote = id => deleteEntry('quote', id);

  const resetProductForm = () => {
    setProductForm(emptyProductForm);
    setProductError('');
  };

  const editProduct = product => {
    setProductForm({
      id: product.id,
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      stock: product.stock || '',
      status: product.status === 'inactive' ? 'inactive' : 'active',
    });
    setProductError('');
  };

  const saveProduct = async e => {
    e.preventDefault();
    setSavingProduct(true);
    setProductError('');

    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminPayload({
        action: 'saveProduct',
        id: productForm.id,
        status: productForm.status,
        product: {
          name: productForm.name,
          price: productForm.price,
          category: productForm.category,
          description: productForm.description,
          imageUrl: productForm.imageUrl,
          stock: productForm.stock,
        },
      })),
    });
    const json = await res.json();
    setSavingProduct(false);

    if (!json.success) {
      setProductError(json.error || 'Could not save product.');
      return;
    }

    resetProductForm();
    await refresh();
  };

  if (!loggedIn) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-900 px-4 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(46,196,182,.20),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(81,147,227,.18),transparent_30%)]" />
        <div className="relative w-full max-w-md rounded-lg border border-white/10 bg-white p-8 shadow-2xl shadow-brand-950/30">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-800">
            <Lock size={24} className="text-accent-400" />
          </div>
          <h1 className="mb-2 text-center font-heading text-2xl font-bold text-brand-800">Admin Login</h1>
          <p className="mb-6 text-center text-sm text-slate-500">CleanWithBest dashboard for quotes and messages.</p>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="label">Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="input-field"
                required
              />
            </div>
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field pr-10"
                required
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 bottom-3.5 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-4">Use the admin username and password configured for this website.</p>
        </div>
      </main>
    );
  }

  const newQuotes = data.quotes.filter(q => q.status === 'new').length;
  const newContacts = data.contacts.filter(c => c.status === 'new').length;
  const activeProducts = data.products.filter(product => product.status === 'active').length;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Admin header */}
      <div className="border-b border-slate-200 bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-brand-800">
              <span className="text-brand-800">Clean</span><span className="text-brand-700">WithBest</span> Admin
            </h1>
            <p className="text-sm text-slate-500">Manage website quote requests, contact messages and cleaning products.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand-800">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setLoggedIn(false)} className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-lg bg-brand-800 p-6 text-white shadow-xl shadow-brand-900/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-accent-400">Live inbox</p>
              <h2 className="mt-2 font-heading text-3xl font-bold">New work, all in one place</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">Open quotes, call customers, WhatsApp them, and keep your cleaning product shop up to date.</p>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-3 text-sm font-bold ring-1 ring-white/10">
              {newQuotes + newContacts} new items
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { icon: FileText, label: 'Total Quotes', value: data.quotes.length, sub: `${newQuotes} new`, color: 'brand' },
            { icon: MessageSquare, label: 'Total Messages', value: data.contacts.length, sub: `${newContacts} new`, color: 'accent' },
            { icon: Package, label: 'Products', value: data.products.length, sub: `${activeProducts} active`, color: 'brand' },
            { icon: TrendingUp, label: 'This Month', value: [...data.quotes, ...data.contacts].filter(x => new Date(x.createdAt).getMonth() === new Date().getMonth()).length, sub: 'submissions', color: 'accent' },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${color === 'brand' ? 'bg-brand-50' : 'bg-accent-500/15'}`}>
                <Icon size={18} className={color === 'brand' ? 'text-brand-600' : 'text-accent-600'} />
              </div>
              <div className="font-heading text-3xl font-bold text-slate-900">{value}</div>
              <div className="text-slate-500 text-sm font-medium">{label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg bg-white p-1 shadow-sm ring-1 ring-slate-200">
          <button onClick={() => setTab('quotes')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${tab === 'quotes' ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
            <FileText size={15} /> Quote Requests
            {newQuotes > 0 && <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{newQuotes}</span>}
          </button>
          <button onClick={() => setTab('contacts')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${tab === 'contacts' ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
            <MessageSquare size={15} /> Contact Messages
            {newContacts > 0 && <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{newContacts}</span>}
          </button>
          <button onClick={() => setTab('products')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${tab === 'products' ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Package size={15} /> Products
            {activeProducts > 0 && <span className="bg-accent-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center px-1">{activeProducts}</span>}
          </button>
        </div>

        {/* Quotes table */}
        {tab === 'quotes' && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="font-heading text-lg font-bold text-brand-800">Quote Requests</h2>
                <p className="text-sm text-slate-500">{data.quotes.length} total requests</p>
              </div>
            </div>
            {data.quotes.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <FileText size={40} className="mx-auto mb-3 opacity-30" />
                <p>No quote requests yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50">
                    <tr>
                      {['Name', 'Contact', 'Preference', 'Service', 'Postcode', 'Size / Freq.', 'Date', 'Status', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.quotes.map(q => (
                      <tr key={q.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{q.firstName} {q.lastName}</td>
                        <td className="px-4 py-3 text-slate-500">
                          <a href={`tel:${q.phone}`} className="font-medium text-brand-600 hover:text-brand-800">{q.phone}</a>
                          {q.email && <div className="text-xs text-slate-400">{q.email}</div>}
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{q.contactPreference || 'Call'}</td>
                        <td className="px-4 py-3 text-slate-700 max-w-[160px]">
                          <div className="truncate">{q.service}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{q.postcode}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {q.propertySize && <div>{q.propertySize}</div>}
                          {q.frequency && <div className="text-slate-400">{q.frequency}</div>}
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(q.createdAt)}</td>
                        <td className="px-4 py-3">
                          <select
                            value={q.status}
                            onChange={e => updateStatus('quote', q.id, e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-500"
                          >
                            <option value="new">new</option>
                            <option value="viewed">viewed</option>
                            <option value="contacted">contacted</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedQuote(q)}
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100"
                            >
                              <Eye size={14} /> View
                            </button>
                            {q.message && (
                              <button title={q.message} className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded">
                                <MessageSquare size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteEntry('quote', q.id)}
                              disabled={deleting === q.id}
                              className="text-red-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contacts table */}
        {tab === 'contacts' && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="font-heading text-lg font-bold text-brand-800">Contact Messages</h2>
              <p className="text-sm text-slate-500">{data.contacts.length} total messages</p>
            </div>
            {data.contacts.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                <p>No contact messages yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Status', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.contacts.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{c.name}</td>
                        <td className="px-4 py-3 text-slate-500">
                          <a href={`mailto:${c.email}`} className="hover:text-brand-600">{c.email}</a>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{c.phone || '—'}</td>
                        <td className="px-4 py-3 text-slate-700">{c.subject}</td>
                        <td className="px-4 py-3 text-slate-500 max-w-xs">
                          <p className="truncate text-xs" title={c.message}>{c.message}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{formatDate(c.createdAt)}</td>
                        <td className="px-4 py-3">
                          <select
                            value={c.status}
                            onChange={e => updateStatus('contact', c.id, e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-500"
                          >
                            <option value="new">new</option>
                            <option value="viewed">viewed</option>
                            <option value="contacted">contacted</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deleteEntry('contact', c.id)}
                            disabled={deleting === c.id}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products manager */}
        {tab === 'products' && (
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            <form onSubmit={saveProduct} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-bold text-brand-800">
                    {productForm.id ? 'Edit Product' : 'Add Product'}
                  </h2>
                  <p className="text-sm text-slate-500">Active products appear on the public products page.</p>
                </div>
                <button type="button" onClick={resetProductForm} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Clear product form">
                  <Plus size={16} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">Product name</label>
                  <input
                    value={productForm.name}
                    onChange={e => setProductForm(form => ({ ...form, name: e.target.value }))}
                    placeholder="e.g. Multi-surface cleaner"
                    className="input-field"
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <label className="label">Price</label>
                    <input
                      value={productForm.price}
                      onChange={e => setProductForm(form => ({ ...form, price: e.target.value }))}
                      placeholder="e.g. £9.99"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Category</label>
                    <input
                      value={productForm.category}
                      onChange={e => setProductForm(form => ({ ...form, category: e.target.value }))}
                      placeholder="e.g. Kitchen"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={e => setProductForm(form => ({ ...form, description: e.target.value }))}
                    placeholder="Short product details"
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>
                <div>
                  <label className="label">Image URL</label>
                  <input
                    value={productForm.imageUrl}
                    onChange={e => setProductForm(form => ({ ...form, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="input-field"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <label className="label">Stock note</label>
                    <input
                      value={productForm.stock}
                      onChange={e => setProductForm(form => ({ ...form, stock: e.target.value }))}
                      placeholder="e.g. In stock"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <select
                      value={productForm.status}
                      onChange={e => setProductForm(form => ({ ...form, status: e.target.value }))}
                      className="input-field"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </div>
                </div>
                {productError && <p className="text-sm font-semibold text-red-500">{productError}</p>}
                <button type="submit" disabled={savingProduct} className="btn-primary w-full">
                  <Save size={16} /> {savingProduct ? 'Saving...' : productForm.id ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="font-heading text-lg font-bold text-brand-800">Products</h2>
                  <p className="text-sm text-slate-500">{data.products.length} total products</p>
                </div>
              </div>
              {data.products.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <Package size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No products added yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-100 bg-slate-50">
                      <tr>
                        {['Product', 'Price', 'Category', 'Stock', 'Status', ''].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data.products.map(product => (
                        <tr key={product.id} className="transition-colors hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-900">{product.name}</div>
                            {product.description && <div className="mt-1 max-w-xs truncate text-xs text-slate-400">{product.description}</div>}
                          </td>
                          <td className="px-4 py-3 font-bold text-brand-700 whitespace-nowrap">{product.price}</td>
                          <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{product.category || '—'}</td>
                          <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{product.stock || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => editProduct(product)}
                                className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100"
                              >
                                <Edit3 size={14} /> Edit
                              </button>
                              <button
                                onClick={() => deleteEntry('product', product.id)}
                                disabled={deleting === product.id}
                                className="text-red-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <QuoteDetailModal
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
        onStatusChange={updateQuoteStatus}
        onDelete={deleteQuote}
        deleting={deleting}
      />
    </main>
  );
}
