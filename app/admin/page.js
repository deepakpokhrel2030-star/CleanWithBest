'use client';
import { useState } from 'react';
import { Lock, LogOut, Trash2, RefreshCw, FileText, MessageSquare, TrendingUp, Eye, EyeOff } from 'lucide-react';

function Badge({ status }) {
  const colors = { new: 'bg-green-100 text-green-700', viewed: 'bg-blue-100 text-blue-700', contacted: 'bg-purple-100 text-purple-700' };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors[status] || colors.new}`}>{status}</span>;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ quotes: [], contacts: [] });
  const [tab, setTab] = useState('quotes');
  const [deleting, setDeleting] = useState(null);

  const login = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, action: 'getData' }) });
    const json = await res.json();
    setLoading(false);
    if (json.success) { setData(json); setLoggedIn(true); }
    else setError('Incorrect password. Please try again.');
  };

  const refresh = async () => {
    const res = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, action: 'getData' }) });
    const json = await res.json();
    if (json.success) setData(json);
  };

  const deleteEntry = async (type, id) => {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    setDeleting(id);
    await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, action: 'delete', type, id }) });
    await refresh();
    setDeleting(null);
  };

  const updateStatus = async (type, id, status) => {
    await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, action: 'updateStatus', type, id, status }) });
    await refresh();
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-slate-100">
          <div className="flex items-center justify-center w-14 h-14 bg-brand-100 rounded-2xl mx-auto mb-6">
            <Lock size={24} className="text-brand-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-slate-900 text-center mb-2">Admin Login</h1>
          <p className="text-slate-400 text-sm text-center mb-6">CleanWithBest Dashboard</p>
          <form onSubmit={login} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field pr-10"
                required
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-4">Default password is set in <code className="bg-slate-100 px-1 rounded">.env.local</code></p>
        </div>
      </main>
    );
  }

  const newQuotes = data.quotes.filter(q => q.status === 'new').length;
  const newContacts = data.contacts.filter(c => c.status === 'new').length;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Admin header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-slate-900 text-xl">
              <span className="text-brand-600">Clean</span><span className="text-accent-600">WithBest</span> — Admin
            </h1>
            <p className="text-slate-400 text-sm">Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refresh} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setLoggedIn(false)} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { icon: FileText, label: 'Total Quotes', value: data.quotes.length, sub: `${newQuotes} new`, color: 'brand' },
            { icon: MessageSquare, label: 'Total Messages', value: data.contacts.length, sub: `${newContacts} new`, color: 'accent' },
            { icon: TrendingUp, label: 'This Month', value: [...data.quotes, ...data.contacts].filter(x => new Date(x.createdAt).getMonth() === new Date().getMonth()).length, sub: 'submissions', color: 'brand' },
            { icon: FileText, label: 'New Items', value: newQuotes + newContacts, sub: 'require attention', color: 'accent' },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color === 'brand' ? 'bg-brand-100' : 'bg-accent-500/15'}`}>
                <Icon size={18} className={color === 'brand' ? 'text-brand-600' : 'text-accent-600'} />
              </div>
              <div className="font-heading text-3xl font-bold text-slate-900">{value}</div>
              <div className="text-slate-500 text-sm font-medium">{label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('quotes')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'quotes' ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            <FileText size={15} /> Quote Requests
            {newQuotes > 0 && <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{newQuotes}</span>}
          </button>
          <button onClick={() => setTab('contacts')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'contacts' ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            <MessageSquare size={15} /> Contact Messages
            {newContacts > 0 && <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{newContacts}</span>}
          </button>
        </div>

        {/* Quotes table */}
        {tab === 'quotes' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Quote Requests ({data.quotes.length})</h2>
            </div>
            {data.quotes.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <FileText size={40} className="mx-auto mb-3 opacity-30" />
                <p>No quote requests yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Name', 'Contact', 'Service', 'Postcode', 'Size / Freq.', 'Date', 'Status', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.quotes.map(q => (
                      <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{q.firstName} {q.lastName}</td>
                        <td className="px-4 py-3 text-slate-500">
                          <div>{q.email}</div>
                          <div className="text-xs text-slate-400">{q.phone}</div>
                        </td>
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
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
                          >
                            <option value="new">new</option>
                            <option value="viewed">viewed</option>
                            <option value="contacted">contacted</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
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
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Contact Messages ({data.contacts.length})</h2>
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
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
      </div>
    </main>
  );
}
