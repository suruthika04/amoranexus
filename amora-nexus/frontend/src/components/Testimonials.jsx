import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Priya Ramesh',
    role: 'Computer Science Student',
    college: 'PSG College of Technology',
    rating: 5,
    text: 'Amora Nexus changed how I approach technology. The n8n workshop was incredibly practical — I automated my college project workflow the very next day!',
    initials: 'PR',
    color: '#3b82f6',
  },
  {
    name: 'Karthik Selvam',
    role: 'Software Developer',
    college: 'TCS, Coimbatore',
    rating: 5,
    text: "Suruthika's training style is exceptional. Complex automation concepts are explained in the simplest way. The real-world use cases made all the difference.",
    initials: 'KS',
    color: '#06b6d4',
  },
  {
    name: 'Ananya Krishnan',
    role: 'MBA Student',
    college: 'Amrita Business School',
    rating: 5,
    text: 'The community is super active and supportive. I got career guidance and workshop alerts that directly helped me land an internship in digital marketing.',
    initials: 'AK',
    color: '#8b5cf6',
  },
  {
    name: 'Mohammed Irfan',
    role: 'Freelance Developer',
    college: 'Independent',
    rating: 5,
    text: 'The dashboard development session was a gem! I built a complete business analytics dashboard for my client using what I learned. Worth every minute.',
    initials: 'MI',
    color: '#10b981',
  },
  {
    name: 'Deepika Nair',
    role: '3rd Year ECE Student',
    college: 'Coimbatore Institute of Technology',
    rating: 5,
    text: 'The certificate program is legit. My resume stands out now with AI & automation skills. The training was beginner-friendly and extremely engaging.',
    initials: 'DN',
    color: '#f59e0b',
  },
  {
    name: 'Rajan Subramaniam',
    role: 'Business Owner',
    college: 'Retail Industry',
    rating: 5,
    text: 'Hired Amora Nexus for automation solutions in my store — they saved us 20 hours a week on data entry alone. Incredible ROI and professional service.',
    initials: 'RS',
    color: '#ec4899',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const { ref: sectionRef, revealed } = useScrollReveal();

  const goTo = useCallback((idx) => {
    setActive((idx + testimonials.length) % testimonials.length);
  }, []);

  const startAutoplay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4500);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!isHovered) startAutoplay();
    else stopAutoplay();
    return stopAutoplay;
  }, [isHovered, startAutoplay, stopAutoplay]);

  // Visible cards (active ± 1 for desktop)
  const getIdx = (offset) => (active + offset + testimonials.length) % testimonials.length;

  return (
    <section
      className={`testimonials section${revealed ? ' revealed' : ''}`}
      id="testimonials"
      ref={sectionRef}
    >
      <div className="orb orb-cyan" style={{ width: 500, height: 500, top: '10%', left: '-100px', opacity: 0.2 }} />

      <div className="container">
        <div className="testimonials__header reveal-up">
          <div className="section-tag"><span>●</span> Testimonials</div>
          <h2 className="section-title">
            Trusted by <span className="text-gradient">Learners &amp; Leaders</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Don't take our word for it — hear directly from students and professionals
            who transformed their careers with Amora Nexus.
          </p>
        </div>

        <div
          className="testimonials__carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Cards */}
          <div className="testimonials__track">
            {[-1, 0, 1].map((offset) => {
              const t = testimonials[getIdx(offset)];
              const pos = offset === 0 ? 'center' : offset === -1 ? 'left' : 'right';
              return (
                <div
                  key={`${getIdx(offset)}-${offset}`}
                  className={`testimonial-card glass-card testimonial-card--${pos}`}
                  onClick={() => offset !== 0 && goTo(getIdx(offset))}
                >
                  <div className="testimonial-card__stars">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <div className="testimonial-card__profile">
                    <div
                      className="testimonial-card__avatar"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="testimonial-card__name">{t.name}</p>
                      <p className="testimonial-card__role">{t.role}</p>
                      <p className="testimonial-card__college">{t.college}</p>
                    </div>
                  </div>
                  <div
                    className="testimonial-card__accent"
                    style={{ background: `linear-gradient(90deg, ${t.color}40, transparent)` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="testimonials__controls">
            <button
              className="testimonials__btn"
              onClick={() => goTo(active - 1)}
              aria-label="Previous"
              id="testimonials-prev-btn"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot${i === active ? ' testimonials__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testimonials__btn"
              onClick={() => goTo(active + 1)}
              aria-label="Next"
              id="testimonials-next-btn"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
