import React, { useState } from 'react';
import ComparisonTable from '../components/Common/ComparisonTable';
import { getSalaryData } from '../services/salaryService';
import './CareerComparison.css';

const CareerComparison = () => {
  const [selectedCareers, setSelectedCareers] = useState(['Software Engineer', 'Data Scientist']);
  const [location, setLocation] = useState('US');

  const allCareers = ['Software Engineer', 'Data Scientist', 'Frontend Developer', 'DevOps Engineer', 'AI/ML Engineer'];
  const locations = ['US', 'UK', 'Canada', 'India'];

  const addCareer = () => {
    const available = allCareers.filter(c => !selectedCareers.includes(c));
    if (available.length > 0 && selectedCareers.length < 4) {
      setSelectedCareers([...selectedCareers, available[0]]);
    }
  };

  const removeCareer = (career) => {
    if (selectedCareers.length > 1) {
      setSelectedCareers(selectedCareers.filter(c => c !== career));
    }
  };

  return (
    <div className="career-comparison fade-in">
      <h1>🔍 Career Comparison</h1>
      <p className="subtitle">Compare up to 4 careers side-by-side</p>

      <div className="comparison-controls">
        <div className="control-group">
          <label>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Selected Careers</label>
          <div className="selected-careers">
            {selectedCareers.map(career => (
              <span key={career} className="selected-tag">
                {career}
                <button onClick={() => removeCareer(career)}>×</button>
              </span>
            ))}
            {selectedCareers.length < 4 && (
              <button className="add-career-btn" onClick={addCareer}>
                + Add Career
              </button>
            )}
          </div>
        </div>
      </div>

      <ComparisonTable careers={selectedCareers} location={location} />

      <style>{`
        .career-comparison {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .career-comparison h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: #2C2420;
        }
        .subtitle {
          color: #7A6B62;
          margin-bottom: 2rem;
        }
        .comparison-controls {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .control-group {
          flex: 1;
          min-width: 200px;
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
        .selected-careers {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
        }
        .selected-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #F0EBE6;
          padding: 0.3rem 0.8rem;
          border-radius: 30px;
          font-size: 0.9rem;
          color: #2C2420;
        }
        .selected-tag button {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #7A6B62;
          padding: 0 0.2rem;
        }
        .add-career-btn {
          background: none;
          border: 2px dashed #E8DDD5;
          padding: 0.3rem 1rem;
          border-radius: 30px;
          font-size: 0.9rem;
          color: #7A6B62;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .add-career-btn:hover {
          border-color: #8B6B4D;
          color: #8B6B4D;
        }
        @media (max-width: 768px) {
          .comparison-controls {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CareerComparison;