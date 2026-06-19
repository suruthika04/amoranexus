import { Brain, Zap, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const pillars = [
  { icon: <Brain size={22} />, title: 'AI-Powered Learning', desc: 'Cutting-edge curriculum built around real-world AI tools and platforms.' },
  { icon: <Zap size={22} />, title: 'Automation-First', desc: 'Practical automation workflows using n8n, Make, and modern no-code tools.' },
  { icon: <TrendingUp size={22} />, title: 'Digital Growth', desc: 'Strategies to grow brands, teams, and businesses in the digital age.' },
];

export default function About() {
  const { ref: textRef, revealed: textRevealed } = useScrollReveal();

  return (
    <section className="about section" id="about">
      {/* Background orbs */}
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: '10%', right: '-150px', opacity: 0.4 }} />
      <div className="orb orb-cyan" style={{ width: 300, height: 300, bottom: '10%', left: '-80px', opacity: 0.3 }} />

      <div className="container">
        <div className="about__content">
          {/* Text Content */}
          <div
            className={`about__text${textRevealed ? ' reveal-active' : ' reveal-up-init'}`}
            ref={textRef}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            <div className="section-tag" style={{ justifyContent: 'center' }}>
              <span>●</span> About Us
            </div>
            <h2 className="section-title about__title">
              Bridging the Gap Between<br />
              <span className="text-gradient">Knowledge &amp; Execution</span>
            </h2>
            <p className="about__desc">
              Amora Nexus is a digital growth and technology-focused company dedicated to helping
              individuals and organizations embrace the future through AI, automation, analytics,
              and digital solutions.
            </p>
            <p className="about__desc">
              Founded by <strong style={{ color: 'var(--white)' }}>Suruthika C D</strong>, Amora Nexus combines practical learning,
              real-world implementation, and innovative technologies to bridge the gap between
              knowledge and execution.
            </p>

            {/* Pillars */}
            <div className="about__pillars" style={{ justifyContent: 'center' }}>
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="about__pillar glass-card"
                  style={{ animationDelay: `${i * 0.1}s`, textAlign: 'left' }}
                >
                  <div className="about__pillar-icon">{p.icon}</div>
                  <div>
                    <h4 className="about__pillar-title">{p.title}</h4>
                    <p className="about__pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

