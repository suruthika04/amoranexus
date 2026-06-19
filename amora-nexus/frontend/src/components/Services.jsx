import { Brain, Zap, Globe, BarChart3, Megaphone, Camera, Layout, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const services = [
  {
    icon: <Brain size={28} />,
    title: 'AI & Automation Training',
    desc: 'Comprehensive training programs on AI tools, machine learning concepts, and automation workflows for beginners to professionals.',
    color: '#3b82f6',
  },
  {
    icon: <Zap size={28} />,
    title: 'Automation with n8n',
    desc: 'Build powerful, scalable automation pipelines using n8n — from simple task automations to complex enterprise workflows.',
    color: '#06b6d4',
  },
  {
    icon: <Globe size={28} />,
    title: 'Website Design & Development',
    desc: 'Modern, responsive, and performance-optimized websites that reflect your brand and convert visitors into customers.',
    color: '#8b5cf6',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Dashboard Development',
    desc: 'Interactive, real-time dashboards with beautiful visualizations to monitor KPIs and make data-driven decisions.',
    color: '#10b981',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Business Intelligence',
    desc: 'Transform raw data into actionable insights using BI tools, analytics, and custom reporting solutions.',
    color: '#f59e0b',
  },
  {
    icon: <Megaphone size={28} />,
    title: 'Branding & Digital Growth',
    desc: 'Strategic branding, identity design, and digital growth frameworks that help you stand out in competitive markets.',
    color: '#ec4899',
  },
  {
    icon: <Camera size={28} />,
    title: 'Social Media Management',
    desc: 'Data-driven social media strategy, content creation, and community management to grow your online presence.',
    color: '#f97316',
  },
  {
    icon: <Layout size={28} />,
    title: 'Landing Page Development',
    desc: 'High-converting, beautifully designed landing pages optimized for leads, registrations, and product launches.',
    color: '#06b6d4',
  },
];

export default function Services() {
  const { ref: headerRef, revealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, revealed: gridRevealed } = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="services section" id="services">
      <div className="orb orb-blue" style={{ width: 600, height: 600, top: '30%', left: '-200px', opacity: 0.25 }} />

      <div className="container">
        <div
          className={`services__header${headerRevealed ? ' reveal-active' : ' reveal-up'}`}
          ref={headerRef}
        >
          <div className="section-tag"><span>●</span> What We Offer</div>
          <h2 className="section-title">
            Services Built for{' '}
            <span className="text-gradient">Future-Ready Teams</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From AI training to full automation pipelines — everything your team needs
            to embrace the digital revolution.
          </p>
        </div>

        <div
          className={`services__grid${gridRevealed ? ' grid-revealed' : ''}`}
          ref={gridRef}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              className="service-card glass-card"
              style={{ '--card-color': s.color, '--reveal-delay': `${i * 0.07}s` }}
            >
              <div className="service-card__icon">
                {s.icon}
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <div className="service-card__bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
