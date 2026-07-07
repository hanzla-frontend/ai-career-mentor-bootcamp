import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Day3CareerRoadmap = () => {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeCommitment, setTimeCommitment] = useState(15);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [career, setCareer] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const savedCareer = JSON.parse(localStorage.getItem('selected_career') || '{"title":"Software Engineer","matchScore":92}');
    setCareer(savedCareer);
  }, []);

  const buildRoadmap = async () => {
    setLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem('career_profile') || '{}');
      const response = await axios.post(`${API_URL}/api/career/roadmap`, {
        career: career?.title || 'Software Engineer',
        profile: profile,
        timeCommitment: timeCommitment,
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

  const renderRoadmapContent = (text) => {
    if (!text) return <p>No roadmap generated yet.</p>;

    const lines = text.split('\n');
    const elements = [];
    let isInList = false;
    let listItems = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check if line is a heading
      const isHeading =
        line.startsWith('#') ||
        (line.length > 0 &&
          line === line.toUpperCase() &&
          line.length < 50 &&
          !line.includes('http') &&
          !line.includes('www') &&
          !line.includes('@'));

      // Check if line is a bullet point
      const isBullet =
        line.startsWith('-') ||
        line.startsWith('•') ||
        line.startsWith('✓') ||
        line.startsWith('✅') ||
        line.startsWith('📚') ||
        line.startsWith('🛠️') ||
        line.startsWith('🏗️') ||
        line.startsWith('🎯') ||
        line.startsWith('💰') ||
        line.startsWith('📈');

      if (isHeading) {
        // Close list if open
        if (isInList) {
          elements.push(
            <ul key={`list-end-${i}`} className="roadmap-list">
              {listItems}
            </ul>
          );
          listItems = [];
          isInList = false;
        }
        elements.push(
          <h3 key={`heading-${i}`} className="roadmap-heading">
            {line.replace(/^#+\s*/, '').trim()}
          </h3>
        );
      } else if (isBullet) {
        listItems.push(
          <li key={`bullet-${i}`} className="roadmap-bullet">
            {line}
          </li>
        );
        isInList = true;
      } else if (line === '') {
        if (isInList) {
          elements.push(
            <ul key={`list-end-${i}`} className="roadmap-list">
              {listItems}
            </ul>
          );
          listItems = [];
          isInList = false;
        }
        elements.push(<br key={`space-${i}`} />);
      } else {
        if (isInList) {
          elements.push(
            <ul key={`list-end-${i}`} className="roadmap-list">
              {listItems}
            </ul>
          );
          listItems = [];
          isInList = false;
        }

        if (line.includes(':') && /[📚🛠️🏗️🎯💰📈🎨💻🤖]/.test(line)) {
          elements.push(
            <h4 key={`section-${i}`} className="roadmap-section">
              {line}
            </h4>
          );
        } else {
          elements.push(
            <p key={`text-${i}`} className="roadmap-text-line">
              {line}
            </p>
          );
        }
      }
    }

    if (isInList) {
      elements.push(
        <ul key="list-end-final" className="roadmap-list">
          {listItems}
        </ul>
      );
    }

    return <div className="roadmap-text">{elements}</div>;
  };

  if (!career) {
    return (
      <div className="day3-container fade-in">
        <h1>🗺️ Day 3: Your Career Roadmap</h1>
        <p className="subtitle">Please select a career from Day 2 first.</p>
        <button className="btn-home" onClick={() => navigate('/day2')}>
          ← Back to Day 2
        </button>
        <style>{`
          .day3-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 0;
            text-align: center;
          }
          .day3-container h1 {
            font-size: 2.5rem;
            font-weight: 400;
            color: #2C2420;
          }
          .subtitle {
            color: #7A6B62;
            margin-bottom: 2rem;
          }
          .btn-home {
            background: #8B6B4D;
            color: white;
            border: none;
            padding: 0.8rem 2.5rem;
            border-radius: 40px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .btn-home:hover {
            background: #7A5E44;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="day3-container fade-in">
      <h1>🗺️ Day 3: Your Career Roadmap</h1>
      <p className="subtitle">
        Your personalized path to becoming a <strong>{career.title}</strong>
      </p>

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
              {[5, 10, 15, 20, 30].map((hours) => (
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
          <div className="roadmap-content">{renderRoadmapContent(roadmap)}</div>

          <div className="actions">
            <button
              className="btn-download"
              onClick={() => {
                const text = roadmap || 'No roadmap available';
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `career-roadmap-${career.title
                  .toLowerCase()
                  .replace(/\s/g, '-')}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
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

        .roadmap-section {
          font-size: 1rem;
          font-weight: 600;
          color: #4A7C7B;
          margin-top: 1rem;
          margin-bottom: 0.3rem;
        }

        .roadmap-text-line {
          margin: 0.3rem 0;
          line-height: 1.8;
        }

        .roadmap-list {
          list-style: none;
          padding-left: 0;
          margin: 0.3rem 0;
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

        /* ----- RESPONSIVE ----- */
        @media (max-width: 768px) {
          .day3-container h1 {
            font-size: 2rem;
          }

          .career-badge {
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 0.8rem 1rem;
          }

          .badge-title {
            font-size: 1rem;
          }

          .setup-section {
            padding: 1.5rem;
          }

          .time-options {
            gap: 0.5rem;
          }

          .time-btn {
            padding: 0.6rem 1rem;
            min-width: 60px;
            font-size: 0.9rem;
          }

          .roadmap-results {
            padding: 1rem;
          }

          .actions {
            flex-direction: column;
          }

          .btn-download,
          .btn-home {
            padding: 0.7rem 1.5rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .day3-container h1 {
            font-size: 1.5rem;
          }

          .day3-container {
            padding: 1rem 0;
          }

          .time-btn {
            padding: 0.5rem 0.8rem;
            min-width: 50px;
            font-size: 0.8rem;
          }

          .time-btn .time-label {
            font-size: 0.6rem;
          }

          .badge-icon {
            font-size: 1.5rem;
          }

          .badge-match {
            font-size: 0.7rem;
            padding: 0.2rem 0.6rem;
          }

          .roadmap-heading {
            font-size: 1rem;
          }

          .roadmap-section {
            font-size: 0.9rem;
          }

          .roadmap-text-line {
            font-size: 0.85rem;
          }

          .roadmap-bullet {
            font-size: 0.85rem;
            margin-left: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Day3CareerRoadmap;