import { Video, Users, Lightbulb, CheckCircle, Award, Zap, CalendarDays, Clock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './NewLaunch.css';

const features = [
  { icon: <Users size={18} />, text: 'Beginner Friendly' },
  { icon: <Video size={18} />, text: 'Live Interactive Sessions' },
  { icon: <Lightbulb size={18} />, text: 'Hands-On Demonstrations' },
  { icon: <CheckCircle size={18} />, text: 'Real-World Use Cases' },
  { icon: <Award size={18} />, text: 'Certificate of Participation' },
];

const details = [
  { icon: <CalendarDays size={16} />, label: 'Duration', value: '2-hour session' },
  { icon: <Clock size={16} />, label: 'Timing', value: 'Weekend · Online' },
  { icon: <Zap size={16} />, label: 'Level', value: 'Beginner Friendly' },
];

export default function WhyJoin() {
  const { ref: bannerRef, revealed: bannerRevealed } = useScrollReveal();

  return (
    <section className="whyjoin section" id="why-join">
      <div className="container">
        <div
          className={`newlaunch__banner${bannerRevealed ? ' reveal-active' : ' reveal-up-init'}`}
          ref={bannerRef}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <div className="newlaunch__banner-badge">
            <Zap size={14} /> WHY JOIN THIS MASTERCLASS?
          </div>
          <h2 className="newlaunch__banner-title font-display">
            Master Automation with <span className="text-gradient">n8n</span>
          </h2>
          <p className="newlaunch__banner-desc">
            Learn how modern businesses automate repetitive tasks, improve productivity,
            and build smart workflows using n8n — completely free. This session is designed
            to give you practical skills you can use immediately.
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

          <div className="newlaunch__features" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {features.map((f) => (
              <div key={f.text} className="newlaunch__feature">
                <span className="newlaunch__feature-icon">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
