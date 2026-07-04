import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Day3CareerRoadmap = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeCommitment, setTimeCommitment] = useState(15);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const career = JSON.parse(localStorage.getItem('selected_career') || '{"title":"Software Engineer","matchScore":92}');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const buildRoadmap = async () => {
    setLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem('career_profile') || '{}');
      const response = await axios.post(`${API_URL}/api/career/roadmap`, {
        career: career.title,
        profile: profile,
        timeCommitment: timeCommitment
      });
      setRoadmap(response.data.roadmap);
      setShowRoadmap(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to build roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="day3-container fade-in">
      <h1>🗺️ Day 3: Your Career Roadmap</h1>
      <p className="subtitle">Your personalized path to becoming a <strong>{career.title}</strong></p>

      <div className="career-badge">
        <span className="badge-icon">🎯</span>
        <span className="badge-title">{career.title}</span>
        <span className="badge-match">{career.matchScore || 92}% Match</span>
      </div>

      {!showRoadmap ? (
        <div className="setup-section">
          <div className="time-selector">
            <h3>⏰ How many hours can you commit weekly?</h3>
            <p className="time-hint">Choose a realistic number you can stick to.</p>
            <div className="time-options">
              {[5, 10, 15, 20, 30].map(hours => (
                <button
                  key={hours}
                  className={`time-btn ${timeCommitment === hours ? 'active' : ''}`}
                  onClick={() => setTimeCommitment(hours)}
                >
                  {hours}h
                  <span className="time-label">/week</span>
                </button>
              ))}
            </div>
            <p className="time-estimate">
              {timeCommitment} hours/week = ~{Math.round(timeCommitment * 4)} hours/month
            </p>
          </div>

          <button className="btn-build" onClick={buildRoadmap} disabled={loading}>
            {loading ? '🧠 Building your roadmap...' : '🚀 Build My Roadmap'}
          </button>
        </div>
      ) : (
        <div className="roadmap-results">
          <div className="roadmap-content">
            {roadmap ? (
              <div className="roadmap-text">
                {roadmap.split('\n').map((line, i) => {
                  // Check if line is a heading (starts with # or has all caps)
                  const isHeading = line.startsWith('#') || 
                                   (line.trim().length > 0 && 
                                    line.trim() === line.trim().toUpperCase() && 
                                    line.trim().length < 50);
                  
                  // Check if line is a bullet point
                  const isBullet = line.trim().startsWith('-') || 
                                  line.trim().startsWith('•') ||
                                  line.trim().startsWith('✓');
                  
                  if (isHeading) {
                    return <h3 key={i} className="roadmap-heading">{line.replace(/^#+\s*/, '')}</h3>;
                  } else if (isBullet) {
                    return <li key={i} className="roadmap-bullet">{line.trim()}</li>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="roadmap-text-line">{line}</p>;
                  }
                })}
              </div>
            ) : (
              <p>No roadmap generated yet.</p>
            )}
          </div>

          <div className="actions">
            <button className="btn-download" onClick={() => {
              const text = roadmap || 'No roadmap available';
              const blob = new Blob([text], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `career-roadmap-${career.title}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}>
              📥 Download Career Plan
            </button>
            <button className="btn-home" onClick={() => navigate('/')}>
              🏠 Back to Home
            </button>
          </div>
        </div>
      )}

      <style>{`
        .day3-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .day3-container h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: #2C2420;
        }
        .subtitle {
          color: #7A6B62;
          margin-bottom: 1.5rem;
        }
        .subtitle strong {
          color: #2C2420;
        }
        .career-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          margin-bottom: 2rem;
        }
        .badge-icon {
          font-size: 2rem;
        }
        .badge-title {
          flex: 1;
          font-size: 1.2rem;
          font-weight: 500;
          color: #2C2420;
        }
        .badge-match {
          background: #4A7C7B;
          color: white;
          padding: 0.3rem 1rem;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .setup-section {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
        }
        .time-selector {
          margin-bottom: 2rem;
        }
        .time-selector h3 {
          font-weight: 400;
          margin-bottom: 0.3rem;
        }
        .time-hint {
          color: #7A6B62;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .time-options {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .time-btn {
          padding: 0.8rem 1.5rem;
          border: 2px solid #E8DDD5;
          border-radius: 40px;
          background: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 70px;
        }
        .time-btn .time-label {
          font-size: 0.7rem;
          color: #A89A92;
        }
        .time-btn.active {
          border-color: #8B6B4D;
          background: rgba(139, 107, 77, 0.06);
          box-shadow: 0 4px 12px rgba(139, 107, 77, 0.15);
        }
        .time-btn:hover:not(.active) {
          border-color: #8B6B4D;
        }
        .time-estimate {
          margin-top: 1rem;
          color: #7A6B62;
          font-size: 0.9rem;
        }
        .btn-build {
          background: #8B6B4D;
          color: white;
          border: none;
          padding: 1rem 3rem;
          border-radius: 40px;
          font-size: 1.1rem;
          width: 100%;
          transition: all 0.3s ease;
        }
        .btn-build:hover:not(:disabled) {
          background: #7A5E44;
          transform: translateY(-2px);
        }
        .btn-build:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .roadmap-results {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
        }
        .roadmap-content {
          max-height: 500px;
          overflow-y: auto;
          padding-right: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .roadmap-content::-webkit-scrollbar {
          width: 4px;
        }
        .roadmap-content::-webkit-scrollbar-thumb {
          background: #D5C9C0;
          border-radius: 10px;
        }
        .roadmap-text {
          line-height: 1.8;
          color: #2C2420;
        }
        .roadmap-heading {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2C2420;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          padding-bottom: 0.3rem;
          border-bottom: 2px solid #F0EBE6;
        }
        .roadmap-text-line {
          margin: 0.3rem 0;
          line-height: 1.8;
        }
        .roadmap-bullet {
          margin: 0.3rem 0 0.3rem 1.5rem;
          line-height: 1.8;
          list-style: none;
        }
        .roadmap-bullet::before {
          content: "• ";
          color: #8B6B4D;
        }
        .actions {
          display: flex;
          gap: 1rem;
        }
        .btn-download {
          background: #4A7C7B;
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 40px;
          flex: 1;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .btn-download:hover {
          background: #3D6A69;
          transform: translateY(-2px);
        }
        .btn-home {
          background: #E8DDD5;
          color: #2C2420;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 40px;
          flex: 1;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .btn-home:hover {
          background: #D5C9C0;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Day3CareerRoadmap;