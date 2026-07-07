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
          min-height: 80dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-beige, #FCF9F5);
          padding: 2rem 1rem;
        }
        
        .hero-section {
          max-width: 720px;
          padding: 2rem;
          text-align: center;
          width: 100%;
        }
        
        .brand-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          line-height: 1.1;
          color: var(--color-soft-black, #2C2420);
          margin-bottom: 1.5rem;
        }
        
        .hero-title .highlight {
          font-weight: 600;
          background: linear-gradient(135deg, #8B6B4D, #4A7C7B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-muted, #7A6B62);
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .btn-start {
          background: var(--color-terracotta, #8B6B4D);
          color: var(--color-beige, #FCF9F5);
          border: none;
          padding: 1rem 3rem;
          font-size: 1.1rem;
          border-radius: var(--radius-full, 9999px);
          transition: all 0.3s ease;
          box-shadow: 0 8px 30px rgba(139, 107, 77, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
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
          color: var(--color-muted, #7A6B62);
          flex-wrap: wrap;
        }
        
        .trust-badges span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* ----- TABLET ----- */
        @media screen and (max-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
        }
        
        /* ----- MOBILE ----- */
        @media screen and (max-width: 768px) {
          .landing-container {
            min-height: 70vh;
            padding: 1rem;
          }
          
          .hero-section {
            padding: 1rem;
          }
          
          .brand-icon {
            font-size: 3rem;
          }
          
          .hero-title {
            font-size: 2.8rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
            padding: 0 0.5rem;
          }
          
          .btn-start {
            padding: 0.8rem 2rem;
            font-size: 1rem;
            width: 100%;
            justify-content: center;
          }
          
          .trust-badges {
            gap: 1rem;
            font-size: 0.8rem;
          }
        }
        
        /* ----- MOBILE SMALL ----- */
        @media screen and (max-width: 480px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .trust-badges {
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;