import { Zap, Camera, MessageCircle, ArrowUp } from 'lucide-react';
import './Footer.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Masterclass', href: '#why-join' },
  { label: 'Register', href: '#registration' },
  { label: 'Services', href: '#services' },
];

const services = [
  'AI & Automation Training',
  'n8n Automation Solutions',
  'Website Development',
  'Dashboard Development',
  'Business Intelligence',
  'Social Media Management',
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" id="footer">
      <div className="footer__glow" />

      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon"><Zap size={18} strokeWidth={2.5} /></div>
              <span className="footer__logo-text">Amora <span className="text-gradient">Nexus</span></span>
            </div>
            <p className="footer__tagline">AI · Automation · Digital Growth</p>
            <p className="footer__desc">
              Empowering future professionals and organizations with cutting-edge AI, automation,
              and digital growth strategies.
            </p>
            <div className="footer__socials">
              <a
                href="https://www.instagram.com/amoranexus/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label="Instagram"
                id="footer-instagram-link"
              >
                <Camera size={20} />
              </a>
              <a
                href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social footer__social--whatsapp"
                aria-label="WhatsApp"
                id="footer-whatsapp-link"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navigation</h4>
            <ul className="footer__links">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="footer__link"
                    onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="footer__link"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="footer__col">
            <h4 className="footer__col-title">Get Started</h4>
            <p className="footer__cta-desc">
              Ready to embrace the future? Join our community or register for our free masterclass.
            </p>
            <div className="footer__cta-btns">
              <a
                href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <MessageCircle size={16} /> Join Group
              </a>
              <a
                href="#registration"
                className="btn btn-outline btn-sm"
                onClick={(e) => { e.preventDefault(); document.querySelector('#registration')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Free Masterclass
              </a>
            </div>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Amora Nexus. All rights reserved. Crafted with ❤️ by Suruthika C D.
          </p>
          <button className="footer__scroll-top" onClick={scrollTop} aria-label="Scroll to top" id="scroll-top-btn">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
