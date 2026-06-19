import { useState, useEffect } from 'react';
import { LogIn, LogOut, Search, Download, Trash2, RefreshCw, Users, CheckCircle, Clock, Loader2 } from 'lucide-react';
import './Admin.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'amoranexus2024';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [exporting, setExporting] = useState('');

  const login = (e) => {
    e.preventDefault();
    if (creds.username === ADMIN_USER && creds.password === ADMIN_PASS) {
      setLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Please try again.');
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/registrations', {
        headers: { 'X-Admin-Key': 'amoranexus2024' },
      });
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch {
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) fetchRegistrations();
  }, [loggedIn]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration?')) return;
    try {
      await fetch(`http://localhost:5000/api/registrations/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': 'amoranexus2024' },
      });
      fetchRegistrations();
    } catch { /* ignore */ }
  };

  const handleExport = async (type) => {
    setExporting(type);
    try {
      const res = await fetch(`http://localhost:5000/api/export/${type}`, {
        headers: { 'X-Admin-Key': 'amoranexus2024' },
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registrations.${type === 'excel' ? 'xlsx' : 'csv'}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { /* ignore */ } finally {
      setExporting('');
    }
  };

  const filtered = registrations.filter((r) =>
    [r.fullName, r.email, r.phone, r.college, r.city]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  );

  // ─── Login Screen ───
  if (!loggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login__card glass-card-strong">
          <div className="admin-login__logo">
            <span className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>
              Amora Nexus
            </span>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', marginTop: '4px' }}>Admin Dashboard</p>
          </div>
          <form onSubmit={login} className="admin-login__form">
            {authError && (
              <div className="admin-login__error">{authError}</div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="admin-user">Username</label>
              <input
                id="admin-user"
                type="text"
                className="form-input"
                value={creds.username}
                onChange={e => setCreds(c => ({ ...c, username: e.target.value }))}
                placeholder="admin"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-pass">Password</label>
              <input
                id="admin-pass"
                type="password"
                className="form-input"
                value={creds.password}
                onChange={e => setCreds(c => ({ ...c, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} id="admin-login-btn">
              <LogIn size={18} /> Sign In
            </button>
          </form>
          <a href="/" className="admin-login__back">← Back to Website</a>
        </div>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header glass-card-strong">
        <div className="admin-header__brand">
          <span className="text-gradient" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>
            Amora Nexus
          </span>
          <span className="admin-header__tag">Admin Dashboard</span>
        </div>
        <div className="admin-header__actions">
          <button className="btn btn-secondary btn-sm" onClick={fetchRegistrations} id="refresh-btn">
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleExport('excel')}
            disabled={exporting === 'excel'}
            id="export-excel-btn"
          >
            {exporting === 'excel' ? <Loader2 size={16} className="spin-icon" /> : <Download size={16} />}
            Export Excel
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleExport('csv')}
            disabled={exporting === 'csv'}
            id="export-csv-btn"
          >
            {exporting === 'csv' ? <Loader2 size={16} className="spin-icon" /> : <Download size={16} />}
            Export CSV
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => setLoggedIn(false)} id="logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="admin-main container">
        {/* Stats */}
        <div className="admin-stats">
          {[
            { icon: <Users size={22} />, label: 'Total Registrations', value: registrations.length, color: '#3b82f6' },
            { icon: <CheckCircle size={22} />, label: 'This Month', value: registrations.filter(r => new Date(r.createdAt) > new Date(new Date().setDate(1))).length, color: '#10b981' },
            { icon: <Clock size={22} />, label: 'Today', value: registrations.filter(r => new Date(r.createdAt).toDateString() === new Date().toDateString()).length, color: '#f59e0b' },
          ].map((s) => (
            <div key={s.label} className="admin-stat glass-card">
              <div className="admin-stat__icon" style={{ color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                {s.icon}
              </div>
              <div>
                <p className="admin-stat__value" style={{ color: s.color }}>{s.value}</p>
                <p className="admin-stat__label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="admin-search glass-card">
          <Search size={18} style={{ color: 'var(--gray-500)' }} />
          <input
            type="text"
            className="admin-search__input"
            placeholder="Search by name, email, phone, college or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="admin-search-input"
          />
          {search && (
            <span className="admin-search__count">{filtered.length} results</span>
          )}
        </div>

        {/* Table */}
        <div className="admin-table-wrap glass-card-strong">
          {loading ? (
            <div className="admin-loading">
              <Loader2 size={32} className="spin-icon" style={{ color: 'var(--blue-400)' }} />
              <p>Loading registrations...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty">
              <Users size={48} style={{ color: 'var(--gray-600, var(--gray-500))', opacity: 0.5 }} />
              <p>{search ? 'No results found.' : 'No registrations yet.'}</p>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>College / Org</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>City</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r._id || i}>
                      <td>{i + 1}</td>
                      <td><strong>{r.fullName}</strong></td>
                      <td>{r.email}</td>
                      <td>{r.phone}</td>
                      <td>{r.college}</td>
                      <td>{r.department || '—'}</td>
                      <td>{r.yearOfStudy || '—'}</td>
                      <td>{r.city}</td>
                      <td>{r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                      <td>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(r._id)}
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
