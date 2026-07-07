import React, { useState, useEffect, useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import ProgressBar from '../components/Common/ProgressBar';
import './ProgressTracker.css';

const ProgressTracker = () => {
  const { progress, skills, markComplete, resetProgress } = useContext(ProgressContext);
  const [selectedCareer, setSelectedCareer] = useState('Software Engineer');

  const careerSkills = {
    'Software Engineer': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Data Structures'],
    'Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Pandas', 'NumPy'],
    'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Responsive Design', 'UX/UI'],
    'DevOps Engineer': ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Python', 'Networking'],
    'AI/ML Engineer': ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Data Structures']
  };

  const currentSkills = careerSkills[selectedCareer] || [];
  const completed = currentSkills.filter(s => progress.includes(s));
  const completionPercentage = currentSkills.length > 0 
    ? Math.round((completed.length / currentSkills.length) * 100) 
    : 0;

  return (
    <div className="progress-tracker fade-in">
      <h1>📈 Progress Tracker</h1>
      <p className="subtitle">Track your learning progress toward your dream career</p>

      <div className="progress-controls">
        <div className="control-group">
          <label>Target Career</label>
          <select value={selectedCareer} onChange={(e) => setSelectedCareer(e.target.value)}>
            {Object.keys(careerSkills).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button className="btn-reset" onClick={resetProgress}>
          🔄 Reset Progress
        </button>
      </div>

      <div className="progress-summary">
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F0EBE6" strokeWidth="10"/>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4A7C7B"
              strokeWidth="10"
              strokeDasharray={`${completionPercentage * 2.83} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="progress-number">{completionPercentage}%</span>
        </div>
        <div className="progress-stats">
          <p><strong>{completed.length}</strong> of <strong>{currentSkills.length}</strong> skills completed</p>
          <p className="progress-message">
            {completionPercentage === 100 ? '🎉 You\'ve mastered all skills!' :
             completionPercentage >= 75 ? '🌟 Almost there! Keep going!' :
             completionPercentage >= 50 ? '💪 Great progress! Halfway there!' :
             completionPercentage >= 25 ? '🚀 Good start! Keep learning!' :
             '🌱 Start your learning journey today!'}
          </p>
        </div>
      </div>

      <div className="skills-list">
        <h3>📚 Skills to Learn</h3>
        {currentSkills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-info">
              <span className="skill-name">{skill}</span>
              <span className="skill-status">
                {progress.includes(skill) ? '✅ Completed' : '⬜ Not Started'}
              </span>
            </div>
            <div className="skill-progress">
              <ProgressBar percentage={progress.includes(skill) ? 100 : 0} />
            </div>
            {!progress.includes(skill) && (
              <button 
                className="btn-complete" 
                onClick={() => markComplete(skill)}
              >
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .progress-tracker {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .progress-tracker h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: #2C2420;
        }
        .subtitle {
          color: #7A6B62;
          margin-bottom: 2rem;
        }
        .progress-controls {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          margin-bottom: 2rem;
        }
        .control-group {
          flex: 1;
        }
        .control-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: #7A6B62;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.3rem;
        }
        .control-group select {
          width: 100%;
          padding: 0.6rem 1rem;
          border: 1px solid #E8DDD5;
          border-radius: 10px;
          font-size: 1rem;
        }
        .btn-reset {
          background: #E8DDD5;
          color: #2C2420;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 40px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .btn-reset:hover {
          background: #D5C9C0;
        }
        .progress-summary {
          display: flex;
          align-items: center;
          gap: 3rem;
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          margin-bottom: 2rem;
        }
        .progress-circle {
          position: relative;
          width: 120px;
          height: 120px;
        }
        .progress-circle svg {
          width: 100%;
          height: 100%;
        }
        .progress-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          font-weight: 600;
          color: #2C2420;
        }
        .progress-stats p {
          font-size: 1.1rem;
          color: #2C2420;
        }
        .progress-message {
          color: #7A6B62 !important;
          font-size: 1rem !important;
        }
        .skills-list {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
        }
        .skills-list h3 {
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .skill-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 0;
          border-bottom: 1px solid #F0EBE6;
        }
        .skill-item:last-child {
          border-bottom: none;
        }
        .skill-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .skill-name {
          font-weight: 500;
          color: #2C2420;
        }
        .skill-status {
          font-size: 0.8rem;
          color: #7A6B62;
        }
        .skill-progress {
          flex: 0 0 120px;
        }
        .btn-complete {
          background: #4A7C7B;
          color: white;
          border: none;
          padding: 0.3rem 1rem;
          border-radius: 30px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .btn-complete:hover {
          background: #3D6A69;
        }
        @media (max-width: 768px) {
          .progress-summary {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .skill-item {
            flex-wrap: wrap;
          }
          .skill-progress {
            flex: 1 1 100%;
          }
          .btn-complete {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressTracker;