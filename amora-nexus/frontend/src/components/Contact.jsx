import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle, Globe as Camera } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref: infoRef, revealed: infoRevealed } = useScrollReveal();
  const { ref: formRef, revealed: formRevealed } = useScrollReveal({ threshold: 0.1 });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm(initialForm); }, 1500);
  };

  return (
    <section className="contact section" id="contact">
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: '0', right: '-100px', opacity: 0.25 }} />

      <div className="container">
        <div className="contact__header">
          <div className="section-tag"><span>●</span> Get In Touch</div>
          <h2 className="section-title">
            Let&apos;s <span className="text-gradient">Work Together</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have a project in mind or want to learn more? Reach out — we&apos;d love to help.
          </p>
        </div>

        <div className="contact__grid">
          {/* Info */}
          <div
            className={`contact__info${infoRevealed ? ' reveal-active' : ' reveal-left'}`}
            ref={infoRef}
          >
            {[
              { icon: <Mail size={22} />, label: 'Email Us', value: 'amoranexus@gmail.com', href: 'mailto:amoranexus@gmail.com', color: '#3b82f6' },
              { icon: <MessageCircle size={22} />, label: 'WhatsApp', value: 'Join our community group', href: 'https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP', color: '#10b981' },
              { icon: <MapPin size={22} />, label: 'Based In', value: 'Coimbatore, Tamil Nadu, India', href: null, color: '#f59e0b' },
            ].map((item) => (
              <div key={item.label} className="contact__info-card glass-card">
                <div className="contact__info-icon" style={{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                  {item.icon}
                </div>
                <div>
                  <p className="contact__info-label">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="contact__info-value contact__info-link">
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact__info-value">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="contact__info-card glass-card contact__social-card">
              <p className="contact__social-title">Follow &amp; Connect</p>
              <div className="contact__social-links">
                <a
                  href="https://www.instagram.com/amoranexus/"
                  target="_blank" rel="noopener noreferrer"
                  className="contact__social-btn contact__social-btn--instagram"
                >
                  <Camera size={16} /> Instagram
                </a>
                <a
                  href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
                  target="_blank" rel="noopener noreferrer"
                  className="contact__social-btn contact__social-btn--whatsapp"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`contact__form-wrap glass-card-strong${formRevealed ? ' reveal-active' : ' reveal-right'}`}
            ref={formRef}
          >
            {sent ? (
              <div className="contact__sent">
                <div className="contact__sent-icon">✅</div>
                <h3 className="font-display">Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn-secondary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title font-display">Send a Message</h3>
                <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-name">Your Name</label>
                    <input id="c-name" name="name" type="text" className="form-input" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-email">Email Address</label>
                    <input id="c-email" name="email" type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-subject">Subject</label>
                    <input id="c-subject" name="subject" type="text" className="form-input" placeholder="How can we help?" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-message">Message</label>
                    <textarea id="c-message" name="message" className="form-input contact__textarea" placeholder="Tell us more..." value={form.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary contact__submit" id="contact-submit-btn" disabled={loading}>
                    {loading ? <><Loader2 size={18} className="spin-icon" /> Sending...</> : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
