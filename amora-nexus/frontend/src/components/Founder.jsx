import { Zap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const roles = ['AIML Student', 'Automation Developer', 'AI Enthusiast', 'Trainer', 'Founder of Amora Nexus'];

export default function Founder() {
  const { ref: cardRef, revealed: cardRevealed } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="founder section" id="founder">
      <div className="container">
        <div className="founder__header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag"><span>●</span> The Visionary</div>
          <h2 className="section-title">Meet Our <span className="text-gradient">Founder</span></h2>
        </div>

        <div className="about__founder-wrap reveal-active" ref={cardRef} style={{ margin: '0 auto', maxWidth: '500px' }}>
          <div className={`about__founder glass-card-strong${cardRevealed ? ' reveal-active' : ' reveal-up-init'}`}>
            <div className="about__avatar">
              <div className="about__avatar-inner">
                <span className="about__avatar-initials">SC</span>
              </div>
              <div className="about__avatar-badge">
                <Zap size={14} />
              </div>
            </div>

            <h3 className="about__founder-name">Suruthika C D</h3>
            <p className="about__founder-title">Founder &amp; CEO, Amora Nexus</p>

            <div className="about__roles">
              {roles.map((r) => (
                <span key={r} className="badge badge-blue">{r}</span>
              ))}
            </div>

            <div className="about__founder-quote">
              <p>"Empowering the next generation with the tools they need to lead the AI-driven future."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
