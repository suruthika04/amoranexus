import { useState } from 'react';
import { Video, Users, Lightbulb, Award, CheckCircle, X, Loader2, Zap, Clock, CalendarDays } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './NewLaunch.css';

const features = [
  { icon: <Video size={18} />, text: 'Live Interactive Sessions' },
  { icon: <Users size={18} />, text: 'Beginner Friendly' },
  { icon: <Lightbulb size={18} />, text: 'Hands-On Demonstrations' },
  { icon: <CheckCircle size={18} />, text: 'Real-World Use Cases' },
  { icon: <Award size={18} />, text: 'Certificate of Participation' },
];

const details = [
  { icon: <CalendarDays size={16} />, label: 'Duration', value: '2-hour session' },
  { icon: <Clock size={16} />, label: 'Timing', value: 'Weekend · Online' },
  { icon: <Zap size={16} />, label: 'Level', value: 'Beginner Friendly' },
];

const initialForm = {
  fullName: '', email: '', phone: '', college: '',
  department: '', yearOfStudy: '', city: '',
};

export default function NewLaunch() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { ref: bannerRef, revealed: bannerRevealed } = useScrollReveal();
  const { ref: formRef, revealed: formRevealed } = useScrollReveal({ threshold: 0.08 });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm(initialForm);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Service temporarily unavailable. Please try again later.');
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="newlaunch section" id="new-launch">
        <div className="container">
          <div className="newlaunch__success glass-card-strong">
            <div className="newlaunch__success-icon">
              <CheckCircle size={48} />
            </div>
            <h2 className="font-display">Registration Successful! 🎉</h2>
            <p>Thank you for registering for the <strong>Free N8N Automation Masterclass.</strong></p>
            <p className="newlaunch__success-sub">
              Our team will contact you through the WhatsApp Group with further updates and joining instructions.
            </p>
            <a
              href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Join WhatsApp Group
            </a>
            <button className="btn btn-secondary" onClick={() => setSuccess(false)}>
              Register Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="newlaunch section" id="new-launch">
      <div className="orb orb-cyan" style={{ width: 500, height: 500, top: 0, right: '-100px', opacity: 0.3 }} />
      <div className="orb orb-blue" style={{ width: 400, height: 400, bottom: 0, left: '-100px', opacity: 0.25 }} />

      <div className="container">
        {/* Banner */}
        <div
          className={`newlaunch__banner${bannerRevealed ? ' reveal-active' : ' reveal-up-init'}`}
          ref={bannerRef}
        >
          <div className="newlaunch__banner-badge">
            <Zap size={14} /> FREE · LIMITED SEATS
          </div>
          <h2 className="newlaunch__banner-title font-display">
            N8N Automation <span className="text-gradient">Masterclass</span>
          </h2>
          <p className="newlaunch__banner-desc">
            Learn how modern businesses automate repetitive tasks, improve productivity,
            and build smart workflows using n8n — completely free.
          </p>

          {/* Event Details */}
          <div className="newlaunch__details">
            {details.map((d) => (
              <div key={d.label} className="newlaunch__detail glass-card">
                <span className="newlaunch__detail-icon">{d.icon}</span>
                <div>
                  <p className="newlaunch__detail-label">{d.label}</p>
                  <p className="newlaunch__detail-value">{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="newlaunch__features">
            {features.map((f) => (
              <div key={f.text} className="newlaunch__feature">
                <span className="newlaunch__feature-icon">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div
          className={`newlaunch__form-wrap glass-card-strong${formRevealed ? ' reveal-active' : ' reveal-up-init'}`}
          ref={formRef}
        >
          <div className="newlaunch__form-header">
            <h3 className="font-display">Register Now</h3>
            <p>Secure your spot — it's completely free!</p>
          </div>

          {error && (
            <div className="newlaunch__error">
              <X size={16} /> {error}
            </div>
          )}

          <form className="newlaunch__form" onSubmit={handleSubmit} id="registration-form">
            <div className="newlaunch__form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName" name="fullName" type="text" className="form-input"
                  placeholder="Enter your full name"
                  value={form.fullName} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  id="email" name="email" type="email" className="form-input"
                  placeholder="your@email.com"
                  value={form.email} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input
                  id="phone" name="phone" type="tel" className="form-input"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="college">College / Organization *</label>
                <input
                  id="college" name="college" type="text" className="form-input"
                  placeholder="Your institution or company"
                  value={form.college} onChange={handleChange} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="department">Department</label>
                <input
                  id="department" name="department" type="text" className="form-input"
                  placeholder="e.g. Computer Science"
                  value={form.department} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="yearOfStudy">Year of Study</label>
                <select
                  id="yearOfStudy" name="yearOfStudy"
                  className="form-input form-select"
                  value={form.yearOfStudy} onChange={handleChange}
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group newlaunch__form-full">
                <label className="form-label" htmlFor="city">City *</label>
                <input
                  id="city" name="city" type="text" className="form-input"
                  placeholder="Your city"
                  value={form.city} onChange={handleChange} required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg newlaunch__submit"
              id="register-now-btn"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={20} className="spin-icon" /> Registering...</>
              ) : (
                <><Award size={20} /> Register Now — It&apos;s Free!</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
