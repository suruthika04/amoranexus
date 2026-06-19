import { useState } from 'react';
import { Loader2, Award, X, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './NewLaunch.css';

const initialForm = {
  fullName: '', email: '', phone: '', college: '',
  department: '', yearOfStudy: '', city: '',
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { ref: formRef, revealed: formRevealed } = useScrollReveal({ threshold: 0.1 });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log("Submitting:", form);

    try {
      const res = await fetch('https://amoranexus-1.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        setSuccess(true);
        setForm(initialForm);
      } else {
        console.log("API Error:", data);
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError('Unable to connect to registration server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration section" id="registration">
      <div className="container">
        <div className="registration__header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-tag"><span>●</span> Reserve Your Spot</div>
          <h2 className="section-title">Free <span className="text-gradient">Registration</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Fill in the details below to join the upcoming masterclass.
          </p>
        </div>

        <div
          className={`newlaunch__form-wrap glass-card-strong${formRevealed ? ' reveal-active' : ' reveal-up-init'}`}
          ref={formRef}
          style={{ margin: '0 auto', maxWidth: '800px' }}
        >
          {success ? (
            <div className="newlaunch__success">
              <div className="newlaunch__success-icon">
                <CheckCircle size={48} />
              </div>
              <h2 className="font-display">Registration Successful</h2>
              <p>Thank you for registering for the Free N8N Automation Masterclass.</p>
              <p className="newlaunch__success-sub">
                Join our WhatsApp group to receive the joining link and further instructions.
              </p>
              <a
                href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Join WhatsApp Group
              </a>
              <button className="btn btn-secondary" onClick={() => setSuccess(false)} style={{ marginTop: '10px' }}>
                Register Another Person
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="newlaunch__error">
                  <X size={16} /> {error}
                </div>
              )}

              <form className="newlaunch__form" onSubmit={handleSubmit} id="registration-form">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName" name="fullName" type="text" className="form-input"
                      placeholder="Enter your full name"
                      value={form.fullName} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      id="email" name="email" type="email" className="form-input"
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      id="phone" name="phone" type="tel" className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="college">College / Organization</label>
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
                      <option value="Graduate">Graduate</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City</label>
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
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  {loading ? (
                    <><Loader2 size={20} className="spin-icon" /> Registering...</>
                  ) : (
                    <><Award size={20} /> Register For Free Now</>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
