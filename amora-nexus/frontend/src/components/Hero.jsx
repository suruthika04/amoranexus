import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import './Hero.css';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 8,
}));

const HIGHLIGHTS = [
  'Beginner Friendly',
  'Live Interactive Sessions',
  'Hands-On Demonstrations',
  'Real-World Use Cases',
  'Certificate of Participation',
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const nodes = Array.from({ length: 65 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,0.55)';
        ctx.fill();
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(37,99,235,${0.18 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section className="hero" id="home">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Glow orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Grid overlay */}
      <div className="hero__grid" />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="hero__particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="container hero__content">
        {/* Tag */}
        <div className="hero__tag">
          <span className="hero__tag-dot" />
          Limited Slots Available · Exclusive Workshop
        </div>

        {/* Headline */}
        <h1 className="hero__headline font-display">
          FREE N8N AUTOMATION<br />
          <span className="text-gradient">MASTERCLASS</span>
        </h1>

        {/* Subheadline */}
        <p className="hero__sub">
          Learn how to automate repetitive tasks, connect applications, and build
          powerful workflows using n8n through practical hands-on sessions.
        </p>

        {/* Highlights */}
        <div className="hero__highlights">
          {HIGHLIGHTS.map((h) => (
            <div key={h} className="hero__highlight">
              <CheckCircle2 size={18} className="hero__highlight-icon" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero__ctas">
          <a
            href="#registration"
            className="btn btn-primary btn-lg"
            id="hero-register-btn"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#registration')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Register For Free
            <ArrowRight size={18} />
          </a>
          <a
            href="https://chat.whatsapp.com/FZcrH9mzC1X0XLdVovdPRP"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
            id="hero-whatsapp-btn"
          >
            <MessageCircle size={20} />
            Join WhatsApp Group
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="hero__scroll"
        onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        <ChevronDown size={20} />
      </a>
    </section>
  );
}

