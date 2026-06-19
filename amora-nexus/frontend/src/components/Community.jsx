import { MessageCircle, BookOpen, Bell, TrendingUp, Users, Briefcase } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Community.css';

const benefits = [
  { icon: <BookOpen size={22} />, title: 'Learning Resources', desc: 'Access curated AI and automation materials, guides, and tutorials.' },
  { icon: <Bell size={22} />, title: 'Workshop Announcements', desc: 'Be the first to know about upcoming masterclasses and live sessions.' },
  { icon: <TrendingUp size={22} />, title: 'Industry Insights', desc: 'Stay updated with the latest trends in AI, tech, and digital growth.' },
  { icon: <Briefcase size={22} />, title: 'Career Guidance', desc: 'Get tips, roadmaps, and mentorship to fast-track your career.' },
  { icon: <Users size={22} />, title: 'Networking Opportunities', desc: 'Connect with like-minded learners, professionals, and innovators.' },
];

export default function Community() {
  const { ref: textRef, revealed: textRevealed } = useScrollReveal();
  const { ref: ctaRef, revealed: ctaRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="community section" id="community">
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: '20%', right: '-150px', opacity: 0.3 }} />

      <div className="container">
        <div className="community__grid">
          {/* Left */}
          <div
            className={`community__text${textRevealed ? ' reveal-active' : ' reveal-left'}`}
            ref={textRef}
          >
            <div className="section-tag"><span>●</span> Our Community</div>
            <h2 className="section-title">
              Join Our <span className="text-gradient">Learning Community</span>
            </h2>
            <p className="section-subtitle">
              Be part of a thriving community of learners, developers, and digital innovators.
              Get access to exclusive resources, workshops, and real mentorship.
            </p>

            <div className="community__benefits">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="community__benefit glass-card"
                  style={{ '--stagger': `${i * 0.08}s` }}
                >
                  <div className="community__benefit-icon">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="community__benefit-title">{b.title}</h4>
                    <p className="community__benefit-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div
            className={`community__cta-wrap${ctaRevealed ? ' reveal-active' : ' reveal-right'}`}
            ref={ctaRef}
          >
            <div className="community__cta glass-card-strong">
              {/* Glow ring */}
              <div className="community__cta-ring" />

              <div className="community__cta-icon">
                <MessageCircle size={40} />
              </div>
              <h3 className="community__cta-title font-display">
                Join on WhatsApp
              </h3>
              <p className="community__cta-desc">
                Over <strong>500+ members</strong> already growing with Amora Nexus.
                Click below to join your free community group.
              </p>

              <div className="community__cta-stats">
                {[
                  { v: '500+', l: 'Members' },
                  { v: 'Free', l: 'Forever' },
                  { v: '24/7', l: 'Active' },
                ].map((s) => (
                  <div key={s.l} className="community__cta-stat">
                    <span className="text-gradient-cyan community__cta-stat-val">{s.v}</span>
                    <span className="community__cta-stat-label">{s.l}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg community__join-btn"
                id="community-whatsapp-btn"
              >
                <MessageCircle size={22} />
                Join WhatsApp Group
              </a>

              <p className="community__cta-note">
                🔒 Free to join · No spam · Community moderated
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
