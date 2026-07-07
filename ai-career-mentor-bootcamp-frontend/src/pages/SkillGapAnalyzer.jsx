import React, { useState } from 'react';
import { analyzeSkillGap, getLearningPath } from '../services/skillGapService';
import SkillGapChart from '../components/Career/SkillGapChart';
import './SkillGapAnalyzer.css';

const SkillGapAnalyzer = () => {
  const [currentSkills, setCurrentSkills] = useState('');
  const [targetCareer, setTargetCareer] = useState('Software Engineer');
  const [result, setResult] = useState(null);
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const careers = ['Software Engineer', 'Data Scientist', 'Frontend Developer', 'DevOps Engineer', 'AI/ML Engineer'];

  const handleAnalyze = async () => {
    if (!currentSkills.trim()) {
      alert('Please enter your current skills');
      return;
    }

    setLoading(true);
    try {
      const skills = currentSkills.split(',').map(s => s.trim()).filter(s => s);
      const analysis = await analyzeSkillGap(skills, targetCareer);
      setResult(analysis);

      if (analysis.missingSkills.length > 0) {
        const path = await getLearningPath(analysis.missingSkills);
        setLearningPath(path);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze skill gap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skill-gap-analyzer fade-in">
      <h1>📊 Skill Gap Analyzer</h1>
      <p className="subtitle">See what skills you need to learn for your dream career</p>

      <div className="analyzer-form">
        <div className="form-group">
          <label>Your Current Skills</label>
          <textarea
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            placeholder="Enter your skills separated by commas (e.g., JavaScript, Python, React, SQL)"
            rows={3}
          />
          <span className="hint">Separate skills with commas</span>
        </div>

        <div className="form-group">
          <label>Target Career</label>
          <select value={targetCareer} onChange={(e) => setTargetCareer(e.target.value)}>
            {careers.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button className="btn-analyze" onClick={handleAnalyze} disabled={loading}>
          {loading ? '🧠 Analyzing...' : '🔍 Analyze Skill Gap'}
        </button>
      </div>

      {result && (
        <div className="skill-gap-results">
          <div className="result-summary">
            <div className="match-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F0EBE6" strokeWidth="10"/>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4A7C7B"
                  strokeWidth="10"
                  strokeDasharray={`${result.matchPercentage * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="match-number">{result.matchPercentage}%</span>
            </div>
            <div className="match-info">
              <h3>Match Score</h3>
              <p>{result.skillsMatched} out of {result.totalRequired} skills matched</p>
            </div>
          </div>

          <div className="skills-grid">
            <div className="skills-section matched">
              <h4>✅ Matched Skills</h4>
              <div className="skill-tags">
                {result.matchedSkills.map((skill, i) => (
                  <span key={i} className="skill-tag matched">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skills-section missing">
              <h4>❌ Missing Skills</h4>
              <div className="skill-tags">
                {result.missingSkills.map((skill, i) => (
                  <span key={i} className="skill-tag missing">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <SkillGapChart result={result} />

          {learningPath && learningPath.length > 0 && (
            <div className="learning-path">
              <h3>📚 Learning Path</h3>
              <div className="learning-list">
                {learningPath.map((item, i) => (
                  <div key={i} className="learning-item">
                    <span className="learning-number">{i + 1}</span>
                    <div className="learning-content">
                      <h4>{item.skill}</h4>
                      <p>Resources: {item.resources.join(', ')}</p>
                      <span className="learning-time">⏰ {item.estimatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .skill-gap-analyzer {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .skill-gap-analyzer h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: #2C2420;
        }
        .subtitle {
          color: #7A6B62;
          margin-bottom: 2rem;
        }
        .analyzer-form {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-weight: 500;
          color: #2C2420;
          margin-bottom: 0.3rem;
        }
        .form-group textarea, .form-group select {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #E8DDD5;
          border-radius: 10px;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
        }
        .form-group textarea:focus, .form-group select:focus {
          outline: none;
          border-color: #8B6B4D;
        }
        .hint {
          font-size: 0.8rem;
          color: #A89A92;
          margin-top: 0.2rem;
        }
        .btn-analyze {
          background: #8B6B4D;
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 40px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        .btn-analyze:hover:not(:disabled) {
          background: #7A5E44;
          transform: translateY(-2px);
        }
        .btn-analyze:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .skill-gap-results {
          margin-top: 2rem;
        }
        .result-summary {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          margin-bottom: 1.5rem;
        }
        .match-circle {
          position: relative;
          width: 100px;
          height: 100px;
        }
        .match-circle svg {
          width: 100%;
          height: 100%;
        }
        .match-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          font-weight: 600;
          color: #2C2420;
        }
        .match-info h3 {
          font-weight: 500;
          color: #2C2420;
        }
        .match-info p {
          color: #7A6B62;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .skills-section {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
        }
        .skills-section h4 {
          font-weight: 500;
          margin-bottom: 0.8rem;
        }
        .skills-section.matched h4 { color: #4A7C7B; }
        .skills-section.missing h4 { color: #D32F2F; }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skill-tag {
          padding: 0.3rem 0.8rem;
          border-radius: 30px;
          font-size: 0.8rem;
        }
        .skill-tag.matched {
          background: rgba(74, 124, 123, 0.1);
          color: #4A7C7B;
        }
        .skill-tag.missing {
          background: rgba(211, 47, 47, 0.1);
          color: #D32F2F;
        }
        .learning-path {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          margin-top: 1.5rem;
        }
        .learning-path h3 {
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .learning-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .learning-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 0.8rem;
          background: #FCF9F5;
          border-radius: 12px;
        }
        .learning-number {
          background: #8B6B4D;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .learning-content h4 {
          font-weight: 500;
          color: #2C2420;
        }
        .learning-content p {
          font-size: 0.85rem;
          color: #7A6B62;
          margin: 0.2rem 0;
        }
        .learning-time {
          font-size: 0.8rem;
          color: #4A7C7B;
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .result-summary {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillGapAnalyzer;