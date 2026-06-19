import { ExternalLink, Heart, MessageCircle, Zap as InstaIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Instagram.css';

const mockPosts = [
  { id: 1, likes: 124, comments: 18, gradient: 'linear-gradient(135deg,#667eea,#764ba2)', label: 'AI Training Session' },
  { id: 2, likes: 98, comments: 12, gradient: 'linear-gradient(135deg,#06b6d4,#2563eb)', label: 'n8n Automation' },
  { id: 3, likes: 210, comments: 31, gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)', label: 'Workshop Recap' },
  { id: 4, likes: 87, comments: 9, gradient: 'linear-gradient(135deg,#10b981,#06b6d4)', label: 'Community Meetup' },
  { id: 5, likes: 156, comments: 22, gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)', label: 'Digital Growth Tips' },
  { id: 6, likes: 143, comments: 27, gradient: 'linear-gradient(135deg,#3b82f6,#10b981)', label: 'Dashboard Live Demo' },
];

export default function Instagram() {
  const { ref: headerRef, revealed: headerRevealed } = useScrollReveal();
  const { ref: profileRef, revealed: profileRevealed } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, revealed: gridRevealed } = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="instagram section" id="instagram">
      <div className="orb orb-blue" style={{ width: 400, height: 400, bottom: '0', left: '-100px', opacity: 0.25 }} />

      <div className="container">
        <div 
          className={`instagram__header${headerRevealed ? ' reveal-active' : ' reveal-up'}`}
          ref={headerRef}
        >
          <div className="section-tag"><span>●</span> Follow Us</div>
          <h2 className="section-title">
            Stay Connected on <span className="text-gradient">Instagram</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Follow us for daily AI tips, automation tutorials, workshop highlights, and digital growth insights.
          </p>
        </div>

        {/* Profile Card */}
        <div 
          className={`instagram__profile glass-card-strong${profileRevealed ? ' reveal-active' : ' reveal-up'}`}
          ref={profileRef}
        >
          <div className="instagram__profile-avatar">
            <InstaIcon size={30} />
          </div>
          <div className="instagram__profile-info">
            <h3 className="instagram__profile-name">@amoranexus</h3>
            <p className="instagram__profile-bio">
              AI · Automation · Digital Growth 🚀<br />
              Empowering future professionals with cutting-edge technology.
            </p>
            <div className="instagram__profile-stats">
              <div className="instagram__stat"><strong>50+</strong><span>Posts</span></div>
              <div className="instagram__stat"><strong>1K+</strong><span>Followers</span></div>
              <div className="instagram__stat"><strong>200+</strong><span>Following</span></div>
            </div>
          </div>
          <a
            href="https://www.instagram.com/amoranexus/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary instagram__follow-btn"
            id="instagram-follow-btn"
          >
            <InstaIcon size={18} /> Follow Us
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Post Grid */}
        <div 
          className={`instagram__grid${gridRevealed ? ' grid-revealed' : ''}`}
          ref={gridRef}
        >
          {mockPosts.map((post, i) => (
            <a
              key={post.id}
              href="https://www.instagram.com/amoranexus/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram__post"
              style={{ '--stagger': `${i * 0.05}s` }}
            >
              <div className="instagram__post-bg" style={{ background: post.gradient }}>
                <InstaIcon size={28} style={{ opacity: 0.4, color: 'white' }} />
                <span className="instagram__post-label">{post.label}</span>
              </div>
              <div className="instagram__post-overlay">
                <span><Heart size={16} /> {post.likes}</span>
                <span><MessageCircle size={16} /> {post.comments}</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href="https://www.instagram.com/amoranexus/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <InstaIcon size={18} /> View All Posts on Instagram
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
