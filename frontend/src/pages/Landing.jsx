import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container fade-in">
      <div className="hero-section">
        <div className="brand-icon">🎯</div>
        <h1 className="hero-title">
          Find Your <br />
          <span className="highlight">Dream Career</span>
        </h1>
        <p className="hero-subtitle">
          A 3-day journey to discover your perfect career path.
          Let AI guide you based on your interests, skills, and values.
        </p>
        <button className="btn-start" onClick={() => navigate('/day1')}>
          🚀 Start Your Career Discovery →
        </button>
        <div className="trust-badges">
          <span>🔒 100% Private</span>
          <span>🧘 3-Day Journey</span>
          <span>❤️ AI Career Mentor</span>
        </div>
      </div>

      <style>{`
        .landing-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FCF9F5;
        }
        .hero-section {
          max-width: 720px;
          padding: 2rem;
          text-align: center;
        }
        .brand-icon { font-size: 4rem; margin-bottom: 1.5rem; }
        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          line-height: 1.1;
          color: #2C2420;
          margin-bottom: 1.5rem;
        }
        .highlight {
          font-weight: 600;
          background: linear-gradient(135deg, #8B6B4D, #4A7C7B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: #5A4E48;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
        }
        .btn-start {
          background: #8B6B4D;
          color: #FCF9F5;
          border: none;
          padding: 1rem 3rem;
          font-size: 1.1rem;
          border-radius: 60px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(139, 107, 77, 0.25);
        }
        .btn-start:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(139, 107, 77, 0.35);
        }
        .trust-badges {
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-size: 0.9rem;
          color: #7A6B62;
        }
      `}</style>
    </div>
  );
};

export default Landing;